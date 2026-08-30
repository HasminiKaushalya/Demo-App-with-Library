import { BatteryService } from "./BatteryService";
import { ScoreCalculator } from "../scoreEngine/ScoreCalculator";
import { ScoreEngine } from "../scoreEngine/ScoreEngine";
import { ABSController } from "../simulation/ABSController";
import { OptimizationManager } from "../optimizations/OptimizationManager";
export class BatteryManager {
    static async getAdaptiveSettings() {
        const batteryInfo = await BatteryService.getBatteryInfo();
        // Real ABS calculation from phone
        let score = ScoreCalculator.calculate(batteryInfo);
        // Demo simulation override
        if (ABSController.isSimulationEnabled()) {
            score = ABSController.getABS();
        }
        const mode = ScoreEngine.determineMode(batteryInfo);
        const settings = OptimizationManager.getSettings(mode);
        return {
            batteryInfo,
            score,
            mode,
            settings,
        };
    }
}
