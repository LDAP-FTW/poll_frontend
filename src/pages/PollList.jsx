import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PollList = () => {
    const [polls, setPolls] = useState(null);
    const navigate = useNavigate();

    const choosePoll = (key) => {
        let pollID = key;

        navigate(`/poll/${pollID}`);
    }

    useEffect(() => {
        fetch("/api/poll").then(res => res.json()).then(polls => setPolls(polls))
        //fetch("https://opentdb.com/api.php?amount=10").then(res => res.json()).then(poll => setPoll(poll.results))
    }, [])

    return (
        <Grid>
            {polls && Object.entries(polls).map(([id, poll]) =>
                <Card className="pollCard" sx={{ my: 2 }} onClick={() => choosePoll(id)} key={id}>
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