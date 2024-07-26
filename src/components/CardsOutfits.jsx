// MODULES
import Link from "next/link"
import Image from "next/image"


// COMPONENT
export default function TableOutfits({outfitsData}) {
    if (outfitsData.length === 0) {
        return (
            <p>No outfits currently available. <b><Link href="/outfits/submit-outfit">Submit your own now!</Link></b></p>
        )
    }
    return (
        <>
            {outfitsData.map((outfit) => {
                return (
                    <div className="card card-outfit">
                        <div className="card-outfit-categories">
                            <p><b>{outfit.gender} / <Link href={`/outfits/styles/${outfit.style_id}`}>{outfit.style_name}</Link></b></p>
                        </div>

                        
                        <Link href={`/outfits/${outfit.id}`}>
                        <div className="card-outfit-imgs">
                            <div className="card-img-large-container" aria-label={`Images of outfit: ${outfit.title}`}>
                                <Image
                                    width="200"
                                    height="200"
                                    src={outfit.top_img ? outfit.top_img : "/no-image-empty.webp"}
                                    className="card-img-large"
                                    alt="Outfit image 1"
                                    aria-hidden="true"
                                    />
                            </div>

                            <div className="card-imgs">
                                <div className="card-img-small-container">
                                    <Image
                                        width="200"
                                        height="200"
                                        src={outfit.bottom_img ? outfit.bottom_img : "/no-image-empty.webp"}
                                        className="card-img-small"
                                        alt="Outfit image 2"
                                        aria-hidden="true"
                                        />
                                </div>
                                <div className="card-img-small-container">
                                    <Image
                                        width="200"
                                        height="200"
                                        src={outfit.foot_img ? outfit.foot_img : "/no-image-empty.webp"}
                                        className="card-img-small"
                                        alt="Outfit image 3"
                                        aria-hidden="true"
                                        />
                                </div>
                                <div className="card-img-small-container">
                                    <Image
                                        width="200"
                                        height="200"
                                        src={outfit.shoes_img ? outfit.shoes_img : "/no-image-empty.webp"}
                                        className="card-img-small"
                                        id="has-border"
                                        alt="Outfit image 4"
                                        aria-hidden="true"
                                        />
                                </div>
                                <div className="card-img-small-container">
                                    <Image
                                        width="200"
                                        height="200"
                                        src={outfit.outerwear_img ? outfit.outerwear_img : "/no-image-empty.webp"} 
                                        className="card-img-small"
                                        alt="Outfit image 5"
                                        aria-hidden="true"
                                        />
                                </div>
                                <div className="card-img-small-container">
                                    <Image
                                        width="200"
                                        height="200"
                                        src={outfit.accessory1_img ? outfit.accessory1_img : "/no-image-empty.webp"}
                                        className="card-img-small"
                                        alt="Outfit image 6"
                                        aria-hidden="true"
                                        />
                                </div>
                                <div className="card-img-small-container">
                                    <Image
                                        width="200"
                                        height="200"
                                        src={outfit.accessory2_img ? outfit.accessory2_img : "/no-image-empty.webp"}
                                        className="card-img-small"
                                        id="has-border-2"
                                        alt="Outfit image 7"
                                        aria-hidden="true"
                                        />
                                </div>
                                {/* Accessory 3 omitted to keep rows even */}
                            </div>
                        </div></Link>

                        <div className="card-outfit-title-area">
                                <Link href={`/outfits/${outfit.id}`}><h2 className="card-outfit-title">{outfit.title}</h2></Link>
                                <Link href={`/creators/${outfit.clerk_id}`}>
                                    <div className="card-outfit-title-user-area">
                                        <p>{outfit.username}</p>
                                        <div className="avatar-small-container">
                                            <Image width="200" height="200" src={outfit.avatar}
                                                className="avatar-small"
                                                alt="User Avatar"
                                                />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                    </div>
                )
            })}
        </>
    )
}