// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

// COMPONENT
import TopSection from "@/components/TopSection"
import UserIcon from "@/components/UserIcon"
import TableComments from "@/components/TableComments"
import ActionsOutfits from "@/components/ActionsOutfits"
import FormComment from "@/components/FormComment"


// PAGE
export default async function Page({params}) {

    // GET USERID FROM CLERK
    const {userId} = auth()

    // GET OUTFIT DATA
    const outfitData = (await db.query(
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
            wk12_posts.id = $1
        GROUP BY
            wk12_posts.id, 
            wk12_users.clerk_id, 
            wk12_users.username,
            wk12_users.avatar,
            wk12_departments.gender,
            wk12_styles.style_name,
            wk12_styles.style_img

        `
    , [params.id])).rows[0]

    const descriptionTopSection = (
        <p>
            An outfit by <Link href={`/creators/${outfitData.clerk_id}`}>{outfitData.username}</Link>
        </p>
    )

    // FUNCTION TO SUBMIT COMMENT
    async function submitComment(formData) {
        "use server"

        // FORM INPUT VARIABLES
        const post_id = outfitData.id
        const user_id = userId
        const content = formData.get("content")

        await db.query(
            `INSERT INTO wk12_comments (
                post_id,
                user_id,
                content
            )
            VALUES ($1, $2, $3)`
            ,
            [
                post_id,
                user_id,
                content
            ]
        )
        
        revalidatePath(`/outfits/${outfitData.id}`)
        redirect(`/outfits/${outfitData.id}`)
    }


    return (
        <div>
            <TopSection
                title={outfitData.title}
                description={descriptionTopSection}
                bgImg={outfitData.style_img}
                />

            {/* MAIN PAGE AREA */}
            <section className="main-adjust">

                {/* POST ACTIONS */}
                <ActionsOutfits outfitId={outfitData.id} outfitUserId={outfitData.clerk_id}/>
            
                {/* OUTFIT INFORMATION AREA*/}
                <div className="page-container">

                    {/* CATEGORY & USER AREA */}
                    <div className="categories-user-area">
                        {/* CATEGORIES */}
                        <div>
                            <div className="outfit-categories">
                                <p>{outfitData.gender} / <Link href={`/outfits/styles/${outfitData.style_id}`}>{outfitData.style_name}</Link></p>
                            </div>
                        </div>
                        {/* USERNAME & AVATAR */}
                        <div className="outfit-user-area">
                            <UserIcon iconUserId={outfitData.clerk_id} iconUserName={outfitData.username} iconUserAvatar={outfitData.avatar}/>
                        </div>
                    </div>

                    {/* OUTFIT IMAGES */}
                    <div>
                        <div className="outfit-images-area">

                            {/* LARGE IMAGE - TOP */}
                            <div className="outfit-img-large-container">
                                <Image
                                    width="400"
                                    height="400"
                                    src={outfitData.top_img ? outfitData.top_img : "/no-image.webp"}
                                    className="outfit-img-large"
                                    alt="Outfit Image 1"
                                    />
                            </div>

                            {/* SMALLER IMAGES - EVERYTHING ELSE */}
                            <div className="outfit-imgs">
                                {outfitData.bottom_img && (
                                <div className="outfit-img-small-container">
                                    <Image 
                                        width="200" 
                                        height="200"
                                        src={outfitData.bottom_img ? outfitData.bottom_img : "/no-image.webp"}
                                        className="outfit-img-small"
                                        alt="Outfit Image 2"
                                        />
                                </div>
                                )}

                                {outfitData.foot_img && (
                                <div className="outfit-img-small-container">
                                    <Image width="200" height="200"
                                        src={outfitData.foot_img ? outfitData.foot_img : "/no-image.webp"}
                                        className="outfit-img-small"
                                            alt="Outfit Image 3"
                                            />
                                </div>
                                )}

                                {outfitData.shoes_img && (
                                <div className="outfit-img-small-container">
                                    <Image width="200" height="200"
                                        src={outfitData.shoes_img ? outfitData.shoes_img : "/no-image.webp"}
                                        className="outfit-img-small"
                                        alt="Outfit Image 4"
                                        />
                                </div>
                                )}

                                {outfitData.outerwear_img && (
                                <div className="outfit-img-small-container">
                                    <Image width="200" height="200"
                                        src={outfitData.outerwear_img ? outfitData.outerwear_img : "/no-image.webp"} 
                                        className="outfit-img-small"
                                        alt="Outfit Image 5"
                                        />
                                </div>
                                )}

                                {outfitData.accessory1_img && (
                                <div className="outfit-img-small-container">
                                    <Image width="200" height="200"
                                        src={outfitData.accessory1_img ? outfitData.accessory1_img : "/no-image.webp"}
                                        className="outfit-img-small"
                                        alt="Outfit Image 6"
                                        />
                                </div>
                                )}

                                {outfitData.accessory2_img && (
                                <div className="outfit-img-small-container">
                                    <Image width="200" height="200"
                                        src={outfitData.accessory2_img ? outfitData.accessory2_img : "/no-image.webp"}
                                        className="outfit-img-small"
                                        alt="Outfit Image 7"
                                        />
                                </div>
                                )}

                                {outfitData.accessory3_img && (
                                <div className="outfit-img-small-container">
                                    <Image width="200" height="200"
                                        src={outfitData.accessory3_img ? outfitData.accessory3_img : "/no-image.webp"}
                                        className="outfit-img-small"
                                        alt="Outfit Image 8"
                                        />
                                </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* ABOUT OUTFIT */}
                    <div className="outfit-about">
                        <h2 className={`${titleFont.className} page-title`}>About {outfitData.title}</h2>
                        <p className="outfit-about-description">{outfitData.description}</p>
                    </div>

                </div>


                {/* PURCHASE OUTFIT PIECES */}
                    <div className="page-container">
                        <h2 className={`${titleFont.className} page-title`}>Purchase Outfit Pieces</h2>

                            <div className="purchase-imgs">
                                
                                {outfitData.top_img && outfitData.top_url && (
                                <Link href={outfitData.top_url} target="_blank">
                                    <div className="purchase-img-small-container">
                                        <Image width="200" height="200"
                                            src={outfitData.top_img ? outfitData.top_img : "/no-image.webp"}
                                            className="purchase-img-small"
                                            aria-label="Link to purchase outfit piece 1"
                                            />
                                    </div>
                                </Link>
                                )}

                                {outfitData.bottom_img && outfitData.bottom_url && (
                                <Link href={outfitData.bottom_url} target="_blank">
                                    <div className="purchase-img-small-container">
                                        <Image width="200" height="200"
                                            src={outfitData.bottom_img ? outfitData.bottom_img : "/no-image.webp"}
                                            className="purchase-img-small"
                                            aria-label="Link to purchase outfit piece 2"
                                            />
                                    </div>
                                </Link>
                                )}

                                {outfitData.foot_img && outfitData.foot_url && (
                                <Link href={outfitData.foot_url} target="_blank">
                                    <div className="purchase-img-small-container">
                                        <Image width="200" height="200"
                                            src={outfitData.foot_img ? outfitData.foot_img : "/no-image.webp"}
                                            className="purchase-img-small"
                                            aria-label="Link to purchase outfit piece 3"
                                            />
                                    </div>
                                </Link>
                                )}

                                {outfitData.shoes_img && outfitData.shoes_url && (
                                <Link href={outfitData.shoes_url} target="_blank">
                                    <div className="purchase-img-small-container">
                                        <Image width="200" height="200"
                                            src={outfitData.shoes_img ? outfitData.shoes_img : "/no-image.webp"}
                                            className="purchase-img-small"
                                            aria-label="Link to purchase outfit piece 4"
                                            />
                                    </div>
                                </Link>
                                )}

                                {outfitData.outerwear_img && outfitData.outerwear_url && (
                                <Link href={outfitData.outerwear_url} target="_blank">
                                    <div className="purchase-img-small-container">
                                        <Image width="200" height="200"
                                            src={outfitData.outerwear_img ? outfitData.outerwear_img : "/no-image.webp"} 
                                            className="purchase-img-small"
                                            aria-label="Link to purchase outfit piece 5"
                                            />
                                    </div>
                                </Link>
                                )}

                                {outfitData.accessory1_img && outfitData.accessory1_url && (
                                <Link href={outfitData.accessory1_url} target="_blank">
                                    <div className="purchase-img-small-container">
                                        <Image width="200" height="200"
                                            src={outfitData.accessory1_img ? outfitData.accessory1_img : "/no-image.webp"}
                                            className="purchase-img-small"
                                            aria-label="Link to purchase outfit piece 6"
                                            />
                                    </div>
                                </Link>
                                )}

                                {outfitData.accessory2_img && outfitData.accessory2_url && (
                                <Link href={outfitData.accessory2_url} target="_blank">
                                    <div className="purchase-img-small-container">
                                        <Image width="200" height="200"
                                            src={outfitData.accessory2_img ? outfitData.accessory2_img : "/no-image.webp"}
                                            className="purchase-img-small"
                                            aria-label="Link to purchase outfit piece 7"
                                            />
                                    </div>
                                </Link>
                                )}

                                {outfitData.accessory3_img && outfitData.accessory3_url && (
                                <Link href={outfitData.accessory3_url} target="_blank">
                                    <div className="purchase-img-small-container">
                                        <Image width="200" height="200"
                                            src={outfitData.accessory3_img ? outfitData.accessory3_img : "/no-image.webp"}
                                            className="purchase-img-small"
                                            aria-label="Link to purchase outfit piece 8"
                                            />
                                    </div>
                                </Link>
                                )}

                            </div>
                        </div>
            </section>

            <hr />

            {/* COMMENT SECTION */}
            <FormComment action={submitComment}/>
            <TableComments outfitId={outfitData.id}/>

        </div>
    )
}