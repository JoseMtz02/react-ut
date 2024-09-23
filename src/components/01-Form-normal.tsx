import React, { useState } from 'react';
import { TextField, Checkbox, Button, List, ListItem, ListItemText, Container, Typography } from '@mui/material';

interface Student {
    name: string;
    age: number;
    isStudent: boolean;
    address: string;
    hobbies: string[];
}

function AlumnoForm() {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [isStudent, setIsStudent] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [hobbies, setHobbies] = useState<string[]>([]);
    const [newHobby, setNewHobby] = useState<string>('');
    const [students, setStudents] = useState<Student[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'age':
                setAge(Number(value));
                break;
            case 'isStudent':
                setIsStudent(checked);
                break;
            case 'address':
                setAddress(value);
                break;
            default:
                break;
        }
    };

    const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewHobby(e.target.value);
    };

    const handleAddHobby = () => {
        if (newHobby !== '') {
            setHobbies([...hobbies, newHobby]);
            setNewHobby('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const studentData: Student = {
            name,
            age,
            isStudent,
            address,
            hobbies
        };

        setStudents([...students, studentData]);

        setName('');
        setAge(0);
        setIsStudent(false);
        setAddress('');
        setHobbies([]);
    };

    return (
        <Container>
            <Typography sx={{ mt: 5 }} variant="h4" gutterBottom>
                Agregar Alumno
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="number"
                    label="Edad"
                    name="age"
                    value={age}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    inputProps={{ min: 1 }}
                />
                <div>
                    <Checkbox
                        name="isStudent"
                        checked={isStudent}
                        onChange={handleChange}
                    />
                    <label>¿Es estudiante?</label>
                </div>
                <TextField
                    label="Dirección"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                />
                <TextField
                    label="Hobbies"
                    value={newHobby}
                    onChange={handleHobbyChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddHobby();
                            console.log({newHobby});

                        }
                    }}
                    fullWidth
                    margin="normal"
                    placeholder="Presiona Enter para agregar un hobby"
                />

                <Button type="submit" variant="contained" color="primary">
                    Agregar Alumno
                </Button>
            </form>

            <Typography sx={{ mt: 5, textAlign: 'center' }} variant="h5" gutterBottom>
                Lista de Alumnos
            </Typography>
            <List>
                {students.map((student, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`Nombre: ${student.name}`}
                            secondary={`Edad: ${student.age}, Es estudiante: ${student.isStudent ? 'Sí' : 'No'}, Dirección: ${student.address}, Hobbies: ${student.hobbies.join(', ')}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default AlumnoForm;
