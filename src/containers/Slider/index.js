import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trie décroissant des dates
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Afficher la carte suivante
  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0) {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }
  };
  
  useEffect(() => {
    // Mettre en place un timer pour appeler nextCard toutes les 5000ms
    const intervalId = setInterval(nextCard, 5000);
    // Appeler nextCard immédiatement après le chargement du composant
    nextCard();
    // Nettoyer le timer lorsque le composant est démonté
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={`${idx+1}`}>
        <div key={event.title} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer" >
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {byDateDesc.map((_, radioIdx) => (
              <input
                key={`${byDateDesc[radioIdx].title}`}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                onChange={() => setIndex(radioIdx)}
                readOnly
              />
            ))}
          </div>
        </div>
      </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
