/**
 * Adaptive Battery Score (ABS)
 * Defines the importance (weight) of each battery parameter.
 */
export const SCORE_WEIGHTS = {
    batteryPercentage: 50,
    chargingStatus: 20,
    powerSaveMode: 10,
    thermalStatus: 10,
    batteryTemperature: 10,
};
