import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const q = {
        userId: req.query.userId
    }

    const {db} = await connectToDatabase()
    const searchResults = await db
        .collection("services")
        .find({
            "name": {
                $regex: req.body.keyword, $options: "-i"
            },
            "service": {
                $regex: req.body.domain

            },
            "county": {
                $regex: req.body.county
            }
        })
        .toArray()

    res.json(searchResults)

}
