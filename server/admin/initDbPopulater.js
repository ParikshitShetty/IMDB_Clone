// Import singleton
const SQLiteSingleton = require('../sqliteSingleton');

// create an instance
const dbInstance = new SQLiteSingleton('../imdb.db');

const moviesAndProducers = require('../helpers/movies.json');

const actors = require('../helpers/actors.json');

const updateActors = async() => {
  try {
    const actorsQuery = `SELECT * FROM Actors`;
    const actorsRows = await dbInstance.select(actorsQuery, []);

    if (actors.length === actorsRows.length) {
      console.log("Actors table is Synced");
      return { "message" : "Actors table is already updated" };
    }
    
    for (const actor of actors) {
      // console.log(actor)
      const selectQuery = `SELECT * FROM Actors WHERE name="${actor.name}"`;
      const rows = await dbInstance.select(selectQuery, []);

      if (rows.length === 0) {
        console.log("Actor is not present updating")
        const insertQuery = "INSERT INTO Actors (name, gender, dob, bio) VALUES (?, ?, ?, ?)";
        const params = [actor.name, actor.gender, actor.dob, actor.bio];
        const insertResult = await dbInstance.insert(insertQuery, params);
        console.log("insertResult",insertResult)
      }else{
        console.log("Row exists in Actors")
      }
    }
    return {"message":"Added Actors data"}
  } catch (error) {
    console.error("error while adding to Actors Table: ",error);
  }
}

// Update producers table
const updateProducers = async() =>{
  try {
    let producers = require('../helpers/producers.json');

    const query = `SELECT * FROM Producers`;
    const rows = await dbInstance.select(query, []);

    if (producers.length === rows.length) {
      console.log("Producers table Synced");
      return { "message" : "Producers table is already updated" };
    }

    for (let index = 0; index < producers.length ; index++) {
      const producer = producers[index];
      const dbRow = rows[index];
   
      if (dbRow.name === producer.name) {
        const insertQuery = "INSERT INTO Producers (name, gender, dob, bio) VALUES (?, ?, ?, ?)";

        const params = [producer.name, producer.gender, producer.dob, producer.bio];
        const insertResult = await dbInstance.insert(insertQuery, params);
        
      }else{
        console.log("Row exists in Producers")
      }
    }
    return { "message" : "Updated producers table" } ;
  } catch (error) {
    console.error("error while adding to  database: ",error);
    return { "message" : "Error while updating database initially" };
  }
}

const updateMovies = async() =>{
    let array = [];
    try {
      // const query = `SELECT * FROM Producers`;
      // const rows = await dbInstance.select(query, []);
      // console.log("rows",rows,"moviesAndProducers",moviesAndProducers.length);
  
      const movieQuery = `SELECT * FROM Movies`;
      const moviesRows = await dbInstance.select(movieQuery, []);
  
      // console.log(moviesAndProducers.length, moviesRows.length);
      if (moviesAndProducers.length === moviesRows.length) {
        console.log("Movie table is Synced");
        return { "message" : "Movies table is already updated" };
      }
      // return
      for (let i = 0; i < moviesAndProducers.length; i++) {
          const response = await fetch(`http://www.omdbapi.com/?t=${moviesAndProducers[i].movie}&apikey=faa9a7ed`);
          const responseJson = await response.json();

          // Get the movies id
          const selectQuery = `SELECT id FROM Producers WHERE name="${moviesAndProducers[i].producer}"`
          const dbResponse = await dbInstance.select(selectQuery,[]);  
          const movie_Id = dbResponse[0].id;

          // Check if the movie exists or not
          const movieSelectQuery = `SELECT * FROM Movies WHERE name="${responseJson.Title}"`
          const movieTableResponse = await dbInstance.select(movieSelectQuery,[]);  

          // If movies doesn't exist then update it
          if (movieTableResponse.length === 0) {
            console.log("Movie is not present in db, updating it");

            const insertQuery = "INSERT INTO Movies (name, Year_Of_Release, Plot, poster, producer_id) VALUES (?, ?, ?, ?, ?)";
            const params = [responseJson.Title, responseJson.Year, responseJson.Plot, responseJson.Poster, movie_Id];
            const insertResult = await dbInstance.insert(insertQuery, params);

            // console.log("insertResult",insertResult);
          }else{
            console.log("The movie already exixts")
          }
          // const movieQuery = `SELECT * FROM Movies`;
          const movieQueryResponse = await dbInstance.select(movieQuery,[]); 
          array = movieQueryResponse;
      }
      return {"message":"Added movie data",array:array}
    } catch (error) {
      console.error('Error while updating data:', error);
      return {"message":"Error while adding movie data",error:error}
    }
}

const updateMovieActors = async() => {
  try {
    const selectQuery =  `SELECT * FROM MoviesActors`;
    const moviesActorsResponse = await dbInstance.select(selectQuery,[]);

    console.log("moviesActorsResponse",moviesActorsResponse)

    for (let i = 0; i < moviesAndProducers.length; i++) {
      const response = await fetch(`http://www.omdbapi.com/?t=${moviesAndProducers[i].movie}&apikey=faa9a7ed`);
      const responseJson = await response.json();
      // console.log(responseJson.Actors,"Actors",responseJson.Title,"Title")
      // Get Movie id from db
      const movieSelectQuery = `SELECT id FROM Movies WHERE name="${responseJson.Title}"`
      const movieTableResponse = await dbInstance.select(movieSelectQuery,[]); 
      const movieId = movieTableResponse[0].id;

      // Get actors id from db\
      const actorArray = responseJson.Actors.toString().split(',')
      for (const actor of actorArray) {
        // console.log(actor.trim())
        const name = actor.trim()
        const actorSelectQuery = `SELECT id FROM Actors WHERE name="${name}"`
        const actorTableResponse = await dbInstance.select(actorSelectQuery,[]); 
        if (actorTableResponse.length === 0) {
          console.log("Actor is not found")
        }else{
          const actorId = actorTableResponse[0].id;
          // console.log("actorId",actorId)
  
          const insertQuery = `INSERT INTO MoviesActors (actor_id, movie_id) VALUES (?, ?)`;
          const options = [actorId,movieId]
          const moviesRows = await dbInstance.insert(insertQuery, options);
          // console.log("moviesRows",moviesRows)
        }
      }
    }
    return {"message":"Updated MoviesActors table"}
  } catch (error) {
    console.error('Error while updating  movieActos table:', error);
    return {"message":"Error while adding movieActos data",error:error}
  }
}

// 'INSERT INTO MoviesActors (actor_id, movie_id) VALUES (?, ?)'

const initDbPopulater = async( req, res ) => {
    try {
        const updateProducer = await updateProducers();
        const updateMovie = await updateMovies();
        const updateActor = await updateActors();
        const updateMovieActor = await updateMovieActors()
        res.json({ "message" : "Updated tables", 
          updateProducer:updateProducer, updateMovie:updateMovie, updateActor:updateActor, updateMovieActor:updateMovieActor
        });
    } catch (error) {
      console.error("error while adding to  database: ",error);
      res.json({ "message" : "Error while updating database initially" });
    }
}

module.exports = initDbPopulater;