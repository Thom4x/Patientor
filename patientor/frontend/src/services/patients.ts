import axios from "axios";
import { Diagnosis, Patient, PatientFormValues, UserId, EntryWithoutId, Entry } from "../types";

import { apiBaseUrl } from "../constants";


const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getDiagnosis = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnosis`
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

  return data.entries;
};

const createEntry = async (id: UserId, object: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};


export default {
  getAll, getDiagnosis, create, getById, createEntry
};

