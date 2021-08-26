class Base16 {
    constructor() {
        this.utils = this.utilsConstructor();
    }

    encode(input, ...args) {

        args = this.utils.validateArgs(args);
        const inputType = (args.includes("array")) ? "array" : "str";
        input = this.utils.validateInput(input, inputType);

        const inputBytes = (inputType === "str") ? new TextEncoder().encode(input) : input;
        const output = Array.from(inputBytes).map(b => b.toString(16).padStart(2, "0")).join("");

        return output;
    }

    decode(input, ...args) {
        /*
            inspired by:
            https://gist.github.com/don/871170d88cf6b9007f7663fdbc23fe09
        */
        
        args = this.utils.validateArgs(args);
        const outputType = (args.includes("array")) ? "array" : "str";
        
        // remove the leading 0x if present
        input = input.replace(/^0x/, '');

        // ensure even number of characters
        if (Boolean(input.length % 2)) {
            input = "0".concat(input);
        }
        
        // Split the string into pairs of octets, convert to integers (byte values) 
        // and create an Uint8array from the output.
        
        const byteArray = input.match(/../g).map(
            octets => {
                const b = parseInt(octets, 16);
                this.utils.validateHex(b); 
                return b;
            }
        );
        const uInt8 = Uint8Array.from(byteArray);

        if (outputType === "array") {
            return uInt8;
        } else {
            return new TextDecoder().decode(uInt8);
        }
    }

    utilsConstructor() {
        // settings for validation
        const validArgs = ["str", "array"];
        const errorMessage = "Valid arguments for in- and output-type are 'str' and 'array'.";

        return {
            validateArgs: (args) => {
                const loweredArgs = [];
                if (Boolean(args.length)) {
                    args.forEach(arg => {
                        arg = String(arg).toLowerCase();
                        if (!validArgs.includes(arg)) {
                            throw new TypeError(`Invalid argument: '${arg}'\n${errorMessage}`);
                        }
                        loweredArgs.push(arg);
                    });
                }
                return loweredArgs;
            },

            validateHex: (bytes) => {
                if (isNaN(bytes)) {
                    throw new TypeError("The provided input is not a valid hexadecimal string.");
                }
            },

            validateInput: (input, inputType) => {
                if (inputType === "str") {
                    if (typeof input !== "string") {
                        this.utils.warning("Your input was converted into a string.");
                    }
                    return String(input);
                } else {
                    if (typeof input === "string") {
                        throw new TypeError("Your provided input is a string, but some kind of (typed) Array is expected.");
                    } else if (typeof input !== 'object') {
                        throw new TypeError("Input must be some kind of (typed) Array if input type is set to 'array'.");
                    }
                    return input; 
                }
            },

            warning: (message) => {
                if (console.hasOwnProperty("warn")) {
                    console.warn(message);
                } else {
                    console.log(`___\n${message}\n`);
                }
            }
        }
    }
}

class Base32 {
    constructor(standard=null) {
        
        this.standards = ["rfc3548", "rfc4648"];

        if (standard && !this.standards.includes(standard)) {
            const versionString = this.standards.map(s => `'${s}'`).join(" and ");
            throw new TypeError(`Unknown standard.\nThe options are: ${versionString}`);
        }
        this.standard = standard;

        this.charsets = {
            rfc3548: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
            rfc4648: "0123456789ABCDEFGHIJKLMNOPQRSTUV" 
        }

        this.utils = this.utilsConstructor();
    }
    
    encode(input, ...args) {
        
        args = this.utils.validateArgs(args);
        
        let standard = "rfc4648";
        if (Boolean(this.standard)) {
            standard = this.standard;
        } else if (args.includes("rfc3548")) {
            standard = "rfc3548";
        }

        const inputType = (args.includes("array")) ? "array" : "str";
        input = this.utils.validateInput(input, inputType);
        const inputBytes = (inputType === "str") ? new TextEncoder().encode(input) : input;
        const chars = this.charsets[standard];

        let binaryStr = Array.from(inputBytes).map(b => b.toString(2).padStart(8, "0")).join("");

        const bitGroups = binaryStr.match(/.{1,40}/g);

        let output = "";
        bitGroups.map(function(group) {
            const blocks = group.match(/.{1,5}/g).map(s=>s.padEnd(5, '0'));
            blocks.map(function(block) {
                const charIndex = parseInt(block, 2);
                output = output.concat(chars[charIndex]);
            });
        });
        const missingChars = output.length % 8;
        if (Boolean(missingChars)) {
            output = output.padEnd(output.length + 8-missingChars, "=");
        }

        return output;
    }

