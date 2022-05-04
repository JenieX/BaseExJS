/**
 * [BaseEx|Base58 Converter]{@link https://github.com/UmamiAppearance/BaseExJS/src/converters/base-58.js}
 *
 * @version 0.4.0
 * @author UmamiAppearance [mail@umamiappearance.eu]
 * @license GPL-3.0
 */

import { BaseConverter, BaseTemplate } from "../core.js";

/**
 * BaseEx Base 58 Converter.
 * ------------------------
 * 
 * This is a base58 converter. Various input can be 
 * converted to a base58 string or a base58 string
 * can be decoded into various formats.
 * 
 * Available charsets are:
 *  - default
 *  - bitcoin
 *  - twitter
 */
export class Base58 extends BaseTemplate{

    /**
     * BaseEx Base58 Constructor.
     * @param {...string} [args] - Converter settings.
     */
    constructor(...args) {
        super(); 

        // charsets
        this.charsets.default = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        this.charsets.bitcoin = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        this.charsets.flickr =  "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

        // converter
        this.converter = new BaseConverter(58, 0, 0);

        // predefined settings
        this.padding = true;
        this.version = "bitcoin";
        
        // mutable extra args
        this.isMutable.padding = true;
        this.isMutable.signed = true;

        // apply user settings
        this.utils.validateArgs(args, true);
    }

    
    /**
     * BaseEx Base58 Encoder.
     * @param {*} input - Input according to the used byte converter.
     * @param  {...str} [args] - Converter settings.
     * @returns {string} - Base58 encoded string.
     */
    encode(input, ...args) {

        const applyPadding = (scope) => {

            let { inputBytes, output, settings, type } = scope;

            if (settings.padding && type !== "int") { 
                
                // Count all null bytes at the start of the array
                // stop if a byte with a value is reached. If it goes
                // all the way through it, reset index and stop.
                let i = 0;
                const end = inputBytes.length;

                // only proceed if input has a length at all
                if (end) {
                    while (!inputBytes[i]) {
                        i++;
                        if (i === end) {
                            i = 0;
                            break;
                        }
                    }

                    // The value for zero padding is the index of the
                    // first byte with a value plus one.
                    const zeroPadding = i;

                    // Set a one for every leading null byte
                    if (zeroPadding) {
                        output = ("1".repeat(zeroPadding)).concat(output);
                    }
                }
            }

            return output;
        }
    
        return super.encode(input, null, applyPadding, ...args);
    }


    /**
     * BaseEx Base58 Decoder.
     * @param {string} input - Base58 String.
     * @param  {...any} [args] - Converter settings.
     * @returns {*} - Output according to converter settings.
     */
    decode(rawInput, ...args) {
        
        // post decoding function
        const applyPadding = (scope) => {

            let { input, output, settings } = scope;

            if (settings.padding && input.length > 1) {
                
                // Count leading ones 
                let i = 0;
                while (input[i] === "1") {
                    i++;
                }
    
                // The counter becomes the zero padding value
                const zeroPadding = i;
    
                // Create a new Uint8Array with leading null bytes 
                // with the amount of zeroPadding
                if (zeroPadding) {
                    output = Uint8Array.from([...new Array(zeroPadding).fill(0), ...output]);
                }
    
            }

            return output;
        }

        return super.decode(rawInput, null, applyPadding, ...args);
    }
}
