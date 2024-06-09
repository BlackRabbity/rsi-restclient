import axios from "axios";
import userServiceSingleton from "./userService";

const API_URL = "https://localhost:7043";

const SeatService = {
  getShowingData: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/showings`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  },

  getMyReservationData: async () => {
    const user = new userServiceSingleton();
    const authHeader = user.getHeader();
    try {
      const response = await axios.get(
        `${API_URL}/api/Showings/my`,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  },

  getMyReservationDataInPDF: async () => {
    const user = new userServiceSingleton();
    const authHeader = user.getHeader();
    try {
      const response = await axios.get(
        `${API_URL}/api/Showings/generatePdf`,
        {},
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  },
};

export default SeatService;
