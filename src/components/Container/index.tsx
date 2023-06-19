import { Box, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

import { IContainer } from "@/interfaces/containerInterface";

const StyledBox = styled(Box)({
  width: "100%",
  overflow: "hidden",
});

const TitleContent = styled(Box)({
  display: "flex",
  gap: "1rem",
  marginBottom: "2rem",
});

export default function PageContainer({
  title,
  children,
  backButton,
  ...props
}: IContainer) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <StyledBox {...props}>
      <TitleContent>
        {!!backButton && (
          <IconButton aria-label="Voltar" onClick={handleGoBack}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </TitleContent>
      {children}
    </StyledBox>
  );
}
