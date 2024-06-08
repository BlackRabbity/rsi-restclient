import axios from "axios";

const API_URL = "https://localhost:7043";

const userService = {
    getUser: async (authHeader) => {
        console.log(authHeader);
        try {
          const response = await axios.get(`${API_URL}/api/users`, {
            headers: {
              Authorization: authHeader,
            },
          });
          return response.data;
        } catch (error) {
          console.error("Error fetching data", error);
          throw error;
        };
    }
}

class userServiceSingleton {
  constructor() {
    if (userServiceSingleton.instance) {
      return userServiceSingleton.instance;
    }

    this.state = {
      authHeader: null,
    };

    userServiceSingleton.instance = this;
  }

  static getInstance() {
    if (!userServiceSingleton.instance) {
      userServiceSingleton.instance = new userServiceSingleton();
    }
    return userServiceSingleton.instance;
  }

  // Example method to set data
  setHeader(authHeader) {
    this.state.authHeader = authHeader;
  }

  // Example method to get data
  getHeader() {
    return this.state.authHeader;
  }
}

export default userServiceSingleton;
