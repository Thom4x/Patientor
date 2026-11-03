import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Definimos el esquema de validación y tipos con Zod
const userSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('Formato de correo inválido'),
    age: z.number({ invalid_type_error: 'Debe ser un número' }).min(18, 'Debes ser mayor de 18 años'),
});

// TypeScript extrae el tipo automáticamente del esquema de Zod ¡Cero duplicar interfaces!
type UserFormValues = z.infer<typeof userSchema>;

const MyForm = () => {
    // 2. Inicializamos useForm y le pasamos el validador de Zod
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
    });

    // 3. Esta función solo se ejecuta si Zod aprueba que todos los datos son correctos
    const onSubmit = (data: UserFormValues) => {
        console.log('Datos listos para enviar al backend:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>

            {/* Campo Nombre */}
            <div>
                <label>Nombre:</label>
                <input {...register('name')} placeholder="Tu nombre" />
                {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</span>}
            </div>

            {/* Campo Email */}
            <div>
                <label>Correo:</label>
                <input {...register('email')} placeholder="correo@example.com" />
                {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
            </div>

            {/* Campo Edad */}
            <div>
                <label>Edad:</label>
                {/* valueAsNumber le dice a RHF que guarde el valor como número y no como string */}
                <input type="number" {...register('age', { valueAsNumber: true })} placeholder="18" />
                {errors.age && <span style={{ color: 'red', fontSize: '12px' }}>{errors.age.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Registrarse'}
            </button>
        </form>
    );
};

export default MyForm;