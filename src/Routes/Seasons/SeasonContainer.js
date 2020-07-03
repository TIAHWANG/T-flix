import React from "react";
import SeasonPresenter from "./SeasonPresenter";
import { tvApi } from "../../api";

export default class extends React.Component {
    state = {
        season: null,
        showName: null,
        error: null,
        loading: true,
        isVisible: false,
    };
    async componentDidMount() {
        const {
            match: {
                params: { id },
                url,
            },
            history: { push },
            location: { pathname },
        } = this.props;
        const tvId = url.split("/")[2];
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        try {
            const { data: season } = await tvApi.seasons(tvId, parsedId);
            this.setState({
                season,
                showName: pathname.split("/")[5],
            });
        } catch {
            this.setState({ error: "Can't find anything." });
        } finally {
            this.setState({ loading: false });
        }
    }
    render() {
        const { season, showName, error, loading, isVisible } = this.state;
        console.log(season);
        return <SeasonPresenter season={season} showName={showName} error={error} loading={loading} isVisible={isVisible} />;
    }
}
