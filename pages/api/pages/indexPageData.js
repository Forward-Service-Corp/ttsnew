import {connectToDatabase} from "../../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const userQuery = {
        email: req.query.userId
    }
    const UID = {
        userId: req.query.userId
    }

    const servicesQuery = {
        name: {$exists: true}
    }

    const {db} = await connectToDatabase()

    const user = await db.collection("users").findOne(userQuery)
    const dreams = await db.collection("dreams").find(UID).toArray()
    const surveys = await db.collection("lifeAreaSurveys").find(UID).toArray()
    const referrals = await db.collection("referrals").find(UID).toArray()
    const tasks = await db.collection("todos").find(UID).toArray()
    const services = await db.collection("services").find().toArray()

    res.json({user, dreams, surveys, referrals, tasks, services})

}
