// MODULES
import Link from "next/link"
import {SignedIn, SignedOut, SignInButton} from "@clerk/nextjs"

// COMPONENTS
import HeaderNavLargeUserArea from "./HeaderNavLargeUserArea"


// COMPONENT
export default function HeaderNavLarge() {

    return (
        <>
        <nav className="nav-large">
            <div className="navlinks">
                <Link href="/outfits">Latest Outfits</Link>
                <Link href="/outfits/styles">Styles</Link>
                <Link href="/creators">Creators</Link>

                <SignedOut>
                    <SignInButton>
                        <button className="small-btn">Log In</button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <Link href="/outfits/submit-outfit"><button className="small-btn" aria-label="New Outfit">New Outfit</button></Link>
                    <HeaderNavLargeUserArea />
                </SignedIn>
            </div>
        </nav>
    </>
    )
}