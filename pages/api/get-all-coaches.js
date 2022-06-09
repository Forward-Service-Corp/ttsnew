import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()
    const coaches = await db
        .collection("users")
        .find({
            level: {
                $in: ["admin", "coach"]
            }
        })
        .toArray()


    res.json(coaches)

}
