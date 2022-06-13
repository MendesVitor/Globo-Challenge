import { FC } from "react";
import { Feed } from "./pages/feed";
import { NewCard } from "./pages/newCard";

interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
}

export const routes: Array<Route> = [
  {
    key: "feed-route",
    title: "Feed",
    path: "/",
    enabled: true,
    component: Feed,
  },
  {
    key: "newCard-route",
    title: "New Card",
    path: "/new",
    enabled: true,
    component: NewCard,
  },
];
