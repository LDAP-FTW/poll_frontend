import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Create = () => {

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");

    const deleteQuestion = (questionId) => {
        let questionsCopy = _.cloneDeep(questions);
        questionsCopy.splice(questionId, 1);
        setQuestions(questionsCopy);
    }

    const addQuestion = () => {
        setQuestions([...questions].concat(question));
        setQuestion("");
    }

    const uploadPoll = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "title": title, "questions": questions })
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
            <Box sx={{ display: "flex", flexDirection: "column", mb: 2, gap: "10px", justifyContent: "center" }}>
                {questions.map((text, id) =>
                    <Box key={id} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "15px" }}>
                        <Typography sx={{ overflow: "hidden" }} variant='p'>{text}</Typography>
                        <Button variant='outlined' onClick={() => deleteQuestion(id)}>Delete</Button>
                    </Box>
                )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: "15px" }}>
                <TextField sx={{ width: "90%", mb: 2 }} value={question} onChange={(event) => setQuestion(event.target.value)} label="Neue Frage" variant='outlined' />
                <Button onClick={addQuestion} variant="contained">Add</Button>
            </Box>
            <Button onClick={uploadPoll} variant="contained">Umfrage erstellen</Button>
        </Box>
    )
}

export default Create