import { useState } from "react";

type FieldType = 'string' | 'number' | 'object'

interface FieldProps {
    type: FieldType,
    value: string,
    onChange: (values: FieldType) => void,
    onReset: () => void
}

export const useField = ({ type }: FieldProps) => {
    const [value, setValue] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onReset = () => {
        setValue('');
    };

    return {
        type,
        value,
        onChange,
        onReset
    };
};

