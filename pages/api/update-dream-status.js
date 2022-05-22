import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const {db} = await connectToDatabase()
    const dream = await db
        .collection("dreams")
        .updateOne(
            { _id: ObjectId(req.body.id) },
            {
                $set: {
                    surveyComplete: req.body.surveyComplete
                }
            }
        )

    res.json(dream)

}
