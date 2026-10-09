import { type Entry } from '../../types';
import HealthChecked from './HealthChecked';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';

const assertNever = (params: never): never => {
    throw new Error(`Parametros inesperados en: ${JSON.stringify(params)}`);
};


const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthChecked entry={entry} />;
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
