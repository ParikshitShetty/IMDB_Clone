import React, { useState,useEffect,useRef } from 'react'
import HomeRenderer from '../components/renderer/HomeRenderer';
import useMovieFetch from '../hooks/useMovieFetch';
// import { useAtom } from 'jotai';
// import { movies } from '../jotai/List';
// import Pagination from '../components/Pagination';
// import RouteRenderer from '../components/renderer/RouteRenderer';
// import Loading from '../utilities/Loading';

const Movies = () => {
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

  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(12);

  const apiResults = useMovieFetch(postsPerPage);

  const [results,setResults] = useState([]);
  const render = useRef(false);

  const getData = () =>{
    setResults([]);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    for (let i = firstPostIndex; i < lastPostIndex; i++) {
      fetch(`${import.meta.env.VITE_TITLE}${movieList[i]}&apikey=${import.meta.env.VITE_KEY}`).
        then((res)=>res.json()).
        then((respJson)=> setResults((prev)=>[
          ...prev,respJson
      ])).catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  }

  useEffect(()=>{
    if (currentPage === 2) {
      render.current = true;
    }
    if (render.current) {
      getData();
    }
  },[currentPage])
  
  useEffect(()=>{
    setResults(apiResults);
  },[apiResults])
  
  console.log("results",results)
  return (
    <>
    <div className='flex flex-col h-auto'>
      {results.length === 12 ?
      <main className='grid place-items-start grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4
       sm:my-8 sm:mx-8'>
          {/* <HomeRenderer results={results}/> */}
      </main>
        : 
        <>
            Loading
            {/* <Loading/> */}
        </>
      }
      {/* {results.length > 0 &&
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      } */}
    </div>
    </>
  )
}
export default Movies