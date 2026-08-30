import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export class BackgroundTaskOptimizer {
    static getSettings(mode) {
        switch (mode) {
            case AdaptiveMode.PERFORMANCE:
                return {
                    syncEnabled: true,
                    interval: 300000,
                };
            case AdaptiveMode.BALANCED:
                return {
                    syncEnabled: true,
                    interval: 600000,
                };
            case AdaptiveMode.POWER_SAVER:
                return {
                    syncEnabled: true,
                    interval: 900000,
                };
            case AdaptiveMode.ULTRA_SAVER:
                return {
                    syncEnabled: false,
                    interval: 0,
                };
            default:
                return {
                    syncEnabled: true,
                    interval: 300000,
                };
        }
    }
}
