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

        // converter
        this.converter = new BaseConverter(1024, 5, 4);

        // predefined settings
        this.padding = true;
        this.version = "emojis_v1";

        // default settings
        this.charsets.emojis_v1 = [..."🀄🃏🅰🅱🅾🅿🆎🆑🆒🆓🆔🆕🆖🆗🆘🆙🆚🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🈁🈂🈚🈯🈲🈳🈴🈵🈶🈷🈸🈹🈺🉐🉑🌀🌁🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🌡🌤🌥🌦🌧🌨🌩🌪🌫🌬🌭🌮🌯🌰🌱🌲🌳🌴🌵🌶🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🍽🍾🍿🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🎖🎗🎙🎚🎛🎞🎟🎠🎡🎢🎣🎤🎥🎦🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🏋🏌🏎🏏🏐🏑🏒🏓🏔🏕🏖🏗🏘🏙🏚🏛🏜🏝🏞🏟🏠🏡🏢🏣🏤🏥🏦🏧🏨🏩🏪🏫🏬🏭🏮🏯🏰🏳🏴🏵🏷🏸🏹🏺🏻🏼🏽🏾🏿🐀🐁🐂🐃🐄🐅🐆🐇🐈🐉🐊🐋🐌🐍🐎🐏🐐🐑🐒🐓🐔🐕🐖🐗🐘🐙🐚🐛🐜🐝🐞🐟🐠🐡🐢🐣🐤🐥🐦🐧🐨🐩🐪🐫🐬🐭🐮🐯🐰🐱🐲🐳🐴🐵🐶🐷🐸🐹🐺🐻🐼🐽🐾🐿👀👁👂👃👄👅👆👇👈👉👊👋👌👍👎👏👐👑👒👓👔👕👖👗👘👙👚👛👜👝👞👟👠👡👢👣👤👥👦👧👨👩👪👫👬👭👮👯👰👱👲👳👴👵👶👷👸👹👺👻👼👽👾👿💀💁💂💃💄💅💆💇💈💉💊💋💌💍💎💏💐💑💒💓💔💕💖💗💘💙💚💛💜💝💞💟💠💡💢💣💤💥💦💧💨💩💪💫💬💭💮💯💰💱💲💳💴💵💶💷💸💹💺💻💼💽💾💿📀📁📂📃📄📅📆📇📈📉📊📋📌📍📎📏📐📒📓📔📕📖📗📘📙📚📛📜📝📞📟📠📡📢📣📤📥📦📧📨📩📪📫📬📭📮📯📰📱📲📳📴📵📶📷📸📹📺📻📼📽📿🔀🔁🔂🔃🔄🔅🔆🔇🔈🔉🔊🔋🔌🔍🔎🔏🔐🔑🔒🔓🔔🔕🔖🔗🔘🔙🔚🔛🔜🔝🔞🔟🔠🔡🔢🔣🔤🔥🔦🔧🔨🔩🔪🔫🔬🔭🔮🔯🔰🔱🔲🔳🔴🔵🔶🔷🔸🔹🔺🔻🔼🔽🕉🕊🕋🕌🕍🕎🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧🕯🕰🕳🕴🕵🕶🕷🕸🕹🕺🖇🖊🖋🖌🖍🖐🖕🖖🖤🖥🖨🖱🖲🖼🗂🗃🗄🗑🗒🗓🗜🗝🗞🗡🗣🗨🗯🗳🗺🗻🗼🗽🗾🗿😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙌🙍🙎🙏🚀🚁🚂🚃🚄🚅🚆🚇🚈🚉🚊🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🚚🚛🚜🚝🚞🚟🚠🚡🚢🚣🚤🚥🚦🚧🚨🚩🚪🚫🚬🚭🚮🚯🚰🚱🚲🚳🚴🚵🚶🚷🚸🚹🚺🚻🚼🚽🚾🚿🛀🛁🛂🛃🛄🛅🛋🛌🛍🛎🛏🛐🛑🛒🛠🛡🛢🛣🛤🛥🛩🛫🛬🛰🛳🛴🛵🛶🛷🛸🛹🤐🤑🤒🤓🤔🤕🤖🤗🤘🤙🤚🤛🤜🤝🤞🤟🤠🤡🤢🤣🤤🤥🤦🤧🤨🤩🤪🤫🤬🤭🤮🤯🤰🤱🤲🤳🤴🤵🤶🤷🤸🤹🤺🤼🤽🤾🥀🥁🥂🥃🥄🥅🥇🥈🥉🥊🥋🥌🥍🥎🥏🥐🥑🥒🥓🥔🥕🥖🥗🥘🥙🥚🥛🥜🥝🥞🥟🥠🥡🥢🥣🥤🥥🥦🥧🥨🥩🥪🥫🥬🥭🥮🥯🥰🥳🥴🥵🥶🥺🥼🥽🥾🥿🦀🦁🦂🦃🦄🦅🦆🦇🦈🦉🦊🦋🦌🦍🦎🦏🦐🦑🦒🦓🦔🦕🦖🦗🦘🦙🦚🦛🦜🦝🦞🦟🦠🦡🦢🦰🦱🦲🦳🦴🦵🦶🦷🦸🦹🧀🧁🧂🧐🧑🧒🧓🧔🧕"];
        this.charsets.emojis_v2 = [..."🀄🃏⏰⏳☔♈♉♊♋♌♍♎♏♐♑♒♓♿⚓⚡⚽⚾⛄⛅⛎⛔⛪⛲⛳⛵⛺⛽✊✋✨⭐🛕🛖🛗🛝🛞🛟🛺🈁🛻🤌🤏🤿🥱🥲🥸🥹🥻🦣🦤🦥🦦🦧🌀🌁🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🦨🦩🦪🦫🦬🦭🦮🦯🦺🦻🌭🌮🌯🌰🌱🌲🌳🌴🌵🦼🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🦽🍾🍿🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🦾🦿🧃🧄🧅🧆🧇🎠🎡🎢🎣🎤🎥🧈🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🧉🧊🧋🏏🏐🏑🏒🏓🧌🧍🧎🧏🧖🧗🧘🧙🧚🧛🧜🧝🏠🏡🏢🏣🏤🏥🏦🧞🏨🏩🏪🏫🏬🏭🏮🏯🏰🧟🏴🧠🧢🏸🏹🏺🧣🧤🧥🧦🧧🐀🐁🐂🐃🐄🐅🐆🐇🐈🐉🐊🐋🐌🐍🐎🐏🐐🐑🐒🐓🐔🐕🐖🐗🐘🐙🐚🐛🐜🐝🐞🐟🐠🐡🐢🐣🐤🐥🐦🐧🐨🐩🐪🐫🐬🐭🐮🐯🐰🐱🐲🐳🐴🐵🐶🐷🐸🐹🐺🐻🐼🐽🐾🧨👀🧩👂👃👄👅👆👇👈👉👊👋👌👍👎👏👐👑👒👓👔👕👖👗👘👙👚👛👜👝👞👟👠👡👢👣👤👥👦👧👨👩👪👫👬👭👮👯👰👱👲👳👴👵👶👷👸👹👺👻👼👽👾👿💀💁💂💃💄💅💆💇💈💉💊💋💌💍💎💏💐💑💒💓💔💕💖💗💘💙💚💛💜💝💞💟💠💡💢💣💤💥💦💧💨💩💪💫💬💭💮💯💰💱💲💳💴💵💶💷💸🧪💺💻💼💽💾💿📀🧫📂📃📄🧬📆📇📈📉📊📋📌📍📎📏📐📒📓📔📕📖📗📘📙📚📛📜📝📞📟📠📡📢📣📤📥📦📧📨📩📪📫📬📭📮📯📰📱📲📳🧭📵📶📷📸📹📺📻📼🧮📿🧯🧰🧱🧲🧳🔅🔆🔇🔈🔉🔊🔋🔌🔍🔎🔏🔐🔑🔒🔓🔔🔕🔖🔗🔘🧴🧵🧶🧷🧸🧹🧺🧻🧼🧽🧾🧿🔥🔦🔧🔨🔩🔪🔫🔬🔭🔮🔯🔰🔱🔲🔳🩰🩱🩲🩳🩴🩸🩹🩺🩻🩼🪀🪁🕋🕌🕍🕎🪂🪃🪄🪅🪆🪐🪑🪒🪓🪔🪕🪖🪗🪘🪙🪚🪛🪜🪝🪞🪟🪠🪡🪢🪣🪤🪥🪦🪧🪨🪩🪪🪫🕺🪬🪰🪱🪲🪳🪴🖕🖖🖤🪵🪶🪷🪸🪹🪺🫀🫁🫂🫃🫄🫅🫐🫑🫒🫓🫔🫕🫖🫗🗻🗼🗽🗾🗿😀😁😂😃😄😅😆😇😈😉😊😋😌😍😎😏😐😑😒😓😔😕😖😗😘😙😚😛😜😝😞😟😠😡😢😣😤😥😦😧😨😩😪😫😬😭😮😯😰😱😲😳😴😵😶😷😸😹😺😻😼😽😾😿🙀🙁🙂🙃🙄🙅🙆🙇🙈🙉🙊🙌🙍🙎🙏🚀🚁🚂🚃🚄🚅🚆🚇🚈🚉🚊🚋🚌🚍🚎🚏🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🚚🚛🚜🚝🚞🚟🚠🚡🚢🚣🚤🚥🚦🚧🚨🚩🚪🚫🚬🚭🚮🚯🚰🚱🚲🚳🚴🚵🚶🚷🚸🚹🚺🚻🚼🚽🚾🚿🛀🛁🛂🛃🛄🛅🫘🛌🫙🫠🫡🛐🛑🛒🫢🫣🫤🫥🫦🫧🫰🛫🛬🫱🫲🛴🛵🛶🛷🛸🛹🤐🤑🤒🤓🤔🤕🤖🤗🤘🤙🤚🤛🤜🤝🤞🤟🤠🤡🤢🤣🤤🤥🤦🤧🤨🤩🤪🤫🤬🤭🤮🤯🤰🤱🤲🤳🤴🤵🤶🤷🤸🤹🤺🤼🤽🤾🥀🥁🥂🥃🥄🥅🥇🥈🥉🥊🥋🥌🥍🥎🥏🥐🥑🥒🥓🥔🥕🥖🥗🥘🥙🥚🥛🥜🥝🥞🥟🥠🥡🥢🥣🥤🥥🥦🥧🥨🥩🥪🥫🥬🥭🥮🥯🥰🥳🥴🥵🥶🥺🥼🥽🥾🥿🦀🦁🦂🦃🦄🦅🦆🦇🦈🦉🦊🦋🦌🦍🦎🦏🦐🦑🦒🦓🦔🦕🦖🦗🦘🦙🦚🦛🦜🦝🦞🦟🦠🦡🦢🫳🫴🫵🫶🦴🦵🦶🦷🦸🦹🧀🧁🧂🧐🧑🧒🧓🧔🧕"];
        this.padChars = {
            default: "☕",
            p4x: {
                emojis_v1: [ "⚜", "🏍", "📑", "🙋" ],
                emojis_v2: [ "🥷", "🛼", "📑", "🙋" ]
            }
        }
        

        // apply user settings
        this.utils.validateArgs(args, true);
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
                const padArr = new Array(padValue).fill(this.padChars.default);
                outArray.splice(outArray.length-padValue, padValue, ...padArr);
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
        
        let skipLast = false;

        const applyPadding = (scope) => {
            
            let { input, settings } = scope;

            const charset = this.charsets[settings.version];
            const inArray = [...input];
            const lastChar = inArray.at(-1);

            for (let i=0; i<this.padChars.p4x[settings.version].length; i++) {                
                if (lastChar === this.padChars.p4x[settings.version].at(i)) {
                    inArray.splice(-1, 1, charset.at(i << 8));
                    input = inArray.join("");
                    skipLast = true;
                    break;
                }
            }

            return input;
        }
        
        
        const postFN = (scope) => {
            let { output } = scope;
            
            if (skipLast) {
                output = new Uint8Array(output.buffer.slice(0, -1));
            }
            return output;
        }

        return super.decode(input, applyPadding, postFN, ...args);
    
    }
}
