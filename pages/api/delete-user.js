import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()

    const dreamsCursor = await db.collection("dreams").deleteMany({"userId": ObjectId(req.query.userId)})
    const surveysCursor = await db.collection("lifeAreaSurveys").deleteMany({"userId": ObjectId(req.query.userId)})
    const referralsCursor = await db.collection("referrals").deleteMany({"userId": ObjectId(req.query.userId)})
    const tasksCursor = await db.collection("todos").deleteMany({"userId": ObjectId(req.query.userId)})
    const notesCursor = await db.collection("notes").deleteMany({"userId": ObjectId(req.query.userId)})
    const user = db.collection("users").deleteOne({_id: ObjectId(req.query.userId)})

    res.json({dreamsCursor, surveysCursor, referralsCursor, tasksCursor, notesCursor, user})

}
