import { Box, Card, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useParams } from 'react-router-dom'
import colors from '../colors.json';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const Evaluation = () => {

    const [evalData, setEvalData] = useState([]);
    const [poll, setPoll] = useState({});
    const { pollID } = useParams();

    useEffect(() => {
        fetch(`/api/eval/${pollID}`).then(res => res.json()).then(evalDataResponse => {
            setEvalData(evalDataResponse.response); 
            setPoll(evalDataResponse.poll)
        })
    }, [pollID])

    const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: poll.title,
          },
        },
    };
    const chartData = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: evalData.map((qEval, index) => ({
            label: qEval.question.text,
            data: [1,2,3,4,5].map(id => qEval.answers[`${id}`] / qEval.answerCount * 100),
            backgroundColor: colors[index % colors.length].hex,
        }))
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Typography variant="h5">{poll.title}</Typography>
            
            <Card sx={{ p: 2 }}>
                <Bar options={chartOptions} data={chartData}/>
            </Card>
        </Box>
    )
}

export default Evaluation