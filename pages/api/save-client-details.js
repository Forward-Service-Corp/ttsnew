import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { _id, name, phone, street, city, state, zip, county, homeCounty, programs } = req.body;

    if (!_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ _id: new ObjectId(_id) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updates = {};

        if (name && name !== user.name) {
            updates.name = name;
        }
        if (phone && phone !== user.phone) {
            updates.phone = phone;
        }
        if (street && street !== user.street) {
            updates.street = street;
        }
        if (city && city !== user.city) {
            updates.city = city;
        }
        if (state && state !== user.state) {
            updates.state = state;
        }
        if (zip && zip !== user.zip) {
            updates.zip = zip;
        }
        if (county && JSON.stringify(county) !== JSON.stringify(user.county)) {
            updates.county = county;
        }
        if (programs && JSON.stringify(programs) !== JSON.stringify(user.programs)) {
            updates.programs = programs;
        }
        if (homeCounty && homeCounty !== user.homeCounty) {
            updates.homeCounty = homeCounty;
        }

        if (Object.keys(updates).length > 0) {
            await db.collection('users').updateOne(
                { _id: new ObjectId(_id) },
                { $set: updates }
            );
        }

        // Fetch the updated user document
        const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(_id) });

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Failed to update user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
