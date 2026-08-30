import apiClient from './api';
import fallbackCareers from '../data/careers';

export type Career = {
  id: number;
  title: string;
  emoji: string;
  color: string;
  level: string;
  duration: string;
  salaryRange: string;
  demand: number;
  skills: string[];
  description: string;
  roadmap: string[];
  category?: string;
  matching_jobs_count?: number;
};

export const careerService = {
  async getCareers(params?: { level?: string; category?: string; search?: string }): Promise<Career[]> {
    try {
      const response = await apiClient.get<Career[]>('/careers', { params });
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return fallbackCareers as unknown as Career[];
    } catch (error) {
      console.warn('API error fetching careers, using fallback data', error);
      let data = fallbackCareers as unknown as Career[];
      if (params?.level && params.level.toLowerCase() !== 'all') {
        data = data.filter(c => c.level.toLowerCase() === params.level?.toLowerCase());
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          c =>
            c.title.toLowerCase().includes(q) ||
            c.skills.some(s => s.toLowerCase().includes(q))
        );
      }
      return data;
    }
  },

  async getCareerById(id: number): Promise<Career> {
    try {
      const response = await apiClient.get<Career>(`/careers/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`API error fetching career ${id}, using fallback data`, error);
      const fallback = (fallbackCareers as unknown as Career[]).find(c => c.id === id);
      if (fallback) return fallback;
      throw error;
    }
  },
};
