import { useCallback, useEffect, useState } from "react";
import { BatteryManager } from "../battery/BatteryManager";
export const useAdaptiveBattery = () => {
    var _a, _b, _c, _d;
    const [adaptiveData, setAdaptiveData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const updateBatteryData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await BatteryManager.getAdaptiveSettings();
            setAdaptiveData(data);
        }
        catch (err) {
            setError(err instanceof Error
                ? err
                : new Error("Failed to get adaptive battery data"));
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        updateBatteryData();
    }, [updateBatteryData]);
    return {
        batteryInfo: (_a = adaptiveData === null || adaptiveData === void 0 ? void 0 : adaptiveData.batteryInfo) !== null && _a !== void 0 ? _a : null,
        score: (_b = adaptiveData === null || adaptiveData === void 0 ? void 0 : adaptiveData.score) !== null && _b !== void 0 ? _b : null,
        mode: (_c = adaptiveData === null || adaptiveData === void 0 ? void 0 : adaptiveData.mode) !== null && _c !== void 0 ? _c : null,
        settings: (_d = adaptiveData === null || adaptiveData === void 0 ? void 0 : adaptiveData.settings) !== null && _d !== void 0 ? _d : null,
        loading,
        error,
        refresh: updateBatteryData,
    };
};
