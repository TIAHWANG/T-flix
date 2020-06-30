import React from "react";
import axios from "axios";
import ListPresenter from "./ListPresenter";

export default class extends React.Component {
    state = {
        nowPlayingList: [],
        upcomingList: [],
        popularMovieList: [],
        pageNumber: 1,
        hasMore: true,
    };

    componentDidMount() {
        this.fetchMovieData();
    }

    fetchMovieData = async () => {
        const {
            location: { pathname },
        } = this.props;
        if (pathname.includes("now")) {
            await axios
                .get(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=1f76b07ff6c77afe1ce9a752c92b8290&language=en-US&page=${this.state.pageNumber}`
                )
                .then((res) =>
                    this.setState({
                        nowPlayingList: [...this.state.nowPlayingList, ...res.data.results],
                        pageNumber: this.state.pageNumber + 1,
                    })
                );
        } else if (pathname.includes("upcoming")) {
            await axios
                .get(
                    `https://api.themoviedb.org/3/movie/upcoming?api_key=1f76b07ff6c77afe1ce9a752c92b8290&language=en-US&page=${this.state.pageNumber}`
                )
                .then((res) =>
                    this.setState({
                        upcomingList: [...this.state.upcomingList, ...res.data.results],
                        pageNumber: this.state.pageNumber + 1,
                    })
                );
        } else if (pathname.includes("popular")) {
            await axios
                .get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=1f76b07ff6c77afe1ce9a752c92b8290&language=en-US&page=${this.state.pageNumber}`
                )
                .then((res) =>
                    this.setState({
                        popularMovieList: [...this.state.popularMovieList, ...res.data.results],
                        pageNumber: this.state.pageNumber + 1,
                    })
                );
        }
    };

    render() {
        const { nowPlayingList, upcomingList, popularMovieList, hasMore } = this.state;
        return (
            <ListPresenter
                nowPlayingList={nowPlayingList}
                upcomingList={upcomingList}
                popularMovieList={popularMovieList}
                hasMore={hasMore}
                fetchMovieData={this.fetchMovieData}
            />
        );
    }
}
