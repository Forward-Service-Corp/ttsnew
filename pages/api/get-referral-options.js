import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    let county, domain
    // if(req.query.county.indexOf(",") > -1){
    //     county = req.query.county.split(",")
    // }else{
    //     county = req.query.county.split(" ")
    // }
    county = req.query.county.split(",")

    if(req.query.domain.indexOf(",") > -1){
        domain = req.query.domain.split(",")
    }else{
        domain = req.query.domain.split(" ")
    }

    let q = {
        name: {$exists: true},
        county: {
            $in: county
        },
        service: {
            $in: domain
        }
    }


    const {db} = await connectToDatabase()
    const cursor = await db.collection("services").find(q)
    const records = await cursor.toArray()
    await cursor.close()

    res.json({referrals: records, domains: domain})

}
