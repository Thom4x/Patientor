import React, { useState } from "react";
import { Alert, Box, TextField, Button, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Entry, EntryWithoutId, HealthCheckRating } from "../../../types";

const initialValues = {
    type: 'HealthCheck' as Entry['type'],
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [] as string[],
    healthCheckRating: 0,
    employerName: '',
    sickLeaveStart: '',
    sickLeaveEnd: '',
    dischargeDate: '',
    dischargeCriteria: '',
};



interface Props {
    onSubmit: (values: EntryWithoutId) => void;
    onCancel: () => void;
    error?: string;
    type?: string;
}

const AddEntryForm = ({ onSubmit, onCancel, error, type }: Props) => {
    const [values, setValues] = useState(initialValues);

    const sendSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const base = {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes.map((c) => c.trim()).filter(Boolean),
        };

        let newEntry: EntryWithoutId;
        if (values.type === 'HealthCheck') {
            newEntry = { ...base, type: 'HealthCheck', healthCheckRating: values.healthCheckRating as HealthCheckRating };
        } else if (values.type === 'OccupationalHealthcare') {
            newEntry = {
                ...base,
                type: 'OccupationalHealthcare',
                employerName: values.employerName,
                sickLeave: values.sickLeaveStart
                    ? { startDate: values.sickLeaveStart, endDate: values.sickLeaveEnd }
                    : undefined,
            };
        } else {
            newEntry = {
                ...base,
                type: 'Hospital',
                discharge: { date: values.dischargeDate, criteria: values.dischargeCriteria },
            };
        }
        onSubmit(newEntry);
        onCancel();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setValues({ ...values, type: event.target.value as Entry['type'] });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, mt: 2, border: '1px solid black', borderRadius: 2 }}>
            {error && <Alert severity={type === 'success' ? 'success' : 'error'}>{error}</Alert>}
            <form onSubmit={sendSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputLabel id="entry-type-label">Entry Type</InputLabel>
                <Select
                    labelId="entry-type-label"
                    value={values.type}
                    label="Type"
                    onChange={handleChange}
                >
                    <MenuItem value="Hospital">Hospital</MenuItem>
                    <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
                    <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                </Select>
                <TextField
                    label='Date'
                    fullWidth
                    value={values.date}
                    onChange={({ target }) => setValues({ ...values, date: target.value })}
                />
                <TextField
                    label='Description'
                    fullWidth
                    value={values.description}
                    onChange={({ target }) => setValues({ ...values, description: target.value })}
                />
                <TextField
                    label='Specialist'
                    fullWidth
                    value={values.specialist}
                    onChange={({ target }) => setValues({ ...values, specialist: target.value })}
                />
                <TextField
                    label='Diagnosis Codes (comma separated)'
                    fullWidth
                    value={values.diagnosisCodes.join(', ')}
                    onChange={({ target }) => setValues({ ...values, diagnosisCodes: target.value.split(',').map(code => code.trim()) })}
                />

                {values.type === "HealthCheck" && (
                    <TextField
                        label='Health Check Rating'
                        fullWidth
                        value={values.healthCheckRating}
                        onChange={({ target }) => setValues({ ...values, healthCheckRating: Number(target.value) as HealthCheckRating })}
                    />
                )}

                {values.type === "OccupationalHealthcare" && (
                    <>
                        <TextField
                            label='Employer Name'
                            fullWidth
                            value={values.employerName}
                            onChange={({ target }) => setValues({ ...values, employerName: target.value })}
                        />
                        <TextField
                            label='Sick Leave Start Date'
                            fullWidth
                            value={values.sickLeaveStart}
                            onChange={({ target }) => setValues({ ...values, sickLeaveStart: target.value })}
                        />
                        <TextField
                            label='Sick Leave End Date'
                            fullWidth
                            value={values.sickLeaveEnd}
                            onChange={({ target }) => setValues({ ...values, sickLeaveEnd: target.value })}
                        />
                    </>
                )}

                {values.type === "Hospital" && (
                    <>
                        <TextField
                            label='Discharge Date'
                            fullWidth
                            value={values.dischargeDate}
                            onChange={({ target }) => setValues({ ...values, dischargeDate: target.value })}
                        />
                        <TextField
                            label='Criteria'
                            fullWidth
                            value={values.dischargeCriteria}
                            onChange={({ target }) => setValues({ ...values, dischargeCriteria: target.value })}
                        />
                    </>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="submit" variant="contained">
                        Add Entry
                    </Button>
                    <Button onClick={onCancel} variant="outlined">
                        Cancel
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default AddEntryForm;
