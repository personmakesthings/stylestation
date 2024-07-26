// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import TopSection from "@/components/TopSection"
import FormOutfit from "@/components/FormOutfit"


// PAGE
export default async function Page({params}) {

    // GET INITIAL DATA
    const outfitData = (await db.query(
        `
        SELECT * FROM wk12_posts
        WHERE id = $1
        `
    , [params.id])).rows[0]


    // CHECK USER
    // Redirect back to outfit page if user is not authorised
    const {userId, sessionClaims} = auth()

    if (userId !== outfitData.user_id
        && sessionClaims?.metadata.role !== "moderator"
        && sessionClaims?.metadata.role !== "admin"
        ) {
        redirect(`/outfits/${params.id}`)
    }


    // FUNCTION TO UPDATE ENTRY
    async function updateOutfit(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const department_id = formData.get("department_id")
        const style_id = formData.get("style_id")
        const title = formData.get("title")
        const description = formData.get("description")
        const outerwear_img = formData.get("outerwear_img")
        const outerwear_url = formData.get("outerwear_url")
        const top_img = formData.get("top_img")
        const top_url = formData.get("top_url")
        const bottom_img = formData.get("bottom_img")
        const bottom_url = formData.get("bottom_url")
        const foot_img = formData.get("foot_img")
        const foot_url = formData.get("foot_url")
        const shoes_img = formData.get("shoes_img")
        const shoes_url = formData.get("shoes_url")
        const accessory1_img = formData.get("accessory1_img")
        const accessory1_url = formData.get("accessory1_url")
        const accessory2_img = formData.get("accessory2_img")
        const accessory2_url = formData.get("accessory2_url")
        const accessory3_img = formData.get("accessory3_img")
        const accessory3_url = formData.get("accessory3_url")

        await db.query(
            `UPDATE
                wk12_posts
            SET
                title = $1,
                description = $2,
                department_id = $3,
                style_id = $4,
                outerwear_img = $5,
                outerwear_url = $6,
                top_img = $7,
                top_url = $8,
                bottom_img = $9,
                bottom_url = $10,
                foot_img = $11,
                foot_url = $12,
                shoes_img = $13,
                shoes_url = $14,
                accessory1_img = $15,
                accessory1_url = $16,
                accessory2_img = $17,
                accessory2_url = $18,
                accessory3_img = $19,
                accessory3_url = $20
            WHERE
                id = $21
                `
            ,
            [
                title,
                description,
                department_id,
                style_id,
                outerwear_img,
                outerwear_url,
                top_img,
                top_url,
                bottom_img,
                bottom_url,
                foot_img,
                foot_url,
                shoes_img,
                shoes_url,
                accessory1_img,
                accessory1_url,
                accessory2_img,
                accessory2_url,
                accessory3_img,
                accessory3_url,
                params.id
            ]
        )
        
        revalidatePath("/")
        redirect(`/outfits/${params.id}`)
    }

    return (
        <div>

            <TopSection
                title="Editing Outfit"
                description={`"${outfitData.title}"`}
                />

            <div className="main-adjust">
                <Link href={`/outfits/${params.id}`}>
                    <p className="return-link">← Return to outfit entry</p>
                </Link>

                <FormOutfit action={updateOutfit} outfitData={outfitData}/>
            </div>

        </div>
    )
}