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
    <Disclosure as="nav" className="sticky top-0 z-40 w-full h-18 bg-inherit dark:bg-slate-900 dark:text-white border-b-2 dark:border-slate-800 p-1 ">
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
