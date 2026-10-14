import { HospitalEntry } from '../../types';
import { Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div>
            <Box sx={{ p: 2, border: '1px solid black', borderRadius: '5px', margin: '10px' }}>
                <p>{entry.date} <LocalHospitalIcon /></p>
                <i>{entry.description}</i>
                <p>diagnose by {entry.specialist}</p>
                <p>{entry.discharge.criteria}</p>
            </Box>
        </div>
    );
};

export default Hospital;
