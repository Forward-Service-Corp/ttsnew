import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const q = {
        email: req.query.email
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("users")
        .findOne(q)


    res.json(user)

}