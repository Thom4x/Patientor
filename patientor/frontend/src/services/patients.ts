import axios from "axios";
import { Patient, PatientFormValues, UserId } from "../types";

import { apiBaseUrl } from "../constants";


const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: UserId) => {
  if (!id) {
    throw new Error("Patient ID is required");
  }

  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, create, getById
};

