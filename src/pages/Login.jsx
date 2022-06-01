import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input } from "@mui/material";
import { useSignIn } from "react-auth-kit";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            }
        })
    }

    return (
        <Container>
            <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></Input>
            <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password"></Input>
            <Button variant="outlined" onClick={login}>Okay</Button>
        </Container>
    )
}

export default Login;