import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MiComponente from "./MiComponente";
import ApiData from "./ApiData";
import { Container, Typography } from "@mui/material";
import IndexMenu from "./IndexMenu";

function App() {
  const [apiDataItems, setApiDataItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setApiDataItems(data);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        className="neon-title"
      >
        Usuarios de la API
      </Typography>
      <ApiData />
      {apiDataItems.length > 0 && <IndexMenu items={apiDataItems} />}
    </Container>
  );
}

export default App;
