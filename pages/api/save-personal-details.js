import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const {db} = await connectToDatabase()
    const record = await db
        .collection("users")
        .updateOne(
            { _id: ObjectId(req.body.userId) },
            {
                $set: {
                    name: req.body.name,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    homeCounty: req.body.homeCounty,
                    county: req.body.counties,
                    phone: req.body.phone
                }
            }
        )
    res.json(record)

}
