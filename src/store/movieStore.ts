import { makeAutoObservable } from "mobx";
import ApiService from "../api/fetchApi";
import { Movie, Person } from "../types/types";

class MovieStore {
  movies: Movie[] = [];
  movie: Movie | null = null;
  favorites: Movie[] = [];
  movieActors: Person[] = [];
  currentPage: number = 1;
  totalPageCount: number = 0;
  filters: string[] = [];
  ratingRange: [number, number] = [0, 10];
  yearRange: [number, number] = [1990, new Date().getFullYear()];

  constructor() {
    makeAutoObservable(this);
    this.loadFavoritesFromLocalStorage();
  }

  getMovies = async (filter?: string) => {
    try {
      const res = await ApiService.loadMovies(this.currentPage, filter);
      if (res) {
        this.movies = res.docs;
        this.totalPageCount = res.pages;
      }
    } catch (error) {
      console.log("Ошибка загрузки списка фильмов:", error);
    }
  };

  setCurrentPage = (page: number) => {
    try {
      this.currentPage = page;
      this.movies = [];
      this.getMovies(this.filters.join(""));
    } catch (error) {
      console.log(error);
    }
  };

  getFilter = (data: string, type: string) => {
    try {
      if (!this.filters.includes(data)) {
        this.filters.push(`&${type}=${data}`);
        this.movies = [];
        this.getMovies(this.filters.join(""));
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteFilter = (data: string, type: string) => {
    try {
      this.filters.splice(
        this.filters.findIndex((item: string) => item === `&${type}=${data}`),
        1
      );
      this.getMovies(this.filters.join(""));
    } catch (error) {
      console.log(error);
    }
  };

  setRatingRange = (min: number, max: number) => {
    try {
      this.ratingRange = [min, max];
      this.movies = [];

      const raitingIndex = this.filters.findIndex((str) =>
        str.includes("rating")
      );

      if (raitingIndex !== -1) {
        this.filters.splice(raitingIndex, 1);
      }
      this.filters.push(
        `&rating.imdb=${(min + 0.1).toFixed(1)}-${max.toFixed(1)}`
      );
      this.getMovies(this.filters.join(""));
    } catch (error) {
      console.log(error);
    }
  };

  setYearRange = (min: number, max: number) => {
    try {
      this.yearRange = [min, max];
      this.movies = [];

      const yearIndex = this.filters.findIndex((str) => str.includes("year"));

      if (yearIndex !== -1) {
        this.filters.splice(yearIndex, 1);
      }

      this.filters.push(`&year=${min + 1}-${max}`);
      this.getMovies(this.filters.join(""));
    } catch (error) {
      console.log(error);
    }
  };

  loadNextPage = async () => {
    const nextPage = this.currentPage + 1;
    if (nextPage <= this.totalPageCount) {
      this.currentPage = nextPage;
      await this.getMovies(this.filters.join(""));
    }
  };

  loadPreviousPage = async () => {
    const prevPage = this.currentPage - 1;
    if (prevPage > 0) {
      this.currentPage = prevPage;
      await this.getMovies(this.filters.join(""));
    }
  };

  getMovieSearch = async (name: string) => {
    try {
      const res = await ApiService.searchMovie(name);
      if (res) {
        this.movies = res.docs;
        this.totalPageCount = res.pages;
      }
    } catch (error) {
      console.log("Ошибка поиска фильма:", error);
    }
  };

  getMovie = async (id: number) => {
    try {
      const res = await ApiService.loadMovie(id);
      this.movie = res;
      if (res?.persons) {
        this.movieActors = res.persons.filter(
          (person: Person) => person.profession === "актеры"
        );
      } else {
        this.movieActors = [];
      }
    } catch (error) {
      console.log("Ошибка загрузки фильма:", error);
    }
  };

  addToFavorites = (movie: Movie) => {
    if (!this.favorites.some((fav) => fav.id === movie.id)) {
      this.favorites.push(movie);
      this.saveFavoritesToLocalStorage();
    }
  };

  removeFromFavorites = (movieId: number) => {
    this.favorites = this.favorites.filter((fav) => fav.id !== movieId);
    this.saveFavoritesToLocalStorage();
  };

  saveFavoritesToLocalStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  };

  loadFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  };
}

export default new MovieStore();
