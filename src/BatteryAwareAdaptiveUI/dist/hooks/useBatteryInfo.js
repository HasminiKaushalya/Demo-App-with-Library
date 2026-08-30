import { useEffect, useState } from "react";
import { BatteryService } from "../battery/BatteryService";
export const useBatteryInfo = () => {
    const [batteryInfo, setBatteryInfo] = useState(null);
    useEffect(() => {
        let mounted = true;
        const loadBatteryInfo = async () => {
            try {
                const info = await BatteryService.getBatteryInfo();
                if (mounted) {
                    setBatteryInfo(info);
                }
            }
            catch (error) {
                console.error("Failed to get battery information:", error);
            }
        };
        loadBatteryInfo();
        return () => {
            mounted = false;
        };
    }, []);
    return batteryInfo;
};
