import axios, { AxiosResponse } from "axios";

interface ApiResponse<T> {
  status: string;
  status_code: number;
  data: T;
}

const BASE_URL = "http://localhost:1337";

export const fetchGetApi = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios.get(
      `${BASE_URL}${endpoint}`
    );
    if (
      response.data.status === "success" &&
      response.data.status_code === 200
    ) {
      return response.data.data;
    } else {
      console.error("Unexpected API response:", response);
      return [] as unknown as T;
    }
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return [] as unknown as T;
  }
};

export const fetchTestNames = async (): Promise<string[]> => {
  return await fetchGetApi<string[]>("/test/tests/");
};
