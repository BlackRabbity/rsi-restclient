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

  setHeader(authHeader) {
    this.state.authHeader = authHeader;
  }

  getHeader() {
    return this.state.authHeader;
  }
}

export default userServiceSingleton;
