import { Button, Card, CardContent, Container, FormControl, FormControlLabel, FormLabel, List, ListItem, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuthUser } from 'react-auth-kit';
import { useNavigate, useParams } from 'react-router-dom'
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
            <Typography sx={{ mb: 2 }} variant='h5'>{poll && poll.title}</Typography>
            {poll && poll.questions.map((question, id) =>
                <Question question={question} setAnswers={updateAnswers} key={id} />
            )}
            <div style={{ "width": "100%", "display": "flex", "justifyContent": "center" }}>
                <Button sx={{ mt: 2 }} onClick={uploadAnswer} variant="contained">Submit</Button>
            </div>
        </Container>
    )
}

export default Poll;