import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, CircularProgress, Container, Modal, Typography } from '@mui/material'
import { useAuthUser } from 'react-auth-kit';
import Question from '../components/Question';

const Poll = () => {
    const [poll, setPoll] = useState();
    const [answers, setAnswers] = useState();
    const { pollID } = useParams();
    const auth = useAuthUser();
    const navigate = useNavigate();

    const uploadAnswer = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "poll": pollID,
                "user": auth().user.username,
                "answers": answers
            })
        }

        fetch("/api/answers", options).then(res => res.ok).then(status => {alert(status); navigate(-1)});
    }

    const updateAnswers = (question, value) => {
        setAnswers([...answers].map(answer => {
            if(answer.question == question) {
                return {
                    ...answer,
                    "answer": value
                }
            } else {
                return answer;
            }
        }))
    }

    useEffect(() => {
        fetch(`/api/poll/${pollID}`).then(res => res.json()).then(data => {
            setPoll(data);
            setAnswers(data.questions.map(question => {return {"question": question, "answer": ""}}));
        });
    }, [pollID])

    return (
        <Container>
            {poll && <Typography sx={{ mb: 2 }} variant='h4'>{poll.title}</Typography>}
            {poll && 
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography variant='p'>Lehrer:in<br/>{poll.salutation} {poll.teacher}</Typography>
                    <Typography sx={{ textAlign: "center" }} variant='p'>Klasse<br/>{poll.class}</Typography>
                    <Typography sx={{ textAlign: "end" }} variant='p'>Ablaufdatum<br/>{new Date(poll.expiration).toLocaleDateString()}</Typography>
                </Box>
            }
            {poll && poll.questions.map((question, id) =>
                <Question question={question} setAnswers={updateAnswers} key={id} />
            )}
            {poll &&
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Button sx={{ mt: 2 }} onClick={uploadAnswer} variant="contained">Submit</Button>
                </Box>
            }
            {!poll && <Modal open={true} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Modal>}
        </Container>
    )
}

export default Poll;