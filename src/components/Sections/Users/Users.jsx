import React, { useEffect, useState } from "react";
import UsersList from "../../UsersList/UsersList";

import Button from "../../ui/Button/Button";

import { useGetUsersQuery } from "../../../helpers/redux/api";

const Users = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  const { isLoading, data, error, refresh } = useGetUsersQuery(page);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    !isLoading && (refresh, setUsers((prev) => [...prev, ...data.users]));
  }, [page]);
  return (
    <section>
      <div className="wrapper">
        <h1>Working with GET request</h1>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <>
            <UsersList arr={users} />
            {data?.links?.next_url && (
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
