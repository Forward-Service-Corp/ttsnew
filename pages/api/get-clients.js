import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    const {db} = await connectToDatabase()
    const coachObjectId = new ObjectId(req.query.coachId);
    const cursor = await db.collection("users").find({
        coach: {
            $elemMatch: { key: coachObjectId }
        }
    })
    const records = await cursor.toArray()
    await cursor.close()

    res.json(records)

}
