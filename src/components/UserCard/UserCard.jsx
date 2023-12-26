import React from "react";
import Image from "../ui/Image/Image";

const UserCard = ({ photo, name, position, mail, phone }) => {
  return (
    <li>
      <Image src={photo} alt={`${name}` + "`s&#160photo"} />
      <div>
        <p>{name}</p>
      </div>
      <div>
        <p>{position}</p>
        <p>{mail}</p>
        <p>{phone}</p>
      </div>
    </li>
  );
};

export default UserCard;
