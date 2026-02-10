import React from "react";
import CharacterCard from "../CharacterCard/CharacterCard.jsx";

//Gestione della visualizzazione Grid delle CharacterCard:
function CharacterCardGrid(props) {
    const {characters, col} = props;

    //Applichiamo il metodo map all'array dei personaggi (character) e ad ognuno applichiamo la visualizzazione a Card
    //prendendo come informazioni id, name e image
    const characterCardsCol = characters.map((character) => {
        return (
            <div key={character._id} className="col">
                <CharacterCard
                    id={character._id}
                    name={character.name}
                    image={character.imageUrl}
                />
            </div>
        )
    });

    //Gestione della visualizzazione responsive
    return (
        <div className={`row 
                row-cols-${col.xs}
                row-cols-sm-${col.sm}
                row-cols-md-${col.md}
                row-cols-lg-${col.lg}
                row-cols-xl-${col.xl}
        `}>
            {characterCardsCol}
        </div>
    )
}

export default CharacterCardGrid;