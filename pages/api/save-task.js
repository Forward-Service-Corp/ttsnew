import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const record = {
        referralId: req.body.referralId,
        userId: req.body.userId,
        task: req.body.task,
        timestamp: req.body.timestamp,
        completed: false
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("todos")
        .insertOne(record)

    res.json(user)

}
