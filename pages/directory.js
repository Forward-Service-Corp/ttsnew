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
    const [searched, setSearched] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [domain, setDomain] = useState("")
    const [county, setCounty] = useState("")
    const domains = Object.keys(labelMap)
    const [searching, setSearching] = useState(false)

    async function search() {
        setSearching(true)
        const fetchSearch = await fetch("/api/search-directory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({keyword, domain, county})
        }).then(res => res.json())
        await setSearching(false)
        await setLoadedServices(fetchSearch)
    }

    return (
        <Layout title={"CARE Network"} session={user}>
            <Head>
                <title>TTS / CARE Network</title>
            </Head>

            <div className={" p-3 bg-gray-100 rounded shadow"}>
                <form className={"grid grid-cols-1 md:grid-cols-4 gap-4 items-end"} onSubmit={(e) => {
                    e.preventDefault()
                    search().then()
                }}>
                    <div className={""}>
                        <p className={"text-xs text-gray-500"}>Search by keyword</p>
                        <input className={"w-full rounded border-gray-300 text-xs"} id={"searchField"} type={"text"}
                               value={keyword} onChange={(e) => {
                            setKeyword(e.target.value)
                        }}/>
                    </div>
                    <div className={""}>
                        <p className={"text-xs text-gray-500"}>Search by domain</p>
                        <select id={"domainSelect"} className={"w-full rounded border-gray-300 text-xs"}
                                onChange={(e) => {
                                    setDomain(e.target.value)
                                }}>
                            <option value={""}></option>
                            {domains.map(domain => <option key={domain} value={domain}>{labelMap[domain]}</option>)}
                        </select>
                    </div>
                    <div className={""}>
                        <p className={"text-xs text-gray-500"}>Search by county</p>
                        <select className={"w-full rounded border-gray-300 text-xs"} id={"countySelect"}
                                onChange={(e) => {
                                    setCounty(e.target.value)
                                }}>
                            <option value={""}></option>
                            {WICountiesList.map(county => <option value={county} key={county}>{county}</option>)}
                        </select>
                    </div>
                    <div className={"flex items-center"}>
                        <button type={"submit"}
                                className={"py-[6px] px-6 mr-2 text-white  text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"}
                                onClick={() => {
                                    setSearched(true)
                                }}>Search
                        </button>
                        <button type={"reset"}
                                className={"py-[6px] px-6 text-white  text-xs bg-red-500 hover:bg-red-600 disabled:bg-gray-400"}
                                disabled={keyword === "" && domain === "" && county === ""}
                                onClick={() => {
                                    setKeyword("")
                                    setDomain("")
                                    setCounty("")
                                    setLoadedServices([])
                                    setSearched(false)
                                }}>Reset
                        </button>
                    </div>
                </form>
            </div>
            <div className={`rounded bg-green-100 p-2 text-xs text-center mt-4 ${searching ? "visible" : "hidden"}`}>
                Searching...
            </div>
            <div className={`text-center p-4 ${searched ? "visible" : "hidden"}`}>
                {loadedServices.length === 0 ? "There were no results" : loadedServices.length + " results"}
            </div>
            <div className={`text-center p-4 ${!searched ? "visible" : "hidden"}`}>
                Please enter your search criteria.
            </div>
            {loadedServices.length > 0 ? <ServicesTable services={loadedServices}/> : null}

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

