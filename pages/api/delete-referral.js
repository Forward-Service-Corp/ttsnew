import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb"

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()

    const referral = await db.collection("referrals").remove({_id: ObjectId(req.query.referralId)})
    const tasks = await db.collection("todos").remove({"referralId": req.query.referralId})
    const notes = await db.collection("notes").remove({"referralId" : req.query.referralId})

    res.json(referral, tasks, notes)

}
