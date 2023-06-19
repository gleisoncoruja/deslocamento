import { Box, Typography } from "@mui/material";

import { IContainer } from "@/interfaces/containerInterface";
import styled from "@emotion/styled";

const StyledBox = styled(Box)({
  width: "100%",
  overflow: "hidden",
});

export default function PageContainer({
  title,
  children,
  ...props
}: IContainer) {
  return (
    <StyledBox {...props}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children}
    </StyledBox>
  );
}
