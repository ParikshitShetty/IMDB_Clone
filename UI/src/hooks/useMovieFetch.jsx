// import { useAtom } from 'jotai';
import React,{useEffect,useRef,useState} from 'react'
// import { movies } from '../jotai/List';


const useMovieFetch = (length) => {

    const [movieList] = useState(["Harry Potter",
        "Star Wars",
        "The Lord of the Rings: The Fellowship of the Ring",
        "Deadpool",
        "The Fast and the Furious",
        "Dr. No",
        "Jurassic Park",
        "Mission: Impossible",
        "Pirates of the Caribbean",
        "Transformers",
        "X-Men",
        "The Hunger Games",
        "The Chronicles of Narnia",
        "Toy Story",
        "The Matrix",
        "Die Hard",
        "Mad Max: Fury Road",
        "Hobbit",
        "The Terminator",
        "The Godfather",
        "Iron Man",
        "Terminator 2",
        "Hulk",
        "Star Trek",
        "John Wick",
        "Avengers",
        "Avatar",
        "The Wolverine",
        "Indiana Jones",
        "Back to the Future",
        "Ghostbusters",
        "Planet of the Apes",
        "Alien",
        "Predator",
        "Captain America",
        "The Bourne",
        "Spider-Man",
        "Men in Black",
        "Jurassic Park",
        "Thor"]);

    const [movieResults, setMovieResults] = useState([]);

    const render = useRef(true);

    useEffect(() => {
        if (render.current) {
          render.current = false;
          for (let i = 0; i < length; i++) {
            fetch(`${import.meta.env.VITE_TITLE}${movieList[i]}&apikey=${import.meta.env.VITE_KEY}`).
              then((res)=>res.json()).
              then((respJson)=> setMovieResults((prev)=>[
                ...prev,respJson
            ])).catch((error) => {
              console.error('Error fetching data:', error);
            });
          }
        }
    }, [])

  return movieResults
}

export default useMovieFetch