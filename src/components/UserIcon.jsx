// LINK
import Link from "next/link"
import Image from "next/image"


// COMPONENT
export default function UserIcon({iconUserId, iconUserName, iconUserAvatar}) {
    return (
        <Link href={`/creators/${iconUserId}`}>
        <div className="card-outfit-title-user-area">
            <p>{iconUserName}</p>
            <div className="avatar-small-container">
                <Image
                    width="40"
                    height="40"
                    src={iconUserAvatar}
                    className="avatar-small"
                    alt="User Avatar"
                    />
            </div>
        </div>
    </Link>
    )
}