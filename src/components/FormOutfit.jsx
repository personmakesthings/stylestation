// DATABASE CONNECTION
import { db } from "@/utils/db"

// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// MODULES
import Link from "next/link"


// COMPONENT
export default async function FormOutfit({action, outfitData}) {

    // POPULATE FORM DATA IF AN UPDATE QUERY
    let initialData = null // declare variable outside conditional scope
    if (outfitData) {
        initialData = outfitData
    }

    // QUERY DATABASE FOR STYLES CATEGORIES
    const stylesData = (await db.query(`SELECT * FROM wk12_styles`)).rows

    return (
        <form action={action} className="form-outfit">
            <section className="form-container">
                <div className="form-title">
                    <h1 className={`${titleFont.className} page-title`}>Outfit Details</h1>
                </div>


                <div className="form-area">
                    <label htmlFor="department_id">Department</label>
                    <select name="department_id" id="department_id" required defaultValue={initialData ? initialData.department_id : null}>
                        <option value="" disabled selected>Select department</option>
                        <option value="1">Womenswear</option>
                        <option value="2">Menswear</option>
                        <option value="3">Unisex</option>
                    </select>
                </div>

                <div className="form-area">
                    <label htmlFor="style_id">Style Category</label>
                    <select name="style_id" id="style_id" required defaultValue={initialData ? initialData.style_id : null}>
                        <option value="" disabled selected>Select outfit's style</option>
                        {stylesData.map((style)=>{
                            return (
                                <option value={style.id}>
                                    {style.style_name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                    <p className="form-text">Can't find a matching style for your outfit? <b><Link href="/outfits/styles/submit-style" target="_blank">Submit your own!</Link></b></p>

                <hr />

                <div className="form-area">
                    <label htmlFor="title">Outfit Name</label>
                    <input name="title" id="title" placeholder="Name your outfit!" required maxLength="25" defaultValue={initialData ? initialData.title : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="description">Outfit Description</label>
                    <textarea name="description" id="description" placeholder="Give some more details about your outfit!" required defaultValue={initialData ? initialData.description : null}/>
                </div>
            </section>

            <section className="form-container">
                <h1 className={`${titleFont.className} page-title`}>Outfit Pieces</h1>

                <div className="form-text">
                    <p>To help us feature your outfit, please stick to the following guidelines:</p>
                    <ol>
                        <li>
                            <b>Image Submission</b>: Upload a clear and well-lit image of each clothing piece. Ensure that each item is easily identifiable and presented in a flattering manner. We prefer that users upload singular images of each clothing piece without a model or backdrop, such as an official image of the product provided directly by the brand.
                        </li>
                        <li>
                            <b>Purchase Link</b>: Provide a direct link (URL) to the webpage where the clothing piece can be purchased. This helps other users easily find & purchase pieces for the outfits they love.
                        </li>
                    </ol>
                    <p>Thank you for sharing your fashion inspiration with us!</p>
                </div>


                {/* OUTFIT ESSENTIALS */}
                <h2>Outfit Essentials</h2>

                <p className="form-text"><i>For a complete submission, your outfit must at a minimum contain one upper body item (e.g. a dress), submitted in the topwear section.</i></p>
                <p className="form-text">Topwear includes garments worn on the upper body, such as tops, shirts, blouses, sweaters, and dresses.</p>
                <p className="form-text"></p>

                <div className="form-area">
                    <label htmlFor="top_img">Topwear Image</label>
                    <input name="top_img" id="top_img" placeholder="Image URL of top" maxLength="200" required defaultValue={initialData ? initialData.top_img : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="top_url">Topwear - Product Link</label>
                    <input name="top_url" id="top_url" placeholder="URL of top" maxLength="200" required defaultValue={initialData ? initialData.top_url : null}/>
                </div>

                <p className="form-text">Bottomwear refers to garments worn on the lower half of the body, including trousers, skirts, shorts, and leggings, which form a key part of your outfit's overall look.</p>

                <div className="form-area">
                    <label htmlFor="bottom_img">Bottomwear Image</label>
                    <input name="bottom_img" id="bottom_img" placeholder="Image URL of bottom" maxLength="200" defaultValue={initialData ? initialData.bottom_img : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="bottom_url">Bottomwear - Product Link </label>
                    <input name="bottom_url" id="bottom_url" placeholder="URL of bottom" maxLength="200" defaultValue={initialData ? initialData.bottom_url : null}/>
                </div>


                {/* LEGWEAR */}
                <h2>Legwear & Feet</h2>

                <p className="form-text">Leg & Footwear includes items such as socks and hosiery that cover and add style to the legs.</p>

                <div className="form-area">
                    <label htmlFor="foot_img">Leg & Footwear Image</label>
                    <input name="foot_img" id="foot_img" placeholder="Image URL of foot" maxLength="200" defaultValue={initialData ? initialData.foot_img : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="foot_url">Leg & Footwear - Product Link</label>
                    <input name="foot_url" id="foot_url" placeholder="URL of foot" maxLength="200" defaultValue={initialData ? initialData.foot_url : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="shoes_img">Shoes Image</label>
                    <input name="shoes_img" id="shoes_img" placeholder="Image URL of shoes" maxLength="200" defaultValue={initialData ? initialData.shoes_img : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="shoes_url">Shoes - Product Link</label>
                    <input name="shoes_url" id="shoes_url" placeholder="URL of shoes" maxLength="200" defaultValue={initialData ? initialData.shoes_url : null}/>
                </div>


                {/* OUTERWEAR */}
                <h2>Outerwear</h2>

                <p className="form-text">Outerwear includes coats, jackets, cardigans, and other pieces that are worn over your main outfit.</p>

                <div className="form-area">
                    <label htmlFor="outerwear_img">Outerwear Image</label>
                    <input name="outerwear_img" id="outerwear_img" placeholder="Image URL of outerwear" maxLength="200" defaultValue={initialData ? initialData.outerwear_img : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="outerwear_url">Outerwear - Product Link</label>
                    <input name="outerwear_url" id="outerwear_url" placeholder="URL of outerwear" maxLength="200" defaultValue={initialData ? initialData.outerwear_url : null}/>
                </div>


                {/* ACCESSORIES */}
                <h2>Accessories</h2>

                <p className="form-text">Accessories include optional items like jewellery, scarves, and other outfit embellishments.</p>

                <div className="form-area">
                    <label htmlFor="accessory1_img">Accessory 1 Image</label>
                    <input name="accessory1_img" id="accessory1_img" placeholder="Image URL of accessory 1" maxLength="200" defaultValue={initialData ? initialData.accessory1_img : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="accessory1_url">Accessory 1 - Product Link</label>
                    <input name="accessory1_url" id="accessory1_url" placeholder="URL of accessory 1" maxLength="200" defaultValue={initialData ? initialData.accessory1_url : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="accessory2_img">Accessory 2 Image</label>
                    <input name="accessory2_img" id="accessory2_img" placeholder="Image URL of accessory 2" maxLength="200" defaultValue={initialData ? initialData.accessory2_img : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="accessory2_url">Accessory 2 - Product Link</label>
                    <input name="accessory2_url" id="accessory2_url" placeholder="URL of accessory 2" maxLength="200" defaultValue={initialData ? initialData.accessory2_url : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="accessory3_img">Accessory 3 Image</label>
                    <input name="accessory3_img" id="accessory3_img" placeholder="Image URL of accessory 3" maxLength="200" defaultValue={initialData ? initialData.accessory3_img : null}/>
                </div>

                <div className="form-area">
                    <label htmlFor="accessory3_url">Accessory 3 - Product Link</label>
                    <input name="accessory3_url" id="accessory3_url" placeholder="URL of accessory 3" maxLength="200" defaultValue={initialData ? initialData.accessory3_url : null}/>
                </div>

                <button type="submit" className="small-btn submit">Submit Outfit</button>

        </section>
    </form>
    )
}