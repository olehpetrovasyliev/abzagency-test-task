import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/Sections/Header/Header";
import Hero from "./components/Sections/Hero/Hero";
import Users from "./components/Sections/Users/Users";
import AddUserForm from "./components/AddUserForm/AddUserForm";
import AddUserSection from "./components/Sections/AddUser/AddUserSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Hero />
      <Users />
      <AddUserSection />
    </>
  );
}

export default App;
