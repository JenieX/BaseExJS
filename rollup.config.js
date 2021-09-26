import { terser } from "rollup-plugin-terser";

export default {
    input: "src/BaseEx.js",
    output: [ 
        {   
            format: "iife",
            name: "BaseEx",
            file: "dist/BaseEx.js"
        },
        {   
            format: "iife",
            name: "BaseEx",
            file: "dist/BaseEx.min.js",
            plugins: [terser()]
        },
        {   
            format: "es",
            name: "BaseEx",
            file: "dist/BaseEx.esm.js"
        },
        {   
            format: "es",
            name: "BaseEx",
            file: "dist/BaseEx.esm.min.js",
            plugins: [terser()]
        },
    ]
};
