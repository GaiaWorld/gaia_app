_$define("blockchain/util/crypto", function (require, exports, module) {

  var bcryptoReq = (function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof bcryptoReq && bcryptoReq;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find mods '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a
          }
          var p = n[i] = {
            exps: {}
          };
          e[i][0].call(p.exps, function (r) {
            var n = e[i][1][r];
            return o(n || r)
          }, p, p.exps, r, e, n, t)
        }
        return n[i].exps
      }
      for (var u = "function" == typeof bcryptoReq && bcryptoReq, i = 0; i < t.length; i++) o(t[i]);
      return o
    }
    return r
  })()({
    "/bcrypto.js": [function (bcryptoReq, mods, exps) {
      /*!
       * bcrypto.js - crypto for bcoin
       * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
       * https://github.com/bcoin-org/bcoin
       */

      'use strict';

      var digest = bcryptoReq('./digest');
      var random = bcryptoReq('./random');
      var aes = bcryptoReq('./aes');

      exps.AEAD = bcryptoReq('./aead');
      exps.aes = bcryptoReq('./aes');
      exps.Blake2b = bcryptoReq('./blake2b');
      exps.ccmp = bcryptoReq('./ccmp');
      exps.ChaCha20 = bcryptoReq('./chacha20');
      exps.cleanse = bcryptoReq('./cleanse');
      exps.digest = bcryptoReq('./digest');
      exps.DRBG = bcryptoReq('./drbg');
      exps.Hash160 = bcryptoReq('./hash160');
      exps.Hash256 = bcryptoReq('./hash256');
      exps.hkdf = bcryptoReq('./hkdf');
      exps.HMAC = bcryptoReq('./hmac');
      exps.Keccak = bcryptoReq('./keccak');
      exps.merkle = bcryptoReq('./merkle');
      exps.pbkdf2 = bcryptoReq('./pbkdf2');
      exps.Poly1305 = bcryptoReq('./poly1305');
      exps.random = bcryptoReq('./random');
      exps.RIPEMD160 = bcryptoReq('./ripemd160');
      exps.secp256k1 = bcryptoReq('./secp256k1');
      exps.SHA1 = bcryptoReq('./sha1');
      exps.SHA256 = bcryptoReq('./sha256');
      exps.SHA3 = bcryptoReq('./sha3');
      exps.SHA512 = bcryptoReq('./sha512');

      exps.get = digest.get;
      exps.hash = digest.hash;
      exps.hmac = digest.hmac;
      exps.ripemd160 = digest.ripemd160;
      exps.sha1 = digest.sha1;
      exps.sha256 = digest.sha256;
      exps.sha512 = digest.sha512;
      exps.hash160 = digest.hash160;
      exps.hash256 = digest.hash256;
      exps.keccak = digest.keccak;
      exps.sha3 = digest.sha3;
      exps.blake2b = digest.blake2b;

      exps.encipher = aes.encipher;
      exps.decipher = aes.decipher;

      exps.randomBytes = random.randomBytes;
      exps.randomInt = random.randomInt;
      exps.randomRange = random.randomRange;

    }, {
      "./aead": 34,
      "./aes": 35,
      "./blake2b": 36,
      "./ccmp": 37,
      "./chacha20": 38,
      "./cleanse": 39,
      "./digest": 40,
      "./drbg": 41,
      "./hash160": 42,
      "./hash256": 43,
      "./hkdf": 44,
      "./hmac": 45,
      "./keccak": 46,
      "./merkle": 47,
      "./pbkdf2": 48,
      "./poly1305": 49,
      "./random": 50,
      "./ripemd160": 51,
      "./secp256k1": 52,
      "./sha1": 53,
      "./sha256": 54,
      "./sha3": 55,
      "./sha512": 56
    }],
    1: [function (bcryptoReq, mods, exps) {
      (function (global) {
        'use strict';

        // compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
        // original notice:

        /*!
         * The buffer mods from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
         * @license  MIT
         */
        function compare(a, b) {
          if (a === b) {
            return 0;
          }

          var x = a.length;
          var y = b.length;

          for (var i = 0, len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
              x = a[i];
              y = b[i];
              break;
            }
          }

          if (x < y) {
            return -1;
          }
          if (y < x) {
            return 1;
          }
          return 0;
        }

        function isBuffer(b) {
          if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
            return global.Buffer.isBuffer(b);
          }
          return !!(b != null && b._isBuffer);
        }

        // based on node assert, original notice:

        // http://wiki.commonjs.org/wiki/Unit_Testing/1.0
        //
        // THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
        //
        // Originally from narwhal.js (http://narwhaljs.org)
        // Copyright (c) 2009 Thomas Robinson <280north.com>
        //
        // Permission is hereby granted, free of charge, to any person obtaining a copy
        // of this software and associated documentation files (the 'Software'), to
        // deal in the Software without restriction, including without limitation the
        // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        // sell copies of the Software, and to permit persons to whom the Software is
        // furnished to do so, subject to the following conditions:
        //
        // The above copyright notice and this permission notice shall be included in
        // all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
        // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
        // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

        var util = bcryptoReq('util/');
        var hasOwn = Object.prototype.hasOwnProperty;
        var pSlice = Array.prototype.slice;
        var functionsHaveNames = (function () {
          return function foo() {}.name === 'foo';
        }());

        function pToString(obj) {
          return Object.prototype.toString.call(obj);
        }

        function isView(arrbuf) {
          if (isBuffer(arrbuf)) {
            return false;
          }
          if (typeof global.ArrayBuffer !== 'function') {
            return false;
          }
          if (typeof ArrayBuffer.isView === 'function') {
            return ArrayBuffer.isView(arrbuf);
          }
          if (!arrbuf) {
            return false;
          }
          if (arrbuf instanceof DataView) {
            return true;
          }
          if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
            return true;
          }
          return false;
        }
        // 1. The assert mods provides functions that throw
        // AssertionError's when particular conditions are not met. The
        // assert mods must conform to the following interface.

        var assert = mods.exps = ok;

        // 2. The AssertionError is defined in assert.
        // new assert.AssertionError({ message: message,
        //                             actual: actual,
        //                             expected: expected })

        var regex = /\s*function\s+([^\(\s]*)\s*/;
        // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
        function getName(func) {
          if (!util.isFunction(func)) {
            return;
          }
          if (functionsHaveNames) {
            return func.name;
          }
          var str = func.toString();
          var match = str.match(regex);
          return match && match[1];
        }
        assert.AssertionError = function AssertionError(options) {
          this.name = 'AssertionError';
          this.actual = options.actual;
          this.expected = options.expected;
          this.operator = options.operator;
          if (options.message) {
            this.message = options.message;
            this.generatedMessage = false;
          } else {
            this.message = getMessage(this);
            this.generatedMessage = true;
          }
          var stackStartFunction = options.stackStartFunction || fail;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, stackStartFunction);
          } else {
            // non v8 browsers so we can have a stacktrace
            var err = new Error();
            if (err.stack) {
              var out = err.stack;

              // try to strip useless frames
              var fn_name = getName(stackStartFunction);
              var idx = out.indexOf('\n' + fn_name);
              if (idx >= 0) {
                // once we have located the function frame
                // we need to strip out everything before it (and its line)
                var next_line = out.indexOf('\n', idx + 1);
                out = out.substring(next_line + 1);
              }

              this.stack = out;
            }
          }
        };

        // assert.AssertionError instanceof Error
        util.inherits(assert.AssertionError, Error);

        function truncate(s, n) {
          if (typeof s === 'string') {
            return s.length < n ? s : s.slice(0, n);
          } else {
            return s;
          }
        }

        function inspect(something) {
          if (functionsHaveNames || !util.isFunction(something)) {
            return util.inspect(something);
          }
          var rawname = getName(something);
          var name = rawname ? ': ' + rawname : '';
          return '[Function' + name + ']';
        }

        function getMessage(self) {
          return truncate(inspect(self.actual), 128) + ' ' +
            self.operator + ' ' +
            truncate(inspect(self.expected), 128);
        }

        // At present only the three keys mentioned above are used and
        // understood by the spec. Implementations or sub modules can pass
        // other keys to the AssertionError's constructor - they will be
        // ignored.

        // 3. All of the following functions must throw an AssertionError
        // when a corresponding condition is not met, with a message that
        // may be undefined if not provided.  All assertion methods provide
        // both the actual and expected values to the assertion error for
        // display purposes.

        function fail(actual, expected, message, operator, stackStartFunction) {
          throw new assert.AssertionError({
            message: message,
            actual: actual,
            expected: expected,
            operator: operator,
            stackStartFunction: stackStartFunction
          });
        }

        // EXTENSION! allows for well behaved errors defined elsewhere.
        assert.fail = fail;

        // 4. Pure assertion tests whether a value is truthy, as determined
        // by !!guard.
        // assert.ok(guard, message_opt);
        // This statement is equivalent to assert.equal(true, !!guard,
        // message_opt);. To test strictly for the value true, use
        // assert.strictEqual(true, guard, message_opt);.

        function ok(value, message) {
          if (!value) fail(value, true, message, '==', assert.ok);
        }
        assert.ok = ok;

        // 5. The equality assertion tests shallow, coercive equality with
        // ==.
        // assert.equal(actual, expected, message_opt);

        assert.equal = function equal(actual, expected, message) {
          if (actual != expected) fail(actual, expected, message, '==', assert.equal);
        };

        // 6. The non-equality assertion tests for whether two objects are not equal
        // with != assert.notEqual(actual, expected, message_opt);

        assert.notEqual = function notEqual(actual, expected, message) {
          if (actual == expected) {
            fail(actual, expected, message, '!=', assert.notEqual);
          }
        };

        // 7. The equivalence assertion tests a deep equality relation.
        // assert.deepEqual(actual, expected, message_opt);

        assert.deepEqual = function deepEqual(actual, expected, message) {
          if (!_deepEqual(actual, expected, false)) {
            fail(actual, expected, message, 'deepEqual', assert.deepEqual);
          }
        };

        assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
          if (!_deepEqual(actual, expected, true)) {
            fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
          }
        };

        function _deepEqual(actual, expected, strict, memos) {
          // 7.1. All identical values are equivalent, as determined by ===.
          if (actual === expected) {
            return true;
          } else if (isBuffer(actual) && isBuffer(expected)) {
            return compare(actual, expected) === 0;

            // 7.2. If the expected value is a Date object, the actual value is
            // equivalent if it is also a Date object that refers to the same time.
          } else if (util.isDate(actual) && util.isDate(expected)) {
            return actual.getTime() === expected.getTime();

            // 7.3 If the expected value is a RegExp object, the actual value is
            // equivalent if it is also a RegExp object with the same source and
            // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
          } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
            return actual.source === expected.source &&
              actual.global === expected.global &&
              actual.multiline === expected.multiline &&
              actual.lastIndex === expected.lastIndex &&
              actual.ignoreCase === expected.ignoreCase;

            // 7.4. Other pairs that do not both pass typeof value == 'object',
            // equivalence is determined by ==.
          } else if ((actual === null || typeof actual !== 'object') &&
            (expected === null || typeof expected !== 'object')) {
            return strict ? actual === expected : actual == expected;

            // If both values are instances of typed arrays, wrap their underlying
            // ArrayBuffers in a Buffer each to increase performance
            // This optimization requires the arrays to have the same type as checked by
            // Object.prototype.toString (aka pToString). Never perform binary
            // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
            // bit patterns are not identical.
          } else if (isView(actual) && isView(expected) &&
            pToString(actual) === pToString(expected) &&
            !(actual instanceof Float32Array ||
              actual instanceof Float64Array)) {
            return compare(new Uint8Array(actual.buffer),
              new Uint8Array(expected.buffer)) === 0;

            // 7.5 For all other Object pairs, including Array objects, equivalence is
            // determined by having the same number of owned properties (as verified
            // with Object.prototype.hasOwnProperty.call), the same set of keys
            // (although not necessarily the same order), equivalent values for every
            // corresponding key, and an identical 'prototype' property. Note: this
            // accounts for both named and indexed properties on Arrays.
          } else if (isBuffer(actual) !== isBuffer(expected)) {
            return false;
          } else {
            memos = memos || {
              actual: [],
              expected: []
            };

            var actualIndex = memos.actual.indexOf(actual);
            if (actualIndex !== -1) {
              if (actualIndex === memos.expected.indexOf(expected)) {
                return true;
              }
            }

            memos.actual.push(actual);
            memos.expected.push(expected);

            return objEquiv(actual, expected, strict, memos);
          }
        }

        function isArguments(object) {
          return Object.prototype.toString.call(object) == '[object Arguments]';
        }

        function objEquiv(a, b, strict, actualVisitedObjects) {
          if (a === null || a === undefined || b === null || b === undefined)
            return false;
          // if one is a primitive, the other must be same
          if (util.isPrimitive(a) || util.isPrimitive(b))
            return a === b;
          if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
          var aIsArgs = isArguments(a);
          var bIsArgs = isArguments(b);
          if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
            return false;
          if (aIsArgs) {
            a = pSlice.call(a);
            b = pSlice.call(b);
            return _deepEqual(a, b, strict);
          }
          var ka = objectKeys(a);
          var kb = objectKeys(b);
          var key, i;
          // having the same number of owned properties (keys incorporates
          // hasOwnProperty)
          if (ka.length !== kb.length)
            return false;
          //the same set of keys (although not necessarily the same order),
          ka.sort();
          kb.sort();
          //~~~cheap key test
          for (i = ka.length - 1; i >= 0; i--) {
            if (ka[i] !== kb[i])
              return false;
          }
          //equivalent values for every corresponding key, and
          //~~~possibly expensive deep test
          for (i = ka.length - 1; i >= 0; i--) {
            key = ka[i];
            if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
              return false;
          }
          return true;
        }

        // 8. The non-equivalence assertion tests for any deep inequality.
        // assert.notDeepEqual(actual, expected, message_opt);

        assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
          if (_deepEqual(actual, expected, false)) {
            fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
          }
        };

        assert.notDeepStrictEqual = notDeepStrictEqual;

        function notDeepStrictEqual(actual, expected, message) {
          if (_deepEqual(actual, expected, true)) {
            fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
          }
        }


        // 9. The strict equality assertion tests strict equality, as determined by ===.
        // assert.strictEqual(actual, expected, message_opt);

        assert.strictEqual = function strictEqual(actual, expected, message) {
          if (actual !== expected) {
            fail(actual, expected, message, '===', assert.strictEqual);
          }
        };

        // 10. The strict non-equality assertion tests for strict inequality, as
        // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

        assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
          if (actual === expected) {
            fail(actual, expected, message, '!==', assert.notStrictEqual);
          }
        };

        function expectedException(actual, expected) {
          if (!actual || !expected) {
            return false;
          }

          if (Object.prototype.toString.call(expected) == '[object RegExp]') {
            return expected.test(actual);
          }

          try {
            if (actual instanceof expected) {
              return true;
            }
          } catch (e) {
            // Ignore.  The instanceof check doesn't work for arrow functions.
          }

          if (Error.isPrototypeOf(expected)) {
            return false;
          }

          return expected.call({}, actual) === true;
        }

        function _tryBlock(block) {
          var error;
          try {
            block();
          } catch (e) {
            error = e;
          }
          return error;
        }

        function _throws(shouldThrow, block, expected, message) {
          var actual;

          if (typeof block !== 'function') {
            throw new TypeError('"block" argument must be a function');
          }

          if (typeof expected === 'string') {
            message = expected;
            expected = null;
          }

          actual = _tryBlock(block);

          message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

          if (shouldThrow && !actual) {
            fail(actual, expected, 'Missing expected exception' + message);
          }

          var userProvidedMessage = typeof message === 'string';
          var isUnwantedException = !shouldThrow && util.isError(actual);
          var isUnexpectedException = !shouldThrow && actual && !expected;

          if ((isUnwantedException &&
              userProvidedMessage &&
              expectedException(actual, expected)) ||
            isUnexpectedException) {
            fail(actual, expected, 'Got unwanted exception' + message);
          }

          if ((shouldThrow && actual && expected &&
              !expectedException(actual, expected)) || (!shouldThrow && actual)) {
            throw actual;
          }
        }

        // 11. Expected to throw an error:
        // assert.throws(block, Error_opt, message_opt);

        assert.throws = function (block, /*optional*/ error, /*optional*/ message) {
          _throws(true, block, error, message);
        };

        // EXTENSION! This is annoying to write outside this mods.
        assert.doesNotThrow = function (block, /*optional*/ error, /*optional*/ message) {
          _throws(false, block, error, message);
        };

        assert.ifError = function (err) {
          if (err) throw err;
        };

        var objectKeys = Object.keys || function (obj) {
          var keys = [];
          for (var key in obj) {
            if (hasOwn.call(obj, key)) keys.push(key);
          }
          return keys;
        };

      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "util/": 33
    }],
    2: [function (bcryptoReq, mods, exps) {
      'use strict'

      exps.byteLength = byteLength
      exps.toByteArray = toByteArray
      exps.fromByteArray = fromByteArray

      var lookup = []
      var revLookup = []
      var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

      var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i]
        revLookup[code.charCodeAt(i)] = i
      }

      // Support decoding URL-safe base64 strings, as Node.js does.
      // See: https://en.wikipedia.org/wiki/Base64#URL_applications
      revLookup['-'.charCodeAt(0)] = 62
      revLookup['_'.charCodeAt(0)] = 63

      function getLens(b64) {
        var len = b64.length

        if (len % 4 > 0) {
          throw new Error('Invalid string. Length must be a multiple of 4')
        }

        // Trim off extra bytes after placeholder bytes are found
        // See: https://github.com/beatgammit/base64-js/issues/42
        var validLen = b64.indexOf('=')
        if (validLen === -1) validLen = len

        var placeHoldersLen = validLen === len ?
          0 :
          4 - (validLen % 4)

        return [validLen, placeHoldersLen]
      }

      // base64 is 4/3 + up to two characters of the original data
      function byteLength(b64) {
        var lens = getLens(b64)
        var validLen = lens[0]
        var placeHoldersLen = lens[1]
        return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
      }

      function _byteLength(b64, validLen, placeHoldersLen) {
        return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
      }

      function toByteArray(b64) {
        var tmp
        var lens = getLens(b64)
        var validLen = lens[0]
        var placeHoldersLen = lens[1]

        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

        var curByte = 0

        // if there are placeholders, only get up to the last complete 4 chars
        var len = placeHoldersLen > 0 ?
          validLen - 4 :
          validLen

        for (var i = 0; i < len; i += 4) {
          tmp =
            (revLookup[b64.charCodeAt(i)] << 18) |
            (revLookup[b64.charCodeAt(i + 1)] << 12) |
            (revLookup[b64.charCodeAt(i + 2)] << 6) |
            revLookup[b64.charCodeAt(i + 3)]
          arr[curByte++] = (tmp >> 16) & 0xFF
          arr[curByte++] = (tmp >> 8) & 0xFF
          arr[curByte++] = tmp & 0xFF
        }

        if (placeHoldersLen === 2) {
          tmp =
            (revLookup[b64.charCodeAt(i)] << 2) |
            (revLookup[b64.charCodeAt(i + 1)] >> 4)
          arr[curByte++] = tmp & 0xFF
        }

        if (placeHoldersLen === 1) {
          tmp =
            (revLookup[b64.charCodeAt(i)] << 10) |
            (revLookup[b64.charCodeAt(i + 1)] << 4) |
            (revLookup[b64.charCodeAt(i + 2)] >> 2)
          arr[curByte++] = (tmp >> 8) & 0xFF
          arr[curByte++] = tmp & 0xFF
        }

        return arr
      }

      function tripletToBase64(num) {
        return lookup[num >> 18 & 0x3F] +
          lookup[num >> 12 & 0x3F] +
          lookup[num >> 6 & 0x3F] +
          lookup[num & 0x3F]
      }

      function encodeChunk(uint8, start, end) {
        var tmp
        var output = []
        for (var i = start; i < end; i += 3) {
          tmp =
            ((uint8[i] << 16) & 0xFF0000) +
            ((uint8[i + 1] << 8) & 0xFF00) +
            (uint8[i + 2] & 0xFF)
          output.push(tripletToBase64(tmp))
        }
        return output.join('')
      }

      function fromByteArray(uint8) {
        var tmp
        var len = uint8.length
        var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
        var parts = []
        var maxChunkLength = 16383 // must be multiple of 3

        // go through the array every three bytes, we'll deal with trailing stuff later
        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk(
            uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
          ))
        }

        // pad the end with zeros, but make sure to not forget the extra bytes
        if (extraBytes === 1) {
          tmp = uint8[len - 1]
          parts.push(
            lookup[tmp >> 2] +
            lookup[(tmp << 4) & 0x3F] +
            '=='
          )
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + uint8[len - 1]
          parts.push(
            lookup[tmp >> 10] +
            lookup[(tmp >> 4) & 0x3F] +
            lookup[(tmp << 2) & 0x3F] +
            '='
          )
        }

        return parts.join('')
      }

    }, {}],
    3: [function (bcryptoReq, mods, exps) {

    }, {}],
    4: [function (bcryptoReq, mods, exps) {
      /*!
       * The buffer mods from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      /* eslint-disable no-proto */

      'use strict'

      var base64 = bcryptoReq('base64-js')
      var ieee754 = bcryptoReq('ieee754')

      exps.Buffer = Buffer
      exps.SlowBuffer = SlowBuffer
      exps.INSPECT_MAX_BYTES = 50

      var K_MAX_LENGTH = 0x7fffffff
      exps.kMaxLength = K_MAX_LENGTH

      /**
       * If `Buffer.TYPED_ARRAY_SUPPORT`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Print warning and recommend using `buffer` v4.x which has an Object
       *               implementation (most compatible, even IE6)
       *
       * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
       * Opera 11.6+, iOS 4.2+.
       *
       * We report that the browser does not support typed arrays if the are not subclassable
       * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
       * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
       * for __proto__ and has a buggy typed array implementation.
       */
      Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

      if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
        typeof console.error === 'function') {
        console.error(
          'This browser lacks typed array (Uint8Array) support which is required by ' +
          '`buffer` v5.x. Use `buffer` v4.x if you bcryptoReq old browser support.'
        )
      }

      function typedArraySupport() {
        // Can typed array instances can be augmented?
        try {
          var arr = new Uint8Array(1)
          arr.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function () {
              return 42
            }
          }
          return arr.foo() === 42
        } catch (e) {
          return false
        }
      }

      Object.defineProperty(Buffer.prototype, 'parent', {
        get: function () {
          if (!(this instanceof Buffer)) {
            return undefined
          }
          return this.buffer
        }
      })

      Object.defineProperty(Buffer.prototype, 'offset', {
        get: function () {
          if (!(this instanceof Buffer)) {
            return undefined
          }
          return this.byteOffset
        }
      })

      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('Invalid typed array length')
        }
        // Return an augmented `Uint8Array` instance
        var buf = new Uint8Array(length)
        buf.__proto__ = Buffer.prototype
        return buf
      }

      /**
       * The Buffer constructor returns instances of `Uint8Array` that have their
       * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
       * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
       * and the `Uint8Array` methods. Square bracket notation works as expected -- it
       * returns a single octet.
       *
       * The `Uint8Array` prototype remains unmodified.
       */

      function Buffer(arg, encodingOrOffset, length) {
        // Common case.
        if (typeof arg === 'number') {
          if (typeof encodingOrOffset === 'string') {
            throw new Error(
              'If encoding is specified then the first argument must be a string'
            )
          }
          return allocUnsafe(arg)
        }
        return from(arg, encodingOrOffset, length)
      }

      // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
      if (typeof Symbol !== 'undefined' && Symbol.species &&
        Buffer[Symbol.species] === Buffer) {
        Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true,
          enumerable: false,
          writable: false
        })
      }

      Buffer.poolSize = 8192 // not used by this implementation

      function from(value, encodingOrOffset, length) {
        if (typeof value === 'number') {
          throw new TypeError('"value" argument must not be a number')
        }

        if (isArrayBuffer(value) || (value && isArrayBuffer(value.buffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length)
        }

        if (typeof value === 'string') {
          return fromString(value, encodingOrOffset)
        }

        return fromObject(value)
      }

      /**
       * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
       * if value is a number.
       * Buffer.from(str[, encoding])
       * Buffer.from(array)
       * Buffer.from(buffer)
       * Buffer.from(arrayBuffer[, byteOffset[, length]])
       **/
      Buffer.from = function (value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length)
      }

      // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
      // https://github.com/feross/buffer/pull/148
      Buffer.prototype.__proto__ = Uint8Array.prototype
      Buffer.__proto__ = Uint8Array

      function assertSize(size) {
        if (typeof size !== 'number') {
          throw new TypeError('"size" argument must be of type number')
        } else if (size < 0) {
          throw new RangeError('"size" argument must not be negative')
        }
      }

      function alloc(size, fill, encoding) {
        assertSize(size)
        if (size <= 0) {
          return createBuffer(size)
        }
        if (fill !== undefined) {
          // Only pay attention to encoding if it's a string. This
          // prevents accidentally sending in a number that would
          // be interpretted as a start offset.
          return typeof encoding === 'string' ?
            createBuffer(size).fill(fill, encoding) :
            createBuffer(size).fill(fill)
        }
        return createBuffer(size)
      }

      /**
       * Creates a new filled Buffer instance.
       * alloc(size[, fill[, encoding]])
       **/
      Buffer.alloc = function (size, fill, encoding) {
        return alloc(size, fill, encoding)
      }

      function allocUnsafe(size) {
        assertSize(size)
        return createBuffer(size < 0 ? 0 : checked(size) | 0)
      }

      /**
       * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
       * */
      Buffer.allocUnsafe = function (size) {
        return allocUnsafe(size)
      }
      /**
       * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
       */
      Buffer.allocUnsafeSlow = function (size) {
        return allocUnsafe(size)
      }

      function fromString(string, encoding) {
        if (typeof encoding !== 'string' || encoding === '') {
          encoding = 'utf8'
        }

        if (!Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding)
        }

        var length = byteLength(string, encoding) | 0
        var buf = createBuffer(length)

        var actual = buf.write(string, encoding)

        if (actual !== length) {
          // Writing a hex string, for example, that contains invalid characters will
          // cause everything after the first invalid character to be ignored. (e.g.
          // 'abxxcd' will be treated as 'ab')
          buf = buf.slice(0, actual)
        }

        return buf
      }

      function fromArrayLike(array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0
        var buf = createBuffer(length)
        for (var i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255
        }
        return buf
      }

      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds')
        }

        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds')
        }

        var buf
        if (byteOffset === undefined && length === undefined) {
          buf = new Uint8Array(array)
        } else if (length === undefined) {
          buf = new Uint8Array(array, byteOffset)
        } else {
          buf = new Uint8Array(array, byteOffset, length)
        }

        // Return an augmented `Uint8Array` instance
        buf.__proto__ = Buffer.prototype
        return buf
      }

      function fromObject(obj) {
        if (Buffer.isBuffer(obj)) {
          var len = checked(obj.length) | 0
          var buf = createBuffer(len)

          if (buf.length === 0) {
            return buf
          }

          obj.copy(buf, 0, 0, len)
          return buf
        }

        if (obj) {
          if (ArrayBuffer.isView(obj) || 'length' in obj) {
            if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
              return createBuffer(0)
            }
            return fromArrayLike(obj)
          }

          if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
            return fromArrayLike(obj.data)
          }
        }

        throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.')
      }

      function checked(length) {
        // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
        // length is NaN (which is otherwise coerced to zero.)
        if (length >= K_MAX_LENGTH) {
          throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
            'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
        }
        return length | 0
      }

      function SlowBuffer(length) {
        if (+length != length) { // eslint-disable-line eqeqeq
          length = 0
        }
        return Buffer.alloc(+length)
      }

      Buffer.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true
      }

      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
          throw new TypeError('Arguments must be Buffers')
        }

        if (a === b) return 0

        var x = a.length
        var y = b.length

        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i]
            y = b[i]
            break
          }
        }

        if (x < y) return -1
        if (y < x) return 1
        return 0
      }

      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'latin1':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true
          default:
            return false
        }
      }

      Buffer.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers')
        }

        if (list.length === 0) {
          return Buffer.alloc(0)
        }

        var i
        if (length === undefined) {
          length = 0
          for (i = 0; i < list.length; ++i) {
            length += list[i].length
          }
        }

        var buffer = Buffer.allocUnsafe(length)
        var pos = 0
        for (i = 0; i < list.length; ++i) {
          var buf = list[i]
          if (ArrayBuffer.isView(buf)) {
            buf = Buffer.from(buf)
          }
          if (!Buffer.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers')
          }
          buf.copy(buffer, pos)
          pos += buf.length
        }
        return buffer
      }

      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) {
          return string.length
        }
        if (ArrayBuffer.isView(string) || isArrayBuffer(string)) {
          return string.byteLength
        }
        if (typeof string !== 'string') {
          string = '' + string
        }

        var len = string.length
        if (len === 0) return 0

        // Use a for loop to avoid recursion
        var loweredCase = false
        for (;;) {
          switch (encoding) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return len
            case 'utf8':
            case 'utf-8':
            case undefined:
              return utf8ToBytes(string).length
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return len * 2
            case 'hex':
              return len >>> 1
            case 'base64':
              return base64ToBytes(string).length
            default:
              if (loweredCase) return utf8ToBytes(string).length // assume utf8
              encoding = ('' + encoding).toLowerCase()
              loweredCase = true
          }
        }
      }
      Buffer.byteLength = byteLength

      function slowToString(encoding, start, end) {
        var loweredCase = false

        // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
        // property of a typed array.

        // This behaves neither like String nor Uint8Array in that we set start/end
        // to their upper/lower bounds if the value passed is out of range.
        // undefined is handled specially as per ECMA-262 6th Edition,
        // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
        if (start === undefined || start < 0) {
          start = 0
        }
        // Return early if start > this.length. Done here to prevent potential uint32
        // coercion fail below.
        if (start > this.length) {
          return ''
        }

        if (end === undefined || end > this.length) {
          end = this.length
        }

        if (end <= 0) {
          return ''
        }

        // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
        end >>>= 0
        start >>>= 0

        if (end <= start) {
          return ''
        }

        if (!encoding) encoding = 'utf8'

        while (true) {
          switch (encoding) {
            case 'hex':
              return hexSlice(this, start, end)

            case 'utf8':
            case 'utf-8':
              return utf8Slice(this, start, end)

            case 'ascii':
              return asciiSlice(this, start, end)

            case 'latin1':
            case 'binary':
              return latin1Slice(this, start, end)

            case 'base64':
              return base64Slice(this, start, end)

            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return utf16leSlice(this, start, end)

            default:
              if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
              encoding = (encoding + '').toLowerCase()
              loweredCase = true
          }
        }
      }

      // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
      // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
      // reliably in a browserify context because there could be multiple different
      // copies of the 'buffer' package in use. This method works even for Buffer
      // instances that were created from another copy of the `buffer` package.
      // See: https://github.com/feross/buffer/issues/154
      Buffer.prototype._isBuffer = true

      function swap(b, n, m) {
        var i = b[n]
        b[n] = b[m]
        b[m] = i
      }

      Buffer.prototype.swap16 = function swap16() {
        var len = this.length
        if (len % 2 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 16-bits')
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1)
        }
        return this
      }

      Buffer.prototype.swap32 = function swap32() {
        var len = this.length
        if (len % 4 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 32-bits')
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3)
          swap(this, i + 1, i + 2)
        }
        return this
      }

      Buffer.prototype.swap64 = function swap64() {
        var len = this.length
        if (len % 8 !== 0) {
          throw new RangeError('Buffer size must be a multiple of 64-bits')
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7)
          swap(this, i + 1, i + 6)
          swap(this, i + 2, i + 5)
          swap(this, i + 3, i + 4)
        }
        return this
      }

      Buffer.prototype.toString = function toString() {
        var length = this.length
        if (length === 0) return ''
        if (arguments.length === 0) return utf8Slice(this, 0, length)
        return slowToString.apply(this, arguments)
      }

      Buffer.prototype.toLocaleString = Buffer.prototype.toString

      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
        if (this === b) return true
        return Buffer.compare(this, b) === 0
      }

      Buffer.prototype.inspect = function inspect() {
        var str = ''
        var max = exps.INSPECT_MAX_BYTES
        if (this.length > 0) {
          str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
          if (this.length > max) str += ' ... '
        }
        return '<Buffer ' + str + '>'
      }

      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (!Buffer.isBuffer(target)) {
          throw new TypeError('Argument must be a Buffer')
        }

        if (start === undefined) {
          start = 0
        }
        if (end === undefined) {
          end = target ? target.length : 0
        }
        if (thisStart === undefined) {
          thisStart = 0
        }
        if (thisEnd === undefined) {
          thisEnd = this.length
        }

        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError('out of range index')
        }

        if (thisStart >= thisEnd && start >= end) {
          return 0
        }
        if (thisStart >= thisEnd) {
          return -1
        }
        if (start >= end) {
          return 1
        }

        start >>>= 0
        end >>>= 0
        thisStart >>>= 0
        thisEnd >>>= 0

        if (this === target) return 0

        var x = thisEnd - thisStart
        var y = end - start
        var len = Math.min(x, y)

        var thisCopy = this.slice(thisStart, thisEnd)
        var targetCopy = target.slice(start, end)

        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i]
            y = targetCopy[i]
            break
          }
        }

        if (x < y) return -1
        if (y < x) return 1
        return 0
      }

      // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
      // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
      //
      // Arguments:
      // - buffer - a Buffer to search
      // - val - a string, Buffer, or number
      // - byteOffset - an index into `buffer`; will be clamped to an int32
      // - encoding - an optional encoding, relevant is val is a string
      // - dir - true for indexOf, false for lastIndexOf
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        // Empty buffer means no match
        if (buffer.length === 0) return -1

        // Normalize byteOffset
        if (typeof byteOffset === 'string') {
          encoding = byteOffset
          byteOffset = 0
        } else if (byteOffset > 0x7fffffff) {
          byteOffset = 0x7fffffff
        } else if (byteOffset < -0x80000000) {
          byteOffset = -0x80000000
        }
        byteOffset = +byteOffset // Coerce to Number.
        if (numberIsNaN(byteOffset)) {
          // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
          byteOffset = dir ? 0 : (buffer.length - 1)
        }

        // Normalize byteOffset: negative offsets start from the end of the buffer
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset
        if (byteOffset >= buffer.length) {
          if (dir) return -1
          else byteOffset = buffer.length - 1
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0
          else return -1
        }

        // Normalize val
        if (typeof val === 'string') {
          val = Buffer.from(val, encoding)
        }

        // Finally, search either indexOf (if dir is true) or lastIndexOf
        if (Buffer.isBuffer(val)) {
          // Special case: looking for empty string/buffer always fails
          if (val.length === 0) {
            return -1
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
        } else if (typeof val === 'number') {
          val = val & 0xFF // Search for a byte value [0-255]
          if (typeof Uint8Array.prototype.indexOf === 'function') {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
        }

        throw new TypeError('val must be string, number or Buffer')
      }

      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1
        var arrLength = arr.length
        var valLength = val.length

        if (encoding !== undefined) {
          encoding = String(encoding).toLowerCase()
          if (encoding === 'ucs2' || encoding === 'ucs-2' ||
            encoding === 'utf16le' || encoding === 'utf-16le') {
            if (arr.length < 2 || val.length < 2) {
              return -1
            }
            indexSize = 2
            arrLength /= 2
            valLength /= 2
            byteOffset /= 2
          }
        }

        function read(buf, i) {
          if (indexSize === 1) {
            return buf[i]
          } else {
            return buf.readUInt16BE(i * indexSize)
          }
        }

        var i
        if (dir) {
          var foundIndex = -1
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
            } else {
              if (foundIndex !== -1) i -= i - foundIndex
              foundIndex = -1
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
          for (i = byteOffset; i >= 0; i--) {
            var found = true
            for (var j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false
                break
              }
            }
            if (found) return i
          }
        }

        return -1
      }

      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1
      }

      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
      }

      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
      }

      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0
        var remaining = buf.length - offset
        if (!length) {
          length = remaining
        } else {
          length = Number(length)
          if (length > remaining) {
            length = remaining
          }
        }

        var strLen = string.length

        if (length > strLen / 2) {
          length = strLen / 2
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16)
          if (numberIsNaN(parsed)) return i
          buf[offset + i] = parsed
        }
        return i
      }

      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
      }

      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length)
      }

      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length)
      }

      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length)
      }

      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
      }

      Buffer.prototype.write = function write(string, offset, length, encoding) {
        // Buffer#write(string)
        if (offset === undefined) {
          encoding = 'utf8'
          length = this.length
          offset = 0
          // Buffer#write(string, encoding)
        } else if (length === undefined && typeof offset === 'string') {
          encoding = offset
          length = this.length
          offset = 0
          // Buffer#write(string, offset[, length][, encoding])
        } else if (isFinite(offset)) {
          offset = offset >>> 0
          if (isFinite(length)) {
            length = length >>> 0
            if (encoding === undefined) encoding = 'utf8'
          } else {
            encoding = length
            length = undefined
          }
        } else {
          throw new Error(
            'Buffer.write(string, encoding, offset[, length]) is no longer supported'
          )
        }

        var remaining = this.length - offset
        if (length === undefined || length > remaining) length = remaining

        if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
          throw new RangeError('Attempt to write outside buffer bounds')
        }

        if (!encoding) encoding = 'utf8'

        var loweredCase = false
        for (;;) {
          switch (encoding) {
            case 'hex':
              return hexWrite(this, string, offset, length)

            case 'utf8':
            case 'utf-8':
              return utf8Write(this, string, offset, length)

            case 'ascii':
              return asciiWrite(this, string, offset, length)

            case 'latin1':
            case 'binary':
              return latin1Write(this, string, offset, length)

            case 'base64':
              // Warning: maxLength not taken into account in base64Write
              return base64Write(this, string, offset, length)

            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return ucs2Write(this, string, offset, length)

            default:
              if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
              encoding = ('' + encoding).toLowerCase()
              loweredCase = true
          }
        }
      }

      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        }
      }

      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf)
        } else {
          return base64.fromByteArray(buf.slice(start, end))
        }
      }

      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end)
        var res = []

        var i = start
        while (i < end) {
          var firstByte = buf[i]
          var codePoint = null
          var bytesPerSequence = (firstByte > 0xEF) ? 4 :
            (firstByte > 0xDF) ? 3 :
            (firstByte > 0xBF) ? 2 :
            1

          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint

            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 0x80) {
                  codePoint = firstByte
                }
                break
              case 2:
                secondByte = buf[i + 1]
                if ((secondByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
                  if (tempCodePoint > 0x7F) {
                    codePoint = tempCodePoint
                  }
                }
                break
              case 3:
                secondByte = buf[i + 1]
                thirdByte = buf[i + 2]
                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
                  if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                    codePoint = tempCodePoint
                  }
                }
                break
              case 4:
                secondByte = buf[i + 1]
                thirdByte = buf[i + 2]
                fourthByte = buf[i + 3]
                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
                  if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                    codePoint = tempCodePoint
                  }
                }
            }
          }

          if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD
            bytesPerSequence = 1
          } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000
            res.push(codePoint >>> 10 & 0x3FF | 0xD800)
            codePoint = 0xDC00 | codePoint & 0x3FF
          }

          res.push(codePoint)
          i += bytesPerSequence
        }

        return decodeCodePointsArray(res)
      }

      // Based on http://stackoverflow.com/a/22747272/680742, the browser with
      // the lowest limit is Chrome, with 0x10000 args.
      // We go 1 magnitude less, for safety
      var MAX_ARGUMENTS_LENGTH = 0x1000

      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
        }

        // Decode in chunks to avoid "call stack size exceeded".
        var res = ''
        var i = 0
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          )
        }
        return res
      }

      function asciiSlice(buf, start, end) {
        var ret = ''
        end = Math.min(buf.length, end)

        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 0x7F)
        }
        return ret
      }

      function latin1Slice(buf, start, end) {
        var ret = ''
        end = Math.min(buf.length, end)

        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i])
        }
        return ret
      }

      function hexSlice(buf, start, end) {
        var len = buf.length

        if (!start || start < 0) start = 0
        if (!end || end < 0 || end > len) end = len

        var out = ''
        for (var i = start; i < end; ++i) {
          out += toHex(buf[i])
        }
        return out
      }

      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end)
        var res = ''
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
        }
        return res
      }

      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length
        start = ~~start
        end = end === undefined ? len : ~~end

        if (start < 0) {
          start += len
          if (start < 0) start = 0
        } else if (start > len) {
          start = len
        }

        if (end < 0) {
          end += len
          if (end < 0) end = 0
        } else if (end > len) {
          end = len
        }

        if (end < start) end = start

        var newBuf = this.subarray(start, end)
        // Return an augmented `Uint8Array` instance
        newBuf.__proto__ = Buffer.prototype
        return newBuf
      }

      /*
       * Need to make sure that buffer isn't trying to write out of bounds.
       */
      function checkOffset(offset, ext, length) {
        if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
        if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
      }

      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) checkOffset(offset, byteLength, this.length)

        var val = this[offset]
        var mul = 1
        var i = 0
        while (++i < byteLength && (mul *= 0x100)) {
          val += this[offset + i] * mul
        }

        return val
      }

      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) {
          checkOffset(offset, byteLength, this.length)
        }

        var val = this[offset + --byteLength]
        var mul = 1
        while (byteLength > 0 && (mul *= 0x100)) {
          val += this[offset + --byteLength] * mul
        }

        return val
      }

      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 1, this.length)
        return this[offset]
      }

      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        return this[offset] | (this[offset + 1] << 8)
      }

      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        return (this[offset] << 8) | this[offset + 1]
      }

      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return ((this[offset]) |
            (this[offset + 1] << 8) |
            (this[offset + 2] << 16)) +
          (this[offset + 3] * 0x1000000)
      }

      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return (this[offset] * 0x1000000) +
          ((this[offset + 1] << 16) |
            (this[offset + 2] << 8) |
            this[offset + 3])
      }

      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) checkOffset(offset, byteLength, this.length)

        var val = this[offset]
        var mul = 1
        var i = 0
        while (++i < byteLength && (mul *= 0x100)) {
          val += this[offset + i] * mul
        }
        mul *= 0x80

        if (val >= mul) val -= Math.pow(2, 8 * byteLength)

        return val
      }

      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) checkOffset(offset, byteLength, this.length)

        var i = byteLength
        var mul = 1
        var val = this[offset + --i]
        while (i > 0 && (mul *= 0x100)) {
          val += this[offset + --i] * mul
        }
        mul *= 0x80

        if (val >= mul) val -= Math.pow(2, 8 * byteLength)

        return val
      }

      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 1, this.length)
        if (!(this[offset] & 0x80)) return (this[offset])
        return ((0xff - this[offset] + 1) * -1)
      }

      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        var val = this[offset] | (this[offset + 1] << 8)
        return (val & 0x8000) ? val | 0xFFFF0000 : val
      }

      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 2, this.length)
        var val = this[offset + 1] | (this[offset] << 8)
        return (val & 0x8000) ? val | 0xFFFF0000 : val
      }

      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return (this[offset]) |
          (this[offset + 1] << 8) |
          (this[offset + 2] << 16) |
          (this[offset + 3] << 24)
      }

      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)

        return (this[offset] << 24) |
          (this[offset + 1] << 16) |
          (this[offset + 2] << 8) |
          (this[offset + 3])
      }

      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)
        return ieee754.read(this, offset, true, 23, 4)
      }

      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 4, this.length)
        return ieee754.read(this, offset, false, 23, 4)
      }

      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 8, this.length)
        return ieee754.read(this, offset, true, 52, 8)
      }

      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0
        if (!noAssert) checkOffset(offset, 8, this.length)
        return ieee754.read(this, offset, false, 52, 8)
      }

      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
        if (offset + ext > buf.length) throw new RangeError('Index out of range')
      }

      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1
          checkInt(this, value, offset, byteLength, maxBytes, 0)
        }

        var mul = 1
        var i = 0
        this[offset] = value & 0xFF
        while (++i < byteLength && (mul *= 0x100)) {
          this[offset + i] = (value / mul) & 0xFF
        }

        return offset + byteLength
      }

      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        byteLength = byteLength >>> 0
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1
          checkInt(this, value, offset, byteLength, maxBytes, 0)
        }

        var i = byteLength - 1
        var mul = 1
        this[offset + i] = value & 0xFF
        while (--i >= 0 && (mul *= 0x100)) {
          this[offset + i] = (value / mul) & 0xFF
        }

        return offset + byteLength
      }

      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
        this[offset] = (value & 0xff)
        return offset + 1
      }

      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        return offset + 2
      }

      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
        this[offset] = (value >>> 8)
        this[offset + 1] = (value & 0xff)
        return offset + 2
      }

      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
        this[offset + 3] = (value >>> 24)
        this[offset + 2] = (value >>> 16)
        this[offset + 1] = (value >>> 8)
        this[offset] = (value & 0xff)
        return offset + 4
      }

      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
        this[offset] = (value >>> 24)
        this[offset + 1] = (value >>> 16)
        this[offset + 2] = (value >>> 8)
        this[offset + 3] = (value & 0xff)
        return offset + 4
      }

      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
          var limit = Math.pow(2, (8 * byteLength) - 1)

          checkInt(this, value, offset, byteLength, limit - 1, -limit)
        }

        var i = 0
        var mul = 1
        var sub = 0
        this[offset] = value & 0xFF
        while (++i < byteLength && (mul *= 0x100)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1
          }
          this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
        }

        return offset + byteLength
      }

      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
          var limit = Math.pow(2, (8 * byteLength) - 1)

          checkInt(this, value, offset, byteLength, limit - 1, -limit)
        }

        var i = byteLength - 1
        var mul = 1
        var sub = 0
        this[offset + i] = value & 0xFF
        while (--i >= 0 && (mul *= 0x100)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1
          }
          this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
        }

        return offset + byteLength
      }

      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
        if (value < 0) value = 0xff + value + 1
        this[offset] = (value & 0xff)
        return offset + 1
      }

      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        return offset + 2
      }

      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
        this[offset] = (value >>> 8)
        this[offset + 1] = (value & 0xff)
        return offset + 2
      }

      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
        this[offset] = (value & 0xff)
        this[offset + 1] = (value >>> 8)
        this[offset + 2] = (value >>> 16)
        this[offset + 3] = (value >>> 24)
        return offset + 4
      }

      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
        if (value < 0) value = 0xffffffff + value + 1
        this[offset] = (value >>> 24)
        this[offset + 1] = (value >>> 16)
        this[offset + 2] = (value >>> 8)
        this[offset + 3] = (value & 0xff)
        return offset + 4
      }

      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError('Index out of range')
        if (offset < 0) throw new RangeError('Index out of range')
      }

      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4)
        return offset + 4
      }

      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert)
      }

      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert)
      }

      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value
        offset = offset >>> 0
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8)
        return offset + 8
      }

      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert)
      }

      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert)
      }

      // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
        if (!start) start = 0
        if (!end && end !== 0) end = this.length
        if (targetStart >= target.length) targetStart = target.length
        if (!targetStart) targetStart = 0
        if (end > 0 && end < start) end = start

        // Copy 0 bytes; we're done
        if (end === start) return 0
        if (target.length === 0 || this.length === 0) return 0

        // Fatal error conditions
        if (targetStart < 0) {
          throw new RangeError('targetStart out of bounds')
        }
        if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
        if (end < 0) throw new RangeError('sourceEnd out of bounds')

        // Are we oob?
        if (end > this.length) end = this.length
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start
        }

        var len = end - start

        if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
          // Use built-in when available, missing from IE11
          this.copyWithin(targetStart, start, end)
        } else if (this === target && start < targetStart && targetStart < end) {
          // descending copy from end
          for (var i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start]
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          )
        }

        return len
      }

      // Usage:
      //    buffer.fill(number[, offset[, end]])
      //    buffer.fill(buffer[, offset[, end]])
      //    buffer.fill(string[, offset[, end]][, encoding])
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        // Handle string cases:
        if (typeof val === 'string') {
          if (typeof start === 'string') {
            encoding = start
            start = 0
            end = this.length
          } else if (typeof end === 'string') {
            encoding = end
            end = this.length
          }
          if (encoding !== undefined && typeof encoding !== 'string') {
            throw new TypeError('encoding must be a string')
          }
          if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
            throw new TypeError('Unknown encoding: ' + encoding)
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0)
            if ((encoding === 'utf8' && code < 128) ||
              encoding === 'latin1') {
              // Fast path: If `val` fits into a single byte, use that numeric value.
              val = code
            }
          }
        } else if (typeof val === 'number') {
          val = val & 255
        }

        // Invalid ranges are not set to a default, so can range check early.
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError('Out of range index')
        }

        if (end <= start) {
          return this
        }

        start = start >>> 0
        end = end === undefined ? this.length : end >>> 0

        if (!val) val = 0

        var i
        if (typeof val === 'number') {
          for (i = start; i < end; ++i) {
            this[i] = val
          }
        } else {
          var bytes = Buffer.isBuffer(val) ?
            val :
            new Buffer(val, encoding)
          var len = bytes.length
          if (len === 0) {
            throw new TypeError('The value "' + val +
              '" is invalid for argument "value"')
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len]
          }
        }

        return this
      }

      // HELPER FUNCTIONS
      // ================

      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

      function base64clean(str) {
        // Node takes equal signs as end of the Base64 encoding
        str = str.split('=')[0]
        // Node strips out invalid characters like \n and \t from the string, base64-js does not
        str = str.trim().replace(INVALID_BASE64_RE, '')
        // Node converts strings with length < 2 to ''
        if (str.length < 2) return ''
        // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
        while (str.length % 4 !== 0) {
          str = str + '='
        }
        return str
      }

      function toHex(n) {
        if (n < 16) return '0' + n.toString(16)
        return n.toString(16)
      }

      function utf8ToBytes(string, units) {
        units = units || Infinity
        var codePoint
        var length = string.length
        var leadSurrogate = null
        var bytes = []

        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i)

          // is surrogate component
          if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
              // no lead yet
              if (codePoint > 0xDBFF) {
                // unexpected trail
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                continue
              } else if (i + 1 === length) {
                // unpaired lead
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
                continue
              }

              // valid lead
              leadSurrogate = codePoint

              continue
            }

            // 2 leads in a row
            if (codePoint < 0xDC00) {
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
              leadSurrogate = codePoint
              continue
            }

            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
          } else if (leadSurrogate) {
            // valid bmp char, but last char was a lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          }

          leadSurrogate = null

          // encode utf8
          if (codePoint < 0x80) {
            if ((units -= 1) < 0) break
            bytes.push(codePoint)
          } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break
            bytes.push(
              codePoint >> 0x6 | 0xC0,
              codePoint & 0x3F | 0x80
            )
          } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break
            bytes.push(
              codePoint >> 0xC | 0xE0,
              codePoint >> 0x6 & 0x3F | 0x80,
              codePoint & 0x3F | 0x80
            )
          } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break
            bytes.push(
              codePoint >> 0x12 | 0xF0,
              codePoint >> 0xC & 0x3F | 0x80,
              codePoint >> 0x6 & 0x3F | 0x80,
              codePoint & 0x3F | 0x80
            )
          } else {
            throw new Error('Invalid code point')
          }
        }

        return bytes
      }

      function asciiToBytes(str) {
        var byteArray = []
        for (var i = 0; i < str.length; ++i) {
          // Node's code seems to be doing this and not & 0x7F..
          byteArray.push(str.charCodeAt(i) & 0xFF)
        }
        return byteArray
      }

      function utf16leToBytes(str, units) {
        var c, hi, lo
        var byteArray = []
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break

          c = str.charCodeAt(i)
          hi = c >> 8
          lo = c % 256
          byteArray.push(lo)
          byteArray.push(hi)
        }

        return byteArray
      }

      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str))
      }

      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if ((i + offset >= dst.length) || (i >= src.length)) break
          dst[i + offset] = src[i]
        }
        return i
      }

      // ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
      // but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
      function isArrayBuffer(obj) {
        return obj instanceof ArrayBuffer ||
          (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
            typeof obj.byteLength === 'number')
      }

      function numberIsNaN(obj) {
        return obj !== obj // eslint-disable-line no-self-compare
      }

    }, {
      "base64-js": 2,
      "ieee754": 7
    }],
    5: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        // NOTE: These type checking functions intentionally don't use `instanceof`
        // because it is fragile and can be easily faked with `Object.create()`.

        function isArray(arg) {
          if (Array.isArray) {
            return Array.isArray(arg);
          }
          return objectToString(arg) === '[object Array]';
        }
        exps.isArray = isArray;

        function isBoolean(arg) {
          return typeof arg === 'boolean';
        }
        exps.isBoolean = isBoolean;

        function isNull(arg) {
          return arg === null;
        }
        exps.isNull = isNull;

        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exps.isNullOrUndefined = isNullOrUndefined;

        function isNumber(arg) {
          return typeof arg === 'number';
        }
        exps.isNumber = isNumber;

        function isString(arg) {
          return typeof arg === 'string';
        }
        exps.isString = isString;

        function isSymbol(arg) {
          return typeof arg === 'symbol';
        }
        exps.isSymbol = isSymbol;

        function isUndefined(arg) {
          return arg === void 0;
        }
        exps.isUndefined = isUndefined;

        function isRegExp(re) {
          return objectToString(re) === '[object RegExp]';
        }
        exps.isRegExp = isRegExp;

        function isObject(arg) {
          return typeof arg === 'object' && arg !== null;
        }
        exps.isObject = isObject;

        function isDate(d) {
          return objectToString(d) === '[object Date]';
        }
        exps.isDate = isDate;

        function isError(e) {
          return (objectToString(e) === '[object Error]' || e instanceof Error);
        }
        exps.isError = isError;

        function isFunction(arg) {
          return typeof arg === 'function';
        }
        exps.isFunction = isFunction;

        function isPrimitive(arg) {
          return arg === null ||
            typeof arg === 'boolean' ||
            typeof arg === 'number' ||
            typeof arg === 'string' ||
            typeof arg === 'symbol' || // ES6 symbol
            typeof arg === 'undefined';
        }
        exps.isPrimitive = isPrimitive;

        exps.isBuffer = Buffer.isBuffer;

        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }

      }).call(this, {
        "isBuffer": bcryptoReq("../../is-buffer/index.js")
      })
    }, {
      "../../is-buffer/index.js": 9
    }],
    6: [function (bcryptoReq, mods, exps) {
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      var objectCreate = Object.create || objectCreatePolyfill
      var objectKeys = Object.keys || objectKeysPolyfill
      var bind = Function.prototype.bind || functionBindPolyfill

      function EventEmitter() {
        if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        }

        this._maxListeners = this._maxListeners || undefined;
      }
      mods.exps = EventEmitter;

      // Backwards-compat with node 0.10.x
      EventEmitter.EventEmitter = EventEmitter;

      EventEmitter.prototype._events = undefined;
      EventEmitter.prototype._maxListeners = undefined;

      // By default EventEmitters will print a warning if more than 10 listeners are
      // added to it. This is a useful default which helps finding memory leaks.
      var defaultMaxListeners = 10;

      var hasDefineProperty;
      try {
        var o = {};
        if (Object.defineProperty) Object.defineProperty(o, 'x', {
          value: 0
        });
        hasDefineProperty = o.x === 0;
      } catch (err) {
        hasDefineProperty = false
      }
      if (hasDefineProperty) {
        Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
          enumerable: true,
          get: function () {
            return defaultMaxListeners;
          },
          set: function (arg) {
            // check whether the input is a positive number (whose value is zero or
            // greater and not a NaN).
            if (typeof arg !== 'number' || arg < 0 || arg !== arg)
              throw new TypeError('"defaultMaxListeners" must be a positive number');
            defaultMaxListeners = arg;
          }
        });
      } else {
        EventEmitter.defaultMaxListeners = defaultMaxListeners;
      }

      // Obviously not all Emitters should be limited to 10. This function allows
      // that to be increased. Set to zero for unlimited.
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== 'number' || n < 0 || isNaN(n))
          throw new TypeError('"n" argument must be a positive number');
        this._maxListeners = n;
        return this;
      };

      function $getMaxListeners(that) {
        if (that._maxListeners === undefined)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }

      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return $getMaxListeners(this);
      };

      // These standalone emit* functions are used to optimize calling of event
      // handlers for fast cases because emit() itself often has a variable number of
      // arguments and can be deoptimized because of that. These functions always have
      // the same number of arguments and thus do not get deoptimized, so the code
      // inside them can execute faster.
      function emitNone(handler, isFn, self) {
        if (isFn)
          handler.call(self);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self);
        }
      }

      function emitOne(handler, isFn, self, arg1) {
        if (isFn)
          handler.call(self, arg1);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self, arg1);
        }
      }

      function emitTwo(handler, isFn, self, arg1, arg2) {
        if (isFn)
          handler.call(self, arg1, arg2);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self, arg1, arg2);
        }
      }

      function emitThree(handler, isFn, self, arg1, arg2, arg3) {
        if (isFn)
          handler.call(self, arg1, arg2, arg3);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self, arg1, arg2, arg3);
        }
      }

      function emitMany(handler, isFn, self, args) {
        if (isFn)
          handler.apply(self, args);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].apply(self, args);
        }
      }

      EventEmitter.prototype.emit = function emit(type) {
        var er, handler, len, args, i, events;
        var doError = (type === 'error');

        events = this._events;
        if (events)
          doError = (doError && events.error == null);
        else if (!doError)
          return false;

        // If there is no 'error' event listener then throw.
        if (doError) {
          if (arguments.length > 1)
            er = arguments[1];
          if (er instanceof Error) {
            throw er; // Unhandled 'error' event
          } else {
            // At least give some kind of context to the user
            var err = new Error('Unhandled "error" event. (' + er + ')');
            err.context = er;
            throw err;
          }
          return false;
        }

        handler = events[type];

        if (!handler)
          return false;

        var isFn = typeof handler === 'function';
        len = arguments.length;
        switch (len) {
          // fast cases
          case 1:
            emitNone(handler, isFn, this);
            break;
          case 2:
            emitOne(handler, isFn, this, arguments[1]);
            break;
          case 3:
            emitTwo(handler, isFn, this, arguments[1], arguments[2]);
            break;
          case 4:
            emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
            break;
            // slower
          default:
            args = new Array(len - 1);
            for (i = 1; i < len; i++)
              args[i - 1] = arguments[i];
            emitMany(handler, isFn, this, args);
        }

        return true;
      };

      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;

        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');

        events = target._events;
        if (!events) {
          events = target._events = objectCreate(null);
          target._eventsCount = 0;
        } else {
          // To avoid recursion in the case that type === "newListener"! Before
          // adding it to the listeners, first emit "newListener".
          if (events.newListener) {
            target.emit('newListener', type,
              listener.listener ? listener.listener : listener);

            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
          }
          existing = events[type];
        }

        if (!existing) {
          // Optimize the case of one listener. Don't need the extra array object.
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] =
              prepend ? [listener, existing] : [existing, listener];
          } else {
            // If we've already got an array, just append.
            if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            }
          }

          // Check for listener leak
          if (!existing.warned) {
            m = $getMaxListeners(target);
            if (m && m > 0 && existing.length > m) {
              existing.warned = true;
              var w = new Error('Possible EventEmitter memory leak detected. ' +
                existing.length + ' "' + String(type) + '" listeners ' +
                'added. Use emitter.setMaxListeners() to ' +
                'increase limit.');
              w.name = 'MaxListenersExceededWarning';
              w.emitter = target;
              w.type = type;
              w.count = existing.length;
              if (typeof console === 'object' && console.warn) {
                console.warn('%s: %s', w.name, w.message);
              }
            }
          }
        }

        return target;
      }

      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };

      EventEmitter.prototype.on = EventEmitter.prototype.addListener;

      EventEmitter.prototype.prependListener =
        function prependListener(type, listener) {
          return _addListener(this, type, listener, true);
        };

      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          switch (arguments.length) {
            case 0:
              return this.listener.call(this.target);
            case 1:
              return this.listener.call(this.target, arguments[0]);
            case 2:
              return this.listener.call(this.target, arguments[0], arguments[1]);
            case 3:
              return this.listener.call(this.target, arguments[0], arguments[1],
                arguments[2]);
            default:
              var args = new Array(arguments.length);
              for (var i = 0; i < args.length; ++i)
                args[i] = arguments[i];
              this.listener.apply(this.target, args);
          }
        }
      }

      function _onceWrap(target, type, listener) {
        var state = {
          fired: false,
          wrapFn: undefined,
          target: target,
          type: type,
          listener: listener
        };
        var wrapped = bind.call(onceWrapper, state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }

      EventEmitter.prototype.once = function once(type, listener) {
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };

      EventEmitter.prototype.prependOnceListener =
        function prependOnceListener(type, listener) {
          if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        };

      // Emits a 'removeListener' event if and only if the listener was removed.
      EventEmitter.prototype.removeListener =
        function removeListener(type, listener) {
          var list, events, position, i, originalListener;

          if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');

          events = this._events;
          if (!events)
            return this;

          list = events[type];
          if (!list)
            return this;

          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
              this._events = objectCreate(null);
            else {
              delete events[type];
              if (events.removeListener)
                this.emit('removeListener', type, list.listener || listener);
            }
          } else if (typeof list !== 'function') {
            position = -1;

            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }

            if (position < 0)
              return this;

            if (position === 0)
              list.shift();
            else
              spliceOne(list, position);

            if (list.length === 1)
              events[type] = list[0];

            if (events.removeListener)
              this.emit('removeListener', type, originalListener || listener);
          }

          return this;
        };

      EventEmitter.prototype.removeAllListeners =
        function removeAllListeners(type) {
          var listeners, events, i;

          events = this._events;
          if (!events)
            return this;

          // not listening for removeListener, no need to emit
          if (!events.removeListener) {
            if (arguments.length === 0) {
              this._events = objectCreate(null);
              this._eventsCount = 0;
            } else if (events[type]) {
              if (--this._eventsCount === 0)
                this._events = objectCreate(null);
              else
                delete events[type];
            }
            return this;
          }

          // emit removeListener for all listeners on all events
          if (arguments.length === 0) {
            var keys = objectKeys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === 'removeListener') continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = objectCreate(null);
            this._eventsCount = 0;
            return this;
          }

          listeners = events[type];

          if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
          } else if (listeners) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }

          return this;
        };

      function _listeners(target, type, unwrap) {
        var events = target._events;

        if (!events)
          return [];

        var evlistener = events[type];
        if (!evlistener)
          return [];

        if (typeof evlistener === 'function')
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];

        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }

      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };

      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };

      EventEmitter.listenerCount = function (emitter, type) {
        if (typeof emitter.listenerCount === 'function') {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };

      EventEmitter.prototype.listenerCount = listenerCount;

      function listenerCount(type) {
        var events = this._events;

        if (events) {
          var evlistener = events[type];

          if (typeof evlistener === 'function') {
            return 1;
          } else if (evlistener) {
            return evlistener.length;
          }
        }

        return 0;
      }

      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      };

      // About 1.5x faster than the two-arg version of Array#splice().
      function spliceOne(list, index) {
        for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
          list[i] = list[k];
        list.pop();
      }

      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }

      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }

      function objectCreatePolyfill(proto) {
        var F = function () {};
        F.prototype = proto;
        return new F;
      }

      function objectKeysPolyfill(obj) {
        var keys = [];
        for (var k in obj)
          if (Object.prototype.hasOwnProperty.call(obj, k)) {
            keys.push(k);
          }
        return k;
      }

      function functionBindPolyfill(context) {
        var fn = this;
        return function () {
          return fn.apply(context, arguments);
        };
      }

    }, {}],
    7: [function (bcryptoReq, mods, exps) {
      exps.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m
        var eLen = (nBytes * 8) - mLen - 1
        var eMax = (1 << eLen) - 1
        var eBias = eMax >> 1
        var nBits = -7
        var i = isLE ? (nBytes - 1) : 0
        var d = isLE ? -1 : 1
        var s = buffer[offset + i]

        i += d

        e = s & ((1 << (-nBits)) - 1)
        s >>= (-nBits)
        nBits += eLen
        for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & ((1 << (-nBits)) - 1)
        e >>= (-nBits)
        nBits += mLen
        for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
          e = 1 - eBias
        } else if (e === eMax) {
          return m ? NaN : ((s ? -1 : 1) * Infinity)
        } else {
          m = m + Math.pow(2, mLen)
          e = e - eBias
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
      }

      exps.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c
        var eLen = (nBytes * 8) - mLen - 1
        var eMax = (1 << eLen) - 1
        var eBias = eMax >> 1
        var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
        var i = isLE ? 0 : (nBytes - 1)
        var d = isLE ? 1 : -1
        var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

        value = Math.abs(value)

        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0
          e = eMax
        } else {
          e = Math.floor(Math.log(value) / Math.LN2)
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--
            c *= 2
          }
          if (e + eBias >= 1) {
            value += rt / c
          } else {
            value += rt * Math.pow(2, 1 - eBias)
          }
          if (value * c >= 2) {
            e++
            c /= 2
          }

          if (e + eBias >= eMax) {
            m = 0
            e = eMax
          } else if (e + eBias >= 1) {
            m = ((value * c) - 1) * Math.pow(2, mLen)
            e = e + eBias
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
            e = 0
          }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = (e << mLen) | m
        eLen += mLen
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128
      }

    }, {}],
    8: [function (bcryptoReq, mods, exps) {
      if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' mods
        mods.exps = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        // old school shim for old browsers
        mods.exps = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor
          var TempCtor = function () {}
          TempCtor.prototype = superCtor.prototype
          ctor.prototype = new TempCtor()
          ctor.prototype.constructor = ctor
        }
      }

    }, {}],
    9: [function (bcryptoReq, mods, exps) {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */

      // The _isBuffer check is for Safari 5-7 support, because it's missing
      // Object.prototype.constructor. Remove this eventually
      mods.exps = function (obj) {
        return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
      };

      function isBuffer(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
      }

      // For Node v0.10 support. Remove this eventually.
      function isSlowBuffer(obj) {
        return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
      }

    }, {}],
    10: [function (bcryptoReq, mods, exps) {
      var toString = {}.toString;

      mods.exps = Array.isArray || function (arr) {
        return toString.call(arr) == '[object Array]';
      };

    }, {}],
    11: [function (bcryptoReq, mods, exps) {
      (function (process) {
        'use strict';

        if (!process.version ||
          process.version.indexOf('v0.') === 0 ||
          process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
          mods.exps = {
            nextTick: nextTick
          };
        } else {
          mods.exps = process
        }

        function nextTick(fn, arg1, arg2, arg3) {
          if (typeof fn !== 'function') {
            throw new TypeError('"callback" argument must be a function');
          }
          var len = arguments.length;
          var args, i;
          switch (len) {
            case 0:
            case 1:
              return process.nextTick(fn);
            case 2:
              return process.nextTick(function afterTickOne() {
                fn.call(null, arg1);
              });
            case 3:
              return process.nextTick(function afterTickTwo() {
                fn.call(null, arg1, arg2);
              });
            case 4:
              return process.nextTick(function afterTickThree() {
                fn.call(null, arg1, arg2, arg3);
              });
            default:
              args = new Array(len - 1);
              i = 0;
              while (i < args.length) {
                args[i++] = arguments[i];
              }
              return process.nextTick(function afterTick() {
                fn.apply(null, args);
              });
          }
        }


      }).call(this, bcryptoReq('_process'))
    }, {
      "_process": 12
    }],
    12: [function (bcryptoReq, mods, exps) {
      // shim for using process in browser
      var process = mods.exps = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }

      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      }())

      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }


      }

      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }



      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return []
      }

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/'
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };

    }, {}],
    13: [function (bcryptoReq, mods, exps) {
      mods.exps = bcryptoReq('./lib/_stream_duplex.js');

    }, {
      "./lib/_stream_duplex.js": 14
    }],
    14: [function (bcryptoReq, mods, exps) {
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      // a duplex stream is just a stream that is both readable and writable.
      // Since JS doesn't have multiple prototypal inheritance, this class
      // prototypally inherits from Readable, and then parasitically from
      // Writable.

      'use strict';

      /*<replacement>*/

      var pna = bcryptoReq('process-nextick-args');
      /*</replacement>*/

      /*<replacement>*/
      var objectKeys = Object.keys || function (obj) {
        var keys = [];
        for (var key in obj) {
          keys.push(key);
        }
        return keys;
      };
      /*</replacement>*/

      mods.exps = Duplex;

      /*<replacement>*/
      var util = bcryptoReq('core-util-is');
      util.inherits = bcryptoReq('inherits');
      /*</replacement>*/

      var Readable = bcryptoReq('./_stream_readable');
      var Writable = bcryptoReq('./_stream_writable');

      util.inherits(Duplex, Readable);

      {
        // avoid scope creep, the keys array can then be collected
        var keys = objectKeys(Writable.prototype);
        for (var v = 0; v < keys.length; v++) {
          var method = keys[v];
          if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
        }
      }

      function Duplex(options) {
        if (!(this instanceof Duplex)) return new Duplex(options);

        Readable.call(this, options);
        Writable.call(this, options);

        if (options && options.readable === false) this.readable = false;

        if (options && options.writable === false) this.writable = false;

        this.allowHalfOpen = true;
        if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

        this.once('end', onend);
      }

      Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function () {
          return this._writableState.highWaterMark;
        }
      });

      // the no-half-open enforcer
      function onend() {
        // if we allow half-open state, or if the writable side ended,
        // then we're ok.
        if (this.allowHalfOpen || this._writableState.ended) return;

        // no more data can be written.
        // But allow more writes to happen in this tick.
        pna.nextTick(onEndNT, this);
      }

      function onEndNT(self) {
        self.end();
      }

      Object.defineProperty(Duplex.prototype, 'destroyed', {
        get: function () {
          if (this._readableState === undefined || this._writableState === undefined) {
            return false;
          }
          return this._readableState.destroyed && this._writableState.destroyed;
        },
        set: function (value) {
          // we ignore the value if the stream
          // has not been initialized yet
          if (this._readableState === undefined || this._writableState === undefined) {
            return;
          }

          // backward compatibility, the user is explicitly
          // managing destroyed
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      });

      Duplex.prototype._destroy = function (err, cb) {
        this.push(null);
        this.end();

        pna.nextTick(cb, err);
      };
    }, {
      "./_stream_readable": 16,
      "./_stream_writable": 18,
      "core-util-is": 5,
      "inherits": 8,
      "process-nextick-args": 11
    }],
    15: [function (bcryptoReq, mods, exps) {
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      // a passthrough stream.
      // basically just the most minimal sort of Transform stream.
      // Every written chunk gets output as-is.

      'use strict';

      mods.exps = PassThrough;

      var Transform = bcryptoReq('./_stream_transform');

      /*<replacement>*/
      var util = bcryptoReq('core-util-is');
      util.inherits = bcryptoReq('inherits');
      /*</replacement>*/

      util.inherits(PassThrough, Transform);

      function PassThrough(options) {
        if (!(this instanceof PassThrough)) return new PassThrough(options);

        Transform.call(this, options);
      }

      PassThrough.prototype._transform = function (chunk, encoding, cb) {
        cb(null, chunk);
      };
    }, {
      "./_stream_transform": 17,
      "core-util-is": 5,
      "inherits": 8
    }],
    16: [function (bcryptoReq, mods, exps) {
      (function (process, global) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        'use strict';

        /*<replacement>*/

        var pna = bcryptoReq('process-nextick-args');
        /*</replacement>*/

        mods.exps = Readable;

        /*<replacement>*/
        var isArray = bcryptoReq('isarray');
        /*</replacement>*/

        /*<replacement>*/
        var Duplex;
        /*</replacement>*/

        Readable.ReadableState = ReadableState;

        /*<replacement>*/
        var EE = bcryptoReq('events').EventEmitter;

        var EElistenerCount = function (emitter, type) {
          return emitter.listeners(type).length;
        };
        /*</replacement>*/

        /*<replacement>*/
        var Stream = bcryptoReq('./internal/streams/stream');
        /*</replacement>*/

        /*<replacement>*/

        var Buffer = bcryptoReq('safe-buffer').Buffer;
        var OurUint8Array = global.Uint8Array || function () {};

        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }

        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }

        /*</replacement>*/

        /*<replacement>*/
        var util = bcryptoReq('core-util-is');
        util.inherits = bcryptoReq('inherits');
        /*</replacement>*/

        /*<replacement>*/
        var debugUtil = bcryptoReq('util');
        var debug = void 0;
        if (debugUtil && debugUtil.debuglog) {
          debug = debugUtil.debuglog('stream');
        } else {
          debug = function () {};
        }
        /*</replacement>*/

        var BufferList = bcryptoReq('./internal/streams/BufferList');
        var destroyImpl = bcryptoReq('./internal/streams/destroy');
        var StringDecoder;

        util.inherits(Readable, Stream);

        var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

        function prependListener(emitter, event, fn) {
          // Sadly this is not cacheable as some libraries bundle their own
          // event emitter implementation with them.
          if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

          // This is a hack to make sure that our error handler is attached before any
          // userland ones.  NEVER DO THIS. This is here only because this code needs
          // to continue to work with older versions of Node.js that do not include
          // the prependListener() method. The goal is to eventually remove this hack.
          if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
          else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
          else emitter._events[event] = [fn, emitter._events[event]];
        }

        function ReadableState(options, stream) {
          Duplex = Duplex || bcryptoReq('./_stream_duplex');

          options = options || {};

          // Duplex streams are both readable and writable, but share
          // the same options object.
          // However, some cases bcryptoReq setting options to different
          // values for the readable and the writable sides of the duplex stream.
          // These options can be provided separately as readableXXX and writableXXX.
          var isDuplex = stream instanceof Duplex;

          // object stream flag. Used to make read(n) ignore n and to
          // make all the buffer merging and length checks go away
          this.objectMode = !!options.objectMode;

          if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

          // the point at which it stops calling _read() to fill the buffer
          // Note: 0 is a valid value, means "don't call _read preemptively ever"
          var hwm = options.highWaterMark;
          var readableHwm = options.readableHighWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;

          if (hwm || hwm === 0) this.highWaterMark = hwm;
          else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
          else this.highWaterMark = defaultHwm;

          // cast to ints.
          this.highWaterMark = Math.floor(this.highWaterMark);

          // A linked list is used to store data chunks instead of an array because the
          // linked list can remove elements from the beginning faster than
          // array.shift()
          this.buffer = new BufferList();
          this.length = 0;
          this.pipes = null;
          this.pipesCount = 0;
          this.flowing = null;
          this.ended = false;
          this.endEmitted = false;
          this.reading = false;

          // a flag to be able to tell if the event 'readable'/'data' is emitted
          // immediately, or on a later tick.  We set this to true at first, because
          // any actions that shouldn't happen until "later" should generally also
          // not happen before the first read call.
          this.sync = true;

          // whenever we return null, then we set a flag to say
          // that we're awaiting a 'readable' event emission.
          this.needReadable = false;
          this.emittedReadable = false;
          this.readableListening = false;
          this.resumeScheduled = false;

          // has it been destroyed
          this.destroyed = false;

          // Crypto is kind of old and crusty.  Historically, its default string
          // encoding is 'binary' so we have to make this configurable.
          // Everything else in the universe uses 'utf8', though.
          this.defaultEncoding = options.defaultEncoding || 'utf8';

          // the number of writers that are awaiting a drain event in .pipe()s
          this.awaitDrain = 0;

          // if true, a maybeReadMore has been scheduled
          this.readingMore = false;

          this.decoder = null;
          this.encoding = null;
          if (options.encoding) {
            if (!StringDecoder) StringDecoder = bcryptoReq('string_decoder/').StringDecoder;
            this.decoder = new StringDecoder(options.encoding);
            this.encoding = options.encoding;
          }
        }

        function Readable(options) {
          Duplex = Duplex || bcryptoReq('./_stream_duplex');

          if (!(this instanceof Readable)) return new Readable(options);

          this._readableState = new ReadableState(options, this);

          // legacy
          this.readable = true;

          if (options) {
            if (typeof options.read === 'function') this._read = options.read;

            if (typeof options.destroy === 'function') this._destroy = options.destroy;
          }

          Stream.call(this);
        }

        Object.defineProperty(Readable.prototype, 'destroyed', {
          get: function () {
            if (this._readableState === undefined) {
              return false;
            }
            return this._readableState.destroyed;
          },
          set: function (value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._readableState) {
              return;
            }

            // backward compatibility, the user is explicitly
            // managing destroyed
            this._readableState.destroyed = value;
          }
        });

        Readable.prototype.destroy = destroyImpl.destroy;
        Readable.prototype._undestroy = destroyImpl.undestroy;
        Readable.prototype._destroy = function (err, cb) {
          this.push(null);
          cb(err);
        };

        // Manually shove something into the read() buffer.
        // This returns true if the highWaterMark has not been hit yet,
        // similar to how Writable.write() returns true if you should
        // write() some more.
        Readable.prototype.push = function (chunk, encoding) {
          var state = this._readableState;
          var skipChunkCheck;

          if (!state.objectMode) {
            if (typeof chunk === 'string') {
              encoding = encoding || state.defaultEncoding;
              if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = '';
              }
              skipChunkCheck = true;
            }
          } else {
            skipChunkCheck = true;
          }

          return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
        };

        // Unshift should *always* be something directly out of read()
        Readable.prototype.unshift = function (chunk) {
          return readableAddChunk(this, chunk, null, true, false);
        };

        function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
          var state = stream._readableState;
          if (chunk === null) {
            state.reading = false;
            onEofChunk(stream, state);
          } else {
            var er;
            if (!skipChunkCheck) er = chunkInvalid(state, chunk);
            if (er) {
              stream.emit('error', er);
            } else if (state.objectMode || chunk && chunk.length > 0) {
              if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                chunk = _uint8ArrayToBuffer(chunk);
              }

              if (addToFront) {
                if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));
                else addChunk(stream, state, chunk, true);
              } else if (state.ended) {
                stream.emit('error', new Error('stream.push() after EOF'));
              } else {
                state.reading = false;
                if (state.decoder && !encoding) {
                  chunk = state.decoder.write(chunk);
                  if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
                  else maybeReadMore(stream, state);
                } else {
                  addChunk(stream, state, chunk, false);
                }
              }
            } else if (!addToFront) {
              state.reading = false;
            }
          }

          return needMoreData(state);
        }

        function addChunk(stream, state, chunk, addToFront) {
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk);
            else state.buffer.push(chunk);

            if (state.needReadable) emitReadable(stream);
          }
          maybeReadMore(stream, state);
        }

        function chunkInvalid(state, chunk) {
          var er;
          if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
          }
          return er;
        }

        // if it's past the high water mark, we can push in some more.
        // Also, if we have no data yet, we can stand some
        // more bytes.  This is to work around cases where hwm=0,
        // such as the repl.  Also, if the push() triggered a
        // readable event, and the user called read(largeNumber) such that
        // needReadable was set, then we ought to push more, so that another
        // 'readable' event will be triggered.
        function needMoreData(state) {
          return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
        }

        Readable.prototype.isPaused = function () {
          return this._readableState.flowing === false;
        };

        // backwards compatibility.
        Readable.prototype.setEncoding = function (enc) {
          if (!StringDecoder) StringDecoder = bcryptoReq('string_decoder/').StringDecoder;
          this._readableState.decoder = new StringDecoder(enc);
          this._readableState.encoding = enc;
          return this;
        };

        // Don't raise the hwm > 8MB
        var MAX_HWM = 0x800000;

        function computeNewHighWaterMark(n) {
          if (n >= MAX_HWM) {
            n = MAX_HWM;
          } else {
            // Get the next highest power of 2 to prevent increasing hwm excessively in
            // tiny amounts
            n--;
            n |= n >>> 1;
            n |= n >>> 2;
            n |= n >>> 4;
            n |= n >>> 8;
            n |= n >>> 16;
            n++;
          }
          return n;
        }

        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function howMuchToRead(n, state) {
          if (n <= 0 || state.length === 0 && state.ended) return 0;
          if (state.objectMode) return 1;
          if (n !== n) {
            // Only flow one buffer at a time
            if (state.flowing && state.length) return state.buffer.head.data.length;
            else return state.length;
          }
          // If we're asking for more than the current hwm, then raise the hwm.
          if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
          if (n <= state.length) return n;
          // Don't have enough
          if (!state.ended) {
            state.needReadable = true;
            return 0;
          }
          return state.length;
        }

        // you can override either this method, or the async _read(n) below.
        Readable.prototype.read = function (n) {
          debug('read', n);
          n = parseInt(n, 10);
          var state = this._readableState;
          var nOrig = n;

          if (n !== 0) state.emittedReadable = false;

          // if we're doing read(0) to trigger a readable event, but we
          // already have a bunch of data in the buffer, then just trigger
          // the 'readable' event and move on.
          if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
            debug('read: emitReadable', state.length, state.ended);
            if (state.length === 0 && state.ended) endReadable(this);
            else emitReadable(this);
            return null;
          }

          n = howMuchToRead(n, state);

          // if we've ended, and we're now clear, then finish it up.
          if (n === 0 && state.ended) {
            if (state.length === 0) endReadable(this);
            return null;
          }

          // All the actual chunk generation logic needs to be
          // *below* the call to _read.  The reason is that in certain
          // synthetic stream cases, such as passthrough streams, _read
          // may be a completely synchronous operation which may change
          // the state of the read buffer, providing enough data when
          // before there was *not* enough.
          //
          // So, the steps are:
          // 1. Figure out what the state of things will be after we do
          // a read from the buffer.
          //
          // 2. If that resulting state will trigger a _read, then call _read.
          // Note that this may be asynchronous, or synchronous.  Yes, it is
          // deeply ugly to write APIs this way, but that still doesn't mean
          // that the Readable class should behave improperly, as streams are
          // designed to be sync/async agnostic.
          // Take note if the _read call is sync or async (ie, if the read call
          // has returned yet), so that we know whether or not it's safe to emit
          // 'readable' etc.
          //
          // 3. Actually pull the requested chunks out of the buffer and return.

          // if we need a readable event, then we need to do some reading.
          var doRead = state.needReadable;
          debug('need readable', doRead);

          // if we currently have less than the highWaterMark, then also read some
          if (state.length === 0 || state.length - n < state.highWaterMark) {
            doRead = true;
            debug('length less than watermark', doRead);
          }

          // however, if we've ended, then there's no point, and if we're already
          // reading, then it's unnecessary.
          if (state.ended || state.reading) {
            doRead = false;
            debug('reading or ended', doRead);
          } else if (doRead) {
            debug('do read');
            state.reading = true;
            state.sync = true;
            // if the length is currently zero, then we *need* a readable event.
            if (state.length === 0) state.needReadable = true;
            // call internal read method
            this._read(state.highWaterMark);
            state.sync = false;
            // If _read pushed data synchronously, then `reading` will be false,
            // and we need to re-evaluate how much data we can return to the user.
            if (!state.reading) n = howMuchToRead(nOrig, state);
          }

          var ret;
          if (n > 0) ret = fromList(n, state);
          else ret = null;

          if (ret === null) {
            state.needReadable = true;
            n = 0;
          } else {
            state.length -= n;
          }

          if (state.length === 0) {
            // If we have nothing in the buffer, then we want to know
            // as soon as we *do* get something into the buffer.
            if (!state.ended) state.needReadable = true;

            // If we tried to read() past the EOF, then emit end on the next tick.
            if (nOrig !== n && state.ended) endReadable(this);
          }

          if (ret !== null) this.emit('data', ret);

          return ret;
        };

        function onEofChunk(stream, state) {
          if (state.ended) return;
          if (state.decoder) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) {
              state.buffer.push(chunk);
              state.length += state.objectMode ? 1 : chunk.length;
            }
          }
          state.ended = true;

          // emit 'readable' now to make sure it gets picked up.
          emitReadable(stream);
        }

        // Don't emit readable right away in sync mode, because this can trigger
        // another read() call => stack overflow.  This way, it might trigger
        // a nextTick recursion warning, but that's not so bad.
        function emitReadable(stream) {
          var state = stream._readableState;
          state.needReadable = false;
          if (!state.emittedReadable) {
            debug('emitReadable', state.flowing);
            state.emittedReadable = true;
            if (state.sync) pna.nextTick(emitReadable_, stream);
            else emitReadable_(stream);
          }
        }

        function emitReadable_(stream) {
          debug('emit readable');
          stream.emit('readable');
          flow(stream);
        }

        // at this point, the user has presumably seen the 'readable' event,
        // and called read() to consume some data.  that may have triggered
        // in turn another _read(n) call, in which case reading = true if
        // it's in progress.
        // However, if we're not ended, or reading, and the length < hwm,
        // then go ahead and try to read some more preemptively.
        function maybeReadMore(stream, state) {
          if (!state.readingMore) {
            state.readingMore = true;
            pna.nextTick(maybeReadMore_, stream, state);
          }
        }

        function maybeReadMore_(stream, state) {
          var len = state.length;
          while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
            debug('maybeReadMore read 0');
            stream.read(0);
            if (len === state.length)
              // didn't get any data, stop spinning.
              break;
            else len = state.length;
          }
          state.readingMore = false;
        }

        // abstract method.  to be overridden in specific implementation classes.
        // call cb(er, data) where data is <= n in length.
        // for virtual (non-string, non-buffer) streams, "length" is somewhat
        // arbitrary, and perhaps not very meaningful.
        Readable.prototype._read = function (n) {
          this.emit('error', new Error('_read() is not implemented'));
        };

        Readable.prototype.pipe = function (dest, pipeOpts) {
          var src = this;
          var state = this._readableState;

          switch (state.pipesCount) {
            case 0:
              state.pipes = dest;
              break;
            case 1:
              state.pipes = [state.pipes, dest];
              break;
            default:
              state.pipes.push(dest);
              break;
          }
          state.pipesCount += 1;
          debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

          var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

          var endFn = doEnd ? onend : unpipe;
          if (state.endEmitted) pna.nextTick(endFn);
          else src.once('end', endFn);

          dest.on('unpipe', onunpipe);

          function onunpipe(readable, unpipeInfo) {
            debug('onunpipe');
            if (readable === src) {
              if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
              }
            }
          }

          function onend() {
            debug('onend');
            dest.end();
          }

          // when the dest drains, it reduces the awaitDrain counter
          // on the source.  This would be more elegant with a .once()
          // handler in flow(), but adding and removing repeatedly is
          // too slow.
          var ondrain = pipeOnDrain(src);
          dest.on('drain', ondrain);

          var cleanedUp = false;

          function cleanup() {
            debug('cleanup');
            // cleanup event handlers once the pipe is broken
            dest.removeListener('close', onclose);
            dest.removeListener('finish', onfinish);
            dest.removeListener('drain', ondrain);
            dest.removeListener('error', onerror);
            dest.removeListener('unpipe', onunpipe);
            src.removeListener('end', onend);
            src.removeListener('end', unpipe);
            src.removeListener('data', ondata);

            cleanedUp = true;

            // if the reader is waiting for a drain event from this
            // specific writer, then it would cause it to never start
            // flowing again.
            // So, if this is awaiting a drain, then we just call it now.
            // If we don't know, then assume that we are waiting for one.
            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
          }

          // If the user pushes more data while we're writing to dest then we'll end up
          // in ondata again. However, we only want to increase awaitDrain once because
          // dest will only emit one 'drain' event for the multiple writes.
          // => Introduce a guard on increasing awaitDrain.
          var increasedAwaitDrain = false;
          src.on('data', ondata);

          function ondata(chunk) {
            debug('ondata');
            increasedAwaitDrain = false;
            var ret = dest.write(chunk);
            if (false === ret && !increasedAwaitDrain) {
              // If the user unpiped during `dest.write()`, it is possible
              // to get stuck in a permanently paused state if that write
              // also returned false.
              // => Check whether `dest` is still a piping destination.
              if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug('false write response, pause', src._readableState.awaitDrain);
                src._readableState.awaitDrain++;
                increasedAwaitDrain = true;
              }
              src.pause();
            }
          }

          // if the dest has an error, then stop piping into it.
          // however, don't suppress the throwing behavior for this.
          function onerror(er) {
            debug('onerror', er);
            unpipe();
            dest.removeListener('error', onerror);
            if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
          }

          // Make sure our error handler is attached before userland ones.
          prependListener(dest, 'error', onerror);

          // Both close and finish should trigger unpipe, but only once.
          function onclose() {
            dest.removeListener('finish', onfinish);
            unpipe();
          }
          dest.once('close', onclose);

          function onfinish() {
            debug('onfinish');
            dest.removeListener('close', onclose);
            unpipe();
          }
          dest.once('finish', onfinish);

          function unpipe() {
            debug('unpipe');
            src.unpipe(dest);
          }

          // tell the dest that it's being piped to
          dest.emit('pipe', src);

          // start the flow if it hasn't been started already.
          if (!state.flowing) {
            debug('pipe resume');
            src.resume();
          }

          return dest;
        };

        function pipeOnDrain(src) {
          return function () {
            var state = src._readableState;
            debug('pipeOnDrain', state.awaitDrain);
            if (state.awaitDrain) state.awaitDrain--;
            if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
              state.flowing = true;
              flow(src);
            }
          };
        }

        Readable.prototype.unpipe = function (dest) {
          var state = this._readableState;
          var unpipeInfo = {
            hasUnpiped: false
          };

          // if we're not piping anywhere, then do nothing.
          if (state.pipesCount === 0) return this;

          // just one destination.  most common case.
          if (state.pipesCount === 1) {
            // passed in one, but it's not the right one.
            if (dest && dest !== state.pipes) return this;

            if (!dest) dest = state.pipes;

            // got a match.
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            if (dest) dest.emit('unpipe', this, unpipeInfo);
            return this;
          }

          // slow case. multiple pipe destinations.

          if (!dest) {
            // remove all.
            var dests = state.pipes;
            var len = state.pipesCount;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;

            for (var i = 0; i < len; i++) {
              dests[i].emit('unpipe', this, unpipeInfo);
            }
            return this;
          }

          // try to find the right one.
          var index = indexOf(state.pipes, dest);
          if (index === -1) return this;

          state.pipes.splice(index, 1);
          state.pipesCount -= 1;
          if (state.pipesCount === 1) state.pipes = state.pipes[0];

          dest.emit('unpipe', this, unpipeInfo);

          return this;
        };

        // set up data events if they are asked for
        // Ensure readable listeners eventually get something
        Readable.prototype.on = function (ev, fn) {
          var res = Stream.prototype.on.call(this, ev, fn);

          if (ev === 'data') {
            // Start flowing on next tick if stream isn't explicitly paused
            if (this._readableState.flowing !== false) this.resume();
          } else if (ev === 'readable') {
            var state = this._readableState;
            if (!state.endEmitted && !state.readableListening) {
              state.readableListening = state.needReadable = true;
              state.emittedReadable = false;
              if (!state.reading) {
                pna.nextTick(nReadingNextTick, this);
              } else if (state.length) {
                emitReadable(this);
              }
            }
          }

          return res;
        };
        Readable.prototype.addListener = Readable.prototype.on;

        function nReadingNextTick(self) {
          debug('readable nexttick read 0');
          self.read(0);
        }

        // pause() and resume() are remnants of the legacy readable stream API
        // If the user uses them, then switch into old mode.
        Readable.prototype.resume = function () {
          var state = this._readableState;
          if (!state.flowing) {
            debug('resume');
            state.flowing = true;
            resume(this, state);
          }
          return this;
        };

        function resume(stream, state) {
          if (!state.resumeScheduled) {
            state.resumeScheduled = true;
            pna.nextTick(resume_, stream, state);
          }
        }

        function resume_(stream, state) {
          if (!state.reading) {
            debug('resume read 0');
            stream.read(0);
          }

          state.resumeScheduled = false;
          state.awaitDrain = 0;
          stream.emit('resume');
          flow(stream);
          if (state.flowing && !state.reading) stream.read(0);
        }

        Readable.prototype.pause = function () {
          debug('call pause flowing=%j', this._readableState.flowing);
          if (false !== this._readableState.flowing) {
            debug('pause');
            this._readableState.flowing = false;
            this.emit('pause');
          }
          return this;
        };

        function flow(stream) {
          var state = stream._readableState;
          debug('flow', state.flowing);
          while (state.flowing && stream.read() !== null) {}
        }

        // wrap an old-style stream as the async data source.
        // This is *not* part of the readable stream interface.
        // It is an ugly unfortunate mess of history.
        Readable.prototype.wrap = function (stream) {
          var _this = this;

          var state = this._readableState;
          var paused = false;

          stream.on('end', function () {
            debug('wrapped end');
            if (state.decoder && !state.ended) {
              var chunk = state.decoder.end();
              if (chunk && chunk.length) _this.push(chunk);
            }

            _this.push(null);
          });

          stream.on('data', function (chunk) {
            debug('wrapped data');
            if (state.decoder) chunk = state.decoder.write(chunk);

            // don't skip over falsy values in objectMode
            if (state.objectMode && (chunk === null || chunk === undefined)) return;
            else if (!state.objectMode && (!chunk || !chunk.length)) return;

            var ret = _this.push(chunk);
            if (!ret) {
              paused = true;
              stream.pause();
            }
          });

          // proxy all the other methods.
          // important when wrapping filters and duplexes.
          for (var i in stream) {
            if (this[i] === undefined && typeof stream[i] === 'function') {
              this[i] = function (method) {
                return function () {
                  return stream[method].apply(stream, arguments);
                };
              }(i);
            }
          }

          // proxy certain important events.
          for (var n = 0; n < kProxyEvents.length; n++) {
            stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
          }

          // when we try to consume some more bytes, simply unpause the
          // underlying stream.
          this._read = function (n) {
            debug('wrapped _read', n);
            if (paused) {
              paused = false;
              stream.resume();
            }
          };

          return this;
        };

        Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function () {
            return this._readableState.highWaterMark;
          }
        });

        // exposed for testing purposes only.
        Readable._fromList = fromList;

        // Pluck off n bytes from an array of buffers.
        // Length is the combined lengths of all the buffers in the list.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function fromList(n, state) {
          // nothing buffered
          if (state.length === 0) return null;

          var ret;
          if (state.objectMode) ret = state.buffer.shift();
          else if (!n || n >= state.length) {
            // read it all, truncate the list
            if (state.decoder) ret = state.buffer.join('');
            else if (state.buffer.length === 1) ret = state.buffer.head.data;
            else ret = state.buffer.concat(state.length);
            state.buffer.clear();
          } else {
            // read part of list
            ret = fromListPartial(n, state.buffer, state.decoder);
          }

          return ret;
        }

        // Extracts only enough buffered data to satisfy the amount requested.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function fromListPartial(n, list, hasStrings) {
          var ret;
          if (n < list.head.data.length) {
            // slice is the same for buffers and strings
            ret = list.head.data.slice(0, n);
            list.head.data = list.head.data.slice(n);
          } else if (n === list.head.data.length) {
            // first chunk is a perfect match
            ret = list.shift();
          } else {
            // result spans more than one buffer
            ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
          }
          return ret;
        }

        // Copies a specified amount of characters from the list of buffered data
        // chunks.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function copyFromBufferString(n, list) {
          var p = list.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str;
            else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) list.head = p.next;
                else list.head = list.tail = null;
              } else {
                list.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }

        // Copies a specified amount of bytes from the list of buffered data chunks.
        // This function is designed to be inlinable, so please take care when making
        // changes to the function body.
        function copyFromBuffer(n, list) {
          var ret = Buffer.allocUnsafe(n);
          var p = list.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) list.head = p.next;
                else list.head = list.tail = null;
              } else {
                list.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }

        function endReadable(stream) {
          var state = stream._readableState;

          // If we get here before consuming all the bytes, then that is a
          // bug in node.  Should never happen.
          if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

          if (!state.endEmitted) {
            state.ended = true;
            pna.nextTick(endReadableNT, state, stream);
          }
        }

        function endReadableNT(state, stream) {
          // Check that we didn't get one last unshift.
          if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit('end');
          }
        }

        function indexOf(xs, x) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (xs[i] === x) return i;
          }
          return -1;
        }
      }).call(this, bcryptoReq('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "./_stream_duplex": 14,
      "./internal/streams/BufferList": 19,
      "./internal/streams/destroy": 20,
      "./internal/streams/stream": 21,
      "_process": 12,
      "core-util-is": 5,
      "events": 6,
      "inherits": 8,
      "isarray": 10,
      "process-nextick-args": 11,
      "safe-buffer": 26,
      "string_decoder/": 28,
      "util": 3
    }],
    17: [function (bcryptoReq, mods, exps) {
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      // a transform stream is a readable/writable stream where you do
      // something with the data.  Sometimes it's called a "filter",
      // but that's not a great name for it, since that implies a thing where
      // some bits pass through, and others are simply ignored.  (That would
      // be a valid example of a transform, of course.)
      //
      // While the output is causally related to the input, it's not a
      // necessarily symmetric or synchronous transformation.  For example,
      // a zlib stream might take multiple plain-text writes(), and then
      // emit a single compressed chunk some time in the future.
      //
      // Here's how this works:
      //
      // The Transform stream has all the aspects of the readable and writable
      // stream classes.  When you write(chunk), that calls _write(chunk,cb)
      // internally, and returns false if there's a lot of pending writes
      // buffered up.  When you call read(), that calls _read(n) until
      // there's enough pending readable data buffered up.
      //
      // In a transform stream, the written data is placed in a buffer.  When
      // _read(n) is called, it transforms the queued up data, calling the
      // buffered _write cb's as it consumes chunks.  If consuming a single
      // written chunk would result in multiple output chunks, then the first
      // outputted bit calls the readcb, and subsequent chunks just go into
      // the read buffer, and will cause it to emit 'readable' if necessary.
      //
      // This way, back-pressure is actually determined by the reading side,
      // since _read has to be called to start processing a new chunk.  However,
      // a pathological inflate type of transform can cause excessive buffering
      // here.  For example, imagine a stream where every byte of input is
      // interpreted as an integer from 0-255, and then results in that many
      // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
      // 1kb of data being output.  In this case, you could write a very small
      // amount of input, and end up with a very large amount of output.  In
      // such a pathological inflating mechanism, there'd be no way to tell
      // the system to stop doing the transform.  A single 4MB write could
      // cause the system to run out of memory.
      //
      // However, even in such a pathological case, only a single written chunk
      // would be consumed, and then the rest would wait (un-transformed) until
      // the results of the previous transformed chunk were consumed.

      'use strict';

      mods.exps = Transform;

      var Duplex = bcryptoReq('./_stream_duplex');

      /*<replacement>*/
      var util = bcryptoReq('core-util-is');
      util.inherits = bcryptoReq('inherits');
      /*</replacement>*/

      util.inherits(Transform, Duplex);

      function afterTransform(er, data) {
        var ts = this._transformState;
        ts.transforming = false;

        var cb = ts.writecb;

        if (!cb) {
          return this.emit('error', new Error('write callback called multiple times'));
        }

        ts.writechunk = null;
        ts.writecb = null;

        if (data != null) // single equals check for both `null` and `undefined`
          this.push(data);

        cb(er);

        var rs = this._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          this._read(rs.highWaterMark);
        }
      }

      function Transform(options) {
        if (!(this instanceof Transform)) return new Transform(options);

        Duplex.call(this, options);

        this._transformState = {
          afterTransform: afterTransform.bind(this),
          needTransform: false,
          transforming: false,
          writecb: null,
          writechunk: null,
          writeencoding: null
        };

        // start out asking for a readable event once data is transformed.
        this._readableState.needReadable = true;

        // we have implemented the _read method, and done the other things
        // that Readable wants before the first _read call, so unset the
        // sync guard flag.
        this._readableState.sync = false;

        if (options) {
          if (typeof options.transform === 'function') this._transform = options.transform;

          if (typeof options.flush === 'function') this._flush = options.flush;
        }

        // When the writable side finishes, then flush out anything remaining.
        this.on('prefinish', prefinish);
      }

      function prefinish() {
        var _this = this;

        if (typeof this._flush === 'function') {
          this._flush(function (er, data) {
            done(_this, er, data);
          });
        } else {
          done(this, null, null);
        }
      }

      Transform.prototype.push = function (chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };

      // This is the part where you do stuff!
      // override this function in implementation classes.
      // 'chunk' is an input chunk.
      //
      // Call `push(newChunk)` to pass along transformed output
      // to the readable side.  You may call 'push' zero or more times.
      //
      // Call `cb(err)` when you are done with this chunk.  If you pass
      // an error, then that'll put the hurt on the whole operation.  If you
      // never call cb(), then you'll never get another chunk.
      Transform.prototype._transform = function (chunk, encoding, cb) {
        throw new Error('_transform() is not implemented');
      };

      Transform.prototype._write = function (chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
        }
      };

      // Doesn't matter what the args are here.
      // _transform does all the work.
      // That we got here means that the readable side wants more data.
      Transform.prototype._read = function (n) {
        var ts = this._transformState;

        if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          // mark that we need a transform, so that any data that comes in
          // will get processed, now that we've asked for it.
          ts.needTransform = true;
        }
      };

      Transform.prototype._destroy = function (err, cb) {
        var _this2 = this;

        Duplex.prototype._destroy.call(this, err, function (err2) {
          cb(err2);
          _this2.emit('close');
        });
      };

      function done(stream, er, data) {
        if (er) return stream.emit('error', er);

        if (data != null) // single equals check for both `null` and `undefined`
          stream.push(data);

        // if there's nothing in the write buffer, then that means
        // that nothing more will ever be provided
        if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

        if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

        return stream.push(null);
      }
    }, {
      "./_stream_duplex": 14,
      "core-util-is": 5,
      "inherits": 8
    }],
    18: [function (bcryptoReq, mods, exps) {
      (function (process, global, setImmediate) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        // A bit simpler than readable streams.
        // Implement an async ._write(chunk, encoding, cb), and it'll handle all
        // the drain event emission and buffering.

        'use strict';

        /*<replacement>*/

        var pna = bcryptoReq('process-nextick-args');
        /*</replacement>*/

        mods.exps = Writable;

        /* <replacement> */
        function WriteReq(chunk, encoding, cb) {
          this.chunk = chunk;
          this.encoding = encoding;
          this.callback = cb;
          this.next = null;
        }

        // It seems a linked list but it is not
        // there will be only 2 of these for each stream
        function CorkedRequest(state) {
          var _this = this;

          this.next = null;
          this.entry = null;
          this.finish = function () {
            onCorkedFinish(_this, state);
          };
        }
        /* </replacement> */

        /*<replacement>*/
        var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
        /*</replacement>*/

        /*<replacement>*/
        var Duplex;
        /*</replacement>*/

        Writable.WritableState = WritableState;

        /*<replacement>*/
        var util = bcryptoReq('core-util-is');
        util.inherits = bcryptoReq('inherits');
        /*</replacement>*/

        /*<replacement>*/
        var internalUtil = {
          deprecate: bcryptoReq('util-deprecate')
        };
        /*</replacement>*/

        /*<replacement>*/
        var Stream = bcryptoReq('./internal/streams/stream');
        /*</replacement>*/

        /*<replacement>*/

        var Buffer = bcryptoReq('safe-buffer').Buffer;
        var OurUint8Array = global.Uint8Array || function () {};

        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }

        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }

        /*</replacement>*/

        var destroyImpl = bcryptoReq('./internal/streams/destroy');

        util.inherits(Writable, Stream);

        function nop() {}

        function WritableState(options, stream) {
          Duplex = Duplex || bcryptoReq('./_stream_duplex');

          options = options || {};

          // Duplex streams are both readable and writable, but share
          // the same options object.
          // However, some cases bcryptoReq setting options to different
          // values for the readable and the writable sides of the duplex stream.
          // These options can be provided separately as readableXXX and writableXXX.
          var isDuplex = stream instanceof Duplex;

          // object stream flag to indicate whether or not this stream
          // contains buffers or objects.
          this.objectMode = !!options.objectMode;

          if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

          // the point at which write() starts returning false
          // Note: 0 is a valid value, means that we always return false if
          // the entire buffer is not flushed immediately on write()
          var hwm = options.highWaterMark;
          var writableHwm = options.writableHighWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;

          if (hwm || hwm === 0) this.highWaterMark = hwm;
          else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;
          else this.highWaterMark = defaultHwm;

          // cast to ints.
          this.highWaterMark = Math.floor(this.highWaterMark);

          // if _final has been called
          this.finalCalled = false;

          // drain event flag.
          this.needDrain = false;
          // at the start of calling end()
          this.ending = false;
          // when end() has been called, and returned
          this.ended = false;
          // when 'finish' is emitted
          this.finished = false;

          // has it been destroyed
          this.destroyed = false;

          // should we decode strings into buffers before passing to _write?
          // this is here so that some node-core streams can optimize string
          // handling at a lower level.
          var noDecode = options.decodeStrings === false;
          this.decodeStrings = !noDecode;

          // Crypto is kind of old and crusty.  Historically, its default string
          // encoding is 'binary' so we have to make this configurable.
          // Everything else in the universe uses 'utf8', though.
          this.defaultEncoding = options.defaultEncoding || 'utf8';

          // not an actual buffer we keep track of, but a measurement
          // of how much we're waiting to get pushed to some underlying
          // socket or file.
          this.length = 0;

          // a flag to see when we're in the middle of a write.
          this.writing = false;

          // when true all writes will be buffered until .uncork() call
          this.corked = 0;

          // a flag to be able to tell if the onwrite cb is called immediately,
          // or on a later tick.  We set this to true at first, because any
          // actions that shouldn't happen until "later" should generally also
          // not happen before the first write call.
          this.sync = true;

          // a flag to know if we're processing previously buffered items, which
          // may call the _write() callback in the same tick, so that we don't
          // end up in an overlapped onwrite situation.
          this.bufferProcessing = false;

          // the callback that's passed to _write(chunk,cb)
          this.onwrite = function (er) {
            onwrite(stream, er);
          };

          // the callback that the user supplies to write(chunk,encoding,cb)
          this.writecb = null;

          // the amount that is being written when _write is called.
          this.writelen = 0;

          this.bufferedRequest = null;
          this.lastBufferedRequest = null;

          // number of pending user-supplied write callbacks
          // this must be 0 before 'finish' can be emitted
          this.pendingcb = 0;

          // emit prefinish if the only thing we're waiting for is _write cbs
          // This is relevant for synchronous Transform streams
          this.prefinished = false;

          // True if the error was already emitted and should not be thrown again
          this.errorEmitted = false;

          // count buffered requests
          this.bufferedRequestCount = 0;

          // allocate the first CorkedRequest, there is always
          // one allocated and free to use, and we maintain at most two
          this.corkedRequestsFree = new CorkedRequest(this);
        }

        WritableState.prototype.getBuffer = function getBuffer() {
          var current = this.bufferedRequest;
          var out = [];
          while (current) {
            out.push(current);
            current = current.next;
          }
          return out;
        };

        (function () {
          try {
            Object.defineProperty(WritableState.prototype, 'buffer', {
              get: internalUtil.deprecate(function () {
                return this.getBuffer();
              }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
            });
          } catch (_) {}
        })();

        // Test _writableState for inheritance to account for Duplex streams,
        // whose prototype chain only points to Readable.
        var realHasInstance;
        if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
          realHasInstance = Function.prototype[Symbol.hasInstance];
          Object.defineProperty(Writable, Symbol.hasInstance, {
            value: function (object) {
              if (realHasInstance.call(this, object)) return true;
              if (this !== Writable) return false;

              return object && object._writableState instanceof WritableState;
            }
          });
        } else {
          realHasInstance = function (object) {
            return object instanceof this;
          };
        }

        function Writable(options) {
          Duplex = Duplex || bcryptoReq('./_stream_duplex');

          // Writable ctor is applied to Duplexes, too.
          // `realHasInstance` is necessary because using plain `instanceof`
          // would return false, as no `_writableState` property is attached.

          // Trying to use the custom `instanceof` for Writable here will also break the
          // Node.js LazyTransform implementation, which has a non-trivial getter for
          // `_writableState` that would lead to infinite recursion.
          if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
            return new Writable(options);
          }

          this._writableState = new WritableState(options, this);

          // legacy.
          this.writable = true;

          if (options) {
            if (typeof options.write === 'function') this._write = options.write;

            if (typeof options.writev === 'function') this._writev = options.writev;

            if (typeof options.destroy === 'function') this._destroy = options.destroy;

            if (typeof options.final === 'function') this._final = options.final;
          }

          Stream.call(this);
        }

        // Otherwise people can pipe Writable streams, which is just wrong.
        Writable.prototype.pipe = function () {
          this.emit('error', new Error('Cannot pipe, not readable'));
        };

        function writeAfterEnd(stream, cb) {
          var er = new Error('write after end');
          // TODO: defer error events consistently everywhere, not just the cb
          stream.emit('error', er);
          pna.nextTick(cb, er);
        }

        // Checks that a user-supplied chunk is valid, especially for the particular
        // mode the stream is in. Currently this means that `null` is never accepted
        // and undefined/non-string values are only allowed in object mode.
        function validChunk(stream, state, chunk, cb) {
          var valid = true;
          var er = false;

          if (chunk === null) {
            er = new TypeError('May not write null values to stream');
          } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
          }
          if (er) {
            stream.emit('error', er);
            pna.nextTick(cb, er);
            valid = false;
          }
          return valid;
        }

        Writable.prototype.write = function (chunk, encoding, cb) {
          var state = this._writableState;
          var ret = false;
          var isBuf = !state.objectMode && _isUint8Array(chunk);

          if (isBuf && !Buffer.isBuffer(chunk)) {
            chunk = _uint8ArrayToBuffer(chunk);
          }

          if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
          }

          if (isBuf) encoding = 'buffer';
          else if (!encoding) encoding = state.defaultEncoding;

          if (typeof cb !== 'function') cb = nop;

          if (state.ended) writeAfterEnd(this, cb);
          else if (isBuf || validChunk(this, state, chunk, cb)) {
            state.pendingcb++;
            ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
          }

          return ret;
        };

        Writable.prototype.cork = function () {
          var state = this._writableState;

          state.corked++;
        };

        Writable.prototype.uncork = function () {
          var state = this._writableState;

          if (state.corked) {
            state.corked--;

            if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
          }
        };

        Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
          // node::ParseEncoding() requires lower case.
          if (typeof encoding === 'string') encoding = encoding.toLowerCase();
          if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
          this._writableState.defaultEncoding = encoding;
          return this;
        };

        function decodeChunk(state, chunk, encoding) {
          if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
          }
          return chunk;
        }

        Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function () {
            return this._writableState.highWaterMark;
          }
        });

        // if we're already writing something, then just put this
        // in the queue, and wait our turn.  Otherwise, call _write
        // If we return false, then we need a drain event, so set that flag.
        function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
          if (!isBuf) {
            var newChunk = decodeChunk(state, chunk, encoding);
            if (chunk !== newChunk) {
              isBuf = true;
              encoding = 'buffer';
              chunk = newChunk;
            }
          }
          var len = state.objectMode ? 1 : chunk.length;

          state.length += len;

          var ret = state.length < state.highWaterMark;
          // we must ensure that previous needDrain will not be reset to false.
          if (!ret) state.needDrain = true;

          if (state.writing || state.corked) {
            var last = state.lastBufferedRequest;
            state.lastBufferedRequest = {
              chunk: chunk,
              encoding: encoding,
              isBuf: isBuf,
              callback: cb,
              next: null
            };
            if (last) {
              last.next = state.lastBufferedRequest;
            } else {
              state.bufferedRequest = state.lastBufferedRequest;
            }
            state.bufferedRequestCount += 1;
          } else {
            doWrite(stream, state, false, len, chunk, encoding, cb);
          }

          return ret;
        }

        function doWrite(stream, state, writev, len, chunk, encoding, cb) {
          state.writelen = len;
          state.writecb = cb;
          state.writing = true;
          state.sync = true;
          if (writev) stream._writev(chunk, state.onwrite);
          else stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }

        function onwriteError(stream, state, sync, er, cb) {
          --state.pendingcb;

          if (sync) {
            // defer the callback if we are being called synchronously
            // to avoid piling up things on the stack
            pna.nextTick(cb, er);
            // this can emit finish, and it will always happen
            // after error
            pna.nextTick(finishMaybe, stream, state);
            stream._writableState.errorEmitted = true;
            stream.emit('error', er);
          } else {
            // the caller expect this to happen before if
            // it is async
            cb(er);
            stream._writableState.errorEmitted = true;
            stream.emit('error', er);
            // this can emit finish, but finish must
            // always follow error
            finishMaybe(stream, state);
          }
        }

        function onwriteStateUpdate(state) {
          state.writing = false;
          state.writecb = null;
          state.length -= state.writelen;
          state.writelen = 0;
        }

        function onwrite(stream, er) {
          var state = stream._writableState;
          var sync = state.sync;
          var cb = state.writecb;

          onwriteStateUpdate(state);

          if (er) onwriteError(stream, state, sync, er, cb);
          else {
            // Check if we're actually ready to finish, but don't emit yet
            var finished = needFinish(state);

            if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
              clearBuffer(stream, state);
            }

            if (sync) {
              /*<replacement>*/
              asyncWrite(afterWrite, stream, state, finished, cb);
              /*</replacement>*/
            } else {
              afterWrite(stream, state, finished, cb);
            }
          }
        }

        function afterWrite(stream, state, finished, cb) {
          if (!finished) onwriteDrain(stream, state);
          state.pendingcb--;
          cb();
          finishMaybe(stream, state);
        }

        // Must force callback to be called on nextTick, so that we don't
        // emit 'drain' before the write() consumer gets the 'false' return
        // value, and has a chance to attach a 'drain' listener.
        function onwriteDrain(stream, state) {
          if (state.length === 0 && state.needDrain) {
            state.needDrain = false;
            stream.emit('drain');
          }
        }

        // if there's something in the buffer waiting, then process it
        function clearBuffer(stream, state) {
          state.bufferProcessing = true;
          var entry = state.bufferedRequest;

          if (stream._writev && entry && entry.next) {
            // Fast case, write everything using _writev()
            var l = state.bufferedRequestCount;
            var buffer = new Array(l);
            var holder = state.corkedRequestsFree;
            holder.entry = entry;

            var count = 0;
            var allBuffers = true;
            while (entry) {
              buffer[count] = entry;
              if (!entry.isBuf) allBuffers = false;
              entry = entry.next;
              count += 1;
            }
            buffer.allBuffers = allBuffers;

            doWrite(stream, state, true, state.length, buffer, '', holder.finish);

            // doWrite is almost always async, defer these to save a bit of time
            // as the hot path ends with doWrite
            state.pendingcb++;
            state.lastBufferedRequest = null;
            if (holder.next) {
              state.corkedRequestsFree = holder.next;
              holder.next = null;
            } else {
              state.corkedRequestsFree = new CorkedRequest(state);
            }
            state.bufferedRequestCount = 0;
          } else {
            // Slow case, write chunks one-by-one
            while (entry) {
              var chunk = entry.chunk;
              var encoding = entry.encoding;
              var cb = entry.callback;
              var len = state.objectMode ? 1 : chunk.length;

              doWrite(stream, state, false, len, chunk, encoding, cb);
              entry = entry.next;
              state.bufferedRequestCount--;
              // if we didn't call the onwrite immediately, then
              // it means that we need to wait until it does.
              // also, that means that the chunk and cb are currently
              // being processed, so move the buffer counter past them.
              if (state.writing) {
                break;
              }
            }

            if (entry === null) state.lastBufferedRequest = null;
          }

          state.bufferedRequest = entry;
          state.bufferProcessing = false;
        }

        Writable.prototype._write = function (chunk, encoding, cb) {
          cb(new Error('_write() is not implemented'));
        };

        Writable.prototype._writev = null;

        Writable.prototype.end = function (chunk, encoding, cb) {
          var state = this._writableState;

          if (typeof chunk === 'function') {
            cb = chunk;
            chunk = null;
            encoding = null;
          } else if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
          }

          if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

          // .end() fully uncorks
          if (state.corked) {
            state.corked = 1;
            this.uncork();
          }

          // ignore unnecessary end() calls.
          if (!state.ending && !state.finished) endWritable(this, state, cb);
        };

        function needFinish(state) {
          return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
        }

        function callFinal(stream, state) {
          stream._final(function (err) {
            state.pendingcb--;
            if (err) {
              stream.emit('error', err);
            }
            state.prefinished = true;
            stream.emit('prefinish');
            finishMaybe(stream, state);
          });
        }

        function prefinish(stream, state) {
          if (!state.prefinished && !state.finalCalled) {
            if (typeof stream._final === 'function') {
              state.pendingcb++;
              state.finalCalled = true;
              pna.nextTick(callFinal, stream, state);
            } else {
              state.prefinished = true;
              stream.emit('prefinish');
            }
          }
        }

        function finishMaybe(stream, state) {
          var need = needFinish(state);
          if (need) {
            prefinish(stream, state);
            if (state.pendingcb === 0) {
              state.finished = true;
              stream.emit('finish');
            }
          }
          return need;
        }

        function endWritable(stream, state, cb) {
          state.ending = true;
          finishMaybe(stream, state);
          if (cb) {
            if (state.finished) pna.nextTick(cb);
            else stream.once('finish', cb);
          }
          state.ended = true;
          stream.writable = false;
        }

        function onCorkedFinish(corkReq, state, err) {
          var entry = corkReq.entry;
          corkReq.entry = null;
          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          }
          if (state.corkedRequestsFree) {
            state.corkedRequestsFree.next = corkReq;
          } else {
            state.corkedRequestsFree = corkReq;
          }
        }

        Object.defineProperty(Writable.prototype, 'destroyed', {
          get: function () {
            if (this._writableState === undefined) {
              return false;
            }
            return this._writableState.destroyed;
          },
          set: function (value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._writableState) {
              return;
            }

            // backward compatibility, the user is explicitly
            // managing destroyed
            this._writableState.destroyed = value;
          }
        });

        Writable.prototype.destroy = destroyImpl.destroy;
        Writable.prototype._undestroy = destroyImpl.undestroy;
        Writable.prototype._destroy = function (err, cb) {
          this.end();
          cb(err);
        };
      }).call(this, bcryptoReq('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, bcryptoReq("timers").setImmediate)
    }, {
      "./_stream_duplex": 14,
      "./internal/streams/destroy": 20,
      "./internal/streams/stream": 21,
      "_process": 12,
      "core-util-is": 5,
      "inherits": 8,
      "process-nextick-args": 11,
      "safe-buffer": 26,
      "timers": 29,
      "util-deprecate": 30
    }],
    19: [function (bcryptoReq, mods, exps) {
      'use strict';

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Buffer = bcryptoReq('safe-buffer').Buffer;
      var util = bcryptoReq('util');

      function copyBuffer(src, target, offset) {
        src.copy(target, offset);
      }

      mods.exps = function () {
        function BufferList() {
          _classCallCheck(this, BufferList);

          this.head = null;
          this.tail = null;
          this.length = 0;
        }

        BufferList.prototype.push = function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;
          else this.head = entry;
          this.tail = entry;
          ++this.length;
        };

        BufferList.prototype.unshift = function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        };

        BufferList.prototype.shift = function shift() {
          if (this.length === 0) return;
          var ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          --this.length;
          return ret;
        };

        BufferList.prototype.clear = function clear() {
          this.head = this.tail = null;
          this.length = 0;
        };

        BufferList.prototype.join = function join(s) {
          if (this.length === 0) return '';
          var p = this.head;
          var ret = '' + p.data;
          while (p = p.next) {
            ret += s + p.data;
          }
          return ret;
        };

        BufferList.prototype.concat = function concat(n) {
          if (this.length === 0) return Buffer.alloc(0);
          if (this.length === 1) return this.head.data;
          var ret = Buffer.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        };

        return BufferList;
      }();

      if (util && util.inspect && util.inspect.custom) {
        mods.exps.prototype[util.inspect.custom] = function () {
          var obj = util.inspect({
            length: this.length
          });
          return this.constructor.name + ' ' + obj;
        };
      }
    }, {
      "safe-buffer": 26,
      "util": 3
    }],
    20: [function (bcryptoReq, mods, exps) {
      'use strict';

      /*<replacement>*/

      var pna = bcryptoReq('process-nextick-args');
      /*</replacement>*/

      // undocumented cb() API, needed for core, not for public API
      function destroy(err, cb) {
        var _this = this;

        var readableDestroyed = this._readableState && this._readableState.destroyed;
        var writableDestroyed = this._writableState && this._writableState.destroyed;

        if (readableDestroyed || writableDestroyed) {
          if (cb) {
            cb(err);
          } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
            pna.nextTick(emitErrorNT, this, err);
          }
          return this;
        }

        // we set destroyed to true before firing error callbacks in order
        // to make it re-entrance safe in case destroy() is called within callbacks

        if (this._readableState) {
          this._readableState.destroyed = true;
        }

        // if this is a duplex stream mark the writable part as destroyed as well
        if (this._writableState) {
          this._writableState.destroyed = true;
        }

        this._destroy(err || null, function (err) {
          if (!cb && err) {
            pna.nextTick(emitErrorNT, _this, err);
            if (_this._writableState) {
              _this._writableState.errorEmitted = true;
            }
          } else if (cb) {
            cb(err);
          }
        });

        return this;
      }

      function undestroy() {
        if (this._readableState) {
          this._readableState.destroyed = false;
          this._readableState.reading = false;
          this._readableState.ended = false;
          this._readableState.endEmitted = false;
        }

        if (this._writableState) {
          this._writableState.destroyed = false;
          this._writableState.ended = false;
          this._writableState.ending = false;
          this._writableState.finished = false;
          this._writableState.errorEmitted = false;
        }
      }

      function emitErrorNT(self, err) {
        self.emit('error', err);
      }

      mods.exps = {
        destroy: destroy,
        undestroy: undestroy
      };
    }, {
      "process-nextick-args": 11
    }],
    21: [function (bcryptoReq, mods, exps) {
      mods.exps = bcryptoReq('events').EventEmitter;

    }, {
      "events": 6
    }],
    22: [function (bcryptoReq, mods, exps) {
      mods.exps = bcryptoReq('./readable').PassThrough

    }, {
      "./readable": 23
    }],
    23: [function (bcryptoReq, mods, exps) {
      exps = mods.exps = bcryptoReq('./lib/_stream_readable.js');
      exps.Stream = exps;
      exps.Readable = exps;
      exps.Writable = bcryptoReq('./lib/_stream_writable.js');
      exps.Duplex = bcryptoReq('./lib/_stream_duplex.js');
      exps.Transform = bcryptoReq('./lib/_stream_transform.js');
      exps.PassThrough = bcryptoReq('./lib/_stream_passthrough.js');

    }, {
      "./lib/_stream_duplex.js": 14,
      "./lib/_stream_passthrough.js": 15,
      "./lib/_stream_readable.js": 16,
      "./lib/_stream_transform.js": 17,
      "./lib/_stream_writable.js": 18
    }],
    24: [function (bcryptoReq, mods, exps) {
      mods.exps = bcryptoReq('./readable').Transform

    }, {
      "./readable": 23
    }],
    25: [function (bcryptoReq, mods, exps) {
      mods.exps = bcryptoReq('./lib/_stream_writable.js');

    }, {
      "./lib/_stream_writable.js": 18
    }],
    26: [function (bcryptoReq, mods, exps) {
      /* eslint-disable node/no-deprecated-api */
      var buffer = bcryptoReq('buffer')
      var Buffer = buffer.Buffer

      // alternative to using Object.keys for old browsers
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key]
        }
      }
      if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
        mods.exps = buffer
      } else {
        // Copy properties from bcryptoReq('buffer')
        copyProps(buffer, exps)
        exps.Buffer = SafeBuffer
      }

      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer(arg, encodingOrOffset, length)
      }

      // Copy static methods from Buffer
      copyProps(Buffer, SafeBuffer)

      SafeBuffer.from = function (arg, encodingOrOffset, length) {
        if (typeof arg === 'number') {
          throw new TypeError('Argument must not be a number')
        }
        return Buffer(arg, encodingOrOffset, length)
      }

      SafeBuffer.alloc = function (size, fill, encoding) {
        if (typeof size !== 'number') {
          throw new TypeError('Argument must be a number')
        }
        var buf = Buffer(size)
        if (fill !== undefined) {
          if (typeof encoding === 'string') {
            buf.fill(fill, encoding)
          } else {
            buf.fill(fill)
          }
        } else {
          buf.fill(0)
        }
        return buf
      }

      SafeBuffer.allocUnsafe = function (size) {
        if (typeof size !== 'number') {
          throw new TypeError('Argument must be a number')
        }
        return Buffer(size)
      }

      SafeBuffer.allocUnsafeSlow = function (size) {
        if (typeof size !== 'number') {
          throw new TypeError('Argument must be a number')
        }
        return buffer.SlowBuffer(size)
      }

    }, {
      "buffer": 4
    }],
    27: [function (bcryptoReq, mods, exps) {
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      mods.exps = Stream;

      var EE = bcryptoReq('events').EventEmitter;
      var inherits = bcryptoReq('inherits');

      inherits(Stream, EE);
      Stream.Readable = bcryptoReq('readable-stream/readable.js');
      Stream.Writable = bcryptoReq('readable-stream/writable.js');
      Stream.Duplex = bcryptoReq('readable-stream/duplex.js');
      Stream.Transform = bcryptoReq('readable-stream/transform.js');
      Stream.PassThrough = bcryptoReq('readable-stream/passthrough.js');

      // Backwards-compat with node 0.4.x
      Stream.Stream = Stream;



      // old-style streams.  Note that the pipe method (the only relevant
      // part of this class) is overridden in the Readable class.

      function Stream() {
        EE.call(this);
      }

      Stream.prototype.pipe = function (dest, options) {
        var source = this;

        function ondata(chunk) {
          if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
              source.pause();
            }
          }
        }

        source.on('data', ondata);

        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }

        dest.on('drain', ondrain);

        // If the 'end' option is not supplied, dest.end() will be called when
        // source gets the 'end' or 'close' events.  Only dest.end() once.
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on('end', onend);
          source.on('close', onclose);
        }

        var didOnEnd = false;

        function onend() {
          if (didOnEnd) return;
          didOnEnd = true;

          dest.end();
        }


        function onclose() {
          if (didOnEnd) return;
          didOnEnd = true;

          if (typeof dest.destroy === 'function') dest.destroy();
        }

        // don't leave dangling pipes when there are errors.
        function onerror(er) {
          cleanup();
          if (EE.listenerCount(this, 'error') === 0) {
            throw er; // Unhandled stream error in pipe.
          }
        }

        source.on('error', onerror);
        dest.on('error', onerror);

        // remove all the event listeners that were added.
        function cleanup() {
          source.removeListener('data', ondata);
          dest.removeListener('drain', ondrain);

          source.removeListener('end', onend);
          source.removeListener('close', onclose);

          source.removeListener('error', onerror);
          dest.removeListener('error', onerror);

          source.removeListener('end', cleanup);
          source.removeListener('close', cleanup);

          dest.removeListener('close', cleanup);
        }

        source.on('end', cleanup);
        source.on('close', cleanup);

        dest.on('close', cleanup);

        dest.emit('pipe', source);

        // Allow for unix-like usage: A.pipe(B).pipe(C)
        return dest;
      };

    }, {
      "events": 6,
      "inherits": 8,
      "readable-stream/duplex.js": 13,
      "readable-stream/passthrough.js": 22,
      "readable-stream/readable.js": 23,
      "readable-stream/transform.js": 24,
      "readable-stream/writable.js": 25
    }],
    28: [function (bcryptoReq, mods, exps) {
      // Copyright Joyent, Inc. and other Node contributors.
      //
      // Permission is hereby granted, free of charge, to any person obtaining a
      // copy of this software and associated documentation files (the
      // "Software"), to deal in the Software without restriction, including
      // without limitation the rights to use, copy, modify, merge, publish,
      // distribute, sublicense, and/or sell copies of the Software, and to permit
      // persons to whom the Software is furnished to do so, subject to the
      // following conditions:
      //
      // The above copyright notice and this permission notice shall be included
      // in all copies or substantial portions of the Software.
      //
      // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
      // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      // USE OR OTHER DEALINGS IN THE SOFTWARE.

      'use strict';

      /*<replacement>*/

      var Buffer = bcryptoReq('safe-buffer').Buffer;
      /*</replacement>*/

      var isEncoding = Buffer.isEncoding || function (encoding) {
        encoding = '' + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
          case 'raw':
            return true;
          default:
            return false;
        }
      };

      function _normalizeEncoding(enc) {
        if (!enc) return 'utf8';
        var retried;
        while (true) {
          switch (enc) {
            case 'utf8':
            case 'utf-8':
              return 'utf8';
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return 'utf16le';
            case 'latin1':
            case 'binary':
              return 'latin1';
            case 'base64':
            case 'ascii':
            case 'hex':
              return enc;
            default:
              if (retried) return; // undefined
              enc = ('' + enc).toLowerCase();
              retried = true;
          }
        }
      };

      // Do not cache `Buffer.isEncoding` when checking encoding names as some
      // modules monkey-patch it to support additional encodings
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
        return nenc || enc;
      }

      // StringDecoder provides an interface for efficiently splitting a series of
      // buffers into a series of JS strings without breaking apart multi-byte
      // characters.
      exps.StringDecoder = StringDecoder;

      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case 'utf16le':
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case 'utf8':
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case 'base64':
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer.allocUnsafe(nb);
      }

      StringDecoder.prototype.write = function (buf) {
        if (buf.length === 0) return '';
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf);
          if (r === undefined) return '';
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
        return r || '';
      };

      StringDecoder.prototype.end = utf8End;

      // Returns only complete characters in a Buffer
      StringDecoder.prototype.text = utf8Text;

      // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
      StringDecoder.prototype.fillLast = function (buf) {
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
        this.lastNeed -= buf.length;
      };

      // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
      // continuation byte. If an invalid byte is detected, -2 is returned.
      function utf8CheckByte(byte) {
        if (byte <= 0x7F) return 0;
        else if (byte >> 5 === 0x06) return 2;
        else if (byte >> 4 === 0x0E) return 3;
        else if (byte >> 3 === 0x1E) return 4;
        return byte >> 6 === 0x02 ? -1 : -2;
      }

      // Checks at most 3 bytes at the end of a Buffer in order to detect an
      // incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
      // needed to complete the UTF-8 character (if applicable) are returned.
      function utf8CheckIncomplete(self, buf, i) {
        var j = buf.length - 1;
        if (j < i) return 0;
        var nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) self.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i || nb === -2) return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }

      // Validates as many continuation bytes for a multi-byte UTF-8 character as
      // needed or are available. If we see a non-continuation byte where we expect
      // one, we "replace" the validated continuation bytes we've seen so far with
      // a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
      // behavior. The continuation byte check is included three times in the case
      // where all of the continuation bytes for a character exist in the same buffer.
      // It is also done this way as a slight performance increase instead of using a
      // loop.
      function utf8CheckExtraBytes(self, buf, p) {
        if ((buf[0] & 0xC0) !== 0x80) {
          self.lastNeed = 0;
          return '\ufffd';
        }
        if (self.lastNeed > 1 && buf.length > 1) {
          if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return '\ufffd';
          }
          if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
              self.lastNeed = 2;
              return '\ufffd';
            }
          }
        }
      }

      // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
      function utf8FillLast(buf) {
        var p = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf, p);
        if (r !== undefined) return r;
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, p, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, p, 0, buf.length);
        this.lastNeed -= buf.length;
      }

      // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
      // partial character, the character's bytes are buffered until the required
      // number of bytes are available.
      function utf8Text(buf, i) {
        var total = utf8CheckIncomplete(this, buf, i);
        if (!this.lastNeed) return buf.toString('utf8', i);
        this.lastTotal = total;
        var end = buf.length - (total - this.lastNeed);
        buf.copy(this.lastChar, 0, end);
        return buf.toString('utf8', i, end);
      }

      // For UTF-8, a replacement character is added when ending on a partial
      // character.
      function utf8End(buf) {
        var r = buf && buf.length ? this.write(buf) : '';
        if (this.lastNeed) return r + '\ufffd';
        return r;
      }

      // UTF-16LE typically needs two bytes per character, but even if we have an even
      // number of bytes available, we need to check if we end on a leading/high
      // surrogate. In that case, we need to wait for the next two bytes in order to
      // decode the last character properly.
      function utf16Text(buf, i) {
        if ((buf.length - i) % 2 === 0) {
          var r = buf.toString('utf16le', i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf[buf.length - 2];
              this.lastChar[1] = buf[buf.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf[buf.length - 1];
        return buf.toString('utf16le', i, buf.length - 1);
      }

      // For UTF-16LE we do not explicitly append special replacement characters if we
      // end on a partial character, we simply let v8 handle that.
      function utf16End(buf) {
        var r = buf && buf.length ? this.write(buf) : '';
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString('utf16le', 0, end);
        }
        return r;
      }

      function base64Text(buf, i) {
        var n = (buf.length - i) % 3;
        if (n === 0) return buf.toString('base64', i);
        this.lastNeed = 3 - n;
        this.lastTotal = 3;
        if (n === 1) {
          this.lastChar[0] = buf[buf.length - 1];
        } else {
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
        }
        return buf.toString('base64', i, buf.length - n);
      }

      function base64End(buf) {
        var r = buf && buf.length ? this.write(buf) : '';
        if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
        return r;
      }

      // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
      function simpleWrite(buf) {
        return buf.toString(this.encoding);
      }

      function simpleEnd(buf) {
        return buf && buf.length ? this.write(buf) : '';
      }
    }, {
      "safe-buffer": 26
    }],
    29: [function (bcryptoReq, mods, exps) {
      (function (setImmediate, clearImmediate) {
        var nextTick = bcryptoReq('process/browser.js').nextTick;
        var apply = Function.prototype.apply;
        var slice = Array.prototype.slice;
        var immediateIds = {};
        var nextImmediateId = 0;

        // DOM APIs, for completeness

        exps.setTimeout = function () {
          return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
        };
        exps.setInterval = function () {
          return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
        };
        exps.clearTimeout =
          exps.clearInterval = function (timeout) {
            timeout.close();
          };

        function Timeout(id, clearFn) {
          this._id = id;
          this._clearFn = clearFn;
        }
        Timeout.prototype.unref = Timeout.prototype.ref = function () {};
        Timeout.prototype.close = function () {
          this._clearFn.call(window, this._id);
        };

        // Does not start the time, just sets up the members needed.
        exps.enroll = function (item, msecs) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = msecs;
        };

        exps.unenroll = function (item) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = -1;
        };

        exps._unrefActive = exps.active = function (item) {
          clearTimeout(item._idleTimeoutId);

          var msecs = item._idleTimeout;
          if (msecs >= 0) {
            item._idleTimeoutId = setTimeout(function onTimeout() {
              if (item._onTimeout)
                item._onTimeout();
            }, msecs);
          }
        };

        // That's not how node.js implements it but the exposed api is the same.
        exps.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
          var id = nextImmediateId++;
          var args = arguments.length < 2 ? false : slice.call(arguments, 1);

          immediateIds[id] = true;

          nextTick(function onNextTick() {
            if (immediateIds[id]) {
              // fn.call() is faster so we optimize for the common use-case
              // @see http://jsperf.com/call-apply-segu
              if (args) {
                fn.apply(null, args);
              } else {
                fn.call(null);
              }
              // Prevent ids from leaking
              exps.clearImmediate(id);
            }
          });

          return id;
        };

        exps.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
          delete immediateIds[id];
        };
      }).call(this, bcryptoReq("timers").setImmediate, bcryptoReq("timers").clearImmediate)
    }, {
      "process/browser.js": 12,
      "timers": 29
    }],
    30: [function (bcryptoReq, mods, exps) {
      (function (global) {

        /**
         * Module exps.
         */

        mods.exps = deprecate;

        /**
         * Mark that a method should not be used.
         * Returns a modified function which warns once by default.
         *
         * If `localStorage.noDeprecation = true` is set, then it is a no-op.
         *
         * If `localStorage.throwDeprecation = true` is set, then deprecated functions
         * will throw an Error when invoked.
         *
         * If `localStorage.traceDeprecation = true` is set, then deprecated functions
         * will invoke `console.trace()` instead of `console.error()`.
         *
         * @param {Function} fn - the function to deprecate
         * @param {String} msg - the string to print to the console when `fn` is invoked
         * @returns {Function} a new "deprecated" version of `fn`
         * @api public
         */

        function deprecate(fn, msg) {
          if (config('noDeprecation')) {
            return fn;
          }

          var warned = false;

          function deprecated() {
            if (!warned) {
              if (config('throwDeprecation')) {
                throw new Error(msg);
              } else if (config('traceDeprecation')) {
                console.trace(msg);
              } else {
                console.warn(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }

          return deprecated;
        }

        /**
         * Checks `localStorage` for boolean values for the given `name`.
         *
         * @param {String} name
         * @returns {Boolean}
         * @api private
         */

        function config(name) {
          // accessing global.localStorage can trigger a DOMException in sandboxed iframes
          try {
            if (!global.localStorage) return false;
          } catch (_) {
            return false;
          }
          var val = global.localStorage[name];
          if (null == val) return false;
          return String(val).toLowerCase() === 'true';
        }

      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    31: [function (bcryptoReq, mods, exps) {
      arguments[4][8][0].apply(exps, arguments)
    }, {
      "dup": 8
    }],
    32: [function (bcryptoReq, mods, exps) {
      mods.exps = function isBuffer(arg) {
        return arg && typeof arg === 'object' &&
          typeof arg.copy === 'function' &&
          typeof arg.fill === 'function' &&
          typeof arg.readUInt8 === 'function';
      }
    }, {}],
    33: [function (bcryptoReq, mods, exps) {
      (function (process, global) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        var formatRegExp = /%[sdj%]/g;
        exps.format = function (f) {
          if (!isString(f)) {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
              objects.push(inspect(arguments[i]));
            }
            return objects.join(' ');
          }

          var i = 1;
          var args = arguments;
          var len = args.length;
          var str = String(f).replace(formatRegExp, function (x) {
            if (x === '%%') return '%';
            if (i >= len) return x;
            switch (x) {
              case '%s':
                return String(args[i++]);
              case '%d':
                return Number(args[i++]);
              case '%j':
                try {
                  return JSON.stringify(args[i++]);
                } catch (_) {
                  return '[Circular]';
                }
              default:
                return x;
            }
          });
          for (var x = args[i]; i < len; x = args[++i]) {
            if (isNull(x) || !isObject(x)) {
              str += ' ' + x;
            } else {
              str += ' ' + inspect(x);
            }
          }
          return str;
        };


        // Mark that a method should not be used.
        // Returns a modified function which warns once by default.
        // If --no-deprecation is set, then it is a no-op.
        exps.deprecate = function (fn, msg) {
          // Allow for deprecating things in the process of starting up.
          if (isUndefined(global.process)) {
            return function () {
              return exps.deprecate(fn, msg).apply(this, arguments);
            };
          }

          if (process.noDeprecation === true) {
            return fn;
          }

          var warned = false;

          function deprecated() {
            if (!warned) {
              if (process.throwDeprecation) {
                throw new Error(msg);
              } else if (process.traceDeprecation) {
                console.trace(msg);
              } else {
                console.error(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }

          return deprecated;
        };


        var debugs = {};
        var debugEnviron;
        exps.debuglog = function (set) {
          if (isUndefined(debugEnviron))
            debugEnviron = process.env.NODE_DEBUG || '';
          set = set.toUpperCase();
          if (!debugs[set]) {
            if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
              var pid = process.pid;
              debugs[set] = function () {
                var msg = exps.format.apply(exps, arguments);
                console.error('%s %d: %s', set, pid, msg);
              };
            } else {
              debugs[set] = function () {};
            }
          }
          return debugs[set];
        };


        /**
         * Echos the value of a value. Trys to print the value out
         * in the best way possible given the different types.
         *
         * @param {Object} obj The object to print out.
         * @param {Object} opts Optional options object that alters the output.
         */
        /* legacy: obj, showHidden, depth, colors*/
        function inspect(obj, opts) {
          // default options
          var ctx = {
            seen: [],
            stylize: stylizeNoColor
          };
          // legacy...
          if (arguments.length >= 3) ctx.depth = arguments[2];
          if (arguments.length >= 4) ctx.colors = arguments[3];
          if (isBoolean(opts)) {
            // legacy...
            ctx.showHidden = opts;
          } else if (opts) {
            // got an "options" object
            exps._extend(ctx, opts);
          }
          // set default options
          if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
          if (isUndefined(ctx.depth)) ctx.depth = 2;
          if (isUndefined(ctx.colors)) ctx.colors = false;
          if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
          if (ctx.colors) ctx.stylize = stylizeWithColor;
          return formatValue(ctx, obj, ctx.depth);
        }
        exps.inspect = inspect;


        // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
        inspect.colors = {
          'bold': [1, 22],
          'italic': [3, 23],
          'underline': [4, 24],
          'inverse': [7, 27],
          'white': [37, 39],
          'grey': [90, 39],
          'black': [30, 39],
          'blue': [34, 39],
          'cyan': [36, 39],
          'green': [32, 39],
          'magenta': [35, 39],
          'red': [31, 39],
          'yellow': [33, 39]
        };

        // Don't use 'blue' not visible on cmd.exe
        inspect.styles = {
          'special': 'cyan',
          'number': 'yellow',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red'
        };


        function stylizeWithColor(str, styleType) {
          var style = inspect.styles[styleType];

          if (style) {
            return '\u001b[' + inspect.colors[style][0] + 'm' + str +
              '\u001b[' + inspect.colors[style][1] + 'm';
          } else {
            return str;
          }
        }


        function stylizeNoColor(str, styleType) {
          return str;
        }


        function arrayToHash(array) {
          var hash = {};

          array.forEach(function (val, idx) {
            hash[val] = true;
          });

          return hash;
        }


        function formatValue(ctx, value, recurseTimes) {
          // Provide a hook for user-specified inspect functions.
          // Check that value is an object with an inspect function on it
          if (ctx.customInspect &&
            value &&
            isFunction(value.inspect) &&
            // Filter out the util mods, it's inspect function is special
            value.inspect !== exps.inspect &&
            // Also filter out any prototype objects using the circular check.
            !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes, ctx);
            if (!isString(ret)) {
              ret = formatValue(ctx, ret, recurseTimes);
            }
            return ret;
          }

          // Primitive types cannot have properties
          var primitive = formatPrimitive(ctx, value);
          if (primitive) {
            return primitive;
          }

          // Look up the keys of the object.
          var keys = Object.keys(value);
          var visibleKeys = arrayToHash(keys);

          if (ctx.showHidden) {
            keys = Object.getOwnPropertyNames(value);
          }

          // IE doesn't make error fields non-enumerable
          // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
          if (isError(value) &&
            (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
            return formatError(value);
          }

          // Some type of object without properties can be shortcutted.
          if (keys.length === 0) {
            if (isFunction(value)) {
              var name = value.name ? ': ' + value.name : '';
              return ctx.stylize('[Function' + name + ']', 'special');
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toString.call(value), 'date');
            }
            if (isError(value)) {
              return formatError(value);
            }
          }

          var base = '',
            array = false,
            braces = ['{', '}'];

          // Make Array say that they are Array
          if (isArray(value)) {
            array = true;
            braces = ['[', ']'];
          }

          // Make functions say that they are functions
          if (isFunction(value)) {
            var n = value.name ? ': ' + value.name : '';
            base = ' [Function' + n + ']';
          }

          // Make RegExps say that they are RegExps
          if (isRegExp(value)) {
            base = ' ' + RegExp.prototype.toString.call(value);
          }

          // Make dates with properties first say the date
          if (isDate(value)) {
            base = ' ' + Date.prototype.toUTCString.call(value);
          }

          // Make error with message first say the error
          if (isError(value)) {
            base = ' ' + formatError(value);
          }

          if (keys.length === 0 && (!array || value.length == 0)) {
            return braces[0] + base + braces[1];
          }

          if (recurseTimes < 0) {
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            } else {
              return ctx.stylize('[Object]', 'special');
            }
          }

          ctx.seen.push(value);

          var output;
          if (array) {
            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
          } else {
            output = keys.map(function (key) {
              return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            });
          }

          ctx.seen.pop();

          return reduceToSingleString(output, base, braces);
        }


        function formatPrimitive(ctx, value) {
          if (isUndefined(value))
            return ctx.stylize('undefined', 'undefined');
          if (isString(value)) {
            var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
              .replace(/'/g, "\\'")
              .replace(/\\"/g, '"') + '\'';
            return ctx.stylize(simple, 'string');
          }
          if (isNumber(value))
            return ctx.stylize('' + value, 'number');
          if (isBoolean(value))
            return ctx.stylize('' + value, 'boolean');
          // For some reason typeof null is "object", so special case here.
          if (isNull(value))
            return ctx.stylize('null', 'null');
        }


        function formatError(value) {
          return '[' + Error.prototype.toString.call(value) + ']';
        }


        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
          var output = [];
          for (var i = 0, l = value.length; i < l; ++i) {
            if (hasOwnProperty(value, String(i))) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                String(i), true));
            } else {
              output.push('');
            }
          }
          keys.forEach(function (key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                key, true));
            }
          });
          return output;
        }


        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
          var name, str, desc;
          desc = Object.getOwnPropertyDescriptor(value, key) || {
            value: value[key]
          };
          if (desc.get) {
            if (desc.set) {
              str = ctx.stylize('[Getter/Setter]', 'special');
            } else {
              str = ctx.stylize('[Getter]', 'special');
            }
          } else {
            if (desc.set) {
              str = ctx.stylize('[Setter]', 'special');
            }
          }
          if (!hasOwnProperty(visibleKeys, key)) {
            name = '[' + key + ']';
          }
          if (!str) {
            if (ctx.seen.indexOf(desc.value) < 0) {
              if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
              } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
              }
              if (str.indexOf('\n') > -1) {
                if (array) {
                  str = str.split('\n').map(function (line) {
                    return '  ' + line;
                  }).join('\n').substr(2);
                } else {
                  str = '\n' + str.split('\n').map(function (line) {
                    return '   ' + line;
                  }).join('\n');
                }
              }
            } else {
              str = ctx.stylize('[Circular]', 'special');
            }
          }
          if (isUndefined(name)) {
            if (array && key.match(/^\d+$/)) {
              return str;
            }
            name = JSON.stringify('' + key);
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.substr(1, name.length - 2);
              name = ctx.stylize(name, 'name');
            } else {
              name = name.replace(/'/g, "\\'")
                .replace(/\\"/g, '"')
                .replace(/(^"|"$)/g, "'");
              name = ctx.stylize(name, 'string');
            }
          }

          return name + ': ' + str;
        }


        function reduceToSingleString(output, base, braces) {
          var numLinesEst = 0;
          var length = output.reduce(function (prev, cur) {
            numLinesEst++;
            if (cur.indexOf('\n') >= 0) numLinesEst++;
            return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
          }, 0);

          if (length > 60) {
            return braces[0] +
              (base === '' ? '' : base + '\n ') +
              ' ' +
              output.join(',\n  ') +
              ' ' +
              braces[1];
          }

          return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
        }


        // NOTE: These type checking functions intentionally don't use `instanceof`
        // because it is fragile and can be easily faked with `Object.create()`.
        function isArray(ar) {
          return Array.isArray(ar);
        }
        exps.isArray = isArray;

        function isBoolean(arg) {
          return typeof arg === 'boolean';
        }
        exps.isBoolean = isBoolean;

        function isNull(arg) {
          return arg === null;
        }
        exps.isNull = isNull;

        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exps.isNullOrUndefined = isNullOrUndefined;

        function isNumber(arg) {
          return typeof arg === 'number';
        }
        exps.isNumber = isNumber;

        function isString(arg) {
          return typeof arg === 'string';
        }
        exps.isString = isString;

        function isSymbol(arg) {
          return typeof arg === 'symbol';
        }
        exps.isSymbol = isSymbol;

        function isUndefined(arg) {
          return arg === void 0;
        }
        exps.isUndefined = isUndefined;

        function isRegExp(re) {
          return isObject(re) && objectToString(re) === '[object RegExp]';
        }
        exps.isRegExp = isRegExp;

        function isObject(arg) {
          return typeof arg === 'object' && arg !== null;
        }
        exps.isObject = isObject;

        function isDate(d) {
          return isObject(d) && objectToString(d) === '[object Date]';
        }
        exps.isDate = isDate;

        function isError(e) {
          return isObject(e) &&
            (objectToString(e) === '[object Error]' || e instanceof Error);
        }
        exps.isError = isError;

        function isFunction(arg) {
          return typeof arg === 'function';
        }
        exps.isFunction = isFunction;

        function isPrimitive(arg) {
          return arg === null ||
            typeof arg === 'boolean' ||
            typeof arg === 'number' ||
            typeof arg === 'string' ||
            typeof arg === 'symbol' || // ES6 symbol
            typeof arg === 'undefined';
        }
        exps.isPrimitive = isPrimitive;

        exps.isBuffer = bcryptoReq('./support/isBuffer');

        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }


        function pad(n) {
          return n < 10 ? '0' + n.toString(10) : n.toString(10);
        }


        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
          'Oct', 'Nov', 'Dec'
        ];

        // 26 Feb 16:19:34
        function timestamp() {
          var d = new Date();
          var time = [pad(d.getHours()),
            pad(d.getMinutes()),
            pad(d.getSeconds())
          ].join(':');
          return [d.getDate(), months[d.getMonth()], time].join(' ');
        }


        // log is just a thin wrapper to console.log that prepends a timestamp
        exps.log = function () {
          console.log('%s - %s', timestamp(), exps.format.apply(exps, arguments));
        };


        /**
         * Inherit the prototype methods from one constructor into another.
         *
         * The Function.prototype.inherits from lang.js rewritten as a standalone
         * function (not on Function.prototype). NOTE: If this file is to be loaded
         * during bootstrapping this function needs to be rewritten using some native
         * functions as prototype setup using normal JavaScript does not work as
         * expected during bootstrapping (see mirror.js in r114903).
         *
         * @param {function} ctor Constructor function which needs to inherit the
         *     prototype.
         * @param {function} superCtor Constructor function to inherit prototype from.
         */
        exps.inherits = bcryptoReq('inherits');

        exps._extend = function (origin, add) {
          // Don't do anything if add isn't an object
          if (!add || !isObject(add)) return origin;

          var keys = Object.keys(add);
          var i = keys.length;
          while (i--) {
            origin[keys[i]] = add[keys[i]];
          }
          return origin;
        };

        function hasOwnProperty(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }

      }).call(this, bcryptoReq('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
      "./support/isBuffer": 32,
      "_process": 12,
      "inherits": 31
    }],
    34: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * aead.js - aead for bcoin
         * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');
        var ChaCha20 = bcryptoReq('./chacha20');
        var Poly1305 = bcryptoReq('./poly1305');

        var AEAD = function () {
          /**
           * AEAD (used for bip151)
           * @alias mods:crypto.AEAD
           * @constructor
           * @see https://github.com/openssh/openssh-portable
           * @see https://tools.ietf.org/html/rfc7539#section-2.8
           */

          function AEAD() {
            _classCallCheck(this, AEAD);

            this.chacha20 = new ChaCha20();
            this.poly1305 = new Poly1305();
            this.aadLen = 0;
            this.cipherLen = 0;
            this.hasCipher = false;
            this.polyKey = null;
          }

          /**
           * Initialize the AEAD with a key and iv.
           * @param {Buffer} key
           * @param {Buffer} iv - IV / packet sequence number.
           */

          AEAD.prototype.init = function init(key, iv) {
            var polyKey = Buffer.alloc(32, 0x00);

            this.chacha20.init(key, iv);
            this.chacha20.encrypt(polyKey);
            this.poly1305.init(polyKey);

            // We need to encrypt a full block
            // to get the cipher in the correct state.
            this.chacha20.encrypt(Buffer.alloc(32, 0x00));

            // Counter should be one.
            assert(this.chacha20.getCounter() === 1);

            // Expose for debugging.
            this.polyKey = polyKey;

            this.aadLen = 0;
            this.cipherLen = 0;
            this.hasCipher = false;
          };

          /**
           * Update the aad (will be finalized
           * on an encrypt/decrypt call).
           * @param {Buffer} aad
           */

          AEAD.prototype.aad = function aad(data) {
            assert(!this.hasCipher, 'Cannot update aad.');
            this.poly1305.update(data);
            this.aadLen += data.length;
          };

          /**
           * Encrypt a piece of data.
           * @param {Buffer} data
           */

          AEAD.prototype.encrypt = function encrypt(data) {
            if (!this.hasCipher) this.pad16(this.aadLen);

            this.chacha20.encrypt(data);
            this.poly1305.update(data);

            this.cipherLen += data.length;
            this.hasCipher = true;

            return data;
          };

          /**
           * Decrypt a piece of data.
           * @param {Buffer} data
           */

          AEAD.prototype.decrypt = function decrypt(data) {
            if (!this.hasCipher) this.pad16(this.aadLen);

            this.cipherLen += data.length;
            this.hasCipher = true;

            this.poly1305.update(data);
            this.chacha20.encrypt(data);

            return data;
          };

          /**
           * Authenticate data without decrypting.
           * @param {Buffer} data
           */

          AEAD.prototype.auth = function auth(data) {
            if (!this.hasCipher) this.pad16(this.aadLen);

            this.cipherLen += data.length;
            this.hasCipher = true;

            this.poly1305.update(data);

            return data;
          };

          /**
           * Finalize the aead and generate a MAC.
           * @returns {Buffer} MAC
           */

          AEAD.prototype.final = function final() {
            var len = Buffer.allocUnsafe(16);
            var lo = void 0,
              hi = void 0;

            // The RFC says these are supposed to be
            // uint32le, but their own fucking test
            // cases fail unless they are uint64le's.
            lo = this.aadLen % 0x100000000;
            hi = (this.aadLen - lo) / 0x100000000;
            len.writeUInt32LE(lo, 0, true);
            len.writeUInt32LE(hi, 4, true);

            lo = this.cipherLen % 0x100000000;
            hi = (this.cipherLen - lo) / 0x100000000;
            len.writeUInt32LE(lo, 8, true);
            len.writeUInt32LE(hi, 12, true);

            if (!this.hasCipher) this.pad16(this.aadLen);

            this.pad16(this.cipherLen);
            this.poly1305.update(len);

            return this.poly1305.final();
          };

          /**
           * Pad a chunk before updating mac.
           * @private
           * @param {Number} size
           */

          AEAD.prototype.pad16 = function pad16(size) {
            size %= 16;

            if (size === 0) return;

            var pad = Buffer.allocUnsafe(16 - size);
            pad.fill(0);

            this.poly1305.update(pad);
          };

          return AEAD;
        }();

        /*
         * Expose
         */

        mods.exps = AEAD;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./chacha20": 38,
      "./poly1305": 49,
      "assert": 1,
      "buffer": 4
    }],
    35: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * aes.js - aes128/192/256 for bcoin
         * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         *
         * Ported from:
         * https://github.com/openssl/openssl/blob/master/crypto/aes/aes_core.c
         * Entered into the public domain by Vincent Rijmen.
         */

        'use strict';

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }
          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');

        /*
         * Constants
         */

        var DUMMY = Buffer.alloc(0);

        var TE0 = new Uint32Array([0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a]);

        var TE1 = new Uint32Array([0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616]);

        var TE2 = new Uint32Array([0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16]);

        var TE3 = new Uint32Array([0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c]);

        var TD0 = new Uint32Array([0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742]);

        var TD1 = new Uint32Array([0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857]);

        var TD2 = new Uint32Array([0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8]);

        var TD3 = new Uint32Array([0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0]);

        var TD4 = new Uint8Array([0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d]);

        var RCON = new Uint32Array([0x01000000, 0x02000000, 0x04000000, 0x08000000, 0x10000000, 0x20000000, 0x40000000, 0x80000000, 0x1b000000, 0x36000000]);

        /**
         * AES
         * @abstract
         */

        var AES = function () {
          /**
           * Create an AES context.
           * @param {Number} [bits=256]
           */

          function AES() {
            var bits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 256;

            _classCallCheck(this, AES);

            assert(bits >>> 0 === bits);

            this.bits = bits;
            this.rounds = rounds(bits);
          }

          /**
           * Convert the user key into an encryption key.
           * @param {Buffer} ukey
           * @returns {Uint32Array} key
           */

          AES.prototype.encryptKey = function encryptKey(ukey) {
            assert(Buffer.isBuffer(ukey), 'Key must be a buffer');
            assert(ukey.length === this.bits / 8, 'Invalid key size.');

            var key = new Uint32Array(60);

            key[0] = readU32(ukey, 0);
            key[1] = readU32(ukey, 4);
            key[2] = readU32(ukey, 8);
            key[3] = readU32(ukey, 12);

            var p = 0;
            var i = 0;
            var t = void 0;

            if (this.bits === 128) {
              for (;;) {
                var tmp = key[p + 3];

                t = key[p];
                t ^= TE2[tmp >>> 16 & 0xff] & 0xff000000;
                t ^= TE3[tmp >>> 8 & 0xff] & 0x00ff0000;
                t ^= TE0[tmp >>> 0 & 0xff] & 0x0000ff00;
                t ^= TE1[tmp >>> 24 & 0xff] & 0x000000ff;
                t ^= RCON[i];

                key[p + 4] = t;
                key[p + 5] = key[p + 1] ^ key[p + 4];
                key[p + 6] = key[p + 2] ^ key[p + 5];
                key[p + 7] = key[p + 3] ^ key[p + 6];

                i += 1;

                if (i === 10) break;

                p += 4;
              }

              return key;
            }

            key[p + 4] = readU32(ukey, 16);
            key[p + 5] = readU32(ukey, 20);

            if (this.bits === 192) {
              for (;;) {
                var _tmp = key[p + 5];

                t = key[p];
                t ^= TE2[_tmp >>> 16 & 0xff] & 0xff000000;
                t ^= TE3[_tmp >>> 8 & 0xff] & 0x00ff0000;
                t ^= TE0[_tmp >>> 0 & 0xff] & 0x0000ff00;
                t ^= TE1[_tmp >>> 24 & 0xff] & 0x000000ff;
                t ^= RCON[i];

                key[p + 6] = t;
                key[p + 7] = key[p + 1] ^ key[p + 6];
                key[p + 8] = key[p + 2] ^ key[p + 7];
                key[p + 9] = key[p + 3] ^ key[p + 8];

                i += 1;

                if (i === 8) break;

                key[p + 10] = key[p + 4] ^ key[p + 9];
                key[p + 11] = key[p + 5] ^ key[p + 10];
                p += 6;
              }

              return key;
            }

            key[p + 6] = readU32(ukey, 24);
            key[p + 7] = readU32(ukey, 28);

            if (this.bits === 256) {
              for (;;) {
                var _tmp2 = key[p + 7];

                t = key[p];
                t ^= TE2[_tmp2 >>> 16 & 0xff] & 0xff000000;
                t ^= TE3[_tmp2 >>> 8 & 0xff] & 0x00ff0000;
                t ^= TE0[_tmp2 >>> 0 & 0xff] & 0x0000ff00;
                t ^= TE1[_tmp2 >>> 24 & 0xff] & 0x000000ff;
                t ^= RCON[i];

                key[p + 8] = t;
                key[p + 9] = key[p + 1] ^ key[p + 8];
                key[p + 10] = key[p + 2] ^ key[p + 9];
                key[p + 11] = key[p + 3] ^ key[p + 10];

                i += 1;

                if (i === 7) break;

                _tmp2 = key[p + 11];

                t = key[p + 4];
                t ^= TE2[_tmp2 >>> 24 & 0xff] & 0xff000000;
                t ^= TE3[_tmp2 >>> 16 & 0xff] & 0x00ff0000;
                t ^= TE0[_tmp2 >>> 8 & 0xff] & 0x0000ff00;
                t ^= TE1[_tmp2 >>> 0 & 0xff] & 0x000000ff;

                key[p + 12] = t;
                key[p + 13] = key[p + 5] ^ key[p + 12];
                key[p + 14] = key[p + 6] ^ key[p + 13];
                key[p + 15] = key[p + 7] ^ key[p + 14];

                p += 8;
              }

              return key;
            }

            throw new Error('Bad key size.');
          };

          /**
           * Convert the user key into a decryption key.
           * @param {Buffer} ukey
           * @returns {Uint32Array} key
           */

          AES.prototype.decryptKey = function decryptKey(ukey) {
            // First, start with an encryption schedule.
            var key = this.encryptKey(ukey);

            var p = 0;

            // Invert the order of the round keys.
            for (var i = 0, j = 4 * this.rounds; i < j; i += 4, j -= 4) {
              var tmp = key[p + i + 0];

              key[p + i + 0] = key[p + j + 0];
              key[p + j + 0] = tmp;

              tmp = key[p + i + 1];
              key[p + i + 1] = key[p + j + 1];
              key[p + j + 1] = tmp;

              tmp = key[p + i + 2];
              key[p + i + 2] = key[p + j + 2];
              key[p + j + 2] = tmp;

              tmp = key[p + i + 3];
              key[p + i + 3] = key[p + j + 3];
              key[p + j + 3] = tmp;
            }

            // Apply the inverse MixColumn transform to
            // all round keys but the first and the last.
            for (var _i = 1; _i < this.rounds; _i++) {
              var t0 = void 0,
                t1 = void 0,
                t2 = void 0,
                t3 = void 0;

              p += 4;

              t0 = TD0[TE1[key[p + 0] >>> 24 & 0xff] & 0xff];
              t0 ^= TD1[TE1[key[p + 0] >>> 16 & 0xff] & 0xff];
              t0 ^= TD2[TE1[key[p + 0] >>> 8 & 0xff] & 0xff];
              t0 ^= TD3[TE1[key[p + 0] >>> 0 & 0xff] & 0xff];

              t1 = TD0[TE1[key[p + 1] >>> 24 & 0xff] & 0xff];
              t1 ^= TD1[TE1[key[p + 1] >>> 16 & 0xff] & 0xff];
              t1 ^= TD2[TE1[key[p + 1] >>> 8 & 0xff] & 0xff];
              t1 ^= TD3[TE1[key[p + 1] >>> 0 & 0xff] & 0xff];

              t2 = TD0[TE1[key[p + 2] >>> 24 & 0xff] & 0xff];
              t2 ^= TD1[TE1[key[p + 2] >>> 16 & 0xff] & 0xff];
              t2 ^= TD2[TE1[key[p + 2] >>> 8 & 0xff] & 0xff];
              t2 ^= TD3[TE1[key[p + 2] >>> 0 & 0xff] & 0xff];

              t3 = TD0[TE1[key[p + 3] >>> 24 & 0xff] & 0xff];
              t3 ^= TD1[TE1[key[p + 3] >>> 16 & 0xff] & 0xff];
              t3 ^= TD2[TE1[key[p + 3] >>> 8 & 0xff] & 0xff];
              t3 ^= TD3[TE1[key[p + 3] >>> 0 & 0xff] & 0xff];

              key[p + 0] = t0;
              key[p + 1] = t1;
              key[p + 2] = t2;
              key[p + 3] = t3;
            }

            return key;
          };

          /**
           * Encrypt a 16 byte block of data.
           * @param {Uint32Array} key
           * @param {Buffer} input
           * @param {Number} ipos
           * @param {Buffer} output
           * @param {Number} opos
           * @returns {Buffer}
           */

          AES.prototype.encryptBlock = function encryptBlock(key, input, ipos, output, opos) {
            // Map byte array block to cipher
            // state and add initial round key.
            var s0 = readU32(input, ipos + 0) ^ key[0];
            var s1 = readU32(input, ipos + 4) ^ key[1];
            var s2 = readU32(input, ipos + 8) ^ key[2];
            var s3 = readU32(input, ipos + 12) ^ key[3];

            // Nr - 1 full rounds
            var r = this.rounds >>> 1;
            var p = 0;
            var t0 = void 0,
              t1 = void 0,
              t2 = void 0,
              t3 = void 0;

            for (;;) {
              t0 = TE0[s0 >>> 24 & 0xff];
              t0 ^= TE1[s1 >>> 16 & 0xff];
              t0 ^= TE2[s2 >>> 8 & 0xff];
              t0 ^= TE3[s3 >>> 0 & 0xff];
              t0 ^= key[p + 4];

              t1 = TE0[s1 >>> 24 & 0xff];
              t1 ^= TE1[s2 >>> 16 & 0xff];
              t1 ^= TE2[s3 >>> 8 & 0xff];
              t1 ^= TE3[s0 >>> 0 & 0xff];
              t1 ^= key[p + 5];

              t2 = TE0[s2 >>> 24 & 0xff];
              t2 ^= TE1[s3 >>> 16 & 0xff];
              t2 ^= TE2[s0 >>> 8 & 0xff];
              t2 ^= TE3[s1 >>> 0 & 0xff];
              t2 ^= key[p + 6];

              t3 = TE0[s3 >>> 24 & 0xff];
              t3 ^= TE1[s0 >>> 16 & 0xff];
              t3 ^= TE2[s1 >>> 8 & 0xff];
              t3 ^= TE3[s2 >>> 0 & 0xff];
              t3 ^= key[p + 7];

              p += 8;
              r -= 1;

              if (r === 0) break;

              s0 = TE0[t0 >>> 24 & 0xff];
              s0 ^= TE1[t1 >>> 16 & 0xff];
              s0 ^= TE2[t2 >>> 8 & 0xff];
              s0 ^= TE3[t3 >>> 0 & 0xff];
              s0 ^= key[p + 0];

              s1 = TE0[t1 >>> 24 & 0xff];
              s1 ^= TE1[t2 >>> 16 & 0xff];
              s1 ^= TE2[t3 >>> 8 & 0xff];
              s1 ^= TE3[t0 >>> 0 & 0xff];
              s1 ^= key[p + 1];

              s2 = TE0[t2 >>> 24 & 0xff];
              s2 ^= TE1[t3 >>> 16 & 0xff];
              s2 ^= TE2[t0 >>> 8 & 0xff];
              s2 ^= TE3[t1 >>> 0 & 0xff];
              s2 ^= key[p + 2];

              s3 = TE0[t3 >>> 24 & 0xff];
              s3 ^= TE1[t0 >>> 16 & 0xff];
              s3 ^= TE2[t1 >>> 8 & 0xff];
              s3 ^= TE3[t2 >>> 0 & 0xff];
              s3 ^= key[p + 3];
            }

            // Apply last round and map cipher
            // state to byte array block.
            s0 = TE2[t0 >>> 24 & 0xff] & 0xff000000;
            s0 ^= TE3[t1 >>> 16 & 0xff] & 0x00ff0000;
            s0 ^= TE0[t2 >>> 8 & 0xff] & 0x0000ff00;
            s0 ^= TE1[t3 >>> 0 & 0xff] & 0x000000ff;
            s0 ^= key[p + 0];

            s1 = TE2[t1 >>> 24 & 0xff] & 0xff000000;
            s1 ^= TE3[t2 >>> 16 & 0xff] & 0x00ff0000;
            s1 ^= TE0[t3 >>> 8 & 0xff] & 0x0000ff00;
            s1 ^= TE1[t0 >>> 0 & 0xff] & 0x000000ff;
            s1 ^= key[p + 1];

            s2 = TE2[t2 >>> 24 & 0xff] & 0xff000000;
            s2 ^= TE3[t3 >>> 16 & 0xff] & 0x00ff0000;
            s2 ^= TE0[t0 >>> 8 & 0xff] & 0x0000ff00;
            s2 ^= TE1[t1 >>> 0 & 0xff] & 0x000000ff;
            s2 ^= key[p + 2];

            s3 = TE2[t3 >>> 24 & 0xff] & 0xff000000;
            s3 ^= TE3[t0 >>> 16 & 0xff] & 0x00ff0000;
            s3 ^= TE0[t1 >>> 8 & 0xff] & 0x0000ff00;
            s3 ^= TE1[t2 >>> 0 & 0xff] & 0x000000ff;
            s3 ^= key[p + 3];

            writeU32(output, s0, opos + 0);
            writeU32(output, s1, opos + 4);
            writeU32(output, s2, opos + 8);
            writeU32(output, s3, opos + 12);
          };

          /**
           * Decrypt a 16 byte block of data.
           * @param {Uint32Array} key
           * @param {Buffer} input
           * @param {Number} ipos
           * @param {Buffer} output
           * @param {Number} opos
           * @returns {Buffer}
           */

          AES.prototype.decryptBlock = function decryptBlock(key, input, ipos, output, opos) {
            // Map byte array block to cipher
            // state and add initial round key.
            var s0 = readU32(input, ipos + 0) ^ key[0];
            var s1 = readU32(input, ipos + 4) ^ key[1];
            var s2 = readU32(input, ipos + 8) ^ key[2];
            var s3 = readU32(input, ipos + 12) ^ key[3];

            // Nr - 1 full rounds
            var r = this.rounds >>> 1;
            var p = 0;
            var t0 = void 0,
              t1 = void 0,
              t2 = void 0,
              t3 = void 0;

            for (;;) {
              t0 = TD0[s0 >>> 24 & 0xff];
              t0 ^= TD1[s3 >>> 16 & 0xff];
              t0 ^= TD2[s2 >>> 8 & 0xff];
              t0 ^= TD3[s1 >>> 0 & 0xff];
              t0 ^= key[p + 4];

              t1 = TD0[s1 >>> 24 & 0xff];
              t1 ^= TD1[s0 >>> 16 & 0xff];
              t1 ^= TD2[s3 >>> 8 & 0xff];
              t1 ^= TD3[s2 >>> 0 & 0xff];
              t1 ^= key[p + 5];

              t2 = TD0[s2 >>> 24 & 0xff];
              t2 ^= TD1[s1 >>> 16 & 0xff];
              t2 ^= TD2[s0 >>> 8 & 0xff];
              t2 ^= TD3[s3 >>> 0 & 0xff];
              t2 ^= key[p + 6];

              t3 = TD0[s3 >>> 24 & 0xff];
              t3 ^= TD1[s2 >>> 16 & 0xff];
              t3 ^= TD2[s1 >>> 8 & 0xff];
              t3 ^= TD3[s0 >>> 0 & 0xff];
              t3 ^= key[p + 7];

              p += 8;
              r -= 1;

              if (r === 0) break;

              s0 = TD0[t0 >>> 24 & 0xff];
              s0 ^= TD1[t3 >>> 16 & 0xff];
              s0 ^= TD2[t2 >>> 8 & 0xff];
              s0 ^= TD3[t1 >>> 0 & 0xff];
              s0 ^= key[p + 0];

              s1 = TD0[t1 >>> 24 & 0xff];
              s1 ^= TD1[t0 >>> 16 & 0xff];
              s1 ^= TD2[t3 >>> 8 & 0xff];
              s1 ^= TD3[t2 >>> 0 & 0xff];
              s1 ^= key[p + 1];

              s2 = TD0[t2 >>> 24 & 0xff];
              s2 ^= TD1[t1 >>> 16 & 0xff];
              s2 ^= TD2[t0 >>> 8 & 0xff];
              s2 ^= TD3[t3 >>> 0 & 0xff];
              s2 ^= key[p + 2];

              s3 = TD0[t3 >>> 24 & 0xff];
              s3 ^= TD1[t2 >>> 16 & 0xff];
              s3 ^= TD2[t1 >>> 8 & 0xff];
              s3 ^= TD3[t0 >>> 0 & 0xff];
              s3 ^= key[p + 3];
            }

            // Apply last round and map cipher
            // state to byte array block.
            s0 = TD4[t0 >>> 24 & 0xff] << 24;
            s0 ^= TD4[t3 >>> 16 & 0xff] << 16;
            s0 ^= TD4[t2 >>> 8 & 0xff] << 8;
            s0 ^= TD4[t1 >>> 0 & 0xff] << 0;
            s0 ^= key[p + 0];

            s1 = TD4[t1 >>> 24 & 0xff] << 24;
            s1 ^= TD4[t0 >>> 16 & 0xff] << 16;
            s1 ^= TD4[t3 >>> 8 & 0xff] << 8;
            s1 ^= TD4[t2 >>> 0 & 0xff] << 0;
            s1 ^= key[p + 1];

            s2 = TD4[t2 >>> 24 & 0xff] << 24;
            s2 ^= TD4[t1 >>> 16 & 0xff] << 16;
            s2 ^= TD4[t0 >>> 8 & 0xff] << 8;
            s2 ^= TD4[t3 >>> 0 & 0xff] << 0;
            s2 ^= key[p + 2];

            s3 = TD4[t3 >>> 24 & 0xff] << 24;
            s3 ^= TD4[t2 >>> 16 & 0xff] << 16;
            s3 ^= TD4[t1 >>> 8 & 0xff] << 8;
            s3 ^= TD4[t0 >>> 0 & 0xff] << 0;
            s3 ^= key[p + 3];

            writeU32(output, s0, opos + 0);
            writeU32(output, s1, opos + 4);
            writeU32(output, s2, opos + 8);
            writeU32(output, s3, opos + 12);
          };

          return AES;
        }();

        /**
         * AES Cipher
         * @extends AES
         */

        var AESCipher = function (_AES) {
          _inherits(AESCipher, _AES);

          /**
           * Create an AES cipher.
           * @param {Number} [bits=256]
           * @param {Boolean} [chain=false]
           */

          function AESCipher() {
            var bits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 256;
            var chain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            _classCallCheck(this, AESCipher);

            var _this = _possibleConstructorReturn(this, _AES.call(this, bits));

            _this.chain = chain;
            _this.key = null;
            _this.prev = null;
            _this.block = Buffer.allocUnsafe(16);
            _this.ppos = 0;
            _this.bpos = 0;
            return _this;
          }

          /**
           * Initialize the cipher.
           * @param {Buffer} key
           * @param {Buffer?} iv
           * @returns {AESCipher}
           */

          AESCipher.prototype.init = function init(key, iv) {
            assert(Buffer.isBuffer(key));
            assert(!this.chain || Buffer.isBuffer(iv) && iv.length === 16);

            this.key = this.encryptKey(key);
            this.prev = iv;
            this.ppos = 0;
            this.bpos = 0;

            return this;
          };

          /**
           * Encrypt blocks of data.
           * @param {Buffer} input
           * @returns {Buffer}
           */

          AESCipher.prototype.update = function update(input) {
            assert(Buffer.isBuffer(input));
            assert(this.key, 'Context already finalized.');

            var bpos = this.bpos;
            var ilen = input.length;
            var olen = ilen - ilen % 16;
            var ipos = 0;
            var opos = 0;

            this.bpos = (this.bpos + ilen) % 16;

            if (bpos > 0) {
              var want = 16 - bpos;

              if (want > ilen) want = ilen;

              input.copy(this.block, bpos, ipos, ipos + want);

              bpos += want;
              ilen -= want;
              ipos += want;

              if (bpos < 16) return DUMMY;

              olen += 16;
            }

            var output = Buffer.allocUnsafe(olen);

            if (ipos) {
              this.encrypt(this.block, 0, output, opos);
              opos += 16;
            }

            while (ilen >= 16) {
              this.encrypt(input, ipos, output, opos);
              opos += 16;
              ipos += 16;
              ilen -= 16;
            }

            if (ilen > 0) input.copy(this.block, 0, ipos, ipos + ilen);

            return output;
          };

          /**
           * Finalize the cipher.
           * @returns {Buffer}
           */

          AESCipher.prototype.final = function final() {
            assert(this.key, 'Context already finalized.');

            var left = 16 - this.bpos;
            var block = Buffer.from(this.block);

            block.fill(left, this.bpos, 16);

            this.encrypt(block, 0, block, 0);

            for (var i = 0; i < 60; i++) {
              this.key[i] = 0;
            }
            for (var _i2 = 0; _i2 < 16; _i2++) {
              this.block[_i2] = 0;
            }
            this.key = null;
            this.prev = null;

            return block;
          };

          /**
           * Encrypt a block.
           * @private
           * @param {Buffer} input
           * @param {Number} ipos
           * @param {Buffer} output
           * @param {Number} opos
           * @returns {Buffer}
           */

          AESCipher.prototype.encrypt = function encrypt(input, ipos, output, opos) {
            if (this.chain) {
              for (var i = 0; i < 16; i++) {
                output[opos + i] = input[ipos + i] ^ this.prev[this.ppos + i];
              }
              this.encryptBlock(this.key, output, opos, output, opos);

              this.prev = output;
              this.ppos = opos;
            } else {
              this.encryptBlock(this.key, input, ipos, output, opos);
            }
          };

          /**
           * Encrypt data with aes 256.
           * @param {Buffer} data
           * @param {Buffer} key
           * @param {Buffer} iv
           * @param {Boolean} chain
           * @returns {Buffer}
           */

          AESCipher.encrypt = function encrypt(data, key, iv) {
            var bits = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 256;
            var chain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var ctx = new AESCipher(bits, chain).init(key, iv);
            return concat(ctx.update(data), ctx.final());
          };

          return AESCipher;
        }(AES);

        /**
         * AES Decipher
         * @extends AES
         */

        var AESDecipher = function (_AES2) {
          _inherits(AESDecipher, _AES2);

          /**
           * Create an AES decipher.
           * @param {Number} [bits=256]
           * @param {Boolean} [chain=false]
           */

          function AESDecipher() {
            var bits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 256;
            var chain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            _classCallCheck(this, AESDecipher);

            var _this2 = _possibleConstructorReturn(this, _AES2.call(this, bits));

            _this2.chain = chain;
            _this2.key = null;
            _this2.last = null;
            _this2.prev = null;
            _this2.block = Buffer.allocUnsafe(16);
            _this2.ppos = 0;
            _this2.bpos = 0;
            return _this2;
          }

          /**
           * Initialize the decipher.
           * @param {Buffer} key
           * @param {Buffer?} iv
           * @returns {AESDecipher}
           */

          AESDecipher.prototype.init = function init(key, iv) {
            assert(Buffer.isBuffer(key));
            assert(!this.chain || Buffer.isBuffer(iv) && iv.length === 16);

            this.key = this.decryptKey(key);
            this.prev = iv;
            this.ppos = 0;
            this.bpos = 0;

            return this;
          };

          /**
           * Decrypt blocks of data.
           * @param {Buffer} input
           * @returns {Buffer}
           */

          AESDecipher.prototype.update = function update(input) {
            assert(Buffer.isBuffer(input));
            assert(this.key, 'Context already finalized.');

            var bpos = this.bpos;
            var ilen = input.length;
            var olen = ilen - ilen % 16;
            var ipos = 0;
            var opos = 0;

            this.bpos = (this.bpos + ilen) % 16;

            if (bpos > 0) {
              var want = 16 - bpos;

              if (want > ilen) want = ilen;

              input.copy(this.block, bpos, ipos, ipos + want);

              bpos += want;
              ilen -= want;
              ipos += want;

              if (bpos < 16) return DUMMY;

              olen += 16;
            }

            var output = Buffer.allocUnsafe(olen);

            if (ipos) {
              this.decrypt(this.block, 0, output, opos);
              opos += 16;
            }

            while (ilen >= 16) {
              this.decrypt(input, ipos, output, opos);
              opos += 16;
              ipos += 16;
              ilen -= 16;
            }

            if (ilen > 0) input.copy(this.block, 0, ipos, ipos + ilen);

            this.last = output;

            return output.slice(0, olen - 16);
          };

          /**
           * Finalize the decipher.
           * @returns {Buffer}
           */

          AESDecipher.prototype.final = function final() {
            assert(this.key, 'Context already finalized.');

            for (var i = 0; i < 16; i++) {
              this.block[i] = 0;
            }
            for (var _i3 = 0; _i3 < 60; _i3++) {
              this.key[_i3] = 0;
            }
            this.key = null;
            this.prev = null;

            if (!this.last) throw new Error('Bad decrypt (no data).');

            var block = this.last;

            this.last = null;

            if (this.bpos !== 0) throw new Error('Bad decrypt (trailing bytes).');

            var start = block.length - 16;

            var end = block.length;

            var left = block[end - 1];

            if (left === 0 || left > 16) throw new Error('Bad decrypt (padding).');

            for (var _i4 = 0; _i4 < left; _i4++) {
              end -= 1;
              if (block[end] !== left) throw new Error('Bad decrypt (padding).');
            }

            return block.slice(start, end);
          };

          /**
           * Decrypt a block.
           * @private
           * @param {Buffer} input
           * @param {Number} ipos
           * @param {Buffer} output
           * @param {Number} opos
           * @returns {Buffer}
           */

          AESDecipher.prototype.decrypt = function decrypt(input, ipos, output, opos) {
            if (this.chain) {
              this.decryptBlock(this.key, input, ipos, output, opos);

              for (var i = 0; i < 16; i++) {
                output[opos + i] = output[opos + i] ^ this.prev[this.ppos + i];
              }
              this.prev = input;
              this.ppos = ipos;
            } else {
              this.decryptBlock(this.key, input, ipos, output, opos);
            }
          };

          /**
           * Decrypt data with aes 256.
           * @param {Buffer} data
           * @param {Buffer} key
           * @param {Buffer|null} iv
           * @param {Number} bits
           * @param {Boolean} chain
           * @returns {Buffer}
           */

          AESDecipher.decrypt = function decrypt(data, key, iv) {
            var bits = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 256;
            var chain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var ctx = new AESDecipher(bits, chain).init(key, iv);
            return concat(ctx.update(data), ctx.final());
          };

          return AESDecipher;
        }(AES);

        /**
         * Encrypt data with aes 256 cbc.
         * @param {Buffer} data
         * @param {Buffer} key
         * @param {Buffer} iv
         * @returns {Buffer}
         */

        exps.encipher = function encipher(data, key, iv) {
          return AESCipher.encrypt(data, key, iv, 256, true);
        };

        /**
         * Decrypt data with aes 256 cbc.
         * @param {Buffer} data
         * @param {Buffer} key
         * @param {Buffer} iv
         * @returns {Buffer}
         */

        exps.decipher = function decipher(data, key, iv) {
          return AESDecipher.decrypt(data, key, iv, 256, true);
        };

        /*
         * Helpers
         */

        function rounds(bits) {
          switch (bits) {
            case 128:
              return 10;
            case 192:
              return 12;
            case 256:
              return 14;
            default:
              throw new Error('Bad key size.');
          }
        }

        function readU32(data, i) {
          return data[i + 0] << 24 ^ data[i + 1] << 16 ^ data[i + 2] << 8 ^ data[i + 3];
        }

        function writeU32(data, value, i) {
          data[i + 0] = value >>> 24 & 0xff;
          data[i + 1] = value >>> 16 & 0xff;
          data[i + 2] = value >>> 8 & 0xff;
          data[i + 3] = value & 0xff;
        }

        function concat(a, b) {
          var data = Buffer.allocUnsafe(a.length + b.length);
          a.copy(data, 0);
          b.copy(data, a.length);
          return data;
        }

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    36: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * blake2b.js - BLAKE2b implementation for bcoin
         * Copyright (c) 2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         *
         * Parts of this software are based on blakejs:
         *   https://github.com/dcposch/blakejs/blob/master/blake2b.js
         */

        'use strict';

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }
          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');

        /*
         * Constants
         */

        var FINALIZED = 0x80000000;

        var IV = new Uint32Array([0xf3bcc908, 0x6a09e667, 0x84caa73b, 0xbb67ae85, 0xfe94f82b, 0x3c6ef372, 0x5f1d36f1, 0xa54ff53a, 0xade682d1, 0x510e527f, 0x2b3e6c1f, 0x9b05688c, 0xfb41bd6b, 0x1f83d9ab, 0x137e2179, 0x5be0cd19]);

        var SIGMA = [0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1a, 0x1c, 0x1e, 0x1c, 0x14, 0x08, 0x10, 0x12, 0x1e, 0x1a, 0x0c, 0x02, 0x18, 0x00, 0x04, 0x16, 0x0e, 0x0a, 0x06, 0x16, 0x10, 0x18, 0x00, 0x0a, 0x04, 0x1e, 0x1a, 0x14, 0x1c, 0x06, 0x0c, 0x0e, 0x02, 0x12, 0x08, 0x0e, 0x12, 0x06, 0x02, 0x1a, 0x18, 0x16, 0x1c, 0x04, 0x0c, 0x0a, 0x14, 0x08, 0x00, 0x1e, 0x10, 0x12, 0x00, 0x0a, 0x0e, 0x04, 0x08, 0x14, 0x1e, 0x1c, 0x02, 0x16, 0x18, 0x0c, 0x10, 0x06, 0x1a, 0x04, 0x18, 0x0c, 0x14, 0x00, 0x16, 0x10, 0x06, 0x08, 0x1a, 0x0e, 0x0a, 0x1e, 0x1c, 0x02, 0x12, 0x18, 0x0a, 0x02, 0x1e, 0x1c, 0x1a, 0x08, 0x14, 0x00, 0x0e, 0x0c, 0x06, 0x12, 0x04, 0x10, 0x16, 0x1a, 0x16, 0x0e, 0x1c, 0x18, 0x02, 0x06, 0x12, 0x0a, 0x00, 0x1e, 0x08, 0x10, 0x0c, 0x04, 0x14, 0x0c, 0x1e, 0x1c, 0x12, 0x16, 0x06, 0x00, 0x10, 0x18, 0x04, 0x1a, 0x0e, 0x02, 0x08, 0x14, 0x0a, 0x14, 0x04, 0x10, 0x08, 0x0e, 0x0c, 0x02, 0x0a, 0x1e, 0x16, 0x12, 0x1c, 0x06, 0x18, 0x1a, 0x00, 0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16, 0x18, 0x1a, 0x1c, 0x1e, 0x1c, 0x14, 0x08, 0x10, 0x12, 0x1e, 0x1a, 0x0c, 0x02, 0x18, 0x00, 0x04, 0x16, 0x0e, 0x0a, 0x06];

        var V = new Uint32Array(32);
        var M = new Uint32Array(32);

        var ctx = null;

        /**
         * Blake2b
         */

        var Blake2b = function () {
          /**
           * Create a Blake2b context.
           * @constructor
           */

          function Blake2b() {
            _classCallCheck(this, Blake2b);

            this.state = new Uint32Array(16);
            this.block = Buffer.allocUnsafe(128);
            this.size = 32;
            this.count = 0;
            this.pos = FINALIZED;
          }

          Blake2b.prototype.init = function init() {
            var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
            var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            assert(size >>> 0 === size);
            assert(!key || Buffer.isBuffer(key));

            if (size === 0 || size > 64) throw new Error('Bad output length.');

            if (key && key.length > 64) throw new Error('Bad key length.');

            var klen = key ? key.length : 0;

            for (var i = 0; i < 16; i++) {
              this.state[i] = IV[i];
            }
            this.size = size;
            this.count = 0;
            this.pos = 0;

            this.state[0] ^= 0x01010000 ^ klen << 8 ^ this.size;

            if (klen > 0) {
              this.update(key);
              this.pos = 128;
            }

            return this;
          };

          Blake2b.prototype.update = function update(data) {
            assert(Buffer.isBuffer(data));
            assert(!(this.pos & FINALIZED), 'Context already finalized.');

            var off = 0;
            var len = data.length;

            if (len > 0) {
              var left = this.pos;
              var fill = 128 - left;

              if (len > fill) {
                this.pos = 0;

                data.copy(this.block, left, off, off + fill);

                this.count += 128;
                this.compress(this.block, 0, false);

                off += fill;
                len -= fill;

                while (len > 128) {
                  this.count += 128;
                  this.compress(data, off, false);
                  off += 128;
                  len -= 128;
                }
              }

              data.copy(this.block, this.pos, off, off + len);

              this.pos += len;
            }

            return this;
          };

          Blake2b.prototype.final = function final() {
            assert(!(this.pos & FINALIZED), 'Context already finalized.');

            this.count += this.pos;
            this.block.fill(0, this.pos, 128);
            this.compress(this.block, 0, true);
            this.pos = FINALIZED;

            var out = Buffer.allocUnsafe(this.size);

            for (var i = 0; i < this.size; i++) {
              out[i] = this.state[i >>> 2] >>> 8 * (i & 3);
            }
            for (var _i = 0; _i < 16; _i++) {
              this.state[_i] = 0;
            }
            for (var _i2 = 0; _i2 < 128; _i2++) {
              this.block[_i2] = 0;
            }
            return out;
          };

          Blake2b.prototype.compress = function compress(block, off, last) {
            for (var i = 0; i < 16; i++) {
              V[i] = this.state[i];
              V[i + 16] = IV[i];
            }

            // uint128
            V[24] ^= this.count;
            V[25] ^= this.count * (1 / 0x100000000);
            V[26] ^= 0;
            V[27] ^= 0;

            if (last) {
              // last block
              V[28] ^= -1;
              V[29] ^= -1;

              // last node
              V[29] ^= 0;
              V[30] ^= 0;
            }

            for (var _i3 = 0; _i3 < 32; _i3++) {
              M[_i3] = readU32(block, off);
              off += 4;
            }

            for (var _i4 = 0; _i4 < 12; _i4++) {
              G(V, M, 0, 8, 16, 24, SIGMA[_i4 * 16 + 0], SIGMA[_i4 * 16 + 1]);
              G(V, M, 2, 10, 18, 26, SIGMA[_i4 * 16 + 2], SIGMA[_i4 * 16 + 3]);
              G(V, M, 4, 12, 20, 28, SIGMA[_i4 * 16 + 4], SIGMA[_i4 * 16 + 5]);
              G(V, M, 6, 14, 22, 30, SIGMA[_i4 * 16 + 6], SIGMA[_i4 * 16 + 7]);
              G(V, M, 0, 10, 20, 30, SIGMA[_i4 * 16 + 8], SIGMA[_i4 * 16 + 9]);
              G(V, M, 2, 12, 22, 24, SIGMA[_i4 * 16 + 10], SIGMA[_i4 * 16 + 11]);
              G(V, M, 4, 14, 16, 26, SIGMA[_i4 * 16 + 12], SIGMA[_i4 * 16 + 13]);
              G(V, M, 6, 8, 18, 28, SIGMA[_i4 * 16 + 14], SIGMA[_i4 * 16 + 15]);
            }

            for (var _i5 = 0; _i5 < 16; _i5++) {
              this.state[_i5] ^= V[_i5] ^ V[_i5 + 16];
            }
          };

          Blake2b.hash = function hash() {
            return new Blake2b();
          };

          Blake2b.hmac = function hmac() {
            return new BlakeHmac();
          };

          Blake2b.digest = function digest(data) {
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;
            var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            ctx.init(size, key);
            ctx.update(data);
            return ctx.final();
          };

          Blake2b.root = function root(left, right) {
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;

            assert(Buffer.isBuffer(left) && left.length === size);
            assert(Buffer.isBuffer(right) && right.length === size);
            ctx.init(size);
            ctx.update(left);
            ctx.update(right);
            return ctx.final();
          };

          Blake2b.mac = function mac(data, key) {
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;

            assert(Buffer.isBuffer(key));
            return Blake2b.digest(data, size, key);
          };

          return Blake2b;
        }();

        /**
         * Blake2b HMAC
         * @private
         */

        var BlakeHmac = function (_Blake2b) {
          _inherits(BlakeHmac, _Blake2b);

          function BlakeHmac() {
            _classCallCheck(this, BlakeHmac);

            return _possibleConstructorReturn(this, _Blake2b.call(this));
          }

          BlakeHmac.prototype.init = function init(key) {
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;

            assert(Buffer.isBuffer(key));
            return _Blake2b.prototype.init.call(this, size, key);
          };

          return BlakeHmac;
        }(Blake2b);

        /*
         * Global Context
         */

        ctx = new Blake2b();

        /*
         * Helpers
         */

        function sum64(v, a, b) {
          var o0 = v[a] + v[b];

          var o1 = v[a + 1] + v[b + 1];
          if (o0 >= 0x100000000) o1 += 1;

          v[a] = o0;
          v[a + 1] = o1;
        }

        function sum64c(v, a, b0, b1) {
          var o0 = v[a] + b0;

          var o1 = v[a + 1] + b1;
          if (o0 >= 0x100000000) o1 += 1;

          v[a] = o0;
          v[a + 1] = o1;
        }

        function readU32(data, off) {
          return data[off] ^ data[off + 1] << 8 ^ data[off + 2] << 16 ^ data[off + 3] << 24;
        }

        function G(v, m, a, b, c, d, ix, iy) {
          var x0 = m[ix];
          var x1 = m[ix + 1];
          var y0 = m[iy];
          var y1 = m[iy + 1];
          var xor0 = void 0,
            xor1 = void 0;

          // v[a,a+1] += v[b,b+1]
          sum64(v, a, b);
          // v[a, a+1] += x
          sum64c(v, a, x0, x1);

          // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotr 32
          xor0 = v[d] ^ v[a];
          xor1 = v[d + 1] ^ v[a + 1];
          v[d] = xor1;
          v[d + 1] = xor0;

          sum64(v, c, d);

          // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotr 24
          xor0 = v[b] ^ v[c];
          xor1 = v[b + 1] ^ v[c + 1];
          v[b] = xor0 >>> 24 ^ xor1 << 8;
          v[b + 1] = xor1 >>> 24 ^ xor0 << 8;

          sum64(v, a, b);
          sum64c(v, a, y0, y1);

          // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotr 16
          xor0 = v[d] ^ v[a];
          xor1 = v[d + 1] ^ v[a + 1];
          v[d] = xor0 >>> 16 ^ xor1 << 16;
          v[d + 1] = xor1 >>> 16 ^ xor0 << 16;

          sum64(v, c, d);

          // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotr 63
          xor0 = v[b] ^ v[c];
          xor1 = v[b + 1] ^ v[c + 1];
          v[b] = xor1 >>> 31 ^ xor0 << 1;
          v[b + 1] = xor0 >>> 31 ^ xor1 << 1;
        }

        /*
         * Expose
         */

        mods.exps = Blake2b;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    37: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * ccmp.js - constant-time compare for bcoin
         * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        var assert = bcryptoReq('assert');

        /**
         * memcmp in constant time (can only return true or false).
         * This protects us against timing attacks when
         * comparing an input against a secret string.
         * @alias mods:crypto.ccmp
         * @see https://cryptocoding.net/index.php/Coding_rules
         * @see `$ man 3 memcmp` (NetBSD's consttime_memequal)
         * @param {Buffer} a
         * @param {Buffer} b
         * @returns {Boolean}
         */

        mods.exps = function ccmp(a, b) {
          assert(Buffer.isBuffer(a));
          assert(Buffer.isBuffer(b));

          if (b.length === 0) return a.length === 0;

          var res = a.length ^ b.length;

          for (var i = 0; i < a.length; i++) {
            res |= a[i] ^ b[i % b.length];
          }
          return res === 0;
        };

      }).call(this, {
        "isBuffer": bcryptoReq("C:/Users/user/AppData/Roaming/npm/node_modules/browserify/node_modules/is-buffer/index.js")
      })
    }, {
      "C:/Users/user/AppData/Roaming/npm/node_modules/browserify/node_modules/is-buffer/index.js": 9,
      "assert": 1
    }],
    38: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * chacha20.js - chacha20 for bcoin
         * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');

        var BIG_ENDIAN = new Int8Array(new Int16Array([1]).buffer)[0] === 0;

        var ChaCha20 = function () {
          /**
           * ChaCha20 (used for bip151)
           * @alias mods:crypto.ChaCha20
           * @constructor
           * @see https://tools.ietf.org/html/rfc7539#section-2
           */

          function ChaCha20() {
            _classCallCheck(this, ChaCha20);

            this.state = new Uint32Array(16);
            this.stream = new Uint32Array(16);
            this.bytes = new Uint8Array(this.stream.buffer);

            if (BIG_ENDIAN) this.bytes = Buffer.allocUnsafe(64);

            this.pos = 0;
            this.ivSize = 0;
          }

          /**
           * Initialize chacha20 with a key, iv, and counter.
           * @param {Buffer} key
           * @param {Buffer} iv
           * @param {Number} counter
           */

          ChaCha20.prototype.init = function init(key, iv, counter) {
            if (key) this.initKey(key);

            if (iv) this.initIV(iv, counter);
          };

          /**
           * Set key.
           * @param {Buffer} key
           */

          ChaCha20.prototype.initKey = function initKey(key) {
            this.state[0] = 0x61707865;
            this.state[1] = 0x3320646e;
            this.state[2] = 0x79622d32;
            this.state[3] = 0x6b206574;

            this.state[4] = key.readUInt32LE(0, true);
            this.state[5] = key.readUInt32LE(4, true);
            this.state[6] = key.readUInt32LE(8, true);
            this.state[7] = key.readUInt32LE(12, true);
            this.state[8] = key.readUInt32LE(16, true);
            this.state[9] = key.readUInt32LE(20, true);
            this.state[10] = key.readUInt32LE(24, true);
            this.state[11] = key.readUInt32LE(28, true);

            this.state[12] = 0;

            this.pos = 0xffffffff;
          };

          /**
           * Set IV and counter.
           * @param {Buffer} iv
           * @param {Number} counter
           */

          ChaCha20.prototype.initIV = function initIV(iv, counter) {
            if (iv.length === 8) {
              this.state[13] = 0;
              this.state[14] = iv.readUInt32LE(0, true);
              this.state[15] = iv.readUInt32LE(4, true);
            } else if (iv.length === 12) {
              this.state[13] = iv.readUInt32LE(0, true);
              this.state[14] = iv.readUInt32LE(4, true);
              this.state[15] = iv.readUInt32LE(8, true);
            } else {
              assert(false, 'Bad iv size.');
            }

            this.ivSize = iv.length * 8;

            this.setCounter(counter);
          };

          /**
           * Encrypt/decrypt data.
           * @param {Buffer} data - Will be mutated.
           */

          ChaCha20.prototype.encrypt = function encrypt(data) {
            for (var i = 0; i < data.length; i++) {
              if (this.pos >= 64) {
                for (var j = 0; j < 16; j++) {
                  this.stream[j] = this.state[j];
                }
                for (var _j = 0; _j < 10; _j++) {
                  qround(this.stream, 0, 4, 8, 12);
                  qround(this.stream, 1, 5, 9, 13);
                  qround(this.stream, 2, 6, 10, 14);
                  qround(this.stream, 3, 7, 11, 15);
                  qround(this.stream, 0, 5, 10, 15);
                  qround(this.stream, 1, 6, 11, 12);
                  qround(this.stream, 2, 7, 8, 13);
                  qround(this.stream, 3, 4, 9, 14);
                }

                for (var _j2 = 0; _j2 < 16; _j2++) {
                  this.stream[_j2] += this.state[_j2];
                  if (BIG_ENDIAN) this.bytes.writeUInt32LE(this.stream[_j2], _j2 * 4, true);
                }

                this.state[12] += 1;

                if (this.state[12] === 0) {
                  if (this.ivSize === 64) this.state[13] += 1;
                }

                this.pos = 0;
              }

              data[i] ^= this.bytes[this.pos++];
            }

            return data;
          };

          /**
           * Artificially set the counter.
           * @param {Number} counter
           */

          ChaCha20.prototype.setCounter = function setCounter(counter) {
            if (!counter) counter = 0;

            var lo = counter % 0x100000000;
            var hi = (counter - lo) / 0x100000000;

            this.state[12] = lo;

            if (this.ivSize === 64) this.state[13] = hi;
          };

          /**
           * Get the counter as a uint64.
           * @returns {Number}
           */

          ChaCha20.prototype.getCounter = function getCounter() {
            var lo = this.state[12];
            var hi = this.state[13];
            if (this.ivSize === 64) return hi * 0x100000000 + lo;
            return lo;
          };

          return ChaCha20;
        }();

        /*
         * Helpers
         */

        function qround(x, a, b, c, d) {
          x[a] += x[b];
          x[d] = rotl32(x[d] ^ x[a], 16);

          x[c] += x[d];
          x[b] = rotl32(x[b] ^ x[c], 12);

          x[a] += x[b];
          x[d] = rotl32(x[d] ^ x[a], 8);

          x[c] += x[d];
          x[b] = rotl32(x[b] ^ x[c], 7);
        }

        function rotl32(w, b) {
          return w << b | w >>> 32 - b;
        }

        /*
         * Expose
         */

        mods.exps = ChaCha20;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    39: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * cleanse.js - memzero for bcoin
         * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        var assert = bcryptoReq('assert');

        var counter = 0;

        /**
         * A maybe-secure memzero.
         * @param {Buffer} data
         */

        mods.exps = function cleanse(data) {
          assert(Buffer.isBuffer(data));

          var ctr = counter;

          for (var i = 0; i < data.length; i++) {
            data[i] = ctr & 0xff;
            ctr += i;
          }

          counter = ctr >>> 0;
        };

      }).call(this, {
        "isBuffer": bcryptoReq("C:/Users/user/AppData/Roaming/npm/node_modules/browserify/node_modules/is-buffer/index.js")
      })
    }, {
      "C:/Users/user/AppData/Roaming/npm/node_modules/browserify/node_modules/is-buffer/index.js": 9,
      "assert": 1
    }],
    40: [function (bcryptoReq, mods, exps) {
      /*!
       * digest.js - hash functions for bcoin
       * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
       * https://github.com/bcoin-org/bcoin
       */

      /* eslint prefer-arrow-callback: "off" */

      'use strict';

      var assert = bcryptoReq('assert');
      var RIPEMD160 = bcryptoReq('./ripemd160');
      var SHA1 = bcryptoReq('./sha1');
      var SHA256 = bcryptoReq('./sha256');
      var SHA512 = bcryptoReq('./sha512');
      var Hash160 = bcryptoReq('./hash160');
      var Hash256 = bcryptoReq('./hash256');
      var Keccak = bcryptoReq('./keccak');
      var SHA3 = bcryptoReq('./sha3');
      var Blake2b = bcryptoReq('./blake2b');

      /*
       * Constants
       */

      var hashes = {
        ripemd160: RIPEMD160,
        sha1: SHA1,
        sha256: SHA256,
        sha512: SHA512,
        hash160: Hash160,
        hash256: Hash256,
        keccak: Keccak,
        sha3: SHA3,
        blake2b: Blake2b
      };

      /*
       * Helpers
       */

      function wrap(alg, func) {
        func.hash = alg.hash;
        func.hmac = alg.hmac;
        func.digest = alg.digest;
        func.root = alg.root;
        func.mac = alg.mac;
        return func;
      }

      /**
       * Get hash function.
       * @param {String} name
       * @returns {Function}
       */

      exps.get = function get(name) {
        assert(typeof name === 'string');

        if (!hashes.hasOwnProperty(name)) throw new Error('Hash ' + name + ' not supported.');

        return hashes[name];
      };

      /**
       * Hash with chosen algorithm.
       * @param {String} alg
       * @param {Buffer} data
       * @returns {Buffer}
       */

      exps.hash = function hash(alg) {
        var _exports$get;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return (_exports$get = exps.get(alg)).digest.apply(_exports$get, args);
      };

      /**
       * Create an HMAC.
       * @param {String} alg
       * @param {Buffer} data
       * @param {Buffer} key
       * @returns {Buffer}
       */

      exps.hmac = function hmac(alg) {
        var _exports$get2;

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return (_exports$get2 = exps.get(alg)).mac.apply(_exports$get2, args);
      };

      /**
       * Hash with ripemd160.
       * @param {Buffer} data
       * @returns {Buffer}
       */

      exps.ripemd160 = wrap(RIPEMD160, function ripemd160(data) {
        return RIPEMD160.digest(data);
      });

      /**
       * Hash with sha1.
       * @param {Buffer} data
       * @returns {Buffer}
       */

      exps.sha1 = wrap(SHA1, function sha1(data) {
        return SHA1.digest(data);
      });

      /**
       * Hash with sha256.
       * @param {Buffer} data
       * @returns {Buffer}
       */

      exps.sha256 = wrap(SHA256, function sha256(data) {
        return SHA256.digest(data);
      });

      /**
       * Hash with sha512.
       * @param {Buffer} data
       * @returns {Buffer}
       */

      exps.sha512 = wrap(SHA512, function sha512(data) {
        return SHA512.digest(data);
      });

      /**
       * Hash with sha256 and ripemd160 (OP_HASH160).
       * @param {Buffer} data
       * @returns {Buffer}
       */

      exps.hash160 = wrap(Hash160, function hash160(data) {
        return Hash160.digest(data);
      });

      /**
       * Hash with sha256 twice (OP_HASH256).
       * @param {Buffer} data
       * @returns {Buffer}
       */

      exps.hash256 = wrap(Hash256, function hash256(data) {
        return Hash256.digest(data);
      });

      /**
       * Hash with keccak.
       * @param {Buffer} data
       * @param {Number} [bits=256]
       * @returns {Buffer}
       */

      exps.keccak = wrap(Keccak, function keccak(data, bits) {
        return Keccak.digest(data, bits);
      });

      /**
       * Hash with sha3.
       * @param {Buffer} data
       * @param {Number} [bits=256]
       * @returns {Buffer}
       */

      exps.sha3 = wrap(SHA3, function sha3(data, bits) {
        return SHA3.digest(data, bits);
      });

      /**
       * Hash with blake2b.
       * @param {Buffer} data
       * @param {Number} [size=32]
       * @param {Buffer?} key
       * @returns {Buffer}
       */

      exps.blake2b = wrap(Blake2b, function blake2b(data, size, key) {
        return Blake2b.digest(data, size, key);
      });

    }, {
      "./blake2b": 36,
      "./hash160": 42,
      "./hash256": 43,
      "./keccak": 46,
      "./ripemd160": 51,
      "./sha1": 53,
      "./sha256": 54,
      "./sha3": 55,
      "./sha512": 56,
      "assert": 1
    }],
    41: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * drbg.js - hmac-drbg implementation for bcoin
         * Copyright (c) 2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         * Parts of this software based on hmac-drbg.
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');

        /*
         * Constants
         */

        var RESEED_INTERVAL = 0x1000000000000;
        var ZERO = Buffer.from([0x00]);
        var ONE = Buffer.from([0x01]);

        var DRBG = function () {
          /**
           * DRBG
           * @constructor
           */

          function DRBG(alg, size, entropy, nonce, pers) {
            _classCallCheck(this, DRBG);

            assert(alg && typeof alg.name === 'string');
            assert(size >>> 0 === size);

            this.alg = alg;
            this.size = size;

            this.K = Buffer.allocUnsafe(size);
            this.V = Buffer.allocUnsafe(size);
            this.rounds = 0;

            if (entropy) this.init(entropy, nonce, pers);
          }

          DRBG.prototype.mac = function mac(data) {
            return this.alg.mac(data, this.K);
          };

          DRBG.prototype.hmac = function hmac() {
            return this.alg.hmac().init(this.K);
          };

          DRBG.prototype.init = function init(entropy, nonce, pers) {
            assert(Buffer.isBuffer(entropy));
            assert(Buffer.isBuffer(nonce));
            assert(Buffer.isBuffer(pers));

            for (var i = 0; i < this.V.length; i++) {
              this.K[i] = 0x00;
              this.V[i] = 0x01;
            }

            var seed = Buffer.concat([entropy, nonce, pers]);

            this.update(seed);
            this.rounds = 1;

            return this;
          };

          DRBG.prototype.update = function update(seed) {
            assert(!seed || Buffer.isBuffer(seed));

            var kmac = this.hmac();

            kmac.update(this.V);
            kmac.update(ZERO);

            if (seed) kmac.update(seed);

            this.K = kmac.final();
            this.V = this.mac(this.V);

            if (seed) {
              var _kmac = this.hmac();

              _kmac.update(this.V);
              _kmac.update(ONE);
              _kmac.update(seed);

              this.K = _kmac.final();
              this.V = this.mac(this.V);
            }

            return this;
          };

          DRBG.prototype.reseed = function reseed(entropy, add) {
            assert(!entropy || Buffer.isBuffer(entropy));
            assert(!add || Buffer.isBuffer(add));

            if (entropy && add) entropy = Buffer.concat([entropy, add]);

            this.update(entropy);
            this.rounds = 1;

            return this;
          };

          DRBG.prototype.generate = function generate(len, add) {
            assert(len >>> 0 === len);
            assert(!add || Buffer.isBuffer(add));

            if (this.rounds > RESEED_INTERVAL) throw new Error('Reseed is required.');

            if (add) this.update(add);

            var data = Buffer.allocUnsafe(len);

            var pos = 0;

            while (pos < len) {
              this.V = this.mac(this.V);
              this.V.copy(data, pos);
              pos += this.size;
            }

            this.update(add);
            this.rounds += 1;

            return data;
          };

          return DRBG;
        }();

        /*
         * Expose
         */

        mods.exps = DRBG;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    42: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * hash160.js - Hash160 implementation for bcoin
         * Copyright (c) 2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');
        var SHA256 = bcryptoReq('./sha256');
        var RIPEMD160 = bcryptoReq('./ripemd160');
        var HMAC = bcryptoReq('./hmac');

        var rmd = new RIPEMD160();

        var ctx = null;

        /**
         * Hash160
         */

        var Hash160 = function () {
          function Hash160() {
            _classCallCheck(this, Hash160);

            this.ctx = new SHA256();
          }

          Hash160.prototype.init = function init() {
            this.ctx.init();
            return this;
          };

          Hash160.prototype.update = function update(data) {
            this.ctx.update(data);
            return this;
          };

          Hash160.prototype.final = function final() {
            var out = Buffer.allocUnsafe(32);
            this.ctx._final(out);
            rmd.init();
            rmd.update(out);
            rmd._final(out);
            return out.slice(0, 20);
          };

          Hash160.hash = function hash() {
            return new Hash160();
          };

          Hash160.hmac = function hmac() {
            return new HMAC(Hash160, 64);
          };

          Hash160.digest = function digest(data) {
            return ctx.init().update(data).final();
          };

          Hash160.root = function root(left, right) {
            assert(Buffer.isBuffer(left) && left.length === 20);
            assert(Buffer.isBuffer(right) && right.length === 20);
            return ctx.init().update(left).update(right).final();
          };

          Hash160.mac = function mac(data, key) {
            return this.hmac().init(key).update(data).final();
          };

          return Hash160;
        }();

        ctx = new Hash160();

        /*
         * Expose
         */

        mods.exps = Hash160;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./hmac": 45,
      "./ripemd160": 51,
      "./sha256": 54,
      "assert": 1,
      "buffer": 4
    }],
    43: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * hash256.js - Hash256 implementation for bcoin
         * Copyright (c) 2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');
        var SHA256 = bcryptoReq('./sha256');
        var HMAC = bcryptoReq('./hmac');

        var ctx = null;

        /**
         * Hash256
         */

        var Hash256 = function () {
          function Hash256() {
            _classCallCheck(this, Hash256);

            this.ctx = new SHA256();
          }

          Hash256.prototype.init = function init() {
            this.ctx.init();
            return this;
          };

          Hash256.prototype.update = function update(data) {
            this.ctx.update(data);
            return this;
          };

          Hash256.prototype.final = function final() {
            var out = Buffer.allocUnsafe(32);
            this.ctx._final(out);
            this.ctx.init();
            this.ctx.update(out);
            this.ctx._final(out);
            return out;
          };

          Hash256.hash = function hash() {
            return new Hash256();
          };

          Hash256.hmac = function hmac() {
            return new HMAC(Hash256, 64);
          };

          Hash256.digest = function digest(data) {
            return ctx.init().update(data).final();
          };

          Hash256.root = function root(left, right) {
            assert(Buffer.isBuffer(left) && left.length === 32);
            assert(Buffer.isBuffer(right) && right.length === 32);
            return ctx.init().update(left).update(right).final();
          };

          Hash256.mac = function mac(data, key) {
            return this.hmac().init(key).update(data).final();
          };

          return Hash256;
        }();

        ctx = new Hash256();

        /*
         * Expose
         */

        mods.exps = Hash256;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./hmac": 45,
      "./sha256": 54,
      "assert": 1,
      "buffer": 4
    }],
    44: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * hkdf.js - hkdf for bcoin
         * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        var assert = bcryptoReq('assert');

        /**
         * Perform hkdf extraction.
         * @param {Object} alg
         * @param {Buffer} ikm
         * @param {Buffer} key
         * @returns {Buffer}
         */

        exps.extract = function extract(alg, ikm, key) {
          assert(alg && typeof alg.name === 'string');
          assert(Buffer.isBuffer(ikm));
          assert(Buffer.isBuffer(key));
          return alg.mac(ikm, key);
        };

        /**
         * Perform hkdf expansion.
         * @param {Function} alg
         * @param {Buffer} prk
         * @param {Buffer} info
         * @param {Number} len
         * @returns {Buffer}
         */

        exps.expand = function expand(alg, prk, info, len) {
          assert(alg && typeof alg.name === 'string');
          assert(Buffer.isBuffer(prk));
          assert(Buffer.isBuffer(info));
          assert(len >>> 0 === len);

          var size = alg.digest(Buffer.alloc(0)).length;
          var blocks = Math.ceil(len / size);

          if (blocks > 255) throw new Error('Too many blocks.');

          var okm = Buffer.allocUnsafe(len);

          if (blocks === 0) return okm;

          var buf = Buffer.allocUnsafe(size + info.length + 1);

          // First round:
          info.copy(buf, size);
          buf[buf.length - 1] = 1;

          var out = alg.mac(buf.slice(size), prk);
          out.copy(okm, 0);

          for (var i = 1; i < blocks; i++) {
            out.copy(buf, 0);
            buf[buf.length - 1] += 1;
            out = alg.mac(buf, prk);
            out.copy(okm, i * size);
          }

          return okm;
        };

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    45: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * hmac.js - hmac for bcoin
         * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         * Parts of this software based on hash.js.
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');

        /**
         * HMAC
         */

        var HMAC = function () {
          /**
           * Create an HMAC.
           * @param {Function} Hash
           * @param {Number} size
           */

          function HMAC(Hash, size) {
            _classCallCheck(this, HMAC);

            assert(typeof Hash === 'function');
            assert(size >>> 0 === size);

            this.hash = Hash;
            this.size = size;

            this.inner = new Hash();
            this.outer = new Hash();
          }

          /**
           * Initialize HMAC context.
           * @param {Buffer} data
           */

          HMAC.prototype.init = function init(key) {
            assert(Buffer.isBuffer(key));

            // Shorten key
            if (key.length > this.size) {
              key = this.hash.digest(key);
              assert(key.length <= this.size);
            }

            // Pad key
            var pad = Buffer.allocUnsafe(this.size);

            for (var i = 0; i < key.length; i++) {
              pad[i] = key[i] ^ 0x36;
            }
            for (var _i = key.length; _i < pad.length; _i++) {
              pad[_i] = 0x36;
            }
            this.inner.init();
            this.inner.update(pad);

            for (var _i2 = 0; _i2 < key.length; _i2++) {
              pad[_i2] = key[_i2] ^ 0x5c;
            }
            for (var _i3 = key.length; _i3 < pad.length; _i3++) {
              pad[_i3] = 0x5c;
            }
            this.outer.init();
            this.outer.update(pad);

            return this;
          };

          /**
           * Update HMAC context.
           * @param {Buffer} data
           */

          HMAC.prototype.update = function update(data) {
            this.inner.update(data);
            return this;
          };

          /**
           * Finalize HMAC context.
           * @returns {Buffer}
           */

          HMAC.prototype.final = function final() {
            this.outer.update(this.inner.final());
            return this.outer.final();
          };

          return HMAC;
        }();

        /*
         * Expose
         */

        mods.exps = HMAC;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    46: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * keccak.js - Keccak/SHA3 implementation for bcoin
         * Copyright (c) 2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         *
         * Parts of this software are based on js-sha3:
         *   Copyright (c) 2015-2017, Chen, Yi-Cyuan (MIT License).
         *   https://github.com/emn178/js-sha3
         *
         * Partially ported from rhash:
         *   https://github.com/rhash/RHash/blob/master/librhash/sha3.c
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');

        /*
         * Constants
         */

        var FINALIZED = 0x80000000;

        var ROUND_CONST = new Uint32Array([0x00000001, 0x00000000, 0x00008082, 0x00000000, 0x0000808a, 0x80000000, 0x80008000, 0x80000000, 0x0000808b, 0x00000000, 0x80000001, 0x00000000, 0x80008081, 0x80000000, 0x00008009, 0x80000000, 0x0000008a, 0x00000000, 0x00000088, 0x00000000, 0x80008009, 0x00000000, 0x8000000a, 0x00000000, 0x8000808b, 0x00000000, 0x0000008b, 0x80000000, 0x00008089, 0x80000000, 0x00008003, 0x80000000, 0x00008002, 0x80000000, 0x00000080, 0x80000000, 0x0000800a, 0x00000000, 0x8000000a, 0x80000000, 0x80008081, 0x80000000, 0x00008080, 0x80000000, 0x80000001, 0x00000000, 0x80008008, 0x80000000]);

        var ctx = null;

        /**
         * Keccak
         */

        var Keccak = function () {
          /**
           * Create a Keccak Context.
           * @constructor
           */

          function Keccak() {
            _classCallCheck(this, Keccak);

            this.state = new Uint32Array(50);
            this.block = Buffer.allocUnsafe(144);
            this.bs = 136;
            this.pos = FINALIZED;
          }

          Keccak.prototype.init = function init() {
            var bits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 256;

            assert((bits & 0xffff) === bits);
            assert(bits >= 224);
            assert(bits <= 512);

            var rate = 1600 - bits * 2;
            assert(rate > 0 && rate % 64 === 0);

            this.bs = rate / 8;
            this.pos = 0;

            return this;
          };

          Keccak.prototype.update = function update(data) {
            assert(Buffer.isBuffer(data));
            assert(!(this.pos & FINALIZED), 'Context already finalized.');

            var len = data.length;
            var pos = this.pos;
            var off = 0;

            this.pos = (this.pos + len) % this.bs;

            if (pos > 0) {
              var want = this.bs - pos;

              if (want > len) want = len;

              data.copy(this.block, pos, off, off + want);

              pos += want;
              len -= want;
              off += want;

              if (pos < this.bs) return this;

              this.transform(this.block, 0);
            }

            while (len >= this.bs) {
              this.transform(data, off);
              off += this.bs;
              len -= this.bs;
            }

            if (len > 0) data.copy(this.block, 0, off, off + len);

            return this;
          };

          Keccak.prototype.final = function final() {
            var std = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            assert(typeof std === 'boolean');
            assert(!(this.pos & FINALIZED), 'Context already finalized.');

            var len = 100 - this.bs / 2;
            assert(len < this.bs);

            this.block.fill(0, this.pos, this.bs);
            this.block[this.pos] |= std ? 0x06 : 0x01;
            this.block[this.bs - 1] |= 0x80;
            this.transform(this.block, 0);
            this.pos = FINALIZED;

            var out = Buffer.allocUnsafe(len);

            for (var i = 0; i < len; i++) {
              out[i] = this.state[i >>> 2] >>> 8 * (i & 3);
            }
            for (var _i = 0; _i < 50; _i++) {
              this.state[_i] = 0;
            }
            for (var _i2 = 0; _i2 < this.bs; _i2++) {
              this.block[_i2] = 0;
            }
            return out;
          };

          Keccak.prototype.transform = function transform(block, off) {
            var count = this.bs / 4;
            var s = this.state;

            for (var i = 0; i < count; i++) {
              s[i] ^= block.readUInt32LE(off + i * 4, true);
            }
            for (var n = 0; n < 48; n += 2) {
              var c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
              var c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
              var c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
              var c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
              var c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
              var c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
              var c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
              var c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
              var c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
              var c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
              var h = void 0,
                l = void 0;

              h = c8 ^ (c2 << 1 | c3 >>> 31);
              l = c9 ^ (c3 << 1 | c2 >>> 31);
              s[0] ^= h;
              s[1] ^= l;
              s[10] ^= h;
              s[11] ^= l;
              s[20] ^= h;
              s[21] ^= l;
              s[30] ^= h;
              s[31] ^= l;
              s[40] ^= h;
              s[41] ^= l;
              h = c0 ^ (c4 << 1 | c5 >>> 31);
              l = c1 ^ (c5 << 1 | c4 >>> 31);
              s[2] ^= h;
              s[3] ^= l;
              s[12] ^= h;
              s[13] ^= l;
              s[22] ^= h;
              s[23] ^= l;
              s[32] ^= h;
              s[33] ^= l;
              s[42] ^= h;
              s[43] ^= l;
              h = c2 ^ (c6 << 1 | c7 >>> 31);
              l = c3 ^ (c7 << 1 | c6 >>> 31);
              s[4] ^= h;
              s[5] ^= l;
              s[14] ^= h;
              s[15] ^= l;
              s[24] ^= h;
              s[25] ^= l;
              s[34] ^= h;
              s[35] ^= l;
              s[44] ^= h;
              s[45] ^= l;
              h = c4 ^ (c8 << 1 | c9 >>> 31);
              l = c5 ^ (c9 << 1 | c8 >>> 31);
              s[6] ^= h;
              s[7] ^= l;
              s[16] ^= h;
              s[17] ^= l;
              s[26] ^= h;
              s[27] ^= l;
              s[36] ^= h;
              s[37] ^= l;
              s[46] ^= h;
              s[47] ^= l;
              h = c6 ^ (c0 << 1 | c1 >>> 31);
              l = c7 ^ (c1 << 1 | c0 >>> 31);
              s[8] ^= h;
              s[9] ^= l;
              s[18] ^= h;
              s[19] ^= l;
              s[28] ^= h;
              s[29] ^= l;
              s[38] ^= h;
              s[39] ^= l;
              s[48] ^= h;
              s[49] ^= l;

              var b0 = s[0];
              var b1 = s[1];
              var b32 = s[11] << 4 | s[10] >>> 28;
              var b33 = s[10] << 4 | s[11] >>> 28;
              var b14 = s[20] << 3 | s[21] >>> 29;
              var b15 = s[21] << 3 | s[20] >>> 29;
              var b46 = s[31] << 9 | s[30] >>> 23;
              var b47 = s[30] << 9 | s[31] >>> 23;
              var b28 = s[40] << 18 | s[41] >>> 14;
              var b29 = s[41] << 18 | s[40] >>> 14;
              var b20 = s[2] << 1 | s[3] >>> 31;
              var b21 = s[3] << 1 | s[2] >>> 31;
              var b2 = s[13] << 12 | s[12] >>> 20;
              var b3 = s[12] << 12 | s[13] >>> 20;
              var b34 = s[22] << 10 | s[23] >>> 22;
              var b35 = s[23] << 10 | s[22] >>> 22;
              var b16 = s[33] << 13 | s[32] >>> 19;
              var b17 = s[32] << 13 | s[33] >>> 19;
              var b48 = s[42] << 2 | s[43] >>> 30;
              var b49 = s[43] << 2 | s[42] >>> 30;
              var b40 = s[5] << 30 | s[4] >>> 2;
              var b41 = s[4] << 30 | s[5] >>> 2;
              var b22 = s[14] << 6 | s[15] >>> 26;
              var b23 = s[15] << 6 | s[14] >>> 26;
              var b4 = s[25] << 11 | s[24] >>> 21;
              var b5 = s[24] << 11 | s[25] >>> 21;
              var b36 = s[34] << 15 | s[35] >>> 17;
              var b37 = s[35] << 15 | s[34] >>> 17;
              var b18 = s[45] << 29 | s[44] >>> 3;
              var b19 = s[44] << 29 | s[45] >>> 3;
              var b10 = s[6] << 28 | s[7] >>> 4;
              var b11 = s[7] << 28 | s[6] >>> 4;
              var b42 = s[17] << 23 | s[16] >>> 9;
              var b43 = s[16] << 23 | s[17] >>> 9;
              var b24 = s[26] << 25 | s[27] >>> 7;
              var b25 = s[27] << 25 | s[26] >>> 7;
              var b6 = s[36] << 21 | s[37] >>> 11;
              var b7 = s[37] << 21 | s[36] >>> 11;
              var b38 = s[47] << 24 | s[46] >>> 8;
              var b39 = s[46] << 24 | s[47] >>> 8;
              var b30 = s[8] << 27 | s[9] >>> 5;
              var b31 = s[9] << 27 | s[8] >>> 5;
              var b12 = s[18] << 20 | s[19] >>> 12;
              var b13 = s[19] << 20 | s[18] >>> 12;
              var b44 = s[29] << 7 | s[28] >>> 25;
              var b45 = s[28] << 7 | s[29] >>> 25;
              var b26 = s[38] << 8 | s[39] >>> 24;
              var b27 = s[39] << 8 | s[38] >>> 24;
              var b8 = s[48] << 14 | s[49] >>> 18;
              var b9 = s[49] << 14 | s[48] >>> 18;

              s[0] = b0 ^ ~b2 & b4;
              s[1] = b1 ^ ~b3 & b5;
              s[10] = b10 ^ ~b12 & b14;
              s[11] = b11 ^ ~b13 & b15;
              s[20] = b20 ^ ~b22 & b24;
              s[21] = b21 ^ ~b23 & b25;
              s[30] = b30 ^ ~b32 & b34;
              s[31] = b31 ^ ~b33 & b35;
              s[40] = b40 ^ ~b42 & b44;
              s[41] = b41 ^ ~b43 & b45;
              s[2] = b2 ^ ~b4 & b6;
              s[3] = b3 ^ ~b5 & b7;
              s[12] = b12 ^ ~b14 & b16;
              s[13] = b13 ^ ~b15 & b17;
              s[22] = b22 ^ ~b24 & b26;
              s[23] = b23 ^ ~b25 & b27;
              s[32] = b32 ^ ~b34 & b36;
              s[33] = b33 ^ ~b35 & b37;
              s[42] = b42 ^ ~b44 & b46;
              s[43] = b43 ^ ~b45 & b47;
              s[4] = b4 ^ ~b6 & b8;
              s[5] = b5 ^ ~b7 & b9;
              s[14] = b14 ^ ~b16 & b18;
              s[15] = b15 ^ ~b17 & b19;
              s[24] = b24 ^ ~b26 & b28;
              s[25] = b25 ^ ~b27 & b29;
              s[34] = b34 ^ ~b36 & b38;
              s[35] = b35 ^ ~b37 & b39;
              s[44] = b44 ^ ~b46 & b48;
              s[45] = b45 ^ ~b47 & b49;
              s[6] = b6 ^ ~b8 & b0;
              s[7] = b7 ^ ~b9 & b1;
              s[16] = b16 ^ ~b18 & b10;
              s[17] = b17 ^ ~b19 & b11;
              s[26] = b26 ^ ~b28 & b20;
              s[27] = b27 ^ ~b29 & b21;
              s[36] = b36 ^ ~b38 & b30;
              s[37] = b37 ^ ~b39 & b31;
              s[46] = b46 ^ ~b48 & b40;
              s[47] = b47 ^ ~b49 & b41;
              s[8] = b8 ^ ~b0 & b2;
              s[9] = b9 ^ ~b1 & b3;
              s[18] = b18 ^ ~b10 & b12;
              s[19] = b19 ^ ~b11 & b13;
              s[28] = b28 ^ ~b20 & b22;
              s[29] = b29 ^ ~b21 & b23;
              s[38] = b38 ^ ~b30 & b32;
              s[39] = b39 ^ ~b31 & b33;
              s[48] = b48 ^ ~b40 & b42;
              s[49] = b49 ^ ~b41 & b43;

              s[0] ^= ROUND_CONST[n];
              s[1] ^= ROUND_CONST[n + 1];
            }
          };

          Keccak.hash = function hash() {
            return new Keccak();
          };

          Keccak.hmac = function hmac() {
            throw new Error('Not implemented.');
          };

          Keccak.digest = function digest(data) {
            var bits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
            var std = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return ctx.init(bits).update(data).final(std);
          };

          Keccak.root = function root(left, right) {
            var bits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;
            var std = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            assert(Buffer.isBuffer(left) && left.length === bits / 8);
            assert(Buffer.isBuffer(right) && right.length === bits / 8);
            return ctx.init(bits).update(left).update(right).final(std);
          };

          Keccak.mac = function mac(data, key) {
            var bits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;

            throw new Error('Not implemented.');
          };

          return Keccak;
        }();

        /*
         * Global Context
         */

        ctx = new Keccak();

        /*
         * Expose
         */

        mods.exps = Keccak;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    47: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * merkle.js - merkle trees for bcoin
         * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
         * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        var assert = bcryptoReq('assert');
        var ZERO_HASH = Buffer.alloc(0, 0x00);

        /**
         * Build a merkle tree from leaves.
         * Note that this will mutate the `leaves` array!
         * @param {Object} alg
         * @param {Buffer[]} leaves
         * @returns {Array} [nodes, malleated]
         */

        exps.createTree = function createTree(alg, leaves) {
          assert(alg && typeof alg.root === 'function');
          assert(Array.isArray(leaves));

          var nodes = leaves;

          var size = leaves.length;
          var malleated = false;
          var i = 0;

          if (size === 0) {
            nodes.push(ZERO_HASH);
            return [nodes, malleated];
          }

          while (size > 1) {
            for (var j = 0; j < size; j += 2) {
              var k = Math.min(j + 1, size - 1);
              var left = nodes[i + j];
              var right = nodes[i + k];

              if (k === j + 1 && k + 1 === size && left.equals(right)) {
                malleated = true;
              }

              var hash = alg.root(left, right);

              nodes.push(hash);
            }

            i += size;

            size += 1;
            size >>>= 1;
          }

          return [nodes, malleated];
        };

        /**
         * Calculate merkle root from leaves.
         * @param {Object} alg
         * @param {Buffer[]} leaves
         * @returns {Array} [root, malleated]
         */

        exps.createRoot = function createRoot(alg, leaves) {
          assert(alg && typeof alg.root === 'function');
          assert(Array.isArray(leaves));

          var _exports$createTree = exps.createTree(alg, leaves),
            nodes = _exports$createTree[0],
            malleated = _exports$createTree[1];

          var root = nodes[nodes.length - 1];

          return [root, malleated];
        };

        /**
         * Collect a merkle branch from vector index.
         * @param {Object} alg
         * @param {Number} index
         * @param {Buffer[]} leaves
         * @returns {Buffer[]} branch
         */

        exps.createBranch = function createBranch(alg, index, leaves) {
          assert(alg && typeof alg.root === 'function');
          assert(index >>> 0 === index);
          assert(Array.isArray(leaves));

          var size = leaves.length;

          var _exports$createTree2 = exps.createTree(alg, leaves),
            nodes = _exports$createTree2[0];

          var branch = [];

          var i = 0;

          while (size > 1) {
            var j = Math.min(index ^ 1, size - 1);

            branch.push(nodes[i + j]);

            index >>>= 1;

            i += size;

            size += 1;
            size >>>= 1;
          }

          return branch;
        };

        /**
         * Derive merkle root from branch.
         * @param {Object} alg
         * @param {Buffer} hash
         * @param {Buffer[]} branch
         * @param {Number} index
         * @returns {Buffer} root
         */

        exps.deriveRoot = function deriveRoot(alg, hash, branch, index) {
          assert(alg && typeof alg.root === 'function');
          assert(Buffer.isBuffer(hash));
          assert(Array.isArray(branch));
          assert(index >>> 0 === index);

          var root = hash;

          for (var _iterator = branch, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var _hash = _ref;

            if (index & 1) root = alg.root(_hash, root);
            else root = alg.root(root, _hash);

            index >>>= 1;
          }

          return root;
        };

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    48: [function (bcryptoReq, mods, exps) {
      (function (global, Buffer) {
        /*!
         * pbkdf2.js - pbkdf2 for bcoin
         * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        function _asyncToGenerator(fn) {
          return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
              function step(key, arg) {
                try {
                  var info = gen[key](arg);
                  var value = info.value;
                } catch (error) {
                  reject(error);
                  return;
                }
                if (info.done) {
                  resolve(value);
                } else {
                  return Promise.resolve(value).then(function (value) {
                    step("next", value);
                  }, function (err) {
                    step("throw", err);
                  });
                }
              }
              return step("next");
            });
          };
        }

        var assert = bcryptoReq('assert');
        var crypto = global.crypto || global.msCrypto || {};
        var subtle = crypto.subtle || {};

        /**
         * Perform key derivation using PBKDF2.
         * @param {Function} alg
         * @param {Buffer} key
         * @param {Buffer} salt
         * @param {Number} iter
         * @param {Number} len
         * @returns {Buffer}
         */

        exps.derive = function derive(alg, key, salt, iter, len) {
          assert(alg && typeof alg.name === 'string');
          assert(Buffer.isBuffer(key));
          assert(Buffer.isBuffer(salt));
          assert(iter >>> 0 === iter);
          assert(len >>> 0 === len);

          var size = alg.digest(Buffer.alloc(0)).length;
          var blocks = Math.ceil(len / size);
          var out = Buffer.allocUnsafe(len);
          var buf = Buffer.allocUnsafe(salt.length + 4);
          var block = Buffer.allocUnsafe(size);

          var pos = 0;

          salt.copy(buf, 0);

          for (var i = 0; i < blocks; i++) {
            buf.writeUInt32BE(i + 1, salt.length, true);

            var mac = alg.mac(buf, key);
            mac.copy(block, 0);

            for (var j = 1; j < iter; j++) {
              mac = alg.mac(mac, key);
              for (var k = 0; k < size; k++) {
                block[k] ^= mac[k];
              }
            }

            block.copy(out, pos);
            pos += size;
          }

          return out;
        };

        /**
         * Execute pbkdf2 asynchronously.
         * @param {Function} alg
         * @param {Buffer} key
         * @param {Buffer} salt
         * @param {Number} iter
         * @param {Number} len
         * @returns {Promise}
         */

        exps.deriveAsync = function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee(alg, key, salt, iter, len) {
            var algo, use, hash, options, imported, data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    assert(alg && typeof alg.name === 'string');
                    assert(Buffer.isBuffer(key));
                    assert(Buffer.isBuffer(salt));
                    assert(iter >>> 0 === iter);
                    assert(len >>> 0 === len);

                    algo = {
                      name: 'PBKDF2'
                    };
                    use = ['deriveBits'];
                    hash = getHash(alg);

                    if (!(!subtle.importKey || !subtle.deriveBits || !hash)) {
                      _context.next = 10;
                      break;
                    }

                    return _context.abrupt('return', exps.derive(alg, key, salt, iter, len));

                  case 10:
                    options = {
                      name: 'PBKDF2',
                      salt: salt,
                      iterations: iter,
                      hash: hash
                    };
                    _context.next = 13;
                    return subtle.importKey('raw', key, algo, false, use);

                  case 13:
                    imported = _context.sent;
                    _context.next = 16;
                    return subtle.deriveBits(options, imported, len * 8);

                  case 16:
                    data = _context.sent;
                    return _context.abrupt('return', Buffer.from(data));

                  case 18:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function deriveAsync(_x, _x2, _x3, _x4, _x5) {
            return _ref.apply(this, arguments);
          }

          return deriveAsync;
        }();

        /*
         * Helpers
         */

        function getHash(alg) {
          var name = alg.name.toLowerCase();
          switch (name) {
            case 'sha1':
              return 'SHA-1';
            case 'sha256':
              return 'SHA-256';
            case 'sha384':
              return 'SHA-384';
            case 'sha512':
              return 'SHA-512';
            default:
              return null;
          }
        }

      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    49: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * poly1305.js - poly1305 for bcoin
         * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        /**
         * Poly1305 (used for bip151)
         */

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Poly1305 = function () {
          /**
           * Create a Poly1305 context.
           * @constructor
           * @see https://github.com/floodyberry/poly1305-donna
           * @see https://tools.ietf.org/html/rfc7539#section-2.5
           */

          function Poly1305() {
            _classCallCheck(this, Poly1305);

            this.r = new Uint16Array(10);
            this.h = new Uint16Array(10);
            this.pad = new Uint16Array(8);
            this.fin = 0;
            this.leftover = 0;
            this.buffer = Buffer.allocUnsafe(16);
          }

          /**
           * Initialize poly1305 with a key.
           * @param {Buffer} key
           */

          Poly1305.prototype.init = function init(key) {
            // r &= 0xffffffc0ffffffc0ffffffc0fffffff
            var t0 = key.readUInt16LE(0, true);
            var t1 = key.readUInt16LE(2, true);
            var t2 = key.readUInt16LE(4, true);
            var t3 = key.readUInt16LE(6, true);
            var t4 = key.readUInt16LE(8, true);
            var t5 = key.readUInt16LE(10, true);
            var t6 = key.readUInt16LE(12, true);
            var t7 = key.readUInt16LE(14, true);

            this.r[0] = t0 & 0x1fff;
            this.r[1] = (t0 >>> 13 | t1 << 3) & 0x1fff;
            this.r[2] = (t1 >>> 10 | t2 << 6) & 0x1f03;
            this.r[3] = (t2 >>> 7 | t3 << 9) & 0x1fff;
            this.r[4] = (t3 >>> 4 | t4 << 12) & 0x00ff;
            this.r[5] = t4 >>> 1 & 0x1ffe;
            this.r[6] = (t4 >>> 14 | t5 << 2) & 0x1fff;
            this.r[7] = (t5 >>> 11 | t6 << 5) & 0x1f81;
            this.r[8] = (t6 >>> 8 | t7 << 8) & 0x1fff;
            this.r[9] = t7 >>> 5 & 0x007f;

            // h = 0
            for (var i = 0; i < 10; i++) {
              this.h[i] = 0;
            } // save pad for later
            for (var _i = 0; _i < 8; _i++) {
              this.pad[_i] = key.readUInt16LE(16 + 2 * _i, true);
            }
            this.leftover = 0;
            this.fin = 0;
          };

          /**
           * Process 16 byte blocks.
           * @param {Buffer} data - Blocks.
           * @param {Number} bytes - Size.
           * @param {Number} m - Offset pointer.
           */

          Poly1305.prototype.blocks = function blocks(data, bytes, m) {
            var hibit = this.fin ? 0 : 1 << 11; // 1 << 128
            var d = new Uint32Array(10);

            while (bytes >= 16) {
              // h += m[i]
              var t0 = data.readUInt16LE(m + 0, true);
              var t1 = data.readUInt16LE(m + 2, true);
              var t2 = data.readUInt16LE(m + 4, true);
              var t3 = data.readUInt16LE(m + 6, true);
              var t4 = data.readUInt16LE(m + 8, true);
              var t5 = data.readUInt16LE(m + 10, true);
              var t6 = data.readUInt16LE(m + 12, true);
              var t7 = data.readUInt16LE(m + 14, true);

              this.h[0] += t0 & 0x1fff;
              this.h[1] += (t0 >>> 13 | t1 << 3) & 0x1fff;
              this.h[2] += (t1 >>> 10 | t2 << 6) & 0x1fff;
              this.h[3] += (t2 >>> 7 | t3 << 9) & 0x1fff;
              this.h[4] += (t3 >>> 4 | t4 << 12) & 0x1fff;
              this.h[5] += t4 >>> 1 & 0x1fff;
              this.h[6] += (t4 >>> 14 | t5 << 2) & 0x1fff;
              this.h[7] += (t5 >>> 11 | t6 << 5) & 0x1fff;
              this.h[8] += (t6 >>> 8 | t7 << 8) & 0x1fff;
              this.h[9] += t7 >>> 5 | hibit;

              // h *= r, (partial) h %= p
              var c = 0;
              for (var i = 0; i < 10; i++) {
                d[i] = c;

                for (var j = 0; j < 10; j++) {
                  var a = this.h[j];

                  if (j <= i) a *= this.r[i - j];
                  else a *= 5 * this.r[i + 10 - j];

                  d[i] += a;

                  // Sum(h[i] * r[i] * 5) will overflow slightly
                  // above 6 products with an unclamped r, so
                  // carry at 5
                  if (j === 4) {
                    c = d[i] >>> 13;
                    d[i] &= 0x1fff;
                  }
                }

                c += d[i] >>> 13;
                d[i] &= 0x1fff;
              }

              c = (c << 2) + c; // c *= 5
              c += d[0];
              d[0] = c & 0x1fff;
              c = c >>> 13;
              d[1] += c;

              for (var _i2 = 0; _i2 < 10; _i2++) {
                this.h[_i2] = d[_i2];
              }
              m += 16;
              bytes -= 16;
            }
          };

          /**
           * Update the MAC with data (will be
           * processed as 16 byte blocks).
           * @param {Buffer} data
           */

          Poly1305.prototype.update = function update(data) {
            var bytes = data.length;
            var m = 0;

            // handle leftover
            if (this.leftover) {
              var want = 16 - this.leftover;

              if (want > bytes) want = bytes;

              for (var i = 0; i < want; i++) {
                this.buffer[this.leftover + i] = data[m + i];
              }
              bytes -= want;
              m += want;

              this.leftover += want;

              if (this.leftover < 16) return;

              this.blocks(this.buffer, 16, 0);
              this.leftover = 0;
            }

            // process full blocks
            if (bytes >= 16) {
              var _want = bytes & ~(16 - 1);
              this.blocks(data, _want, m);
              m += _want;
              bytes -= _want;
            }

            // store leftover
            if (bytes) {
              for (var _i3 = 0; _i3 < bytes; _i3++) {
                this.buffer[this.leftover + _i3] = data[m + _i3];
              }
              this.leftover += bytes;
            }
          };

          /**
           * Finalize and return a 16-byte MAC.
           * @returns {Buffer}
           */

          Poly1305.prototype.final = function final() {
            var mac = Buffer.allocUnsafe(16);
            var g = new Uint16Array(10);

            // process the remaining block
            if (this.leftover) {
              var i = this.leftover;
              this.buffer[i++] = 1;
              for (; i < 16; i++) {
                this.buffer[i] = 0;
              }
              this.fin = 1;
              this.blocks(this.buffer, 16, 0);
            }

            // fully carry h
            var c = this.h[1] >>> 13;
            this.h[1] &= 0x1fff;
            for (var _i4 = 2; _i4 < 10; _i4++) {
              this.h[_i4] += c;
              c = this.h[_i4] >>> 13;
              this.h[_i4] &= 0x1fff;
            }
            this.h[0] += c * 5;
            c = this.h[0] >>> 13;
            this.h[0] &= 0x1fff;
            this.h[1] += c;
            c = this.h[1] >>> 13;
            this.h[1] &= 0x1fff;
            this.h[2] += c;

            // compute h + -p
            g[0] = this.h[0] + 5;
            c = g[0] >>> 13;
            g[0] &= 0x1fff;
            for (var _i5 = 1; _i5 < 10; _i5++) {
              g[_i5] = this.h[_i5] + c;
              c = g[_i5] >>> 13;
              g[_i5] &= 0x1fff;
            }

            // select h if h < p, or h + -p if h >= p
            var mask = (c ^ 1) - 1;
            for (var _i6 = 0; _i6 < 10; _i6++) {
              g[_i6] &= mask;
            }
            mask = ~mask;
            for (var _i7 = 0; _i7 < 10; _i7++) {
              this.h[_i7] = this.h[_i7] & mask | g[_i7];
            } // h = h % (2^128)
            this.h[0] = (this.h[0] | this.h[1] << 13) & 0xffff;
            this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 0xffff;
            this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 0xffff;
            this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 0xffff;
            this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 0xffff;
            this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 0xffff;
            this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 0xffff;
            this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 0xffff;

            // mac = (h + pad) % (2^128)
            var f = this.h[0] + this.pad[0];
            this.h[0] = f;
            for (var _i8 = 1; _i8 < 8; _i8++) {
              f = this.h[_i8] + this.pad[_i8] + (f >>> 16);
              this.h[_i8] = f;
            }

            for (var _i9 = 0; _i9 < 8; _i9++) {
              mac.writeUInt16LE(this.h[_i9], _i9 * 2, true);
            } // zero out the state
            for (var _i10 = 0; _i10 < 10; _i10++) {
              this.h[_i10] = 0;
            }
            for (var _i11 = 0; _i11 < 10; _i11++) {
              this.r[_i11] = 0;
            }
            for (var _i12 = 0; _i12 < 8; _i12++) {
              this.pad[_i12] = 0;
            }
            return mac;
          };

          /**
           * Return a MAC for a message and key.
           * @param {Buffer} msg
           * @param {Buffer} key
           * @returns {Buffer} MAC
           */

          Poly1305.auth = function auth(msg, key) {
            var poly = new Poly1305();
            poly.init(key);
            poly.update(msg);
            return poly.final();
          };

          /**
           * Compare two MACs in constant time.
           * @param {Buffer} mac1
           * @param {Buffer} mac2
           * @returns {Boolean}
           */

          Poly1305.verify = function verify(mac1, mac2) {
            var dif = 0;

            // Compare in constant time.
            for (var i = 0; i < 16; i++) {
              dif |= mac1[i] ^ mac2[i];
            }
            dif = dif - 1 >>> 31;

            return (dif & 1) !== 0;
          };

          return Poly1305;
        }();

        /*
         * Expose
         */

        mods.exps = Poly1305;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "buffer": 4
    }],
    50: [function (bcryptoReq, mods, exps) {
      (function (global, Buffer) {
        /*!
         * random.js - randomness for bcoin
         * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        var assert = bcryptoReq('assert');
        var crypto = global.crypto || global.msCrypto || {};

        /**
         * Generate pseudo-random bytes.
         * @param {Number} size
         * @returns {Buffer}
         */

        exps.randomBytes = function randomBytes(size) {
          assert(size >>> 0 === size);
          var data = new Uint8Array(size);
          crypto.getRandomValues(data);
          return Buffer.from(data.buffer);
        };

        if (!crypto.getRandomValues) {
          // Out of luck here. Use bad randomness for now.
          exps.randomBytes = function randomBytes(size) {
            assert(size >>> 0 === size);

            var data = Buffer.allocUnsafe(size);

            for (var i = 0; i < data.length; i++) {
              data[i] = Math.floor(Math.random() * 256);
            }
            return data;
          };
        }

        /**
         * Generate a random uint32.
         * Probably more cryptographically sound than
         * `Math.random()`.
         * @returns {Number}
         */

        exps.randomInt = function randomInt() {
          return exps.randomBytes(4).readUInt32LE(0, true);
        };

        /**
         * Generate a random number within a range.
         * Probably more cryptographically sound than
         * `Math.random()`.
         * @param {Number} min - Inclusive.
         * @param {Number} max - Exclusive.
         * @returns {Number}
         */

        exps.randomRange = function randomRange(min, max) {
          assert(typeof min === 'number');
          assert(typeof max === 'number');
          var num = exps.randomInt();
          return Math.floor(num / 0x100000000 * (max - min) + min);
        };

      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, bcryptoReq("buffer").Buffer)
    }, {
      "assert": 1,
      "buffer": 4
    }],
    51: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * ripemd160.js - RIPEMD160 implementation for bcoin
         * Copyright (c) 2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         * Parts of this software based on hash.js.
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');
        var HMAC = bcryptoReq('./hmac');

        /*
         * Constants
         */

        var FINALIZED = -1;
        var DESC = Buffer.alloc(8, 0x00);
        var PADDING = Buffer.alloc(64, 0x00);

        PADDING[0] = 0x80;

        var r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];

        var rh = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];

        var s = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];

        var sh = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];

        var ctx = null;

        /**
         * RIPEMD160
         */

        var RIPEMD160 = function () {
          /**
           * Create a RIPEMD160 context.
           * @constructor
           */

          function RIPEMD160() {
            _classCallCheck(this, RIPEMD160);

            this.state = new Uint32Array(5);
            this.msg = new Uint32Array(16);
            this.block = Buffer.allocUnsafe(64);
            this.size = FINALIZED;
          }

          /**
           * Initialize RIPEMD160 context.
           * @returns {RIPEMD160}
           */

          RIPEMD160.prototype.init = function init() {
            this.state[0] = 0x67452301;
            this.state[1] = 0xefcdab89;
            this.state[2] = 0x98badcfe;
            this.state[3] = 0x10325476;
            this.state[4] = 0xc3d2e1f0;
            this.size = 0;
            return this;
          };

          /**
           * Update RIPEMD160 context.
           * @param {Buffer} data
           */

          RIPEMD160.prototype.update = function update(data) {
            assert(Buffer.isBuffer(data));
            this._update(data, data.length);
            return this;
          };

          /**
           * Finalize RIPEMD160 context.
           * @returns {Buffer}
           */

          RIPEMD160.prototype.final = function final() {
            return this._final(Buffer.allocUnsafe(20));
          };

          /**
           * Update RIPEMD160 context.
           * @private
           * @param {Buffer} data
           * @param {Number} len
           */

          RIPEMD160.prototype._update = function _update(data, len) {
            assert(this.size !== FINALIZED, 'Context already finalized.');

            var pos = this.size & 0x3f;
            var off = 0;

            this.size += len;

            if (pos > 0) {
              var want = 64 - pos;

              if (want > len) want = len;

              data.copy(this.block, pos, off, off + want);

              pos += want;
              len -= want;
              off += want;

              if (pos < 64) return;

              this.transform(this.block, 0);
            }

            while (len >= 64) {
              this.transform(data, off);
              off += 64;
              len -= 64;
            }

            if (len > 0) data.copy(this.block, 0, off, off + len);
          };

          /**
           * Finalize RIPEMD160 context.
           * @private
           * @param {Buffer} out
           * @returns {Buffer}
           */

          RIPEMD160.prototype._final = function _final(out) {
            assert(this.size !== FINALIZED, 'Context already finalized.');

            var pos = this.size % 64;
            var len = this.size * 8;

            writeU32(DESC, len, 0);
            writeU32(DESC, len * (1 / 0x100000000), 4);

            this._update(PADDING, 1 + (119 - pos) % 64);
            this._update(DESC, 8);

            for (var i = 0; i < 5; i++) {
              writeU32(out, this.state[i], i * 4);
              this.state[i] = 0;
            }

            for (var _i = 0; _i < 16; _i++) {
              this.msg[_i] = 0;
            }
            for (var _i2 = 0; _i2 < 64; _i2++) {
              this.block[_i2] = 0;
            }
            this.size = FINALIZED;

            return out;
          };

          /**
           * Transform RIPEMD160 block.
           * @param {Buffer} chunk
           * @param {Number} pos
           */

          RIPEMD160.prototype.transform = function transform(chunk, pos) {
            var W = this.msg;

            var A = this.state[0];
            var B = this.state[1];
            var C = this.state[2];
            var D = this.state[3];
            var E = this.state[4];
            var Ah = A;
            var Bh = B;
            var Ch = C;
            var Dh = D;
            var Eh = E;

            for (var i = 0; i < 16; i++) {
              W[i] = readU32(chunk, pos + i * 4);
            }
            for (var j = 0; j < 80; j++) {
              var a = A + f(j, B, C, D) + W[r[j]] + K(j);
              var b = rotl32(a, s[j]);
              var _T = b + E;
              A = E;
              E = D;
              D = rotl32(C, 10);
              C = B;
              B = _T;

              a = Ah + f(79 - j, Bh, Ch, Dh) + W[rh[j]] + Kh(j);
              b = rotl32(a, sh[j]);
              _T = b + Eh;
              Ah = Eh;
              Eh = Dh;
              Dh = rotl32(Ch, 10);
              Ch = Bh;
              Bh = _T;
            }

            var T = this.state[1] + C + Dh;

            this.state[1] = this.state[2] + D + Eh;
            this.state[2] = this.state[3] + E + Ah;
            this.state[3] = this.state[4] + A + Bh;
            this.state[4] = this.state[0] + B + Ch;
            this.state[0] = T;
          };

          RIPEMD160.hash = function hash() {
            return new RIPEMD160();
          };

          RIPEMD160.hmac = function hmac() {
            return new HMAC(RIPEMD160, 64);
          };

          RIPEMD160.digest = function digest(data) {
            return ctx.init().update(data).final();
          };

          RIPEMD160.root = function root(left, right) {
            assert(Buffer.isBuffer(left) && left.length === 20);
            assert(Buffer.isBuffer(right) && right.length === 20);
            return ctx.init().update(left).update(right).final();
          };

          RIPEMD160.mac = function mac(data, key) {
            return RIPEMD160.hmac().init(key).update(data).final();
          };

          return RIPEMD160;
        }();

        /*
         * Global Context
         */

        ctx = new RIPEMD160();

        /*
         * Helpers
         */

        function rotl32(w, b) {
          return w << b | w >>> 32 - b;
        }

        function f(j, x, y, z) {
          if (j <= 15) return x ^ y ^ z;

          if (j <= 31) return x & y | ~x & z;

          if (j <= 47) return (x | ~y) ^ z;

          if (j <= 63) return x & z | y & ~z;

          return x ^ (y | ~z);
        }

        function K(j) {
          if (j <= 15) return 0x00000000;

          if (j <= 31) return 0x5a827999;

          if (j <= 47) return 0x6ed9eba1;

          if (j <= 63) return 0x8f1bbcdc;

          return 0xa953fd4e;
        }

        function Kh(j) {
          if (j <= 15) return 0x50a28be6;

          if (j <= 31) return 0x5c4dd124;

          if (j <= 47) return 0x6d703ef3;

          if (j <= 63) return 0x7a6d76e9;

          return 0x00000000;
        }

        function writeU32(buf, value, offset) {
          buf[offset + 3] = value >>> 24;
          buf[offset + 2] = value >> 16 & 0xff;
          buf[offset + 1] = value >> 8 & 0xff;
          buf[offset] = value & 0xff;
        }

        function readU32(buf, offset) {
          return (buf[offset + 3] & 0xff) * 0x1000000 + ((buf[offset + 2] & 0xff) << 16 | (buf[offset + 1] & 0xff) << 8 | buf[offset] & 0xff);
        }

        /*
         * Expose
         */

        mods.exps = RIPEMD160;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./hmac": 45,
      "assert": 1,
      "buffer": 4
    }],
    52: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * secp256k1.js - wrapper for secp256k1-node
         * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
         * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         */

        'use strict';

        var assert = bcryptoReq('assert');
        var secp256k1 = bcryptoReq('secp256k1/js');
        var random = bcryptoReq('./random');
        var ec = exps;

        /*
         * Constants
         */

        var ZERO_S = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');

        var HALF_ORDER = Buffer.from('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 'hex');

        /**
         * Generate a private key.
         * @returns {Buffer} Private key.
         */

        ec.generatePrivateKey = function generatePrivateKey() {
          var key = void 0;

          do {
            key = random.randomBytes(32);
          } while (!secp256k1.privateKeyVerify(key));

          return key;
        };

        /**
         * Create a public key from a private key.
         * @param {Buffer} key
         * @param {Boolean?} compress
         * @returns {Buffer}
         */

        ec.publicKeyCreate = function publicKeyCreate(key, compress) {
          return secp256k1.publicKeyCreate(key, compress);
        };

        /**
         * Compress or decompress public key.
         * @param {Buffer} pub
         * @returns {Buffer}
         */

        ec.publicKeyConvert = function publicKeyConvert(key, compress) {
          return secp256k1.publicKeyConvert(key, compress);
        };

        /**
         * ((tweak + key) % n)
         * @param {Buffer} key
         * @param {Buffer} tweak
         * @returns {Buffer} key
         */

        ec.privateKeyTweakAdd = function privateKeyTweakAdd(key, tweak) {
          assert(Buffer.isBuffer(key));
          return secp256k1.privateKeyTweakAdd(key, tweak);
        };

        /**
         * ((g * tweak) + key)
         * @param {Buffer} key
         * @param {Buffer} tweak
         * @returns {Buffer} key
         */

        ec.publicKeyTweakAdd = function publicKeyTweakAdd(key, tweak, compress) {
          return secp256k1.publicKeyTweakAdd(key, tweak, compress);
        };

        /**
         * Create an ecdh.
         * @param {Buffer} pub
         * @param {Buffer} priv
         * @returns {Buffer}
         */

        ec.ecdh = function ecdh(pub, priv) {
          return secp256k1.ecdhUnsafe(pub, priv, true);
        };

        /**
         * Validate a public key.
         * @param {Buffer} key
         * @returns {Boolean} True if buffer is a valid public key.
         */

        ec.publicKeyVerify = function publicKeyVerify(key) {
          return secp256k1.publicKeyVerify(key);
        };

        /**
         * Validate a private key.
         * @param {Buffer} key
         * @returns {Boolean} True if buffer is a valid private key.
         */

        ec.privateKeyVerify = function privateKeyVerify(key) {
          return secp256k1.privateKeyVerify(key);
        };

        /**
         * Sign a message.
         * @param {Buffer} msg
         * @param {Buffer} key - Private key.
         * @returns {Buffer} R/S-formatted signature.
         */

        ec.sign = function sign(msg, key) {
          assert(Buffer.isBuffer(msg));
          assert(Buffer.isBuffer(key));

          // Sign message

          var _secp256k1$sign = secp256k1.sign(msg, key),
            signature = _secp256k1$sign.signature;

          // Ensure low S value


          return secp256k1.signatureNormalize(signature);
        };

        /**
         * Sign a message.
         * @param {Buffer} msg
         * @param {Buffer} key - Private key.
         * @returns {Buffer} DER-formatted signature.
         */

        ec.signDER = function signDER(msg, key) {
          assert(Buffer.isBuffer(msg));
          assert(Buffer.isBuffer(key));

          // Sign message
          var sig = ec.sign(msg, key);

          // Convert to DER
          return secp256k1.signatureExport(sig);
        };

        /**
         * Verify a signature.
         * @param {Buffer} msg
         * @param {Buffer} sig - R/S formatted.
         * @param {Buffer} key
         * @returns {Boolean}
         */

        ec.verify = function verify(msg, sig, key) {
          assert(Buffer.isBuffer(msg));
          assert(Buffer.isBuffer(sig));
          assert(Buffer.isBuffer(key));

          if (sig.length === 0) return false;

          if (key.length === 0) return false;

          try {
            sig = secp256k1.signatureNormalize(sig);
            return secp256k1.verify(msg, sig, key);
          } catch (e) {
            return false;
          }
        };

        /**
         * Verify a signature.
         * @param {Buffer} msg
         * @param {Buffer} sig - DER formatted.
         * @param {Buffer} key
         * @returns {Boolean}
         */

        ec.verifyDER = function verifyDER(msg, sig, key) {
          assert(Buffer.isBuffer(msg));
          assert(Buffer.isBuffer(sig));
          assert(Buffer.isBuffer(key));

          if (sig.length === 0) return false;

          if (key.length === 0) return false;

          try {
            sig = secp256k1.signatureImportLax(sig);
          } catch (e) {
            return false;
          }

          return ec.verify(msg, sig, key);
        };

        /**
         * Recover a public key.
         * @param {Buffer} msg
         * @param {Buffer} sig
         * @param {Number?} param
         * @param {Boolean?} compress
         * @returns {Buffer[]|Buffer|null}
         */

        ec.recover = function recover(msg, sig, param, compress) {
          if (param == null) param = 0;

          try {
            return secp256k1.recover(msg, sig, param, compress);
          } catch (e) {
            return null;
          }
        };

        /**
         * Recover a public key.
         * @param {Buffer} msg
         * @param {Buffer} sig
         * @param {Number?} param
         * @param {Boolean?} compress
         * @returns {Buffer[]|Buffer|null}
         */

        ec.recoverDER = function recoverDER(msg, sig, param, compress) {
          try {
            sig = secp256k1.signatureImport(sig);
          } catch (e) {
            return null;
          }
          return ec.recover(msg, sig, param, compress);
        };

        /**
         * Convert DER signature to R/S.
         * @param {Buffer} sig
         * @returns {Buffer} R/S-formatted signature.
         */

        ec.fromDER = function fromDER(sig) {
          assert(Buffer.isBuffer(sig));
          return secp256k1.signatureImport(sig);
        };

        /**
         * Convert R/S signature to DER.
         * @param {Buffer} sig
         * @returns {Buffer} DER-formatted signature.
         */

        ec.toDER = function toDER(sig) {
          assert(Buffer.isBuffer(sig));
          return secp256k1.signatureExport(sig);
        };

        /**
         * Test whether a signature has a low S value.
         * @param {Buffer} sig
         * @returns {Boolean}
         */

        ec.isLowS = function isLowS(sig) {
          assert(Buffer.isBuffer(sig));

          if (sig.length !== 64) return false;

          sig = sig.slice(32, 64);

          if (sig.equals(ZERO_S)) return false;

          if (sig.compare(HALF_ORDER) > 0) return false;

          return true;
        };

        /**
         * Test whether a signature has a low S value.
         * @param {Buffer} sig
         * @returns {Boolean}
         */

        ec.isLowDER = function isLowDER(sig) {
          assert(Buffer.isBuffer(sig));
          try {
            sig = secp256k1.signatureImport(sig);
          } catch (e) {
            return false;
          }
          return ec.isLowS(sig);
        };

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./random": 50,
      "assert": 1,
      "buffer": 4,
      "secp256k1/js": 70
    }],
    53: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * sha1.js - SHA1 implementation for bcoin
         * Copyright (c) 2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         * Parts of this software based on hash.js.
         */

        /* eslint camelcase: "off" */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');
        var HMAC = bcryptoReq('./hmac');

        /*
         * Constants
         */

        var FINALIZED = -1;
        var DESC = Buffer.alloc(8, 0x00);
        var PADDING = Buffer.alloc(64, 0x00);

        PADDING[0] = 0x80;

        var K = new Uint32Array([0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6]);

        var ctx = null;

        /**
         * SHA1
         */

        var SHA1 = function () {
          /**
           * Create a SHA1 context.
           * @constructor
           */

          function SHA1() {
            _classCallCheck(this, SHA1);

            this.state = new Uint32Array(5);
            this.msg = new Uint32Array(80);
            this.block = Buffer.allocUnsafe(64);
            this.size = FINALIZED;
          }

          /**
           * Initialize SHA1 context.
           * @returns {SHA1}
           */

          SHA1.prototype.init = function init() {
            this.state[0] = 0x67452301;
            this.state[1] = 0xefcdab89;
            this.state[2] = 0x98badcfe;
            this.state[3] = 0x10325476;
            this.state[4] = 0xc3d2e1f0;
            this.size = 0;
            return this;
          };

          /**
           * Update SHA1 context.
           * @param {Buffer} data
           * @returns {SHA1}
           */

          SHA1.prototype.update = function update(data) {
            assert(Buffer.isBuffer(data));
            this._update(data, data.length);
            return this;
          };

          /**
           * Finalize SHA1 context.
           * @returns {Buffer}
           */

          SHA1.prototype.final = function final() {
            return this._final(Buffer.allocUnsafe(20));
          };

          /**
           * Update SHA1 context.
           * @private
           * @param {Buffer} data
           * @param {Number} len
           */

          SHA1.prototype._update = function _update(data, len) {
            assert(this.size !== FINALIZED, 'Context already finalized.');

            var pos = this.size & 0x3f;
            var off = 0;

            this.size += len;

            if (pos > 0) {
              var want = 64 - pos;

              if (want > len) want = len;

              data.copy(this.block, pos, off, off + want);

              pos += want;
              len -= want;
              off += want;

              if (pos < 64) return;

              this.transform(this.block, 0);
            }

            while (len >= 64) {
              this.transform(data, off);
              off += 64;
              len -= 64;
            }

            if (len > 0) data.copy(this.block, 0, off, off + len);
          };

          /**
           * Finalize SHA1 context.
           * @private
           * @param {Buffer} out
           * @returns {Buffer}
           */

          SHA1.prototype._final = function _final(out) {
            assert(this.size !== FINALIZED, 'Context already finalized.');

            var pos = this.size % 64;
            var len = this.size * 8;

            writeU32(DESC, len * (1 / 0x100000000), 0);
            writeU32(DESC, len, 4);

            this._update(PADDING, 1 + (119 - pos) % 64);
            this._update(DESC, 8);

            for (var i = 0; i < 5; i++) {
              writeU32(out, this.state[i], i * 4);
              this.state[i] = 0;
            }

            for (var _i = 0; _i < 80; _i++) {
              this.msg[_i] = 0;
            }
            for (var _i2 = 0; _i2 < 64; _i2++) {
              this.block[_i2] = 0;
            }
            this.size = FINALIZED;

            return out;
          };

          /**
           * Transform SHA1 block.
           * @param {Buffer} chunk
           * @param {Number} pos
           */

          SHA1.prototype.transform = function transform(chunk, pos) {
            var W = this.msg;

            var a = this.state[0];
            var b = this.state[1];
            var c = this.state[2];
            var d = this.state[3];
            var e = this.state[4];
            var i = 0;

            for (; i < 16; i++) {
              W[i] = readU32(chunk, pos + i * 4);
            }
            for (; i < 80; i++) {
              W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            }
            for (i = 0; i < 80; i++) {
              var s = i / 20 | 0;

              var t = rotl32(a, 5);
              t += ft_1(s, b, c, d);
              t += e;
              t += W[i];
              t += K[s];

              e = d;
              d = c;
              c = rotl32(b, 30);
              b = a;
              a = t;
            }

            this.state[0] += a;
            this.state[1] += b;
            this.state[2] += c;
            this.state[3] += d;
            this.state[4] += e;
          };

          SHA1.hash = function hash() {
            return new SHA1();
          };

          SHA1.hmac = function hmac() {
            return new HMAC(SHA1, 64);
          };

          SHA1.digest = function digest(data) {
            return ctx.init().update(data).final();
          };

          SHA1.root = function root(left, right) {
            assert(Buffer.isBuffer(left) && left.length === 20);
            assert(Buffer.isBuffer(right) && right.length === 20);
            return ctx.init().update(left).update(right).final();
          };

          SHA1.mac = function mac(data, key) {
            return SHA1.hmac().init(key).update(data).final();
          };

          return SHA1;
        }();

        /*
         * Global Context
         */

        ctx = new SHA1();

        /*
         * Helpers
         */

        function rotl32(w, b) {
          return w << b | w >>> 32 - b;
        }

        function ft_1(s, x, y, z) {
          if (s === 0) return ch32(x, y, z);

          if (s === 1 || s === 3) return p32(x, y, z);

          if (s === 2) return maj32(x, y, z);

          return 0;
        }

        function ch32(x, y, z) {
          return x & y ^ ~x & z;
        }

        function maj32(x, y, z) {
          return x & y ^ x & z ^ y & z;
        }

        function p32(x, y, z) {
          return x ^ y ^ z;
        }

        function writeU32(buf, value, offset) {
          buf[offset] = value >>> 24;
          buf[offset + 1] = value >> 16 & 0xff;
          buf[offset + 2] = value >> 8 & 0xff;
          buf[offset + 3] = value & 0xff;
        }

        function readU32(buf, offset) {
          return (buf[offset] & 0xff) * 0x1000000 + ((buf[offset + 1] & 0xff) << 16 | (buf[offset + 2] & 0xff) << 8 | buf[offset + 3] & 0xff);
        }

        /*
         * Expose
         */

        mods.exps = SHA1;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./hmac": 45,
      "assert": 1,
      "buffer": 4
    }],
    54: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * sha256.js - SHA256 implementation for bcoin
         * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         * Parts of this software based on hash.js.
         */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');
        var HMAC = bcryptoReq('./hmac');

        /*
         * Constants
         */

        var FINALIZED = -1;
        var DESC = Buffer.alloc(8, 0x00);
        var PADDING = Buffer.alloc(64, 0x00);

        PADDING[0] = 0x80;

        var K = new Uint32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);

        var ctx = null;

        /**
         * SHA256
         */

        var SHA256 = function () {
          /**
           * Create a SHA256 context.
           * @constructor
           */

          function SHA256() {
            _classCallCheck(this, SHA256);

            this.state = new Uint32Array(8);
            this.msg = new Uint32Array(64);
            this.block = Buffer.allocUnsafe(64);
            this.size = FINALIZED;
          }

          /**
           * Initialize SHA256 context.
           */

          SHA256.prototype.init = function init() {
            this.state[0] = 0x6a09e667;
            this.state[1] = 0xbb67ae85;
            this.state[2] = 0x3c6ef372;
            this.state[3] = 0xa54ff53a;
            this.state[4] = 0x510e527f;
            this.state[5] = 0x9b05688c;
            this.state[6] = 0x1f83d9ab;
            this.state[7] = 0x5be0cd19;
            this.size = 0;
            return this;
          };

          /**
           * Update SHA256 context.
           * @param {Buffer} data
           */

          SHA256.prototype.update = function update(data) {
            assert(Buffer.isBuffer(data));
            this._update(data, data.length);
            return this;
          };

          /**
           * Finalize SHA256 context.
           * @returns {Buffer}
           */

          SHA256.prototype.final = function final() {
            return this._final(Buffer.allocUnsafe(32));
          };

          /**
           * Update SHA256 context.
           * @private
           * @param {Buffer} data
           * @param {Number} len
           */

          SHA256.prototype._update = function _update(data, len) {
            assert(this.size !== FINALIZED, 'Context already finalized.');

            var pos = this.size & 0x3f;
            var off = 0;

            this.size += len;

            if (pos > 0) {
              var want = 64 - pos;

              if (want > len) want = len;

              data.copy(this.block, pos, off, off + want);

              pos += want;
              len -= want;
              off += want;

              if (pos < 64) return;

              this.transform(this.block, 0);
            }

            while (len >= 64) {
              this.transform(data, off);
              off += 64;
              len -= 64;
            }

            if (len > 0) data.copy(this.block, 0, off, off + len);
          };

          /**
           * Finalize SHA256 context.
           * @private
           * @param {Buffer} out
           * @returns {Buffer}
           */

          SHA256.prototype._final = function _final(out) {
            assert(this.size !== FINALIZED, 'Context already finalized.');

            var pos = this.size % 64;
            var len = this.size * 8;

            writeU32(DESC, len * (1 / 0x100000000), 0);
            writeU32(DESC, len, 4);

            this._update(PADDING, 1 + (119 - pos) % 64);
            this._update(DESC, 8);

            for (var i = 0; i < 8; i++) {
              writeU32(out, this.state[i], i * 4);
              this.state[i] = 0;
            }

            for (var _i = 0; _i < 64; _i++) {
              this.msg[_i] = 0;
            }
            for (var _i2 = 0; _i2 < 64; _i2++) {
              this.block[_i2] = 0;
            }
            this.size = FINALIZED;

            return out;
          };

          /**
           * Transform SHA256 block.
           * @param {Buffer} chunk
           * @param {Number} pos
           */

          SHA256.prototype.transform = function transform(chunk, pos) {
            var W = this.msg;

            var a = this.state[0];
            var b = this.state[1];
            var c = this.state[2];
            var d = this.state[3];
            var e = this.state[4];
            var f = this.state[5];
            var g = this.state[6];
            var h = this.state[7];
            var i = 0;

            for (; i < 16; i++) {
              W[i] = readU32(chunk, pos + i * 4);
            }
            for (; i < 64; i++) {
              W[i] = sigma1(W[i - 2]) + W[i - 7] + sigma0(W[i - 15]) + W[i - 16];
            }
            for (i = 0; i < 64; i++) {
              var t1 = h + Sigma1(e);
              t1 += Ch(e, f, g);
              t1 += K[i] + W[i];

              var t2 = Sigma0(a);
              t2 += Maj(a, b, c);

              h = g;
              g = f;
              f = e;

              e = d + t1;

              d = c;
              c = b;
              b = a;

              a = t1 + t2;
            }

            this.state[0] += a;
            this.state[1] += b;
            this.state[2] += c;
            this.state[3] += d;
            this.state[4] += e;
            this.state[5] += f;
            this.state[6] += g;
            this.state[7] += h;
          };

          SHA256.hash = function hash() {
            return new SHA256();
          };

          SHA256.hmac = function hmac() {
            return new HMAC(SHA256, 64);
          };

          SHA256.digest = function digest(data) {
            return ctx.init().update(data).final();
          };

          SHA256.root = function root(left, right) {
            assert(Buffer.isBuffer(left) && left.length === 32);
            assert(Buffer.isBuffer(right) && right.length === 32);
            return ctx.init().update(left).update(right).final();
          };

          SHA256.mac = function mac(data, key) {
            return SHA256.hmac().init(key).update(data).final();
          };

          return SHA256;
        }();

        /*
         * Global Context
         */

        ctx = new SHA256();

        /*
         * Helpers
         */

        function Sigma0(x) {
          return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
        }

        function Sigma1(x) {
          return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
        }

        function sigma0(x) {
          return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
        }

        function sigma1(x) {
          return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
        }

        function Ch(x, y, z) {
          return z ^ x & (y ^ z);
        }

        function Maj(x, y, z) {
          return x & y | z & (x | y);
        }

        function writeU32(buf, value, offset) {
          buf[offset] = value >>> 24;
          buf[offset + 1] = value >> 16 & 0xff;
          buf[offset + 2] = value >> 8 & 0xff;
          buf[offset + 3] = value & 0xff;
        }

        function readU32(buf, offset) {
          return (buf[offset] & 0xff) * 0x1000000 + ((buf[offset + 1] & 0xff) << 16 | (buf[offset + 2] & 0xff) << 8 | buf[offset + 3] & 0xff);
        }

        /*
         * Expose
         */

        mods.exps = SHA256;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./hmac": 45,
      "assert": 1,
      "buffer": 4
    }],
    55: [function (bcryptoReq, mods, exps) {
      /*!
       * sha3.js - SHA3 implementation for bcoin
       * Copyright (c) 2017, Christopher Jeffrey (MIT License).
       * https://github.com/bcoin-org/bcoin
       */

      'use strict';

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var Keccak = bcryptoReq('./keccak');

      /**
       * SHA3
       */

      var SHA3 = function (_Keccak) {
        _inherits(SHA3, _Keccak);

        /**
         * Create a SHA3 Context.
         * @constructor
         */

        function SHA3() {
          _classCallCheck(this, SHA3);

          return _possibleConstructorReturn(this, _Keccak.call(this));
        }

        SHA3.prototype.final = function final() {
          return _Keccak.prototype.final.call(this, true);
        };

        SHA3.hash = function hash() {
          return new SHA3();
        };

        SHA3.hmac = function hmac() {
          throw new Error('Not implemented.');
        };

        SHA3.digest = function digest(data) {
          var bits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;

          return _Keccak.digest.call(this, data, bits, true);
        };

        SHA3.root = function root(left, right) {
          var bits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;

          return _Keccak.root.call(this, left, right, bits, true);
        };

        SHA3.mac = function mac(data, key) {
          var bits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;

          throw new Error('Not implemented.');
        };

        return SHA3;
      }(Keccak);

      /*
       * Expose
       */

      mods.exps = SHA3;

    }, {
      "./keccak": 46
    }],
    56: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        /*!
         * sha512.js - SHA512 implementation for bcoin
         * Copyright (c) 2017, Christopher Jeffrey (MIT License).
         * https://github.com/bcoin-org/bcoin
         * Parts of this software based on hash.js.
         */

        /* eslint camelcase: "off" */

        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var assert = bcryptoReq('assert');
        var HMAC = bcryptoReq('./hmac');

        /*
         * Constants
         */

        var FINALIZED = -1;
        var DESC = Buffer.alloc(16, 0x00);
        var PADDING = Buffer.alloc(128, 0x00);

        PADDING[0] = 0x80;

        var K = new Uint32Array([0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817]);

        var ctx = null;

        /**
         * SHA512
         */

        var SHA512 = function () {
          /**
           * Create a SHA512 context.
           * @constructor
           */

          function SHA512() {
            _classCallCheck(this, SHA512);

            this.state = new Uint32Array(16);
            this.msg = new Uint32Array(160);
            this.block = Buffer.allocUnsafe(128);
            this.size = FINALIZED;
          }

          /**
           * Initialize SHA512 context.
           */

          SHA512.prototype.init = function init() {
            this.state[0] = 0x6a09e667;
            this.state[1] = 0xf3bcc908;
            this.state[2] = 0xbb67ae85;
            this.state[3] = 0x84caa73b;
            this.state[4] = 0x3c6ef372;
            this.state[5] = 0xfe94f82b;
            this.state[6] = 0xa54ff53a;
            this.state[7] = 0x5f1d36f1;
            this.state[8] = 0x510e527f;
            this.state[9] = 0xade682d1;
            this.state[10] = 0x9b05688c;
            this.state[11] = 0x2b3e6c1f;
            this.state[12] = 0x1f83d9ab;
            this.state[13] = 0xfb41bd6b;
            this.state[14] = 0x5be0cd19;
            this.state[15] = 0x137e2179;
            this.size = 0;
            return this;
          };

          /**
           * Update SHA512 context.
           * @param {Buffer} data
           */

          SHA512.prototype.update = function update(data) {
            assert(Buffer.isBuffer(data));
            this._update(data, data.length);
            return this;
          };

          /**
           * Finalize SHA512 context.
           * @returns {Buffer}
           */

          SHA512.prototype.final = function final() {
            return this._final(Buffer.allocUnsafe(64));
          };

          /**
           * Update SHA512 context.
           * @private
           * @param {Buffer} data
           * @param {Number} len
           */

          SHA512.prototype._update = function _update(data, len) {
            assert(this.size !== FINALIZED, 'Context already finalized.');

            var pos = this.size & 0x7f;
            var off = 0;

            this.size += len;

            if (pos > 0) {
              var want = 128 - pos;

              if (want > len) want = len;

              data.copy(this.block, pos, off, off + want);

              pos += want;
              len -= want;
              off += want;

              if (pos < 128) return;

              this.transform(this.block, 0);
            }

            while (len >= 128) {
              this.transform(data, off);
              off += 128;
              len -= 128;
            }

            if (len > 0) data.copy(this.block, 0, off, off + len);
          };

          /**
           * Finalize SHA512 context.
           * @private
           * @param {Buffer} out
           * @returns {Buffer}
           */

          SHA512.prototype._final = function _final(out) {
            assert(this.size !== FINALIZED, 'Context already finalized.');

            var pos = this.size % 128;
            var len = this.size * 8;

            writeU32(DESC, len * (1 / 0x100000000), 8);
            writeU32(DESC, len, 12);

            this._update(PADDING, 1 + (239 - pos) % 128);
            this._update(DESC, 16);

            for (var i = 0; i < 16; i++) {
              writeU32(out, this.state[i], i * 4);
              this.state[i] = 0;
            }

            for (var _i = 0; _i < 160; _i++) {
              this.msg[_i] = 0;
            }
            for (var _i2 = 0; _i2 < 128; _i2++) {
              this.block[_i2] = 0;
            }
            this.size = FINALIZED;

            return out;
          };

          /**
           * Prepare SHA512 block.
           * @param {Buffer} chunk
           * @param {Number} pos
           */

          SHA512.prototype.prepare = function prepare(chunk, pos) {
            var W = this.msg;

            var i = 0;

            for (; i < 32; i++) {
              W[i] = readU32(chunk, pos + i * 4);
            }
            for (; i < 160; i += 2) {
              var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
              var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
              var c1_hi = W[i - 14];
              var c1_lo = W[i - 13];
              var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
              var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
              var c3_hi = W[i - 32];
              var c3_lo = W[i - 31];

              W[i] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);

              W[i + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
            }
          };

          /**
           * Transform SHA512 block.
           * @param {Buffer} chunk
           * @param {Number} pos
           */

          SHA512.prototype.transform = function transform(chunk, pos) {
            var W = this.msg;

            this.prepare(chunk, pos);

            var ah = this.state[0];
            var al = this.state[1];
            var bh = this.state[2];
            var bl = this.state[3];
            var ch = this.state[4];
            var cl = this.state[5];
            var dh = this.state[6];
            var dl = this.state[7];
            var eh = this.state[8];
            var el = this.state[9];
            var fh = this.state[10];
            var fl = this.state[11];
            var gh = this.state[12];
            var gl = this.state[13];
            var hh = this.state[14];
            var hl = this.state[15];

            for (var i = 0; i < W.length; i += 2) {
              var c0_hi = hh;
              var c0_lo = hl;
              var c1_hi = s1_512_hi(eh, el);
              var c1_lo = s1_512_lo(eh, el);

              var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
              var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
              var c3_hi = K[i];
              var c3_lo = K[i + 1];
              var c4_hi = W[i];
              var c4_lo = W[i + 1];

              var T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
              var T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);

              c0_hi = s0_512_hi(ah, al);
              c0_lo = s0_512_lo(ah, al);
              c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
              c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

              var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
              var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

              hh = gh;
              hl = gl;

              gh = fh;
              gl = fl;

              fh = eh;
              fl = el;

              eh = sum64_hi(dh, dl, T1_hi, T1_lo);
              el = sum64_lo(dl, dl, T1_hi, T1_lo);

              dh = ch;
              dl = cl;

              ch = bh;
              cl = bl;

              bh = ah;
              bl = al;

              ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
              al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
            }

            sum64(this.state, 0, ah, al);
            sum64(this.state, 2, bh, bl);
            sum64(this.state, 4, ch, cl);
            sum64(this.state, 6, dh, dl);
            sum64(this.state, 8, eh, el);
            sum64(this.state, 10, fh, fl);
            sum64(this.state, 12, gh, gl);
            sum64(this.state, 14, hh, hl);
          };

          SHA512.hash = function hash() {
            return new SHA512();
          };

          SHA512.hmac = function hmac() {
            return new HMAC(SHA512, 128);
          };

          SHA512.digest = function digest(data) {
            return ctx.init().update(data).final();
          };

          SHA512.root = function root(left, right) {
            assert(Buffer.isBuffer(left) && left.length === 64);
            assert(Buffer.isBuffer(right) && right.length === 64);
            return ctx.init().update(left).update(right).final();
          };

          SHA512.mac = function mac(data, key) {
            return SHA512.hmac().init(key).update(data).final();
          };

          return SHA512;
        }();

        /*
         * Global Context
         */

        ctx = new SHA512();

        /*
         * Helpers
         */

        function sum64(buf, pos, ah, al) {
          var bh = buf[pos];
          var bl = buf[pos + 1];

          var lo = al + bl >>> 0;
          var hi = (lo < al ? 1 : 0) + ah + bh;

          buf[pos] = hi >>> 0;
          buf[pos + 1] = lo;
        }

        function sum64_hi(ah, al, bh, bl) {
          var lo = al + bl >>> 0;
          var hi = (lo < al ? 1 : 0) + ah + bh;
          return hi >>> 0;
        }

        function sum64_lo(ah, al, bh, bl) {
          var lo = al + bl;
          return lo >>> 0;
        }

        function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
          var carry = 0;
          var lo = al;

          lo = lo + bl >>> 0;
          carry += lo < al ? 1 : 0;
          lo = lo + cl >>> 0;
          carry += lo < cl ? 1 : 0;
          lo = lo + dl >>> 0;
          carry += lo < dl ? 1 : 0;

          var hi = ah + bh + ch + dh + carry;
          return hi >>> 0;
        }

        function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
          var lo = al + bl + cl + dl;
          return lo >>> 0;
        }

        function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
          var carry = 0;
          var lo = al;

          lo = lo + bl >>> 0;
          carry += lo < al ? 1 : 0;
          lo = lo + cl >>> 0;
          carry += lo < cl ? 1 : 0;
          lo = lo + dl >>> 0;
          carry += lo < dl ? 1 : 0;
          lo = lo + el >>> 0;
          carry += lo < el ? 1 : 0;

          var hi = ah + bh + ch + dh + eh + carry;

          return hi >>> 0;
        }

        function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
          var lo = al + bl + cl + dl + el;
          return lo >>> 0;
        }

        function rotr64_hi(ah, al, num) {
          var r = al << 32 - num | ah >>> num;
          return r >>> 0;
        }

        function rotr64_lo(ah, al, num) {
          var r = ah << 32 - num | al >>> num;
          return r >>> 0;
        }

        function shr64_hi(ah, al, num) {
          return ah >>> num;
        }

        function shr64_lo(ah, al, num) {
          var r = ah << 32 - num | al >>> num;
          return r >>> 0;
        }

        function ch64_hi(xh, xl, yh, yl, zh) {
          var r = xh & yh ^ ~xh & zh;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function ch64_lo(xh, xl, yh, yl, zh, zl) {
          var r = xl & yl ^ ~xl & zl;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function maj64_hi(xh, xl, yh, yl, zh) {
          var r = xh & yh ^ xh & zh ^ yh & zh;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function maj64_lo(xh, xl, yh, yl, zh, zl) {
          var r = xl & yl ^ xl & zl ^ yl & zl;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function s0_512_hi(xh, xl) {
          var c0_hi = rotr64_hi(xh, xl, 28);
          var c1_hi = rotr64_hi(xl, xh, 2); // 34
          var c2_hi = rotr64_hi(xl, xh, 7); // 39

          var r = c0_hi ^ c1_hi ^ c2_hi;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function s0_512_lo(xh, xl) {
          var c0_lo = rotr64_lo(xh, xl, 28);
          var c1_lo = rotr64_lo(xl, xh, 2); // 34
          var c2_lo = rotr64_lo(xl, xh, 7); // 39

          var r = c0_lo ^ c1_lo ^ c2_lo;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function s1_512_hi(xh, xl) {
          var c0_hi = rotr64_hi(xh, xl, 14);
          var c1_hi = rotr64_hi(xh, xl, 18);
          var c2_hi = rotr64_hi(xl, xh, 9); // 41

          var r = c0_hi ^ c1_hi ^ c2_hi;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function s1_512_lo(xh, xl) {
          var c0_lo = rotr64_lo(xh, xl, 14);
          var c1_lo = rotr64_lo(xh, xl, 18);
          var c2_lo = rotr64_lo(xl, xh, 9); // 41

          var r = c0_lo ^ c1_lo ^ c2_lo;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function g0_512_hi(xh, xl) {
          var c0_hi = rotr64_hi(xh, xl, 1);
          var c1_hi = rotr64_hi(xh, xl, 8);
          var c2_hi = shr64_hi(xh, xl, 7);

          var r = c0_hi ^ c1_hi ^ c2_hi;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function g0_512_lo(xh, xl) {
          var c0_lo = rotr64_lo(xh, xl, 1);
          var c1_lo = rotr64_lo(xh, xl, 8);
          var c2_lo = shr64_lo(xh, xl, 7);

          var r = c0_lo ^ c1_lo ^ c2_lo;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function g1_512_hi(xh, xl) {
          var c0_hi = rotr64_hi(xh, xl, 19);
          var c1_hi = rotr64_hi(xl, xh, 29); // 61
          var c2_hi = shr64_hi(xh, xl, 6);

          var r = c0_hi ^ c1_hi ^ c2_hi;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function g1_512_lo(xh, xl) {
          var c0_lo = rotr64_lo(xh, xl, 19);
          var c1_lo = rotr64_lo(xl, xh, 29); // 61
          var c2_lo = shr64_lo(xh, xl, 6);

          var r = c0_lo ^ c1_lo ^ c2_lo;

          if (r < 0) r += 0x100000000;

          return r;
        }

        function writeU32(buf, value, offset) {
          buf[offset] = value >>> 24;
          buf[offset + 1] = value >> 16 & 0xff;
          buf[offset + 2] = value >> 8 & 0xff;
          buf[offset + 3] = value & 0xff;
        }

        function readU32(buf, offset) {
          return (buf[offset] & 0xff) * 0x1000000 + ((buf[offset + 1] & 0xff) << 16 | (buf[offset + 2] & 0xff) << 8 | buf[offset + 3] & 0xff);
        }

        /*
         * Expose
         */

        mods.exps = SHA512;

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./hmac": 45,
      "assert": 1,
      "buffer": 4
    }],
    57: [function (bcryptoReq, mods, exps) {
      // Reference https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
      // Format: 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
      // NOTE: SIGHASH byte ignored AND restricted, truncate before use

      var Buffer = bcryptoReq('safe-buffer').Buffer

      function check(buffer) {
        if (buffer.length < 8) return false
        if (buffer.length > 72) return false
        if (buffer[0] !== 0x30) return false
        if (buffer[1] !== buffer.length - 2) return false
        if (buffer[2] !== 0x02) return false

        var lenR = buffer[3]
        if (lenR === 0) return false
        if (5 + lenR >= buffer.length) return false
        if (buffer[4 + lenR] !== 0x02) return false

        var lenS = buffer[5 + lenR]
        if (lenS === 0) return false
        if ((6 + lenR + lenS) !== buffer.length) return false

        if (buffer[4] & 0x80) return false
        if (lenR > 1 && (buffer[4] === 0x00) && !(buffer[5] & 0x80)) return false

        if (buffer[lenR + 6] & 0x80) return false
        if (lenS > 1 && (buffer[lenR + 6] === 0x00) && !(buffer[lenR + 7] & 0x80)) return false
        return true
      }

      function decode(buffer) {
        if (buffer.length < 8) throw new Error('DER sequence length is too short')
        if (buffer.length > 72) throw new Error('DER sequence length is too long')
        if (buffer[0] !== 0x30) throw new Error('Expected DER sequence')
        if (buffer[1] !== buffer.length - 2) throw new Error('DER sequence length is invalid')
        if (buffer[2] !== 0x02) throw new Error('Expected DER integer')

        var lenR = buffer[3]
        if (lenR === 0) throw new Error('R length is zero')
        if (5 + lenR >= buffer.length) throw new Error('R length is too long')
        if (buffer[4 + lenR] !== 0x02) throw new Error('Expected DER integer (2)')

        var lenS = buffer[5 + lenR]
        if (lenS === 0) throw new Error('S length is zero')
        if ((6 + lenR + lenS) !== buffer.length) throw new Error('S length is invalid')

        if (buffer[4] & 0x80) throw new Error('R value is negative')
        if (lenR > 1 && (buffer[4] === 0x00) && !(buffer[5] & 0x80)) throw new Error('R value excessively padded')

        if (buffer[lenR + 6] & 0x80) throw new Error('S value is negative')
        if (lenS > 1 && (buffer[lenR + 6] === 0x00) && !(buffer[lenR + 7] & 0x80)) throw new Error('S value excessively padded')

        // non-BIP66 - extract R, S values
        return {
          r: buffer.slice(4, 4 + lenR),
          s: buffer.slice(6 + lenR)
        }
      }

      /*
       * Expects r and s to be positive DER integers.
       *
       * The DER format uses the most significant bit as a sign bit (& 0x80).
       * If the significant bit is set AND the integer is positive, a 0x00 is prepended.
       *
       * Examples:
       *
       *      0 =>     0x00
       *      1 =>     0x01
       *     -1 =>     0xff
       *    127 =>     0x7f
       *   -127 =>     0x81
       *    128 =>   0x0080
       *   -128 =>     0x80
       *    255 =>   0x00ff
       *   -255 =>   0xff01
       *  16300 =>   0x3fac
       * -16300 =>   0xc054
       *  62300 => 0x00f35c
       * -62300 => 0xff0ca4
       */
      function encode(r, s) {
        var lenR = r.length
        var lenS = s.length
        if (lenR === 0) throw new Error('R length is zero')
        if (lenS === 0) throw new Error('S length is zero')
        if (lenR > 33) throw new Error('R length is too long')
        if (lenS > 33) throw new Error('S length is too long')
        if (r[0] & 0x80) throw new Error('R value is negative')
        if (s[0] & 0x80) throw new Error('S value is negative')
        if (lenR > 1 && (r[0] === 0x00) && !(r[1] & 0x80)) throw new Error('R value excessively padded')
        if (lenS > 1 && (s[0] === 0x00) && !(s[1] & 0x80)) throw new Error('S value excessively padded')

        var signature = Buffer.allocUnsafe(6 + lenR + lenS)

        // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
        signature[0] = 0x30
        signature[1] = signature.length - 2
        signature[2] = 0x02
        signature[3] = r.length
        r.copy(signature, 4)
        signature[4 + lenR] = 0x02
        signature[5 + lenR] = s.length
        s.copy(signature, 6 + lenR)

        return signature
      }

      mods.exps = {
        check: check,
        decode: decode,
        encode: encode
      }

    }, {
      "safe-buffer": 69
    }],
    58: [function (bcryptoReq, mods, exps) {
      var Buffer = bcryptoReq('safe-buffer').Buffer
      var Transform = bcryptoReq('stream').Transform
      var StringDecoder = bcryptoReq('string_decoder').StringDecoder
      var inherits = bcryptoReq('inherits')

      function CipherBase(hashMode) {
        Transform.call(this)
        this.hashMode = typeof hashMode === 'string'
        if (this.hashMode) {
          this[hashMode] = this._finalOrDigest
        } else {
          this.final = this._finalOrDigest
        }
        if (this._final) {
          this.__final = this._final
          this._final = null
        }
        this._decoder = null
        this._encoding = null
      }
      inherits(CipherBase, Transform)

      CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
        if (typeof data === 'string') {
          data = Buffer.from(data, inputEnc)
        }

        var outData = this._update(data)
        if (this.hashMode) return this

        if (outputEnc) {
          outData = this._toString(outData, outputEnc)
        }

        return outData
      }

      CipherBase.prototype.setAutoPadding = function () {}
      CipherBase.prototype.getAuthTag = function () {
        throw new Error('trying to get auth tag in unsupported state')
      }

      CipherBase.prototype.setAuthTag = function () {
        throw new Error('trying to set auth tag in unsupported state')
      }

      CipherBase.prototype.setAAD = function () {
        throw new Error('trying to set aad in unsupported state')
      }

      CipherBase.prototype._transform = function (data, _, next) {
        var err
        try {
          if (this.hashMode) {
            this._update(data)
          } else {
            this.push(this._update(data))
          }
        } catch (e) {
          err = e
        } finally {
          next(err)
        }
      }
      CipherBase.prototype._flush = function (done) {
        var err
        try {
          this.push(this.__final())
        } catch (e) {
          err = e
        }

        done(err)
      }
      CipherBase.prototype._finalOrDigest = function (outputEnc) {
        var outData = this.__final() || Buffer.alloc(0)
        if (outputEnc) {
          outData = this._toString(outData, outputEnc, true)
        }
        return outData
      }

      CipherBase.prototype._toString = function (value, enc, fin) {
        if (!this._decoder) {
          this._decoder = new StringDecoder(enc)
          this._encoding = enc
        }

        if (this._encoding !== enc) throw new Error('can\'t switch encodings')

        var out = this._decoder.write(value)
        if (fin) {
          out += this._decoder.end()
        }

        return out
      }

      mods.exps = CipherBase

    }, {
      "inherits": 66,
      "safe-buffer": 69,
      "stream": 27,
      "string_decoder": 28
    }],
    59: [function (bcryptoReq, mods, exps) {
      'use strict'
      var inherits = bcryptoReq('inherits')
      var MD5 = bcryptoReq('md5.js')
      var RIPEMD160 = bcryptoReq('ripemd160')
      var sha = bcryptoReq('sha.js')
      var Base = bcryptoReq('cipher-base')

      function Hash(hash) {
        Base.call(this, 'digest')

        this._hash = hash
      }

      inherits(Hash, Base)

      Hash.prototype._update = function (data) {
        this._hash.update(data)
      }

      Hash.prototype._final = function () {
        return this._hash.digest()
      }

      mods.exps = function createHash(alg) {
        alg = alg.toLowerCase()
        if (alg === 'md5') return new MD5()
        if (alg === 'rmd160' || alg === 'ripemd160') return new RIPEMD160()

        return new Hash(sha(alg))
      }

    }, {
      "cipher-base": 58,
      "inherits": 66,
      "md5.js": 67,
      "ripemd160": 68,
      "sha.js": 82
    }],
    60: [function (bcryptoReq, mods, exps) {
      var MD5 = bcryptoReq('md5.js')

      mods.exps = function (buffer) {
        return new MD5().update(buffer).digest()
      }

    }, {
      "md5.js": 67
    }],
    61: [function (bcryptoReq, mods, exps) {
      'use strict'
      var inherits = bcryptoReq('inherits')
      var Legacy = bcryptoReq('./legacy')
      var Base = bcryptoReq('cipher-base')
      var Buffer = bcryptoReq('safe-buffer').Buffer
      var md5 = bcryptoReq('create-hash/md5')
      var RIPEMD160 = bcryptoReq('ripemd160')

      var sha = bcryptoReq('sha.js')

      var ZEROS = Buffer.alloc(128)

      function Hmac(alg, key) {
        Base.call(this, 'digest')
        if (typeof key === 'string') {
          key = Buffer.from(key)
        }

        var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

        this._alg = alg
        this._key = key
        if (key.length > blocksize) {
          var hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
          key = hash.update(key).digest()
        } else if (key.length < blocksize) {
          key = Buffer.concat([key, ZEROS], blocksize)
        }

        var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
        var opad = this._opad = Buffer.allocUnsafe(blocksize)

        for (var i = 0; i < blocksize; i++) {
          ipad[i] = key[i] ^ 0x36
          opad[i] = key[i] ^ 0x5C
        }
        this._hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
        this._hash.update(ipad)
      }

      inherits(Hmac, Base)

      Hmac.prototype._update = function (data) {
        this._hash.update(data)
      }

      Hmac.prototype._final = function () {
        var h = this._hash.digest()
        var hash = this._alg === 'rmd160' ? new RIPEMD160() : sha(this._alg)
        return hash.update(this._opad).update(h).digest()
      }

      mods.exps = function createHmac(alg, key) {
        alg = alg.toLowerCase()
        if (alg === 'rmd160' || alg === 'ripemd160') {
          return new Hmac('rmd160', key)
        }
        if (alg === 'md5') {
          return new Legacy(md5, key)
        }
        return new Hmac(alg, key)
      }

    }, {
      "./legacy": 62,
      "cipher-base": 58,
      "create-hash/md5": 60,
      "inherits": 66,
      "ripemd160": 68,
      "safe-buffer": 69,
      "sha.js": 82
    }],
    62: [function (bcryptoReq, mods, exps) {
      'use strict'
      var inherits = bcryptoReq('inherits')
      var Buffer = bcryptoReq('safe-buffer').Buffer

      var Base = bcryptoReq('cipher-base')

      var ZEROS = Buffer.alloc(128)
      var blocksize = 64

      function Hmac(alg, key) {
        Base.call(this, 'digest')
        if (typeof key === 'string') {
          key = Buffer.from(key)
        }

        this._alg = alg
        this._key = key

        if (key.length > blocksize) {
          key = alg(key)
        } else if (key.length < blocksize) {
          key = Buffer.concat([key, ZEROS], blocksize)
        }

        var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
        var opad = this._opad = Buffer.allocUnsafe(blocksize)

        for (var i = 0; i < blocksize; i++) {
          ipad[i] = key[i] ^ 0x36
          opad[i] = key[i] ^ 0x5C
        }

        this._hash = [ipad]
      }

      inherits(Hmac, Base)

      Hmac.prototype._update = function (data) {
        this._hash.push(data)
      }

      Hmac.prototype._final = function () {
        var h = this._alg(Buffer.concat(this._hash))
        return this._alg(Buffer.concat([this._opad, h]))
      }
      mods.exps = Hmac

    }, {
      "cipher-base": 58,
      "inherits": 66,
      "safe-buffer": 69
    }],
    63: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        'use strict'
        var createHmac = bcryptoReq('create-hmac')
        var hashInfo = bcryptoReq('./lib/hash-info.json')

        var ebuf = new Buffer(0)
        var b0x00 = new Buffer([0x00])
        var b0x01 = new Buffer([0x01])

        function HmacDRBG(algo, entropy, nonce, pers) {
          var info = hashInfo[algo]
          if (info === undefined) throw new Error('hash ' + algo + ' is not supported')

          this._algo = algo
          this._securityStrength = info.securityStrength / 8
          this._outlen = info.outlen / 8
          this._reseedInterval = 0x1000000000000 // 2**48

          this._init(entropy, nonce, pers)
        }

        HmacDRBG.prototype._update = function (seed) {
          var kmac = createHmac(this._algo, this._K).update(this._V).update(b0x00)
          if (seed) kmac.update(seed)

          this._K = kmac.digest()
          this._V = createHmac(this._algo, this._K).update(this._V).digest()
          if (!seed) return

          this._K = createHmac(this._algo, this._K).update(this._V).update(b0x01).update(seed).digest()
          this._V = createHmac(this._algo, this._K).update(this._V).digest()
        }

        HmacDRBG.prototype._init = function (entropy, nonce, pers) {
          if (entropy.length < this._securityStrength) throw new Error('Not enough entropy')

          this._K = new Buffer(this._outlen)
          this._V = new Buffer(this._outlen)
          for (var i = 0; i < this._K.length; ++i) {
            this._K[i] = 0x00
            this._V[i] = 0x01
          }

          this._update(Buffer.concat([entropy, nonce, pers || ebuf]))
          this._reseed = 1
        }

        HmacDRBG.prototype.reseed = function (entropy, add) {
          if (entropy.length < this._securityStrength) throw new Error('Not enough entropy')

          this._update(Buffer.concat([entropy, add || ebuf]))
          this._reseed = 1
        }

        HmacDRBG.prototype.generate = function (len, add) {
          if (this._reseed > this._reseedInterval) throw new Error('Reseed is required')

          if (add && add.length === 0) add = undefined
          if (add) this._update(add)

          var temp = new Buffer(0)
          while (temp.length < len) {
            this._V = createHmac(this._algo, this._K).update(this._V).digest()
            temp = Buffer.concat([temp, this._V])
          }

          this._update(add)
          this._reseed += 1
          return temp.slice(0, len)
        }

        mods.exps = HmacDRBG

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "./lib/hash-info.json": 64,
      "buffer": 4,
      "create-hmac": 61
    }],
    64: [function (bcryptoReq, mods, exps) {
      mods.exps = {
        "sha1": {
          "securityStrength": 128,
          "outlen": 160,
          "seedlen": 440
        },
        "sha224": {
          "securityStrength": 192,
          "outlen": 224,
          "seedlen": 440
        },
        "sha256": {
          "securityStrength": 256,
          "outlen": 256,
          "seedlen": 440
        },
        "sha384": {
          "securityStrength": 256,
          "outlen": 384,
          "seedlen": 888
        },
        "sha512": {
          "securityStrength": 256,
          "outlen": 512,
          "seedlen": 888
        }
      }

    }, {}],
    65: [function (bcryptoReq, mods, exps) {
      'use strict'
      var Buffer = bcryptoReq('safe-buffer').Buffer
      var Transform = bcryptoReq('stream').Transform
      var inherits = bcryptoReq('inherits')

      function throwIfNotStringOrBuffer(val, prefix) {
        if (!Buffer.isBuffer(val) && typeof val !== 'string') {
          throw new TypeError(prefix + ' must be a string or a buffer')
        }
      }

      function HashBase(blockSize) {
        Transform.call(this)

        this._block = Buffer.allocUnsafe(blockSize)
        this._blockSize = blockSize
        this._blockOffset = 0
        this._length = [0, 0, 0, 0]

        this._finalized = false
      }

      inherits(HashBase, Transform)

      HashBase.prototype._transform = function (chunk, encoding, callback) {
        var error = null
        try {
          this.update(chunk, encoding)
        } catch (err) {
          error = err
        }

        callback(error)
      }

      HashBase.prototype._flush = function (callback) {
        var error = null
        try {
          this.push(this.digest())
        } catch (err) {
          error = err
        }

        callback(error)
      }

      HashBase.prototype.update = function (data, encoding) {
        throwIfNotStringOrBuffer(data, 'Data')
        if (this._finalized) throw new Error('Digest already called')
        if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding)

        // consume data
        var block = this._block
        var offset = 0
        while (this._blockOffset + data.length - offset >= this._blockSize) {
          for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++]
          this._update()
          this._blockOffset = 0
        }
        while (offset < data.length) block[this._blockOffset++] = data[offset++]

        // update length
        for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
          this._length[j] += carry
          carry = (this._length[j] / 0x0100000000) | 0
          if (carry > 0) this._length[j] -= 0x0100000000 * carry
        }

        return this
      }

      HashBase.prototype._update = function () {
        throw new Error('_update is not implemented')
      }

      HashBase.prototype.digest = function (encoding) {
        if (this._finalized) throw new Error('Digest already called')
        this._finalized = true

        var digest = this._digest()
        if (encoding !== undefined) digest = digest.toString(encoding)

        // reset state
        this._block.fill(0)
        this._blockOffset = 0
        for (var i = 0; i < 4; ++i) this._length[i] = 0

        return digest
      }

      HashBase.prototype._digest = function () {
        throw new Error('_digest is not implemented')
      }

      mods.exps = HashBase

    }, {
      "inherits": 66,
      "safe-buffer": 69,
      "stream": 27
    }],
    66: [function (bcryptoReq, mods, exps) {
      arguments[4][8][0].apply(exps, arguments)
    }, {
      "dup": 8
    }],
    67: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        'use strict'
        var inherits = bcryptoReq('inherits')
        var HashBase = bcryptoReq('hash-base')

        var ARRAY16 = new Array(16)

        function MD5() {
          HashBase.call(this, 64)

          // state
          this._a = 0x67452301
          this._b = 0xefcdab89
          this._c = 0x98badcfe
          this._d = 0x10325476
        }

        inherits(MD5, HashBase)

        MD5.prototype._update = function () {
          var M = ARRAY16
          for (var i = 0; i < 16; ++i) M[i] = this._block.readInt32LE(i * 4)

          var a = this._a
          var b = this._b
          var c = this._c
          var d = this._d

          a = fnF(a, b, c, d, M[0], 0xd76aa478, 7)
          d = fnF(d, a, b, c, M[1], 0xe8c7b756, 12)
          c = fnF(c, d, a, b, M[2], 0x242070db, 17)
          b = fnF(b, c, d, a, M[3], 0xc1bdceee, 22)
          a = fnF(a, b, c, d, M[4], 0xf57c0faf, 7)
          d = fnF(d, a, b, c, M[5], 0x4787c62a, 12)
          c = fnF(c, d, a, b, M[6], 0xa8304613, 17)
          b = fnF(b, c, d, a, M[7], 0xfd469501, 22)
          a = fnF(a, b, c, d, M[8], 0x698098d8, 7)
          d = fnF(d, a, b, c, M[9], 0x8b44f7af, 12)
          c = fnF(c, d, a, b, M[10], 0xffff5bb1, 17)
          b = fnF(b, c, d, a, M[11], 0x895cd7be, 22)
          a = fnF(a, b, c, d, M[12], 0x6b901122, 7)
          d = fnF(d, a, b, c, M[13], 0xfd987193, 12)
          c = fnF(c, d, a, b, M[14], 0xa679438e, 17)
          b = fnF(b, c, d, a, M[15], 0x49b40821, 22)

          a = fnG(a, b, c, d, M[1], 0xf61e2562, 5)
          d = fnG(d, a, b, c, M[6], 0xc040b340, 9)
          c = fnG(c, d, a, b, M[11], 0x265e5a51, 14)
          b = fnG(b, c, d, a, M[0], 0xe9b6c7aa, 20)
          a = fnG(a, b, c, d, M[5], 0xd62f105d, 5)
          d = fnG(d, a, b, c, M[10], 0x02441453, 9)
          c = fnG(c, d, a, b, M[15], 0xd8a1e681, 14)
          b = fnG(b, c, d, a, M[4], 0xe7d3fbc8, 20)
          a = fnG(a, b, c, d, M[9], 0x21e1cde6, 5)
          d = fnG(d, a, b, c, M[14], 0xc33707d6, 9)
          c = fnG(c, d, a, b, M[3], 0xf4d50d87, 14)
          b = fnG(b, c, d, a, M[8], 0x455a14ed, 20)
          a = fnG(a, b, c, d, M[13], 0xa9e3e905, 5)
          d = fnG(d, a, b, c, M[2], 0xfcefa3f8, 9)
          c = fnG(c, d, a, b, M[7], 0x676f02d9, 14)
          b = fnG(b, c, d, a, M[12], 0x8d2a4c8a, 20)

          a = fnH(a, b, c, d, M[5], 0xfffa3942, 4)
          d = fnH(d, a, b, c, M[8], 0x8771f681, 11)
          c = fnH(c, d, a, b, M[11], 0x6d9d6122, 16)
          b = fnH(b, c, d, a, M[14], 0xfde5380c, 23)
          a = fnH(a, b, c, d, M[1], 0xa4beea44, 4)
          d = fnH(d, a, b, c, M[4], 0x4bdecfa9, 11)
          c = fnH(c, d, a, b, M[7], 0xf6bb4b60, 16)
          b = fnH(b, c, d, a, M[10], 0xbebfbc70, 23)
          a = fnH(a, b, c, d, M[13], 0x289b7ec6, 4)
          d = fnH(d, a, b, c, M[0], 0xeaa127fa, 11)
          c = fnH(c, d, a, b, M[3], 0xd4ef3085, 16)
          b = fnH(b, c, d, a, M[6], 0x04881d05, 23)
          a = fnH(a, b, c, d, M[9], 0xd9d4d039, 4)
          d = fnH(d, a, b, c, M[12], 0xe6db99e5, 11)
          c = fnH(c, d, a, b, M[15], 0x1fa27cf8, 16)
          b = fnH(b, c, d, a, M[2], 0xc4ac5665, 23)

          a = fnI(a, b, c, d, M[0], 0xf4292244, 6)
          d = fnI(d, a, b, c, M[7], 0x432aff97, 10)
          c = fnI(c, d, a, b, M[14], 0xab9423a7, 15)
          b = fnI(b, c, d, a, M[5], 0xfc93a039, 21)
          a = fnI(a, b, c, d, M[12], 0x655b59c3, 6)
          d = fnI(d, a, b, c, M[3], 0x8f0ccc92, 10)
          c = fnI(c, d, a, b, M[10], 0xffeff47d, 15)
          b = fnI(b, c, d, a, M[1], 0x85845dd1, 21)
          a = fnI(a, b, c, d, M[8], 0x6fa87e4f, 6)
          d = fnI(d, a, b, c, M[15], 0xfe2ce6e0, 10)
          c = fnI(c, d, a, b, M[6], 0xa3014314, 15)
          b = fnI(b, c, d, a, M[13], 0x4e0811a1, 21)
          a = fnI(a, b, c, d, M[4], 0xf7537e82, 6)
          d = fnI(d, a, b, c, M[11], 0xbd3af235, 10)
          c = fnI(c, d, a, b, M[2], 0x2ad7d2bb, 15)
          b = fnI(b, c, d, a, M[9], 0xeb86d391, 21)

          this._a = (this._a + a) | 0
          this._b = (this._b + b) | 0
          this._c = (this._c + c) | 0
          this._d = (this._d + d) | 0
        }

        MD5.prototype._digest = function () {
          // create padding and handle blocks
          this._block[this._blockOffset++] = 0x80
          if (this._blockOffset > 56) {
            this._block.fill(0, this._blockOffset, 64)
            this._update()
            this._blockOffset = 0
          }

          this._block.fill(0, this._blockOffset, 56)
          this._block.writeUInt32LE(this._length[0], 56)
          this._block.writeUInt32LE(this._length[1], 60)
          this._update()

          // produce result
          var buffer = new Buffer(16)
          buffer.writeInt32LE(this._a, 0)
          buffer.writeInt32LE(this._b, 4)
          buffer.writeInt32LE(this._c, 8)
          buffer.writeInt32LE(this._d, 12)
          return buffer
        }

        function rotl(x, n) {
          return (x << n) | (x >>> (32 - n))
        }

        function fnF(a, b, c, d, m, k, s) {
          return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + b) | 0
        }

        function fnG(a, b, c, d, m, k, s) {
          return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + b) | 0
        }

        function fnH(a, b, c, d, m, k, s) {
          return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + b) | 0
        }

        function fnI(a, b, c, d, m, k, s) {
          return (rotl((a + ((c ^ (b | (~d)))) + m + k) | 0, s) + b) | 0
        }

        mods.exps = MD5

      }).call(this, bcryptoReq("buffer").Buffer)
    }, {
      "buffer": 4,
      "hash-base": 65,
      "inherits": 66
    }],
    68: [function (bcryptoReq, mods, exps) {
      'use strict'
      var Buffer = bcryptoReq('buffer').Buffer
      var inherits = bcryptoReq('inherits')
      var HashBase = bcryptoReq('hash-base')

      var ARRAY16 = new Array(16)

      var zl = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
        3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
        1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
        4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
      ]

      var zr = [
        5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
        6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
        15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
        8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
        12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
      ]

      var sl = [
        11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
        7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
        11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
        11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
        9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
      ]

      var sr = [
        8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
        9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
        9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
        15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
        8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
      ]

      var hl = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e]
      var hr = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000]

      function RIPEMD160() {
        HashBase.call(this, 64)

        // state
        this._a = 0x67452301
        this._b = 0xefcdab89
        this._c = 0x98badcfe
        this._d = 0x10325476
        this._e = 0xc3d2e1f0
      }

      inherits(RIPEMD160, HashBase)

      RIPEMD160.prototype._update = function () {
        var words = ARRAY16
        for (var j = 0; j < 16; ++j) words[j] = this._block.readInt32LE(j * 4)

        var al = this._a | 0
        var bl = this._b | 0
        var cl = this._c | 0
        var dl = this._d | 0
        var el = this._e | 0

        var ar = this._a | 0
        var br = this._b | 0
        var cr = this._c | 0
        var dr = this._d | 0
        var er = this._e | 0

        // computation
        for (var i = 0; i < 80; i += 1) {
          var tl
          var tr
          if (i < 16) {
            tl = fn1(al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i])
            tr = fn5(ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i])
          } else if (i < 32) {
            tl = fn2(al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i])
            tr = fn4(ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i])
          } else if (i < 48) {
            tl = fn3(al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i])
            tr = fn3(ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i])
          } else if (i < 64) {
            tl = fn4(al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i])
            tr = fn2(ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i])
          } else { // if (i<80) {
            tl = fn5(al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i])
            tr = fn1(ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i])
          }

          al = el
          el = dl
          dl = rotl(cl, 10)
          cl = bl
          bl = tl

          ar = er
          er = dr
          dr = rotl(cr, 10)
          cr = br
          br = tr
        }

        // update state
        var t = (this._b + cl + dr) | 0
        this._b = (this._c + dl + er) | 0
        this._c = (this._d + el + ar) | 0
        this._d = (this._e + al + br) | 0
        this._e = (this._a + bl + cr) | 0
        this._a = t
      }

      RIPEMD160.prototype._digest = function () {
        // create padding and handle blocks
        this._block[this._blockOffset++] = 0x80
        if (this._blockOffset > 56) {
          this._block.fill(0, this._blockOffset, 64)
          this._update()
          this._blockOffset = 0
        }

        this._block.fill(0, this._blockOffset, 56)
        this._block.writeUInt32LE(this._length[0], 56)
        this._block.writeUInt32LE(this._length[1], 60)
        this._update()

        // produce result
        var buffer = Buffer.alloc ? Buffer.alloc(20) : new Buffer(20)
        buffer.writeInt32LE(this._a, 0)
        buffer.writeInt32LE(this._b, 4)
        buffer.writeInt32LE(this._c, 8)
        buffer.writeInt32LE(this._d, 12)
        buffer.writeInt32LE(this._e, 16)
        return buffer
      }

      function rotl(x, n) {
        return (x << n) | (x >>> (32 - n))
      }

      function fn1(a, b, c, d, e, m, k, s) {
        return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
      }

      function fn2(a, b, c, d, e, m, k, s) {
        return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
      }

      function fn3(a, b, c, d, e, m, k, s) {
        return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
      }

      function fn4(a, b, c, d, e, m, k, s) {
        return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
      }

      function fn5(a, b, c, d, e, m, k, s) {
        return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
      }

      mods.exps = RIPEMD160

    }, {
      "buffer": 4,
      "hash-base": 65,
      "inherits": 66
    }],
    69: [function (bcryptoReq, mods, exps) {
      arguments[4][26][0].apply(exps, arguments)
    }, {
      "buffer": 4,
      "dup": 26
    }],
    70: [function (bcryptoReq, mods, exps) {
      'use strict'
      mods.exps = bcryptoReq('./lib')(bcryptoReq('./lib/js'))

    }, {
      "./lib": 73,
      "./lib/js": 79
    }],
    71: [function (bcryptoReq, mods, exps) {
      (function (Buffer) {
        'use strict'
        var toString = Object.prototype.toString

        // TypeError
        exps.isArray = function (value, message) {
          if (!Array.isArray(value)) throw TypeError(message)
        }

        exps.isBoolean = function (value, message) {
          if (toString.call(value) !== '[object Boolean]') throw TypeError(message)
        }

        exps.isBuffer = function (value, message) {
          if (!Buffer.isBuffer(value)) throw TypeError(message)
        }

        exps.isFunction = function (value, message) {
          if (toString.call(value) !== '[object Function]') throw TypeError(message)
        }

        exps.isNumber = function (value, message) {
          if (toString.call(value) !== '[object Number]') throw TypeError(message)
        }

        exps.isObject = function (value, message) {
          if (toString.call(value) !== '[object Object]') throw TypeError(message)
        }

        // RangeError
        exps.isBufferLength = function (buffer, length, message) {
          if (buffer.length !== length) throw RangeError(message)
        }

        exps.isBufferLength2 = function (buffer, length1, length2, message) {
          if (buffer.length !== length1 && buffer.length !== length2) throw RangeError(message)
        }

        exps.isLengthGTZero = function (value, message) {
          if (value.length === 0) throw RangeError(message)
        }

        exps.isNumberInInterval = function (number, x, y, message) {
          if (number <= x || number >= y) throw RangeError(message)
        }

      }).call(this, {
        "isBuffer": bcryptoReq("C:/Users/user/AppData/Roaming/npm/node_modules/browserify/node_modules/is-buffer/index.js")
      })
    }, {
      "C:/Users/user/AppData/Roaming/npm/node_modules/browserify/node_modules/is-buffer/index.js": 9
    }],
    72: [function (bcryptoReq, mods, exps) {
      'use strict'
      var Buffer = bcryptoReq('safe-buffer').Buffer
      var bip66 = bcryptoReq('bip66')

      var EC_PRIVKEY_EXPORT_DER_COMPRESSED = Buffer.from([
        // begin
        0x30, 0x81, 0xd3, 0x02, 0x01, 0x01, 0x04, 0x20,
        // private key
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        // middle
        0xa0, 0x81, 0x85, 0x30, 0x81, 0x82, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48,
        0xcE, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xfE, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04,
        0x21, 0x02, 0x79, 0xbE, 0x66, 0x7E, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xcE, 0x87,
        0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xcE, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8,
        0x17, 0x98, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xfE, 0xba, 0xaE, 0xdc, 0xE6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5E,
        0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x24, 0x03, 0x22, 0x00,
        // public key
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00
      ])

      var EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED = Buffer.from([
        // begin
        0x30, 0x82, 0x01, 0x13, 0x02, 0x01, 0x01, 0x04, 0x20,
        // private key
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        // middle
        0xa0, 0x81, 0xa5, 0x30, 0x81, 0xa2, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48,
        0xcE, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xfE, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04,
        0x41, 0x04, 0x79, 0xbE, 0x66, 0x7E, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xcE, 0x87,
        0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xcE, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8,
        0x17, 0x98, 0x48, 0x3a, 0xda, 0x77, 0x26, 0xa3, 0xc4, 0x65, 0x5d, 0xa4, 0xfb, 0xfc, 0x0E, 0x11,
        0x08, 0xa8, 0xfd, 0x17, 0xb4, 0x48, 0xa6, 0x85, 0x54, 0x19, 0x9c, 0x47, 0xd0, 0x8f, 0xfb, 0x10,
        0xd4, 0xb8, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff, 0xfE, 0xba, 0xaE, 0xdc, 0xE6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5E,
        0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x44, 0x03, 0x42, 0x00,
        // public key
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00
      ])

      exps.privateKeyExport = function (privateKey, publicKey, compressed) {
        var result = Buffer.from(compressed ? EC_PRIVKEY_EXPORT_DER_COMPRESSED : EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED)
        privateKey.copy(result, compressed ? 8 : 9)
        publicKey.copy(result, compressed ? 181 : 214)
        return result
      }

      exps.privateKeyImport = function (privateKey) {
        var length = privateKey.length

        // sequence header
        var index = 0
        if (length < index + 1 || privateKey[index] !== 0x30) return
        index += 1

        // sequence length constructor
        if (length < index + 1 || !(privateKey[index] & 0x80)) return

        var lenb = privateKey[index] & 0x7f
        index += 1
        if (lenb < 1 || lenb > 2) return
        if (length < index + lenb) return

        // sequence length
        var len = privateKey[index + lenb - 1] | (lenb > 1 ? privateKey[index + lenb - 2] << 8 : 0)
        index += lenb
        if (length < index + len) return

        // sequence element 0: version number (=1)
        if (length < index + 3 ||
          privateKey[index] !== 0x02 ||
          privateKey[index + 1] !== 0x01 ||
          privateKey[index + 2] !== 0x01) {
          return
        }
        index += 3

        // sequence element 1: octet string, up to 32 bytes
        if (length < index + 2 ||
          privateKey[index] !== 0x04 ||
          privateKey[index + 1] > 0x20 ||
          length < index + 2 + privateKey[index + 1]) {
          return
        }

        return privateKey.slice(index + 2, index + 2 + privateKey[index + 1])
      }

      exps.signatureExport = function (sigObj) {
        var r = Buffer.concat([Buffer.from([0]), sigObj.r])
        for (var lenR = 33, posR = 0; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);

        var s = Buffer.concat([Buffer.from([0]), sigObj.s])
        for (var lenS = 33, posS = 0; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);

        return bip66.encode(r.slice(posR), s.slice(posS))
      }

      exps.signatureImport = function (sig) {
        var r = Buffer.alloc(32, 0)
        var s = Buffer.alloc(32, 0)

        try {
          var sigObj = bip66.decode(sig)
          if (sigObj.r.length === 33 && sigObj.r[0] === 0x00) sigObj.r = sigObj.r.slice(1)
          if (sigObj.r.length > 32) throw new Error('R length is too long')
          if (sigObj.s.length === 33 && sigObj.s[0] === 0x00) sigObj.s = sigObj.s.slice(1)
          if (sigObj.s.length > 32) throw new Error('S length is too long')
        } catch (err) {
          return
        }

        sigObj.r.copy(r, 32 - sigObj.r.length)
        sigObj.s.copy(s, 32 - sigObj.s.length)

        return {
          r: r,
          s: s
        }
      }

      exps.signatureImportLax = function (sig) {
        var r = Buffer.alloc(32, 0)
        var s = Buffer.alloc(32, 0)

        var length = sig.length
        var index = 0

        // sequence tag byte
        if (sig[index++] !== 0x30) return

        // sequence length byte
        var lenbyte = sig[index++]
        if (lenbyte & 0x80) {
          index += lenbyte - 0x80
          if (index > length) return
        }

        // sequence tag byte for r
        if (sig[index++] !== 0x02) return

        // length for r
        var rlen = sig[index++]
        if (rlen & 0x80) {
          lenbyte = rlen - 0x80
          if (index + lenbyte > length) return
          for (; lenbyte > 0 && sig[index] === 0x00; index += 1, lenbyte -= 1);
          for (rlen = 0; lenbyte > 0; index += 1, lenbyte -= 1) rlen = (rlen << 8) + sig[index]
        }
        if (rlen > length - index) return
        var rindex = index
        index += rlen

        // sequence tag byte for s
        if (sig[index++] !== 0x02) return

        // length for s
        var slen = sig[index++]
        if (slen & 0x80) {
          lenbyte = slen - 0x80
          if (index + lenbyte > length) return
          for (; lenbyte > 0 && sig[index] === 0x00; index += 1, lenbyte -= 1);
          for (slen = 0; lenbyte > 0; index += 1, lenbyte -= 1) slen = (slen << 8) + sig[index]
        }
        if (slen > length - index) return
        var sindex = index
        index += slen

        // ignore leading zeros in r
        for (; rlen > 0 && sig[rindex] === 0x00; rlen -= 1, rindex += 1);
        // copy r value
        if (rlen > 32) return
        var rvalue = sig.slice(rindex, rindex + rlen)
        rvalue.copy(r, 32 - rvalue.length)

        // ignore leading zeros in s
        for (; slen > 0 && sig[sindex] === 0x00; slen -= 1, sindex += 1);
        // copy s value
        if (slen > 32) return
        var svalue = sig.slice(sindex, sindex + slen)
        svalue.copy(s, 32 - svalue.length)

        return {
          r: r,
          s: s
        }
      }

    }, {
      "bip66": 57,
      "safe-buffer": 69
    }],
    73: [function (bcryptoReq, mods, exps) {
      'use strict'
      var assert = bcryptoReq('./assert')
      var der = bcryptoReq('./der')
      var messages = bcryptoReq('./messages.json')

      function initCompressedValue(value, defaultValue) {
        if (value === undefined) return defaultValue

        assert.isBoolean(value, messages.COMPRESSED_TYPE_INVALID)
        return value
      }

      mods.exps = function (secp256k1) {
        return {
          privateKeyVerify: function (privateKey) {
            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            return privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)
          },

          privateKeyExport: function (privateKey, compressed) {
            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            compressed = initCompressedValue(compressed, true)
            var publicKey = secp256k1.privateKeyExport(privateKey, compressed)

            return der.privateKeyExport(privateKey, publicKey, compressed)
          },

          privateKeyImport: function (privateKey) {
            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)

            privateKey = der.privateKeyImport(privateKey)
            if (privateKey && privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)) return privateKey

            throw new Error(messages.EC_PRIVATE_KEY_IMPORT_DER_FAIL)
          },

          privateKeyNegate: function (privateKey) {
            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            return secp256k1.privateKeyNegate(privateKey)
          },

          privateKeyModInverse: function (privateKey) {
            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            return secp256k1.privateKeyModInverse(privateKey)
          },

          privateKeyTweakAdd: function (privateKey, tweak) {
            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
            assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

            return secp256k1.privateKeyTweakAdd(privateKey, tweak)
          },

          privateKeyTweakMul: function (privateKey, tweak) {
            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
            assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

            return secp256k1.privateKeyTweakMul(privateKey, tweak)
          },

          publicKeyCreate: function (privateKey, compressed) {
            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            compressed = initCompressedValue(compressed, true)

            return secp256k1.publicKeyCreate(privateKey, compressed)
          },

          publicKeyConvert: function (publicKey, compressed) {
            assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
            assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

            compressed = initCompressedValue(compressed, true)

            return secp256k1.publicKeyConvert(publicKey, compressed)
          },

          publicKeyVerify: function (publicKey) {
            assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
            return secp256k1.publicKeyVerify(publicKey)
          },

          publicKeyTweakAdd: function (publicKey, tweak, compressed) {
            assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
            assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

            assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
            assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

            compressed = initCompressedValue(compressed, true)

            return secp256k1.publicKeyTweakAdd(publicKey, tweak, compressed)
          },

          publicKeyTweakMul: function (publicKey, tweak, compressed) {
            assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
            assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

            assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID)
            assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID)

            compressed = initCompressedValue(compressed, true)

            return secp256k1.publicKeyTweakMul(publicKey, tweak, compressed)
          },

          publicKeyCombine: function (publicKeys, compressed) {
            assert.isArray(publicKeys, messages.EC_PUBLIC_KEYS_TYPE_INVALID)
            assert.isLengthGTZero(publicKeys, messages.EC_PUBLIC_KEYS_LENGTH_INVALID)
            for (var i = 0; i < publicKeys.length; ++i) {
              assert.isBuffer(publicKeys[i], messages.EC_PUBLIC_KEY_TYPE_INVALID)
              assert.isBufferLength2(publicKeys[i], 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)
            }

            compressed = initCompressedValue(compressed, true)

            return secp256k1.publicKeyCombine(publicKeys, compressed)
          },

          signatureNormalize: function (signature) {
            assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
            assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

            return secp256k1.signatureNormalize(signature)
          },

          signatureExport: function (signature) {
            assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
            assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

            var sigObj = secp256k1.signatureExport(signature)
            return der.signatureExport(sigObj)
          },

          signatureImport: function (sig) {
            assert.isBuffer(sig, messages.ECDSA_SIGNATURE_TYPE_INVALID)
            assert.isLengthGTZero(sig, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

            var sigObj = der.signatureImport(sig)
            if (sigObj) return secp256k1.signatureImport(sigObj)

            throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)
          },

          signatureImportLax: function (sig) {
            assert.isBuffer(sig, messages.ECDSA_SIGNATURE_TYPE_INVALID)
            assert.isLengthGTZero(sig, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

            var sigObj = der.signatureImportLax(sig)
            if (sigObj) return secp256k1.signatureImport(sigObj)

            throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL)
          },

          sign: function (message, privateKey, options) {
            assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
            assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            var data = null
            var noncefn = null
            if (options !== undefined) {
              assert.isObject(options, messages.OPTIONS_TYPE_INVALID)

              if (options.data !== undefined) {
                assert.isBuffer(options.data, messages.OPTIONS_DATA_TYPE_INVALID)
                assert.isBufferLength(options.data, 32, messages.OPTIONS_DATA_LENGTH_INVALID)
                data = options.data
              }

              if (options.noncefn !== undefined) {
                assert.isFunction(options.noncefn, messages.OPTIONS_NONCEFN_TYPE_INVALID)
                noncefn = options.noncefn
              }
            }

            return secp256k1.sign(message, privateKey, noncefn, data)
          },

          verify: function (message, signature, publicKey) {
            assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
            assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

            assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
            assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

            assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
            assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

            return secp256k1.verify(message, signature, publicKey)
          },

          recover: function (message, signature, recovery, compressed) {
            assert.isBuffer(message, messages.MSG32_TYPE_INVALID)
            assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID)

            assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID)
            assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID)

            assert.isNumber(recovery, messages.RECOVERY_ID_TYPE_INVALID)
            assert.isNumberInInterval(recovery, -1, 4, messages.RECOVERY_ID_VALUE_INVALID)

            compressed = initCompressedValue(compressed, true)

            return secp256k1.recover(message, signature, recovery, compressed)
          },

          ecdh: function (publicKey, privateKey) {
            assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
            assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            return secp256k1.ecdh(publicKey, privateKey)
          },

          ecdhUnsafe: function (publicKey, privateKey, compressed) {
            assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID)
            assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID)

            assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID)
            assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID)

            compressed = initCompressedValue(compressed, true)

            return secp256k1.ecdhUnsafe(publicKey, privateKey, compressed)
          }
        }
      }

    }, {
      "./assert": 71,
      "./der": 72,
      "./messages.json": 80
    }],
    74: [function (bcryptoReq, mods, exps) {
      'use strict'
      var Buffer = bcryptoReq('safe-buffer').Buffer
      var optimized = bcryptoReq('./optimized')

      function BN() {
        this.negative = 0
        this.words = null
        this.length = 0
      }

      BN.fromNumber = function (n) {
        var bn = new BN()
        bn.words = [n & 0x03ffffff]
        bn.length = 1
        return bn
      }

      BN.fromBuffer = function (b32) {
        var bn = new BN()

        bn.words = new Array(10)
        bn.words[0] = (b32[28] & 0x03) << 24 | b32[29] << 16 | b32[30] << 8 | b32[31]
        bn.words[1] = (b32[25] & 0x0F) << 22 | b32[26] << 14 | b32[27] << 6 | b32[28] >>> 2
        bn.words[2] = (b32[22] & 0x3F) << 20 | b32[23] << 12 | b32[24] << 4 | b32[25] >>> 4
        bn.words[3] = (b32[19] & 0xFF) << 18 | b32[20] << 10 | b32[21] << 2 | b32[22] >>> 6

        bn.words[4] = (b32[15] & 0x03) << 24 | b32[16] << 16 | b32[17] << 8 | b32[18]
        bn.words[5] = (b32[12] & 0x0F) << 22 | b32[13] << 14 | b32[14] << 6 | b32[15] >>> 2
        bn.words[6] = (b32[9] & 0x3F) << 20 | b32[10] << 12 | b32[11] << 4 | b32[12] >>> 4
        bn.words[7] = (b32[6] & 0xFF) << 18 | b32[7] << 10 | b32[8] << 2 | b32[9] >>> 6

        bn.words[8] = (b32[2] & 0x03) << 24 | b32[3] << 16 | b32[4] << 8 | b32[5]
        bn.words[9] = b32[0] << 14 | b32[1] << 6 | b32[2] >>> 2

        bn.length = 10
        return bn.strip()
      }

      BN.prototype.toBuffer = function () {
        var w = this.words
        for (var i = this.length; i < 10; ++i) w[i] = 0

        return Buffer.from([
          (w[9] >>> 14) & 0xFF, (w[9] >>> 6) & 0xFF, (w[9] & 0x3F) << 2 | ((w[8] >>> 24) & 0x03), // 0, 1, 2
          (w[8] >>> 16) & 0xFF, (w[8] >>> 8) & 0xFF, w[8] & 0xFF, // 3, 4, 5

          (w[7] >>> 18) & 0xFF, (w[7] >>> 10) & 0xFF, (w[7] >>> 2) & 0xFF, // 6, 7, 8
          ((w[7] & 0x03) << 6) | ((w[6] >>> 20) & 0x3F), (w[6] >>> 12) & 0xFF, (w[6] >>> 4) & 0xFF, // 9, 10, 11
          ((w[6] & 0x0F) << 4) | ((w[5] >>> 22) & 0x0F), (w[5] >>> 14) & 0xFF, (w[5] >>> 6) & 0xFF, // 12, 13, 14
          ((w[5] & 0x3F) << 2) | ((w[4] >>> 24) & 0x03), (w[4] >>> 16) & 0xFF, (w[4] >>> 8) & 0xFF, w[4] & 0xFF, // 15, 16, 17, 18

          (w[3] >>> 18) & 0xFF, (w[3] >>> 10) & 0xFF, (w[3] >>> 2) & 0xFF, // 19, 20, 21
          ((w[3] & 0x03) << 6) | ((w[2] >>> 20) & 0x3F), (w[2] >>> 12) & 0xFF, (w[2] >>> 4) & 0xFF, // 22, 23, 24
          ((w[2] & 0x0F) << 4) | ((w[1] >>> 22) & 0x0F), (w[1] >>> 14) & 0xFF, (w[1] >>> 6) & 0xFF, // 25, 26, 27
          ((w[1] & 0x3F) << 2) | ((w[0] >>> 24) & 0x03), (w[0] >>> 16) & 0xFF, (w[0] >>> 8) & 0xFF, w[0] & 0xFF // 28, 29, 30, 31
        ])
      }

      BN.prototype.clone = function () {
        var r = new BN()
        r.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) r.words[i] = this.words[i]
        r.length = this.length
        r.negative = this.negative
        return r
      }

      BN.prototype.strip = function () {
        while (this.length > 1 && (this.words[this.length - 1] | 0) === 0) this.length--
          return this
      }

      BN.prototype.normSign = function () {
        // -0 = 0
        if (this.length === 1 && this.words[0] === 0) this.negative = 0
        return this
      }

      BN.prototype.isEven = function () {
        return (this.words[0] & 1) === 0
      }

      BN.prototype.isOdd = function () {
        return (this.words[0] & 1) === 1
      }

      BN.prototype.isZero = function () {
        return this.length === 1 && this.words[0] === 0
      }

      BN.prototype.ucmp = function (num) {
        if (this.length !== num.length) return this.length > num.length ? 1 : -1

        for (var i = this.length - 1; i >= 0; --i) {
          if (this.words[i] !== num.words[i]) return this.words[i] > num.words[i] ? 1 : -1
        }

        return 0
      }

      BN.prototype.gtOne = function () {
        return this.length > 1 || this.words[0] > 1
      }

      BN.prototype.isOverflow = function () {
        return this.ucmp(BN.n) >= 0
      }

      BN.prototype.isHigh = function () {
        return this.ucmp(BN.nh) === 1
      }

      BN.prototype.bitLengthGT256 = function () {
        return this.length > 10 || (this.length === 10 && this.words[9] > 0x003fffff)
      }

      BN.prototype.iuaddn = function (num) {
        this.words[0] += num

        for (var i = 0; this.words[i] > 0x03ffffff && i < this.length; ++i) {
          this.words[i] -= 0x04000000
          this.words[i + 1] += 1
        }

        if (i === this.length) {
          this.words[i] = 1
          this.length += 1
        }

        return this
      }

      BN.prototype.iadd = function (num) {
        // (-this) + num -> -(this - num)
        // this + (-num) -> this - num
        if (this.negative !== num.negative) {
          if (this.negative !== 0) {
            this.negative = 0
            this.isub(num)
            this.negative ^= 1
          } else {
            num.negative = 0
            this.isub(num)
            num.negative = 1
          }

          return this.normSign()
        }

        // a.length > b.length
        var a
        var b
        if (this.length > num.length) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }

        for (var i = 0, carry = 0; i < b.length; ++i) {
          var word = a.words[i] + b.words[i] + carry
          this.words[i] = word & 0x03ffffff
          carry = word >>> 26
        }

        for (; carry !== 0 && i < a.length; ++i) {
          word = a.words[i] + carry
          this.words[i] = word & 0x03ffffff
          carry = word >>> 26
        }

        this.length = a.length
        if (carry !== 0) {
          this.words[this.length++] = carry
        } else if (a !== this) {
          for (; i < a.length; ++i) {
            this.words[i] = a.words[i]
          }
        }

        return this
      }

      BN.prototype.add = function (num) {
        return this.clone().iadd(num)
      }

      BN.prototype.isub = function (num) {
        // (-this) - num -> -(this + num)
        // this - (-num) -> this + num
        if (this.negative !== num.negative) {
          if (this.negative !== 0) {
            this.negative = 0
            this.iadd(num)
            this.negative = 1
          } else {
            num.negative = 0
            this.iadd(num)
            num.negative = 1
          }

          return this.normSign()
        }

        var cmp = this.ucmp(num)
        if (cmp === 0) {
          this.negative = 0
          this.words[0] = 0
          this.length = 1
          return this
        }

        // a > b
        var a
        var b
        if (cmp > 0) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }

        for (var i = 0, carry = 0; i < b.length; ++i) {
          var word = a.words[i] - b.words[i] + carry
          carry = word >> 26
          this.words[i] = word & 0x03ffffff
        }

        for (; carry !== 0 && i < a.length; ++i) {
          word = a.words[i] + carry
          carry = word >> 26
          this.words[i] = word & 0x03ffffff
        }

        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; ++i) this.words[i] = a.words[i]
        }

        this.length = Math.max(this.length, i)

        if (a !== this) this.negative ^= 1

        return this.strip().normSign()
      }

      BN.prototype.sub = function (num) {
        return this.clone().isub(num)
      }

      BN.umulTo = function (num1, num2, out) {
        out.length = num1.length + num2.length - 1

        var a1 = num1.words[0]
        var b1 = num2.words[0]
        var r1 = a1 * b1

        var carry = (r1 / 0x04000000) | 0
        out.words[0] = r1 & 0x03ffffff

        for (var k = 1, maxK = out.length; k < maxK; k++) {
          var ncarry = carry >>> 26
          var rword = carry & 0x03ffffff
          for (var j = Math.max(0, k - num1.length + 1), maxJ = Math.min(k, num2.length - 1); j <= maxJ; j++) {
            var i = k - j
            var a = num1.words[i]
            var b = num2.words[j]
            var r = a * b + rword
            ncarry += (r / 0x04000000) | 0
            rword = r & 0x03ffffff
          }
          out.words[k] = rword
          carry = ncarry
        }

        if (carry !== 0) out.words[out.length++] = carry

        return out.strip()
      }

      BN.umulTo10x10 = Math.imul ? optimized.umulTo10x10 : BN.umulTo

      BN.umulnTo = function (num, k, out) {
        if (k === 0) {
          out.words = [0]
          out.length = 1
          return out
        }

        for (var i = 0, carry = 0; i < num.length; ++i) {
          var r = num.words[i] * k + carry
          out.words[i] = r & 0x03ffffff
          carry = (r / 0x04000000) | 0
        }

        if (carry > 0) {
          out.words[i] = carry
          out.length = num.length + 1
        } else {
          out.length = num.length
        }

        return out
      }

      BN.prototype.umul = function (num) {
        var out = new BN()
        out.words = new Array(this.length + num.length)

        if (this.length === 10 && num.length === 10) {
          return BN.umulTo10x10(this, num, out)
        } else if (this.length === 1) {
          return BN.umulnTo(num, this.words[0], out)
        } else if (num.length === 1) {
          return BN.umulnTo(this, num.words[0], out)
        } else {
          return BN.umulTo(this, num, out)
        }
      }

      BN.prototype.isplit = function (output) {
        output.length = Math.min(this.length, 9)
        for (var i = 0; i < output.length; ++i) output.words[i] = this.words[i]

        if (this.length <= 9) {
          this.words[0] = 0
          this.length = 1
          return this
        }

        // Shift by 9 limbs
        var prev = this.words[9]
        output.words[output.length++] = prev & 0x003fffff

        for (i = 10; i < this.length; ++i) {
          var word = this.words[i]
          this.words[i - 10] = ((word & 0x003fffff) << 4) | (prev >>> 22)
          prev = word
        }
        prev >>>= 22
        this.words[i - 10] = prev

        if (prev === 0 && this.length > 10) {
          this.length -= 10
        } else {
          this.length -= 9
        }

        return this
      }

      BN.prototype.fireduce = function () {
        if (this.isOverflow()) this.isub(BN.n)
        return this
      }

      BN.prototype.ureduce = function () {
        var num = this.clone().isplit(BN.tmp).umul(BN.nc).iadd(BN.tmp)
        if (num.bitLengthGT256()) {
          num = num.isplit(BN.tmp).umul(BN.nc).iadd(BN.tmp)
          if (num.bitLengthGT256()) num = num.isplit(BN.tmp).umul(BN.nc).iadd(BN.tmp)
        }

        return num.fireduce()
      }

      BN.prototype.ishrn = function (n) {
        var mask = (1 << n) - 1
        var m = 26 - n

        for (var i = this.length - 1, carry = 0; i >= 0; --i) {
          var word = this.words[i]
          this.words[i] = (carry << m) | (word >>> n)
          carry = word & mask
        }

        if (this.length > 1 && this.words[this.length - 1] === 0) this.length -= 1

        return this
      }

      BN.prototype.uinvm = function () {
        var x = this.clone()
        var y = BN.n.clone()

        // A * x + B * y = x
        var A = BN.fromNumber(1)
        var B = BN.fromNumber(0)

        // C * x + D * y = y
        var C = BN.fromNumber(0)
        var D = BN.fromNumber(1)

        while (x.isEven() && y.isEven()) {
          for (var k = 1, m = 1;
            (x.words[0] & m) === 0 && (y.words[0] & m) === 0 && k < 26; ++k, m <<= 1);
          x.ishrn(k)
          y.ishrn(k)
        }

        var yp = y.clone()
        var xp = x.clone()

        while (!x.isZero()) {
          for (var i = 0, im = 1;
            (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
          if (i > 0) {
            x.ishrn(i)
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp)
                B.isub(xp)
              }

              A.ishrn(1)
              B.ishrn(1)
            }
          }

          for (var j = 0, jm = 1;
            (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
          if (j > 0) {
            y.ishrn(j)
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp)
                D.isub(xp)
              }

              C.ishrn(1)
              D.ishrn(1)
            }
          }

          if (x.ucmp(y) >= 0) {
            x.isub(y)
            A.isub(C)
            B.isub(D)
          } else {
            y.isub(x)
            C.isub(A)
            D.isub(B)
          }
        }

        if (C.negative === 1) {
          C.negative = 0
          var result = C.ureduce()
          result.negative ^= 1
          return result.normSign().iadd(BN.n)
        } else {
          return C.ureduce()
        }
      }

      BN.prototype.imulK = function () {
        this.words[this.length] = 0
        this.words[this.length + 1] = 0
        this.length += 2

        for (var i = 0, lo = 0; i < this.length; ++i) {
          var w = this.words[i] | 0
          lo += w * 0x3d1
          this.words[i] = lo & 0x03ffffff
          lo = w * 0x40 + ((lo / 0x04000000) | 0)
        }

        if (this.words[this.length - 1] === 0) {
          this.length -= 1
          if (this.words[this.length - 1] === 0) this.length -= 1
        }

        return this
      }

      BN.prototype.redIReduce = function () {
        this.isplit(BN.tmp).imulK().iadd(BN.tmp)
        if (this.bitLengthGT256()) this.isplit(BN.tmp).imulK().iadd(BN.tmp)

        var cmp = this.ucmp(BN.p)
        if (cmp === 0) {
          this.words[0] = 0
          this.length = 1
        } else if (cmp > 0) {
          this.isub(BN.p)
        } else {
          this.strip()
        }

        return this
      }

      BN.prototype.redNeg = function () {
        if (this.isZero()) return BN.fromNumber(0)

        return BN.p.sub(this)
      }

      BN.prototype.redAdd = function (num) {
        return this.clone().redIAdd(num)
      }

      BN.prototype.redIAdd = function (num) {
        this.iadd(num)
        if (this.ucmp(BN.p) >= 0) this.isub(BN.p)

        return this
      }

      BN.prototype.redIAdd7 = function () {
        this.iuaddn(7)
        if (this.ucmp(BN.p) >= 0) this.isub(BN.p)

        return this
      }

      BN.prototype.redSub = function (num) {
        return this.clone().redISub(num)
      }

      BN.prototype.redISub = function (num) {
        this.isub(num)
        if (this.negative !== 0) this.iadd(BN.p)

        return this
      }

      BN.prototype.redMul = function (num) {
        return this.umul(num).redIReduce()
      }

      BN.prototype.redSqr = function () {
        return this.umul(this).redIReduce()
      }

      BN.prototype.redSqrt = function () {
        if (this.isZero()) return this.clone()

        var wv2 = this.redSqr()
        var wv4 = wv2.redSqr()
        var wv12 = wv4.redSqr().redMul(wv4)
        var wv14 = wv12.redMul(wv2)
        var wv15 = wv14.redMul(this)

        var out = wv15
        for (var i = 0; i < 54; ++i) out = out.redSqr().redSqr().redSqr().redSqr().redMul(wv15)
        out = out.redSqr().redSqr().redSqr().redSqr().redMul(wv14)
        for (i = 0; i < 5; ++i) out = out.redSqr().redSqr().redSqr().redSqr().redMul(wv15)
        out = out.redSqr().redSqr().redSqr().redSqr().redMul(wv12)
        out = out.redSqr().redSqr().redSqr().redSqr().redSqr().redSqr().redMul(wv12)

        if (out.redSqr().ucmp(this) === 0) {
          return out
        } else {
          return null
        }
      }

      BN.prototype.redInvm = function () {
        var a = this.clone()
        var b = BN.p.clone()

        var x1 = BN.fromNumber(1)
        var x2 = BN.fromNumber(0)

        while (a.gtOne() && b.gtOne()) {
          for (var i = 0, im = 1;
            (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
          if (i > 0) {
            a.ishrn(i)
            while (i-- > 0) {
              if (x1.isOdd()) x1.iadd(BN.p)
              x1.ishrn(1)
            }
          }

          for (var j = 0, jm = 1;
            (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
          if (j > 0) {
            b.ishrn(j)
            while (j-- > 0) {
              if (x2.isOdd()) x2.iadd(BN.p)
              x2.ishrn(1)
            }
          }

          if (a.ucmp(b) >= 0) {
            a.isub(b)
            x1.isub(x2)
          } else {
            b.isub(a)
            x2.isub(x1)
          }
        }

        var res
        if (a.length === 1 && a.words[0] === 1) {
          res = x1
        } else {
          res = x2
        }

        if (res.negative !== 0) res.iadd(BN.p)

        if (res.negative !== 0) {
          res.negative = 0
          return res.redIReduce().redNeg()
        } else {
          return res.redIReduce()
        }
      }

      BN.prototype.getNAF = function (w) {
        var naf = []
        var ws = 1 << (w + 1)
        var wsm1 = ws - 1
        var ws2 = ws >> 1

        var k = this.clone()
        while (!k.isZero()) {
          for (var i = 0, m = 1;
            (k.words[0] & m) === 0 && i < 26; ++i, m <<= 1) naf.push(0)

          if (i !== 0) {
            k.ishrn(i)
          } else {
            var mod = k.words[0] & wsm1
            if (mod >= ws2) {
              naf.push(ws2 - mod)
              k.iuaddn(mod - ws2).ishrn(1)
            } else {
              naf.push(mod)
              k.words[0] -= mod
              if (!k.isZero()) {
                for (i = w - 1; i > 0; --i) naf.push(0)
                k.ishrn(w)
              }
            }
          }
        }

        return naf
      }

      BN.prototype.inspect = function () {
        if (this.isZero()) return '0'

        var buffer = this.toBuffer().toString('hex')
        for (var i = 0; buffer[i] === '0'; ++i);
        return buffer.slice(i)
      }

      BN.n = BN.fromBuffer(Buffer.from('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 'hex'))
      BN.nh = BN.n.clone().ishrn(1)
      BN.nc = BN.fromBuffer(Buffer.from('000000000000000000000000000000014551231950B75FC4402DA1732FC9BEBF', 'hex'))
      BN.p = BN.fromBuffer(Buffer.from('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F', 'hex'))
      BN.psn = BN.p.sub(BN.n)
      BN.tmp = new BN()
      BN.tmp.words = new Array(10)

      // WTF?! it speed-up benchmark on ~20%
      ;
      (function () {
        var x = BN.fromNumber(1)
        x.words[3] = 0
      })()

      mods.exps = BN

    }, {
      "./optimized": 75,
      "safe-buffer": 69
    }],
    75: [function (bcryptoReq, mods, exps) {
      'use strict'
      exps.umulTo10x10 = function (num1, num2, out) {
        var a = num1.words
        var b = num2.words
        var o = out.words
        var c = 0
        var lo
        var mid
        var hi
        var a0 = a[0] | 0
        var al0 = a0 & 0x1fff
        var ah0 = a0 >>> 13
        var a1 = a[1] | 0
        var al1 = a1 & 0x1fff
        var ah1 = a1 >>> 13
        var a2 = a[2] | 0
        var al2 = a2 & 0x1fff
        var ah2 = a2 >>> 13
        var a3 = a[3] | 0
        var al3 = a3 & 0x1fff
        var ah3 = a3 >>> 13
        var a4 = a[4] | 0
        var al4 = a4 & 0x1fff
        var ah4 = a4 >>> 13
        var a5 = a[5] | 0
        var al5 = a5 & 0x1fff
        var ah5 = a5 >>> 13
        var a6 = a[6] | 0
        var al6 = a6 & 0x1fff
        var ah6 = a6 >>> 13
        var a7 = a[7] | 0
        var al7 = a7 & 0x1fff
        var ah7 = a7 >>> 13
        var a8 = a[8] | 0
        var al8 = a8 & 0x1fff
        var ah8 = a8 >>> 13
        var a9 = a[9] | 0
        var al9 = a9 & 0x1fff
        var ah9 = a9 >>> 13
        var b0 = b[0] | 0
        var bl0 = b0 & 0x1fff
        var bh0 = b0 >>> 13
        var b1 = b[1] | 0
        var bl1 = b1 & 0x1fff
        var bh1 = b1 >>> 13
        var b2 = b[2] | 0
        var bl2 = b2 & 0x1fff
        var bh2 = b2 >>> 13
        var b3 = b[3] | 0
        var bl3 = b3 & 0x1fff
        var bh3 = b3 >>> 13
        var b4 = b[4] | 0
        var bl4 = b4 & 0x1fff
        var bh4 = b4 >>> 13
        var b5 = b[5] | 0
        var bl5 = b5 & 0x1fff
        var bh5 = b5 >>> 13
        var b6 = b[6] | 0
        var bl6 = b6 & 0x1fff
        var bh6 = b6 >>> 13
        var b7 = b[7] | 0
        var bl7 = b7 & 0x1fff
        var bh7 = b7 >>> 13
        var b8 = b[8] | 0
        var bl8 = b8 & 0x1fff
        var bh8 = b8 >>> 13
        var b9 = b[9] | 0
        var bl9 = b9 & 0x1fff
        var bh9 = b9 >>> 13

        out.length = 19
        /* k = 0 */
        lo = Math.imul(al0, bl0)
        mid = Math.imul(al0, bh0)
        mid += Math.imul(ah0, bl0)
        hi = Math.imul(ah0, bh0)
        var w0 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w0 >>> 26)
        w0 &= 0x3ffffff
        /* k = 1 */
        lo = Math.imul(al1, bl0)
        mid = Math.imul(al1, bh0)
        mid += Math.imul(ah1, bl0)
        hi = Math.imul(ah1, bh0)
        lo += Math.imul(al0, bl1)
        mid += Math.imul(al0, bh1)
        mid += Math.imul(ah0, bl1)
        hi += Math.imul(ah0, bh1)
        var w1 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w1 >>> 26)
        w1 &= 0x3ffffff
        /* k = 2 */
        lo = Math.imul(al2, bl0)
        mid = Math.imul(al2, bh0)
        mid += Math.imul(ah2, bl0)
        hi = Math.imul(ah2, bh0)
        lo += Math.imul(al1, bl1)
        mid += Math.imul(al1, bh1)
        mid += Math.imul(ah1, bl1)
        hi += Math.imul(ah1, bh1)
        lo += Math.imul(al0, bl2)
        mid += Math.imul(al0, bh2)
        mid += Math.imul(ah0, bl2)
        hi += Math.imul(ah0, bh2)
        var w2 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w2 >>> 26)
        w2 &= 0x3ffffff
        /* k = 3 */
        lo = Math.imul(al3, bl0)
        mid = Math.imul(al3, bh0)
        mid += Math.imul(ah3, bl0)
        hi = Math.imul(ah3, bh0)
        lo += Math.imul(al2, bl1)
        mid += Math.imul(al2, bh1)
        mid += Math.imul(ah2, bl1)
        hi += Math.imul(ah2, bh1)
        lo += Math.imul(al1, bl2)
        mid += Math.imul(al1, bh2)
        mid += Math.imul(ah1, bl2)
        hi += Math.imul(ah1, bh2)
        lo += Math.imul(al0, bl3)
        mid += Math.imul(al0, bh3)
        mid += Math.imul(ah0, bl3)
        hi += Math.imul(ah0, bh3)
        var w3 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w3 >>> 26)
        w3 &= 0x3ffffff
        /* k = 4 */
        lo = Math.imul(al4, bl0)
        mid = Math.imul(al4, bh0)
        mid += Math.imul(ah4, bl0)
        hi = Math.imul(ah4, bh0)
        lo += Math.imul(al3, bl1)
        mid += Math.imul(al3, bh1)
        mid += Math.imul(ah3, bl1)
        hi += Math.imul(ah3, bh1)
        lo += Math.imul(al2, bl2)
        mid += Math.imul(al2, bh2)
        mid += Math.imul(ah2, bl2)
        hi += Math.imul(ah2, bh2)
        lo += Math.imul(al1, bl3)
        mid += Math.imul(al1, bh3)
        mid += Math.imul(ah1, bl3)
        hi += Math.imul(ah1, bh3)
        lo += Math.imul(al0, bl4)
        mid += Math.imul(al0, bh4)
        mid += Math.imul(ah0, bl4)
        hi += Math.imul(ah0, bh4)
        var w4 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w4 >>> 26)
        w4 &= 0x3ffffff
        /* k = 5 */
        lo = Math.imul(al5, bl0)
        mid = Math.imul(al5, bh0)
        mid += Math.imul(ah5, bl0)
        hi = Math.imul(ah5, bh0)
        lo += Math.imul(al4, bl1)
        mid += Math.imul(al4, bh1)
        mid += Math.imul(ah4, bl1)
        hi += Math.imul(ah4, bh1)
        lo += Math.imul(al3, bl2)
        mid += Math.imul(al3, bh2)
        mid += Math.imul(ah3, bl2)
        hi += Math.imul(ah3, bh2)
        lo += Math.imul(al2, bl3)
        mid += Math.imul(al2, bh3)
        mid += Math.imul(ah2, bl3)
        hi += Math.imul(ah2, bh3)
        lo += Math.imul(al1, bl4)
        mid += Math.imul(al1, bh4)
        mid += Math.imul(ah1, bl4)
        hi += Math.imul(ah1, bh4)
        lo += Math.imul(al0, bl5)
        mid += Math.imul(al0, bh5)
        mid += Math.imul(ah0, bl5)
        hi += Math.imul(ah0, bh5)
        var w5 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w5 >>> 26)
        w5 &= 0x3ffffff
        /* k = 6 */
        lo = Math.imul(al6, bl0)
        mid = Math.imul(al6, bh0)
        mid += Math.imul(ah6, bl0)
        hi = Math.imul(ah6, bh0)
        lo += Math.imul(al5, bl1)
        mid += Math.imul(al5, bh1)
        mid += Math.imul(ah5, bl1)
        hi += Math.imul(ah5, bh1)
        lo += Math.imul(al4, bl2)
        mid += Math.imul(al4, bh2)
        mid += Math.imul(ah4, bl2)
        hi += Math.imul(ah4, bh2)
        lo += Math.imul(al3, bl3)
        mid += Math.imul(al3, bh3)
        mid += Math.imul(ah3, bl3)
        hi += Math.imul(ah3, bh3)
        lo += Math.imul(al2, bl4)
        mid += Math.imul(al2, bh4)
        mid += Math.imul(ah2, bl4)
        hi += Math.imul(ah2, bh4)
        lo += Math.imul(al1, bl5)
        mid += Math.imul(al1, bh5)
        mid += Math.imul(ah1, bl5)
        hi += Math.imul(ah1, bh5)
        lo += Math.imul(al0, bl6)
        mid += Math.imul(al0, bh6)
        mid += Math.imul(ah0, bl6)
        hi += Math.imul(ah0, bh6)
        var w6 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w6 >>> 26)
        w6 &= 0x3ffffff
        /* k = 7 */
        lo = Math.imul(al7, bl0)
        mid = Math.imul(al7, bh0)
        mid += Math.imul(ah7, bl0)
        hi = Math.imul(ah7, bh0)
        lo += Math.imul(al6, bl1)
        mid += Math.imul(al6, bh1)
        mid += Math.imul(ah6, bl1)
        hi += Math.imul(ah6, bh1)
        lo += Math.imul(al5, bl2)
        mid += Math.imul(al5, bh2)
        mid += Math.imul(ah5, bl2)
        hi += Math.imul(ah5, bh2)
        lo += Math.imul(al4, bl3)
        mid += Math.imul(al4, bh3)
        mid += Math.imul(ah4, bl3)
        hi += Math.imul(ah4, bh3)
        lo += Math.imul(al3, bl4)
        mid += Math.imul(al3, bh4)
        mid += Math.imul(ah3, bl4)
        hi += Math.imul(ah3, bh4)
        lo += Math.imul(al2, bl5)
        mid += Math.imul(al2, bh5)
        mid += Math.imul(ah2, bl5)
        hi += Math.imul(ah2, bh5)
        lo += Math.imul(al1, bl6)
        mid += Math.imul(al1, bh6)
        mid += Math.imul(ah1, bl6)
        hi += Math.imul(ah1, bh6)
        lo += Math.imul(al0, bl7)
        mid += Math.imul(al0, bh7)
        mid += Math.imul(ah0, bl7)
        hi += Math.imul(ah0, bh7)
        var w7 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w7 >>> 26)
        w7 &= 0x3ffffff
        /* k = 8 */
        lo = Math.imul(al8, bl0)
        mid = Math.imul(al8, bh0)
        mid += Math.imul(ah8, bl0)
        hi = Math.imul(ah8, bh0)
        lo += Math.imul(al7, bl1)
        mid += Math.imul(al7, bh1)
        mid += Math.imul(ah7, bl1)
        hi += Math.imul(ah7, bh1)
        lo += Math.imul(al6, bl2)
        mid += Math.imul(al6, bh2)
        mid += Math.imul(ah6, bl2)
        hi += Math.imul(ah6, bh2)
        lo += Math.imul(al5, bl3)
        mid += Math.imul(al5, bh3)
        mid += Math.imul(ah5, bl3)
        hi += Math.imul(ah5, bh3)
        lo += Math.imul(al4, bl4)
        mid += Math.imul(al4, bh4)
        mid += Math.imul(ah4, bl4)
        hi += Math.imul(ah4, bh4)
        lo += Math.imul(al3, bl5)
        mid += Math.imul(al3, bh5)
        mid += Math.imul(ah3, bl5)
        hi += Math.imul(ah3, bh5)
        lo += Math.imul(al2, bl6)
        mid += Math.imul(al2, bh6)
        mid += Math.imul(ah2, bl6)
        hi += Math.imul(ah2, bh6)
        lo += Math.imul(al1, bl7)
        mid += Math.imul(al1, bh7)
        mid += Math.imul(ah1, bl7)
        hi += Math.imul(ah1, bh7)
        lo += Math.imul(al0, bl8)
        mid += Math.imul(al0, bh8)
        mid += Math.imul(ah0, bl8)
        hi += Math.imul(ah0, bh8)
        var w8 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w8 >>> 26)
        w8 &= 0x3ffffff
        /* k = 9 */
        lo = Math.imul(al9, bl0)
        mid = Math.imul(al9, bh0)
        mid += Math.imul(ah9, bl0)
        hi = Math.imul(ah9, bh0)
        lo += Math.imul(al8, bl1)
        mid += Math.imul(al8, bh1)
        mid += Math.imul(ah8, bl1)
        hi += Math.imul(ah8, bh1)
        lo += Math.imul(al7, bl2)
        mid += Math.imul(al7, bh2)
        mid += Math.imul(ah7, bl2)
        hi += Math.imul(ah7, bh2)
        lo += Math.imul(al6, bl3)
        mid += Math.imul(al6, bh3)
        mid += Math.imul(ah6, bl3)
        hi += Math.imul(ah6, bh3)
        lo += Math.imul(al5, bl4)
        mid += Math.imul(al5, bh4)
        mid += Math.imul(ah5, bl4)
        hi += Math.imul(ah5, bh4)
        lo += Math.imul(al4, bl5)
        mid += Math.imul(al4, bh5)
        mid += Math.imul(ah4, bl5)
        hi += Math.imul(ah4, bh5)
        lo += Math.imul(al3, bl6)
        mid += Math.imul(al3, bh6)
        mid += Math.imul(ah3, bl6)
        hi += Math.imul(ah3, bh6)
        lo += Math.imul(al2, bl7)
        mid += Math.imul(al2, bh7)
        mid += Math.imul(ah2, bl7)
        hi += Math.imul(ah2, bh7)
        lo += Math.imul(al1, bl8)
        mid += Math.imul(al1, bh8)
        mid += Math.imul(ah1, bl8)
        hi += Math.imul(ah1, bh8)
        lo += Math.imul(al0, bl9)
        mid += Math.imul(al0, bh9)
        mid += Math.imul(ah0, bl9)
        hi += Math.imul(ah0, bh9)
        var w9 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w9 >>> 26)
        w9 &= 0x3ffffff
        /* k = 10 */
        lo = Math.imul(al9, bl1)
        mid = Math.imul(al9, bh1)
        mid += Math.imul(ah9, bl1)
        hi = Math.imul(ah9, bh1)
        lo += Math.imul(al8, bl2)
        mid += Math.imul(al8, bh2)
        mid += Math.imul(ah8, bl2)
        hi += Math.imul(ah8, bh2)
        lo += Math.imul(al7, bl3)
        mid += Math.imul(al7, bh3)
        mid += Math.imul(ah7, bl3)
        hi += Math.imul(ah7, bh3)
        lo += Math.imul(al6, bl4)
        mid += Math.imul(al6, bh4)
        mid += Math.imul(ah6, bl4)
        hi += Math.imul(ah6, bh4)
        lo += Math.imul(al5, bl5)
        mid += Math.imul(al5, bh5)
        mid += Math.imul(ah5, bl5)
        hi += Math.imul(ah5, bh5)
        lo += Math.imul(al4, bl6)
        mid += Math.imul(al4, bh6)
        mid += Math.imul(ah4, bl6)
        hi += Math.imul(ah4, bh6)
        lo += Math.imul(al3, bl7)
        mid += Math.imul(al3, bh7)
        mid += Math.imul(ah3, bl7)
        hi += Math.imul(ah3, bh7)
        lo += Math.imul(al2, bl8)
        mid += Math.imul(al2, bh8)
        mid += Math.imul(ah2, bl8)
        hi += Math.imul(ah2, bh8)
        lo += Math.imul(al1, bl9)
        mid += Math.imul(al1, bh9)
        mid += Math.imul(ah1, bl9)
        hi += Math.imul(ah1, bh9)
        var w10 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w10 >>> 26)
        w10 &= 0x3ffffff
        /* k = 11 */
        lo = Math.imul(al9, bl2)
        mid = Math.imul(al9, bh2)
        mid += Math.imul(ah9, bl2)
        hi = Math.imul(ah9, bh2)
        lo += Math.imul(al8, bl3)
        mid += Math.imul(al8, bh3)
        mid += Math.imul(ah8, bl3)
        hi += Math.imul(ah8, bh3)
        lo += Math.imul(al7, bl4)
        mid += Math.imul(al7, bh4)
        mid += Math.imul(ah7, bl4)
        hi += Math.imul(ah7, bh4)
        lo += Math.imul(al6, bl5)
        mid += Math.imul(al6, bh5)
        mid += Math.imul(ah6, bl5)
        hi += Math.imul(ah6, bh5)
        lo += Math.imul(al5, bl6)
        mid += Math.imul(al5, bh6)
        mid += Math.imul(ah5, bl6)
        hi += Math.imul(ah5, bh6)
        lo += Math.imul(al4, bl7)
        mid += Math.imul(al4, bh7)
        mid += Math.imul(ah4, bl7)
        hi += Math.imul(ah4, bh7)
        lo += Math.imul(al3, bl8)
        mid += Math.imul(al3, bh8)
        mid += Math.imul(ah3, bl8)
        hi += Math.imul(ah3, bh8)
        lo += Math.imul(al2, bl9)
        mid += Math.imul(al2, bh9)
        mid += Math.imul(ah2, bl9)
        hi += Math.imul(ah2, bh9)
        var w11 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w11 >>> 26)
        w11 &= 0x3ffffff
        /* k = 12 */
        lo = Math.imul(al9, bl3)
        mid = Math.imul(al9, bh3)
        mid += Math.imul(ah9, bl3)
        hi = Math.imul(ah9, bh3)
        lo += Math.imul(al8, bl4)
        mid += Math.imul(al8, bh4)
        mid += Math.imul(ah8, bl4)
        hi += Math.imul(ah8, bh4)
        lo += Math.imul(al7, bl5)
        mid += Math.imul(al7, bh5)
        mid += Math.imul(ah7, bl5)
        hi += Math.imul(ah7, bh5)
        lo += Math.imul(al6, bl6)
        mid += Math.imul(al6, bh6)
        mid += Math.imul(ah6, bl6)
        hi += Math.imul(ah6, bh6)
        lo += Math.imul(al5, bl7)
        mid += Math.imul(al5, bh7)
        mid += Math.imul(ah5, bl7)
        hi += Math.imul(ah5, bh7)
        lo += Math.imul(al4, bl8)
        mid += Math.imul(al4, bh8)
        mid += Math.imul(ah4, bl8)
        hi += Math.imul(ah4, bh8)
        lo += Math.imul(al3, bl9)
        mid += Math.imul(al3, bh9)
        mid += Math.imul(ah3, bl9)
        hi += Math.imul(ah3, bh9)
        var w12 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w12 >>> 26)
        w12 &= 0x3ffffff
        /* k = 13 */
        lo = Math.imul(al9, bl4)
        mid = Math.imul(al9, bh4)
        mid += Math.imul(ah9, bl4)
        hi = Math.imul(ah9, bh4)
        lo += Math.imul(al8, bl5)
        mid += Math.imul(al8, bh5)
        mid += Math.imul(ah8, bl5)
        hi += Math.imul(ah8, bh5)
        lo += Math.imul(al7, bl6)
        mid += Math.imul(al7, bh6)
        mid += Math.imul(ah7, bl6)
        hi += Math.imul(ah7, bh6)
        lo += Math.imul(al6, bl7)
        mid += Math.imul(al6, bh7)
        mid += Math.imul(ah6, bl7)
        hi += Math.imul(ah6, bh7)
        lo += Math.imul(al5, bl8)
        mid += Math.imul(al5, bh8)
        mid += Math.imul(ah5, bl8)
        hi += Math.imul(ah5, bh8)
        lo += Math.imul(al4, bl9)
        mid += Math.imul(al4, bh9)
        mid += Math.imul(ah4, bl9)
        hi += Math.imul(ah4, bh9)
        var w13 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w13 >>> 26)
        w13 &= 0x3ffffff
        /* k = 14 */
        lo = Math.imul(al9, bl5)
        mid = Math.imul(al9, bh5)
        mid += Math.imul(ah9, bl5)
        hi = Math.imul(ah9, bh5)
        lo += Math.imul(al8, bl6)
        mid += Math.imul(al8, bh6)
        mid += Math.imul(ah8, bl6)
        hi += Math.imul(ah8, bh6)
        lo += Math.imul(al7, bl7)
        mid += Math.imul(al7, bh7)
        mid += Math.imul(ah7, bl7)
        hi += Math.imul(ah7, bh7)
        lo += Math.imul(al6, bl8)
        mid += Math.imul(al6, bh8)
        mid += Math.imul(ah6, bl8)
        hi += Math.imul(ah6, bh8)
        lo += Math.imul(al5, bl9)
        mid += Math.imul(al5, bh9)
        mid += Math.imul(ah5, bl9)
        hi += Math.imul(ah5, bh9)
        var w14 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w14 >>> 26)
        w14 &= 0x3ffffff
        /* k = 15 */
        lo = Math.imul(al9, bl6)
        mid = Math.imul(al9, bh6)
        mid += Math.imul(ah9, bl6)
        hi = Math.imul(ah9, bh6)
        lo += Math.imul(al8, bl7)
        mid += Math.imul(al8, bh7)
        mid += Math.imul(ah8, bl7)
        hi += Math.imul(ah8, bh7)
        lo += Math.imul(al7, bl8)
        mid += Math.imul(al7, bh8)
        mid += Math.imul(ah7, bl8)
        hi += Math.imul(ah7, bh8)
        lo += Math.imul(al6, bl9)
        mid += Math.imul(al6, bh9)
        mid += Math.imul(ah6, bl9)
        hi += Math.imul(ah6, bh9)
        var w15 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w15 >>> 26)
        w15 &= 0x3ffffff
        /* k = 16 */
        lo = Math.imul(al9, bl7)
        mid = Math.imul(al9, bh7)
        mid += Math.imul(ah9, bl7)
        hi = Math.imul(ah9, bh7)
        lo += Math.imul(al8, bl8)
        mid += Math.imul(al8, bh8)
        mid += Math.imul(ah8, bl8)
        hi += Math.imul(ah8, bh8)
        lo += Math.imul(al7, bl9)
        mid += Math.imul(al7, bh9)
        mid += Math.imul(ah7, bl9)
        hi += Math.imul(ah7, bh9)
        var w16 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w16 >>> 26)
        w16 &= 0x3ffffff
        /* k = 17 */
        lo = Math.imul(al9, bl8)
        mid = Math.imul(al9, bh8)
        mid += Math.imul(ah9, bl8)
        hi = Math.imul(ah9, bh8)
        lo += Math.imul(al8, bl9)
        mid += Math.imul(al8, bh9)
        mid += Math.imul(ah8, bl9)
        hi += Math.imul(ah8, bh9)
        var w17 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w17 >>> 26)
        w17 &= 0x3ffffff
        /* k = 18 */
        lo = Math.imul(al9, bl9)
        mid = Math.imul(al9, bh9)
        mid += Math.imul(ah9, bl9)
        hi = Math.imul(ah9, bh9)
        var w18 = c + lo + ((mid & 0x1fff) << 13)
        c = hi + (mid >>> 13) + (w18 >>> 26)
        w18 &= 0x3ffffff
        o[0] = w0
        o[1] = w1
        o[2] = w2
        o[3] = w3
        o[4] = w4
        o[5] = w5
        o[6] = w6
        o[7] = w7
        o[8] = w8
        o[9] = w9
        o[10] = w10
        o[11] = w11
        o[12] = w12
        o[13] = w13
        o[14] = w14
        o[15] = w15
        o[16] = w16
        o[17] = w17
        o[18] = w18
        if (c !== 0) {
          o[19] = c
          out.length++
        }
        return out
      }

    }, {}],
    76: [function (bcryptoReq, mods, exps) {
      'use strict'
      var BN = bcryptoReq('./bn')

      function ECJPoint(x, y, z) {
        if (x === null && y === null && z === null) {
          this.x = ECJPoint.one
          this.y = ECJPoint.one
          this.z = ECJPoint.zero
        } else {
          this.x = x
          this.y = y
          this.z = z
        }

        this.zOne = this.z === ECJPoint.one
      }

      ECJPoint.zero = BN.fromNumber(0)
      ECJPoint.one = BN.fromNumber(1)

      ECJPoint.prototype.neg = function () {
        if (this.inf) return this

        return new ECJPoint(this.x, this.y.redNeg(), this.z)
      }

      ECJPoint.prototype.add = function (p) {
        // O + P = P
        if (this.inf) return p

        // P + O = P
        if (p.inf) return this

        // http://hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#addition-add-1998-cmo-2
        // 12M + 4S + 7A
        var pz2 = p.z.redSqr()
        var z2 = this.z.redSqr()
        var u1 = this.x.redMul(pz2)
        var u2 = p.x.redMul(z2)
        var s1 = this.y.redMul(pz2).redMul(p.z)
        var s2 = p.y.redMul(z2).redMul(this.z)

        var h = u1.redSub(u2)
        var r = s1.redSub(s2)
        if (h.isZero()) {
          if (r.isZero()) return this.dbl()
          return new ECJPoint(null, null, null)
        }

        var h2 = h.redSqr()
        var v = u1.redMul(h2)
        var h3 = h2.redMul(h)

        var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v)
        var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3))
        var nz = this.z.redMul(p.z).redMul(h)

        return new ECJPoint(nx, ny, nz)
      }

      ECJPoint.prototype.mixedAdd = function (p) {
        // O + P = P
        if (this.inf) return p.toECJPoint()

        // P + O = P
        if (p.inf) return this

        // http://hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#addition-add-1998-cmo-2
        //   with p.z = 1
        // 8M + 3S + 7A
        var z2 = this.z.redSqr()
        var u1 = this.x
        var u2 = p.x.redMul(z2)
        var s1 = this.y
        var s2 = p.y.redMul(z2).redMul(this.z)

        var h = u1.redSub(u2)
        var r = s1.redSub(s2)
        if (h.isZero()) {
          if (r.isZero()) return this.dbl()
          return new ECJPoint(null, null, null)
        }

        var h2 = h.redSqr()
        var v = u1.redMul(h2)
        var h3 = h2.redMul(h)

        var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v)
        var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3))
        var nz = this.z.redMul(h)

        return new ECJPoint(nx, ny, nz)
      }

      ECJPoint.prototype.dbl = function () {
        if (this.inf) return this

        var nx
        var ny
        var nz

        // Z = 1
        if (this.zOne) {
          // http://hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#doubling-mdbl-2007-bl
          // 1M + 5S + 6A + 3*2 + 1*3 + 1*8

          // XX = X1^2
          var xx = this.x.redSqr()
          // YY = Y1^2
          var yy = this.y.redSqr()
          // YYYY = YY^2
          var yyyy = yy.redSqr()
          // S = 2 * ((X1 + YY)^2 - XX - YYYY)
          var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy)
          s = s.redIAdd(s)
          // M = 3 * XX
          var m = xx.redAdd(xx).redIAdd(xx)
          // T = M ^ 2 - 2*S
          var t = m.redSqr().redISub(s).redISub(s)

          // 8 * YYYY
          var yyyy8 = yyyy.redIAdd(yyyy).redIAdd(yyyy).redIAdd(yyyy)

          // X3 = T
          nx = t
          // Y3 = M * (S - T) - 8 * YYYY
          ny = m.redMul(s.redISub(t)).redISub(yyyy8)
          // Z3 = 2*Y1
          nz = this.y.redAdd(this.y)
        } else {
          // http://hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#doubling-dbl-2009-l
          // 2M + 5S + 6A + 3*2 + 1*3 + 1*8

          // A = X1^2
          var a = this.x.redSqr()
          // B = Y1^2
          var b = this.y.redSqr()
          // C = B^2
          var c = b.redSqr()
          // D = 2 * ((X1 + B)^2 - A - C)
          var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c)
          d = d.redIAdd(d)
          // E = 3 * A
          var e = a.redAdd(a).redIAdd(a)
          // F = E^2
          var f = e.redSqr()

          // 8 * C
          var c8 = c.redIAdd(c).redIAdd(c).redIAdd(c)

          // X3 = F - 2 * D
          nx = f.redISub(d).redISub(d)
          // Y3 = E * (D - X3) - 8 * C
          ny = e.redMul(d.redISub(nx)).redISub(c8)
          // Z3 = 2 * Y1 * Z1
          nz = this.y.redMul(this.z)
          nz = nz.redIAdd(nz)
        }

        return new ECJPoint(nx, ny, nz)
      }

      ECJPoint.prototype.dblp = function (pow) {
        if (pow === 0 || this.inf) return this

        var point = this
        for (var i = 0; i < pow; i++) point = point.dbl()

        return point
      }

      Object.defineProperty(ECJPoint.prototype, 'inf', {
        enumerable: true,
        get: function () {
          return this.z.isZero()
        }
      })

      mods.exps = ECJPoint

    }, {
      "./bn": 74
    }],
    77: [function (bcryptoReq, mods, exps) {
      'use strict'
      var Buffer = bcryptoReq('safe-buffer').Buffer
      var BN = bcryptoReq('./bn')
      var ECJPoint = bcryptoReq('./ecjpoint')

      function ECPoint(x, y) {
        if (x === null && y === null) {
          this.x = this.y = null
          this.inf = true
        } else {
          this.x = x
          this.y = y
          this.inf = false
        }
      }

      ECPoint.fromPublicKey = function (publicKey) {
        var first = publicKey[0]
        var x
        var y

        if (publicKey.length === 33 && (first === 0x02 || first === 0x03)) {
          x = BN.fromBuffer(publicKey.slice(1, 33))

          // overflow
          if (x.ucmp(BN.p) >= 0) return null

          // create from X
          y = x.redSqr().redMul(x).redIAdd7().redSqrt()
          if (y === null) return null
          if ((first === 0x03) !== y.isOdd()) y = y.redNeg()

          return new ECPoint(x, y)
        }

        if (publicKey.length === 65 && (first === 0x04 || first === 0x06 || first === 0x07)) {
          x = BN.fromBuffer(publicKey.slice(1, 33))
          y = BN.fromBuffer(publicKey.slice(33, 65))

          // overflow
          if (x.ucmp(BN.p) >= 0 || y.ucmp(BN.p) >= 0) return null

          // is odd flag
          if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null

          // x*x*x + 7 = y*y
          if (x.redSqr().redMul(x).redIAdd7().ucmp(y.redSqr()) !== 0) return null

          return new ECPoint(x, y)
        }

        return null
      }

      ECPoint.prototype.toPublicKey = function (compressed) {
        var x = this.x
        var y = this.y
        var publicKey

        if (compressed) {
          publicKey = Buffer.alloc(33)
          publicKey[0] = y.isOdd() ? 0x03 : 0x02
          x.toBuffer().copy(publicKey, 1)
        } else {
          publicKey = Buffer.alloc(65)
          publicKey[0] = 0x04
          x.toBuffer().copy(publicKey, 1)
          y.toBuffer().copy(publicKey, 33)
        }

        return publicKey
      }

      ECPoint.fromECJPoint = function (p) {
        if (p.inf) return new ECPoint(null, null)

        var zinv = p.z.redInvm()
        var zinv2 = zinv.redSqr()
        var ax = p.x.redMul(zinv2)
        var ay = p.y.redMul(zinv2).redMul(zinv)

        return new ECPoint(ax, ay)
      }

      ECPoint.prototype.toECJPoint = function () {
        if (this.inf) return new ECJPoint(null, null, null)

        return new ECJPoint(this.x, this.y, ECJPoint.one)
      }

      ECPoint.prototype.neg = function () {
        if (this.inf) return this

        return new ECPoint(this.x, this.y.redNeg())
      }

      ECPoint.prototype.add = function (p) {
        // O + P = P
        if (this.inf) return p

        // P + O = P
        if (p.inf) return this

        if (this.x.ucmp(p.x) === 0) {
          // P + P = 2P
          if (this.y.ucmp(p.y) === 0) return this.dbl()
          // P + (-P) = O
          return new ECPoint(null, null)
        }

        // s = (y - yp) / (x - xp)
        // nx = s^2 - x - xp
        // ny = s * (x - nx) - y
        var s = this.y.redSub(p.y)
        if (!s.isZero()) s = s.redMul(this.x.redSub(p.x).redInvm())

        var nx = s.redSqr().redISub(this.x).redISub(p.x)
        var ny = s.redMul(this.x.redSub(nx)).redISub(this.y)
        return new ECPoint(nx, ny)
      }

      ECPoint.prototype.dbl = function () {
        if (this.inf) return this

        // 2P = O
        var yy = this.y.redAdd(this.y)
        if (yy.isZero()) return new ECPoint(null, null)

        // s = (3 * x^2) / (2 * y)
        // nx = s^2 - 2*x
        // ny = s * (x - nx) - y
        var x2 = this.x.redSqr()
        var s = x2.redAdd(x2).redIAdd(x2).redMul(yy.redInvm())

        var nx = s.redSqr().redISub(this.x.redAdd(this.x))
        var ny = s.redMul(this.x.redSub(nx)).redISub(this.y)
        return new ECPoint(nx, ny)
      }

      ECPoint.prototype.mul = function (num) {
        // Algorithm 3.36 Window NAF method for point multiplication
        var nafPoints = this._getNAFPoints(4)
        var points = nafPoints.points

        // Get NAF form
        var naf = num.getNAF(nafPoints.wnd)

        // Add `this`*(N+1) for every w-NAF index
        var acc = new ECJPoint(null, null, null)
        for (var i = naf.length - 1; i >= 0; i--) {
          // Count zeroes
          for (var k = 0; i >= 0 && naf[i] === 0; i--, ++k);
          if (i >= 0) k += 1
          acc = acc.dblp(k)

          if (i < 0) break

          // J +- P
          var z = naf[i]
          if (z > 0) {
            acc = acc.mixedAdd(points[(z - 1) >> 1])
          } else {
            acc = acc.mixedAdd(points[(-z - 1) >> 1].neg())
          }
        }

        return ECPoint.fromECJPoint(acc)
      }

      ECPoint.prototype._getNAFPoints1 = function () {
        return {
          wnd: 1,
          points: [this]
        }
      }

      ECPoint.prototype._getNAFPoints = function (wnd) {
        var points = new Array((1 << wnd) - 1)
        points[0] = this
        var dbl = this.dbl()
        for (var i = 1; i < points.length; ++i) points[i] = points[i - 1].add(dbl)
        return {
          wnd: wnd,
          points: points
        }
      }

      mods.exps = ECPoint

    }, {
      "./bn": 74,
      "./ecjpoint": 76,
      "safe-buffer": 69
    }],
    78: [function (bcryptoReq, mods, exps) {
      'use strict'
      var Buffer = bcryptoReq('safe-buffer').Buffer
      var BN = bcryptoReq('./bn')
      var ECPoint = bcryptoReq('./ecpoint')
      var ECJPoint = bcryptoReq('./ecjpoint')

      function ECPointG() {
        this.x = BN.fromBuffer(Buffer.from('79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798', 'hex'))
        this.y = BN.fromBuffer(Buffer.from('483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8', 'hex'))
        this.inf = false

        this._precompute()
      }

      ECPointG.prototype._precompute = function () {
        var ecpoint = new ECPoint(this.x, this.y)

        var dstep = 4
        var points = new Array(1 + Math.ceil(257 / dstep))
        var acc = points[0] = ecpoint
        for (var i = 1; i < points.length; ++i) {
          for (var j = 0; j < dstep; j++) acc = acc.dbl()
          points[i] = acc
        }

        this.precomputed = {
          naf: ecpoint._getNAFPoints(7),
          doubles: {
            step: dstep,
            points: points,
            negpoints: points.map(function (p) {
              return p.neg()
            })
          }
        }
      }

      ECPointG.prototype.mul = function (num) {
        // Algorithm 3.42 Fixed-base NAF windowing method for point multiplication
        var step = this.precomputed.doubles.step
        var points = this.precomputed.doubles.points
        var negpoints = this.precomputed.doubles.negpoints

        var naf = num.getNAF(1)
        var I = ((1 << (step + 1)) - (step % 2 === 0 ? 2 : 1)) / 3

        // Translate into more windowed form
        var repr = []
        for (var j = 0; j < naf.length; j += step) {
          var nafW = 0
          for (var k = j + step - 1; k >= j; k--) nafW = (nafW << 1) + naf[k]
          repr.push(nafW)
        }

        var a = new ECJPoint(null, null, null)
        var b = new ECJPoint(null, null, null)
        for (var i = I; i > 0; i--) {
          for (var jj = 0; jj < repr.length; jj++) {
            if (repr[jj] === i) {
              b = b.mixedAdd(points[jj])
            } else if (repr[jj] === -i) {
              b = b.mixedAdd(negpoints[jj])
            }
          }

          a = a.add(b)
        }

        return ECPoint.fromECJPoint(a)
      }

      ECPointG.prototype.mulAdd = function (k1, p2, k2) {
        var nafPointsP1 = this.precomputed.naf
        var nafPointsP2 = p2._getNAFPoints1()
        var wnd = [nafPointsP1.points, nafPointsP2.points]
        var naf = [k1.getNAF(nafPointsP1.wnd), k2.getNAF(nafPointsP2.wnd)]

        var acc = new ECJPoint(null, null, null)
        var tmp = [null, null]
        for (var i = Math.max(naf[0].length, naf[1].length); i >= 0; i--) {
          var k = 0

          for (; i >= 0; ++k, --i) {
            tmp[0] = naf[0][i] | 0
            tmp[1] = naf[1][i] | 0

            if (tmp[0] !== 0 || tmp[1] !== 0) break
          }

          if (i >= 0) k += 1
          acc = acc.dblp(k)

          if (i < 0) break

          for (var jj = 0; jj < 2; jj++) {
            var z = tmp[jj]
            var p
            if (z === 0) {
              continue
            } else if (z > 0) {
              p = wnd[jj][z >> 1]
            } else if (z < 0) {
              p = wnd[jj][-z >> 1].neg()
            }

            // hack: ECPoint detection
            if (p.z === undefined) {
              acc = acc.mixedAdd(p)
            } else {
              acc = acc.add(p)
            }
          }
        }

        return acc
      }

      mods.exps = new ECPointG()

    }, {
      "./bn": 74,
      "./ecjpoint": 76,
      "./ecpoint": 77,
      "safe-buffer": 69
    }],
    79: [function (bcryptoReq, mods, exps) {
      'use strict'
      var Buffer = bcryptoReq('safe-buffer').Buffer
      var createHash = bcryptoReq('create-hash')
      var HmacDRBG = bcryptoReq('drbg.js/hmac')
      var messages = bcryptoReq('../messages.json')
      var BN = bcryptoReq('./bn')
      var ECPoint = bcryptoReq('./ecpoint')
      var g = bcryptoReq('./ecpointg')

      exps.privateKeyVerify = function (privateKey) {
        var bn = BN.fromBuffer(privateKey)
        return !(bn.isOverflow() || bn.isZero())
      }

      exps.privateKeyExport = function (privateKey, compressed) {
        var d = BN.fromBuffer(privateKey)
        if (d.isOverflow() || d.isZero()) throw new Error(messages.EC_PRIVATE_KEY_EXPORT_DER_FAIL)

        return g.mul(d).toPublicKey(compressed)
      }

      exps.privateKeyNegate = function (privateKey) {
        var bn = BN.fromBuffer(privateKey)
        if (bn.isZero()) return Buffer.alloc(32)

        if (bn.ucmp(BN.n) > 0) bn.isub(BN.n)
        return BN.n.sub(bn).toBuffer()
      }

      exps.privateKeyModInverse = function (privateKey) {
        var bn = BN.fromBuffer(privateKey)
        if (bn.isOverflow() || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_RANGE_INVALID)

        return bn.uinvm().toBuffer()
      }

      exps.privateKeyTweakAdd = function (privateKey, tweak) {
        var bn = BN.fromBuffer(tweak)
        if (bn.isOverflow()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL)

        bn.iadd(BN.fromBuffer(privateKey))
        if (bn.isOverflow()) bn.isub(BN.n)
        if (bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL)

        return bn.toBuffer()
      }

      exps.privateKeyTweakMul = function (privateKey, tweak) {
        var bn = BN.fromBuffer(tweak)
        if (bn.isOverflow() || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_MUL_FAIL)

        var d = BN.fromBuffer(privateKey)
        return bn.umul(d).ureduce().toBuffer()
      }

      exps.publicKeyCreate = function (privateKey, compressed) {
        var d = BN.fromBuffer(privateKey)
        if (d.isOverflow() || d.isZero()) throw new Error(messages.EC_PUBLIC_KEY_CREATE_FAIL)

        return g.mul(d).toPublicKey(compressed)
      }

      exps.publicKeyConvert = function (publicKey, compressed) {
        var point = ECPoint.fromPublicKey(publicKey)
        if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

        return point.toPublicKey(compressed)
      }

      exps.publicKeyVerify = function (publicKey) {
        return ECPoint.fromPublicKey(publicKey) !== null
      }

      exps.publicKeyTweakAdd = function (publicKey, tweak, compressed) {
        var point = ECPoint.fromPublicKey(publicKey)
        if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

        tweak = BN.fromBuffer(tweak)
        if (tweak.isOverflow()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_ADD_FAIL)

        return g.mul(tweak).add(point).toPublicKey(compressed)
      }

      exps.publicKeyTweakMul = function (publicKey, tweak, compressed) {
        var point = ECPoint.fromPublicKey(publicKey)
        if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

        tweak = BN.fromBuffer(tweak)
        if (tweak.isOverflow() || tweak.isZero()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_MUL_FAIL)

        return point.mul(tweak).toPublicKey(compressed)
      }

      exps.publicKeyCombine = function (publicKeys, compressed) {
        var points = new Array(publicKeys.length)
        for (var i = 0; i < publicKeys.length; ++i) {
          points[i] = ECPoint.fromPublicKey(publicKeys[i])
          if (points[i] === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)
        }

        var point = points[0]
        for (var j = 1; j < points.length; ++j) point = point.add(points[j])
        if (point.inf) throw new Error(messages.EC_PUBLIC_KEY_COMBINE_FAIL)

        return point.toPublicKey(compressed)
      }

      exps.signatureNormalize = function (signature) {
        var r = BN.fromBuffer(signature.slice(0, 32))
        var s = BN.fromBuffer(signature.slice(32, 64))
        if (r.isOverflow() || s.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

        var result = Buffer.from(signature)
        if (s.isHigh()) BN.n.sub(s).toBuffer().copy(result, 32)

        return result
      }

      exps.signatureExport = function (signature) {
        var r = signature.slice(0, 32)
        var s = signature.slice(32, 64)
        if (BN.fromBuffer(r).isOverflow() || BN.fromBuffer(s).isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

        return {
          r: r,
          s: s
        }
      }

      exps.signatureImport = function (sigObj) {
        var r = BN.fromBuffer(sigObj.r)
        if (r.isOverflow()) r = BN.fromNumber(0)

        var s = BN.fromBuffer(sigObj.s)
        if (s.isOverflow()) s = BN.fromNumber(0)

        return Buffer.concat([r.toBuffer(), s.toBuffer()])
      }

      exps.sign = function (message, privateKey, noncefn, data) {
        var d = BN.fromBuffer(privateKey)
        if (d.isOverflow() || d.isZero()) throw new Error(messages.ECDSA_SIGN_FAIL)

        if (noncefn === null) {
          var drbg = new HmacDRBG('sha256', privateKey, message, data)
          noncefn = function () {
            return drbg.generate(32)
          }
        }

        var bnMessage = BN.fromBuffer(message)
        for (var count = 0;; ++count) {
          var nonce = noncefn(message, privateKey, null, data, count)
          if (!Buffer.isBuffer(nonce) || nonce.length !== 32) throw new Error(messages.ECDSA_SIGN_FAIL)

          var k = BN.fromBuffer(nonce)
          if (k.isOverflow() || k.isZero()) continue

          var kp = g.mul(k)
          var r = kp.x.fireduce()
          if (r.isZero()) continue

          var s = k.uinvm().umul(r.umul(d).ureduce().iadd(bnMessage).fireduce()).ureduce()
          if (s.isZero()) continue

          var recovery = (kp.x.ucmp(r) !== 0 ? 2 : 0) | (kp.y.isOdd() ? 1 : 0)
          if (s.isHigh()) {
            s = BN.n.sub(s)
            recovery ^= 1
          }

          return {
            signature: Buffer.concat([r.toBuffer(), s.toBuffer()]),
            recovery: recovery
          }
        }
      }

      exps.verify = function (message, signature, publicKey) {
        var sigr = BN.fromBuffer(signature.slice(0, 32))
        var sigs = BN.fromBuffer(signature.slice(32, 64))
        if (sigr.isOverflow() || sigs.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

        if (sigs.isHigh() || sigr.isZero() || sigs.isZero()) return false

        var pub = ECPoint.fromPublicKey(publicKey)
        if (pub === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

        var sinv = sigs.uinvm()
        var u1 = sinv.umul(BN.fromBuffer(message)).ureduce()
        var u2 = sinv.umul(sigr).ureduce()
        var point = g.mulAdd(u1, pub, u2)
        if (point.inf) return false

        // return ECPoint.fromECJPoint(point).x.fireduce().ucmp(sigr) === 0
        // Inversion-free
        var z2 = point.z.redSqr()
        if (sigr.redMul(z2).ucmp(point.x) === 0) return true
        if (sigr.ucmp(BN.psn) >= 0) return false

        return sigr.iadd(BN.psn).redMul(z2).ucmp(point.x) === 0
      }

      exps.recover = function (message, signature, recovery, compressed) {
        var sigr = BN.fromBuffer(signature.slice(0, 32))
        var sigs = BN.fromBuffer(signature.slice(32, 64))
        if (sigr.isOverflow() || sigs.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)

        do {
          if (sigr.isZero() || sigs.isZero()) break

          var kpx = sigr
          if (recovery >> 1) {
            if (kpx.ucmp(BN.psn) >= 0) break
            kpx = sigr.add(BN.n)
          }

          var kpPublicKey = Buffer.concat([Buffer.from([0x02 + (recovery & 0x01)]), kpx.toBuffer()])
          var kp = ECPoint.fromPublicKey(kpPublicKey)
          if (kp === null) break

          var rInv = sigr.uinvm()
          var s1 = BN.n.sub(BN.fromBuffer(message)).umul(rInv).ureduce()
          var s2 = sigs.umul(rInv).ureduce()
          var point = ECPoint.fromECJPoint(g.mulAdd(s1, kp, s2))
          return point.toPublicKey(compressed)
        } while (false)

        throw new Error(messages.ECDSA_RECOVER_FAIL)
      }

      exps.ecdh = function (publicKey, privateKey) {
        var shared = exps.ecdhUnsafe(publicKey, privateKey, true)
        return createHash('sha256').update(shared).digest()
      }

      exps.ecdhUnsafe = function (publicKey, privateKey, compressed) {
        var point = ECPoint.fromPublicKey(publicKey)
        if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL)

        var scalar = BN.fromBuffer(privateKey)
        if (scalar.isOverflow() || scalar.isZero()) throw new Error(messages.ECDH_FAIL)

        return point.mul(scalar).toPublicKey(compressed)
      }

    }, {
      "../messages.json": 80,
      "./bn": 74,
      "./ecpoint": 77,
      "./ecpointg": 78,
      "create-hash": 59,
      "drbg.js/hmac": 63,
      "safe-buffer": 69
    }],
    80: [function (bcryptoReq, mods, exps) {
      mods.exps = {
        "COMPRESSED_TYPE_INVALID": "compressed should be a boolean",
        "EC_PRIVATE_KEY_TYPE_INVALID": "private key should be a Buffer",
        "EC_PRIVATE_KEY_LENGTH_INVALID": "private key length is invalid",
        "EC_PRIVATE_KEY_RANGE_INVALID": "private key range is invalid",
        "EC_PRIVATE_KEY_TWEAK_ADD_FAIL": "tweak out of range or resulting private key is invalid",
        "EC_PRIVATE_KEY_TWEAK_MUL_FAIL": "tweak out of range",
        "EC_PRIVATE_KEY_EXPORT_DER_FAIL": "couldn't export to DER format",
        "EC_PRIVATE_KEY_IMPORT_DER_FAIL": "couldn't import from DER format",
        "EC_PUBLIC_KEYS_TYPE_INVALID": "public keys should be an Array",
        "EC_PUBLIC_KEYS_LENGTH_INVALID": "public keys Array should have at least 1 element",
        "EC_PUBLIC_KEY_TYPE_INVALID": "public key should be a Buffer",
        "EC_PUBLIC_KEY_LENGTH_INVALID": "public key length is invalid",
        "EC_PUBLIC_KEY_PARSE_FAIL": "the public key could not be parsed or is invalid",
        "EC_PUBLIC_KEY_CREATE_FAIL": "private was invalid, try again",
        "EC_PUBLIC_KEY_TWEAK_ADD_FAIL": "tweak out of range or resulting public key is invalid",
        "EC_PUBLIC_KEY_TWEAK_MUL_FAIL": "tweak out of range",
        "EC_PUBLIC_KEY_COMBINE_FAIL": "the sum of the public keys is not valid",
        "ECDH_FAIL": "scalar was invalid (zero or overflow)",
        "ECDSA_SIGNATURE_TYPE_INVALID": "signature should be a Buffer",
        "ECDSA_SIGNATURE_LENGTH_INVALID": "signature length is invalid",
        "ECDSA_SIGNATURE_PARSE_FAIL": "couldn't parse signature",
        "ECDSA_SIGNATURE_PARSE_DER_FAIL": "couldn't parse DER signature",
        "ECDSA_SIGNATURE_SERIALIZE_DER_FAIL": "couldn't serialize signature to DER format",
        "ECDSA_SIGN_FAIL": "nonce generation function failed or private key is invalid",
        "ECDSA_RECOVER_FAIL": "couldn't recover public key from signature",
        "MSG32_TYPE_INVALID": "message should be a Buffer",
        "MSG32_LENGTH_INVALID": "message length is invalid",
        "OPTIONS_TYPE_INVALID": "options should be an Object",
        "OPTIONS_DATA_TYPE_INVALID": "options.data should be a Buffer",
        "OPTIONS_DATA_LENGTH_INVALID": "options.data length is invalid",
        "OPTIONS_NONCEFN_TYPE_INVALID": "options.noncefn should be a Function",
        "RECOVERY_ID_TYPE_INVALID": "recovery should be a Number",
        "RECOVERY_ID_VALUE_INVALID": "recovery should have value between -1 and 4",
        "TWEAK_TYPE_INVALID": "tweak should be a Buffer",
        "TWEAK_LENGTH_INVALID": "tweak length is invalid"
      }

    }, {}],
    81: [function (bcryptoReq, mods, exps) {
      var Buffer = bcryptoReq('safe-buffer').Buffer

      // prototype class for hash functions
      function Hash(blockSize, finalSize) {
        this._block = Buffer.alloc(blockSize)
        this._finalSize = finalSize
        this._blockSize = blockSize
        this._len = 0
      }

      Hash.prototype.update = function (data, enc) {
        if (typeof data === 'string') {
          enc = enc || 'utf8'
          data = Buffer.from(data, enc)
        }

        var block = this._block
        var blockSize = this._blockSize
        var length = data.length
        var accum = this._len

        for (var offset = 0; offset < length;) {
          var assigned = accum % blockSize
          var remainder = Math.min(length - offset, blockSize - assigned)

          for (var i = 0; i < remainder; i++) {
            block[assigned + i] = data[offset + i]
          }

          accum += remainder
          offset += remainder

          if ((accum % blockSize) === 0) {
            this._update(block)
          }
        }

        this._len += length
        return this
      }

      Hash.prototype.digest = function (enc) {
        var rem = this._len % this._blockSize

        this._block[rem] = 0x80

        // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
        // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
        this._block.fill(0, rem + 1)

        if (rem >= this._finalSize) {
          this._update(this._block)
          this._block.fill(0)
        }

        var bits = this._len * 8

        // uint32
        if (bits <= 0xffffffff) {
          this._block.writeUInt32BE(bits, this._blockSize - 4)

          // uint64
        } else {
          var lowBits = (bits & 0xffffffff) >>> 0
          var highBits = (bits - lowBits) / 0x100000000

          this._block.writeUInt32BE(highBits, this._blockSize - 8)
          this._block.writeUInt32BE(lowBits, this._blockSize - 4)
        }

        this._update(this._block)
        var hash = this._hash()

        return enc ? hash.toString(enc) : hash
      }

      Hash.prototype._update = function () {
        throw new Error('_update must be implemented by subclass')
      }

      mods.exps = Hash

    }, {
      "safe-buffer": 69
    }],
    82: [function (bcryptoReq, mods, exps) {
      var exps = mods.exps = function SHA(algorithm) {
        algorithm = algorithm.toLowerCase()

        var Algorithm = exps[algorithm]
        if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

        return new Algorithm()
      }

      exps.sha = bcryptoReq('./sha')
      exps.sha1 = bcryptoReq('./sha1')
      exps.sha224 = bcryptoReq('./sha224')
      exps.sha256 = bcryptoReq('./sha256')
      exps.sha384 = bcryptoReq('./sha384')
      exps.sha512 = bcryptoReq('./sha512')

    }, {
      "./sha": 83,
      "./sha1": 84,
      "./sha224": 85,
      "./sha256": 86,
      "./sha384": 87,
      "./sha512": 88
    }],
    83: [function (bcryptoReq, mods, exps) {
      /*
       * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
       * in FIPS PUB 180-1
       * This source code is derived from sha1.js of the same repository.
       * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
       * operation was added.
       */

      var inherits = bcryptoReq('inherits')
      var Hash = bcryptoReq('./hash')
      var Buffer = bcryptoReq('safe-buffer').Buffer

      var K = [
        0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
      ]

      var W = new Array(80)

      function Sha() {
        this.init()
        this._w = W

        Hash.call(this, 64, 56)
      }

      inherits(Sha, Hash)

      Sha.prototype.init = function () {
        this._a = 0x67452301
        this._b = 0xefcdab89
        this._c = 0x98badcfe
        this._d = 0x10325476
        this._e = 0xc3d2e1f0

        return this
      }

      function rotl5(num) {
        return (num << 5) | (num >>> 27)
      }

      function rotl30(num) {
        return (num << 30) | (num >>> 2)
      }

      function ft(s, b, c, d) {
        if (s === 0) return (b & c) | ((~b) & d)
        if (s === 2) return (b & c) | (b & d) | (c & d)
        return b ^ c ^ d
      }

      Sha.prototype._update = function (M) {
        var W = this._w

        var a = this._a | 0
        var b = this._b | 0
        var c = this._c | 0
        var d = this._d | 0
        var e = this._e | 0

        for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
        for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]

        for (var j = 0; j < 80; ++j) {
          var s = ~~(j / 20)
          var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

          e = d
          d = c
          c = rotl30(b)
          b = a
          a = t
        }

        this._a = (a + this._a) | 0
        this._b = (b + this._b) | 0
        this._c = (c + this._c) | 0
        this._d = (d + this._d) | 0
        this._e = (e + this._e) | 0
      }

      Sha.prototype._hash = function () {
        var H = Buffer.allocUnsafe(20)

        H.writeInt32BE(this._a | 0, 0)
        H.writeInt32BE(this._b | 0, 4)
        H.writeInt32BE(this._c | 0, 8)
        H.writeInt32BE(this._d | 0, 12)
        H.writeInt32BE(this._e | 0, 16)

        return H
      }

      mods.exps = Sha

    }, {
      "./hash": 81,
      "inherits": 66,
      "safe-buffer": 69
    }],
    84: [function (bcryptoReq, mods, exps) {
      /*
       * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
       * in FIPS PUB 180-1
       * Version 2.1a Copyright Paul Johnston 2000 - 2002.
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       * Distributed under the BSD License
       * See http://pajhome.org.uk/crypt/md5 for details.
       */

      var inherits = bcryptoReq('inherits')
      var Hash = bcryptoReq('./hash')
      var Buffer = bcryptoReq('safe-buffer').Buffer

      var K = [
        0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
      ]

      var W = new Array(80)

      function Sha1() {
        this.init()
        this._w = W

        Hash.call(this, 64, 56)
      }

      inherits(Sha1, Hash)

      Sha1.prototype.init = function () {
        this._a = 0x67452301
        this._b = 0xefcdab89
        this._c = 0x98badcfe
        this._d = 0x10325476
        this._e = 0xc3d2e1f0

        return this
      }

      function rotl1(num) {
        return (num << 1) | (num >>> 31)
      }

      function rotl5(num) {
        return (num << 5) | (num >>> 27)
      }

      function rotl30(num) {
        return (num << 30) | (num >>> 2)
      }

      function ft(s, b, c, d) {
        if (s === 0) return (b & c) | ((~b) & d)
        if (s === 2) return (b & c) | (b & d) | (c & d)
        return b ^ c ^ d
      }

      Sha1.prototype._update = function (M) {
        var W = this._w

        var a = this._a | 0
        var b = this._b | 0
        var c = this._c | 0
        var d = this._d | 0
        var e = this._e | 0

        for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
        for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])

        for (var j = 0; j < 80; ++j) {
          var s = ~~(j / 20)
          var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

          e = d
          d = c
          c = rotl30(b)
          b = a
          a = t
        }

        this._a = (a + this._a) | 0
        this._b = (b + this._b) | 0
        this._c = (c + this._c) | 0
        this._d = (d + this._d) | 0
        this._e = (e + this._e) | 0
      }

      Sha1.prototype._hash = function () {
        var H = Buffer.allocUnsafe(20)

        H.writeInt32BE(this._a | 0, 0)
        H.writeInt32BE(this._b | 0, 4)
        H.writeInt32BE(this._c | 0, 8)
        H.writeInt32BE(this._d | 0, 12)
        H.writeInt32BE(this._e | 0, 16)

        return H
      }

      mods.exps = Sha1

    }, {
      "./hash": 81,
      "inherits": 66,
      "safe-buffer": 69
    }],
    85: [function (bcryptoReq, mods, exps) {
      /**
       * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
       * in FIPS 180-2
       * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       *
       */

      var inherits = bcryptoReq('inherits')
      var Sha256 = bcryptoReq('./sha256')
      var Hash = bcryptoReq('./hash')
      var Buffer = bcryptoReq('safe-buffer').Buffer

      var W = new Array(64)

      function Sha224() {
        this.init()

        this._w = W // new Array(64)

        Hash.call(this, 64, 56)
      }

      inherits(Sha224, Sha256)

      Sha224.prototype.init = function () {
        this._a = 0xc1059ed8
        this._b = 0x367cd507
        this._c = 0x3070dd17
        this._d = 0xf70e5939
        this._e = 0xffc00b31
        this._f = 0x68581511
        this._g = 0x64f98fa7
        this._h = 0xbefa4fa4

        return this
      }

      Sha224.prototype._hash = function () {
        var H = Buffer.allocUnsafe(28)

        H.writeInt32BE(this._a, 0)
        H.writeInt32BE(this._b, 4)
        H.writeInt32BE(this._c, 8)
        H.writeInt32BE(this._d, 12)
        H.writeInt32BE(this._e, 16)
        H.writeInt32BE(this._f, 20)
        H.writeInt32BE(this._g, 24)

        return H
      }

      mods.exps = Sha224

    }, {
      "./hash": 81,
      "./sha256": 86,
      "inherits": 66,
      "safe-buffer": 69
    }],
    86: [function (bcryptoReq, mods, exps) {
      /**
       * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
       * in FIPS 180-2
       * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       *
       */

      var inherits = bcryptoReq('inherits')
      var Hash = bcryptoReq('./hash')
      var Buffer = bcryptoReq('safe-buffer').Buffer

      var K = [
        0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
        0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
        0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
        0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
        0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
        0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
        0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
        0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
        0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
        0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
        0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
        0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
        0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
        0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
        0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
        0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
      ]

      var W = new Array(64)

      function Sha256() {
        this.init()

        this._w = W // new Array(64)

        Hash.call(this, 64, 56)
      }

      inherits(Sha256, Hash)

      Sha256.prototype.init = function () {
        this._a = 0x6a09e667
        this._b = 0xbb67ae85
        this._c = 0x3c6ef372
        this._d = 0xa54ff53a
        this._e = 0x510e527f
        this._f = 0x9b05688c
        this._g = 0x1f83d9ab
        this._h = 0x5be0cd19

        return this
      }

      function ch(x, y, z) {
        return z ^ (x & (y ^ z))
      }

      function maj(x, y, z) {
        return (x & y) | (z & (x | y))
      }

      function sigma0(x) {
        return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
      }

      function sigma1(x) {
        return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
      }

      function gamma0(x) {
        return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
      }

      function gamma1(x) {
        return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
      }

      Sha256.prototype._update = function (M) {
        var W = this._w

        var a = this._a | 0
        var b = this._b | 0
        var c = this._c | 0
        var d = this._d | 0
        var e = this._e | 0
        var f = this._f | 0
        var g = this._g | 0
        var h = this._h | 0

        for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
        for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0

        for (var j = 0; j < 64; ++j) {
          var T1 = (h + sigma1(e) + ch(e, f, g) + K[j] + W[j]) | 0
          var T2 = (sigma0(a) + maj(a, b, c)) | 0

          h = g
          g = f
          f = e
          e = (d + T1) | 0
          d = c
          c = b
          b = a
          a = (T1 + T2) | 0
        }

        this._a = (a + this._a) | 0
        this._b = (b + this._b) | 0
        this._c = (c + this._c) | 0
        this._d = (d + this._d) | 0
        this._e = (e + this._e) | 0
        this._f = (f + this._f) | 0
        this._g = (g + this._g) | 0
        this._h = (h + this._h) | 0
      }

      Sha256.prototype._hash = function () {
        var H = Buffer.allocUnsafe(32)

        H.writeInt32BE(this._a, 0)
        H.writeInt32BE(this._b, 4)
        H.writeInt32BE(this._c, 8)
        H.writeInt32BE(this._d, 12)
        H.writeInt32BE(this._e, 16)
        H.writeInt32BE(this._f, 20)
        H.writeInt32BE(this._g, 24)
        H.writeInt32BE(this._h, 28)

        return H
      }

      mods.exps = Sha256

    }, {
      "./hash": 81,
      "inherits": 66,
      "safe-buffer": 69
    }],
    87: [function (bcryptoReq, mods, exps) {
      var inherits = bcryptoReq('inherits')
      var SHA512 = bcryptoReq('./sha512')
      var Hash = bcryptoReq('./hash')
      var Buffer = bcryptoReq('safe-buffer').Buffer

      var W = new Array(160)

      function Sha384() {
        this.init()
        this._w = W

        Hash.call(this, 128, 112)
      }

      inherits(Sha384, SHA512)

      Sha384.prototype.init = function () {
        this._ah = 0xcbbb9d5d
        this._bh = 0x629a292a
        this._ch = 0x9159015a
        this._dh = 0x152fecd8
        this._eh = 0x67332667
        this._fh = 0x8eb44a87
        this._gh = 0xdb0c2e0d
        this._hh = 0x47b5481d

        this._al = 0xc1059ed8
        this._bl = 0x367cd507
        this._cl = 0x3070dd17
        this._dl = 0xf70e5939
        this._el = 0xffc00b31
        this._fl = 0x68581511
        this._gl = 0x64f98fa7
        this._hl = 0xbefa4fa4

        return this
      }

      Sha384.prototype._hash = function () {
        var H = Buffer.allocUnsafe(48)

        function writeInt64BE(h, l, offset) {
          H.writeInt32BE(h, offset)
          H.writeInt32BE(l, offset + 4)
        }

        writeInt64BE(this._ah, this._al, 0)
        writeInt64BE(this._bh, this._bl, 8)
        writeInt64BE(this._ch, this._cl, 16)
        writeInt64BE(this._dh, this._dl, 24)
        writeInt64BE(this._eh, this._el, 32)
        writeInt64BE(this._fh, this._fl, 40)

        return H
      }

      mods.exps = Sha384

    }, {
      "./hash": 81,
      "./sha512": 88,
      "inherits": 66,
      "safe-buffer": 69
    }],
    88: [function (bcryptoReq, mods, exps) {
      var inherits = bcryptoReq('inherits')
      var Hash = bcryptoReq('./hash')
      var Buffer = bcryptoReq('safe-buffer').Buffer

      var K = [
        0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
        0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
        0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
        0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
        0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
        0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
        0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
        0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
        0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
        0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
        0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
        0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
        0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
        0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
        0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
        0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
        0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
        0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
        0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
        0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
        0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
        0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
        0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
        0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
        0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
        0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
        0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
        0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
        0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
        0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
        0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
        0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
        0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
        0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
        0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
        0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
        0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
        0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
        0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
        0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
      ]

      var W = new Array(160)

      function Sha512() {
        this.init()
        this._w = W

        Hash.call(this, 128, 112)
      }

      inherits(Sha512, Hash)

      Sha512.prototype.init = function () {
        this._ah = 0x6a09e667
        this._bh = 0xbb67ae85
        this._ch = 0x3c6ef372
        this._dh = 0xa54ff53a
        this._eh = 0x510e527f
        this._fh = 0x9b05688c
        this._gh = 0x1f83d9ab
        this._hh = 0x5be0cd19

        this._al = 0xf3bcc908
        this._bl = 0x84caa73b
        this._cl = 0xfe94f82b
        this._dl = 0x5f1d36f1
        this._el = 0xade682d1
        this._fl = 0x2b3e6c1f
        this._gl = 0xfb41bd6b
        this._hl = 0x137e2179

        return this
      }

      function Ch(x, y, z) {
        return z ^ (x & (y ^ z))
      }

      function maj(x, y, z) {
        return (x & y) | (z & (x | y))
      }

      function sigma0(x, xl) {
        return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
      }

      function sigma1(x, xl) {
        return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
      }

      function Gamma0(x, xl) {
        return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
      }

      function Gamma0l(x, xl) {
        return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
      }

      function Gamma1(x, xl) {
        return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
      }

      function Gamma1l(x, xl) {
        return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
      }

      function getCarry(a, b) {
        return (a >>> 0) < (b >>> 0) ? 1 : 0
      }

      Sha512.prototype._update = function (M) {
        var W = this._w

        var ah = this._ah | 0
        var bh = this._bh | 0
        var ch = this._ch | 0
        var dh = this._dh | 0
        var eh = this._eh | 0
        var fh = this._fh | 0
        var gh = this._gh | 0
        var hh = this._hh | 0

        var al = this._al | 0
        var bl = this._bl | 0
        var cl = this._cl | 0
        var dl = this._dl | 0
        var el = this._el | 0
        var fl = this._fl | 0
        var gl = this._gl | 0
        var hl = this._hl | 0

        for (var i = 0; i < 32; i += 2) {
          W[i] = M.readInt32BE(i * 4)
          W[i + 1] = M.readInt32BE(i * 4 + 4)
        }
        for (; i < 160; i += 2) {
          var xh = W[i - 15 * 2]
          var xl = W[i - 15 * 2 + 1]
          var gamma0 = Gamma0(xh, xl)
          var gamma0l = Gamma0l(xl, xh)

          xh = W[i - 2 * 2]
          xl = W[i - 2 * 2 + 1]
          var gamma1 = Gamma1(xh, xl)
          var gamma1l = Gamma1l(xl, xh)

          // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
          var Wi7h = W[i - 7 * 2]
          var Wi7l = W[i - 7 * 2 + 1]

          var Wi16h = W[i - 16 * 2]
          var Wi16l = W[i - 16 * 2 + 1]

          var Wil = (gamma0l + Wi7l) | 0
          var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0
          Wil = (Wil + gamma1l) | 0
          Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0
          Wil = (Wil + Wi16l) | 0
          Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0

          W[i] = Wih
          W[i + 1] = Wil
        }

        for (var j = 0; j < 160; j += 2) {
          Wih = W[j]
          Wil = W[j + 1]

          var majh = maj(ah, bh, ch)
          var majl = maj(al, bl, cl)

          var sigma0h = sigma0(ah, al)
          var sigma0l = sigma0(al, ah)
          var sigma1h = sigma1(eh, el)
          var sigma1l = sigma1(el, eh)

          // t1 = h + sigma1 + ch + K[j] + W[j]
          var Kih = K[j]
          var Kil = K[j + 1]

          var chh = Ch(eh, fh, gh)
          var chl = Ch(el, fl, gl)

          var t1l = (hl + sigma1l) | 0
          var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0
          t1l = (t1l + chl) | 0
          t1h = (t1h + chh + getCarry(t1l, chl)) | 0
          t1l = (t1l + Kil) | 0
          t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0
          t1l = (t1l + Wil) | 0
          t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0

          // t2 = sigma0 + maj
          var t2l = (sigma0l + majl) | 0
          var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0

          hh = gh
          hl = gl
          gh = fh
          gl = fl
          fh = eh
          fl = el
          el = (dl + t1l) | 0
          eh = (dh + t1h + getCarry(el, dl)) | 0
          dh = ch
          dl = cl
          ch = bh
          cl = bl
          bh = ah
          bl = al
          al = (t1l + t2l) | 0
          ah = (t1h + t2h + getCarry(al, t1l)) | 0
        }

        this._al = (this._al + al) | 0
        this._bl = (this._bl + bl) | 0
        this._cl = (this._cl + cl) | 0
        this._dl = (this._dl + dl) | 0
        this._el = (this._el + el) | 0
        this._fl = (this._fl + fl) | 0
        this._gl = (this._gl + gl) | 0
        this._hl = (this._hl + hl) | 0

        this._ah = (this._ah + ah + getCarry(this._al, al)) | 0
        this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0
        this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0
        this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0
        this._eh = (this._eh + eh + getCarry(this._el, el)) | 0
        this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0
        this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0
        this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0
      }

      Sha512.prototype._hash = function () {
        var H = Buffer.allocUnsafe(64)

        function writeInt64BE(h, l, offset) {
          H.writeInt32BE(h, offset)
          H.writeInt32BE(l, offset + 4)
        }

        writeInt64BE(this._ah, this._al, 0)
        writeInt64BE(this._bh, this._bl, 8)
        writeInt64BE(this._ch, this._cl, 16)
        writeInt64BE(this._dh, this._dl, 24)
        writeInt64BE(this._eh, this._el, 32)
        writeInt64BE(this._fh, this._fl, 40)
        writeInt64BE(this._gh, this._gl, 48)
        writeInt64BE(this._hh, this._hl, 56)

        return H
      }

      mods.exps = Sha512

    }, {
      "./hash": 81,
      "inherits": 66,
      "safe-buffer": 69
    }]
  }, {}, []);

  module.exports = bcryptoReq("/bcrypto.js");
});