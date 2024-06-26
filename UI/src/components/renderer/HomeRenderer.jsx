// import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { favourites } from '../../jotai/Store';

const HomeRenderer = ({results,open}) => {
    const navigate = useNavigate();

    const [favourtite,setFavourite] = useState([]);

    const favourtiteHandler = (id) =>{
      if (favourtite.includes(id)) {
        setFavourite((prev)=>{
          return [...prev.filter((item)=>item !== id)]
        })
      }else{
        setFavourite((prev)=>{
          return[...prev,id]
        })
      }
    };

    useEffect(()=>{

    },[])
    console.log(favourtite);
  return (
    <>
        <div className='flex justify-between items-center h-12 md:mx-6'>
          <span className='text-lg font-semibold '>{results.name}</span>
          <span className='flex justify-center rounded-2xl hover:text-black hover:bg-gray-50 outline outline-2 md:w-36 p-[0.20rem] cursor-pointer'
                onClick={()=>navigate(results.link)}>
                <p className=''>View More</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-[0.10rem]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
          </span>
        </div>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-row md:flex-wrap lg:flex-nowrap md:justify-evenly md:items-center lg:h-[19rem]'>
          {results.arr.map((item,index)=>(
              <div className='rounded overflow-hidden relative' key={index} >
                <img src={item.Poster} onClick={()=>open(item)}
                alt="" className='h-72 w-48 transition ease-in-out hover:scale-110 active:scale-95 duration-500 cursor-pointer'/>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className={`w-6 h-6 absolute top-0 right-0 ${item.imdbID === favourtite[index] ? `fill-red-700` : `fill-yellow-700`}`}
                onClick={()=>favourtiteHandler(item.imdbID)}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>

              </div>
          ))}
        </div>
    </>
  )
}

export default HomeRenderer