    decode(input, ...args) {

        args = this.utils.validateArgs(args);

        let standard = "rfc4648";
        if (this.standard) {
            standard = this.standard;
        } else if (args.includes("rfc3548")) {
            standard = "rfc3548";
        }

        const outputType = (args.includes("array")) ? "array" : "str";
        const chars = this.charsets[standard];
        
        let binaryStr = "";

        input.split('').map((c) => {
            const index = chars.indexOf(c);
            if (index > -1) {                                       // -1 is the index if the char was not found, "=" was ignored
                binaryStr = binaryStr.concat(index.toString(2).padStart(5, "0"));
            }
        });
        
        const byteArray = binaryStr.match(/.{8}/g).map(bin => parseInt(bin, 2))
        const uInt8 = Uint8Array.from(byteArray);

        if (outputType === "array") {
            return uInt8;
        } else {
            return new TextDecoder().decode(uInt8);
        }
    }

    utilsConstructor() {
        // settings for validation
        const validArgs = ["str", "array", ...this.standards];
        const versionString = this.standards.map(s => `'${s}'`).join(" and ");
        const errorMessage = `The options are ${versionString} for the rfc-standard. Valid arguments for in- and output-type are 'str' and 'array'.`;

        return {
            validateArgs: (args) => {
                const loweredArgs = [];
                if (Boolean(args.length)) {
                    args.forEach(arg => {
                        arg = String(arg).toLowerCase();
                        if (!validArgs.includes(arg)) {
                            throw new TypeError(`Invalid argument: '${arg}'\n${errorMessage}`);
                        }
                        loweredArgs.push(arg);
                    });
                }
                return loweredArgs;
            },

            validateInput: (input, inputType) => {
                if (inputType === "str") {
                    if (typeof input !== "string") {
                        this.utils.warning("Your input was converted into a string.");
                    }
                    return String(input);
                } else {
                    if (typeof input === "string") {
                        throw new TypeError("Your provided input is a string, but some kind of (typed) Array is expected.");
                    } else if (typeof input !== 'object') {
                        throw new TypeError("Input must be some kind of (typed) Array if input type is set to 'array'.");
                    }
                    return input; 
                }
            },

            warning: (message) => {
                if (console.hasOwnProperty("warn")) {
                    console.warn(message);
                } else {
                    console.log(`___\n${message}\n`);
                }
            }
        }
    }
}


class Base64 {
    constructor(charset=null) {

        if (charset && !(charset === "default" || charset === "urlsafe")) {
            throw new TypeError("Unknown charset.\nThe options are 'standard' and 'urlsafe'.");
        }
        this.charset = charset;
        
        const base62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        this.charssets = {
            default: base62.concat("+/"),
            urlsafe: base62.concat("-_")
        }

        this.utils = this.utilsConstructor();
    }

    encode(input, ...args) {
        args = this.utils.validateArgs(args);

        const inputType = (args.includes("array")) ? "array" : "str";
        input = this.utils.validateInput(input, inputType);

        let charset = "default";
        if (Boolean(this.charset)) {
            charset = this.charset;
        } else if (args.includes("urlsafe")) {
            charset = "urlsafe";
        }

        const chars = this.charssets[charset];
        const inputBytes = (inputType === "str") ? new TextEncoder().encode(input) : input;
        const binaryStr = Array.from(inputBytes).map(b => b.toString(2).padStart(8, "0")).join("");
        const bitGroups = binaryStr.match(/.{1,24}/g);
    
        let output = "";
        bitGroups.map(function(group) {
            const blocks = group.match(/.{1,6}/g).map(s=>s.padEnd(6, '0'));
            blocks.map(function(block) {
                const charIndex = parseInt(block, 2);
                output = output.concat(chars[charIndex]);
            });
        });
        const missingChars = output.length % 4;
        if (Boolean(missingChars)) {
            output = output.padEnd(output.length + 4-missingChars, "=");
        }
    
        return output;
    }

    decode(input, ...args) {
        args = this.utils.validateArgs(args);

        let charset = "default";
        if (Boolean(this.charset)) {
            charset = this.charset;
        } else if (args.includes("urlsafe")) {
            charset = "urlsafe";
        }
    
        const outputType = (args.includes("array")) ? "array" : "str";
        const chars = this.charssets[charset];
        
        let binaryStr = "";

        input.split('').map((c) => {
            const index = chars.indexOf(c);
            if (index > -1) {                                       // -1 is the index if the char was not found, "=" was ignored
                binaryStr = binaryStr.concat(index.toString(2).padStart(6, "0"));
            }
        });
        
        const byteArray = binaryStr.match(/.{8}/g).map(bin => parseInt(bin, 2))
        const uInt8 = Uint8Array.from(byteArray);

        if (outputType === "array") {
            return uInt8;
        } else {
            return new TextDecoder().decode(uInt8);
        }
    }

