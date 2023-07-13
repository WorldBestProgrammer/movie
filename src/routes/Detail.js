import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie"
function Detail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true);
  const [json, setJson] = useState()
  const getMovie = async () => {
    setJson(await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json());
    setLoading(false)
  }
  useEffect(() => {
    getMovie()
  }, [])
  return (
    <div>{
      loading ? <h1>loading...</h1> : <h1>{<Movie id={json.data.movie.id} coverImg={json.data.movie.medium_cover_image} title={json.data.movie.title} summary={json.data.movie.description_intro} genres={json.data.movie.genres} />}</h1>
    }</div>

  )

}
export default Detail;