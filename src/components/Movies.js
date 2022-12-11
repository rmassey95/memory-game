import { isClickableInput } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import {
  mov1917,
  endgame,
  et,
  hangover,
  hulk,
  ironMan,
  joker,
  jurassicPark,
  lotr,
  shining,
  thor,
  titanic,
} from "../images";
import "../styles/Movies.css";

const Movies = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [imagePaths, setImagePaths] = useState([
    { title: "1917", id: "1917", img: mov1917 },
    { title: "Avengers Endgame", id: "endgame", img: endgame },
    { title: "ET", id: "et", img: et },
    { title: "Hangover", id: "hangover", img: hangover },
    { title: "Hulk", id: "hulk", img: hulk },
    { title: "Iron Man", id: "ironman", img: ironMan },
    { title: "Joker", id: "joker", img: joker },
    { title: "Jurassic Park", id: "jurassic-park", img: jurassicPark },
    { title: "Lord of the Rings", id: "lotr", img: lotr },
    { title: "The Shining", id: "shining", img: shining },
    { title: "Thor", id: "thor", img: thor },
    { title: "Titanic", id: "titanic", img: titanic },
  ]);

  const clicked = (e) => {
    if (clickedBoxes.find((box) => box === e.target.title)) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedBoxes([]);
    } else {
      setClickedBoxes(clickedBoxes.concat(e.target.title));
      setScore(score + 1);
    }
  };

  function reorderArray() {
    let currentIndex = imagePaths.length,
      randomIndex;
    let imagePathsTemp = imagePaths;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [imagePathsTemp[currentIndex], imagePathsTemp[randomIndex]] = [
        imagePathsTemp[randomIndex],
        imagePathsTemp[currentIndex],
      ];
    }

    setImagePaths(imagePathsTemp);
  }

  useEffect(() => {
    reorderArray();
  }, [score]);

  return (
    <div>
      <h2 className="score">Score: {score}</h2>

      <h4 className="score">Best Score: {bestScore}</h4>
      <div className="card-container">
        {imagePaths.map((image) => {
          return (
            <div
              className="card"
              onClick={(e) => {
                clicked(e);
              }}
              key={image.id}
            >
              <img
                className="img"
                src={image.img}
                title={image.id}
                alt={image.title}
              />
              <p className="title" title={image.id}>
                {image.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
