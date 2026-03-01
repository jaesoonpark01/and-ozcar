import { TelemetryService } from './TelemetryService';

/**
 * OBD-II Simulator for STN2120 / STM32G4
 * Generates realistic vehicle data for testing ozcar data pipelines.
 */
export class OBDSimulator {
    private static intervalId: any = null;
    private static carId: string = 'OZ-DEV-SIM-001';
    private static sessionId: string = `SESSION-${Date.now()}`;

    // Simulated State
    private static state = {
        rpm: 800,
        speed: 0,
        throttle: 0,
        load: 20,
        voltage: 14.2
    };

    static start(updateIntervalMs: number = 100) {
        if (this.intervalId) return;

        console.log(`ozcar: Starting OBD-II Simulator [${this.carId}]`);
        this.intervalId = setInterval(() => {
            this.simulateDriving();
            this.broadcastToTelemetryService();
        }, updateIntervalMs);
    }

    static stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("ozcar: OBD-II Simulator stopped.");
        }
    }

    private static simulateDriving() {
        // Randomly simulate RPM/Throttle changes
        const change = Math.random() > 0.5 ? 50 : -50;
        this.state.rpm = Math.max(800, Math.min(6500, this.state.rpm + change));

        // Speed follows RPM loosely
        this.state.speed = Math.floor(this.state.rpm / 60);

        // Voltage fluctuates slightly
        this.state.voltage = 13.8 + Math.random() * 0.8;
    }

    private static async broadcastToTelemetryService() {
        // Broadcoast multiple PIDs to simulate STN2120 Multi-Response
        await Promise.all([
            TelemetryService.processOBDData(this.carId, this.sessionId, 'RPM', this.state.rpm),
            TelemetryService.processOBDData(this.carId, this.sessionId, 'SPEED', this.state.speed),
            TelemetryService.processOBDData(this.carId, this.sessionId, 'BATTERY_VOLTAGE', this.state.voltage)
        ]);
    }
}
