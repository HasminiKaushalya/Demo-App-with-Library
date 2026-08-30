import apiClient from './api';
import fallbackJobs from '../data/jobs';

export type Job = {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: string;
  color: string;
  type: string;
  category: string;
  rating: number;
  applicants: number;
  tags: string[];
  postedDays: number;
  description: string;
  requirements: string[];
  isFeatured?: boolean;
  isSaved?: boolean;
  hasApplied?: boolean;
};

export type JobApplication = {
  id: string;
  job_id: number;
  job_title: string;
  company: string;
  applied_at: string;
  status: string;
};

export const jobService = {
  async getJobs(params?: {
    category?: string;
    type?: string;
    search?: string;
    is_featured?: boolean;
  }): Promise<Job[]> {
    try {
      const response = await apiClient.get<Job[]>('/jobs', { params });
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return fallbackJobs as unknown as Job[];
    } catch (error) {
      console.warn('API error fetching jobs, using fallback data', error);
      let data = fallbackJobs as unknown as Job[];
      if (params?.category && params.category.toLowerCase() !== 'all') {
        data = data.filter(j => j.category.toLowerCase() === params.category?.toLowerCase());
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          j =>
            j.position.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q) ||
            j.location.toLowerCase().includes(q) ||
            j.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return data;
    }
  },

  async getJobById(id: number): Promise<Job> {
    try {
      const response = await apiClient.get<Job>(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      const fallback = (fallbackJobs as unknown as Job[]).find(j => j.id === id);
      if (fallback) return fallback;
      throw error;
    }
  },

  async toggleSaveJob(jobId: number): Promise<{ saved: boolean }> {
    try {
      const response = await apiClient.post<{ saved: boolean; message: string }>(`/jobs/${jobId}/save`);
      return response.data;
    } catch (error) {
      console.warn(`Error toggling save for job ${jobId}`, error);
      return { saved: true };
    }
  },

  async applyToJob(
    jobId: number,
    data: { cover_note?: string; portfolio_url?: string; phone?: string }
  ): Promise<JobApplication> {
    const response = await apiClient.post<JobApplication>(`/jobs/${jobId}/apply`, data);
    return response.data;
  },

  async getSavedJobs(): Promise<Job[]> {
    try {
      const response = await apiClient.get<Job[]>('/jobs/saved');
      return response.data;
    } catch (error) {
      console.warn('Error fetching saved jobs from API, using fallback data', error);
      return (fallbackJobs as unknown as Job[]).filter(j => j.isSaved);
    }
  },

  async getAppliedJobs(): Promise<JobApplication[]> {
    try {
      const response = await apiClient.get<JobApplication[]>('/jobs/applied');
      return response.data;
    } catch (error) {
      return [];
    }
  },
};
