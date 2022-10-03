/**
 * [BaseEx|Base64 Converter]{@link https://github.com/UmamiAppearance/BaseExJS/blob/main/src/converters/base-64.js}
 *
 * @version 0.5.0
 * @author UmamiAppearance [mail@umamiappearance.eu]
 * @license GPL-3.0
 */

import { BaseConverter, BaseTemplate } from "../core.js";

/**
 * BaseEx UUencode Converter.
 * ------------------------
 * 
 * This is a base64 converter. Various input can be 
 * converted to a base64 string or a base64 string
 * can be decoded into various formats.
 * 
 * Available charsets are:
 *  - default
 *  - urlsafe
 */
export default class UUencode extends BaseTemplate {

    /**
     * BaseEx UUencode Constructor.
     * @param {...string} [args] - Converter settings.
     */
    constructor(...args) {
        super();
        this.converter = new BaseConverter(64, 3, 4);

        // charsets
        this.charsets.default = [..."`!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_"];
        Object.defineProperty(this.padChars, "default", {
            get: () => [ this.charsets.default.at(0) ]
        });

        this.charsets.original = [" ", ...this.charsets.default.slice(1)];
        Object.defineProperty(this.padChars, "orginal", {
            get: () => [ this.charsets.original.at(0) ]
        });

        this.charsets.xx = [..."+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"];
        Object.defineProperty(this.padChars, "xx", {
            get: () => [ this.charsets.xx.at(0) ]
        });


        // predefined settings
        this.padding = true;
        this.header = false;
        this.utils.converterArgs.header = ["noheader", "header"];
        this.isMutable.header = true;
        this.isMutable.integrity = false;

        // apply user settings
        this.utils.validateArgs(args, true);
    }


    /**
     * BaseEx UUencoder.
     * @param {*} input - Input according to the used byte converter.
     * @param  {...str} [args] - Converter settings.
     * @returns {string} - UUencode string.
     */
    encode(input, ...args) {

        const format = (scope) => {

            let { output, settings, zeroPadding } = scope;

            const charset = this.charsets[settings.version];
            const outArray = [...output];
            output = (settings.header)
                ? "begin 644 base-ex uuencode\n"
                : "";

            for (;;) {
                const lArray = outArray.splice(0, 60)

                if (lArray.length !== 60) { 
                    const byteCount = this.converter.padChars(lArray.length) - zeroPadding;

                    if (byteCount > 0) {
                        output += `${charset.at(byteCount)}${lArray.join("")}\n`;
                    }
                    break;
                }
                
                output += `${charset.at(45)}${lArray.join("")}\n`;
            }

            output += `${charset.at(0)}\n`;

            if (settings.header) {
                output += "end\n";
            }


            return output;
        }
            
        return super.encode(input, null, format, ...args);
    }


    /**
     * BaseEx UUdecoder.
     * @param {string} input - UUencode String.
     * @param  {...any} [args] - Converter settings.
     * @returns {*} - Output according to converter settings.
     */
     decode(input, ...args) {

        let padChars = 0;

        const format = ({ input, settings }) => {

            const charset = this.charsets[settings.version];
            const lines = input.split("\n");
            const inArray = [];
            
            for (const line of lines) {
                const lArray = [...line];
                const byteCount = charset.indexOf(lArray.shift());
                
                if (!(byteCount > 0)) {
                    break;
                }

                inArray.push(...lArray);

                if (byteCount !== 45) {
                    padChars = this.converter.padChars(lArray.length) - byteCount;
                    break;
                }
            }

            return inArray.join("");

        }

        const removePadChars = ({ output }) => {
            if (padChars) {
                output = new Uint8Array(output.slice(0, -padChars));
            }
            return output;
        }

        return super.decode(input, format, removePadChars, ...args);
    }
}
