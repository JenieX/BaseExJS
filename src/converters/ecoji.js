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
 * This an implementation of the  Ecoji/converter.
 * Various input can be converted to a hex string
 * or a hex string can be decoded into various formats.
 */
export default class Ecoji extends BaseTemplate {

    /**
     * BaseEx Ecoji Constructor.
     * @param {...string} [args] - Converter settings.
     */
    constructor(...args) {
        super();

        // charsets
        this.charsets.emojis_v1 = [..."🀄🃏🅰🅱🅾🅿🆎🆑🆒🆓🆔🆕🆖🆗🆘🆙🆚🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🈁🈂🈚🈯🈲🈳🈴🈵🈶🈷🈸🈹🈺🉐🉑🌀🌁🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🌡🌤🌥🌦🌧🌨🌩🌪🌫🌬🌭🌮🌯🌰🌱🌲🌳🌴🌵🌶🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🍽🍾🍿🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🎖🎗🎙🎚🎛🎞🎟🎠🎡🎢🎣🎤🎥🎦🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🏋🏌🏎🏏🏐🏑🏒🏓🏔🏕🏖🏗🏘🏙🏚🏛🏜🏝🏞🏟🏠🏡🏢🏣🏤🏥🏦🏧🏨🏩🏪🏫🏬🏭🏮🏯🏰🏳🏴🏵🏷🏸🏹🏺🏻🏼🏽🏾🏿🐀🐁🐂🐃🐄🐅🐆🐇🐈🐉🐊🐋🐌🐍🐎🐏🐐🐑🐒🐓🐔🐕🐖🐗🐘🐙🐚🐛🐜🐝🐞🐟🐠🐡🐢🐣🐤🐥🐦🐧🐨🐩🐪🐫🐬🐭🐮🐯🐰🐱🐲🐳🐴🐵🐶🐷🐸🐹🐺🐻🐼🐽🐾🐿👀👁👂👃👄👅👆👇👈👉👊👋👌👍👎👏👐👑👒👓👔👕👖👗👘👙👚👛👜👝👞👟👠👡👢👣👤👥👦👧👨👩👪👫👬👭👮👯👰👱👲👳👴👵👶👷👸👹👺👻👼👽👾👿💀💁💂💃💄💅💆💇💈💉💊💋💌💍💎💏💐💑💒💓💔💕💖💗💘💙💚💛💜💝💞💟💠💡💢💣💤💥💦💧💨💩💪💫💬💭💮💯💰💱💲💳💴💵💶💷💸💹💺💻💼💽💾💿📀📁📂📃📄📅📆📇📈📉📊📋📌📍📎📏📐📒📓📔📕📖📗📘📙📚📛📜📝📞📟📠📡📢📣📤📥📦📧📨📩📪📫📬📭📮📯📰📱📲📳📴📵📶📷📸📹📺📻📼📽📿🔀🔁🔂🔃🔄🔅🔆🔇🔈🔉🔊🔋🔌🔍🔎🔏🔐🔑🔒🔓🔔🔕🔖🔗🔘🔙🔚🔛🔜🔝🔞🔟🔠🔡🔢🔣🔤🔥🔦🔧🔨🔩🔪🔫🔬🔭🔮🔯🔰🔱🔲🔳🔴🔵🔶🔷🔸🔹🔺🔻🔼🔽🕉🕊🕋🕌🕍🕎🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧🕯🕰🕳🕴🕵🕶🕷🕸🕹🕺🖇🖊🖋🖌🖍🖐🖕🖖🖤🖥🖨🖱🖲🖼🗂🗃🗄🗑🗒🗓🗜🗝🗞🗡🗣🗨🗯🗳🗺🗻🗼🗽🗾🗿😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙌🙍🙎🙏🚀🚁🚂🚃🚄🚅🚆🚇🚈🚉🚊🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🚚🚛🚜🚝🚞🚟🚠🚡🚢🚣🚤🚥🚦🚧🚨🚩🚪🚫🚬🚭🚮🚯🚰🚱🚲🚳🚴🚵🚶🚷🚸🚹🚺🚻🚼🚽🚾🚿🛀🛁🛂🛃🛄🛅🛋🛌🛍🛎🛏🛐🛑🛒🛠🛡🛢🛣🛤🛥🛩🛫🛬🛰🛳🛴🛵🛶🛷🛸🛹🤐🤑🤒🤓🤔🤕🤖🤗🤘🤙🤚🤛🤜🤝🤞🤟🤠🤡🤢🤣🤤🤥🤦🤧🤨🤩🤪🤫🤬🤭🤮🤯🤰🤱🤲🤳🤴🤵🤶🤷🤸🤹🤺🤼🤽🤾🥀🥁🥂🥃🥄🥅🥇🥈🥉🥊🥋🥌🥍🥎🥏🥐🥑🥒🥓🥔🥕🥖🥗🥘🥙🥚🥛🥜🥝🥞🥟🥠🥡🥢🥣🥤🥥🥦🥧🥨🥩🥪🥫🥬🥭🥮🥯🥰🥳🥴🥵🥶🥺🥼🥽🥾🥿🦀🦁🦂🦃🦄🦅🦆🦇🦈🦉🦊🦋🦌🦍🦎🦏🦐🦑🦒🦓🦔🦕🦖🦗🦘🦙🦚🦛🦜🦝🦞🦟🦠🦡🦢🦰🦱🦲🦳🦴🦵🦶🦷🦸🦹🧀🧁🧂🧐🧑🧒🧓🧔🧕"];
        this.charsets.emojis_v2 = [..."🀄🃏⏰⏳☔♈♉♊♋♌♍♎♏♐♑♒♓♿⚓⚡⚽⚾⛄⛅⛎⛔⛪⛲⛳⛵⛺⛽✊✋✨⭐🛕🛖🛗🛝🛞🛟🛺🈁🛻🤌🤏🤿🥱🥲🥸🥹🥻🦣🦤🦥🦦🦧🌀🌁🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🦨🦩🦪🦫🦬🦭🦮🦯🦺🦻🌭🌮🌯🌰🌱🌲🌳🌴🌵🦼🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🦽🍾🍿🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🦾🦿🧃🧄🧅🧆🧇🎠🎡🎢🎣🎤🎥🧈🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🧉🧊🧋🏏🏐🏑🏒🏓🧌🧍🧎🧏🧖🧗🧘🧙🧚🧛🧜🧝🏠🏡🏢🏣🏤🏥🏦🧞🏨🏩🏪🏫🏬🏭🏮🏯🏰🧟🏴🧠🧢🏸🏹🏺🧣🧤🧥🧦🧧🐀🐁🐂🐃🐄🐅🐆🐇🐈🐉🐊🐋🐌🐍🐎🐏🐐🐑🐒🐓🐔🐕🐖🐗🐘🐙🐚🐛🐜🐝🐞🐟🐠🐡🐢🐣🐤🐥🐦🐧🐨🐩🐪🐫🐬🐭🐮🐯🐰🐱🐲🐳🐴🐵🐶🐷🐸🐹🐺🐻🐼🐽🐾🧨👀🧩👂👃👄👅👆👇👈👉👊👋👌👍👎👏👐👑👒👓👔👕👖👗👘👙👚👛👜👝👞👟👠👡👢👣👤👥👦👧👨👩👪👫👬👭👮👯👰👱👲👳👴👵👶👷👸👹👺👻👼👽👾👿💀💁💂💃💄💅💆💇💈💉💊💋💌💍💎💏💐💑💒💓💔💕💖💗💘💙💚💛💜💝💞💟💠💡💢💣💤💥💦💧💨💩💪💫💬💭💮💯💰💱💲💳💴💵💶💷💸🧪💺💻💼💽💾💿📀🧫📂📃📄🧬📆📇📈📉📊📋📌📍📎📏📐📒📓📔📕📖📗📘📙📚📛📜📝📞📟📠📡📢📣📤📥📦📧📨📩📪📫📬📭📮📯📰📱📲📳🧭📵📶📷📸📹📺📻📼🧮📿🧯🧰🧱🧲🧳🔅🔆🔇🔈🔉🔊🔋🔌🔍🔎🔏🔐🔑🔒🔓🔔🔕🔖🔗🔘🧴🧵🧶🧷🧸🧹🧺🧻🧼🧽🧾🧿🔥🔦🔧🔨🔩🔪🔫🔬🔭🔮🔯🔰🔱🔲🔳🩰🩱🩲🩳🩴🩸🩹🩺🩻🩼🪀🪁🕋🕌🕍🕎🪂🪃🪄🪅🪆🪐🪑🪒🪓🪔🪕🪖🪗🪘🪙🪚🪛🪜🪝🪞🪟🪠🪡🪢🪣🪤🪥🪦🪧🪨🪩🪪🪫🕺🪬🪰🪱🪲🪳🪴🖕🖖🖤🪵🪶🪷🪸🪹🪺🫀🫁🫂🫃🫄🫅🫐🫑🫒🫓🫔🫕🫖🫗🗻🗼🗽🗾🗿😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙌🙍🙎🙏🚀🚁🚂🚃🚄🚅🚆🚇🚈🚉🚊🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🚚🚛🚜🚝🚞🚟🚠🚡🚢🚣🚤🚥🚦🚧🚨🚩🚪🚫🚬🚭🚮🚯🚰🚱🚲🚳🚴🚵🚶🚷🚸🚹🚺🚻🚼🚽🚾🚿🛀🛁🛂🛃🛄🛅🫘🛌🫙🫠🫡🛐🛑🛒🫢🫣🫤🫥🫦🫧🫰🛫🛬🫱🫲🛴🛵🛶🛷🛸🛹🤐🤑🤒🤓🤔🤕🤖🤗🤘🤙🤚🤛🤜🤝🤞🤟🤠🤡🤢🤣🤤🤥🤦🤧🤨🤩🤪🤫🤬🤭🤮🤯🤰🤱🤲🤳🤴🤵🤶🤷🤸🤹🤺🤼🤽🤾🥀🥁🥂🥃🥄🥅🥇🥈🥉🥊🥋🥌🥍🥎🥏🥐🥑🥒🥓🥔🥕🥖🥗🥘🥙🥚🥛🥜🥝🥞🥟🥠🥡🥢🥣🥤🥥🥦🥧🥨🥩🥪🥫🥬🥭🥮🥯🥰🥳🥴🥵🥶🥺🥼🥽🥾🥿🦀🦁🦂🦃🦄🦅🦆🦇🦈🦉🦊🦋🦌🦍🦎🦏🦐🦑🦒🦓🦔🦕🦖🦗🦘🦙🦚🦛🦜🦝🦞🦟🦠🦡🦢🫳🫴🫵🫶🦴🦵🦶🦷🦸🦹🧀🧁🧂🧐🧑🧒🧓🧔🧕"];
        
        // backward (v1) compatibel decoding charset for v2
        this.charsets.emojis_v3 = Object.fromEntries(this.charsets.emojis_v2.map((e, i) => [e, i]));
        this.charsets.emojis_v1.forEach((char, i) => {
            if (!(char in this.charsets.emojis_v3)) {
                this.charsets.emojis_v3[char] = i;
            }
        });

        this.padChars = {
            default: "☕",
            p4x: {
                emojis_v1: [ "⚜", "🏍", "📑", "🙋" ],
                emojis_v2: [ "🥷", "🛼", "📑", "🙋" ],
                emojis_v3: {
                    "⚜": "🀄",
                    "🥷": "🀄",
                    "🏍": "🧋",
                    "🛼": "🧋",
                    "📑": "📒",
                    "🙋": "🙌"
                }
            }
        }

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


    /**
     * BaseEx Ecoji Encoder.
     * @param {*} input - Input according to the used byte converter.
     * @param  {...str} [args] - Converter settings.
     * @returns {string} - Base16 encoded string.
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
                    const padArr = new Array(padLen).fill(this.padChars.default);
                    outArray.splice(outArray.length-padValue, padValue, ...padArr);
                } else {
                    outArray.splice(outArray.length-padValue, padValue);
                }
            }
            
            else if (zeroPadding === 1) {
                const lastVal = charset.indexOf(outArray.pop());
                const x = lastVal >> 8;
                outArray.push(this.padChars.p4x[settings.version].at(x));
            }

            return outArray.join("");
        }
        
        return super.encode(input, null, applyPadding, ...args);
    }

    
    /**
     * BaseEx Ecoji Decoder.
     * @param {string} input - Base16/Hex String.
     * @param  {...any} [args] - Converter settings.
     * @returns {*} - Output according to converter settings.
     */
    decode(input, ...args) {

        // Argument validation and output settings
        const settings = this.utils.validateArgs(args);
        if ((/emojis_v[1|2|3]/).test(settings.version)) {
            settings.version = "emojis_v3";
        }

        input = String(input);
        const charset = this.charsets[settings.version];
        const inArray = [...input];
        const lastChar = inArray.at(-1);
        let skipLast = false;

        // in case of another charset than v1/v2
        if (Array.isArray(charset)) {
            for (let i=0; i<this.padChars.p4x[settings.version].length; i++) {                
                if (lastChar === this.padChars.p4x[settings.version].at(i)) {
                    inArray.splice(-1, 1, charset.at(i << 8));
                    input = inArray.join("");
                    skipLast = true;
                    break;
                }
            }
        }
        
        // v1 & v2
        else if (lastChar in this.padChars.p4x[settings.version]) {
            inArray.splice(-1, 1, this.padChars.p4x[settings.version][lastChar]);
            input = inArray.join("");
            skipLast = true;
        }

        let output = this.converter.decode(input, this.charsets[settings.version], settings.littleEndian);

        if (skipLast) {
            output = new Uint8Array(output.buffer.slice(0, -1));
        }

        return this.utils.outputHandler.compile(output, settings.outputType);
    }
}
