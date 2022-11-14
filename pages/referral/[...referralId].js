import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";
import Head from "next/head";

export default function ReferralId({pageDataJson, referralDataJson}) {

    const {user, referrals} = pageDataJson
    const [userReferrals, setUserReferrals] = useState(referrals)

    async function saveReferral() {
        await fetch("/api/save-referral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                surveyId: null,
                userId: user.email,
                dream: null,
                domain: referralDataJson.service,
                name: referralDataJson.name,
                email: referralDataJson.contactEmail,
                phone: referralDataJson.contactPhone,
                hours: referralDataJson.hours,
                requirements: referralDataJson.requirements,
                url: referralDataJson.url,
                contact: referralDataJson.contactName,
                needs: referralDataJson.needs
            })
        })
    }

    async function getReferrals () {
        const fetchReferrals = await fetch("/api/get-referrals?userId=" + user.email)
            .then(res => res.json())
            .catch(err => console.warn(err.json()))
        setUserReferrals(fetchReferrals)
    }

    const textInfoJSX = (data, label) => {
        return (
            <div>
                <p className={"text-xs text-gray-500 capitalize"}>{label}:</p>
                <div>{data || <span className={"text-gray-500"}>{`No ${label} listed`}</span>}</div>
            </div>
        )
    }

    const textEmailJSX = (data, label) => {
        if(data){
            return (
                <div>
                    <p className={"text-xs text-gray-500 capitalize"}>{label}:</p>
                    <div>{<a href={`mailto:${data}`} className={"underline text-orange-500"}>
                        {data}</a> || <span className={"text-gray-500"}>No {label} listed</span>
                    }</div>
                </div>
            )
        }else{
            return (
                <div>
                    <p className={"text-xs text-gray-500 capitalize"}>{label}</p>
                    <div><span className={"text-gray-500"}>No {label} listed</span></div>
                </div>
            )
        }
    }

    const textWebsiteJSX = (data, label) => {
        if(data){
            return (
                <div>
                    <p className={"text-xs text-gray-500"}>Website</p>
                    <div className={"truncate"}>{<a target={"_blank"} rel={"noreferrer"} className={"text-orange-500 underline"} href={data}>Visit website</a>}</div>
                </div>
            )
        }else{
            return (
                <div>
                    <p className={"text-xs text-gray-500"}>Website</p>
                    <div className={"truncate"}>{<span className={"text-gray-500"}>No {label} listed</span>}</div>
                </div>
            )
        }
    }

    return (
        <Layout title={referralDataJson.name} session={user}>
            <Head>
                <title>{referralDataJson.name}</title>
            </Head>
            <div className={"flex justify-between items-center"}>
                <div className={"text-xs text-red-600"}>
                    {userReferrals.filter(referral => referral.name === referralDataJson.name).length > 0 ? "This referral is currently in your CARE Plan." : null}
                </div>
                <div>
                    <button
                        disabled={userReferrals.filter(referral => referral.name === referralDataJson.name).length > 0}
                        onClick={() => {
                            saveReferral().then(getReferrals)
                        }}
                        className={"py-2 px-6 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"}>
                        Add to my CARE Plan
                    </button>
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
                {/*column 1*/}
                <div>
                    {textInfoJSX(referralDataJson.phone, "phone")}
                    {textInfoJSX(referralDataJson.hours, "hours")}
                    {textWebsiteJSX(referralDataJson.url, "website")}
                    {textInfoJSX(referralDataJson.requirements, "requirements")}
                    {textInfoJSX(referralDataJson.needs, "need to bring")}
                </div>
                {/*column 2*/}
                <div>
                    {textInfoJSX(referralDataJson.street, "street")}
                    {textInfoJSX(referralDataJson.city, "city")}
                    {textInfoJSX(referralDataJson.county, "county")}
                    {textInfoJSX(referralDataJson.state, "state")}
                    {textInfoJSX(referralDataJson.zip, "zip code")}
                </div>
                {/*column 3*/}
                <div>
                    {textInfoJSX(referralDataJson.contactName, "contact person")}
                    {textInfoJSX(referralDataJson.contactPhone, "contact person phone")}
                    {textEmailJSX(referralDataJson.contactEmail, "contact person email")}
                </div>
            </div>
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

    // single referral
    const referralDataUrl = baseUrl + "/api/get-single-referral?referralId=" + context.query.referralId
    const getReferralData = await fetch(referralDataUrl)
    const referralDataJson = await getReferralData.json()

    return {
        props: {pageDataJson, referralDataJson}
    }

}
