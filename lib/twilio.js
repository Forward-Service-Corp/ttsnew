import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (phoneNumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the OTP in the database or in-memory store for later verification
    // e.g., Redis, MongoDB

    await client.messages.create({
        body: `Your verification code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
    });

    return otp;
};
