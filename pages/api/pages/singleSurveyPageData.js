import {connectToDatabase} from "../../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()
    const user = await db.collection("users").findOne({_id: ObjectId(req.query.userId)})
    const query = {userId: ObjectId(req.query.userId) }

    const dreamsCursor = await db.collection("dreams").find(query)
    const dreams = await dreamsCursor.toArray()
    await dreamsCursor.close()

    const surveysCursor = await db.collection("lifeAreaSurveys").find(query)
    const surveys = await surveysCursor.toArray()
    await surveysCursor.close()

    const referralsCursor = await db.collection("referrals").find(query).sort("domain")
    const referrals = await referralsCursor.toArray()
    await referralsCursor.close()

    const tasksCursor = await db.collection("todos").find(query)
    const tasks = await tasksCursor.toArray()
    await tasksCursor.close()

    const notesCursor = await db.collection("notes").find(query)
    const notes = await notesCursor.toArray()
    await notesCursor.close()

    const clientReferralsCursor = await db.collection("referrals").find({ userId: req.query.clientId })
    const clientReferrals = await clientReferralsCursor.toArray()
    await clientReferralsCursor.close()

    res.json({user, dreams, surveys, referrals, tasks, notes, clientReferrals})

}
