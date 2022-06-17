import Layout from "../../components/layout";
import {getSession} from "next-auth/react";

export default function CarePlan({pageDataJson, referralDataJson}) {

    const {user} = pageDataJson

    return (
        <Layout title={referralDataJson.name} session={user}>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
                {/*column 1*/}
                <div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Name</p>
                        <div>{referralDataJson.name || <span className={"text-gray-500"}>No name listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Email</p>
                        <div>{referralDataJson.contactEmail || <span className={"text-gray-500"}>No email listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Phone</p>
                        <div>{referralDataJson.contactPhone || <span className={"text-gray-500"}>No phone number listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>Contact</p>
                        <div>{referralDataJson.contactName || <span className={"text-gray-500"}>No contact name listed</span>}</div>
                    </div>
                </div>
                {/*column 2*/}
                <div>
                    <div>
                        <p className={"text-xs text-gray-500"}>City</p>
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
                        <p className={"text-xs text-gray-500"}>Zip</p>
                        <div>{referralDataJson.state || <span className={"text-gray-500"}>No zip code listed</span>}</div>
                    </div>
                    <div>
                        <p className={"text-xs text-gray-500"}>State</p>
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
