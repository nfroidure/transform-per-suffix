'use strict';

var transformPerSuffixes = require('./index');
var assert = require('assert');

describe('transform-per-suffixes', function() {
  describe('transformPerSuffixes()', function() {
    it('should work for a simple object', function() {
      assert.deepEqual(
        transformPerSuffixes(
          [
            {
              value: '_id',
              transform: function(n) {
                return Number(n);
              },
            },
            {
              value: '_date',
              transform: function(d) {
                return new Date(d);
              },
            },
          ],
          {
            _id: '1664',
            creation_date: '2015-11-28T16:22:47.552Z',
            value: 'Hey!',
          }
        ),
        {
          _id: 1664,
          creation_date: new Date('2015-11-28T16:22:47.552Z'),
          value: 'Hey!',
        }
      );
    });

    it('should work for a simple object with array', function() {
      assert.deepEqual(
        transformPerSuffixes(
          [
            {
              value: '_id',
              transform: function(n) {
                return Number(n);
              },
            },
            {
              value: '_date',
              transform: function(d) {
                return new Date(d);
              },
            },
          ],
          {
            objects: [
              {
                _id: '1664',
                creation_date: '2015-11-28T16:22:47.552Z',
                value: 'Hey!',
              },
              {
                _id: '1664',
                creation_date: '2015-11-28T16:22:47.552Z',
                value: 'Hey!',
              },
            ],
          }
        ),
        {
          objects: [
            {
              _id: 1664,
              creation_date: new Date('2015-11-28T16:22:47.552Z'),
              value: 'Hey!',
            },
            {
              _id: 1664,
              creation_date: new Date('2015-11-28T16:22:47.552Z'),
              value: 'Hey!',
            },
          ],
        }
      );
    });

    it('should work for a recursive object', function() {
      assert.deepEqual(
        transformPerSuffixes(
          [
            {
              value: '_id',
              transform: function(n) {
                return Number(n);
              },
            },
            {
              value: '_date',
              transform: function(d) {
                return new Date(d);
              },
            },
          ],
          {
            _id: '1664',
            creation_date: '2015-11-28T16:22:47.552Z',
            value: {
              _id: '1664',
              creation_date: '2015-11-28T16:22:47.552Z',
              value: {
                _id: '1664',
                creation_date: '2015-11-28T16:22:47.552Z',
                value: 'Hey!',
              },
            },
          }
        ),
        {
          _id: 1664,
          creation_date: new Date('2015-11-28T16:22:47.552Z'),
          value: {
            _id: 1664,
            creation_date: new Date('2015-11-28T16:22:47.552Z'),
            value: {
              _id: 1664,
              creation_date: new Date('2015-11-28T16:22:47.552Z'),
              value: 'Hey!',
            },
          },
        }
      );
    });
  });
});
