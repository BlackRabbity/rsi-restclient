import React, { useEffect, useState } from "react";
import "../styles/ShowingSeats.css";
import { useLocation } from "react-router-dom";
import SeatService from "../services/seatService";

function ShowingSeats() {
  const location = useLocation();
  const showing = location.state?.showing;
  const [seats, setSeats] = useState(showing?.room.seats || []);
  const [rows, setRows] = useState([]);
  const maxSeatsPerRow = Math.max(...seats.map((seat) => seat.row + 1));

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  useEffect(() => {
    setRows(chunkArray(seats, maxSeatsPerRow));
  }, [seats, maxSeatsPerRow]);

  const reserveSeat = async (showingId, seatNumber) => {
    try {
      await SeatService.reserveSeat(showingId, seatNumber);
      console.log("Seat reserved|unreserved");
      const updatedSeats = await SeatService.getSeats(showingId);
      setSeats(updatedSeats);
    } catch (error) {
      console.error("Error reserving seat:", error);
    }
  };

  const handleButtonClick = async (showing) => {
    const seats = prompt("Please enter seats after the decimal point:");
    if (!seats) {
      return;
    }
    const seatsNumbers = seats.split(',').map(num => parseInt(num.trim(), 10));
    const invalidSeats = seatsNumbers.filter(num => isNaN(num));
    if (invalidSeats.length > 0) {
      alert("Invalid seat numbers entered. Please enter valid numbers separated by commas.");
      return;
    }
      try {
        await SeatService.reserveMultipleSeats(showing.id, seatsNumbers);
        console.log(`Multiply seats reserved successfully.`);
        const updatedSeats = await SeatService.getSeats(showing.id);
        setSeats(updatedSeats);
      } catch (error) {
        console.error("Error reserving seats:", error);
      }
  };

  
  return (
    <div className="showing-seats">
      <h2>Showing seats for: {showing.film.title}</h2>
      <div className="seats-container">
        {Array.from({ length: maxSeatsPerRow }, (_, i) => (
          <div key={i} className="seat-column">
            {rows.map((seats, index) => (
              <span
                key={index}
                className={`seat ${
                  seats[i]?.reservation ? "reserved" : "available"
                }`}
                onClick={() => reserveSeat(showing.id, seats[i]?.seatNumber)}
              >
                <span className="seat-number">{seats[i]?.seatNumber}</span>
              </span>
            ))}
          </div>
        ))}
        <div className="screen-container">
          <div className="screen">SCREEN</div>
        </div>
        <button className="pdf-button" onClick={() => handleButtonClick(showing)}>
            Reserve multi seats
          </button>
      </div>
    </div>
  );
}

export default ShowingSeats;
