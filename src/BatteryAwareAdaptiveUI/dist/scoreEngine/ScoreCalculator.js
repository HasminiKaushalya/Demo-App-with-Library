import { ThermalStatus } from "../battery/BatteryTypes";
import { SCORE_WEIGHTS } from "./ScoreWeights";
export class ScoreCalculator {
    static calculate(info) {
        let score = 0;
        // --------------------------------------------------
        // Battery Percentage
        // Lower battery = higher ABS
        // --------------------------------------------------
        score +=
            ((100 - info.batteryPercentage) / 100) *
                SCORE_WEIGHTS.batteryPercentage;
        // --------------------------------------------------
        // Charging Status
        // Discharging = higher ABS
        // --------------------------------------------------
        if (info.chargingStatus === "charging") {
            score += 0;
        }
        else {
            score += SCORE_WEIGHTS.chargingStatus;
        }
        // --------------------------------------------------
        // Power Saving Mode
        // --------------------------------------------------
        if (info.powerSaveMode) {
            score += SCORE_WEIGHTS.powerSaveMode;
        }
        // --------------------------------------------------
        // Thermal Status
        // Higher thermal condition = higher ABS
        // --------------------------------------------------
        switch (info.thermalStatus) {
            case ThermalStatus.NORMAL:
                score += 0;
                break;
            case ThermalStatus.WARM:
                score += SCORE_WEIGHTS.thermalStatus * 0.25;
                break;
            case ThermalStatus.HOT:
                score += SCORE_WEIGHTS.thermalStatus * 0.75;
                break;
            case ThermalStatus.CRITICAL:
                score += SCORE_WEIGHTS.thermalStatus;
                break;
            case ThermalStatus.UNKNOWN:
                score += 0;
                break;
        }
        // --------------------------------------------------
        // Battery Temperature
        // Higher temperature = higher ABS
        // --------------------------------------------------
        if (info.batteryTemperature >= 45) {
            // Very high temperature
            score += SCORE_WEIGHTS.batteryTemperature;
        }
        else if (info.batteryTemperature >= 40) {
            // High temperature
            score += SCORE_WEIGHTS.batteryTemperature * 0.75;
        }
        else if (info.batteryTemperature >= 35) {
            // Warm temperature
            score += SCORE_WEIGHTS.batteryTemperature * 0.5;
        }
        else {
            // Normal temperature
            score += 0;
        }
        // --------------------------------------------------
        // Keep ABS between 0 and 100
        // --------------------------------------------------
        return Math.min(100, Math.max(0, Math.round(score)));
    }
}
