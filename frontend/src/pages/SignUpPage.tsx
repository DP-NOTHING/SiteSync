import { SignUp, SignedOut } from "@clerk/clerk-react";

type Props = {};

const SignUpPage = (props: Props) => {
  type SignUpProps = {
    emailAddress?: string;
    username?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
  };

  const initialvalues: SignUpProps = {
    emailAddress: "deep@gmail.com",
    firstName: "Deep",
    lastName: "Patel",
  };
  return (
    <div className="center-container">
      <SignedOut>
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="sign-in"
          fallbackRedirectUrl="/dashboard"
        />
      </SignedOut>
    </div>
  );
};

export default SignUpPage;
