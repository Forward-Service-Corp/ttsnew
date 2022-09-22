import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    const {db} = await connectToDatabase()
    const cursor = await db.collection("dreams")
        .find({
            userId: req.query.userId,
            status: req.query.status === undefined ? {$exists: true} : req.query.status
        })
    const records = await cursor.toArray()
    await cursor.close()

    res.json(records)

}
