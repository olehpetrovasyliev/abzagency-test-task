import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Sections/Header/Header";
import Hero from "./components/Sections/Hero/Hero";
import Users from "./components/Sections/Users/Users";
// import AddUserForm from "./components/AddUserForm/AddUserForm";
import AddUserSection from "./components/Sections/AddUser/AddUserSection";
import { ToastContainer } from "react-toastify";
import { useGetUsersQuery } from "./helpers/redux/api";

const App = () => {
  const isSuccessfulRef = useRef(false);
  const [page, setPage] = useState(1);
  const { isLoading, data, refetch } = useGetUsersQuery(page);
  const [users, setUsers] = useState([]);
  // const usersArr = useSelector(selectUsers());

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    data && setUsers((prev) => [...prev, ...data?.users]);
  }, [data]);

  return (
    <>
      <Header />
      <Hero />
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <Users
          usersList={isSuccessfulRef.current ? data?.users : users}
          handleLoadMore={() => handleLoadMore()}
          hasNextPage={data.links.next_url}
        />
      )}
      <AddUserSection isSuccessfulRef={isSuccessfulRef} />
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default App;

//  const [page, setPage] = useState(1);
//   const { isLoading, data, error } = useGetUsersQuery(page);
//   const [users, setUsers] = useState([]);
//   const isSuccessfulRef = useRef(false);

//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   useEffect(() => {
//     if (data) {
//       setUsers((prev) => [...prev, ...data?.users]);
//       // Set isSuccessfulRef to true when data is available
//       isSuccessfulRef.current = true;
//     }
//   }, [data]);

//   return (
//     <>
//       <div className="wrapper">
//         <h1>Working with GET request</h1>
//         {isLoading ? (
//           <div>loading</div>
//         ) : (
//           <>
//             <UsersList arr={users} />
//             {data?.links?.next_url && (
//               <Button text="Load more" func={handleLoadMore} />
//             )}
//           </>
//         )}
//         {error && <p>{error.message}</p>}
//       </div>

//       {/* Render AddUserSection based on the value of isSuccessfulRef */}
//       {isSuccessfulRef.current && <AddUserSection />}
//       <ToastContainer autoClose={1000} />
//     </>
//   );
// }
