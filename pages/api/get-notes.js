import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    let q = {
            userId: req.query.userId
        }

    const {db} = await connectToDatabase()
    const notes = await db
        .collection("notes")
        .find(q)
        .toArray()

    res.json(notes)

}
