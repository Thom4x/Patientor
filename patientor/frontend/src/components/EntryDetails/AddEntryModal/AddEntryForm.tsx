import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { EntryWithoutId, HealthCheckRating } from "../../../types";
import Message from "../../ErrorModal/Message";

interface Props {
    onSubmit: (values: EntryWithoutId) => void;
    onCancel: () => void;
    error: string;
    type: string;
}

const Ensayis = ({ onSubmit, onCancel, error, type }: Props) => {
    const [description, setDescriptions] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

    const HandleForm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newEntry: EntryWithoutId = {
            date: date,
            description: description,
            type: "HealthCheck",
            specialist: specialist,
            diagnosisCodes: diagnosisCodes,
            healthCheckRating: healthCheckRating
        };
        onSubmit(newEntry);

    };


    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, marginTop: 2, border: '1px solid black', borderRadius: 2 }}>
                {error && <Message error={error} type={type} />}
                <br />
                <form onSubmit={HandleForm} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        label='Date'
                        fullWidth
                        value={date}
                        onChange={({ target }) => setDate(target.value)}
                    />
                    <TextField
                        label='Description'
                        fullWidth
                        value={description}
                        onChange={({ target }) => setDescriptions(target.value)}
                    />
                    <TextField
                        label='Specialist'
                        fullWidth
                        value={specialist}
                        onChange={({ target }) => setSpecialist(target.value)}
                    />
                    <TextField
                        label='Health Check Rating'
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
                    />
                    <TextField
                        label='Diagnosis Codes (comma separated)'
                        fullWidth
                        value={diagnosisCodes.join(', ')}
                        onChange={({ target }) => setDiagnosisCodes(target.value.split(',').map(code => code.trim()))}
                    />
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
        </div >
    );
};

export default Ensayis;
