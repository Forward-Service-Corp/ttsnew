"use client"

import {Fragment, useEffect, useState} from 'react'
import {useRouter} from "next/navigation";
import ProfileDetailsWarningModal from "/components/profileDetailsWarningModal.js";
import styles from "/styles/Layout.module.scss"
import SimpleModal from "/components/simpleModal";
import EnvironmentBanner from "../../newComponents/environmentBanner";
import Navigation from "../../newComponents/navigation";
import {useSession} from "next-auth/react";



export default function Layout({children, title, session, simpleModalTitle, simpleModalMessage, simpleModalLabel, simpleModal}) {
    const router = useRouter()
const version = 'darkTheme'
    const [darkMode, setDarkMode] = useState(null)
    const [sessionData, setSessionData] = useState({})
    const [pageData, setPageData] = useState({user: null, dreams: null, surveys: null, referrals: null, tasks: null})

    useEffect(() => {
        const { session: session, status } = useSession()
        const loading = status === "loading"
        setSessionData(session)
    }, [])

    useEffect(() => {
        const value = localStorage.theme
        let currentTheme = value !== undefined && value === 'dark' ? 'darkTheme' : 'lightTheme'

        setDarkMode(currentTheme)
    }, []);




    return (
        <>
            <EnvironmentBanner/>
            {simpleModal ? <SimpleModal title={simpleModalTitle} message={simpleModalMessage} label={simpleModalLabel}
                                        version={version}/> : null}

            {/*{router.pathname !== "/profile" && router.pathname !== "/" && router.pathname !== "/directory" ?*/}
            {/*    <ProfileDetailsWarningModal session={session}/> : null}*/}

            <div id={`layoutBannerContainer`} className={`min-h-full ${darkMode === 'darkTheme' ? styles.darkTheme : styles.lightTheme}`}>
                <div className={`${sessionData.session && sessionData.session.isYouth || version ? styles.youthVersion : styles.adultVersion} pb-32 print:hidden`}>
                    <Navigation/>
                    <header className="py-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-xl font-black text-white dark:text-gray-400">{title}</h1>
                            {/*<p className={`mt-0 text-white`}>{sessionData.session.isYouth || version ? "Youth Workbook" : "Adult Workbook"}</p>*/}
                        </div>
                    </header>
                </div>

                <main className="-mt-32 print:mt-0">
                    <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                        <div
                            className="bg-white dark:bg-gray-900 shadow px-5 py-6 sm:px-6 print:px-0 print:py-0 print:shadow-none">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
            {/*footer here */}
        </>
    )
}
