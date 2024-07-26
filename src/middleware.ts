// MODULES
import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"


// CLERK MIDDLEWARE
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})


// LIST OF PROTECTED ROUTES
// Website viewers are prohibited from accessing any of these routes if they are not logged in
const isProtectedRoute = createRouteMatcher([
  "/account/complete-registration",
  "/outfits/submit-outfit",
  "/outfits/styles/submit-style",
  "/outfits/(.*)/edit",
  "/outfits/edit-comment/(.*)",
  "/creators/(.*)/edit",
])


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}