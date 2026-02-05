//CharacterList
import React from "react";
import {NavLink} from "react-router-dom";
import { Table } from "reactstrap";
import style from "./CharacterList.module.css";

function CharacterList (props)  {
    const {characters, id} = props;

    const characterListRows = characters.map((character) => {
        return (
            <tr key={character._id} className="row-cols-1">
                <td>{character.name}</td>
                <td>
                    <img src={character.imageUrl}
                         alt={character.name}
                         className={style.image}
                    />
                </td>
                    <td><NavLink to={`/Characters/${id}`} className={style.detailsLink}>Details</NavLink></td>
            </tr>
        )
    });

    return (
    <Table striped hover responsive className={style.table}>
        <thead>
        <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Details</th>
        </tr>
        </thead>
        <tbody>
            {characterListRows}
        </tbody>
    </Table>
    )
    }

    export default CharacterList;

//onError={(e) => {
//                              e.target.src = "Immagine non disponibile";