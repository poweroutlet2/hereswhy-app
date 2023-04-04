import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDoubleDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const people = [
    "Today",
    "Week",
    "Month",
    "Year"
]


export function TimeDropdown() {
    const [selected, setSelected] = useState(people[0])

    return (
        <div className="w-18 ml-2">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg text-2xl bg-white bg-opacity-5 -mt-3 py-2 pl-3 pr-10 text-left hover:cursor-pointer hover:bg-opacity-10 shadow-md">
                        <span className="block truncate">{selected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-black/20 dark:bg-white/10 backdrop-blur-xl py-1 text-base shadow-lg">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 hover:cursor-pointer pl-10 pr-4 ${active ? 'bg-white bg-opacity-10 text-gray-100' : 'text-white dark:text-gray-200'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox >
        </div >
    )
}
