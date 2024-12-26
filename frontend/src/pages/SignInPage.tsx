import { SignIn, SignedOut } from "@clerk/clerk-react";

type Props = {};

const SignInPage = (props: Props) => {
  type SignInProps = {
    emailAddress?: string;
    username?: string;
    phoneNumber?: string;
  };

  return (
    <div className="center-container">
      <SignedOut>
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </SignedOut>
    </div>
  );
};

export default SignInPage;
