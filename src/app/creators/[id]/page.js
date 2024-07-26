// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import Image from "next/image"

// COMPONENTS
import TopSection from "@/components/TopSection"
import TableOutfits from "@/components/CardsOutfits"
import ActionsCreators from "@/components/ActionsCreators"

// PAGE
export default async function Page({params}) {

    // GET OUTFITS
    const outfitsData = (await db.query(
        `
        SELECT
            wk12_posts.*,
            wk12_users.clerk_id,
            wk12_users.username,
            wk12_users.avatar, 
            wk12_departments.gender,
            wk12_styles.style_name,
            wk12_styles.style_img
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
            wk12_users.clerk_id = $1
        GROUP BY
            wk12_posts.id, 
            wk12_users.clerk_id, 
            wk12_users.username,
            wk12_users.avatar,
            wk12_departments.gender,
            wk12_styles.style_name,
            wk12_styles.style_img
        ORDER BY
            wk12_posts.id DESC
        `
    , [params.id])).rows

    const userData = (await db.query(
        `
        SELECT * FROM wk12_users
        WHERE wk12_users.clerk_id = $1
        `
    , [params.id])).rows[0]

    return (
        <>

            <TopSection
                title="Creator Profile"
                description={userData.username}
                bgImg={userData.avatar}
                />

            <section className="main-adjust">

                <ActionsCreators creatorId={userData.clerk_id}/>

                <div className="creator-profile-area">
                    <div className="creators-user-area">
                        <div className="creators-avatar-container">
                            <Image width="175" height="175" className="creators-avatar" src={userData.avatar ? userData.avatar : "/no-image.webp"} alt={`${userData.username}'s avatar.`}/>
                        </div>
                        <p><b>Location:</b> {userData.location}</p>
                    </div>
                    <div>
                        <h2 className={`${titleFont.className} page-title`}>About {userData.username}</h2>
                        <p>{userData.bio}</p>
                    </div>
                </div>
            </section>
            
            <hr />

            <section className="main-adjust-2">
                <h2 className={`${titleFont.className} page-title-2`}>Latest Outfits by {userData.username}</h2>
                <div className="card-rows">
                    <TableOutfits outfitsData={outfitsData}/>
                </div>
            </section>
        </>
    )
}