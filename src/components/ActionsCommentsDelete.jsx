// DIRECTIVE
"use client"

// MODULES
import { usePathname } from "next/navigation"
import { useState } from "react"

// FUNCTION
import { handleDeleteComment } from "@/utils/handleDeleteComment"


// COMPONENT
export default function ActionsCommentsDelete({commentId}) {
    
    // Pass current path to delete function to revalidate path & redirect to current page
    const outfitUrl = usePathname()


    // Delete confirmation functions
    const [confirmDelete, setConfirmDelete] = useState(false)

    function initialClick() {
        setConfirmDelete(true)
        setTimeout(() => {setConfirmDelete(false)}, 5000)
    }

    function confirmClick() {
        handleDeleteComment(commentId, outfitUrl)
        setConfirmDelete(false)
    }

    return (
        <>
            {confirmDelete ? (
                <button onClick={confirmClick} className="actions-comments-button">
                    Confirm Delete
                </button>
            ) : (
                <button onClick={initialClick} className="actions-comments-button">
                    Delete Comment
                </button>
            )}
        </>
    )
}