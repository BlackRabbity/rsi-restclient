import axios from "axios";
import userServiceSingleton from "./userService";

const API_URL = "https://localhost:7043";

const SeatService = {
  reserveSeat: async (showingId, seatNumber) => {
    const user = new userServiceSingleton();
    const authHeader = user.getHeader();
    try {
      const response = await axios.put(
        `${API_URL}/api/showings/${showingId}/Seats/${seatNumber}`,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error reserving seat:", error);
      throw error;
    }
  },

  getSeats: async (showingId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/showings/${showingId}/Seats`,
      );
      return response.data;
    } catch (error) {
      console.error("Error reserving seat:", error);
      throw error;
    }
  },
};

export default SeatService;
