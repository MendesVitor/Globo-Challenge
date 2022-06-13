import { Paper, createTheme } from "@mui/material";

type TagProps = {
  children: React.ReactNode; // 👈️ type children
};
export function Tag(props: TagProps) {
  const theme = createTheme();
  return (
    <Paper
      sx={{
        backgroundColor: "#fff",
        p: theme.spacing(1),
        textAlign: "center",
        width: "100px",
        borderRadius: "4px",
        border: "1px solid rgba(237,77,119, 0.24)",
      }}
      elevation={3}
    >
      {props.children}
    </Paper>
  );
}
