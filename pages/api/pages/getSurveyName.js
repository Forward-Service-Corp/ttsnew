// eslint-disable-next-line import/no-anonymous-default-export
import {connectToDatabase} from "../../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const userQuery = {
        email: req.query.userId
    }

    const {db} = await connectToDatabase()

    const surveyUser = await db.collection("users").findOne(userQuery)

    res.json({surveyUser})

}
