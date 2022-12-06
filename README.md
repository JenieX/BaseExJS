# BaseEx

[![License](https://img.shields.io/github/license/UmamiAppearance/BaseExJs?color=009911&style=for-the-badge)](./LICENSE)
[![npm](https://img.shields.io/npm/v/base-ex?color=%23009911&style=for-the-badge)](https://www.npmjs.com/package/base-ex)


**BaseEx** is a collection of classes for data representation from Base16 (hex) to Base2048 or even BasePhi.
BaseEx is completely standalone and works client and server side.
There are other good solutions for e.g. Base32, Base64, Base85, but BaseEx has them all in one place.
The **Ex** in the name stands for **Ex**ponent (of n) or - as read out loud - for an **X**.


### Available converters/charsets:

<table>
    <thead>
        <tr>
            <th><strong>converter</strong></th>
            <th><strong>charsets</strong></th>
            <th><strong>standalone builds<strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/Unary_numeral_system" target="_blank">Base1/Unary</a></td>
            <td>
                <ul>
                    <li>all</li>
                    <li>sequence</li>
                    <li>default</li>
                    <li>tmark</li>
                </ul>
            </td>
            <td>
                <ul>
                    <li><a href="https://raw.githubusercontent.com/UmamiAppearance/BaseExJS/main/dist/converters/Base1/base-1.esm.js" download>base-1.esm.js</a></li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/Hexadecimal" target="_blank">Base16</a></td>
            <td>
                <ul>
                    <li>default</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/Base32" target="_blank">Base32</a></td>
            <td>
                <ul>
                    <li>crockford</li>
                    <li>rfc3548</li>
                    <li>rfc4648</li>
                    <li>zbase32</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://learnmeabitcoin.com/technical/base58" target="_blank">Base58</a></td>
            <td>
                <ul>
                    <li>default</li>
                    <li>bitcoin</li>
                    <li>flickr</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/Base64" target="_blank">Base64</a></td>
            <td>
                <ul>
                    <li>standard</li>
                    <li>urlsafe</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/Uuencoding" target="_blank">UUencode</a></td>
            <td>
                <ul>
                    <li>default</li>
                    <li>original</li>
                    <li>xx</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/Ascii85" target="_blank">Base85</a></td>
            <td>
                <ul>
                    <li>adobe</li>
                    <li>ascii85</li>
                    <li>rfc1924 <i>(charset only)</i></li>
                    <li>z85</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://base91.sourceforge.net/" target="_blank">Base91</a></td>
            <td>
                <ul>
                    <li>default</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/LEB128" target="_blank">LEB128</a></td>
            <td>
                <ul>
                    <li>default</li>
                    <li>hex</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://github.com/keith-turner/ecoji" target="_blank">Ecoji</a></td>
            <td>
                <ul>
                    <li>emojis_v1</li>
                    <li>emojis_v2</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://github.com/qntm/base2048" target="_blank">Base2048</a></td>
            <td>
                <ul>
                    <li>default</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/Radix" target="_blank">SimpleBase (Base2-Base62)</td>
            <td>
                <ul>
                    <li>default</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a href="https://en.wikipedia.org/wiki/Golden_ratio_base" target="_blank">BasePhi (Golden Ratio Base)</td>
            <td>
                <ul>
                    <li>default</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>ByteConverter</td>
            <td>
                ---
            </td>
        </tr>
        <tr>
            <td>BaseEx</td>
            <td>
                <i>Ready to use instances of the above converters:</i>
                <ul>
                    <li>base1</li>
                    <li>base16</li>
                    <li>base32_crockford</li>
                    <li>base32_rfc3548</li>
                    <li>base32_rfc4648</li>
                    <li>base32_zbase32</li>
                    <li>base58</li>
                    <li>base58_bitcoin</li>
                    <li>base58_flickr</li>
                    <li>base64</li>
                    <li>base64_urlsafe</li>
                    <li>uuencode</li>
                    <li>xxencode</li>
                    <li>base85_adobe</li>
                    <li>base85_ascii</li>
                    <li>base85_z85</li>
                    <li>base91</li>
                    <li>leb128</li>
                    <li>ecoji_v1</li>
                    <li>ecoji_v2</li>
                    <li>base2048</li>
                    <li>byteConverter</li>
                    <li>simpleBase
                        <ul>
                            <li>base2</li>
                            <li>⋮</li>
                            <li>base36</li>
                            <li>⋮</li>
                            <li>base62</li>
                        </ul>
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

_Additional charsets can be added. Watch this [live example](https://umamiappearance.github.io/BaseExJS/examples/live-examples.html#charsets)._


## Installation

### GitHub
```console
git clone https://github.com/UmamiAppearance/BaseExJS.git
```

### npm
```console
nmp install base-ex
```

## Builds
The GitHub repository has ready to use builds included. The npm package comes without pre build files. 

For building you have to run:

```console
npm install
npm run build
``` 

There are multiple builds available which are always grouped as [esm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), plus a minified version of each. The full build with all converters included can be found at [dist](https://github.com/UmamiAppearance/BaseExJS/tree/main/dist), which contains:
* ``BaseEx.esm.js``
* ``BaseEx.esm.min.js``
* ``BaseEx.iife.js``
* ``BaseEx.iife.min.js``

Apart from the full build, every converter can be used standalone. The associated builds can be found at [dist/converters](https://github.com/UmamiAppearance/BaseExJS/tree/main/dist/converters). _Note that standalone converters are exported as default._


## Usage

### Importing

#### Browser

```html
<!-- the classic -->
<script src="path/BaseEx.iife.min.js"></script>
```

```js
// ESM6 module

// main class
import { BaseEx } from "./path/BaseEx.esm.min.js"

// explicit converter (e.g. Base32)
import { Base32 } from "./path/BaseEx.esm.min.js"

// explicit converter from a standalone build
import Base32 from "./path/base-32.esm.min.js"
```

#### Node
```js
// ESM6 Module

// main class
import { BaseEx } from "base-ex"

// explicit converter (e.g. Base64)
import { Base64 } from "base-ex"

// CommonJS
const BaseEx = require("base-ex"); 
```

#### Available imports Browser/Node
The **classic import** via script tag has them all available without further ado. As it is a [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), everything is available under the scope of ``BaseEx``. 

* ``BaseEx.Base1``  
* ``BaseEx.Base16``
* ``BaseEx.Base32``
* ...
* ``BaseEx.BaseEx``
  
_(Which is not true for standalone builds, which are directly accessible, eg: ``Base16``, ``Base32``, ...)_
  
The same goes for the **CommonJS import** from Node. The only difference is, that the scope is not necessarily named ``BaseEx``, as this is defined by the user (``const myName = require("base-ex") --> myName.Base16...``).

Full **import** for **ES6** modules: 

```js
// browser
import {
    Base1,
    Base16,
    Base32,
    Base58,
    Base64,
    UUencode,
    Base85,
    Base91,
    LEB128,
    Ecoji,
    Base2048,
    SimpleBase,
    BasePhi,
    ByteConverter,
    BaseEx 
} from "./path/BaseEx.esm.min.js"

// node
import { ... } from "base-ex"
```

### Creating an instance
Regardless of the environment, at instance of a converter gets created like so:
```
const b32 = new Base32();
```

The constructor takes some arguments/options (which may differ between different encoder types). Those can also can be passed ephemeral to the encoder and/or decoder.

### Options
<table>
    <thead>
        <tr><th><strong>property</strong></th><th colspan="2"><strong>arguments</strong></th></tr>
    </thead>
    <tbody>
        <tr><th>endianness</th><td>be</td><td>le</td></tr>
        <tr><th>padding</th><td>nopad</td><td>pad</td></tr>
        <tr><th>sign</th><td>unsigned</td><td>signed</td></tr>
        <tr><th>case</th><td>lower</td><td>upper</td></tr>
        <tr><th>charset</th><td colspan="2"><i>&lt;various&gt;</i></td></tr>
        <tr><th>number-mode</th><td colspan="2">number</td></tr>
        <tr><th>decimal-mode</th><td colspan="2">decimal</td></tr>
        <tr>
            <th>IO handler</th>
            <td colspan="2">
                <ul>
                    <li>bytesIn&emsp;&emsp;&emsp;<i>&gt;&gt; accept only bytes as input</i></li>
                    <li>bytesOut&emsp;&emsp;&thinsp;<i>&gt;&gt; limits output to byte-like values</i></li>
                    <li>bytesInOut&emsp;&nbsp;<i>&gt;&gt; in- and output limited to bytes</i></li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>output types</th>
            <td colspan="2">
                <ul>
                    <li>bigint64</li>
                    <li>bigint_n</li>
                    <li>biguint64</li>
                    <li>buffer</li>
                    <li>bytes</li>
                    <li>float32</li>
                    <li>float64</li>
                    <li>float_n</li>
                    <li>int8</li>
                    <li>int16</li>
                    <li>int32</li>
                    <li>int_n</li>
                    <li>str</li>
                    <li>uint8</li>
                    <li>uint16</li>
                    <li>uint32</li>
                    <li>uint_n</li>
                    <li>view</li>
            </ul>
            </td>
        </tr>
    </tbody>
</table>


### Demonstration
More explanation is shown at the [LiveExamples](https://umamiappearance.github.io/BaseExJS/examples/live-examples.html). Also try out the [Online Base Coverter](https://umamiappearance.github.io/BaseExJS/examples/demo.html), for additional code examples.

## License
This work is licensed under [GPL-3.0](https://opensource.org/licenses/GPL-3.0).

### [Third Party Licenses](https://github.com/UmamiAppearance/BaseExJS/tree/main/third-party-licenses)

* The **basE91** en-/decoder relies on the work of _Joachim Henke_. The original code is licensed under [BSD-3-Clause](https://opensource.org/licenses/BSD-3-Clause). His method was transpiled to JavaScript with small adjustments.

* The **Base2048** Decoder relies on the work of _qnt_. The original code is licensed under the [MIT-License](https://opensource.org/licenses/MIT). The original code is already written in JavaScript and was slightly adjusted.
