import {signIn, signOut, useSession} from "next-auth/react";

export default function Login() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className={"border h-screen w-screen bg-green-100 flex align-middle justify-center"}>
                <div className={"bg-white max-h-[300px] self-center p-4 text-center rounded shadow"}>
                    <div className={"self-center"}>
                        <div className={""}>Signed in as {session.user.email}</div>
                        <button className={"rounded bg-gray-700 text-white p-3 mt-3"} onClick={() => signOut()}>Sign out</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={"border h-screen w-screen bg-green-100 flex align-middle justify-center"}>
            <div className={"bg-white max-h-[300px] self-center p-4 text-center rounded shadow"}>
                <div className={"self-center"}>
                    <div className={""}>Not signed in</div>
                    <button className={"rounded bg-gray-700 text-white p-3 mt-3"} onClick={() => signIn("google")}>Sign in with Google</button>
                </div>
            </div>
        </div>
    )
}
