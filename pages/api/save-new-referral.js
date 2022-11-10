import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const record = {
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        street: req.body.street,
        zip: req.body.zip,
        county: req.body.county,
        service: req.body.service,
        url: req.body.url,
        requirements: req.body.requirements,
        contactName: req.body.contactName,
        hours: req.body.hours,
        phone: req.body.phone,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        needs: req.body.needs
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("services")
        .insertOne(record)

    res.json(user)

}
