import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {Actor, Movie, Video } from "../../types/movie";
import styles from "./MovieDetail.module.css";
import {useEffect, useState } from "react";

interface MovieDetailProps {
    movie: Movie;
    similarMovies: Movie[];
}

    const MovieDetail = ({ movie, similarMovies }: MovieDetailProps) => {
    const router = useRouter(); // Хук для работы с роутингом
    const { id } = router.query;
    const [actors, setActors] = useState<Actor[]>([]);
    useEffect(() => {
        const fetchActors = async () => {
            if (id) {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                );
                const data = await response.json();
                setActors(data.cast.slice(0, 10)); // Берём только первых 10 актёров
            }
        };

        fetchActors();
    }, [id]);
    const [trailer, setTrailer] = useState<string>("");
        useEffect(() => {
            const fetchTrailer = async () => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                );
                const data = await response.json();
                const trailerData = data.results.find(
                    (video: Video) => video.type === "Trailer" && video.site === "YouTube"
                );
                if (trailerData) {
                    setTrailer(`https://www.youtube.com/embed/${trailerData.key}`);
                }
            };

            fetchTrailer();
        }, [id]);

    const handleBackClick = () => {
        router.back(); // Возврат на предыдущую страницу
    };

    return (

        <div
            className={styles.container}
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            <div className={styles.overlay}>
                <button onClick={handleBackClick} className={styles.backButton}>
                    ← Back
                </button>
                <h1 className={styles.title}>{movie.title}</h1>
                <div className={styles.content}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className={styles.poster}
                    />

                    <div className={styles.details}>
                        <p style={{ backgroundColor: '#2e2e2e', padding: '10px', borderRadius: '5px 5px 0px 0px' }}>
                            <strong>Release Date:</strong> {movie.release_date}
                        </p>
                        <p style={{ backgroundColor: '#2e2e2e', padding: '10px' }}>
                            <strong>Rating:</strong> {movie.vote_average}/10
                        </p>
                        <p style={{ backgroundColor: '#2e2e2e', padding: '10px', borderRadius: '0px 0px 5px 5px' }}>
                            <strong>Overview:</strong> {movie.overview}
                        </p>
                        <div>
                            {/* Секция с трейлером */}
                            {trailer && (
                                <div className={styles.trailer}>
                                    <h2>Trailer</h2>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={trailer}
                                        title="Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {/* Секция с актёрами */}
                    <div className={styles.actors}>
                        <h2>Actors</h2>
                        <div className={styles.actorsGrid}>
                            {actors.map((actor) => (
                                <div key={actor.id} className={styles.actorCard}>
                                    {actor.profile_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                                            alt={actor.name}
                                            className={styles.actorPhoto}
                                        />
                                    ) : (
                                        <div className={styles.actorPlaceholder}>No Image</div>
                                    )}
                                    <p>{actor.name}</p>
                                    <p className={styles.character}>{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.similarMovies}>
                    <h2>Similar Movies</h2>
                    <div className={styles.similarMoviesGrid}>
                        {similarMovies.map((similarMovie) => (
                            <div
                                key={similarMovie.id}
                                className={styles.movieCard}
                                onClick={() => router.push(`/movie/${similarMovie.id}`)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w200/${similarMovie.poster_path}`}
                                    alt={similarMovie.title}
                                    className={styles.moviePoster}
                                />
                                <p>{similarMovie.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.params!;
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const [movieResponse, similarResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`),
    ]);

    if (!movieResponse.ok || !similarResponse.ok) {
        return {notFound: true};
    }

    const movie: Movie = await movieResponse.json();
    const similarMovies: Movie[] = (await similarResponse.json()).results;

    return {
        props: {movie, similarMovies},
    };
};

export default MovieDetail;
