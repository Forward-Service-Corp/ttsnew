import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {name, phone, street, city, state, zip, county, homeCounty} = req.body;
    const {db} = await connectToDatabase()
    const record = await db
        .collection("users")
        .updateOne(
            { _id: ObjectId(req.body.userId) },
            {
                $set: {name, phone, street, city, state, zip, county, homeCounty}
            }
        )
    res.json(record)
}
