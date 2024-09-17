import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Checkbox, Button, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

type FormValues = {
  nombre: string;
  edad: number;
  direccion: string;
  hobbies: string;
  esEstudiante: boolean;
};

const Formulario = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [personas, setPersonas] = React.useState<FormValues[]>([]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setPersonas([...personas, data]);
    reset(); 
  };

  return (
    <Box display="flex" justifyContent="center" p={3} sx={{ minHeight: '60vh' }}>
      <Box display="flex" flexDirection="row" gap={2} width="100%" maxWidth="850px">
        <Paper elevation={3} sx={{ p: 2, width: '580px', borderRadius: '8px', maxHeight: '850px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" align="center" gutterBottom>Formulario</Typography>
          <Box flex={1} mt={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField label="Nombre" {...register("nombre")}  fullWidth  margin="dense"  />
              <TextField label="Edad"  type="number"  {...register("edad")}  fullWidth  margin="dense" />
              <TextField label="Dirección" {...register("direccion")}  fullWidth margin="dense" />
              <TextField label="Hobbies" {...register("hobbies")} fullWidth  margin="dense"/>
              <Box display="flex" alignItems="center" mb={1}>
                <Checkbox {...register("esEstudiante")} />
                <Typography ml={1}>Estudiante</Typography>
              </Box>
              <Button   type="submit"  variant="contained"  fullWidth 
                sx={{ backgroundColor: '#FFEB3B', color: '#000', '&:hover': { backgroundColor: '#FBC02D' }, mb:2, textTransform: 'none' }}
              >
                Agregar
              </Button>
              <Button  variant="outlined"  color="error" fullWidth onClick={() => reset()} 
                sx={{ borderColor: '#C62828', color: '#C62828', '&:hover': { borderColor: '#C62828', backgroundColor: '#FFCDD2' }, textTransform: 'none' }}
              >
                Limpiar formulario
              </Button>
            </form>
          </Box>
        </Paper>

        <Box display="flex" ml={2} flexDirection="column" width="100%" maxWidth="450px" sx={{ mt: 2, overflowY: 'auto', maxHeight: '600px' }}>
          <Typography variant="h6" gutterBottom>Personas</Typography>
          <List>
            {personas.map((persona, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={`Nombre: ${persona.nombre}`} 
                  secondary={`Edad: ${persona.edad} años, Dirección: ${persona.direccion}, Hobbies: ${persona.hobbies}, Estudiante: ${persona.esEstudiante ? 'Sí' : 'No'}`} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Formulario;
