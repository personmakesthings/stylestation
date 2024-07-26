// FONTS
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})
import { Bebas_Neue } from "next/font/google"

// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import Link from "next/link"

// COMPONENTS
import HeaderNavLarge from "./HeaderNavLarge"
import HeaderNavSmall from "./HeaderNavSmall"
import HeaderBg from "./HeaderBg"
import { auth } from "@clerk/nextjs/server"


// COMPONENT
export default async function Header() {

    // GET USERID
    const {userId} = auth()

    // GET USER DATA
    const userData = (await db.query(
        `
        SELECT * FROM wk12_users
        WHERE clerk_id = $1
        `
    , [userId])).rows[0]

    return (
        <div>
            <header >
                <div className="navbar">
                    <h1 className={`${titleFont.className} site-title`}>
                        <Link href="/">STYLE⬩STATION</Link>
                    </h1>
                    {/* Displayed navigation component changes with display size - media queries */}
                    <HeaderNavLarge />
                    <HeaderNavSmall userData={userData}/> {/* User data passed down in prop because small nav display (burger menu) is a client-side component */}
                </div>
            </header>
            <HeaderBg />
            {/* Header background requires React hooks for scroll transition to function. This requires a separate client component, otherwise we cannot use server-side JS for db queries & user auth in child navigation component*/}
        </div>
    )
}