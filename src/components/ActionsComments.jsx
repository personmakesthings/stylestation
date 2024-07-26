// MODULES
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import ActionsCommentsDelete from "./ActionsCommentsDelete"


// COMPONENT
export default function ActionsComments({commentId, commentUserId}) {

    // VALIDATE USER
    const {userId, sessionClaims} = auth()

    if (userId === commentUserId
        || sessionClaims?.metadata.role === "moderator"
        || sessionClaims?.metadata.role === "admin"
        ) {
    return (
        <div className="actions-comments">
            <Link href={`/outfits/edit-comment/${commentId}`}><button className="actions-comments-button">Edit</button></Link>
            <ActionsCommentsDelete commentId={commentId} />
        </div>
    )
    } else {
        return <></> // Displays nothing if the user is not validated to use actions
    } 
}