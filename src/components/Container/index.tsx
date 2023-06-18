import { Box, Typography } from "@mui/material";

import { IContainer } from "@/interfaces/containerInterface";

export default function PageContainer({
  title,
  children,
  ...props
}: IContainer) {
  return (
    <Box {...props}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
