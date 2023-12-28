import React, { useEffect, useState } from "react";
import UsersList from "../../UsersList/UsersList";
import { getUsers } from "../../../helpers/api/api";
import Button from "../../ui/Button/Button";
import css from "./Users.module.scss";
import { useGetUsersQuery } from "../../../helpers/redux/api";

const Users = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const { isLoading, data, error, isFetching } = useGetUsersQuery(page);

  useEffect(() => {
    !isLoading && setUsers((prev) => [...prev, ...data.users]);
    console.log(data);
  }, [data]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section>
      <div className={css.usersWrapper}>
        <h1>Working with GET request</h1>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <>
            <UsersList arr={users} />
            {data.links.next_url && (
              <Button text="Load more" func={handleLoadMore} />
            )}
          </>
        )}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
};

export default Users;
