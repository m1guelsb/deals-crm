import { useContext } from "react";
import Image from "next/image";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { GetServerSideProps, NextPage } from "next";
import { AuthContext, SignUpCredentials } from "@/contexts/AuthContext";
import { Logo as LogoIMG } from "@/assets/images";
import { Button, Input, LinkButton } from "@/components/form";
import { Heading } from "@/components/typography";
import { signUpFormSchema } from "@/utils/validations/yup";
import { styled, theme } from "@/styles/stitches.config";
import { Icon } from "@/components/media";
import { user as userIcon, lock } from "@/icons";
import { destroyCookie, parseCookies } from "nookies";
import { jwtVerify } from "jose";
import { Spinner } from "@/components/feedback";

const SignUp: NextPage = () => {
  const { signUp, signupLoading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors: inputError },
  } = useForm<SignUpCredentials>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
    resolver: yupResolver(signUpFormSchema),
  });

  const handleSignUp: SubmitHandler<SignUpCredentials> = async ({
    name,
    email,
    password,
  }) => {
    signUp({ name, email, password });
  };

  return (
    <>
      <Head>
        <title>Deals CRM</title>
      </Head>

      <Container>
        <SignUpBox>
          <LogoBox>
            <Logo>
              <Image src={LogoIMG} height={124} width={124} alt="logo" />
            </Logo>
            <Heading>Deals CRM</Heading>
          </LogoBox>

          <SignUpForm onSubmit={handleSubmit(handleSignUp)}>
            <Heading as={"h2"} sType={"2"}>
              Sign Up
            </Heading>
            <Input
              placeholder="Name"
              errorMessage={inputError.name?.message}
              rightIcon={<Icon src={userIcon.src} />}
              disabled={signupLoading}
              {...register("name")}
            />
            <Input
              placeholder="Email"
              errorMessage={inputError.email?.message}
              rightIcon={
                <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                  @
                </span>
              }
              disabled={signupLoading}
              {...register("email")}
            />
            <Input
              placeholder="Password"
              type={"password"}
              errorMessage={inputError.password?.message}
              rightIcon={<Icon src={lock.src} />}
              disabled={signupLoading}
              {...register("password")}
            />

            <Actions>
              <Button
                type={"submit"}
                rightIcon={signupLoading && <Spinner sType={"secondary"} />}
                disabled={signupLoading}
                css={{ width: "100%" }}
              >
                Create account
              </Button>
              <LinkButton href="/" label="Login" />
            </Actions>
          </SignUpForm>
        </SignUpBox>
      </Container>
    </>
  );
};

export default SignUp;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "deals.access_token": access_token } = parseCookies(ctx);
  const secret = process.env.JWT_SECRET;

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
      destroyCookie(ctx, "deals.access_token");
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

const SignUpBox = styled("div", {
  width: "60rem",
  height: "fit-content",

  display: "flex",
});

const LogoBox = styled("section", {
  flex: 1,
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

const SignUpForm = styled("form", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",

  padding: "2rem",
  borderRadius: theme.radii.md,

  backgroundColor: theme.colors.background2,
});

const Actions = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
});
