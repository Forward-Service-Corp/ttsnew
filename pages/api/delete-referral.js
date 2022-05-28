import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb"

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const referralToDelete = {
       _id: ObjectId(req.query.referralId)
    }

    const tasksToDelete = {
        referralId: req.query.referralId
    }

    const {db} = await connectToDatabase()
    const referral = await db
        .collection("referrals")
        .remove(referralToDelete)

    const tasks = await db
        .collection("todos")
        .remove(tasksToDelete)

    res.json(referral, tasks)

}
