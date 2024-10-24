import { EstudianteInterface } from "../../interfaces/EstudianteInterface";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EstudiantesTableProps {
    estudiantes: EstudianteInterface[];
    onEditar: (estudiante: EstudianteInterface) => void;
    onEliminar: (id: number) => void;
    currentPage: number;
    itemsPerPage: number;
}

const EstudiantesTable: React.FC<EstudiantesTableProps> = ({ estudiantes, onEditar, onEliminar, currentPage, itemsPerPage }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Asegúrate de que `estudiantes` es siempre un array
    const estudiantesToShow = Array.isArray(estudiantes) ? estudiantes.slice(startIndex, endIndex) : [];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Edad</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {estudiantesToShow.length > 0 ? (
                        estudiantesToShow.map((estudiante) => (
                            <TableRow key={estudiante.id}>
                                <TableCell>{estudiante.id}</TableCell>
                                <TableCell>{estudiante.nombre}</TableCell>
                                <TableCell>{estudiante.edad}</TableCell>
                                <TableCell>{estudiante.correo}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onEditar(estudiante)} color="primary" title="Editar">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => {
                                            if (estudiante.id !== undefined) { // Verificación de id
                                                onEliminar(estudiante.id);
                                            } else {
                                                console.error('ID de estudiante es undefined');
                                            }
                                        }} 
                                        color="secondary" 
                                        title="Eliminar"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center">No hay estudiantes disponibles</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EstudiantesTable;
