/**
 * BluetoothOBDService (2026)
 * Native Web Bluetooth Interface for OZCAR Platform
 * Supports ELM327, vLinker MC+, and standard OBD-II adapters.
 */
export class BluetoothOBDService {
    private device: any = null;
    private characteristic: any = null;
    private decoder = new TextDecoder();
    private encoder = new TextEncoder();

    // Standard OBD-II Bluetooth UUIDs (Serial Port Profile simulation over GATT)
    private static SERVICE_UUID = "00001101-0000-1000-8000-00805f9b34fb"; // SPP
    private static CHARACTERISTIC_UUID = "00001101-0000-1000-8000-00805f9b34fb";

    private isConnected = false;
    private writeQueue: string[] = [];
    private isWriting = false;

    /**
     * Request Bluetooth device and connect with retry logic
     */
    async connect(retries = 3): Promise<boolean> {
        let attempt = 0;
        while (attempt < retries) {
            try {
                console.log(`[OBD-BT] Scan attempt ${attempt + 1}/${retries}...`);
                // @ts-ignore - Web Bluetooth API
                this.device = await navigator.bluetooth.requestDevice({
                    filters: [
                        { namePrefix: 'OBD' },
                        { namePrefix: 'vLinker' },
                        { namePrefix: 'ELM327' }
                    ],
                    optionalServices: [BluetoothOBDService.SERVICE_UUID]
                });

                this.device.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));

                const server = await this.device.gatt?.connect();
                if (!server) throw new Error("GATT server connection failed");

                const service = await server.getPrimaryService(BluetoothOBDService.SERVICE_UUID);
                this.characteristic = await service.getCharacteristic(BluetoothOBDService.CHARACTERISTIC_UUID);

                await this.characteristic.startNotifications();
                this.characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
                    const value = event.target.value;
                    const str = this.decoder.decode(value);
                    this.onRawData(str);
                });

                this.isConnected = true;
                console.log("[OBD-BT] Connected to", this.device.name);
                await this.runHandshake();
                return true;
            } catch (error) {
                console.error(`[OBD-BT] Attempt ${attempt + 1} failed:`, error);
                attempt++;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        return false;
    }

    private onDisconnected() {
        console.warn("[OBD-BT] Device disconnected. Waiting for manual reconnect.");
        this.isConnected = false;
        document.dispatchEvent(new CustomEvent('obd_bt_disconnected'));
    }

    /**
     * Standard ELM327 Handshake Sequence with individual command timeouts
     */
    private async runHandshake() {
        console.log("[OBD-BT] Initializing handshake...");
        const initCmds = [
            "AT Z\r",      // Reset
            "AT E0\r",     // Echo Off
            "AT L0\r",     // Linefeeds Off
            "AT SP 6\r",   // Protocol: ISO 15765-4 CAN (500 kbaud)
            "AT SH 7E4\r"  // Set Header for BMS/EV
        ];

        for (const cmd of initCmds) {
            await this.sendCommand(cmd);
            await new Promise(r => setTimeout(r, 300)); // Breathing room for adapter
        }
        console.log("[OBD-BT] Handshake complete.");
    }

    /**
     * Robust command sending with queue to prevent overlapping GATT writes
     */
    async sendCommand(cmd: string): Promise<void> {
        if (!this.characteristic || !this.isConnected) return;

        this.writeQueue.push(cmd);
        if (this.isWriting) return;

        this.processQueue();
    }

    private async processQueue() {
        if (this.writeQueue.length === 0 || !this.characteristic) {
            this.isWriting = false;
            return;
        }

        this.isWriting = true;
        const cmd = this.writeQueue.shift()!;

        try {
            const data = this.encoder.encode(cmd);
            await this.characteristic.writeValueWithResponse(data);
        } catch (e) {
            console.error("[OBD-BT] Write error:", e);
        } finally {
            // Wait slightly before next write to ensure adapter processed
            setTimeout(() => this.processQueue(), 100);
        }
    }

    /**
     * Hook for incoming data processing
     */
    private onRawData(raw: string) {
        // Event bus or Callback to OBD3Service
        document.dispatchEvent(new CustomEvent('obd_raw_data', { detail: raw }));
    }

    /**
     * Polling logic for E-GMP Extended PIDs
     */
    async startTelemeteryStream() {
        setInterval(async () => {
            if (this.characteristic) {
                // Request Mode 21 01 (Modern Hyundai/Kia EV data)
                await this.sendCommand("21 01\r");
            }
        }, 5000); // 5s interval for major diagnostic data
    }
}

export const obdScanner = new BluetoothOBDService();
