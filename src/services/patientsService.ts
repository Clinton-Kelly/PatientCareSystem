import { apiClient, API_ENDPOINTS } from '@/config/api';

export interface Patient {
  id: string;
  patient_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_history?: string;
  allergies?: string;
  current_medications?: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePatientRequest {
  patient_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_history?: string;
  allergies?: string;
  current_medications?: string;
}

export const patientsService = {
  async getAll(): Promise<Patient[]> {
    const response = await apiClient.get<Patient[]>(API_ENDPOINTS.PATIENTS.BASE);
    return response.data;
  },

  async getById(id: string): Promise<Patient> {
    const response = await apiClient.get<Patient>(API_ENDPOINTS.PATIENTS.BY_ID(id));
    return response.data;
  },

  async create(data: CreatePatientRequest): Promise<Patient> {
    const response = await apiClient.post<Patient>(API_ENDPOINTS.PATIENTS.BASE, data);
    return response.data;
  },

  async update(id: string, data: Partial<Patient>): Promise<Patient> {
    const response = await apiClient.put<Patient>(API_ENDPOINTS.PATIENTS.BY_ID(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.PATIENTS.BY_ID(id));
  },

  async search(query: string): Promise<Patient[]> {
    const response = await apiClient.get<Patient[]>(API_ENDPOINTS.PATIENTS.SEARCH, {
      params: { q: query },
    });
    return response.data;
  },
};
