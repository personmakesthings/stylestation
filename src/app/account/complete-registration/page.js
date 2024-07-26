// MODULES
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import TopSection from "@/components/TopSection"
import FormCreatorProfile from "@/components/FormCreatorProfile"

// DATABASE CONNECTION
import { db } from "@/utils/db"

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
    
    // REDIRECT USER IF THEY ARE ALREADY IN DATABASE
    if (checkUser) {
        redirect("/")
    }


    // SUBMIT FORM DATA
    async function createProfile(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const data = Object.fromEntries(formData)
        const {username, bio, avatar, location} = data

        db.query(
            `
            INSERT INTO wk12_users (clerk_id, username, avatar, bio, location) VALUES
            ($1, $2, $3, $4, $5)
            `
            , [userId, username, avatar, bio, location])
        
        revalidatePath("/")
        redirect("/")
    }

    
    return (
        <div>

            <TopSection
                title="Complete Your Registration"
                />

            <div className="main-adjust">
                <section className="form-container">
                    <br /><br/>
                    <p className="form-text">Please set up your profile and provide us with some more details about you to complete your registration with StyleStation.</p>
                    <p className="form-text">Once you are done, you will be free to submit new outfits and join the discussion!</p>
                </section>
            </div>

            <div className="main-adjust">

                    <FormCreatorProfile action={createProfile}/>

            </div>
        </div>
    )
}