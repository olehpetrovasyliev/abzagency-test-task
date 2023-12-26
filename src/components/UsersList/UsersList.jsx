import React, { useState } from "react";
import UserCard from "../UserCard/UserCard";
import Button from "../ui/Button/Button";

const UsersList = ({ arr }) => {
  const [areAllFetched, setAreAllFetched] = useState(false);
  return (
    <ul>
      {arr.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          photo={user.photo}
          name={user.name}
          position={user.postion}
          mail={user.email}
          phone={user.phone}
        />
      ))}
      {!areAllFetched && <Button text="Load more" func={console.log(1)} />}
    </ul>
  );
};

export default UsersList;
