import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function sendOTP(phone) {
    const verification = await client.verify.v2
        .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        .verifications.create({
            channel: "sms",
            to: `+1${phone}`,
        });

    console.log(verification.status);
}
