// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import TopSection from "@/components/TopSection"


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
        const style_name = formData.get("style_name")
        const style_img = formData.get("style_img")
        const style_description = formData.get("style_description")

        await db.query(
            `INSERT INTO wk12_styles (
                style_name,
                style_img,
                style_description
            )
            VALUES ($1, $2, $3)`
            ,
            [
                style_name,
                style_img,
                style_description
            ]
        )
        
        revalidatePath("/")
        redirect("/outfits/styles")
    }

    return (
        <div>

            <TopSection
                title="Submit New Style"
                />

            <div className="main-adjust">
                <form action={submitForm} className="form-outfit">
                    <section className="form-container">
                        <div className="form-title">
                            <h1 className={`${titleFont.className} page-title`}>Style Details</h1>
                        </div>

                        <div className="form-area">
                            <label htmlFor="style_name">Style Name</label>
                            <input name="style_name" id="style_name" placeholder="Name your style" required maxLength="20" />
                        </div>

                        <div className="form-area">
                            <label htmlFor="style_img">Style Image</label>
                            <input name="style_img" id="style_img" placeholder="Image URL" required maxLength="200" />
                        </div>

                        <p className="form-text">Provide an image that captures the essence of the fashion style.</p>

                        <div className="form-area">
                            <label htmlFor="style_description">Style Description</label>
                            <textarea name="style_description" id="style_description" placeholder="Keep it brief and snappy" required maxLength="100" />
                        </div>

                        <button type="submit" className="small-btn submit">Submit New Style</button>
                    </section>
                        

                </form>
            </div>
        </div>
    )
}