import React from "react";
import { Image, } from "react-native";
import { useAdaptiveContext } from "./AdaptiveProvider";
export const AdaptiveImage = ({ optimizedSource, source, ...props }) => {
    var _a, _b;
    const { settings } = useAdaptiveContext();
    const imageQuality = (_b = (_a = settings === null || settings === void 0 ? void 0 : settings.image) === null || _a === void 0 ? void 0 : _a.quality) !== null && _b !== void 0 ? _b : 100;
    return (React.createElement(Image, { ...props, source: optimizedSource !== null && optimizedSource !== void 0 ? optimizedSource : source, style: [
            props.style,
            {
                opacity: imageQuality < 60 ? 0.95 : 1,
            },
        ] }));
};
