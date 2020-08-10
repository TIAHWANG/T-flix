import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

api.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params["api_key"] = "1f76b07ff6c77afe1ce9a752c92b8290";
    config.params["language"] = "en-US";
    return config;
});

export const moviesApi = {
    nowPlaying: (page = 1) =>
        api.get("movie/now_playing", {
            params: { page },
        }),
    upcoming: (page = 1) =>
        api.get("movie/upcoming", {
            params: { page },
        }),
    popular: (page = 1) =>
        api.get("movie/popular", {
            params: { page },
        }),
    movieDetail: (id) =>
        api.get(`movie/${id}`, {
            params: {
                append_to_response: "videos",
            },
        }),
    searchMovie: (term) =>
        api.get("search/movie", {
            params: {
                query: term,
            },
        }),
    movieCast: (id) => api.get(`movie/${id}/credits`),
    recommendMovie: (id) => api.get(`movie/${id}/recommendations`),
    movieCollection: (id) => api.get(`collection/${id}`),
};

export const tvApi = {
    topRated: (page = 1) =>
        api.get("tv/top_rated", {
            params: { page },
        }),
    popular: (page = 1) =>
        api.get("tv/popular", {
            params: { page },
        }),
    airingToday: (page = 1) =>
        api.get("tv/airing_today", {
            params: { page },
        }),
    showDetail: (id) =>
        api.get(`tv/${id}`, {
            params: {
                append_to_response: "videos",
            },
        }),
    searchTv: (term) =>
        api.get("search/tv", {
            params: {
                query: term,
            },
        }),
    tvCast: (id) => api.get(`tv/${id}/credits`),
    recommendTv: (id) => api.get(`tv/${id}/recommendations`),
    seasons: (id, seasonNum) => api.get(`tv/${id}/season/${seasonNum}`),
};

export const personApi = {
    person: (id) =>
        api.get(`person/${id}`, {
            params: {
                append_to_response: "images",
            },
        }),
};
