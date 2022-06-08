import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const register = () => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, email })
        }
        fetch('/api/u/register', options).then(res => {
            if (res.status == 200) {
                alert("Nutzer erfolgreich erstellt")
                navigate('/login');
            } else {
                alert("Ein Fehler ist aufgetreten")
            }
        })
    }

    return (
        <Container sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Registrieren</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "25px", maxWidth: "500px", mb: 2 }}>
                <TextField placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></TextField>
                <TextField onKeyDown={(e) => { if (e.key == 13) { register(e) } }} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password"></TextField>
                <TextField onKeyDown={(e) => { if (e.key == 13) { register(e) } }} placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)}></TextField>
                <Button variant="outlined" onClick={register}>Okay</Button>
            </Box>
            <Typography variant="p">Bereits registriert? <Button onClick={() => navigate('/login')} variant="text">Login</Button></Typography>
        </Container>
    )
}

export default Register