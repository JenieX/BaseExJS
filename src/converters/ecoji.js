/**
 * [BaseEx|Ecoji Converter]{@link https://github.com/UmamiAppearance/BaseExJS/src/converters/ecoji.js}
 *
 * @version 0.5.0
 * @author UmamiAppearance [mail@umamiappearance.eu]
 * @license GPL-3.0 OR Apache-2.0
 * @see https://github.com/keith-turner/ecoji
 */

import { BaseConverter, BaseTemplate } from "../core.js";

/**
 * BaseEx Ecoji (a Base 1024) Converter.
 * ------------------------
 * This an implementation of the Ecoji converter.
 * Various input can be converted to an Ecoji string
 * or an Ecoji string can be decoded into various 
 * formats. Versions 1 and 2 are supported.
 * This variant pretty much follows the standard
 * (at least in its resuls, the algorithm is very
 * different from the original).
 * A deviation is the handling of padding. The last
 * pad char can be trimmed for both versions and
 * additionally ommitted completely. 
 */
export default class Ecoji extends BaseTemplate {

    #revEmojiVersion = {};
    #padRegex = null;

    /**
     * BaseEx Ecoji Constructor.
     * @param {...string} [args] - Converter settings.
     */
    constructor(...args) {
        super();

        // charsets
        this.charsets.emojis_v1 = [..."🀄🃏🅰🅱🅾🅿🆎🆑🆒🆓🆔🆕🆖🆗🆘🆙🆚🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🈁🈂🈚🈯🈲🈳🈴🈵🈶🈷🈸🈹🈺🉐🉑🌀🌁🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🌡🌤🌥🌦🌧🌨🌩🌪🌫🌬🌭🌮🌯🌰🌱🌲🌳🌴🌵🌶🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🍽🍾🍿🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🎖🎗🎙🎚🎛🎞🎟🎠🎡🎢🎣🎤🎥🎦🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🏋🏌🏎🏏🏐🏑🏒🏓🏔🏕🏖🏗🏘🏙🏚🏛🏜🏝🏞🏟🏠🏡🏢🏣🏤🏥🏦🏧🏨🏩🏪🏫🏬🏭🏮🏯🏰🏳🏴🏵🏷🏸🏹🏺🏻🏼🏽🏾🏿🐀🐁🐂🐃🐄🐅🐆🐇🐈🐉🐊🐋🐌🐍🐎🐏🐐🐑🐒🐓🐔🐕🐖🐗🐘🐙🐚🐛🐜🐝🐞🐟🐠🐡🐢🐣🐤🐥🐦🐧🐨🐩🐪🐫🐬🐭🐮🐯🐰🐱🐲🐳🐴🐵🐶🐷🐸🐹🐺🐻🐼🐽🐾🐿👀👁👂👃👄👅👆👇👈👉👊👋👌👍👎👏👐👑👒👓👔👕👖👗👘👙👚👛👜👝👞👟👠👡👢👣👤👥👦👧👨👩👪👫👬👭👮👯👰👱👲👳👴👵👶👷👸👹👺👻👼👽👾👿💀💁💂💃💄💅💆💇💈💉💊💋💌💍💎💏💐💑💒💓💔💕💖💗💘💙💚💛💜💝💞💟💠💡💢💣💤💥💦💧💨💩💪💫💬💭💮💯💰💱💲💳💴💵💶💷💸💹💺💻💼💽💾💿📀📁📂📃📄📅📆📇📈📉📊📋📌📍📎📏📐📒📓📔📕📖📗📘📙📚📛📜📝📞📟📠📡📢📣📤📥📦📧📨📩📪📫📬📭📮📯📰📱📲📳📴📵📶📷📸📹📺📻📼📽📿🔀🔁🔂🔃🔄🔅🔆🔇🔈🔉🔊🔋🔌🔍🔎🔏🔐🔑🔒🔓🔔🔕🔖🔗🔘🔙🔚🔛🔜🔝🔞🔟🔠🔡🔢🔣🔤🔥🔦🔧🔨🔩🔪🔫🔬🔭🔮🔯🔰🔱🔲🔳🔴🔵🔶🔷🔸🔹🔺🔻🔼🔽🕉🕊🕋🕌🕍🕎🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧🕯🕰🕳🕴🕵🕶🕷🕸🕹🕺🖇🖊🖋🖌🖍🖐🖕🖖🖤🖥🖨🖱🖲🖼🗂🗃🗄🗑🗒🗓🗜🗝🗞🗡🗣🗨🗯🗳🗺🗻🗼🗽🗾🗿😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙌🙍🙎🙏🚀🚁🚂🚃🚄🚅🚆🚇🚈🚉🚊🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🚚🚛🚜🚝🚞🚟🚠🚡🚢🚣🚤🚥🚦🚧🚨🚩🚪🚫🚬🚭🚮🚯🚰🚱🚲🚳🚴🚵🚶🚷🚸🚹🚺🚻🚼🚽🚾🚿🛀🛁🛂🛃🛄🛅🛋🛌🛍🛎🛏🛐🛑🛒🛠🛡🛢🛣🛤🛥🛩🛫🛬🛰🛳🛴🛵🛶🛷🛸🛹🤐🤑🤒🤓🤔🤕🤖🤗🤘🤙🤚🤛🤜🤝🤞🤟🤠🤡🤢🤣🤤🤥🤦🤧🤨🤩🤪🤫🤬🤭🤮🤯🤰🤱🤲🤳🤴🤵🤶🤷🤸🤹🤺🤼🤽🤾🥀🥁🥂🥃🥄🥅🥇🥈🥉🥊🥋🥌🥍🥎🥏🥐🥑🥒🥓🥔🥕🥖🥗🥘🥙🥚🥛🥜🥝🥞🥟🥠🥡🥢🥣🥤🥥🥦🥧🥨🥩🥪🥫🥬🥭🥮🥯🥰🥳🥴🥵🥶🥺🥼🥽🥾🥿🦀🦁🦂🦃🦄🦅🦆🦇🦈🦉🦊🦋🦌🦍🦎🦏🦐🦑🦒🦓🦔🦕🦖🦗🦘🦙🦚🦛🦜🦝🦞🦟🦠🦡🦢🦰🦱🦲🦳🦴🦵🦶🦷🦸🦹🧀🧁🧂🧐🧑🧒🧓🧔🧕"];
        this.charsets.emojis_v2 = [..."🀄🃏⏰⏳☔♈♉♊♋♌♍♎♏♐♑♒♓♿⚓⚡⚽⚾⛄⛅⛎⛔⛪⛲⛳⛵⛺⛽✊✋✨⭐🛕🛖🛗🛝🛞🛟🛺🈁🛻🤌🤏🤿🥱🥲🥸🥹🥻🦣🦤🦥🦦🦧🌀🌁🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🦨🦩🦪🦫🦬🦭🦮🦯🦺🦻🌭🌮🌯🌰🌱🌲🌳🌴🌵🦼🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🦽🍾🍿🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🦾🦿🧃🧄🧅🧆🧇🎠🎡🎢🎣🎤🎥🧈🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🧉🧊🧋🏏🏐🏑🏒🏓🧌🧍🧎🧏🧖🧗🧘🧙🧚🧛🧜🧝🏠🏡🏢🏣🏤🏥🏦🧞🏨🏩🏪🏫🏬🏭🏮🏯🏰🧟🏴🧠🧢🏸🏹🏺🧣🧤🧥🧦🧧🐀🐁🐂🐃🐄🐅🐆🐇🐈🐉🐊🐋🐌🐍🐎🐏🐐🐑🐒🐓🐔🐕🐖🐗🐘🐙🐚🐛🐜🐝🐞🐟🐠🐡🐢🐣🐤🐥🐦🐧🐨🐩🐪🐫🐬🐭🐮🐯🐰🐱🐲🐳🐴🐵🐶🐷🐸🐹🐺🐻🐼🐽🐾🧨👀🧩👂👃👄👅👆👇👈👉👊👋👌👍👎👏👐👑👒👓👔👕👖👗👘👙👚👛👜👝👞👟👠👡👢👣👤👥👦👧👨👩👪👫👬👭👮👯👰👱👲👳👴👵👶👷👸👹👺👻👼👽👾👿💀💁💂💃💄💅💆💇💈💉💊💋💌💍💎💏💐💑💒💓💔💕💖💗💘💙💚💛💜💝💞💟💠💡💢💣💤💥💦💧💨💩💪💫💬💭💮💯💰💱💲💳💴💵💶💷💸🧪💺💻💼💽💾💿📀🧫📂📃📄🧬📆📇📈📉📊📋📌📍📎📏📐📒📓📔📕📖📗📘📙📚📛📜📝📞📟📠📡📢📣📤📥📦📧📨📩📪📫📬📭📮📯📰📱📲📳🧭📵📶📷📸📹📺📻📼🧮📿🧯🧰🧱🧲🧳🔅🔆🔇🔈🔉🔊🔋🔌🔍🔎🔏🔐🔑🔒🔓🔔🔕🔖🔗🔘🧴🧵🧶🧷🧸🧹🧺🧻🧼🧽🧾🧿🔥🔦🔧🔨🔩🔪🔫🔬🔭🔮🔯🔰🔱🔲🔳🩰🩱🩲🩳🩴🩸🩹🩺🩻🩼🪀🪁🕋🕌🕍🕎🪂🪃🪄🪅🪆🪐🪑🪒🪓🪔🪕🪖🪗🪘🪙🪚🪛🪜🪝🪞🪟🪠🪡🪢🪣🪤🪥🪦🪧🪨🪩🪪🪫🕺🪬🪰🪱🪲🪳🪴🖕🖖🖤🪵🪶🪷🪸🪹🪺🫀🫁🫂🫃🫄🫅🫐🫑🫒🫓🫔🫕🫖🫗🗻🗼🗽🗾🗿😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙌🙍🙎🙏🚀🚁🚂🚃🚄🚅🚆🚇🚈🚉🚊🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🚚🚛🚜🚝🚞🚟🚠🚡🚢🚣🚤🚥🚦🚧🚨🚩🚪🚫🚬🚭🚮🚯🚰🚱🚲🚳🚴🚵🚶🚷🚸🚹🚺🚻🚼🚽🚾🚿🛀🛁🛂🛃🛄🛅🫘🛌🫙🫠🫡🛐🛑🛒🫢🫣🫤🫥🫦🫧🫰🛫🛬🫱🫲🛴🛵🛶🛷🛸🛹🤐🤑🤒🤓🤔🤕🤖🤗🤘🤙🤚🤛🤜🤝🤞🤟🤠🤡🤢🤣🤤🤥🤦🤧🤨🤩🤪🤫🤬🤭🤮🤯🤰🤱🤲🤳🤴🤵🤶🤷🤸🤹🤺🤼🤽🤾🥀🥁🥂🥃🥄🥅🥇🥈🥉🥊🥋🥌🥍🥎🥏🥐🥑🥒🥓🥔🥕🥖🥗🥘🥙🥚🥛🥜🥝🥞🥟🥠🥡🥢🥣🥤🥥🥦🥧🥨🥩🥪🥫🥬🥭🥮🥯🥰🥳🥴🥵🥶🥺🥼🥽🥾🥿🦀🦁🦂🦃🦄🦅🦆🦇🦈🦉🦊🦋🦌🦍🦎🦏🦐🦑🦒🦓🦔🦕🦖🦗🦘🦙🦚🦛🦜🦝🦞🦟🦠🦡🦢🫳🫴🫵🫶🦴🦵🦶🦷🦸🦹🧀🧁🧂🧐🧑🧒🧓🧔🧕"];

        this.padChars.emojis_v1 = [ "⚜", "🏍", "📑", "🙋", "☕" ];
        this.padChars.emojis_v2 = [ "🥷", "🛼", "📑", "🙋", "☕" ];
        
        // init particularites for the two versions
        this.init();

        // converter
        this.converter = new BaseConverter(1024, 5, 4);

        // predefined settings
        this.padding = true;
        this.version = "emojis_v1";
        
        // mutable extra args
        this.isMutable.padding = true;
        this.isMutable.trim = true;

        // set trim option
        this.trim = null;
        this.utils.converterArgs.trim = ["notrim", "trim"];
        
        // apply user settings
        this.utils.validateArgs(args, true);

        if (this.trim === null) {
            this.trim = this.version === "emojis_v2";
        }
    }

