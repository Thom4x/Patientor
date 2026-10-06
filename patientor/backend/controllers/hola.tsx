// import React from "react";

// type Generic = "string" | "number" | "boolean" | "object" | "array" | "null" | "undefined";

// interface Julius {
//     id: number,
//     generic: Generic,
//     event: (e: React.MouseEvent<HTMLButtonElement>) => void // este es un evento de click en un botón,
//     chamber: string,
//     role: 'amin' | 'user' | 'guest',
//     time: Record<string, unknown> // un objeto con propiedades de tipo string y valores de tipo unknown
// }

// interface Fase2 extends Julius {
//     extra: string,
//     array: number[],
//     holi: Pick<Julius, "id" | "generic" | "chamber"> // un objeto con las propiedades id, generic y chamber de Julius
// }

// let example: Fase2 = {
//     id: 1,
//     generic: "string",
//     event: () => { },
//     chamber: "chamber1",
//     extra: "extra1",
//     array: [1, 2, 3],
//     role: 'amin' | 'user' | 'guest',

// }

// export type Failed = Omit<Fase2, "extra" | "array"> // un objeto con todas las propiedades de Fase2 excepto extra y array
// export type ToPlus = Pick<Julius, "id" | "generic" | "chamber"> // ub objeto con las propiedades id, generic y chamber de Julius

// // Usa Omit cuando tienes un objeto gigante (ej. 20 campos) y solo quieres esconder 1 o 2 cosas. Es más rápido decir "todo menos la contraseña" que enumerar los otros 19 campos permitidos.

// // Usa Pick cuando tienes un objeto gigante y solo necesitas extraer 2 o 3 campos muy específicos (por ejemplo, para mostrar una pequeña tarjeta de resumen en el frontend con solo el id y el titulo).