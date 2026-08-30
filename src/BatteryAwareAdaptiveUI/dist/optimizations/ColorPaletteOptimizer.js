import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export class ColorPaletteOptimizer {
    static getSettings(mode) {
        switch (mode) {
            case AdaptiveMode.PERFORMANCE:
                return { palette: "default" };
            case AdaptiveMode.BALANCED:
                return { palette: "balanced" };
            case AdaptiveMode.POWER_SAVER:
                return { palette: "powerSaver" };
            case AdaptiveMode.ULTRA_SAVER:
                return { palette: "ultraSaver" };
            default:
                return { palette: "default" };
        }
    }
}
