import React from "react";
import CharacterCard from "../CharacterCard/CharacterCard.jsx";


function CharacterCardGrid(props) {
    const {characters, col} = props;

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