import React from "react";
import "../styles/ShowingSeats.css";
import { useLocation } from "react-router-dom";
import SeatService from "../services/seatService";

function ShowingSeats() {
  const location = useLocation();
  const showing = location.state?.showing;
  const maxSeatsPerRow = Math.max(
    ...showing.room.seats.map((seat) => seat.row + 1)
  );

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const rows = chunkArray(showing.room.seats, maxSeatsPerRow);

  const reserveSeat = async (showingId, seatNumber) => {
    try {
      await SeatService.reserveSeat(showingId, seatNumber);
      console.log("Seat reserved successfully!");
    } catch (error) {
      console.error("Error reserving seat:", error);
    }
  };

  return (
    <div className="showing-seats">
      <h2>Showing seats for: {showing.film.title}</h2>
      <div className="seats-container">
        {Array.from({ length: maxSeatsPerRow }, (_, i) => (
          <div key={i} className="seat-column">
            {rows.map((row, rowIndex) => (
              <span
                key={rowIndex}
                className={`seat ${
                  row[i]?.reservation ? "reserved" : "available"
                }`}
                onClick={() => reserveSeat(showing.id, row[i]?.seatNumber)}
              >
                <span className="seat-number">{row[i]?.seatNumber}</span>
              </span>
            ))}
          </div>
        ))}
        <div className="screen-container">
          <div className="screen">SCREEN</div>
        </div>
      </div>
    </div>
  );
}

export default ShowingSeats;
