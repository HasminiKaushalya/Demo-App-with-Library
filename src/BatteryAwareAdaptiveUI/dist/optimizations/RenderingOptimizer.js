import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export class RenderingOptimizer {
    static getSettings(mode) {
        switch (mode) {
            case AdaptiveMode.PERFORMANCE:
                return {
                    shadowsEnabled: true,
                    blurEnabled: true,
                    gradientsEnabled: true,
                    complexEffectsEnabled: true,
                };
            case AdaptiveMode.BALANCED:
                return {
                    shadowsEnabled: true,
                    blurEnabled: true,
                    gradientsEnabled: true,
                    complexEffectsEnabled: false,
                };
            case AdaptiveMode.POWER_SAVER:
                return {
                    shadowsEnabled: false,
                    blurEnabled: false,
                    gradientsEnabled: true,
                    complexEffectsEnabled: false,
                };
            case AdaptiveMode.ULTRA_SAVER:
                return {
                    shadowsEnabled: false,
                    blurEnabled: false,
                    gradientsEnabled: false,
                    complexEffectsEnabled: false,
                };
            default:
                return {
                    shadowsEnabled: true,
                    blurEnabled: true,
                    gradientsEnabled: true,
                    complexEffectsEnabled: true,
                };
        }
    }
}
