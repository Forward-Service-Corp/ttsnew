import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Link from "next/link"
import {useEffect, useState} from "react";
import Head from "next/head";
import ServicesTable from "../components/servicesTable";

export default function Directory({pageDataJson}) {

    const {user, services} = pageDataJson
    const paginationButtons = ["123", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const [loadedServices, setLoadedServices] = useState(services.slice(0, 25))

    return (
        <Layout title={"Directory"} session={user}>
            <Head>
                <title>TTS / Directory</title>
            </Head>
            <div className={"ml-8 mb-3"}>
                <select className={"rounded"} onChange={(e) => {
                    setLoadedServices(services.filter(service => {
                        if(e.target.value === "123"){
                            return services.slice(0,25)
                        }else{
                            return service.name.split("")[0] === e.target.value
                        }
                    }))
                }}>
                    {paginationButtons.map(button => (
                        <option key={button} value={button}>{button}</option>
                    ))}
                </select>
            </div>
            <ServicesTable services={loadedServices}/>
        </Layout>
    )
}

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

