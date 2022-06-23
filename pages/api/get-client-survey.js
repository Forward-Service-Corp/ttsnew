import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    const {db} = await connectToDatabase()
    const cursor = await db.collection("lifeAreaSurveys").find({_id: ObjectId(req.query.surveyId)})
    const records = await cursor.toArray()
    await cursor.close()

    res.json(records)

}
