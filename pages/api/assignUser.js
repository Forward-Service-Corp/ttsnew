import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()
    const filter = { userId: ObjectId(req.query.userId)}

    await db.collection("dreams").updateMany(filter, { $set: {"email": req.query.toId}})
    await db.collection("lifeAreaSurveys").updateMany(filter, { $set: {"email": req.query.toId}})
    await db.collection("referrals").updateMany(filter, { $set: {"email": req.query.toId}})
    await db.collection("todos").updateMany(filter, { $set: {"email": req.query.toId}})
    await db.collection("notes").updateMany(filter, { $set: {"email": req.query.toId}})
    const user = await db.collection("users").updateOne({ _id: ObjectId(req.query.userId) }, { $set: {"email": req.query.toId}})


    res.json({user})

}
