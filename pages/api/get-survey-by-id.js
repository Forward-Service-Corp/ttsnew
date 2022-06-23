import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()

    const survey = await db.collection("lifeAreaSurveys").findOne({_id: ObjectId(req.query.surveyId)})

    res.json(survey)

}
