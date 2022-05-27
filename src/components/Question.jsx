import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'

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
                    {question}
                </Typography>
                <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                    <Typography variant='p'>Sehr Zufrieden</Typography>
                    <FormControl>
                        <RadioGroup
                            style={{ "display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center", "gap": "3vw" }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={value}
                            onChange={changeRadioAnswer}
                            name="radio-buttons-group"
                            row
                        >
                            <FormControlLabel value="1" control={<Radio />} label="" />
                            <FormControlLabel value="2" control={<Radio />} label="" />
                            <FormControlLabel value="3" control={<Radio />} label="" />
                            <FormControlLabel value="4" control={<Radio />} label="" />
                            <FormControlLabel value="5" control={<Radio />} label="" />
                        </RadioGroup>
                    </FormControl>
                    <Typography variant='p'>Sehr Unzufrieden</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default Question