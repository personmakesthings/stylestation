// MODULES
import Link from "next/link"
import Image from "next/image"

// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})


// COMPONENT
export default function Footer() {
    return (
        <footer>

            <div className="footer-content">

                <ul className="footer-nav">
                    <li><Link href="/about-us">ABOUT US</Link></li>
                    <li><Link href="https://github.com/personmakesthings/stylestation">HELP</Link></li>
                    <li><Link href="https://github.com/personmakesthings/">CONTACT</Link></li>
                </ul>

                <div className="footer-2">

                    <div className="social-media">
                        <Link href="/"><Image width="40" height="40" src="/ui-images/social-media-icons-01.webp" className="sm-icon" alt="Instagram Icon"/></Link>
                        <Link href="/"><Image width="40" height="40"  src="/ui-images/social-media-icons-02.webp" className="sm-icon" alt="YouTube Icon"/></Link>
                        <Link href="/"><Image width="40" height="40"  src="/ui-images/social-media-icons-03.webp" className="sm-icon" alt="Pinterest Icon"/></Link>
                        <Link href="/"><Image width="40" height="40"  src="/ui-images/social-media-icons-04.webp" className="sm-icon" alt="TikTok Icon"/></Link>
                        <Link href="/"><Image width="40" height="40"  src="/ui-images/social-media-icons-05.webp" className="sm-icon" alt="Facebook Icon"/></Link>
                    </div>

                    <h1 className={`${titleFont.className} site-title`}>
                        <Link href="/">STYLE⬩STATION</Link>
                    </h1>

                </div>

            </div>
            
            <p className="footer-text">Copyright &copy; StyleStation 2024</p>

        </footer>
    )
}