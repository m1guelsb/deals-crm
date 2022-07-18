import { useContext, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import type { NextPage } from "next";
import { AuthContext } from "@/contexts/AuthContext";
import { Logo as LogoIMG } from "@/assets/images";
import { Button, Input } from "@/components/form";
import { Heading } from "@/components/typography/Heading";
import { loading } from "@/assets/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "@/utils/validations/yup";
import { styled } from "@/stitches.config";
import { useToast } from "@/hooks/helpers/useToast";

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
    await signIn({ username, password });
    reset();
  };

  useEffect(() => {
    if (loginError?.response?.status === 401) {
      newToast({
        styleType: "error",
        title: "Wrong credentials!",
        duration: 3000,
      });
    }
  }, [loginError?.response?.status, newToast]);

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
              label={"Username"}
              sSize={"large"}
              placeholder="Enter username"
              errorMessage={inputError.username?.message}
              css={{ width: "100%" }}
              {...register("username")}
            />
            <Input
              label={"Password"}
              sSize={"large"}
              placeholder="Enter password"
              type={"password"}
              errorMessage={inputError.password?.message}
              css={{ width: "100%" }}
              {...register("password")}
            />

            <Button
              sSize={"large"}
              type={"submit"}
              rightIcon={loginLoading && loading.src}
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

  backgroundColor: "$background1",
});

const SignInBox = styled("div", {
  width: "70rem",
  minHeight: "35rem",

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
  borderRadius: "$md",

  backgroundColor: "$background2",
});
