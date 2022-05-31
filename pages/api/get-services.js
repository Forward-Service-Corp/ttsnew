import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req,res) => {

    const {db} = await connectToDatabase()

    const services = await db.collection("services").find().toArray()

    res.json(services)

}
