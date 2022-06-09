import {connectToDatabase} from "../../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const clientQuery = {
        _id: ObjectId(req.query.clientId)
    }
    const UID = {
        userId: req.query.clientEmail
    }

    const {db} = await connectToDatabase()

    const user = await db.collection("users").findOne(clientQuery)
    const dreams = await db.collection("dreams").find(UID).toArray()
    const surveys = await db.collection("lifeAreaSurveys").find(UID).toArray()
    const referrals = await db.collection("referrals").find(UID).toArray()
    const tasks = await db.collection("todos").find(UID).toArray()
    const notes = await db.collection("notes").find(UID).toArray()

    res.json({user, dreams, surveys, referrals, tasks, notes})

}
