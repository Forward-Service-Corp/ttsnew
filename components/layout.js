import {Fragment, useEffect, useState} from 'react'
import {signOut} from "next-auth/react"
import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {useRouter} from "next/router";
import {UserCircle} from "phosphor-react";
import styles from "../styles/layout.module.css"
import SimpleModal from "./simpleModal";
import Image from "next/image";
import SubNav from "./subNav";

const navigation = [
    {name: 'Dashboard', href: '/', current: true},
    {name: 'Dreams', href: '/dreams', current: false},
    {name: 'Life Area Surveys', href: '/life-area-surveys', current: false},
    {name: 'CARE Plans', href: '/care-plans', current: false},
    {name: 'The Journey', href: '/journey', current: false},
    {name: 'CARE Network', href: '/directory', current: false},
]
const userNavigation = [
    {name: 'Your Profile', href: '/profile'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({children, title, session, loadingState, version, simpleModalTitle, simpleModalMessage, simpleModalLabel, simpleModal, background}) {
    const router = useRouter()
    const [environment, setEnvironment] = useState("production")
    const [darkMode] = useState(null)

    // console.log(session)
    const handleLogout = async () => {
        await signOut().then()
        await router.push('/login')
    }

    const handleDeleteUser = async () => {
        const makeSure = confirm("Are you sure you want to delete this user?")
        if (makeSure) {
            const deletingUser = await fetch(`/api/delete-user?userId=${session.user._id}`)
                .then(res => res.json())
            await signOut().then()
            await console.log(deletingUser)
        }
    }

    async function updateLastLogin() {
        await fetch(`/api/save-last-login?userId=${session?._id}`)
            .then(res => res.json())
    }

    useEffect(() => {
        const now = new Date();
        const lastLoginTime = new Date(session?.lastLogin); // Convert lastLogin to a Date object

        // Calculate the time difference in milliseconds
        const timeDifference = now - lastLoginTime;

        // Convert milliseconds to hours
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        // Check if the lastLogin is within 12 hours
        if (hoursDifference < 12) {
            return;
        }
        updateLastLogin().then()
    }, [])

    useEffect(() => {
        const location = window.location.host
        if(location.indexOf("localhost") > -1){
            setEnvironment("dev")
        }else if(location.indexOf("-test") > -1){
            setEnvironment("testing")
        }else if(location.indexOf("-training")){
            setEnvironment("training")
        }
    }, [environment])

    return (
        <>
            {/*<div className={`${environment === "dev" || environment === "testing" || environment === "training" ? "visible" : "hidden"} ${environment === "testing" ? "bg-indigo-600" : "bg-pink-600"} p-4 text-center text-xs text-white font-light`}>*/}
            {/*    You are currently in the <strong className={`uppercase font-black`}>{environment}</strong> environment.*/}
            {/*</div>*/}
            {simpleModal ? <SimpleModal title={simpleModalTitle} message={simpleModalMessage} label={simpleModalLabel}
                          version={version}/> : null}
            <div
                className={`fixed w-full h-full bg-gray-600 bg-opacity-50 flex align-middle justify-center ${loadingState ? "visible" : "hidden"}`}>
                <div className={"uppercase text-white self-center rounded-full p-5 bg-orange-600 shadow"}>loading...
                </div>
            </div>

            <div id={`layoutBannerContainer`} className={`min-h-full ${darkMode === 'darkTheme' ? styles.darkTheme : styles.lightTheme}`}>
                <div
                    className={`${session?.isYouth || version ? styles.youthVersion : styles.adultVersion} pb-32 print:hidden`}>
                    <Disclosure as="nav" className="bg-[#db5839] shadow-lg">
                        {({open}) => (
                            <>
                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                        <div className="flex items-center h-16 px-4 sm:px-0">
                                            <div className="flex items-center justify-between w-full">
                                                <div className={'flex'}>
                                                    <div className="w-[80px] h-[50px] relative">
                                                        <Image
                                                            sizes="(max-width:70px) 30vw, (max-width: 70px) 20vw, 10vw"
                                                            fill
                                                            src="/img/tts-logo.png"
                                                            alt="Workflow"/>
                                                    </div>
                                                    <div className="w-[60px] h-[50px] relative ml-3">
                                                        <Image
                                                            sizes="(max-width:70px) 30vw, (max-width: 70px) 20vw, 10vw"
                                                            fill
                                                            src="/img/fsc-logo.png"
                                                            alt="Workflow" priority={true}/>
                                                    </div>
                                                </div>
                                                {/*<div className="flex-shrink-0 ml-3 visible md:hidden">*/}
                                                {/*    <a onClick={() => signOut()}*/}
                                                {/*       className={"ml-16 px-3 py-2 text-white rounded border"}>Logout</a>*/}
                                                {/*</div>*/}
                                                <div className="hidden md:block">
                                                    <div className="flex items-right space-x-4">
                                                        {navigation.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className={classNames(
                                                                    router.pathname === item.href
                                                                        ? 'bg-black bg-opacity-10 text-white'
                                                                        : 'text-white hover:bg-orange-400 hover:text-white',
                                                                    'px-3 py-2 rounded text-sm font-extralight'
                                                                )}
                                                                aria-current={item.current ? 'page' : undefined}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="-mr-2 flex md:hidden">
                                                {/* Mobile menu button */}
                                                <Disclosure.Button
                                                    className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">Open main menu</span>
                                                    {open ? (
                                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                                    ) : (
                                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                                    )}
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                </div>

                                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                                    <div className="px-2 py-3 space-y-1 sm:px-3">
                                        {navigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    router.pathname === item.href ? 'bg-orange-700 text-white dark:bg-purple-800' : 'text-white hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                    <div className="pt-4 pb-3 border-t border-gray-700">
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0 w-[45px] h-[45px] relative">
                                                {session?.image ?
                                                    <Image className="rounded-full" src={session.image}
                                                           sizes="(max-width:45px) 3vw, (max-width: 45px) 10vw, 5vw"
                                                           fill
                                                           alt="Mobile avatar"/> :
                                                    <UserCircle size={32} weight="thin" color={"white"}/>}
                                            </div>
                                            <div className="ml-3">
                                                <div
                                                    className="text-base font-medium leading-none text-white">{session?.name}</div>
                                                <div
                                                    className="text-sm font-medium leading-none text-white">{session?.email}</div>
                                            </div>
                                        </div>
                                        <div className="mt-3 px-2 space-y-1">
                                            {userNavigation.map((item) => (
                                                <Disclosure.Button
                                                    key={item.name}
                                                    as="a"
                                                    href={item.href}
                                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            ))}

                                            <Disclosure.Button
                                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                                                onClick={() => {
                                                    signOut()
                                                        .then(() => {
                                                            router.reload()
                                                        })
                                                }}
                                            >
                                                Sign Out
                                            </Disclosure.Button>

                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                    <SubNav session={session} environment={environment} handleLogout={handleLogout} />
                    <header className="py-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <span className="text-4xl font-extralight text-white dark:text-gray-400">{title}</span>
                            <p className={`mt-0 text-white font-extralight uppercase text-sm`}>{session?.isYouth || version ? "Youth Workbook" : "Adult Workbook"}</p>
                        </div>
                    </header>
                </div>

                <main className="-mt-32 print:mt-0">
                    <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                        <div
                            className={`${background === false ? '' : 'bg-white shadow px-5 py-6 sm:px-6'} print:px-0 print:py-0 print:shadow-none`}>
                                {children}
                            </div>
                    </div>
                </main>
            </div>
            <div className={"p-4 bg-gray-600 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-4 text-white text-sm  font-light"}>
                <div className={"text-center"}>Map of My Dreams Web Application</div>
                <div className={"text-center"}>Forward Service Corporation &copy; 2024</div>
                <div className={"text-center"}>
                    <a href={"/disclaimer"}
                       target={"_self"}
                       rel={"noreferrer"}
                       className={"text-orange-300 underline"}>
                        Data Usage Disclaimer
                    </a>
                </div>
                <div className={"text-center"}>
                    <a href={"https://fsc-support.zendesk.com/hc/en-us/requests/new?ticket_form_id=9189050108308"}
                       target={"_blank"}
                       rel={"noreferrer"}
                       className={"text-orange-300 underline"}>
                        Feedback: Let us know how we&apos;re doing!
                    </a>
                </div>
            </div>
        </>
    )
}
