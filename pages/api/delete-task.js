import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb"

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const q = {
       _id: ObjectId(req.query.taskId)
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("todos")
        .remove(q)

    res.json(user)

}