    utilsConstructor() {
        // settings for validation
        const validArgs = ["default", "urlsafe", "str", "array"];
        const errorMessage = "The options are 'default' and 'urlsafe' for the charset.\nValid arguments for in- and output-type are 'str' and 'array'.";

        return {
            validateArgs: (args) => {
                const loweredArgs = [];
                if (Boolean(args.length)) {
                    args.forEach(arg => {
                        arg = String(arg).toLowerCase();
                        if (!validArgs.includes(arg)) {
                            throw new TypeError(`Invalid argument: '${arg}'\n${errorMessage}`);
                        }
                        loweredArgs.push(arg);
                    });
                }
                return loweredArgs;
            },

            validateInput: (input, inputType) => {
                if (inputType === "str") {
                    if (typeof input !== "string") {
                        this.utils.warning("Your input was converted into a string.");
                    }
                    return String(input);
                } else {
                    if (typeof input === "string") {
                        throw new TypeError("Your provided input is a string, but some kind of (typed) Array is expected.");
                    } else if (typeof input !== 'object') {
                        throw new TypeError("Input must be some kind of (typed) Array if input type is set to 'array'.");
                    }
                    return input; 
                }
            },

            warning: (message) => {
                if (console.hasOwnProperty("warn")) {
                    console.warn(message);
                } else {
                    console.log(`___\n${message}\n`);
                }
            }
        }
    }
}


class Base85 {

    constructor(version=null) {
        
        this.versions = ["adobe", "ascii85", "rfc1924", "z85"];
        this.version = null;

        if (version) {
            version = String(version).toLowerCase();
            if (this.versions.includes(version)) {
                this.version = version;
            } else {
                const versionString = this.versions.map(v => `'${v}'`).join(", ");
                throw new TypeError(`Available versions are: ${versionString}`);
            }
        }

        this.charsets = {
            rfc1924: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~",
            z85: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#"
        }

        this.utils = this.utilsConstructor();
    }
    
    encode(input, ...args) {
        args = this.utils.validateArgs(args);

        const inputType = (args.includes("array")) ? "array" : "str";
        input = this.utils.validateInput(input, inputType);
        let output = "";
        let add = 0;

        let version = this.version;
        if (!version) {
            version = "ascii85";
            args.forEach(arg => {
                if (this.versions.includes(arg)) version = arg;
            });
        }
        
        if (version === "rfc1924") {
            const date = new Date();
            if (date.getMonth() === 3 && date.getDate() === 1) {
                console.log("         __\n _(\\    |@@|\n(__/\\__ \\--/ __\n   \\___|----|  |   __\n       \\ }{ /\\ )_ / _\\\n       /\\__/\\ \\__O (__\n      (--/\--)    \\__/\n      _)(  )(_\n     `---''---`");
            } else {
                const ts = date.getTime();
                date.setMonth(3, 1);
                date.setHours(0, 0, 0);
                if (date.getTime() < ts) date.setFullYear(date.getFullYear()+1);
                const dist = date - ts;
                const d = Math.floor(dist / 86400000);
                const H = Math.floor((dist % 86400000) / 3600000);
                const M = Math.floor((dist % 3600000) / 60000);
                const msg = `Time left: ${d} days, ${H} hours, ${M} minutes`;
                this.utils.warning("Only the charset is used. The input is not taken as a 128 bit integer. (because this is madness)");
                this.utils.warning(msg);
            }
        } else if (version === "adobe" || version === "ascii85") {
            add = 33;
        } 

        const inputBytes = (inputType === "str") ? new TextEncoder().encode(input) : input;
        const l = inputBytes.length;

        let zeroPadding = 0;

        for (let i=0; i<l; i+=4) {
            let subArray = inputBytes.subarray(i, i+4);

            if (subArray.length < 4) {
                zeroPadding = 4 - subArray.length;
                const paddedArray = new Uint8Array(4);
                paddedArray.set(subArray);
                subArray = paddedArray;
            }
            
            let n = 0;
            subArray.forEach((b, j) => n += b * this.utils.pow256[j]);

            const b85Array = [];

            let q = n, r;                                              // initialize quotient and remainder
            while (true) {

                [q, r] = this.utils.divmod(q, 85);
                b85Array.unshift(r + add);

                if (q < 85) {
                    b85Array.unshift(q + add);
                    break;
                }
            }

            if (version === "ascii85" || version === "adobe") {
                const b85uInt8 = Uint8Array.from(new Array(5).fill(add));
                b85uInt8.set(b85Array);
                let ascii = this.utils.ascii.decode(b85uInt8);
                if (ascii === "!!!!!") ascii = "z";
                output = output.concat(ascii);
            } else if (version === "rfc1924" || version === "z85") {
                b85Array.forEach(
                    charIndex => output = output.concat(this.charsets[version][charIndex])
                );
            }
        }

        output = output.slice(0, output.length-zeroPadding);
        if (version === "adobe") {
            output = `<~${output}~>`;
        }
        
        return output;
    }

