import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true,
        fade: false,
        isVisible: true,
    };

    getMovieData = async () => {
        try {
            const {
                data: { results: nowPlaying },
            } = await moviesApi.nowPlaying();
            const {
                data: { results: upcoming },
            } = await moviesApi.upcoming();
            const {
                data: { results: popular },
            } = await moviesApi.popular();
            this.setState({
                nowPlaying,
                upcoming,
                popular,
                fade: true,
            });
        } catch {
            this.setState({
                error: "Can't find Movie Information.",
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleFade = () => {
        this.setState({ fade: true });
    };
    componentDidMount() {
        this.getMovieData();
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading, isVisible } = this.state;
        return <HomePresenter nowPlaying={nowPlaying} upcoming={upcoming} popular={popular} error={error} loading={loading} isVisible={isVisible} />;
    }
}