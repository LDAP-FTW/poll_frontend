import ReactToPdf from 'react-to-pdf';
import Button from '@mui/material/Button';
import { forwardRef } from 'react';

const RenderEvalPDF = forwardRef((props, ref) => {
    return (
        <ReactToPdf targetRef={ref} filename="eval.pdf">
            {({toPdf}) => (
                <Button variant='contained' onClick={toPdf}>Generate pdf</Button>
            )}
        </ReactToPdf>
    );
});

export default RenderEvalPDF;
