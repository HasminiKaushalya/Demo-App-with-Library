// Represents the charging state of the device
export var ChargingStatus;
(function (ChargingStatus) {
    ChargingStatus["CHARGING"] = "charging";
    ChargingStatus["DISCHARGING"] = "discharging";
    ChargingStatus["FULL"] = "full";
    ChargingStatus["NOT_CHARGING"] = "not_charging";
    ChargingStatus["UNKNOWN"] = "unknown";
})(ChargingStatus || (ChargingStatus = {}));
// Represents the thermal condition of the device
export var ThermalStatus;
(function (ThermalStatus) {
    ThermalStatus["NORMAL"] = "normal";
    ThermalStatus["WARM"] = "warm";
    ThermalStatus["HOT"] = "hot";
    ThermalStatus["CRITICAL"] = "critical";
    ThermalStatus["UNKNOWN"] = "unknown";
})(ThermalStatus || (ThermalStatus = {}));
