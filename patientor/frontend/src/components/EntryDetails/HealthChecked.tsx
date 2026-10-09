import { Box } from '@mui/material';
import { type HealthCheckEntry } from '../../types';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthChecked = ({ entry }: { entry: HealthCheckEntry }) => {

    const getHealthRatingColor = (rating: number) => {
        switch (rating) {
            case 0: return "green";
            case 1: return "yellow";
            case 2: return "orange";
            case 3: return "red";
            default: return "black";
        }
    };

    return (
        <div>
            <Box sx={{ p: 2, border: '1px solid black', borderRadius: '5px', margin: '10px' }}>
                <p>{entry.date} <MedicalServicesIcon /></p>
                <i>{entry.description}</i>
                <p>
                    <FavoriteIcon sx={{ color: getHealthRatingColor(entry.healthCheckRating) }} />
                </p>
                <p>diagnose by {entry.specialist}</p>
            </Box>
        </div>
    );
};

export default HealthChecked;
