import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getSeasons } from '../api/CallingApi';
import Spinner from '../Components/Spinner';
import '../App.css';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';


const Seasons = () => {
  const { state } = useLocation();
  const [seasons, setSeasons] = useState([]);
  const [seasonShow, setSeasonShow] = useState('');
  const [loading, setLoading] = useState(true); // New state for showing the Spinner

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seasonForShow = await getSeasons(state.showId);
        setSeasonShow(seasonForShow);
        setSeasons(seasonForShow.seasons);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        alert(error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, [1]);

  return (
    <>
      {loading ? ( // Show the Spinner only when data is being fetched
        <Spinner />
      ) : (
        <Container>
          <h1 className="mt-4 mb-4">{seasonShow.title}</h1>
          <Row>
            {seasons.map((season) => (
              <Col key={season.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                <Link to="/episodes" state={{ seasonEpisodes: season.episodes }}>
                  <Card id={season.id}>
                    <Card.Img id={season.id} variant="top" src={season.image} alt={season.title} />
                    <Card.Body>
                      <Card.Title style={{ textDecoration: 'none', color: '#fff' }}>{season.title}</Card.Title>
                      <p style={{ color: '#fff' }}>{"Episodes " + season.episodes.length}</p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
         
        </Container>
      )}
    </>
  );
};

export default Seasons;
