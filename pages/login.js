import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";


export default function Login() {
    const {data: session} = useSession()
    const router = useRouter()

    if (session) {
        router.push("/").then()
        return (
            <div className={"h-screen w-screen bg-[url('/img/YouthWorkbookArt.png')] bg-center bg-cover flex align-middle justify-center"}>
                <div className={"bg-white max-h-[300px] self-center p-4 text-center rounded shadow"}>
                    <div className={"self-center"}>
                        <div className={""}>Signing in as {session.user.email}.</div>
                        {/*<button className={"rounded bg-gray-700 text-white p-3 mt-3"} onClick={() => signOut()}>Sign*/}
                        {/*    out*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div
            className={"h-screen w-screen bg-[url('/img/YouthWorkbookArt.png')] bg-center bg-cover flex align-middle justify-center"}>
            <Head>
                <title>TTS / Login</title>
            </Head>
            <div className={`self-center max-w-[360px] flex flex-col`}>
                <div className={`bg-orange-600 rounded p-4 max-w-[360px] mb-8 flex justify-around gap-4 shadow-2xl m-auto`}>
                    <div>
                        <Image src={"/img/fsc-logo.png"} alt={`Forward Service Corporation logo`} width={120}
                               height={85}/>
                    </div>
                    <div>
                        <Image src={"/img/TTS_Logo2_vertical.png"} alt={`Forward Service Corporation logo`} width={120}
                               height={80}/>
                    </div>
                </div>
                <div className={"bg-white max-h-[300px] p-4 text-center rounded shadow-2xl"}>
                    <div className={"self-center"}>
                        {/*<div className={""}>Not signed in</div>*/}
                        <p>
                            <button className={"rounded bg-green-700 text-white p-3 "}
                                    onClick={() => signIn("google")}>Sign in with Google
                            </button>
                        </p>
                        <button className={"rounded bg-gray-700 text-white p-3 mt-3"}
                                onClick={() => signIn("email")}>Sign in with Email
                        </button>
                    </div>
                </div>
                <div className={`bg-gray-800 text-white mt-8 rounded text-xs p-4 text-center font-light shadow-2xl`}>
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
