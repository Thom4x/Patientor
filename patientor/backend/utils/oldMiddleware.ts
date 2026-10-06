// import { type NewPatientEntry } from "../types/type.ts";
// import { type Gender } from "../types/type.ts";
// import { z } from "zod";
// const isString = (text: unknown): text is string => {
//     return typeof text === "string" || text instanceof String;
// };

// const isDate = (date: unknown): date is string => {
//     return typeof date === "string" && Boolean(Date.parse(date));
// };

// const isGender = (gender: string): gender is Gender => {
//     return ["male", "female", "other"].includes(gender);
// };

// const parseGender = (gender: unknown): Gender => {
//     if (!gender || !isString(gender) || !isGender(gender)) {
//         throw new Error('Gender parameter is incorrect or missing: ' + gender);
//     }
//     return gender;
// };

// const parseDate = (date: unknown): string => {
//     if (!date || !isString(date) || !isDate(date)) {
//         throw new Error('Incorrect or missing date: ' + date);
//     }
//     return date;
// };

// const parseText = (text: unknown): string => {
//     if (!text || !isString(text)) {
//         throw new Error("El argumento ingresado debe ser de tipo string");

//     }
//     return text;
// };

// const newPatientValidator = (args: unknown): NewPatientEntry => {
//     if (!args || typeof args !== "object") {
//         throw new Error("El argumento ingresado debe ser de tipo object");
//     }

//     if ("name" in args && "dateOfBirth" in args && "ssn" in args && "gender" in args && "occupation" in args) {
//         const dataNew: NewPatientEntry = {
//             name: parseText(args.name),
//             dateOfBirth: z.iso.date().parse(args.dateOfBirth),
//             ssn: parseText(args.ssn),
//             gender: z.enum(["male", "female", "other"]).parse(args.gender),
//             occupation: z.string().parse(args.occupation),
//         };
//         return dataNew;
//     }
//     throw new Error("Faltan campos obligatorios en el objeto ingresado");
// };


// export default newPatientValidator;