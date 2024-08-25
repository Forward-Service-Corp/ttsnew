import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const {db} = await connectToDatabase()
    const user = await db
        .collection("users")
        .findOne({phone: req.query.phone})
    res.json(user)
}
