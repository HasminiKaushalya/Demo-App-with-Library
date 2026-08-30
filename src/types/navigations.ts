import { Career } from "../services/careerService";
import { Job } from "../services/jobService";

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  HomeChoice: undefined;
  ExploreCareers: undefined;
  CareerDiscovery: { career?: Career } | undefined;
  FindJobs: undefined;
  JobDetails: { job: Job };
  SavedJobs: undefined;
  Recommendation: undefined;
  Profile: undefined;
  BatteryAdaptiveDemo: undefined;
};
