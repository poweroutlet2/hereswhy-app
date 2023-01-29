import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, ListBulletIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { trpc } from '../utils/trpc'
import { CircleSpinner } from './svg/CircleSpinner'

/* 
The save button displayed on every thread headerTweet. If the user is signed in, clicking this will open the user's
thread lists. Clicking on a list will then save the thread to the slelected list. 

Managing list 'state': Knowing what lists are available, and which threads are already saved to which lists
- There should be a global object that stores the user's lists and threads within.
    - This object should update whenever the user saves/unsaves a thread and when a new list is created/deleted
    - The session is not a good place for this for various reasons, but mainly it cannot be updated on the fly
-> incomes react query
- New trpc protected procedure get_lists() will query every list a user has
- react-query will give that procedure an id, and cache the result of the procedure
- Whenever any list update happens, the procedure will be invalidated, triggering a query refresh
- Until that invalidation happens, the results of the procedure (user's lists) will be globally cached
*/

export function SaveButton({ thread_id, user_id }: { thread_id: bigint, user_id: string }) {
    const utils = trpc.useContext();
    let not_in_list = true;
    const { data: user_lists, isStale } = trpc.threads.get_lists.useQuery({ user_id }, { staleTime: Infinity })
    const { mutateAsync: save_mutation, isLoading: saveLoading } = trpc.threads.save_thread.useMutation({
        onSuccess() {
            utils.threads.get_lists.invalidate();
        }
    })
    const { mutateAsync: unsave_mutation, isLoading: unsaveLoading } = trpc.threads.unsave_thread.useMutation({
        onSuccess() {
            utils.threads.get_lists.invalidate({ user_id });
        }
    })
    console.log(isStale)
    async function handleSaveUnsave(thread_id: string | bigint, list_id?: number) {
        /*Called when a list in the save drop down is clicked
        
        If the thread is in the list, unsaves. If thread is not in list, saves
        */
        // if (!list_id && user_lists?.length) {
        //     list_id = user_lists[0]?.id;
        // }
        if (not_in_list) {
            await save_mutation({ thread_id, list_id })
        } else {
            await unsave_mutation({ thread_id, list_id })
        }
    }

    return (
        <div className="top-16 w-56 text-right">
            <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                    <>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-400 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            Save to...
                            <ChevronDownIcon
                                className="ml-2 -mr-1 h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            show={open}
                            enter="transition ease-out duration-50"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-0 w-48 origin-top-right rounded-md bg-white shadow-xl ring-2 ring-gray-500 ring-opacity-10 focus:outline-none">
                                <div className=" ">
                                    {/* If user is singed in, clicking save button will display the users lists.*/}
                                    {user_lists &&
                                        user_lists.map((list) => (
                                            <Menu.Item
                                                as="div" key={list.id}
                                                className={'flex px-3 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-gray-100'}
                                                onClick={() => { handleSaveUnsave(thread_id, list.id) }}
                                            >
                                                <>
                                                    <ListBulletIcon className="mr-2 -ml-1 h-5 w-5 text-gray-700 hover:text-text-gray-700"
                                                        aria-hidden="true" />
                                                    {list.name}
                                                    {(unsaveLoading || saveLoading)
                                                        ?
                                                        <div className="h-5 w-5 ml-auto text-gray-700">
                                                            <CircleSpinner />
                                                        </div>
                                                        :
                                                        (not_in_list = list.saved_thread.findIndex((thread) => thread.thread_id.toString() == thread_id.toString()) === -1)
                                                            ? <PlusIcon className="h-5 w-5 ml-auto text-gray-700" title="Add to list" />
                                                            : <TrashIcon className="h-5 w-5 ml-auto text-rose-300" title="Remove from list" />
                                                    }
                                                </>
                                            </Menu.Item>
                                        ))}
                                    {/* If the user has no lists, the default one will be displayed. */}
                                    {(!user_lists?.length) &&
                                        <Menu.Item
                                            as="div"
                                            className={'flex px-3 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-gray-100'}
                                            onClick={() => { handleSaveUnsave(thread_id) }}
                                        >
                                            <ListBulletIcon className="mr-2 -ml-1 h-5 w-5 text-gray-700 hover:text-text-gray-700"
                                                aria-hidden="true" />
                                            Saved Threads
                                            <PlusIcon className="h-5 ml-6 w-5 text-gray-700 hover:text-text-gray-700" />
                                        </Menu.Item>
                                    }
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    )
}
