// DIRECTIVE
"use client"

// MODULES
import { useState } from "react"

// FUNCTIONS
import { handleDeleteOutfit } from "@/utils/handleDeleteOutfit"


// COMPONENT
export default function ActionsOutfitsDelete({outfitId}) {
    const [confirmDelete, setConfirmDelete] = useState(false)

    function initialClick() {
        setConfirmDelete(true)
        setTimeout(() => {setConfirmDelete(false)}, 5000)
    }

    function confirmClick() {
        handleDeleteOutfit(outfitId)
    }

    return (
        <>
        {confirmDelete ? (
                <button onClick={confirmClick} className="small-btn">
                    Confirm Delete
                </button>
            ) : (
                <button onClick={initialClick} className="small-btn">
                    Delete Outfit
                </button>
            )}
        </>
    )
}