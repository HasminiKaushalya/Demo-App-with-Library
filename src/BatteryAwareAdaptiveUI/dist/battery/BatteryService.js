import { NativeModules } from "react-native";
const { BatteryModule } = NativeModules;
export class BatteryService {
    static async getBatteryInfo() {
        if (!BatteryModule) {
            throw new Error("BatteryModule is not available. Make sure the Android native module is registered.");
        }
        const data = await BatteryModule.getBatteryInfo();
        return {
            batteryPercentage: data.batteryPercentage,
            chargingStatus: data.chargingStatus,
            powerSaveMode: data.powerSaveMode,
            thermalStatus: data.thermalStatus,
            batteryTemperature: data.batteryTemperature,
            timestamp: data.timestamp,
        };
    }
}
