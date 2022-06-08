import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import DragDropList from '../components/DragDropList';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { de } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';

const Create = () => {

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [salutation, setSalutation] = useState("");
    const [name, setName] = useState("");
    const [className, setClassName] = useState("");
    const [date, setDate] = useState(null);
    const [question, setQuestion] = useState({
        "text": "",
        "answers": {
            "min": "",
            "max": ""
        }
    });
    const authUser = useAuthUser();
    const navigate = useNavigate();

    const addQuestion = () => {
        if (questions.length <= 20) {
            if (question.text !== "" && question.answers.min !== "" && question.answers.max !== "") {
                setQuestions([...questions].concat(question));
                setQuestion({
                    "text": "",
                    "answers": {
                        "min": "",
                        "max": ""
                    }
                });
            } else {
                alert('Fehlende Eingabe')
            }
        } else {
            alert('Zu viele Fragen')
        }
    }

    const uploadPoll = async () => {
        if (title !== "" && salutation != "" && name != "" && className != "" && date != "" && questions.length > 0) {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": title,
                    "salutation": salutation,
                    "teacher": name,
                    "class": className,
                    "expiration": date,
                    "questions": questions
                })
            };
            fetch('/api/poll', options).then(res => res.text()).then(res => {
                alert(res);
                navigate('/poll');
            });
        } else {
            alert("Fehlende Eingabe")
        }
    }

    return (
        <Box>
            {!authUser().user.admin ?
                <Typography variant="h4">Keine Rechte zum Erstellen einer neuen Umfrage</Typography>
                :
                <Box>
                    <Typography sx={{ mb: 1 }} variant="h4">Neue Umfrage erstellen</Typography>
                    <Typography sx={{ mb: 1 }} variant="h5">Titel</Typography>
                    <TextField value={title} onChange={(event) => setTitle(event.target.value)} sx={{ width: "60%", mb: 2 }} label="Titel" variant='outlined' />
                    <Typography sx={{ mb: 1 }} variant="h5">Details</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px", my: 2, width: "60%" }}>
                        <TextField select value={salutation} onChange={(event) => setSalutation(event.target.value)} label="Anrede">
                            <MenuItem value="Herr" >Herr</MenuItem>
                            <MenuItem value="Frau" >Frau</MenuItem>
                            <MenuItem value="Divers" >Divers</MenuItem>
                        </TextField>
                        <TextField value={name} onChange={() => setName(event.target.value)} label="Name" />
                        <TextField value={className} onChange={() => setClassName(event.target.value)} label="Klasse" />
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
                            <DatePicker
                                mask="__.__.____"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                label="Ablaufdatum"
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Typography sx={{ mb: 1 }} variant="h5">Fragen</Typography>
                    <DragDropList list={questions} setList={setQuestions} />
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: "15px" }}>
                        <TextField sx={{ width: "90%", mb: 2 }} value={question.text} onChange={(event) => setQuestion({ ...question, "text": event.target.value })} label="Neue Frage" variant='outlined' />
                        <Button onClick={addQuestion} variant="contained">Add</Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: "15px", mb: 4 }}>
                        <TextField value={question.answers.min} onChange={(event) => setQuestion({ ...question, "answers": { ...question.answers, "min": event.target.value } })} sx={{ width: "50%" }} label="Minimale Antwort" />
                        <TextField value={question.answers.max} onChange={(event) => setQuestion({ ...question, "answers": { ...question.answers, "max": event.target.value } })} sx={{ width: "50%" }} label="Maximale Antwort" />
                    </Box>
                    <Button sx={{ mb: 4 }} onClick={uploadPoll} variant="contained">Umfrage erstellen</Button>
                </Box>
            }
        </Box>
    )
}

export default Create