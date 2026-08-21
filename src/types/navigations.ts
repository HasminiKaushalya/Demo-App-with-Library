export type Job = {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: string;
  type: string;
  rating: number;
  applicants: number;
  tags: string[];
  postedDays: number;
  isSaved?: boolean;
  isFeatured?: boolean;
  color: string;
};

// Add this 👇
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  // add more screens as you build them
};