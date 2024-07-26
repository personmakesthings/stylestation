
// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"


// PAGE
export default async function Page() {
    // GET USERID FROM CLERK
    const {userId} = auth()

    
    // CHECK IF USER IS REGISTERED
    const checkUser = (await db.query(
        `
        SELECT * FROM
            wk12_users
        WHERE
            clerk_id = $1
        `
        , [userId])).rows[0]

        
    if (!checkUser) {
        redirect("/account/complete-registration")
    } else {
        redirect("/")
    }
}