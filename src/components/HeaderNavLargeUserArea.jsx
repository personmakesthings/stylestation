// STYLES
import "./HeaderNavLargeUserArea-styles.css"

// MODULES
import { SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import React from "react"
import * as Popover from "@radix-ui/react-popover"
import Image from "next/image"


// DATABASE CONNECTION
import { db } from "@/utils/db"
import { auth } from "@clerk/nextjs/server"


// COMPONENT
export default async function HeaderNavLargeUserArea() {
    
    // GET USERID
    const {userId} = auth()

    // GET USER DATA
    const userData = (await db.query(
        `
        SELECT * FROM wk12_users
        WHERE clerk_id = $1
        `
    , [userId])).rows[0]

    return (
        <Popover.Root>

            {/* POPOVER TRIGGER ELEMENT */}
            <Popover.Trigger asChild>
                <button className="unset avatar-small-container"
                    aria-label="User Avatar"
                    role="button"
                    >
                    <Image
                        width="175"
                        height="175"
                        src={userData?.avatar || "/no-image.webp"}
                        className="avatar-small"
                        alt="User Avatar"
                        />
                </button>
            </Popover.Trigger>

            {/* POPOVER CONTENT */}
            <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={5}>
                        
                        <Link href={userData?.clerk_id === userId ? `/creators/${userData.clerk_id}` : `/account/complete-registration`}><button className="small-btn">My Profile</button></Link>

                        <SignOutButton>
                            <button className="small-btn">Log Out</button>
                        </SignOutButton>

                    <Popover.Arrow className="PopoverArrow" />
                </Popover.Content>
            </Popover.Portal>

        </Popover.Root>
    )
}