import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Typography } from '@mui/material'

const PollList = () => {
    const [polls, setPolls] = useState(null);
    const navigate = useNavigate();

    const choosePoll = (key) => {
        let pollID = key;

        navigate(`/poll/${pollID}`);
    }

    useEffect(() => {
        fetch("/api/poll").then(res => res.json()).then(polls => setPolls(polls))
    }, [])

    return (
        <Grid>
            <Typography variant='h4'>Umfragen</Typography>
            {polls && Object.entries(polls).map(([id, poll]) =>
                <Card sx={{ my: 2, cursor: "pointer" }} onClick={() => choosePoll(id)} key={id}>
                    <CardContent>
                        <Typography variant="h5">
                            {poll.title}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Grid>
    )
}

export default PollList