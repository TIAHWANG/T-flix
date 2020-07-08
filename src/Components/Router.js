import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Person from "Routes/Person";
import Collection from "Routes/Collection";
import Seasons from "Routes/Seasons";
import List from "Routes/List";
import Header from "Components/Header";

export default () => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/movie/list/now" component={List} />
                <Route path="/movie/list/upcoming" component={List} />
                <Route path="/movie/list/popular" component={List} />
                <Route path="/tv" exact component={TV} />
                <Route path="/tv/list/top" component={List} />
                <Route path="/tv/list/popular" component={List} />
                <Route path="/tv/list/airing" component={List} />
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
