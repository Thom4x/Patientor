import { TextField, MenuItem, Box } from '@mui/material';
import { HealthCheckRating } from '../../../types';

// HealthCheck
interface HealthCheckFieldsProps {
    healthCheckRating: HealthCheckRating;
    onChange: (rating: HealthCheckRating) => void; // este onChange ahora recibe un HealthCheckRating en lugar de un evento, como lo usarias?: se
}

export const HealthCheckFields = ({ healthCheckRating, onChange }: HealthCheckFieldsProps) => (
    <TextField
        select
        label="Level Risk"
        fullWidth
        value={healthCheckRating}
        onChange={(e) => onChange(Number(e.target.value) as HealthCheckRating)}
    >
        <MenuItem value={0}>None (0)</MenuItem>
        <MenuItem value={1}>Low (1)</MenuItem>
        <MenuItem value={2}>Moderate (2)</MenuItem>
        <MenuItem value={3}>High (3)</MenuItem>
    </TextField>
);

// Healthcare
interface OccupationalFieldsProps {
    employerName: string;
    sickLeaveStart: string;
    sickLeaveEnd: string;
    onChange: (field: string, value: string) => void;
}

export const OccupationalFields = ({ employerName, sickLeaveStart, sickLeaveEnd, onChange }: OccupationalFieldsProps) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={(e) => onChange('employerName', e.target.value)}
        />
        <TextField
            type="date"
            label="Sick Leave Start Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={sickLeaveStart}
            onChange={(e) => onChange('sickLeaveStart', e.target.value)}
        />
        <TextField
            type="date"
            label="Sick Leave End Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={sickLeaveEnd}
            onChange={(e) => onChange('sickLeaveEnd', e.target.value)}
        />
    </Box>
);

// Hospital
interface HospitalFieldsProps {
    dischargeDate: string;
    dischargeCriteria: string;
    onChange: (field: string, value: string) => void;
}

export const HospitalFields = ({ dischargeDate, dischargeCriteria, onChange }: HospitalFieldsProps) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            type="date"
            label="Discharge Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={dischargeDate}
            onChange={(e) => onChange('dischargeDate', e.target.value)}
        />
        <TextField
            label="Discharge Criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={(e) => onChange('dischargeCriteria', e.target.value)}
        />
    </Box>
);