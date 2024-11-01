import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
    const [accessLogs, setAccessLogs] = useState([]);
    const [resourceStatus, setResourceStatus] = useState([]);
    const [securityAlerts, setSecurityAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    // Estado para gerenciar novos recursos
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [selectedResourceId, setSelectedResourceId] = useState(null); 

    // Estado para gerenciar novos alertas de segurança
    const [alertDescription, setAlertDescription] = useState('');
    const [alertSeverity, setAlertSeverity] = useState(''); 
    const [selectedAlertId, setSelectedAlertId] = useState(null); 

    // Estado para gerenciar logs de acesso
    const [logMessage, setLogMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [selectedLogId, setSelectedLogId] = useState(null); 

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const logsResponse = await axios.get('http://localhost:3000/api/dashboard/access-logs');
                const statusResponse = await axios.get('http://localhost:3000/api/dashboard/resource-status');
                const alertsResponse = await axios.get('http://localhost:3000/api/dashboard/security-alerts');

                setAccessLogs(logsResponse.data);
                setResourceStatus(statusResponse.data);
                setSecurityAlerts(alertsResponse.data);
            } catch (error) {
                setError('Erro ao buscar dados do dashboard');
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    const handleAddResource = async () => {
        const resourceData = { name, type, status };

        try {
            const response = await axios.post('http://localhost:3000/api/resources', resourceData);
            setResourceStatus(prevStatus => [...prevStatus, response.data]);
            resetResourceForm();
        } catch (error) {
            console.error('Error adding resource:', error);
        }
    };

    const handleAddAlert = async () => {
        const alertData = { 
            description: alertDescription, 
            severity: alertSeverity 
        };

        try {
            const response = await axios.post('http://localhost:3000/api/security-alerts', alertData);
            setSecurityAlerts(prevAlerts => [...prevAlerts, response.data]);
            resetAlertForm();
        } catch (error) {
            console.error('Error adding alert:', error);
        }
    };

    const handleAddLog = async () => {
        const logData = { message: logMessage, userId };

        try {
            const response = await axios.post('http://localhost:3000/api/access-logs', logData);
            setAccessLogs(prevLogs => [...prevLogs, response.data]);
            resetLogForm();
        } catch (error) {
            console.error('Error adding access log:', error);
        }
    };

    const handleRemoveResource = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/resources/${id}`);
            setResourceStatus(prevStatus => prevStatus.filter(resource => resource._id !== id));
        } catch (error) {
            console.error('Error removing resource:', error);
        }
    };

    const handleRemoveAlert = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/security-alerts/${id}`);
            setSecurityAlerts(prevAlerts => prevAlerts.filter(alert => alert._id !== id));
        } catch (error) {
            console.error('Error removing alert:', error);
        }
    };

    const handleRemoveLog = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/access-logs/${id}`);
            setAccessLogs(prevLogs => prevLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error('Error removing access log:', error);
        }
    };

    const resetResourceForm = () => {
        setName('');
        setType('');
        setStatus('');
        setSelectedResourceId(null);
    };

    const resetAlertForm = () => {
        setAlertDescription('');
        setAlertSeverity('');
        setSelectedAlertId(null);
    };

    const resetLogForm = () => {
        setLogMessage('');
        setUserId('');
        setSelectedLogId(null); 
    };

    const handleSelectResource = (resource) => {
        setName(resource.name);
        setType(resource.type);
        setStatus(resource.status);
        setSelectedResourceId(resource._id);
    };

    const handleSelectAlert = (alert) => {
        setAlertDescription(alert.description);
        setAlertSeverity(alert.severity);
        setSelectedAlertId(alert._id);
    };

    const handleSelectLog = (log) => {
        setLogMessage(log.message);
        setUserId(log.userId);
        setSelectedLogId(log._id); 
    };

    const handleUpdateAlert = async () => {
        const alertData = { description: alertDescription, severity: alertSeverity };
        try {
            const response = await axios.put(`http://localhost:3000/api/security-alerts/${selectedAlertId}`, alertData);
            setSecurityAlerts(prevAlerts => prevAlerts.map(alert => (alert._id === selectedAlertId ? response.data : alert)));
            resetAlertForm();
        } catch (error) {
            console.error('Error updating alert:', error);
        }
    };

    const handleUpdateResource = async () => {
        const resourceData = { name, type, status };
        try {
            const response = await axios.put(`http://localhost:3000/api/resources/${selectedResourceId}`, resourceData);
            setResourceStatus(prevStatus => prevStatus.map(resource => (resource._id === selectedResourceId ? response.data : resource)));
            resetResourceForm();
        } catch (error) {
            console.error('Error updating resource:', error);
        }
    };

    const handleUpdateLog = async () => {
        const logData = { message: logMessage, userId };
        try {
            const response = await axios.put(`http://localhost:3000/api/access-logs/${selectedLogId}`, logData);
            setAccessLogs(prevLogs => prevLogs.map(log => (log._id === selectedLogId ? response.data : log)));
            resetLogForm();
        } catch (error) {
            console.error('Error updating access log:', error);
        }
    };

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Container>
            <Button variant="outlined" color="secondary" onClick={handleLogout} style={{ marginBottom: '20px' }}>
                Sair
            </Button>

            <Card>
                <CardContent>
                    <Typography variant="h5">Logs de Acesso</Typography>
                    {accessLogs.length > 0 ? (
                        accessLogs.map(log => (
                            <div key={log._id}>
                                <Typography>{log.message}</Typography>
                                <Button variant="outlined" color="error" onClick={() => handleRemoveLog(log._id)}>Remover</Button>
                                <Button variant="outlined" onClick={() => handleSelectLog(log)}>Editar</Button>
                            </div>
                        ))
                    ) : (
                        <Typography>No access logs available.</Typography>
                    )}
                </CardContent>
            </Card>

            {/* Formulário de gerenciamento de logs de acesso */}
            <Typography variant="h5" style={{ marginTop: '20px' }}>Gerenciamento de Logs de Acesso</Typography>
            <TextField
                label="Mensagem do Log"
                value={logMessage}
                onChange={(e) => setLogMessage(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="ID do Usuário"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            {selectedLogId ? (
                <Button variant="contained" color="primary" onClick={handleUpdateLog}>
                    Atualizar Log
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={handleAddLog}>
                    Adicionar Log
                </Button>
            )}

            <Card style={{ marginTop: '20px' }}>
                <CardContent>
                    <Typography variant="h5">Status dos Recursos</Typography>
                    {resourceStatus.length > 0 ? (
                        resourceStatus.map(resource => (
                            <div key={resource._id}>
                                <Typography>
                                    {resource.name}: {resource.status || 'N/A'}
                                    <Button variant="outlined" onClick={() => handleSelectResource(resource)}>Editar</Button>
                                    <Button variant="outlined" color="error" onClick={() => handleRemoveResource(resource._id)}>Remover</Button>
                                </Typography>
                            </div>
                        ))
                    ) : (
                        <Typography>No resource status available.</Typography>
                    )}
                </CardContent>
            </Card>

             {/* Formulário de gerenciamento de recursos */}
             <Typography variant="h5" style={{ marginTop: '20px' }}>Gerenciamento de Recursos</Typography>
            <TextField
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Tipo"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            {selectedResourceId ? (
                <Button variant="contained" color="primary" onClick={handleUpdateResource}>
                    Atualizar
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={handleAddResource}>
                    Adicionar
                </Button>
            )}

            <Card style={{ marginTop: '20px' }}>
                <CardContent>
                    <Typography variant="h5">Alertas de Segurança</Typography>
                    {securityAlerts.length > 0 ? (
                        securityAlerts.map(alert => (
                            <div key={alert._id}>
                                <Typography>{alert.description}</Typography>
                                <Button variant="outlined" color="error" onClick={() => handleRemoveAlert(alert._id)}>Remover</Button>
                                <Button variant="outlined" onClick={() => handleSelectAlert(alert)}>Editar</Button>
                            </div>
                        ))
                    ) : (
                        <Typography>No security alerts available.</Typography>
                    )}
                </CardContent>
            </Card>

            {/* Formulário de gerenciamento de alertas de segurança */}
            <Typography variant="h5" style={{ marginTop: '20px' }}>Gerenciamento de Alertas de Segurança</Typography>
            <TextField
                label="Descrição do Alerta"
                value={alertDescription}
                onChange={(e) => setAlertDescription(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Severidade"
                value={alertSeverity}
                onChange={(e) => setAlertSeverity(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            {selectedAlertId ? (
                <Button variant="contained" color="primary" onClick={handleUpdateAlert}>
                    Atualizar Alerta
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={handleAddAlert}>
                    Adicionar Alerta
                </Button>
            )}
        </Container>
    );
};

export default Dashboard;
