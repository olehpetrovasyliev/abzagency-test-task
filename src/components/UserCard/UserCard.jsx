import React from "react";
import Image from "../ui/Image/Image";
import css from "./UserCard.module.scss";

const UserCard = ({ photo, name, position, mail, phone }) => {
  return (
    <li className={css.userCard}>
      <div className={css.userCardWrapper}>
        <Image src={photo} alt={`${name}` + "`sphoto"} />
        <div>
          <p>{name}</p>
        </div>
        <p className={css.info}>
          {position}
          <br />
          {mail}
          <br />
          {phone}
        </p>
      </div>
    </li>
  );
};

export default UserCard;
