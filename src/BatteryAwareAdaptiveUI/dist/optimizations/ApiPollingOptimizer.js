import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export class ApiPollingOptimizer {
    static getSettings(mode) {
        switch (mode) {
            case AdaptiveMode.PERFORMANCE:
                return {
                    interval: 5000,
                };
            case AdaptiveMode.BALANCED:
                return {
                    interval: 10000,
                };
            case AdaptiveMode.POWER_SAVER:
                return {
                    interval: 20000,
                };
            case AdaptiveMode.ULTRA_SAVER:
                return {
                    interval: 30000,
                };
            default:
                return {
                    interval: 5000,
                };
        }
    }
}
