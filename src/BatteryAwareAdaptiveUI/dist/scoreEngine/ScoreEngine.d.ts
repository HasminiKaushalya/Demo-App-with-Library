import { BatteryInfo } from "../battery/BatteryTypes";
export declare enum AdaptiveMode {
    PERFORMANCE = "Performance",
    BALANCED = "Balanced",
    POWER_SAVER = "Power Saver",
    ULTRA_SAVER = "Ultra Saver"
}
export declare class ScoreEngine {
    static determineMode(batteryInfo: BatteryInfo): AdaptiveMode;
}
//# sourceMappingURL=ScoreEngine.d.ts.map