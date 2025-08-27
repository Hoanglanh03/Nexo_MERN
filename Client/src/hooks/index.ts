import { useMediaQuery, useTheme } from "@mui/material";

export const useDetectLayout = () => {
  const theme = useTheme();
  const isMinimizeLayout = useMediaQuery(theme.breakpoints.down("md"));

  return { isMinimizeLayout };
};
