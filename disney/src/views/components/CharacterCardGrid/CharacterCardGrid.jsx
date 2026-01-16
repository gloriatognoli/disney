import React from "react";
import CharacterCard from "../CharacterCard/CharacterCard.jsx";

function CharacterCardGrid(props) {
    const {apiData, col} = props;

    const characterCardsCol = apiData.map((apiData) => {
        return (
            <div key={apiData._id} className="col">
                <CharacterCard
                    name={apiData.name}
                    image={apiData.imageUrl}
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