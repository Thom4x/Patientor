import { MessageError } from '../../types';
import { Alert } from '@mui/material';

const Message = ({ message, severity }: MessageError) => {

    if (!message) {
        return null;
    }

    return (
        <div>
            <Alert severity={severity === 'success' ? 'success' : 'error'}>{message}</Alert>
        </div>
    );
};

export default Message;
