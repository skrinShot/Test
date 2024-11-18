import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getPopularMovies } from "../../services/tmdb";
import { Movie } from "../../types/movie";
import styles from "./MoviesList.module.css";

const MoviesList = () => {
    const router = useRouter();
    const { query } = router;

    // Извлекаем номер страницы из URL или устанавливаем 1 как значение по умолчанию
    const [page, setPage] = useState<number>(Number(query.page) || 1);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Получение фильмов при изменении страницы
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getPopularMovies(page);
                setMovies(moviesData);
            } catch (err) {
                setError("Failed to load movies");
            }
        };

        fetchMovies();
    }, [page]);

    // Обновление страницы в URL
    useEffect(() => {
        router.push(`/?page=${page}`, undefined, { shallow: true }); // Используем shallow для обновления URL без перезагрузки
    }, [page]);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <div className={styles.container}>
                {movies.map((movie) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
                        <div className={styles.card}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h3>{movie.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default MoviesList;
