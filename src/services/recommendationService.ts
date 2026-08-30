import apiClient from './api';
import { Career } from './careerService';
import { Job } from './jobService';

export type CareerRecommendation = {
  career: Career;
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
  match_reasons: string[];
  suggested_next_step: string;
};

export type JobRecommendation = {
  job: Job;
  match_percentage: number;
  matched_tags: string[];
  missing_tags: string[];
  match_reasons: string[];
};

export type RecommendationResponse = {
  top_careers: CareerRecommendation[];
  top_jobs: JobRecommendation[];
  total_evaluated_careers: number;
  total_evaluated_jobs: number;
  user_skill_count: number;
  readiness_level: string;
  growth_advice: string;
};

export type RecommendationRequest = {
  skills: string[];
  experience_level?: string;
  interests?: string[];
  preferred_locations?: string[];
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  demand_score: number;
  popular_careers?: string[];
};

export type SkillCategory = {
  key: string;
  title: string;
  icon: string;
  skills: string[];
};

export const recommendationService = {
  async evaluate(request: RecommendationRequest): Promise<RecommendationResponse> {
    const response = await apiClient.post<RecommendationResponse>('/recommendations/evaluate', request);
    return response.data;
  },

  async getMyRecommendations(): Promise<RecommendationResponse> {
    const response = await apiClient.get<RecommendationResponse>('/recommendations/my');
    return response.data;
  },

  async getSkills(): Promise<Skill[]> {
    try {
      const response = await apiClient.get<Skill[]>('/skills');
      return response.data;
    } catch (e) {
      return [
        { id: 'js', name: 'JavaScript', category: 'engineering', demand_score: 95 },
        { id: 'ts', name: 'TypeScript', category: 'engineering', demand_score: 96 },
        { id: 'react', name: 'React', category: 'engineering', demand_score: 94 },
        { id: 'rn', name: 'React Native', category: 'engineering', demand_score: 92 },
        { id: 'figma', name: 'Figma', category: 'design', demand_score: 90 },
        { id: 'wireframes', name: 'Wireframes', category: 'design', demand_score: 85 },
        { id: 'python', name: 'Python', category: 'data', demand_score: 97 },
        { id: 'sql', name: 'SQL', category: 'data', demand_score: 93 },
        { id: 'seo', name: 'SEO', category: 'marketing', demand_score: 84 },
      ];
    }
  },

  async getSkillCategories(): Promise<SkillCategory[]> {
    try {
      const response = await apiClient.get<SkillCategory[]>('/skills/categories');
      return response.data;
    } catch (e) {
      return [
        { key: 'engineering', title: 'Tech', icon: '💻', skills: ['JavaScript', 'TypeScript', 'React', 'React Native', 'Python', 'FastAPI'] },
        { key: 'design', title: 'Design', icon: '🎨', skills: ['Figma', 'Prototyping', 'Research', 'Design Systems', 'Wireframes'] },
        { key: 'data', title: 'Data', icon: '📊', skills: ['Python', 'SQL', 'PowerBI', 'Machine Learning', 'Statistics'] },
        { key: 'marketing', title: 'Marketing', icon: '📢', skills: ['SEO', 'Paid Ads', 'Content Strategy', 'Analytics'] },
      ];
    }
  },
};
