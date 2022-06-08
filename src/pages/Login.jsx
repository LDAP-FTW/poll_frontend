import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useSignIn } from "react-auth-kit";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({});

    const signIn = useSignIn();
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        }

        fetch('/api/u/login', options).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    if (signIn({
                        token: data.token,
                        expiresIn: data.expiresIn,
                        tokenType: 'Bearer',
                        authState: data.authUserState
                    })) {
                        navigate('/');
                    } else {
                        alert('Wrong credentials!')
                    }
                })
            } else {
                alert("Wrong credentials!")
            }
        })
    }

    const register = () => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: formData.username, password: formData.password, email: formData.email })
        }
        fetch('/api/u/register', options).then(res => {
            if (res.status == 200) {
                alert("Nutzer erfolgreich erstellt")
            } else {
                alert("Ein Fehler ist aufgetreten")
            }
        })
    }

    return (
        <Container>
            <Typography variant="h5">Anmelden</Typography>
            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", maxWidth: "500px", gap: "25px" }}>
                <TextField placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></TextField>
                <TextField onKeyDown={(e) => { if (e.key == 13) { login(e) } }} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password"></TextField>
                <Button variant="outlined" onClick={login}>Okay</Button>
                <Typography variant="p">Noch keinen Account? <Button onClick={() => navigate('/register')} variant="text">Registrieren</Button></Typography>
            </Box>
        </Container>
    )
}

export default Login;