import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export declare class OptimizationManager {
    static getSettings(mode: AdaptiveMode): {
        animation: import("./AnimationOptimizer").AnimationSettings | null;
        image: import("./ImageOptimizer").ImageSettings | null;
        video: import("./VideoOptimizer").VideoSettings | null;
        apiPolling: import("./ApiPollingOptimizer").ApiPollingSettings | null;
        backgroundTask: import("./BackgroundTaskOptimizer").BackgroundTaskSettings | null;
        rendering: import("./RenderingOptimizer").RenderingSettings | null;
        theme: import("./ThemeOptimizer").ThemeSettings | null;
        colorPalette: import("./ColorPaletteOptimizer").ColorPaletteSettings | null;
    };
}
//# sourceMappingURL=OptimizationManager.d.ts.map