// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// MODULES
import Link from "next/link"

// COMPONENTS
import TopSection from "@/components/TopSection"


// PAGE
export default function Page() {
    return (
        <>
            <TopSection
                title="About Us"
                />

            <section className="main-adjust">
                <div className="page-container">
                    <h2 className={`${titleFont.className} page-title`}>Welcome to StyleStation!</h2>
                    <div className="about-us-text">
                        <p>We are StyleStation! Your one-stop destination for fashion inspiration, trendy outfits and connecting with other fashion enthusiasts!</p>
                        
                        <p>Here at StyleStation, we empower you to share your unique style with our vibrant community. Post your favourite outfits, discover trendy clothing pieces, and find links to easily purchase the latest must-haves from top stores.</p>
                        
                        <p>Whether you're a fashionista looking to showcase your wardrobe, or someone seeking new style ideas, StyleStation is here to connect, inspire, and elevate your fashion journey.</p>
                            
                        <p>If you haven't already signed up, <b><Link href="/account/sign-up">go ahead and do so now</Link></b>! Join us and become part of a stylish community where creativity knows no bounds!</p>
                    </div>
                </div>
            </section>
        </>
    )
}