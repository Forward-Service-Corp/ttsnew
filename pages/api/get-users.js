import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    let q = {
            _id: {$exists: true}
        }

    const {db} = await connectToDatabase()
    const users = await db
        .collection("users")
        .find(q)
        .toArray()


    res.json(users)

}
