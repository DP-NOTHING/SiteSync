import { SignIn ,SignedOut} from '@clerk/clerk-react'

type Props = {}

const SignInPage = (props: Props) => {
  type SignInProps= {
    emailAddress?:string,
    username?:string,
    phoneNumber?:string
  }

  const initialvalues:SignInProps = {
    emailAddress:"deep@gmail.com",
  }
  return (
    <SignedOut>
          <SignIn path="/sign-in"
                  initialValues={initialvalues} 
                  routing='path'
                  signUpUrl="sign-up"/>
    </SignedOut>
  )
}

export default SignInPage