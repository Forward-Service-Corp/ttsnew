import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    let q = {
            userId: req.query.userId,
            referralId: req.query.referralId
        }

    const {db} = await connectToDatabase()
    const dreams = await db
        .collection("todos")
        .find(q)
        .toArray()


    res.json(dreams)

}
