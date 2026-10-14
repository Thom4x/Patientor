import React, { useState } from "react";
import { Box, TextField, Button, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Entry, EntryWithoutId, Diagnosis, type HealthCheckRating } from "../../../types";
import Message from "../../ErrorModal/Message";

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
    messageType: string;
    alertSeverity: string;
    codeDiagnosis: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, onCancel, messageType, alertSeverity, codeDiagnosis }: Props) => {
    const [values, setValues] = useState(initialValues);

    const sendSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const base = {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
        };

        let newEntry: EntryWithoutId;
        if (values.type === 'HealthCheck') {
            newEntry = { ...base, type: 'HealthCheck', healthCheckRating: Number(values.healthCheckRating) as HealthCheckRating };
        } else if (values.type === 'OccupationalHealthcare') {
            newEntry = {
                ...base,
                type: 'OccupationalHealthcare',
                employerName: values.employerName,
                sickLeave: (values.sickLeaveStart && values.sickLeaveEnd)
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
            <Message message={messageType} severity={alertSeverity} />
            <form onSubmit={sendSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <InputLabel id="entry-type-label">New Entry Type</InputLabel>
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
                    type='date'
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
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
                    select
                    fullWidth
                    label="Diagnosis Codes"
                    value={values.diagnosisCodes}
                    onChange={(e) => {
                        const { value } = e.target;
                        setValues((prev) => ({
                            ...prev,
                            diagnosisCodes: typeof value === 'string' ? value.split(',') : value,
                        }));
                    }}
                    slotProps={{
                        inputLabel: { shrink: true },
                        select: {
                            multiple: true,
                            renderValue: (selected) => (selected as string[]).join(', '),
                        },
                    }}
                >
                    {codeDiagnosis.map((d) => (
                        <MenuItem key={d.code} value={d.code}>
                            {d.code} - {d.name}
                        </MenuItem>
                    ))}
                </TextField>
                {
                    values.type === "HealthCheck" && (
                        <div>
                            <InputLabel id="entry-type-label">Level Risk</InputLabel>
                            <Select
                                labelId="entry-type-label"
                                value={values.healthCheckRating}
                                label="Level Risk"
                                onChange={({ target }) => setValues({ ...values, healthCheckRating: Number(target.value) })}
                            >
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>Low</MenuItem>
                                <MenuItem value={2}>Moderate</MenuItem>
                                <MenuItem value={3}>High</MenuItem>
                            </Select>
                        </div>
                    )
                }

                {
                    values.type === "OccupationalHealthcare" && (
                        <>
                            <TextField
                                label='Employer Name'
                                fullWidth
                                value={values.employerName}
                                onChange={({ target }) => setValues({ ...values, employerName: target.value })}
                            />
                            <TextField
                                type='date'
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                label='Sick Leave Start Date'
                                fullWidth
                                value={values.sickLeaveStart}
                                onChange={({ target }) => setValues({ ...values, sickLeaveStart: target.value })}
                            />
                            <TextField
                                type='date'
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                label='Sick Leave End Date'
                                fullWidth
                                value={values.sickLeaveEnd}
                                onChange={({ target }) => setValues({ ...values, sickLeaveEnd: target.value })}
                            />
                        </>
                    )
                }

                {
                    values.type === "Hospital" && (
                        <>
                            <TextField
                                type='date'
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
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
                    )
                }

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
