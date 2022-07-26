import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";
import Head from "next/head";
import ServicesTable from "../components/servicesTable";
import {WICountiesList} from "../lib/WI_Counties";
import {labelMap} from "../lib/serviceLabelsMap";

export default function Directory({pageDataJson}) {

    const {user, services} = pageDataJson
    const [loadedServices, setLoadedServices] = useState([])
    const [keyword, setKeyword] = useState("")
    const [domain, setDomain] = useState("")
    const [county, setCounty] = useState("")
    const domains = Object.keys(labelMap)

    async function search(){
        console.log("searching...")
        const fetchSearch = await fetch("/api/search-directory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({keyword,domain,county})
        }).then(res => res.json())
        await setLoadedServices(fetchSearch)
    }

    return (
        <Layout title={"Care Network"} session={user}>
            <Head>
                <title>TTS / Directory</title>
            </Head>

            <div className={" p-3 bg-gray-200 rounded shadow"}>
                <form className={"grid grid-cols-1 md:grid-cols-4 gap-4 items-end"} onSubmit={(e) => {
                    e.preventDefault()
                    search().then()
                }}>
                    <div className={""}>
                        <p className={"text-xs text-gray-500"}>Search by keyword</p>
                        <input className={"w-full"} id={"searchField"} type={"text"} value={keyword} onChange={(e) => {
                            setKeyword(e.target.value)
                        }}/>
                    </div>
                    <div className={""}>
                        <p className={"text-xs text-gray-500"}>Search by domain</p>
                        <select id={"domainSelect"} className={"w-full"} onChange={(e) => {
                            setDomain(e.target.value)
                        }}>
                            <option value={""}></option>
                            {domains.map(domain => <option key={domain} value={domain}>{labelMap[domain]}</option>)}
                        </select>
                    </div>
                    <div className={""}>
                        <p className={"text-xs text-gray-500"}>Search by county</p>
                        <select className={"w-full"} id={"countySelect"} onChange={(e) => {
                            setCounty(e.target.value)
                        }}>
                            <option value={""}></option>
                            {WICountiesList.map(county => <option value={county} key={county}>{county}</option>)}
                        </select>
                    </div>
                    <div className={"flex items-center"}>
                        <button type={"submit"}
                                className={"py-2 px-6 mr-2 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>Search
                        </button>
                        <button type={"reset"}
                                className={"py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}
                        onClick={() => {
                            setKeyword("")
                            setDomain("")
                            setCounty("")
                            setLoadedServices([])
                        }}>Reset
                        </button>
                    </div>
                </form>
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

