import {connectToDatabase} from "../../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    const clientQuery = {
        _id: ObjectId(req.query.clientId)
    }
    const UID = {
        userId: req.query.clientEmail
    }

    const {db} = await connectToDatabase()

    const user = await db.collection("users").findOne(clientQuery)

    const dreamsCursor = await db.collection("dreams").find(clientQuery)
    const dreams = await dreamsCursor.toArray()
    await dreamsCursor.close()

    const surveysCursor = await db.collection("lifeAreaSurveys").find(clientQuery)
    const surveys = await surveysCursor.toArray()
    await surveysCursor.close()

    const referralsCursor = await db.collection("referrals").find(clientQuery)
    const referrals = await referralsCursor.toArray()
    await referralsCursor.close()

    const tasksCursor = await db.collection("todos").find(clientQuery)
    const tasks = await tasksCursor.toArray()
    await tasksCursor.close()

    const notesCursor = await db.collection("notes").find(clientQuery)
    const notes = await notesCursor.toArray()
    await notesCursor.close()

    res.json({user, dreams, surveys, referrals, tasks, notes})

}
