# StyleStation

Website demo on Render: https://stylestation.onrender.com/

**StyleStation is a social media site for users to share and discover outfits with other fashion enthusiasts.**


# Features
- User login with Clerk
- View user-submitted outfits
- Filter submitted outfits by category ("department", "styles")
- Create and submit outfits
- Create and submit categories ("styles")
- Post comments to outfits
- Update & delete outfits
- Update & delete comments
- User profiles
- Update user profile
- User roles and permissions


# Future features being consider
- Validation library
- User roles in profile
- Post karma or react to posts (e.g. like, heart, sad face, laughing)
- Favourite posts
- Follow users




# Set up your own instance
**Technical overview**: The website was created with Next.js. User authentication is handled with Clerk and the website utilises a Postgres database (e.g. Supabase) for storing user-submitted content, with SQL queries handled by the node-postgres package.


*instructions to be added*



# Known issues
## Major - will be fixed in next version update
- Next `<Image>` does not handle invalid (not an image) `src` attributes, leading to page crash if invalid URL is submitted


## UX-related
- Burger menu doesn't automatically close upon loading another page
- Improved image display in cards
