import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { EstudianteInterface } from '../../interfaces/EstudianteInterface';

interface AddEstudiantesProps {
    open: boolean;
    onClose: () => void;
    currentEstudiante: EstudianteInterface | null; // Usa tu interfaz aquí
    onSubmit: () => void;
}

const AddEstudiantes: React.FC<AddEstudiantesProps> = ({ open, onClose, currentEstudiante, onSubmit }) => {
    const [nombre, setNombre] = useState<string>('');
    const [edad, setEdad] = useState<number>(0);
    const [correo, setCorreo] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (currentEstudiante) {
            setNombre(currentEstudiante.nombre);
            setEdad(currentEstudiante.edad);
            setCorreo(currentEstudiante.correo);
        } else {
            setNombre('');
            setEdad(0);
            setCorreo('');
        }
    }, [currentEstudiante]);

    const handleSubmit = async () => {
        const estudianteData: EstudianteInterface = { // Usa la interfaz aquí
            nombre,
            edad,
            correo,
        };

        if (currentEstudiante) {
            estudianteData.id = currentEstudiante.id; // Esto ahora es válido
        }

        try {
            let response;
            if (currentEstudiante) {
                console.log('Actualizando estudiante con ID:', currentEstudiante.id);
                response = await axios.put(`https://localhost:7183/api/estudiantes/update/${currentEstudiante.id}`, estudianteData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Respuesta del servidor al actualizar:', response.data);
                setSnackbarMessage('Estudiante actualizado con éxito.');
                setSnackbarSeverity('success');
            } else {
                response = await axios.post('https://localhost:7183/api/estudiantes/create', estudianteData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Respuesta del servidor al crear:', response.data);
                setSnackbarMessage('Estudiante agregado con éxito.');
                setSnackbarSeverity('success');
            }

            if (response) {
                console.log('Respuesta final del servidor:', response.data);
            }

            setNombre('');
            setEdad(0);
            setCorreo('');
            onClose();
            onSubmit();

            setSnackbarOpen(true);
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                console.error('Error de Axios:', err.response?.data);
                setSnackbarMessage('Error al guardar el estudiante.');
                setSnackbarSeverity('error');
            } else {
                console.error('Error desconocido:', err);
                setSnackbarMessage('Error desconocido.');
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{currentEstudiante ? 'Editar Estudiante' : 'Agregar Estudiante'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Edad"
                        value={edad}
                        onChange={(e) => setEdad(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="warning">Cancelar</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {currentEstudiante ? 'Guardar Cambios' : 'Agregar Estudiante'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mostrar mensajes */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddEstudiantes;
