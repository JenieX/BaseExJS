/**
 *  Utilities for every BaseEx class.
 * 
 * Requires:
 * -> SmartInput
 * -> SmartOutput
 */
import { BytesInput, BytesOutput, SmartInput, SmartOutput } from "./io-handlers.js";

export class Utils {

    constructor(main, inputHandler=BytesInput, outputHandler=BytesOutput) {

        // Store the calling class in this.root
        // for accessability.
        this.root = main;

        // If charsets are uses by the parent class,
        // add extra functions for the user.
        if ("charsets" in main) this.charsetUserToolsConstructor();

        this.inputHandler = new inputHandler();
        this.outputHandler = new outputHandler();
    }

    charsetUserToolsConstructor() {
        /*
            Constructor for the ability to add a charset and 
            change the default version.
        */

        this.root.addCharset = (name, charset) => {
            /*
                Save method to add a charset.
                ----------------------------

                @name: string that represents the key for the new charset
                @charset: string, array or Set of chars - the length must fit to the according class 
            */
                
            if (typeof name !== "string") {
                throw new TypeError("The charset name must be a string.");
            }

            // Get the appropriate length for the charset
            // from the according converter
            
            const setLen = this.root.converter.radix;
            let inputLen = setLen;
            
            if (typeof charset === "string" || Array.isArray(charset)) {
                
                // Store the input length of the input
                inputLen = charset.length;
                
                // Convert to "Set" -> eliminate duplicates
                // If duplicates are found the length of the
                // Set and the length of the initial input
                // differ.

                charset = new Set(charset);

            } else if (!(charset instanceof Set)) {
                throw new TypeError("The charset must be one of the types:\n'str', 'set', 'array'.");
            }
            
            if (charset.size === setLen) {
                charset = [...charset].join("");
                this.root.charsets[name] = charset;
                console.log(`New charset added with the name '${name}' added and ready to use`);
            } else if (inputLen === setLen) {
                throw new Error("There were repetitive chars found in your charset. Make sure each char is unique.");
            } else {
                throw new Error(`The the length of the charset must be ${setLen}.`);
            }
        }

        // Save method (argument gets validated) to 
        // change the default version.
        this.root.setDefaultVersion = (version) => [this.root.version] = this.validateArgs([version]);
    }

    makeArgList(args) {
        /*
            Returns argument lists for error messages.
        */
        return args.map(s => `'${s}'`).join(", ");
    }

    toSignedStr(output, negative) {

        output = output.replace(/^0+(?!$)/, "");

        if (negative) {
            output = "-".concat(output);
        }

        return output;
    }

    extractSign(input) {
        // Test for a negative sign
        let negative = false;
        if (input[0] === "-") {
            negative = true;
            input = input.slice(1);
        }

        return [input, negative];
    }

    invalidArgument(arg, versions, outputTypes) {
        const signedHint = (this.root.isMutable.signed) ? "\n * 'signed' to disable, 'unsigned', to enable the use of the twos's complement for negative integers" : "";
        const endiannessHint = (this.root.isMutable.littleEndian) ? "\n * 'be' for big , 'le' for little endian byte order for case conversion" : "";
        const padHint = (this.root.isMutable.padding) ? "\n * 'pad' to fill up, 'nopad' to not fill up the output with the particular padding" : "";
        const caseHint = (this.root.isMutable.upper) ? "\n * valid args for changing the encoded output case are 'upper' and 'lower'" : "";
        const outputHint = `\n * valid args for the output type are ${this.makeArgList(outputTypes)}`;
        const versionHint = (versions) ? `\n * the options for version (charset) are: ${this.makeArgList(versions)}` : "";
        const numModeHint = "\n * 'number' for number-mode (converts every number into a Float64Array to keep the natural js number type)";
        
        throw new TypeError(`'${arg}'\n\nValid parameters are:${signedHint}${endiannessHint}${padHint}${caseHint}${outputHint}${versionHint}${numModeHint}\n\nTraceback:`);
    }

    validateArgs(args, initial=false) {
        /* 
            Test if provided arguments are in the argument list.
            Everything gets converted to lowercase and returned
        */
        
        // default settings
        const parameters = {
            littleEndian: this.root.littleEndian,
            numberMode: this.root.numberMode,
            outputType: this.root.outputType,
            padding: this.root.padding,
            signed: this.root.signed,
            upper: this.root.upper,
            version: this.root.version
        }

        // if no args are provided return the default settings immediately
        if (!args.length) {
            return parameters;
        }

        const versions = Object.keys(this.root.charsets);
        const outputTypes = this.outputHandler.typeList;

        const extraArgList = {
            littleEndian: ["be", "le"],
            padding: ["nopad", "pad"],
            signed: ["unsigned", "signed"],
            upper: ["lower", "upper"],
        }

        if (args.includes("number")) {
            args.splice(args.indexOf("number"), 1);
            parameters.numberMode = true;
            parameters.outputType = "float_n";
        }

        args.forEach((arg) => {
            arg = String(arg).toLowerCase();

            if (versions.includes(arg)) {
                parameters.version = arg;
            } else if (outputTypes.includes(arg)) {
                parameters.outputType = arg;
            } else {
                // set invalid args to true for starters
                // if a valid arg is found later it will
                // get changed

                let invalidArg = true;

                // walk through the mutable parameter list

                for (const param in extraArgList) {
                    
                    if (extraArgList[param].includes(arg)) {
                        
                        invalidArg = false;

                        // extra params always have two options
                        // they are converted into booleans 
                        // index 0 > false
                        // index 1 > true

                        if (this.root.isMutable[param]) {
                            parameters[param] = Boolean(extraArgList[param].indexOf(arg));
                        } else {
                            throw TypeError(`Argument '${arg}' is not allowed for this type of converter.`);
                        }
                    }
                }

                if (invalidArg) {
                    this.invalidArgument(arg, versions, outputTypes);
                }
            }
        });

        // If padding and signed are true, padding
        // is set to false and a warning is getting
        // displayed.
        if (parameters.padding && parameters.signed) {
            parameters.padding = false;
            this.constructor.warning("Padding was set to false due to the signed conversion.");
        }
        
        // overwrite the default parameters for the initial call
        if (initial) {
            for (const param in parameters) {
                this.root[param] = parameters[param];
            }
        }

        return parameters;
    }

    signError() {
        throw new TypeError("The input is signed but the converter is not set to treat input as signed.\nYou can pass the string 'signed' to the decode function or when constructing the converter.");
    }

    static warning(message) {
        if (Object.prototype.hasOwnProperty.call(console, "warn")) {
            console.warn(message);
        } else {
            console.log(`___\n${message}\n`);
        }
    }
}
