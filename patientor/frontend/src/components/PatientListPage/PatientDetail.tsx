import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, UserId } from '../../types';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Box, Typography } from '@mui/material';

import patientService from "../../services/patients";

const PatientDetail = () => {
    const [patients, setPatients] = useState<Patient | null>(null);
    const { id } = useParams<{ id: UserId }>();


    useEffect(() => {
        const fetchPatientList = async () => {
            if (id) {
                //const clean = id.replace(/[^a-zA-Z0-9-]/g, '');
                const patients = await patientService.getById(id as UserId);
                setPatients(patients);
            }
        };
        void fetchPatientList();
    }, [id]);

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
                </Box>
            ) : (
                <h1><Typography variant="body1">Cargando...</Typography></h1>
            )}
        </div >
    );
};

export default PatientDetail;
