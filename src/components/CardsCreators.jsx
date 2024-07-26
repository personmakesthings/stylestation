// MODULES
import Link from "next/link"
import Image from "next/image"


// COMPONENT
export default function CardsCreators({creatorsData}) {
    if (creatorsData.length === 0) {
        return (
            <p>No creators were found. <b><Link href="/account/sign-up">Create an account with us now!</Link></b></p>
        )
    }
    return (
        <>
            {creatorsData.map((creator) => {
                return (
                    <Link href={`/creators/${creator.clerk_id}`}>
                        <div className="card-creators">
                            <div className="card-creators-avatar-container">
                                <Image width="175" height="175" className="card-creators-avatar" src={creator.avatar ? creator.avatar : "/no-image.webp"} alt={`${creator.username}'s avatar.`}/>
                            </div>
                            <p className="card-creator-name">{creator.username}</p>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}