import React, { useState } from 'react'
import { Box, Card, CardContent, Radio, RadioGroup, Typography } from '@mui/material'

const Question = ({ question, setAnswers }) => {
    const [value, setValue] = useState("");

    const changeRadioAnswer = (event) => {
        setValue(event.target.value);
        setAnswers(question, event.target.value);
    }

    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography variant='h5'>
                    {question.text}
                </Typography>
                <RadioGroup
                    sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={value}
                    onChange={changeRadioAnswer}
                    name="radio-buttons-group"
                    row
                >
                    <Radio value="1" />
                    <Radio value="2" />
                    <Radio value="3" />
                    <Radio value="4" />
                    <Radio value="5" />
                </RadioGroup>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ textAlign: "start", wordSpacing: "100vw" }} variant='p'>{question.answers.min}</Typography>
                    <Typography sx={{ textAlign: "end", wordSpacing: "100vw" }} variant='p'>{question.answers.max}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Question