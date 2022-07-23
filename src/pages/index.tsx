import { useContext, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { NextPage } from "next";
import { AuthContext } from "@/contexts/AuthContext";
import { Logo as LogoIMG } from "@/assets/images";
import { Button, Input } from "@/components/form";
import { Heading } from "@/components/typography";
import { user as userIcon, lock, loading } from "@/assets/icons";
import { signInFormSchema } from "@/utils/validations/yup";
import { styled, theme } from "@/styles/stitches.config";
import { useToast } from "@/hooks/helpers/useToast";
import { Icon } from "@/components/media";

interface SignInFormInputs {
  username: string;
  password: string;
}
const SignIn: NextPage = () => {
  const {
    signIn,
    user,
    loading: loginLoading,
    error: loginError,
  } = useContext(AuthContext);

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
  });

  const { newToast } = useToast();

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
        <title>Deals CMS</title>
      </Head>

      <Container>
        <SignInBox>
          <LogoBox>
            <Logo>
              <Image src={LogoIMG} alt="logo" />
            </Logo>
            <Heading>Deals CMS</Heading>
          </LogoBox>

          <SignInForm onSubmit={handleSubmit(handleSignIn)}>
            <Heading as={"h2"} sType={"2"}>
              Login
            </Heading>

            <Input
              sSize={"large"}
              placeholder="Insert username => [m1guelsb]"
              errorMessage={inputError.username?.message}
              rightIcon={<Icon src={userIcon.src} />}
              css={{ width: "100%" }}
              {...register("username")}
            />
            <Input
              sSize={"large"}
              placeholder="Insert password => [123]"
              type={"password"}
              errorMessage={inputError.password?.message}
              rightIcon={<Icon src={lock.src} />}
              css={{ width: "100%" }}
              {...register("password")}
            />

            <Button
              sSize={"large"}
              type={"submit"}
              rightIcon={
                loginLoading && <Icon svg={"stroke"} src={loading.src} />
              }
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

const Container = styled("div", {
  height: "100%",
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: theme.colors.background1,
});

const SignInBox = styled("div", {
  width: "65rem",
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
