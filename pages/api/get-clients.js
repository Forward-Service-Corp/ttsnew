import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()
    const clients = await db
        .collection("users")
        .find({ "coach": req.query.coachId })
        .toArray()

    res.json(clients)

}
