class StrategyHash {
    constructor() {
        this.hash = null;
    }

    setHash(hash) {
        this.hash = new SHA256Hash();
    }
}