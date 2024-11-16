import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const record = {
        dream: req.body.dream,
        dreamNeed: req.body.dreamNeed,
        dreamHelp: req.body.dreamHelp,
        userId: ObjectId(req.body.userId),
        status: req.body.status,
        timestamp: new Date()
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("dreams")
        .insertOne(record)

    res.json(user)

}
