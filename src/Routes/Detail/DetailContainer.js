import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: { pathname },
        } = props;
        this.state = {
            result: null,
            staff: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/"),
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push },
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        let staff = null;
        try {
            if (isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parsedId));
                ({ data: staff } = await moviesApi.movieCast(parsedId));
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
                ({ data: staff } = await tvApi.tvCast(parsedId));
            }
        } catch {
            this.setState({
                error: "Can't find anything.",
            });
        } finally {
            this.setState({
                loading: false,
                result,
                staff,
            });
        }
    }

    render() {
        const { result, staff, error, loading } = this.state;
        console.log(this.state);
        return <DetailPresenter result={result} staff={staff} error={error} loading={loading} />;
    }
}
