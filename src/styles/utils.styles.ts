import { theme } from "./stitches.config";

export const styleUtils = {
  _paddingX: (value: string) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  _paddingY: (value: string) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  _iconColor: ({ fill, stroke }: { fill?: any; stroke?: any }) => ({
    "& svg": {
      "& path": {
        fill: fill,
        stroke: stroke,
      },
    },
  }),

  _flexColumn: () => ({
    display: "flex",
    flexDirection: "column",
  }),

  _alignCenter: () => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  _lineClamp: (value: number) => ({
    display: "-webkit-box",
    WebkitLineClamp: value,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    wordWrap: "break-word",
  }),

  //truncate a line of text with a ellipsis
  _truncate: () => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),

  _border: (value: "Left" | "Right" | "Bottom" | "Top" | "All") => {
    if (value === "Left")
      return {
        borderLeftWidth: "0.1rem",
        borderLeftStyle: "solid",
      };
    if (value === "Right")
      return {
        borderRightWidth: "0.1rem",
        borderRightStyle: "solid",
      };

    if (value === "Bottom")
      return {
        borderBottomWidth: "0.1rem",
        borderBottomStyle: "solid",
      };

    if (value === "Top")
      return {
        borderTopWidth: "0.1rem",
        borderTopStyle: "solid",
      };

    if (value === "All")
      return {
        borderWidth: "0.1rem",
        borderStyle: "solid",
      };

    return {
      borderWidth: "0.1rem",
      borderStyle: "solid",
    };
  },
};
