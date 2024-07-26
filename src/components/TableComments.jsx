// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import UserIcon from "@/components/UserIcon"
import ActionsComments from "./ActionsComments"


// COMPONENT
export default async function TableComments({outfitId}) {
    
    // GET USERID FROM CLERK
    const {userId} = auth()

    const commentData = (await db.query(
        `
        SELECT
            wk12_comments.id,
            wk12_comments.content,
            wk12_comments.post_id,
            wk12_comments.user_id,
            wk12_users.clerk_id,
            wk12_users.username,
            wk12_users.avatar
        FROM
            wk12_comments
        INNER JOIN
            wk12_users
        ON
            wk12_comments.user_id = wk12_users.clerk_id
        WHERE
            wk12_comments.post_id = $1
        ORDER BY
            wk12_comments.id DESC
        `
        , [outfitId])).rows

    if (commentData.length === 0) {
        return (
            <div className="main-adjust">
                <section className="page-container">
                    <h1 className={`${titleFont.className} page-title`}>
                        Comments
                    </h1>
                    <p>No comments yet. Be the first to join the discussion!</p>
                </section>
            </div>
        )
    }

    return (
        <div className="main-adjust">
            <section className="page-container">

                {/* TITLE */}
                <h1 className={`${titleFont.className} page-title`}>
                    Comments
                </h1>

                {/* COMMENTS LOOP */}
                {commentData.map((comment)=>{
                    return (
                        <div className="table-comments-container">
                            <div className="table-comments">

                                {/* COMMENT */}
                                <div className="table-comments-content">
                                    <p>{comment.content}</p>
                                </div>
                                
                                {/* USER ICON */}
                                <UserIcon iconUserId={comment.clerk_id} iconUserName={comment.username} iconUserAvatar={comment.avatar}/>

                            </div>
                            <ActionsComments commentId={comment.id} commentUserId={comment.clerk_id}/>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}