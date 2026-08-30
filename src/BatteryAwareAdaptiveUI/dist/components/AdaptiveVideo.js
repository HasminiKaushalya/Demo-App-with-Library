import React from "react";
import { View, Text, } from "react-native";
import { useAdaptiveContext } from "./AdaptiveProvider";
export const AdaptiveVideo = ({ source, ...props }) => {
    var _a, _b;
    const { settings } = useAdaptiveContext();
    const videoSettings = settings === null || settings === void 0 ? void 0 : settings.video;
    const autoPlay = (_a = videoSettings === null || videoSettings === void 0 ? void 0 : videoSettings.autoPlay) !== null && _a !== void 0 ? _a : true;
    const quality = (_b = videoSettings === null || videoSettings === void 0 ? void 0 : videoSettings.quality) !== null && _b !== void 0 ? _b : 100;
    return (React.createElement(View, { ...props },
        React.createElement(Text, null,
            "Video Quality: ",
            quality,
            "%"),
        React.createElement(Text, null,
            "Auto Play: ",
            autoPlay ? "Enabled" : "Disabled"),
        source && (React.createElement(Text, null,
            "Source: ",
            source))));
};
