import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export const defaultAdaptiveUIConfig = {
    enableAnimations: true,
    enableImageOptimization: true,
    enableVideoOptimization: true,
    enableApiPollingOptimization: true,
    enableBackgroundTaskOptimization: true,
    enableRenderingOptimization: true,
    enableThemeOptimization: true,
    enableColorPaletteOptimization: true,
    pollingInterval: 10000,
    enabledModes: [
        AdaptiveMode.PERFORMANCE,
        AdaptiveMode.BALANCED,
        AdaptiveMode.POWER_SAVER,
        AdaptiveMode.ULTRA_SAVER,
    ],
};
