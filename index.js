'use strict';

/**
 * @module transform-per-suffixes
 */
module.exports = transformPerSuffixes;

/* Architecture Note #1: Transform per suffixes

The idea is to recursively traverse a JavaScript object
 tree in order to find some suffixes and apply transformations
 to it.

We choose to use a functionnal signature but for performance
 reasons, we mutate the given object in place. This is then
 your responsibility to ensure that those side effects won't
 mess your app.
*/

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
        /* Architecture Note #1.1: Performance tip

        To avoid unecessary string comparison, we
        just skip it when the key is shorter than
        the suffix.
        */
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
