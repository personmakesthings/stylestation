// DATABASE CONNECTION
import { db } from "@/utils/db"

// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// MODULES
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"


// COMPONENT
export default async function FormComment({action, commentData}) {

    // POPULATE FORM DATA IF AN UPDATE QUERY
    let initialData = null // declare variable outside conditional scope
    if (commentData) {
        initialData = commentData
    }

    // VALIDATE USER
    const {userId} = auth()

    const validateUser = (await db.query(
        `
        SELECT * FROM
            wk12_users
        WHERE
            clerk_id = $1
        `
        , [userId])).rows[0]

    if (!validateUser) {
        return (
            <div className="main-adjust">
                <section className="form-container">
                <div className="form-title">
                            <h1 className={`${titleFont.className} page-title`}>Leave a comment</h1>
                        </div>
                    <p>You must be registered and have a completed profile to add a comment. <b><Link href="/account/sign-in">Log in, register an account or finish setting up your profile now</Link></b> - and join the conversation!</p>
                </section>
            </div>
        )
    }

    return (
        <div>
            <div className="main-adjust">
                <form action={action} className="form-outfit">
                    <section className="form-container">
                        <div className="form-title">
                            <h1 className={`${titleFont.className} page-title`}>Leave a comment</h1>
                        </div>

                        <div className="form-area">
                            <label htmlFor="content">Your Comment</label>
                            <textarea name="content" placeholder="What are your thoughts?" required maxLength="500" defaultValue={initialData ? initialData.content : null}/>
                        </div>

                        <button type="submit" className="small-btn submit">Submit Comment</button>
                    </section>
                </form>
            </div>
        </div>
    )
}