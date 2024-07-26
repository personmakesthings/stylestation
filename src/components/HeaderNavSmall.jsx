// DIRECTIVE
"use client"

// MODULES
import { useState, useEffect } from "react"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import { useAuth } from "@clerk/nextjs"


// COMPONENT
export default function HeaderNavSmall({userData}) {

    // GET USERID FROM CLERK
    const { userId } = useAuth()

    // CLOSE BURGER MENU
    // When display is greater than burger menu display threshold
    const [isPopoverOpen, setPopoverOpen] = useState(false)

    // window.innerWidth >= [number] -- must match CSS media queries value for small displays
    function handleResize() {
        if (window.innerWidth >= 865) {
            setPopoverOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    function togglePopover() {
        setPopoverOpen(prevState => !prevState)
    }


    return (
        <nav className="nav-small">
            <button onClick={togglePopover} className="burger-button" aria-label="Toggle Burger Menu"/>
            {isPopoverOpen && (
                <div id="burger-menu" className="popover">
                    <ul className="nav-small-links">
                        <li><Link href="/outfits">Outfits</Link></li>
                        <li><Link href="/outfits/styles">Styles</Link></li>
                        <li><Link href="/creators">Creators</Link></li>
                    </ul>

                    <hr />

                    <div className="burger-menu-user-area">
                        <SignedOut>
                            <SignInButton>
                                <button className="small-btn">Log In</button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <SignOutButton>
                                <button className="small-btn">Log Out</button>
                            </SignOutButton>
                            <Link href={userData?.clerk_id === userId ? `/creators/${userId}` : `/account/complete-registration`}><button className="small-btn">My Profile</button></Link>
                            <Link href="/outfits/submit-outfit"><button className="small-btn">New Outfit</button></Link>
                        </SignedIn>
                    </div>

                </div>
            )}
        </nav>
    )
}
