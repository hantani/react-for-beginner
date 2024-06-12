import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  console.log(movie);

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.Detail}>
          <img
            src={movie.background_image}
            alt="background"
            className={styles.Bg}
          />
          <div className={styles.DetailContents}>
            <img src={movie.medium_cover_image} alt="poster" />
            <div>
              <h2>{movie.title}</h2>
              <div>
                <p>Year {movie.year}</p>
                <p>Rating {movie.rating}</p>
                <p>Runtime {movie.runtime}</p>
              </div>
              <ul>
                {movie.genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
              <p>{movie.description_full}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
