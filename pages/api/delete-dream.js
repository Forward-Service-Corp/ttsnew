import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const q = {
        _id: ObjectId(req.query.dreamId)
    }

    const {db} = await connectToDatabase()
    const dream = await db.collection("dreams").findOne(q)
    const userSearch = await db.collection("users").findOne({_id: dream.userId});
    await db.collection("dreams").deleteOne(q)
    const updatedDreams = await db.collection("dreams").find({userId: userSearch._id}).toArray();

    res.json(updatedDreams)

}
