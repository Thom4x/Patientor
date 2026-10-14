import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient, UserId, EntryWithoutId, MessageError } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Box, Button, Typography } from '@mui/material';

import patientService from "../../services/patients";
import EntryDetails from '../EntryDetails/EntryDetails';
import AddEntryForm from '../EntryDetails/AddEntryModal/AddEntryForm';

const PatientDetail = () => {
    const [patients, setPatients] = useState<Patient>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [error, setError] = useState<MessageError>({
        severity: 'success',
        message: ''
    });

    const openModal = (): void => setIsFormOpen(true);

    const closeModal = (): void => {
        setIsFormOpen(false);
        setError({
            severity: 'success',
            message: ''
        });
    };
    const { id } = useParams<{ id: UserId }>();

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                if (id) {
                    const patient = await patientService.getById(id);
                    setPatients(patient);
                }
                const diagnosisList = await patientService.getDiagnosis();
                setDiagnosis(diagnosisList);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };
        void fetchPatientData();
    }, [id]);

    const submitNewEntry = async (values: EntryWithoutId) => {
        if (!id) return;
        try {
            const entry = await patientService.createEntry(id, values);
            setPatients(patients ? { ...patients, entries: [...patients.entries, entry] } : undefined);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorData = error.response?.data;
                if (typeof errorData === 'object') {
                    setError({
                        message: errorData.error,
                        severity: 'error'
                    });
                    setTimeout(() => {
                        setError({
                            message: '',
                            severity: 'success'
                        });
                    }, 2000);

                }
            } else {
                console.error("Unknown error occurred", error);
            }
        }
    };



    return (
        <div>
            {patients ? (
                <Box>
                    {patients.gender === 'male' ? (
                        <Typography variant="h5">{patients.name} <MaleIcon /></Typography>
                    ) : patients.gender === 'female' ? (
                        <Typography variant="h5">{patients.name} <FemaleIcon /></Typography>
                    ) : (
                        <Typography variant="h5">{patients.name} ⚧</Typography>
                    )}
                    <Typography variant="body1">ssn: {patients.ssn}</Typography>
                    <Typography variant="body1">occupation: {patients.occupation}</Typography>
                    <Typography variant="body1">date of birth: {patients.dateOfBirth}</Typography>
                    <br />
                    <Typography variant="h6">entries</Typography>
                    {!isFormOpen ? (
                        <Button variant='contained' onClick={openModal}>Add New Entry</Button>
                    ) : null}
                    {isFormOpen ?
                        <div>
                            <AddEntryForm
                                codeDiagnosis={diagnosis}
                                onSubmit={submitNewEntry}
                                onCancel={closeModal}
                                messageType={error.message}
                                alertSeverity={error.severity}
                            />

                        </div>

                        :
                        null
                    }

                    {
                        patients.entries?.length >= 1 ? (
                            patients.entries.map((value) =>
                                <EntryDetails key={value.id} entry={value} />
                            )

                        ) : (
                            <Typography variant="body1">No entries</Typography>
                        )
                    }
                </Box>
            ) : (
                <h1><Typography variant="body1">Cargando...</Typography></h1>
            )
            }
        </div >
    );
};

export default PatientDetail;
