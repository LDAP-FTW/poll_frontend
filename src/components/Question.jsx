import { useRef, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import parse from 'html-react-parser';

const RowRadioButtonsGroup = ({question, cAnswer, answers}) => {
    const [value, setValue] = useState(null);
    const labelRef = useRef();

    const handleChange = (event) => {
        if (event.target.value === cAnswer) {
            labelRef.current.className = "right";
        } else {
            labelRef.current.className = "wrong";
        }
        setValue(event.target.value);
    }

    return (
        <FormControl>
            <FormLabel ref={labelRef} id="demo-row-radio-buttons-group-label">{parse(question)}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                {answers.map((answer, index) =>
                    <FormControlLabel key={index} value={answer} control={<Radio />} label={parse(answer)} />
                )}
            </RadioGroup>
        </FormControl>
    );
}

export default RowRadioButtonsGroup;
