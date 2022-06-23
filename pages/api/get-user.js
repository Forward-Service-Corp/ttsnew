import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    let q
    if(req.query.email === undefined){
        q = {
            _id: ObjectId(req.query.userId)
        }
    }else{
        q = {
            email: req.query.email
        }
    }
    const {db} = await connectToDatabase()
    const user = await db
        .collection("users")
        .findOne(q)
    res.json(user)

}
