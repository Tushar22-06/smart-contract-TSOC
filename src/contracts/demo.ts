// src/contracts/demo.ts
import { SmartContract, prop, method } from 'scrypt-ts';

export class Demo extends SmartContract {
    @prop()
    hash: string;

    constructor(hash: string) {
        super();
        this.hash = hash;
    }

    @method()
    async unlock(message: string) {
        // Unlock logic here
        console.log(`Unlocking with message: ${message}`);
        // Perform unlock operations
        return { success: true };
    }
}
