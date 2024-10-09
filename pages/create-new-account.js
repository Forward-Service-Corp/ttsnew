import {useState} from "react";
import NewEmailAccount from "../components/login/newEmailAccount";
import NewPhoneAccount from "../components/login/newPhoneAccount";
import LoginTypeCheck from "../components/login/loginTypeCheck";
import CheckOtp from "../components/login/checkOtp";
import LoginLayout from "../components/login/loginLayout";

export default function CreateNewAccount() {

    const [loginType, setLoginType] = useState("");
    const [loginValue, setLoginValue] = useState("");
    const [step, setStep] = useState(1);

    return (
        <LoginLayout title={"Create New Account"}>
            <div className={`${step === 1 ? 'visible' : 'hidden'}`}>
                <LoginTypeCheck loginType={loginType} loginValue={loginValue} setLoginType={setLoginType}
                                setLoginValue={setLoginValue} setStep={setStep}/>
            </div>
            <div className={`${step === 2 ? 'visible' : 'hidden'}`}>
                <NewEmailAccount loginType={loginType} loginValue={loginValue} setStep={setStep}/>
            </div>
            <div className={`${step === 3 ? 'visible' : 'hidden'}`}>
                <NewPhoneAccount loginType={loginType} loginValue={loginValue} setStep={setStep}/>
            </div>
            <div className={`${step === 4 ? 'visible' : 'hidden'}`}>
                <CheckOtp loginType={loginType} loginValue={loginValue} setStep={setStep}/>
            </div>
        </LoginLayout>

    )
}
