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
    <SignedOut>
      <SignUp
        path="/sign-up"
        initialValues={initialvalues}
        routing="path"
        signInUrl="sign-in"
      />
    </SignedOut>
  );
};

export default SignUpPage;
