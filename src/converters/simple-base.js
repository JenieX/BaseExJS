/**
 * [BaseEx|SimpleBase Converter]{@link https://github.com/UmamiAppearance/BaseExJS/blob/main/src/converters/leb-128.js}
 *
 * @version 0.5.0
 * @author UmamiAppearance [mail@umamiappearance.eu]
 * @license GPL-3.0
 */

import { BaseConverter, BaseTemplate } from "../core.js";


/**
 * BaseEx SimpleBase Converter.
 * ---------------------------
 * SimpleBase provides the simple mathematical base
 * conversion as known from (n).toString(radix) and
 * parseInt(n, radix).
 * 
 * The constructor needs a radix between 2-36 as the
 * first argument. In other regards it behaves pretty
 * much as any other converter. 
 */
export default class SimpleBase extends BaseTemplate {
    
    /**
     * SimpleBase Constructor.
     * @param {number} radix - Radix between 2 and 36 
     * @param  {...any} args - Converter settings.
     */
    constructor(radix, ...args) {
        super();

        if (!radix || !Number.isInteger(radix) || radix < 2 || radix > 36) {
            throw new RangeError("Radix argument must be provided and has to be an integer between 2 and 36.")
        }

        this.charsets.default = [..."0123456789abcdefghijklmnopqrstuvwxyz"].slice(0, radix);
    
        // predefined settings
        this.converter = new BaseConverter(radix, 0, 0);
        this.hasSignedMode = true;
        this.littleEndian = !(radix === 2 || radix === 16);
        this.signed = true;
        this.version = "default";
        
        // list of allowed/disallowed args to change
        this.isMutable.littleEndian = true,
        this.isMutable.upper = true;

        // apply user settings
        this.utils.validateArgs(args, true);
    }
    

    /**
     * BaseEx SimpleBase Encoder.
     * @param {*} input - Input according to the used byte converter.
     * @param  {...any} [args] - Converter settings.
     * @returns {string} - Base 2-36 encoded string.
     */
    encode(input, ...args) {
        return super.encode(input, null, null, ...args);
    }


    /**
     * BaseEx SimpleBase Decoder.
     * @param {string} input - Base 2-36 String.
     * @param  {...any} [args] - Converter settings.
     * @returns {*} - Output according to converter settings.
     */
    decode(rawInput, ...args) {

        // pre decoding function
        const normalizeInput = (scope) => {

            let { input } = scope;

            // normalize input (add leading zeros) for base 2 and 16
            if (this.converter.radix === 2) {
                const leadingZeros = (8 - (input.length % 8)) % 8;
                input = `${"0".repeat(leadingZeros)}${input}`;
            } else if (this.converter.radix === 16) {
                const leadingZeros = input.length % 2;
                input = `${"0".repeat(leadingZeros)}${input}`;
            }

            return input;
        }
        
        return super.decode(rawInput, normalizeInput, null, ...args);

    }
}
