import { useContext } from "react";
import Image from "next/image";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { GetServerSideProps, NextPage } from "next";
import { AuthContext } from "@/contexts/AuthContext";
import { Logo as LogoIMG } from "@/assets/images";
import { Button, Input } from "@/components/form";
import { Heading } from "@/components/typography";
import { signInFormSchema } from "@/utils/validations/yup";
import { styled, theme } from "@/styles/stitches.config";
import { Icon } from "@/components/media";
import { user as userIcon, lock } from "@/icons";
import { destroyCookie, parseCookies } from "nookies";
import { jwtVerify } from "jose";
import { Spinner } from "@/components/feedback";

interface SignInFormInputs {
  username: string;
  password: string;
}
const SignIn: NextPage = () => {
  const { signIn, loading: loginLoading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors: inputError },
    reset,
  } = useForm<SignInFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      username: "m1guelsb",
      password: "123",
    },
  });

  const handleSignIn: SubmitHandler<SignInFormInputs> = async ({
    username,
    password,
  }) => {
    signIn({ username, password });
    reset();
  };

  return (
    <>
      <Head>
        <title>Deals CRM</title>
      </Head>

      <Container>
        <SignInBox>
          <LogoBox>
            <Logo>
              <Image src={LogoIMG} alt="logo" />
            </Logo>
            <Heading>Deals CRM</Heading>
          </LogoBox>

          <SignInForm onSubmit={handleSubmit(handleSignIn)}>
            <Heading as={"h2"} sType={"2"}>
              Login
            </Heading>

            <Input
              placeholder="Insert username => [m1guelsb]"
              errorMessage={inputError.username?.message}
              rightIcon={<Icon src={userIcon.src} />}
              disabled={loginLoading}
              {...register("username")}
            />
            <Input
              placeholder="Insert password => [123]"
              type={"password"}
              errorMessage={inputError.password?.message}
              rightIcon={<Icon src={lock.src} />}
              disabled={loginLoading}
              {...register("password")}
            />

            <Button
              type={"submit"}
              rightIcon={loginLoading && <Spinner sType={"secondary"} />}
              disabled={loginLoading}
              css={{ width: "100%" }}
            >
              Login
            </Button>
          </SignInForm>
        </SignInBox>
      </Container>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "deals.access_token": access_token } = parseCookies(ctx);
  const secret = "123456789";

  if (access_token) {
    try {
      jwtVerify(access_token, new TextEncoder().encode(secret));

      return {
        redirect: {
          destination: "/app",
          permanent: false,
        },
      };
    } catch (err) {
      destroyCookie(ctx, "next.access_token");
    }
  }

  return {
    props: {},
  };
};

const Container = styled("div", {
  height: "100%",
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: theme.colors.background1,
});

const SignInBox = styled("div", {
  width: "60rem",
  height: "fit-content",

  display: "flex",
});

const LogoBox = styled("section", {
  width: "50%",

  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "2.5rem",

  padding: "1.5rem",
});
const Logo = styled("div", {
  height: "8rem",
  width: "8rem",
});

const SignInForm = styled("form", {
  width: "50%",

  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  padding: "3rem",
  borderRadius: theme.radii.md,

  backgroundColor: theme.colors.background2,
});
