import Head from "next/head";
import Image from "next/image";
import {useState} from "react";
import NewEmailAccount from "../components/login/newEmailAccount";
import NewPhoneAccount from "../components/login/newPhoneAccount";
import LoginTypeCheck from "../components/login/loginTypeCheck";
import CheckOtp from "../components/login/checkOtp";

export default function CreateNewAccount() {

    const [loginType, setLoginType] = useState("");
    const [loginValue, setLoginValue] = useState("");
    const [step, setStep] = useState(1);

    return (
        <div
            className={" w-screen bg-[url('/img/YouthWorkbookArt.png')] bg-center bg-cover flex align-middle justify-center"}>
            <Head>
                <title>TTS / Create New Account</title>
            </Head>
            <div className={`self-center max-w-[700px] flex flex-col my-8`}>
                <div
                    className={`bg-orange-600 bg-opacity-80 rounded min-h-[150px] mb-8 flex shadow-2xl w-full items-center justify-around`}>
                    <div className={`w-[150px] h-[110px] relative p-2`}>
                        <Image src={"/img/fsc-logo.png"} alt={`Forward Service Corporation logo`} fill={true}
                               sizes="(max-width: 320px) 20vw, (max-width: 150px) 20vw, 15vw"/>
                    </div>
                    <div className={`w-[170px] h-[100px] relative`}>
                        <Image src={"/img/tts-logo.png"} alt={`Transition to Success logo`} fill={true}
                               sizes="(max-width: 320px) 20vw, (max-width: 150px) 20vw, 15vw"/>
                    </div>
                </div>
                <div className={"bg-white p-4 rounded shadow-2xl"}>
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
                </div>

                <div
                    className={`bg-gray-800 bg-opacity-90 text-white mt-8 rounded text-xs p-4 text-center font-light shadow-2xl`}>
                    <p className={`text-lg uppercase`}>Disclaimer</p>
                    <p className={`pb-4`}>
                        You are logging into an application owned by Forward Service Corporation. The information
                        collected by this application is protected and will not be sold or shared with any third
                        parties. We will use the data collected to improve our services and understand how people are
                        utilizing our programs. By accessing this site, you consent to FSC using your data in this way.
                    </p>
                </div>
            </div>
        </div>
    )
}
