import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export interface AdaptiveUIConfig {
    enableAnimations: boolean;
    enableImageOptimization: boolean;
    enableVideoOptimization: boolean;
    enableApiPollingOptimization: boolean;
    enableBackgroundTaskOptimization: boolean;
    enableRenderingOptimization: boolean;
    enableThemeOptimization: boolean;
    enableColorPaletteOptimization: boolean;
    pollingInterval?: number;
    enabledModes?: AdaptiveMode[];
}
export declare const defaultAdaptiveUIConfig: AdaptiveUIConfig;
//# sourceMappingURL=AdaptiveUIConfig.d.ts.map