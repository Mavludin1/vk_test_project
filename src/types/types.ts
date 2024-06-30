export interface Person {
  id: number;
  photo: string;
  name: string;
  enName?: string;
  description?: string;
  profession: string;
  enProfession?: string;
}

export interface Place {
  value: string;
}

export interface Profession {
  value: string;
}

export interface PersonMovie {
  id: number;
  name: string | null;
  alternativeName: string;
  rating: number | null;
  general: boolean;
  description: string | null;
  enProfession: string;
}

export interface AllInfoPerson {
  id: number;
  age: number | null;
  birthPlace: Place[];
  birthday: string | null;
  countAwards: number | null;
  createdAt: string;
  death: string | null;
  deathPlace: Place[];
  enName: string;
  facts: any[];
  growth: number | null;
  movies: PersonMovie[];
  name: string;
  photo: string;
  profession: Profession[];
  sex: string;
  spouses: any[];
  updatedAt: string;
}

export interface Rating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await?: number | null;
}

export interface Votes {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export interface Poster {
  url: string;
  previewUrl: string;
}

export interface Backdrop {
  url: string;
  previewUrl: string;
}

export interface Genre {
  name: string;
}

export interface Country {
  name: string;
}

export interface Budget {
  currency: string;
  value: number;
}

export interface Premiere {
  country?: string | null;
  digital?: string | null;
  cinema?: string | null;
}

export interface Audience {
  count: number;
  country: string;
}

export interface WatchabilityItem {
  name: string;
  logo: {
    url: string;
    previewUrl: string;
  };
  url: string;
}

export interface Watchability {
  items: WatchabilityItem[];
}

export interface Movie {
  id: number;
  externalId: {
    kpHD: string;
  };
  name: string;
  alternativeName: string;
  enName: string;
  names: {
    name: string;
    language: string;
    type: string;
  }[];
  type: string;
  typeNumber: number;
  year: number;
  description: string;
  shortDescription: string;
  slogan: string;
  status: string;
  rating: Rating;
  votes: Votes;
  movieLength: number;
  totalSeriesLength?: number;
  seriesLength: number;
  ratingMpaa: string;
  ageRating: number;
  poster: Poster;
  backdrop: Backdrop;
  genres: Genre[];
  countries: Country[];
  persons: Person[];
  budget: Budget;
  premiere: Premiere;
  watchability: Watchability;
  top10: number;
  top250: number;
  isSeries: boolean;
  audience: Audience[];
  ticketsOnSale: boolean;
  lists: string[];
  networks: string;
  createdAt: string;
  updatedAt: string;
}

export interface MovieArray {
  docs: Movie[];
  pages: number;
}
