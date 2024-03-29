'use client';
import { useRouter } from "next/router"
import { useState } from "react"

export default function Searchbar() {
    const [term, setTerm] = useState('')
    const router = useRouter()

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push({
            pathname: '/search',
            query: { 'term': term }
        })
    }

    return (
        <form onSubmit={handleSearchSubmit}>
            <div className="relative mx-auto text-gray-600">
                <input
                    className="mt-2 sm:mt-0 bg-white dark:bg-slate-800 dark:text-slate-300 h-10 sm:float-right sm:focus:w-full duration-100 sm:w-3/4 w-full px-5 pr-10 rounded-lg text-sm focus:outline-none"
                    type="search"
                    placeholder="Search"
                    onChange={e => { setTerm(e.currentTarget.value); }}
                />
                <button type="submit" className="absolute right-0 top-0 sm:-top-2 mt-5 mr-4">
                    <svg className="text-gray-600 hover:text-gray-900 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                        x="0px" y="0px"
                        viewBox="0 0 56.966 56.966"
                        width="512px" height="512px">
                        <path
                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </button>
            </div>
        </form>
    )
}