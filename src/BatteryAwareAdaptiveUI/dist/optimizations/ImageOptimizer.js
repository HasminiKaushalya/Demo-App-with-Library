import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export class ImageOptimizer {
    static getSettings(mode) {
        switch (mode) {
            case AdaptiveMode.PERFORMANCE:
                return {
                    quality: 100,
                    cacheEnabled: true,
                };
            case AdaptiveMode.BALANCED:
                return {
                    quality: 80,
                    cacheEnabled: true,
                };
            case AdaptiveMode.POWER_SAVER:
                return {
                    quality: 60,
                    cacheEnabled: true,
                };
            case AdaptiveMode.ULTRA_SAVER:
                return {
                    quality: 40,
                    cacheEnabled: true,
                };
            default:
                return {
                    quality: 100,
                    cacheEnabled: true,
                };
        }
    }
}
