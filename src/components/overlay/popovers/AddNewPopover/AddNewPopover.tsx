import type { ReactNode } from "react";
import { Root, Trigger, Portal } from "@radix-ui/react-popover";
import { Content } from "./add-new-popover.styles";
import { Button } from "@/components/form";
import { costumers, deals } from "@/assets/icons";
import { Icon } from "@/components/media";
import Link from "next/link";

interface PopoverProps {
  children: ReactNode;
}
export const AddNewPopover = ({ children }: PopoverProps) => (
  <Root>
    <Trigger asChild>{children}</Trigger>

    <Portal>
      <Content sideOffset={5}>
        <Button
          sType={"secondary"}
          css={{
            width: "100%",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
          }}
          rightIcon={<Icon src={deals.src} />}
        >
          Deal
        </Button>

        <Button
          sType={"secondary"}
          css={{
            width: "100%",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
          }}
          rightIcon={<Icon src={costumers.src} />}
        >
          Customer
        </Button>
      </Content>
    </Portal>
  </Root>
);
