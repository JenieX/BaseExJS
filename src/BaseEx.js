

class Base16 {
    /*
        Standalone en-/decoding to and from base16 (hexadecimal).
        (Requires "BaseExUtils")
    */

    constructor(input="str", output="str") {
        this.IOtypes = ["str", "bytes"];
        this.utils = new BaseExUtils(this);

        [this.defaultInput, this.defaultOutput] = this.utils.validateArgs([input, output]);
    }

    encode(input, ...args) {
        /* 
            Hex encoder from string or bytes.
            --------------------------------

            @input: string or (typed) array of bytes
            @args:
                "str"       :  tells the encoder, that input is a string (default)
                "bytes"     :  tells the encoder, that input is an array
        */
        
        // argument validation and input settings
        args = this.utils.validateArgs(args);
        const inputType = this.utils.setIOType(args, "in");
        input = this.utils.validateInput(input, inputType);

        // convert to an array of bytes if necessary
        const inputBytes = (inputType === "str") ? new TextEncoder().encode(input) : input;
        
        // convert all bytes to hex and join to a string
        const output = Array.from(inputBytes).map(
            b => b.toString(16).padStart(2, "0")
        ).join("");

        return output;
    }

    decode(input, ...args) {
        /*
            Hex string decoder.
            ------------------

            @input: hex-string
            @args:
                "str"       :  tells the encoder, that output should be a utf8-string (default)
                "bytes"     :  tells the encoder, that output should be an array of bytes
            ___________
            inspired by:
            https://gist.github.com/don/871170d88cf6b9007f7663fdbc23fe09
        */
        
        // Argument validation and output settings
        args = this.utils.validateArgs(args);
        const outputType = this.utils.setIOType(args, "out");
        
        // Remove the leading 0x if present
        input = String(input).replace(/^0x/, '');
        
        // Test if valid hex
        if (Boolean(input.match(/[^0-9A-Fa-f]/g))) {
            throw new TypeError("The provided input is not a valid hexadecimal string.");
        }

        // Ensure even number of characters
        if (Boolean(input.length % 2)) {
            input = "0".concat(input);
        }
        
        // Split the string into pairs of octets,
        // convert to integers (bytes) and create
        // an Uint8array from the output.

        const uInt8 = Uint8Array.from(
            input.match(/../g).map(
                octets => parseInt(octets, 16)
            )
        );

        if (outputType === "bytes") {
            return uInt8;
        } else {
            return new TextDecoder().decode(uInt8);
        }
    }
}


class Base32 {
    /*
        Standalone en-/decoding to and from base32.
        Uses RFC standard 4658 by default (as used e.g
        for (t)otp keys), RFC 3548 is also supported.
        (Requires "BaseExUtils")
    */
    
    constructor(version="rfc4648", input="str", output="str", padding=true) {
        /*
            The RFC standard defined here is used by de- and encoder.
            This can still be overwritten during the call of the
            function.
        */

        this.charsets = {
            rfc3548: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
            rfc4648: "0123456789ABCDEFGHIJKLMNOPQRSTUV" 
        }

        this.padding = Boolean(padding);
        this.IOtypes = ["str", "bytes"];
        this.utils = new BaseExUtils(this);
        
        [this.version, this.defaultInput, this.defaultOutput] = this.utils.validateArgs([version, input, output]);
    }
    
    encode(input, ...args) {
        /* 
            Encode from string or bytes to base32.
            -------------------------------------

            @input: string or (typed) array of bytes
            @args:
                "str"       :  tells the encoder, that input is a string (default)
                "bytes"     :  tells the encoder, that input is an array
                "rfc3548"   :  sets the used charset to this standard
                "rfc4648"   :  sets the used charset to this standard
        */

        // Argument validation and output settings
        args = this.utils.validateArgs(args);
        const inputType = this.utils.setIOType(args, "in");
        const version = this.utils.getVersion(args);
        input = this.utils.validateInput(input, inputType);

        // Convert to bytes if input is a string
        const inputBytes = (inputType === "str") ? new TextEncoder().encode(input) : input;

        // Convert to binary string
        let binaryStr = Array.from(inputBytes).map(
            b => b.toString(2).padStart(8, "0")
        ).join("");
        
        // Devide the binary string into groups of 40 bits. Each 
        // group of 40 bits is seperated into blocks of 5 bits.
        // Those are converted into integers which are used as 
        // an index. The corresponding char is picked from the
        // charset and appended to the output string.

        let output = "";
        binaryStr.match(/.{1,40}/g).forEach(group => {
            group.match(/.{1,5}/g).forEach(block => {
                    block = block.padEnd(5, '0');
                    const charIndex = parseInt(block, 2);
                    output = output.concat(this.charsets[version][charIndex]);
                }
            );
        });

        // The length of a base32 string (if padding is used)
        // should not return a remainder if divided by eight.
        // If they do, missing characters are padded with a "=".

        const missingChars = output.length % 8 * this.padding;
        if (Boolean(missingChars)) {
            output = output.padEnd(output.length + 8-missingChars, "=");
        }

        return output;
    }

