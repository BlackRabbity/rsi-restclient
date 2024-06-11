import axios from "axios";
import userServiceSingleton from "./userService";

const API_URL = "https://192.168.65.9:7043";

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
      const response = await axios.get(`${API_URL}/api/showings/my`, {
        headers: {
          Authorization: authHeader,
        },
      });
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
        {
          responseType: 'blob',
          headers: {
            Authorization: authHeader,
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reservations.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  },
};

export default SeatService;
