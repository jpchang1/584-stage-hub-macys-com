import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "./components/asyncComponent";

const homeAsync = asyncComponent(() => import("./containers/home").then(module => module.default), {});
const channelAsync = asyncComponent(() => import("./containers/channel").then(module => module.default), {});
const channelVideoAsync = asyncComponent(() => import("./containers/channelVideo").then(module => module.default), {});
const videoAsync = asyncComponent(() => import("./containers/video").then(module => module.default), {});
const searchAsync = asyncComponent(() => import("./containers/search").then(module => module.default), {});
const app = () => {
    return (<Switch>
        <Route path="/" component={homeAsync} exact />
        <Route path="/search" component={searchAsync} />
        <Route path="/c/:channelName/:channelId" exact component={channelAsync} />
        <Route path="/v/:videoName/:videoId/" exact  component={videoAsync} />
        <Route path="/:channelName/:videoName/:videoId/" exact  component={channelVideoAsync} />
    </Switch>)
}
export default app;