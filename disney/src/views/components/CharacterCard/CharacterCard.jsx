//CharacterCard
import React from "react";
import {Card, CardBody, CardImg, CardTitle} from "reactstrap";
import style from "./CharacterCard.module.css";
import {NavLink} from "react-router-dom";


function CharacterCard(props) {
    const {id, name, image} = props;

    return (
        <NavLink to={`/Characters/${id}`}>
            <Card className={style.card}>
                <CardImg
                    loading="lazy"
                    className={style.imageUrl}
                    width="100%"
                    src={image}
                    alt={name} />
                <CardBody className="text-center">
                    <CardTitle
                        tag="h5"
                        className={`card-title`}>
                        {name}
                    </CardTitle>
                </CardBody>
            </Card>
        </NavLink>
    )
}

export default CharacterCard;