    init() {
        const padAll = {};

        const revEmojisAdd = (version, set) => {
            set.forEach((char) => {
                if (char in this.#revEmojiVersion) {
                    this.#revEmojiVersion[char].version += version;
                } else {
                    this.#revEmojiVersion[char] = { version };
                }
            });
        };

        const handlePadding = (version, set, type) => {
            set.forEach(padChar => {
            
                if (padChar in padAll) {
                    this.#revEmojiVersion[padChar].version = 3;
                } else {
                    this.#revEmojiVersion[padChar] = {
                        version,
                        padding: type
                    }
                    padAll[padChar] = type;
                }    
            });
        };

        revEmojisAdd(1, this.charsets.emojis_v1);
        revEmojisAdd(2, this.charsets.emojis_v2);

        handlePadding(1, this.padChars.emojis_v1.slice(0, -1), "last");
        handlePadding(2, this.padChars.emojis_v2.slice(0, -1), "last");
        handlePadding(1, this.padChars.emojis_v1.slice(-1), "fill");
        handlePadding(2, this.padChars.emojis_v2.slice(-1), "fill");

        const regexArray = [];

        for (const padChar in padAll) {
            if (padAll[padChar] === "last") {
                regexArray.push(padChar);
            } else {
                regexArray.push(`${padChar}+`);
            }
        }

