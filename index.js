'use strict';

/**
 * @module transform-per-suffixes
 */
module.exports = transformPerSuffixes;

/**
 * Transform every properties of an object according to given suffixes.
 * @param {Array} suffixes An array of suffix definitions ({value: String, transform: Function})
 * @param {Object|Array} val The source Object/Array
 * @return {Object|Array} The modified object
 * @example
 * var object = {
 *   _id: 'abbacacaabbacacaabbacaca',
 *   creation_date: '2015-11-28T16:22:47.552Z',
 *   value: 'Hey!'
 * };
 * var suffixes = [{
 *   value: '_id',
 *   transform: castToObjectId,
 * }, {
 *   value: '_date',
 *   transform: function(d) { return new Date(d) },
 * }];
 *
 * console.log(transformPerSuffixes(suffixes, object));
 * // Prints:
 * // {
 * //   _id: ObjectId('abbacacaabbacacaabbacaca'),
 * //   creation_date: Date('2015-11-28T16:22:47.552Z'),
 * //   value: 'Hey!'
 * // }
 */

function transformPerSuffixes(suffixes, val) {
  if(val instanceof Array) {
    return val.map(transformPerSuffixes.bind(null, suffixes));
  }
  if('object' === typeof val && null !== val) {
    Object.keys(val).forEach(function(key) {
      if(suffixes.some(function(suffix) {
        if(key.length >= suffix.value.length &&
          key.indexOf(suffix.value) === key.length - suffix.value.length
        ) {
          val[key] = suffix.transform(val[key]);
          return true;
        }
        return false;
      })) {
        return;
      }
      val[key] = transformPerSuffixes(suffixes, val[key]);
    });
  }
  return val;
}
