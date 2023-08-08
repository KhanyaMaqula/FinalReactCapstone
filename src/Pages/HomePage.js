import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { showAllShows } from '../api/CallingApi';
import { genreMapping } from '../Helpers/GenreMapping';
import Spinner from '../Components/Spinner';
import '../App.css';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import '../css/Home.css';

const HomePage = () => {
  const [shows, setShows] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [favorites, setFavorites] = useState([]);
  
  const handleFavoriteToggle = async (showId) => {
    console.log(session.data.session.user)
    if (favorites.includes(showId)) {
      await supabase
        .from('favorites')
        .delete()
        .match({ userId: 'user_id', showId: showId });
  
      setFavorites(favorites.filter(id => id !== showId));
    } else {
      await supabase
        .from('favorites')
        .upsert([{ userId: 'user_id', showId: showId }]);
  
      setFavorites([...favorites, showId]);
    }
  };
  

  useEffect(() => {
    const FetchData = async () => {
      try {
        const getShows = await showAllShows()
        setShows(getShows)
      }
      catch (error) {
        alert(error)
      }
    }
    FetchData()
  }, [])

  return (
    <>
      {shows.length === 0 ? <Spinner /> :
        <Container>
          <h1 className="mt-4 mb-4">Anything Is Poddable</h1>
          <div>
            {Object.entries(genreMapping).map(([genreId, genreName]) => (
              <button
                key={genreId}
                onClick={() => setSelectedGenre(Number(genreId))}
                style={{ marginRight: '10px' }}
              >
                {genreName}
              </button>
            ))}
             <button style={{marginRight:'10px'}}>
                My Favorites
              </button>
            <button onClick={() => setSelectedGenre(null)}>All Genres</button>
          </div>
          <Row>
            {shows
              .filter((show) => selectedGenre ? show.genres.includes(selectedGenre) : true)
              .map((show) => (

                <Col id={show.id} key={show.id} sm={12} md={6} lg={4} xl={3} className="mb-4">


                  <Card id={show.id}>
                    <Link to="/Show" state={{ showId: show.id }}>
                      <Card.Img id={show.id} variant="top" src={show.image} alt={show.title} />
                      </Link>
                      <Card.Body id={show.id} >
                        <Card.Title id={show.id} style={{ textDecoration: 'none', color: "#fff" }}>{show.title}</Card.Title>
                        <Card.Text>{genreMapping[show.genres[1]] ? genreMapping[show.genres[1]] + " " + genreMapping[show.genres[0]] : genreMapping[show.genres[0]]}</Card.Text>
                        <p style={{ textDecoration: 'none', color: "#fff", fontWeight: 600 }}>{"Seasons " + show.seasons}</p>
                        <p style={{ textDecoration: 'none', color: "#fff", fontWeight: 600 }}>{"Last Update " + (new Date(show.updated).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' }))}</p>

                        <div
                          className="favorite-icon"
                          onClick={() => handleFavoriteToggle(show.id)}
                        >
                          {favorites.includes(show.id) ? <BsHeartFill /> : <BsHeart />}
                        </div>
                      </Card.Body>
                    
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      }
    </>


  )
}
export default HomePage