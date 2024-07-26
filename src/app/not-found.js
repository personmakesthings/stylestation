// MODULES
import Link from "next/link"

// COMPONENTS
import TopSection from "@/components/TopSection"


// PAGE
export default function Page() {
    return (
        <>
            <TopSection
                title="Not Found"
                description="Error 404"
                />

            <section className="main-adjust-2">
                <div className="page-container">
                    <div className="page-not-found">
                        <p className="page-title-3">The page you requested could not be found on StyleStation</p>
                        <Link href="/">← Return to homepage</Link>
                    </div>
                </div>
            </section>
        </>
    )
}