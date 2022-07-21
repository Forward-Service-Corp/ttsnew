import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    let q
    if (req.query.surveyId === undefined) {
        q = {
            userId: req.query.userId,
        }
    } else {
        q = {
            userId: req.query.userId,
            surveyId: req.query.surveyId
        }
    }

    const {db} = await connectToDatabase()

    const cursor = await db.collection("referrals").find(q)
    const records = await cursor.toArray()

    const customCursor = await db.collection("customReferrals").find(q)
    const customRecords = await customCursor.toArray()

    await cursor.close()
    await customCursor.close()

    const allRecords = await records.concat(customRecords)

    res.json(allRecords)

}
