import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Create = () => {

    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");

    const deleteQuestion = (questionId) => {
        let questionsCopy = _.cloneDeep(questions);
        questionsCopy.splice(questionId, 1);
        setQuestions(questionsCopy);
    }

    const addQuestion = () => {
        setQuestions([...questions].concat(question));
        setQuestion("");
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newOrderedQuestions = reorder(
            questions,
            result.source.index,
            result.destination.index
        );

        setQuestions(newOrderedQuestions);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const uploadPoll = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "title": title, "questions": questions })
        };
        setTitle("");
        setQuestion("");
        setQuestions([]);
        fetch('/api/poll', options).then(res => alert(res));
    }

    return (
        <Box>
            <Typography sx={{ mb: 1 }} variant="h5">Titel</Typography>
            <TextField value={title} onChange={(event) => setTitle(event.target.value)} sx={{ width: "100%", mb: 2 }} label="Titel" variant='outlined' />
            <Typography sx={{ mb: 1 }} variant="h5">Fragen</Typography>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='list'>
                    {(provided) =>
                        <Box 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        sx={{ display: "flex", flexDirection: "column", gap: "15px", my: 2 }}>
                            {questions.map((text, id) =>
                                <Draggable key={id} draggableId={`${id}`} index={id}>
                                    {(provided) =>
                                        <Box
                                            sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "15px", alignItems: "center", background: "black" }}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Typography sx={{ overflow: "hidden" }} variant='p'>{text}</Typography>
                                            <Button variant='outlined' onClick={() => deleteQuestion(id)}>Delete</Button>
                                        </Box>
                                    }
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </Box>
                    }
                </Droppable>
            </DragDropContext>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: "15px" }}>
                <TextField sx={{ width: "90%", mb: 2 }} value={question} onChange={(event) => setQuestion(event.target.value)} label="Neue Frage" variant='outlined' />
                <Button onClick={addQuestion} variant="contained">Add</Button>
            </Box>
            <Button onClick={uploadPoll} variant="contained">Umfrage erstellen</Button>
        </Box>
    )
}

export default Create