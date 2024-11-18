import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const {loginType, loginValue, loginFrom} = req.body;
    const term = loginType === 'email' ? { email: loginValue } : { phone: loginValue };

    const {db} = await connectToDatabase();
    const user = await db.collection("users").findOne(term);

    console.log(user);

    if (loginFrom === 'existing-account') {
        if (user) {
            res.json({code: 666, message: "Success."})
        }
        res.json({code: 777, message: "No account found with this login.  Please try again or create a new account.", loginValue})
    } else {
        if (user) {
            res.json({code: 666, message: "There is already an account with that email address."})
        }
        res.json({code: 777, message: "No account found with this login.  Please try again or create a new account.", loginValue})
    }

    res.json(user);
}
