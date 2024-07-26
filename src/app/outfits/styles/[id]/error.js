// DIRECTIVE
"use client"

// MODULES
import Link from "next/link"

// COMPONENTS
import TopSection from "@/components/TopSection"


// PAGE
export default function Page() {
    return (
        <>
            <TopSection
                title="Style Not Found"
                />

            <section className="main-adjust-2">
                <div className="page-container">
                    <div className="page-not-found">
                        <p className="page-title-3">The requested style could not be found on StyleStation</p>
                        <Link href="/outfits/styles">← Return to styles page</Link>
                    </div>
                </div>
            </section>
        </>
    )
}