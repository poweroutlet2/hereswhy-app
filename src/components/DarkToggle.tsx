import { Switch } from "@headlessui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
	const [enabled, setEnabled] = useState(false)
	const { theme, setTheme } = useTheme()
	useEffect(() => {
		enabled ? setTheme('dark') : setTheme('light')
	}, [enabled])

	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className={`${enabled ? 'bg-gray-200' : 'bg-gray-200'
				} relative inline-flex h-10 w-11 items-center rounded-full`}
		>
			<span className="sr-only">Enable notifications</span>
			<div className="relative flex">
				<SunIcon className={`absolute z-20 w-6 -top-3 left-[.45rem] dark:hidden`} />
				<MoonIcon className={`absolute z-20 w-5 left-[.85rem] -top-[.60rem] hidden dark:block`} />
			</div>
			<span
				className={`${enabled ? 'translate-x-2' : 'translate-x-1'
					} inline-block h-8 w-8 transform rounded-full bg-slate-500 transition`}
			/>
		</Switch>
	)
}