// src/contracts/demo.ts
import { SmartContract, prop, method } from 'scrypt-ts';

export class Demo extends SmartContract {
    @prop()
    hash: string;

    constructor(hash: string) {
        super();
        this.hash = hash;
    }

}
