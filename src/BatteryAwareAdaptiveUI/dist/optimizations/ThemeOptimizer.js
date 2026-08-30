import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export class ThemeOptimizer {
    static getSettings(mode) {
        switch (mode) {
            case AdaptiveMode.PERFORMANCE:
                return { theme: "default" };
            case AdaptiveMode.BALANCED:
                return { theme: "balanced" };
            case AdaptiveMode.POWER_SAVER:
                return { theme: "batterySaver" };
            case AdaptiveMode.ULTRA_SAVER:
                return { theme: "ultraSaver" };
            default:
                return { theme: "default" };
        }
    }
}
