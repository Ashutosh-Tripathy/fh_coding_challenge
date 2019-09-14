import ShipmentUpdateListener from './challenge';


class ShipmentData {
    id: string;
    data: any;

    constructor(id: string, data: any) {
        this.id = id;
        this.data = data
    }
}

class ShipmentUpdateListenerTest {
    private shipmentUpdateListener: ShipmentUpdateListener;
    private shipment1: ShipmentData;
    private shipment1_2: ShipmentData;
    private shipment2: ShipmentData;

    constructor() {
        this.shipmentUpdateListener = new ShipmentUpdateListener();

        this.shipment1 = new ShipmentData('1', { value: 50 });
        this.shipment2 = new ShipmentData('3', { value: 40 });
        this.test1();
    }

    receiveUpdate(shipment: ShipmentData) {
        this.shipmentUpdateListener.updateShipment(shipment.id, shipment.data);
    }

    // should show error message in log.
    test1() {
        this.receiveUpdate(this.shipment1);
        this.receiveUpdate(this.shipment1);
    }


    // should work fine.
    test2() {
        this.receiveUpdate(this.shipment1);
        this.receiveUpdate(this.shipment2);
    }
}


