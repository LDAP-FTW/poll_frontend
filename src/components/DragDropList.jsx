import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

const DragDropList = ({ list, setList }) => {

    const deleteQuestion = (questionId) => {
        let questionsCopy = _.cloneDeep(list);
        questionsCopy.splice(questionId, 1);
        setList(questionsCopy);
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newOrderedQuestions = reorder(
            list,
            result.source.index,
            result.destination.index
        );

        setList(newOrderedQuestions);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='list'>
                {(provided) =>
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{ display: "flex", flexDirection: "column", my: 2 }}>
                        {list.map((text, id) =>
                            <Draggable key={id} draggableId={`${id}`} index={id}>
                                {(provided) =>
                                    <Box
                                        sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "15px", alignItems: "center", background: "black", mb: 2 }}
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
    )
}

export default DragDropList