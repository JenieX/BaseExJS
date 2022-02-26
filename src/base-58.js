import {  BaseConverter, Utils } from "./core.js";

export class Base58 {
    /*
        En-/decoding to and from Base64.
        -------------------------------
        
        Regular and urlsafe charsets can be used.
        (Requires "BaseConverter", "Utils")
    */

    constructor(...args) {
        /*
            The charset defined here is used by de- and encoder.
            This can be overwritten during the call of the function.
        */

        this.charsets = {
            default: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
            bitcoin: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
            flickr:  "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
        }

        // predefined settings
        this.converter = new BaseConverter(58, 0, 0);
        this.littleEndian = false;
        this.outputType = "buffer";
        this.padding = true;
        this.signed = false;
        this.upper = null;
        this.utils = new Utils(this);
        this.version = "bitcoin";
        
        // list of allowed/disallowed args to change
        this.isMutable = {
            littleEndian: true,
            padding: true,
            signed: true,
            upper: false,
        };

        // apply user settings
        this.utils.validateArgs(args, true);
    }

    encode(input, ...args) {

        // argument validation and input settings
        const settings = this.utils.validateArgs(args); 
        let inputBytes, bytesInput;
        [inputBytes,, bytesInput] = this.utils.smartInput.toBytes(input, settings.signed, settings.littleEndian);

        let output;

        if (settings.padding && bytesInput) { 
        
            let i = 0;
            let zeroPadding = 0;
            while (!inputBytes[i]) {
                zeroPadding++;
                i++;
            }


            // Convert to Base58 string
            output = this.converter.encode(inputBytes, this.charsets[settings.version])[0];

            if (zeroPadding) {
                output = ("1".repeat(zeroPadding)).concat(output);
            }
        } else {
            // Convert to Base58 string directly
            output = this.converter.encode(inputBytes, this.charsets[settings.version])[0];
        }

        
        return output;
    }

    decode(input, ...args) {
        /* 
            Decode from base64 string to utf8-string or bytes.
            -------------------------------------------------

            @input: base32-string
            @args:
                "str"       :  tells the encoder, that output should be a string (default)
                "bytes"     :  tells the encoder, that output should be an array
                "rfc3548"   :  defines to use the charset of this version
                "rfc4648"   :  defines to use the charset of this version (default)
        */

        // Argument validation and output settings
        const settings = this.utils.validateArgs(args);

        // Make it a string, whatever goes in
        input = String(input);

        let output;
        if (settings.padding) {
            
            let i = 0;
            let zeroPadding = 0;
            while (input[i] === "1") {
                zeroPadding++;
                i++;
            }

            // Run the decoder
            output = this.converter.decode(input, this.charsets[settings.version]);

            if (zeroPadding) {
                output = Uint8Array.from([...new Array(zeroPadding).fill(0), ...output]);
            }

        } else {
            // Run the decoder
            output = this.converter.decode(input, this.charsets[settings.version]);
        }

        
        // Return the output
        return this.utils.smartOutput.compile(output, settings.outputType);
    }
}
