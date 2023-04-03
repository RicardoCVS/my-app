import logo from './logo.svg';
import './App.css';
import MiComponente from './MiComponente';
import ApiData from './ApiData';
import { Container, Typography } from '@mui/material';



function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Usuarios de la API
      </Typography>
      <ApiData />
    </Container>
  );
}


export default App;
