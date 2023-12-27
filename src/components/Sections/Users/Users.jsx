import React, { useEffect, useState } from "react";
import UsersList from "../../UsersList/UsersList";
import { getUsers } from "../../../helpers/api/api";
import Button from "../../ui/Button/Button";
import css from "./Users.module.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers(page);
        setUsers((prev) => [...prev, ...data.users]);
        if (!data.links.next_url) {
          setIsLastPage(true);
          return;
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section>
      <div className={css.usersWrapper}>
        <h1>Working with GET request</h1>
        <UsersList arr={users} />
        {!isLastPage && <Button text="Load more" func={handleLoadMore} />}
      </div>
    </section>
  );
};

export default Users;
