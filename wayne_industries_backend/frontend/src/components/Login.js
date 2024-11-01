import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper, Alert } from '@mui/material';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password,
            });
            console.log(response.data);
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message); 
            } else {
                setError('Erro ao fazer login. Tente novamente.'); 
            }
            console.error('Erro ao fazer login:', error);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h4" align="center">Login</Typography>
                <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        required
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        style={{ marginBottom: '10px' }}
                    />
                    {error && <Alert severity="error">{error}</Alert>} {/* Mensagem de erro */}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Entrar
                    </Button>
                </form>
                <Button onClick={handleRegisterRedirect} variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                    Ir para Cadastro
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;
