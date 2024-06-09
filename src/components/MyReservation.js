import React, { useEffect, useState } from "react";
import "../styles/MyReservation.css";
import CinemaService from "../services/cinemaService";
import { getImageData } from "../services/imageService";
import { formatDate } from "../utils/dateUtils";
import SeatService from "../services/seatService";

function MyReservation() {
  const [showings, setShowings] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cinemaData = await CinemaService.getMyReservationData();
        setShowings(cinemaData);
        const imagePromises = cinemaData.map(async (showing) => {
          const imageUrl = await getImageData({
            ImageName: showing.film.imageName,
          });
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
    return () => {};
  }, []);

  const handleItemClick = async (showing, seat) => {
    const newSeat = prompt("Please enter your new seat number:");
    const newSeatNumber = parseInt(newSeat, 10);
    if (newSeat) {
      try {
        await SeatService.reserveSeat(showing.id, newSeatNumber);
        await SeatService.reserveSeat(showing.id, seat.seatNumber);
        const cinemaData = await CinemaService.getMyReservationData();
        setShowings(cinemaData);
        console.log(`Seat number unreserved ${seat.seatNumber} and new seat number ${newSeatNumber} reserved successfully.`);
      } catch (error) {
        console.error("Error reserving seat:", error);
      }
    }
  };

  const handleButtonClick = async (showing) => {
    try {
      await CinemaService.getMyReservationDataInPDF();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div>
      <h1>Showings</h1>
      <ul>
        {showings.map((showing, showingIndex) => (
          <li key={showingIndex} className="showing-item-reserved">
            <div>
              {images[showing.id] && (
                <img
                  src={images[showing.id]}
                  alt={showing.film.title}
                  className="showing-image-reserved"
                />
              )}
            </div>
            <div className="showing-details-reserved">
              <h2>{showing.film.title}</h2>
              <p>
                <strong>Description:</strong> {showing.film.description}
              </p>
              <p>
                <strong>Date of Play:</strong> {formatDate(showing.date)}
              </p>
              <div>
                <strong>Your seats:</strong>
                <div className="seats-container">
                  {showing.room.seats.map((seat, seatIndex) => (
                    <div
                      key={seatIndex}
                      className="showing-seats-reserved"
                      onClick={() => handleItemClick(showing, seat)}
                    >
                      Seat {seat.seatNumber}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="pdf-button"
        onClick={() => handleButtonClick()}
      >
        Download Pdf
      </button>
    </div>
  );
}

export default MyReservation;
