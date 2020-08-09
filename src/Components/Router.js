import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "../Routes/Home";
import TV from "../Routes/TV";
import Search from "../Routes/Search";
import Detail from "../Routes/Detail";
import Person from "../Routes/Person";
import Collection from "../Routes/Collection";
import Seasons from "../Routes/Seasons";
import NowPlayingList from "../Routes/MovieList/NowPlayingList";
import UpcomingList from "../Routes/MovieList/UpcomingList";
import PopularMovieList from "../Routes/MovieList/PopularMovieList";
import TopRatedList from "../Routes/TVList/TopRatedList";
import PopularTVList from "../Routes/TVList/PopularTVList";
import AiringList from "../Routes/TVList/AiringList";
import Header from "../Components/Header";

export default () => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/movie/list/now" component={NowPlayingList} />
                <Route path="/movie/list/upcoming" component={UpcomingList} />
                <Route path="/movie/list/popular" component={PopularMovieList} />
                <Route path="/tv" exact component={TV} />
                <Route path="/tv/list/top" component={TopRatedList} />
                <Route path="/tv/list/popular" component={PopularTVList} />
                <Route path="/tv/list/airing" component={AiringList} />
                <Route path="/search" component={Search} />
                <Route path="/movie/:id" component={Detail} />
                <Route path="/tv/:id" exact component={Detail} />
                <Route path="/person/:id" component={Person} />
                <Route path="/collection/:id" component={Collection} />
                <Route path="/tv/:id/season/:id" component={Seasons} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </Router>
);
