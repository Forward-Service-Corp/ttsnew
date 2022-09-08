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
                        className={"py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>
                        Add to my CARE Plan
                    </button>
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
                {/*column 1*/}
                <div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Name</p>
                        <div>{referralDataJson.name || <span className={"text-gray-500"}>No name listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Email</p>
                        <div>{<a href={`mailto:${referralDataJson.contactEmail}`} className={"underline text-orange-500"}>{referralDataJson.contactEmail}</a> || <span className={"text-gray-500"}>No email listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Phone</p>
                        <div>{referralDataJson.contactPhone || <span className={"text-gray-500"}>No phone number listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Contact</p>
                        <div>{referralDataJson.contactName || <span className={"text-gray-500"}>No contact name listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Hours</p>
                        <div>{referralDataJson.hours || <span className={"text-gray-500"}>No contact name listed</span>}</div>
                    </div>
                </div>
                {/*column 2*/}
                <div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Address</p>
                        <div>{referralDataJson.street || <span className={"text-gray-500"}>No address listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>City</p>
                        <div>{referralDataJson.city || <span className={"text-gray-500"}>No city listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>County</p>
                        <div>{referralDataJson.county || <span className={"text-gray-500"}>No county listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>State</p>
                        <div>{referralDataJson.state || <span className={"text-gray-500"}>No zip code listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Zip</p>
                        <div>{referralDataJson.zip || <span className={"text-gray-500"}>No state listed</span>}</div>
                    </div>
                </div>
                {/*column 3*/}
                <div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Website</p>
                        <div className={"truncate"}>{<a target={"_blank"} rel={"noreferrer"} className={"text-orange-500 underline"} href={referralDataJson.url}>Visit website</a> || <span className={"text-gray-500"}>No website listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Requirements</p>
                        <div>{referralDataJson.requirements || <span className={"text-gray-500"}>No requirements listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Need to bring</p>
                        <div>{referralDataJson.needs || <span className={"text-gray-500"}>No items to bring listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>UID</p>
                        <div>{referralDataJson._id}</div>
                    </div>
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
