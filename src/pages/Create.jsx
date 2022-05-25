import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Create = () => {

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");

    const onButtonClick = () => {
        setQuestions([...questions].concat(question));
        setQuestion("");
    }

    const uploadPoll = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"title": title, "questions": questions})
        };
        setTitle("");
        setQuestion("");
        setQuestions([]);
        fetch('/api/poll', options).then(res => alert(res));
    }

    return (
        <Box>
            <Typography sx={{ mb: 1 }} variant="h5">Titel</Typography>
            <TextField value={title} onChange={(event) => setTitle(event.target.value)} sx={{ width: "100%", mb: 2 }} label="Titel" variant='outlined' />
            <Typography sx={{ mb: 1 }} variant="h5">Fragen</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 2, gap: "10px" }}>
                {questions.map((text, id) => <Typography key={id} variant='p'>{text}</Typography>)}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                <TextField sx={{ width: "90%", mb: 2 }} value={question} onChange={(event) => setQuestion(event.target.value)} label="Neue Frage" variant='outlined'/>
                <Button sx={{ height: "100%" }} onClick={onButtonClick} variant="contained">Add</Button>
            </Box>
            <Button onClick={uploadPoll} variant="contained">Umfrage erstellen</Button>
        </Box>
    )
}

export default Create