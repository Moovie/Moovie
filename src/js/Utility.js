/**
 * Moovie: an advanced HTML5 video player for MooTools.
 * @copyright 2010 Colin Aarts
 * @license MIT
 */

/**
 * Strip directory and suffix from filenames.
 * @link http://locutus.io/php/basename/
 * @author Kevin van Zonneveld (http://kvz.io)
 * @author Ash Searle (http://hexmen.com/blog/)
 * @author Lincoln Ramsay
 * @author djmix
 * @author Dmitry Gorelenkov
 * @param  {string} path   [description]
 * @param  {string} suffix If specified, removes suffix from returned string.
 * @return {string}        [description]
 */
const basename = function (path, suffix) {
    let b = path;
    const lastChar = b.charAt(b.length - 1);

    if (lastChar === '/' || lastChar === '\\') {
        b = b.slice(0, -1);
    }

    b = b.replace(/^.*[\/\\]/g, '');

    if (typeof suffix === 'string' && b.substr(b.length - suffix.length) === suffix) {
        b = b.substr(0, b.length - suffix.length);
    }

    return b;
};

/**
 * Separates a floating point value into different time values.
 * @param  {Number} input A floating point value.
 * @return {Object} An object containg: hh for hours, mm for minutes and ss for seconds.
 */
const parse = function (input) {
    return {
        hh: Math.floor(input / 3600),
        mm: Math.floor(input % 3600 / 60),
        ss: Math.ceil(input % 3600 % 60)
    };
};

/**
 * Converts a floating point value into a time string.
 * @param  {Number} input A floating point value.
 * @return {string} A string formatted to either: hh:mm:ss or mm:ss or m:ss
 */
const format = function (input) {
    let { hh, mm, ss } = parse(input);

    if (ss === 60) {
        ss = 0;
        mm = mm + 1;
    }

    if (ss < 10) {
        ss = '0' + ss;
    }

    if (mm === 60) {
        mm = 0;
        hh = hh + 1;
    }

    if (hh > 0 && mm < 10) {
        mm = '0' + mm;
    }

    if (hh === 0) {
        return `${mm}:${ss}`;
    }

    return `${hh}:${mm}:${ss}`;
};

/**
 * Retrieve attributes from an element.
 * @param  {Element} element An Element instance.
 * @return {Object} An object containing all defined element attributes.
 */
const getAttributes = function getAttributes(element) {
    const attributes = {};

    Array.convert(element.attributes).forEach((attribute) => {
        attributes[attribute.name] = attribute.value;
    });

    return attributes;
};

export { basename, format as formatSeconds, getAttributes };