import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const {db} = await connectToDatabase()
    const dream = await db
        .collection("todos")
        .updateOne(
            { _id: ObjectId(req.query.taskId) },
            {
                $set: {
                    completed: req.query.setTo
                }
            }
        )

    res.status(200).json({message: "Task was updated successfully.", dream: dream})
}
