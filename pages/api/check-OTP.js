import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const verificationCheck = await client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({
            code: req.query.code,
            to: `+1${req.query.phone}`,
        });
    res.json(verificationCheck.status);
}
