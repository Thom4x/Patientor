import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient, UserId } from '../../types';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Box, Typography } from '@mui/material';

import patientService from "../../services/patients";

const PatientDetail = () => {
    const [patients, setPatients] = useState<Patient | null>(null);
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
    const { id } = useParams<{ id: UserId }>();

    useEffect(() => {
        const fetchPatientList = async () => {
            if (id) {
                const patient = await patientService.getById(id);
                setPatients(patient);
            }
            const diagnosisList = await patientService.getDiagnosis();
            setDiagnosis(diagnosisList);
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
                    <br />
                    <Typography variant="h6">entries</Typography>
                    {
                        patients.entries.length >= 1 ? (
                            patients.entries.map((value) =>
                                <div key={value.id}>
                                    <Typography variant="body1">{value.date} <i>{value.description}</i></Typography>
                                    <ul>
                                        {value.diagnosisCodes?.map((item) => {
                                            const matchDiagnosis = diagnosis.find(dn => dn.code === item);

                                            return matchDiagnosis ? (
                                                <li key={item}>
                                                    <Typography>
                                                        {matchDiagnosis.code} {matchDiagnosis.name}
                                                    </Typography>
                                                </li>
                                            ) : null;
                                        })}
                                    </ul>
                                </div>
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
