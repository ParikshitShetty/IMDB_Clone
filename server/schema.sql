CREATE TABLE Users (
  id INTEGER PRIMARY KEY,
  user_name TEXT UNIQUE,
  password TEXT
);

CREATE TABLE Actors (
  id INTEGER PRIMARY KEY,
  name TEXT,
  gender TEXT,
  dob DATE,
  bio TEXT
);

CREATE TABLE Producers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  gender TEXT,
  dob DATE,
  bio TEXT
);

CREATE TABLE Movies (
  id INTEGER PRIMARY KEY,
  name TEXT,
  Year_Of_Release TEXT,
  Plot TEXT,
  poster TEXT,
  producer_id INTEGER,
  FOREIGN KEY (producer_id) REFERENCES Producers (id)
);

CREATE TABLE MoviesActors (
  actor_id INTEGER,
  movie_id INTEGER,
  PRIMARY KEY (actor_id, movie_id),
  FOREIGN KEY (actor_id) REFERENCES Actors (id),
  FOREIGN KEY (movie_id) REFERENCES Movies (id)
);
