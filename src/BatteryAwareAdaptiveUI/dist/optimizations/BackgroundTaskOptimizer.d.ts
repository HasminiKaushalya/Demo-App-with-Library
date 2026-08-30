import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export interface BackgroundTaskSettings {
    syncEnabled: boolean;
    interval: number;
}
export declare class BackgroundTaskOptimizer {
    static getSettings(mode: AdaptiveMode): BackgroundTaskSettings;
}
//# sourceMappingURL=BackgroundTaskOptimizer.d.ts.map