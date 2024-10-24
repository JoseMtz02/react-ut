import { useState } from "react";
import { Container, Typography, Snackbar, CircularProgress, Grid, Alert, Button } from '@mui/material';
import { useEstudiantes } from "../../hooks/useEstudiantes";
import EstudiantesTable from "./EstudiantesTable";
import Pagination from "./Pagination";
import AddEstudiantes from "./AddEstudiantes";

const Estudiantes: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [currentEstudiante, setCurrentEstudiante] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const itemsPerPage = 5;

    const { estudiantes, loading, error, fetchEstudiantes, handleEliminarEstudiante } = useEstudiantes();

    const handleOpenDialog = (estudiante: any = null) => {
        setCurrentEstudiante(estudiante);
        setOpenDialog(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleEliminar = (id: number) => {
        handleEliminarEstudiante(id)
            .then(() => {
                setSnackbarMessage('Estudiante eliminado con éxito.');
                setSnackbarSeverity('success');
            })
            .catch(err => {
                setSnackbarMessage('Error al eliminar el estudiante.');
                setSnackbarSeverity('error');
            })
            .finally(() => {
                setSnackbarOpen(true);
                fetchEstudiantes(); // Refresca la lista después de eliminar
            });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, display: 'flex' }}>
            <Grid item xs={9} sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>Estudiantes</Typography>

                <Grid container spacing={3}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenDialog()}
                            style={{ marginBottom: 20 }}
                        >
                            Agregar Estudiante
                        </Button>
                    </Grid>
                </Grid>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <div>
                        <EstudiantesTable
                            estudiantes={Array.isArray(estudiantes) ? estudiantes : []}
                            onEditar={handleOpenDialog}
                            onEliminar={handleEliminar}  // Modificado para usar la nueva función
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalItems={Array.isArray(estudiantes) ? estudiantes.length : 0}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                <AddEstudiantes
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    currentEstudiante={currentEstudiante}
                    onSubmit={fetchEstudiantes}
                />

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
            </Grid>
        </Container>
    );
};

export default Estudiantes;
