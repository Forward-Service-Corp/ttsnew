import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()

    const dreamsCursor = await db.collection("dreams").find({"userId": req.query.userId})
    const dreams = await dreamsCursor.toArray()
    await dreamsCursor.close()

    const surveysCursor = await db.collection("lifeAreaSurveys").find({"userId": req.query.userId})
    const surveys = await surveysCursor.toArray()
    await surveysCursor.close()

    const referralsCursor = await db.collection("referrals").find({"userId": req.query.userId})
    const referrals = await referralsCursor.toArray()
    await referralsCursor.close()

    const tasksCursor = await db.collection("todos").find({"userId": req.query.userId})
    const tasks = await tasksCursor.toArray()
    await tasksCursor.close()

    const notesCursor = await db.collection("notes").find({"userId": req.query.userId})
    const notes = await notesCursor.toArray()
    await notesCursor.close()


    res.json({dreams, surveys, referrals, tasks, notes})

}
