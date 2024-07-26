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


# Future features being considered
- Validation library
- User roles in profile
- Post karma or react to posts (e.g. like, heart, sad face, laughing)
- Favourite posts
- Follow users




# Set up your own instance
**Technical overview**: The website was created with Next.js. User authentication is handled with Clerk and the website utilises a Postgres database (e.g. Supabase) for storing user-submitted content, with SQL queries handled by the node-postgres package.


**Download**
- Fork the repository and download it to your machine with `git clone`.
- Run `npm install` in the project's root directory to install dependency packages.


**Setting up environment variables**
- Copy the provided [`.env.example`](/setup-resources/.env.example) file from the folder `/setup-resources` to the root directory of your instance and rename it `.env.local`.


**Initialise database**
- Using your preferred Postgres database platform (e.g. Supabase), initalise the database for the website with the provided SQL code [`initialise-tables.sql`](/setup-resources/initialise-tables.sql) from `/setup-resources`.
- Add your database's connection URL to `CONNECTION_URL` to your instance's `.env.local` file.


**Create a Clerk application for your instance**
- Create a new application for your instance with Clerk: https://dashboard.clerk.com/apps/new
    - Recommended: Select *Email* as registration option.
- Clerk will give you a list of steps to follow. Ignore all of them (they have already been set up for the project) besides "Step 2 - Set your environment variables":
    - Copy the environment variables provided by Clerk (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`) to your instance's `.env.local` file.


**Set up users roles in your Clerk application**
- Follow the step "Configure the session token" from Clerk's documentation to add user roles to your Clerk application: https://clerk.com/docs/guides/basic-rbac#configure-the-session-token


**Running the instance**
- Go to your project's root directory and run `npm run dev`.


### Recommended
**Adding Admin role to a registered user**
- Follow the step "Set the admin role for your user" from Clerk's documentation to add an admin to your website: https://clerk.com/docs/guides/basic-rbac#configure-the-session-token



# Known issues
## Major - will be fixed in next version update
- Next `<Image>` does not handle invalid (not an image) `src` attribute values, leading to page crash if invalid URL is submitted


## UX-related
- Burger menu doesn't automatically close upon loading another page
- Improved image display needed for cards




# Attributions
## Images
- https://www.vecteezy.com/vector-art/8486250-black-and-white-social-media-icons
- https://www.vecteezy.com/vector-art/377438-hanger-vector-icon
- https://www.pexels.com/photo/black-framed-eyeglasses-on-white-jacket-and-blue-denim-bottoms-934070/
- https://www.pexels.com/photo/smiling-woman-looking-upright-standing-against-yellow-wall-1536619/