import axios from "axios";

export const fetchTestNames = async () => {
  try {
    const response = await axios.get("http://0.0.0.0:1337/test/tests/");
    if (response.data.status === "success" && response.data.status_code === 200) {
      return response.data.data;
    } else {
      console.error("Unexpected API response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching test names:", error);
    return [];
  }
};
