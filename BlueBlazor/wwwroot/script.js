function printInvoke() {
    window.print();
}

async function printText(text) {
    try {
        const options = {
            filters: [{ services: ['bluetooth_printer_service'] }]
        };
        const device = await navigator.bluetooth.requestDevice(options);
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('bluetooth_printer_service');
        const characteristic = await service.getCharacteristic('bluetooth_printer_characteristic');
        await characteristic.writeValue(new TextEncoder().encode(text));
        await server.disconnect();
        console.log('Texto enviado a la impresora');
    } catch (error) {
        console.error(error);
    }
}