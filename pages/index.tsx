import MoviesList from "../components/MoviesList/MoviesList";

const HomePage = () => {
  return (
      <div style={{ padding: "20px", backgroundColor: "#121212", minHeight: "100vh" }}>
        <h1 style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}>
          Popular Movies
        </h1>
        <MoviesList />
      </div>
  );
};

export default HomePage;
