// FONTS
import { Bebas_Neue } from "next/font/google"
const titleFont = Bebas_Neue({ subsets: ["latin"], weight: "400"})

// MODULES
import Link from "next/link"

// DATABASE CONNECTION
import { db } from "@/utils/db"

// COMPONENTS
import HeaderSpacer from "@/components/HeaderSpacer"
import CardsOutfits from "@/components/CardsOutfits"
import CardsStyles from "@/components/CardsStyles"


// PAGE
export default async function Home() {

  // GET LATEST OUTFITS
  const outfitsData = (await db.query(
      `
      SELECT
          wk12_posts.*,
          wk12_users.clerk_id,
          wk12_users.username,
          wk12_users.avatar, 
          wk12_departments.gender,
          wk12_styles.style_name
      FROM
          wk12_posts
      LEFT JOIN
          wk12_users
      ON
          wk12_posts.user_id = wk12_users.clerk_id
      LEFT JOIN
          wk12_departments
      ON
          wk12_departments.id = wk12_posts.department_id
      LEFT JOIN
          wk12_styles
      ON
          wk12_styles.id = wk12_posts.style_id
      GROUP BY
          wk12_posts.id, 
          wk12_users.clerk_id, 
          wk12_users.username,
          wk12_users.avatar,
          wk12_departments.gender,
          wk12_styles.style_name
      ORDER BY
          wk12_posts.id DESC
      LIMIT 10
      `
  )).rows


  // GET STYLES
  const styles = (await db.query(
    `
    SELECT * FROM wk12_styles
    ORDER BY id ASC
    LIMIT 10
    `
  )).rows


  // CARDS - ARRAYS FOR ANIMATION LOOP
  const usersLatest = [<CardsOutfits outfitsData={outfitsData}/>]
  const stylesList= [<CardsStyles stylesData={styles}/>]

  
  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero-section">
        <HeaderSpacer />

        <div className="hero-bg-img"/>

        <div className="hero-content">
          <h1 className={`${titleFont.className} hero-title`}>Discover Your <b>Perfect Outfit</b></h1>
          <p className="hero-text">Perfect outfits tailored for everyone's favourite styles.</p>
        </div>
        
      </section>


      {/* SECTION 1 */}
      <section className="section-1">
        <div className="section-content">

          {/* TITLE AND NAVIGATION */}
          <div className="section-nav">
            <h1 className={`${titleFont.className} page-title`}>Latest Outfits</h1>
            <h2><Link href="/outfits/">See More →</Link></h2>
          </div>

          {/* PREVIEW CONTENT */}
          <div className="cards-loop-container">
              {usersLatest.concat(usersLatest).map((item, index) => (
                <div className="cards-loop">
                  {item}
                </div>
              ))}
          </div>

        </div>
      </section>


      {/* SECTION 2 */}
      <section className="section-2">
        <div className="section-content">

          {/* TITLE AND NAVIGATION */}
          <div className="section-nav section-nav2">
            <h1 className={`${titleFont.className} page-title`}>Find Your Style</h1>
            <h2><Link href="/outfits/styles">More Styles →</Link></h2>

          </div>

          {/* PREVIEW CONTENT */}
          <div className="cards-loop-container">
              {stylesList.concat(stylesList).map((item, index) => (
                <div className="cards-loop">
                  {item}
                </div>
              ))}
          </div>

        </div>
      </section>

    </div>
  )
}
