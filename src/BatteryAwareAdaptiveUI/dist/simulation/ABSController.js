let simulatedABS = null;
export class ABSController {
    static setABS(score) {
        if (score < 0 || score > 100) {
            throw new Error("ABS score must be between 0 and 100");
        }
        simulatedABS = score;
    }
    static getABS() {
        return simulatedABS;
    }
    static isSimulationEnabled() {
        return simulatedABS !== null;
    }
    static clearABS() {
        simulatedABS = null;
    }
}
