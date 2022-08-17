import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const {db} = await connectToDatabase()
    const dream = await db
        .collection("dreams")
        .updateOne(
            { _id: ObjectId(req.body.dreamId) },
            {
                $set: {
                    dream: req.body.dream,
                    dreamNeed: req.body.dreamNeed,
                    dreamHelp: req.body.dreamHelp,
                    status: req.body.dreamStatus
                }
            }
        )

    const survey = await db
        .collection("lifeAreaSurveys")
        .updateOne(
            { dreamId: req.body.dreamId },
            {
                $set: {
                    dream: req.body.dream,
                }
            }
        )

    res.json(dream, survey)

}
