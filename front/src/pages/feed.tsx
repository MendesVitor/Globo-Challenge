import { Box, Grid, Stack, Typography } from "@mui/material";

import { FC, ReactElement, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Tag } from "../components/Tag";
import { api } from "../services/api";

interface cards {
  id: string;
  text: string;
  tags: [{ name: string }];
}

export const Feed: FC<any> = (): ReactElement => {
  const [response, setResponse] = useState<cards[]>([]);

  useEffect(() => {
    api.get("/cards").then((response: any) => {
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
        {response.map(function (object, i) {
          return (
            <Grid container spacing={3} key={i} pt={1}>
              <Grid item xs />
              <Grid item xs={6}>
                <Card>
                  <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Typography sx={{ color: "#000" }}>{object.text}</Typography>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                      {object.tags.map((tag, i) => {
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
    </Box>
  );
};
