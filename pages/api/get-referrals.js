import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const q = {
        userId: req.query.userId
    }

    const {db} = await connectToDatabase()
    const dreams = await db
        .collection("referrals")
        .find(q)
        .toArray()


    res.json(dreams)

}
