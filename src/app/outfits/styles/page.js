// DATABASE CONNECTION
import { db } from "@/utils/db"

// MODULES
import Link from "next/link"

// COMPONENTS
import TopSection from "@/components/TopSection"
import CardsStyles from "@/components/CardsStyles"


// PAGE
export default async function Page() {

    // GET STYLES FROMD DATABASE
    const stylesData = (await db.query(
        `
        SELECT * FROM wk12_styles
        ORDER BY id ASC
        `
    )).rows

    return (
        <div>
            <TopSection
                title="Find Your Style"
                />

            <br />
            <p className="form-text">Can't find a matching style for your outfit? <b><Link href="/outfits/styles/submit-style">Submit your own!</Link></b></p>

            <div className="main-adjust-2">
                <div className="card-rows">
                    <CardsStyles stylesData={stylesData}/>
                </div>
            </div>
        </div>
    )
}