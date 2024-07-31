import { DefaultProvider, sha256, bsv, toByteString } from 'scrypt-ts';
import { Demo } from './src/contracts/demo';
import { NeucronSigner } from 'neucron-signer';
import readlineSync from 'readline-sync';

// Function to multiply two inputs and return the result
function multiplyInputs(input1: number, input2: number): number {
    return input1 * input2;
}

// Main async function to handle the contract deployment and interaction
async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
    const signer = new NeucronSigner(provider);
    const amount = 1;

    const email = 'atushar2003@gmail.com';
    const password = 'string'; // replace with your actual password

    console.log('Logging in with:', email);
    await signer.login(email, password);
    console.log('Logged in successfully');

    await Demo.loadArtifact();

    // Taking inputs using readline-sync
    const input1 = parseInt(readlineSync.question("Enter the first number: "));
    const input2 = parseInt(readlineSync.question("Enter the second number: "));

    // Perform multiplication
    const result = multiplyInputs(input1, input2);
    console.log(`The result of multiplying ${input1} and ${input2} is: ${result}`);

    // Convert result to a string and hash it
    const message = toByteString(result.toString(), true);
    const hash = sha256(message);

    // Pass the hash to the constructor of the Demo contract
    const instance = new Demo(hash);
    await instance.connect(signer);

    const deployTx = await instance.deploy(amount);
    console.log(
        'smart lock deployed : https://whatsonchain.com/tx/' + deployTx.id
    );

    await new Promise((f) => setTimeout(f, 5000));

    const { tx: callTx } = await instance.methods.unlock(message);
    console.log(
        'contract unlocked successfully : https://whatsonchain.com/tx/' +
            callTx.id
    );
}

main();
