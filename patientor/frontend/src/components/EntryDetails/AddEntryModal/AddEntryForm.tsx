import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { EntryWithoutId, Diagnosis, HealthCheckRating } from '../../../types';
import { HealthCheckFields, OccupationalFields, HospitalFields } from './TypeEntryForm';

import Message from "../../ErrorModal/Message";


interface AddEntryFormProps {
    onSubmit: (values: EntryWithoutId) => void;
    onCancel: () => void;
    diagnoses: Diagnosis[];
    messageType: string;
    alertSeverity: string;
}

const AddEntryForm = ({ onSubmit, onCancel, messageType, alertSeverity, diagnoses }: AddEntryFormProps) => {
    const [type, setType] = useState<EntryWithoutId['type']>('HealthCheck');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    // Variants State
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');

    console.log("diagnosis seleccionado", diagnosisCodes);
    const sendSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const baseValues = {
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: diagnosisCodes,
        };

        let newEntry: EntryWithoutId;
        switch (type) {
            case 'HealthCheck':
                newEntry = {
                    ...baseValues,
                    type: 'HealthCheck',
                    healthCheckRating,
                };
                break;
            case 'OccupationalHealthcare':
                newEntry = {
                    ...baseValues,
                    type: 'OccupationalHealthcare',
                    employerName,
                    sickLeave: sickLeaveStart && sickLeaveEnd
                        ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
                        : undefined,
                };
                break;
            case 'Hospital':
                newEntry = {
                    ...baseValues,
                    type: 'Hospital',
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria,
                    },
                };
                break;
            default:
                return;
        }
        onSubmit(newEntry);
        if (messageType === 'success') {
            onCancel();
        }
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        setType(event.target.value as EntryWithoutId['type']);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, mt: 2, border: '1px solid black', borderRadius: 2 }}>
            <Message message={messageType} severity={alertSeverity} />
            <form onSubmit={sendSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputLabel id="entry-type-label">New Entry Type</InputLabel>
                <Select
                    labelId="entry-type-label"
                    value={type}
                    label="Type"
                    onChange={handleChange}
                >
                    <MenuItem value="Hospital">Hospital</MenuItem>
                    <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
                    <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                </Select>
                <TextField
                    label='Date'
                    type='date'
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label='Description'
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label='Specialist'
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
                <Select
                    labelId="diagnosis-codes-label"
                    multiple
                    value={Array.isArray(diagnosisCodes) ? diagnosisCodes : []}
                    label="Diagnosis Codes"
                    onChange={(e) => {
                        const { value } = e.target;
                        const newValues = typeof value === 'string' ? value.split(',') : value;
                        setDiagnosisCodes(newValues as string[]);
                    }}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                >
                    {diagnoses.map((d) => (
                        <MenuItem key={d.code} value={d.code}>
                            {d.code} - {d.name}
                        </MenuItem>
                    ))}
                </Select>
                {
                    type === "HealthCheck" && (
                        <HealthCheckFields
                            healthCheckRating={healthCheckRating}
                            onChange={(rating) => setHealthCheckRating(rating)}
                        />
                    )}
                {
                    type === "OccupationalHealthcare" && (
                        <OccupationalFields
                            employerName={employerName}
                            sickLeaveStart={sickLeaveStart}
                            sickLeaveEnd={sickLeaveEnd}
                            onChange={
                                (field, value) => {
                                    if (field === 'employerName') setEmployerName(value);
                                    if (field === 'sickLeaveStart') setSickLeaveStart(value);
                                    if (field === 'sickLeaveEnd') setSickLeaveEnd(value);
                                }}

                        />
                    )}
                {
                    type === "Hospital" && (
                        <HospitalFields
                            dischargeCriteria={dischargeCriteria}
                            dischargeDate={dischargeDate}
                            onChange={
                                (field, value) => {
                                    if (field === "dischargeCriteria") setDischargeCriteria(value);
                                    if (field === "dischargeDate") setDischargeDate(value);
                                }}
                        />
                    )}

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="submit" variant="contained">
                        Add
                    </Button>
                    <Button onClick={onCancel} variant="outlined">
                        Cancel
                    </Button>
                </div>
            </form >
        </Box >
    );
};

export default AddEntryForm;
