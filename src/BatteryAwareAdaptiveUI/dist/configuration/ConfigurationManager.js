import { defaultAdaptiveUIConfig, } from "./AdaptiveUIConfig";
export class ConfigurationManager {
    static configure(customConfig) {
        ConfigurationManager.config = {
            ...defaultAdaptiveUIConfig,
            ...customConfig,
        };
    }
    static getConfig() {
        return ConfigurationManager.config;
    }
    static reset() {
        ConfigurationManager.config = {
            ...defaultAdaptiveUIConfig,
        };
    }
}
ConfigurationManager.config = {
    ...defaultAdaptiveUIConfig,
};