    decode(input, ...args) {
        /* 
            Decode from base32 string to utf8-string or bytes.
            -------------------------------------------------

            @input: base32-string
            @args:
                "str"       :  tells the encoder, that output should be a string (default)
                "bytes"     :  tells the encoder, that output should be an array
                "rfc3548"   :  defines to use the charset of this version
                "rfc4648"   :  defines to use the charset of this version (default)
        */

        // Argument validation and output settings
        args = this.utils.validateArgs(args);
        const version = this.utils.getVersion(args);
        const outputType = this.utils.setIOType(args, "out");

        // Split the input into individual characters
        // Take the position (index) of the char in the
        // set and convert it into binary. The bits are
        // all concatinated to one string of binaries.

        let binaryStr = "";

        input.split('').map((c) => {
            const index = this.charsets[version].indexOf(c);
            if (index > -1) {                                                     // -1 is the index if the char is not in the set, "=" e.g. gets ignored
                binaryStr = binaryStr.concat(index.toString(2).padStart(5, "0"));
            }
        });
        
        // Now the binary string can be (re)grouped 
        // into regular bytes. Those get plugged into
        // an Uint8array.

        const uInt8 = Uint8Array.from(
            binaryStr.match(/.{8}/g).map(bin => 
                parseInt(bin, 2)
            )
        );

        // Convert to utf8-string if requested
        if (outputType === "bytes") {
            return uInt8;
        } else {
            return new TextDecoder().decode(uInt8);
        }
    }
}


class Base64 {
    /*
        Standalone en-/decoding to and from base64.
        Regular and urlsafe charsets can be used.
        (Requires "BaseExUtils")
    */

    constructor(version="default", input="str", output="str", padding=true) {
        /*
            The charset defined here is used by de- and encoder.
            This can still be overwritten during the call of the
            function.
        */

        const b62Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        this.charsets = {
            default: b62Chars.concat("+/"),
            urlsafe: b62Chars.concat("-_")
        }

        this.padding = Boolean(padding);
        this.IOtypes = ["str", "bytes"];
        this.utils = new BaseExUtils(this);
        
        [this.version, this.defaultInput, this.defaultOutput] = this.utils.validateArgs([version, input, output]);
    }

    encode(input, ...args) {
        /* 
            Encode from string or bytes to base64.
            -------------------------------------

            @input: string or (typed) array of bytes
            @args:
                "str"       :  tells the encoder, that input is a string (default)
                "bytes"     :  tells the encoder, that input is an array
                "default"   :  sets the used charset to this variant (default)
                "urlsafe"   :  sets the used charset to this variant
        */
       
        // Argument validation and input settings
        args = this.utils.validateArgs(args);
        const inputType = this.utils.setIOType(args, "in");
        const version = this.utils.getVersion(args);
        input = this.utils.validateInput(input, inputType);

        // Convert to bytes if input is a string
        const inputBytes = (inputType === "str") ? new TextEncoder().encode(input) : input;
        
        // Convert to binary string
        const binaryStr = Array.from(inputBytes).map(
            b => b.toString(2).padStart(8, "0")
        ).join("");

        // Devide the binary string into groups of 24 bits. Each 
        // group of 24 bits is seperated into blocks of 6 bits.
        // Those are converted into integers which are used as 
        // an index. The corresponding char is picked from the
        // charset and appended to the output string.
        
        let output = "";
        binaryStr.match(/.{1,24}/g).forEach(group => {
            group.match(/.{1,6}/g).forEach(block => {
                block = block.padEnd(6, "0");
                const charIndex = parseInt(block, 2);
                output = output.concat(this.charsets[version][charIndex]);
            })
        });

        // The length of a base62 string (if padding is used)
        // should not return a remainder if divided by four.
        // If they do, missing characters are padded with a "=".

        const missingChars = output.length % 4 * this.padding;
        if (Boolean(missingChars)) {
            output = output.padEnd(output.length + 4-missingChars, "=");
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
                "default"   :  sets the used charset to this variant (default)
                "urlsafe"   :  sets the used charset to this variant
        */

        // Argument validation and output settings
        args = this.utils.validateArgs(args);
        const version = this.utils.getVersion(args);
        const outputType = this.utils.setIOType(args, "out");
 
        // Split the input into individual characters
        // Take the position (index) of the char in the
        // set and convert it into binary. The bits are
        // all concatinated to one string of binaries.
        
        let binaryStr = "";

        input.split('').map((c) => {
            const index = this.charsets[version].indexOf(c);
            if (index > -1) {
                binaryStr = binaryStr.concat(index.toString(2).padStart(6, "0"));
            }
        });
        

        // Now the binary string can be (re)grouped 
        // into regular bytes. Those get plugged into
        // an Uint8array.

        const uInt8 = Uint8Array.from(
            binaryStr.match(/.{8}/g).map(bin => 
                parseInt(bin, 2)
            )    
        );

        // Convert to utf8-string if requested
        if (outputType === "bytes") {
            return uInt8;
        } else {
            return new TextDecoder().decode(uInt8);
        }
    }
}


class Base85 {
    /*
        Standalone en-/decoding to and from base85.
        Four versions are supported: 
          
            * adobe
            * ascii85
            * rfc1924
            * z85
        
        Adobe and ascii85 are the basically the same.
        Adobe will produce the same output, apart from
        the <~wrapping~>.
        
        Z85 is an important variant, because of the 
        more interpreter-friendly characterset.
        
        The RFC 1924 version is a hybrid. It is not
        using the mandatory 128 bit calculation.
        Instead only the charset is used. Do not use this
        for any real project. (Keep in mind, that is
        based on a joke).

        (Requires "BaseExUtils")
        
    */
    constructor(version="ascii85", input="str", output="str") {

        const asciiChars = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu";
        this.charsets = {
            ascii85: asciiChars,
            adobe: asciiChars,
            rfc1924: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~",
            z85: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#",
        }
        
        this.IOtypes = ["str", "bytes"];
        this.utils = new BaseExUtils(this);
        this.expandUtils();
        
        [this.version, this.defaultInput, this.defaultOutput] = this.utils.validateArgs([version, input, output]);
    }
    
