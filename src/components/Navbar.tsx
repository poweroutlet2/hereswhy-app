import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import Searchbar from './Searchbar'
import { signIn, signOut, useSession } from 'next-auth/react'
import DarkToggle from './DarkToggle'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Lists', href: '/lists', current: false }
  //{ name: 'Authors', href: '/authors', current: false }
]

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <Disclosure as="nav" className="w-full bg-gray-100 dark:bg-slate-900 dark:text-white border-b-2 dark:border-slate-800 p-1 sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center sm:hidden w-28 sm:w-fit">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-start rounded-md p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link passHref href='/'>
                    <div className='flex flex-col sm:flex-row text-xl sm:text-3xl font-black text-center text-gray-600 dark:text-gray-200'>
                      <h1>{`here's`}</h1>
                      <h1 className='-mr-1 -mt-2 sm:mt-0 sm:ml-1 '>{`why 👇`}</h1>
                    </div>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={
                          `px-3 py-2 rounded-md text-sm font-medium ${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                        }
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:pr-0">
                <div className="hidden sm:flex sm:justify-center">
                  <Searchbar />
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative flex justify-end">
                  <div className='flex w-28 sm:w-fit justify-end'>
                    {/* Display sign in button/profile picture depenging if user is signed in. 
                                        Loading spinner if authentication is loading */}
                    {!session && (status == 'unauthenticated') && <>
                      <button
                        type="button"
                        onClick={() => signIn("google")}
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-4 py-2.5 sm:ml-5 bg-blue-500  font-medium text-xs leading-tight rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out"
                      >Sign in with Google
                      </button>
                    </>}
                    {(status == 'loading') && <>
                      <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-4 py-2.5 sm:ml-5 bg-blue-500  font-medium text-xs leading-tight rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        <div className="lds-dual-ring mb-0.5 mr-1"></div>
                      </button>
                    </>}
                    {session?.user?.image && <>
                      <Menu.Button className={`${session.user ? '' : 'hidden'} flex rounded-full text-sm sm:ml-4 hover:shadow-lg hover:ring-gray-300 active:ring-blue-500 active:ring-2 transition duration-100 ease-in-out`}>
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-12 w-12 min-w-max rounded-full"
                          src={session.user?.image}
                          width={40}
                          height={40}
                          alt="profile_picture"
                        />
                      </Menu.Button>
                    </>}
                  </div>
                  <div className='ml-2 hidden sm:flex'>
                    <DarkToggle />
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-11 w-48 origin-top-right rounded-md bg-white py-1 shadow-xl ring-2 ring-blue-500 ring-opacity-10 focus:outline-none">
                      <Menu.Item>
                        <div
                          className={'hover:bg-gray-100 hover:cursor-pointer block px-4 py-2 text-sm text-gray-700'}
                          onClick={() => signOut()}
                        >
                          Sign out
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <DarkToggle />
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium
                                        ${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                                        
                                    `}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Searchbar />
            </div>
          </Disclosure.Panel>
        </>
      )
      }
    </Disclosure >
  )
}
