import React, { ReactNode } from "react";
import { AdaptiveMode } from "../scoreEngine/ScoreEngine";
import { BatteryInfo } from "../battery/BatteryTypes";
interface AdaptiveContextValue {
    batteryInfo: BatteryInfo | null;
    score: number | null;
    mode: AdaptiveMode | null;
    settings: any;
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
}
interface AdaptiveProviderProps {
    children: ReactNode;
}
export declare const AdaptiveProvider: React.FC<AdaptiveProviderProps>;
export declare const useAdaptiveContext: () => AdaptiveContextValue;
export {};
//# sourceMappingURL=AdaptiveProvider.d.ts.map