    encode(input, ...args) {

        // Argument validation and input settings
        args = this.utils.validateArgs(args);
        const inputType = this.utils.setIOType(args, "in");
        const version = this.utils.getVersion(args);
        input = this.utils.validateInput(input, inputType);

        const inputBytes = (inputType === "str") ? new TextEncoder().encode(input) : input;

        let output = "";
        let zeroPadding = 0;

        for (let i=0, l=inputBytes.length; i<l; i+=4) {
            let subArray = inputBytes.slice(i, i+4);

            if (subArray.length < 4) {
                zeroPadding = 4 - subArray.length;
                const paddedArray = new Uint8Array(4);
                paddedArray.set(subArray);
                subArray = paddedArray;
            }
            
            let n = 0;
            subArray.forEach((b, j) => n += b * this.utils.pow256[j]);

            const b85Array = new Array();

            let q = n, r;                                              // initialize quotient and remainder
            while (q > 85) {
                [q, r] = this.utils.divmod(q, 85);
                b85Array.unshift(r);
            }
            b85Array.unshift(q);

            while (b85Array.length < 5) {
                b85Array.unshift(0);
            }

            let frame = "";
            b85Array.forEach(
                charIndex => frame = frame.concat(this.charsets[version][charIndex])
            );

            if ((frame === "!!!!!") && Boolean(version.match(/adobe|ascii85/))) {
                output = output.concat("z");   
            } else {
                output = output.concat(frame);
            }
        }

        output = output.slice(0, output.length-zeroPadding);
        if (version === "adobe") {
            output = `<~${output}~>`;
        }
        
        if (version === "rfc1924") this.utils.announce();
        return output;
    }

    decode(input, ...args) {

        // Argument validation and output settings
        args = this.utils.validateArgs(args);
        const version = this.utils.getVersion(args);
        const outputType = this.utils.setIOType(args, "out");
        input = input.replace(/\s/g,'');        //remove all whitespace from input
        
        if (Boolean(version.match(/adobe|ascii85/))) {
            input = input.replace(/z/g, "!!!!!");
            if (version === "adobe") {
                input = input.replace(/^<~|~>$/g, "");
            }
        }

        const inputBytes = Uint8Array.from(
            input.split('').map(c => this.charsets[version].indexOf(c))
        );

        let uPadding = 0;
        let b256Array = new Array();
        for (let i=0, l=input.length; i<l; i+=5) {
            let subArray = inputBytes.slice(i, i+5);

            if (subArray.length < 5) {
                uPadding = 5 - subArray.length;
                const paddedArray = Uint8Array.from(Array(5).fill(84));
                paddedArray.set(subArray);
                subArray = paddedArray;
            }
            
            const subArray256 = new Array();

            let n = 0;
            subArray.forEach((b, j) => n += b * this.utils.pow85[j]);

            let q = n, r;
            while (q > 256) {
                [q, r] = this.utils.divmod(q, 256);
                subArray256.unshift(r);
            }
            subArray256.unshift(q);
            
            while (subArray256.length < 4) {
                subArray256.unshift(0);
            }
            
            b256Array = b256Array.concat(subArray256);
        }

        const uInt8 = Uint8Array.from(b256Array.slice(0, b256Array.length-uPadding));

        if (outputType === "bytes") {
            return uInt8;
        } else {
            return new TextDecoder().decode(uInt8);
        }

    }

