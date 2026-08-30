import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export class AnimationOptimizer {
    static getSettings(mode) {
        switch (mode) {
            case AdaptiveMode.PERFORMANCE:
                return {
                    enabled: true,
                    duration: 300,
                };
            case AdaptiveMode.BALANCED:
                return {
                    enabled: true,
                    duration: 250,
                };
            case AdaptiveMode.POWER_SAVER:
                return {
                    enabled: true,
                    duration: 150,
                };
            case AdaptiveMode.ULTRA_SAVER:
                return {
                    enabled: false,
                    duration: 0,
                };
            default:
                return {
                    enabled: true,
                    duration: 300,
                };
        }
    }
}
