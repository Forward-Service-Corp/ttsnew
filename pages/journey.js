import React, {useState} from 'react';
import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Welcome1 from "../components/pages/welcome1";
import Welcome2 from "../components/pages/welcome2";
import Journey1 from "../components/pages/journey1";
import Journey2 from "../components/pages/journey2";

function Journey({pageDataJson}) {

    const {user, services} = pageDataJson
    const [currentTab, setCurrentTab] = useState(1)

    return (
        <Layout title={"The Journey"} session={user}>
            <div className={"flex justify-between"}>
                <button disabled={currentTab === 1}
                        className={"py-2 px-6 mr-2 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}
                        onClick={() => {
                            setCurrentTab(1)
                        }}>Previous
                </button>
                <button disabled={currentTab === 2}
                        className={"py-2 px-6 mr-2 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}
                        onClick={() => {
                            setCurrentTab(2)
                        }}>Next
                </button>
            </div>
            <div className={currentTab === 1 ? "visible" : "hidden"}>
                <Journey1/>
            </div>
            <div className={currentTab === 2 ? "visible" : "hidden"}>
                <Journey2/>
            </div>
        </Layout>
    );
}

export default Journey;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    return {
        props: {pageDataJson}
    }

}
