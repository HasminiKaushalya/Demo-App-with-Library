import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export interface RenderingSettings {
    shadowsEnabled: boolean;
    blurEnabled: boolean;
    gradientsEnabled: boolean;
    complexEffectsEnabled: boolean;
}
export declare class RenderingOptimizer {
    static getSettings(mode: AdaptiveMode): RenderingSettings;
}
//# sourceMappingURL=RenderingOptimizer.d.ts.map