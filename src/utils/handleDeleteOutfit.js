// DIRECTIVE
"use server"

// DATABASE CONNECTION
import { db } from "./db"

// MODULES
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


// FUNCTION
export async function handleDeleteOutfit(outfitId) {

    // DELETE OUTFIT QUERY
    await db.query(
        `
        DELETE FROM
            wk12_posts
        WHERE
            id = $1
        `
        , [outfitId])
    
    revalidatePath("/outfits/")
    redirect("/outfits/")
}