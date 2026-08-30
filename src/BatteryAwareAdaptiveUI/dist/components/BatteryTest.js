import React from "react";
import { View, Text, Button } from "react-native";
import { useAdaptiveBattery } from "../hooks/useAdaptiveBattery";
export const BatteryTest = () => {
    const { batteryInfo, score, mode, settings, loading, error, refresh, } = useAdaptiveBattery();
    if (loading) {
        return (React.createElement(View, null,
            React.createElement(Text, null, "Loading battery information...")));
    }
    if (error) {
        return (React.createElement(View, null,
            React.createElement(Text, null,
                "Error: ",
                error.message)));
    }
    return (React.createElement(View, null,
        React.createElement(Text, null,
            "Battery: ", batteryInfo === null || batteryInfo === void 0 ? void 0 :
            batteryInfo.batteryPercentage,
            "%"),
        React.createElement(Text, null,
            "Charging: ", batteryInfo === null || batteryInfo === void 0 ? void 0 :
            batteryInfo.chargingStatus),
        React.createElement(Text, null,
            "Power Save: ",
            (batteryInfo === null || batteryInfo === void 0 ? void 0 : batteryInfo.powerSaveMode) ? "Enabled" : "Disabled"),
        React.createElement(Text, null,
            "Thermal Status: ", batteryInfo === null || batteryInfo === void 0 ? void 0 :
            batteryInfo.thermalStatus),
        React.createElement(Text, null,
            "Temperature: ", batteryInfo === null || batteryInfo === void 0 ? void 0 :
            batteryInfo.batteryTemperature,
            "\u00B0C"),
        React.createElement(Text, null,
            "ABS: ",
            score),
        React.createElement(Text, null,
            "Mode: ",
            mode),
        React.createElement(Text, null, "Settings:"),
        React.createElement(Text, null, JSON.stringify(settings, null, 2)),
        React.createElement(Button, { title: "Refresh", onPress: refresh })));
};
