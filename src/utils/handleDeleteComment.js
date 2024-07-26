// DIRECTIVE
"use server"

// DATABASE CONNECTION
import { db } from "./db"

// MODULES
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


// FUNCTION
export async function handleDeleteComment(commentId, outfitUrl) {

    // DELETE COMMENT QUERY
    db.query(
        `
        DELETE FROM
            wk12_comments
        WHERE
            id = $1
        `
        , [commentId])
    
    // REVALIDATE & REDIRECT
    revalidatePath(outfitUrl)
    redirect(outfitUrl)
}