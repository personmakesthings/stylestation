// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// COMPONENTS
import HeaderSpacer from "@/components/HeaderSpacer"


// COMPONENT
export default function TopSection({title, description, bgImg}) {

    // Variable for inline styles to change background image as a prop
    const bgStyle = bgImg ? { background: `url("${bgImg}")` } : {}

    return (
        <section className="top-section">
            <HeaderSpacer />
            <div className="top-content">
                <h1 className={`${titleFont.className} top-title`}>{title}</h1>
                <div className="top-description">{description}</div>
            </div>
            <div className="top-bg" style={bgStyle}/>
            <div className="top-gradient" />
        </section>
    )
}