        // create a regex obj for matching all pad chars 
        this.#padRegex = new RegExp(regexArray.join("|"), "g");
    }


    /**
     * BaseEx Ecoji Encoder.
     * @param {*} input - Input according to the used byte converter.
     * @param  {...str} [args] - Converter settings.
     * @returns {string} - Ecoji encoded string.
     */
    encode(input, ...args) {

        const applyPadding = (scope) => {

            let { output, settings, zeroPadding } = scope;
            const charset = this.charsets[settings.version];
            let outArray = [...output];
            
            if (zeroPadding > 1) {
                const padValue = this.converter.padBytes(zeroPadding);
                if (settings.padding) {
                    const padLen = settings.trim ? 1 : padValue;
                    const padArr = new Array(padLen).fill(this.padChars[settings.version].at(-1));
                    outArray.splice(outArray.length-padValue, padValue, ...padArr);
                } else {
                    outArray.splice(outArray.length-padValue, padValue);
                }
            }
            
            else if (zeroPadding === 1) {
                const lastVal = charset.indexOf(outArray.pop());
                const x = lastVal >> 8;
                outArray.push(this.padChars[settings.version].at(x));
            }

            return outArray.join("");
        }
        
        return super.encode(input, null, applyPadding, ...args);
    }

    
    /**
     * BaseEx Ecoji Decoder.
     * @param {string} input - Ecoji String.
     * @param  {...any} [args] - Converter settings.
     * @returns {*} - Output according to converter settings.
     */
    decode(input, ...args) {

        // Argument validation and output settings
        const settings = this.utils.validateArgs(args);
        input = String(input);

        // versonKey can be both v1 or v2
        let versionKey = 3;

        // the actual decoding is wrapped in a function
        // for the possibility to call it multiple times
        const decode = (input) => {

            versionKey = this.determineDecodingCharset(input, versionKey);
            const version = (versionKey === 3)
                ? settings.version
                : `emojis_v${versionKey}`;
            
            const charset = this.charsets[version];
            
            const inArray = [...input];
            const lastChar = inArray.at(-1);
            let skipLast = false;

            for (let i=0; i<this.padChars[version].length-1; i++) {                
                if (lastChar === this.padChars[version].at(i)) {
                    inArray.splice(-1, 1, charset.at(i << 8));
                    input = inArray.join("");
                    skipLast = true;
                    break;
                }
            }

            let output = this.converter.decode(input,
                this.charsets[settings.version],
                this.padChars[settings.version],
                settings.integrity,
                false);

            if (skipLast) {
                output = new Uint8Array(output.buffer.slice(0, -1));
            }

            return output;
        }

        const matchGroup = [...input.matchAll(this.#padRegex)];

        // decode the input directly if no or just one 
        // match for padding was found
        let output;
        if (matchGroup.length < 2) {
            output = decode(input);
        }
        
        // otherwise decode every group seperatly and join it
        // afterwards
        else {

            const preOutArray = [];
            let start = 0;
            
            matchGroup.forEach(match => {
                const end = match.index + match.at(0).length;
                preOutArray.push(...decode(input.slice(start, end)));
                start = end;
            });

            // in case the last group has no padding, it is not yet
            // decoded -> do it now
            if (start !== input.length) {
                preOutArray.push(...decode(input.slice(start, input.length)));
            }

            output = Uint8Array.from(preOutArray);
        }


        return this.utils.outputHandler.compile(output, settings.outputType);
    }

    determineDecodingCharset(input, versionKey) {
        
        const inArray = [...input];
        
        inArray.forEach((char, i) => {
            if (char in this.#revEmojiVersion) {

                const charVersion = this.#revEmojiVersion[char].version;

                if (charVersion !== 3) {
                    if (versionKey === 3) {
                        versionKey = charVersion;
                    } else if (versionKey !== charVersion) {
                        throw new TypeError(`Emojis from different ecoji versions seen : ${char} from emojis_v${charVersion}`);
                    }
                }

                const padding = this.#revEmojiVersion[char].padding;
                if (padding) {
                    const relIndex = i%4;
                    
                    if (padding === "fill") {
                        if (relIndex === 0) {
                            throw new TypeError(`Padding unexpectedly seen in first position ${char}`);
                        }
                    } else if (relIndex !== 3) {
                        throw new TypeError(`Last padding seen in unexpected position ${char}`);
                    }
                }

            } else {
                throw new TypeError(`Non Ecoji character seen : ${char}`);
            }
        });

        return versionKey;
    }
}
