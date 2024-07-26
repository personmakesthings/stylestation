// MODULES
import { SignUp } from "@clerk/nextjs"

// COMPONENTS
import HeaderSpacer from "@/components/HeaderSpacer"

// PAGE
export default function Page() {
  return (
    <div>
      <HeaderSpacer />
      <div className="account-container">
        <SignUp/>
      </div>
    </div>
  )
}