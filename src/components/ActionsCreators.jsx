// MODULES
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"


// COMPONENT
export default function ActionsCreators({creatorId}) {

    // VALIDATE USER
    const {userId, sessionClaims} = auth()

    if (userId === creatorId
        || sessionClaims?.metadata.role === "moderator"
        || sessionClaims?.metadata.role === "admin"
        ) {
    return (
        <div className="action-bar-big">
            <p><b>Profile Actions</b></p>
            <div className="action-bar-buttons">
                    <Link href={`/creators/${creatorId}/edit`}><button className="small-btn">Edit Profile</button></Link>
            </div>
        </div>
    )
    } else {
        return <></> // Displays nothing if the user is not validated to use actions
    } 
}