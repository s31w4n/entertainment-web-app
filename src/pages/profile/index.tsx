import React, { useState } from "react";
import { ProfilePageProps as T } from "@/types";
import type { NextPage, GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useAppDispatch } from "@/app/hooks";
import { authActions } from "@/features/auth/authSlice";
import { Heading, ChangePasswordFrom, AuthButton } from "@/components";

const Profile: NextPage<T> = ({ session }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userEmail = session.user.email;

  const logoutHandler = () => {
    setIsLoading(true);
    dispatch(authActions.logout());
    signOut();
    setIsLoading(false);
  };

  return (
    <section className="mt-10 sm:mt-16">
      <Heading title={`You are logged in as '${userEmail}'.`} />
      <Heading title="You can change your password below." />
      <div className="mt-[80px] flex justify-center sm:mt-[50px] lg:mt-[119px]">
        <div className="relative h-auto w-[327px] rounded-lg bg-app-semi-dark-blue p-6 sm:w-[400px] sm:p-8">
          <div className="mb-10">
            <h1 className="text-app-heading-lg font-light">Change password</h1>
          </div>
          <ChangePasswordFrom />
          <AuthButton
            isLoading={isLoading}
            text="Logout"
            onClick={logoutHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get Session
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
