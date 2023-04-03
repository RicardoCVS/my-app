import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button } from '@mui/material';
import { Element } from "react-scroll";

function ApiData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  return (
    <Container>
      {data.map((item) => (
        <Element key={`item-${item.id}`} name={`item-${item.id}`}>
          <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.email}
              </Typography>
            </CardContent>
            <Button variant="contained" color="primary">
              Ver detalles
            </Button>
          </Card>
        </Element>
      ))}
    </Container>
  );
}

export default ApiData;
