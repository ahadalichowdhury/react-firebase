import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  const [movieList, setMovieList] = useState([]);

  //new movie State
  const [movieTitle, setMovieTitle] = useState("");
  const [movieReleaseDate, setMovieReleaseDate] = useState("");
  const [movieReceivedAnOscar, setMovieReceivedAnOscar] = useState(false);

  const [updateMovieTitle, setUpdateMovieTitle] = useState("");

  //file upload state
  const [file, setFile] = useState(null);

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: movieTitle,
        releaseDate: movieReleaseDate,
        receivedAnOscar: movieReceivedAnOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    // getMovieList();
    // const movieDoc = doc(db, "movies", "movie", id);
    // await deleteDoc(movieDoc);
  };

  const updateTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateMovieTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if (!file) return;
    const fileFolderRef = ref(storage, `projectFile/${file.name}`);
    try {
      await uploadBytes(fileFolderRef, file);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="movie title..."
          onChange={(e) => {
            setMovieTitle(e.target.value);
          }}
        />
        <input
          placeholder="release date..."
          type="number"
          onChange={(e) => {
            setMovieReleaseDate(Number(e.target.value));
          }}
        />
        <input
          type="checkbox"
          checked={movieReceivedAnOscar}
          onChange={(e) => {
            setMovieReceivedAnOscar(e.target.checked);
          }}
        />
        <label> received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>{movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete</button>

            <input
              placeholder="new title...."
              onChange={(e) => {
                setUpdateMovieTitle(e.target.value);
              }}
            />
            <button onClick={() => updateTitle(movie.id)}>Update</button>
          </div>
        ))}
      </div>

      <div>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
