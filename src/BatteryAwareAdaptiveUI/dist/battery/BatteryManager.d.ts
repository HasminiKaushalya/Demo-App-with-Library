export declare class BatteryManager {
    static getAdaptiveSettings(): Promise<{
        batteryInfo: import("./BatteryTypes").BatteryInfo;
        score: number;
        mode: import("..").AdaptiveMode;
        settings: {
            animation: import("../optimizations").AnimationSettings | null;
            image: import("../optimizations").ImageSettings | null;
            video: import("../optimizations").VideoSettings | null;
            apiPolling: import("../optimizations").ApiPollingSettings | null;
            backgroundTask: import("../optimizations").BackgroundTaskSettings | null;
            rendering: import("../optimizations").RenderingSettings | null;
            theme: import("../optimizations").ThemeSettings | null;
            colorPalette: import("../optimizations").ColorPaletteSettings | null;
        };
    }>;
}
//# sourceMappingURL=BatteryManager.d.ts.map