import {useSession, signIn, signOut} from "next-auth/react";

function Header(props) {
    const {data: session} = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br/>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br/>
            <button onClick={() => signIn("google")}>Sign in</button>
        </>
    )
}

export default Header;