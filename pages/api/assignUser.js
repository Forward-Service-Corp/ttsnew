import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()

    await db.collection("dreams").updateMany({"userId": req.query.fromId}, { $set: {"userId": req.query.toId}})
    await db.collection("lifeAreaSurveys").updateMany({"userId": req.query.fromId}, { $set: {"userId": req.query.toId}})
    await db.collection("referrals").updateMany({"userId": req.query.fromId}, { $set: {"userId": req.query.toId}})
    await db.collection("todos").updateMany({"userId": req.query.fromId}, { $set: {"userId": req.query.toId}})
    await db.collection("notes").updateMany({"userId": req.query.fromId}, { $set: {"userId": req.query.toId}})

    res.json({response: "Successful"})

}
