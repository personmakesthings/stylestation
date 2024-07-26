// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import TopSection from "@/components/TopSection"
import FormOutfit from "@/components/FormOutfit"


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
    }


    // SUBMIT FORM DATA
    async function submitForm(formData) {
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
            `INSERT INTO wk12_posts (
                user_id,
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
                accessory3_url
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`
            ,
            [
                userId,
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
                accessory3_url
            ]
        )
        
        revalidatePath("/")
        redirect("/outfits")
    }

    return (
        <div>
            <TopSection
                title="Submit Your Outfit"
                />

            <div className="main-adjust">
                <FormOutfit action={submitForm}/>
            </div>
        </div>
    )
}