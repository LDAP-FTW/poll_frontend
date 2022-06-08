import { Box, Card, Typography } from '@mui/material';
import React, { createRef, useEffect } from 'react'
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
import RenderEvalPDF from '../components/RenderEvalPDF';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const Evaluation = () => {

    const ref = createRef()
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
        maintainAspectRatio: false,
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
            data: [1, 2, 3, 4, 5].map(id => qEval.answers[`${id}`] / qEval.answerCount * 100),
            backgroundColor: `rgba(${hexToRgb(colors[index % colors.length].hex).r}, ${hexToRgb(colors[index % colors.length].hex).g}, ${hexToRgb(colors[index % colors.length].hex).b}, 0.3)`,
            borderColor: colors[index % colors.length].hex,
            borderWidth: 1
        }))
    };
    var chartsData = []
    evalData.map((qEval, index) =>
        chartsData.push(
            {
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    line: {
                        borderColor: "#FFFFFF",
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "#FFFFFF"
                            }
                        },
                        y: {
                            ticks: {
                                color: "#FFFFFF"
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: qEval.question.text,
                            font: {
                                size: 16
                            },
                            color: "#FFFFFF"
                        },
                    },
                },
                data: {
                    labels: [qEval.question.answers.min, '2', '3', '4', qEval.question.answers.max],
                    datasets: [{
                        data: Object.entries(qEval.answers).map(([, answer]) => answer/qEval.answerCount * 100),
                        backgroundColor: _.range(Object.entries(qEval.answers).length).map(id => `rgba(${hexToRgb(colors[id].hex).r}, ${hexToRgb(colors[id].hex).g}, ${hexToRgb(colors[id].hex).b}, 0.2)`),
                        borderColor: _.range(Object.entries(qEval.answers).length).map(id => colors[id].hex),
                        borderWidth: 1
                    }]
                }
            }
        )
    )

    const pdfData = (
        <Card sx={{ m: 0, p: 5, width: '270mm', height: "190mm", position: 'absolute', left: '-1000vw', background: "white" }} ref={ref}>
            <Bar options={chartOptions} data={chartData} />
        </Card>
    );

    return (
        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
            <Typography variant="h5">{poll.title}</Typography>
            <RenderEvalPDF ref={ref} />
            {pdfData}
            {chartsData.map((cD, index) =>
                <Card key={index} sx={{ p: 2, height: "50vh" }}>
                    <Bar options={cD.options} data={cD.data} />
                </Card>
            )}
        </Box>
    )
}

export default Evaluation