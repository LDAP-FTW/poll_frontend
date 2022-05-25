import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RowRadioButtonsGroup = ({question}) => {
    const [value, setValue] = useState(null);

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
