import ReactToPdf from 'react-to-pdf';
import Button from '@mui/material/Button';
import { forwardRef } from 'react';

const RenderEvalPDF = forwardRef((props, ref) => {

    const options = {
        orientation: 'l',
        unit: 'pt',
        format: 'a4'
    }

    return (
        <ReactToPdf targetRef={ref} filename="eval.pdf" options={options}>
            {({toPdf}) => (
                <Button variant='contained' onClick={toPdf}>Generate pdf</Button>
            )}
        </ReactToPdf>
    );
});

export default RenderEvalPDF;
