// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import TopSection from "@/components/TopSection"
import FormComment from "@/components/FormComment"


// PAGE
export default async function Page({params}) {

    // GET INITIAL DATA
    const commentData = (await db.query(
        `
        SELECT * FROM wk12_comments
        WHERE id = $1
        `
    , [params.id])).rows[0]

    
    // CHECK USER
    // Redirect back to outfit page if user is not authorised
    const {userId, sessionClaims} = auth()

    if (userId !== commentData.user_id
        && sessionClaims?.metadata.role !== "moderator"
        && sessionClaims?.metadata.role !== "admin"
        ) {
        redirect(`/outfits/${commentData.post_id}`)
    }


    // FUNCTION TO UPDATE ENTRY
    async function updateComment(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const content = formData.get("content")

        await db.query(
            `UPDATE
                wk12_comments
            SET
                content = $1
            WHERE
                id = $2
                `
            ,
            [
                content,
                params.id
            ]
        )
        
        revalidatePath("/")
        redirect(`/outfits/${commentData.post_id}`)
    }

    return (
        <div>

            <TopSection
                title="Editing Comment"
                />

            <div className="main-adjust">
                <Link href={`/outfits/${commentData.post_id}`}>
                    <p className="return-link">← Return to outfit entry</p>
                </Link>
            </div>

            <FormComment action={updateComment} commentData={commentData}/>
            

        </div>
    )
}