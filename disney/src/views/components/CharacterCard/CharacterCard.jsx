//CharacterCard
import React from "react";
import {Card, CardBody, CardImg, CardTitle} from "reactstrap";
import style from "./CharacterCard.module.css";
import {NavLink} from "react-router-dom";
import {characterDefaultImage} from "../../../viewmodels/utility.js"


function CharacterCard(props) {
    const {name, imageUrl} = props;

    return (
        <NavLink to={`/Characters/${_id}`}>
            <Card className={style.card}>
                <CardImg onError={(event) => characterDefaultImage(event)} loading="lazy" className={style.imageUrl} top
                         width="100%" src={imageUrl} alt={name}/>
                <CardBody className="text-center">
                    <CardTitle tag="h5" className={`h3 ${style.title}`}>{name}</CardTitle>
                </CardBody>
            </Card>
        </NavLink>
    )
}

export default CharacterCard;