// DATABASE CONNECTION
import { db } from "@/utils/db"

// COMPONENTS
import TopSection from "@/components/TopSection"
import CardsCreators from "@/components/CardsCreators"


// PAGE
export default async function Page() {

    // GET USERS FROM DATABASE
    const creatorsData = (await db.query(
        `
        SELECT * FROM wk12_users
        ORDER BY id DESC
        `
    )).rows

    return (
        <div>
            <TopSection
                title="Explore Our Creators"
                />

            <section className="main-adjust-2">
                <div className="card-rows">
                    <CardsCreators creatorsData={creatorsData} />
                </div>
            </section>
            
        </div>
    )
}