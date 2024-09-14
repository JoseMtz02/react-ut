import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Checkbox, Button, Box, Typography, Paper } from '@mui/material';

interface Persona {
    nombre: string;
    edad: number;
    esEstudiante: boolean;
    direccion: string;
    hobbies: string;
}

const estadoInicialFormulario: Persona = {
    nombre: '',
    edad: 0,
    esEstudiante: false,
    direccion: '',
    hobbies: ''
};

const Formulario: React.FC = () => {
    const [formulario, setFormulario] = useState<Persona>(estadoInicialFormulario);
    const [personas, setPersonas] = useState<Persona[]>([]);

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormulario({
            ...formulario,
            [name]: type === 'checkbox' ? checked : name === 'edad' ? Number(value) : value
        });
    };

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPersonas([...personas, formulario]);
        setFormulario(estadoInicialFormulario); // Limpia el formulario
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={3}
           
        >
            <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '1200px' }}>
            <Typography 
                variant="h3" 
                gutterBottom 
                sx={{ textAlign: 'center' }}
            >
                Formulario de Persona
            </Typography>
                <form onSubmit={manejarEnvio}>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Edad"
                        name="edad"
                        type="number"
                        value={formulario.edad}
                        onChange={manejarCambio}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Dirección"
                        name="direccion"
                        value={formulario.direccion}
                        onChange={manejarCambio}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Hobbies"
                        name="hobbies"
                        value={formulario.hobbies}
                        onChange={manejarCambio}
                        fullWidth
                        margin="normal"
                    />
                    <Box display="flex" alignItems="center" mb={2}>
                        <Checkbox
                            name="esEstudiante"
                            checked={formulario.esEstudiante}
                            onChange={manejarCambio}
                        />
                        <Typography>Es Estudiante</Typography>
                    </Box>

                    {/* Botón centrado */}
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Agregar Persona
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Box mt={4} width="100%" maxWidth="600px">
                <Typography variant="h6" gutterBottom>
                    Personas Agregadas
                </Typography>
                <List>
                    {personas.map((persona, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`Nombre: ${persona.nombre}`}
                                secondary={`Edad: ${persona.edad}, Dirección: ${persona.direccion}, Hobbies: ${persona.hobbies}, Estudiante: ${persona.esEstudiante ? 'Sí' : 'No'}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Formulario;
