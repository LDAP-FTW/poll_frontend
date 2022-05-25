import { Button, Card, CardContent, Container, FormControl, FormControlLabel, FormLabel, List, ListItem, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Poll = () => {
    const [poll, setPoll] = useState();
    const { pollID } = useParams();

    useEffect(() => {
        fetch(`/api/poll/${pollID}`).then(res => res.json()).then(data => setPoll(data));
    }, [pollID])

    return (
        <Container>
            <Typography sx={{ mb: 2 }} variant='h5'>{poll && poll.title}</Typography>
            {poll && poll.questions.map((question, id) =>
                <Card sx={{ my: 2 }} key={id}>
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
                                    defaultValue="female"
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
            )}
            <div style={{ "width": "100%", "display": "flex", "justifyContent": "center" }}>
                <Button sx={{ mt: 2 }} variant="contained">Submit</Button>
            </div>
        </Container>
    )
}

export default Poll;