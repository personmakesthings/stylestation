// MODULES
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

// COMPONENTS
import ActionsOutfitsDelete from "./ActionsOutfitsDelete"


// COMPONENT
export default function ActionsOutfits({outfitId, outfitUserId}) {

    // VALIDATE USER
    const {userId, sessionClaims} = auth()

    if (userId === outfitUserId
        || sessionClaims?.metadata.role === "moderator"
        || sessionClaims?.metadata.role === "admin"
        ) {
    return (
        <div className="action-bar-big">
            <p><b>Outfit Actions</b></p>
            <div className="action-bar-buttons">
                <Link href={`/outfits/${outfitId}/edit`}>
                    <button className="small-btn">
                        Edit Outfit
                    </button>
                </Link>
                <ActionsOutfitsDelete outfitId={outfitId} />
            </div>
        </div>
    )
    } else {
        return <></> // Displays nothing if the user is not validated to use actions
    } 
}

