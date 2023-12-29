import React, { useEffect, useState } from "react";
import UsersList from "../../UsersList/UsersList";

import Button from "../../ui/Button/Button";

import { useGetUsersQuery } from "../../../helpers/redux/api";
import { getUsers } from "../../../helpers/redux/usersSlice";
// import { useSelector } from "react-redux";
// import { selectUsers } from "../../../helpers/redux/usersSelectors";

const Users = ({ usersList, hasNextPage, handleLoadMore }) => {
  return (
    <section>
      <div className="wrapper">
        <h1>Working with GET request</h1>

        <UsersList arr={usersList} />
        {hasNextPage && <Button text="Load more" func={handleLoadMore} />}
      </div>
    </section>
  );
};

export default Users;
