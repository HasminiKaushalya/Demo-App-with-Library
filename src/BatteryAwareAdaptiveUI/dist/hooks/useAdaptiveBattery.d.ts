import { BatteryManager } from "../battery/BatteryManager";
import { BatteryInfo } from "../battery/BatteryTypes";
import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
export interface AdaptiveBatteryData {
    batteryInfo: BatteryInfo | null;
    score: number | null;
    mode: AdaptiveMode | null;
    settings: ReturnType<typeof BatteryManager.getAdaptiveSettings> extends Promise<infer T> ? T extends {
        settings: infer S;
    } ? S : null : null;
}
export declare const useAdaptiveBattery: () => {
    batteryInfo: BatteryInfo | null;
    score: number | null;
    mode: AdaptiveMode | null;
    settings: {
        animation: import("../optimizations").AnimationSettings | null;
        image: import("../optimizations").ImageSettings | null;
        video: import("../optimizations").VideoSettings | null;
        apiPolling: import("../optimizations").ApiPollingSettings | null;
        backgroundTask: import("../optimizations").BackgroundTaskSettings | null;
        rendering: import("../optimizations").RenderingSettings | null;
        theme: import("../optimizations").ThemeSettings | null;
        colorPalette: import("../optimizations").ColorPaletteSettings | null;
    } | null;
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
};
//# sourceMappingURL=useAdaptiveBattery.d.ts.map