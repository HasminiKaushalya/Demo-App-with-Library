import { ConfigurationManager } from "../configuration/ConfigurationManager";
import { AnimationOptimizer } from "./AnimationOptimizer";
import { ImageOptimizer } from "./ImageOptimizer";
import { VideoOptimizer } from "./VideoOptimizer";
import { ApiPollingOptimizer } from "./ApiPollingOptimizer";
import { BackgroundTaskOptimizer } from "./BackgroundTaskOptimizer";
import { RenderingOptimizer } from "./RenderingOptimizer";
import { ThemeOptimizer } from "./ThemeOptimizer";
import { ColorPaletteOptimizer } from "./ColorPaletteOptimizer";
export class OptimizationManager {
    static getSettings(mode) {
        const config = ConfigurationManager.getConfig();
        return {
            animation: config.enableAnimations
                ? AnimationOptimizer.getSettings(mode)
                : null,
            image: config.enableImageOptimization
                ? ImageOptimizer.getSettings(mode)
                : null,
            video: config.enableVideoOptimization
                ? VideoOptimizer.getSettings(mode)
                : null,
            apiPolling: config.enableApiPollingOptimization
                ? ApiPollingOptimizer.getSettings(mode)
                : null,
            backgroundTask: config.enableBackgroundTaskOptimization
                ? BackgroundTaskOptimizer.getSettings(mode)
                : null,
            rendering: config.enableRenderingOptimization
                ? RenderingOptimizer.getSettings(mode)
                : null,
            theme: config.enableThemeOptimization
                ? ThemeOptimizer.getSettings(mode)
                : null,
            colorPalette: config.enableColorPaletteOptimization
                ? ColorPaletteOptimizer.getSettings(mode)
                : null,
        };
    }
}
