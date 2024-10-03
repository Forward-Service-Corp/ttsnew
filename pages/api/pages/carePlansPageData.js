import {connectToDatabase} from "../../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()
    const user = await db.collection("users").findOne({_id: ObjectId(req.query.userId)})
    const query = { userId: ObjectId(req.query.userId) }

    const carePlansCursor = await db.collection("referrals").find( query )
    const referrals = await carePlansCursor.toArray()
    await carePlansCursor.close()

    const notesCursor = await db.collection("notes").find( query )
    const notes = await notesCursor.toArray()
    await notesCursor.close()

    const todosCursor = await db.collection("notes").find( query )
    const todos = await todosCursor.toArray()
    await todosCursor.close()

    res.json({user, referrals, notes, todos})

}
