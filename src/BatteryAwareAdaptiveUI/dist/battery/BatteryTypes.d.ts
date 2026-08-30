export declare enum ChargingStatus {
    CHARGING = "charging",
    DISCHARGING = "discharging",
    FULL = "full",
    NOT_CHARGING = "not_charging",
    UNKNOWN = "unknown"
}
export declare enum ThermalStatus {
    NORMAL = "normal",
    WARM = "warm",
    HOT = "hot",
    CRITICAL = "critical",
    UNKNOWN = "unknown"
}
export interface BatteryInfo {
    batteryPercentage: number;
    chargingStatus: ChargingStatus;
    powerSaveMode: boolean;
    thermalStatus: ThermalStatus;
    batteryTemperature: number;
    timestamp: number;
}
//# sourceMappingURL=BatteryTypes.d.ts.map