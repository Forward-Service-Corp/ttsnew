import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const record = {
        surveyId: req.body.surveyId,
        userId: req.body.userId,
        dream: req.body.dream,
        domain: req.body.domain,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        hours: req.body.hours,
        requirements: req.body.requirements,
        url: req.body.url,
        contact: req.body.contact,
        contactPhone: req.body.contactPhone,
        contactEmail: req.body.contactEmail,
        needs: req.body.needs
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("referrals")
        .insertOne(record)

    res.json(user)

}
