import axios from "axios";

const url = "https://chat-bot-9qop.onrender.com";

export const getRequest = async (urlPath) => {
  try {
    // use axios.get to send a GET request to the url
    let response = await axios.get(`${url}/${urlPath}`);
    // return the response data
    return response.data;
  } catch (error) {
    // handle any errors
    console.error(error);
  }
};
