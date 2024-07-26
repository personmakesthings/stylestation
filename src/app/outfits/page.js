// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// MODULES
import Link from "next/link"
import { redirect } from "next/navigation"

// COMPONENTS
import TopSection from "@/components/TopSection"
import CardsOutfits from "@/components/CardsOutfits"
import FormSelectDepartment from "@/components/FormSelectDepartment"

// DATABASE CONNECTION
import { db } from "@/utils/db"


// PAGE
export default async function Page({searchParams}) {

    // FUNCTION TO FILTER BY DEPARTMENT
    async function changeDept(formData) {
        "use server"
        const dept = formData.get("department")
        redirect(`/outfits/?dept=${dept}`)
    }

    // CHANGE DEPARTMENT WHEN URL IS LOADED WITH QUERY STRING
    let deptFilter = ""
    if (searchParams.dept && searchParams.dept != 0) {
        deptFilter = `WHERE wk12_departments.id = ${searchParams.dept}`
    }


    // GET OUTFITS
    const outfitsData = (await db.query(
        `
        SELECT
            wk12_posts.*,
            wk12_users.clerk_id,
            wk12_users.username,
            wk12_users.avatar, 
            wk12_departments.gender,
            wk12_styles.style_name
        FROM
            wk12_posts
        LEFT JOIN
            wk12_users
        ON
            wk12_posts.user_id = wk12_users.clerk_id
        LEFT JOIN
            wk12_departments
        ON
            wk12_departments.id = wk12_posts.department_id
        LEFT JOIN
            wk12_styles
        ON
            wk12_styles.id = wk12_posts.style_id
        ${deptFilter}
        GROUP BY
            wk12_posts.id, 
            wk12_users.clerk_id, 
            wk12_users.username,
            wk12_users.avatar,
            wk12_departments.gender,
            wk12_styles.style_name,
            wk12_departments.id
        ORDER BY
            wk12_posts.id DESC
        `
    )).rows
    

    return (
        <div>
            {/* TOP SECTION */}
            <TopSection
                title="Latest Outfits"
                />

            {/* SELECT DEPARTMENT */}
            <FormSelectDepartment action={changeDept} />

            {/* GO TO STYLES */}
            <p className="form-text">Want to find outfits in a specific fashion style? <b><Link href="/outfits/styles">Check out our styles page!</Link></b></p>

            {/* CARDS - OUTFITS */}
            <section className="main-adjust-2">
                <div className="card-rows">
                    <CardsOutfits outfitsData={outfitsData}/>
                </div>
            </section>
        </div>
    )
}