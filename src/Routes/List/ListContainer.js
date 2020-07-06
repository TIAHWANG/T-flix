import React from "react";
import axios from "axios";
import ListPresenter from "./ListPresenter";

export default class extends React.Component {
    state = {
        nowPlayingList: [],
        upcomingList: [],
        popularMovieList: [],
        topRatedList: [],
        airingList: [],
        popularTvList: [],
        pageNumber: 1,
        hasMore: true,
        isVisible: false,
    };

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    componentDidMount() {
        this.fetchMovieData();
        this.fetchTvData();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate() {
        const { pageNumber } = this.state;
        if (pageNumber === 1 || pageNumber === 2) {
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (window.pageYOffset > 400 && !this.state.isVisible) {
            this.setState({
                isVisible: true,
            });
        } else if (window.pageYOffset === 0) {
            this.setState({
                isVisible: false,
            });
        }
    };

    fetchMovieData = async () => {
        const {
            location: { pathname },
        } = this.props;
        const { pageNumber, nowPlayingList, upcomingList, popularMovieList } = this.state;
        const api = "https://api.themoviedb.org/3/movie";
        const params = "?api_key=1f76b07ff6c77afe1ce9a752c92b8290&language=en-US";
        if (pathname.includes("movie") && pathname.includes("now")) {
            await axios.get(`${api}/now_playing${params}&page=${pageNumber}`).then((res) =>
                this.setState({
                    nowPlayingList: [...nowPlayingList, ...res.data.results],
                    pageNumber: pageNumber + 1,
                })
            );
        } else if (pathname.includes("movie") && pathname.includes("upcoming")) {
            await axios.get(`${api}/upcoming${params}&page=${pageNumber}`).then((res) =>
                this.setState({
                    upcomingList: [...upcomingList, ...res.data.results],
                    pageNumber: pageNumber + 1,
                })
            );
        } else if (pathname.includes("movie") && pathname.includes("popular")) {
            await axios.get(`${api}/popular${params}&page=${pageNumber}`).then((res) =>
                this.setState({
                    popularMovieList: [...popularMovieList, ...res.data.results],
                    pageNumber: pageNumber + 1,
                })
            );
        }
    };

    fetchTvData = async () => {
        const {
            location: { pathname },
        } = this.props;
        const { topRatedList, airingList, popularTvList, pageNumber } = this.state;
        const api = "https://api.themoviedb.org/3/tv";
        const params = "?api_key=1f76b07ff6c77afe1ce9a752c92b8290&language=en-US";
        if (pathname.includes("tv") && pathname.includes("top")) {
            await axios.get(`${api}/top_rated${params}&page=${pageNumber}`).then((res) =>
                this.setState({
                    topRatedList: [...topRatedList, ...res.data.results],
                    pageNumber: pageNumber + 1,
                })
            );
        } else if (pathname.includes("tv") && pathname.includes("airing")) {
            await axios.get(`${api}/airing_today${params}&page=${pageNumber}`).then((res) =>
                this.setState({
                    airingList: [...airingList, ...res.data.results],
                    pageNumber: pageNumber + 1,
                })
            );
        } else if (pathname.includes("tv") && pathname.includes("popular")) {
            await axios.get(`${api}/popular${params}&page=${pageNumber}`).then((res) =>
                this.setState({
                    popularTvList: [...popularTvList, ...res.data.results],
                    pageNumber: pageNumber + 1,
                })
            );
        }
    };

    render() {
        const { nowPlayingList, upcomingList, popularMovieList, airingList, popularTvList, topRatedList, hasMore, isVisible } = this.state;
        return (
            <ListPresenter
                nowPlayingList={nowPlayingList}
                upcomingList={upcomingList}
                popularMovieList={popularMovieList}
                topRatedList={topRatedList}
                airingList={airingList}
                popularTvList={popularTvList}
                hasMore={hasMore}
                isVisible={isVisible}
                fetchMovieData={this.fetchMovieData}
                fetchTvData={this.fetchTvData}
                scrollToTop={this.scrollToTop}
            />
        );
    }
}