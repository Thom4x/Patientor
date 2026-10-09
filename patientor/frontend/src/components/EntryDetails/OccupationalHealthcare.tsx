import { Entry } from '../../types';
import { Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
    return (
        <div>
            <Box sx={{ p: 2, border: '1px solid black', borderRadius: '5px', margin: '10px' }}>
                <p>{entry.date} <WorkIcon /></p>
                <i>{entry.description}</i>
                <p>diagnose by {entry.specialist}</p>
            </Box>
        </div>
    );
};

export default OccupationalHealthcare;
