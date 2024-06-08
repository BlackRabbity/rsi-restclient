import React, { useState, useEffect } from 'react';
import '../styles/Repertoire.css';
import { getShowingData } from '../services/cinemaService';
import { getImageData } from '../services/imageService';
import { formatDate } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';


const Repertoire = () => {
  const [showings, setShowings] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cinemaData = await getShowingData();
        setShowings(cinemaData);

        const imagePromises = cinemaData.map(async (showing) => {
          const imageUrl = await getImageData({ ImageName: showing.film.imageName });
          return { id: showing.id, imageUrl };
        });

        const imageResults = await Promise.all(imagePromises);
        const imagesMap = imageResults.reduce((acc, curr) => {
          acc[curr.id] = curr.imageUrl;
          return acc;
        }, {});
        setImages(imagesMap);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
    return () => {
    };
  }, []);

  const handleItemClick = (showing) => {
    navigate(`/showingSeats/${showing.id}`, { state: { showing } });
  };



  return (
    <div>
      <h1>Showings</h1>
      <ul>
        {showings.map((showing, index) => (
          <li
            key={index}
            className="showing-item"
            onClick={() => handleItemClick(showing)}
          >
            <div>
              {images[showing.id] && (
                <img
                  src={images[showing.id]}
                  alt={showing.film.title}
                  className="showing-image"
                />
              )}
            </div>
            <div className="showing-details">
              <h2>{showing.film.title}</h2>
              <p>
                <strong>Description:</strong> {showing.film.description}
              </p>
              <p>
                <strong>Date of Play:</strong> {formatDate(showing.date)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Repertoire