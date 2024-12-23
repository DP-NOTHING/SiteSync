import { SignIn, SignedOut } from "@clerk/clerk-react";

type Props = {};

const SignInPage = (props: Props) => {
  type SignInProps = {
    emailAddress?: string;
    username?: string;
    phoneNumber?: string;
  };

  return (
    <SignedOut>
      <SignIn path="/sign-in" routing="path" signUpUrl="sign-up" />
    </SignedOut>
  );
};

export default SignInPage;
