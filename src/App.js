/* eslint-disable import/no-anonymous-default-export */

import React, { useEffect, useState } from "react";
import "./App.css";
import tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [darkHeader, setDarkHeader] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      //carregando lista Total
      let list = await tmdb.getHomeList();
      setMovieList(list);

      // Pegando o featured
      let originals = list.filter((i) => i.slug === "originais");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);


// Scroll do Header
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 20) {
        setDarkHeader(true);
      } else {
        setDarkHeader(false);
      }
    }
  
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  

  return (
    <div className="page">

      <Header bgdark={darkHeader}/>

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'>❤️</span> por Ewerton Lopes<br />
        Direitos de imagens para Netflix  |  Base de dados Themoviedb.org
      </footer>

          
      {movieList.length <= 0 && 
      <div className="loading">
        <img src="https://spoilertime.com/wp-content/uploads/2019/03/Netflix_LoadTime.gif" alt="Carregando..." />
      </div>
      }

    </div>
  );
};
