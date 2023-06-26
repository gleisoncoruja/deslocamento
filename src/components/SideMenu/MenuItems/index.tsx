import { usePathname } from "next/navigation";
import { LinkText, StyledLink, StyledList, StyledListItem } from "./style";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import NavigationIcon from "@mui/icons-material/Navigation";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Tooltip from "@mui/material/Tooltip";
const Items = [
  {
    text: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    text: "Clientes",
    icon: <GroupIcon />,
    link: "/customers",
  },
  {
    text: "Condutores",
    icon: <SportsMotorsportsIcon />,
    link: "/drivers",
  },
  {
    text: "Deslocamento",
    icon: <NavigationIcon />,
    link: "/displacements",
  },
  {
    text: "Veículos",
    icon: <DirectionsCarFilledIcon />,
    link: "/vehicles",
  },
];

export default function MenuItems({ open }: { open: boolean }) {
  const pathname = usePathname();
  return (
    <StyledList>
      {Items.map((item) => {
        const isActive = pathname === item.link || false;

        return (
          <StyledListItem key={item.text} active={isActive}>
            <StyledLink href={item.link}>
              <Tooltip title={item.text} arrow placement="right">
                {item.icon}
              </Tooltip>

              <LinkText open={open}>{item.text}</LinkText>
            </StyledLink>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}
