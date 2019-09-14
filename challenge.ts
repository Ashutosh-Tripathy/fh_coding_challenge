async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

export default class ShipmentSearchIndex {
    async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()
        console.log(`update ${id}@${
            startTime.toISOString()
            } finished@${
            endTime.toISOString()
            }`
        )

        return { startTime, endTime }
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any)
}

class ShipmentUpdateListener implements ShipmentUpdateListenerInterface {
    private queue: string[];
    private shipmentSearchIndex: ShipmentSearchIndex;

    constructor() {
        this.queue = [];
        this.shipmentSearchIndex = new ShipmentSearchIndex();
    }

    async receiveUpdate(id: string, shipmentData: any) {
            if (this.queue.indexOf(id) > -1) {
                const message = `Invalid request. Upadte request for id: ${id}already in queue.`
                console.error(message);
                return;
            }
            this.queue.push(id);
            try {
                await this.shipmentSearchIndex.updateShipment(id, shipmentData);
                console.log(`Successfuly updated search index for shipment id: ${id}`);
            } catch (e) {
                console.error(`Update failed. error: ${e.message}`);
            } finally {
                this.queue = this.queue.filter(qid => id !== qid);
            }
    }

   // async receiveUpdate(id: string, shipmentData: any) {
   //     return new Promise(async (resolve, reject) => {
   //         if (this.queue.indexOf(id) > -1) {
   //             const message = `Invalid request. Upadte request for id: ${id}already in queue.`
   //             console.error(message);
   //             reject(new ConcurrentUpdateError(message));
   //         }
   //         this.queue.push(id);
   //         try {
   //             await this.shipmentSearchIndex.updateShipment(id, shipmentData);
   //             console.log(`Successfuly updated search index for shipment id: ${id}`);
   //         } catch (e) {
   //             console.error(`Update failed. error: ${e.message}`);
   //             reject(e);
   //         } finally {
   //             this.queue = this.queue.filter(qid => id !== qid);
   //         }
   //         resolve();
   //     }
   //     )
   // }
}

// class ConcurrentUpdateError extends Error {
//     constructor(m: string) {
//         super(m);

//         //Object.setPrototypeOf(this, ConcurrentUpdateError.prototype);
//     }
// }
