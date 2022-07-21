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
  }),

  //truncate a line of text with a ellipsis
  _truncate: () => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
};
