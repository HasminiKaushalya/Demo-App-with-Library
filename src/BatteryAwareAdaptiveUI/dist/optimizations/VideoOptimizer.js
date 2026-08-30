import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export class VideoOptimizer {
    static getSettings(mode) {
        switch (mode) {
            case AdaptiveMode.PERFORMANCE:
                return {
                    autoPlay: true,
                    quality: 100,
                };
            case AdaptiveMode.BALANCED:
                return {
                    autoPlay: true,
                    quality: 80,
                };
            case AdaptiveMode.POWER_SAVER:
                return {
                    autoPlay: false,
                    quality: 60,
                };
            case AdaptiveMode.ULTRA_SAVER:
                return {
                    autoPlay: false,
                    quality: 40,
                };
            default:
                return {
                    autoPlay: true,
                    quality: 100,
                };
        }
    }
}
