import { styled } from "@/stitches.config";
import { Icon } from "@/components/media/Icon";
import { error } from "@/assets/icons";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <ErrorContainer>
      <Icon sSize={"small"} css={{ iconColor: "$error" }} src={error.src} />
      <p>{message}</p>
    </ErrorContainer>
  );
};
const ErrorContainer = styled("span", {
  height: "1rem",
  display: "flex",
  alignItems: "start",
  gap: "0.25rem",

  color: "$error",

  fontSize: "$xs",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
