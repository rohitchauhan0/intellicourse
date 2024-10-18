
"use client"
import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children }) => {

    return (
        <>
            <SessionProvider session={null}>{children}</SessionProvider>
        </>
    )
}

export default NextAuthProvider