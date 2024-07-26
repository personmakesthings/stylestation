// MODULES
import Link from "next/link"
import Image from "next/image"


// COMPONENT
export default function CardsStyles({stylesData}) {
    if (stylesData.length === 0) {
        return (
            <p>No styles currently available. <b><Link href="/outfits/styles/submit-style">Be the first to submit one!</Link></b></p>
        )
    }
    return (
        <>
            {stylesData.map((style) => {
                return (
                    <Link href={`/outfits/styles/${style.id}`}>
                    <div className="card-styles">
                        <div className="card-styles-img-container">
                            <Image
                                width="350"
                                height="350"
                                src={style.style_img}
                                className="card-styles-img"
                                alt={`${style.style_name} Style Image`}
                                />
                        </div>
                        
                        <h2>{style.style_name}</h2>
                    </div>
                    </Link>
                )
            })}
        </>
    )
}