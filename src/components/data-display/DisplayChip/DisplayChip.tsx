import { Skeleton } from "@/components/feedback";
import { styled, theme } from "@/styles/stitches.config";

interface DisplayChipProps {
  title: string | undefined;
  data: string | undefined;
}
export const DisplayChip = ({ title, data }: DisplayChipProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Data>{data ?? <Skeleton height="1.5rem" />}</Data>
    </Container>
  );
};

const Container = styled("div", {
  height: "4rem",
  width: "10rem",
  display: "flex",
  flexDirection: "column",
  paddingTop: "0.5rem",
  gap: "0.5rem",
});

const Title = styled("span", {
  color: theme.colors.text2,
  fontSize: theme.fontSizes.sm,
});
const Data = styled("span", {});
