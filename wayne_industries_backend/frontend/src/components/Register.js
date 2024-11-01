// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('funcionario'); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccess(false); 

        try {
            await axios.post('http://localhost:3000/api/auth/register', {
                username,
                password,
                role
            });

            setSuccess(true);
            setTimeout(() => navigate('/'), 2000); 
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Erro ao registrar usuário. Tente novamente.');
            }
        }
    };

    const handleBackToLogin = () => {
        navigate('/'); 
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom align="center">
                Cadastro
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    label="Nome de Usuário"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Senha"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <FormControl variant="outlined" fullWidth margin="normal" required>
                    <InputLabel>Cargo</InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="gerente">Gerente</MenuItem>
                        <MenuItem value="funcionario">Funcionário</MenuItem>
                    </Select>
                </FormControl>
                {error && <Alert severity="error">{error}</Alert>} {/* Exibe a mensagem de erro */}
                {success && <Alert severity="success">Usuário registrado com sucesso! Redirecionando...</Alert>} {/* Mensagem de sucesso */}
                <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px' }}>
                    Cadastrar
                </Button>
                <Button onClick={handleBackToLogin} variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                    Voltar para o Login
                </Button>
            </form>
        </Container>
    );
};

export default Register;
