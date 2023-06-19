import { Box, Typography } from "@mui/material";

import { IContainer } from "@/interfaces/containerInterface";
import styled from "@emotion/styled";

const StyledBox = styled(Box)({
  padding: "5rem 2rem",
  width: "100%",
});

export default function PageContainer({
  title,
  children,
  ...props
}: IContainer) {
  return (
    <StyledBox {...props}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      {children}
    </StyledBox>
  );
}
