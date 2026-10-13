import React from 'react'

interface Props {
    error: string,
    type: string
}

const Message = ({ error, type }: Props) => {
    if (error === null) return;

    const classError = type === 'success' ? 'success' : 'error';

    return (
        <div className={classError}>

        </div>
    );
};

export default Message;
