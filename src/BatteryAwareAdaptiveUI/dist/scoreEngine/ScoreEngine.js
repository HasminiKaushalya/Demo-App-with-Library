import { ScoreCalculator } from "./ScoreCalculator";
import { ABSController } from "../simulation/ABSController";
export var AdaptiveMode;
(function (AdaptiveMode) {
    AdaptiveMode["PERFORMANCE"] = "Performance";
    AdaptiveMode["BALANCED"] = "Balanced";
    AdaptiveMode["POWER_SAVER"] = "Power Saver";
    AdaptiveMode["ULTRA_SAVER"] = "Ultra Saver";
})(AdaptiveMode || (AdaptiveMode = {}));
export class ScoreEngine {
    static determineMode(batteryInfo) {
        // Real ABS calculation from phone battery data
        let abs = ScoreCalculator.calculate(batteryInfo);
        // Demo simulation override
        // If manual ABS is entered, use it instead
        if (ABSController.isSimulationEnabled()) {
            abs = ABSController.getABS();
        }
        if (abs <= 25) {
            return AdaptiveMode.PERFORMANCE;
        }
        if (abs <= 50) {
            return AdaptiveMode.BALANCED;
        }
        if (abs <= 75) {
            return AdaptiveMode.POWER_SAVER;
        }
        return AdaptiveMode.ULTRA_SAVER;
    }
}
