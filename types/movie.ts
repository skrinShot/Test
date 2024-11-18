export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string; // Свойство для фонового изображения
    overview: string;
    release_date: string;
    vote_average: number;
}
export interface Actor {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
}
export interface Video {
    key: string; // Уникальный ключ видео
    site: string; // Платформа видео (например, YouTube)
    type: string; // Тип видео (например, Trailer)
}
