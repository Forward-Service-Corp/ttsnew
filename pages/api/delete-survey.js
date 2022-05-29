import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb"

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const record = {
       _id: ObjectId(req.query.surveyId)
    }

    const referralsToDelete = {
        surveyId: req.query.surveyId
    }

    const tasksToDelete = {
        surveyId: req.query.surveyId
    }

    const {db} = await connectToDatabase()

    const survey = await db.collection("lifeAreaSurveys").remove(record)
    const referrals = await db.collection("referrals").remove(referralsToDelete)
    const tasks = await db.collection("todos").remove(tasksToDelete)

    res.json({survey, referrals, tasks})

}
