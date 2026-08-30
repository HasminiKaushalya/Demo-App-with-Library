import React, { createContext, useContext, } from "react";
import { useAdaptiveBattery } from "../hooks/useAdaptiveBattery";
const AdaptiveContext = createContext(undefined);
export const AdaptiveProvider = ({ children, }) => {
    const adaptiveData = useAdaptiveBattery();
    return (React.createElement(AdaptiveContext.Provider, { value: adaptiveData }, children));
};
export const useAdaptiveContext = () => {
    const context = useContext(AdaptiveContext);
    if (!context) {
        throw new Error("useAdaptiveContext must be used inside AdaptiveProvider");
    }
    return context;
};
