import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {db} = await connectToDatabase()
    const record = await db
        .collection("users")
        .updateOne(
            { _id: ObjectId(req.body.userId) },
            {
                $set: {
                    coach: req.body.coaches,
                    coachUpdate: new Date()
                }
            }
        )
    const coachUpdate = await db
        .collection("lifeAreaSurveys")
        .updateMany(
            { userId: req.body.email },
            {
                $set: {
                    coach: req.body.coaches
                }
            }
        )
    const reportingUpdate = await db
        .collection("lasReporting")
        .updateMany(
            { userId: req.body.email },
            {
                $set: {
                    coach: req.body.coaches
                }
            }
        )
    res.json(record, coachUpdate, reportingUpdate)

}
