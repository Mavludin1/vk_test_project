import axios from "axios";
import { AllInfoPerson, Movie, MovieArray } from "../types/types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "J9MPE1Z-R7AM31Y-GMD2WZB-A77WYGF",
  },
};

class ApiService {
  static async loadMovies(
    page: number,
    filters?: string
  ): Promise<MovieArray | null> {
    try {
      const response = await axios.get<MovieArray>(
        `https://api.kinopoisk.dev/v1.3/movie?page=${page}&limit=50${
          filters ? filters : ""
        }`,
        options
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async searchMovie(name: string): Promise<MovieArray | null> {
    try {
      const response = await axios.get<MovieArray>(
        `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=50&query=${name}`,
        options
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async loadPerson(id: number): Promise<AllInfoPerson | null> {
    try {
      const response = await axios.get<AllInfoPerson>(
        `https://api.kinopoisk.dev/v1.4/person/${id}`,
        options
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async loadMovie(id: number): Promise<Movie | null> {
    try {
      const response = await axios.get<Movie>(
        `https://api.kinopoisk.dev/v1.4/movie/${id}`,
        options
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default ApiService;
