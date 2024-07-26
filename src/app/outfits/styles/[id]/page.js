// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import { redirect } from "next/navigation"

// COMPONENTS
import TopSection from "@/components/TopSection"
import CardsOutfits from "@/components/CardsOutfits"
import FormSelectDepartment from "@/components/FormSelectDepartment"


// PAGE
export default async function Page({params, searchParams}) {

    // FUNCTION TO FILTER BY DEPARTMENT
    async function changeDept(formData) {
        "use server"
        const dept = formData.get("department")
        redirect(`/outfits/styles/${params.id}?dept=${dept}`)
    }

    // CHANGE DEPARTMENT WHEN URL IS LOADED WITH QUERY STRING
    let deptFilter = ""
    if (searchParams.dept && searchParams.dept != 0) {
        deptFilter = `AND wk12_departments.id = ${searchParams.dept}`
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
        WHERE
            wk12_posts.style_id = ${params.id}
        ${deptFilter}
        GROUP BY
            wk12_posts.id, 
            wk12_users.clerk_id, 
            wk12_users.username,
            wk12_users.avatar,
            wk12_departments.gender,
            wk12_styles.style_name
        ORDER BY
            wk12_posts.id DESC
        `
    )).rows

    // GET STYLES
    const styles = (await db.query(
        `
        SELECT * FROM wk12_styles
        WHERE wk12_styles.id = ${params.id}
        `
    )).rows[0]

    
    return (
        <div>
            {/* TOP SECTION */}
            <TopSection
                title={styles.style_name}
                description={styles.style_description}
                bgImg={styles.style_img}
                />
            
            {/* SELECT DEPARTMENT */}
            <FormSelectDepartment action={changeDept} />

            {/* CARDS - OUTFITS */}
            <div className="main-adjust-2">
                <div className="card-rows">
                    <CardsOutfits outfitsData={outfitsData}/>
                </div>
            </div>
        </div>
    )
}