    decode(input, ...args) {
        args = this.utils.validateArgs(args);

        const outputType = (args.includes("array")) ? "array" : "str";

        input = input.replace(/\s/g,'');        //remove all whitespace from input
        let l;
        let sub = 0;
        let inputBytes;
        
        let version = this.version;
        if (!version) {
            version = "ascii85";
            args.forEach(arg => {
                if (this.versions.includes(arg)) version = arg;
            });
        }
        
        if (version === "rfc1924" || version === "z85") {
            l = input.length;
            
            inputBytes = new Uint8Array(l);
            input.split('').forEach((c, i) => inputBytes[i] = this.charsets[version].indexOf(c));  //create bytes from corresponding charset
            
            if (version === "rfc1924") {
                this.utils.warning("You might have been fooled. (It works never the less, but only the charset is used).");
            }
        } else if (version === "adobe" || version === "ascii85") {
            if (version === "adobe") input = input.slice(2, input.length-2);
            
            sub = 33;
            inputBytes = this.utils.ascii.encode(input);
            l = inputBytes.length;
        }   
        
        let uPadding = 0;
        let b256Array = new Array();
        for (let i=0; i<l; i+=5) {
            let subArray = inputBytes.subarray(i, i+5);

            if (subArray.length !== 5) {
                uPadding = 5 - subArray.length;
                const paddedArray = Uint8Array.from(Array(5).fill(84+sub));
                paddedArray.set(subArray);
                subArray = paddedArray;
            }
            
            const subArray256 = [];

            let n = 0;
            subArray.forEach((b, j) => n += (b-sub) * this.utils.pow85[j]);

            let q = n, r;
            while (true) {
                [q, r] = this.utils.divmod(q, 256);
                subArray256.unshift(r);
                
                if (q < 256) {
                    subArray256.unshift(q);
                    break;
                }
            }
            
            b256Array = b256Array.concat(subArray256);
        }

        const uInt8 = Uint8Array.from(b256Array.slice(0, b256Array.length-uPadding));

        if (outputType === "array") {
            return uInt8;
        } else if (outputType === "ipv6") {
            return this.uint8ToIpv6(uInt8);
        } else {
            const outputStr = new TextDecoder().decode(uInt8);
            return outputStr;
        }

    }

    utilsConstructor() {
        // settings for validation
        const validArgs = ["str", "array", ...this.versions];
        const versionString = this.versions.map(v=>`'${v}'`).join(", ");
        const errorMessage = `Valid arguments for in- and output-type are 'str' and 'array'.\nEn- and decoder have the options: ${versionString}`;

        const ASCIIdecoder = new TextDecoder("ascii");
        
        return {
            ascii: {
                decode: (input) => ASCIIdecoder.decode(input),
                encode: (input) => Uint8Array.from(input.split("").map(c => c.charCodeAt(0)))
            },

            divmod: (x, y) => [Math.floor(x / y), x % y],

            pow256: [16777216, 65536, 256, 1],

            pow85: [52200625, 614125, 7225, 85, 1],

            validateArgs: (args) => {
                const loweredArgs = [];
                if (Boolean(args.length)) {
                    args.forEach(arg => {
                        arg = String(arg).toLowerCase();
                        if (!validArgs.includes(arg)) {
                            throw new TypeError(`Invalid argument: '${arg}'\n${errorMessage}`);
                        }
                        loweredArgs.push(arg);
                    });
                }
                return loweredArgs;
            },

            validateInput: (input, inputType) => {
                if (inputType === "str") {
                    if (typeof input !== "string") {
                        this.utils.warning("Your input was converted into a string.");
                    }
                    return String(input);
                } else {
                    if (typeof input === "string") {
                        throw new TypeError("Your provided input is a string, but some kind of (typed) Array is expected.");
                    } else if (typeof input !== 'object') {
                        throw new TypeError("Input must be some kind of (typed) Array if input type is set to 'array'.");
                    }
                    return input; 
                }
            },

            warning: (message) => {
                if (console.hasOwnProperty("warn")) {
                    console.warn(message);
                } else {
                    console.log(`___\n${message}\n`);
                }
            }
        }
    }
}


class BaseEx {
    constructor() {
        this.base16 = new Base16();
        this.base32_rfc3548 = new Base32("rfc3548");
        this.base32_rfc4648 = new Base32("rfc4648");
        this.base64 = new Base64("default");
        this.base64_urlsafe = new Base64("urlsafe");
        this.base85adobe = new Base85("adobe");
        this.base85ascii = new Base85("ascii85");
        this.base85_z85 = new Base85("z85");
    }
}

//export {Base16, Base32, Base64, Base85, BaseEx}