    expandUtils() {
        /*
            Helper functions.
        */
        
        this.utils.announce = () => {
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
        }

        this.utils.divmod = (x, y) => [Math.floor(x / y), x % y];

        this.utils.pow256  = [16777216, 65536, 256, 1];

        this.utils.pow85 = [52200625, 614125, 7225, 85, 1];
    }
}


class BaseExUtils {
    constructor(main) {
        this.main = main;

        if ("charsets" in main) {

            this.addCharset = (name, charset) => {
                
                if (typeof name !== "string") {
                    throw new TypeError("The charset name must be a string.");
                }
    
                const setLen = parseInt(this.main.constructor.name.replace(/[^0-9]/g, ""), 10);
                let inputLen = setLen;
                
                if (typeof charset === "string" || Array.isArray(charset)) {
                    inputLen = charset.length;
                    charset = new Set(charset);
                } else if (typeof charset !== "set") {
                    throw new TypeError("The charset must be one of the types:\n'str', 'set', 'array'.");
                }
                
                if (charset.size === setLen) {
                    charset = [...charset].join("");
                    this.main.charsets[name] = charset;
                    console.log("New charset added.");
                } else if (inputLen === setLen) {
                    throw new Error("There were repetitive letters found in your charset. Make sure each char is unique.");
                } else {
                    throw new Error(`The the length of the charset must be ${setLen}.`);
                }
            }

        }
    }

    makeListing(args) {
        return args.map(s => `'${s}'`).join(", ")
    }

    setDefaultVersion(version) {
        if ("version" in this.main) {
            [this.main.version] = this.validateArgs([version]);
        } else {
            this.warning("This class has no charset-object. Default cannot be set.");
        }
    }

    setIOType(args, IO) {
        /* 
            Set type for input or output (bytes or string).
        */
        let type;
        if (args.includes("bytes")) {
            type = "bytes";
        } else if (args.includes("str")) { 
            type = "str";
        } else {
            type = (IO === "in") ? this.main.defaultInput : this.main.defaultOutput;
        }

        return type;
    }

    getVersion(args) {
        /*listArgs
            Test which version (charset) shoult be used.
            Sets either the default or overwrites it if
            requested.
        */
        let version = this.main.version;
        args.forEach(arg => {
            if (arg in this.main.charsets) {
                version = arg; 
            }
        })
        return version;
    }

    validateArgs(args) {
        /* 
            Test if provided arguments are in the argument list.
            Everything gets converted to lowercase and returned
        */
        let versions = null;
        let validArgs;
        const loweredArgs = new Array();

        if ("charsets" in this.main) {
            versions = Object.keys(this.main.charsets);
            validArgs = [...this.main.IOtypes, ...versions];
        } else {
            validArgs = this.main.IOtypes;
        }

        if (Boolean(args.length)) {
            args.forEach(arg => {
                arg = String(arg).toLowerCase();
                if (!validArgs.includes(arg)) {
                    const versionHint = (versions) ? `The options for version (charset) are:\n${this.makeListing(versions)}\n\n` : "";
                    throw new TypeError(`'${arg}'\n\nValid arguments for in- and output-type are:\n${this.makeListing(this.main.IOtypes)}\n\n${versionHint}Traceback:`);
                }
                loweredArgs.push(arg);
            });
        }
        return loweredArgs;
    }

    validateInput(input, inputType) {
        /* 
            Test if input type fits to the actual input.
        */
        if (inputType === "str") {
            if (typeof input !== "string") {
                this.warning("Your input was converted into a string.");
            }
            return String(input);
        } else {
            if (typeof input === "string") {
                throw new TypeError("Your provided input is a string, but some kind of (typed) Array is expected.");
            } else if (typeof input !== 'object') {
                throw new TypeError("Input must be some kind of (typed) Array if input type is set to 'bytes'.");
            }
            return input; 
        }
    }

    warning(message) {
        if (console.hasOwnProperty("warn")) {
            console.warn(message);
        } else {
            console.log(`___\n${message}\n`);
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


// bech32: "qpzry9x8gf2tvdw0s3jn54khce6mua7l",