import { useAdaptiveBattery } from "./useAdaptiveBattery";
export const useAdaptiveMode = () => {
    const { mode } = useAdaptiveBattery();
    return mode;
};
