import { Paper, styled } from "@mui/material";

export const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  boxShadow: "0px 4px 16px rgba(0,0,0, 0.08)",
}));
