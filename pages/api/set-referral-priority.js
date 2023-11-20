import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {db} = await connectToDatabase()
    const record = await db
        .collection("referrals")
        .updateOne(
            { _id: ObjectId(req.query.referralId) },
            {
                $set: {
                    priority: req.query.priority
                }
            }
        )
    res.json(record)

}
