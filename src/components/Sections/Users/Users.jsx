import React, { useEffect, useState } from "react";
import UsersList from "../../UsersList/UsersList";
import { GetUsers } from "../../../helpers/api/api";
import Button from "../../ui/Button/Button";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetUsers(page);
        setUsers(data.users);
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
      <h1>Working with GET request</h1>
      <UsersList arr={users} />
      {!isLastPage && <Button text="Load more" func={handleLoadMore} />}
    </section>
  );
};

export default Users;
