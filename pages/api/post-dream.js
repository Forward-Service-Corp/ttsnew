import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const record = {
        dream: req.body.dream,
        dreamNeed: req.body.dreamNeed,
        dreamHelp: req.body.dreamHelp,
        userId: req.body.userId
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("dreams")
        .insertOne(record)

    res.json(user)

}