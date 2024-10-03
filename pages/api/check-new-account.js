import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {loginType, loginValue} = req.body;
    const term = loginType === 'email' ? { email: loginValue } : { phone: loginValue };

    const {db} = await connectToDatabase();
    const user = await db.collection("users").findOne(term);

    if (user) {
        res.json({code: 666, message: "Looks like you already have an account. Try signing in with that email or phone number."})
    }

    res.json({code: 777, message: "Just a few more details.", loginValue})

}
