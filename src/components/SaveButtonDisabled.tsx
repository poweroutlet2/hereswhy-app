import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Fragment } from "react"

export function SaveButtonDisabled() {
    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                    <>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            {/* <div className="hidden md:flex">
                                Save to...
                                <ChevronDownIcon
                                    className="ml-2 -mr-1 h-5 w-5 text-white"
                                    aria-hidden="true"
                                />
                            </div> */}
                            <div className="-mt-[.65rem] -mr-5">
                                {/* <PlusCircleIcon className="h-8 w-8 -mt-2 -mr-5 text-gray-200 hover:text-gray-300 active:text-gray-400" /> */}
                                <div className="w-10 h-10 rounded-lg fill-gray-300 hover:bg-slate-700 active:bg-slate-300 active:fill-slate-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M120 726v-60h300v60H120Zm0-165v-60h470v60H120Zm0-165v-60h470v60H120Zm530 500V726H480v-60h170V496h60v170h170v60H710v170h-60Z" /></svg>
                                </div>
                            </div>
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
                                        Sign up to start saving threads!
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