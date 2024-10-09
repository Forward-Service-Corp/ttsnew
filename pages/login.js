import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import LoginLayout from "../components/login/loginLayout";

export default function Login() {

    const router = useRouter();

    return (
        <LoginLayout title={"Login"}>
            <div className={"text-center"}>
                <h2 className={'pb-2 font-extralight text-2xl my-2'}>Sign in to Your Account</h2>
                <button className={"rounded-full bg-green-700 text-white font-extralight p-2 w-full"}
                        onClick={() => signIn("google", {callbackUrl: '/'})}>Sign in with Google
                </button>
                <button className={"rounded-full bg-gray-700 text-white font-extralight p-2 w-full mt-3"}
                        onClick={() => signIn("email", {callbackUrl: '/'})}>Sign in with Email
                </button>
                <button
                    className={"rounded-full bg-indigo-700 text-white font-extralight p-2 w-full mt-3 block m-auto"}
                    onClick={() => {
                        router.push('/login-sms').then()
                    }}>Sign in by Text
                </button>
                <div className={"flex items-center pt-2 mt-4"}>
                    <div className={"border-b border-gray-700 border-opacity-40 w-1/2 mr-4"}></div>
                    <div>OR</div>
                    <div className={"border-b border-gray-700 border-opacity-40 w-1/2 ml-4"}></div>
                </div>
                <h2 className={'font-extralight text-2xl my-2'}>Create a New Account</h2>
                <div>
                    <p className={'text-xs'}>
                        If you don&apos;t already have an account you can create one now. Just click the button
                        below to get started.
                    </p>
                </div>
                <button className={"rounded-full bg-red-500 text-white font-extralight p-2 w-full mt-5 text-sm"}
                        onClick={() => {
                            router.push("/create-new-account").then()
                        }}>Create New Account
                </button>

            </div>
        </LoginLayout>
    )
}
