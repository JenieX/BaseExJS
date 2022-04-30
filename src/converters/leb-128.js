import { BaseConverter, BaseTemplate } from "../core.js";
import { Utils } from "../utils.js";

export class LEB128 extends BaseTemplate {
    
    constructor(...args) {
        super(false);

        this.converter = new BaseConverter(10, 0, 0);
        this.hexlify = new BaseConverter(16, 1, 2);

        this.charsets.default = "<placeholder>",
        this.charsets.hex = "<placeholder>"
        this.version = "default";

        this.utils = new Utils(this, false);
        
        this.littleEndian = true;
        this.hasSignedMode = true;
        this.isMutable.signed = true;

        this.utils.validateArgs(args, true);
    }

    encode(input, ...args) {
        
        // argument validation and input settings
        const settings = this.utils.validateArgs(args);
        
        let inputBytes, negative;
        
        const signed = settings.signed;
        settings.signed = true;
        [inputBytes, negative,] = this.utils.inputHandler.toBytes(input, settings);

        // Convert to BaseRadix string
        let base10 = this.converter.encode(inputBytes, null, true)[0];

        let n = BigInt(base10);
        let output = new Array();
        
        if (negative) {

            if (!signed) {
                Utils.warning("Unsigned mode was switched to signed, due to a negative input.");
            }
             
            n = -n;

            for (;;) {
                const byte = Number(n & 127n);
                n >>= 7n;
                if ((n == 0 && (byte & 64) == 0) || (n == -1 && (byte & 64) != 0)) {
                    output.push(byte);
                    break;
                }
                output.push(byte | 128);
            }
        }

        else {
            for (;;) {
                const byte = Number(n & 127n);
                n >>= 7n;
                if (n == 0) {
                    output.push(byte)
                    break;
                }
                output.push(byte | 128);
            }
        }

        const Uint8Output = Uint8Array.from(output);

        if (settings.version === "hex") {
            return this.hexlify.encode(Uint8Output, "0123456789abcdef", false)[0];
        }

        return Uint8Output;
    }

    decode(input, ...args) {
        
        // Argument validation and output settings
        const settings = this.utils.validateArgs(args);

        if (settings.version === "hex") {
            input = this.hexlify.decode(String(input), "0123456789abcdef", false);
        } else if (input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        } 

        input = Array.from(input);

        let n = 0n;
        let shiftVal = -7n;
        let byte;

        for (byte of input) {
            shiftVal += 7n;
            n += (BigInt(byte & 127) << shiftVal);
        }
        
        if (settings.signed && (byte & 64) != 0) {
            n |= -(1n << shiftVal + 7n);
        }

        // Test for a negative sign
        let decimalNum, negative;
        [decimalNum, negative] = this.utils.extractSign(n.toString());

        const output = this.converter.decode(decimalNum, "0123456789", true);

        // Return the output
        return this.utils.outputHandler.compile(output, settings.outputType, true, negative);
    }
}
