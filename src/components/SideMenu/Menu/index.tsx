import { Divider, DrawerProps, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import { useTheme, Theme } from "@mui/material/styles";
import { StyledComponent } from "@emotion/styled";
import { MUIStyledCommonProps } from "@mui/system";
import MenuItems from "../MenuItems";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface MenuProps {
  open: boolean;
  handleDrawerClose: () => void;
  DrawerHeader: StyledComponent<
    MUIStyledCommonProps<Theme> & AppBarProps,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    {}
  >;
  Drawer: StyledComponent<DrawerProps & MUIStyledCommonProps<Theme>, {}, {}>;
}

export default function Menu({
  open,
  handleDrawerClose,
  DrawerHeader,
  Drawer,
}: MenuProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader open={open}>
        {isMobile && "Deslocamento Secretária Naty"}
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <MenuItems open={open} />
    </Drawer>
  );
}
