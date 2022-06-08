import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    let county, domain
    if(req.query.county.indexOf(",") > -1){
        county = req.query.county.split(",")
    }else{
        county = req.query.county.split(" ")
    }

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
    const referrals = await db.collection("services").find(q).toArray()

    res.json({referrals, domains: domain})

}
