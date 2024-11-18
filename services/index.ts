// services/index.ts
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Добавим ключ в .env.local
const BASE_URL = "https://api.themoviedb.org/3";

export const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: "en-US",
    },
});

// Функция для получения фильмов
export const getMovies = async (page: number = 1) => {
    const response = await api.get("/movie/popular", {
        params: { page },
    });
    return response.data;
};

// Функция для получения жанров
export const getGenres = async () => {
    const response = await api.get("/genre/movie/list");
    return response.data;
};
