/**
 * @param {string} str
 * @param {string} chars
 * @returns {string}
 */
function ltrim(str, chars) {
  // eslint-disable-next-line no-param-reassign
  chars = !chars ? ' \\s\u00A0' : chars.replace(/([[\]().?/*{}+$^:])/g, '$1');

  const re = new RegExp(`^[${chars}]+`, 'g');
  return str.replace(re, '');
}

/**
 * @param {Number} char
 * @returns {boolean}
 */
function isHiragana(char) {
  const c = Number(char);
  return (c >= 12353 && c <= 12435) || c === 12445 || c === 12446;
}

function hebonG(s) {
  let src = s;
  src = src.replace(/ん([aiueoy])/g, 'n$1');
  src = src.replace(/ん/g, 'n');
  src = src.replace(/n([bpm])/g, 'm$1');

  src = src.replace(/si/g, 'shi');
  src = src.replace(/ti/g, 'chi');
  src = src.replace(/tu/g, 'tsu');
  src = src.replace(/zi/g, 'ji');
  src = src.replace(/hu/g, 'fu');
  src = src.replace(/di/g, 'ji');
  src = src.replace(/du/g, 'zu');

  src = src.replace(/sy([auo])/g, 'sh$1');
  src = src.replace(/ty([auo])/g, 'ch$1');
  src = src.replace(/zy([auo])/g, 'j$1');

  const hebonGMap = {
    'kuぁ': 'kua', 'kuぃ': 'kui', 'kuぇ': 'kue', 'kuぉ': 'kuo',
    'guぁ': 'gua', 'guぃ': 'gui', 'guぇ': 'gue', 'guぉ': 'guo',
    'fuぁ': 'fua', 'fuぃ': 'fui', 'fuぇ': 'fue', 'fuぉ': 'fuo', 'fuょ': 'fuyo',
    'ゔぁ': 'bua', 'ゔぃ': 'bui', 'ゔぇ': 'bue', 'ゔぉ': 'buo', 'ゔ': 'bu', 
    'tsuぁ': 'tsua', 'tsuぃ': 'tsui', 'tsuぇ': 'tsue', 'tsuぉ': 'tsuo',

    'deぃ': 'dei', 'deゅ': 'deyu', 'doぅ': 'dou',
    'uぃ': 'ui', 'uぇ': 'ue', 'uぉ': 'uo',

    'iぇ': 'ie', 'jiぇ': 'jie', 'chiぇ': 'chie', 'teぃ': 'tei',
  };

  Object.keys(hebonGMap).forEach(key => {
    const reg = new RegExp(key, 'g');
    src = src.replace(reg, hebonGMap[key]);
  });

  src = src.replace(/aー/g, 'a');
  src = src.replace(/iー/g, 'i');
  src = src.replace(/u[ーu]/g, 'u');
  src = src.replace(/eー/g, 'e');
  src = src.replace(/o[ーu]/g, 'o');
  src = src.replace(/oo([a-z])/g, 'o$1');

  src = src.replace(/っch/g, 'tch');
  src = src.replace(/っ([kstnhmyrwgzdbp])/g, '$1$1');

  return src;
}

// eslint-disable-next-line no-irregular-whitespace
const kanaExtractionPattern = /[^ 　ぁあ-んー]/g;
const kanaCompactingPattern = /[ぁぃぅぇぉっゃゅょ]/g;
const romajiBaseMap = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'si', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'ti', 'つ': 'tu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'hu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'ゐ': 'i', 'ゑ': 'e', 'を': 'wo',

  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'zi', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'di', 'づ': 'du', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',

  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sya', 'しゅ': 'syu', 'しょ': 'syo',
  'ちゃ': 'tya', 'ちゅ': 'tyu', 'ちょ': 'tyo',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',

  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'zya', 'じゅ': 'zyu', 'じょ': 'zyo',
  'ぢゃ': 'dya', 'ぢゅ': 'dyu', 'ぢょ': 'dyo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',

  '、': ', ', '。': '. ', '　': ' ',
};

export default class AutoKana {
  /**
   * @param {string} name
   * @param {string} furigana
   * @param {object} option
   */
  constructor(name, furigana = '', option = {}) {
    this.isActive = true;
    this.timer = null;
    this.initializeValues();

    this.option = Object.assign(
      {
        katakana: false,
        roman: false,
        debug: false,
        checkInterval: 30, // milli seconds
      },
      option,
    );

    const elName = document.getElementById(ltrim(name, '#'));
    const elFurigana = document.getElementById(ltrim(furigana, '#'));

    if (!elName) throw new Error(`Element not found: ${name}`);

    this.elName = elName;
    this.registerEvents(this.elName);

    // furigana is optional
    if (elFurigana) {
      this.elFurigana = elFurigana;
    }
  }

  /**
   * Get kana.
   * @returns {string|*}
   */
  getFurigana() {
    return this.furigana;
  }

  /**
   * Start watching.
   */
  start() {
    this.isActive = true;
  }

  /**
   * Stop watching.
   */
  stop() {
    this.isActive = false;
  }

  /**
   * Toggle watch status.
   * @param event
   */
  toggle(event) {
    if (event) {
      const el = Event.element(event);
      if (el) {
        this.isActive = el.checked;
      }
    } else {
      this.isActive = !this.isActive;
    }
  }

  /**
   * @private
   */
  initializeValues() {
    this.baseKana = '';
    this.furigana = '';
    this.isConverting = false;
    this.ignoreString = '';
    this.input = '';
    this.values = [];
  }

  /**
   * Register events to element of name.
   * @param {HTMLElement} elName
   * @private
   */
  registerEvents(elName) {
    elName.addEventListener('blur', () => {
      this.debug('blur');
      this.clearInterval();
    });
    elName.addEventListener('focus', () => {
      this.debug('focus');
      this.onInput();
      this.setInterval();
    });
    elName.addEventListener('keydown', () => {
      this.debug('keydown');
      if (this.isConverting) {
        this.onInput();
      }
    });
  }

  /**
   * @private
   */
  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /**
   * @private
   * @param src
   * @returns {*}
   */
  toKatakana(src) {
    if (this.option.katakana) {
      let c;
      let str = '';
      for (let i = 0; i < src.length; i += 1) {
        c = src.charCodeAt(i);
        if (isHiragana(c)) {
          str += String.fromCharCode(c + 96);
        } else {
          str += src.charAt(i);
        }
      }
      return str;
    } else if (this.option.roman) {
      let romaji = '';
      for (let i = 0; i < src.length; i += 1) {
        const k = src.substr(i, 2);
        let r = romajiBaseMap[k];
        if (r) {
          i += 1;
          romaji += r;
          continue;
        }
        r = romajiBaseMap[k[0]];
        if (r) {
          romaji += r;
          continue;
        }
        romaji += k[0];
      }
      return hebonG(romaji);
    }
    return src;
  }

  /**
   * @private
   * @param newValues
   */
  setFurigana(newValues) {
    if (this.isConverting) return;

    if (newValues) {
      this.values = newValues;
    }
    if (this.isActive) {
      this.furigana = this.toKatakana(this.baseKana + this.values.join(''));
      if (this.elFurigana) {
        this.elFurigana.value = this.furigana;
      }
    }
  }

  /**
   * @private
   * @param newInput
   * @returns {*}
   */
  removeString(newInput) {
    if (newInput.indexOf(this.ignoreString) !== -1) {
      return String(newInput).replace(this.ignoreString, '');
    }
    const ignoreArray = this.ignoreString.split('');
    const inputArray = newInput.split('');
    for (let i = 0; i < ignoreArray.length; i += 1) {
      if (ignoreArray[i] === inputArray[i]) {
        inputArray[i] = '';
      }
    }
    return inputArray.join('');
  }

  /**
   * @private
   * @param newValues
   */
  checkConvert(newValues) {
    if (this.isConverting) return;

    if (Math.abs(this.values.length - newValues.length) > 1) {
      const tmpValues = newValues
        .join('')
        .replace(kanaCompactingPattern, '')
        .split('');
      if (
        Math.abs(newValues.length - tmpValues.length) < 2 &&
        Math.abs(this.values.length - tmpValues.length) > 1
      ) {
        this.onConvert();
      }
    } else if (
      this.values.length === this.input.length &&
      this.values.join('') !== this.input
    ) {
      if (this.input.match(kanaExtractionPattern)) {
        this.onConvert();
      }
    }
  }

  /**
   * Checks form value and set furigana.
   * @private
   */
  checkValue() {
    let newInput;
    newInput = this.elName.value;

    if (newInput === '') {
      this.initializeValues();
      this.setFurigana();
    } else {
      newInput = this.removeString(newInput);

      if (this.input === newInput) return; // no changes

      this.input = newInput;

      if (this.isConverting) return;

      const newValues = newInput.replace(kanaExtractionPattern, '').split('');
      this.checkConvert(newValues);
      this.setFurigana(newValues);
    }

    this.debug(this.input);
  }

  /**
   * @private
   */
  setInterval() {
    this.timer = setInterval(
      this.checkValue.bind(this),
      this.option.checkInterval,
    );
  }

  /**
   * @private
   */
  onInput() {
    if (this.elFurigana) {
      this.baseKana = this.elFurigana.value;
    }
    this.isConverting = false;
    this.ignoreString = this.elName.value;
  }

  /**
   * @private
   */
  onConvert() {
    this.baseKana = this.baseKana + this.values.join('');
    this.isConverting = true;
    this.values = [];
  }

  /**
   * @private
   * @param args
   */
  debug(...args) {
    if (this.option.debug) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }
}
