import { useEffect, useState } from "react";
import { EstudianteInterface } from "../interfaces/EstudianteInterface";
import axios from 'axios';

export const useEstudiantes = () => {
    const [estudiantes, setEstudiantes] = useState<EstudianteInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEstudiantes = async () => {
        setLoading(true);
        setError(null);  // Resetear el error al iniciar la petición
        try {
            const response = await axios.get('https://localhost:7183/api/estudiantes/getestudiantes');
            console.log(response.data); // Verifica aquí la estructura de datos
            setEstudiantes(response.data.result);  // Cambiado a 'result'
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar los estudiantes');
        } finally {
            setLoading(false);
        }
    };

    const handleEliminarEstudiante = async (estudianteId: number) => {
        setError(null);  
        try {
            await axios.delete(`https://localhost:7183/api/estudiantes/delete/${estudianteId}`);
            setEstudiantes(prev => prev.filter(estudiante => estudiante.id !== estudianteId));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al eliminar el estudiante');
        }
    };

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    return { estudiantes, loading, error, fetchEstudiantes, handleEliminarEstudiante };
};
