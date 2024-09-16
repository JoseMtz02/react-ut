import React, { useState } from 'react';
import { TextField, Checkbox, Button, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const estadoInicial = {
    nombre: '', 
    edad: '', 
    esEstudiante: false,
    direccion: '',
    hobbies: '' 
};

const Formulario = () => {
    const [formulario, setFormulario] = useState(estadoInicial);
    const [personas, setPersonas] = useState<any[]>([]);

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value });
    };

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPersonas([...personas, formulario]);
        setFormulario(estadoInicial);
    };

    const manejarLimpiar = () => {
        setFormulario(estadoInicial);
    };

    return (
        <Box display="flex" justifyContent="center" p={3} sx={{ minHeight: '60vh' }}>
            <Box display="flex" flexDirection="row" gap={2} width="100%" maxWidth="850px">
                <Paper elevation={3} sx={{ p: 2, width: '580px', borderRadius: '8px', maxHeight: '850px', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" align="center" gutterBottom>Formulario</Typography>
                    <Box flex={1} mt={6}>
                        <form onSubmit={manejarEnvio}>
                            <TextField label="Nombre" name="nombre" value={formulario.nombre} onChange={manejarCambio} fullWidth margin="dense" />
                            <TextField label="Edad" name="edad" type="number" value={formulario.edad} onChange={manejarCambio} fullWidth margin="dense" />
                            <TextField label="Dirección" name="direccion" value={formulario.direccion} onChange={manejarCambio} fullWidth margin="dense" />
                            <TextField label="Hobbies" name="hobbies" value={formulario.hobbies} onChange={manejarCambio} fullWidth margin="dense" />
                            <Box display="flex" alignItems="center" mb={1}>
                                <Checkbox name="esEstudiante" checked={formulario.esEstudiante} onChange={manejarCambio} sx={{ color: '#DAE362', '&.Mui-checked': { color: '#DAE362' }}} />
                                <Typography ml={1}>Estudiante</Typography>
                            </Box>
                            <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#DAE362', color: '#000', '&:hover': { backgroundColor: '#C4D40E' }, mb: 1 }}>Agregar</Button>
                            <Button variant="outlined" color="error" fullWidth onClick={manejarLimpiar} sx={{ borderColor: '#C62828', color: '#C62828', '&:hover': { borderColor: '#C62828', backgroundColor: '#FFCDD2' }}}>Limpiar</Button>
                        </form>
                    </Box>
                </Paper>

                <Box display="flex" ml={4} flexDirection="column" width="100%" maxWidth="300px" sx={{ mt: 2, overflowY: 'auto', maxHeight: '600px' }}>
                    <Typography variant="h6" gutterBottom>Personas</Typography>
                    <List>
                        {personas.map((persona, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`Nombre: ${persona.nombre}`} secondary={`Edad: ${persona.edad} años, Dirección: ${persona.direccion}, Hobbies: ${persona.hobbies}, Estudiante: ${persona.esEstudiante ? 'Sí' : 'No'}`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Formulario;
