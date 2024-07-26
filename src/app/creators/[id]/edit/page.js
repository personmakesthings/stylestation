
// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import TopSection from "@/components/TopSection"
import FormCreatorProfile from "@/components/FormCreatorProfile"


// PAGE
export default async function Page({params}) {

    // GET INITIAL DATA
    const creatorData = (await db.query(
        `
        SELECT * FROM wk12_users
        WHERE clerk_id = $1
        `
    , [params.id])).rows[0]


    // CHECK USER
    // Redirect back to creator page if user is not authorised
    const {userId, sessionClaims} = auth()

    if (userId !== creatorData.clerk_id
        && sessionClaims?.metadata.role !== "moderator"
        && sessionClaims?.metadata.role !== "admin"
        ) {
        redirect(`/creators/${params.id}`)
    }


    // FUNCTION TO UPDATE ENTRY
    async function updateProfile(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const avatar = formData.get("avatar")
        const location = formData.get("location")
        const bio = formData.get("bio")

        await db.query(
            `UPDATE
                wk12_users
            SET
                avatar = $1,
                location = $2,
                bio = $3
            WHERE
                clerk_id = $4
                `
            ,
            [
                avatar,
                location,
                bio,
                params.id
            ]
        )
        
        revalidatePath("/")
        redirect(`/creators/${creatorData.clerk_id}`)
    }

    return (
        <div>

            <TopSection
                title="Editing Profile"
                description={creatorData.username}
                bgImg={creatorData.avatar}
                />

            <div className="main-adjust">

                <Link href={`/creators/${creatorData.clerk_id}`}>
                    <p className="return-link">← Return to creator profile page </p>
                </Link>

                <FormCreatorProfile action={updateProfile} creatorData={creatorData}/>

            </div>
        </div>
    )
}