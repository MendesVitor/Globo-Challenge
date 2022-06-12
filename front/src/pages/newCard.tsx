import { Box, Grid, Paper, styled, TextField, Button, Typography, Autocomplete, Chip } from "@mui/material";

import { useEffect, useState } from "react";

import { api } from "../services/api";

interface tags {
  id: string;
  name: string;
}

export const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  boxShadow: "0px 4px 16px rgba(0,0,0, 0.08)",
}));

export function NewCard() {
  const [response, setResponse] = useState<tags[]>([]);
  const [cardText, setCardText] = useState<string>("");
  const [tagsId, setTagsId] = useState<tags[]>([]);

  async function createCard() {
    await api.post("/cards", { text:'aaaaa'});
  }
  useEffect(() => {
    api.get("/tags").then((response: any) => {
      setResponse(response.data);
    });
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" mt={1}>
        <Grid container spacing={3} pt={1}>
          <Grid item xs />
          <Grid item xs={6}>
            <Card>
              <Box>
                <TextField
                  id="standard-helperText"
                  helperText="Some important text"
                  variant="standard"
                  fullWidth={true}
                  multiline
                  maxRows={5}
                  inputProps={{ maxLength: 400 }}
                  onChange={(value) => {
                    setCardText(value.target.value);
                    console.log(value.target.value, cardText.length);
                  }}
                />
              </Box>
              <Box pt={30}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={response.map((option) => option.name)}
                  freeSolo
                  onChange={(_, value) => console.log('aaa')}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => <TextField {...params} variant="filled" label="Tags" />}
                />
              </Box>
            </Card>
            <Button
              sx={{
                mt: 25,
                padding: 2,
                borderRadius: "8px",
                boxShadow: " 0px 8px 16px rgba(237,77,119, 0.4)",
                backgroundColor: "rgba(237,77,119, 1)",
              }}
              variant="contained"
              fullWidth
              disabled={cardText.length < 1 ? true : false}
              onClick={createCard}
            >
              <Typography>Publicar</Typography>
            </Button>
          </Grid>
          <Grid item xs />
        </Grid>
      </Grid>
    </Box>
  );
}
