import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {db} = await connectToDatabase()
    const record = await db
        .collection("users")
        .updateOne(
            { _id: ObjectId(req.body.userId) },
            {
                $set: {
                    programs: req.body.programs
                }
            }
        )
    res.json(record)

}
