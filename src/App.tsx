import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/UI/Header/Header";
import MainPage from "./components/Pages/MainPage/MainPage";
import { MoviePage } from "./components/Pages/MoviePage/MoviePage";

export const App = observer(() => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </>
  );
});
