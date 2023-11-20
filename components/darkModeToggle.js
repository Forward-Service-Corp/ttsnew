import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DarkModeToggle({setDarkMode, session}) {
    const defaultDarkModeSetting = localStorage.theme === undefined || localStorage.theme === 'light'
    const [enabled, setEnabled] = useState(!defaultDarkModeSetting)

    async function handleToggle(){
        await fetch(`/api/save-appearance-preference?appearance=${enabled === true ? "dark" : "light"}&userId=${session._id}`)
            .then(res => res.json())
            .catch(err => console.warn(err))
        await setEnabled((prev) => !prev)
        document.documentElement.classList.toggle('dark')
        if(!localStorage.theme || localStorage.theme === "light"){
            localStorage.theme = 'dark'
            setDarkMode('darkTheme')
        }else{
            localStorage.theme = 'light'
            setDarkMode('lightTheme')
        }
    }

    return (
        <Switch
            checked={enabled}
            onChange={handleToggle}
            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:focus:ring-orange-300"
        >
            <span className="sr-only">Use setting</span>
            <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white dark:bg-gray-800" />
            <span
                aria-hidden="true"
                className={classNames(
                    enabled ? 'bg-indigo-600 dark:bg-orange-200' : 'bg-gray-200',
                    'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                )}
            />
            <span
                aria-hidden="true"
                className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white dark:bg-orange-600 shadow ring-0 transition-transform duration-200 ease-in-out'
                )}
            />
        </Switch>
    )
}
