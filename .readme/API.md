# API
<a name="module_transform-per-suffixes"></a>

## transform-per-suffixes
<a name="module_transform-per-suffixes..transformPerSuffixes"></a>

### transform-per-suffixes~transformPerSuffixes(suffixes, val) ⇒ <code>Object</code> &#124; <code>Array</code>
Transform every properties of an object according to given suffixes.

**Kind**: inner method of <code>[transform-per-suffixes](#module_transform-per-suffixes)</code>  
**Returns**: <code>Object</code> &#124; <code>Array</code> - The modified object  

| Param | Type | Description |
| --- | --- | --- |
| suffixes | <code>Array</code> | An array of suffix definitions ({value: String, transform: Function}) |
| val | <code>Object</code> &#124; <code>Array</code> | The source Object/Array |

**Example**  
```js
var object = {
  _id: 'abbacacaabbacacaabbacaca',
  creation_date: '2015-11-28T16:22:47.552Z',
  value: 'Hey!'
};
var suffixes = [{
  value: '_id',
  transform: castToObjectId,
}, {
  value: '_date',
  transform: function(d) { return new Date(d) },
}];

console.log(transformPerSuffixes(suffixes, object));
// Prints:
// {
//   _id: ObjectId('abbacacaabbacacaabbacaca'),
//   creation_date: Date('2015-11-28T16:22:47.552Z'),
//   value: 'Hey!'
// }
```
