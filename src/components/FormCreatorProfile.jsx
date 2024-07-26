// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})


// COMPONENT
export default function FormCreatorProfile({action, creatorData}) {

    // POPULATE FORM DATA IF AN UPDATE QUERY
    let initialData = null // declare variable outside conditional scope
    if (creatorData) {
        initialData = creatorData
    }

    return (
        <form action={action} className="form-outfit">

        <section className="form-container">
            <div className="form-title">
                <h1 className={`${titleFont.className} page-title`}>Creator Profile</h1>
            </div>

            {!initialData && 
            <div className="form-area">
                <label htmlFor="username">Display Name</label>
                <input name="username" placeholder="Your username" required maxLength="12" />
            </div>}

            <div className="form-area">
                <label htmlFor="avatar">Profile Image</label>
                <input name="avatar" placeholder="URL to upload your image" required maxLength="200" defaultValue={initialData ? initialData.avatar : null}/>
            </div>

            <div className="form-area">
                <label htmlFor="location">Location</label>
                <input name="location" placeholder="Where are you from?" required maxLength="30" defaultValue={initialData ? initialData.location : null}/>
            </div>

            <div className="form-area">
                <label htmlFor="bio">Bio</label>
                <textarea name="bio" placeholder="Tell a little more about you!" required maxLength="255" defaultValue={initialData ? initialData.bio : null}/>
            </div>

            <button type="submit" className="small-btn submit">{!initialData ? `Complete Registration` : `Update Profile`}</button>
        </section>
            

    </form>
    )
}