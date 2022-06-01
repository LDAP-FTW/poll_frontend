import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'

const Evaluation = () => {

    const [evalData, setEvalData] = useState([]);
    const [poll, setPoll] = useState({});
    const { pollID } = useParams();

    useEffect(() => {
        fetch(`/api/eval/${pollID}`).then(res => res.json()).then(evalDataResponse => {setEvalData(evalDataResponse.response); setPoll(evalDataResponse.poll)})
    }, [pollID])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Typography variant="h5">{poll.title}</Typography>
            {evalData.map((qEval, index) =>
                <Box key={index}>
                    {qEval.question.text}
                    <Box>
                        {qEval.question.answers.min}
                        {' -> '}
                        {qEval.question.answers.max}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant='p'>1: {'#'.repeat(Math.round(qEval.answers["1"] / qEval.answerCount * 10))}</Typography>
                        <Typography variant='p'>2: {'#'.repeat(Math.round(qEval.answers["2"] / qEval.answerCount * 10))}</Typography>
                        <Typography variant='p'>3: {'#'.repeat(Math.round(qEval.answers["3"] / qEval.answerCount * 10))}</Typography>
                        <Typography variant='p'>4: {'#'.repeat(Math.round(qEval.answers["4"] / qEval.answerCount * 10))}</Typography>
                        <Typography variant='p'>5: {'#'.repeat(Math.round(qEval.answers["5"] / qEval.answerCount * 10))}</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Evaluation