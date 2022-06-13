import { Box, Grid, Stack, Typography, Autocomplete, Chip, TextField } from "@mui/material";

import { FC, ReactElement, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Tag } from "../components/Tag";
import { api } from "../services/api";

interface cards {
  id: string;
  text: string;
  tags: [{ name: string }];
}

interface tags {
  id: string;
  name: string;
}

export const Feed: FC<any> = (): ReactElement => {
  const [cards, setCards] = useState<cards[]>([]);
  const [cardsByTagId, setCardsByTagId] = useState<cards[]>([]);
  const [tags, setTags] = useState<tags[]>([]);

  useEffect(() => {
    api.get("/cards").then((response: any) => {
      setCards(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("/tags").then((response: any) => {
      setTags(response.data);
    });
  }, []);

  async function handleGetCardByTag(tagName: any) {
    let tagId;

    tags.forEach((element: tags) => {
      if (element.name === tagName) {
        tagId = element.id;
      }
    });

    if (tagId) {
      const cardsByTag = await api.get(`/cards/by-tag?id=${tagId}`);
      setCardsByTagId(cardsByTag.data);
    }
    else{
      setCardsByTagId([])
    }
  }

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
        {cardsByTagId.length < 1
          ? cards.map(function (card, i) {
              return (
                <Grid container spacing={3} key={i} pt={1}>
                  <Grid item xs />
                  <Grid item xs={6}>
                    <Card>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Typography sx={{ color: "#000" }}>{card.text}</Typography>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                          {card.tags.map((tag, i) => {
                            return (
                              <Tag key={i}>
                                <Typography sx={{ color: "#ED4D77" }}>{tag.name}</Typography>
                              </Tag>
                            );
                          })}
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs />
                </Grid>
              );
            })
          : cardsByTagId.map(function (card, i) {
              return (
                <Grid container spacing={3} key={i} pt={1}>
                  <Grid item xs />
                  <Grid item xs={6}>
                    <Card>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Typography sx={{ color: "#000" }}>{card.text}</Typography>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                          {card.tags.map((tag, i) => {
                            return (
                              <Tag key={i}>
                                <Typography sx={{ color: "#ED4D77" }}>{tag.name}</Typography>
                              </Tag>
                            );
                          })}
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs />
                </Grid>
              );
            })}
      </Grid>
      <Box
        sx={{
          position: "fixed",
          top: "90%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50%",
          backgroundColor: "#fff",
        }}
      >
        <Autocomplete
          id="tags-filled"
          options={tags.map((option) => option.name)}
          freeSolo
          onChange={(_, value) => handleGetCardByTag(value)}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => <TextField {...params} variant="outlined" label="Busca por tags" />}
        />
      </Box>
    </Box>
  );
};
