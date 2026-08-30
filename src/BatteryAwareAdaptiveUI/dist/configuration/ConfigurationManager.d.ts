import { AdaptiveUIConfig } from "./AdaptiveUIConfig";
export declare class ConfigurationManager {
    private static config;
    static configure(customConfig: Partial<AdaptiveUIConfig>): void;
    static getConfig(): AdaptiveUIConfig;
    static reset(): void;
}
//# sourceMappingURL=ConfigurationManager.d.ts.map