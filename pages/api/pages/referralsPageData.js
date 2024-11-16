import {connectToDatabase} from "../../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()
    const user = await db.collection("users").findOne({_id: ObjectId(req.query.userId)})
    const query = { userId: ObjectId(req.query.userId) }

    const referralsCursor = await db.collection("referrals").find( query )
    const referrals = await referralsCursor.toArray()
    await referralsCursor.close()

    res.json({user, referrals})

}
