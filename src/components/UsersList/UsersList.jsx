import React from "react";
import UserCard from "../UserCard/UserCard";
import css from "./UsersList.module.scss";

const UsersList = ({ arr }) => {
  return (
    <ul className={css.usersList}>
      {arr.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          photo={user.photo}
          name={user.name}
          position={user.position}
          mail={user.email}
          phone={user.phone}
        />
      ))}
    </ul>
  );
};

export default UsersList;
