import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb"

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const record = {
       _id: ObjectId(req.body.id)
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("dreams")
        .remove(record)

    res.json(user)

}