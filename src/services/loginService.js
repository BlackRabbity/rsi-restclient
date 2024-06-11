import axios from "axios";

const API_URL = "https://192.168.65.9:7043";

const loginService = {
  login: async (authHeader) => {
    console.log(authHeader);
    try {
      const response = await axios.get(`${API_URL}/api/users`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  },
};
export default loginService;
