import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {db} = await connectToDatabase()
    const coaches = await db
        .collection("users")
        .find({
            email: {
                $in: req.body.coaches
            }
        })
        .toArray()


    res.json(coaches)

}
