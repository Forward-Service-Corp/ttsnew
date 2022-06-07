import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb"

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const q = {
       _id: ObjectId(req.query.taskId)
    }

    const {db} = await connectToDatabase()
    const todos = await db
        .collection("todos")
        .remove(q)

    const notes = await db.collection("notes").remove({"taskId" : req.query.taskId})

    res.json(todos, notes)

}
