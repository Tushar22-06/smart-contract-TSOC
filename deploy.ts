// deploy.ts
import { DefaultProvider, bsv } from 'scrypt-ts';
import { Demo } from './src/contracts/demo';
import { NeucronSigner } from 'neucron-signer';
import readlineSync from 'readline-sync';

async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
    const signer = new NeucronSigner(provider);
    const amount = 1;

    await signer.login('atushar2003@dev.neucron.io', 'string');
    await Demo.loadArtifact();

    const hash = 'your_hash_here'; // Replace with actual hash value
    const instance = new Demo(hash); // Instantiate Demo with the hash
    await instance.connect(signer); // Connect instance to signer

    const deployTx = await instance.deploy(amount); // Deploy the contract
    console.log('Smart contract deployed: https://whatsonchain.com/tx/' + deployTx.id);

    await new Promise((f) => setTimeout(f, 5000));

    // Taking input using readline-sync
    const message = readlineSync.question('Enter unlock message: ');

    const { tx: callTx } = await instance.methods.unlock(message); // Call unlock method
    console.log('Contract unlocked successfully: https://whatsonchain.com/tx/' + callTx.id);
}

main();
