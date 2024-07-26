// DIRECTIVE
"use client"

// MODULES
import { useState, useEffect } from "react"


// COMPONENT
export default function HeaderBg() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY
        const scrollThreshold = 50

        // no. of pixels window is vertically scrolled by > threshold
        if (currentScrollY > scrollThreshold) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className={scrolled ? "header-bg scrolled" : "header-bg"}></div>
    )
}