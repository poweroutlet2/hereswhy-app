import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Fragment } from "react"

export function SaveButtonDisabled() {
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
                                <div className="">
                                    <Menu.Item
                                        as="div"
                                        className={'flex px-2 py-2 text-sm text-gray-700'}
                                    >
                                        <ExclamationTriangleIcon className="mr-2 h-10 w-10 text-rose-300" aria-hidden="true" />
                                        You must be signed save threads!
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    )
}