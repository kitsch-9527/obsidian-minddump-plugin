var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/moment/moment.js
var require_moment = __commonJS({
  "node_modules/moment/moment.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.moment = factory();
    })(exports, function() {
      "use strict";
      var hookCallback;
      function hooks() {
        return hookCallback.apply(null, arguments);
      }
      function setHookCallback(callback) {
        hookCallback = callback;
      }
      function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
      }
      function isObject(input) {
        return input != null && Object.prototype.toString.call(input) === "[object Object]";
      }
      function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }
      function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
          return Object.getOwnPropertyNames(obj).length === 0;
        } else {
          var k;
          for (k in obj) {
            if (hasOwnProp(obj, k)) {
              return false;
            }
          }
          return true;
        }
      }
      function isUndefined(input) {
        return input === void 0;
      }
      function isNumber(input) {
        return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
      }
      function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
      }
      function map(arr, fn) {
        var res = [], i, arrLen = arr.length;
        for (i = 0; i < arrLen; ++i) {
          res.push(fn(arr[i], i));
        }
        return res;
      }
      function extend(a, b) {
        for (var i in b) {
          if (hasOwnProp(b, i)) {
            a[i] = b[i];
          }
        }
        if (hasOwnProp(b, "toString")) {
          a.toString = b.toString;
        }
        if (hasOwnProp(b, "valueOf")) {
          a.valueOf = b.valueOf;
        }
        return a;
      }
      function createUTC(input, format2, locale2, strict) {
        return createLocalOrUTC(input, format2, locale2, strict, true).utc();
      }
      function defaultParsingFlags() {
        return {
          empty: false,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: false,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: false,
          userInvalidated: false,
          iso: false,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: false,
          weekdayMismatch: false
        };
      }
      function getParsingFlags(m) {
        if (m._pf == null) {
          m._pf = defaultParsingFlags();
        }
        return m._pf;
      }
      var some;
      if (Array.prototype.some) {
        some = Array.prototype.some;
      } else {
        some = function(fun) {
          var t2 = Object(this), len = t2.length >>> 0, i;
          for (i = 0; i < len; i++) {
            if (i in t2 && fun.call(this, t2[i], i, t2)) {
              return true;
            }
          }
          return false;
        };
      }
      function isValid(m) {
        if (m._isValid == null) {
          var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i) {
            return i != null;
          }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
          if (m._strict) {
            isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
          }
          if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
          } else {
            return isNowValid;
          }
        }
        return m._isValid;
      }
      function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
          extend(getParsingFlags(m), flags);
        } else {
          getParsingFlags(m).userInvalidated = true;
        }
        return m;
      }
      var momentProperties = hooks.momentProperties = [], updateInProgress = false;
      function copyConfig(to2, from2) {
        var i, prop, val, momentPropertiesLen = momentProperties.length;
        if (!isUndefined(from2._isAMomentObject)) {
          to2._isAMomentObject = from2._isAMomentObject;
        }
        if (!isUndefined(from2._i)) {
          to2._i = from2._i;
        }
        if (!isUndefined(from2._f)) {
          to2._f = from2._f;
        }
        if (!isUndefined(from2._l)) {
          to2._l = from2._l;
        }
        if (!isUndefined(from2._strict)) {
          to2._strict = from2._strict;
        }
        if (!isUndefined(from2._tzm)) {
          to2._tzm = from2._tzm;
        }
        if (!isUndefined(from2._isUTC)) {
          to2._isUTC = from2._isUTC;
        }
        if (!isUndefined(from2._offset)) {
          to2._offset = from2._offset;
        }
        if (!isUndefined(from2._pf)) {
          to2._pf = getParsingFlags(from2);
        }
        if (!isUndefined(from2._locale)) {
          to2._locale = from2._locale;
        }
        if (momentPropertiesLen > 0) {
          for (i = 0; i < momentPropertiesLen; i++) {
            prop = momentProperties[i];
            val = from2[prop];
            if (!isUndefined(val)) {
              to2[prop] = val;
            }
          }
        }
        return to2;
      }
      function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
          this._d = /* @__PURE__ */ new Date(NaN);
        }
        if (updateInProgress === false) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
        }
      }
      function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
      }
      function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
          console.warn("Deprecation warning: " + msg);
        }
      }
      function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
          }
          if (firstTime) {
            var args = [], arg, i, key, argLen = arguments.length;
            for (i = 0; i < argLen; i++) {
              arg = "";
              if (typeof arguments[i] === "object") {
                arg += "\n[" + i + "] ";
                for (key in arguments[0]) {
                  if (hasOwnProp(arguments[0], key)) {
                    arg += key + ": " + arguments[0][key] + ", ";
                  }
                }
                arg = arg.slice(0, -2);
              } else {
                arg = arguments[i];
              }
              args.push(arg);
            }
            warn(
              msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
            );
            firstTime = false;
          }
          return fn.apply(this, arguments);
        }, fn);
      }
      var deprecations = {};
      function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
        }
      }
      hooks.suppressDeprecationWarnings = false;
      hooks.deprecationHandler = null;
      function isFunction(input) {
        return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
      }
      function set(config) {
        var prop, i;
        for (i in config) {
          if (hasOwnProp(config, i)) {
            prop = config[i];
            if (isFunction(prop)) {
              this[i] = prop;
            } else {
              this["_" + i] = prop;
            }
          }
        }
        this._config = config;
        this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
        );
      }
      function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
          if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
              res[prop] = {};
              extend(res[prop], parentConfig[prop]);
              extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
              res[prop] = childConfig[prop];
            } else {
              delete res[prop];
            }
          }
        }
        for (prop in parentConfig) {
          if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
            res[prop] = extend({}, res[prop]);
          }
        }
        return res;
      }
      function Locale(config) {
        if (config != null) {
          this.set(config);
        }
      }
      var keys;
      if (Object.keys) {
        keys = Object.keys;
      } else {
        keys = function(obj) {
          var i, res = [];
          for (i in obj) {
            if (hasOwnProp(obj, i)) {
              res.push(i);
            }
          }
          return res;
        };
      }
      var defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
      };
      function calendar(key, mom, now2) {
        var output = this._calendar[key] || this._calendar["sameElse"];
        return isFunction(output) ? output.call(mom, now2) : output;
      }
      function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
        return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
      }
      var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
      function addFormatToken(token2, padded, ordinal2, callback) {
        var func = callback;
        if (typeof callback === "string") {
          func = function() {
            return this[callback]();
          };
        }
        if (token2) {
          formatTokenFunctions[token2] = func;
        }
        if (padded) {
          formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
          };
        }
        if (ordinal2) {
          formatTokenFunctions[ordinal2] = function() {
            return this.localeData().ordinal(
              func.apply(this, arguments),
              token2
            );
          };
        }
      }
      function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
          return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
      }
      function makeFormatFunction(format2) {
        var array = format2.match(formattingTokens), i, length;
        for (i = 0, length = array.length; i < length; i++) {
          if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
          } else {
            array[i] = removeFormattingTokens(array[i]);
          }
        }
        return function(mom) {
          var output = "", i2;
          for (i2 = 0; i2 < length; i2++) {
            output += isFunction(array[i2]) ? array[i2].call(mom, format2) : array[i2];
          }
          return output;
        };
      }
      function formatMoment(m, format2) {
        if (!m.isValid()) {
          return m.localeData().invalidDate();
        }
        format2 = expandFormat(format2, m.localeData());
        formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
        return formatFunctions[format2](m);
      }
      function expandFormat(format2, locale2) {
        var i = 5;
        function replaceLongDateFormatTokens(input) {
          return locale2.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format2)) {
          format2 = format2.replace(
            localFormattingTokens,
            replaceLongDateFormatTokens
          );
          localFormattingTokens.lastIndex = 0;
          i -= 1;
        }
        return format2;
      }
      var defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
      };
      function longDateFormat(key) {
        var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
        if (format2 || !formatUpper) {
          return format2;
        }
        this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
          if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
            return tok.slice(1);
          }
          return tok;
        }).join("");
        return this._longDateFormat[key];
      }
      var defaultInvalidDate = "Invalid date";
      function invalidDate() {
        return this._invalidDate;
      }
      var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
      function ordinal(number) {
        return this._ordinal.replace("%d", number);
      }
      var defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
      };
      function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
      }
      function pastFuture(diff2, output) {
        var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
        return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
      }
      var aliases = {};
      function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
      }
      function normalizeUnits(units) {
        return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
      }
      function normalizeObjectUnits(inputObject) {
        var normalizedInput = {}, normalizedProp, prop;
        for (prop in inputObject) {
          if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
              normalizedInput[normalizedProp] = inputObject[prop];
            }
          }
        }
        return normalizedInput;
      }
      var priorities = {};
      function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
      }
      function getPrioritizedUnits(unitsObj) {
        var units = [], u;
        for (u in unitsObj) {
          if (hasOwnProp(unitsObj, u)) {
            units.push({ unit: u, priority: priorities[u] });
          }
        }
        units.sort(function(a, b) {
          return a.priority - b.priority;
        });
        return units;
      }
      function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
      function absFloor(number) {
        if (number < 0) {
          return Math.ceil(number) || 0;
        } else {
          return Math.floor(number);
        }
      }
      function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion, value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
          value = absFloor(coercedNumber);
        }
        return value;
      }
      function makeGetSet(unit, keepTime) {
        return function(value) {
          if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
          } else {
            return get(this, unit);
          }
        };
      }
      function get(mom, unit) {
        return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
      }
      function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
          if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            value = toInt(value);
            mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
              value,
              mom.month(),
              daysInMonth(value, mom.month())
            );
          } else {
            mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
          }
        }
      }
      function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units]();
        }
        return this;
      }
      function stringSet(units, value) {
        if (typeof units === "object") {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
          for (i = 0; i < prioritizedLen; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
          }
        } else {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units](value);
          }
        }
        return this;
      }
      var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
      regexes = {};
      function addRegexToken(token2, regex, strictRegex) {
        regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
      }
      function getParseRegexForToken(token2, config) {
        if (!hasOwnProp(regexes, token2)) {
          return new RegExp(unescapeFormat(token2));
        }
        return regexes[token2](config._strict, config._locale);
      }
      function unescapeFormat(s) {
        return regexEscape(
          s.replace("\\", "").replace(
            /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
            function(matched, p1, p2, p3, p4) {
              return p1 || p2 || p3 || p4;
            }
          )
        );
      }
      function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      var tokens = {};
      function addParseToken(token2, callback) {
        var i, func = callback, tokenLen;
        if (typeof token2 === "string") {
          token2 = [token2];
        }
        if (isNumber(callback)) {
          func = function(input, array) {
            array[callback] = toInt(input);
          };
        }
        tokenLen = token2.length;
        for (i = 0; i < tokenLen; i++) {
          tokens[token2[i]] = func;
        }
      }
      function addWeekParseToken(token2, callback) {
        addParseToken(token2, function(input, array, config, token3) {
          config._w = config._w || {};
          callback(input, config._w, config, token3);
        });
      }
      function addTimeToArrayFromToken(token2, input, config) {
        if (input != null && hasOwnProp(tokens, token2)) {
          tokens[token2](input, config._a, config, token2);
        }
      }
      var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
      function mod(n, x) {
        return (n % x + x) % x;
      }
      var indexOf;
      if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
      } else {
        indexOf = function(o) {
          var i;
          for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
              return i;
            }
          }
          return -1;
        };
      }
      function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
          return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
      }
      addFormatToken("M", ["MM", 2], "Mo", function() {
        return this.month() + 1;
      });
      addFormatToken("MMM", 0, 0, function(format2) {
        return this.localeData().monthsShort(this, format2);
      });
      addFormatToken("MMMM", 0, 0, function(format2) {
        return this.localeData().months(this, format2);
      });
      addUnitAlias("month", "M");
      addUnitPriority("month", 8);
      addRegexToken("M", match1to2);
      addRegexToken("MM", match1to2, match2);
      addRegexToken("MMM", function(isStrict, locale2) {
        return locale2.monthsShortRegex(isStrict);
      });
      addRegexToken("MMMM", function(isStrict, locale2) {
        return locale2.monthsRegex(isStrict);
      });
      addParseToken(["M", "MM"], function(input, array) {
        array[MONTH] = toInt(input) - 1;
      });
      addParseToken(["MMM", "MMMM"], function(input, array, config, token2) {
        var month = config._locale.monthsParse(input, token2, config._strict);
        if (month != null) {
          array[MONTH] = month;
        } else {
          getParsingFlags(config).invalidMonth = input;
        }
      });
      var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
      function localeMonths(m, format2) {
        if (!m) {
          return isArray(this._months) ? this._months : this._months["standalone"];
        }
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
      }
      function localeMonthsShort(m, format2) {
        if (!m) {
          return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
      }
      function handleStrictParse(monthName, format2, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
            mom = createUTC([2e3, i]);
            this._shortMonthsParse[i] = this.monthsShort(
              mom,
              ""
            ).toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format2 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format2 === "MMM") {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeMonthsParse(monthName, format2, strict) {
        var i, mom, regex;
        if (this._monthsParseExact) {
          return handleStrictParse.call(this, monthName, format2, strict);
        }
        if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
        }
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp(
              "^" + this.months(mom, "").replace(".", "") + "$",
              "i"
            );
            this._shortMonthsParse[i] = new RegExp(
              "^" + this.monthsShort(mom, "").replace(".", "") + "$",
              "i"
            );
          }
          if (!strict && !this._monthsParse[i]) {
            regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
            this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
            return i;
          } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
            return i;
          } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
          }
        }
      }
      function setMonth(mom, value) {
        var dayOfMonth;
        if (!mom.isValid()) {
          return mom;
        }
        if (typeof value === "string") {
          if (/^\d+$/.test(value)) {
            value = toInt(value);
          } else {
            value = mom.localeData().monthsParse(value);
            if (!isNumber(value)) {
              return mom;
            }
          }
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
        return mom;
      }
      function getSetMonth(value) {
        if (value != null) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
        } else {
          return get(this, "Month");
        }
      }
      function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
      }
      function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsShortStrictRegex;
          } else {
            return this._monthsShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsShortRegex")) {
            this._monthsShortRegex = defaultMonthsShortRegex;
          }
          return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
      }
      function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
          if (!hasOwnProp(this, "_monthsRegex")) {
            computeMonthsParse.call(this);
          }
          if (isStrict) {
            return this._monthsStrictRegex;
          } else {
            return this._monthsRegex;
          }
        } else {
          if (!hasOwnProp(this, "_monthsRegex")) {
            this._monthsRegex = defaultMonthsRegex;
          }
          return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
      }
      function computeMonthsParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
        for (i = 0; i < 12; i++) {
          mom = createUTC([2e3, i]);
          shortPieces.push(this.monthsShort(mom, ""));
          longPieces.push(this.months(mom, ""));
          mixedPieces.push(this.months(mom, ""));
          mixedPieces.push(this.monthsShort(mom, ""));
        }
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
          shortPieces[i] = regexEscape(shortPieces[i]);
          longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
          mixedPieces[i] = regexEscape(mixedPieces[i]);
        }
        this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
          "^(" + longPieces.join("|") + ")",
          "i"
        );
        this._monthsShortStrictRegex = new RegExp(
          "^(" + shortPieces.join("|") + ")",
          "i"
        );
      }
      addFormatToken("Y", 0, 0, function() {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : "+" + y;
      });
      addFormatToken(0, ["YY", 2], 0, function() {
        return this.year() % 100;
      });
      addFormatToken(0, ["YYYY", 4], 0, "year");
      addFormatToken(0, ["YYYYY", 5], 0, "year");
      addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
      addUnitAlias("year", "y");
      addUnitPriority("year", 1);
      addRegexToken("Y", matchSigned);
      addRegexToken("YY", match1to2, match2);
      addRegexToken("YYYY", match1to4, match4);
      addRegexToken("YYYYY", match1to6, match6);
      addRegexToken("YYYYYY", match1to6, match6);
      addParseToken(["YYYYY", "YYYYYY"], YEAR);
      addParseToken("YYYY", function(input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
      });
      addParseToken("YY", function(input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
      });
      addParseToken("Y", function(input, array) {
        array[YEAR] = parseInt(input, 10);
      });
      function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
      }
      hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
      };
      var getSetYear = makeGetSet("FullYear", true);
      function getIsLeapYear() {
        return isLeapYear(this.year());
      }
      function createDate(y, m, d, h, M, s, ms) {
        var date;
        if (y < 100 && y >= 0) {
          date = new Date(y + 400, m, d, h, M, s, ms);
          if (isFinite(date.getFullYear())) {
            date.setFullYear(y);
          }
        } else {
          date = new Date(y, m, d, h, M, s, ms);
        }
        return date;
      }
      function createUTCDate(y) {
        var date, args;
        if (y < 100 && y >= 0) {
          args = Array.prototype.slice.call(arguments);
          args[0] = y + 400;
          date = new Date(Date.UTC.apply(null, args));
          if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
          }
        } else {
          date = new Date(Date.UTC.apply(null, arguments));
        }
        return date;
      }
      function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
      }
      function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
        } else {
          resYear = year;
          resDayOfYear = dayOfYear;
        }
        return {
          year: resYear,
          dayOfYear: resDayOfYear
        };
      }
      function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
        } else {
          resYear = mom.year();
          resWeek = week;
        }
        return {
          week: resWeek,
          year: resYear
        };
      }
      function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
      }
      addFormatToken("w", ["ww", 2], "wo", "week");
      addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
      addUnitAlias("week", "w");
      addUnitAlias("isoWeek", "W");
      addUnitPriority("week", 5);
      addUnitPriority("isoWeek", 5);
      addRegexToken("w", match1to2);
      addRegexToken("ww", match1to2, match2);
      addRegexToken("W", match1to2);
      addRegexToken("WW", match1to2, match2);
      addWeekParseToken(
        ["w", "ww", "W", "WW"],
        function(input, week, config, token2) {
          week[token2.substr(0, 1)] = toInt(input);
        }
      );
      function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }
      var defaultLocaleWeek = {
        dow: 0,
        // Sunday is the first day of the week.
        doy: 6
        // The week that contains Jan 6th is the first week of the year.
      };
      function localeFirstDayOfWeek() {
        return this._week.dow;
      }
      function localeFirstDayOfYear() {
        return this._week.doy;
      }
      function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, "d");
      }
      addFormatToken("d", 0, "do", "day");
      addFormatToken("dd", 0, 0, function(format2) {
        return this.localeData().weekdaysMin(this, format2);
      });
      addFormatToken("ddd", 0, 0, function(format2) {
        return this.localeData().weekdaysShort(this, format2);
      });
      addFormatToken("dddd", 0, 0, function(format2) {
        return this.localeData().weekdays(this, format2);
      });
      addFormatToken("e", 0, 0, "weekday");
      addFormatToken("E", 0, 0, "isoWeekday");
      addUnitAlias("day", "d");
      addUnitAlias("weekday", "e");
      addUnitAlias("isoWeekday", "E");
      addUnitPriority("day", 11);
      addUnitPriority("weekday", 11);
      addUnitPriority("isoWeekday", 11);
      addRegexToken("d", match1to2);
      addRegexToken("e", match1to2);
      addRegexToken("E", match1to2);
      addRegexToken("dd", function(isStrict, locale2) {
        return locale2.weekdaysMinRegex(isStrict);
      });
      addRegexToken("ddd", function(isStrict, locale2) {
        return locale2.weekdaysShortRegex(isStrict);
      });
      addRegexToken("dddd", function(isStrict, locale2) {
        return locale2.weekdaysRegex(isStrict);
      });
      addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
        var weekday = config._locale.weekdaysParse(input, token2, config._strict);
        if (weekday != null) {
          week.d = weekday;
        } else {
          getParsingFlags(config).invalidWeekday = input;
        }
      });
      addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
        week[token2] = toInt(input);
      });
      function parseWeekday(input, locale2) {
        if (typeof input !== "string") {
          return input;
        }
        if (!isNaN(input)) {
          return parseInt(input, 10);
        }
        input = locale2.weekdaysParse(input);
        if (typeof input === "number") {
          return input;
        }
        return null;
      }
      function parseIsoWeekday(input, locale2) {
        if (typeof input === "string") {
          return locale2.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
      }
      function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
      }
      var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
      function localeWeekdays(m, format2) {
        var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
        return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
      }
      function localeWeekdaysShort(m) {
        return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
      }
      function localeWeekdaysMin(m) {
        return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
      }
      function handleStrictParse$1(weekdayName, format2, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];
          for (i = 0; i < 7; ++i) {
            mom = createUTC([2e3, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(
              mom,
              ""
            ).toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(
              mom,
              ""
            ).toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
          }
        }
        if (strict) {
          if (format2 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format2 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        } else {
          if (format2 === "dddd") {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else if (format2 === "ddd") {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
              return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
          }
        }
      }
      function localeWeekdaysParse(weekdayName, format2, strict) {
        var i, mom, regex;
        if (this._weekdaysParseExact) {
          return handleStrictParse$1.call(this, weekdayName, format2, strict);
        }
        if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
        }
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp(
              "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
            this._shortWeekdaysParse[i] = new RegExp(
              "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
            this._minWeekdaysParse[i] = new RegExp(
              "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
              "i"
            );
          }
          if (!this._weekdaysParse[i]) {
            regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
            this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
          }
          if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
          } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
          }
        }
      }
      function getSetDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, "d");
        } else {
          return day;
        }
      }
      function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, "d");
      }
      function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
          return this.day() || 7;
        }
      }
      function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysStrictRegex;
          } else {
            return this._weekdaysRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            this._weekdaysRegex = defaultWeekdaysRegex;
          }
          return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
      }
      function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysShortStrictRegex;
          } else {
            return this._weekdaysShortRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysShortRegex")) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
          }
          return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
      }
      function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, "_weekdaysRegex")) {
            computeWeekdaysParse.call(this);
          }
          if (isStrict) {
            return this._weekdaysMinStrictRegex;
          } else {
            return this._weekdaysMinRegex;
          }
        } else {
          if (!hasOwnProp(this, "_weekdaysMinRegex")) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
          }
          return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
      }
      function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
          return b.length - a.length;
        }
        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
          mom = createUTC([2e3, 1]).day(i);
          minp = regexEscape(this.weekdaysMin(mom, ""));
          shortp = regexEscape(this.weekdaysShort(mom, ""));
          longp = regexEscape(this.weekdays(mom, ""));
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
        }
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;
        this._weekdaysStrictRegex = new RegExp(
          "^(" + longPieces.join("|") + ")",
          "i"
        );
        this._weekdaysShortStrictRegex = new RegExp(
          "^(" + shortPieces.join("|") + ")",
          "i"
        );
        this._weekdaysMinStrictRegex = new RegExp(
          "^(" + minPieces.join("|") + ")",
          "i"
        );
      }
      function hFormat() {
        return this.hours() % 12 || 12;
      }
      function kFormat() {
        return this.hours() || 24;
      }
      addFormatToken("H", ["HH", 2], 0, "hour");
      addFormatToken("h", ["hh", 2], 0, hFormat);
      addFormatToken("k", ["kk", 2], 0, kFormat);
      addFormatToken("hmm", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
      });
      addFormatToken("hmmss", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      addFormatToken("Hmm", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2);
      });
      addFormatToken("Hmmss", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
      });
      function meridiem(token2, lowercase) {
        addFormatToken(token2, 0, 0, function() {
          return this.localeData().meridiem(
            this.hours(),
            this.minutes(),
            lowercase
          );
        });
      }
      meridiem("a", true);
      meridiem("A", false);
      addUnitAlias("hour", "h");
      addUnitPriority("hour", 13);
      function matchMeridiem(isStrict, locale2) {
        return locale2._meridiemParse;
      }
      addRegexToken("a", matchMeridiem);
      addRegexToken("A", matchMeridiem);
      addRegexToken("H", match1to2);
      addRegexToken("h", match1to2);
      addRegexToken("k", match1to2);
      addRegexToken("HH", match1to2, match2);
      addRegexToken("hh", match1to2, match2);
      addRegexToken("kk", match1to2, match2);
      addRegexToken("hmm", match3to4);
      addRegexToken("hmmss", match5to6);
      addRegexToken("Hmm", match3to4);
      addRegexToken("Hmmss", match5to6);
      addParseToken(["H", "HH"], HOUR);
      addParseToken(["k", "kk"], function(input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
      });
      addParseToken(["a", "A"], function(input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
      });
      addParseToken(["h", "hh"], function(input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
      });
      addParseToken("Hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
      });
      addParseToken("Hmmss", function(input, array, config) {
        var pos1 = input.length - 4, pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
      });
      function localeIsPM(input) {
        return (input + "").toLowerCase().charAt(0) === "p";
      }
      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
      function localeMeridiem(hours2, minutes2, isLower) {
        if (hours2 > 11) {
          return isLower ? "pm" : "PM";
        } else {
          return isLower ? "am" : "AM";
        }
      }
      var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,
        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,
        week: defaultLocaleWeek,
        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,
        meridiemParse: defaultLocaleMeridiemParse
      };
      var locales = {}, localeFamilies = {}, globalLocale;
      function commonPrefix(arr1, arr2) {
        var i, minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
          if (arr1[i] !== arr2[i]) {
            return i;
          }
        }
        return minl;
      }
      function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key;
      }
      function chooseLocale(names) {
        var i = 0, j, next, locale2, split;
        while (i < names.length) {
          split = normalizeLocale(names[i]).split("-");
          j = split.length;
          next = normalizeLocale(names[i + 1]);
          next = next ? next.split("-") : null;
          while (j > 0) {
            locale2 = loadLocale(split.slice(0, j).join("-"));
            if (locale2) {
              return locale2;
            }
            if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
              break;
            }
            j--;
          }
          i++;
        }
        return globalLocale;
      }
      function isLocaleNameSane(name) {
        return name.match("^[^/\\\\]*$") != null;
      }
      function loadLocale(name) {
        var oldLocale = null, aliasedRequire;
        if (locales[name] === void 0 && typeof module2 !== "undefined" && module2 && module2.exports && isLocaleNameSane(name)) {
          try {
            oldLocale = globalLocale._abbr;
            aliasedRequire = require;
            aliasedRequire("./locale/" + name);
            getSetGlobalLocale(oldLocale);
          } catch (e) {
            locales[name] = null;
          }
        }
        return locales[name];
      }
      function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
          if (isUndefined(values)) {
            data = getLocale(key);
          } else {
            data = defineLocale(key, values);
          }
          if (data) {
            globalLocale = data;
          } else {
            if (typeof console !== "undefined" && console.warn) {
              console.warn(
                "Locale " + key + " not found. Did you forget to load it?"
              );
            }
          }
        }
        return globalLocale._abbr;
      }
      function defineLocale(name, config) {
        if (config !== null) {
          var locale2, parentConfig = baseConfig;
          config.abbr = name;
          if (locales[name] != null) {
            deprecateSimple(
              "defineLocaleOverride",
              "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
            );
            parentConfig = locales[name]._config;
          } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
              parentConfig = locales[config.parentLocale]._config;
            } else {
              locale2 = loadLocale(config.parentLocale);
              if (locale2 != null) {
                parentConfig = locale2._config;
              } else {
                if (!localeFamilies[config.parentLocale]) {
                  localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                  name,
                  config
                });
                return null;
              }
            }
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));
          if (localeFamilies[name]) {
            localeFamilies[name].forEach(function(x) {
              defineLocale(x.name, x.config);
            });
          }
          getSetGlobalLocale(name);
          return locales[name];
        } else {
          delete locales[name];
          return null;
        }
      }
      function updateLocale(name, config) {
        if (config != null) {
          var locale2, tmpLocale, parentConfig = baseConfig;
          if (locales[name] != null && locales[name].parentLocale != null) {
            locales[name].set(mergeConfigs(locales[name]._config, config));
          } else {
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
              parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            if (tmpLocale == null) {
              config.abbr = name;
            }
            locale2 = new Locale(config);
            locale2.parentLocale = locales[name];
            locales[name] = locale2;
          }
          getSetGlobalLocale(name);
        } else {
          if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
              locales[name] = locales[name].parentLocale;
              if (name === getSetGlobalLocale()) {
                getSetGlobalLocale(name);
              }
            } else if (locales[name] != null) {
              delete locales[name];
            }
          }
        }
        return locales[name];
      }
      function getLocale(key) {
        var locale2;
        if (key && key._locale && key._locale._abbr) {
          key = key._locale._abbr;
        }
        if (!key) {
          return globalLocale;
        }
        if (!isArray(key)) {
          locale2 = loadLocale(key);
          if (locale2) {
            return locale2;
          }
          key = [key];
        }
        return chooseLocale(key);
      }
      function listLocales() {
        return keys(locales);
      }
      function checkOverflow(m) {
        var overflow, a = m._a;
        if (a && getParsingFlags(m).overflow === -2) {
          overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
          if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
          }
          if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
          }
          if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
          }
          getParsingFlags(m).overflow = overflow;
        }
        return m;
      }
      var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
        ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
        ["YYYY-DDD", /\d{4}-\d{3}/],
        ["YYYY-MM", /\d{4}-\d\d/, false],
        ["YYYYYYMMDD", /[+-]\d{10}/],
        ["YYYYMMDD", /\d{8}/],
        ["GGGG[W]WWE", /\d{4}W\d{3}/],
        ["GGGG[W]WW", /\d{4}W\d{2}/, false],
        ["YYYYDDD", /\d{7}/],
        ["YYYYMM", /\d{6}/, false],
        ["YYYY", /\d{4}/, false]
      ], isoTimes = [
        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
        ["HH:mm", /\d\d:\d\d/],
        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
        ["HHmmss", /\d\d\d\d\d\d/],
        ["HHmm", /\d\d\d\d/],
        ["HH", /\d\d/]
      ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
      };
      function configFromISO(config) {
        var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
        if (match) {
          getParsingFlags(config).iso = true;
          for (i = 0, l = isoDatesLen; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
              dateFormat = isoDates[i][0];
              allowTime = isoDates[i][2] !== false;
              break;
            }
          }
          if (dateFormat == null) {
            config._isValid = false;
            return;
          }
          if (match[3]) {
            for (i = 0, l = isoTimesLen; i < l; i++) {
              if (isoTimes[i][1].exec(match[3])) {
                timeFormat = (match[2] || " ") + isoTimes[i][0];
                break;
              }
            }
            if (timeFormat == null) {
              config._isValid = false;
              return;
            }
          }
          if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
          }
          if (match[4]) {
            if (tzRegex.exec(match[4])) {
              tzFormat = "Z";
            } else {
              config._isValid = false;
              return;
            }
          }
          config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
          configFromStringAndFormat(config);
        } else {
          config._isValid = false;
        }
      }
      function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
          untruncateYear(yearStr),
          defaultLocaleMonthsShort.indexOf(monthStr),
          parseInt(dayStr, 10),
          parseInt(hourStr, 10),
          parseInt(minuteStr, 10)
        ];
        if (secondStr) {
          result.push(parseInt(secondStr, 10));
        }
        return result;
      }
      function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
          return 2e3 + year;
        } else if (year <= 999) {
          return 1900 + year;
        }
        return year;
      }
      function preprocessRFC2822(s) {
        return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
            parsedInput[0],
            parsedInput[1],
            parsedInput[2]
          ).getDay();
          if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
          }
        }
        return true;
      }
      function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
          return obsOffsets[obsOffset];
        } else if (militaryOffset) {
          return 0;
        } else {
          var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
          return h * 60 + m;
        }
      }
      function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
        if (match) {
          parsedArray = extractFromRFC2822Strings(
            match[4],
            match[3],
            match[2],
            match[5],
            match[6],
            match[7]
          );
          if (!checkWeekday(match[1], parsedArray, config)) {
            return;
          }
          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);
          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          getParsingFlags(config).rfc2822 = true;
        } else {
          config._isValid = false;
        }
      }
      function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
          config._d = /* @__PURE__ */ new Date(+matched[1]);
          return;
        }
        configFromISO(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        configFromRFC2822(config);
        if (config._isValid === false) {
          delete config._isValid;
        } else {
          return;
        }
        if (config._strict) {
          config._isValid = false;
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      hooks.createFromInputFallback = deprecate(
        "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
        function(config) {
          config._d = /* @__PURE__ */ new Date(config._i + (config._useUTC ? " UTC" : ""));
        }
      );
      function defaults(a, b, c) {
        if (a != null) {
          return a;
        }
        if (b != null) {
          return b;
        }
        return c;
      }
      function currentDateArray(config) {
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
          return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate()
          ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
      }
      function configFromArray(config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;
        if (config._d) {
          return;
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
          dayOfYearFromWeekInfo(config);
        }
        if (config._dayOfYear != null) {
          yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
          if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
          }
          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
          config._a[i] = input[i] = currentDate[i];
        }
        for (; i < 7; i++) {
          config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
          config._nextDay = true;
          config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? createUTCDate : createDate).apply(
          null,
          input
        );
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
        if (config._tzm != null) {
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }
        if (config._nextDay) {
          config._a[HOUR] = 24;
        }
        if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
          getParsingFlags(config).weekdayMismatch = true;
        }
      }
      function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
          dow = 1;
          doy = 4;
          weekYear = defaults(
            w.GG,
            config._a[YEAR],
            weekOfYear(createLocal(), 1, 4).year
          );
          week = defaults(w.W, 1);
          weekday = defaults(w.E, 1);
          if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
          }
        } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;
          curWeek = weekOfYear(createLocal(), dow, doy);
          weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
          week = defaults(w.w, curWeek.week);
          if (w.d != null) {
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
              weekdayOverflow = true;
            }
          } else if (w.e != null) {
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
              weekdayOverflow = true;
            }
          } else {
            weekday = dow;
          }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
          getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
          getParsingFlags(config)._overflowWeekday = true;
        } else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
        }
      }
      hooks.ISO_8601 = function() {
      };
      hooks.RFC_2822 = function() {
      };
      function configFromStringAndFormat(config) {
        if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
        }
        if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;
        var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
        tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        tokenLen = tokens2.length;
        for (i = 0; i < tokenLen; i++) {
          token2 = tokens2[i];
          parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
          if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
              getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(
              string.indexOf(parsedInput) + parsedInput.length
            );
            totalParsedInputLength += parsedInput.length;
          }
          if (formatTokenFunctions[token2]) {
            if (parsedInput) {
              getParsingFlags(config).empty = false;
            } else {
              getParsingFlags(config).unusedTokens.push(token2);
            }
            addTimeToArrayFromToken(token2, parsedInput, config);
          } else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token2);
          }
        }
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
          getParsingFlags(config).unusedInput.push(string);
        }
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
          getParsingFlags(config).bigHour = void 0;
        }
        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        config._a[HOUR] = meridiemFixWrap(
          config._locale,
          config._a[HOUR],
          config._meridiem
        );
        era = getParsingFlags(config).era;
        if (era !== null) {
          config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }
        configFromArray(config);
        checkOverflow(config);
      }
      function meridiemFixWrap(locale2, hour, meridiem2) {
        var isPm;
        if (meridiem2 == null) {
          return hour;
        }
        if (locale2.meridiemHour != null) {
          return locale2.meridiemHour(hour, meridiem2);
        } else if (locale2.isPM != null) {
          isPm = locale2.isPM(meridiem2);
          if (isPm && hour < 12) {
            hour += 12;
          }
          if (!isPm && hour === 12) {
            hour = 0;
          }
          return hour;
        } else {
          return hour;
        }
      }
      function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
        if (configfLen === 0) {
          getParsingFlags(config).invalidFormat = true;
          config._d = /* @__PURE__ */ new Date(NaN);
          return;
        }
        for (i = 0; i < configfLen; i++) {
          currentScore = 0;
          validFormatFound = false;
          tempConfig = copyConfig({}, config);
          if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
          }
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);
          if (isValid(tempConfig)) {
            validFormatFound = true;
          }
          currentScore += getParsingFlags(tempConfig).charsLeftOver;
          currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
          getParsingFlags(tempConfig).score = currentScore;
          if (!bestFormatIsValid) {
            if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
              if (validFormatFound) {
                bestFormatIsValid = true;
              }
            }
          } else {
            if (currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
            }
          }
        }
        extend(config, bestMoment || tempConfig);
      }
      function configFromObject(config) {
        if (config._d) {
          return;
        }
        var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
        config._a = map(
          [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
          function(obj) {
            return obj && parseInt(obj, 10);
          }
        );
        configFromArray(config);
      }
      function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
          res.add(1, "d");
          res._nextDay = void 0;
        }
        return res;
      }
      function prepareConfig(config) {
        var input = config._i, format2 = config._f;
        config._locale = config._locale || getLocale(config._l);
        if (input === null || format2 === void 0 && input === "") {
          return createInvalid({ nullInput: true });
        }
        if (typeof input === "string") {
          config._i = input = config._locale.preparse(input);
        }
        if (isMoment(input)) {
          return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
          config._d = input;
        } else if (isArray(format2)) {
          configFromStringAndArray(config);
        } else if (format2) {
          configFromStringAndFormat(config);
        } else {
          configFromInput(config);
        }
        if (!isValid(config)) {
          config._d = null;
        }
        return config;
      }
      function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
          config._d = new Date(hooks.now());
        } else if (isDate(input)) {
          config._d = new Date(input.valueOf());
        } else if (typeof input === "string") {
          configFromString(config);
        } else if (isArray(input)) {
          config._a = map(input.slice(0), function(obj) {
            return parseInt(obj, 10);
          });
          configFromArray(config);
        } else if (isObject(input)) {
          configFromObject(config);
        } else if (isNumber(input)) {
          config._d = new Date(input);
        } else {
          hooks.createFromInputFallback(config);
        }
      }
      function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
        var c = {};
        if (format2 === true || format2 === false) {
          strict = format2;
          format2 = void 0;
        }
        if (locale2 === true || locale2 === false) {
          strict = locale2;
          locale2 = void 0;
        }
        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
          input = void 0;
        }
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale2;
        c._i = input;
        c._f = format2;
        c._strict = strict;
        return createFromConfig(c);
      }
      function createLocal(input, format2, locale2, strict) {
        return createLocalOrUTC(input, format2, locale2, strict, false);
      }
      var prototypeMin = deprecate(
        "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
        function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
          } else {
            return createInvalid();
          }
        }
      ), prototypeMax = deprecate(
        "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
        function() {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
          } else {
            return createInvalid();
          }
        }
      );
      function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
          moments = moments[0];
        }
        if (!moments.length) {
          return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
          if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
          }
        }
        return res;
      }
      function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args);
      }
      function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args);
      }
      var now = function() {
        return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
      };
      var ordering = [
        "year",
        "quarter",
        "month",
        "week",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond"
      ];
      function isDurationValid(m) {
        var key, unitHasDecimal = false, i, orderLen = ordering.length;
        for (key in m) {
          if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
          }
        }
        for (i = 0; i < orderLen; ++i) {
          if (m[ordering[i]]) {
            if (unitHasDecimal) {
              return false;
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
              unitHasDecimal = true;
            }
          }
        }
        return true;
      }
      function isValid$1() {
        return this._isValid;
      }
      function createInvalid$1() {
        return createDuration(NaN);
      }
      function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
        this._isValid = isDurationValid(normalizedInput);
        this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
        minutes2 * 6e4 + // 1000 * 60
        hours2 * 1e3 * 60 * 60;
        this._days = +days2 + weeks2 * 7;
        this._months = +months2 + quarters * 3 + years2 * 12;
        this._data = {};
        this._locale = getLocale();
        this._bubble();
      }
      function isDuration(obj) {
        return obj instanceof Duration;
      }
      function absRound(number) {
        if (number < 0) {
          return Math.round(-1 * number) * -1;
        } else {
          return Math.round(number);
        }
      }
      function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
        for (i = 0; i < len; i++) {
          if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
            diffs++;
          }
        }
        return diffs + lengthDiff;
      }
      function offset(token2, separator) {
        addFormatToken(token2, 0, 0, function() {
          var offset2 = this.utcOffset(), sign2 = "+";
          if (offset2 < 0) {
            offset2 = -offset2;
            sign2 = "-";
          }
          return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
        });
      }
      offset("Z", ":");
      offset("ZZ", "");
      addRegexToken("Z", matchShortOffset);
      addRegexToken("ZZ", matchShortOffset);
      addParseToken(["Z", "ZZ"], function(input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
      });
      var chunkOffset = /([\+\-]|\d\d)/gi;
      function offsetFromString(matcher, string) {
        var matches = (string || "").match(matcher), chunk, parts, minutes2;
        if (matches === null) {
          return null;
        }
        chunk = matches[matches.length - 1] || [];
        parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
        minutes2 = +(parts[1] * 60) + toInt(parts[2]);
        return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
      }
      function cloneWithOffset(input, model) {
        var res, diff2;
        if (model._isUTC) {
          res = model.clone();
          diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
          res._d.setTime(res._d.valueOf() + diff2);
          hooks.updateOffset(res, false);
          return res;
        } else {
          return createLocal(input).local();
        }
      }
      function getDateOffset(m) {
        return -Math.round(m._d.getTimezoneOffset());
      }
      hooks.updateOffset = function() {
      };
      function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset2 = this._offset || 0, localAdjust;
        if (!this.isValid()) {
          return input != null ? this : NaN;
        }
        if (input != null) {
          if (typeof input === "string") {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
              return this;
            }
          } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
          }
          if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
          }
          this._offset = input;
          this._isUTC = true;
          if (localAdjust != null) {
            this.add(localAdjust, "m");
          }
          if (offset2 !== input) {
            if (!keepLocalTime || this._changeInProgress) {
              addSubtract(
                this,
                createDuration(input - offset2, "m"),
                1,
                false
              );
            } else if (!this._changeInProgress) {
              this._changeInProgress = true;
              hooks.updateOffset(this, true);
              this._changeInProgress = null;
            }
          }
          return this;
        } else {
          return this._isUTC ? offset2 : getDateOffset(this);
        }
      }
      function getSetZone(input, keepLocalTime) {
        if (input != null) {
          if (typeof input !== "string") {
            input = -input;
          }
          this.utcOffset(input, keepLocalTime);
          return this;
        } else {
          return -this.utcOffset();
        }
      }
      function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
      }
      function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;
          if (keepLocalTime) {
            this.subtract(getDateOffset(this), "m");
          }
        }
        return this;
      }
      function setOffsetToParsedOffset() {
        if (this._tzm != null) {
          this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === "string") {
          var tZone = offsetFromString(matchOffset, this._i);
          if (tZone != null) {
            this.utcOffset(tZone);
          } else {
            this.utcOffset(0, true);
          }
        }
        return this;
      }
      function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
          return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;
        return (this.utcOffset() - input) % 60 === 0;
      }
      function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
      }
      function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
          return this._isDSTShifted;
        }
        var c = {}, other;
        copyConfig(c, this);
        c = prepareConfig(c);
        if (c._a) {
          other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
          this._isDSTShifted = false;
        }
        return this._isDSTShifted;
      }
      function isLocal() {
        return this.isValid() ? !this._isUTC : false;
      }
      function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
      }
      function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
      }
      var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function createDuration(input, key) {
        var duration = input, match = null, sign2, ret, diffRes;
        if (isDuration(input)) {
          duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
          };
        } else if (isNumber(input) || !isNaN(+input)) {
          duration = {};
          if (key) {
            duration[key] = +input;
          } else {
            duration.milliseconds = +input;
          }
        } else if (match = aspNetRegex.exec(input)) {
          sign2 = match[1] === "-" ? -1 : 1;
          duration = {
            y: 0,
            d: toInt(match[DATE]) * sign2,
            h: toInt(match[HOUR]) * sign2,
            m: toInt(match[MINUTE]) * sign2,
            s: toInt(match[SECOND]) * sign2,
            ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
            // the millisecond decimal point is included in the match
          };
        } else if (match = isoRegex.exec(input)) {
          sign2 = match[1] === "-" ? -1 : 1;
          duration = {
            y: parseIso(match[2], sign2),
            M: parseIso(match[3], sign2),
            w: parseIso(match[4], sign2),
            d: parseIso(match[5], sign2),
            h: parseIso(match[6], sign2),
            m: parseIso(match[7], sign2),
            s: parseIso(match[8], sign2)
          };
        } else if (duration == null) {
          duration = {};
        } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
          diffRes = momentsDifference(
            createLocal(duration.from),
            createLocal(duration.to)
          );
          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (isDuration(input) && hasOwnProp(input, "_locale")) {
          ret._locale = input._locale;
        }
        if (isDuration(input) && hasOwnProp(input, "_isValid")) {
          ret._isValid = input._isValid;
        }
        return ret;
      }
      createDuration.fn = Duration.prototype;
      createDuration.invalid = createInvalid$1;
      function parseIso(inp, sign2) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign2;
      }
      function positiveMomentsDifference(base, other) {
        var res = {};
        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, "M").isAfter(other)) {
          --res.months;
        }
        res.milliseconds = +other - +base.clone().add(res.months, "M");
        return res;
      }
      function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
          return { milliseconds: 0, months: 0 };
        }
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
          res = positiveMomentsDifference(base, other);
        } else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
        }
        return res;
      }
      function createAdder(direction, name) {
        return function(val, period) {
          var dur, tmp;
          if (period !== null && !isNaN(+period)) {
            deprecateSimple(
              name,
              "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
            );
            tmp = val;
            val = period;
            period = tmp;
          }
          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
        };
      }
      function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
        if (!mom.isValid()) {
          return;
        }
        updateOffset = updateOffset == null ? true : updateOffset;
        if (months2) {
          setMonth(mom, get(mom, "Month") + months2 * isAdding);
        }
        if (days2) {
          set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
        }
        if (milliseconds2) {
          mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
        }
        if (updateOffset) {
          hooks.updateOffset(mom, days2 || months2);
        }
      }
      var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
      function isString(input) {
        return typeof input === "string" || input instanceof String;
      }
      function isMomentInput(input) {
        return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
      }
      function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "years",
          "year",
          "y",
          "months",
          "month",
          "M",
          "days",
          "day",
          "d",
          "dates",
          "date",
          "D",
          "hours",
          "hour",
          "h",
          "minutes",
          "minute",
          "m",
          "seconds",
          "second",
          "s",
          "milliseconds",
          "millisecond",
          "ms"
        ], i, property, propertyLen = properties.length;
        for (i = 0; i < propertyLen; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function isNumberOrStringArray(input) {
        var arrayTest = isArray(input), dataTypeTest = false;
        if (arrayTest) {
          dataTypeTest = input.filter(function(item) {
            return !isNumber(item) && isString(input);
          }).length === 0;
        }
        return arrayTest && dataTypeTest;
      }
      function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
          "sameDay",
          "nextDay",
          "lastDay",
          "nextWeek",
          "lastWeek",
          "sameElse"
        ], i, property;
        for (i = 0; i < properties.length; i += 1) {
          property = properties[i];
          propertyTest = propertyTest || hasOwnProp(input, property);
        }
        return objectTest && propertyTest;
      }
      function getCalendarFormat(myMoment, now2) {
        var diff2 = myMoment.diff(now2, "days", true);
        return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
      }
      function calendar$1(time, formats) {
        if (arguments.length === 1) {
          if (!arguments[0]) {
            time = void 0;
            formats = void 0;
          } else if (isMomentInput(arguments[0])) {
            time = arguments[0];
            formats = void 0;
          } else if (isCalendarSpec(arguments[0])) {
            formats = arguments[0];
            time = void 0;
          }
        }
        var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
        return this.format(
          output || this.localeData().calendar(format2, this, createLocal(now2))
        );
      }
      function clone() {
        return new Moment(this);
      }
      function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() > localInput.valueOf();
        } else {
          return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
      }
      function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() < localInput.valueOf();
        } else {
          return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
      }
      function isBetween(from2, to2, units, inclusivity) {
        var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
          return false;
        }
        inclusivity = inclusivity || "()";
        return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
      }
      function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input), inputMs;
        if (!(this.isValid() && localInput.isValid())) {
          return false;
        }
        units = normalizeUnits(units) || "millisecond";
        if (units === "millisecond") {
          return this.valueOf() === localInput.valueOf();
        } else {
          inputMs = localInput.valueOf();
          return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
      }
      function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
      }
      function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
      }
      function diff(input, units, asFloat) {
        var that, zoneDelta, output;
        if (!this.isValid()) {
          return NaN;
        }
        that = cloneWithOffset(input, this);
        if (!that.isValid()) {
          return NaN;
        }
        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
        units = normalizeUnits(units);
        switch (units) {
          case "year":
            output = monthDiff(this, that) / 12;
            break;
          case "month":
            output = monthDiff(this, that);
            break;
          case "quarter":
            output = monthDiff(this, that) / 3;
            break;
          case "second":
            output = (this - that) / 1e3;
            break;
          case "minute":
            output = (this - that) / 6e4;
            break;
          case "hour":
            output = (this - that) / 36e5;
            break;
          case "day":
            output = (this - that - zoneDelta) / 864e5;
            break;
          case "week":
            output = (this - that - zoneDelta) / 6048e5;
            break;
          default:
            output = this - that;
        }
        return asFloat ? output : absFloor(output);
      }
      function monthDiff(a, b) {
        if (a.date() < b.date()) {
          return -monthDiff(b, a);
        }
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
        if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
          adjust = (b - anchor) / (anchor - anchor2);
        } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
          adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust) || 0;
      }
      hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
      hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
      function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
      }
      function toISOString(keepOffset) {
        if (!this.isValid()) {
          return null;
        }
        var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
          return formatMoment(
            m,
            utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
        }
        if (isFunction(Date.prototype.toISOString)) {
          if (utc) {
            return this.toDate().toISOString();
          } else {
            return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
          }
        }
        return formatMoment(
          m,
          utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
        );
      }
      function inspect() {
        if (!this.isValid()) {
          return "moment.invalid(/* " + this._i + " */)";
        }
        var func = "moment", zone = "", prefix, year, datetime, suffix;
        if (!this.isLocal()) {
          func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
          zone = "Z";
        }
        prefix = "[" + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
        datetime = "-MM-DD[T]HH:mm:ss.SSS";
        suffix = zone + '[")]';
        return this.format(prefix + year + datetime + suffix);
      }
      function format(inputString) {
        if (!inputString) {
          inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
      }
      function from(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
      }
      function to(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
          return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
          return this.localeData().invalidDate();
        }
      }
      function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
      }
      function locale(key) {
        var newLocaleData;
        if (key === void 0) {
          return this._locale._abbr;
        } else {
          newLocaleData = getLocale(key);
          if (newLocaleData != null) {
            this._locale = newLocaleData;
          }
          return this;
        }
      }
      var lang = deprecate(
        "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
        function(key) {
          if (key === void 0) {
            return this.localeData();
          } else {
            return this.locale(key);
          }
        }
      );
      function localeData() {
        return this._locale;
      }
      var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
      function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
      }
      function localStartOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
          return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
          return new Date(y, m, d).valueOf();
        }
      }
      function utcStartOfDate(y, m, d) {
        if (y < 100 && y >= 0) {
          return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
          return Date.UTC(y, m, d);
        }
      }
      function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year(), 0, 1);
            break;
          case "quarter":
            time = startOfDate(
              this.year(),
              this.month() - this.month() % 3,
              1
            );
            break;
          case "month":
            time = startOfDate(this.year(), this.month(), 1);
            break;
          case "week":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday()
            );
            break;
          case "isoWeek":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1)
            );
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date());
            break;
          case "hour":
            time = this._d.valueOf();
            time -= mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            );
            break;
          case "minute":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_MINUTE);
            break;
          case "second":
            time = this._d.valueOf();
            time -= mod$1(time, MS_PER_SECOND);
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === void 0 || units === "millisecond" || !this.isValid()) {
          return this;
        }
        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
        switch (units) {
          case "year":
            time = startOfDate(this.year() + 1, 0, 1) - 1;
            break;
          case "quarter":
            time = startOfDate(
              this.year(),
              this.month() - this.month() % 3 + 3,
              1
            ) - 1;
            break;
          case "month":
            time = startOfDate(this.year(), this.month() + 1, 1) - 1;
            break;
          case "week":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday() + 7
            ) - 1;
            break;
          case "isoWeek":
            time = startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7
            ) - 1;
            break;
          case "day":
          case "date":
            time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
            break;
          case "hour":
            time = this._d.valueOf();
            time += MS_PER_HOUR - mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            ) - 1;
            break;
          case "minute":
            time = this._d.valueOf();
            time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
            break;
          case "second":
            time = this._d.valueOf();
            time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
            break;
        }
        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
      }
      function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 6e4;
      }
      function unix() {
        return Math.floor(this.valueOf() / 1e3);
      }
      function toDate() {
        return new Date(this.valueOf());
      }
      function toArray() {
        var m = this;
        return [
          m.year(),
          m.month(),
          m.date(),
          m.hour(),
          m.minute(),
          m.second(),
          m.millisecond()
        ];
      }
      function toObject() {
        var m = this;
        return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds()
        };
      }
      function toJSON() {
        return this.isValid() ? this.toISOString() : null;
      }
      function isValid$2() {
        return isValid(this);
      }
      function parsingFlags() {
        return extend({}, getParsingFlags(this));
      }
      function invalidAt() {
        return getParsingFlags(this).overflow;
      }
      function creationData() {
        return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
        };
      }
      addFormatToken("N", 0, 0, "eraAbbr");
      addFormatToken("NN", 0, 0, "eraAbbr");
      addFormatToken("NNN", 0, 0, "eraAbbr");
      addFormatToken("NNNN", 0, 0, "eraName");
      addFormatToken("NNNNN", 0, 0, "eraNarrow");
      addFormatToken("y", ["y", 1], "yo", "eraYear");
      addFormatToken("y", ["yy", 2], 0, "eraYear");
      addFormatToken("y", ["yyy", 3], 0, "eraYear");
      addFormatToken("y", ["yyyy", 4], 0, "eraYear");
      addRegexToken("N", matchEraAbbr);
      addRegexToken("NN", matchEraAbbr);
      addRegexToken("NNN", matchEraAbbr);
      addRegexToken("NNNN", matchEraName);
      addRegexToken("NNNNN", matchEraNarrow);
      addParseToken(
        ["N", "NN", "NNN", "NNNN", "NNNNN"],
        function(input, array, config, token2) {
          var era = config._locale.erasParse(input, token2, config._strict);
          if (era) {
            getParsingFlags(config).era = era;
          } else {
            getParsingFlags(config).invalidEra = input;
          }
        }
      );
      addRegexToken("y", matchUnsigned);
      addRegexToken("yy", matchUnsigned);
      addRegexToken("yyy", matchUnsigned);
      addRegexToken("yyyy", matchUnsigned);
      addRegexToken("yo", matchEraYearOrdinal);
      addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
      addParseToken(["yo"], function(input, array, config, token2) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
          match = input.match(config._locale._eraYearOrdinalRegex);
        }
        if (config._locale.eraYearOrdinalParse) {
          array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
          array[YEAR] = parseInt(input, 10);
        }
      });
      function localeEras(m, format2) {
        var i, l, date, eras = this._eras || getLocale("en")._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
          switch (typeof eras[i].since) {
            case "string":
              date = hooks(eras[i].since).startOf("day");
              eras[i].since = date.valueOf();
              break;
          }
          switch (typeof eras[i].until) {
            case "undefined":
              eras[i].until = Infinity;
              break;
            case "string":
              date = hooks(eras[i].until).startOf("day").valueOf();
              eras[i].until = date.valueOf();
              break;
          }
        }
        return eras;
      }
      function localeErasParse(eraName, format2, strict) {
        var i, l, eras = this.eras(), name, abbr, narrow;
        eraName = eraName.toUpperCase();
        for (i = 0, l = eras.length; i < l; ++i) {
          name = eras[i].name.toUpperCase();
          abbr = eras[i].abbr.toUpperCase();
          narrow = eras[i].narrow.toUpperCase();
          if (strict) {
            switch (format2) {
              case "N":
              case "NN":
              case "NNN":
                if (abbr === eraName) {
                  return eras[i];
                }
                break;
              case "NNNN":
                if (name === eraName) {
                  return eras[i];
                }
                break;
              case "NNNNN":
                if (narrow === eraName) {
                  return eras[i];
                }
                break;
            }
          } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
            return eras[i];
          }
        }
      }
      function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? 1 : -1;
        if (year === void 0) {
          return hooks(era.since).year();
        } else {
          return hooks(era.since).year() + (year - era.offset) * dir;
        }
      }
      function getEraName() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].name;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].name;
          }
        }
        return "";
      }
      function getEraNarrow() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].narrow;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].narrow;
          }
        }
        return "";
      }
      function getEraAbbr() {
        var i, l, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until) {
            return eras[i].abbr;
          }
          if (eras[i].until <= val && val <= eras[i].since) {
            return eras[i].abbr;
          }
        }
        return "";
      }
      function getEraYear() {
        var i, l, dir, val, eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          dir = eras[i].since <= eras[i].until ? 1 : -1;
          val = this.clone().startOf("day").valueOf();
          if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
            return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
          }
        }
        return this.year();
      }
      function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNameRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
      }
      function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, "_erasAbbrRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
      }
      function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, "_erasNarrowRegex")) {
          computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
      }
      function matchEraAbbr(isStrict, locale2) {
        return locale2.erasAbbrRegex(isStrict);
      }
      function matchEraName(isStrict, locale2) {
        return locale2.erasNameRegex(isStrict);
      }
      function matchEraNarrow(isStrict, locale2) {
        return locale2.erasNarrowRegex(isStrict);
      }
      function matchEraYearOrdinal(isStrict, locale2) {
        return locale2._eraYearOrdinalRegex || matchUnsigned;
      }
      function computeErasParse() {
        var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, eras = this.eras();
        for (i = 0, l = eras.length; i < l; ++i) {
          namePieces.push(regexEscape(eras[i].name));
          abbrPieces.push(regexEscape(eras[i].abbr));
          narrowPieces.push(regexEscape(eras[i].narrow));
          mixedPieces.push(regexEscape(eras[i].name));
          mixedPieces.push(regexEscape(eras[i].abbr));
          mixedPieces.push(regexEscape(eras[i].narrow));
        }
        this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
        this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
        this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
        this._erasNarrowRegex = new RegExp(
          "^(" + narrowPieces.join("|") + ")",
          "i"
        );
      }
      addFormatToken(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100;
      });
      addFormatToken(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100;
      });
      function addWeekYearFormatToken(token2, getter) {
        addFormatToken(0, [token2, token2.length], 0, getter);
      }
      addWeekYearFormatToken("gggg", "weekYear");
      addWeekYearFormatToken("ggggg", "weekYear");
      addWeekYearFormatToken("GGGG", "isoWeekYear");
      addWeekYearFormatToken("GGGGG", "isoWeekYear");
      addUnitAlias("weekYear", "gg");
      addUnitAlias("isoWeekYear", "GG");
      addUnitPriority("weekYear", 1);
      addUnitPriority("isoWeekYear", 1);
      addRegexToken("G", matchSigned);
      addRegexToken("g", matchSigned);
      addRegexToken("GG", match1to2, match2);
      addRegexToken("gg", match1to2, match2);
      addRegexToken("GGGG", match1to4, match4);
      addRegexToken("gggg", match1to4, match4);
      addRegexToken("GGGGG", match1to6, match6);
      addRegexToken("ggggg", match1to6, match6);
      addWeekParseToken(
        ["gggg", "ggggg", "GGGG", "GGGGG"],
        function(input, week, config, token2) {
          week[token2.substr(0, 2)] = toInt(input);
        }
      );
      addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
        week[token2] = hooks.parseTwoDigitYear(input);
      });
      function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
          this,
          input,
          this.week(),
          this.weekday(),
          this.localeData()._week.dow,
          this.localeData()._week.doy
        );
      }
      function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
          this,
          input,
          this.isoWeek(),
          this.isoWeekday(),
          1,
          4
        );
      }
      function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
      }
      function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
      }
      function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }
      function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
      }
      function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
          return weekOfYear(this, dow, doy).year;
        } else {
          weeksTarget = weeksInYear(input, dow, doy);
          if (week > weeksTarget) {
            week = weeksTarget;
          }
          return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
      }
      function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
      }
      addFormatToken("Q", 0, "Qo", "quarter");
      addUnitAlias("quarter", "Q");
      addUnitPriority("quarter", 7);
      addRegexToken("Q", match1);
      addParseToken("Q", function(input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
      });
      function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
      }
      addFormatToken("D", ["DD", 2], "Do", "date");
      addUnitAlias("date", "D");
      addUnitPriority("date", 9);
      addRegexToken("D", match1to2);
      addRegexToken("DD", match1to2, match2);
      addRegexToken("Do", function(isStrict, locale2) {
        return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
      });
      addParseToken(["D", "DD"], DATE);
      addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
      });
      var getSetDayOfMonth = makeGetSet("Date", true);
      addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
      addUnitAlias("dayOfYear", "DDD");
      addUnitPriority("dayOfYear", 4);
      addRegexToken("DDD", match1to3);
      addRegexToken("DDDD", match3);
      addParseToken(["DDD", "DDDD"], function(input, array, config) {
        config._dayOfYear = toInt(input);
      });
      function getSetDayOfYear(input) {
        var dayOfYear = Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
      }
      addFormatToken("m", ["mm", 2], 0, "minute");
      addUnitAlias("minute", "m");
      addUnitPriority("minute", 14);
      addRegexToken("m", match1to2);
      addRegexToken("mm", match1to2, match2);
      addParseToken(["m", "mm"], MINUTE);
      var getSetMinute = makeGetSet("Minutes", false);
      addFormatToken("s", ["ss", 2], 0, "second");
      addUnitAlias("second", "s");
      addUnitPriority("second", 15);
      addRegexToken("s", match1to2);
      addRegexToken("ss", match1to2, match2);
      addParseToken(["s", "ss"], SECOND);
      var getSetSecond = makeGetSet("Seconds", false);
      addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
      });
      addFormatToken(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10);
      });
      addFormatToken(0, ["SSS", 3], 0, "millisecond");
      addFormatToken(0, ["SSSS", 4], 0, function() {
        return this.millisecond() * 10;
      });
      addFormatToken(0, ["SSSSS", 5], 0, function() {
        return this.millisecond() * 100;
      });
      addFormatToken(0, ["SSSSSS", 6], 0, function() {
        return this.millisecond() * 1e3;
      });
      addFormatToken(0, ["SSSSSSS", 7], 0, function() {
        return this.millisecond() * 1e4;
      });
      addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
        return this.millisecond() * 1e5;
      });
      addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
        return this.millisecond() * 1e6;
      });
      addUnitAlias("millisecond", "ms");
      addUnitPriority("millisecond", 16);
      addRegexToken("S", match1to3, match1);
      addRegexToken("SS", match1to3, match2);
      addRegexToken("SSS", match1to3, match3);
      var token, getSetMillisecond;
      for (token = "SSSS"; token.length <= 9; token += "S") {
        addRegexToken(token, matchUnsigned);
      }
      function parseMs(input, array) {
        array[MILLISECOND] = toInt(("0." + input) * 1e3);
      }
      for (token = "S"; token.length <= 9; token += "S") {
        addParseToken(token, parseMs);
      }
      getSetMillisecond = makeGetSet("Milliseconds", false);
      addFormatToken("z", 0, 0, "zoneAbbr");
      addFormatToken("zz", 0, 0, "zoneName");
      function getZoneAbbr() {
        return this._isUTC ? "UTC" : "";
      }
      function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : "";
      }
      var proto = Moment.prototype;
      proto.add = add;
      proto.calendar = calendar$1;
      proto.clone = clone;
      proto.diff = diff;
      proto.endOf = endOf;
      proto.format = format;
      proto.from = from;
      proto.fromNow = fromNow;
      proto.to = to;
      proto.toNow = toNow;
      proto.get = stringGet;
      proto.invalidAt = invalidAt;
      proto.isAfter = isAfter;
      proto.isBefore = isBefore;
      proto.isBetween = isBetween;
      proto.isSame = isSame;
      proto.isSameOrAfter = isSameOrAfter;
      proto.isSameOrBefore = isSameOrBefore;
      proto.isValid = isValid$2;
      proto.lang = lang;
      proto.locale = locale;
      proto.localeData = localeData;
      proto.max = prototypeMax;
      proto.min = prototypeMin;
      proto.parsingFlags = parsingFlags;
      proto.set = stringSet;
      proto.startOf = startOf;
      proto.subtract = subtract;
      proto.toArray = toArray;
      proto.toObject = toObject;
      proto.toDate = toDate;
      proto.toISOString = toISOString;
      proto.inspect = inspect;
      if (typeof Symbol !== "undefined" && Symbol.for != null) {
        proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
          return "Moment<" + this.format() + ">";
        };
      }
      proto.toJSON = toJSON;
      proto.toString = toString;
      proto.unix = unix;
      proto.valueOf = valueOf;
      proto.creationData = creationData;
      proto.eraName = getEraName;
      proto.eraNarrow = getEraNarrow;
      proto.eraAbbr = getEraAbbr;
      proto.eraYear = getEraYear;
      proto.year = getSetYear;
      proto.isLeapYear = getIsLeapYear;
      proto.weekYear = getSetWeekYear;
      proto.isoWeekYear = getSetISOWeekYear;
      proto.quarter = proto.quarters = getSetQuarter;
      proto.month = getSetMonth;
      proto.daysInMonth = getDaysInMonth;
      proto.week = proto.weeks = getSetWeek;
      proto.isoWeek = proto.isoWeeks = getSetISOWeek;
      proto.weeksInYear = getWeeksInYear;
      proto.weeksInWeekYear = getWeeksInWeekYear;
      proto.isoWeeksInYear = getISOWeeksInYear;
      proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
      proto.date = getSetDayOfMonth;
      proto.day = proto.days = getSetDayOfWeek;
      proto.weekday = getSetLocaleDayOfWeek;
      proto.isoWeekday = getSetISODayOfWeek;
      proto.dayOfYear = getSetDayOfYear;
      proto.hour = proto.hours = getSetHour;
      proto.minute = proto.minutes = getSetMinute;
      proto.second = proto.seconds = getSetSecond;
      proto.millisecond = proto.milliseconds = getSetMillisecond;
      proto.utcOffset = getSetOffset;
      proto.utc = setOffsetToUTC;
      proto.local = setOffsetToLocal;
      proto.parseZone = setOffsetToParsedOffset;
      proto.hasAlignedHourOffset = hasAlignedHourOffset;
      proto.isDST = isDaylightSavingTime;
      proto.isLocal = isLocal;
      proto.isUtcOffset = isUtcOffset;
      proto.isUtc = isUtc;
      proto.isUTC = isUtc;
      proto.zoneAbbr = getZoneAbbr;
      proto.zoneName = getZoneName;
      proto.dates = deprecate(
        "dates accessor is deprecated. Use date instead.",
        getSetDayOfMonth
      );
      proto.months = deprecate(
        "months accessor is deprecated. Use month instead",
        getSetMonth
      );
      proto.years = deprecate(
        "years accessor is deprecated. Use year instead",
        getSetYear
      );
      proto.zone = deprecate(
        "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
        getSetZone
      );
      proto.isDSTShifted = deprecate(
        "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
        isDaylightSavingTimeShifted
      );
      function createUnix(input) {
        return createLocal(input * 1e3);
      }
      function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
      }
      function preParsePostFormat(string) {
        return string;
      }
      var proto$1 = Locale.prototype;
      proto$1.calendar = calendar;
      proto$1.longDateFormat = longDateFormat;
      proto$1.invalidDate = invalidDate;
      proto$1.ordinal = ordinal;
      proto$1.preparse = preParsePostFormat;
      proto$1.postformat = preParsePostFormat;
      proto$1.relativeTime = relativeTime;
      proto$1.pastFuture = pastFuture;
      proto$1.set = set;
      proto$1.eras = localeEras;
      proto$1.erasParse = localeErasParse;
      proto$1.erasConvertYear = localeErasConvertYear;
      proto$1.erasAbbrRegex = erasAbbrRegex;
      proto$1.erasNameRegex = erasNameRegex;
      proto$1.erasNarrowRegex = erasNarrowRegex;
      proto$1.months = localeMonths;
      proto$1.monthsShort = localeMonthsShort;
      proto$1.monthsParse = localeMonthsParse;
      proto$1.monthsRegex = monthsRegex;
      proto$1.monthsShortRegex = monthsShortRegex;
      proto$1.week = localeWeek;
      proto$1.firstDayOfYear = localeFirstDayOfYear;
      proto$1.firstDayOfWeek = localeFirstDayOfWeek;
      proto$1.weekdays = localeWeekdays;
      proto$1.weekdaysMin = localeWeekdaysMin;
      proto$1.weekdaysShort = localeWeekdaysShort;
      proto$1.weekdaysParse = localeWeekdaysParse;
      proto$1.weekdaysRegex = weekdaysRegex;
      proto$1.weekdaysShortRegex = weekdaysShortRegex;
      proto$1.weekdaysMinRegex = weekdaysMinRegex;
      proto$1.isPM = localeIsPM;
      proto$1.meridiem = localeMeridiem;
      function get$1(format2, index, field, setter) {
        var locale2 = getLocale(), utc = createUTC().set(setter, index);
        return locale2[field](utc, format2);
      }
      function listMonthsImpl(format2, index, field) {
        if (isNumber(format2)) {
          index = format2;
          format2 = void 0;
        }
        format2 = format2 || "";
        if (index != null) {
          return get$1(format2, index, field, "month");
        }
        var i, out = [];
        for (i = 0; i < 12; i++) {
          out[i] = get$1(format2, i, field, "month");
        }
        return out;
      }
      function listWeekdaysImpl(localeSorted, format2, index, field) {
        if (typeof localeSorted === "boolean") {
          if (isNumber(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
        } else {
          format2 = localeSorted;
          index = format2;
          localeSorted = false;
          if (isNumber(format2)) {
            index = format2;
            format2 = void 0;
          }
          format2 = format2 || "";
        }
        var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
        if (index != null) {
          return get$1(format2, (index + shift) % 7, field, "day");
        }
        for (i = 0; i < 7; i++) {
          out[i] = get$1(format2, (i + shift) % 7, field, "day");
        }
        return out;
      }
      function listMonths(format2, index) {
        return listMonthsImpl(format2, index, "months");
      }
      function listMonthsShort(format2, index) {
        return listMonthsImpl(format2, index, "monthsShort");
      }
      function listWeekdays(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
      }
      function listWeekdaysShort(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
      }
      function listWeekdaysMin(localeSorted, format2, index) {
        return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
      }
      getSetGlobalLocale("en", {
        eras: [
          {
            since: "0001-01-01",
            until: Infinity,
            offset: 1,
            name: "Anno Domini",
            narrow: "AD",
            abbr: "AD"
          },
          {
            since: "0000-12-31",
            until: -Infinity,
            offset: 1,
            name: "Before Christ",
            narrow: "BC",
            abbr: "BC"
          }
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
          var b = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
          return number + output;
        }
      });
      hooks.lang = deprecate(
        "moment.lang is deprecated. Use moment.locale instead.",
        getSetGlobalLocale
      );
      hooks.langData = deprecate(
        "moment.langData is deprecated. Use moment.localeData instead.",
        getLocale
      );
      var mathAbs = Math.abs;
      function abs() {
        var data = this._data;
        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);
        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);
        return this;
      }
      function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);
        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;
        return duration._bubble();
      }
      function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
      }
      function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
      }
      function absCeil(number) {
        if (number < 0) {
          return Math.floor(number);
        } else {
          return Math.ceil(number);
        }
      }
      function bubble() {
        var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
        if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
          milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
          days2 = 0;
          months2 = 0;
        }
        data.milliseconds = milliseconds2 % 1e3;
        seconds2 = absFloor(milliseconds2 / 1e3);
        data.seconds = seconds2 % 60;
        minutes2 = absFloor(seconds2 / 60);
        data.minutes = minutes2 % 60;
        hours2 = absFloor(minutes2 / 60);
        data.hours = hours2 % 24;
        days2 += absFloor(hours2 / 24);
        monthsFromDays = absFloor(daysToMonths(days2));
        months2 += monthsFromDays;
        days2 -= absCeil(monthsToDays(monthsFromDays));
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        data.days = days2;
        data.months = months2;
        data.years = years2;
        return this;
      }
      function daysToMonths(days2) {
        return days2 * 4800 / 146097;
      }
      function monthsToDays(months2) {
        return months2 * 146097 / 4800;
      }
      function as(units) {
        if (!this.isValid()) {
          return NaN;
        }
        var days2, months2, milliseconds2 = this._milliseconds;
        units = normalizeUnits(units);
        if (units === "month" || units === "quarter" || units === "year") {
          days2 = this._days + milliseconds2 / 864e5;
          months2 = this._months + daysToMonths(days2);
          switch (units) {
            case "month":
              return months2;
            case "quarter":
              return months2 / 3;
            case "year":
              return months2 / 12;
          }
        } else {
          days2 = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
            case "week":
              return days2 / 7 + milliseconds2 / 6048e5;
            case "day":
              return days2 + milliseconds2 / 864e5;
            case "hour":
              return days2 * 24 + milliseconds2 / 36e5;
            case "minute":
              return days2 * 1440 + milliseconds2 / 6e4;
            case "second":
              return days2 * 86400 + milliseconds2 / 1e3;
            case "millisecond":
              return Math.floor(days2 * 864e5) + milliseconds2;
            default:
              throw new Error("Unknown unit " + units);
          }
        }
      }
      function valueOf$1() {
        if (!this.isValid()) {
          return NaN;
        }
        return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
      }
      function makeAs(alias) {
        return function() {
          return this.as(alias);
        };
      }
      var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
      function clone$1() {
        return createDuration(this);
      }
      function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + "s"]() : NaN;
      }
      function makeGetter(name) {
        return function() {
          return this.isValid() ? this._data[name] : NaN;
        };
      }
      var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
      function weeks() {
        return absFloor(this.days() / 7);
      }
      var round = Math.round, thresholds = {
        ss: 44,
        // a few seconds to seconds
        s: 45,
        // seconds to minute
        m: 45,
        // minutes to hour
        h: 22,
        // hours to day
        d: 26,
        // days to month/week
        w: null,
        // weeks to month
        M: 11
        // months to year
      };
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
        return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }
      function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
        var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
        if (thresholds2.w != null) {
          a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
        }
        a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale2;
        return substituteTimeAgo.apply(null, a);
      }
      function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === void 0) {
          return round;
        }
        if (typeof roundingFunction === "function") {
          round = roundingFunction;
          return true;
        }
        return false;
      }
      function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === void 0) {
          return false;
        }
        if (limit === void 0) {
          return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === "s") {
          thresholds.ss = limit - 1;
        }
        return true;
      }
      function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var withSuffix = false, th = thresholds, locale2, output;
        if (typeof argWithSuffix === "object") {
          argThresholds = argWithSuffix;
          argWithSuffix = false;
        }
        if (typeof argWithSuffix === "boolean") {
          withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === "object") {
          th = Object.assign({}, thresholds, argThresholds);
          if (argThresholds.s != null && argThresholds.ss == null) {
            th.ss = argThresholds.s - 1;
          }
        }
        locale2 = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale2);
        if (withSuffix) {
          output = locale2.pastFuture(+this, output);
        }
        return locale2.postformat(output);
      }
      var abs$1 = Math.abs;
      function sign(x) {
        return (x > 0) - (x < 0) || +x;
      }
      function toISOString$1() {
        if (!this.isValid()) {
          return this.localeData().invalidDate();
        }
        var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
        if (!total) {
          return "P0D";
        }
        minutes2 = absFloor(seconds2 / 60);
        hours2 = absFloor(minutes2 / 60);
        seconds2 %= 60;
        minutes2 %= 60;
        years2 = absFloor(months2 / 12);
        months2 %= 12;
        s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
        totalSign = total < 0 ? "-" : "";
        ymSign = sign(this._months) !== sign(total) ? "-" : "";
        daysSign = sign(this._days) !== sign(total) ? "-" : "";
        hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
        return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
      }
      var proto$2 = Duration.prototype;
      proto$2.isValid = isValid$1;
      proto$2.abs = abs;
      proto$2.add = add$1;
      proto$2.subtract = subtract$1;
      proto$2.as = as;
      proto$2.asMilliseconds = asMilliseconds;
      proto$2.asSeconds = asSeconds;
      proto$2.asMinutes = asMinutes;
      proto$2.asHours = asHours;
      proto$2.asDays = asDays;
      proto$2.asWeeks = asWeeks;
      proto$2.asMonths = asMonths;
      proto$2.asQuarters = asQuarters;
      proto$2.asYears = asYears;
      proto$2.valueOf = valueOf$1;
      proto$2._bubble = bubble;
      proto$2.clone = clone$1;
      proto$2.get = get$2;
      proto$2.milliseconds = milliseconds;
      proto$2.seconds = seconds;
      proto$2.minutes = minutes;
      proto$2.hours = hours;
      proto$2.days = days;
      proto$2.weeks = weeks;
      proto$2.months = months;
      proto$2.years = years;
      proto$2.humanize = humanize;
      proto$2.toISOString = toISOString$1;
      proto$2.toString = toISOString$1;
      proto$2.toJSON = toISOString$1;
      proto$2.locale = locale;
      proto$2.localeData = localeData;
      proto$2.toIsoString = deprecate(
        "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
        toISOString$1
      );
      proto$2.lang = lang;
      addFormatToken("X", 0, 0, "unix");
      addFormatToken("x", 0, 0, "valueOf");
      addRegexToken("x", matchSigned);
      addRegexToken("X", matchTimestamp);
      addParseToken("X", function(input, array, config) {
        config._d = new Date(parseFloat(input) * 1e3);
      });
      addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input));
      });
      hooks.version = "2.29.4";
      setHookCallback(createLocal);
      hooks.fn = proto;
      hooks.min = min;
      hooks.max = max;
      hooks.now = now;
      hooks.utc = createUTC;
      hooks.unix = createUnix;
      hooks.months = listMonths;
      hooks.isDate = isDate;
      hooks.locale = getSetGlobalLocale;
      hooks.invalid = createInvalid;
      hooks.duration = createDuration;
      hooks.isMoment = isMoment;
      hooks.weekdays = listWeekdays;
      hooks.parseZone = createInZone;
      hooks.localeData = getLocale;
      hooks.isDuration = isDuration;
      hooks.monthsShort = listMonthsShort;
      hooks.weekdaysMin = listWeekdaysMin;
      hooks.defineLocale = defineLocale;
      hooks.updateLocale = updateLocale;
      hooks.locales = listLocales;
      hooks.weekdaysShort = listWeekdaysShort;
      hooks.normalizeUnits = normalizeUnits;
      hooks.relativeTimeRounding = getSetRelativeTimeRounding;
      hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
      hooks.calendarFormat = getCalendarFormat;
      hooks.prototype = proto;
      hooks.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        // <input type="datetime-local" step="0.001" />
        DATE: "YYYY-MM-DD",
        // <input type="date" />
        TIME: "HH:mm",
        // <input type="time" />
        TIME_SECONDS: "HH:mm:ss",
        // <input type="time" step="1" />
        TIME_MS: "HH:mm:ss.SSS",
        // <input type="time" step="0.001" />
        WEEK: "GGGG-[W]WW",
        // <input type="week" />
        MONTH: "YYYY-MM"
        // <input type="month" />
      };
      return hooks;
    });
  }
});

// src/i18n.ts
function t(key, lang, params) {
  const text = translations[lang][key];
  if (!params)
    return text;
  return Object.entries(params).reduce((result, [param, value]) => {
    return result.replace(`{${param}}`, value);
  }, text);
}
var translations;
var init_i18n = __esm({
  "src/i18n.ts"() {
    translations = {
      zh: {
        pluginName: "\u968F\u624B\u8BB0",
        pluginDescription: "\u968F\u624B\u8BB0\u5F55\u60F3\u6CD5\u548C\u7B14\u8BB0",
        openJotView: "\u6253\u5F00\u968F\u624B\u8BB0\u89C6\u56FE",
        quickCapture: "\u5FEB\u901F\u8BB0\u5F55",
        saveAsJot: "\u4FDD\u5B58\u4E3A\u968F\u624B\u8BB0",
        savedAsJot: "\u5DF2\u4FDD\u5B58\u4E3A\u968F\u624B\u8BB0\uFF01",
        jotView: "\u968F\u624B\u8BB0",
        quickRecord: "\u5FEB\u901F\u8BB0\u5F55",
        contentPlaceholder: "\u6B64\u523B\u7684\u60F3\u6CD5...",
        placeholderWithLink: "\u6B64\u523B\u7684\u60F3\u6CD5...\n\u8F93\u5165 [[ \u53EF\u5FEB\u901F\u63D2\u5165\u7B14\u8BB0\u94FE\u63A5",
        tagsPlaceholder: "\u6807\u7B7E",
        tagsInputPlaceholder: "\u6309\u56DE\u8F66\u6DFB\u52A0\u6807\u7B7E\uFF0C\u4F7F\u7528 / \u8FDB\u884C\u5D4C\u5957",
        sourcePlaceholder: "\u6765\u6E90",
        attachmentPlaceholder: "\u{1F4CE} \u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u8FD9\u91CC",
        attachmentSelected: "\u2705 \u5DF2\u9009\u62E9: {filename}",
        save: "\u4FDD\u5B58",
        cancel: "\u53D6\u6D88",
        contentRequired: "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",
        saved: "\u5DF2\u4FDD\u5B58\uFF01",
        jotUpdateNotFound: "\u5728\u6587\u4EF6\u4E2D\u627E\u4E0D\u5230\u8BE5\u6761\u968F\u624B\u8BB0\u3002",
        jotUpdateNoFile: "\u8BE5\u8BB0\u5F55\u6CA1\u6709\u5173\u8054\u7684\u6587\u4EF6\u3002",
        jotUpdateFileMissing: "\u6E90\u6587\u4EF6\u4E0D\u5B58\u5728\u3002",
        saveFailed: "\u4FDD\u5B58\u5931\u8D25: {error}",
        attachmentSaved: "\u9644\u4EF6\u5DF2\u4FDD\u5B58: {filename}",
        total: "\u603B\u8BA1",
        today: "\u4ECA\u65E5",
        thisMonth: "\u672C\u6708",
        calendar: "\u65E5\u5386",
        year: "\u5E74",
        month: "\u6708",
        searchAndTags: "\u{1F50D} \u641C\u7D22\u4E0E\u6807\u7B7E",
        searchPlaceholder: "\u5173\u952E\u8BCD\uFF1B\u53EF\u9009 date: / updated: \u7B5B\u9009",
        searchPlaceholderShort: "\u641C\u7D22\uFF1Bdate: / updated:",
        moreTags: "\u8FD8\u6709 {count} \u4E2A\u6807\u7B7E...",
        noRecords: "\u6682\u65E0\u8BB0\u5F55\uFF0C\u5F00\u59CB\u8BB0\u5F55\u4F60\u7684\u60F3\u6CD5\u5427\uFF01",
        settings: "\u8BBE\u7F6E",
        saveFolder: "\u4FDD\u5B58\u6587\u4EF6\u5939",
        saveFolderDesc: "\u4F4D\u4E8E vault \u6839\u76EE\u5F55\uFF0C\u4F8B\u5982\uFF1AJots",
        attachmentsFolder: "\u9644\u4EF6\u5B58\u653E\u76EE\u5F55",
        attachmentsFolderDesc: "\u9644\u4EF6\u5B58\u653E\u4F4D\u7F6E\uFF0C\u4F8B\u5982\uFF1AJots/attachments\u3002\u9644\u4EF6\u547D\u540D\u683C\u5F0F\uFF1Ajot-YYYYMMDD-\u5E8F\u6570",
        attachmentsNaming: "\u9644\u4EF6\u547D\u540D\u683C\u5F0F\uFF1Ajot-YYYYMMDD-\u5E8F\u6570",
        logMode: "\u8BB0\u5F55\u6A21\u5F0F",
        logModeDesc: "\u9009\u62E9\u8BB0\u5F55\u4FDD\u5B58\u65B9\u5F0F",
        logModeMulti: "\u6BCF\u5929\u4E00\u4E2A\u6587\u4EF6",
        logModeSingle: "\u5355\u4E2A\u6587\u4EF6",
        fileFormat: "\u6587\u4EF6\u540D\u683C\u5F0F",
        fileFormatDesc: "\u6587\u4EF6\u540D\u547D\u540D\u683C\u5F0F\uFF0C\u4F8B\u5982\uFF1Ajot-YYYYMMDD \u4F1A\u751F\u6210 jot-20260326.md",
        useFixedTag: "\u4F7F\u7528\u56FA\u5B9A\u6807\u7B7E",
        useFixedTagDesc: "\u4E3A\u6BCF\u6761\u8BB0\u5F55\u81EA\u52A8\u6DFB\u52A0\u56FA\u5B9A\u6807\u7B7E",
        fixedTag: "\u56FA\u5B9A\u6807\u7B7E\u503C",
        fixedTagDesc: "\u81EA\u52A8\u6DFB\u52A0\u7684\u6807\u7B7E\uFF08\u4E0D\u9700\u8981 # \u53F7\uFF09",
        enableTagsInFrontmatter: "\u542F\u7528 frontmatter \u6807\u7B7E",
        enableTagsInFrontmatterDesc: "\u5728\u6BCF\u5929\u6587\u4EF6\u7684 YAML \u533A\u57DF\u6DFB\u52A0 tags \u5B57\u6BB5\uFF08\u65B9\u4FBF Dataview \u7B49\u63D2\u4EF6\u4F7F\u7528\uFF09",
        language: "\u8BED\u8A00",
        languageDesc: "\u9009\u62E9\u63D2\u4EF6\u663E\u793A\u8BED\u8A00",
        languageZh: "\u4E2D\u6587",
        languageEn: "English",
        multiModeInfo: "\u{1F4C1} \u6BCF\u5929\u4E00\u4E2A\u6587\u4EF6\u6A21\u5F0F\u8BF4\u660E\uFF1A",
        singleModeInfo: "\u{1F4C4} \u5355\u4E2A\u6587\u4EF6\u6A21\u5F0F\u8BF4\u660E\uFF1A",
        recordFormat: "\u6BCF\u6761\u8BB0\u5F55\u683C\u5F0F\uFF1A",
        newRecordAtTop: "\u2022 \u65B0\u8BB0\u5F55\u4F1A\u81EA\u52A8\u6DFB\u52A0\u5230\u6587\u4EF6\u6700\u4E0A\u65B9",
        imageEmbed: "\u2022 \u56FE\u7247\u4F7F\u7528 ![[\u8DEF\u5F84]] \u5D4C\u5165",
        fileLink: "\u2022 \u5176\u4ED6\u6587\u4EF6\u4F7F\u7528 [[\u8DEF\u5F84]] \u94FE\u63A5",
        loadingPlugin: "\u52A0\u8F7D\u968F\u624B\u8BB0\u63D2\u4EF6",
        unloadingPlugin: "\u5378\u8F7D\u968F\u624B\u8BB0\u63D2\u4EF6",
        loadingSettings: "\u52A0\u8F7D\u8BBE\u7F6E:",
        creatingAttachmentsFolder: "\u521B\u5EFA\u9644\u4EF6\u76EE\u5F55:",
        attachmentsFolderExists: "\u9644\u4EF6\u76EE\u5F55\u5DF2\u5B58\u5728\u6216\u521B\u5EFA\u5931\u8D25:",
        creatingJotView: "\u521B\u5EFA JotView \u5B9E\u4F8B",
        activatingView: "\u6FC0\u6D3B\u89C6\u56FE",
        pluginNotLoaded: "\u63D2\u4EF6\u672A\u5B8C\u5168\u52A0\u8F7D\uFF0C\u5EF6\u8FDF\u6FC0\u6D3B",
        existingViewFound: "\u627E\u5230\u73B0\u6709\u89C6\u56FE",
        creatingNewView: "\u521B\u5EFA\u65B0\u89C6\u56FE",
        weekdays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
        selectedFiles: "\u2705 \u5DF2\u9009\u62E9 {count} \u4E2A\u6587\u4EF6",
        recordsCount: "{count}\u6761\u8BB0\u5F55",
        autoOpenView: "\u6253\u5F00 vault \u65F6\u81EA\u52A8\u6253\u5F00\u968F\u624B\u8BB0\u89C6\u56FE",
        autoOpenViewDesc: "\u542F\u52A8 Obsidian \u65F6\u81EA\u52A8\u6253\u5F00\u968F\u624B\u8BB0\u89C6\u56FE",
        jotUpdatedAt: "\u66F4\u65B0"
      },
      en: {
        pluginName: "Jot",
        pluginDescription: "Quick note-taking plugin",
        openJotView: "Open Jot View",
        quickCapture: "Quick Capture",
        saveAsJot: "Save as Jot",
        savedAsJot: "Saved as Jot!",
        jotView: "Jot",
        quickRecord: "Quick Record",
        contentPlaceholder: "What's on your mind...",
        placeholderWithLink: "What's on your mind...\nType [[ to quickly insert note links",
        tagsPlaceholder: "Tags",
        tagsInputPlaceholder: "Press Enter to add tag, use / for nesting",
        sourcePlaceholder: "Source",
        attachmentPlaceholder: "\u{1F4CE} Click or drag file here",
        attachmentSelected: "\u2705 Selected: {filename}",
        save: "Save",
        cancel: "Cancel",
        contentRequired: "Content cannot be empty",
        saved: "Saved!",
        jotUpdateNotFound: "Could not find that jot in the file.",
        jotUpdateNoFile: "This jot has no source file.",
        jotUpdateFileMissing: "Source file not found.",
        saveFailed: "Save failed: {error}",
        attachmentSaved: "Attachment saved: {filename}",
        total: "Total",
        today: "Today",
        thisMonth: "This Month",
        calendar: "Calendar",
        year: "",
        month: "/",
        searchAndTags: "\u{1F50D} Search & Tags",
        searchPlaceholder: "Keywords; optional date: / updated: filters",
        searchPlaceholderShort: "Search; date: / updated:",
        moreTags: "{count} more tags...",
        noRecords: "No records yet. Start capturing your thoughts!",
        settings: "Settings",
        saveFolder: "Save Folder",
        saveFolderDesc: "Located in vault root, e.g., Jots",
        attachmentsFolder: "Attachments Folder",
        attachmentsFolderDesc: "Attachment storage location, e.g., Jots/attachments. Naming format: jot-YYYYMMDD-number",
        attachmentsNaming: "Naming format: jot-YYYYMMDD-number",
        logMode: "Log Mode",
        logModeDesc: "Choose how to save records",
        logModeMulti: "One file per day",
        logModeSingle: "Single file",
        fileFormat: "File Format",
        fileFormatDesc: "File naming format, e.g., jot-YYYYMMDD generates jot-20260326.md",
        useFixedTag: "Use Fixed Tag",
        useFixedTagDesc: "Automatically add a fixed tag to each record",
        fixedTag: "Fixed Tag Value",
        fixedTagDesc: "Tag to add automatically (no # needed)",
        enableTagsInFrontmatter: "Enable Frontmatter Tags",
        enableTagsInFrontmatterDesc: "Add tags field in YAML frontmatter (for Dataview and other plugins)",
        language: "Language",
        languageDesc: "Choose plugin display language",
        languageZh: "\u4E2D\u6587",
        languageEn: "English",
        multiModeInfo: "\u{1F4C1} One File Per Day Mode:",
        singleModeInfo: "\u{1F4C4} Single File Mode:",
        recordFormat: "Record format:",
        newRecordAtTop: "\u2022 New records are automatically added to the top",
        imageEmbed: "\u2022 Images embedded with ![[path]]",
        fileLink: "\u2022 Other files linked with [[path]]",
        loadingPlugin: "Loading Jot plugin",
        unloadingPlugin: "Unloading Jot plugin",
        loadingSettings: "Loading settings:",
        creatingAttachmentsFolder: "Creating attachments folder:",
        attachmentsFolderExists: "Attachments folder exists or creation failed:",
        creatingJotView: "Creating JotView instance",
        activatingView: "Activating view",
        pluginNotLoaded: "Plugin not fully loaded, delaying activation",
        existingViewFound: "Found existing view",
        creatingNewView: "Creating new view",
        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        selectedFiles: "\u2705 Selected {count} file(s)",
        recordsCount: "{count} record(s)",
        autoOpenView: "Auto-open Jot View on vault open",
        autoOpenViewDesc: "Automatically open Jot View when Obsidian starts",
        jotUpdatedAt: "Updated"
      }
    };
  }
});

// src/utils.ts
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function normalizeJotTags(tags) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const raw of tags) {
    const s = raw.replace(/^#+/, "").trim();
    if (!s || seen.has(s))
      continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}
function newJotId() {
  if (typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `jot-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
function stableLegacyJotId(filePath, date, time) {
  const s = `${filePath}\0${date}\0${time}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `jot-legacy-${(h >>> 0).toString(16)}`;
}
function formatJotEntryBlock(fullDateTime, id, updatedAt, body) {
  return `### ${fullDateTime}
#### id: ${id}
#### updatedAt: ${updatedAt}

${body}

---

`;
}
function composeJotMarkdownBody(content, tags, source, attachments, lang, useFixedTag, fixedTag) {
  let allTags = normalizeJotTags(tags);
  if (useFixedTag && fixedTag) {
    const fixedTagClean = fixedTag.replace(/^#+/, "").trim();
    if (!allTags.includes(fixedTagClean))
      allTags.push(fixedTagClean);
  }
  allTags = normalizeJotTags(allTags);
  const tagLine = allTags.length > 0 ? allTags.map((x) => `#${x}`).join(" ") : "";
  let finalContent = content;
  const attachmentLines = attachments && attachments.length > 0 ? attachments.map((att) => att.type === "image" ? `![[${att.path}]]` : `[[${att.path}]]`).join("\n") : "";
  if (tagLine)
    finalContent += `

${tagLine}`;
  if (source) {
    const sourcePrefix = lang === "zh" ? "\u6765\u6E90:" : "Source:";
    finalContent += `

${sourcePrefix} ${source}`;
  }
  if (attachmentLines)
    finalContent += `

${attachmentLines}`;
  return { body: finalContent, allTags };
}
function replaceJotBlockById(content, filePath, targetId, newBlock) {
  const lines = content.split("\n");
  let i = 0;
  while (i < lines.length) {
    const lineTrim = lines[i].trim();
    if (lineTrim.startsWith("### ")) {
      const blockStart = i;
      const headerRest = lineTrim.substring(4).trim();
      const [date, time] = headerRest.split(" ");
      let metaId = "";
      let j = i + 1;
      while (j < lines.length) {
        const t2 = lines[j].trim();
        const idMatch = t2.match(/^####\s+id:\s*(.+)$/i);
        if (idMatch) {
          metaId = idMatch[1].trim();
          j++;
          continue;
        }
        if (/^####\s+updatedAt:\s*.+$/i.test(t2)) {
          j++;
          continue;
        }
        break;
      }
      const id = metaId || stableLegacyJotId(filePath, date || "", time || "");
      let k = j;
      while (k < lines.length && !lines[k].trim().startsWith("### ")) {
        k++;
      }
      if (id === targetId) {
        const prefix = lines.slice(0, blockStart).join("\n");
        const suffix = lines.slice(k).join("\n");
        let next = "";
        if (prefix)
          next = prefix + "\n";
        next += newBlock;
        if (suffix)
          next += suffix;
        return { content: next, found: true };
      }
      i = k;
    } else {
      i++;
    }
  }
  return { content, found: false };
}
function parseFileContent(content, filePath, lang) {
  const entries = [];
  const lines = content.split("\n");
  let i = 0;
  const sourcePrefixes = lang === "zh" ? ["\u6765\u6E90:"] : ["Source:", "\u6765\u6E90:"];
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith("### ")) {
      const fullDateTime = line.substring(4).trim();
      const [date, time] = fullDateTime.split(" ");
      const createdAt = [date, time].filter(Boolean).join(" ");
      let j = i + 1;
      let idMeta = "";
      let updatedAtMeta = "";
      while (j < lines.length) {
        const t2 = lines[j].trim();
        const idMatch = t2.match(/^####\s+id:\s*(.*)$/i);
        const updMatch = t2.match(/^####\s+updatedAt:\s*(.*)$/i);
        if (idMatch) {
          idMeta = idMatch[1].trim();
          j++;
          continue;
        }
        if (updMatch) {
          updatedAtMeta = updMatch[1].trim();
          j++;
          continue;
        }
        break;
      }
      const id = idMeta || stableLegacyJotId(filePath, date || "", time || "");
      const updatedAt = updatedAtMeta || createdAt;
      let jotContent = "";
      let tags = [];
      let source = "";
      let attachments = [];
      let attachmentTypes = [];
      while (j < lines.length && !lines[j].trim().startsWith("### ")) {
        const currentLine = lines[j];
        const trimmedLine = currentLine.trim();
        if (!trimmedLine || trimmedLine === "---") {
          j++;
          continue;
        }
        if (trimmedLine.match(/^#[\w\u4e00-\u9fff\/\-_]+(\s+#[\w\u4e00-\u9fff\/\-_]+)*$/)) {
          const tagMatches = trimmedLine.match(/#[\w\u4e00-\u9fff\/\-_]+/g);
          if (tagMatches) {
            tags = normalizeJotTags(tagMatches);
          }
        } else {
          const matchedPrefix = sourcePrefixes.find((p) => trimmedLine.startsWith(p));
          if (matchedPrefix) {
            source = trimmedLine.substring(matchedPrefix.length).trim();
          } else {
            const strictLinkMatch = trimmedLine.match(/^(!?\[\[[^\]]+\]\])$/);
            if (strictLinkMatch) {
              const match = trimmedLine.match(/!?\[\[(.*?)\]\]/);
              if (match) {
                attachments.push(match[1]);
                attachmentTypes.push(trimmedLine.startsWith("![[") ? "image" : "file");
              }
            } else {
              if (jotContent) {
                jotContent += "\n" + currentLine;
              } else {
                jotContent = currentLine;
              }
            }
          }
        }
        j++;
      }
      if (jotContent.trim() || tags.length > 0) {
        entries.push({
          id,
          createdAt,
          updatedAt,
          date: date || "",
          time: time || "",
          content: jotContent.trim(),
          tags,
          source,
          fullText: jotContent.trim(),
          attachments,
          attachmentTypes,
          filePath
        });
      }
      i = j;
    } else {
      i++;
    }
  }
  return entries;
}
async function handleAttachment(app, file, settings, lang, callback) {
  const dateStr = (0, import_moment.default)().format("YYYY-MM-DD");
  const dateStrNoDash = dateStr.replace(/-/g, "");
  const attachmentsFolder = settings.attachmentsFolder;
  if (!app.vault.getAbstractFileByPath(attachmentsFolder)) {
    try {
      await app.vault.createFolder(attachmentsFolder);
    } catch (error) {
      new import_obsidian.Notice(t("attachmentsFolderExists", lang) + ` ${error}`);
      return;
    }
  }
  const folder = app.vault.getAbstractFileByPath(attachmentsFolder);
  let existingFiles = [];
  if (folder && folder instanceof import_obsidian.TFolder) {
    existingFiles = folder.children.filter(
      (f) => f instanceof import_obsidian.TFile && f.name.startsWith(`jot-${dateStrNoDash}`)
    );
  }
  let maxNumber = 0;
  for (const f of existingFiles) {
    const match = f.name.match(/jot-(\d{8})-(\d+)\./);
    if (match) {
      const num = parseInt(match[2], 10);
      if (num > maxNumber)
        maxNumber = num;
    }
  }
  let attempts = 0;
  const maxAttempts = 100;
  let serialNumber;
  let filename;
  let filePath;
  do {
    maxNumber++;
    serialNumber = String(maxNumber).padStart(3, "0");
    const ext = file.name.split(".").pop() || "bin";
    filename = `jot-${dateStrNoDash}-${serialNumber}.${ext}`;
    filePath = `${attachmentsFolder}/${filename}`;
    attempts++;
  } while (app.vault.getAbstractFileByPath(filePath) && attempts < maxAttempts);
  if (attempts >= maxAttempts) {
    new import_obsidian.Notice("\u65E0\u6CD5\u751F\u6210\u552F\u4E00\u6587\u4EF6\u540D");
    return;
  }
  try {
    const arrayBuffer = await file.arrayBuffer();
    await app.vault.createBinary(filePath, arrayBuffer);
    const isImage = file.type.startsWith("image/");
    callback({ path: filePath, type: isImage ? "image" : "file" });
    new import_obsidian.Notice(t("attachmentSaved", lang, { filename }));
  } catch (error) {
    console.error("\u4FDD\u5B58\u9644\u4EF6\u5931\u8D25:", error);
    new import_obsidian.Notice(t("saveFailed", lang, { error: error.message }));
  }
}
function setupWikilinkAutocomplete(app, textarea, container, onSuggestionSelect) {
  let suggestionContainer = null;
  let suggestionTimeout;
  const hideSuggestions = () => {
    if (suggestionContainer) {
      suggestionContainer.remove();
      suggestionContainer = null;
    }
  };
  const cleanup = () => {
    hideSuggestions();
    clearTimeout(suggestionTimeout);
  };
  const setActiveSuggestion = (items, index) => {
    items.forEach((item, i) => {
      if (item && item.classList) {
        if (i === index) {
          item.classList.add("jots-suggestion-item-active");
          item.style.backgroundColor = "var(--background-modifier-hover)";
        } else {
          item.classList.remove("jots-suggestion-item-active");
          item.style.backgroundColor = "";
        }
      }
    });
  };
  textarea.addEventListener("input", () => {
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const lastDoubleBracket = textBeforeCursor.lastIndexOf("[[");
    if (lastDoubleBracket !== -1) {
      const afterLastBracket = textBeforeCursor.substring(lastDoubleBracket + 2);
      if (!afterLastBracket.includes("]]")) {
        const searchTerm = afterLastBracket;
        clearTimeout(suggestionTimeout);
        suggestionTimeout = setTimeout(() => {
          const files = app.vault.getMarkdownFiles();
          const searchLower = searchTerm.toLowerCase();
          const matches = files.filter((file) => file.basename.toLowerCase().includes(searchLower)).slice(0, 10);
          if (matches.length === 0) {
            hideSuggestions();
            return;
          }
          if (!suggestionContainer) {
            suggestionContainer = document.createElement("div");
            suggestionContainer.classList.add("jots-suggestions");
            suggestionContainer.style.position = "fixed";
            suggestionContainer.style.backgroundColor = "var(--background-primary)";
            suggestionContainer.style.border = "1px solid var(--background-modifier-border)";
            suggestionContainer.style.borderRadius = "6px";
            suggestionContainer.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            suggestionContainer.style.zIndex = "99999";
            suggestionContainer.style.maxHeight = "200px";
            suggestionContainer.style.minHeight = "120px";
            suggestionContainer.style.overflowY = "auto";
            suggestionContainer.style.display = "block";
            suggestionContainer.style.minWidth = "200px";
            suggestionContainer.style.padding = "0";
            document.body.appendChild(suggestionContainer);
          }
          const textareaRect = textarea.getBoundingClientRect();
          suggestionContainer.style.left = `${textareaRect.left}px`;
          suggestionContainer.style.top = `${textareaRect.bottom + 4}px`;
          suggestionContainer.style.width = `${textareaRect.width}px`;
          suggestionContainer.empty();
          matches.forEach((file, index) => {
            const item = suggestionContainer.createDiv();
            item.classList.add("jots-suggestion-item");
            item.textContent = file.basename;
            item.style.padding = "6px 12px";
            item.style.cursor = "pointer";
            item.style.fontSize = "12px";
            item.style.borderBottom = "1px solid var(--background-modifier-border)";
            item.style.color = "var(--text-normal)";
            if (index === 0) {
              item.classList.add("jots-suggestion-item-active");
              item.style.backgroundColor = "var(--background-modifier-hover)";
            }
            item.addEventListener("click", () => {
              onSuggestionSelect(file, textarea, lastDoubleBracket);
              hideSuggestions();
              textarea.focus();
            });
            item.addEventListener("mouseenter", () => {
              setActiveSuggestion(matches, index);
            });
          });
        }, 100);
        return;
      }
    }
    hideSuggestions();
  });
  textarea.addEventListener("keydown", (e) => {
    if (!suggestionContainer)
      return;
    const items = suggestionContainer.querySelectorAll(".jots-suggestion-item");
    const activeItem = suggestionContainer.querySelector(".jots-suggestion-item-active");
    let activeIndex = -1;
    items.forEach((item, index) => {
      if (item === activeItem)
        activeIndex = index;
    });
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (activeIndex + 1) % items.length;
      setActiveSuggestion(items, nextIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
      setActiveSuggestion(items, prevIndex);
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (activeItem) {
        e.preventDefault();
        activeItem.click();
      }
    } else if (e.key === "Escape") {
      hideSuggestions();
    }
  });
  textarea.addEventListener("blur", () => {
    setTimeout(() => hideSuggestions(), 200);
  });
  return cleanup;
}
function setupTagAutocomplete(getExistingTags, tagInput, container, tagListContainer, currentTags, onAddTag, onRenderTagList) {
  let tagSuggestionContainer = null;
  let suggestionTimeout;
  const hideTagSuggestions = () => {
    if (tagSuggestionContainer) {
      tagSuggestionContainer.remove();
      tagSuggestionContainer = null;
    }
  };
  const setActiveTagSuggestion = (items, index) => {
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add("jots-tag-suggestion-item-active");
        item.style.backgroundColor = "var(--background-modifier-hover)";
      } else {
        item.classList.remove("jots-tag-suggestion-item-active");
        item.style.backgroundColor = "";
      }
    });
  };
  const showTagSuggestions = (searchTerm) => {
    const allTags = getExistingTags();
    const searchLower = searchTerm.toLowerCase();
    const matches = allTags.filter((tag) => tag.toLowerCase().includes(searchLower)).filter((tag) => !currentTags.includes(tag)).slice(0, 8);
    if (matches.length === 0) {
      hideTagSuggestions();
      return;
    }
    if (!tagSuggestionContainer) {
      tagSuggestionContainer = container.createDiv();
      tagSuggestionContainer.classList.add("jots-tag-suggestions");
      tagSuggestionContainer.style.position = "absolute";
      tagSuggestionContainer.style.top = "100%";
      tagSuggestionContainer.style.left = "0";
      tagSuggestionContainer.style.right = "0";
      tagSuggestionContainer.style.backgroundColor = "var(--background-primary)";
      tagSuggestionContainer.style.border = "1px solid var(--background-modifier-border)";
      tagSuggestionContainer.style.borderRadius = "6px";
      tagSuggestionContainer.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      tagSuggestionContainer.style.zIndex = "1000";
      tagSuggestionContainer.style.maxHeight = "200px";
      tagSuggestionContainer.style.overflowY = "auto";
    }
    tagSuggestionContainer.empty();
    matches.forEach((tag, index) => {
      const item = tagSuggestionContainer.createDiv();
      item.classList.add("jots-tag-suggestion-item");
      item.textContent = `#${tag}`;
      item.style.padding = "6px 12px";
      item.style.cursor = "pointer";
      item.style.fontSize = "12px";
      item.style.borderBottom = "1px solid var(--background-modifier-border)";
      item.style.color = "var(--text-normal)";
      if (index === 0) {
        item.classList.add("jots-tag-suggestion-item-active");
        item.style.backgroundColor = "var(--background-modifier-hover)";
      }
      item.addEventListener("click", () => {
        onAddTag(tag);
        tagInput.value = "";
        hideTagSuggestions();
        tagInput.focus();
      });
      item.addEventListener("mouseenter", () => {
        setActiveTagSuggestion(matches, index);
      });
    });
    const rect = tagInput.getBoundingClientRect();
    tagSuggestionContainer.style.top = `${rect.height}px`;
  };
  tagInput.addEventListener("input", () => {
    const value = tagInput.value;
    const currentWord = value.trim();
    if (currentWord.length > 0) {
      clearTimeout(suggestionTimeout);
      suggestionTimeout = setTimeout(() => {
        showTagSuggestions(currentWord);
      }, 100);
    } else {
      hideTagSuggestions();
    }
  });
  tagInput.addEventListener("keydown", (e) => {
    var _a, _b;
    if (e.key === "Enter") {
      e.preventDefault();
      const value = tagInput.value.trim();
      if (tagSuggestionContainer) {
        const activeItem2 = tagSuggestionContainer.querySelector(".jots-tag-suggestion-item-active");
        if (activeItem2) {
          const tag = ((_a = activeItem2.textContent) == null ? void 0 : _a.replace("#", "")) || "";
          onAddTag(tag);
          hideTagSuggestions();
          return;
        }
      }
      if (value && !value.includes(" ")) {
        onAddTag(value);
      }
      return;
    }
    if (e.key === "Tab" && tagSuggestionContainer) {
      e.preventDefault();
      const activeItem2 = tagSuggestionContainer.querySelector(".jots-tag-suggestion-item-active");
      if (activeItem2) {
        const tag = ((_b = activeItem2.textContent) == null ? void 0 : _b.replace("#", "")) || "";
        onAddTag(tag);
        hideTagSuggestions();
      }
      return;
    }
    if (e.key === " ") {
      e.preventDefault();
      return;
    }
    if (!tagSuggestionContainer)
      return;
    const items = tagSuggestionContainer.querySelectorAll(".jots-tag-suggestion-item");
    const activeItem = tagSuggestionContainer.querySelector(".jots-tag-suggestion-item-active");
    let activeIndex = -1;
    items.forEach((item, index) => {
      if (item === activeItem)
        activeIndex = index;
    });
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (activeIndex + 1) % items.length;
      setActiveTagSuggestion(items, nextIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
      setActiveTagSuggestion(items, prevIndex);
    } else if (e.key === "Escape") {
      hideTagSuggestions();
    }
  });
  tagInput.addEventListener("blur", () => {
    setTimeout(() => {
      const value = tagInput.value.trim();
      if (value && !value.includes(" ") && !currentTags.includes(value)) {
        onAddTag(value);
      }
      hideTagSuggestions();
    }, 200);
  });
}
function renderTagList(container, tags, onRemoveTag) {
  container.empty();
  tags.forEach((tag) => {
    const tagPill = container.createSpan();
    tagPill.textContent = `#${tag}`;
    tagPill.style.padding = "4px 10px";
    tagPill.style.backgroundColor = "var(--background-primary-alt)";
    tagPill.style.borderRadius = "12px";
    tagPill.style.fontSize = "11px";
    tagPill.style.display = "inline-flex";
    tagPill.style.alignItems = "center";
    tagPill.style.gap = "6px";
    tagPill.style.border = "1px solid var(--background-modifier-border)";
    tagPill.style.cursor = "pointer";
    const removeBtn = tagPill.createSpan();
    removeBtn.textContent = "\xD7";
    removeBtn.style.cursor = "pointer";
    removeBtn.style.fontWeight = "bold";
    removeBtn.style.marginLeft = "4px";
    removeBtn.style.fontSize = "12px";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      onRemoveTag(tag);
    });
  });
}
function highlightMarkdownContent(container, keywords) {
  if (!keywords.length)
    return;
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node2) => {
        var _a, _b;
        if ((_b = (_a = node2.parentElement) == null ? void 0 : _a.classList) == null ? void 0 : _b.contains("search-highlight")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  const textNodes = [];
  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node);
  }
  const pattern = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  textNodes.forEach((textNode) => {
    var _a;
    const text = textNode.textContent || "";
    if (regex.test(text)) {
      regex.lastIndex = 0;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
        }
        const mark = document.createElement("mark");
        mark.className = "search-highlight";
        mark.textContent = match[0];
        fragment.appendChild(mark);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
      }
      (_a = textNode.parentNode) == null ? void 0 : _a.replaceChild(fragment, textNode);
    }
  });
}
var import_obsidian, import_moment;
var init_utils = __esm({
  "src/utils.ts"() {
    import_obsidian = require("obsidian");
    import_moment = __toESM(require_moment());
    init_i18n();
  }
});

// src/capture-modal.ts
var capture_modal_exports = {};
__export(capture_modal_exports, {
  CaptureModal: () => CaptureModal
});
var import_obsidian2, CaptureModal;
var init_capture_modal = __esm({
  "src/capture-modal.ts"() {
    import_obsidian2 = require("obsidian");
    init_i18n();
    init_utils();
    CaptureModal = class extends import_obsidian2.Modal {
      constructor(app, plugin) {
        super(app);
        this.tags = [];
        this.selectedAttachments = [];
        this.tagListContainer = null;
        this.currentTags = [];
        this.wikilinkCleanup = null;
        this.plugin = plugin;
      }
      get lang() {
        return this.plugin.lang;
      }
      async onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        if (!this.plugin.jots || this.plugin.jots.length === 0) {
          await this.plugin.refreshJots();
        }
        const container = contentEl.createDiv();
        container.style.padding = "20px";
        container.style.minWidth = "400px";
        const title = container.createEl("h3");
        title.textContent = t("quickRecord", this.lang);
        title.style.marginBottom = "20px";
        const textareaContainer = container.createDiv();
        textareaContainer.style.position = "relative";
        const textarea = textareaContainer.createEl("textarea");
        textarea.placeholder = t("contentPlaceholder", this.lang);
        textarea.style.width = "100%";
        textarea.style.minHeight = "150px";
        textarea.style.padding = "10px";
        textarea.style.border = "1px solid var(--background-modifier-border)";
        textarea.style.borderRadius = "8px";
        textarea.style.backgroundColor = "var(--background-primary-alt)";
        textarea.style.marginBottom = "16px";
        textarea.style.resize = "vertical";
        textarea.style.fontFamily = "inherit";
        textarea.style.fontSize = "14px";
        textarea.style.lineHeight = "1.6";
        this.contentInput = textarea;
        this.setupWikilinkAutocomplete(textarea, textareaContainer);
        const tagSection = container.createDiv();
        tagSection.style.marginBottom = "16px";
        const tagInputContainer = tagSection.createDiv();
        tagInputContainer.style.position = "relative";
        tagInputContainer.style.marginBottom = "8px";
        const tagsInput = tagInputContainer.createEl("input");
        tagsInput.placeholder = t("tagsInputPlaceholder", this.lang);
        tagsInput.style.width = "100%";
        tagsInput.style.padding = "8px";
        tagsInput.style.border = "1px solid var(--background-modifier-border)";
        tagsInput.style.borderRadius = "6px";
        tagsInput.style.backgroundColor = "var(--background-primary)";
        tagsInput.style.color = "var(--text-normal)";
        this.tagsInput = tagsInput;
        this.tagListContainer = tagSection.createDiv();
        this.tagListContainer.style.display = "flex";
        this.tagListContainer.style.flexWrap = "wrap";
        this.tagListContainer.style.gap = "6px";
        this.tagListContainer.style.marginBottom = "8px";
        this.currentTags = [];
        this.setupTagAutocomplete(tagsInput, tagInputContainer, this.tagListContainer);
        const sourceInput = container.createEl("input");
        sourceInput.placeholder = t("sourcePlaceholder", this.lang);
        sourceInput.style.width = "100%";
        sourceInput.style.padding = "8px";
        sourceInput.style.border = "1px solid var(--background-modifier-border)";
        sourceInput.style.borderRadius = "6px";
        sourceInput.style.marginBottom = "16px";
        sourceInput.style.backgroundColor = "var(--background-primary)";
        sourceInput.style.color = "var(--text-normal)";
        this.sourceInput = sourceInput;
        const attachmentArea = container.createDiv();
        attachmentArea.style.border = "1px dashed var(--background-modifier-border)";
        attachmentArea.style.borderRadius = "6px";
        attachmentArea.style.padding = "12px";
        attachmentArea.style.textAlign = "center";
        attachmentArea.style.cursor = "pointer";
        attachmentArea.style.marginBottom = "20px";
        attachmentArea.textContent = t("attachmentPlaceholder", this.lang);
        attachmentArea.style.fontSize = "12px";
        attachmentArea.style.color = "var(--text-faint)";
        attachmentArea.addEventListener("click", () => {
          const input = document.createElement("input");
          input.type = "file";
          input.multiple = true;
          input.addEventListener("change", async () => {
            const files = Array.from(input.files || []);
            for (const file of files) {
              await this.handleAttachment(file, attachmentArea);
            }
          });
          input.click();
        });
        attachmentArea.addEventListener("dragover", (e) => {
          e.preventDefault();
          attachmentArea.style.borderColor = "var(--interactive-accent)";
        });
        attachmentArea.addEventListener("dragleave", () => {
          attachmentArea.style.borderColor = "var(--background-modifier-border)";
        });
        attachmentArea.addEventListener("drop", async (e) => {
          var _a;
          e.preventDefault();
          attachmentArea.style.borderColor = "var(--background-modifier-border)";
          const files = Array.from(((_a = e.dataTransfer) == null ? void 0 : _a.files) || []);
          for (const file of files) {
            await this.handleAttachment(file, attachmentArea);
          }
        });
        const buttonContainer = container.createDiv();
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "flex-end";
        buttonContainer.style.gap = "10px";
        const cancelBtn = buttonContainer.createEl("button");
        cancelBtn.textContent = t("cancel", this.lang);
        cancelBtn.style.padding = "8px 16px";
        cancelBtn.style.borderRadius = "6px";
        cancelBtn.style.cursor = "pointer";
        cancelBtn.style.backgroundColor = "var(--background-primary)";
        cancelBtn.style.border = "1px solid var(--background-modifier-border)";
        cancelBtn.addEventListener("click", () => this.close());
        const saveBtn = buttonContainer.createEl("button");
        saveBtn.textContent = t("save", this.lang);
        saveBtn.style.padding = "8px 24px";
        saveBtn.style.borderRadius = "6px";
        saveBtn.style.backgroundColor = "var(--interactive-accent)";
        saveBtn.style.color = "var(--text-on-accent)";
        saveBtn.style.border = "none";
        saveBtn.style.cursor = "pointer";
        saveBtn.style.fontWeight = "500";
        saveBtn.addEventListener("click", async () => {
          await this.handleSave();
        });
        textarea.focus();
      }
      setupTagAutocomplete(tagInput, container, tagListContainer) {
        setupTagAutocomplete(
          () => this.getExistingTags(),
          tagInput,
          container,
          tagListContainer,
          this.currentTags,
          (tag) => this.addTagToInput(tag, tagInput, tagListContainer),
          (tags) => this.renderTagList(tagListContainer, tags)
        );
      }
      getExistingTags() {
        const tags = /* @__PURE__ */ new Set();
        for (const jot of this.plugin.jots) {
          jot.tags.forEach((tag) => tags.add(tag));
        }
        return Array.from(tags);
      }
      renderTagList(container, tags) {
        this.currentTags = tags;
        renderTagList(container, tags, (tag) => {
          this.currentTags = this.currentTags.filter((t2) => t2 !== tag);
          this.renderTagList(container, this.currentTags);
          if (this.tagsInput) {
            this.tagsInput.value = "";
          }
        });
      }
      addTagToInput(tag, tagInput, tagListContainer) {
        if (tag && !this.currentTags.includes(tag)) {
          this.currentTags.push(tag);
          this.renderTagList(tagListContainer, this.currentTags);
          tagInput.value = "";
        }
      }
      setupWikilinkAutocomplete(textarea, container) {
        this.wikilinkCleanup = setupWikilinkAutocomplete(
          this.app,
          textarea,
          container,
          (file, textarea2, bracketStart) => {
            const cursorPos = textarea2.selectionStart;
            const textBefore = textarea2.value.substring(0, bracketStart);
            const textAfter = textarea2.value.substring(cursorPos);
            const newText = textBefore + `[[${file.basename}]]` + textAfter;
            textarea2.value = newText;
            const newCursorPos = bracketStart + file.basename.length + 4;
            textarea2.selectionStart = newCursorPos;
            textarea2.selectionEnd = newCursorPos;
            textarea2.focus();
          }
        );
      }
      async handleAttachment(file, area) {
        await handleAttachment(
          this.app,
          file,
          this.plugin.settings,
          this.lang,
          (result) => {
            this.selectedAttachments.push(result);
            const count = this.selectedAttachments.length;
            area.textContent = t("selectedFiles", this.lang, { count: String(count) });
            area.style.borderColor = "var(--interactive-accent)";
            area.style.backgroundColor = "var(--background-primary-alt)";
          }
        );
      }
      async handleSave() {
        const content = this.contentInput.value.trim();
        if (!content) {
          new import_obsidian2.Notice(t("contentRequired", this.lang));
          return;
        }
        const tags = [...this.currentTags];
        const source = this.sourceInput.value.trim();
        try {
          await this.plugin.saveJot(content, tags, source, this.selectedAttachments);
          this.close();
        } catch (error) {
          console.error("Save failed:", error);
          new import_obsidian2.Notice(t("saveFailed", this.lang, { error: error.message || "Unknown error" }));
        }
      }
      onClose() {
        if (this.wikilinkCleanup) {
          this.wikilinkCleanup();
          this.wikilinkCleanup = null;
        }
        super.onClose();
      }
    };
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => JotPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");
var import_moment3 = __toESM(require_moment());

// src/view.ts
var import_obsidian3 = require("obsidian");
var import_moment2 = __toESM(require_moment());
init_i18n();
init_utils();
var CARD_LONG_PRESS_MS = 480;
var CARD_TAP_MOVE_PX = 14;
var VIEW_TYPE_JOTS = "jot-view";
var JotView = class extends import_obsidian3.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.jots = [];
    this.searchQuery = "";
    this.selectedTags = /* @__PURE__ */ new Set();
    this.isSidebar = false;
    this.suggestionContainer = null;
    this.currentTextarea = null;
    this.inputCard = null;
    this.searchInput = null;
    this.searchContainer = null;
    this.renderedComponents = [];
    this.tagSuggestionContainer = null;
    this.tagListContainer = null;
    this.currentTags = [];
    this.debouncedRender = null;
    this.wikilinkCleanup = null;
    /** Inline jot edit */
    this.editingJotId = null;
    this.editSessionTags = [];
    this.jotListCleanups = [];
    this.plugin = plugin;
    const now = /* @__PURE__ */ new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth();
    this.debouncedSearch = debounce((query) => {
      this.searchQuery = query;
      this.updateSearchAndFilter();
    }, 300);
  }
  get lang() {
    return this.plugin.lang;
  }
  getViewType() {
    return VIEW_TYPE_JOTS;
  }
  getDisplayText() {
    return t("jotView", this.lang);
  }
  getIcon() {
    return "jot-bolt";
  }
  async onOpen() {
    this.contentEl.addClass("jots-view");
    if (this.leaf.tabHeaderInnerIconEl) {
      this.leaf.tabHeaderInnerIconEl.empty();
    }
    this.debouncedRender = debounce(() => {
      this.render();
    }, 200);
    await this.refresh();
    this.checkIfSidebar();
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        if (leaf === this.leaf && this.currentTextarea) {
          this.focusTextarea();
        }
      })
    );
  }
  onResize() {
    const wasSidebar = this.isSidebar;
    this.checkIfSidebar();
    if (wasSidebar !== this.isSidebar && this.debouncedRender) {
      this.debouncedRender();
    }
  }
  async onClose() {
    if (this.wikilinkCleanup) {
      this.wikilinkCleanup();
      this.wikilinkCleanup = null;
    }
    if (this.tagSuggestionContainer) {
      this.tagSuggestionContainer.remove();
      this.tagSuggestionContainer = null;
    }
    this.renderedComponents.forEach((comp) => {
      try {
        comp.unload();
      } catch (e) {
        console.error("Error unloading component:", e);
      }
    });
    this.renderedComponents = [];
  }
  focusTextarea() {
    if (this.currentTextarea) {
      setTimeout(() => {
        var _a;
        (_a = this.currentTextarea) == null ? void 0 : _a.focus();
        const length = this.currentTextarea.value.length;
        this.currentTextarea.setSelectionRange(length, length);
      }, 50);
    }
  }
  updateSearchAndFilter() {
    if (this.searchInput) {
      this.searchInput.value = this.searchQuery;
    }
    this.updateClearButton();
    const listSection = this.contentEl.querySelector(".jots-list-section");
    if (listSection) {
      this.renderJotList(listSection);
    }
  }
  updateClearButton() {
    if (this.searchContainer) {
      let clearBtnContainer = this.searchContainer.querySelector(".search-clear-container");
      if (!clearBtnContainer) {
        clearBtnContainer = this.searchContainer.createDiv({ cls: "search-clear-container" });
      }
      if (this.searchQuery && this.searchQuery.length > 0) {
        clearBtnContainer.empty();
        const clearIcon = clearBtnContainer.createSpan();
        clearIcon.textContent = "\xD7";
        clearBtnContainer.style.display = "flex";
        clearBtnContainer.style.position = "absolute";
        clearBtnContainer.style.right = "8px";
        clearBtnContainer.style.top = "50%";
        clearBtnContainer.style.transform = "translateY(-50%)";
        clearBtnContainer.style.alignItems = "center";
        clearBtnContainer.style.justifyContent = "center";
        clearBtnContainer.style.width = "24px";
        clearBtnContainer.style.height = "24px";
        clearBtnContainer.style.borderRadius = "50%";
        clearBtnContainer.style.backgroundColor = "var(--background-modifier-border)";
        clearBtnContainer.style.cursor = "pointer";
        clearBtnContainer.style.zIndex = "10";
        if (this.searchInput) {
          this.searchInput.style.paddingRight = "32px";
        }
        clearBtnContainer.addEventListener("click", (e) => {
          e.stopPropagation();
          this.searchQuery = "";
          this.updateSearchAndFilter();
          if (this.searchInput) {
            this.searchInput.value = "";
            this.searchInput.focus();
          }
        });
      } else {
        clearBtnContainer.style.display = "none";
        if (this.searchInput) {
          this.searchInput.style.paddingRight = "";
        }
      }
    }
  }
  parseSearchFilters(query) {
    const keywords = [];
    let date;
    let updated;
    for (const part of query.trim().split(/\s+/).filter(Boolean)) {
      const lower = part.toLowerCase();
      if (lower.startsWith("date:")) {
        date = part.slice(5);
      } else if (lower.startsWith("updated:")) {
        updated = part.slice(8);
      } else {
        keywords.push(part.toLowerCase());
      }
    }
    return { date, updated, keywords };
  }
  attachCardTapAndLongPress(card, jot) {
    let timer = null;
    let longPressFired = false;
    let startX = 0;
    let startY = 0;
    let movedTooFar = false;
    const clearTimer = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const onPointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0)
        return;
      longPressFired = false;
      movedTooFar = false;
      startX = e.clientX;
      startY = e.clientY;
      clearTimer();
      try {
        card.setPointerCapture(e.pointerId);
      } catch (e2) {
      }
      timer = setTimeout(() => {
        timer = null;
        longPressFired = true;
        void this.openJot(jot);
      }, CARD_LONG_PRESS_MS);
    };
    const onPointerMove = (e) => {
      if (timer === null && !longPressFired)
        return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (dx * dx + dy * dy > CARD_TAP_MOVE_PX * CARD_TAP_MOVE_PX) {
        movedTooFar = true;
        clearTimer();
      }
    };
    const onPointerUp = (e) => {
      clearTimer();
      try {
        card.releasePointerCapture(e.pointerId);
      } catch (e2) {
      }
      if (longPressFired)
        return;
      if (movedTooFar)
        return;
      if (e.pointerType === "mouse" && e.button !== 0)
        return;
      this.enterEditMode(jot);
    };
    const onPointerCancel = (e) => {
      clearTimer();
      try {
        card.releasePointerCapture(e.pointerId);
      } catch (e2) {
      }
    };
    card.addEventListener("pointerdown", onPointerDown);
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerup", onPointerUp);
    card.addEventListener("pointercancel", onPointerCancel);
    this.jotListCleanups.push(() => {
      clearTimer();
      card.removeEventListener("pointerdown", onPointerDown);
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerup", onPointerUp);
      card.removeEventListener("pointercancel", onPointerCancel);
    });
  }
  enterEditMode(jot) {
    this.editingJotId = jot.id;
    this.editSessionTags = [...jot.tags];
    const listSection = this.contentEl.querySelector(".jots-list-section");
    if (listSection) {
      this.renderJotList(listSection);
    }
  }
  exitEditMode() {
    this.editingJotId = null;
    this.editSessionTags = [];
    const listSection = this.contentEl.querySelector(".jots-list-section");
    if (listSection) {
      this.renderJotList(listSection);
    }
  }
  renderTagList(container, tags) {
    this.currentTags = tags;
    renderTagList(container, tags, (tag) => {
      var _a;
      this.currentTags = this.currentTags.filter((t2) => t2 !== tag);
      this.renderTagList(container, this.currentTags);
      const tagInput = (_a = this.inputCard) == null ? void 0 : _a.querySelector(".jots-tag-input");
      if (tagInput) {
        tagInput.value = "";
      }
    });
  }
  setupTagAutocomplete(tagInput, container, tagListContainer) {
    setupTagAutocomplete(
      () => this.getExistingTags(),
      tagInput,
      container,
      tagListContainer,
      this.currentTags,
      (tag) => this.addTagToInput(tag, tagInput, tagListContainer),
      (tags) => this.renderTagList(tagListContainer, tags)
    );
  }
  getExistingTags() {
    const tags = /* @__PURE__ */ new Set();
    for (const jot of this.jots) {
      jot.tags.forEach((tag) => tags.add(tag));
    }
    return Array.from(tags);
  }
  addTagToInput(tag, tagInput, tagListContainer) {
    if (tag && !this.currentTags.includes(tag)) {
      this.currentTags.push(tag);
      this.renderTagList(tagListContainer, this.currentTags);
      tagInput.value = "";
    }
  }
  checkIfSidebar() {
    const width = this.contentEl.clientWidth;
    this.isSidebar = width < 450;
  }
  async refresh() {
    await this.loadJots();
    this.render();
  }
  async loadJots() {
    const folder = this.plugin.settings.saveFolder;
    const folderObj = this.app.vault.getAbstractFileByPath(folder);
    if (!folderObj || !(folderObj instanceof import_obsidian3.TFolder)) {
      this.jots = [];
      return;
    }
    const files = folderObj.children.filter((f) => f instanceof import_obsidian3.TFile && f.name.endsWith(".md"));
    const allJots = [];
    for (const file of files) {
      const content = await this.app.vault.read(file);
      const entries = parseFileContent(content, file.path, this.lang);
      allJots.push(...entries);
    }
    allJots.sort((a, b) => {
      const dateA = (0, import_moment2.default)(a.date + " " + a.time, "YYYY-MM-DD HH:mm:ss");
      const dateB = (0, import_moment2.default)(b.date + " " + b.time, "YYYY-MM-DD HH:mm:ss");
      return dateB.valueOf() - dateA.valueOf();
    });
    this.jots = allJots;
  }
  render() {
    this.contentEl.empty();
    if (this.isSidebar) {
      this.renderSidebarLayout();
    } else {
      this.renderMainLayout();
    }
    this.focusTextarea();
  }
  renderMainLayout() {
    const container = this.contentEl.createDiv();
    container.style.display = "flex";
    container.style.gap = "20px";
    container.style.height = "100%";
    container.style.overflow = "hidden";
    const leftPanel = container.createDiv();
    leftPanel.style.flex = "2";
    leftPanel.style.overflow = "auto";
    leftPanel.style.padding = "10px";
    const rightPanel = container.createDiv();
    rightPanel.style.flex = "1";
    rightPanel.style.overflow = "auto";
    rightPanel.style.padding = "10px";
    this.renderFullInput(leftPanel);
    const listContainer = leftPanel.createDiv();
    listContainer.style.marginTop = "20px";
    this.renderJotList(listContainer);
    this.renderStats(rightPanel);
    this.renderCalendar(rightPanel);
    this.renderSearch(rightPanel);
  }
  renderSidebarLayout() {
    const container = this.contentEl.createDiv();
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "12px";
    container.style.height = "100%";
    container.style.overflow = "auto";
    container.style.padding = "8px";
    const addBtn = container.createDiv();
    addBtn.textContent = "+ " + t("quickCapture", this.lang);
    addBtn.style.background = "var(--interactive-accent)";
    addBtn.style.color = "var(--text-on-accent)";
    addBtn.style.padding = "8px 12px";
    addBtn.style.borderRadius = "6px";
    addBtn.style.cursor = "pointer";
    addBtn.style.textAlign = "center";
    addBtn.style.fontSize = "13px";
    addBtn.style.marginBottom = "4px";
    addBtn.addEventListener("click", () => {
      const { CaptureModal: CaptureModal2 } = (init_capture_modal(), __toCommonJS(capture_modal_exports));
      new CaptureModal2(this.app, this.plugin).open();
    });
    this.renderStatsCompact(container);
    this.renderCalendarCompact(container);
    this.renderSearchCompact(container);
    const listContainer = container.createDiv();
    listContainer.style.marginTop = "8px";
    this.renderJotList(listContainer);
  }
  renderFullInput(container) {
    this.inputCard = container.createDiv();
    this.inputCard.style.backgroundColor = "var(--background-secondary)";
    this.inputCard.style.borderRadius = "12px";
    this.inputCard.style.padding = "16px";
    this.inputCard.style.border = "1px solid var(--background-modifier-border)";
    const title = this.inputCard.createDiv();
    title.textContent = t("quickRecord", this.lang);
    title.style.fontSize = "16px";
    title.style.fontWeight = "600";
    title.style.marginBottom = "12px";
    title.style.color = "var(--text-normal)";
    const textareaContainer = this.inputCard.createDiv();
    textareaContainer.style.position = "relative";
    const textarea = textareaContainer.createEl("textarea");
    textarea.placeholder = t("placeholderWithLink", this.lang);
    textarea.style.width = "100%";
    textarea.style.minHeight = "100px";
    textarea.style.padding = "8px";
    textarea.style.borderRadius = "6px";
    textarea.style.border = "1px solid var(--background-modifier-border)";
    textarea.style.backgroundColor = "var(--background-primary)";
    textarea.style.color = "var(--text-normal)";
    textarea.style.resize = "vertical";
    textarea.style.fontFamily = "var(--font-text)";
    this.currentTextarea = textarea;
    this.setupWikilinkAutocomplete(textarea, textareaContainer);
    const tagSection = this.inputCard.createDiv();
    tagSection.style.marginTop = "8px";
    const tagInputContainer = tagSection.createDiv();
    tagInputContainer.style.position = "relative";
    tagInputContainer.style.marginBottom = "8px";
    const tagInput = tagInputContainer.createEl("input");
    tagInput.addClass("jots-tag-input");
    tagInput.placeholder = t("tagsInputPlaceholder", this.lang);
    tagInput.style.width = "100%";
    tagInput.style.padding = "8px";
    tagInput.style.borderRadius = "6px";
    tagInput.style.border = "1px solid var(--background-modifier-border)";
    tagInput.style.backgroundColor = "var(--background-primary)";
    tagInput.style.color = "var(--text-normal)";
    this.tagListContainer = tagSection.createDiv();
    this.tagListContainer.style.display = "flex";
    this.tagListContainer.style.flexWrap = "wrap";
    this.tagListContainer.style.gap = "6px";
    this.tagListContainer.style.marginBottom = "8px";
    this.currentTags = [];
    this.setupTagAutocomplete(tagInput, tagInputContainer, this.tagListContainer);
    const sourceInput = this.inputCard.createEl("input");
    sourceInput.placeholder = t("sourcePlaceholder", this.lang);
    sourceInput.style.width = "100%";
    sourceInput.style.padding = "8px";
    sourceInput.style.borderRadius = "6px";
    sourceInput.style.border = "1px solid var(--background-modifier-border)";
    sourceInput.style.backgroundColor = "var(--background-primary)";
    sourceInput.style.color = "var(--text-normal)";
    sourceInput.style.marginTop = "8px";
    const attachmentArea = this.inputCard.createDiv();
    attachmentArea.style.marginTop = "8px";
    attachmentArea.style.border = "1px dashed var(--background-modifier-border)";
    attachmentArea.style.borderRadius = "6px";
    attachmentArea.style.padding = "8px";
    attachmentArea.style.textAlign = "center";
    attachmentArea.style.cursor = "pointer";
    attachmentArea.textContent = t("attachmentPlaceholder", this.lang);
    attachmentArea.style.fontSize = "12px";
    attachmentArea.style.color = "var(--text-muted)";
    attachmentArea.style.backgroundColor = "var(--background-primary)";
    let selectedAttachments = [];
    attachmentArea.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = true;
      input.addEventListener("change", async () => {
        const files = Array.from(input.files || []);
        for (const file of files) {
          await this.handleAttachment(file, attachmentArea, (result) => {
            selectedAttachments.push(result);
            const count = selectedAttachments.length;
            attachmentArea.textContent = t("selectedFiles", this.lang, { count: String(count) });
          });
        }
      });
      input.click();
    });
    attachmentArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      attachmentArea.style.borderColor = "var(--interactive-accent)";
      attachmentArea.style.backgroundColor = "var(--background-modifier-hover)";
    });
    attachmentArea.addEventListener("dragleave", () => {
      attachmentArea.style.borderColor = "var(--background-modifier-border)";
      attachmentArea.style.backgroundColor = "var(--background-primary)";
    });
    attachmentArea.addEventListener("drop", async (e) => {
      var _a;
      e.preventDefault();
      attachmentArea.style.borderColor = "var(--background-modifier-border)";
      attachmentArea.style.backgroundColor = "var(--background-primary)";
      const files = Array.from(((_a = e.dataTransfer) == null ? void 0 : _a.files) || []);
      for (const file of files) {
        await this.handleAttachment(file, attachmentArea, (result) => {
          selectedAttachments.push(result);
          const count = selectedAttachments.length;
          attachmentArea.textContent = t("selectedFiles", this.lang, { count: String(count) });
        });
      }
    });
    const buttonRow = this.inputCard.createDiv();
    buttonRow.style.display = "flex";
    buttonRow.style.justifyContent = "flex-end";
    buttonRow.style.marginTop = "12px";
    const saveBtn = buttonRow.createEl("button");
    saveBtn.textContent = t("save", this.lang);
    saveBtn.style.padding = "6px 16px";
    saveBtn.style.borderRadius = "6px";
    saveBtn.style.backgroundColor = "var(--interactive-accent)";
    saveBtn.style.color = "var(--text-on-accent)";
    saveBtn.style.border = "none";
    saveBtn.style.cursor = "pointer";
    saveBtn.style.fontWeight = "500";
    saveBtn.addEventListener("click", async () => {
      const content = textarea.value.trim();
      if (!content) {
        new import_obsidian3.Notice(t("contentRequired", this.lang));
        return;
      }
      const tags = [...this.currentTags];
      const source = sourceInput.value.trim();
      console.log("\u4FDD\u5B58\u65F6\u9644\u4EF6\u6570\u91CF:", selectedAttachments.length);
      await this.plugin.saveJot(content, tags, source, selectedAttachments);
      textarea.value = "";
      this.currentTags = [];
      this.renderTagList(this.tagListContainer, []);
      tagInput.value = "";
      sourceInput.value = "";
      selectedAttachments = [];
      attachmentArea.textContent = t("attachmentPlaceholder", this.lang);
      attachmentArea.style.borderColor = "var(--background-modifier-border)";
      attachmentArea.style.backgroundColor = "var(--background-primary)";
      this.focusTextarea();
    });
  }
  setupWikilinkAutocomplete(textarea, container) {
    this.wikilinkCleanup = setupWikilinkAutocomplete(
      this.app,
      textarea,
      container,
      (file, textarea2, bracketStart) => {
        const cursorPos = textarea2.selectionStart;
        const textBefore = textarea2.value.substring(0, bracketStart);
        const textAfter = textarea2.value.substring(cursorPos);
        const newText = textBefore + `[[${file.basename}]]` + textAfter;
        textarea2.value = newText;
        const newCursorPos = bracketStart + file.basename.length + 4;
        textarea2.selectionStart = newCursorPos;
        textarea2.selectionEnd = newCursorPos;
        textarea2.focus();
      }
    );
    return this.wikilinkCleanup;
  }
  async handleAttachment(file, area, callback) {
    await handleAttachment(
      this.app,
      file,
      this.plugin.settings,
      this.lang,
      callback
    );
  }
  renderStats(container) {
    const stats = this.getStats();
    const section = container.createDiv();
    section.style.marginBottom = "12px";
    section.style.backgroundColor = "var(--background-secondary)";
    section.style.borderRadius = "8px";
    section.style.padding = "12px";
    section.style.border = "1px solid var(--background-modifier-border)";
    const contentDiv = section.createDiv();
    contentDiv.style.display = "flex";
    contentDiv.style.justifyContent = "space-around";
    const totalDiv = contentDiv.createDiv();
    totalDiv.style.textAlign = "center";
    totalDiv.style.flex = "1";
    totalDiv.createDiv({ text: stats.total.toString(), style: "font-size: 24px; font-weight: bold; color: var(--text-normal);" });
    totalDiv.createDiv({ text: t("total", this.lang), style: "font-size: 11px; color: var(--text-muted);" });
    const todayDiv = contentDiv.createDiv();
    todayDiv.style.textAlign = "center";
    todayDiv.style.flex = "1";
    todayDiv.createDiv({ text: stats.today.toString(), style: "font-size: 24px; font-weight: bold; color: var(--text-normal);" });
    todayDiv.createDiv({ text: t("today", this.lang), style: "font-size: 11px; color: var(--text-muted);" });
    const monthDiv = contentDiv.createDiv();
    monthDiv.style.textAlign = "center";
    monthDiv.style.flex = "1";
    monthDiv.createDiv({ text: stats.thisMonth.toString(), style: "font-size: 24px; font-weight: bold; color: var(--text-normal);" });
    monthDiv.createDiv({ text: t("thisMonth", this.lang), style: "font-size: 11px; color: var(--text-muted);" });
  }
  renderStatsCompact(container) {
    const stats = this.getStats();
    const section = container.createDiv();
    section.style.marginBottom = "8px";
    section.style.backgroundColor = "var(--background-secondary)";
    section.style.borderRadius = "6px";
    section.style.padding = "10px";
    section.style.border = "1px solid var(--background-modifier-border)";
    const contentDiv = section.createDiv();
    contentDiv.style.display = "flex";
    contentDiv.style.justifyContent = "space-around";
    contentDiv.style.gap = "8px";
    const totalDiv = contentDiv.createDiv();
    totalDiv.style.textAlign = "center";
    totalDiv.style.flex = "1";
    totalDiv.createDiv({ text: stats.total.toString(), style: "font-size: 18px; font-weight: bold; color: var(--text-normal);" });
    totalDiv.createDiv({ text: t("total", this.lang), style: "font-size: 10px; color: var(--text-muted); margin-top: 2px;" });
    const todayDiv = contentDiv.createDiv();
    todayDiv.style.textAlign = "center";
    todayDiv.style.flex = "1";
    todayDiv.createDiv({ text: stats.today.toString(), style: "font-size: 18px; font-weight: bold; color: var(--text-normal);" });
    todayDiv.createDiv({ text: t("today", this.lang), style: "font-size: 10px; color: var(--text-muted); margin-top: 2px;" });
    const monthDiv = contentDiv.createDiv();
    monthDiv.style.textAlign = "center";
    monthDiv.style.flex = "1";
    monthDiv.createDiv({ text: stats.thisMonth.toString(), style: "font-size: 18px; font-weight: bold; color: var(--text-normal);" });
    monthDiv.createDiv({ text: t("thisMonth", this.lang), style: "font-size: 10px; color: var(--text-muted); margin-top: 2px;" });
  }
  getStats() {
    const total = this.jots.length;
    const today = (0, import_moment2.default)().format("YYYY-MM-DD");
    const todayCount = this.jots.filter((m) => m.date === today).length;
    const thisMonth = (0, import_moment2.default)().format("YYYY-MM");
    const thisMonthCount = this.jots.filter((m) => m.date.startsWith(thisMonth)).length;
    return { total, today: todayCount, thisMonth: thisMonthCount };
  }
  renderCalendar(container) {
    const section = container.createDiv();
    section.style.marginBottom = "12px";
    section.style.backgroundColor = "var(--background-secondary)";
    section.style.borderRadius = "8px";
    section.style.padding = "12px";
    section.style.border = "1px solid var(--background-modifier-border)";
    const title = section.createDiv();
    title.textContent = "\u{1F4C5} " + t("calendar", this.lang);
    title.style.fontSize = "13px";
    title.style.fontWeight = "500";
    title.style.marginBottom = "8px";
    title.style.color = "var(--text-normal)";
    const contentDiv = section.createDiv();
    this.renderCalendarGrid(contentDiv);
  }
  renderCalendarCompact(container) {
    const section = container.createDiv();
    section.style.marginBottom = "8px";
    section.style.backgroundColor = "var(--background-secondary)";
    section.style.borderRadius = "6px";
    section.style.padding = "10px";
    section.style.border = "1px solid var(--background-modifier-border)";
    const title = section.createDiv();
    title.textContent = "\u{1F4C5} " + t("calendar", this.lang);
    title.style.fontSize = "12px";
    title.style.fontWeight = "500";
    title.style.marginBottom = "6px";
    title.style.color = "var(--text-normal)";
    const contentDiv = section.createDiv();
    this.renderCalendarGridCompact(contentDiv);
  }
  renderCalendarGrid(container) {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startWeekday = firstDay.getDay();
    const header = container.createDiv();
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "10px";
    const prevBtn = header.createDiv();
    prevBtn.textContent = "\u2190";
    prevBtn.style.cursor = "pointer";
    prevBtn.style.padding = "4px 8px";
    prevBtn.style.borderRadius = "4px";
    prevBtn.style.color = "var(--text-muted)";
    prevBtn.addEventListener("mouseenter", () => {
      prevBtn.style.backgroundColor = "var(--background-modifier-hover)";
    });
    prevBtn.addEventListener("mouseleave", () => {
      prevBtn.style.backgroundColor = "transparent";
    });
    prevBtn.addEventListener("click", () => this.changeMonth(-1));
    const title = header.createDiv();
    title.textContent = `${this.currentYear}${t("year", this.lang)} ${this.currentMonth + 1}${t("month", this.lang)}`;
    title.style.fontSize = "13px";
    title.style.fontWeight = "500";
    title.style.color = "var(--text-normal)";
    title.classList.add("jots-calendar-title");
    const nextBtn = header.createDiv();
    nextBtn.textContent = "\u2192";
    nextBtn.style.cursor = "pointer";
    nextBtn.style.padding = "4px 8px";
    nextBtn.style.borderRadius = "4px";
    nextBtn.style.color = "var(--text-muted)";
    nextBtn.addEventListener("mouseenter", () => {
      nextBtn.style.backgroundColor = "var(--background-modifier-hover)";
    });
    nextBtn.addEventListener("mouseleave", () => {
      nextBtn.style.backgroundColor = "transparent";
    });
    nextBtn.addEventListener("click", () => this.changeMonth(1));
    const weekdays = translations[this.lang].weekdays;
    const weekdayRow = container.createDiv();
    weekdayRow.style.display = "grid";
    weekdayRow.style.gridTemplateColumns = "repeat(7, 1fr)";
    weekdayRow.style.gap = "2px";
    weekdayRow.style.marginBottom = "4px";
    weekdays.forEach((day) => {
      const dayEl = weekdayRow.createDiv();
      dayEl.textContent = day;
      dayEl.style.textAlign = "center";
      dayEl.style.fontSize = "10px";
      dayEl.style.color = "var(--text-muted)";
    });
    const daysGrid = container.createDiv();
    daysGrid.style.display = "grid";
    daysGrid.style.gridTemplateColumns = "repeat(7, 1fr)";
    daysGrid.style.gap = "2px";
    for (let i = 0; i < startWeekday; i++) {
      const emptyDay = daysGrid.createDiv();
      emptyDay.style.padding = "4px 2px";
    }
    const dayRecords = this.getDayRecords();
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const record = dayRecords.get(dateStr);
      const hasRecord = record && record.count > 0;
      const dayDiv = daysGrid.createDiv();
      dayDiv.textContent = String(d);
      dayDiv.style.textAlign = "center";
      dayDiv.style.padding = "4px 2px";
      dayDiv.style.borderRadius = "4px";
      dayDiv.style.fontSize = "11px";
      dayDiv.style.cursor = hasRecord ? "pointer" : "default";
      if (hasRecord) {
        dayDiv.style.backgroundColor = "var(--interactive-accent)";
        dayDiv.style.color = "var(--text-on-accent)";
        dayDiv.title = `${dateStr}: ${t("recordsCount", this.lang, { count: String(record.count) })}`;
        dayDiv.addEventListener("click", () => {
          this.filterByDate(dateStr);
        });
      } else {
        dayDiv.style.backgroundColor = "var(--background-modifier-border)";
        dayDiv.style.color = "var(--text-muted)";
      }
    }
  }
  renderCalendarGridCompact(container) {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startWeekday = firstDay.getDay();
    const navRow = container.createDiv();
    navRow.style.display = "flex";
    navRow.style.justifyContent = "space-between";
    navRow.style.alignItems = "center";
    navRow.style.marginBottom = "8px";
    navRow.style.padding = "0 4px";
    const prevBtn = navRow.createDiv();
    prevBtn.textContent = "\u2190";
    prevBtn.style.cursor = "pointer";
    prevBtn.style.padding = "2px 6px";
    prevBtn.style.fontSize = "11px";
    prevBtn.style.borderRadius = "4px";
    prevBtn.style.color = "var(--text-muted)";
    prevBtn.addEventListener("mouseenter", () => {
      prevBtn.style.backgroundColor = "var(--background-modifier-hover)";
    });
    prevBtn.addEventListener("mouseleave", () => {
      prevBtn.style.backgroundColor = "transparent";
    });
    prevBtn.addEventListener("click", () => this.changeMonth(-1));
    const title = navRow.createDiv();
    title.textContent = `${this.currentYear}/${this.currentMonth + 1}`;
    title.style.fontSize = "11px";
    title.style.fontWeight = "500";
    title.style.color = "var(--text-normal)";
    title.classList.add("jots-calendar-title");
    const nextBtn = navRow.createDiv();
    nextBtn.textContent = "\u2192";
    nextBtn.style.cursor = "pointer";
    nextBtn.style.padding = "2px 6px";
    nextBtn.style.fontSize = "11px";
    nextBtn.style.borderRadius = "4px";
    nextBtn.style.color = "var(--text-muted)";
    nextBtn.addEventListener("mouseenter", () => {
      nextBtn.style.backgroundColor = "var(--background-modifier-hover)";
    });
    nextBtn.addEventListener("mouseleave", () => {
      nextBtn.style.backgroundColor = "transparent";
    });
    nextBtn.addEventListener("click", () => this.changeMonth(1));
    const weekdaysShort = translations[this.lang].weekdays;
    const weekdayRow = container.createDiv();
    weekdayRow.style.display = "grid";
    weekdayRow.style.gridTemplateColumns = "repeat(7, 1fr)";
    weekdayRow.style.gap = "1px";
    weekdayRow.style.marginBottom = "4px";
    weekdaysShort.forEach((day) => {
      const dayEl = weekdayRow.createDiv();
      dayEl.textContent = day;
      dayEl.style.textAlign = "center";
      dayEl.style.fontSize = "8px";
      dayEl.style.color = "var(--text-muted)";
      dayEl.style.padding = "2px 0";
    });
    const daysGrid = container.createDiv();
    daysGrid.style.display = "grid";
    daysGrid.style.gridTemplateColumns = "repeat(7, 1fr)";
    daysGrid.style.gap = "1px";
    for (let i = 0; i < startWeekday; i++) {
      const emptyDay = daysGrid.createDiv();
      emptyDay.style.padding = "3px 1px";
      emptyDay.style.textAlign = "center";
    }
    const dayRecords = this.getDayRecords();
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const record = dayRecords.get(dateStr);
      const hasRecord = record && record.count > 0;
      const dayDiv = daysGrid.createDiv();
      dayDiv.textContent = String(d);
      dayDiv.style.textAlign = "center";
      dayDiv.style.padding = "3px 1px";
      dayDiv.style.borderRadius = "3px";
      dayDiv.style.fontSize = "9px";
      dayDiv.style.cursor = hasRecord ? "pointer" : "default";
      if (hasRecord) {
        dayDiv.style.backgroundColor = "var(--interactive-accent)";
        dayDiv.style.color = "var(--text-on-accent)";
        dayDiv.title = `${dateStr}: ${t("recordsCount", this.lang, { count: String(record.count) })}`;
        dayDiv.addEventListener("click", () => {
          this.filterByDate(dateStr);
        });
      } else {
        dayDiv.style.backgroundColor = "var(--background-modifier-border)";
        dayDiv.style.color = "var(--text-muted)";
      }
    }
  }
  getDayRecords() {
    const records = /* @__PURE__ */ new Map();
    for (const jot of this.jots) {
      const date = jot.date;
      if (!records.has(date)) {
        records.set(date, { date, count: 0, jots: [] });
      }
      const record = records.get(date);
      record.count++;
      record.jots.push(jot);
    }
    return records;
  }
  changeMonth(delta) {
    this.currentMonth += delta;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    const calendarContainer = this.contentEl.querySelector(".jots-calendar");
    if (calendarContainer) {
      calendarContainer.empty();
      if (this.isSidebar) {
        this.renderCalendarCompact(calendarContainer);
      } else {
        this.renderCalendar(calendarContainer);
      }
    }
  }
  filterByDate(date) {
    this.searchQuery = `date:${date}`;
    this.updateSearchAndFilter();
  }
  renderSearch(container) {
    const section = container.createDiv();
    section.style.marginBottom = "12px";
    section.style.backgroundColor = "var(--background-secondary)";
    section.style.borderRadius = "8px";
    section.style.padding = "12px";
    section.style.border = "1px solid var(--background-modifier-border)";
    const title = section.createDiv();
    title.textContent = t("searchAndTags", this.lang);
    title.style.fontSize = "13px";
    title.style.fontWeight = "500";
    title.style.marginBottom = "8px";
    title.style.color = "var(--text-normal)";
    this.searchContainer = section.createDiv();
    this.searchContainer.style.position = "relative";
    this.searchContainer.style.width = "100%";
    const searchInput = this.searchContainer.createEl("input");
    searchInput.type = "text";
    searchInput.placeholder = t("searchPlaceholder", this.lang);
    searchInput.style.width = "100%";
    searchInput.style.padding = "6px 8px";
    searchInput.style.paddingRight = "32px";
    searchInput.style.borderRadius = "4px";
    searchInput.style.border = "1px solid var(--background-modifier-border)";
    searchInput.style.backgroundColor = "var(--background-primary)";
    searchInput.style.color = "var(--text-normal)";
    searchInput.style.marginBottom = "12px";
    searchInput.value = this.searchQuery;
    this.searchInput = searchInput;
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value;
      this.debouncedSearch(query);
    });
    this.updateClearButton();
    const tagFilter = section.createDiv();
    tagFilter.style.display = "flex";
    tagFilter.style.flexWrap = "wrap";
    tagFilter.style.gap = "6px";
    const allTags = this.getAllTags();
    allTags.forEach((tag) => {
      const tagBtn = tagFilter.createSpan();
      tagBtn.textContent = `#${tag}`;
      tagBtn.style.padding = "2px 8px";
      tagBtn.style.borderRadius = "12px";
      tagBtn.style.fontSize = "11px";
      tagBtn.style.backgroundColor = this.selectedTags.has(tag) ? "var(--interactive-accent)" : "var(--background-primary)";
      tagBtn.style.color = this.selectedTags.has(tag) ? "var(--text-on-accent)" : "var(--text-muted)";
      tagBtn.style.border = "1px solid var(--background-modifier-border)";
      tagBtn.style.cursor = "pointer";
      tagBtn.addEventListener("click", () => {
        if (this.selectedTags.has(tag)) {
          this.selectedTags.delete(tag);
        } else {
          this.selectedTags.add(tag);
        }
        tagBtn.style.backgroundColor = this.selectedTags.has(tag) ? "var(--interactive-accent)" : "var(--background-primary)";
        tagBtn.style.color = this.selectedTags.has(tag) ? "var(--text-on-accent)" : "var(--text-muted)";
        const listSection = this.contentEl.querySelector(".jots-list-section");
        if (listSection) {
          this.renderJotList(listSection);
        }
      });
    });
  }
  renderSearchCompact(container) {
    const section = container.createDiv();
    section.style.marginBottom = "8px";
    section.style.backgroundColor = "var(--background-secondary)";
    section.style.borderRadius = "6px";
    section.style.padding = "10px";
    section.style.border = "1px solid var(--background-modifier-border)";
    const title = section.createDiv();
    title.textContent = t("searchAndTags", this.lang);
    title.style.fontSize = "12px";
    title.style.fontWeight = "500";
    title.style.marginBottom = "6px";
    title.style.color = "var(--text-normal)";
    this.searchContainer = section.createDiv();
    this.searchContainer.style.position = "relative";
    this.searchContainer.style.width = "100%";
    const searchInput = this.searchContainer.createEl("input");
    searchInput.type = "text";
    searchInput.placeholder = t("searchPlaceholderShort", this.lang);
    searchInput.style.width = "100%";
    searchInput.style.padding = "5px 8px";
    searchInput.style.paddingRight = "28px";
    searchInput.style.borderRadius = "4px";
    searchInput.style.border = "1px solid var(--background-modifier-border)";
    searchInput.style.backgroundColor = "var(--background-primary)";
    searchInput.style.color = "var(--text-normal)";
    searchInput.style.fontSize = "11px";
    searchInput.style.marginBottom = "10px";
    searchInput.value = this.searchQuery;
    this.searchInput = searchInput;
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value;
      this.debouncedSearch(query);
    });
    this.updateClearButton();
    const tagFilter = section.createDiv();
    tagFilter.style.display = "flex";
    tagFilter.style.flexWrap = "wrap";
    tagFilter.style.gap = "4px";
    const allTags = this.getAllTags().slice(0, 8);
    allTags.forEach((tag) => {
      const tagBtn = tagFilter.createSpan();
      tagBtn.textContent = `#${tag}`;
      tagBtn.style.padding = "2px 6px";
      tagBtn.style.borderRadius = "10px";
      tagBtn.style.fontSize = "10px";
      tagBtn.style.backgroundColor = this.selectedTags.has(tag) ? "var(--interactive-accent)" : "var(--background-primary)";
      tagBtn.style.color = this.selectedTags.has(tag) ? "var(--text-on-accent)" : "var(--text-muted)";
      tagBtn.style.border = "1px solid var(--background-modifier-border)";
      tagBtn.style.cursor = "pointer";
      tagBtn.addEventListener("click", () => {
        if (this.selectedTags.has(tag)) {
          this.selectedTags.delete(tag);
        } else {
          this.selectedTags.add(tag);
        }
        tagBtn.style.backgroundColor = this.selectedTags.has(tag) ? "var(--interactive-accent)" : "var(--background-primary)";
        tagBtn.style.color = this.selectedTags.has(tag) ? "var(--text-on-accent)" : "var(--text-muted)";
        const listSection = this.contentEl.querySelector(".jots-list-section");
        if (listSection) {
          this.renderJotList(listSection);
        }
      });
    });
    const allTagsCount = this.getAllTags().length;
    if (allTagsCount > 8) {
      const moreHint = section.createDiv();
      moreHint.textContent = t("moreTags", this.lang, { count: String(allTagsCount - 8) });
      moreHint.style.fontSize = "9px";
      moreHint.style.color = "var(--text-muted)";
      moreHint.style.marginTop = "6px";
      moreHint.style.textAlign = "center";
    }
  }
  getAllTags() {
    const tags = /* @__PURE__ */ new Set();
    for (const jot of this.jots) {
      jot.tags.forEach((tag) => tags.add(tag));
    }
    return Array.from(tags);
  }
  renderJotList(container) {
    container.empty();
    container.addClass("jots-list-section");
    this.renderedComponents.forEach((comp) => {
      try {
        comp.unload();
      } catch (e) {
        console.error("Error unloading component:", e);
      }
    });
    this.renderedComponents = [];
    this.jotListCleanups.forEach((fn) => {
      try {
        fn();
      } catch (e) {
      }
    });
    this.jotListCleanups = [];
    let filteredJots = this.filterJots();
    if (filteredJots.length === 0) {
      const empty = container.createDiv();
      empty.textContent = t("noRecords", this.lang);
      empty.style.textAlign = "center";
      empty.style.padding = "40px";
      empty.style.color = "var(--text-muted)";
      empty.style.fontSize = "13px";
      return;
    }
    const searchKeywords = this.searchQuery.trim().length > 0 ? this.parseSearchFilters(this.searchQuery).keywords : [];
    const groupedByDate = /* @__PURE__ */ new Map();
    filteredJots.forEach((jot) => {
      if (!groupedByDate.has(jot.date)) {
        groupedByDate.set(jot.date, []);
      }
      groupedByDate.get(jot.date).push(jot);
    });
    for (const [date, jots] of groupedByDate) {
      const dateGroup = container.createDiv();
      dateGroup.style.marginBottom = "16px";
      const dateHeader = dateGroup.createDiv();
      dateHeader.textContent = date;
      dateHeader.style.fontSize = "11px";
      dateHeader.style.fontWeight = "600";
      dateHeader.style.color = "var(--text-muted)";
      dateHeader.style.padding = "4px 0";
      dateHeader.style.borderBottom = "1px solid var(--background-modifier-border)";
      dateHeader.style.marginBottom = "8px";
      jots.forEach((jot) => {
        const card = dateGroup.createDiv();
        card.style.backgroundColor = "var(--background-secondary)";
        card.style.borderRadius = "8px";
        card.style.padding = "10px 12px";
        card.style.marginBottom = "8px";
        card.style.transition = "all 0.2s";
        card.style.border = "1px solid var(--background-modifier-border)";
        if (this.editingJotId === jot.id) {
          card.style.cursor = "default";
          card.style.borderColor = "var(--interactive-accent)";
          const metaRow2 = card.createDiv();
          metaRow2.style.display = "flex";
          metaRow2.style.flexWrap = "wrap";
          metaRow2.style.alignItems = "baseline";
          metaRow2.style.gap = "12px";
          metaRow2.style.marginBottom = "8px";
          metaRow2.style.fontSize = "10px";
          metaRow2.style.color = "var(--text-muted)";
          metaRow2.createSpan({ text: jot.time });
          const updSpan = metaRow2.createSpan();
          updSpan.textContent = `${t("jotUpdatedAt", this.lang)}: ${jot.updatedAt}`;
          updSpan.style.color = "var(--text-normal)";
          updSpan.style.fontWeight = "600";
          const textareaContainer = card.createDiv();
          textareaContainer.style.position = "relative";
          const textarea = textareaContainer.createEl("textarea");
          textarea.classList.add("jots-edit-textarea");
          textarea.value = jot.content;
          textarea.style.width = "100%";
          textarea.style.minHeight = "100px";
          textarea.style.padding = "8px";
          textarea.style.borderRadius = "6px";
          textarea.style.border = "1px solid var(--background-modifier-border)";
          textarea.style.backgroundColor = "var(--background-primary)";
          textarea.style.color = "var(--text-normal)";
          textarea.style.resize = "vertical";
          textarea.style.fontFamily = "var(--font-text)";
          textarea.placeholder = t("placeholderWithLink", this.lang);
          const wlCleanup = this.setupWikilinkAutocomplete(textarea, textareaContainer);
          if (wlCleanup)
            this.jotListCleanups.push(wlCleanup);
          const tagSection = card.createDiv();
          tagSection.style.marginTop = "8px";
          const tagInputContainer = tagSection.createDiv();
          tagInputContainer.style.position = "relative";
          tagInputContainer.style.marginBottom = "8px";
          const tagInput = tagInputContainer.createEl("input");
          tagInput.classList.add("jots-tag-input");
          tagInput.placeholder = t("tagsInputPlaceholder", this.lang);
          tagInput.style.width = "100%";
          tagInput.style.padding = "8px";
          tagInput.style.borderRadius = "6px";
          tagInput.style.border = "1px solid var(--background-modifier-border)";
          tagInput.style.backgroundColor = "var(--background-primary)";
          tagInput.style.color = "var(--text-normal)";
          const tagListContainer = tagSection.createDiv();
          tagListContainer.style.display = "flex";
          tagListContainer.style.flexWrap = "wrap";
          tagListContainer.style.gap = "6px";
          const refreshEditTags = () => {
            renderTagList(tagListContainer, this.editSessionTags, (tag) => {
              this.editSessionTags = this.editSessionTags.filter((x) => x !== tag);
              refreshEditTags();
            });
          };
          refreshEditTags();
          setupTagAutocomplete(
            () => this.getExistingTags(),
            tagInput,
            tagInputContainer,
            tagListContainer,
            this.editSessionTags,
            (tag) => {
              const cleaned = tag.replace(/^#+/, "").trim();
              if (cleaned && !this.editSessionTags.includes(cleaned)) {
                this.editSessionTags.push(cleaned);
                refreshEditTags();
                tagInput.value = "";
              }
            },
            () => {
            }
          );
          const sourceInput = card.createEl("input");
          sourceInput.classList.add("jots-edit-source");
          sourceInput.value = jot.source;
          sourceInput.placeholder = t("sourcePlaceholder", this.lang);
          sourceInput.style.width = "100%";
          sourceInput.style.padding = "8px";
          sourceInput.style.borderRadius = "6px";
          sourceInput.style.border = "1px solid var(--background-modifier-border)";
          sourceInput.style.backgroundColor = "var(--background-primary)";
          sourceInput.style.color = "var(--text-normal)";
          sourceInput.style.marginTop = "8px";
          const buttonRow = card.createDiv();
          buttonRow.style.display = "flex";
          buttonRow.style.justifyContent = "flex-end";
          buttonRow.style.gap = "8px";
          buttonRow.style.marginTop = "12px";
          const cancelBtn = buttonRow.createEl("button");
          cancelBtn.textContent = t("cancel", this.lang);
          cancelBtn.style.padding = "6px 14px";
          cancelBtn.style.borderRadius = "6px";
          cancelBtn.style.border = "1px solid var(--background-modifier-border)";
          cancelBtn.style.backgroundColor = "var(--background-primary)";
          cancelBtn.style.color = "var(--text-normal)";
          cancelBtn.style.cursor = "pointer";
          cancelBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.exitEditMode();
          });
          const saveBtn = buttonRow.createEl("button");
          saveBtn.textContent = t("save", this.lang);
          saveBtn.style.padding = "6px 16px";
          saveBtn.style.borderRadius = "6px";
          saveBtn.style.backgroundColor = "var(--interactive-accent)";
          saveBtn.style.color = "var(--text-on-accent)";
          saveBtn.style.border = "none";
          saveBtn.style.cursor = "pointer";
          saveBtn.style.fontWeight = "500";
          saveBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const body = textarea.value.trim();
            if (!body) {
              new import_obsidian3.Notice(t("contentRequired", this.lang));
              return;
            }
            const tags = normalizeJotTags(this.editSessionTags);
            const source = sourceInput.value.trim();
            const prevId = this.editingJotId;
            const prevTags = [...this.editSessionTags];
            this.editingJotId = null;
            this.editSessionTags = [];
            try {
              await this.plugin.updateJot({
                ...jot,
                content: body,
                tags,
                source
              });
              new import_obsidian3.Notice(t("saved", this.lang));
            } catch (e2) {
              this.editingJotId = prevId;
              this.editSessionTags = prevTags;
              const listSection = this.contentEl.querySelector(".jots-list-section");
              if (listSection) {
                this.renderJotList(listSection);
              }
            }
          });
          setTimeout(() => textarea.focus(), 0);
          return;
        }
        card.style.cursor = "pointer";
        this.attachCardTapAndLongPress(card, jot);
        card.addEventListener("mouseenter", () => {
          card.style.borderColor = "var(--interactive-accent)";
          card.style.transform = "translateY(-1px)";
        });
        card.addEventListener("mouseleave", () => {
          card.style.borderColor = "var(--background-modifier-border)";
          card.style.transform = "translateY(0)";
        });
        const metaRow = card.createDiv();
        metaRow.style.display = "flex";
        metaRow.style.flexWrap = "wrap";
        metaRow.style.alignItems = "baseline";
        metaRow.style.gap = "12px";
        metaRow.style.marginBottom = "6px";
        metaRow.style.fontSize = "10px";
        metaRow.style.color = "var(--text-muted)";
        metaRow.createSpan({ text: jot.time });
        const updLabel = metaRow.createSpan();
        updLabel.textContent = `${t("jotUpdatedAt", this.lang)}: ${jot.updatedAt}`;
        updLabel.style.color = "var(--text-normal)";
        updLabel.style.fontWeight = "600";
        const contentContainer = card.createDiv();
        contentContainer.style.fontSize = "12px";
        contentContainer.style.lineHeight = "1.5";
        contentContainer.style.marginBottom = "6px";
        contentContainer.style.whiteSpace = "normal";
        contentContainer.style.wordBreak = "break-word";
        contentContainer.style.overflowWrap = "break-word";
        contentContainer.addClass("jots-card-content");
        const component = new import_obsidian3.Component();
        this.renderedComponents.push(component);
        const sourcePath = jot.filePath || "";
        const wireRenderedContent = () => {
          contentContainer.querySelectorAll("a.internal-link").forEach((link) => {
            const href = link.getAttribute("href");
            if (href) {
              link.addEventListener("mouseenter", (e) => {
                const file = this.app.metadataCache.getFirstLinkpathDest(href, sourcePath);
                if (file) {
                  this.app.workspace.trigger("hover-link", {
                    event: e,
                    source: this.getViewType(),
                    hoverParent: this,
                    targetEl: link,
                    linktext: href,
                    sourcePath
                  });
                }
              });
              link.addEventListener("pointerdown", (e) => {
                e.stopPropagation();
              });
              link.addEventListener("pointerup", (e) => {
                e.stopPropagation();
              });
              link.addEventListener("click", (e) => {
                e.stopPropagation();
                this.app.workspace.openLinkText(href, sourcePath, false);
              });
            }
          });
          contentContainer.querySelectorAll(".internal-embed").forEach((embed) => {
            const src = embed.getAttribute("src");
            if (src) {
              embed.addEventListener("mouseenter", (e) => {
                this.app.workspace.trigger("hover-link", {
                  event: e,
                  source: this.getViewType(),
                  hoverParent: this,
                  targetEl: embed,
                  linktext: src,
                  sourcePath
                });
              });
              embed.addEventListener("pointerdown", (e) => {
                e.stopPropagation();
              });
              embed.addEventListener("pointerup", (e) => {
                e.stopPropagation();
              });
              embed.addEventListener("click", (e) => {
                e.stopPropagation();
                this.app.workspace.openLinkText(src, sourcePath, false);
              });
            }
          });
          contentContainer.querySelectorAll("input.task-list-item-checkbox").forEach((checkbox) => {
            checkbox.addEventListener("pointerdown", (e) => {
              e.stopPropagation();
            });
            checkbox.addEventListener("pointerup", (e) => {
              e.stopPropagation();
            });
            checkbox.addEventListener("click", (e) => {
              e.stopPropagation();
            });
          });
          if (searchKeywords.length > 0) {
            highlightMarkdownContent(contentContainer, searchKeywords);
          }
        };
        void Promise.resolve(import_obsidian3.MarkdownRenderer.renderMarkdown(
          jot.content,
          contentContainer,
          sourcePath,
          component
        )).then(wireRenderedContent);
        const tagsDiv = card.createDiv();
        tagsDiv.style.display = "flex";
        tagsDiv.style.flexWrap = "wrap";
        tagsDiv.style.gap = "4px";
        tagsDiv.style.marginBottom = "4px";
        jot.tags.forEach((tag) => {
          const tagSpan = tagsDiv.createSpan();
          tagSpan.textContent = `#${tag}`;
          tagSpan.style.fontSize = "9px";
          tagSpan.style.padding = "2px 8px";
          tagSpan.style.borderRadius = "12px";
          tagSpan.style.backgroundColor = "var(--background-primary)";
          tagSpan.style.border = "1px solid var(--background-modifier-border)";
          tagSpan.style.color = "var(--text-muted)";
          tagSpan.style.cursor = "pointer";
          tagSpan.style.display = "inline-flex";
          tagSpan.style.alignItems = "center";
          tagSpan.style.whiteSpace = "nowrap";
          tagSpan.addEventListener("pointerdown", (e) => {
            e.stopPropagation();
          });
          tagSpan.addEventListener("pointerup", (e) => {
            e.stopPropagation();
          });
          tagSpan.addEventListener("click", (e) => {
            e.stopPropagation();
            this.filterByTag(tag);
          });
        });
        if (jot.source && jot.source.trim()) {
          const sourceDiv = card.createDiv();
          sourceDiv.textContent = jot.source;
          sourceDiv.style.fontSize = "10px";
          sourceDiv.style.color = "var(--text-muted)";
          sourceDiv.style.fontStyle = "italic";
          sourceDiv.style.marginTop = "4px";
        }
        if (jot.attachments && jot.attachments.length > 0) {
          jot.attachments.forEach((attachment, idx) => {
            var _a;
            const attachmentDiv = card.createDiv();
            const icon = ((_a = jot.attachmentTypes) == null ? void 0 : _a[idx]) === "image" ? "\u{1F5BC}\uFE0F" : "\u{1F4CE}";
            attachmentDiv.textContent = `${icon} ${attachment}`;
            attachmentDiv.style.fontSize = "10px";
            attachmentDiv.style.color = "var(--text-muted)";
            attachmentDiv.style.marginTop = idx === 0 ? "4px" : "2px";
          });
        }
      });
    }
  }
  filterJots() {
    let filtered = [...this.jots];
    const { date, updated, keywords } = this.parseSearchFilters(this.searchQuery);
    if (date) {
      filtered = filtered.filter((jot) => jot.date === date);
    }
    if (updated) {
      filtered = filtered.filter((jot) => jot.updatedAt.startsWith(updated));
    }
    if (keywords.length > 0) {
      filtered = filtered.filter((jot) => {
        const contentLower = jot.content.toLowerCase();
        return keywords.every((kw) => contentLower.includes(kw));
      });
    }
    if (this.selectedTags.size > 0) {
      filtered = filtered.filter((jot) => jot.tags.some((tag) => this.selectedTags.has(tag)));
    }
    return filtered;
  }
  filterByTag(tag) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.clear();
      this.selectedTags.add(tag);
    }
    this.render();
  }
  async openJot(jot) {
    const folder = (0, import_obsidian3.normalizePath)(this.plugin.settings.saveFolder);
    let filePath;
    if (jot.filePath) {
      filePath = (0, import_obsidian3.normalizePath)(jot.filePath);
    } else if (this.plugin.settings.logMode === "multi") {
      const dateStr = jot.date;
      let filename = this.plugin.settings.multiFileFormat.replace("YYYYMMDD", dateStr.replace(/-/g, ""));
      if (!filename.endsWith(".md")) {
        filename += ".md";
      }
      filePath = `${folder}/${filename}`;
    } else {
      filePath = `${folder}/jots.md`;
    }
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (file && file instanceof import_obsidian3.TFile) {
      let targetLeaf = null;
      const leaves = this.app.workspace.getLeavesOfType("markdown");
      for (const leaf2 of leaves) {
        if (leaf2.view instanceof import_obsidian3.MarkdownView) {
          const activeFile = leaf2.view.file;
          if (activeFile && activeFile.path === file.path) {
            targetLeaf = leaf2;
            break;
          }
        }
      }
      let leaf;
      if (targetLeaf) {
        leaf = targetLeaf;
        this.app.workspace.revealLeaf(leaf);
      } else {
        leaf = this.app.workspace.getLeaf("tab");
        await leaf.openFile(file);
      }
      if (leaf.view instanceof import_obsidian3.MarkdownView) {
        const editor = leaf.view.editor;
        const content = await this.app.vault.read(file);
        const lines = content.split("\n");
        let foundLine = -1;
        let idx = 0;
        while (idx < lines.length) {
          const lineTrim = lines[idx].trim();
          if (lineTrim.startsWith("### ")) {
            const blockStart = idx;
            const headerRest = lineTrim.substring(4).trim();
            const [datePart, timePart] = headerRest.split(" ");
            let metaId = "";
            let j = idx + 1;
            while (j < lines.length) {
              const tl = lines[j].trim();
              const idMatch = tl.match(/^####\s+id:\s*(.+)$/i);
              if (idMatch) {
                metaId = idMatch[1].trim();
                j++;
                continue;
              }
              if (/^####\s+updatedAt:\s*.+$/i.test(tl)) {
                j++;
                continue;
              }
              break;
            }
            const resolvedId = metaId || stableLegacyJotId(file.path, datePart || "", timePart || "");
            if (resolvedId === jot.id) {
              foundLine = blockStart;
              break;
            }
            let k = j;
            while (k < lines.length && !lines[k].trim().startsWith("### ")) {
              k++;
            }
            idx = k;
          } else {
            idx++;
          }
        }
        if (foundLine === -1) {
          const targetHeader = "### " + jot.date + " " + jot.time;
          for (let line = 0; line < lines.length; line++) {
            if (lines[line].trim() === targetHeader) {
              foundLine = line;
              break;
            }
          }
        }
        if (foundLine !== -1) {
          editor.setCursor({ line: foundLine, ch: 0 });
          editor.scrollIntoView({
            from: { line: foundLine, ch: 0 },
            to: { line: foundLine + 1, ch: 0 }
          }, true);
        }
      }
    }
  }
};

// src/types.ts
var DEFAULT_SETTINGS = {
  saveFolder: "Jots",
  logMode: "multi",
  useFixedTag: false,
  fixedTag: "jot",
  enableTagsInFrontmatter: true,
  multiFileFormat: "jot-YYYYMMDD",
  attachmentsFolder: "Jots/attachments",
  language: "zh",
  autoOpenView: true
};

// src/settings.ts
var import_obsidian4 = require("obsidian");
init_i18n();
var JotSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.logModeSetting = null;
    this.useFixedTagSetting = null;
    this.multiFileFormatSetting = null;
    this.fixedTagSetting = null;
    this.enableTagsInFrontmatterSetting = null;
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    this.logModeSetting = null;
    this.useFixedTagSetting = null;
    this.multiFileFormatSetting = null;
    this.fixedTagSetting = null;
    this.enableTagsInFrontmatterSetting = null;
    new import_obsidian4.Setting(containerEl).setName(t("language", this.plugin.lang)).setDesc(t("languageDesc", this.plugin.lang)).addDropdown((dropdown) => dropdown.addOption("zh", t("languageZh", this.plugin.lang)).addOption("en", t("languageEn", this.plugin.lang)).setValue(this.plugin.settings.language).onChange(async (value) => {
      this.plugin.settings.language = value;
      await this.plugin.saveSettings();
      this.display();
    }));
    new import_obsidian4.Setting(containerEl).setName(t("autoOpenView", this.plugin.lang)).setDesc(t("autoOpenViewDesc", this.plugin.lang)).addToggle((toggle) => toggle.setValue(this.plugin.settings.autoOpenView).onChange(async (value) => {
      this.plugin.settings.autoOpenView = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian4.Setting(containerEl).setName(t("saveFolder", this.plugin.lang)).setDesc(t("saveFolderDesc", this.plugin.lang)).addText((text) => text.setPlaceholder("Jots").setValue(this.plugin.settings.saveFolder).onChange(async (value) => {
      this.plugin.settings.saveFolder = value.trim() || "Jots";
      await this.plugin.saveSettings();
    }));
    new import_obsidian4.Setting(containerEl).setName(t("attachmentsFolder", this.plugin.lang)).setDesc(t("attachmentsFolderDesc", this.plugin.lang)).addText((text) => text.setPlaceholder("Jots/attachments").setValue(this.plugin.settings.attachmentsFolder).onChange(async (value) => {
      this.plugin.settings.attachmentsFolder = value.trim() || "Jots/attachments";
      await this.plugin.saveSettings();
    }));
    this.logModeSetting = new import_obsidian4.Setting(containerEl).setName(t("logMode", this.plugin.lang)).setDesc(t("logModeDesc", this.plugin.lang)).addDropdown((dropdown) => dropdown.addOption("multi", t("logModeMulti", this.plugin.lang)).addOption("single", t("logModeSingle", this.plugin.lang)).setValue(this.plugin.settings.logMode).onChange(async (value) => {
      this.plugin.settings.logMode = value;
      await this.plugin.saveSettings();
      this.updateConditionalSettings();
    }));
    this.multiFileFormatSetting = new import_obsidian4.Setting(containerEl).setName(t("fileFormat", this.plugin.lang)).setDesc(t("fileFormatDesc", this.plugin.lang)).addText((text) => text.setPlaceholder("jot-YYYYMMDD").setValue(this.plugin.settings.multiFileFormat).onChange(async (value) => {
      this.plugin.settings.multiFileFormat = value.trim() || "jot-YYYYMMDD";
      await this.plugin.saveSettings();
    }));
    this.multiFileFormatSetting.settingEl.style.display = this.plugin.settings.logMode === "multi" ? "" : "none";
    this.useFixedTagSetting = new import_obsidian4.Setting(containerEl).setName(t("useFixedTag", this.plugin.lang)).setDesc(t("useFixedTagDesc", this.plugin.lang)).addToggle((toggle) => toggle.setValue(this.plugin.settings.useFixedTag).onChange(async (value) => {
      this.plugin.settings.useFixedTag = value;
      await this.plugin.saveSettings();
      this.updateConditionalSettings();
    }));
    this.fixedTagSetting = new import_obsidian4.Setting(containerEl).setName(t("fixedTag", this.plugin.lang)).setDesc(t("fixedTagDesc", this.plugin.lang)).addText((text) => text.setPlaceholder("jot").setValue(this.plugin.settings.fixedTag).onChange(async (value) => {
      this.plugin.settings.fixedTag = value.trim() || "jot";
      await this.plugin.saveSettings();
    }));
    this.fixedTagSetting.settingEl.style.display = this.plugin.settings.useFixedTag ? "" : "none";
    this.enableTagsInFrontmatterSetting = new import_obsidian4.Setting(containerEl).setName(t("enableTagsInFrontmatter", this.plugin.lang)).setDesc(t("enableTagsInFrontmatterDesc", this.plugin.lang)).addToggle((toggle) => toggle.setValue(this.plugin.settings.enableTagsInFrontmatter).onChange(async (value) => {
      this.plugin.settings.enableTagsInFrontmatter = value;
      await this.plugin.saveSettings();
    }));
    this.enableTagsInFrontmatterSetting.settingEl.style.display = this.plugin.settings.logMode === "multi" ? "" : "none";
    const infoEl = containerEl.createDiv();
    infoEl.style.marginTop = "20px";
    infoEl.style.padding = "12px";
    infoEl.style.backgroundColor = "var(--background-primary-alt)";
    infoEl.style.borderRadius = "8px";
    infoEl.style.fontSize = "12px";
    infoEl.style.color = "var(--text-muted)";
    if (this.plugin.settings.logMode === "multi") {
      infoEl.innerHTML = `
                <strong>${t("multiModeInfo", this.plugin.lang)}</strong><br>
                \u2022 ${t("fileFormat", this.plugin.lang)}\uFF1A${this.plugin.settings.multiFileFormat}.md<br>
                \u2022 ${t("attachmentsFolder", this.plugin.lang)}\uFF1A${this.plugin.settings.attachmentsFolder}<br>
                \u2022 ${t("attachmentsNaming", this.plugin.lang)}<br>
                \u2022 ${t("recordFormat", this.plugin.lang)}<br>
                &nbsp;&nbsp;### YYYY-MM-DD HH:mm:ss<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;${t("contentPlaceholder", this.plugin.lang)}<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;#tag1 #tag2 #tag3<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;\u6765\u6E90: xxx<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;![[${t("attachmentPlaceholder", this.plugin.lang)}]] \u6216 [[${t("attachmentPlaceholder", this.plugin.lang)}]]<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;---<br>
                ${t("newRecordAtTop", this.plugin.lang)}<br>
                ${t("imageEmbed", this.plugin.lang)}<br>
                ${t("fileLink", this.plugin.lang)}
            `;
    } else {
      infoEl.innerHTML = `
                <strong>${t("singleModeInfo", this.plugin.lang)}</strong><br>
                \u2022 ${t("fileFormat", this.plugin.lang)}\uFF1Ajots.md<br>
                \u2022 ${t("attachmentsFolder", this.plugin.lang)}\uFF1A${this.plugin.settings.attachmentsFolder}<br>
                \u2022 ${t("attachmentsNaming", this.plugin.lang)}<br>
                \u2022 ${t("recordFormat", this.plugin.lang)}<br>
                &nbsp;&nbsp;### YYYY-MM-DD HH:mm:ss<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;${t("contentPlaceholder", this.plugin.lang)}<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;#tag1 #tag2 #tag3<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;\u6765\u6E90: xxx<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;![[${t("attachmentPlaceholder", this.plugin.lang)}]] \u6216 [[${t("attachmentPlaceholder", this.plugin.lang)}]]<br>
                &nbsp;&nbsp;<br>
                &nbsp;&nbsp;---<br>
                ${t("newRecordAtTop", this.plugin.lang)}<br>
                ${t("imageEmbed", this.plugin.lang)}<br>
                ${t("fileLink", this.plugin.lang)}
            `;
    }
  }
  updateConditionalSettings() {
    if (this.multiFileFormatSetting) {
      this.multiFileFormatSetting.settingEl.style.display = this.plugin.settings.logMode === "multi" ? "" : "none";
    }
    if (this.fixedTagSetting) {
      this.fixedTagSetting.settingEl.style.display = this.plugin.settings.useFixedTag ? "" : "none";
    }
    if (this.enableTagsInFrontmatterSetting) {
      this.enableTagsInFrontmatterSetting.settingEl.style.display = this.plugin.settings.logMode === "multi" ? "" : "none";
    }
  }
};

// src/main.ts
init_capture_modal();
init_i18n();
init_utils();
var JotPlugin = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    this.isLoaded = false;
    this.jots = [];
  }
  get lang() {
    var _a;
    return ((_a = this.settings) == null ? void 0 : _a.language) || "zh";
  }
  async onload() {
    await this.loadSettings();
    console.log(t("loadingPlugin", this.lang));
    (0, import_obsidian5.addIcon)("jot-bolt", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/><path d="M17 3h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/></svg>`);
    await this.ensureAttachmentsFolder();
    this.registerView(VIEW_TYPE_JOTS, (leaf) => {
      return new JotView(leaf, this);
    });
    this.addRibbonIcon("jot-bolt", t("pluginName", this.lang), () => {
      this.activateView();
    });
    this.addCommand({
      id: "open-jot-view",
      name: `jot${this.lang === "zh" ? "\uFF1A" : ": "}${t("openJotView", this.lang)}`,
      callback: () => {
        this.activateView();
      }
    });
    this.addCommand({
      id: "quick-capture",
      name: `jot${this.lang === "zh" ? "\uFF1A" : ": "}${t("quickCapture", this.lang)}`,
      callback: () => {
        new CaptureModal(this.app, this).open();
      }
    });
    this.addSettingTab(new JotSettingTab(this.app, this));
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        const selection = editor.getSelection();
        if (!selection)
          return;
        menu.addItem((item) => {
          item.setTitle(t("saveAsJot", this.lang)).setIcon("jot-bolt").onClick(async () => {
            await this.saveJot(selection, [], "", void 0);
            new import_obsidian5.Notice(t("savedAsJot", this.lang));
          });
        });
      })
    );
    this.isLoaded = true;
    this.app.workspace.onLayoutReady(async () => {
      if (this.settings.autoOpenView) {
        await this.activateView();
      }
      await this.loadJotsData();
    });
  }
  async onunload() {
    this.isLoaded = false;
    try {
      this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach((leaf) => {
        leaf.detach();
      });
    } catch (e) {
      console.error("Cleanup view error:", e);
    }
  }
  async ensureAttachmentsFolder() {
    const folder = (0, import_obsidian5.normalizePath)(this.settings.attachmentsFolder);
    const existing = this.app.vault.getAbstractFileByPath(folder);
    if (!existing || !(existing instanceof import_obsidian5.TFolder)) {
      try {
        await this.app.vault.createFolder(folder);
      } catch (error) {
      }
    }
  }
  async activateView() {
    if (!this.isLoaded)
      return;
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS)[0];
    if (!leaf) {
      leaf = this.app.workspace.getLeaf("tab");
      await leaf.setViewState({
        type: VIEW_TYPE_JOTS,
        active: true,
        state: {}
      });
    }
    this.app.workspace.revealLeaf(leaf);
    await this.loadJotsData();
  }
  async refreshJots() {
    await this.loadJotsData();
    console.log("\u5237\u65B0 jots \u6570\u636E\u5B8C\u6210\uFF0C\u5171", this.jots.length, "\u6761\u8BB0\u5F55");
  }
  async loadJotsData() {
    const folder = (0, import_obsidian5.normalizePath)(this.settings.saveFolder);
    const folderObj = this.app.vault.getAbstractFileByPath(folder);
    if (!folderObj || !(folderObj instanceof import_obsidian5.TFolder)) {
      this.jots = [];
      return;
    }
    const files = folderObj.children.filter((f) => f instanceof import_obsidian5.TFile && f.name.endsWith(".md"));
    const allJots = [];
    for (const file of files) {
      const content = await this.app.vault.read(file);
      const entries = parseFileContent(content, file.path, this.lang);
      allJots.push(...entries);
    }
    allJots.sort((a, b) => {
      const dateA = (0, import_moment3.default)(a.date + " " + a.time, "YYYY-MM-DD HH:mm:ss");
      const dateB = (0, import_moment3.default)(b.date + " " + b.time, "YYYY-MM-DD HH:mm:ss");
      return dateB.valueOf() - dateA.valueOf();
    });
    this.jots = allJots;
  }
  async saveJot(content, tags, source, attachments) {
    const now = /* @__PURE__ */ new Date();
    const dateStr = (0, import_moment3.default)(now).format("YYYY-MM-DD");
    const fullDateTime = (0, import_moment3.default)(now).format("YYYY-MM-DD HH:mm:ss");
    const id = newJotId();
    const { body, allTags } = composeJotMarkdownBody(
      content,
      tags,
      source,
      attachments,
      this.lang,
      this.settings.useFixedTag,
      this.settings.fixedTag
    );
    const newEntry = formatJotEntryBlock(fullDateTime, id, fullDateTime, body);
    if (this.settings.logMode === "multi") {
      await this.saveToMultiFile(dateStr, newEntry, allTags);
    } else {
      await this.saveToSingleFile(newEntry);
    }
    this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach((leaf) => {
      if (leaf.view instanceof JotView)
        leaf.view.refresh();
    });
    await this.loadJotsData();
    new import_obsidian5.Notice(t("saved", this.lang));
  }
  /**
   * Replace one jot in its source file by `id`. Keeps `###` created time; sets `updatedAt` to now.
   */
  async updateJot(updated) {
    var _a, _b;
    if (!updated.filePath) {
      const msg = t("jotUpdateNoFile", this.lang);
      new import_obsidian5.Notice(msg);
      throw new Error(msg);
    }
    const pathNorm = (0, import_obsidian5.normalizePath)(updated.filePath);
    const file = this.app.vault.getAbstractFileByPath(pathNorm);
    if (!(file instanceof import_obsidian5.TFile)) {
      const msg = t("jotUpdateFileMissing", this.lang);
      new import_obsidian5.Notice(msg);
      throw new Error(msg);
    }
    const attachmentsPayload = (_b = (_a = updated.attachments) == null ? void 0 : _a.map((p, i) => {
      var _a2, _b2;
      return {
        path: p,
        type: (_b2 = (_a2 = updated.attachmentTypes) == null ? void 0 : _a2[i]) != null ? _b2 : "file"
      };
    })) != null ? _b : void 0;
    const { body } = composeJotMarkdownBody(
      updated.content,
      updated.tags,
      updated.source,
      attachmentsPayload,
      this.lang,
      this.settings.useFixedTag,
      this.settings.fixedTag
    );
    const fullDateTime = `${updated.date} ${updated.time}`.trim();
    const updatedAtNow = (0, import_moment3.default)().format("YYYY-MM-DD HH:mm:ss");
    const newBlock = formatJotEntryBlock(fullDateTime, updated.id, updatedAtNow, body);
    let found = false;
    await this.app.vault.process(file, (text) => {
      const result = replaceJotBlockById(text, file.path, updated.id, newBlock);
      found = result.found;
      return result.content;
    });
    if (!found) {
      const msg = t("jotUpdateNotFound", this.lang);
      new import_obsidian5.Notice(msg);
      throw new Error(msg);
    }
    this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach((leaf) => {
      if (leaf.view instanceof JotView)
        leaf.view.refresh();
    });
    await this.loadJotsData();
  }
  async saveToMultiFile(dateStr, newEntry, tags) {
    const folder = (0, import_obsidian5.normalizePath)(this.settings.saveFolder);
    let filename = this.settings.multiFileFormat.replace("YYYYMMDD", dateStr.replace(/-/g, ""));
    if (!filename.endsWith(".md"))
      filename += ".md";
    const filePath = `${folder}/${filename}`;
    if (!this.app.vault.getAbstractFileByPath(folder)) {
      await this.app.vault.createFolder(folder);
    }
    const existingFile = this.app.vault.getAbstractFileByPath(filePath);
    if (existingFile && existingFile instanceof import_obsidian5.TFile) {
      await this.app.vault.process(existingFile, (data) => {
        let fileContent = data || "";
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
        const frontmatterMatch = fileContent.match(frontmatterRegex);
        if (frontmatterMatch) {
          const frontmatterEnd = frontmatterMatch[0].length;
          const beforeFrontmatter = fileContent.substring(0, frontmatterEnd);
          const afterFrontmatter = fileContent.substring(frontmatterEnd);
          return beforeFrontmatter + newEntry + afterFrontmatter;
        } else {
          return newEntry + fileContent;
        }
      });
    } else {
      let frontmatter = "";
      if (this.settings.enableTagsInFrontmatter && tags.length > 0) {
        frontmatter = "---\n";
        frontmatter += `tags:
${tags.map((tg) => `  - ${tg}`).join("\n")}
`;
        frontmatter += "---\n\n";
      }
      const fileContent = frontmatter + newEntry;
      await this.app.vault.create(filePath, fileContent);
    }
  }
  async saveToSingleFile(newEntry) {
    const folder = (0, import_obsidian5.normalizePath)(this.settings.saveFolder);
    const filePath = `${folder}/jots.md`;
    if (!this.app.vault.getAbstractFileByPath(folder))
      await this.app.vault.createFolder(folder);
    const existingFile = this.app.vault.getAbstractFileByPath(filePath);
    if (existingFile && existingFile instanceof import_obsidian5.TFile) {
      await this.app.vault.process(existingFile, (data) => {
        let fileContent = data || "";
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
        const frontmatterMatch = fileContent.match(frontmatterRegex);
        if (frontmatterMatch) {
          const frontmatterEnd = frontmatterMatch[0].length;
          const beforeFrontmatter = fileContent.substring(0, frontmatterEnd);
          const afterFrontmatter = fileContent.substring(frontmatterEnd);
          return beforeFrontmatter + newEntry + afterFrontmatter;
        } else {
          return newEntry + fileContent;
        }
      });
    } else {
      await this.app.vault.create(filePath, newEntry);
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
    await this.ensureAttachmentsFolder();
    this.app.workspace.getLeavesOfType(VIEW_TYPE_JOTS).forEach((leaf) => {
      if (leaf.view instanceof JotView)
        leaf.view.refresh();
    });
    await this.loadJotsData();
    this.updateCommandNames();
  }
  updateCommandNames() {
    const commands = [
      { id: "open-jot-view", key: "openJotView" },
      { id: "quick-capture", key: "quickCapture" }
    ];
    const separator = this.lang === "zh" ? "\uFF1A" : ": ";
    commands.forEach(({ id, key }) => {
      const command = this.app.commands.findCommand(`${this.manifest.id}:${id}`);
      if (command) {
        command.name = `jot${separator}${t(key, this.lang)}`;
      }
    });
  }
};
/*! Bundled license information:

moment/moment.js:
  (*! moment.js *)
  (*! version : 2.29.4 *)
  (*! authors : Tim Wood, Iskren Chernev, Moment.js contributors *)
  (*! license : MIT *)
  (*! momentjs.com *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL21vbWVudC9tb21lbnQuanMiLCAic3JjL2kxOG4udHMiLCAic3JjL3V0aWxzLnRzIiwgInNyYy9jYXB0dXJlLW1vZGFsLnRzIiwgInNyYy9tYWluLnRzIiwgInNyYy92aWV3LnRzIiwgInNyYy90eXBlcy50cyIsICJzcmMvc2V0dGluZ3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vISBtb21lbnQuanNcbi8vISB2ZXJzaW9uIDogMi4yOS40XG4vLyEgYXV0aG9ycyA6IFRpbSBXb29kLCBJc2tyZW4gQ2hlcm5ldiwgTW9tZW50LmpzIGNvbnRyaWJ1dG9yc1xuLy8hIGxpY2Vuc2UgOiBNSVRcbi8vISBtb21lbnRqcy5jb21cblxuOyhmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgZ2xvYmFsLm1vbWVudCA9IGZhY3RvcnkoKVxufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgaG9va0NhbGxiYWNrO1xuXG4gICAgZnVuY3Rpb24gaG9va3MoKSB7XG4gICAgICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxuICAgIC8vIHdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgIGZ1bmN0aW9uIHNldEhvb2tDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpbnB1dCBpbnN0YW5jZW9mIEFycmF5IHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICAgICAgLy8gSUU4IHdpbGwgdHJlYXQgdW5kZWZpbmVkIGFuZCBudWxsIGFzIG9iamVjdCBpZiBpdCB3YXNuJ3QgZm9yXG4gICAgICAgIC8vIGlucHV0ICE9IG51bGxcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGlucHV0ICE9IG51bGwgJiZcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzT3duUHJvcChhLCBiKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPYmplY3RFbXB0eShvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggPT09IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaztcbiAgICAgICAgICAgIGZvciAoayBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duUHJvcChvYmosIGspKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PT0gdm9pZCAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyKGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBOdW1iZXJdJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgICAgICB2YXIgcmVzID0gW10sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgYXJyTGVuID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyckxlbjsgKytpKSB7XG4gICAgICAgICAgICByZXMucHVzaChmbihhcnJbaV0sIGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoYiwgaSkpIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gYltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd0b1N0cmluZycpKSB7XG4gICAgICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd2YWx1ZU9mJykpIHtcbiAgICAgICAgICAgIGEudmFsdWVPZiA9IGIudmFsdWVPZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgdHJ1ZSkudXRjKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW1wdHk6IGZhbHNlLFxuICAgICAgICAgICAgdW51c2VkVG9rZW5zOiBbXSxcbiAgICAgICAgICAgIHVudXNlZElucHV0OiBbXSxcbiAgICAgICAgICAgIG92ZXJmbG93OiAtMixcbiAgICAgICAgICAgIGNoYXJzTGVmdE92ZXI6IDAsXG4gICAgICAgICAgICBudWxsSW5wdXQ6IGZhbHNlLFxuICAgICAgICAgICAgaW52YWxpZEVyYTogbnVsbCxcbiAgICAgICAgICAgIGludmFsaWRNb250aDogbnVsbCxcbiAgICAgICAgICAgIGludmFsaWRGb3JtYXQ6IGZhbHNlLFxuICAgICAgICAgICAgdXNlckludmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGlzbzogZmFsc2UsXG4gICAgICAgICAgICBwYXJzZWREYXRlUGFydHM6IFtdLFxuICAgICAgICAgICAgZXJhOiBudWxsLFxuICAgICAgICAgICAgbWVyaWRpZW06IG51bGwsXG4gICAgICAgICAgICByZmMyODIyOiBmYWxzZSxcbiAgICAgICAgICAgIHdlZWtkYXlNaXNtYXRjaDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2luZ0ZsYWdzKG0pIHtcbiAgICAgICAgaWYgKG0uX3BmID09IG51bGwpIHtcbiAgICAgICAgICAgIG0uX3BmID0gZGVmYXVsdFBhcnNpbmdGbGFncygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9wZjtcbiAgICB9XG5cbiAgICB2YXIgc29tZTtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLnNvbWUpIHtcbiAgICAgICAgc29tZSA9IEFycmF5LnByb3RvdHlwZS5zb21lO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNvbWUgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgICAgICAgICB2YXIgdCA9IE9iamVjdCh0aGlzKSxcbiAgICAgICAgICAgICAgICBsZW4gPSB0Lmxlbmd0aCA+Pj4gMCxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSBpbiB0ICYmIGZ1bi5jYWxsKHRoaXMsIHRbaV0sIGksIHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQobSkge1xuICAgICAgICBpZiAobS5faXNWYWxpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZmxhZ3MgPSBnZXRQYXJzaW5nRmxhZ3MobSksXG4gICAgICAgICAgICAgICAgcGFyc2VkUGFydHMgPSBzb21lLmNhbGwoZmxhZ3MucGFyc2VkRGF0ZVBhcnRzLCBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSAhPSBudWxsO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGlzTm93VmFsaWQgPVxuICAgICAgICAgICAgICAgICAgICAhaXNOYU4obS5fZC5nZXRUaW1lKCkpICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLm92ZXJmbG93IDwgMCAmJlxuICAgICAgICAgICAgICAgICAgICAhZmxhZ3MuZW1wdHkgJiZcbiAgICAgICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRFcmEgJiZcbiAgICAgICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRNb250aCAmJlxuICAgICAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZFdlZWtkYXkgJiZcbiAgICAgICAgICAgICAgICAgICAgIWZsYWdzLndlZWtkYXlNaXNtYXRjaCAmJlxuICAgICAgICAgICAgICAgICAgICAhZmxhZ3MubnVsbElucHV0ICYmXG4gICAgICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkRm9ybWF0ICYmXG4gICAgICAgICAgICAgICAgICAgICFmbGFncy51c2VySW52YWxpZGF0ZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgKCFmbGFncy5tZXJpZGllbSB8fCAoZmxhZ3MubWVyaWRpZW0gJiYgcGFyc2VkUGFydHMpKTtcblxuICAgICAgICAgICAgaWYgKG0uX3N0cmljdCkge1xuICAgICAgICAgICAgICAgIGlzTm93VmFsaWQgPVxuICAgICAgICAgICAgICAgICAgICBpc05vd1ZhbGlkICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLmNoYXJzTGVmdE92ZXIgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MudW51c2VkVG9rZW5zLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy5iaWdIb3VyID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChPYmplY3QuaXNGcm96ZW4gPT0gbnVsbCB8fCAhT2JqZWN0LmlzRnJvemVuKG0pKSB7XG4gICAgICAgICAgICAgICAgbS5faXNWYWxpZCA9IGlzTm93VmFsaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc05vd1ZhbGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9pc1ZhbGlkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUludmFsaWQoZmxhZ3MpIHtcbiAgICAgICAgdmFyIG0gPSBjcmVhdGVVVEMoTmFOKTtcbiAgICAgICAgaWYgKGZsYWdzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGV4dGVuZChnZXRQYXJzaW5nRmxhZ3MobSksIGZsYWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS51c2VySW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgLy8gUGx1Z2lucyB0aGF0IGFkZCBwcm9wZXJ0aWVzIHNob3VsZCBhbHNvIGFkZCB0aGUga2V5IGhlcmUgKG51bGwgdmFsdWUpLFxuICAgIC8vIHNvIHdlIGNhbiBwcm9wZXJseSBjbG9uZSBvdXJzZWx2ZXMuXG4gICAgdmFyIG1vbWVudFByb3BlcnRpZXMgPSAoaG9va3MubW9tZW50UHJvcGVydGllcyA9IFtdKSxcbiAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gY29weUNvbmZpZyh0bywgZnJvbSkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIHByb3AsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBtb21lbnRQcm9wZXJ0aWVzTGVuID0gbW9tZW50UHJvcGVydGllcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc0FNb21lbnRPYmplY3QpKSB7XG4gICAgICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faSkpIHtcbiAgICAgICAgICAgIHRvLl9pID0gZnJvbS5faTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2YpKSB7XG4gICAgICAgICAgICB0by5fZiA9IGZyb20uX2Y7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sKSkge1xuICAgICAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fc3RyaWN0KSkge1xuICAgICAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3R6bSkpIHtcbiAgICAgICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc1VUQykpIHtcbiAgICAgICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fb2Zmc2V0KSkge1xuICAgICAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3BmKSkge1xuICAgICAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbG9jYWxlKSkge1xuICAgICAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzTGVuID4gMCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG1vbWVudFByb3BlcnRpZXNMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHByb3AgPSBtb21lbnRQcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgIHZhbCA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0bztcbiAgICB9XG5cbiAgICAvLyBNb21lbnQgcHJvdG90eXBlIG9iamVjdFxuICAgIGZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcbiAgICAgICAgY29weUNvbmZpZyh0aGlzLCBjb25maWcpO1xuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoY29uZmlnLl9kICE9IG51bGwgPyBjb25maWcuX2QuZ2V0VGltZSgpIDogTmFOKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKE5hTik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxuICAgICAgICAvLyBvYmplY3RzLlxuICAgICAgICBpZiAodXBkYXRlSW5Qcm9ncmVzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNNb21lbnQob2JqKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBvYmogaW5zdGFuY2VvZiBNb21lbnQgfHwgKG9iaiAhPSBudWxsICYmIG9iai5faXNBTW9tZW50T2JqZWN0ICE9IG51bGwpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Fybihtc2cpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBjb25zb2xlLndhcm5cbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlcHJlY2F0aW9uIHdhcm5pbmc6ICcgKyBtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlKG1zZywgZm4pIHtcbiAgICAgICAgdmFyIGZpcnN0VGltZSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIGV4dGVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBob29rcy5kZXByZWNhdGlvbkhhbmRsZXIobnVsbCwgbXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBhcmcsXG4gICAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgYXJnTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJnTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzW2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJnICs9ICdcXG5bJyArIGkgKyAnXSAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gYXJndW1lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc093blByb3AoYXJndW1lbnRzWzBdLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZyArPSBrZXkgKyAnOiAnICsgYXJndW1lbnRzWzBdW2tleV0gKyAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZy5zbGljZSgwLCAtMik7IC8vIFJlbW92ZSB0cmFpbGluZyBjb21tYSBhbmQgc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgICAgICAgbXNnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXG5Bcmd1bWVudHM6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncykuam9pbignJykgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2tcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGZuKTtcbiAgICB9XG5cbiAgICB2YXIgZGVwcmVjYXRpb25zID0ge307XG5cbiAgICBmdW5jdGlvbiBkZXByZWNhdGVTaW1wbGUobmFtZSwgbXNnKSB7XG4gICAgICAgIGlmIChob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG5hbWUsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZXByZWNhdGlvbnNbbmFtZV0pIHtcbiAgICAgICAgICAgIHdhcm4obXNnKTtcbiAgICAgICAgICAgIGRlcHJlY2F0aW9uc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPSBmYWxzZTtcbiAgICBob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKHR5cGVvZiBGdW5jdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgaW5wdXQgaW5zdGFuY2VvZiBGdW5jdGlvbikgfHxcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXQoY29uZmlnKSB7XG4gICAgICAgIHZhciBwcm9wLCBpO1xuICAgICAgICBmb3IgKGkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChjb25maWcsIGkpKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2ldID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzWydfJyArIGldID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgICAgICAvLyBMZW5pZW50IG9yZGluYWwgcGFyc2luZyBhY2NlcHRzIGp1c3QgYSBudW1iZXIgaW4gYWRkaXRpb24gdG9cbiAgICAgICAgLy8gbnVtYmVyICsgKHBvc3NpYmx5KSBzdHVmZiBjb21pbmcgZnJvbSBfZGF5T2ZNb250aE9yZGluYWxQYXJzZS5cbiAgICAgICAgLy8gVE9ETzogUmVtb3ZlIFwib3JkaW5hbFBhcnNlXCIgZmFsbGJhY2sgaW4gbmV4dCBtYWpvciByZWxlYXNlLlxuICAgICAgICB0aGlzLl9kYXlPZk1vbnRoT3JkaW5hbFBhcnNlTGVuaWVudCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAodGhpcy5fZGF5T2ZNb250aE9yZGluYWxQYXJzZS5zb3VyY2UgfHwgdGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSkgK1xuICAgICAgICAgICAgICAgICd8JyArXG4gICAgICAgICAgICAgICAgL1xcZHsxLDJ9Ly5zb3VyY2VcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjaGlsZENvbmZpZykge1xuICAgICAgICB2YXIgcmVzID0gZXh0ZW5kKHt9LCBwYXJlbnRDb25maWcpLFxuICAgICAgICAgICAgcHJvcDtcbiAgICAgICAgZm9yIChwcm9wIGluIGNoaWxkQ29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChjaGlsZENvbmZpZywgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QocGFyZW50Q29uZmlnW3Byb3BdKSAmJiBpc09iamVjdChjaGlsZENvbmZpZ1twcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzW3Byb3BdID0ge307XG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZChyZXNbcHJvcF0sIHBhcmVudENvbmZpZ1twcm9wXSk7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZChyZXNbcHJvcF0sIGNoaWxkQ29uZmlnW3Byb3BdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkQ29uZmlnW3Byb3BdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzW3Byb3BdID0gY2hpbGRDb25maWdbcHJvcF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlc1twcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChwcm9wIGluIHBhcmVudENvbmZpZykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGhhc093blByb3AocGFyZW50Q29uZmlnLCBwcm9wKSAmJlxuICAgICAgICAgICAgICAgICFoYXNPd25Qcm9wKGNoaWxkQ29uZmlnLCBwcm9wKSAmJlxuICAgICAgICAgICAgICAgIGlzT2JqZWN0KHBhcmVudENvbmZpZ1twcm9wXSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBjaGFuZ2VzIHRvIHByb3BlcnRpZXMgZG9uJ3QgbW9kaWZ5IHBhcmVudCBjb25maWdcbiAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSBleHRlbmQoe30sIHJlc1twcm9wXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBMb2NhbGUoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZXQoY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlzO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKSB7XG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cztcbiAgICB9IGVsc2Uge1xuICAgICAgICBrZXlzID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgcmVzID0gW107XG4gICAgICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc093blByb3Aob2JqLCBpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0Q2FsZW5kYXIgPSB7XG4gICAgICAgIHNhbWVEYXk6ICdbVG9kYXkgYXRdIExUJyxcbiAgICAgICAgbmV4dERheTogJ1tUb21vcnJvdyBhdF0gTFQnLFxuICAgICAgICBuZXh0V2VlazogJ2RkZGQgW2F0XSBMVCcsXG4gICAgICAgIGxhc3REYXk6ICdbWWVzdGVyZGF5IGF0XSBMVCcsXG4gICAgICAgIGxhc3RXZWVrOiAnW0xhc3RdIGRkZGQgW2F0XSBMVCcsXG4gICAgICAgIHNhbWVFbHNlOiAnTCcsXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNhbGVuZGFyKGtleSwgbW9tLCBub3cpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX2NhbGVuZGFyW2tleV0gfHwgdGhpcy5fY2FsZW5kYXJbJ3NhbWVFbHNlJ107XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dCkgPyBvdXRwdXQuY2FsbChtb20sIG5vdykgOiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gemVyb0ZpbGwobnVtYmVyLCB0YXJnZXRMZW5ndGgsIGZvcmNlU2lnbikge1xuICAgICAgICB2YXIgYWJzTnVtYmVyID0gJycgKyBNYXRoLmFicyhudW1iZXIpLFxuICAgICAgICAgICAgemVyb3NUb0ZpbGwgPSB0YXJnZXRMZW5ndGggLSBhYnNOdW1iZXIubGVuZ3RoLFxuICAgICAgICAgICAgc2lnbiA9IG51bWJlciA+PSAwO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKHNpZ24gPyAoZm9yY2VTaWduID8gJysnIDogJycpIDogJy0nKSArXG4gICAgICAgICAgICBNYXRoLnBvdygxMCwgTWF0aC5tYXgoMCwgemVyb3NUb0ZpbGwpKS50b1N0cmluZygpLnN1YnN0cigxKSArXG4gICAgICAgICAgICBhYnNOdW1iZXJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0dGluZ1Rva2VucyA9XG4gICAgICAgICAgICAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oW0hoXW1tKHNzKT98TW98TU0/TT9NP3xEb3xERERvfEREP0Q/RD98ZGRkP2Q/fGRvP3x3W298d10/fFdbb3xXXT98UW8/fE57MSw1fXxZWVlZWVl8WVlZWVl8WVlZWXxZWXx5ezIsNH18eW8/fGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fGtrP3xtbT98c3M/fFN7MSw5fXx4fFh8eno/fFpaP3wuKS9nLFxuICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oTFRTfExUfExMP0w/TD98bHsxLDR9KS9nLFxuICAgICAgICBmb3JtYXRGdW5jdGlvbnMgPSB7fSxcbiAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcblxuICAgIC8vIHRva2VuOiAgICAnTSdcbiAgICAvLyBwYWRkZWQ6ICAgWydNTScsIDJdXG4gICAgLy8gb3JkaW5hbDogICdNbydcbiAgICAvLyBjYWxsYmFjazogZnVuY3Rpb24gKCkgeyB0aGlzLm1vbnRoKCkgKyAxIH1cbiAgICBmdW5jdGlvbiBhZGRGb3JtYXRUb2tlbih0b2tlbiwgcGFkZGVkLCBvcmRpbmFsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZnVuYyA9IGNhbGxiYWNrO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tjYWxsYmFja10oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0gPSBmdW5jO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWRkZWQpIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHplcm9GaWxsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgcGFkZGVkWzFdLCBwYWRkZWRbMl0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkaW5hbCkge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbb3JkaW5hbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm9yZGluYWwoXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgbGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1vbSkge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9ICcnLFxuICAgICAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gaXNGdW5jdGlvbihhcnJheVtpXSlcbiAgICAgICAgICAgICAgICAgICAgPyBhcnJheVtpXS5jYWxsKG1vbSwgZm9ybWF0KVxuICAgICAgICAgICAgICAgICAgICA6IGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBmb3JtYXQgZGF0ZSB1c2luZyBuYXRpdmUgZGF0ZSBvYmplY3RcbiAgICBmdW5jdGlvbiBmb3JtYXRNb21lbnQobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0ID0gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbS5sb2NhbGVEYXRhKCkpO1xuICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSA9XG4gICAgICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSB8fCBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0obSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBpID0gNTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpID49IDAgJiYgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLFxuICAgICAgICAgICAgICAgIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2Vuc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvbmdEYXRlRm9ybWF0ID0ge1xuICAgICAgICBMVFM6ICdoOm1tOnNzIEEnLFxuICAgICAgICBMVDogJ2g6bW0gQScsXG4gICAgICAgIEw6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICAgTEw6ICdNTU1NIEQsIFlZWVknLFxuICAgICAgICBMTEw6ICdNTU1NIEQsIFlZWVkgaDptbSBBJyxcbiAgICAgICAgTExMTDogJ2RkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEEnLFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb25nRGF0ZUZvcm1hdChrZXkpIHtcbiAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0sXG4gICAgICAgICAgICBmb3JtYXRVcHBlciA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoZm9ybWF0IHx8ICFmb3JtYXRVcHBlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0gPSBmb3JtYXRVcHBlclxuICAgICAgICAgICAgLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh0b2spIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRvayA9PT0gJ01NTU0nIHx8XG4gICAgICAgICAgICAgICAgICAgIHRvayA9PT0gJ01NJyB8fFxuICAgICAgICAgICAgICAgICAgICB0b2sgPT09ICdERCcgfHxcbiAgICAgICAgICAgICAgICAgICAgdG9rID09PSAnZGRkZCdcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvay5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvaztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRJbnZhbGlkRGF0ZSA9ICdJbnZhbGlkIGRhdGUnO1xuXG4gICAgZnVuY3Rpb24gaW52YWxpZERhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZhbGlkRGF0ZTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdE9yZGluYWwgPSAnJWQnLFxuICAgICAgICBkZWZhdWx0RGF5T2ZNb250aE9yZGluYWxQYXJzZSA9IC9cXGR7MSwyfS87XG5cbiAgICBmdW5jdGlvbiBvcmRpbmFsKG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkaW5hbC5yZXBsYWNlKCclZCcsIG51bWJlcik7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRSZWxhdGl2ZVRpbWUgPSB7XG4gICAgICAgIGZ1dHVyZTogJ2luICVzJyxcbiAgICAgICAgcGFzdDogJyVzIGFnbycsXG4gICAgICAgIHM6ICdhIGZldyBzZWNvbmRzJyxcbiAgICAgICAgc3M6ICclZCBzZWNvbmRzJyxcbiAgICAgICAgbTogJ2EgbWludXRlJyxcbiAgICAgICAgbW06ICclZCBtaW51dGVzJyxcbiAgICAgICAgaDogJ2FuIGhvdXInLFxuICAgICAgICBoaDogJyVkIGhvdXJzJyxcbiAgICAgICAgZDogJ2EgZGF5JyxcbiAgICAgICAgZGQ6ICclZCBkYXlzJyxcbiAgICAgICAgdzogJ2Egd2VlaycsXG4gICAgICAgIHd3OiAnJWQgd2Vla3MnLFxuICAgICAgICBNOiAnYSBtb250aCcsXG4gICAgICAgIE1NOiAnJWQgbW9udGhzJyxcbiAgICAgICAgeTogJ2EgeWVhcicsXG4gICAgICAgIHl5OiAnJWQgeWVhcnMnLFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZWxhdGl2ZVRpbWUobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbc3RyaW5nXTtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24ob3V0cHV0KVxuICAgICAgICAgICAgPyBvdXRwdXQobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKVxuICAgICAgICAgICAgOiBvdXRwdXQucmVwbGFjZSgvJWQvaSwgbnVtYmVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXN0RnV0dXJlKGRpZmYsIG91dHB1dCkge1xuICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW2RpZmYgPiAwID8gJ2Z1dHVyZScgOiAncGFzdCddO1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihmb3JtYXQpID8gZm9ybWF0KG91dHB1dCkgOiBmb3JtYXQucmVwbGFjZSgvJXMvaSwgb3V0cHV0KTtcbiAgICB9XG5cbiAgICB2YXIgYWxpYXNlcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkVW5pdEFsaWFzKHVuaXQsIHNob3J0aGFuZCkge1xuICAgICAgICB2YXIgbG93ZXJDYXNlID0gdW5pdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBhbGlhc2VzW2xvd2VyQ2FzZV0gPSBhbGlhc2VzW2xvd2VyQ2FzZSArICdzJ10gPSBhbGlhc2VzW3Nob3J0aGFuZF0gPSB1bml0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IGFsaWFzZXNbdW5pdHNdIHx8IGFsaWFzZXNbdW5pdHMudG9Mb3dlckNhc2UoKV1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFVuaXRzKGlucHV0T2JqZWN0KSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wLFxuICAgICAgICAgICAgcHJvcDtcblxuICAgICAgICBmb3IgKHByb3AgaW4gaW5wdXRPYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGlucHV0T2JqZWN0LCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dFtub3JtYWxpemVkUHJvcF0gPSBpbnB1dE9iamVjdFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0O1xuICAgIH1cblxuICAgIHZhciBwcmlvcml0aWVzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRVbml0UHJpb3JpdHkodW5pdCwgcHJpb3JpdHkpIHtcbiAgICAgICAgcHJpb3JpdGllc1t1bml0XSA9IHByaW9yaXR5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByaW9yaXRpemVkVW5pdHModW5pdHNPYmopIHtcbiAgICAgICAgdmFyIHVuaXRzID0gW10sXG4gICAgICAgICAgICB1O1xuICAgICAgICBmb3IgKHUgaW4gdW5pdHNPYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKHVuaXRzT2JqLCB1KSkge1xuICAgICAgICAgICAgICAgIHVuaXRzLnB1c2goeyB1bml0OiB1LCBwcmlvcml0eTogcHJpb3JpdGllc1t1XSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1bml0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdW5pdHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNGbG9vcihudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgICAgIC8vIC0wIC0+IDBcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKSB8fCAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSW50KGFyZ3VtZW50Rm9yQ29lcmNpb24pIHtcbiAgICAgICAgdmFyIGNvZXJjZWROdW1iZXIgPSArYXJndW1lbnRGb3JDb2VyY2lvbixcbiAgICAgICAgICAgIHZhbHVlID0gMDtcblxuICAgICAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBhYnNGbG9vcihjb2VyY2VkTnVtYmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0U2V0KHVuaXQsIGtlZXBUaW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2V0JDEodGhpcywgdW5pdCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCBrZWVwVGltZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXQodGhpcywgdW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0KG1vbSwgdW5pdCkge1xuICAgICAgICByZXR1cm4gbW9tLmlzVmFsaWQoKVxuICAgICAgICAgICAgPyBtb20uX2RbJ2dldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0oKVxuICAgICAgICAgICAgOiBOYU47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0JDEobW9tLCB1bml0LCB2YWx1ZSkge1xuICAgICAgICBpZiAobW9tLmlzVmFsaWQoKSAmJiAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdW5pdCA9PT0gJ0Z1bGxZZWFyJyAmJlxuICAgICAgICAgICAgICAgIGlzTGVhcFllYXIobW9tLnllYXIoKSkgJiZcbiAgICAgICAgICAgICAgICBtb20ubW9udGgoKSA9PT0gMSAmJlxuICAgICAgICAgICAgICAgIG1vbS5kYXRlKCkgPT09IDI5XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0oXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBtb20ubW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgZGF5c0luTW9udGgodmFsdWUsIG1vbS5tb250aCgpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBzdHJpbmdHZXQodW5pdHMpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbdW5pdHNdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5nU2V0KHVuaXRzLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHVuaXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVPYmplY3RVbml0cyh1bml0cyk7XG4gICAgICAgICAgICB2YXIgcHJpb3JpdGl6ZWQgPSBnZXRQcmlvcml0aXplZFVuaXRzKHVuaXRzKSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIHByaW9yaXRpemVkTGVuID0gcHJpb3JpdGl6ZWQubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHByaW9yaXRpemVkTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzW3ByaW9yaXRpemVkW2ldLnVuaXRdKHVuaXRzW3ByaW9yaXRpemVkW2ldLnVuaXRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpc1t1bml0c10pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2gxID0gL1xcZC8sIC8vICAgICAgIDAgLSA5XG4gICAgICAgIG1hdGNoMiA9IC9cXGRcXGQvLCAvLyAgICAgIDAwIC0gOTlcbiAgICAgICAgbWF0Y2gzID0gL1xcZHszfS8sIC8vICAgICAwMDAgLSA5OTlcbiAgICAgICAgbWF0Y2g0ID0gL1xcZHs0fS8sIC8vICAgIDAwMDAgLSA5OTk5XG4gICAgICAgIG1hdGNoNiA9IC9bKy1dP1xcZHs2fS8sIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2gxdG8yID0gL1xcZFxcZD8vLCAvLyAgICAgICAwIC0gOTlcbiAgICAgICAgbWF0Y2gzdG80ID0gL1xcZFxcZFxcZFxcZD8vLCAvLyAgICAgOTk5IC0gOTk5OVxuICAgICAgICBtYXRjaDV0bzYgPSAvXFxkXFxkXFxkXFxkXFxkXFxkPy8sIC8vICAgOTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2gxdG8zID0gL1xcZHsxLDN9LywgLy8gICAgICAgMCAtIDk5OVxuICAgICAgICBtYXRjaDF0bzQgPSAvXFxkezEsNH0vLCAvLyAgICAgICAwIC0gOTk5OVxuICAgICAgICBtYXRjaDF0bzYgPSAvWystXT9cXGR7MSw2fS8sIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2hVbnNpZ25lZCA9IC9cXGQrLywgLy8gICAgICAgMCAtIGluZlxuICAgICAgICBtYXRjaFNpZ25lZCA9IC9bKy1dP1xcZCsvLCAvLyAgICAtaW5mIC0gaW5mXG4gICAgICAgIG1hdGNoT2Zmc2V0ID0gL1p8WystXVxcZFxcZDo/XFxkXFxkL2dpLCAvLyArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcbiAgICAgICAgbWF0Y2hTaG9ydE9mZnNldCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2dpLCAvLyArMDAgLTAwICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuICAgICAgICBtYXRjaFRpbWVzdGFtcCA9IC9bKy1dP1xcZCsoXFwuXFxkezEsM30pPy8sIC8vIDEyMzQ1Njc4OSAxMjM0NTY3ODkuMTIzXG4gICAgICAgIC8vIGFueSB3b3JkIChvciB0d28pIGNoYXJhY3RlcnMgb3IgbnVtYmVycyBpbmNsdWRpbmcgdHdvL3RocmVlIHdvcmQgbW9udGggaW4gYXJhYmljLlxuICAgICAgICAvLyBpbmNsdWRlcyBzY290dGlzaCBnYWVsaWMgdHdvIHdvcmQgYW5kIGh5cGhlbmF0ZWQgbW9udGhzXG4gICAgICAgIG1hdGNoV29yZCA9XG4gICAgICAgICAgICAvWzAtOV17MCwyNTZ9WydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGMDdcXHVGRjEwLVxcdUZGRUZdezEsMjU2fXxbXFx1MDYwMC1cXHUwNkZGXFwvXXsxLDI1Nn0oXFxzKj9bXFx1MDYwMC1cXHUwNkZGXXsxLDI1Nn0pezEsMn0vaSxcbiAgICAgICAgcmVnZXhlcztcblxuICAgIHJlZ2V4ZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGFkZFJlZ2V4VG9rZW4odG9rZW4sIHJlZ2V4LCBzdHJpY3RSZWdleCkge1xuICAgICAgICByZWdleGVzW3Rva2VuXSA9IGlzRnVuY3Rpb24ocmVnZXgpXG4gICAgICAgICAgICA/IHJlZ2V4XG4gICAgICAgICAgICA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzU3RyaWN0ICYmIHN0cmljdFJlZ2V4ID8gc3RyaWN0UmVnZXggOiByZWdleDtcbiAgICAgICAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykge1xuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gQ29kZSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MTQ5My9pcy10aGVyZS1hLXJlZ2V4cC1lc2NhcGUtZnVuY3Rpb24taW4tamF2YXNjcmlwdFxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4RXNjYXBlKFxuICAgICAgICAgICAgc1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKCdcXFxcJywgJycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAxIHx8IHAyIHx8IHAzIHx8IHA0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2V4RXNjYXBlKHMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG4gICAgfVxuXG4gICAgdmFyIHRva2VucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkUGFyc2VUb2tlbih0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBmdW5jID0gY2FsbGJhY2ssXG4gICAgICAgICAgICB0b2tlbkxlbjtcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNOdW1iZXIoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2NhbGxiYWNrXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5MZW4gPSB0b2tlbi5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbkxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5baV1dID0gZnVuYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFdlZWtQYXJzZVRva2VuKHRva2VuLCBjYWxsYmFjaykge1xuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XG4gICAgICAgICAgICBjYWxsYmFjayhpbnB1dCwgY29uZmlnLl93LCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIGlucHV0LCBjb25maWcpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwgJiYgaGFzT3duUHJvcCh0b2tlbnMsIHRva2VuKSkge1xuICAgICAgICAgICAgdG9rZW5zW3Rva2VuXShpbnB1dCwgY29uZmlnLl9hLCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBZRUFSID0gMCxcbiAgICAgICAgTU9OVEggPSAxLFxuICAgICAgICBEQVRFID0gMixcbiAgICAgICAgSE9VUiA9IDMsXG4gICAgICAgIE1JTlVURSA9IDQsXG4gICAgICAgIFNFQ09ORCA9IDUsXG4gICAgICAgIE1JTExJU0VDT05EID0gNixcbiAgICAgICAgV0VFSyA9IDcsXG4gICAgICAgIFdFRUtEQVkgPSA4O1xuXG4gICAgZnVuY3Rpb24gbW9kKG4sIHgpIHtcbiAgICAgICAgcmV0dXJuICgobiAlIHgpICsgeCkgJSB4O1xuICAgIH1cblxuICAgIHZhciBpbmRleE9mO1xuXG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgICAgIGluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleE9mID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgIC8vIEkga25vd1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgICAgICBpZiAoaXNOYU4oeWVhcikgfHwgaXNOYU4obW9udGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtb2RNb250aCA9IG1vZChtb250aCwgMTIpO1xuICAgICAgICB5ZWFyICs9IChtb250aCAtIG1vZE1vbnRoKSAvIDEyO1xuICAgICAgICByZXR1cm4gbW9kTW9udGggPT09IDFcbiAgICAgICAgICAgID8gaXNMZWFwWWVhcih5ZWFyKVxuICAgICAgICAgICAgICAgID8gMjlcbiAgICAgICAgICAgICAgICA6IDI4XG4gICAgICAgICAgICA6IDMxIC0gKChtb2RNb250aCAlIDcpICUgMik7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21vbnRoJywgJ00nKTtcblxuICAgIC8vIFBSSU9SSVRZXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ21vbnRoJywgOCk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdNJywgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1JlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNJywgJ01NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHZhciBtb250aCA9IGNvbmZpZy5fbG9jYWxlLm1vbnRoc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cbiAgICAgICAgaWYgKG1vbnRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5W01PTlRIXSA9IG1vbnRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzID1cbiAgICAgICAgICAgICdKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyJy5zcGxpdChcbiAgICAgICAgICAgICAgICAnXydcbiAgICAgICAgICAgICksXG4gICAgICAgIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9XG4gICAgICAgICAgICAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KCdfJyksXG4gICAgICAgIE1PTlRIU19JTl9GT1JNQVQgPSAvRFtvRF0/KFxcW1teXFxbXFxdXSpcXF18XFxzKStNTU1NPy8sXG4gICAgICAgIGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkLFxuICAgICAgICBkZWZhdWx0TW9udGhzUmVnZXggPSBtYXRjaFdvcmQ7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHMobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzKVxuICAgICAgICAgICAgICAgID8gdGhpcy5fbW9udGhzXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9tb250aHNbJ3N0YW5kYWxvbmUnXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpXG4gICAgICAgICAgICA/IHRoaXMuX21vbnRoc1ttLm1vbnRoKCldXG4gICAgICAgICAgICA6IHRoaXMuX21vbnRoc1tcbiAgICAgICAgICAgICAgICAgICh0aGlzLl9tb250aHMuaXNGb3JtYXQgfHwgTU9OVEhTX0lOX0ZPUk1BVCkudGVzdChmb3JtYXQpXG4gICAgICAgICAgICAgICAgICAgICAgPyAnZm9ybWF0J1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3N0YW5kYWxvbmUnXG4gICAgICAgICAgICAgIF1bbS5tb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydChtLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKCFtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHNTaG9ydClcbiAgICAgICAgICAgICAgICA/IHRoaXMuX21vbnRoc1Nob3J0XG4gICAgICAgICAgICAgICAgOiB0aGlzLl9tb250aHNTaG9ydFsnc3RhbmRhbG9uZSddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KVxuICAgICAgICAgICAgPyB0aGlzLl9tb250aHNTaG9ydFttLm1vbnRoKCldXG4gICAgICAgICAgICA6IHRoaXMuX21vbnRoc1Nob3J0W1xuICAgICAgICAgICAgICAgICAgTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ1xuICAgICAgICAgICAgICBdW20ubW9udGgoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RyaWN0UGFyc2UobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGlpLFxuICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgbGxjID0gbW9udGhOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHVzZWRcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XG4gICAgICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IHRoaXMubW9udGhzU2hvcnQoXG4gICAgICAgICAgICAgICAgICAgIG1vbSxcbiAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzUGFyc2UobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZVN0cmljdFBhcnNlLmNhbGwodGhpcywgbW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBhZGQgc29ydGluZ1xuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyXG4gICAgICAgIC8vIHNlZSBzb3J0aW5nIGluIGNvbXB1dGVNb250aHNQYXJzZVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJyxcbiAgICAgICAgICAgICAgICAgICAgJ2knXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgICAgICAgICAgJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykgKyAnfF4nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnTU1NTScgJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnTU1NJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIHNldE1vbnRoKG1vbSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGRheU9mTW9udGg7XG5cbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAvLyBObyBvcFxuICAgICAgICAgICAgcmV0dXJuIG1vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xuICAgICAgICAgICAgICAgIGlmICghaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF5T2ZNb250aCA9IE1hdGgubWluKG1vbS5kYXRlKCksIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIHZhbHVlKSk7XG4gICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyAnTW9udGgnXSh2YWx1ZSwgZGF5T2ZNb250aCk7XG4gICAgICAgIHJldHVybiBtb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TW9udGgodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNldE1vbnRoKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdldCh0aGlzLCAnTW9udGgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERheXNJbk1vbnRoKCkge1xuICAgICAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9udGhzU2hvcnRSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzU2hvcnRSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3RcbiAgICAgICAgICAgICAgICA/IHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXhcbiAgICAgICAgICAgICAgICA6IHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aHNSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzUmVnZXggPSBkZWZhdWx0TW9udGhzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3RcbiAgICAgICAgICAgICAgICA/IHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4XG4gICAgICAgICAgICAgICAgOiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVNb250aHNQYXJzZSgpIHtcbiAgICAgICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNob3J0UGllY2VzID0gW10sXG4gICAgICAgICAgICBsb25nUGllY2VzID0gW10sXG4gICAgICAgICAgICBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIG1vbTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XG4gICAgICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICAgICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW9udGhzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLFxuICAgICAgICAgICAgJ2knXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdZJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgeSA9IHRoaXMueWVhcigpO1xuICAgICAgICByZXR1cm4geSA8PSA5OTk5ID8gemVyb0ZpbGwoeSwgNCkgOiAnKycgKyB5O1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWScsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnllYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWScsIDRdLCAwLCAneWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVknLCA1XSwgMCwgJ3llYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZWScsIDYsIHRydWVdLCAwLCAneWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd5ZWFyJywgJ3knKTtcblxuICAgIC8vIFBSSU9SSVRJRVNcblxuICAgIGFkZFVuaXRQcmlvcml0eSgneWVhcicsIDEpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignWScsIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZJywgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZWScsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydZWVlZWScsICdZWVlZWVknXSwgWUVBUik7XG4gICAgYWRkUGFyc2VUb2tlbignWVlZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPVxuICAgICAgICAgICAgaW5wdXQubGVuZ3RoID09PSAyID8gaG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpIDogdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IHBhcnNlSW50KGlucHV0LCAxMCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XG4gICAgfVxuXG4gICAgLy8gSE9PS1NcblxuICAgIGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0b0ludChpbnB1dCkgKyAodG9JbnQoaW5wdXQpID4gNjggPyAxOTAwIDogMjAwMCk7XG4gICAgfTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRZZWFyID0gbWFrZUdldFNldCgnRnVsbFllYXInLCB0cnVlKTtcblxuICAgIGZ1bmN0aW9uIGdldElzTGVhcFllYXIoKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVEYXRlKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XG4gICAgICAgIC8vIGNhbid0IGp1c3QgYXBwbHkoKSB0byBjcmVhdGUgYSBkYXRlOlxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMTgxMzQ4XG4gICAgICAgIHZhciBkYXRlO1xuICAgICAgICAvLyB0aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZSBsZWFwIHllYXJzIHVzaW5nIGEgZnVsbCA0MDAgeWVhciBjeWNsZSwgdGhlbiByZXNldFxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHkgKyA0MDAsIG0sIGQsIGgsIE0sIHMsIG1zKTtcbiAgICAgICAgICAgIGlmIChpc0Zpbml0ZShkYXRlLmdldEZ1bGxZZWFyKCkpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLCBkLCBoLCBNLCBzLCBtcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVVVENEYXRlKHkpIHtcbiAgICAgICAgdmFyIGRhdGUsIGFyZ3M7XG4gICAgICAgIC8vIHRoZSBEYXRlLlVUQyBmdW5jdGlvbiByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIC8vIHByZXNlcnZlIGxlYXAgeWVhcnMgdXNpbmcgYSBmdWxsIDQwMCB5ZWFyIGN5Y2xlLCB0aGVuIHJlc2V0XG4gICAgICAgICAgICBhcmdzWzBdID0geSArIDQwMDtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmdzKSk7XG4gICAgICAgICAgICBpZiAoaXNGaW5pdGUoZGF0ZS5nZXRVVENGdWxsWWVhcigpKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICAvLyBzdGFydC1vZi1maXJzdC13ZWVrIC0gc3RhcnQtb2YteWVhclxuICAgIGZ1bmN0aW9uIGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgLy8gZmlyc3Qtd2VlayBkYXkgLS0gd2hpY2ggamFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgKDQgZm9yIGlzbywgMSBmb3Igb3RoZXIpXG4gICAgICAgICAgICBmd2QgPSA3ICsgZG93IC0gZG95LFxuICAgICAgICAgICAgLy8gZmlyc3Qtd2VlayBkYXkgbG9jYWwgd2Vla2RheSAtLSB3aGljaCBsb2NhbCB3ZWVrZGF5IGlzIGZ3ZFxuICAgICAgICAgICAgZndkbHcgPSAoNyArIGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdykgJSA3O1xuXG4gICAgICAgIHJldHVybiAtZndkbHcgKyBmd2QgLSAxO1xuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGUjQ2FsY3VsYXRpbmdfYV9kYXRlX2dpdmVuX3RoZV95ZWFyLjJDX3dlZWtfbnVtYmVyX2FuZF93ZWVrZGF5XG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtzKHllYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgICAgIHZhciBsb2NhbFdlZWtkYXkgPSAoNyArIHdlZWtkYXkgLSBkb3cpICUgNyxcbiAgICAgICAgICAgIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxuICAgICAgICAgICAgZGF5T2ZZZWFyID0gMSArIDcgKiAod2VlayAtIDEpICsgbG9jYWxXZWVrZGF5ICsgd2Vla09mZnNldCxcbiAgICAgICAgICAgIHJlc1llYXIsXG4gICAgICAgICAgICByZXNEYXlPZlllYXI7XG5cbiAgICAgICAgaWYgKGRheU9mWWVhciA8PSAwKSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhciAtIDE7XG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhcjtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyLFxuICAgICAgICAgICAgZGF5T2ZZZWFyOiByZXNEYXlPZlllYXIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Vla09mWWVhcihtb20sIGRvdywgZG95KSB7XG4gICAgICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KG1vbS55ZWFyKCksIGRvdywgZG95KSxcbiAgICAgICAgICAgIHdlZWsgPSBNYXRoLmZsb29yKChtb20uZGF5T2ZZZWFyKCkgLSB3ZWVrT2Zmc2V0IC0gMSkgLyA3KSArIDEsXG4gICAgICAgICAgICByZXNXZWVrLFxuICAgICAgICAgICAgcmVzWWVhcjtcblxuICAgICAgICBpZiAod2VlayA8IDEpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpIC0gMTtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrICsgd2Vla3NJblllYXIocmVzWWVhciwgZG93LCBkb3kpO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWsgPiB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSkpIHtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrIC0gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpO1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCk7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3ZWVrOiByZXNXZWVrLFxuICAgICAgICAgICAgeWVhcjogcmVzWWVhcixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xuICAgICAgICByZXR1cm4gKGRheXNJblllYXIoeWVhcikgLSB3ZWVrT2Zmc2V0ICsgd2Vla09mZnNldE5leHQpIC8gNztcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcbiAgICBhZGRGb3JtYXRUb2tlbignVycsIFsnV1cnLCAyXSwgJ1dvJywgJ2lzb1dlZWsnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnd2VlaycsICd3Jyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrJywgJ1cnKTtcblxuICAgIC8vIFBSSU9SSVRJRVNcblxuICAgIGFkZFVuaXRQcmlvcml0eSgnd2VlaycsIDUpO1xuICAgIGFkZFVuaXRQcmlvcml0eSgnaXNvV2VlaycsIDUpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigndycsIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignd3cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignVycsIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignV1cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihcbiAgICAgICAgWyd3JywgJ3d3JywgJ1cnLCAnV1cnXSxcbiAgICAgICAgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAxKV0gPSB0b0ludChpbnB1dCk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vlayhtb20pIHtcbiAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIobW9tLCB0aGlzLl93ZWVrLmRvdywgdGhpcy5fd2Vlay5kb3kpLndlZWs7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrID0ge1xuICAgICAgICBkb3c6IDAsIC8vIFN1bmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgICAgICBkb3k6IDYsIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDZ0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZldlZWsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mWWVhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWsoaW5wdXQpIHtcbiAgICAgICAgdmFyIHdlZWsgPSB0aGlzLmxvY2FsZURhdGEoKS53ZWVrKHRoaXMpO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2VlayhpbnB1dCkge1xuICAgICAgICB2YXIgd2VlayA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkud2VlaztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkJywgMCwgJ2RvJywgJ2RheScpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZScsIDAsIDAsICd3ZWVrZGF5Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ0UnLCAwLCAwLCAnaXNvV2Vla2RheScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xuICAgIGFkZFVuaXRBbGlhcygnd2Vla2RheScsICdlJyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrZGF5JywgJ0UnKTtcblxuICAgIC8vIFBSSU9SSVRZXG4gICAgYWRkVW5pdFByaW9yaXR5KCdkYXknLCAxMSk7XG4gICAgYWRkVW5pdFByaW9yaXR5KCd3ZWVrZGF5JywgMTEpO1xuICAgIGFkZFVuaXRQcmlvcml0eSgnaXNvV2Vla2RheScsIDExKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2QnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0UnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c01pblJlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcbiAgICBhZGRSZWdleFRva2VuKCdkZGQnLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzU2hvcnRSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG4gICAgYWRkUmVnZXhUb2tlbignZGRkZCcsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBnZXQgYSB3ZWVrZGF5IG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZFxuICAgICAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XG4gICAgICAgICAgICB3ZWVrLmQgPSB3ZWVrZGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkJywgJ2UnLCAnRSddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBwYXJzZVdlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc05hTihpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KSAlIDcgfHwgNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNOYU4oaW5wdXQpID8gbnVsbCA6IGlucHV0O1xuICAgIH1cblxuICAgIC8vIExPQ0FMRVNcbiAgICBmdW5jdGlvbiBzaGlmdFdlZWtkYXlzKHdzLCBuKSB7XG4gICAgICAgIHJldHVybiB3cy5zbGljZShuLCA3KS5jb25jYXQod3Muc2xpY2UoMCwgbikpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXMgPVxuICAgICAgICAgICAgJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpLFxuICAgICAgICBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCA9ICdTdW5fTW9uX1R1ZV9XZWRfVGh1X0ZyaV9TYXQnLnNwbGl0KCdfJyksXG4gICAgICAgIGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbiA9ICdTdV9Nb19UdV9XZV9UaF9Gcl9TYScuc3BsaXQoJ18nKSxcbiAgICAgICAgZGVmYXVsdFdlZWtkYXlzUmVnZXggPSBtYXRjaFdvcmQsXG4gICAgICAgIGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXggPSBtYXRjaFdvcmQsXG4gICAgICAgIGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4ID0gbWF0Y2hXb3JkO1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXMobSwgZm9ybWF0KSB7XG4gICAgICAgIHZhciB3ZWVrZGF5cyA9IGlzQXJyYXkodGhpcy5fd2Vla2RheXMpXG4gICAgICAgICAgICA/IHRoaXMuX3dlZWtkYXlzXG4gICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzW1xuICAgICAgICAgICAgICAgICAgbSAmJiBtICE9PSB0cnVlICYmIHRoaXMuX3dlZWtkYXlzLmlzRm9ybWF0LnRlc3QoZm9ybWF0KVxuICAgICAgICAgICAgICAgICAgICAgID8gJ2Zvcm1hdCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdzdGFuZGFsb25lJ1xuICAgICAgICAgICAgICBdO1xuICAgICAgICByZXR1cm4gbSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBzaGlmdFdlZWtkYXlzKHdlZWtkYXlzLCB0aGlzLl93ZWVrLmRvdylcbiAgICAgICAgICAgIDogbVxuICAgICAgICAgICAgPyB3ZWVrZGF5c1ttLmRheSgpXVxuICAgICAgICAgICAgOiB3ZWVrZGF5cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1Nob3J0KG0pIHtcbiAgICAgICAgcmV0dXJuIG0gPT09IHRydWVcbiAgICAgICAgICAgID8gc2hpZnRXZWVrZGF5cyh0aGlzLl93ZWVrZGF5c1Nob3J0LCB0aGlzLl93ZWVrLmRvdylcbiAgICAgICAgICAgIDogbVxuICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c1Nob3J0W20uZGF5KCldXG4gICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzU2hvcnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNNaW4obSkge1xuICAgICAgICByZXR1cm4gbSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBzaGlmdFdlZWtkYXlzKHRoaXMuX3dlZWtkYXlzTWluLCB0aGlzLl93ZWVrLmRvdylcbiAgICAgICAgICAgIDogbVxuICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXVxuICAgICAgICAgICAgOiB0aGlzLl93ZWVrZGF5c01pbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTdHJpY3RQYXJzZSQxKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGlpLFxuICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgbGxjID0gd2Vla2RheU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7ICsraSkge1xuICAgICAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c01pbihcbiAgICAgICAgICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICAgICkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzU2hvcnQoXG4gICAgICAgICAgICAgICAgICAgIG1vbSxcbiAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2Uod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xuXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVTdHJpY3RQYXJzZSQxLmNhbGwodGhpcywgd2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG5cbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFxcXC4/JykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgJ14nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFxcXC4/JykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykucmVwbGFjZSgnLicsICdcXFxcLj8nKSArICckJyxcbiAgICAgICAgICAgICAgICAgICAgJ2knXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgICAgICAgICAgJ14nICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5cyhtb20sICcnKSArXG4gICAgICAgICAgICAgICAgICAgICd8XicgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykgK1xuICAgICAgICAgICAgICAgICAgICAnfF4nICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzdHJpY3QgJiZcbiAgICAgICAgICAgICAgICBmb3JtYXQgPT09ICdkZGRkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnZGRkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHN0cmljdCAmJlxuICAgICAgICAgICAgICAgIGZvcm1hdCA9PT0gJ2RkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mV2VlayhpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRheSA9IHRoaXMuX2lzVVRDID8gdGhpcy5fZC5nZXRVVENEYXkoKSA6IHRoaXMuX2QuZ2V0RGF5KCk7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbnB1dCA9IHBhcnNlV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGlucHV0IC0gZGF5LCAnZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRheTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldExvY2FsZURheU9mV2VlayhpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdlZWtkYXkgPSAodGhpcy5kYXkoKSArIDcgLSB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3cpICUgNztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrZGF5IDogdGhpcy5hZGQoaW5wdXQgLSB3ZWVrZGF5LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT0RheU9mV2VlayhpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBiZWhhdmVzIHRoZSBzYW1lIGFzIG1vbWVudCNkYXkgZXhjZXB0XG4gICAgICAgIC8vIGFzIGEgZ2V0dGVyLCByZXR1cm5zIDcgaW5zdGVhZCBvZiAwICgxLTcgcmFuZ2UgaW5zdGVhZCBvZiAwLTYpXG4gICAgICAgIC8vIGFzIGEgc2V0dGVyLCBzdW5kYXkgc2hvdWxkIGJlbG9uZyB0byB0aGUgcHJldmlvdXMgd2Vlay5cblxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHdlZWtkYXkgPSBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIHRoaXMubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRheSh0aGlzLmRheSgpICUgNyA/IHdlZWtkYXkgOiB3ZWVrZGF5IC0gNyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXkoKSB8fCA3O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Vla2RheXNSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1JlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3RcbiAgICAgICAgICAgICAgICA/IHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXhcbiAgICAgICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1Nob3J0UmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0XG4gICAgICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXhcbiAgICAgICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdlZWtkYXlzTWluUmVnZXgoaXNTdHJpY3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzTWluUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSBkZWZhdWx0V2Vla2RheXNNaW5SZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0XG4gICAgICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4XG4gICAgICAgICAgICAgICAgOiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZVdlZWtkYXlzUGFyc2UoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNtcExlblJldihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtaW5QaWVjZXMgPSBbXSxcbiAgICAgICAgICAgIHNob3J0UGllY2VzID0gW10sXG4gICAgICAgICAgICBsb25nUGllY2VzID0gW10sXG4gICAgICAgICAgICBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIG1vbSxcbiAgICAgICAgICAgIG1pbnAsXG4gICAgICAgICAgICBzaG9ydHAsXG4gICAgICAgICAgICBsb25ncDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XG4gICAgICAgICAgICBtaW5wID0gcmVnZXhFc2NhcGUodGhpcy53ZWVrZGF5c01pbihtb20sICcnKSk7XG4gICAgICAgICAgICBzaG9ydHAgPSByZWdleEVzY2FwZSh0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICAgICAgbG9uZ3AgPSByZWdleEVzY2FwZSh0aGlzLndlZWtkYXlzKG1vbSwgJycpKTtcbiAgICAgICAgICAgIG1pblBpZWNlcy5wdXNoKG1pbnApO1xuICAgICAgICAgICAgc2hvcnRQaWVjZXMucHVzaChzaG9ydHApO1xuICAgICAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKGxvbmdwKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gobWlucCk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHNob3J0cCk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKGxvbmdwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIHdlZWtkYXkgKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcbiAgICAgICAgLy8gd2lsbCBtYXRjaCB0aGUgbG9uZ2VyIHBpZWNlLlxuICAgICAgICBtaW5QaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XG5cbiAgICAgICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5SZWdleCA9IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG5cbiAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXignICsgbG9uZ1BpZWNlcy5qb2luKCd8JykgKyAnKScsXG4gICAgICAgICAgICAnaSdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsXG4gICAgICAgICAgICAnaSdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXignICsgbWluUGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGZ1bmN0aW9uIGhGb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhvdXJzKCkgJSAxMiB8fCAxMjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBrRm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpIHx8IDI0O1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKCdIJywgWydISCcsIDJdLCAwLCAnaG91cicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdoJywgWydoaCcsIDJdLCAwLCBoRm9ybWF0KTtcbiAgICBhZGRGb3JtYXRUb2tlbignaycsIFsna2snLCAyXSwgMCwga0Zvcm1hdCk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignaG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2htbXNzJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgJycgK1xuICAgICAgICAgICAgaEZvcm1hdC5hcHBseSh0aGlzKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAnJyArXG4gICAgICAgICAgICB0aGlzLmhvdXJzKCkgK1xuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcbiAgICAgICAgICAgIHplcm9GaWxsKHRoaXMuc2Vjb25kcygpLCAyKVxuICAgICAgICApO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbWVyaWRpZW0odG9rZW4sIGxvd2VyY2FzZSkge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1lcmlkaWVtKFxuICAgICAgICAgICAgICAgIHRoaXMuaG91cnMoKSxcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgICBsb3dlcmNhc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lcmlkaWVtKCdhJywgdHJ1ZSk7XG4gICAgbWVyaWRpZW0oJ0EnLCBmYWxzZSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2hvdXInLCAnaCcpO1xuXG4gICAgLy8gUFJJT1JJVFlcbiAgICBhZGRVbml0UHJpb3JpdHkoJ2hvdXInLCAxMyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBmdW5jdGlvbiBtYXRjaE1lcmlkaWVtKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5fbWVyaWRpZW1QYXJzZTtcbiAgICB9XG5cbiAgICBhZGRSZWdleFRva2VuKCdhJywgbWF0Y2hNZXJpZGllbSk7XG4gICAgYWRkUmVnZXhUb2tlbignQScsIG1hdGNoTWVyaWRpZW0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0gnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2gnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2snLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0hIJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2trJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkUmVnZXhUb2tlbignaG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdobW1zcycsIG1hdGNoNXRvNik7XG4gICAgYWRkUmVnZXhUb2tlbignSG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdIbW1zcycsIG1hdGNoNXRvNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnSCcsICdISCddLCBIT1VSKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnaycsICdrayddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIGtJbnB1dCA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSBrSW5wdXQgPT09IDI0ID8gMCA6IGtJbnB1dDtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnYScsICdBJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2lzUG0gPSBjb25maWcuX2xvY2FsZS5pc1BNKGlucHV0KTtcbiAgICAgICAgY29uZmlnLl9tZXJpZGllbSA9IGlucHV0O1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oWydoJywgJ2hoJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0LFxuICAgICAgICAgICAgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdIbW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ0htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNCxcbiAgICAgICAgICAgIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUlzUE0oaW5wdXQpIHtcbiAgICAgICAgLy8gSUU4IFF1aXJrcyBNb2RlICYgSUU3IFN0YW5kYXJkcyBNb2RlIGRvIG5vdCBhbGxvdyBhY2Nlc3Npbmcgc3RyaW5ncyBsaWtlIGFycmF5c1xuICAgICAgICAvLyBVc2luZyBjaGFyQXQgc2hvdWxkIGJlIG1vcmUgY29tcGF0aWJsZS5cbiAgICAgICAgcmV0dXJuIChpbnB1dCArICcnKS50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gJ3AnO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZSA9IC9bYXBdXFwuP20/XFwuPy9pLFxuICAgICAgICAvLyBTZXR0aW5nIHRoZSBob3VyIHNob3VsZCBrZWVwIHRoZSB0aW1lLCBiZWNhdXNlIHRoZSB1c2VyIGV4cGxpY2l0bHlcbiAgICAgICAgLy8gc3BlY2lmaWVkIHdoaWNoIGhvdXIgdGhleSB3YW50LiBTbyB0cnlpbmcgdG8gbWFpbnRhaW4gdGhlIHNhbWUgaG91ciAoaW5cbiAgICAgICAgLy8gYSBuZXcgdGltZXpvbmUpIG1ha2VzIHNlbnNlLiBBZGRpbmcvc3VidHJhY3RpbmcgaG91cnMgZG9lcyBub3QgZm9sbG93XG4gICAgICAgIC8vIHRoaXMgcnVsZS5cbiAgICAgICAgZ2V0U2V0SG91ciA9IG1ha2VHZXRTZXQoJ0hvdXJzJywgdHJ1ZSk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNZXJpZGllbShob3VycywgbWludXRlcywgaXNMb3dlcikge1xuICAgICAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYmFzZUNvbmZpZyA9IHtcbiAgICAgICAgY2FsZW5kYXI6IGRlZmF1bHRDYWxlbmRhcixcbiAgICAgICAgbG9uZ0RhdGVGb3JtYXQ6IGRlZmF1bHRMb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgaW52YWxpZERhdGU6IGRlZmF1bHRJbnZhbGlkRGF0ZSxcbiAgICAgICAgb3JkaW5hbDogZGVmYXVsdE9yZGluYWwsXG4gICAgICAgIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IGRlZmF1bHREYXlPZk1vbnRoT3JkaW5hbFBhcnNlLFxuICAgICAgICByZWxhdGl2ZVRpbWU6IGRlZmF1bHRSZWxhdGl2ZVRpbWUsXG5cbiAgICAgICAgbW9udGhzOiBkZWZhdWx0TG9jYWxlTW9udGhzLFxuICAgICAgICBtb250aHNTaG9ydDogZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0LFxuXG4gICAgICAgIHdlZWs6IGRlZmF1bHRMb2NhbGVXZWVrLFxuXG4gICAgICAgIHdlZWtkYXlzOiBkZWZhdWx0TG9jYWxlV2Vla2RheXMsXG4gICAgICAgIHdlZWtkYXlzTWluOiBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4sXG4gICAgICAgIHdlZWtkYXlzU2hvcnQ6IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0LFxuXG4gICAgICAgIG1lcmlkaWVtUGFyc2U6IGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlLFxuICAgIH07XG5cbiAgICAvLyBpbnRlcm5hbCBzdG9yYWdlIGZvciBsb2NhbGUgY29uZmlnIGZpbGVzXG4gICAgdmFyIGxvY2FsZXMgPSB7fSxcbiAgICAgICAgbG9jYWxlRmFtaWxpZXMgPSB7fSxcbiAgICAgICAgZ2xvYmFsTG9jYWxlO1xuXG4gICAgZnVuY3Rpb24gY29tbW9uUHJlZml4KGFycjEsIGFycjIpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBtaW5sID0gTWF0aC5taW4oYXJyMS5sZW5ndGgsIGFycjIubGVuZ3RoKTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG1pbmw7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGFycjFbaV0gIT09IGFycjJbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWlubDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVMb2NhbGUoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPyBrZXkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdfJywgJy0nKSA6IGtleTtcbiAgICB9XG5cbiAgICAvLyBwaWNrIHRoZSBsb2NhbGUgZnJvbSB0aGUgYXJyYXlcbiAgICAvLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxuICAgIC8vIHN1YnN0cmluZyBmcm9tIG1vc3Qgc3BlY2lmaWMgdG8gbGVhc3QsIGJ1dCBtb3ZlIHRvIHRoZSBuZXh0IGFycmF5IGl0ZW0gaWYgaXQncyBhIG1vcmUgc3BlY2lmaWMgdmFyaWFudCB0aGFuIHRoZSBjdXJyZW50IHJvb3RcbiAgICBmdW5jdGlvbiBjaG9vc2VMb2NhbGUobmFtZXMpIHtcbiAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgaixcbiAgICAgICAgICAgIG5leHQsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICBzcGxpdDtcblxuICAgICAgICB3aGlsZSAoaSA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc3BsaXQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaV0pLnNwbGl0KCctJyk7XG4gICAgICAgICAgICBqID0gc3BsaXQubGVuZ3RoO1xuICAgICAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpICsgMV0pO1xuICAgICAgICAgICAgbmV4dCA9IG5leHQgPyBuZXh0LnNwbGl0KCctJykgOiBudWxsO1xuICAgICAgICAgICAgd2hpbGUgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShzcGxpdC5zbGljZSgwLCBqKS5qb2luKCctJykpO1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBuZXh0ICYmXG4gICAgICAgICAgICAgICAgICAgIG5leHQubGVuZ3RoID49IGogJiZcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uUHJlZml4KHNwbGl0LCBuZXh0KSA+PSBqIC0gMVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGFycmF5IGl0ZW0gaXMgYmV0dGVyIHRoYW4gYSBzaGFsbG93ZXIgc3Vic3RyaW5nIG9mIHRoaXMgb25lXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0xvY2FsZU5hbWVTYW5lKG5hbWUpIHtcbiAgICAgICAgLy8gUHJldmVudCBuYW1lcyB0aGF0IGxvb2sgbGlrZSBmaWxlc3lzdGVtIHBhdGhzLCBpLmUgY29udGFpbiAnLycgb3IgJ1xcJ1xuICAgICAgICByZXR1cm4gbmFtZS5tYXRjaCgnXlteL1xcXFxcXFxcXSokJykgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcbiAgICAgICAgdmFyIG9sZExvY2FsZSA9IG51bGwsXG4gICAgICAgICAgICBhbGlhc2VkUmVxdWlyZTtcbiAgICAgICAgLy8gVE9ETzogRmluZCBhIGJldHRlciB3YXkgdG8gcmVnaXN0ZXIgYW5kIGxvYWQgYWxsIHRoZSBsb2NhbGVzIGluIE5vZGVcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgbW9kdWxlICYmXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyAmJlxuICAgICAgICAgICAgaXNMb2NhbGVOYW1lU2FuZShuYW1lKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkTG9jYWxlID0gZ2xvYmFsTG9jYWxlLl9hYmJyO1xuICAgICAgICAgICAgICAgIGFsaWFzZWRSZXF1aXJlID0gcmVxdWlyZTtcbiAgICAgICAgICAgICAgICBhbGlhc2VkUmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xuICAgICAgICAgICAgICAgIGdldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIG1hcmsgYXMgbm90IGZvdW5kIHRvIGF2b2lkIHJlcGVhdGluZyBleHBlbnNpdmUgZmlsZSByZXF1aXJlIGNhbGwgY2F1c2luZyBoaWdoIENQVVxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdHJ5aW5nIHRvIGZpbmQgZW4tVVMsIGVuX1VTLCBlbi11cyBmb3IgZXZlcnkgZm9ybWF0IGNhbGxcbiAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbnVsbDsgLy8gbnVsbCBtZWFucyBub3QgZm91bmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsb2NhbGUgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbG9jYWxlLiAgSWZcbiAgICAvLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbFxuICAgIC8vIGxvY2FsZSBrZXkuXG4gICAgZnVuY3Rpb24gZ2V0U2V0R2xvYmFsTG9jYWxlKGtleSwgdmFsdWVzKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBnZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gbW9tZW50LmR1cmF0aW9uLl9sb2NhbGUgPSBtb21lbnQuX2xvY2FsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZ2xvYmFsTG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy93YXJuIHVzZXIgaWYgYXJndW1lbnRzIGFyZSBwYXNzZWQgYnV0IHRoZSBsb2NhbGUgY291bGQgbm90IGJlIHNldFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAnTG9jYWxlICcgKyBrZXkgKyAnIG5vdCBmb3VuZC4gRGlkIHlvdSBmb3JnZXQgdG8gbG9hZCBpdD8nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVMb2NhbGUobmFtZSwgY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGUsXG4gICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gYmFzZUNvbmZpZztcbiAgICAgICAgICAgIGNvbmZpZy5hYmJyID0gbmFtZTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoXG4gICAgICAgICAgICAgICAgICAgICdkZWZpbmVMb2NhbGVPdmVycmlkZScsXG4gICAgICAgICAgICAgICAgICAgICd1c2UgbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGVOYW1lLCBjb25maWcpIHRvIGNoYW5nZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbiBleGlzdGluZyBsb2NhbGUuIG1vbWVudC5kZWZpbmVMb2NhbGUobG9jYWxlTmFtZSwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZmlnKSBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGUgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2VlIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvZGVmaW5lLWxvY2FsZS8gZm9yIG1vcmUgaW5mby4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGVzW25hbWVdLl9jb25maWc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbGVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoY29uZmlnLnBhcmVudExvY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlLl9jb25maWc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlRmFtaWxpZXNbY29uZmlnLnBhcmVudExvY2FsZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IG5ldyBMb2NhbGUobWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgY29uZmlnKSk7XG5cbiAgICAgICAgICAgIGlmIChsb2NhbGVGYW1pbGllc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lTG9jYWxlKHgubmFtZSwgeC5jb25maWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBub3c6IGFsc28gc2V0IHRoZSBsb2NhbGVcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGxvY2FsZSBBRlRFUiBhbGwgY2hpbGQgbG9jYWxlcyBoYXZlIGJlZW5cbiAgICAgICAgICAgIC8vIGNyZWF0ZWQsIHNvIHdlIHdvbid0IGVuZCB1cCB3aXRoIHRoZSBjaGlsZCBsb2NhbGUgc2V0LlxuICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVzZWZ1bCBmb3IgdGVzdGluZ1xuICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsZShuYW1lLCBjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxlLFxuICAgICAgICAgICAgICAgIHRtcExvY2FsZSxcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBiYXNlQ29uZmlnO1xuXG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsICYmIGxvY2FsZXNbbmFtZV0ucGFyZW50TG9jYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgY2hpbGQgbG9jYWxlIGluLXBsYWNlIHRvIGF2b2lkIG1lbW9yeS1sZWFrc1xuICAgICAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0uc2V0KG1lcmdlQ29uZmlncyhsb2NhbGVzW25hbWVdLl9jb25maWcsIGNvbmZpZykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNRVJHRVxuICAgICAgICAgICAgICAgIHRtcExvY2FsZSA9IGxvYWRMb2NhbGUobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRtcExvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbmZpZyA9IHRtcExvY2FsZS5fY29uZmlnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGlmICh0bXBMb2NhbGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGVMb2NhbGUgaXMgY2FsbGVkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGVcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGFiYnIgc28gaXQgd2lsbCBoYXZlIGEgbmFtZSAoZ2V0dGVycyByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kZWZpbmVkIG90aGVyd2lzZSkuXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5hYmJyID0gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbmV3IExvY2FsZShjb25maWcpO1xuICAgICAgICAgICAgICAgIGxvY2FsZS5wYXJlbnRMb2NhbGUgPSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcGFzcyBudWxsIGZvciBjb25maWcgdG8gdW51cGRhdGUsIHVzZWZ1bCBmb3IgdGVzdHNcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBnZXRTZXRHbG9iYWxMb2NhbGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcbiAgICBmdW5jdGlvbiBnZXRMb2NhbGUoa2V5KSB7XG4gICAgICAgIHZhciBsb2NhbGU7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkuX2xvY2FsZSAmJiBrZXkuX2xvY2FsZS5fYWJicikge1xuICAgICAgICAgICAga2V5ID0ga2V5Ll9sb2NhbGUuX2FiYnI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAgICAvL3Nob3J0LWNpcmN1aXQgZXZlcnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGtleSk7XG4gICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleSA9IFtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RMb2NhbGVzKCkge1xuICAgICAgICByZXR1cm4ga2V5cyhsb2NhbGVzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJmbG93KG0pIHtcbiAgICAgICAgdmFyIG92ZXJmbG93LFxuICAgICAgICAgICAgYSA9IG0uX2E7XG5cbiAgICAgICAgaWYgKGEgJiYgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID09PSAtMikge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPVxuICAgICAgICAgICAgICAgIGFbTU9OVEhdIDwgMCB8fCBhW01PTlRIXSA+IDExXG4gICAgICAgICAgICAgICAgICAgID8gTU9OVEhcbiAgICAgICAgICAgICAgICAgICAgOiBhW0RBVEVdIDwgMSB8fCBhW0RBVEVdID4gZGF5c0luTW9udGgoYVtZRUFSXSwgYVtNT05USF0pXG4gICAgICAgICAgICAgICAgICAgID8gREFURVxuICAgICAgICAgICAgICAgICAgICA6IGFbSE9VUl0gPCAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgYVtIT1VSXSA+IDI0IHx8XG4gICAgICAgICAgICAgICAgICAgICAgKGFbSE9VUl0gPT09IDI0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChhW01JTlVURV0gIT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbU0VDT05EXSAhPT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtNSUxMSVNFQ09ORF0gIT09IDApKVxuICAgICAgICAgICAgICAgICAgICA/IEhPVVJcbiAgICAgICAgICAgICAgICAgICAgOiBhW01JTlVURV0gPCAwIHx8IGFbTUlOVVRFXSA+IDU5XG4gICAgICAgICAgICAgICAgICAgID8gTUlOVVRFXG4gICAgICAgICAgICAgICAgICAgIDogYVtTRUNPTkRdIDwgMCB8fCBhW1NFQ09ORF0gPiA1OVxuICAgICAgICAgICAgICAgICAgICA/IFNFQ09ORFxuICAgICAgICAgICAgICAgICAgICA6IGFbTUlMTElTRUNPTkRdIDwgMCB8fCBhW01JTExJU0VDT05EXSA+IDk5OVxuICAgICAgICAgICAgICAgICAgICA/IE1JTExJU0VDT05EXG4gICAgICAgICAgICAgICAgICAgIDogLTE7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93RGF5T2ZZZWFyICYmXG4gICAgICAgICAgICAgICAgKG92ZXJmbG93IDwgWUVBUiB8fCBvdmVyZmxvdyA+IERBVEUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IERBVEU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtzICYmIG92ZXJmbG93ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFSztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla2RheSAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUtEQVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9IG92ZXJmbG93O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgLy8gaXNvIDg2MDEgcmVnZXhcbiAgICAvLyAwMDAwLTAwLTAwIDAwMDAtVzAwIG9yIDAwMDAtVzAwLTAgKyBUICsgMDAgb3IgMDA6MDAgb3IgMDA6MDA6MDAgb3IgMDA6MDA6MDAuMDAwICsgKzAwOjAwIG9yICswMDAwIG9yICswMClcbiAgICB2YXIgZXh0ZW5kZWRJc29SZWdleCA9XG4gICAgICAgICAgICAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pLSg/OlxcZFxcZC1cXGRcXGR8V1xcZFxcZC1cXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkKSkoPzooVHwgKShcXGRcXGQoPzo6XFxkXFxkKD86OlxcZFxcZCg/OlsuLF1cXGQrKT8pPyk/KShbKy1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8kLyxcbiAgICAgICAgYmFzaWNJc29SZWdleCA9XG4gICAgICAgICAgICAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pKD86XFxkXFxkXFxkXFxkfFdcXGRcXGRcXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkfCkpKD86KFR8ICkoXFxkXFxkKD86XFxkXFxkKD86XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvLFxuICAgICAgICB0elJlZ2V4ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vLFxuICAgICAgICBpc29EYXRlcyA9IFtcbiAgICAgICAgICAgIFsnWVlZWVlZLU1NLUREJywgL1srLV1cXGR7Nn0tXFxkXFxkLVxcZFxcZC9dLFxuICAgICAgICAgICAgWydZWVlZLU1NLUREJywgL1xcZHs0fS1cXGRcXGQtXFxkXFxkL10sXG4gICAgICAgICAgICBbJ0dHR0ctW1ddV1ctRScsIC9cXGR7NH0tV1xcZFxcZC1cXGQvXSxcbiAgICAgICAgICAgIFsnR0dHRy1bV11XVycsIC9cXGR7NH0tV1xcZFxcZC8sIGZhbHNlXSxcbiAgICAgICAgICAgIFsnWVlZWS1EREQnLCAvXFxkezR9LVxcZHszfS9dLFxuICAgICAgICAgICAgWydZWVlZLU1NJywgL1xcZHs0fS1cXGRcXGQvLCBmYWxzZV0sXG4gICAgICAgICAgICBbJ1lZWVlZWU1NREQnLCAvWystXVxcZHsxMH0vXSxcbiAgICAgICAgICAgIFsnWVlZWU1NREQnLCAvXFxkezh9L10sXG4gICAgICAgICAgICBbJ0dHR0dbV11XV0UnLCAvXFxkezR9V1xcZHszfS9dLFxuICAgICAgICAgICAgWydHR0dHW1ddV1cnLCAvXFxkezR9V1xcZHsyfS8sIGZhbHNlXSxcbiAgICAgICAgICAgIFsnWVlZWURERCcsIC9cXGR7N30vXSxcbiAgICAgICAgICAgIFsnWVlZWU1NJywgL1xcZHs2fS8sIGZhbHNlXSxcbiAgICAgICAgICAgIFsnWVlZWScsIC9cXGR7NH0vLCBmYWxzZV0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIGlzbyB0aW1lIGZvcm1hdHMgYW5kIHJlZ2V4ZXNcbiAgICAgICAgaXNvVGltZXMgPSBbXG4gICAgICAgICAgICBbJ0hIOm1tOnNzLlNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGRcXC5cXGQrL10sXG4gICAgICAgICAgICBbJ0hIOm1tOnNzLFNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQsXFxkKy9dLFxuICAgICAgICAgICAgWydISDptbTpzcycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICAgICAgWydISDptbScsIC9cXGRcXGQ6XFxkXFxkL10sXG4gICAgICAgICAgICBbJ0hIbW1zcy5TU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgICAgIFsnSEhtbXNzLFNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkLFxcZCsvXSxcbiAgICAgICAgICAgIFsnSEhtbXNzJywgL1xcZFxcZFxcZFxcZFxcZFxcZC9dLFxuICAgICAgICAgICAgWydISG1tJywgL1xcZFxcZFxcZFxcZC9dLFxuICAgICAgICAgICAgWydISCcsIC9cXGRcXGQvXSxcbiAgICAgICAgXSxcbiAgICAgICAgYXNwTmV0SnNvblJlZ2V4ID0gL15cXC8/RGF0ZVxcKCgtP1xcZCspL2ksXG4gICAgICAgIC8vIFJGQyAyODIyIHJlZ2V4OiBGb3IgZGV0YWlscyBzZWUgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzI4MjIjc2VjdGlvbi0zLjNcbiAgICAgICAgcmZjMjgyMiA9XG4gICAgICAgICAgICAvXig/OihNb258VHVlfFdlZHxUaHV8RnJpfFNhdHxTdW4pLD9cXHMpPyhcXGR7MSwyfSlcXHMoSmFufEZlYnxNYXJ8QXByfE1heXxKdW58SnVsfEF1Z3xTZXB8T2N0fE5vdnxEZWMpXFxzKFxcZHsyLDR9KVxccyhcXGRcXGQpOihcXGRcXGQpKD86OihcXGRcXGQpKT9cXHMoPzooVVR8R01UfFtFQ01QXVtTRF1UKXwoW1p6XSl8KFsrLV1cXGR7NH0pKSQvLFxuICAgICAgICBvYnNPZmZzZXRzID0ge1xuICAgICAgICAgICAgVVQ6IDAsXG4gICAgICAgICAgICBHTVQ6IDAsXG4gICAgICAgICAgICBFRFQ6IC00ICogNjAsXG4gICAgICAgICAgICBFU1Q6IC01ICogNjAsXG4gICAgICAgICAgICBDRFQ6IC01ICogNjAsXG4gICAgICAgICAgICBDU1Q6IC02ICogNjAsXG4gICAgICAgICAgICBNRFQ6IC02ICogNjAsXG4gICAgICAgICAgICBNU1Q6IC03ICogNjAsXG4gICAgICAgICAgICBQRFQ6IC03ICogNjAsXG4gICAgICAgICAgICBQU1Q6IC04ICogNjAsXG4gICAgICAgIH07XG5cbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdFxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JU08oY29uZmlnKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgbCxcbiAgICAgICAgICAgIHN0cmluZyA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIG1hdGNoID0gZXh0ZW5kZWRJc29SZWdleC5leGVjKHN0cmluZykgfHwgYmFzaWNJc29SZWdleC5leGVjKHN0cmluZyksXG4gICAgICAgICAgICBhbGxvd1RpbWUsXG4gICAgICAgICAgICBkYXRlRm9ybWF0LFxuICAgICAgICAgICAgdGltZUZvcm1hdCxcbiAgICAgICAgICAgIHR6Rm9ybWF0LFxuICAgICAgICAgICAgaXNvRGF0ZXNMZW4gPSBpc29EYXRlcy5sZW5ndGgsXG4gICAgICAgICAgICBpc29UaW1lc0xlbiA9IGlzb1RpbWVzLmxlbmd0aDtcblxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmlzbyA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvRGF0ZXNMZW47IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNvRGF0ZXNbaV1bMV0uZXhlYyhtYXRjaFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdCA9IGlzb0RhdGVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBhbGxvd1RpbWUgPSBpc29EYXRlc1tpXVsyXSAhPT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRlRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvVGltZXNMZW47IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzb1RpbWVzW2ldWzFdLmV4ZWMobWF0Y2hbM10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaFsyXSBzaG91bGQgYmUgJ1QnIG9yIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lRm9ybWF0ID0gKG1hdGNoWzJdIHx8ICcgJykgKyBpc29UaW1lc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aW1lRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFsbG93VGltZSAmJiB0aW1lRm9ybWF0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHpSZWdleC5leGVjKG1hdGNoWzRdKSkge1xuICAgICAgICAgICAgICAgICAgICB0ekZvcm1hdCA9ICdaJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpZy5fZiA9IGRhdGVGb3JtYXQgKyAodGltZUZvcm1hdCB8fCAnJykgKyAodHpGb3JtYXQgfHwgJycpO1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRyYWN0RnJvbVJGQzI4MjJTdHJpbmdzKFxuICAgICAgICB5ZWFyU3RyLFxuICAgICAgICBtb250aFN0cixcbiAgICAgICAgZGF5U3RyLFxuICAgICAgICBob3VyU3RyLFxuICAgICAgICBtaW51dGVTdHIsXG4gICAgICAgIHNlY29uZFN0clxuICAgICkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgdW50cnVuY2F0ZVllYXIoeWVhclN0ciksXG4gICAgICAgICAgICBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQuaW5kZXhPZihtb250aFN0ciksXG4gICAgICAgICAgICBwYXJzZUludChkYXlTdHIsIDEwKSxcbiAgICAgICAgICAgIHBhcnNlSW50KGhvdXJTdHIsIDEwKSxcbiAgICAgICAgICAgIHBhcnNlSW50KG1pbnV0ZVN0ciwgMTApLFxuICAgICAgICBdO1xuXG4gICAgICAgIGlmIChzZWNvbmRTdHIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHNlY29uZFN0ciwgMTApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW50cnVuY2F0ZVllYXIoeWVhclN0cikge1xuICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KHllYXJTdHIsIDEwKTtcbiAgICAgICAgaWYgKHllYXIgPD0gNDkpIHtcbiAgICAgICAgICAgIHJldHVybiAyMDAwICsgeWVhcjtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDw9IDk5OSkge1xuICAgICAgICAgICAgcmV0dXJuIDE5MDAgKyB5ZWFyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5ZWFyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXByb2Nlc3NSRkMyODIyKHMpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGNvbW1lbnRzIGFuZCBmb2xkaW5nIHdoaXRlc3BhY2UgYW5kIHJlcGxhY2UgbXVsdGlwbGUtc3BhY2VzIHdpdGggYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgcmV0dXJuIHNcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXChbXigpXSpcXCl8W1xcblxcdF0vZywgJyAnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHNcXHMrKS9nLCAnICcpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxcc1xccyovLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHNcXHMqJC8sICcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dlZWtkYXkod2Vla2RheVN0ciwgcGFyc2VkSW5wdXQsIGNvbmZpZykge1xuICAgICAgICBpZiAod2Vla2RheVN0cikge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB0aGUgdmFuaWxsYSBKUyBEYXRlIG9iamVjdCB3aXRoIGFuIGluZGVwZW5kZW50IGRheS1vZi13ZWVrIGNoZWNrLlxuICAgICAgICAgICAgdmFyIHdlZWtkYXlQcm92aWRlZCA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0LmluZGV4T2Yod2Vla2RheVN0ciksXG4gICAgICAgICAgICAgICAgd2Vla2RheUFjdHVhbCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRJbnB1dFswXSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkSW5wdXRbMV0sXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZElucHV0WzJdXG4gICAgICAgICAgICAgICAgKS5nZXREYXkoKTtcbiAgICAgICAgICAgIGlmICh3ZWVrZGF5UHJvdmlkZWQgIT09IHdlZWtkYXlBY3R1YWwpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS53ZWVrZGF5TWlzbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVPZmZzZXQob2JzT2Zmc2V0LCBtaWxpdGFyeU9mZnNldCwgbnVtT2Zmc2V0KSB7XG4gICAgICAgIGlmIChvYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNPZmZzZXRzW29ic09mZnNldF07XG4gICAgICAgIH0gZWxzZSBpZiAobWlsaXRhcnlPZmZzZXQpIHtcbiAgICAgICAgICAgIC8vIHRoZSBvbmx5IGFsbG93ZWQgbWlsaXRhcnkgdHogaXMgWlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaG0gPSBwYXJzZUludChudW1PZmZzZXQsIDEwKSxcbiAgICAgICAgICAgICAgICBtID0gaG0gJSAxMDAsXG4gICAgICAgICAgICAgICAgaCA9IChobSAtIG0pIC8gMTAwO1xuICAgICAgICAgICAgcmV0dXJuIGggKiA2MCArIG07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGFuZCB0aW1lIGZyb20gcmVmIDI4MjIgZm9ybWF0XG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVJGQzI4MjIoY29uZmlnKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHJmYzI4MjIuZXhlYyhwcmVwcm9jZXNzUkZDMjgyMihjb25maWcuX2kpKSxcbiAgICAgICAgICAgIHBhcnNlZEFycmF5O1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHBhcnNlZEFycmF5ID0gZXh0cmFjdEZyb21SRkMyODIyU3RyaW5ncyhcbiAgICAgICAgICAgICAgICBtYXRjaFs0XSxcbiAgICAgICAgICAgICAgICBtYXRjaFszXSxcbiAgICAgICAgICAgICAgICBtYXRjaFsyXSxcbiAgICAgICAgICAgICAgICBtYXRjaFs1XSxcbiAgICAgICAgICAgICAgICBtYXRjaFs2XSxcbiAgICAgICAgICAgICAgICBtYXRjaFs3XVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICghY2hlY2tXZWVrZGF5KG1hdGNoWzFdLCBwYXJzZWRBcnJheSwgY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uZmlnLl9hID0gcGFyc2VkQXJyYXk7XG4gICAgICAgICAgICBjb25maWcuX3R6bSA9IGNhbGN1bGF0ZU9mZnNldChtYXRjaFs4XSwgbWF0Y2hbOV0sIG1hdGNoWzEwXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IGNyZWF0ZVVUQ0RhdGUuYXBwbHkobnVsbCwgY29uZmlnLl9hKTtcbiAgICAgICAgICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnJmYzI4MjIgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gMSkgQVNQLk5FVCwgMikgSVNPLCAzKSBSRkMgMjgyMiBmb3JtYXRzLCBvciA0KSBvcHRpb25hbCBmYWxsYmFjayBpZiBwYXJzaW5nIGlzbid0IHN0cmljdFxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gYXNwTmV0SnNvblJlZ2V4LmV4ZWMoY29uZmlnLl9pKTtcbiAgICAgICAgaWYgKG1hdGNoZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCttYXRjaGVkWzFdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcbiAgICAgICAgaWYgKGNvbmZpZy5faXNWYWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuX2lzVmFsaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuX3N0cmljdCkge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBGaW5hbCBhdHRlbXB0LCB1c2UgSW5wdXQgRmFsbGJhY2tcbiAgICAgICAgICAgIGhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ3ZhbHVlIHByb3ZpZGVkIGlzIG5vdCBpbiBhIHJlY29nbml6ZWQgUkZDMjgyMiBvciBJU08gZm9ybWF0LiBtb21lbnQgY29uc3RydWN0aW9uIGZhbGxzIGJhY2sgdG8ganMgRGF0ZSgpLCAnICtcbiAgICAgICAgICAgICd3aGljaCBpcyBub3QgcmVsaWFibGUgYWNyb3NzIGFsbCBicm93c2VycyBhbmQgdmVyc2lvbnMuIE5vbiBSRkMyODIyL0lTTyBkYXRlIGZvcm1hdHMgYXJlICcgK1xuICAgICAgICAgICAgJ2Rpc2NvdXJhZ2VkLiBQbGVhc2UgcmVmZXIgdG8gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9qcy1kYXRlLyBmb3IgbW9yZSBpbmZvLicsXG4gICAgICAgIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSArIChjb25maWcuX3VzZVVUQyA/ICcgVVRDJyA6ICcnKSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gUGljayB0aGUgZmlyc3QgZGVmaW5lZCBvZiB0d28gb3IgdGhyZWUgYXJndW1lbnRzLlxuICAgIGZ1bmN0aW9uIGRlZmF1bHRzKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3VycmVudERhdGVBcnJheShjb25maWcpIHtcbiAgICAgICAgLy8gaG9va3MgaXMgYWN0dWFsbHkgdGhlIGV4cG9ydGVkIG1vbWVudCBvYmplY3RcbiAgICAgICAgdmFyIG5vd1ZhbHVlID0gbmV3IERhdGUoaG9va3Mubm93KCkpO1xuICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbm93VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBub3dWYWx1ZS5nZXRVVENNb250aCgpLFxuICAgICAgICAgICAgICAgIG5vd1ZhbHVlLmdldFVUQ0RhdGUoKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRNb250aCgpLCBub3dWYWx1ZS5nZXREYXRlKCldO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkYXRlLlxuICAgIC8vIHRoZSBhcnJheSBzaG91bGQgbWlycm9yIHRoZSBwYXJhbWV0ZXJzIGJlbG93XG4gICAgLy8gbm90ZTogYWxsIHZhbHVlcyBwYXN0IHRoZSB5ZWFyIGFyZSBvcHRpb25hbCBhbmQgd2lsbCBkZWZhdWx0IHRvIHRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXG4gICAgLy8gW3llYXIsIG1vbnRoLCBkYXkgLCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmRdXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUFycmF5KGNvbmZpZykge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBpbnB1dCA9IFtdLFxuICAgICAgICAgICAgY3VycmVudERhdGUsXG4gICAgICAgICAgICBleHBlY3RlZFdlZWtkYXksXG4gICAgICAgICAgICB5ZWFyVG9Vc2U7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudERhdGUgPSBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZyk7XG5cbiAgICAgICAgLy9jb21wdXRlIGRheSBvZiB0aGUgeWVhciBmcm9tIHdlZWtzIGFuZCB3ZWVrZGF5c1xuICAgICAgICBpZiAoY29uZmlnLl93ICYmIGNvbmZpZy5fYVtEQVRFXSA9PSBudWxsICYmIGNvbmZpZy5fYVtNT05USF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgZGF5T2ZZZWFyRnJvbVdlZWtJbmZvKGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIHRoZSBkYXkgb2YgdGhlIHllYXIgaXMgc2V0LCBmaWd1cmUgb3V0IHdoYXQgaXQgaXNcbiAgICAgICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHllYXJUb1VzZSA9IGRlZmF1bHRzKGNvbmZpZy5fYVtZRUFSXSwgY3VycmVudERhdGVbWUVBUl0pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkgfHxcbiAgICAgICAgICAgICAgICBjb25maWcuX2RheU9mWWVhciA9PT0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93RGF5T2ZZZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoeWVhclRvVXNlLCAwLCBjb25maWcuX2RheU9mWWVhcik7XG4gICAgICAgICAgICBjb25maWcuX2FbTU9OVEhdID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgICAgICAgICAgY29uZmlnLl9hW0RBVEVdID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgZGF0ZS5cbiAgICAgICAgLy8gKiBpZiBubyB5ZWFyLCBtb250aCwgZGF5IG9mIG1vbnRoIGFyZSBnaXZlbiwgZGVmYXVsdCB0byB0b2RheVxuICAgICAgICAvLyAqIGlmIGRheSBvZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBtb250aCBhbmQgeWVhclxuICAgICAgICAvLyAqIGlmIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG9ubHkgeWVhclxuICAgICAgICAvLyAqIGlmIHllYXIgaXMgZ2l2ZW4sIGRvbid0IGRlZmF1bHQgYW55dGhpbmdcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDMgJiYgY29uZmlnLl9hW2ldID09IG51bGw7ICsraSkge1xuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSBjdXJyZW50RGF0ZVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFplcm8gb3V0IHdoYXRldmVyIHdhcyBub3QgZGVmYXVsdGVkLCBpbmNsdWRpbmcgdGltZVxuICAgICAgICBmb3IgKDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPVxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9PSBudWxsID8gKGkgPT09IDIgPyAxIDogMCkgOiBjb25maWcuX2FbaV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBmb3IgMjQ6MDA6MDAuMDAwXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNSU5VVEVdID09PSAwICYmXG4gICAgICAgICAgICBjb25maWcuX2FbU0VDT05EXSA9PT0gMCAmJlxuICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbmZpZy5fbmV4dERheSA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLl9kID0gKGNvbmZpZy5fdXNlVVRDID8gY3JlYXRlVVRDRGF0ZSA6IGNyZWF0ZURhdGUpLmFwcGx5KFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIGlucHV0XG4gICAgICAgICk7XG4gICAgICAgIGV4cGVjdGVkV2Vla2RheSA9IGNvbmZpZy5fdXNlVVRDXG4gICAgICAgICAgICA/IGNvbmZpZy5fZC5nZXRVVENEYXkoKVxuICAgICAgICAgICAgOiBjb25maWcuX2QuZ2V0RGF5KCk7XG5cbiAgICAgICAgLy8gQXBwbHkgdGltZXpvbmUgb2Zmc2V0IGZyb20gaW5wdXQuIFRoZSBhY3R1YWwgdXRjT2Zmc2V0IGNhbiBiZSBjaGFuZ2VkXG4gICAgICAgIC8vIHdpdGggcGFyc2Vab25lLlxuICAgICAgICBpZiAoY29uZmlnLl90em0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuX25leHREYXkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDI0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIG1pc21hdGNoaW5nIGRheSBvZiB3ZWVrXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvbmZpZy5fdyAmJlxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZy5fdy5kICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgY29uZmlnLl93LmQgIT09IGV4cGVjdGVkV2Vla2RheVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLndlZWtkYXlNaXNtYXRjaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XG4gICAgICAgIHZhciB3LCB3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3ksIHRlbXAsIHdlZWtkYXlPdmVyZmxvdywgY3VyV2VlaztcblxuICAgICAgICB3ID0gY29uZmlnLl93O1xuICAgICAgICBpZiAody5HRyAhPSBudWxsIHx8IHcuVyAhPSBudWxsIHx8IHcuRSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkb3cgPSAxO1xuICAgICAgICAgICAgZG95ID0gNDtcblxuICAgICAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byB0YWtlIHRoZSBjdXJyZW50IGlzb1dlZWtZZWFyLCBidXQgdGhhdCBkZXBlbmRzIG9uXG4gICAgICAgICAgICAvLyBob3cgd2UgaW50ZXJwcmV0IG5vdyAobG9jYWwsIHV0YywgZml4ZWQgb2Zmc2V0KS4gU28gY3JlYXRlXG4gICAgICAgICAgICAvLyBhIG5vdyB2ZXJzaW9uIG9mIGN1cnJlbnQgY29uZmlnICh0YWtlIGxvY2FsL3V0Yy9vZmZzZXQgZmxhZ3MsIGFuZFxuICAgICAgICAgICAgLy8gY3JlYXRlIG5vdykuXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKFxuICAgICAgICAgICAgICAgIHcuR0csXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW1lFQVJdLFxuICAgICAgICAgICAgICAgIHdlZWtPZlllYXIoY3JlYXRlTG9jYWwoKSwgMSwgNCkueWVhclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LlcsIDEpO1xuICAgICAgICAgICAgd2Vla2RheSA9IGRlZmF1bHRzKHcuRSwgMSk7XG4gICAgICAgICAgICBpZiAod2Vla2RheSA8IDEgfHwgd2Vla2RheSA+IDcpIHtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG93ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG93O1xuICAgICAgICAgICAgZG95ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG95O1xuXG4gICAgICAgICAgICBjdXJXZWVrID0gd2Vla09mWWVhcihjcmVhdGVMb2NhbCgpLCBkb3csIGRveSk7XG5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5nZywgY29uZmlnLl9hW1lFQVJdLCBjdXJXZWVrLnllYXIpO1xuXG4gICAgICAgICAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgd2Vlay5cbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIGN1cldlZWsud2Vlayk7XG5cbiAgICAgICAgICAgIGlmICh3LmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIHdlZWtkYXkgLS0gbG93IGRheSBudW1iZXJzIGFyZSBjb25zaWRlcmVkIG5leHQgd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XG4gICAgICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCAwIHx8IHdlZWtkYXkgPiA2KSB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh3LmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIGxvY2FsIHdlZWtkYXkgLS0gY291bnRpbmcgc3RhcnRzIGZyb20gYmVnaW5uaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5lICsgZG93O1xuICAgICAgICAgICAgICAgIGlmICh3LmUgPCAwIHx8IHcuZSA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5uaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh3ZWVrIDwgMSB8fCB3ZWVrID4gd2Vla3NJblllYXIod2Vla1llYXIsIGRvdywgZG95KSkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla3MgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWtkYXlPdmVyZmxvdyAhPSBudWxsKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrZGF5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlbXAgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtZRUFSXSA9IHRlbXAueWVhcjtcbiAgICAgICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgSVNPIHN0YW5kYXJkXG4gICAgaG9va3MuSVNPXzg2MDEgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIGNvbnN0YW50IHRoYXQgcmVmZXJzIHRvIHRoZSBSRkMgMjgyMiBmb3JtXG4gICAgaG9va3MuUkZDXzI4MjIgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmdcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZykge1xuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xuICAgICAgICBpZiAoY29uZmlnLl9mID09PSBob29rcy5JU09fODYwMSkge1xuICAgICAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IGhvb2tzLlJGQ18yODIyKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy5fYSA9IFtdO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IHRydWU7XG5cbiAgICAgICAgLy8gVGhpcyBhcnJheSBpcyB1c2VkIHRvIG1ha2UgYSBEYXRlLCBlaXRoZXIgd2l0aCBgbmV3IERhdGVgIG9yIGBEYXRlLlVUQ2BcbiAgICAgICAgdmFyIHN0cmluZyA9ICcnICsgY29uZmlnLl9pLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHBhcnNlZElucHV0LFxuICAgICAgICAgICAgdG9rZW5zLFxuICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICBza2lwcGVkLFxuICAgICAgICAgICAgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggPSAwLFxuICAgICAgICAgICAgZXJhLFxuICAgICAgICAgICAgdG9rZW5MZW47XG5cbiAgICAgICAgdG9rZW5zID1cbiAgICAgICAgICAgIGV4cGFuZEZvcm1hdChjb25maWcuX2YsIGNvbmZpZy5fbG9jYWxlKS5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKSB8fCBbXTtcbiAgICAgICAgdG9rZW5MZW4gPSB0b2tlbnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5MZW47IGkrKykge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fFxuICAgICAgICAgICAgICAgIFtdKVswXTtcbiAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHNraXBwZWQgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSk7XG4gICAgICAgICAgICAgICAgaWYgKHNraXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHNraXBwZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSArIHBhcnNlZElucHV0Lmxlbmd0aFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCArPSBwYXJzZWRJbnB1dC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkb24ndCBwYXJzZSBpZiBpdCdzIG5vdCBhIGtub3duIHRva2VuXG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgcGFyc2VkSW5wdXQsIGNvbmZpZyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCByZW1haW5pbmcgdW5wYXJzZWQgaW5wdXQgbGVuZ3RoIHRvIHRoZSBzdHJpbmdcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuY2hhcnNMZWZ0T3ZlciA9XG4gICAgICAgICAgICBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIF8xMmggZmxhZyBpZiBob3VyIGlzIDw9IDEyXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA8PSAxMiAmJlxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5wYXJzZWREYXRlUGFydHMgPSBjb25maWcuX2Euc2xpY2UoMCk7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLm1lcmlkaWVtID0gY29uZmlnLl9tZXJpZGllbTtcbiAgICAgICAgLy8gaGFuZGxlIG1lcmlkaWVtXG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IG1lcmlkaWVtRml4V3JhcChcbiAgICAgICAgICAgIGNvbmZpZy5fbG9jYWxlLFxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdLFxuICAgICAgICAgICAgY29uZmlnLl9tZXJpZGllbVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGhhbmRsZSBlcmFcbiAgICAgICAgZXJhID0gZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZXJhO1xuICAgICAgICBpZiAoZXJhICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbWUVBUl0gPSBjb25maWcuX2xvY2FsZS5lcmFzQ29udmVydFllYXIoZXJhLCBjb25maWcuX2FbWUVBUl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgICAgIGNoZWNrT3ZlcmZsb3coY29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbUZpeFdyYXAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xuICAgICAgICB2YXIgaXNQbTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZS5tZXJpZGllbUhvdXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5tZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZS5pc1BNICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrXG4gICAgICAgICAgICBpc1BtID0gbG9jYWxlLmlzUE0obWVyaWRpZW0pO1xuICAgICAgICAgICAgaWYgKGlzUG0gJiYgaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNQbSAmJiBob3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCBzdXBwb3NlZCB0byBoYXBwZW5cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgYXJyYXkgb2YgZm9ybWF0IHN0cmluZ3NcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIHZhciB0ZW1wQ29uZmlnLFxuICAgICAgICAgICAgYmVzdE1vbWVudCxcbiAgICAgICAgICAgIHNjb3JlVG9CZWF0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSxcbiAgICAgICAgICAgIHZhbGlkRm9ybWF0Rm91bmQsXG4gICAgICAgICAgICBiZXN0Rm9ybWF0SXNWYWxpZCA9IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlnZkxlbiA9IGNvbmZpZy5fZi5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGNvbmZpZ2ZMZW4gPT09IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRGb3JtYXQgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoTmFOKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb25maWdmTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSA9IDA7XG4gICAgICAgICAgICB2YWxpZEZvcm1hdEZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB0ZW1wQ29uZmlnID0gY29weUNvbmZpZyh7fSwgY29uZmlnKTtcbiAgICAgICAgICAgIGlmIChjb25maWcuX3VzZVVUQyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGVtcENvbmZpZy5fdXNlVVRDID0gY29uZmlnLl91c2VVVEM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wQ29uZmlnLl9mID0gY29uZmlnLl9mW2ldO1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdCh0ZW1wQ29uZmlnKTtcblxuICAgICAgICAgICAgaWYgKGlzVmFsaWQodGVtcENvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB2YWxpZEZvcm1hdEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW55IGlucHV0IHRoYXQgd2FzIG5vdCBwYXJzZWQgYWRkIGEgcGVuYWx0eSBmb3IgdGhhdCBmb3JtYXRcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuY2hhcnNMZWZ0T3ZlcjtcblxuICAgICAgICAgICAgLy9vciB0b2tlbnNcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykudW51c2VkVG9rZW5zLmxlbmd0aCAqIDEwO1xuXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuc2NvcmUgPSBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgICAgIGlmICghYmVzdEZvcm1hdElzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNjb3JlIDwgc2NvcmVUb0JlYXQgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRGb3JtYXRGb3VuZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRvQmVhdCA9IGN1cnJlbnRTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZEZvcm1hdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0Rm9ybWF0SXNWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRvQmVhdCA9IGN1cnJlbnRTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSksXG4gICAgICAgICAgICBkYXlPckRhdGUgPSBpLmRheSA9PT0gdW5kZWZpbmVkID8gaS5kYXRlIDogaS5kYXk7XG4gICAgICAgIGNvbmZpZy5fYSA9IG1hcChcbiAgICAgICAgICAgIFtpLnllYXIsIGkubW9udGgsIGRheU9yRGF0ZSwgaS5ob3VyLCBpLm1pbnV0ZSwgaS5zZWNvbmQsIGkubWlsbGlzZWNvbmRdLFxuICAgICAgICAgICAgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogJiYgcGFyc2VJbnQob2JqLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUNvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdmFyIHJlcyA9IG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhwcmVwYXJlQ29uZmlnKGNvbmZpZykpKTtcbiAgICAgICAgaWYgKHJlcy5fbmV4dERheSkge1xuICAgICAgICAgICAgLy8gQWRkaW5nIGlzIHNtYXJ0IGVub3VnaCBhcm91bmQgRFNUXG4gICAgICAgICAgICByZXMuYWRkKDEsICdkJyk7XG4gICAgICAgICAgICByZXMuX25leHREYXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBhcmVDb25maWcoY29uZmlnKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGNvbmZpZy5fZjtcblxuICAgICAgICBjb25maWcuX2xvY2FsZSA9IGNvbmZpZy5fbG9jYWxlIHx8IGdldExvY2FsZShjb25maWcuX2wpO1xuXG4gICAgICAgIGlmIChpbnB1dCA9PT0gbnVsbCB8fCAoZm9ybWF0ID09PSB1bmRlZmluZWQgJiYgaW5wdXQgPT09ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWQoeyBudWxsSW5wdXQ6IHRydWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZmlnLl9pID0gaW5wdXQgPSBjb25maWcuX2xvY2FsZS5wcmVwYXJzZShpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNb21lbnQoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gaW5wdXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkKGNvbmZpZykpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShob29rcy5ub3coKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQudmFsdWVPZigpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nKGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYSA9IG1hcChpbnB1dC5zbGljZSgwKSwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tT2JqZWN0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOdW1iZXIoaW5wdXQpKSB7XG4gICAgICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGlzVVRDKSB7XG4gICAgICAgIHZhciBjID0ge307XG5cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gdHJ1ZSB8fCBmb3JtYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzdHJpY3QgPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9jYWxlID09PSB0cnVlIHx8IGxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHN0cmljdCA9IGxvY2FsZTtcbiAgICAgICAgICAgIGxvY2FsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChpc09iamVjdChpbnB1dCkgJiYgaXNPYmplY3RFbXB0eShpbnB1dCkpIHx8XG4gICAgICAgICAgICAoaXNBcnJheShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID09PSAwKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlucHV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIG9iamVjdCBjb25zdHJ1Y3Rpb24gbXVzdCBiZSBkb25lIHRoaXMgd2F5LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQyM1xuICAgICAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xuICAgICAgICBjLl91c2VVVEMgPSBjLl9pc1VUQyA9IGlzVVRDO1xuICAgICAgICBjLl9sID0gbG9jYWxlO1xuICAgICAgICBjLl9pID0gaW5wdXQ7XG4gICAgICAgIGMuX2YgPSBmb3JtYXQ7XG4gICAgICAgIGMuX3N0cmljdCA9IHN0cmljdDtcblxuICAgICAgICByZXR1cm4gY3JlYXRlRnJvbUNvbmZpZyhjKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhbChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHZhciBwcm90b3R5cGVNaW4gPSBkZXByZWNhdGUoXG4gICAgICAgICAgICAnbW9tZW50KCkubWluIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvbWluLW1heC8nLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPCB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBwcm90b3R5cGVNYXggPSBkZXByZWNhdGUoXG4gICAgICAgICAgICAnbW9tZW50KCkubWF4IGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWluIGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvbWluLW1heC8nLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPiB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgLy8gUGljayBhIG1vbWVudCBtIGZyb20gbW9tZW50cyBzbyB0aGF0IG1bZm5dKG90aGVyKSBpcyB0cnVlIGZvciBhbGxcbiAgICAvLyBvdGhlci4gVGhpcyByZWxpZXMgb24gdGhlIGZ1bmN0aW9uIGZuIHRvIGJlIHRyYW5zaXRpdmUuXG4gICAgLy9cbiAgICAvLyBtb21lbnRzIHNob3VsZCBlaXRoZXIgYmUgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMgb3IgYW4gYXJyYXksIHdob3NlXG4gICAgLy8gZmlyc3QgZWxlbWVudCBpcyBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cy5cbiAgICBmdW5jdGlvbiBwaWNrQnkoZm4sIG1vbWVudHMpIHtcbiAgICAgICAgdmFyIHJlcywgaTtcbiAgICAgICAgaWYgKG1vbWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobW9tZW50c1swXSkpIHtcbiAgICAgICAgICAgIG1vbWVudHMgPSBtb21lbnRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbW9tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVMb2NhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcyA9IG1vbWVudHNbMF07XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBtb21lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoIW1vbWVudHNbaV0uaXNWYWxpZCgpIHx8IG1vbWVudHNbaV1bZm5dKHJlcykpIHtcbiAgICAgICAgICAgICAgICByZXMgPSBtb21lbnRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIFtdLnNvcnQgaW5zdGVhZD9cbiAgICBmdW5jdGlvbiBtaW4oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQmVmb3JlJywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF4KCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0FmdGVyJywgYXJncyk7XG4gICAgfVxuXG4gICAgdmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93ID8gRGF0ZS5ub3coKSA6ICtuZXcgRGF0ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgb3JkZXJpbmcgPSBbXG4gICAgICAgICd5ZWFyJyxcbiAgICAgICAgJ3F1YXJ0ZXInLFxuICAgICAgICAnbW9udGgnLFxuICAgICAgICAnd2VlaycsXG4gICAgICAgICdkYXknLFxuICAgICAgICAnaG91cicsXG4gICAgICAgICdtaW51dGUnLFxuICAgICAgICAnc2Vjb25kJyxcbiAgICAgICAgJ21pbGxpc2Vjb25kJyxcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gaXNEdXJhdGlvblZhbGlkKG0pIHtcbiAgICAgICAgdmFyIGtleSxcbiAgICAgICAgICAgIHVuaXRIYXNEZWNpbWFsID0gZmFsc2UsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgb3JkZXJMZW4gPSBvcmRlcmluZy5sZW5ndGg7XG4gICAgICAgIGZvciAoa2V5IGluIG0pIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBoYXNPd25Qcm9wKG0sIGtleSkgJiZcbiAgICAgICAgICAgICAgICAhKFxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mLmNhbGwob3JkZXJpbmcsIGtleSkgIT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIChtW2tleV0gPT0gbnVsbCB8fCAhaXNOYU4obVtrZXldKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3JkZXJMZW47ICsraSkge1xuICAgICAgICAgICAgaWYgKG1bb3JkZXJpbmdbaV1dKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVuaXRIYXNEZWNpbWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gb25seSBhbGxvdyBub24taW50ZWdlcnMgZm9yIHNtYWxsZXN0IHVuaXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQobVtvcmRlcmluZ1tpXV0pICE9PSB0b0ludChtW29yZGVyaW5nW2ldXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5pdEhhc0RlY2ltYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQkMSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmFsaWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSW52YWxpZCQxKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oTmFOKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBEdXJhdGlvbihkdXJhdGlvbikge1xuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoZHVyYXRpb24pLFxuICAgICAgICAgICAgeWVhcnMgPSBub3JtYWxpemVkSW5wdXQueWVhciB8fCAwLFxuICAgICAgICAgICAgcXVhcnRlcnMgPSBub3JtYWxpemVkSW5wdXQucXVhcnRlciB8fCAwLFxuICAgICAgICAgICAgbW9udGhzID0gbm9ybWFsaXplZElucHV0Lm1vbnRoIHx8IDAsXG4gICAgICAgICAgICB3ZWVrcyA9IG5vcm1hbGl6ZWRJbnB1dC53ZWVrIHx8IG5vcm1hbGl6ZWRJbnB1dC5pc29XZWVrIHx8IDAsXG4gICAgICAgICAgICBkYXlzID0gbm9ybWFsaXplZElucHV0LmRheSB8fCAwLFxuICAgICAgICAgICAgaG91cnMgPSBub3JtYWxpemVkSW5wdXQuaG91ciB8fCAwLFxuICAgICAgICAgICAgbWludXRlcyA9IG5vcm1hbGl6ZWRJbnB1dC5taW51dGUgfHwgMCxcbiAgICAgICAgICAgIHNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQuc2Vjb25kIHx8IDAsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQubWlsbGlzZWNvbmQgfHwgMDtcblxuICAgICAgICB0aGlzLl9pc1ZhbGlkID0gaXNEdXJhdGlvblZhbGlkKG5vcm1hbGl6ZWRJbnB1dCk7XG5cbiAgICAgICAgLy8gcmVwcmVzZW50YXRpb24gZm9yIGRhdGVBZGRSZW1vdmVcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID1cbiAgICAgICAgICAgICttaWxsaXNlY29uZHMgK1xuICAgICAgICAgICAgc2Vjb25kcyAqIDFlMyArIC8vIDEwMDBcbiAgICAgICAgICAgIG1pbnV0ZXMgKiA2ZTQgKyAvLyAxMDAwICogNjBcbiAgICAgICAgICAgIGhvdXJzICogMTAwMCAqIDYwICogNjA7IC8vdXNpbmcgMTAwMCAqIDYwICogNjAgaW5zdGVhZCBvZiAzNmU1IHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9ycyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjk3OFxuICAgICAgICAvLyBCZWNhdXNlIG9mIGRhdGVBZGRSZW1vdmUgdHJlYXRzIDI0IGhvdXJzIGFzIGRpZmZlcmVudCBmcm9tIGFcbiAgICAgICAgLy8gZGF5IHdoZW4gd29ya2luZyBhcm91bmQgRFNULCB3ZSBuZWVkIHRvIHN0b3JlIHRoZW0gc2VwYXJhdGVseVxuICAgICAgICB0aGlzLl9kYXlzID0gK2RheXMgKyB3ZWVrcyAqIDc7XG4gICAgICAgIC8vIEl0IGlzIGltcG9zc2libGUgdG8gdHJhbnNsYXRlIG1vbnRocyBpbnRvIGRheXMgd2l0aG91dCBrbm93aW5nXG4gICAgICAgIC8vIHdoaWNoIG1vbnRocyB5b3UgYXJlIGFyZSB0YWxraW5nIGFib3V0LCBzbyB3ZSBoYXZlIHRvIHN0b3JlXG4gICAgICAgIC8vIGl0IHNlcGFyYXRlbHkuXG4gICAgICAgIHRoaXMuX21vbnRocyA9ICttb250aHMgKyBxdWFydGVycyAqIDMgKyB5ZWFycyAqIDEyO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcblxuICAgICAgICB0aGlzLl9sb2NhbGUgPSBnZXRMb2NhbGUoKTtcblxuICAgICAgICB0aGlzLl9idWJibGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0R1cmF0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRHVyYXRpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWJzUm91bmQobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgtMSAqIG51bWJlcikgKiAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb21wYXJlIHR3byBhcnJheXMsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRpZmZlcmVuY2VzXG4gICAgZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhcnJheTEsIGFycmF5MiwgZG9udENvbnZlcnQpIHtcbiAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgpLFxuICAgICAgICAgICAgbGVuZ3RoRGlmZiA9IE1hdGguYWJzKGFycmF5MS5sZW5ndGggLSBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgICAgIGRpZmZzID0gMCxcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChkb250Q29udmVydCAmJiBhcnJheTFbaV0gIT09IGFycmF5MltpXSkgfHxcbiAgICAgICAgICAgICAgICAoIWRvbnRDb252ZXJ0ICYmIHRvSW50KGFycmF5MVtpXSkgIT09IHRvSW50KGFycmF5MltpXSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBkaWZmcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaWZmcyArIGxlbmd0aERpZmY7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgZnVuY3Rpb24gb2Zmc2V0KHRva2VuLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnV0Y09mZnNldCgpLFxuICAgICAgICAgICAgICAgIHNpZ24gPSAnKyc7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgICAgICAgICAgc2lnbiA9ICctJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgc2lnbiArXG4gICAgICAgICAgICAgICAgemVyb0ZpbGwofn4ob2Zmc2V0IC8gNjApLCAyKSArXG4gICAgICAgICAgICAgICAgc2VwYXJhdG9yICtcbiAgICAgICAgICAgICAgICB6ZXJvRmlsbCh+fm9mZnNldCAlIDYwLCAyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb2Zmc2V0KCdaJywgJzonKTtcbiAgICBvZmZzZXQoJ1paJywgJycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignWicsIG1hdGNoU2hvcnRPZmZzZXQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1paJywgbWF0Y2hTaG9ydE9mZnNldCk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ1onLCAnWlonXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fdXNlVVRDID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnLl90em0gPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIHRpbWV6b25lIGNodW5rZXJcbiAgICAvLyAnKzEwOjAwJyA+IFsnMTAnLCAgJzAwJ11cbiAgICAvLyAnLTE1MzAnICA+IFsnLTE1JywgJzMwJ11cbiAgICB2YXIgY2h1bmtPZmZzZXQgPSAvKFtcXCtcXC1dfFxcZFxcZCkvZ2k7XG5cbiAgICBmdW5jdGlvbiBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoZXIsIHN0cmluZykge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IChzdHJpbmcgfHwgJycpLm1hdGNoKG1hdGNoZXIpLFxuICAgICAgICAgICAgY2h1bmssXG4gICAgICAgICAgICBwYXJ0cyxcbiAgICAgICAgICAgIG1pbnV0ZXM7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY2h1bmsgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgICAgIHBhcnRzID0gKGNodW5rICsgJycpLm1hdGNoKGNodW5rT2Zmc2V0KSB8fCBbJy0nLCAwLCAwXTtcbiAgICAgICAgbWludXRlcyA9ICsocGFydHNbMV0gKiA2MCkgKyB0b0ludChwYXJ0c1syXSk7XG5cbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMgPT09IDAgPyAwIDogcGFydHNbMF0gPT09ICcrJyA/IG1pbnV0ZXMgOiAtbWludXRlcztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBtb21lbnQgZnJvbSBpbnB1dCwgdGhhdCBpcyBsb2NhbC91dGMvem9uZSBlcXVpdmFsZW50IHRvIG1vZGVsLlxuICAgIGZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcbiAgICAgICAgdmFyIHJlcywgZGlmZjtcbiAgICAgICAgaWYgKG1vZGVsLl9pc1VUQykge1xuICAgICAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcbiAgICAgICAgICAgIGRpZmYgPVxuICAgICAgICAgICAgICAgIChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KVxuICAgICAgICAgICAgICAgICAgICA/IGlucHV0LnZhbHVlT2YoKVxuICAgICAgICAgICAgICAgICAgICA6IGNyZWF0ZUxvY2FsKGlucHV0KS52YWx1ZU9mKCkpIC0gcmVzLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIC8vIFVzZSBsb3ctbGV2ZWwgYXBpLCBiZWNhdXNlIHRoaXMgZm4gaXMgbG93LWxldmVsIGFwaS5cbiAgICAgICAgICAgIHJlcy5fZC5zZXRUaW1lKHJlcy5fZC52YWx1ZU9mKCkgKyBkaWZmKTtcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlT2Zmc2V0KG0pIHtcbiAgICAgICAgLy8gT24gRmlyZWZveC4yNCBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgYSBmbG9hdGluZyBwb2ludC5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvcHVsbC8xODcxXG4gICAgICAgIHJldHVybiAtTWF0aC5yb3VuZChtLl9kLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xuICAgIH1cblxuICAgIC8vIEhPT0tTXG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIGEgbW9tZW50IGlzIG11dGF0ZWQuXG4gICAgLy8gSXQgaXMgaW50ZW5kZWQgdG8ga2VlcCB0aGUgb2Zmc2V0IGluIHN5bmMgd2l0aCB0aGUgdGltZXpvbmUuXG4gICAgaG9va3MudXBkYXRlT2Zmc2V0ID0gZnVuY3Rpb24gKCkge307XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICAvLyBrZWVwTG9jYWxUaW1lID0gdHJ1ZSBtZWFucyBvbmx5IGNoYW5nZSB0aGUgdGltZXpvbmUsIHdpdGhvdXRcbiAgICAvLyBhZmZlY3RpbmcgdGhlIGxvY2FsIGhvdXIuIFNvIDU6MzE6MjYgKzAzMDAgLS1bdXRjT2Zmc2V0KDIsIHRydWUpXS0tPlxuICAgIC8vIDU6MzE6MjYgKzAyMDAgSXQgaXMgcG9zc2libGUgdGhhdCA1OjMxOjI2IGRvZXNuJ3QgZXhpc3Qgd2l0aCBvZmZzZXRcbiAgICAvLyArMDIwMCwgc28gd2UgYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCwgdG8gYmUgdmFsaWQuXG4gICAgLy9cbiAgICAvLyBLZWVwaW5nIHRoZSB0aW1lIGFjdHVhbGx5IGFkZHMvc3VidHJhY3RzIChvbmUgaG91cilcbiAgICAvLyBmcm9tIHRoZSBhY3R1YWwgcmVwcmVzZW50ZWQgdGltZS4gVGhhdCBpcyB3aHkgd2UgY2FsbCB1cGRhdGVPZmZzZXRcbiAgICAvLyBhIHNlY29uZCB0aW1lLiBJbiBjYXNlIGl0IHdhbnRzIHVzIHRvIGNoYW5nZSB0aGUgb2Zmc2V0IGFnYWluXG4gICAgLy8gX2NoYW5nZUluUHJvZ3Jlc3MgPT0gdHJ1ZSBjYXNlLCB0aGVuIHdlIGhhdmUgdG8gYWRqdXN0LCBiZWNhdXNlXG4gICAgLy8gdGhlcmUgaXMgbm8gc3VjaCB0aW1lIGluIHRoZSBnaXZlbiB0aW1lem9uZS5cbiAgICBmdW5jdGlvbiBnZXRTZXRPZmZzZXQoaW5wdXQsIGtlZXBMb2NhbFRpbWUsIGtlZXBNaW51dGVzKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgMCxcbiAgICAgICAgICAgIGxvY2FsQWRqdXN0O1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhpbnB1dCkgPCAxNiAmJiAha2VlcE1pbnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0ICogNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzVVRDICYmIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEFkanVzdCA9IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBpbnB1dDtcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChsb2NhbEFkanVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobG9jYWxBZGp1c3QsICdtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmICgha2VlcExvY2FsVGltZSB8fCB0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFN1YnRyYWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUR1cmF0aW9uKGlucHV0IC0gb2Zmc2V0LCAnbScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/IG9mZnNldCA6IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRab25lKGlucHV0LCBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gLWlucHV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldChpbnB1dCwga2VlcExvY2FsVGltZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC10aGlzLnV0Y09mZnNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9VVEMoa2VlcExvY2FsVGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9Mb2NhbChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VidHJhY3QoZ2V0RGF0ZU9mZnNldCh0aGlzKSwgJ20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3R6bSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCh0aGlzLl90em0sIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5faSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciB0Wm9uZSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hPZmZzZXQsIHRoaXMuX2kpO1xuICAgICAgICAgICAgaWYgKHRab25lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnV0Y09mZnNldCh0Wm9uZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc0FsaWduZWRIb3VyT2Zmc2V0KGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dCA9IGlucHV0ID8gY3JlYXRlTG9jYWwoaW5wdXQpLnV0Y09mZnNldCgpIDogMDtcblxuICAgICAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgLSBpbnB1dCkgJSA2MCA9PT0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoMCkudXRjT2Zmc2V0KCkgfHxcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoNSkudXRjT2Zmc2V0KClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQoKSB7XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5faXNEU1RTaGlmdGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0ge30sXG4gICAgICAgICAgICBvdGhlcjtcblxuICAgICAgICBjb3B5Q29uZmlnKGMsIHRoaXMpO1xuICAgICAgICBjID0gcHJlcGFyZUNvbmZpZyhjKTtcblxuICAgICAgICBpZiAoYy5fYSkge1xuICAgICAgICAgICAgb3RoZXIgPSBjLl9pc1VUQyA/IGNyZWF0ZVVUQyhjLl9hKSA6IGNyZWF0ZUxvY2FsKGMuX2EpO1xuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID1cbiAgICAgICAgICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiBjb21wYXJlQXJyYXlzKGMuX2EsIG90aGVyLnRvQXJyYXkoKSkgPiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTG9jYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/ICF0aGlzLl9pc1VUQyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVXRjT2Zmc2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVXRjKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDAgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBU1AuTkVUIGpzb24gZGF0ZSBmb3JtYXQgcmVnZXhcbiAgICB2YXIgYXNwTmV0UmVnZXggPSAvXigtfFxcKyk/KD86KFxcZCopWy4gXSk/KFxcZCspOihcXGQrKSg/OjooXFxkKykoXFwuXFxkKik/KT8kLyxcbiAgICAgICAgLy8gZnJvbSBodHRwOi8vZG9jcy5jbG9zdXJlLWxpYnJhcnkuZ29vZ2xlY29kZS5jb20vZ2l0L2Nsb3N1cmVfZ29vZ19kYXRlX2RhdGUuanMuc291cmNlLmh0bWxcbiAgICAgICAgLy8gc29tZXdoYXQgbW9yZSBpbiBsaW5lIHdpdGggNC40LjMuMiAyMDA0IHNwZWMsIGJ1dCBhbGxvd3MgZGVjaW1hbCBhbnl3aGVyZVxuICAgICAgICAvLyBhbmQgZnVydGhlciBtb2RpZmllZCB0byBhbGxvdyBmb3Igc3RyaW5ncyBjb250YWluaW5nIGJvdGggd2VlayBhbmQgZGF5XG4gICAgICAgIGlzb1JlZ2V4ID1cbiAgICAgICAgICAgIC9eKC18XFwrKT9QKD86KFstK10/WzAtOSwuXSopWSk/KD86KFstK10/WzAtOSwuXSopTSk/KD86KFstK10/WzAtOSwuXSopVyk/KD86KFstK10/WzAtOSwuXSopRCk/KD86VCg/OihbLStdP1swLTksLl0qKUgpPyg/OihbLStdP1swLTksLl0qKU0pPyg/OihbLStdP1swLTksLl0qKVMpPyk/JC87XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVEdXJhdGlvbihpbnB1dCwga2V5KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGlucHV0LFxuICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYWdhaW5zdCByZWdleHAgaXMgZXhwZW5zaXZlLCBkbyBpdCBvbiBkZW1hbmRcbiAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgICAgIHNpZ24sXG4gICAgICAgICAgICByZXQsXG4gICAgICAgICAgICBkaWZmUmVzO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbXM6IGlucHV0Ll9taWxsaXNlY29uZHMsXG4gICAgICAgICAgICAgICAgZDogaW5wdXQuX2RheXMsXG4gICAgICAgICAgICAgICAgTTogaW5wdXQuX21vbnRocyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOdW1iZXIoaW5wdXQpIHx8ICFpc05hTigraW5wdXQpKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uW2tleV0gPSAraW5wdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9ICtpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgobWF0Y2ggPSBhc3BOZXRSZWdleC5leGVjKGlucHV0KSkpIHtcbiAgICAgICAgICAgIHNpZ24gPSBtYXRjaFsxXSA9PT0gJy0nID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICBkOiB0b0ludChtYXRjaFtEQVRFXSkgKiBzaWduLFxuICAgICAgICAgICAgICAgIGg6IHRvSW50KG1hdGNoW0hPVVJdKSAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbTogdG9JbnQobWF0Y2hbTUlOVVRFXSkgKiBzaWduLFxuICAgICAgICAgICAgICAgIHM6IHRvSW50KG1hdGNoW1NFQ09ORF0pICogc2lnbixcbiAgICAgICAgICAgICAgICBtczogdG9JbnQoYWJzUm91bmQobWF0Y2hbTUlMTElTRUNPTkRdICogMTAwMCkpICogc2lnbiwgLy8gdGhlIG1pbGxpc2Vjb25kIGRlY2ltYWwgcG9pbnQgaXMgaW5jbHVkZWQgaW4gdGhlIG1hdGNoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKChtYXRjaCA9IGlzb1JlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IG1hdGNoWzFdID09PSAnLScgPyAtMSA6IDE7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB5OiBwYXJzZUlzbyhtYXRjaFsyXSwgc2lnbiksXG4gICAgICAgICAgICAgICAgTTogcGFyc2VJc28obWF0Y2hbM10sIHNpZ24pLFxuICAgICAgICAgICAgICAgIHc6IHBhcnNlSXNvKG1hdGNoWzRdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBkOiBwYXJzZUlzbyhtYXRjaFs1XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgaDogcGFyc2VJc28obWF0Y2hbNl0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIG06IHBhcnNlSXNvKG1hdGNoWzddLCBzaWduKSxcbiAgICAgICAgICAgICAgICBzOiBwYXJzZUlzbyhtYXRjaFs4XSwgc2lnbiksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgZHVyYXRpb24gPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAoJ2Zyb20nIGluIGR1cmF0aW9uIHx8ICd0bycgaW4gZHVyYXRpb24pXG4gICAgICAgICkge1xuICAgICAgICAgICAgZGlmZlJlcyA9IG1vbWVudHNEaWZmZXJlbmNlKFxuICAgICAgICAgICAgICAgIGNyZWF0ZUxvY2FsKGR1cmF0aW9uLmZyb20pLFxuICAgICAgICAgICAgICAgIGNyZWF0ZUxvY2FsKGR1cmF0aW9uLnRvKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGR1cmF0aW9uLm1zID0gZGlmZlJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICBkdXJhdGlvbi5NID0gZGlmZlJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSAmJiBoYXNPd25Qcm9wKGlucHV0LCAnX2xvY2FsZScpKSB7XG4gICAgICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19pc1ZhbGlkJykpIHtcbiAgICAgICAgICAgIHJldC5faXNWYWxpZCA9IGlucHV0Ll9pc1ZhbGlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBjcmVhdGVEdXJhdGlvbi5mbiA9IER1cmF0aW9uLnByb3RvdHlwZTtcbiAgICBjcmVhdGVEdXJhdGlvbi5pbnZhbGlkID0gY3JlYXRlSW52YWxpZCQxO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VJc28oaW5wLCBzaWduKSB7XG4gICAgICAgIC8vIFdlJ2Qgbm9ybWFsbHkgdXNlIH5+aW5wIGZvciB0aGlzLCBidXQgdW5mb3J0dW5hdGVseSBpdCBhbHNvXG4gICAgICAgIC8vIGNvbnZlcnRzIGZsb2F0cyB0byBpbnRzLlxuICAgICAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXG4gICAgICAgIHZhciByZXMgPSBpbnAgJiYgcGFyc2VGbG9hdChpbnAucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAvLyBhcHBseSBzaWduIHdoaWxlIHdlJ3JlIGF0IGl0XG4gICAgICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgICAgIHZhciByZXMgPSB7fTtcblxuICAgICAgICByZXMubW9udGhzID1cbiAgICAgICAgICAgIG90aGVyLm1vbnRoKCkgLSBiYXNlLm1vbnRoKCkgKyAob3RoZXIueWVhcigpIC0gYmFzZS55ZWFyKCkpICogMTI7XG4gICAgICAgIGlmIChiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykuaXNBZnRlcihvdGhlcikpIHtcbiAgICAgICAgICAgIC0tcmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSArb3RoZXIgLSArYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpO1xuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKCEoYmFzZS5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcbiAgICAgICAgaWYgKGJhc2UuaXNCZWZvcmUob3RoZXIpKSB7XG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2Uob3RoZXIsIGJhc2UpO1xuICAgICAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9IC1yZXMubWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiByZW1vdmUgJ25hbWUnIGFyZyBhZnRlciBkZXByZWNhdGlvbiBpcyByZW1vdmVkXG4gICAgZnVuY3Rpb24gY3JlYXRlQWRkZXIoZGlyZWN0aW9uLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBwZXJpb2QpIHtcbiAgICAgICAgICAgIHZhciBkdXIsIHRtcDtcbiAgICAgICAgICAgIC8vaW52ZXJ0IHRoZSBhcmd1bWVudHMsIGJ1dCBjb21wbGFpbiBhYm91dCBpdFxuICAgICAgICAgICAgaWYgKHBlcmlvZCAhPT0gbnVsbCAmJiAhaXNOYU4oK3BlcmlvZCkpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoXG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdtb21lbnQoKS4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyhwZXJpb2QsIG51bWJlcikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBtb21lbnQoKS4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyhudW1iZXIsIHBlcmlvZCkuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1NlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2FkZC1pbnZlcnRlZC1wYXJhbS8gZm9yIG1vcmUgaW5mby4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0bXAgPSB2YWw7XG4gICAgICAgICAgICAgICAgdmFsID0gcGVyaW9kO1xuICAgICAgICAgICAgICAgIHBlcmlvZCA9IHRtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZHVyID0gY3JlYXRlRHVyYXRpb24odmFsLCBwZXJpb2QpO1xuICAgICAgICAgICAgYWRkU3VidHJhY3QodGhpcywgZHVyLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3VidHJhY3QobW9tLCBkdXJhdGlvbiwgaXNBZGRpbmcsIHVwZGF0ZU9mZnNldCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIGRheXMgPSBhYnNSb3VuZChkdXJhdGlvbi5fZGF5cyksXG4gICAgICAgICAgICBtb250aHMgPSBhYnNSb3VuZChkdXJhdGlvbi5fbW9udGhzKTtcblxuICAgICAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIC8vIE5vIG9wXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVPZmZzZXQgPSB1cGRhdGVPZmZzZXQgPT0gbnVsbCA/IHRydWUgOiB1cGRhdGVPZmZzZXQ7XG5cbiAgICAgICAgaWYgKG1vbnRocykge1xuICAgICAgICAgICAgc2V0TW9udGgobW9tLCBnZXQobW9tLCAnTW9udGgnKSArIG1vbnRocyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgc2V0JDEobW9tLCAnRGF0ZScsIGdldChtb20sICdEYXRlJykgKyBkYXlzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgICAgIG1vbS5fZC5zZXRUaW1lKG1vbS5fZC52YWx1ZU9mKCkgKyBtaWxsaXNlY29uZHMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZU9mZnNldCkge1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KG1vbSwgZGF5cyB8fCBtb250aHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFkZCA9IGNyZWF0ZUFkZGVyKDEsICdhZGQnKSxcbiAgICAgICAgc3VidHJhY3QgPSBjcmVhdGVBZGRlcigtMSwgJ3N1YnRyYWN0Jyk7XG5cbiAgICBmdW5jdGlvbiBpc1N0cmluZyhpbnB1dCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyB8fCBpbnB1dCBpbnN0YW5jZW9mIFN0cmluZztcbiAgICB9XG5cbiAgICAvLyB0eXBlIE1vbWVudElucHV0ID0gTW9tZW50IHwgRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IChudW1iZXIgfCBzdHJpbmcpW10gfCBNb21lbnRJbnB1dE9iamVjdCB8IHZvaWQ7IC8vIG51bGwgfCB1bmRlZmluZWRcbiAgICBmdW5jdGlvbiBpc01vbWVudElucHV0KGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpc01vbWVudChpbnB1dCkgfHxcbiAgICAgICAgICAgIGlzRGF0ZShpbnB1dCkgfHxcbiAgICAgICAgICAgIGlzU3RyaW5nKGlucHV0KSB8fFxuICAgICAgICAgICAgaXNOdW1iZXIoaW5wdXQpIHx8XG4gICAgICAgICAgICBpc051bWJlck9yU3RyaW5nQXJyYXkoaW5wdXQpIHx8XG4gICAgICAgICAgICBpc01vbWVudElucHV0T2JqZWN0KGlucHV0KSB8fFxuICAgICAgICAgICAgaW5wdXQgPT09IG51bGwgfHxcbiAgICAgICAgICAgIGlucHV0ID09PSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc01vbWVudElucHV0T2JqZWN0KGlucHV0KSB7XG4gICAgICAgIHZhciBvYmplY3RUZXN0ID0gaXNPYmplY3QoaW5wdXQpICYmICFpc09iamVjdEVtcHR5KGlucHV0KSxcbiAgICAgICAgICAgIHByb3BlcnR5VGVzdCA9IGZhbHNlLFxuICAgICAgICAgICAgcHJvcGVydGllcyA9IFtcbiAgICAgICAgICAgICAgICAneWVhcnMnLFxuICAgICAgICAgICAgICAgICd5ZWFyJyxcbiAgICAgICAgICAgICAgICAneScsXG4gICAgICAgICAgICAgICAgJ21vbnRocycsXG4gICAgICAgICAgICAgICAgJ21vbnRoJyxcbiAgICAgICAgICAgICAgICAnTScsXG4gICAgICAgICAgICAgICAgJ2RheXMnLFxuICAgICAgICAgICAgICAgICdkYXknLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnZGF0ZXMnLFxuICAgICAgICAgICAgICAgICdkYXRlJyxcbiAgICAgICAgICAgICAgICAnRCcsXG4gICAgICAgICAgICAgICAgJ2hvdXJzJyxcbiAgICAgICAgICAgICAgICAnaG91cicsXG4gICAgICAgICAgICAgICAgJ2gnLFxuICAgICAgICAgICAgICAgICdtaW51dGVzJyxcbiAgICAgICAgICAgICAgICAnbWludXRlJyxcbiAgICAgICAgICAgICAgICAnbScsXG4gICAgICAgICAgICAgICAgJ3NlY29uZHMnLFxuICAgICAgICAgICAgICAgICdzZWNvbmQnLFxuICAgICAgICAgICAgICAgICdzJyxcbiAgICAgICAgICAgICAgICAnbWlsbGlzZWNvbmRzJyxcbiAgICAgICAgICAgICAgICAnbWlsbGlzZWNvbmQnLFxuICAgICAgICAgICAgICAgICdtcycsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgcHJvcGVydHlMZW4gPSBwcm9wZXJ0aWVzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJvcGVydHlMZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgcHJvcGVydHlUZXN0ID0gcHJvcGVydHlUZXN0IHx8IGhhc093blByb3AoaW5wdXQsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3RUZXN0ICYmIHByb3BlcnR5VGVzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc051bWJlck9yU3RyaW5nQXJyYXkoaW5wdXQpIHtcbiAgICAgICAgdmFyIGFycmF5VGVzdCA9IGlzQXJyYXkoaW5wdXQpLFxuICAgICAgICAgICAgZGF0YVR5cGVUZXN0ID0gZmFsc2U7XG4gICAgICAgIGlmIChhcnJheVRlc3QpIHtcbiAgICAgICAgICAgIGRhdGFUeXBlVGVzdCA9XG4gICAgICAgICAgICAgICAgaW5wdXQuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNOdW1iZXIoaXRlbSkgJiYgaXNTdHJpbmcoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXlUZXN0ICYmIGRhdGFUeXBlVGVzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0NhbGVuZGFyU3BlYyhpbnB1dCkge1xuICAgICAgICB2YXIgb2JqZWN0VGVzdCA9IGlzT2JqZWN0KGlucHV0KSAmJiAhaXNPYmplY3RFbXB0eShpbnB1dCksXG4gICAgICAgICAgICBwcm9wZXJ0eVRlc3QgPSBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBbXG4gICAgICAgICAgICAgICAgJ3NhbWVEYXknLFxuICAgICAgICAgICAgICAgICduZXh0RGF5JyxcbiAgICAgICAgICAgICAgICAnbGFzdERheScsXG4gICAgICAgICAgICAgICAgJ25leHRXZWVrJyxcbiAgICAgICAgICAgICAgICAnbGFzdFdlZWsnLFxuICAgICAgICAgICAgICAgICdzYW1lRWxzZScsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHByb3BlcnR5O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICBwcm9wZXJ0eVRlc3QgPSBwcm9wZXJ0eVRlc3QgfHwgaGFzT3duUHJvcChpbnB1dCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdFRlc3QgJiYgcHJvcGVydHlUZXN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENhbGVuZGFyRm9ybWF0KG15TW9tZW50LCBub3cpIHtcbiAgICAgICAgdmFyIGRpZmYgPSBteU1vbWVudC5kaWZmKG5vdywgJ2RheXMnLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGRpZmYgPCAtNlxuICAgICAgICAgICAgPyAnc2FtZUVsc2UnXG4gICAgICAgICAgICA6IGRpZmYgPCAtMVxuICAgICAgICAgICAgPyAnbGFzdFdlZWsnXG4gICAgICAgICAgICA6IGRpZmYgPCAwXG4gICAgICAgICAgICA/ICdsYXN0RGF5J1xuICAgICAgICAgICAgOiBkaWZmIDwgMVxuICAgICAgICAgICAgPyAnc2FtZURheSdcbiAgICAgICAgICAgIDogZGlmZiA8IDJcbiAgICAgICAgICAgID8gJ25leHREYXknXG4gICAgICAgICAgICA6IGRpZmYgPCA3XG4gICAgICAgICAgICA/ICduZXh0V2VlaydcbiAgICAgICAgICAgIDogJ3NhbWVFbHNlJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxlbmRhciQxKHRpbWUsIGZvcm1hdHMpIHtcbiAgICAgICAgLy8gU3VwcG9ydCBmb3Igc2luZ2xlIHBhcmFtZXRlciwgZm9ybWF0cyBvbmx5IG92ZXJsb2FkIHRvIHRoZSBjYWxlbmRhciBmdW5jdGlvblxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcbiAgICAgICAgICAgICAgICB0aW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGZvcm1hdHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzTW9tZW50SW5wdXQoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRpbWUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgZm9ybWF0cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDYWxlbmRhclNwZWMoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHMgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgdGltZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBXZSB3YW50IHRvIGNvbXBhcmUgdGhlIHN0YXJ0IG9mIHRvZGF5LCB2cyB0aGlzLlxuICAgICAgICAvLyBHZXR0aW5nIHN0YXJ0LW9mLXRvZGF5IGRlcGVuZHMgb24gd2hldGhlciB3ZSdyZSBsb2NhbC91dGMvb2Zmc2V0IG9yIG5vdC5cbiAgICAgICAgdmFyIG5vdyA9IHRpbWUgfHwgY3JlYXRlTG9jYWwoKSxcbiAgICAgICAgICAgIHNvZCA9IGNsb25lV2l0aE9mZnNldChub3csIHRoaXMpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICAgICAgZm9ybWF0ID0gaG9va3MuY2FsZW5kYXJGb3JtYXQodGhpcywgc29kKSB8fCAnc2FtZUVsc2UnLFxuICAgICAgICAgICAgb3V0cHV0ID1cbiAgICAgICAgICAgICAgICBmb3JtYXRzICYmXG4gICAgICAgICAgICAgICAgKGlzRnVuY3Rpb24oZm9ybWF0c1tmb3JtYXRdKVxuICAgICAgICAgICAgICAgICAgICA/IGZvcm1hdHNbZm9ybWF0XS5jYWxsKHRoaXMsIG5vdylcbiAgICAgICAgICAgICAgICAgICAgOiBmb3JtYXRzW2Zvcm1hdF0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChcbiAgICAgICAgICAgIG91dHB1dCB8fCB0aGlzLmxvY2FsZURhdGEoKS5jYWxlbmRhcihmb3JtYXQsIHRoaXMsIGNyZWF0ZUxvY2FsKG5vdykpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTW9tZW50KHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQWZ0ZXIoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpIHx8ICdtaWxsaXNlY29uZCc7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID4gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxJbnB1dC52YWx1ZU9mKCkgPCB0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykudmFsdWVPZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCZWZvcmUoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpIHx8ICdtaWxsaXNlY29uZCc7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpIDwgbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKCkgPCBsb2NhbElucHV0LnZhbHVlT2YoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQmV0d2Vlbihmcm9tLCB0bywgdW5pdHMsIGluY2x1c2l2aXR5KSB7XG4gICAgICAgIHZhciBsb2NhbEZyb20gPSBpc01vbWVudChmcm9tKSA/IGZyb20gOiBjcmVhdGVMb2NhbChmcm9tKSxcbiAgICAgICAgICAgIGxvY2FsVG8gPSBpc01vbWVudCh0bykgPyB0byA6IGNyZWF0ZUxvY2FsKHRvKTtcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxGcm9tLmlzVmFsaWQoKSAmJiBsb2NhbFRvLmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpbmNsdXNpdml0eSA9IGluY2x1c2l2aXR5IHx8ICcoKSc7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoaW5jbHVzaXZpdHlbMF0gPT09ICcoJ1xuICAgICAgICAgICAgICAgID8gdGhpcy5pc0FmdGVyKGxvY2FsRnJvbSwgdW5pdHMpXG4gICAgICAgICAgICAgICAgOiAhdGhpcy5pc0JlZm9yZShsb2NhbEZyb20sIHVuaXRzKSkgJiZcbiAgICAgICAgICAgIChpbmNsdXNpdml0eVsxXSA9PT0gJyknXG4gICAgICAgICAgICAgICAgPyB0aGlzLmlzQmVmb3JlKGxvY2FsVG8sIHVuaXRzKVxuICAgICAgICAgICAgICAgIDogIXRoaXMuaXNBZnRlcihsb2NhbFRvLCB1bml0cykpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpLFxuICAgICAgICAgICAgaW5wdXRNcztcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cykgfHwgJ21pbGxpc2Vjb25kJztcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPT09IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRNcyA9IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICB0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykudmFsdWVPZigpIDw9IGlucHV0TXMgJiZcbiAgICAgICAgICAgICAgICBpbnB1dE1zIDw9IHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JBZnRlcihpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0FmdGVyKGlucHV0LCB1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JCZWZvcmUoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2FtZShpbnB1dCwgdW5pdHMpIHx8IHRoaXMuaXNCZWZvcmUoaW5wdXQsIHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWZmKGlucHV0LCB1bml0cywgYXNGbG9hdCkge1xuICAgICAgICB2YXIgdGhhdCwgem9uZURlbHRhLCBvdXRwdXQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQgPSBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIHRoaXMpO1xuXG4gICAgICAgIGlmICghdGhhdC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICB6b25lRGVsdGEgPSAodGhhdC51dGNPZmZzZXQoKSAtIHRoaXMudXRjT2Zmc2V0KCkpICogNmU0O1xuXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KSAvIDEyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KSAvIDM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9ICh0aGlzIC0gdGhhdCkgLyAxZTM7XG4gICAgICAgICAgICAgICAgYnJlYWs7IC8vIDEwMDBcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDZlNDtcbiAgICAgICAgICAgICAgICBicmVhazsgLy8gMTAwMCAqIDYwXG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodGhpcyAtIHRoYXQpIC8gMzZlNTtcbiAgICAgICAgICAgICAgICBicmVhazsgLy8gMTAwMCAqIDYwICogNjBcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRoaXMgLSB0aGF0IC0gem9uZURlbHRhKSAvIDg2NGU1O1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodGhpcyAtIHRoYXQgLSB6b25lRGVsdGEpIC8gNjA0OGU1O1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MCAqIDI0ICogNywgbmVnYXRlIGRzdFxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSB0aGlzIC0gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc0Zsb2F0ID8gb3V0cHV0IDogYWJzRmxvb3Iob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aERpZmYoYSwgYikge1xuICAgICAgICBpZiAoYS5kYXRlKCkgPCBiLmRhdGUoKSkge1xuICAgICAgICAgICAgLy8gZW5kLW9mLW1vbnRoIGNhbGN1bGF0aW9ucyB3b3JrIGNvcnJlY3Qgd2hlbiB0aGUgc3RhcnQgbW9udGggaGFzIG1vcmVcbiAgICAgICAgICAgIC8vIGRheXMgdGhhbiB0aGUgZW5kIG1vbnRoLlxuICAgICAgICAgICAgcmV0dXJuIC1tb250aERpZmYoYiwgYSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGlmZmVyZW5jZSBpbiBtb250aHNcbiAgICAgICAgdmFyIHdob2xlTW9udGhEaWZmID0gKGIueWVhcigpIC0gYS55ZWFyKCkpICogMTIgKyAoYi5tb250aCgpIC0gYS5tb250aCgpKSxcbiAgICAgICAgICAgIC8vIGIgaXMgaW4gKGFuY2hvciAtIDEgbW9udGgsIGFuY2hvciArIDEgbW9udGgpXG4gICAgICAgICAgICBhbmNob3IgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmLCAnbW9udGhzJyksXG4gICAgICAgICAgICBhbmNob3IyLFxuICAgICAgICAgICAgYWRqdXN0O1xuXG4gICAgICAgIGlmIChiIC0gYW5jaG9yIDwgMCkge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvciAtIGFuY2hvcjIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgKyAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jaGVjayBmb3IgbmVnYXRpdmUgemVybywgcmV0dXJuIHplcm8gaWYgbmVnYXRpdmUgemVyb1xuICAgICAgICByZXR1cm4gLSh3aG9sZU1vbnRoRGlmZiArIGFkanVzdCkgfHwgMDtcbiAgICB9XG5cbiAgICBob29rcy5kZWZhdWx0Rm9ybWF0ID0gJ1lZWVktTU0tRERUSEg6bW06c3NaJztcbiAgICBob29rcy5kZWZhdWx0Rm9ybWF0VXRjID0gJ1lZWVktTU0tRERUSEg6bW06c3NbWl0nO1xuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkubG9jYWxlKCdlbicpLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0lTT1N0cmluZyhrZWVwT2Zmc2V0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1dGMgPSBrZWVwT2Zmc2V0ICE9PSB0cnVlLFxuICAgICAgICAgICAgbSA9IHV0YyA/IHRoaXMuY2xvbmUoKS51dGMoKSA6IHRoaXM7XG4gICAgICAgIGlmIChtLnllYXIoKSA8IDAgfHwgbS55ZWFyKCkgPiA5OTk5KSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KFxuICAgICAgICAgICAgICAgIG0sXG4gICAgICAgICAgICAgICAgdXRjXG4gICAgICAgICAgICAgICAgICAgID8gJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXSdcbiAgICAgICAgICAgICAgICAgICAgOiAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTWidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcpKSB7XG4gICAgICAgICAgICAvLyBuYXRpdmUgaW1wbGVtZW50YXRpb24gaXMgfjUweCBmYXN0ZXIsIHVzZSBpdCB3aGVuIHdlIGNhblxuICAgICAgICAgICAgaWYgKHV0Yykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSArIHRoaXMudXRjT2Zmc2V0KCkgKiA2MCAqIDEwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCdaJywgZm9ybWF0TW9tZW50KG0sICdaJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQoXG4gICAgICAgICAgICBtLFxuICAgICAgICAgICAgdXRjID8gJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nIDogJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NaJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGh1bWFuIHJlYWRhYmxlIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9tZW50IHRoYXQgY2FuXG4gICAgICogYWxzbyBiZSBldmFsdWF0ZWQgdG8gZ2V0IGEgbmV3IG1vbWVudCB3aGljaCBpcyB0aGUgc2FtZVxuICAgICAqXG4gICAgICogQGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2Rpc3QvbGF0ZXN0L2RvY3MvYXBpL3V0aWwuaHRtbCN1dGlsX2N1c3RvbV9pbnNwZWN0X2Z1bmN0aW9uX29uX29iamVjdHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnNwZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21vbWVudC5pbnZhbGlkKC8qICcgKyB0aGlzLl9pICsgJyAqLyknO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmdW5jID0gJ21vbWVudCcsXG4gICAgICAgICAgICB6b25lID0gJycsXG4gICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgICB5ZWFyLFxuICAgICAgICAgICAgZGF0ZXRpbWUsXG4gICAgICAgICAgICBzdWZmaXg7XG4gICAgICAgIGlmICghdGhpcy5pc0xvY2FsKCkpIHtcbiAgICAgICAgICAgIGZ1bmMgPSB0aGlzLnV0Y09mZnNldCgpID09PSAwID8gJ21vbWVudC51dGMnIDogJ21vbWVudC5wYXJzZVpvbmUnO1xuICAgICAgICAgICAgem9uZSA9ICdaJztcbiAgICAgICAgfVxuICAgICAgICBwcmVmaXggPSAnWycgKyBmdW5jICsgJyhcIl0nO1xuICAgICAgICB5ZWFyID0gMCA8PSB0aGlzLnllYXIoKSAmJiB0aGlzLnllYXIoKSA8PSA5OTk5ID8gJ1lZWVknIDogJ1lZWVlZWSc7XG4gICAgICAgIGRhdGV0aW1lID0gJy1NTS1ERFtUXUhIOm1tOnNzLlNTUyc7XG4gICAgICAgIHN1ZmZpeCA9IHpvbmUgKyAnW1wiKV0nO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChwcmVmaXggKyB5ZWFyICsgZGF0ZXRpbWUgKyBzdWZmaXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdChpbnB1dFN0cmluZykge1xuICAgICAgICBpZiAoIWlucHV0U3RyaW5nKSB7XG4gICAgICAgICAgICBpbnB1dFN0cmluZyA9IHRoaXMuaXNVdGMoKVxuICAgICAgICAgICAgICAgID8gaG9va3MuZGVmYXVsdEZvcm1hdFV0Y1xuICAgICAgICAgICAgICAgIDogaG9va3MuZGVmYXVsdEZvcm1hdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0TW9tZW50KHRoaXMsIGlucHV0U3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8IGNyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oeyB0bzogdGhpcywgZnJvbTogdGltZSB9KVxuICAgICAgICAgICAgICAgIC5sb2NhbGUodGhpcy5sb2NhbGUoKSlcbiAgICAgICAgICAgICAgICAuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tTm93KHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbShjcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0byh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fCBjcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKHsgZnJvbTogdGhpcywgdG86IHRpbWUgfSlcbiAgICAgICAgICAgICAgICAubG9jYWxlKHRoaXMubG9jYWxlKCkpXG4gICAgICAgICAgICAgICAgLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9Ob3cod2l0aG91dFN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy50byhjcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICAvLyBJZiBwYXNzZWQgYSBsb2NhbGUga2V5LCBpdCB3aWxsIHNldCB0aGUgbG9jYWxlIGZvciB0aGlzXG4gICAgLy8gaW5zdGFuY2UuICBPdGhlcndpc2UsIGl0IHdpbGwgcmV0dXJuIHRoZSBsb2NhbGUgY29uZmlndXJhdGlvblxuICAgIC8vIHZhcmlhYmxlcyBmb3IgdGhpcyBpbnN0YW5jZS5cbiAgICBmdW5jdGlvbiBsb2NhbGUoa2V5KSB7XG4gICAgICAgIHZhciBuZXdMb2NhbGVEYXRhO1xuXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZS5fYWJicjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0xvY2FsZURhdGEgPSBnZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChuZXdMb2NhbGVEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbGUgPSBuZXdMb2NhbGVEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFuZyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCgpLmxhbmcoKSBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCB1c2UgbW9tZW50KCkubG9jYWxlRGF0YSgpIHRvIGdldCB0aGUgbGFuZ3VhZ2UgY29uZmlndXJhdGlvbi4gVXNlIG1vbWVudCgpLmxvY2FsZSgpIHRvIGNoYW5nZSBsYW5ndWFnZXMuJyxcbiAgICAgICAgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIHZhciBNU19QRVJfU0VDT05EID0gMTAwMCxcbiAgICAgICAgTVNfUEVSX01JTlVURSA9IDYwICogTVNfUEVSX1NFQ09ORCxcbiAgICAgICAgTVNfUEVSX0hPVVIgPSA2MCAqIE1TX1BFUl9NSU5VVEUsXG4gICAgICAgIE1TX1BFUl80MDBfWUVBUlMgPSAoMzY1ICogNDAwICsgOTcpICogMjQgKiBNU19QRVJfSE9VUjtcblxuICAgIC8vIGFjdHVhbCBtb2R1bG8gLSBoYW5kbGVzIG5lZ2F0aXZlIG51bWJlcnMgKGZvciBkYXRlcyBiZWZvcmUgMTk3MCk6XG4gICAgZnVuY3Rpb24gbW9kJDEoZGl2aWRlbmQsIGRpdmlzb3IpIHtcbiAgICAgICAgcmV0dXJuICgoZGl2aWRlbmQgJSBkaXZpc29yKSArIGRpdmlzb3IpICUgZGl2aXNvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbFN0YXJ0T2ZEYXRlKHksIG0sIGQpIHtcbiAgICAgICAgLy8gdGhlIGRhdGUgY29uc3RydWN0b3IgcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCkge1xuICAgICAgICAgICAgLy8gcHJlc2VydmUgbGVhcCB5ZWFycyB1c2luZyBhIGZ1bGwgNDAwIHllYXIgY3ljbGUsIHRoZW4gcmVzZXRcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh5ICsgNDAwLCBtLCBkKSAtIE1TX1BFUl80MDBfWUVBUlM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeSwgbSwgZCkudmFsdWVPZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXRjU3RhcnRPZkRhdGUoeSwgbSwgZCkge1xuICAgICAgICAvLyBEYXRlLlVUQyByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZSBsZWFwIHllYXJzIHVzaW5nIGEgZnVsbCA0MDAgeWVhciBjeWNsZSwgdGhlbiByZXNldFxuICAgICAgICAgICAgcmV0dXJuIERhdGUuVVRDKHkgKyA0MDAsIG0sIGQpIC0gTVNfUEVSXzQwMF9ZRUFSUztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBEYXRlLlVUQyh5LCBtLCBkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0T2YodW5pdHMpIHtcbiAgICAgICAgdmFyIHRpbWUsIHN0YXJ0T2ZEYXRlO1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcgfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0T2ZEYXRlID0gdGhpcy5faXNVVEMgPyB1dGNTdGFydE9mRGF0ZSA6IGxvY2FsU3RhcnRPZkRhdGU7XG5cbiAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCAwLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBzdGFydE9mRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGgoKSAtICh0aGlzLm1vbnRoKCkgJSAzKSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUoKSAtIHRoaXMud2Vla2RheSgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2lzb1dlZWsnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBzdGFydE9mRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlKCkgLSAodGhpcy5pc29XZWVrZGF5KCkgLSAxKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCksIHRoaXMuZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lIC09IG1vZCQxKFxuICAgICAgICAgICAgICAgICAgICB0aW1lICsgKHRoaXMuX2lzVVRDID8gMCA6IHRoaXMudXRjT2Zmc2V0KCkgKiBNU19QRVJfTUlOVVRFKSxcbiAgICAgICAgICAgICAgICAgICAgTVNfUEVSX0hPVVJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSAtPSBtb2QkMSh0aW1lLCBNU19QRVJfTUlOVVRFKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHRoaXMuX2QudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIHRpbWUgLT0gbW9kJDEodGltZSwgTVNfUEVSX1NFQ09ORCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kLnNldFRpbWUodGltZSk7XG4gICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kT2YodW5pdHMpIHtcbiAgICAgICAgdmFyIHRpbWUsIHN0YXJ0T2ZEYXRlO1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcgfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0T2ZEYXRlID0gdGhpcy5faXNVVEMgPyB1dGNTdGFydE9mRGF0ZSA6IGxvY2FsU3RhcnRPZkRhdGU7XG5cbiAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpICsgMSwgMCwgMSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgICAgICAgICAgdGltZSA9XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T2ZEYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ZWFyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoKCkgLSAodGhpcy5tb250aCgpICUgMykgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApIC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSArIDEsIDEpIC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgICAgIHRpbWUgPVxuICAgICAgICAgICAgICAgICAgICBzdGFydE9mRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWVhcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlKCkgLSB0aGlzLndlZWtkYXkoKSArIDdcbiAgICAgICAgICAgICAgICAgICAgKSAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgICAgICAgICB0aW1lID1cbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPZkRhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSgpIC0gKHRoaXMuaXNvV2Vla2RheSgpIC0gMSkgKyA3XG4gICAgICAgICAgICAgICAgICAgICkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBzdGFydE9mRGF0ZSh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpLCB0aGlzLmRhdGUoKSArIDEpIC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lICs9XG4gICAgICAgICAgICAgICAgICAgIE1TX1BFUl9IT1VSIC1cbiAgICAgICAgICAgICAgICAgICAgbW9kJDEoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lICsgKHRoaXMuX2lzVVRDID8gMCA6IHRoaXMudXRjT2Zmc2V0KCkgKiBNU19QRVJfTUlOVVRFKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1TX1BFUl9IT1VSXG4gICAgICAgICAgICAgICAgICAgICkgLVxuICAgICAgICAgICAgICAgICAgICAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSArPSBNU19QRVJfTUlOVVRFIC0gbW9kJDEodGltZSwgTVNfUEVSX01JTlVURSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSArPSBNU19QRVJfU0VDT05EIC0gbW9kJDEodGltZSwgTVNfUEVSX1NFQ09ORCkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZC5zZXRUaW1lKHRpbWUpO1xuICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbHVlT2YoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kLnZhbHVlT2YoKSAtICh0aGlzLl9vZmZzZXQgfHwgMCkgKiA2MDAwMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bml4KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKSAvIDEwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0FycmF5KCkge1xuICAgICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBtLnllYXIoKSxcbiAgICAgICAgICAgIG0ubW9udGgoKSxcbiAgICAgICAgICAgIG0uZGF0ZSgpLFxuICAgICAgICAgICAgbS5ob3VyKCksXG4gICAgICAgICAgICBtLm1pbnV0ZSgpLFxuICAgICAgICAgICAgbS5zZWNvbmQoKSxcbiAgICAgICAgICAgIG0ubWlsbGlzZWNvbmQoKSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b09iamVjdCgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhcnM6IG0ueWVhcigpLFxuICAgICAgICAgICAgbW9udGhzOiBtLm1vbnRoKCksXG4gICAgICAgICAgICBkYXRlOiBtLmRhdGUoKSxcbiAgICAgICAgICAgIGhvdXJzOiBtLmhvdXJzKCksXG4gICAgICAgICAgICBtaW51dGVzOiBtLm1pbnV0ZXMoKSxcbiAgICAgICAgICAgIHNlY29uZHM6IG0uc2Vjb25kcygpLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiBtLm1pbGxpc2Vjb25kcygpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgLy8gbmV3IERhdGUoTmFOKS50b0pTT04oKSA9PT0gbnVsbFxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLnRvSVNPU3RyaW5nKCkgOiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQkMigpIHtcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2luZ0ZsYWdzKCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHt9LCBnZXRQYXJzaW5nRmxhZ3ModGhpcykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGludmFsaWRBdCgpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcnNpbmdGbGFncyh0aGlzKS5vdmVyZmxvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGlvbkRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dDogdGhpcy5faSxcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5fZixcbiAgICAgICAgICAgIGxvY2FsZTogdGhpcy5fbG9jYWxlLFxuICAgICAgICAgICAgaXNVVEM6IHRoaXMuX2lzVVRDLFxuICAgICAgICAgICAgc3RyaWN0OiB0aGlzLl9zdHJpY3QsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ04nLCAwLCAwLCAnZXJhQWJicicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdOTicsIDAsIDAsICdlcmFBYmJyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ05OTicsIDAsIDAsICdlcmFBYmJyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ05OTk4nLCAwLCAwLCAnZXJhTmFtZScpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdOTk5OTicsIDAsIDAsICdlcmFOYXJyb3cnKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCd5JywgWyd5JywgMV0sICd5bycsICdlcmFZZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3knLCBbJ3l5JywgMl0sIDAsICdlcmFZZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3knLCBbJ3l5eScsIDNdLCAwLCAnZXJhWWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCd5JywgWyd5eXl5JywgNF0sIDAsICdlcmFZZWFyJyk7XG5cbiAgICBhZGRSZWdleFRva2VuKCdOJywgbWF0Y2hFcmFBYmJyKTtcbiAgICBhZGRSZWdleFRva2VuKCdOTicsIG1hdGNoRXJhQWJicik7XG4gICAgYWRkUmVnZXhUb2tlbignTk5OJywgbWF0Y2hFcmFBYmJyKTtcbiAgICBhZGRSZWdleFRva2VuKCdOTk5OJywgbWF0Y2hFcmFOYW1lKTtcbiAgICBhZGRSZWdleFRva2VuKCdOTk5OTicsIG1hdGNoRXJhTmFycm93KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oXG4gICAgICAgIFsnTicsICdOTicsICdOTk4nLCAnTk5OTicsICdOTk5OTiddLFxuICAgICAgICBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICB2YXIgZXJhID0gY29uZmlnLl9sb2NhbGUuZXJhc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAgICAgaWYgKGVyYSkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVyYSA9IGVyYTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZEVyYSA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3knLCBtYXRjaFVuc2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCd5eScsIG1hdGNoVW5zaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3l5eScsIG1hdGNoVW5zaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3l5eXknLCBtYXRjaFVuc2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCd5bycsIG1hdGNoRXJhWWVhck9yZGluYWwpO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ3knLCAneXknLCAneXl5JywgJ3l5eXknXSwgWUVBUik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ3lvJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICBpZiAoY29uZmlnLl9sb2NhbGUuX2VyYVllYXJPcmRpbmFsUmVnZXgpIHtcbiAgICAgICAgICAgIG1hdGNoID0gaW5wdXQubWF0Y2goY29uZmlnLl9sb2NhbGUuX2VyYVllYXJPcmRpbmFsUmVnZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fbG9jYWxlLmVyYVllYXJPcmRpbmFsUGFyc2UpIHtcbiAgICAgICAgICAgIGFycmF5W1lFQVJdID0gY29uZmlnLl9sb2NhbGUuZXJhWWVhck9yZGluYWxQYXJzZShpbnB1dCwgbWF0Y2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJyYXlbWUVBUl0gPSBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVFcmFzKG0sIGZvcm1hdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMuX2VyYXMgfHwgZ2V0TG9jYWxlKCdlbicpLl9lcmFzO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGVyYXNbaV0uc2luY2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAvLyB0cnVuY2F0ZSB0aW1lXG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBob29rcyhlcmFzW2ldLnNpbmNlKS5zdGFydE9mKCdkYXknKTtcbiAgICAgICAgICAgICAgICAgICAgZXJhc1tpXS5zaW5jZSA9IGRhdGUudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgZXJhc1tpXS51bnRpbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgICAgICAgICAgICAgIGVyYXNbaV0udW50aWwgPSArSW5maW5pdHk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGhvb2tzKGVyYXNbaV0udW50aWwpLnN0YXJ0T2YoJ2RheScpLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICAgICAgZXJhc1tpXS51bnRpbCA9IGRhdGUudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJhcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVFcmFzUGFyc2UoZXJhTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBsLFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMuZXJhcygpLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGFiYnIsXG4gICAgICAgICAgICBuYXJyb3c7XG4gICAgICAgIGVyYU5hbWUgPSBlcmFOYW1lLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVyYXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICBuYW1lID0gZXJhc1tpXS5uYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBhYmJyID0gZXJhc1tpXS5hYmJyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBuYXJyb3cgPSBlcmFzW2ldLm5hcnJvdy50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ05OJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTk5OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhYmJyID09PSBlcmFOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdOTk5OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBlcmFOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdOTk5OTic6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFycm93ID09PSBlcmFOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFtuYW1lLCBhYmJyLCBuYXJyb3ddLmluZGV4T2YoZXJhTmFtZSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcmFzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlRXJhc0NvbnZlcnRZZWFyKGVyYSwgeWVhcikge1xuICAgICAgICB2YXIgZGlyID0gZXJhLnNpbmNlIDw9IGVyYS51bnRpbCA/ICsxIDogLTE7XG4gICAgICAgIGlmICh5ZWFyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBob29rcyhlcmEuc2luY2UpLnllYXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBob29rcyhlcmEuc2luY2UpLnllYXIoKSArICh5ZWFyIC0gZXJhLm9mZnNldCkgKiBkaXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFcmFOYW1lKCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5sb2NhbGVEYXRhKCkuZXJhcygpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCk7XG5cbiAgICAgICAgICAgIGlmIChlcmFzW2ldLnNpbmNlIDw9IHZhbCAmJiB2YWwgPD0gZXJhc1tpXS51bnRpbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcmFzW2ldLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJhc1tpXS51bnRpbCA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0uc2luY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVyYU5hcnJvdygpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBsLFxuICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMubG9jYWxlRGF0YSgpLmVyYXMoKTtcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVyYXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAvLyB0cnVuY2F0ZSB0aW1lXG4gICAgICAgICAgICB2YWwgPSB0aGlzLmNsb25lKCkuc3RhcnRPZignZGF5JykudmFsdWVPZigpO1xuXG4gICAgICAgICAgICBpZiAoZXJhc1tpXS5zaW5jZSA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0udW50aWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5uYXJyb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJhc1tpXS51bnRpbCA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0uc2luY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5uYXJyb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXJhQWJicigpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBsLFxuICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMubG9jYWxlRGF0YSgpLmVyYXMoKTtcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVyYXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAvLyB0cnVuY2F0ZSB0aW1lXG4gICAgICAgICAgICB2YWwgPSB0aGlzLmNsb25lKCkuc3RhcnRPZignZGF5JykudmFsdWVPZigpO1xuXG4gICAgICAgICAgICBpZiAoZXJhc1tpXS5zaW5jZSA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0udW50aWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5hYmJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVyYXNbaV0udW50aWwgPD0gdmFsICYmIHZhbCA8PSBlcmFzW2ldLnNpbmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV0uYWJicjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFcmFZZWFyKCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBkaXIsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5sb2NhbGVEYXRhKCkuZXJhcygpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIGRpciA9IGVyYXNbaV0uc2luY2UgPD0gZXJhc1tpXS51bnRpbCA/ICsxIDogLTE7XG5cbiAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoZXJhc1tpXS5zaW5jZSA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0udW50aWwpIHx8XG4gICAgICAgICAgICAgICAgKGVyYXNbaV0udW50aWwgPD0gdmFsICYmIHZhbCA8PSBlcmFzW2ldLnNpbmNlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMueWVhcigpIC0gaG9va3MoZXJhc1tpXS5zaW5jZSkueWVhcigpKSAqIGRpciArXG4gICAgICAgICAgICAgICAgICAgIGVyYXNbaV0ub2Zmc2V0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnllYXIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcmFzTmFtZVJlZ2V4KGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX2VyYXNOYW1lUmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZUVyYXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/IHRoaXMuX2VyYXNOYW1lUmVnZXggOiB0aGlzLl9lcmFzUmVnZXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJhc0FiYnJSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19lcmFzQWJiclJlZ2V4JykpIHtcbiAgICAgICAgICAgIGNvbXB1dGVFcmFzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNTdHJpY3QgPyB0aGlzLl9lcmFzQWJiclJlZ2V4IDogdGhpcy5fZXJhc1JlZ2V4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVyYXNOYXJyb3dSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19lcmFzTmFycm93UmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZUVyYXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/IHRoaXMuX2VyYXNOYXJyb3dSZWdleCA6IHRoaXMuX2VyYXNSZWdleDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaEVyYUFiYnIoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmVyYXNBYmJyUmVnZXgoaXNTdHJpY3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoRXJhTmFtZShpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZXJhc05hbWVSZWdleChpc1N0cmljdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hFcmFOYXJyb3coaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmVyYXNOYXJyb3dSZWdleChpc1N0cmljdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hFcmFZZWFyT3JkaW5hbChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuX2VyYVllYXJPcmRpbmFsUmVnZXggfHwgbWF0Y2hVbnNpZ25lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlRXJhc1BhcnNlKCkge1xuICAgICAgICB2YXIgYWJiclBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgbmFtZVBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgbmFycm93UGllY2VzID0gW10sXG4gICAgICAgICAgICBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5lcmFzKCk7XG5cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVyYXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICBuYW1lUGllY2VzLnB1c2gocmVnZXhFc2NhcGUoZXJhc1tpXS5uYW1lKSk7XG4gICAgICAgICAgICBhYmJyUGllY2VzLnB1c2gocmVnZXhFc2NhcGUoZXJhc1tpXS5hYmJyKSk7XG4gICAgICAgICAgICBuYXJyb3dQaWVjZXMucHVzaChyZWdleEVzY2FwZShlcmFzW2ldLm5hcnJvdykpO1xuXG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHJlZ2V4RXNjYXBlKGVyYXNbaV0ubmFtZSkpO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChyZWdleEVzY2FwZShlcmFzW2ldLmFiYnIpKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gocmVnZXhFc2NhcGUoZXJhc1tpXS5uYXJyb3cpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VyYXNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fZXJhc05hbWVSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG5hbWVQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl9lcmFzQWJiclJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgYWJiclBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX2VyYXNOYXJyb3dSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXignICsgbmFycm93UGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnZ2cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWVrWWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydHRycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGRXZWVrWWVhckZvcm1hdFRva2VuKHRva2VuLCBnZXR0ZXIpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4oMCwgW3Rva2VuLCB0b2tlbi5sZW5ndGhdLCAwLCBnZXR0ZXIpO1xuICAgIH1cblxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2cnLCAnd2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnZycsICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0cnLCAnaXNvV2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHRycsICdpc29XZWVrWWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrWWVhcicsICdnZycpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla1llYXInLCAnR0cnKTtcblxuICAgIC8vIFBSSU9SSVRZXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ3dlZWtZZWFyJywgMSk7XG4gICAgYWRkVW5pdFByaW9yaXR5KCdpc29XZWVrWWVhcicsIDEpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignRycsIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdnJywgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0cnLCBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZycsIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHRycsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnZycsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFxuICAgICAgICBbJ2dnZ2cnLCAnZ2dnZ2cnLCAnR0dHRycsICdHR0dHRyddLFxuICAgICAgICBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDIpXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnJywgJ0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuXSA9IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFyKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgdGhpcy53ZWVrKCksXG4gICAgICAgICAgICB0aGlzLndlZWtkYXkoKSxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdyxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRveVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWtZZWFyKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgdGhpcy5pc29XZWVrKCksXG4gICAgICAgICAgICB0aGlzLmlzb1dlZWtkYXkoKSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICA0XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SVNPV2Vla3NJblllYXIoKSB7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgMSwgNCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SVNPV2Vla3NJbklTT1dlZWtZZWFyKCkge1xuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy5pc29XZWVrWWVhcigpLCAxLCA0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXZWVrc0luWWVhcigpIHtcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgd2Vla0luZm8uZG93LCB3ZWVrSW5mby5kb3kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdlZWtzSW5XZWVrWWVhcigpIHtcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLndlZWtZZWFyKCksIHdlZWtJbmZvLmRvdywgd2Vla0luZm8uZG95KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrWWVhckhlbHBlcihpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIHdlZWtzVGFyZ2V0O1xuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIodGhpcywgZG93LCBkb3kpLnllYXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZWVrc1RhcmdldCA9IHdlZWtzSW5ZZWFyKGlucHV0LCBkb3csIGRveSk7XG4gICAgICAgICAgICBpZiAod2VlayA+IHdlZWtzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgd2VlayA9IHdlZWtzVGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNldFdlZWtBbGwuY2FsbCh0aGlzLCBpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0V2Vla0FsbCh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIGRheU9mWWVhckRhdGEgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSxcbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKGRheU9mWWVhckRhdGEueWVhciwgMCwgZGF5T2ZZZWFyRGF0YS5kYXlPZlllYXIpO1xuXG4gICAgICAgIHRoaXMueWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpO1xuICAgICAgICB0aGlzLm1vbnRoKGRhdGUuZ2V0VVRDTW9udGgoKSk7XG4gICAgICAgIHRoaXMuZGF0ZShkYXRlLmdldFVUQ0RhdGUoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdRJywgMCwgJ1FvJywgJ3F1YXJ0ZXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygncXVhcnRlcicsICdRJyk7XG5cbiAgICAvLyBQUklPUklUWVxuXG4gICAgYWRkVW5pdFByaW9yaXR5KCdxdWFydGVyJywgNyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdRJywgbWF0Y2gxKTtcbiAgICBhZGRQYXJzZVRva2VuKCdRJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0UXVhcnRlcihpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbFxuICAgICAgICAgICAgPyBNYXRoLmNlaWwoKHRoaXMubW9udGgoKSArIDEpIC8gMylcbiAgICAgICAgICAgIDogdGhpcy5tb250aCgoaW5wdXQgLSAxKSAqIDMgKyAodGhpcy5tb250aCgpICUgMykpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdEJywgWydERCcsIDJdLCAnRG8nLCAnZGF0ZScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXRlJywgJ0QnKTtcblxuICAgIC8vIFBSSU9SSVRZXG4gICAgYWRkVW5pdFByaW9yaXR5KCdkYXRlJywgOSk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdEJywgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdERCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdEbycsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSBcIm9yZGluYWxQYXJzZVwiIGZhbGxiYWNrIGluIG5leHQgbWFqb3IgcmVsZWFzZS5cbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0XG4gICAgICAgICAgICA/IGxvY2FsZS5fZGF5T2ZNb250aE9yZGluYWxQYXJzZSB8fCBsb2NhbGUuX29yZGluYWxQYXJzZVxuICAgICAgICAgICAgOiBsb2NhbGUuX2RheU9mTW9udGhPcmRpbmFsUGFyc2VMZW5pZW50O1xuICAgIH0pO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ0QnLCAnREQnXSwgREFURSk7XG4gICAgYWRkUGFyc2VUb2tlbignRG8nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W0RBVEVdID0gdG9JbnQoaW5wdXQubWF0Y2gobWF0Y2gxdG8yKVswXSk7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0RGF5T2ZNb250aCA9IG1ha2VHZXRTZXQoJ0RhdGUnLCB0cnVlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdEREQnLCBbJ0REREQnLCAzXSwgJ0RERG8nLCAnZGF5T2ZZZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RheU9mWWVhcicsICdEREQnKTtcblxuICAgIC8vIFBSSU9SSVRZXG4gICAgYWRkVW5pdFByaW9yaXR5KCdkYXlPZlllYXInLCA0KTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RERCcsIG1hdGNoMXRvMyk7XG4gICAgYWRkUmVnZXhUb2tlbignRERERCcsIG1hdGNoMyk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mWWVhcihpbnB1dCkge1xuICAgICAgICB2YXIgZGF5T2ZZZWFyID1cbiAgICAgICAgICAgIE1hdGgucm91bmQoXG4gICAgICAgICAgICAgICAgKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTVcbiAgICAgICAgICAgICkgKyAxO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKGlucHV0IC0gZGF5T2ZZZWFyLCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdtJywgWydtbScsIDJdLCAwLCAnbWludXRlJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21pbnV0ZScsICdtJyk7XG5cbiAgICAvLyBQUklPUklUWVxuXG4gICAgYWRkVW5pdFByaW9yaXR5KCdtaW51dGUnLCAxNCk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdtJywgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnbScsICdtbSddLCBNSU5VVEUpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldE1pbnV0ZSA9IG1ha2VHZXRTZXQoJ01pbnV0ZXMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdzZWNvbmQnLCAncycpO1xuXG4gICAgLy8gUFJJT1JJVFlcblxuICAgIGFkZFVuaXRQcmlvcml0eSgnc2Vjb25kJywgMTUpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigncycsIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ3MnLCAnc3MnXSwgU0VDT05EKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRTZWNvbmQgPSBtYWtlR2V0U2V0KCdTZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMDApO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTUycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTUycsIDNdLCAwLCAnbWlsbGlzZWNvbmQnKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1MnLCA0XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTUycsIDVdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1MnLCA2XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1MnLCA3XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTUycsIDhdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTU1MnLCA5XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwMDtcbiAgICB9KTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbWlsbGlzZWNvbmQnLCAnbXMnKTtcblxuICAgIC8vIFBSSU9SSVRZXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ21pbGxpc2Vjb25kJywgMTYpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignUycsIG1hdGNoMXRvMywgbWF0Y2gxKTtcbiAgICBhZGRSZWdleFRva2VuKCdTUycsIG1hdGNoMXRvMywgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdTU1MnLCBtYXRjaDF0bzMsIG1hdGNoMyk7XG5cbiAgICB2YXIgdG9rZW4sIGdldFNldE1pbGxpc2Vjb25kO1xuICAgIGZvciAodG9rZW4gPSAnU1NTUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcbiAgICAgICAgYWRkUmVnZXhUb2tlbih0b2tlbiwgbWF0Y2hVbnNpZ25lZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNcyhpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmb3IgKHRva2VuID0gJ1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIHBhcnNlTXMpO1xuICAgIH1cblxuICAgIGdldFNldE1pbGxpc2Vjb25kID0gbWFrZUdldFNldCgnTWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3onLCAwLCAwLCAnem9uZUFiYnInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignenonLCAwLCAwLCAnem9uZU5hbWUnKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFpvbmVBYmJyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnVVRDJyA6ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFpvbmVOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUnIDogJyc7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvID0gTW9tZW50LnByb3RvdHlwZTtcblxuICAgIHByb3RvLmFkZCA9IGFkZDtcbiAgICBwcm90by5jYWxlbmRhciA9IGNhbGVuZGFyJDE7XG4gICAgcHJvdG8uY2xvbmUgPSBjbG9uZTtcbiAgICBwcm90by5kaWZmID0gZGlmZjtcbiAgICBwcm90by5lbmRPZiA9IGVuZE9mO1xuICAgIHByb3RvLmZvcm1hdCA9IGZvcm1hdDtcbiAgICBwcm90by5mcm9tID0gZnJvbTtcbiAgICBwcm90by5mcm9tTm93ID0gZnJvbU5vdztcbiAgICBwcm90by50byA9IHRvO1xuICAgIHByb3RvLnRvTm93ID0gdG9Ob3c7XG4gICAgcHJvdG8uZ2V0ID0gc3RyaW5nR2V0O1xuICAgIHByb3RvLmludmFsaWRBdCA9IGludmFsaWRBdDtcbiAgICBwcm90by5pc0FmdGVyID0gaXNBZnRlcjtcbiAgICBwcm90by5pc0JlZm9yZSA9IGlzQmVmb3JlO1xuICAgIHByb3RvLmlzQmV0d2VlbiA9IGlzQmV0d2VlbjtcbiAgICBwcm90by5pc1NhbWUgPSBpc1NhbWU7XG4gICAgcHJvdG8uaXNTYW1lT3JBZnRlciA9IGlzU2FtZU9yQWZ0ZXI7XG4gICAgcHJvdG8uaXNTYW1lT3JCZWZvcmUgPSBpc1NhbWVPckJlZm9yZTtcbiAgICBwcm90by5pc1ZhbGlkID0gaXNWYWxpZCQyO1xuICAgIHByb3RvLmxhbmcgPSBsYW5nO1xuICAgIHByb3RvLmxvY2FsZSA9IGxvY2FsZTtcbiAgICBwcm90by5sb2NhbGVEYXRhID0gbG9jYWxlRGF0YTtcbiAgICBwcm90by5tYXggPSBwcm90b3R5cGVNYXg7XG4gICAgcHJvdG8ubWluID0gcHJvdG90eXBlTWluO1xuICAgIHByb3RvLnBhcnNpbmdGbGFncyA9IHBhcnNpbmdGbGFncztcbiAgICBwcm90by5zZXQgPSBzdHJpbmdTZXQ7XG4gICAgcHJvdG8uc3RhcnRPZiA9IHN0YXJ0T2Y7XG4gICAgcHJvdG8uc3VidHJhY3QgPSBzdWJ0cmFjdDtcbiAgICBwcm90by50b0FycmF5ID0gdG9BcnJheTtcbiAgICBwcm90by50b09iamVjdCA9IHRvT2JqZWN0O1xuICAgIHByb3RvLnRvRGF0ZSA9IHRvRGF0ZTtcbiAgICBwcm90by50b0lTT1N0cmluZyA9IHRvSVNPU3RyaW5nO1xuICAgIHByb3RvLmluc3BlY3QgPSBpbnNwZWN0O1xuICAgIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuZm9yICE9IG51bGwpIHtcbiAgICAgICAgcHJvdG9bU3ltYm9sLmZvcignbm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20nKV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJ01vbWVudDwnICsgdGhpcy5mb3JtYXQoKSArICc+JztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcHJvdG8udG9KU09OID0gdG9KU09OO1xuICAgIHByb3RvLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4gICAgcHJvdG8udW5peCA9IHVuaXg7XG4gICAgcHJvdG8udmFsdWVPZiA9IHZhbHVlT2Y7XG4gICAgcHJvdG8uY3JlYXRpb25EYXRhID0gY3JlYXRpb25EYXRhO1xuICAgIHByb3RvLmVyYU5hbWUgPSBnZXRFcmFOYW1lO1xuICAgIHByb3RvLmVyYU5hcnJvdyA9IGdldEVyYU5hcnJvdztcbiAgICBwcm90by5lcmFBYmJyID0gZ2V0RXJhQWJicjtcbiAgICBwcm90by5lcmFZZWFyID0gZ2V0RXJhWWVhcjtcbiAgICBwcm90by55ZWFyID0gZ2V0U2V0WWVhcjtcbiAgICBwcm90by5pc0xlYXBZZWFyID0gZ2V0SXNMZWFwWWVhcjtcbiAgICBwcm90by53ZWVrWWVhciA9IGdldFNldFdlZWtZZWFyO1xuICAgIHByb3RvLmlzb1dlZWtZZWFyID0gZ2V0U2V0SVNPV2Vla1llYXI7XG4gICAgcHJvdG8ucXVhcnRlciA9IHByb3RvLnF1YXJ0ZXJzID0gZ2V0U2V0UXVhcnRlcjtcbiAgICBwcm90by5tb250aCA9IGdldFNldE1vbnRoO1xuICAgIHByb3RvLmRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGg7XG4gICAgcHJvdG8ud2VlayA9IHByb3RvLndlZWtzID0gZ2V0U2V0V2VlaztcbiAgICBwcm90by5pc29XZWVrID0gcHJvdG8uaXNvV2Vla3MgPSBnZXRTZXRJU09XZWVrO1xuICAgIHByb3RvLndlZWtzSW5ZZWFyID0gZ2V0V2Vla3NJblllYXI7XG4gICAgcHJvdG8ud2Vla3NJbldlZWtZZWFyID0gZ2V0V2Vla3NJbldlZWtZZWFyO1xuICAgIHByb3RvLmlzb1dlZWtzSW5ZZWFyID0gZ2V0SVNPV2Vla3NJblllYXI7XG4gICAgcHJvdG8uaXNvV2Vla3NJbklTT1dlZWtZZWFyID0gZ2V0SVNPV2Vla3NJbklTT1dlZWtZZWFyO1xuICAgIHByb3RvLmRhdGUgPSBnZXRTZXREYXlPZk1vbnRoO1xuICAgIHByb3RvLmRheSA9IHByb3RvLmRheXMgPSBnZXRTZXREYXlPZldlZWs7XG4gICAgcHJvdG8ud2Vla2RheSA9IGdldFNldExvY2FsZURheU9mV2VlaztcbiAgICBwcm90by5pc29XZWVrZGF5ID0gZ2V0U2V0SVNPRGF5T2ZXZWVrO1xuICAgIHByb3RvLmRheU9mWWVhciA9IGdldFNldERheU9mWWVhcjtcbiAgICBwcm90by5ob3VyID0gcHJvdG8uaG91cnMgPSBnZXRTZXRIb3VyO1xuICAgIHByb3RvLm1pbnV0ZSA9IHByb3RvLm1pbnV0ZXMgPSBnZXRTZXRNaW51dGU7XG4gICAgcHJvdG8uc2Vjb25kID0gcHJvdG8uc2Vjb25kcyA9IGdldFNldFNlY29uZDtcbiAgICBwcm90by5taWxsaXNlY29uZCA9IHByb3RvLm1pbGxpc2Vjb25kcyA9IGdldFNldE1pbGxpc2Vjb25kO1xuICAgIHByb3RvLnV0Y09mZnNldCA9IGdldFNldE9mZnNldDtcbiAgICBwcm90by51dGMgPSBzZXRPZmZzZXRUb1VUQztcbiAgICBwcm90by5sb2NhbCA9IHNldE9mZnNldFRvTG9jYWw7XG4gICAgcHJvdG8ucGFyc2Vab25lID0gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQ7XG4gICAgcHJvdG8uaGFzQWxpZ25lZEhvdXJPZmZzZXQgPSBoYXNBbGlnbmVkSG91ck9mZnNldDtcbiAgICBwcm90by5pc0RTVCA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lO1xuICAgIHByb3RvLmlzTG9jYWwgPSBpc0xvY2FsO1xuICAgIHByb3RvLmlzVXRjT2Zmc2V0ID0gaXNVdGNPZmZzZXQ7XG4gICAgcHJvdG8uaXNVdGMgPSBpc1V0YztcbiAgICBwcm90by5pc1VUQyA9IGlzVXRjO1xuICAgIHByb3RvLnpvbmVBYmJyID0gZ2V0Wm9uZUFiYnI7XG4gICAgcHJvdG8uem9uZU5hbWUgPSBnZXRab25lTmFtZTtcbiAgICBwcm90by5kYXRlcyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ2RhdGVzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBkYXRlIGluc3RlYWQuJyxcbiAgICAgICAgZ2V0U2V0RGF5T2ZNb250aFxuICAgICk7XG4gICAgcHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9udGhzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb250aCBpbnN0ZWFkJyxcbiAgICAgICAgZ2V0U2V0TW9udGhcbiAgICApO1xuICAgIHByb3RvLnllYXJzID0gZGVwcmVjYXRlKFxuICAgICAgICAneWVhcnMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIHllYXIgaW5zdGVhZCcsXG4gICAgICAgIGdldFNldFllYXJcbiAgICApO1xuICAgIHByb3RvLnpvbmUgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQoKS56b25lIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQoKS51dGNPZmZzZXQgaW5zdGVhZC4gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy96b25lLycsXG4gICAgICAgIGdldFNldFpvbmVcbiAgICApO1xuICAgIHByb3RvLmlzRFNUU2hpZnRlZCA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ2lzRFNUU2hpZnRlZCBpcyBkZXByZWNhdGVkLiBTZWUgaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9kc3Qtc2hpZnRlZC8gZm9yIG1vcmUgaW5mb3JtYXRpb24nLFxuICAgICAgICBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWRcbiAgICApO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVW5peChpbnB1dCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJblpvbmUoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpLnBhcnNlWm9uZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZVBhcnNlUG9zdEZvcm1hdChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG5cbiAgICB2YXIgcHJvdG8kMSA9IExvY2FsZS5wcm90b3R5cGU7XG5cbiAgICBwcm90byQxLmNhbGVuZGFyID0gY2FsZW5kYXI7XG4gICAgcHJvdG8kMS5sb25nRGF0ZUZvcm1hdCA9IGxvbmdEYXRlRm9ybWF0O1xuICAgIHByb3RvJDEuaW52YWxpZERhdGUgPSBpbnZhbGlkRGF0ZTtcbiAgICBwcm90byQxLm9yZGluYWwgPSBvcmRpbmFsO1xuICAgIHByb3RvJDEucHJlcGFyc2UgPSBwcmVQYXJzZVBvc3RGb3JtYXQ7XG4gICAgcHJvdG8kMS5wb3N0Zm9ybWF0ID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvJDEucmVsYXRpdmVUaW1lID0gcmVsYXRpdmVUaW1lO1xuICAgIHByb3RvJDEucGFzdEZ1dHVyZSA9IHBhc3RGdXR1cmU7XG4gICAgcHJvdG8kMS5zZXQgPSBzZXQ7XG4gICAgcHJvdG8kMS5lcmFzID0gbG9jYWxlRXJhcztcbiAgICBwcm90byQxLmVyYXNQYXJzZSA9IGxvY2FsZUVyYXNQYXJzZTtcbiAgICBwcm90byQxLmVyYXNDb252ZXJ0WWVhciA9IGxvY2FsZUVyYXNDb252ZXJ0WWVhcjtcbiAgICBwcm90byQxLmVyYXNBYmJyUmVnZXggPSBlcmFzQWJiclJlZ2V4O1xuICAgIHByb3RvJDEuZXJhc05hbWVSZWdleCA9IGVyYXNOYW1lUmVnZXg7XG4gICAgcHJvdG8kMS5lcmFzTmFycm93UmVnZXggPSBlcmFzTmFycm93UmVnZXg7XG5cbiAgICBwcm90byQxLm1vbnRocyA9IGxvY2FsZU1vbnRocztcbiAgICBwcm90byQxLm1vbnRoc1Nob3J0ID0gbG9jYWxlTW9udGhzU2hvcnQ7XG4gICAgcHJvdG8kMS5tb250aHNQYXJzZSA9IGxvY2FsZU1vbnRoc1BhcnNlO1xuICAgIHByb3RvJDEubW9udGhzUmVnZXggPSBtb250aHNSZWdleDtcbiAgICBwcm90byQxLm1vbnRoc1Nob3J0UmVnZXggPSBtb250aHNTaG9ydFJlZ2V4O1xuICAgIHByb3RvJDEud2VlayA9IGxvY2FsZVdlZWs7XG4gICAgcHJvdG8kMS5maXJzdERheU9mWWVhciA9IGxvY2FsZUZpcnN0RGF5T2ZZZWFyO1xuICAgIHByb3RvJDEuZmlyc3REYXlPZldlZWsgPSBsb2NhbGVGaXJzdERheU9mV2VlaztcblxuICAgIHByb3RvJDEud2Vla2RheXMgPSBsb2NhbGVXZWVrZGF5cztcbiAgICBwcm90byQxLndlZWtkYXlzTWluID0gbG9jYWxlV2Vla2RheXNNaW47XG4gICAgcHJvdG8kMS53ZWVrZGF5c1Nob3J0ID0gbG9jYWxlV2Vla2RheXNTaG9ydDtcbiAgICBwcm90byQxLndlZWtkYXlzUGFyc2UgPSBsb2NhbGVXZWVrZGF5c1BhcnNlO1xuXG4gICAgcHJvdG8kMS53ZWVrZGF5c1JlZ2V4ID0gd2Vla2RheXNSZWdleDtcbiAgICBwcm90byQxLndlZWtkYXlzU2hvcnRSZWdleCA9IHdlZWtkYXlzU2hvcnRSZWdleDtcbiAgICBwcm90byQxLndlZWtkYXlzTWluUmVnZXggPSB3ZWVrZGF5c01pblJlZ2V4O1xuXG4gICAgcHJvdG8kMS5pc1BNID0gbG9jYWxlSXNQTTtcbiAgICBwcm90byQxLm1lcmlkaWVtID0gbG9jYWxlTWVyaWRpZW07XG5cbiAgICBmdW5jdGlvbiBnZXQkMShmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKSB7XG4gICAgICAgIHZhciBsb2NhbGUgPSBnZXRMb2NhbGUoKSxcbiAgICAgICAgICAgIHV0YyA9IGNyZWF0ZVVUQygpLnNldChzZXR0ZXIsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGxvY2FsZVtmaWVsZF0odXRjLCBmb3JtYXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RNb250aHNJbXBsKGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XG4gICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcblxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldCQxKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCAnbW9udGgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0ID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbaV0gPSBnZXQkMShmb3JtYXQsIGksIGZpZWxkLCAnbW9udGgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8vICgpXG4gICAgLy8gKDUpXG4gICAgLy8gKGZtdCwgNSlcbiAgICAvLyAoZm10KVxuICAgIC8vICh0cnVlKVxuICAgIC8vICh0cnVlLCA1KVxuICAgIC8vICh0cnVlLCBmbXQsIDUpXG4gICAgLy8gKHRydWUsIGZtdClcbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbGVTb3J0ZWQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGxvY2FsZVNvcnRlZDtcbiAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICAgICAgbG9jYWxlU29ydGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbG9jYWxlID0gZ2V0TG9jYWxlKCksXG4gICAgICAgICAgICBzaGlmdCA9IGxvY2FsZVNvcnRlZCA/IGxvY2FsZS5fd2Vlay5kb3cgOiAwLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIG91dCA9IFtdO1xuXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0JDEoZm9ybWF0LCAoaW5kZXggKyBzaGlmdCkgJSA3LCBmaWVsZCwgJ2RheScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgb3V0W2ldID0gZ2V0JDEoZm9ybWF0LCAoaSArIHNoaWZ0KSAlIDcsIGZpZWxkLCAnZGF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0TW9udGhzKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RNb250aHNJbXBsKGZvcm1hdCwgaW5kZXgsICdtb250aHMnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0TW9udGhzU2hvcnQoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRoc1Nob3J0Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5cycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RXZWVrZGF5c1Nob3J0KGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c1Nob3J0Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzTWluKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c01pbicpO1xuICAgIH1cblxuICAgIGdldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XG4gICAgICAgIGVyYXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaW5jZTogJzAwMDEtMDEtMDEnLFxuICAgICAgICAgICAgICAgIHVudGlsOiArSW5maW5pdHksXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAxLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdBbm5vIERvbWluaScsXG4gICAgICAgICAgICAgICAgbmFycm93OiAnQUQnLFxuICAgICAgICAgICAgICAgIGFiYnI6ICdBRCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNpbmNlOiAnMDAwMC0xMi0zMScsXG4gICAgICAgICAgICAgICAgdW50aWw6IC1JbmZpbml0eSxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDEsXG4gICAgICAgICAgICAgICAgbmFtZTogJ0JlZm9yZSBDaHJpc3QnLFxuICAgICAgICAgICAgICAgIG5hcnJvdzogJ0JDJyxcbiAgICAgICAgICAgICAgICBhYmJyOiAnQkMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogL1xcZHsxLDJ9KHRofHN0fG5kfHJkKS8sXG4gICAgICAgIG9yZGluYWw6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBiID0gbnVtYmVyICUgMTAsXG4gICAgICAgICAgICAgICAgb3V0cHV0ID1cbiAgICAgICAgICAgICAgICAgICAgdG9JbnQoKG51bWJlciAlIDEwMCkgLyAxMCkgPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ3RoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBiID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYiA9PT0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnbmQnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGIgPT09IDNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ3JkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAndGgnO1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlciArIG91dHB1dDtcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuICAgIGhvb2tzLmxhbmcgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQubGFuZyBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZSBpbnN0ZWFkLicsXG4gICAgICAgIGdldFNldEdsb2JhbExvY2FsZVxuICAgICk7XG4gICAgaG9va3MubGFuZ0RhdGEgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQubGFuZ0RhdGEgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGVEYXRhIGluc3RlYWQuJyxcbiAgICAgICAgZ2V0TG9jYWxlXG4gICAgKTtcblxuICAgIHZhciBtYXRoQWJzID0gTWF0aC5hYnM7XG5cbiAgICBmdW5jdGlvbiBhYnMoKSB7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSBtYXRoQWJzKHRoaXMuX21pbGxpc2Vjb25kcyk7XG4gICAgICAgIHRoaXMuX2RheXMgPSBtYXRoQWJzKHRoaXMuX2RheXMpO1xuICAgICAgICB0aGlzLl9tb250aHMgPSBtYXRoQWJzKHRoaXMuX21vbnRocyk7XG5cbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgPSBtYXRoQWJzKGRhdGEubWlsbGlzZWNvbmRzKTtcbiAgICAgICAgZGF0YS5zZWNvbmRzID0gbWF0aEFicyhkYXRhLnNlY29uZHMpO1xuICAgICAgICBkYXRhLm1pbnV0ZXMgPSBtYXRoQWJzKGRhdGEubWludXRlcyk7XG4gICAgICAgIGRhdGEuaG91cnMgPSBtYXRoQWJzKGRhdGEuaG91cnMpO1xuICAgICAgICBkYXRhLm1vbnRocyA9IG1hdGhBYnMoZGF0YS5tb250aHMpO1xuICAgICAgICBkYXRhLnllYXJzID0gbWF0aEFicyhkYXRhLnllYXJzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRTdWJ0cmFjdCQxKGR1cmF0aW9uLCBpbnB1dCwgdmFsdWUsIGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgb3RoZXIgPSBjcmVhdGVEdXJhdGlvbihpbnB1dCwgdmFsdWUpO1xuXG4gICAgICAgIGR1cmF0aW9uLl9taWxsaXNlY29uZHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21pbGxpc2Vjb25kcztcbiAgICAgICAgZHVyYXRpb24uX2RheXMgKz0gZGlyZWN0aW9uICogb3RoZXIuX2RheXM7XG4gICAgICAgIGR1cmF0aW9uLl9tb250aHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21vbnRocztcblxuICAgICAgICByZXR1cm4gZHVyYXRpb24uX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIGFkZCgxLCAncycpIG9yIGFkZChkdXJhdGlvbilcbiAgICBmdW5jdGlvbiBhZGQkMShpbnB1dCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGFkZFN1YnRyYWN0JDEodGhpcywgaW5wdXQsIHZhbHVlLCAxKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBzdWJ0cmFjdCgxLCAncycpIG9yIHN1YnRyYWN0KGR1cmF0aW9uKVxuICAgIGZ1bmN0aW9uIHN1YnRyYWN0JDEoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhZGRTdWJ0cmFjdCQxKHRoaXMsIGlucHV0LCB2YWx1ZSwgLTEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFic0NlaWwobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnViYmxlKCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMsXG4gICAgICAgICAgICBtb250aHMgPSB0aGlzLl9tb250aHMsXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5fZGF0YSxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICB5ZWFycyxcbiAgICAgICAgICAgIG1vbnRoc0Zyb21EYXlzO1xuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBtaXggb2YgcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHZhbHVlcywgYnViYmxlIGRvd24gZmlyc3RcbiAgICAgICAgLy8gY2hlY2s6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yMTY2XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgKG1pbGxpc2Vjb25kcyA+PSAwICYmIGRheXMgPj0gMCAmJiBtb250aHMgPj0gMCkgfHxcbiAgICAgICAgICAgICAgICAobWlsbGlzZWNvbmRzIDw9IDAgJiYgZGF5cyA8PSAwICYmIG1vbnRocyA8PSAwKVxuICAgICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyArPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHMpICsgZGF5cykgKiA4NjRlNTtcbiAgICAgICAgICAgIGRheXMgPSAwO1xuICAgICAgICAgICAgbW9udGhzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcbiAgICAgICAgLy8gZXhhbXBsZXMgb2Ygd2hhdCB0aGF0IG1lYW5zLlxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcyAlIDEwMDA7XG5cbiAgICAgICAgc2Vjb25kcyA9IGFic0Zsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xuICAgICAgICBkYXRhLnNlY29uZHMgPSBzZWNvbmRzICUgNjA7XG5cbiAgICAgICAgbWludXRlcyA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGRhdGEubWludXRlcyA9IG1pbnV0ZXMgJSA2MDtcblxuICAgICAgICBob3VycyA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIGRhdGEuaG91cnMgPSBob3VycyAlIDI0O1xuXG4gICAgICAgIGRheXMgKz0gYWJzRmxvb3IoaG91cnMgLyAyNCk7XG5cbiAgICAgICAgLy8gY29udmVydCBkYXlzIHRvIG1vbnRoc1xuICAgICAgICBtb250aHNGcm9tRGF5cyA9IGFic0Zsb29yKGRheXNUb01vbnRocyhkYXlzKSk7XG4gICAgICAgIG1vbnRocyArPSBtb250aHNGcm9tRGF5cztcbiAgICAgICAgZGF5cyAtPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHNGcm9tRGF5cykpO1xuXG4gICAgICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcbiAgICAgICAgeWVhcnMgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XG4gICAgICAgIG1vbnRocyAlPSAxMjtcblxuICAgICAgICBkYXRhLmRheXMgPSBkYXlzO1xuICAgICAgICBkYXRhLm1vbnRocyA9IG1vbnRocztcbiAgICAgICAgZGF0YS55ZWFycyA9IHllYXJzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheXNUb01vbnRocyhkYXlzKSB7XG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDE0NjA5NyBkYXlzICh0YWtpbmcgaW50byBhY2NvdW50IGxlYXAgeWVhciBydWxlcylcbiAgICAgICAgLy8gNDAwIHllYXJzIGhhdmUgMTIgbW9udGhzID09PSA0ODAwXG4gICAgICAgIHJldHVybiAoZGF5cyAqIDQ4MDApIC8gMTQ2MDk3O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbnRoc1RvRGF5cyhtb250aHMpIHtcbiAgICAgICAgLy8gdGhlIHJldmVyc2Ugb2YgZGF5c1RvTW9udGhzXG4gICAgICAgIHJldHVybiAobW9udGhzICogMTQ2MDk3KSAvIDQ4MDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXModW5pdHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF5cyxcbiAgICAgICAgICAgIG1vbnRocyxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcblxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgICAgICBpZiAodW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICdxdWFydGVyJyB8fCB1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICBkYXlzID0gdGhpcy5fZGF5cyArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzICsgZGF5c1RvTW9udGhzKGRheXMpO1xuICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRocztcbiAgICAgICAgICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRocyAvIDM7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aHMgLyAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBtaWxsaXNlY29uZHMgc2VwYXJhdGVseSBiZWNhdXNlIG9mIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIChpc3N1ZSAjMTg2NylcbiAgICAgICAgICAgIGRheXMgPSB0aGlzLl9kYXlzICsgTWF0aC5yb3VuZChtb250aHNUb0RheXModGhpcy5fbW9udGhzKSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXlzIC8gNyArIG1pbGxpc2Vjb25kcyAvIDYwNDhlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5cyArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5cyAqIDI0ICsgbWlsbGlzZWNvbmRzIC8gMzZlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5cyAqIDE0NDAgKyBtaWxsaXNlY29uZHMgLyA2ZTQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRheXMgKiA4NjQwMCArIG1pbGxpc2Vjb25kcyAvIDEwMDA7XG4gICAgICAgICAgICAgICAgLy8gTWF0aC5mbG9vciBwcmV2ZW50cyBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyBoZXJlXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihkYXlzICogODY0ZTUpICsgbWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0ICcgKyB1bml0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2UgdGhpcy5hcygnbXMnKT9cbiAgICBmdW5jdGlvbiB2YWx1ZU9mJDEoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICB0aGlzLl9kYXlzICogODY0ZTUgK1xuICAgICAgICAgICAgKHRoaXMuX21vbnRocyAlIDEyKSAqIDI1OTJlNiArXG4gICAgICAgICAgICB0b0ludCh0aGlzLl9tb250aHMgLyAxMikgKiAzMTUzNmU2XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUFzKGFsaWFzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpLFxuICAgICAgICBhc1NlY29uZHMgPSBtYWtlQXMoJ3MnKSxcbiAgICAgICAgYXNNaW51dGVzID0gbWFrZUFzKCdtJyksXG4gICAgICAgIGFzSG91cnMgPSBtYWtlQXMoJ2gnKSxcbiAgICAgICAgYXNEYXlzID0gbWFrZUFzKCdkJyksXG4gICAgICAgIGFzV2Vla3MgPSBtYWtlQXMoJ3cnKSxcbiAgICAgICAgYXNNb250aHMgPSBtYWtlQXMoJ00nKSxcbiAgICAgICAgYXNRdWFydGVycyA9IG1ha2VBcygnUScpLFxuICAgICAgICBhc1llYXJzID0gbWFrZUFzKCd5Jyk7XG5cbiAgICBmdW5jdGlvbiBjbG9uZSQxKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24odGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0JDIodW5pdHMpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXNbdW5pdHMgKyAncyddKCkgOiBOYU47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUdldHRlcihuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9kYXRhW25hbWVdIDogTmFOO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBtaWxsaXNlY29uZHMgPSBtYWtlR2V0dGVyKCdtaWxsaXNlY29uZHMnKSxcbiAgICAgICAgc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ3NlY29uZHMnKSxcbiAgICAgICAgbWludXRlcyA9IG1ha2VHZXR0ZXIoJ21pbnV0ZXMnKSxcbiAgICAgICAgaG91cnMgPSBtYWtlR2V0dGVyKCdob3VycycpLFxuICAgICAgICBkYXlzID0gbWFrZUdldHRlcignZGF5cycpLFxuICAgICAgICBtb250aHMgPSBtYWtlR2V0dGVyKCdtb250aHMnKSxcbiAgICAgICAgeWVhcnMgPSBtYWtlR2V0dGVyKCd5ZWFycycpO1xuXG4gICAgZnVuY3Rpb24gd2Vla3MoKSB7XG4gICAgICAgIHJldHVybiBhYnNGbG9vcih0aGlzLmRheXMoKSAvIDcpO1xuICAgIH1cblxuICAgIHZhciByb3VuZCA9IE1hdGgucm91bmQsXG4gICAgICAgIHRocmVzaG9sZHMgPSB7XG4gICAgICAgICAgICBzczogNDQsIC8vIGEgZmV3IHNlY29uZHMgdG8gc2Vjb25kc1xuICAgICAgICAgICAgczogNDUsIC8vIHNlY29uZHMgdG8gbWludXRlXG4gICAgICAgICAgICBtOiA0NSwgLy8gbWludXRlcyB0byBob3VyXG4gICAgICAgICAgICBoOiAyMiwgLy8gaG91cnMgdG8gZGF5XG4gICAgICAgICAgICBkOiAyNiwgLy8gZGF5cyB0byBtb250aC93ZWVrXG4gICAgICAgICAgICB3OiBudWxsLCAvLyB3ZWVrcyB0byBtb250aFxuICAgICAgICAgICAgTTogMTEsIC8vIG1vbnRocyB0byB5ZWFyXG4gICAgICAgIH07XG5cbiAgICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIG1vbWVudC5mbi5mcm9tLCBtb21lbnQuZm4uZnJvbU5vdywgYW5kIG1vbWVudC5kdXJhdGlvbi5mbi5odW1hbml6ZVxuICAgIGZ1bmN0aW9uIHN1YnN0aXR1dGVUaW1lQWdvKHN0cmluZywgbnVtYmVyLCB3aXRob3V0U3VmZml4LCBpc0Z1dHVyZSwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbGF0aXZlVGltZSQxKHBvc05lZ0R1cmF0aW9uLCB3aXRob3V0U3VmZml4LCB0aHJlc2hvbGRzLCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gY3JlYXRlRHVyYXRpb24ocG9zTmVnRHVyYXRpb24pLmFicygpLFxuICAgICAgICAgICAgc2Vjb25kcyA9IHJvdW5kKGR1cmF0aW9uLmFzKCdzJykpLFxuICAgICAgICAgICAgbWludXRlcyA9IHJvdW5kKGR1cmF0aW9uLmFzKCdtJykpLFxuICAgICAgICAgICAgaG91cnMgPSByb3VuZChkdXJhdGlvbi5hcygnaCcpKSxcbiAgICAgICAgICAgIGRheXMgPSByb3VuZChkdXJhdGlvbi5hcygnZCcpKSxcbiAgICAgICAgICAgIG1vbnRocyA9IHJvdW5kKGR1cmF0aW9uLmFzKCdNJykpLFxuICAgICAgICAgICAgd2Vla3MgPSByb3VuZChkdXJhdGlvbi5hcygndycpKSxcbiAgICAgICAgICAgIHllYXJzID0gcm91bmQoZHVyYXRpb24uYXMoJ3knKSksXG4gICAgICAgICAgICBhID1cbiAgICAgICAgICAgICAgICAoc2Vjb25kcyA8PSB0aHJlc2hvbGRzLnNzICYmIFsncycsIHNlY29uZHNdKSB8fFxuICAgICAgICAgICAgICAgIChzZWNvbmRzIDwgdGhyZXNob2xkcy5zICYmIFsnc3MnLCBzZWNvbmRzXSkgfHxcbiAgICAgICAgICAgICAgICAobWludXRlcyA8PSAxICYmIFsnbSddKSB8fFxuICAgICAgICAgICAgICAgIChtaW51dGVzIDwgdGhyZXNob2xkcy5tICYmIFsnbW0nLCBtaW51dGVzXSkgfHxcbiAgICAgICAgICAgICAgICAoaG91cnMgPD0gMSAmJiBbJ2gnXSkgfHxcbiAgICAgICAgICAgICAgICAoaG91cnMgPCB0aHJlc2hvbGRzLmggJiYgWydoaCcsIGhvdXJzXSkgfHxcbiAgICAgICAgICAgICAgICAoZGF5cyA8PSAxICYmIFsnZCddKSB8fFxuICAgICAgICAgICAgICAgIChkYXlzIDwgdGhyZXNob2xkcy5kICYmIFsnZGQnLCBkYXlzXSk7XG5cbiAgICAgICAgaWYgKHRocmVzaG9sZHMudyAhPSBudWxsKSB7XG4gICAgICAgICAgICBhID1cbiAgICAgICAgICAgICAgICBhIHx8XG4gICAgICAgICAgICAgICAgKHdlZWtzIDw9IDEgJiYgWyd3J10pIHx8XG4gICAgICAgICAgICAgICAgKHdlZWtzIDwgdGhyZXNob2xkcy53ICYmIFsnd3cnLCB3ZWVrc10pO1xuICAgICAgICB9XG4gICAgICAgIGEgPSBhIHx8XG4gICAgICAgICAgICAobW9udGhzIDw9IDEgJiYgWydNJ10pIHx8XG4gICAgICAgICAgICAobW9udGhzIDwgdGhyZXNob2xkcy5NICYmIFsnTU0nLCBtb250aHNdKSB8fFxuICAgICAgICAgICAgKHllYXJzIDw9IDEgJiYgWyd5J10pIHx8IFsneXknLCB5ZWFyc107XG5cbiAgICAgICAgYVsyXSA9IHdpdGhvdXRTdWZmaXg7XG4gICAgICAgIGFbM10gPSArcG9zTmVnRHVyYXRpb24gPiAwO1xuICAgICAgICBhWzRdID0gbG9jYWxlO1xuICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZVRpbWVBZ28uYXBwbHkobnVsbCwgYSk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCB0aGUgcm91bmRpbmcgZnVuY3Rpb24gZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nKHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHJvdW5kaW5nRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygcm91bmRpbmdGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcm91bmQgPSByb3VuZGluZ0Z1bmN0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgYSB0aHJlc2hvbGQgZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZCh0aHJlc2hvbGQsIGxpbWl0KSB7XG4gICAgICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyZXNob2xkc1t0aHJlc2hvbGRdO1xuICAgICAgICB9XG4gICAgICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xuICAgICAgICBpZiAodGhyZXNob2xkID09PSAncycpIHtcbiAgICAgICAgICAgIHRocmVzaG9sZHMuc3MgPSBsaW1pdCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaHVtYW5pemUoYXJnV2l0aFN1ZmZpeCwgYXJnVGhyZXNob2xkcykge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3aXRoU3VmZml4ID0gZmFsc2UsXG4gICAgICAgICAgICB0aCA9IHRocmVzaG9sZHMsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICBvdXRwdXQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdXaXRoU3VmZml4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYXJnVGhyZXNob2xkcyA9IGFyZ1dpdGhTdWZmaXg7XG4gICAgICAgICAgICBhcmdXaXRoU3VmZml4ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdXaXRoU3VmZml4ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHdpdGhTdWZmaXggPSBhcmdXaXRoU3VmZml4O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYXJnVGhyZXNob2xkcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoID0gT2JqZWN0LmFzc2lnbih7fSwgdGhyZXNob2xkcywgYXJnVGhyZXNob2xkcyk7XG4gICAgICAgICAgICBpZiAoYXJnVGhyZXNob2xkcy5zICE9IG51bGwgJiYgYXJnVGhyZXNob2xkcy5zcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGguc3MgPSBhcmdUaHJlc2hvbGRzLnMgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxlID0gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgIG91dHB1dCA9IHJlbGF0aXZlVGltZSQxKHRoaXMsICF3aXRoU3VmZml4LCB0aCwgbG9jYWxlKTtcblxuICAgICAgICBpZiAod2l0aFN1ZmZpeCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gbG9jYWxlLnBhc3RGdXR1cmUoK3RoaXMsIG91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbG9jYWxlLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICB2YXIgYWJzJDEgPSBNYXRoLmFicztcblxuICAgIGZ1bmN0aW9uIHNpZ24oeCkge1xuICAgICAgICByZXR1cm4gKHggPiAwKSAtICh4IDwgMCkgfHwgK3g7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9JU09TdHJpbmckMSgpIHtcbiAgICAgICAgLy8gZm9yIElTTyBzdHJpbmdzIHdlIGRvIG5vdCB1c2UgdGhlIG5vcm1hbCBidWJibGluZyBydWxlczpcbiAgICAgICAgLy8gICogbWlsbGlzZWNvbmRzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSBob3Vyc1xuICAgICAgICAvLyAgKiBkYXlzIGRvIG5vdCBidWJibGUgYXQgYWxsXG4gICAgICAgIC8vICAqIG1vbnRocyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgeWVhcnNcbiAgICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIHRoZXJlIGlzIG5vIGNvbnRleHQtZnJlZSBjb252ZXJzaW9uIGJldHdlZW4gaG91cnMgYW5kIGRheXNcbiAgICAgICAgLy8gKHRoaW5rIG9mIGNsb2NrIGNoYW5nZXMpXG4gICAgICAgIC8vIGFuZCBhbHNvIG5vdCBiZXR3ZWVuIGRheXMgYW5kIG1vbnRocyAoMjgtMzEgZGF5cyBwZXIgbW9udGgpXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlY29uZHMgPSBhYnMkMSh0aGlzLl9taWxsaXNlY29uZHMpIC8gMTAwMCxcbiAgICAgICAgICAgIGRheXMgPSBhYnMkMSh0aGlzLl9kYXlzKSxcbiAgICAgICAgICAgIG1vbnRocyA9IGFicyQxKHRoaXMuX21vbnRocyksXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICB5ZWFycyxcbiAgICAgICAgICAgIHMsXG4gICAgICAgICAgICB0b3RhbCA9IHRoaXMuYXNTZWNvbmRzKCksXG4gICAgICAgICAgICB0b3RhbFNpZ24sXG4gICAgICAgICAgICB5bVNpZ24sXG4gICAgICAgICAgICBkYXlzU2lnbixcbiAgICAgICAgICAgIGhtc1NpZ247XG5cbiAgICAgICAgaWYgKCF0b3RhbCkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBhcyBDIydzIChOb2RhKSBhbmQgcHl0aG9uIChpc29kYXRlKS4uLlxuICAgICAgICAgICAgLy8gYnV0IG5vdCBvdGhlciBKUyAoZ29vZy5kYXRlKVxuICAgICAgICAgICAgcmV0dXJuICdQMEQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMzYwMCBzZWNvbmRzIC0+IDYwIG1pbnV0ZXMgLT4gMSBob3VyXG4gICAgICAgIG1pbnV0ZXMgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBob3VycyA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIHNlY29uZHMgJT0gNjA7XG4gICAgICAgIG1pbnV0ZXMgJT0gNjA7XG5cbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgICAgICB5ZWFycyA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcbiAgICAgICAgbW9udGhzICU9IDEyO1xuXG4gICAgICAgIC8vIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9kb3JkaWxsZS9tb21lbnQtaXNvZHVyYXRpb24vYmxvYi9tYXN0ZXIvbW9tZW50Lmlzb2R1cmF0aW9uLmpzXG4gICAgICAgIHMgPSBzZWNvbmRzID8gc2Vjb25kcy50b0ZpeGVkKDMpLnJlcGxhY2UoL1xcLj8wKyQvLCAnJykgOiAnJztcblxuICAgICAgICB0b3RhbFNpZ24gPSB0b3RhbCA8IDAgPyAnLScgOiAnJztcbiAgICAgICAgeW1TaWduID0gc2lnbih0aGlzLl9tb250aHMpICE9PSBzaWduKHRvdGFsKSA/ICctJyA6ICcnO1xuICAgICAgICBkYXlzU2lnbiA9IHNpZ24odGhpcy5fZGF5cykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XG4gICAgICAgIGhtc1NpZ24gPSBzaWduKHRoaXMuX21pbGxpc2Vjb25kcykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRvdGFsU2lnbiArXG4gICAgICAgICAgICAnUCcgK1xuICAgICAgICAgICAgKHllYXJzID8geW1TaWduICsgeWVhcnMgKyAnWScgOiAnJykgK1xuICAgICAgICAgICAgKG1vbnRocyA/IHltU2lnbiArIG1vbnRocyArICdNJyA6ICcnKSArXG4gICAgICAgICAgICAoZGF5cyA/IGRheXNTaWduICsgZGF5cyArICdEJyA6ICcnKSArXG4gICAgICAgICAgICAoaG91cnMgfHwgbWludXRlcyB8fCBzZWNvbmRzID8gJ1QnIDogJycpICtcbiAgICAgICAgICAgIChob3VycyA/IGhtc1NpZ24gKyBob3VycyArICdIJyA6ICcnKSArXG4gICAgICAgICAgICAobWludXRlcyA/IGhtc1NpZ24gKyBtaW51dGVzICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChzZWNvbmRzID8gaG1zU2lnbiArIHMgKyAnUycgOiAnJylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvdG8kMiA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxuICAgIHByb3RvJDIuaXNWYWxpZCA9IGlzVmFsaWQkMTtcbiAgICBwcm90byQyLmFicyA9IGFicztcbiAgICBwcm90byQyLmFkZCA9IGFkZCQxO1xuICAgIHByb3RvJDIuc3VidHJhY3QgPSBzdWJ0cmFjdCQxO1xuICAgIHByb3RvJDIuYXMgPSBhcztcbiAgICBwcm90byQyLmFzTWlsbGlzZWNvbmRzID0gYXNNaWxsaXNlY29uZHM7XG4gICAgcHJvdG8kMi5hc1NlY29uZHMgPSBhc1NlY29uZHM7XG4gICAgcHJvdG8kMi5hc01pbnV0ZXMgPSBhc01pbnV0ZXM7XG4gICAgcHJvdG8kMi5hc0hvdXJzID0gYXNIb3VycztcbiAgICBwcm90byQyLmFzRGF5cyA9IGFzRGF5cztcbiAgICBwcm90byQyLmFzV2Vla3MgPSBhc1dlZWtzO1xuICAgIHByb3RvJDIuYXNNb250aHMgPSBhc01vbnRocztcbiAgICBwcm90byQyLmFzUXVhcnRlcnMgPSBhc1F1YXJ0ZXJzO1xuICAgIHByb3RvJDIuYXNZZWFycyA9IGFzWWVhcnM7XG4gICAgcHJvdG8kMi52YWx1ZU9mID0gdmFsdWVPZiQxO1xuICAgIHByb3RvJDIuX2J1YmJsZSA9IGJ1YmJsZTtcbiAgICBwcm90byQyLmNsb25lID0gY2xvbmUkMTtcbiAgICBwcm90byQyLmdldCA9IGdldCQyO1xuICAgIHByb3RvJDIubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICAgIHByb3RvJDIuc2Vjb25kcyA9IHNlY29uZHM7XG4gICAgcHJvdG8kMi5taW51dGVzID0gbWludXRlcztcbiAgICBwcm90byQyLmhvdXJzID0gaG91cnM7XG4gICAgcHJvdG8kMi5kYXlzID0gZGF5cztcbiAgICBwcm90byQyLndlZWtzID0gd2Vla3M7XG4gICAgcHJvdG8kMi5tb250aHMgPSBtb250aHM7XG4gICAgcHJvdG8kMi55ZWFycyA9IHllYXJzO1xuICAgIHByb3RvJDIuaHVtYW5pemUgPSBodW1hbml6ZTtcbiAgICBwcm90byQyLnRvSVNPU3RyaW5nID0gdG9JU09TdHJpbmckMTtcbiAgICBwcm90byQyLnRvU3RyaW5nID0gdG9JU09TdHJpbmckMTtcbiAgICBwcm90byQyLnRvSlNPTiA9IHRvSVNPU3RyaW5nJDE7XG4gICAgcHJvdG8kMi5sb2NhbGUgPSBsb2NhbGU7XG4gICAgcHJvdG8kMi5sb2NhbGVEYXRhID0gbG9jYWxlRGF0YTtcblxuICAgIHByb3RvJDIudG9Jc29TdHJpbmcgPSBkZXByZWNhdGUoXG4gICAgICAgICd0b0lzb1N0cmluZygpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdG9JU09TdHJpbmcoKSBpbnN0ZWFkIChub3RpY2UgdGhlIGNhcGl0YWxzKScsXG4gICAgICAgIHRvSVNPU3RyaW5nJDFcbiAgICApO1xuICAgIHByb3RvJDIubGFuZyA9IGxhbmc7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignWCcsIDAsIDAsICd1bml4Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3gnLCAwLCAwLCAndmFsdWVPZicpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigneCcsIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdYJywgbWF0Y2hUaW1lc3RhbXApO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUocGFyc2VGbG9hdChpbnB1dCkgKiAxMDAwKTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCd4JywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHRvSW50KGlucHV0KSk7XG4gICAgfSk7XG5cbiAgICAvLyEgbW9tZW50LmpzXG5cbiAgICBob29rcy52ZXJzaW9uID0gJzIuMjkuNCc7XG5cbiAgICBzZXRIb29rQ2FsbGJhY2soY3JlYXRlTG9jYWwpO1xuXG4gICAgaG9va3MuZm4gPSBwcm90bztcbiAgICBob29rcy5taW4gPSBtaW47XG4gICAgaG9va3MubWF4ID0gbWF4O1xuICAgIGhvb2tzLm5vdyA9IG5vdztcbiAgICBob29rcy51dGMgPSBjcmVhdGVVVEM7XG4gICAgaG9va3MudW5peCA9IGNyZWF0ZVVuaXg7XG4gICAgaG9va3MubW9udGhzID0gbGlzdE1vbnRocztcbiAgICBob29rcy5pc0RhdGUgPSBpc0RhdGU7XG4gICAgaG9va3MubG9jYWxlID0gZ2V0U2V0R2xvYmFsTG9jYWxlO1xuICAgIGhvb2tzLmludmFsaWQgPSBjcmVhdGVJbnZhbGlkO1xuICAgIGhvb2tzLmR1cmF0aW9uID0gY3JlYXRlRHVyYXRpb247XG4gICAgaG9va3MuaXNNb21lbnQgPSBpc01vbWVudDtcbiAgICBob29rcy53ZWVrZGF5cyA9IGxpc3RXZWVrZGF5cztcbiAgICBob29rcy5wYXJzZVpvbmUgPSBjcmVhdGVJblpvbmU7XG4gICAgaG9va3MubG9jYWxlRGF0YSA9IGdldExvY2FsZTtcbiAgICBob29rcy5pc0R1cmF0aW9uID0gaXNEdXJhdGlvbjtcbiAgICBob29rcy5tb250aHNTaG9ydCA9IGxpc3RNb250aHNTaG9ydDtcbiAgICBob29rcy53ZWVrZGF5c01pbiA9IGxpc3RXZWVrZGF5c01pbjtcbiAgICBob29rcy5kZWZpbmVMb2NhbGUgPSBkZWZpbmVMb2NhbGU7XG4gICAgaG9va3MudXBkYXRlTG9jYWxlID0gdXBkYXRlTG9jYWxlO1xuICAgIGhvb2tzLmxvY2FsZXMgPSBsaXN0TG9jYWxlcztcbiAgICBob29rcy53ZWVrZGF5c1Nob3J0ID0gbGlzdFdlZWtkYXlzU2hvcnQ7XG4gICAgaG9va3Mubm9ybWFsaXplVW5pdHMgPSBub3JtYWxpemVVbml0cztcbiAgICBob29rcy5yZWxhdGl2ZVRpbWVSb3VuZGluZyA9IGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nO1xuICAgIGhvb2tzLnJlbGF0aXZlVGltZVRocmVzaG9sZCA9IGdldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZDtcbiAgICBob29rcy5jYWxlbmRhckZvcm1hdCA9IGdldENhbGVuZGFyRm9ybWF0O1xuICAgIGhvb2tzLnByb3RvdHlwZSA9IHByb3RvO1xuXG4gICAgLy8gY3VycmVudGx5IEhUTUw1IGlucHV0IHR5cGUgb25seSBzdXBwb3J0cyAyNC1ob3VyIGZvcm1hdHNcbiAgICBob29rcy5IVE1MNV9GTVQgPSB7XG4gICAgICAgIERBVEVUSU1FX0xPQ0FMOiAnWVlZWS1NTS1ERFRISDptbScsIC8vIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiAvPlxuICAgICAgICBEQVRFVElNRV9MT0NBTF9TRUNPTkRTOiAnWVlZWS1NTS1ERFRISDptbTpzcycsIC8vIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBzdGVwPVwiMVwiIC8+XG4gICAgICAgIERBVEVUSU1FX0xPQ0FMX01TOiAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1MnLCAvLyA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgc3RlcD1cIjAuMDAxXCIgLz5cbiAgICAgICAgREFURTogJ1lZWVktTU0tREQnLCAvLyA8aW5wdXQgdHlwZT1cImRhdGVcIiAvPlxuICAgICAgICBUSU1FOiAnSEg6bW0nLCAvLyA8aW5wdXQgdHlwZT1cInRpbWVcIiAvPlxuICAgICAgICBUSU1FX1NFQ09ORFM6ICdISDptbTpzcycsIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIHN0ZXA9XCIxXCIgLz5cbiAgICAgICAgVElNRV9NUzogJ0hIOm1tOnNzLlNTUycsIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIHN0ZXA9XCIwLjAwMVwiIC8+XG4gICAgICAgIFdFRUs6ICdHR0dHLVtXXVdXJywgLy8gPGlucHV0IHR5cGU9XCJ3ZWVrXCIgLz5cbiAgICAgICAgTU9OVEg6ICdZWVlZLU1NJywgLy8gPGlucHV0IHR5cGU9XCJtb250aFwiIC8+XG4gICAgfTtcblxuICAgIHJldHVybiBob29rcztcblxufSkpKTtcbiIsICIvLyBzcmMvaTE4bi50c1xuaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbnMge1xuICAgIHBsdWdpbk5hbWU6IHN0cmluZztcbiAgICBwbHVnaW5EZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIG9wZW5Kb3RWaWV3OiBzdHJpbmc7XG4gICAgcXVpY2tDYXB0dXJlOiBzdHJpbmc7XG4gICAgc2F2ZUFzSm90OiBzdHJpbmc7XG4gICAgc2F2ZWRBc0pvdDogc3RyaW5nO1xuICAgIGpvdFZpZXc6IHN0cmluZztcbiAgICBxdWlja1JlY29yZDogc3RyaW5nO1xuICAgIGNvbnRlbnRQbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHBsYWNlaG9sZGVyV2l0aExpbms6IHN0cmluZztcbiAgICB0YWdzUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICB0YWdzSW5wdXRQbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHNvdXJjZVBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudFBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudFNlbGVjdGVkOiBzdHJpbmc7XG4gICAgc2F2ZTogc3RyaW5nO1xuICAgIGNhbmNlbDogc3RyaW5nO1xuICAgIGNvbnRlbnRSZXF1aXJlZDogc3RyaW5nO1xuICAgIHNhdmVkOiBzdHJpbmc7XG4gICAgam90VXBkYXRlTm90Rm91bmQ6IHN0cmluZztcbiAgICBqb3RVcGRhdGVOb0ZpbGU6IHN0cmluZztcbiAgICBqb3RVcGRhdGVGaWxlTWlzc2luZzogc3RyaW5nO1xuICAgIHNhdmVGYWlsZWQ6IHN0cmluZztcbiAgICBhdHRhY2htZW50U2F2ZWQ6IHN0cmluZztcbiAgICB0b3RhbDogc3RyaW5nO1xuICAgIHRvZGF5OiBzdHJpbmc7XG4gICAgdGhpc01vbnRoOiBzdHJpbmc7XG4gICAgY2FsZW5kYXI6IHN0cmluZztcbiAgICB5ZWFyOiBzdHJpbmc7XG4gICAgbW9udGg6IHN0cmluZztcbiAgICBzZWFyY2hBbmRUYWdzOiBzdHJpbmc7XG4gICAgc2VhcmNoUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBzZWFyY2hQbGFjZWhvbGRlclNob3J0OiBzdHJpbmc7XG4gICAgbW9yZVRhZ3M6IHN0cmluZztcbiAgICBub1JlY29yZHM6IHN0cmluZztcbiAgICBzZXR0aW5nczogc3RyaW5nO1xuICAgIHNhdmVGb2xkZXI6IHN0cmluZztcbiAgICBzYXZlRm9sZGVyRGVzYzogc3RyaW5nO1xuICAgIGF0dGFjaG1lbnRzRm9sZGVyOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudHNGb2xkZXJEZXNjOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudHNOYW1pbmc6IHN0cmluZztcbiAgICBsb2dNb2RlOiBzdHJpbmc7XG4gICAgbG9nTW9kZURlc2M6IHN0cmluZztcbiAgICBsb2dNb2RlTXVsdGk6IHN0cmluZztcbiAgICBsb2dNb2RlU2luZ2xlOiBzdHJpbmc7XG4gICAgZmlsZUZvcm1hdDogc3RyaW5nO1xuICAgIGZpbGVGb3JtYXREZXNjOiBzdHJpbmc7XG4gICAgdXNlRml4ZWRUYWc6IHN0cmluZztcbiAgICB1c2VGaXhlZFRhZ0Rlc2M6IHN0cmluZztcbiAgICBmaXhlZFRhZzogc3RyaW5nO1xuICAgIGZpeGVkVGFnRGVzYzogc3RyaW5nO1xuICAgIGVuYWJsZVRhZ3NJbkZyb250bWF0dGVyOiBzdHJpbmc7XG4gICAgZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJEZXNjOiBzdHJpbmc7XG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbiAgICBsYW5ndWFnZURlc2M6IHN0cmluZztcbiAgICBsYW5ndWFnZVpoOiBzdHJpbmc7XG4gICAgbGFuZ3VhZ2VFbjogc3RyaW5nO1xuICAgIG11bHRpTW9kZUluZm86IHN0cmluZztcbiAgICBzaW5nbGVNb2RlSW5mbzogc3RyaW5nO1xuICAgIHJlY29yZEZvcm1hdDogc3RyaW5nO1xuICAgIG5ld1JlY29yZEF0VG9wOiBzdHJpbmc7XG4gICAgaW1hZ2VFbWJlZDogc3RyaW5nO1xuICAgIGZpbGVMaW5rOiBzdHJpbmc7XG4gICAgbG9hZGluZ1BsdWdpbjogc3RyaW5nO1xuICAgIHVubG9hZGluZ1BsdWdpbjogc3RyaW5nO1xuICAgIGxvYWRpbmdTZXR0aW5nczogc3RyaW5nO1xuICAgIGNyZWF0aW5nQXR0YWNobWVudHNGb2xkZXI6IHN0cmluZztcbiAgICBhdHRhY2htZW50c0ZvbGRlckV4aXN0czogc3RyaW5nO1xuICAgIGNyZWF0aW5nSm90Vmlldzogc3RyaW5nO1xuICAgIGFjdGl2YXRpbmdWaWV3OiBzdHJpbmc7XG4gICAgcGx1Z2luTm90TG9hZGVkOiBzdHJpbmc7XG4gICAgZXhpc3RpbmdWaWV3Rm91bmQ6IHN0cmluZztcbiAgICBjcmVhdGluZ05ld1ZpZXc6IHN0cmluZztcbiAgICB3ZWVrZGF5czogc3RyaW5nW107XG4gICAgc2VsZWN0ZWRGaWxlczogc3RyaW5nO1xuICAgIHJlY29yZHNDb3VudDogc3RyaW5nO1xuICAgIGF1dG9PcGVuVmlldzogc3RyaW5nO1xuICAgIGF1dG9PcGVuVmlld0Rlc2M6IHN0cmluZztcbiAgICBqb3RVcGRhdGVkQXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHRyYW5zbGF0aW9uczogUmVjb3JkPExhbmd1YWdlLCBUcmFuc2xhdGlvbnM+ID0ge1xuICAgIHpoOiB7XG4gICAgICAgIHBsdWdpbk5hbWU6IFwiXHU5NjhGXHU2MjRCXHU4QkIwXCIsXG4gICAgICAgIHBsdWdpbkRlc2NyaXB0aW9uOiBcIlx1OTY4Rlx1NjI0Qlx1OEJCMFx1NUY1NVx1NjBGM1x1NkNENVx1NTQ4Q1x1N0IxNFx1OEJCMFwiLFxuICAgICAgICBvcGVuSm90VmlldzogXCJcdTYyNTNcdTVGMDBcdTk2OEZcdTYyNEJcdThCQjBcdTg5QzZcdTU2RkVcIixcbiAgICAgICAgcXVpY2tDYXB0dXJlOiBcIlx1NUZFQlx1OTAxRlx1OEJCMFx1NUY1NVwiLFxuICAgICAgICBzYXZlQXNKb3Q6IFwiXHU0RkREXHU1QjU4XHU0RTNBXHU5NjhGXHU2MjRCXHU4QkIwXCIsXG4gICAgICAgIHNhdmVkQXNKb3Q6IFwiXHU1REYyXHU0RkREXHU1QjU4XHU0RTNBXHU5NjhGXHU2MjRCXHU4QkIwXHVGRjAxXCIsXG4gICAgICAgIGpvdFZpZXc6IFwiXHU5NjhGXHU2MjRCXHU4QkIwXCIsXG4gICAgICAgIHF1aWNrUmVjb3JkOiBcIlx1NUZFQlx1OTAxRlx1OEJCMFx1NUY1NVwiLFxuICAgICAgICBjb250ZW50UGxhY2Vob2xkZXI6IFwiXHU2QjY0XHU1MjNCXHU3Njg0XHU2MEYzXHU2Q0Q1Li4uXCIsXG4gICAgICAgIHBsYWNlaG9sZGVyV2l0aExpbms6IFwiXHU2QjY0XHU1MjNCXHU3Njg0XHU2MEYzXHU2Q0Q1Li4uXFxuXHU4RjkzXHU1MTY1IFtbIFx1NTNFRlx1NUZFQlx1OTAxRlx1NjNEMlx1NTE2NVx1N0IxNFx1OEJCMFx1OTRGRVx1NjNBNVwiLFxuICAgICAgICB0YWdzUGxhY2Vob2xkZXI6IFwiXHU2ODA3XHU3QjdFXCIsXG4gICAgICAgIHRhZ3NJbnB1dFBsYWNlaG9sZGVyOiBcIlx1NjMwOVx1NTZERVx1OEY2Nlx1NkRGQlx1NTJBMFx1NjgwN1x1N0I3RVx1RkYwQ1x1NEY3Rlx1NzUyOCAvIFx1OEZEQlx1ODg0Q1x1NUQ0Q1x1NTk1N1wiLFxuICAgICAgICBzb3VyY2VQbGFjZWhvbGRlcjogXCJcdTY3NjVcdTZFOTBcIixcbiAgICAgICAgYXR0YWNobWVudFBsYWNlaG9sZGVyOiBcIlx1RDgzRFx1RENDRSBcdTcwQjlcdTUxRkJcdTYyMTZcdTYyRDZcdTYyRkRcdTY1ODdcdTRFRjZcdTUyMzBcdThGRDlcdTkxQ0NcIixcbiAgICAgICAgYXR0YWNobWVudFNlbGVjdGVkOiBcIlx1MjcwNSBcdTVERjJcdTkwMDlcdTYyRTk6IHtmaWxlbmFtZX1cIixcbiAgICAgICAgc2F2ZTogXCJcdTRGRERcdTVCNThcIixcbiAgICAgICAgY2FuY2VsOiBcIlx1NTNENlx1NkQ4OFwiLFxuICAgICAgICBjb250ZW50UmVxdWlyZWQ6IFwiXHU1MTg1XHU1QkI5XHU0RTBEXHU4MEZEXHU0RTNBXHU3QTdBXCIsXG4gICAgICAgIHNhdmVkOiBcIlx1NURGMlx1NEZERFx1NUI1OFx1RkYwMVwiLFxuICAgICAgICBqb3RVcGRhdGVOb3RGb3VuZDogXCJcdTU3MjhcdTY1ODdcdTRFRjZcdTRFMkRcdTYyN0VcdTRFMERcdTUyMzBcdThCRTVcdTY3NjFcdTk2OEZcdTYyNEJcdThCQjBcdTMwMDJcIixcbiAgICAgICAgam90VXBkYXRlTm9GaWxlOiBcIlx1OEJFNVx1OEJCMFx1NUY1NVx1NkNBMVx1NjcwOVx1NTE3M1x1ODA1NFx1NzY4NFx1NjU4N1x1NEVGNlx1MzAwMlwiLFxuICAgICAgICBqb3RVcGRhdGVGaWxlTWlzc2luZzogXCJcdTZFOTBcdTY1ODdcdTRFRjZcdTRFMERcdTVCNThcdTU3MjhcdTMwMDJcIixcbiAgICAgICAgc2F2ZUZhaWxlZDogXCJcdTRGRERcdTVCNThcdTU5MzFcdThEMjU6IHtlcnJvcn1cIixcbiAgICAgICAgYXR0YWNobWVudFNhdmVkOiBcIlx1OTY0NFx1NEVGNlx1NURGMlx1NEZERFx1NUI1ODoge2ZpbGVuYW1lfVwiLFxuICAgICAgICB0b3RhbDogXCJcdTYwM0JcdThCQTFcIixcbiAgICAgICAgdG9kYXk6IFwiXHU0RUNBXHU2NUU1XCIsXG4gICAgICAgIHRoaXNNb250aDogXCJcdTY3MkNcdTY3MDhcIixcbiAgICAgICAgY2FsZW5kYXI6IFwiXHU2NUU1XHU1Mzg2XCIsXG4gICAgICAgIHllYXI6IFwiXHU1RTc0XCIsXG4gICAgICAgIG1vbnRoOiBcIlx1NjcwOFwiLFxuICAgICAgICBzZWFyY2hBbmRUYWdzOiBcIlx1RDgzRFx1REQwRCBcdTY0MUNcdTdEMjJcdTRFMEVcdTY4MDdcdTdCN0VcIixcbiAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXI6IFwiXHU1MTczXHU5NTJFXHU4QkNEXHVGRjFCXHU1M0VGXHU5MDA5IGRhdGU6IC8gdXBkYXRlZDogXHU3QjVCXHU5MDA5XCIsXG4gICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyU2hvcnQ6IFwiXHU2NDFDXHU3RDIyXHVGRjFCZGF0ZTogLyB1cGRhdGVkOlwiLFxuICAgICAgICBtb3JlVGFnczogXCJcdThGRDhcdTY3MDkge2NvdW50fSBcdTRFMkFcdTY4MDdcdTdCN0UuLi5cIixcbiAgICAgICAgbm9SZWNvcmRzOiBcIlx1NjY4Mlx1NjVFMFx1OEJCMFx1NUY1NVx1RkYwQ1x1NUYwMFx1NTlDQlx1OEJCMFx1NUY1NVx1NEY2MFx1NzY4NFx1NjBGM1x1NkNENVx1NTQyN1x1RkYwMVwiLFxuICAgICAgICBzZXR0aW5nczogXCJcdThCQkVcdTdGNkVcIixcbiAgICAgICAgc2F2ZUZvbGRlcjogXCJcdTRGRERcdTVCNThcdTY1ODdcdTRFRjZcdTU5MzlcIixcbiAgICAgICAgc2F2ZUZvbGRlckRlc2M6IFwiXHU0RjREXHU0RThFIHZhdWx0IFx1NjgzOVx1NzZFRVx1NUY1NVx1RkYwQ1x1NEY4Qlx1NTk4Mlx1RkYxQUpvdHNcIixcbiAgICAgICAgYXR0YWNobWVudHNGb2xkZXI6IFwiXHU5NjQ0XHU0RUY2XHU1QjU4XHU2NTNFXHU3NkVFXHU1RjU1XCIsXG4gICAgICAgIGF0dGFjaG1lbnRzRm9sZGVyRGVzYzogXCJcdTk2NDRcdTRFRjZcdTVCNThcdTY1M0VcdTRGNERcdTdGNkVcdUZGMENcdTRGOEJcdTU5ODJcdUZGMUFKb3RzL2F0dGFjaG1lbnRzXHUzMDAyXHU5NjQ0XHU0RUY2XHU1NDdEXHU1NDBEXHU2ODNDXHU1RjBGXHVGRjFBam90LVlZWVlNTURELVx1NUU4Rlx1NjU3MFwiLFxuICAgICAgICBhdHRhY2htZW50c05hbWluZzogXCJcdTk2NDRcdTRFRjZcdTU0N0RcdTU0MERcdTY4M0NcdTVGMEZcdUZGMUFqb3QtWVlZWU1NREQtXHU1RThGXHU2NTcwXCIsXG4gICAgICAgIGxvZ01vZGU6IFwiXHU4QkIwXHU1RjU1XHU2QTIxXHU1RjBGXCIsXG4gICAgICAgIGxvZ01vZGVEZXNjOiBcIlx1OTAwOVx1NjJFOVx1OEJCMFx1NUY1NVx1NEZERFx1NUI1OFx1NjVCOVx1NUYwRlwiLFxuICAgICAgICBsb2dNb2RlTXVsdGk6IFwiXHU2QkNGXHU1OTI5XHU0RTAwXHU0RTJBXHU2NTg3XHU0RUY2XCIsXG4gICAgICAgIGxvZ01vZGVTaW5nbGU6IFwiXHU1MzU1XHU0RTJBXHU2NTg3XHU0RUY2XCIsXG4gICAgICAgIGZpbGVGb3JtYXQ6IFwiXHU2NTg3XHU0RUY2XHU1NDBEXHU2ODNDXHU1RjBGXCIsXG4gICAgICAgIGZpbGVGb3JtYXREZXNjOiBcIlx1NjU4N1x1NEVGNlx1NTQwRFx1NTQ3RFx1NTQwRFx1NjgzQ1x1NUYwRlx1RkYwQ1x1NEY4Qlx1NTk4Mlx1RkYxQWpvdC1ZWVlZTU1ERCBcdTRGMUFcdTc1MUZcdTYyMTAgam90LTIwMjYwMzI2Lm1kXCIsXG4gICAgICAgIHVzZUZpeGVkVGFnOiBcIlx1NEY3Rlx1NzUyOFx1NTZGQVx1NUI5QVx1NjgwN1x1N0I3RVwiLFxuICAgICAgICB1c2VGaXhlZFRhZ0Rlc2M6IFwiXHU0RTNBXHU2QkNGXHU2NzYxXHU4QkIwXHU1RjU1XHU4MUVBXHU1MkE4XHU2REZCXHU1MkEwXHU1NkZBXHU1QjlBXHU2ODA3XHU3QjdFXCIsXG4gICAgICAgIGZpeGVkVGFnOiBcIlx1NTZGQVx1NUI5QVx1NjgwN1x1N0I3RVx1NTAzQ1wiLFxuICAgICAgICBmaXhlZFRhZ0Rlc2M6IFwiXHU4MUVBXHU1MkE4XHU2REZCXHU1MkEwXHU3Njg0XHU2ODA3XHU3QjdFXHVGRjA4XHU0RTBEXHU5NzAwXHU4OTgxICMgXHU1M0Y3XHVGRjA5XCIsXG4gICAgICAgIGVuYWJsZVRhZ3NJbkZyb250bWF0dGVyOiBcIlx1NTQyRlx1NzUyOCBmcm9udG1hdHRlciBcdTY4MDdcdTdCN0VcIixcbiAgICAgICAgZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJEZXNjOiBcIlx1NTcyOFx1NkJDRlx1NTkyOVx1NjU4N1x1NEVGNlx1NzY4NCBZQU1MIFx1NTMzQVx1NTdERlx1NkRGQlx1NTJBMCB0YWdzIFx1NUI1N1x1NkJCNVx1RkYwOFx1NjVCOVx1NEZCRiBEYXRhdmlldyBcdTdCNDlcdTYzRDJcdTRFRjZcdTRGN0ZcdTc1MjhcdUZGMDlcIixcbiAgICAgICAgbGFuZ3VhZ2U6IFwiXHU4QkVEXHU4QTAwXCIsXG4gICAgICAgIGxhbmd1YWdlRGVzYzogXCJcdTkwMDlcdTYyRTlcdTYzRDJcdTRFRjZcdTY2M0VcdTc5M0FcdThCRURcdThBMDBcIixcbiAgICAgICAgbGFuZ3VhZ2VaaDogXCJcdTRFMkRcdTY1ODdcIixcbiAgICAgICAgbGFuZ3VhZ2VFbjogXCJFbmdsaXNoXCIsXG4gICAgICAgIG11bHRpTW9kZUluZm86IFwiXHVEODNEXHVEQ0MxIFx1NkJDRlx1NTkyOVx1NEUwMFx1NEUyQVx1NjU4N1x1NEVGNlx1NkEyMVx1NUYwRlx1OEJGNFx1NjYwRVx1RkYxQVwiLFxuICAgICAgICBzaW5nbGVNb2RlSW5mbzogXCJcdUQ4M0RcdURDQzQgXHU1MzU1XHU0RTJBXHU2NTg3XHU0RUY2XHU2QTIxXHU1RjBGXHU4QkY0XHU2NjBFXHVGRjFBXCIsXG4gICAgICAgIHJlY29yZEZvcm1hdDogXCJcdTZCQ0ZcdTY3NjFcdThCQjBcdTVGNTVcdTY4M0NcdTVGMEZcdUZGMUFcIixcbiAgICAgICAgbmV3UmVjb3JkQXRUb3A6IFwiXHUyMDIyIFx1NjVCMFx1OEJCMFx1NUY1NVx1NEYxQVx1ODFFQVx1NTJBOFx1NkRGQlx1NTJBMFx1NTIzMFx1NjU4N1x1NEVGNlx1NjcwMFx1NEUwQVx1NjVCOVwiLFxuICAgICAgICBpbWFnZUVtYmVkOiBcIlx1MjAyMiBcdTU2RkVcdTcyNDdcdTRGN0ZcdTc1MjggIVtbXHU4REVGXHU1Rjg0XV0gXHU1RDRDXHU1MTY1XCIsXG4gICAgICAgIGZpbGVMaW5rOiBcIlx1MjAyMiBcdTUxNzZcdTRFRDZcdTY1ODdcdTRFRjZcdTRGN0ZcdTc1MjggW1tcdThERUZcdTVGODRdXSBcdTk0RkVcdTYzQTVcIixcbiAgICAgICAgbG9hZGluZ1BsdWdpbjogXCJcdTUyQTBcdThGN0RcdTk2OEZcdTYyNEJcdThCQjBcdTYzRDJcdTRFRjZcIixcbiAgICAgICAgdW5sb2FkaW5nUGx1Z2luOiBcIlx1NTM3OFx1OEY3RFx1OTY4Rlx1NjI0Qlx1OEJCMFx1NjNEMlx1NEVGNlwiLFxuICAgICAgICBsb2FkaW5nU2V0dGluZ3M6IFwiXHU1MkEwXHU4RjdEXHU4QkJFXHU3RjZFOlwiLFxuICAgICAgICBjcmVhdGluZ0F0dGFjaG1lbnRzRm9sZGVyOiBcIlx1NTIxQlx1NUVGQVx1OTY0NFx1NEVGNlx1NzZFRVx1NUY1NTpcIixcbiAgICAgICAgYXR0YWNobWVudHNGb2xkZXJFeGlzdHM6IFwiXHU5NjQ0XHU0RUY2XHU3NkVFXHU1RjU1XHU1REYyXHU1QjU4XHU1NzI4XHU2MjE2XHU1MjFCXHU1RUZBXHU1OTMxXHU4RDI1OlwiLFxuICAgICAgICBjcmVhdGluZ0pvdFZpZXc6IFwiXHU1MjFCXHU1RUZBIEpvdFZpZXcgXHU1QjlFXHU0RjhCXCIsXG4gICAgICAgIGFjdGl2YXRpbmdWaWV3OiBcIlx1NkZDMFx1NkQzQlx1ODlDNlx1NTZGRVwiLFxuICAgICAgICBwbHVnaW5Ob3RMb2FkZWQ6IFwiXHU2M0QyXHU0RUY2XHU2NzJBXHU1QjhDXHU1MTY4XHU1MkEwXHU4RjdEXHVGRjBDXHU1RUY2XHU4RkRGXHU2RkMwXHU2RDNCXCIsXG4gICAgICAgIGV4aXN0aW5nVmlld0ZvdW5kOiBcIlx1NjI3RVx1NTIzMFx1NzNCMFx1NjcwOVx1ODlDNlx1NTZGRVwiLFxuICAgICAgICBjcmVhdGluZ05ld1ZpZXc6IFwiXHU1MjFCXHU1RUZBXHU2NUIwXHU4OUM2XHU1NkZFXCIsXG4gICAgICAgIHdlZWtkYXlzOiBbXCJcdTY1RTVcIiwgXCJcdTRFMDBcIiwgXCJcdTRFOENcIiwgXCJcdTRFMDlcIiwgXCJcdTU2REJcIiwgXCJcdTRFOTRcIiwgXCJcdTUxNkRcIl0sXG4gICAgICAgIHNlbGVjdGVkRmlsZXM6IFwiXHUyNzA1IFx1NURGMlx1OTAwOVx1NjJFOSB7Y291bnR9IFx1NEUyQVx1NjU4N1x1NEVGNlwiLFxuICAgICAgICByZWNvcmRzQ291bnQ6IFwie2NvdW50fVx1Njc2MVx1OEJCMFx1NUY1NVwiLFxuICAgICAgICBhdXRvT3BlblZpZXc6IFwiXHU2MjUzXHU1RjAwIHZhdWx0IFx1NjVGNlx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1OTY4Rlx1NjI0Qlx1OEJCMFx1ODlDNlx1NTZGRVwiLFxuICAgICAgICBhdXRvT3BlblZpZXdEZXNjOiBcIlx1NTQyRlx1NTJBOCBPYnNpZGlhbiBcdTY1RjZcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTk2OEZcdTYyNEJcdThCQjBcdTg5QzZcdTU2RkVcIixcbiAgICAgICAgam90VXBkYXRlZEF0OiBcIlx1NjZGNFx1NjVCMFwiLFxuICAgIH0sXG4gICAgZW46IHtcbiAgICAgICAgcGx1Z2luTmFtZTogXCJKb3RcIixcbiAgICAgICAgcGx1Z2luRGVzY3JpcHRpb246IFwiUXVpY2sgbm90ZS10YWtpbmcgcGx1Z2luXCIsXG4gICAgICAgIG9wZW5Kb3RWaWV3OiBcIk9wZW4gSm90IFZpZXdcIixcbiAgICAgICAgcXVpY2tDYXB0dXJlOiBcIlF1aWNrIENhcHR1cmVcIixcbiAgICAgICAgc2F2ZUFzSm90OiBcIlNhdmUgYXMgSm90XCIsXG4gICAgICAgIHNhdmVkQXNKb3Q6IFwiU2F2ZWQgYXMgSm90IVwiLFxuICAgICAgICBqb3RWaWV3OiBcIkpvdFwiLFxuICAgICAgICBxdWlja1JlY29yZDogXCJRdWljayBSZWNvcmRcIixcbiAgICAgICAgY29udGVudFBsYWNlaG9sZGVyOiBcIldoYXQncyBvbiB5b3VyIG1pbmQuLi5cIixcbiAgICAgICAgcGxhY2Vob2xkZXJXaXRoTGluazogXCJXaGF0J3Mgb24geW91ciBtaW5kLi4uXFxuVHlwZSBbWyB0byBxdWlja2x5IGluc2VydCBub3RlIGxpbmtzXCIsXG4gICAgICAgIHRhZ3NQbGFjZWhvbGRlcjogXCJUYWdzXCIsXG4gICAgICAgIHRhZ3NJbnB1dFBsYWNlaG9sZGVyOiBcIlByZXNzIEVudGVyIHRvIGFkZCB0YWcsIHVzZSAvIGZvciBuZXN0aW5nXCIsXG4gICAgICAgIHNvdXJjZVBsYWNlaG9sZGVyOiBcIlNvdXJjZVwiLFxuICAgICAgICBhdHRhY2htZW50UGxhY2Vob2xkZXI6IFwiXHVEODNEXHVEQ0NFIENsaWNrIG9yIGRyYWcgZmlsZSBoZXJlXCIsXG4gICAgICAgIGF0dGFjaG1lbnRTZWxlY3RlZDogXCJcdTI3MDUgU2VsZWN0ZWQ6IHtmaWxlbmFtZX1cIixcbiAgICAgICAgc2F2ZTogXCJTYXZlXCIsXG4gICAgICAgIGNhbmNlbDogXCJDYW5jZWxcIixcbiAgICAgICAgY29udGVudFJlcXVpcmVkOiBcIkNvbnRlbnQgY2Fubm90IGJlIGVtcHR5XCIsXG4gICAgICAgIHNhdmVkOiBcIlNhdmVkIVwiLFxuICAgICAgICBqb3RVcGRhdGVOb3RGb3VuZDogXCJDb3VsZCBub3QgZmluZCB0aGF0IGpvdCBpbiB0aGUgZmlsZS5cIixcbiAgICAgICAgam90VXBkYXRlTm9GaWxlOiBcIlRoaXMgam90IGhhcyBubyBzb3VyY2UgZmlsZS5cIixcbiAgICAgICAgam90VXBkYXRlRmlsZU1pc3Npbmc6IFwiU291cmNlIGZpbGUgbm90IGZvdW5kLlwiLFxuICAgICAgICBzYXZlRmFpbGVkOiBcIlNhdmUgZmFpbGVkOiB7ZXJyb3J9XCIsXG4gICAgICAgIGF0dGFjaG1lbnRTYXZlZDogXCJBdHRhY2htZW50IHNhdmVkOiB7ZmlsZW5hbWV9XCIsXG4gICAgICAgIHRvdGFsOiBcIlRvdGFsXCIsXG4gICAgICAgIHRvZGF5OiBcIlRvZGF5XCIsXG4gICAgICAgIHRoaXNNb250aDogXCJUaGlzIE1vbnRoXCIsXG4gICAgICAgIGNhbGVuZGFyOiBcIkNhbGVuZGFyXCIsXG4gICAgICAgIHllYXI6IFwiXCIsXG4gICAgICAgIG1vbnRoOiBcIi9cIixcbiAgICAgICAgc2VhcmNoQW5kVGFnczogXCJcdUQ4M0RcdUREMEQgU2VhcmNoICYgVGFnc1wiLFxuICAgICAgICBzZWFyY2hQbGFjZWhvbGRlcjogXCJLZXl3b3Jkczsgb3B0aW9uYWwgZGF0ZTogLyB1cGRhdGVkOiBmaWx0ZXJzXCIsXG4gICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyU2hvcnQ6IFwiU2VhcmNoOyBkYXRlOiAvIHVwZGF0ZWQ6XCIsXG4gICAgICAgIG1vcmVUYWdzOiBcIntjb3VudH0gbW9yZSB0YWdzLi4uXCIsXG4gICAgICAgIG5vUmVjb3JkczogXCJObyByZWNvcmRzIHlldC4gU3RhcnQgY2FwdHVyaW5nIHlvdXIgdGhvdWdodHMhXCIsXG4gICAgICAgIHNldHRpbmdzOiBcIlNldHRpbmdzXCIsXG4gICAgICAgIHNhdmVGb2xkZXI6IFwiU2F2ZSBGb2xkZXJcIixcbiAgICAgICAgc2F2ZUZvbGRlckRlc2M6IFwiTG9jYXRlZCBpbiB2YXVsdCByb290LCBlLmcuLCBKb3RzXCIsXG4gICAgICAgIGF0dGFjaG1lbnRzRm9sZGVyOiBcIkF0dGFjaG1lbnRzIEZvbGRlclwiLFxuICAgICAgICBhdHRhY2htZW50c0ZvbGRlckRlc2M6IFwiQXR0YWNobWVudCBzdG9yYWdlIGxvY2F0aW9uLCBlLmcuLCBKb3RzL2F0dGFjaG1lbnRzLiBOYW1pbmcgZm9ybWF0OiBqb3QtWVlZWU1NREQtbnVtYmVyXCIsXG4gICAgICAgIGF0dGFjaG1lbnRzTmFtaW5nOiBcIk5hbWluZyBmb3JtYXQ6IGpvdC1ZWVlZTU1ERC1udW1iZXJcIixcbiAgICAgICAgbG9nTW9kZTogXCJMb2cgTW9kZVwiLFxuICAgICAgICBsb2dNb2RlRGVzYzogXCJDaG9vc2UgaG93IHRvIHNhdmUgcmVjb3Jkc1wiLFxuICAgICAgICBsb2dNb2RlTXVsdGk6IFwiT25lIGZpbGUgcGVyIGRheVwiLFxuICAgICAgICBsb2dNb2RlU2luZ2xlOiBcIlNpbmdsZSBmaWxlXCIsXG4gICAgICAgIGZpbGVGb3JtYXQ6IFwiRmlsZSBGb3JtYXRcIixcbiAgICAgICAgZmlsZUZvcm1hdERlc2M6IFwiRmlsZSBuYW1pbmcgZm9ybWF0LCBlLmcuLCBqb3QtWVlZWU1NREQgZ2VuZXJhdGVzIGpvdC0yMDI2MDMyNi5tZFwiLFxuICAgICAgICB1c2VGaXhlZFRhZzogXCJVc2UgRml4ZWQgVGFnXCIsXG4gICAgICAgIHVzZUZpeGVkVGFnRGVzYzogXCJBdXRvbWF0aWNhbGx5IGFkZCBhIGZpeGVkIHRhZyB0byBlYWNoIHJlY29yZFwiLFxuICAgICAgICBmaXhlZFRhZzogXCJGaXhlZCBUYWcgVmFsdWVcIixcbiAgICAgICAgZml4ZWRUYWdEZXNjOiBcIlRhZyB0byBhZGQgYXV0b21hdGljYWxseSAobm8gIyBuZWVkZWQpXCIsXG4gICAgICAgIGVuYWJsZVRhZ3NJbkZyb250bWF0dGVyOiBcIkVuYWJsZSBGcm9udG1hdHRlciBUYWdzXCIsXG4gICAgICAgIGVuYWJsZVRhZ3NJbkZyb250bWF0dGVyRGVzYzogXCJBZGQgdGFncyBmaWVsZCBpbiBZQU1MIGZyb250bWF0dGVyIChmb3IgRGF0YXZpZXcgYW5kIG90aGVyIHBsdWdpbnMpXCIsXG4gICAgICAgIGxhbmd1YWdlOiBcIkxhbmd1YWdlXCIsXG4gICAgICAgIGxhbmd1YWdlRGVzYzogXCJDaG9vc2UgcGx1Z2luIGRpc3BsYXkgbGFuZ3VhZ2VcIixcbiAgICAgICAgbGFuZ3VhZ2VaaDogXCJcdTRFMkRcdTY1ODdcIixcbiAgICAgICAgbGFuZ3VhZ2VFbjogXCJFbmdsaXNoXCIsXG4gICAgICAgIG11bHRpTW9kZUluZm86IFwiXHVEODNEXHVEQ0MxIE9uZSBGaWxlIFBlciBEYXkgTW9kZTpcIixcbiAgICAgICAgc2luZ2xlTW9kZUluZm86IFwiXHVEODNEXHVEQ0M0IFNpbmdsZSBGaWxlIE1vZGU6XCIsXG4gICAgICAgIHJlY29yZEZvcm1hdDogXCJSZWNvcmQgZm9ybWF0OlwiLFxuICAgICAgICBuZXdSZWNvcmRBdFRvcDogXCJcdTIwMjIgTmV3IHJlY29yZHMgYXJlIGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gdGhlIHRvcFwiLFxuICAgICAgICBpbWFnZUVtYmVkOiBcIlx1MjAyMiBJbWFnZXMgZW1iZWRkZWQgd2l0aCAhW1twYXRoXV1cIixcbiAgICAgICAgZmlsZUxpbms6IFwiXHUyMDIyIE90aGVyIGZpbGVzIGxpbmtlZCB3aXRoIFtbcGF0aF1dXCIsXG4gICAgICAgIGxvYWRpbmdQbHVnaW46IFwiTG9hZGluZyBKb3QgcGx1Z2luXCIsXG4gICAgICAgIHVubG9hZGluZ1BsdWdpbjogXCJVbmxvYWRpbmcgSm90IHBsdWdpblwiLFxuICAgICAgICBsb2FkaW5nU2V0dGluZ3M6IFwiTG9hZGluZyBzZXR0aW5nczpcIixcbiAgICAgICAgY3JlYXRpbmdBdHRhY2htZW50c0ZvbGRlcjogXCJDcmVhdGluZyBhdHRhY2htZW50cyBmb2xkZXI6XCIsXG4gICAgICAgIGF0dGFjaG1lbnRzRm9sZGVyRXhpc3RzOiBcIkF0dGFjaG1lbnRzIGZvbGRlciBleGlzdHMgb3IgY3JlYXRpb24gZmFpbGVkOlwiLFxuICAgICAgICBjcmVhdGluZ0pvdFZpZXc6IFwiQ3JlYXRpbmcgSm90VmlldyBpbnN0YW5jZVwiLFxuICAgICAgICBhY3RpdmF0aW5nVmlldzogXCJBY3RpdmF0aW5nIHZpZXdcIixcbiAgICAgICAgcGx1Z2luTm90TG9hZGVkOiBcIlBsdWdpbiBub3QgZnVsbHkgbG9hZGVkLCBkZWxheWluZyBhY3RpdmF0aW9uXCIsXG4gICAgICAgIGV4aXN0aW5nVmlld0ZvdW5kOiBcIkZvdW5kIGV4aXN0aW5nIHZpZXdcIixcbiAgICAgICAgY3JlYXRpbmdOZXdWaWV3OiBcIkNyZWF0aW5nIG5ldyB2aWV3XCIsXG4gICAgICAgIHdlZWtkYXlzOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gICAgICAgIHNlbGVjdGVkRmlsZXM6IFwiXHUyNzA1IFNlbGVjdGVkIHtjb3VudH0gZmlsZShzKVwiLFxuICAgICAgICByZWNvcmRzQ291bnQ6IFwie2NvdW50fSByZWNvcmQocylcIixcbiAgICAgICAgYXV0b09wZW5WaWV3OiBcIkF1dG8tb3BlbiBKb3QgVmlldyBvbiB2YXVsdCBvcGVuXCIsXG4gICAgICAgIGF1dG9PcGVuVmlld0Rlc2M6IFwiQXV0b21hdGljYWxseSBvcGVuIEpvdCBWaWV3IHdoZW4gT2JzaWRpYW4gc3RhcnRzXCIsXG4gICAgICAgIGpvdFVwZGF0ZWRBdDogXCJVcGRhdGVkXCIsXG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHQoa2V5OiBrZXlvZiBUcmFuc2xhdGlvbnMsIGxhbmc6IExhbmd1YWdlLCBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZXh0ID0gdHJhbnNsYXRpb25zW2xhbmddW2tleV07XG4gICAgaWYgKCFwYXJhbXMpIHJldHVybiB0ZXh0O1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhwYXJhbXMpLnJlZHVjZSgocmVzdWx0LCBbcGFyYW0sIHZhbHVlXSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnJlcGxhY2UoYHske3BhcmFtfX1gLCB2YWx1ZSk7XG4gICAgfSwgdGV4dCk7XG59IiwgIi8vIHNyYy91dGlscy50c1xuaW1wb3J0IHsgQXBwLCBURmlsZSwgVEZvbGRlciwgTm90aWNlIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgSm90LCBKb3RTZXR0aW5ncywgTGFuZ3VhZ2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHQgfSBmcm9tICcuL2kxOG4nO1xuXG4vKipcbiAqIFx1OTYzMlx1NjI5Nlx1NTFGRFx1NjU3MFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2U8VCBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PihcbiAgICBmdW5jOiBULFxuICAgIHdhaXQ6IG51bWJlclxuKTogKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pID0+IHZvaWQge1xuICAgIGxldCB0aW1lb3V0OiBOb2RlSlMuVGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gZXhlY3V0ZWRGdW5jdGlvbiguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSB7XG4gICAgICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgZnVuYyguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgfTtcbn1cblxuLyoqIFN0cmlwIGxlYWRpbmcgIywgdHJpbSwgZHJvcCBlbXB0aWVzLCBkZWR1cGUgKGZpcnN0IG9jY3VycmVuY2Ugd2lucykuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplSm90VGFncyh0YWdzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgY29uc3Qgb3V0OiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgcmF3IG9mIHRhZ3MpIHtcbiAgICAgICAgY29uc3QgcyA9IHJhdy5yZXBsYWNlKC9eIysvLCBcIlwiKS50cmltKCk7XG4gICAgICAgIGlmICghcyB8fCBzZWVuLmhhcyhzKSkgY29udGludWU7XG4gICAgICAgIHNlZW4uYWRkKHMpO1xuICAgICAgICBvdXQucHVzaChzKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0pvdElkKCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLmNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgZ2xvYmFsVGhpcy5jcnlwdG8ucmFuZG9tVVVJRCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG4gICAgfVxuICAgIHJldHVybiBgam90LSR7RGF0ZS5ub3coKX0tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCAxMSl9YDtcbn1cblxuLyoqIERldGVybWluaXN0aWMgaWQgZm9yIGVudHJpZXMgdGhhdCBoYXZlIG5vIGAjIyMjIGlkOmAgbGluZSAoYmFja3dhcmQgY29tcGF0aWJpbGl0eSkuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhYmxlTGVnYWN5Sm90SWQoZmlsZVBhdGg6IHN0cmluZywgZGF0ZTogc3RyaW5nLCB0aW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHMgPSBgJHtmaWxlUGF0aH1cXDAke2RhdGV9XFwwJHt0aW1lfWA7XG4gICAgbGV0IGggPSAyMTY2MTM2MjYxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBoIF49IHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaCA9IE1hdGguaW11bChoLCAxNjc3NzYxOSk7XG4gICAgfVxuICAgIHJldHVybiBgam90LWxlZ2FjeS0keyhoID4+PiAwKS50b1N0cmluZygxNil9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEpvdEVudHJ5QmxvY2soZnVsbERhdGVUaW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHVwZGF0ZWRBdDogc3RyaW5nLCBib2R5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgIyMjICR7ZnVsbERhdGVUaW1lfVxcbiMjIyMgaWQ6ICR7aWR9XFxuIyMjIyB1cGRhdGVkQXQ6ICR7dXBkYXRlZEF0fVxcblxcbiR7Ym9keX1cXG5cXG4tLS1cXG5cXG5gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUpvdE1hcmtkb3duQm9keShcbiAgICBjb250ZW50OiBzdHJpbmcsXG4gICAgdGFnczogc3RyaW5nW10sXG4gICAgc291cmNlOiBzdHJpbmcsXG4gICAgYXR0YWNobWVudHM6IHsgcGF0aDogc3RyaW5nOyB0eXBlOiBcImltYWdlXCIgfCBcImZpbGVcIiB9W10gfCB1bmRlZmluZWQsXG4gICAgbGFuZzogTGFuZ3VhZ2UsXG4gICAgdXNlRml4ZWRUYWc6IGJvb2xlYW4sXG4gICAgZml4ZWRUYWc6IHN0cmluZ1xuKTogeyBib2R5OiBzdHJpbmc7IGFsbFRhZ3M6IHN0cmluZ1tdIH0ge1xuICAgIGxldCBhbGxUYWdzID0gbm9ybWFsaXplSm90VGFncyh0YWdzKTtcbiAgICBpZiAodXNlRml4ZWRUYWcgJiYgZml4ZWRUYWcpIHtcbiAgICAgICAgY29uc3QgZml4ZWRUYWdDbGVhbiA9IGZpeGVkVGFnLnJlcGxhY2UoL14jKy8sIFwiXCIpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFhbGxUYWdzLmluY2x1ZGVzKGZpeGVkVGFnQ2xlYW4pKSBhbGxUYWdzLnB1c2goZml4ZWRUYWdDbGVhbik7XG4gICAgfVxuICAgIGFsbFRhZ3MgPSBub3JtYWxpemVKb3RUYWdzKGFsbFRhZ3MpO1xuICAgIGNvbnN0IHRhZ0xpbmUgPSBhbGxUYWdzLmxlbmd0aCA+IDAgPyBhbGxUYWdzLm1hcCh4ID0+IGAjJHt4fWApLmpvaW4oXCIgXCIpIDogXCJcIjtcbiAgICBsZXQgZmluYWxDb250ZW50ID0gY29udGVudDtcbiAgICBjb25zdCBhdHRhY2htZW50TGluZXMgPVxuICAgICAgICBhdHRhY2htZW50cyAmJiBhdHRhY2htZW50cy5sZW5ndGggPiAwXG4gICAgICAgICAgICA/IGF0dGFjaG1lbnRzLm1hcChhdHQgPT4gKGF0dC50eXBlID09PSBcImltYWdlXCIgPyBgIVtbJHthdHQucGF0aH1dXWAgOiBgW1ske2F0dC5wYXRofV1dYCkpLmpvaW4oXCJcXG5cIilcbiAgICAgICAgICAgIDogXCJcIjtcbiAgICBpZiAodGFnTGluZSkgZmluYWxDb250ZW50ICs9IGBcXG5cXG4ke3RhZ0xpbmV9YDtcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVByZWZpeCA9IGxhbmcgPT09IFwiemhcIiA/IFwiXHU2NzY1XHU2RTkwOlwiIDogXCJTb3VyY2U6XCI7XG4gICAgICAgIGZpbmFsQ29udGVudCArPSBgXFxuXFxuJHtzb3VyY2VQcmVmaXh9ICR7c291cmNlfWA7XG4gICAgfVxuICAgIGlmIChhdHRhY2htZW50TGluZXMpIGZpbmFsQ29udGVudCArPSBgXFxuXFxuJHthdHRhY2htZW50TGluZXN9YDtcbiAgICByZXR1cm4geyBib2R5OiBmaW5hbENvbnRlbnQsIGFsbFRhZ3MgfTtcbn1cblxuLyoqIFJlcGxhY2Ugb25lIGAjIyNgIGpvdCBibG9jayBieSBpZDsgcHJlc2VydmVzIHByZWZpeCAoZS5nLiBmcm9udG1hdHRlcikgYW5kIG90aGVyIGJsb2Nrcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlSm90QmxvY2tCeUlkKFxuICAgIGNvbnRlbnQ6IHN0cmluZyxcbiAgICBmaWxlUGF0aDogc3RyaW5nLFxuICAgIHRhcmdldElkOiBzdHJpbmcsXG4gICAgbmV3QmxvY2s6IHN0cmluZ1xuKTogeyBjb250ZW50OiBzdHJpbmc7IGZvdW5kOiBib29sZWFuIH0ge1xuICAgIGNvbnN0IGxpbmVzID0gY29udGVudC5zcGxpdChcIlxcblwiKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbGluZVRyaW0gPSBsaW5lc1tpXS50cmltKCk7XG4gICAgICAgIGlmIChsaW5lVHJpbS5zdGFydHNXaXRoKFwiIyMjIFwiKSkge1xuICAgICAgICAgICAgY29uc3QgYmxvY2tTdGFydCA9IGk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJSZXN0ID0gbGluZVRyaW0uc3Vic3RyaW5nKDQpLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IFtkYXRlLCB0aW1lXSA9IGhlYWRlclJlc3Quc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgbGV0IG1ldGFJZCA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgaiA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gbGluZXNbal0udHJpbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkTWF0Y2ggPSB0Lm1hdGNoKC9eIyMjI1xccytpZDpcXHMqKC4rKSQvaSk7XG4gICAgICAgICAgICAgICAgaWYgKGlkTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0YUlkID0gaWRNYXRjaFsxXS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvXiMjIyNcXHMrdXBkYXRlZEF0OlxccyouKyQvaS50ZXN0KHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaWQgPSBtZXRhSWQgfHwgc3RhYmxlTGVnYWN5Sm90SWQoZmlsZVBhdGgsIGRhdGUgfHwgXCJcIiwgdGltZSB8fCBcIlwiKTtcbiAgICAgICAgICAgIGxldCBrID0gajtcbiAgICAgICAgICAgIHdoaWxlIChrIDwgbGluZXMubGVuZ3RoICYmICFsaW5lc1trXS50cmltKCkuc3RhcnRzV2l0aChcIiMjIyBcIikpIHtcbiAgICAgICAgICAgICAgICBrKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQgPT09IHRhcmdldElkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gbGluZXMuc2xpY2UoMCwgYmxvY2tTdGFydCkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWZmaXggPSBsaW5lcy5zbGljZShrKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAocHJlZml4KSBuZXh0ID0gcHJlZml4ICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICBuZXh0ICs9IG5ld0Jsb2NrO1xuICAgICAgICAgICAgICAgIGlmIChzdWZmaXgpIG5leHQgKz0gc3VmZml4O1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbnRlbnQ6IG5leHQsIGZvdW5kOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBjb250ZW50LCBmb3VuZDogZmFsc2UgfTtcbn1cblxuLyoqXG4gKiBcdTg5RTNcdTY3OTBcdTY1ODdcdTRFRjZcdTUxODVcdTVCQjlcdTRFM0EgSm90IFx1NjU3MFx1N0VDNFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGaWxlQ29udGVudChcbiAgICBjb250ZW50OiBzdHJpbmcsXG4gICAgZmlsZVBhdGg6IHN0cmluZyxcbiAgICBsYW5nOiBMYW5ndWFnZVxuKTogSm90W10ge1xuICAgIGNvbnN0IGVudHJpZXM6IEpvdFtdID0gW107XG4gICAgY29uc3QgbGluZXMgPSBjb250ZW50LnNwbGl0KFwiXFxuXCIpO1xuICAgIGxldCBpID0gMDtcblxuICAgIGNvbnN0IHNvdXJjZVByZWZpeGVzID0gbGFuZyA9PT0gJ3poJyA/IFtcIlx1Njc2NVx1NkU5MDpcIl0gOiBbXCJTb3VyY2U6XCIsIFwiXHU2NzY1XHU2RTkwOlwiXTtcblxuICAgIHdoaWxlIChpIDwgbGluZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tpXS50cmltKCk7XG4gICAgICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoXCIjIyMgXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBmdWxsRGF0ZVRpbWUgPSBsaW5lLnN1YnN0cmluZyg0KS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCBbZGF0ZSwgdGltZV0gPSBmdWxsRGF0ZVRpbWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRlZEF0ID0gW2RhdGUsIHRpbWVdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcblxuICAgICAgICAgICAgbGV0IGogPSBpICsgMTtcbiAgICAgICAgICAgIGxldCBpZE1ldGEgPSBcIlwiO1xuICAgICAgICAgICAgbGV0IHVwZGF0ZWRBdE1ldGEgPSBcIlwiO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gbGluZXNbal0udHJpbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkTWF0Y2ggPSB0Lm1hdGNoKC9eIyMjI1xccytpZDpcXHMqKC4qKSQvaSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdXBkTWF0Y2ggPSB0Lm1hdGNoKC9eIyMjI1xccyt1cGRhdGVkQXQ6XFxzKiguKikkL2kpO1xuICAgICAgICAgICAgICAgIGlmIChpZE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkTWV0YSA9IGlkTWF0Y2hbMV0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodXBkTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0TWV0YSA9IHVwZE1hdGNoWzFdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpZCA9IGlkTWV0YSB8fCBzdGFibGVMZWdhY3lKb3RJZChmaWxlUGF0aCwgZGF0ZSB8fCBcIlwiLCB0aW1lIHx8IFwiXCIpO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZEF0ID0gdXBkYXRlZEF0TWV0YSB8fCBjcmVhdGVkQXQ7XG5cbiAgICAgICAgICAgIGxldCBqb3RDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIGxldCB0YWdzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgYXR0YWNobWVudHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBsZXQgYXR0YWNobWVudFR5cGVzOiAoXCJpbWFnZVwiIHwgXCJmaWxlXCIpW10gPSBbXTtcblxuICAgICAgICAgICAgd2hpbGUgKGogPCBsaW5lcy5sZW5ndGggJiYgIWxpbmVzW2pdLnRyaW0oKS5zdGFydHNXaXRoKFwiIyMjIFwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRMaW5lID0gbGluZXNbal07XG4gICAgICAgICAgICAgICAgY29uc3QgdHJpbW1lZExpbmUgPSBjdXJyZW50TGluZS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRyaW1tZWRMaW5lIHx8IHRyaW1tZWRMaW5lID09PSBcIi0tLVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU2NjJGXHU1NDI2XHU2NjJGXHU2ODA3XHU3QjdFXHU4ODRDXG4gICAgICAgICAgICAgICAgaWYgKHRyaW1tZWRMaW5lLm1hdGNoKC9eI1tcXHdcXHU0ZTAwLVxcdTlmZmZcXC9cXC1fXSsoXFxzKyNbXFx3XFx1NGUwMC1cXHU5ZmZmXFwvXFwtX10rKSokLykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnTWF0Y2hlcyA9IHRyaW1tZWRMaW5lLm1hdGNoKC8jW1xcd1xcdTRlMDAtXFx1OWZmZlxcL1xcLV9dKy9nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ01hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3MgPSBub3JtYWxpemVKb3RUYWdzKHRhZ01hdGNoZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NjYyRlx1NTQyNlx1NjYyRlx1Njc2NVx1NkU5MFx1ODg0Q1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVkUHJlZml4ID0gc291cmNlUHJlZml4ZXMuZmluZChwID0+IHRyaW1tZWRMaW5lLnN0YXJ0c1dpdGgocCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZFByZWZpeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlID0gdHJpbW1lZExpbmUuc3Vic3RyaW5nKG1hdGNoZWRQcmVmaXgubGVuZ3RoKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU2NjJGXHU1NDI2XHU2NjJGXHU5NjQ0XHU0RUY2XHU4ODRDXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaWN0TGlua01hdGNoID0gdHJpbW1lZExpbmUubWF0Y2goL14oIT9cXFtcXFtbXlxcXV0rXFxdXFxdKSQvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpY3RMaW5rTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IHRyaW1tZWRMaW5lLm1hdGNoKC8hP1xcW1xcWyguKj8pXFxdXFxdLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzLnB1c2gobWF0Y2hbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50VHlwZXMucHVzaCh0cmltbWVkTGluZS5zdGFydHNXaXRoKFwiIVtbXCIpID8gXCJpbWFnZVwiIDogXCJmaWxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU1MTg1XHU1QkI5XHU4ODRDXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpvdENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgam90Q29udGVudCArPSBcIlxcblwiICsgY3VycmVudExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgam90Q29udGVudCA9IGN1cnJlbnRMaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGpvdENvbnRlbnQudHJpbSgpIHx8IHRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGVudHJpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRBdCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogZGF0ZSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiB0aW1lIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGpvdENvbnRlbnQudHJpbSgpLFxuICAgICAgICAgICAgICAgICAgICB0YWdzOiB0YWdzLFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgZnVsbFRleHQ6IGpvdENvbnRlbnQudHJpbSgpLFxuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50czogYXR0YWNobWVudHMsXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRUeXBlczogYXR0YWNobWVudFR5cGVzLFxuICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogZmlsZVBhdGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaSA9IGo7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZW50cmllcztcbn1cblxuLyoqXG4gKiBcdTU5MDRcdTc0MDZcdTk2NDRcdTRFRjZcdTRGRERcdTVCNThcdUZGMDhcdTRGRUVcdTU5MERcdTY1RTBcdTk2NTBcdTkwMTJcdTVGNTJcdTU0OENcdTY1ODdcdTRFRjZcdTU0MERcdTUzMzlcdTkxNERcdTk1RUVcdTk4OThcdUZGMDlcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUF0dGFjaG1lbnQoXG4gICAgYXBwOiBBcHAsXG4gICAgZmlsZTogRmlsZSxcbiAgICBzZXR0aW5nczogSm90U2V0dGluZ3MsXG4gICAgbGFuZzogTGFuZ3VhZ2UsXG4gICAgY2FsbGJhY2s6IChyZXN1bHQ6IHsgcGF0aDogc3RyaW5nOyB0eXBlOiBcImltYWdlXCIgfCBcImZpbGVcIiB9KSA9PiB2b2lkXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkYXRlU3RyID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcbiAgICBjb25zdCBkYXRlU3RyTm9EYXNoID0gZGF0ZVN0ci5yZXBsYWNlKC8tL2csIFwiXCIpO1xuICAgIGNvbnN0IGF0dGFjaG1lbnRzRm9sZGVyID0gc2V0dGluZ3MuYXR0YWNobWVudHNGb2xkZXI7XG5cbiAgICBpZiAoIWFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoYXR0YWNobWVudHNGb2xkZXIpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBhcHAudmF1bHQuY3JlYXRlRm9sZGVyKGF0dGFjaG1lbnRzRm9sZGVyKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UodCgnYXR0YWNobWVudHNGb2xkZXJFeGlzdHMnLCBsYW5nKSArIGAgJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZvbGRlciA9IGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoYXR0YWNobWVudHNGb2xkZXIpO1xuICAgIGxldCBleGlzdGluZ0ZpbGVzOiBURmlsZVtdID0gW107XG4gICAgaWYgKGZvbGRlciAmJiBmb2xkZXIgaW5zdGFuY2VvZiBURm9sZGVyKSB7XG4gICAgICAgIC8vIFx1NEZFRVx1NTkwRFx1RkYxQVx1NEY3Rlx1NzUyOFx1NEUwRFx1NUUyNlx1NkEyQVx1N0VCRlx1NzY4NFx1NjgzQ1x1NUYwRlx1OEZEQlx1ODg0Q1x1NTMzOVx1OTE0RFxuICAgICAgICBleGlzdGluZ0ZpbGVzID0gZm9sZGVyLmNoaWxkcmVuLmZpbHRlcihcbiAgICAgICAgICAgIGYgPT4gZiBpbnN0YW5jZW9mIFRGaWxlICYmIGYubmFtZS5zdGFydHNXaXRoKGBqb3QtJHtkYXRlU3RyTm9EYXNofWApXG4gICAgICAgICkgYXMgVEZpbGVbXTtcbiAgICB9XG5cbiAgICBsZXQgbWF4TnVtYmVyID0gMDtcbiAgICBmb3IgKGNvbnN0IGYgb2YgZXhpc3RpbmdGaWxlcykge1xuICAgICAgICBjb25zdCBtYXRjaCA9IGYubmFtZS5tYXRjaCgvam90LShcXGR7OH0pLShcXGQrKVxcLi8pO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KG1hdGNoWzJdLCAxMCk7XG4gICAgICAgICAgICBpZiAobnVtID4gbWF4TnVtYmVyKSBtYXhOdW1iZXIgPSBudW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBcdTRGRUVcdTU5MERcdUZGMUFcdTRGN0ZcdTc1MjhcdTVGQUFcdTczQUZcdTY2RkZcdTRFRTNcdTkwMTJcdTVGNTJcdUZGMENcdTkwN0ZcdTUxNERcdTY1RTBcdTk2NTBcdTkwMTJcdTVGNTJcbiAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgIGNvbnN0IG1heEF0dGVtcHRzID0gMTAwO1xuICAgIGxldCBzZXJpYWxOdW1iZXI6IHN0cmluZztcbiAgICBsZXQgZmlsZW5hbWU6IHN0cmluZztcbiAgICBsZXQgZmlsZVBhdGg6IHN0cmluZztcblxuICAgIGRvIHtcbiAgICAgICAgbWF4TnVtYmVyKys7XG4gICAgICAgIHNlcmlhbE51bWJlciA9IFN0cmluZyhtYXhOdW1iZXIpLnBhZFN0YXJ0KDMsIFwiMFwiKTtcbiAgICAgICAgY29uc3QgZXh0ID0gZmlsZS5uYW1lLnNwbGl0KFwiLlwiKS5wb3AoKSB8fCBcImJpblwiO1xuICAgICAgICBmaWxlbmFtZSA9IGBqb3QtJHtkYXRlU3RyTm9EYXNofS0ke3NlcmlhbE51bWJlcn0uJHtleHR9YDtcbiAgICAgICAgZmlsZVBhdGggPSBgJHthdHRhY2htZW50c0ZvbGRlcn0vJHtmaWxlbmFtZX1gO1xuICAgICAgICBhdHRlbXB0cysrO1xuICAgIH0gd2hpbGUgKGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpICYmIGF0dGVtcHRzIDwgbWF4QXR0ZW1wdHMpO1xuXG4gICAgaWYgKGF0dGVtcHRzID49IG1heEF0dGVtcHRzKSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJcdTY1RTBcdTZDRDVcdTc1MUZcdTYyMTBcdTU1MkZcdTRFMDBcdTY1ODdcdTRFRjZcdTU0MERcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgYXdhaXQgYXBwLnZhdWx0LmNyZWF0ZUJpbmFyeShmaWxlUGF0aCwgYXJyYXlCdWZmZXIpO1xuXG4gICAgICAgIGNvbnN0IGlzSW1hZ2UgPSBmaWxlLnR5cGUuc3RhcnRzV2l0aChcImltYWdlL1wiKTtcbiAgICAgICAgY2FsbGJhY2soeyBwYXRoOiBmaWxlUGF0aCwgdHlwZTogaXNJbWFnZSA/IFwiaW1hZ2VcIiA6IFwiZmlsZVwiIH0pO1xuICAgICAgICBuZXcgTm90aWNlKHQoJ2F0dGFjaG1lbnRTYXZlZCcsIGxhbmcsIHsgZmlsZW5hbWUgfSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJcdTRGRERcdTVCNThcdTk2NDRcdTRFRjZcdTU5MzFcdThEMjU6XCIsIGVycm9yKTtcbiAgICAgICAgbmV3IE5vdGljZSh0KCdzYXZlRmFpbGVkJywgbGFuZywgeyBlcnJvcjogKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlIH0pKTtcbiAgICB9XG59XG5cbi8qKlxuICogXHU4QkJFXHU3RjZFIHdpa2lsaW5rIFx1ODFFQVx1NTJBOFx1NUI4Q1x1NjIxMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBXaWtpbGlua0F1dG9jb21wbGV0ZShcbiAgICBhcHA6IEFwcCxcbiAgICB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCxcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIG9uU3VnZ2VzdGlvblNlbGVjdDogKGZpbGU6IFRGaWxlLCB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCwgYnJhY2tldFN0YXJ0OiBudW1iZXIpID0+IHZvaWRcbik6ICgpID0+IHZvaWQge1xuICAgIGxldCBzdWdnZXN0aW9uQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIGxldCBzdWdnZXN0aW9uVGltZW91dDogTm9kZUpTLlRpbWVvdXQ7XG5cbiAgICBjb25zdCBoaWRlU3VnZ2VzdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzdWdnZXN0aW9uQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgaGlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgICAgIGNsZWFyVGltZW91dChzdWdnZXN0aW9uVGltZW91dCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEFjdGl2ZVN1Z2dlc3Rpb24gPSAoaXRlbXM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gfCBhbnlbXSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBFbGVtZW50LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImpvdHMtc3VnZ2VzdGlvbi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3ZlcilcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJqb3RzLXN1Z2dlc3Rpb24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIChpdGVtIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnNvclBvcyA9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBjb25zdCB0ZXh0QmVmb3JlQ3Vyc29yID0gdGV4dGFyZWEudmFsdWUuc3Vic3RyaW5nKDAsIGN1cnNvclBvcyk7XG5cbiAgICAgICAgY29uc3QgbGFzdERvdWJsZUJyYWNrZXQgPSB0ZXh0QmVmb3JlQ3Vyc29yLmxhc3RJbmRleE9mKFwiW1tcIik7XG4gICAgICAgIGlmIChsYXN0RG91YmxlQnJhY2tldCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyTGFzdEJyYWNrZXQgPSB0ZXh0QmVmb3JlQ3Vyc29yLnN1YnN0cmluZyhsYXN0RG91YmxlQnJhY2tldCArIDIpO1xuICAgICAgICAgICAgaWYgKCFhZnRlckxhc3RCcmFja2V0LmluY2x1ZGVzKFwiXV1cIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gYWZ0ZXJMYXN0QnJhY2tldDtcblxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdWdnZXN0aW9uVGltZW91dCk7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvblRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBhcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hMb3dlciA9IHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGZpbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZpbGUgPT4gZmlsZS5iYXNlbmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCAxMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3VnZ2VzdGlvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiam90cy1zdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuYm94U2hhZG93ID0gXCIwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuekluZGV4ID0gXCI5OTk5OVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5tYXhIZWlnaHQgPSBcIjIwMHB4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLm1pbkhlaWdodCA9IFwiMTIwcHhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gXCJhdXRvXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLm1pbldpZHRoID0gXCIyMDBweFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN1Z2dlc3Rpb25Db250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gXHU4QkExXHU3Qjk3XHU1RUZBXHU4QkFFXHU1MjE3XHU4ODY4XHU0RjREXHU3RjZFXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHRhcmVhUmVjdCA9IHRleHRhcmVhLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHt0ZXh0YXJlYVJlY3QubGVmdH1weGA7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUudG9wID0gYCR7dGV4dGFyZWFSZWN0LmJvdHRvbSArIDR9cHhgO1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7dGV4dGFyZWFSZWN0LndpZHRofXB4YDtcblxuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLmVtcHR5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKChmaWxlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHN1Z2dlc3Rpb25Db250YWluZXIhLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiam90cy1zdWdnZXN0aW9uLWl0ZW1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRleHRDb250ZW50ID0gZmlsZS5iYXNlbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUucGFkZGluZyA9IFwiNnB4IDEycHhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmZvbnRTaXplID0gXCIxMnB4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImpvdHMtc3VnZ2VzdGlvbi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3ZlcilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VnZ2VzdGlvblNlbGVjdChmaWxlLCB0ZXh0YXJlYSwgbGFzdERvdWJsZUJyYWNrZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVTdWdnZXN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlU3VnZ2VzdGlvbihtYXRjaGVzLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBoaWRlU3VnZ2VzdGlvbnMoKTtcbiAgICB9KTtcblxuICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgIGlmICghc3VnZ2VzdGlvbkNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gc3VnZ2VzdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmpvdHMtc3VnZ2VzdGlvbi1pdGVtXCIpO1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gc3VnZ2VzdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtc3VnZ2VzdGlvbi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gLTE7XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtID09PSBhY3RpdmVJdGVtKSBhY3RpdmVJbmRleCA9IGluZGV4O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZS5rZXkgPT09IFwiQXJyb3dEb3duXCIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRJbmRleCA9IChhY3RpdmVJbmRleCArIDEpICUgaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgc2V0QWN0aXZlU3VnZ2VzdGlvbihpdGVtcywgbmV4dEluZGV4KTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IGFjdGl2ZUluZGV4IDw9IDAgPyBpdGVtcy5sZW5ndGggLSAxIDogYWN0aXZlSW5kZXggLSAxO1xuICAgICAgICAgICAgc2V0QWN0aXZlU3VnZ2VzdGlvbihpdGVtcywgcHJldkluZGV4KTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PT0gXCJFbnRlclwiIHx8IGUua2V5ID09PSBcIlRhYlwiKSB7XG4gICAgICAgICAgICBpZiAoYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAoYWN0aXZlSXRlbSBhcyBIVE1MRWxlbWVudCkuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgaGlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBoaWRlU3VnZ2VzdGlvbnMoKSwgMjAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjbGVhbnVwO1xufVxuXG4vKipcbiAqIFx1OEJCRVx1N0Y2RVx1NjgwN1x1N0I3RVx1ODFFQVx1NTJBOFx1NUI4Q1x1NjIxMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUYWdBdXRvY29tcGxldGUoXG4gICAgZ2V0RXhpc3RpbmdUYWdzOiAoKSA9PiBzdHJpbmdbXSxcbiAgICB0YWdJbnB1dDogSFRNTElucHV0RWxlbWVudCxcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIHRhZ0xpc3RDb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIGN1cnJlbnRUYWdzOiBzdHJpbmdbXSxcbiAgICBvbkFkZFRhZzogKHRhZzogc3RyaW5nKSA9PiB2b2lkLFxuICAgIG9uUmVuZGVyVGFnTGlzdDogKHRhZ3M6IHN0cmluZ1tdKSA9PiB2b2lkXG4pOiB2b2lkIHtcbiAgICBsZXQgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgc3VnZ2VzdGlvblRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0O1xuXG4gICAgY29uc3QgaGlkZVRhZ1N1Z2dlc3Rpb25zID0gKCkgPT4ge1xuICAgICAgICBpZiAodGFnU3VnZ2VzdGlvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEFjdGl2ZVRhZ1N1Z2dlc3Rpb24gPSAoaXRlbXM6IE5vZGVMaXN0T2Y8RWxlbWVudD4gfCBhbnlbXSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBFbGVtZW50LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChpID09PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImpvdHMtdGFnLXN1Z2dlc3Rpb24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgKGl0ZW0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3ZlcilcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiam90cy10YWctc3VnZ2VzdGlvbi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAoaXRlbSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNob3dUYWdTdWdnZXN0aW9ucyA9IChzZWFyY2hUZXJtOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgYWxsVGFncyA9IGdldEV4aXN0aW5nVGFncygpO1xuICAgICAgICBjb25zdCBzZWFyY2hMb3dlciA9IHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGFsbFRhZ3NcbiAgICAgICAgICAgIC5maWx0ZXIodGFnID0+IHRhZy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKSlcbiAgICAgICAgICAgIC5maWx0ZXIodGFnID0+ICFjdXJyZW50VGFncy5pbmNsdWRlcyh0YWcpKVxuICAgICAgICAgICAgLnNsaWNlKDAsIDgpO1xuXG4gICAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgaGlkZVRhZ1N1Z2dlc3Rpb25zKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRhZ1N1Z2dlc3Rpb25Db250YWluZXIpIHtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJqb3RzLXRhZy1zdWdnZXN0aW9uc1wiKTtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLnRvcCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gXCIwXCI7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuYm94U2hhZG93ID0gXCIwIDJweCA4cHggcmdiYSgwLDAsMCwwLjEpXCI7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLnpJbmRleCA9IFwiMTAwMFwiO1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5tYXhIZWlnaHQgPSBcIjIwMHB4XCI7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9IFwiYXV0b1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5lbXB0eSgpO1xuXG4gICAgICAgIG1hdGNoZXMuZm9yRWFjaCgodGFnLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRhZ1N1Z2dlc3Rpb25Db250YWluZXIhLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiam90cy10YWctc3VnZ2VzdGlvbi1pdGVtXCIpO1xuICAgICAgICAgICAgaXRlbS50ZXh0Q29udGVudCA9IGAjJHt0YWd9YDtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUucGFkZGluZyA9IFwiNnB4IDEycHhcIjtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgICAgICBpdGVtLnN0eWxlLmZvbnRTaXplID0gXCIxMnB4XCI7XG4gICAgICAgICAgICBpdGVtLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgaXRlbS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImpvdHMtdGFnLXN1Z2dlc3Rpb24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItaG92ZXIpXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBvbkFkZFRhZyh0YWcpO1xuICAgICAgICAgICAgICAgIHRhZ0lucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBoaWRlVGFnU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0YWdJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldEFjdGl2ZVRhZ1N1Z2dlc3Rpb24obWF0Y2hlcywgaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlY3QgPSB0YWdJbnB1dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS50b3AgPSBgJHtyZWN0LmhlaWdodH1weGA7XG4gICAgfTtcblxuICAgIHRhZ0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGFnSW5wdXQudmFsdWU7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRXb3JkID0gdmFsdWUudHJpbSgpO1xuXG4gICAgICAgIGlmIChjdXJyZW50V29yZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc3VnZ2VzdGlvblRpbWVvdXQpO1xuICAgICAgICAgICAgc3VnZ2VzdGlvblRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzaG93VGFnU3VnZ2VzdGlvbnMoY3VycmVudFdvcmQpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhpZGVUYWdTdWdnZXN0aW9ucygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0YWdJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0YWdJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgICAgICAgIGlmICh0YWdTdWdnZXN0aW9uQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IHRhZ1N1Z2dlc3Rpb25Db250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qb3RzLXRhZy1zdWdnZXN0aW9uLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IGFjdGl2ZUl0ZW0udGV4dENvbnRlbnQ/LnJlcGxhY2UoXCIjXCIsIFwiXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIG9uQWRkVGFnKHRhZyk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVUYWdTdWdnZXN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgIXZhbHVlLmluY2x1ZGVzKFwiIFwiKSkge1xuICAgICAgICAgICAgICAgIG9uQWRkVGFnKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJUYWJcIiAmJiB0YWdTdWdnZXN0aW9uQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtdGFnLXN1Z2dlc3Rpb24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgICAgICBpZiAoYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IGFjdGl2ZUl0ZW0udGV4dENvbnRlbnQ/LnJlcGxhY2UoXCIjXCIsIFwiXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgb25BZGRUYWcodGFnKTtcbiAgICAgICAgICAgICAgICBoaWRlVGFnU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGFnU3VnZ2VzdGlvbkNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmpvdHMtdGFnLXN1Z2dlc3Rpb24taXRlbVwiKTtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IHRhZ1N1Z2dlc3Rpb25Db250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qb3RzLXRhZy1zdWdnZXN0aW9uLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSAtMTtcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IGFjdGl2ZUl0ZW0pIGFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gKGFjdGl2ZUluZGV4ICsgMSkgJSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICBzZXRBY3RpdmVUYWdTdWdnZXN0aW9uKGl0ZW1zLCBuZXh0SW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gYWN0aXZlSW5kZXggPD0gMCA/IGl0ZW1zLmxlbmd0aCAtIDEgOiBhY3RpdmVJbmRleCAtIDE7XG4gICAgICAgICAgICBzZXRBY3RpdmVUYWdTdWdnZXN0aW9uKGl0ZW1zLCBwcmV2SW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgICBoaWRlVGFnU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGFnSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGFnSW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmICF2YWx1ZS5pbmNsdWRlcyhcIiBcIikgJiYgIWN1cnJlbnRUYWdzLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG9uQWRkVGFnKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpZGVUYWdTdWdnZXN0aW9ucygpO1xuICAgICAgICB9LCAyMDApO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFx1NkUzMlx1NjdEM1x1NjgwN1x1N0I3RVx1NTIxN1x1ODg2OFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVGFnTGlzdChcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIHRhZ3M6IHN0cmluZ1tdLFxuICAgIG9uUmVtb3ZlVGFnOiAodGFnOiBzdHJpbmcpID0+IHZvaWRcbik6IHZvaWQge1xuICAgIGNvbnRhaW5lci5lbXB0eSgpO1xuXG4gICAgdGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgIGNvbnN0IHRhZ1BpbGwgPSBjb250YWluZXIuY3JlYXRlU3BhbigpO1xuICAgICAgICB0YWdQaWxsLnRleHRDb250ZW50ID0gYCMke3RhZ31gO1xuICAgICAgICB0YWdQaWxsLnN0eWxlLnBhZGRpbmcgPSBcIjRweCAxMHB4XCI7XG4gICAgICAgIHRhZ1BpbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnktYWx0KVwiO1xuICAgICAgICB0YWdQaWxsLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMTJweFwiO1xuICAgICAgICB0YWdQaWxsLnN0eWxlLmZvbnRTaXplID0gXCIxMXB4XCI7XG4gICAgICAgIHRhZ1BpbGwuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWZsZXhcIjtcbiAgICAgICAgdGFnUGlsbC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcbiAgICAgICAgdGFnUGlsbC5zdHlsZS5nYXAgPSBcIjZweFwiO1xuICAgICAgICB0YWdQaWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICB0YWdQaWxsLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZUJ0biA9IHRhZ1BpbGwuY3JlYXRlU3BhbigpO1xuICAgICAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSBcIlx1MDBEN1wiO1xuICAgICAgICByZW1vdmVCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIHJlbW92ZUJ0bi5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgICAgIHJlbW92ZUJ0bi5zdHlsZS5tYXJnaW5MZWZ0ID0gXCI0cHhcIjtcbiAgICAgICAgcmVtb3ZlQnRuLnN0eWxlLmZvbnRTaXplID0gXCIxMnB4XCI7XG4gICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBvblJlbW92ZVRhZyh0YWcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBcdTlBRDhcdTRFQUUgTWFya2Rvd24gXHU1MTg1XHU1QkI5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWdobGlnaHRNYXJrZG93bkNvbnRlbnQoXG4gICAgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICBrZXl3b3Jkczogc3RyaW5nW11cbik6IHZvaWQge1xuICAgIGlmICgha2V5d29yZHMubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIE5vZGVGaWx0ZXIuU0hPV19URVhULFxuICAgICAgICB7XG4gICAgICAgICAgICBhY2NlcHROb2RlOiAobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudEVsZW1lbnQ/LmNsYXNzTGlzdD8uY29udGFpbnMoJ3NlYXJjaC1oaWdobGlnaHQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IHRleHROb2RlczogVGV4dFtdID0gW107XG4gICAgbGV0IG5vZGU6IFRleHQgfCBudWxsO1xuICAgIHdoaWxlIChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkgYXMgVGV4dCB8IG51bGwpIHtcbiAgICAgICAgdGV4dE5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF0dGVybiA9IGtleXdvcmRzLm1hcChrID0+IGsucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKSkuam9pbignfCcpO1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgKCR7cGF0dGVybn0pYCwgJ2dpJyk7XG5cbiAgICB0ZXh0Tm9kZXMuZm9yRWFjaCh0ZXh0Tm9kZSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSB0ZXh0Tm9kZS50ZXh0Q29udGVudCB8fCAnJztcbiAgICAgICAgaWYgKHJlZ2V4LnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGxldCBsYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IG1hdGNoO1xuXG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVnZXguZXhlYyh0ZXh0KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2guaW5kZXggPiBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dC5zdWJzdHJpbmcobGFzdEluZGV4LCBtYXRjaC5pbmRleCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21hcmsnKTtcbiAgICAgICAgICAgICAgICBtYXJrLmNsYXNzTmFtZSA9ICdzZWFyY2gtaGlnaGxpZ2h0JztcbiAgICAgICAgICAgICAgICBtYXJrLnRleHRDb250ZW50ID0gbWF0Y2hbMF07XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobWFyayk7XG4gICAgICAgICAgICAgICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdEluZGV4IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0LnN1YnN0cmluZyhsYXN0SW5kZXgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0Tm9kZS5wYXJlbnROb2RlPy5yZXBsYWNlQ2hpbGQoZnJhZ21lbnQsIHRleHROb2RlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwgIi8vIHNyYy9jYXB0dXJlLW1vZGFsLnRzXG5pbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgSm90UGx1Z2luIGZyb20gJy4vbWFpbic7XG5pbXBvcnQgeyB0IH0gZnJvbSAnLi9pMThuJztcbmltcG9ydCB7XG4gICAgaGFuZGxlQXR0YWNobWVudCxcbiAgICBzZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlLFxuICAgIHNldHVwVGFnQXV0b2NvbXBsZXRlLFxuICAgIHJlbmRlclRhZ0xpc3Rcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBDYXB0dXJlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgcGx1Z2luOiBKb3RQbHVnaW47XG4gICAgY29udGVudElucHV0OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHRhZ3NJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBzb3VyY2VJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICB0YWdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHNlbGVjdGVkQXR0YWNobWVudHM6IHsgcGF0aDogc3RyaW5nOyB0eXBlOiBcImltYWdlXCIgfCBcImZpbGVcIiB9W10gPSBbXTtcbiAgICBwcml2YXRlIHRhZ0xpc3RDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjdXJyZW50VGFnczogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIHdpa2lsaW5rQ2xlYW51cDogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG5cbiAgICBnZXQgbGFuZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luLmxhbmc7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogSm90UGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIH1cblxuICAgIGFzeW5jIG9uT3BlbigpIHtcbiAgICAgICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuXG4gICAgICAgIGlmICghdGhpcy5wbHVnaW4uam90cyB8fCB0aGlzLnBsdWdpbi5qb3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4ucmVmcmVzaEpvdHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSBcIjIwcHhcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLm1pbldpZHRoID0gXCI0MDBweFwiO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gY29udGFpbmVyLmNyZWF0ZUVsKFwiaDNcIik7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdCgncXVpY2tSZWNvcmQnLCB0aGlzLmxhbmcpO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjIwcHhcIjtcblxuICAgICAgICBjb25zdCB0ZXh0YXJlYUNvbnRhaW5lciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGV4dGFyZWFDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cbiAgICAgICAgY29uc3QgdGV4dGFyZWEgPSB0ZXh0YXJlYUNvbnRhaW5lci5jcmVhdGVFbChcInRleHRhcmVhXCIpO1xuICAgICAgICB0ZXh0YXJlYS5wbGFjZWhvbGRlciA9IHQoJ2NvbnRlbnRQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLm1pbkhlaWdodCA9IFwiMTUwcHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI4cHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnktYWx0KVwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjE2cHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUucmVzaXplID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5mb250RmFtaWx5ID0gXCJpbmhlcml0XCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLmZvbnRTaXplID0gXCIxNHB4XCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLmxpbmVIZWlnaHQgPSBcIjEuNlwiO1xuICAgICAgICB0aGlzLmNvbnRlbnRJbnB1dCA9IHRleHRhcmVhO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlKHRleHRhcmVhLCB0ZXh0YXJlYUNvbnRhaW5lcik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YWdTZWN0aW9uID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICB0YWdTZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTZweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGFnSW5wdXRDb250YWluZXIgPSB0YWdTZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICB0YWdJbnB1dENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgdGFnSW5wdXRDb250YWluZXIuc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRhZ3NJbnB1dCA9IHRhZ0lucHV0Q29udGFpbmVyLmNyZWF0ZUVsKFwiaW5wdXRcIik7XG4gICAgICAgIHRhZ3NJbnB1dC5wbGFjZWhvbGRlciA9IHQoJ3RhZ3NJbnB1dFBsYWNlaG9sZGVyJywgdGhpcy5sYW5nKTtcbiAgICAgICAgdGFnc0lucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHRhZ3NJbnB1dC5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgdGFnc0lucHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICB0YWdzSW5wdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgdGFnc0lucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICB0YWdzSW5wdXQuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICB0aGlzLnRhZ3NJbnB1dCA9IHRhZ3NJbnB1dDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lciA9IHRhZ1NlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lci5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICB0aGlzLnRhZ0xpc3RDb250YWluZXIuc3R5bGUuZ2FwID0gXCI2cHhcIjtcbiAgICAgICAgdGhpcy50YWdMaXN0Q29udGFpbmVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIHRoaXMuY3VycmVudFRhZ3MgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0dXBUYWdBdXRvY29tcGxldGUodGFnc0lucHV0LCB0YWdJbnB1dENvbnRhaW5lciwgdGhpcy50YWdMaXN0Q29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNvdXJjZUlucHV0ID0gY29udGFpbmVyLmNyZWF0ZUVsKFwiaW5wdXRcIik7XG4gICAgICAgIHNvdXJjZUlucHV0LnBsYWNlaG9sZGVyID0gdCgnc291cmNlUGxhY2Vob2xkZXInLCB0aGlzLmxhbmcpO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTZweFwiO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICB0aGlzLnNvdXJjZUlucHV0ID0gc291cmNlSW5wdXQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBhdHRhY2htZW50QXJlYSA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuYm9yZGVyID0gXCIxcHggZGFzaGVkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5wYWRkaW5nID0gXCIxMnB4XCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjIwcHhcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEudGV4dENvbnRlbnQgPSB0KCdhdHRhY2htZW50UGxhY2Vob2xkZXInLCB0aGlzLmxhbmcpO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5mb250U2l6ZSA9IFwiMTJweFwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1mYWludClcIjtcbiAgICAgICAgXG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSBcImZpbGVcIjtcbiAgICAgICAgICAgIGlucHV0Lm11bHRpcGxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShpbnB1dC5maWxlcyB8fCBbXSk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQXR0YWNobWVudChmaWxlLCBhdHRhY2htZW50QXJlYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhdHRhY2htZW50QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhdHRhY2htZW50QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGF0YVRyYW5zZmVyPy5maWxlcyB8fCBbXSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUF0dGFjaG1lbnQoZmlsZSwgYXR0YWNobWVudEFyZWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJmbGV4LWVuZFwiO1xuICAgICAgICBidXR0b25Db250YWluZXIuc3R5bGUuZ2FwID0gXCIxMHB4XCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBidXR0b25Db250YWluZXIuY3JlYXRlRWwoXCJidXR0b25cIik7XG4gICAgICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9IHQoJ2NhbmNlbCcsIHRoaXMubGFuZyk7XG4gICAgICAgIGNhbmNlbEJ0bi5zdHlsZS5wYWRkaW5nID0gXCI4cHggMTZweFwiO1xuICAgICAgICBjYW5jZWxCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgY2FuY2VsQnRuLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBjYW5jZWxCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgIGNhbmNlbEJ0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2F2ZUJ0biA9IGJ1dHRvbkNvbnRhaW5lci5jcmVhdGVFbChcImJ1dHRvblwiKTtcbiAgICAgICAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9IHQoJ3NhdmUnLCB0aGlzLmxhbmcpO1xuICAgICAgICBzYXZlQnRuLnN0eWxlLnBhZGRpbmcgPSBcIjhweCAyNHB4XCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1vbi1hY2NlbnQpXCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XG4gICAgICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlU2F2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0dXBUYWdBdXRvY29tcGxldGUodGFnSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHRhZ0xpc3RDb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHNldHVwVGFnQXV0b2NvbXBsZXRlKFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5nZXRFeGlzdGluZ1RhZ3MoKSxcbiAgICAgICAgICAgIHRhZ0lucHV0LFxuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgdGFnTGlzdENvbnRhaW5lcixcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhZ3MsXG4gICAgICAgICAgICAodGFnKSA9PiB0aGlzLmFkZFRhZ1RvSW5wdXQodGFnLCB0YWdJbnB1dCwgdGFnTGlzdENvbnRhaW5lciksXG4gICAgICAgICAgICAodGFncykgPT4gdGhpcy5yZW5kZXJUYWdMaXN0KHRhZ0xpc3RDb250YWluZXIsIHRhZ3MpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFeGlzdGluZ1RhZ3MoKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCB0YWdzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGZvciAoY29uc3Qgam90IG9mIHRoaXMucGx1Z2luLmpvdHMpIHtcbiAgICAgICAgICAgIGpvdC50YWdzLmZvckVhY2godGFnID0+IHRhZ3MuYWRkKHRhZykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRhZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyVGFnTGlzdChjb250YWluZXI6IEhUTUxFbGVtZW50LCB0YWdzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWdzID0gdGFncztcbiAgICAgICAgcmVuZGVyVGFnTGlzdChjb250YWluZXIsIHRhZ3MsICh0YWcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhZ3MgPSB0aGlzLmN1cnJlbnRUYWdzLmZpbHRlcih0ID0+IHQgIT09IHRhZyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhZ0xpc3QoY29udGFpbmVyLCB0aGlzLmN1cnJlbnRUYWdzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhZ3NJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFnc0lucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUYWdUb0lucHV0KHRhZzogc3RyaW5nLCB0YWdJbnB1dDogSFRNTElucHV0RWxlbWVudCwgdGFnTGlzdENvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRhZyAmJiAhdGhpcy5jdXJyZW50VGFncy5pbmNsdWRlcyh0YWcpKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYWdzLnB1c2godGFnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGFnTGlzdCh0YWdMaXN0Q29udGFpbmVyLCB0aGlzLmN1cnJlbnRUYWdzKTtcbiAgICAgICAgICAgIHRhZ0lucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHVwV2lraWxpbmtBdXRvY29tcGxldGUodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy53aWtpbGlua0NsZWFudXAgPSBzZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlKFxuICAgICAgICAgICAgdGhpcy5hcHAsXG4gICAgICAgICAgICB0ZXh0YXJlYSxcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIChmaWxlLCB0ZXh0YXJlYSwgYnJhY2tldFN0YXJ0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3Vyc29yUG9zID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dEJlZm9yZSA9IHRleHRhcmVhLnZhbHVlLnN1YnN0cmluZygwLCBicmFja2V0U3RhcnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRBZnRlciA9IHRleHRhcmVhLnZhbHVlLnN1YnN0cmluZyhjdXJzb3JQb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RleHQgPSB0ZXh0QmVmb3JlICsgYFtbJHtmaWxlLmJhc2VuYW1lfV1dYCArIHRleHRBZnRlcjtcbiAgICAgICAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IG5ld1RleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdDdXJzb3JQb3MgPSBicmFja2V0U3RhcnQgKyBmaWxlLmJhc2VuYW1lLmxlbmd0aCArIDQ7XG4gICAgICAgICAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBuZXdDdXJzb3JQb3M7XG4gICAgICAgICAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gbmV3Q3Vyc29yUG9zO1xuXG4gICAgICAgICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGVBdHRhY2htZW50KGZpbGU6IEZpbGUsIGFyZWE6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGF3YWl0IGhhbmRsZUF0dGFjaG1lbnQoXG4gICAgICAgICAgICB0aGlzLmFwcCxcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncyxcbiAgICAgICAgICAgIHRoaXMubGFuZyxcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQXR0YWNobWVudHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5zZWxlY3RlZEF0dGFjaG1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBhcmVhLnRleHRDb250ZW50ID0gdCgnc2VsZWN0ZWRGaWxlcycsIHRoaXMubGFuZywgeyBjb3VudDogU3RyaW5nKGNvdW50KSB9KTtcbiAgICAgICAgICAgICAgICBhcmVhLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCI7XG4gICAgICAgICAgICAgICAgYXJlYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeS1hbHQpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIGFzeW5jIGhhbmRsZVNhdmUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgICAgbmV3IE5vdGljZSh0KCdjb250ZW50UmVxdWlyZWQnLCB0aGlzLmxhbmcpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhZ3MgPSBbLi4udGhpcy5jdXJyZW50VGFnc107XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuc291cmNlSW5wdXQudmFsdWUudHJpbSgpO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlSm90KGNvbnRlbnQsIHRhZ3MsIHNvdXJjZSwgdGhpcy5zZWxlY3RlZEF0dGFjaG1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTYXZlIGZhaWxlZDpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgbmV3IE5vdGljZSh0KCdzYXZlRmFpbGVkJywgdGhpcy5sYW5nLCB7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiVW5rbm93biBlcnJvclwiIH0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIC8vIFx1NkUwNVx1NzQwNiB3aWtpbGluayBcdTVFRkFcdThCQUVcdTVCQjlcdTU2NjhcbiAgICAgICAgaWYgKHRoaXMud2lraWxpbmtDbGVhbnVwKSB7XG4gICAgICAgICAgICB0aGlzLndpa2lsaW5rQ2xlYW51cCgpO1xuICAgICAgICAgICAgdGhpcy53aWtpbGlua0NsZWFudXAgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcbiAgICB9XG59IiwgIi8vIHNyYy9tYWluLnRzXG5pbXBvcnQgeyBQbHVnaW4sIE5vdGljZSwgVEZpbGUsIFRGb2xkZXIsIGFkZEljb24sIG5vcm1hbGl6ZVBhdGggfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBKb3RWaWV3LCBWSUVXX1RZUEVfSk9UUyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBKb3RTZXR0aW5ncywgREVGQVVMVF9TRVRUSU5HUywgTGFuZ3VhZ2UsIEpvdCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgSm90U2V0dGluZ1RhYiB9IGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IHsgQ2FwdHVyZU1vZGFsIH0gZnJvbSAnLi9jYXB0dXJlLW1vZGFsJztcbmltcG9ydCB7IHQsIFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaTE4bic7XG5pbXBvcnQge1xuICAgIHBhcnNlRmlsZUNvbnRlbnQsXG4gICAgbmV3Sm90SWQsXG4gICAgY29tcG9zZUpvdE1hcmtkb3duQm9keSxcbiAgICBmb3JtYXRKb3RFbnRyeUJsb2NrLFxuICAgIHJlcGxhY2VKb3RCbG9ja0J5SWRcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdFBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gICAgc2V0dGluZ3M6IEpvdFNldHRpbmdzO1xuICAgIHByaXZhdGUgaXNMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBqb3RzOiBKb3RbXSA9IFtdO1xuXG4gICAgZ2V0IGxhbmcoKTogTGFuZ3VhZ2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncz8ubGFuZ3VhZ2UgfHwgXCJ6aFwiO1xuICAgIH1cblxuICAgIGFzeW5jIG9ubG9hZCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcbiAgICAgICAgY29uc29sZS5sb2codCgnbG9hZGluZ1BsdWdpbicsIHRoaXMubGFuZykpO1xuXG4gICAgICAgIGFkZEljb24oXCJqb3QtYm9sdFwiLCBgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBhdGggZD1cIk0xMyAyTDMgMTRoOWwtMSA4IDEwLTEyaC05bDEtOHpcIi8+PHBhdGggZD1cIk0xNyAzaDJhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoMlwiLz48L3N2Zz5gKTtcblxuICAgICAgICBhd2FpdCB0aGlzLmVuc3VyZUF0dGFjaG1lbnRzRm9sZGVyKCk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlclZpZXcoVklFV19UWVBFX0pPVFMsIChsZWFmKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEpvdFZpZXcobGVhZiwgdGhpcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkUmliYm9uSWNvbihcImpvdC1ib2x0XCIsIHQoJ3BsdWdpbk5hbWUnLCB0aGlzLmxhbmcpLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlVmlldygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6IFwib3Blbi1qb3Qtdmlld1wiLFxuICAgICAgICAgICAgbmFtZTogYGpvdCR7dGhpcy5sYW5nID09PSAnemgnID8gJ1x1RkYxQScgOiAnOiAnfSR7dCgnb3BlbkpvdFZpZXcnLCB0aGlzLmxhbmcpfWAsXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVWaWV3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogXCJxdWljay1jYXB0dXJlXCIsXG4gICAgICAgICAgICBuYW1lOiBgam90JHt0aGlzLmxhbmcgPT09ICd6aCcgPyAnXHVGRjFBJyA6ICc6ICd9JHt0KCdxdWlja0NhcHR1cmUnLCB0aGlzLmxhbmcpfWAsXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5ldyBDYXB0dXJlTW9kYWwodGhpcy5hcHAsIHRoaXMpLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBKb3RTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKFwiZWRpdG9yLW1lbnVcIiwgKG1lbnUsIGVkaXRvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGVkaXRvci5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGlvbikgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgbWVudS5hZGRJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0VGl0bGUodCgnc2F2ZUFzSm90JywgdGhpcy5sYW5nKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRJY29uKFwiam90LWJvbHRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmVKb3Qoc2VsZWN0aW9uLCBbXSwgXCJcIiwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHQoJ3NhdmVkQXNKb3QnLCB0aGlzLmxhbmcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmlzTG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvT3BlblZpZXcpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFjdGl2YXRlVmlldygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkSm90c0RhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgb251bmxvYWQoKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0pPVFMpLmZvckVhY2gobGVhZiA9PiB7XG4gICAgICAgICAgICAgICAgbGVhZi5kZXRhY2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2xlYW51cCB2aWV3IGVycm9yOlwiLCBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGVuc3VyZUF0dGFjaG1lbnRzRm9sZGVyKCkge1xuICAgICAgICBjb25zdCBmb2xkZXIgPSBub3JtYWxpemVQYXRoKHRoaXMuc2V0dGluZ3MuYXR0YWNobWVudHNGb2xkZXIpO1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChmb2xkZXIpO1xuICAgICAgICBpZiAoIWV4aXN0aW5nIHx8ICEoZXhpc3RpbmcgaW5zdGFuY2VvZiBURm9sZGVyKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGVGb2xkZXIoZm9sZGVyKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgYWN0aXZhdGVWaWV3KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNMb2FkZWQpIHJldHVybjtcblxuICAgICAgICBsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0pPVFMpWzBdO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFsZWFmKSB7XG4gICAgICAgICAgICBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoJ3RhYicpO1xuICAgICAgICAgICAgYXdhaXQgbGVhZi5zZXRWaWV3U3RhdGUoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFZJRVdfVFlQRV9KT1RTLFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGF0ZToge31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5yZXZlYWxMZWFmKGxlYWYpO1xuICAgICAgICBcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSm90c0RhdGEoKTtcbiAgICB9XG5cbiAgICBhc3luYyByZWZyZXNoSm90cygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSm90c0RhdGEoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJcdTUyMzdcdTY1QjAgam90cyBcdTY1NzBcdTYzNkVcdTVCOENcdTYyMTBcdUZGMENcdTUxNzFcIiwgdGhpcy5qb3RzLmxlbmd0aCwgXCJcdTY3NjFcdThCQjBcdTVGNTVcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBsb2FkSm90c0RhdGEoKSB7XG4gICAgICAgIGNvbnN0IGZvbGRlciA9IG5vcm1hbGl6ZVBhdGgodGhpcy5zZXR0aW5ncy5zYXZlRm9sZGVyKTtcbiAgICAgICAgY29uc3QgZm9sZGVyT2JqID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZvbGRlcik7XG5cbiAgICAgICAgaWYgKCFmb2xkZXJPYmogfHwgIShmb2xkZXJPYmogaW5zdGFuY2VvZiBURm9sZGVyKSkge1xuICAgICAgICAgICAgdGhpcy5qb3RzID0gW107XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlcyA9IGZvbGRlck9iai5jaGlsZHJlbi5maWx0ZXIoZiA9PiBmIGluc3RhbmNlb2YgVEZpbGUgJiYgZi5uYW1lLmVuZHNXaXRoKFwiLm1kXCIpKTtcbiAgICAgICAgY29uc3QgYWxsSm90czogSm90W10gPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUgYXMgVEZpbGUpO1xuICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IHBhcnNlRmlsZUNvbnRlbnQoY29udGVudCwgZmlsZS5wYXRoLCB0aGlzLmxhbmcpO1xuICAgICAgICAgICAgYWxsSm90cy5wdXNoKC4uLmVudHJpZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWxsSm90cy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRlQSA9IG1vbWVudChhLmRhdGUgKyBcIiBcIiArIGEudGltZSwgXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZUIgPSBtb21lbnQoYi5kYXRlICsgXCIgXCIgKyBiLnRpbWUsIFwiWVlZWS1NTS1ERCBISDptbTpzc1wiKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlQi52YWx1ZU9mKCkgLSBkYXRlQS52YWx1ZU9mKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuam90cyA9IGFsbEpvdHM7XG4gICAgfVxuXG4gICAgYXN5bmMgc2F2ZUpvdChjb250ZW50OiBzdHJpbmcsIHRhZ3M6IHN0cmluZ1tdLCBzb3VyY2U6IHN0cmluZywgYXR0YWNobWVudHM/OiB7IHBhdGg6IHN0cmluZzsgdHlwZTogXCJpbWFnZVwiIHwgXCJmaWxlXCIgfVtdKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGRhdGVTdHIgPSBtb21lbnQobm93KS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xuICAgICAgICBjb25zdCBmdWxsRGF0ZVRpbWUgPSBtb21lbnQobm93KS5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gbmV3Sm90SWQoKTtcbiAgICAgICAgY29uc3QgeyBib2R5LCBhbGxUYWdzIH0gPSBjb21wb3NlSm90TWFya2Rvd25Cb2R5KFxuICAgICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAgIHRhZ3MsXG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICBhdHRhY2htZW50cyxcbiAgICAgICAgICAgIHRoaXMubGFuZyxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudXNlRml4ZWRUYWcsXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmZpeGVkVGFnXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG5ld0VudHJ5ID0gZm9ybWF0Sm90RW50cnlCbG9jayhmdWxsRGF0ZVRpbWUsIGlkLCBmdWxsRGF0ZVRpbWUsIGJvZHkpO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxvZ01vZGUgPT09IFwibXVsdGlcIikge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlVG9NdWx0aUZpbGUoZGF0ZVN0ciwgbmV3RW50cnksIGFsbFRhZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlVG9TaW5nbGVGaWxlKG5ld0VudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0pPVFMpLmZvckVhY2gobGVhZiA9PiB7XG4gICAgICAgICAgICBpZiAobGVhZi52aWV3IGluc3RhbmNlb2YgSm90VmlldykgbGVhZi52aWV3LnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSm90c0RhdGEoKTtcblxuICAgICAgICBuZXcgTm90aWNlKHQoJ3NhdmVkJywgdGhpcy5sYW5nKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBvbmUgam90IGluIGl0cyBzb3VyY2UgZmlsZSBieSBgaWRgLiBLZWVwcyBgIyMjYCBjcmVhdGVkIHRpbWU7IHNldHMgYHVwZGF0ZWRBdGAgdG8gbm93LlxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUpvdCh1cGRhdGVkOiBKb3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCF1cGRhdGVkLmZpbGVQYXRoKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSB0KCdqb3RVcGRhdGVOb0ZpbGUnLCB0aGlzLmxhbmcpO1xuICAgICAgICAgICAgbmV3IE5vdGljZShtc2cpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0aE5vcm0gPSBub3JtYWxpemVQYXRoKHVwZGF0ZWQuZmlsZVBhdGgpO1xuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGhOb3JtKTtcbiAgICAgICAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gdCgnam90VXBkYXRlRmlsZU1pc3NpbmcnLCB0aGlzLmxhbmcpO1xuICAgICAgICAgICAgbmV3IE5vdGljZShtc2cpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXR0YWNobWVudHNQYXlsb2FkID1cbiAgICAgICAgICAgIHVwZGF0ZWQuYXR0YWNobWVudHM/Lm1hcCgocCwgaSkgPT4gKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBwLFxuICAgICAgICAgICAgICAgIHR5cGU6IHVwZGF0ZWQuYXR0YWNobWVudFR5cGVzPy5baV0gPz8gKFwiZmlsZVwiIGFzIGNvbnN0KVxuICAgICAgICAgICAgfSkpID8/IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgeyBib2R5IH0gPSBjb21wb3NlSm90TWFya2Rvd25Cb2R5KFxuICAgICAgICAgICAgdXBkYXRlZC5jb250ZW50LFxuICAgICAgICAgICAgdXBkYXRlZC50YWdzLFxuICAgICAgICAgICAgdXBkYXRlZC5zb3VyY2UsXG4gICAgICAgICAgICBhdHRhY2htZW50c1BheWxvYWQsXG4gICAgICAgICAgICB0aGlzLmxhbmcsXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnVzZUZpeGVkVGFnLFxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5maXhlZFRhZ1xuICAgICAgICApO1xuICAgICAgICBjb25zdCBmdWxsRGF0ZVRpbWUgPSBgJHt1cGRhdGVkLmRhdGV9ICR7dXBkYXRlZC50aW1lfWAudHJpbSgpO1xuICAgICAgICBjb25zdCB1cGRhdGVkQXROb3cgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpO1xuICAgICAgICBjb25zdCBuZXdCbG9jayA9IGZvcm1hdEpvdEVudHJ5QmxvY2soZnVsbERhdGVUaW1lLCB1cGRhdGVkLmlkLCB1cGRhdGVkQXROb3csIGJvZHkpO1xuXG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5wcm9jZXNzKGZpbGUsICh0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSByZXBsYWNlSm90QmxvY2tCeUlkKHRleHQsIGZpbGUucGF0aCwgdXBkYXRlZC5pZCwgbmV3QmxvY2spO1xuICAgICAgICAgICAgZm91bmQgPSByZXN1bHQuZm91bmQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmNvbnRlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSB0KCdqb3RVcGRhdGVOb3RGb3VuZCcsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICBuZXcgTm90aWNlKG1zZyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0pPVFMpLmZvckVhY2gobGVhZiA9PiB7XG4gICAgICAgICAgICBpZiAobGVhZi52aWV3IGluc3RhbmNlb2YgSm90VmlldykgbGVhZi52aWV3LnJlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZEpvdHNEYXRhKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2F2ZVRvTXVsdGlGaWxlKGRhdGVTdHI6IHN0cmluZywgbmV3RW50cnk6IHN0cmluZywgdGFnczogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgZm9sZGVyID0gbm9ybWFsaXplUGF0aCh0aGlzLnNldHRpbmdzLnNhdmVGb2xkZXIpO1xuICAgICAgICBsZXQgZmlsZW5hbWUgPSB0aGlzLnNldHRpbmdzLm11bHRpRmlsZUZvcm1hdC5yZXBsYWNlKFwiWVlZWU1NRERcIiwgZGF0ZVN0ci5yZXBsYWNlKC8tL2csIFwiXCIpKTtcbiAgICAgICAgaWYgKCFmaWxlbmFtZS5lbmRzV2l0aChcIi5tZFwiKSkgZmlsZW5hbWUgKz0gXCIubWRcIjtcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBgJHtmb2xkZXJ9LyR7ZmlsZW5hbWV9YDtcblxuICAgICAgICBpZiAoIXRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChmb2xkZXIpKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGVGb2xkZXIoZm9sZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NjU4N1x1NEVGNlx1NjYyRlx1NTQyNlx1NUI1OFx1NTcyOFxuICAgICAgICBjb25zdCBleGlzdGluZ0ZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICAgIGlmIChleGlzdGluZ0ZpbGUgJiYgZXhpc3RpbmdGaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIC8vIFx1NjU4N1x1NEVGNlx1NUI1OFx1NTcyOFx1RkYwQ1x1NEY3Rlx1NzUyOCB2YXVsdC5wcm9jZXNzIFx1NUI5RVx1NzNCMFx1NTM5Rlx1NUI1MFx1NjAyN1x1NjU4N1x1NEVGNlx1NTE5OVx1NTE2NVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQucHJvY2VzcyhleGlzdGluZ0ZpbGUsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGVDb250ZW50ID0gZGF0YSB8fCBcIlwiO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXJSZWdleCA9IC9eLS0tXFxuKFtcXHNcXFNdKj8pXFxuLS0tXFxuLztcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9udG1hdHRlck1hdGNoID0gZmlsZUNvbnRlbnQubWF0Y2goZnJvbnRtYXR0ZXJSZWdleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZnJvbnRtYXR0ZXJNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmcm9udG1hdHRlckVuZCA9IGZyb250bWF0dGVyTWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiZWZvcmVGcm9udG1hdHRlciA9IGZpbGVDb250ZW50LnN1YnN0cmluZygwLCBmcm9udG1hdHRlckVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFmdGVyRnJvbnRtYXR0ZXIgPSBmaWxlQ29udGVudC5zdWJzdHJpbmcoZnJvbnRtYXR0ZXJFbmQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVmb3JlRnJvbnRtYXR0ZXIgKyBuZXdFbnRyeSArIGFmdGVyRnJvbnRtYXR0ZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld0VudHJ5ICsgZmlsZUNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBcdTY1ODdcdTRFRjZcdTRFMERcdTVCNThcdTU3MjhcdUZGMENcdTUyMUJcdTVFRkFcdTVFMjZcdTY3MDkgZnJvbnRtYXR0ZXIgXHU3Njg0XHU2NTg3XHU0RUY2XG4gICAgICAgICAgICBsZXQgZnJvbnRtYXR0ZXIgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXIgJiYgdGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZnJvbnRtYXR0ZXIgPSBcIi0tLVxcblwiO1xuICAgICAgICAgICAgICAgIGZyb250bWF0dGVyICs9IGB0YWdzOlxcbiR7dGFncy5tYXAodGcgPT4gYCAgLSAke3RnfWApLmpvaW4oXCJcXG5cIil9XFxuYDtcbiAgICAgICAgICAgICAgICBmcm9udG1hdHRlciArPSBcIi0tLVxcblxcblwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmlsZUNvbnRlbnQgPSBmcm9udG1hdHRlciArIG5ld0VudHJ5O1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQuY3JlYXRlKGZpbGVQYXRoLCBmaWxlQ29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzYXZlVG9TaW5nbGVGaWxlKG5ld0VudHJ5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZm9sZGVyID0gbm9ybWFsaXplUGF0aCh0aGlzLnNldHRpbmdzLnNhdmVGb2xkZXIpO1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGAke2ZvbGRlcn0vam90cy5tZGA7XG4gICAgICAgIGlmICghdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZvbGRlcikpIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihmb2xkZXIpO1xuXG4gICAgICAgIC8vIFx1NjhDMFx1NjdFNVx1NjU4N1x1NEVGNlx1NjYyRlx1NTQyNlx1NUI1OFx1NTcyOFxuICAgICAgICBjb25zdCBleGlzdGluZ0ZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICAgIGlmIChleGlzdGluZ0ZpbGUgJiYgZXhpc3RpbmdGaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIC8vIFx1NjU4N1x1NEVGNlx1NUI1OFx1NTcyOFx1RkYwQ1x1NEY3Rlx1NzUyOCB2YXVsdC5wcm9jZXNzIFx1NUI5RVx1NzNCMFx1NTM5Rlx1NUI1MFx1NjAyN1x1NjU4N1x1NEVGNlx1NTE5OVx1NTE2NVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQucHJvY2VzcyhleGlzdGluZ0ZpbGUsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGVDb250ZW50ID0gZGF0YSB8fCBcIlwiO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXJSZWdleCA9IC9eLS0tXFxuKFtcXHNcXFNdKj8pXFxuLS0tXFxuLztcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9udG1hdHRlck1hdGNoID0gZmlsZUNvbnRlbnQubWF0Y2goZnJvbnRtYXR0ZXJSZWdleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZnJvbnRtYXR0ZXJNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmcm9udG1hdHRlckVuZCA9IGZyb250bWF0dGVyTWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiZWZvcmVGcm9udG1hdHRlciA9IGZpbGVDb250ZW50LnN1YnN0cmluZygwLCBmcm9udG1hdHRlckVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFmdGVyRnJvbnRtYXR0ZXIgPSBmaWxlQ29udGVudC5zdWJzdHJpbmcoZnJvbnRtYXR0ZXJFbmQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVmb3JlRnJvbnRtYXR0ZXIgKyBuZXdFbnRyeSArIGFmdGVyRnJvbnRtYXR0ZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld0VudHJ5ICsgZmlsZUNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBcdTY1ODdcdTRFRjZcdTRFMERcdTVCNThcdTU3MjhcdUZGMENcdTUyMUJcdTVFRkFcdTY1QjBcdTY1ODdcdTRFRjZcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZShmaWxlUGF0aCwgbmV3RW50cnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcbiAgICB9XG5cbiAgICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5zdXJlQXR0YWNobWVudHNGb2xkZXIoKTtcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfSk9UUykuZm9yRWFjaChsZWFmID0+IHtcbiAgICAgICAgICAgIGlmIChsZWFmLnZpZXcgaW5zdGFuY2VvZiBKb3RWaWV3KSBsZWFmLnZpZXcucmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSm90c0RhdGEoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21tYW5kTmFtZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUNvbW1hbmROYW1lcygpIHtcbiAgICAgICAgY29uc3QgY29tbWFuZHMgPSBbXG4gICAgICAgICAgICB7IGlkOiBcIm9wZW4tam90LXZpZXdcIiwga2V5OiBcIm9wZW5Kb3RWaWV3XCIgYXMga2V5b2YgVHJhbnNsYXRpb25zIH0sXG4gICAgICAgICAgICB7IGlkOiBcInF1aWNrLWNhcHR1cmVcIiwga2V5OiBcInF1aWNrQ2FwdHVyZVwiIGFzIGtleW9mIFRyYW5zbGF0aW9ucyB9XG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3Qgc2VwYXJhdG9yID0gdGhpcy5sYW5nID09PSAnemgnID8gJ1x1RkYxQScgOiAnOiAnO1xuXG4gICAgICAgIGNvbW1hbmRzLmZvckVhY2goKHsgaWQsIGtleSB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5hcHAuY29tbWFuZHMuZmluZENvbW1hbmQoYCR7dGhpcy5tYW5pZmVzdC5pZH06JHtpZH1gKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZC5uYW1lID0gYGpvdCR7c2VwYXJhdG9yfSR7dChrZXksIHRoaXMubGFuZyl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSIsICIvLyBzcmMvdmlldy50c1xuaW1wb3J0IHsgSXRlbVZpZXcsIFdvcmtzcGFjZUxlYWYsIFRGaWxlLCBURm9sZGVyLCBOb3RpY2UsIE1hcmtkb3duVmlldywgTWFya2Rvd25SZW5kZXJlciwgQ29tcG9uZW50LCBub3JtYWxpemVQYXRoIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IEpvdFBsdWdpbiBmcm9tICcuL21haW4nO1xuaW1wb3J0IHsgSm90LCBEYXlSZWNvcmQsIExhbmd1YWdlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyB0cmFuc2xhdGlvbnMsIHQgfSBmcm9tICcuL2kxOG4nO1xuaW1wb3J0IHtcbiAgICBwYXJzZUZpbGVDb250ZW50LFxuICAgIGhhbmRsZUF0dGFjaG1lbnQsXG4gICAgc2V0dXBXaWtpbGlua0F1dG9jb21wbGV0ZSxcbiAgICBzZXR1cFRhZ0F1dG9jb21wbGV0ZSxcbiAgICByZW5kZXJUYWdMaXN0IGFzIHJlbmRlclRhZ1BpbGxzLFxuICAgIGhpZ2hsaWdodE1hcmtkb3duQ29udGVudCxcbiAgICBkZWJvdW5jZSxcbiAgICBzdGFibGVMZWdhY3lKb3RJZCxcbiAgICBub3JtYWxpemVKb3RUYWdzXG59IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBDQVJEX0xPTkdfUFJFU1NfTVMgPSA0ODA7XG5jb25zdCBDQVJEX1RBUF9NT1ZFX1BYID0gMTQ7XG5cbmV4cG9ydCBjb25zdCBWSUVXX1RZUEVfSk9UUyA9IFwiam90LXZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIEpvdFZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gICAgcGx1Z2luOiBKb3RQbHVnaW47XG4gICAgam90czogSm90W10gPSBbXTtcbiAgICBzZWFyY2hRdWVyeTogc3RyaW5nID0gXCJcIjtcbiAgICBzZWxlY3RlZFRhZ3M6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuICAgIGN1cnJlbnRZZWFyOiBudW1iZXI7XG4gICAgY3VycmVudE1vbnRoOiBudW1iZXI7XG4gICAgaXNTaWRlYmFyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzdWdnZXN0aW9uQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgY3VycmVudFRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBpbnB1dENhcmQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBzZWFyY2hJbnB1dDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgc2VhcmNoQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgcmVuZGVyZWRDb21wb25lbnRzOiBDb21wb25lbnRbXSA9IFtdO1xuICAgIHByaXZhdGUgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHRhZ0xpc3RDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjdXJyZW50VGFnczogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIGRlYm91bmNlZFJlbmRlcjogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBkZWJvdW5jZWRTZWFyY2g6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgd2lraWxpbmtDbGVhbnVwOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgICAvKiogSW5saW5lIGpvdCBlZGl0ICovXG4gICAgcHJpdmF0ZSBlZGl0aW5nSm90SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgZWRpdFNlc3Npb25UYWdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByaXZhdGUgam90TGlzdENsZWFudXBzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG4gICAgZ2V0IGxhbmcoKTogTGFuZ3VhZ2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4ubGFuZztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IEpvdFBsdWdpbikge1xuICAgICAgICBzdXBlcihsZWFmKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBub3cuZ2V0TW9udGgoKTtcblxuICAgICAgICAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdTk2MzJcdTYyOTZcdTY0MUNcdTdEMjJcdTUxRkRcdTY1NzBcbiAgICAgICAgdGhpcy5kZWJvdW5jZWRTZWFyY2ggPSBkZWJvdW5jZSgocXVlcnk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTZWFyY2hBbmRGaWx0ZXIoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG5cbiAgICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gVklFV19UWVBFX0pPVFM7XG4gICAgfVxuXG4gICAgZ2V0RGlzcGxheVRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHQoJ2pvdFZpZXcnLCB0aGlzLmxhbmcpO1xuICAgIH1cblxuICAgIGdldEljb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiam90LWJvbHRcIjsgXG4gICAgfVxuXG4gICAgYXN5bmMgb25PcGVuKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcyhcImpvdHMtdmlld1wiKTtcblxuICAgICAgICBpZiAodGhpcy5sZWFmLnRhYkhlYWRlcklubmVySWNvbkVsKSB7XG4gICAgICAgICAgICB0aGlzLmxlYWYudGFiSGVhZGVySW5uZXJJY29uRWwuZW1wdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1NTIxRFx1NTlDQlx1NTMxNlx1OTYzMlx1NjI5Nlx1NkUzMlx1NjdEM1xuICAgICAgICB0aGlzLmRlYm91bmNlZFJlbmRlciA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIHRoaXMuY2hlY2tJZlNpZGViYXIoKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2FjdGl2ZS1sZWFmLWNoYW5nZScsIChsZWFmKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxlYWYgPT09IHRoaXMubGVhZiAmJiB0aGlzLmN1cnJlbnRUZXh0YXJlYSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzVGV4dGFyZWEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBjb25zdCB3YXNTaWRlYmFyID0gdGhpcy5pc1NpZGViYXI7XG4gICAgICAgIHRoaXMuY2hlY2tJZlNpZGViYXIoKTtcblxuICAgICAgICAvLyBcdTUzRUFcdTY3MDlcdTU3MjhcdTVFMDNcdTVDNDBcdTZBMjFcdTVGMEZcdTY1MzlcdTUzRDhcdTY1RjZcdTYyNERcdTkxQ0RcdTY1QjBcdTZFMzJcdTY3RDNcbiAgICAgICAgaWYgKHdhc1NpZGViYXIgIT09IHRoaXMuaXNTaWRlYmFyICYmIHRoaXMuZGVib3VuY2VkUmVuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmRlYm91bmNlZFJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb25DbG9zZSgpIHtcbiAgICAgICAgLy8gXHU2RTA1XHU3NDA2IHdpa2lsaW5rIFx1NUVGQVx1OEJBRVx1NUJCOVx1NTY2OFxuICAgICAgICBpZiAodGhpcy53aWtpbGlua0NsZWFudXApIHtcbiAgICAgICAgICAgIHRoaXMud2lraWxpbmtDbGVhbnVwKCk7XG4gICAgICAgICAgICB0aGlzLndpa2lsaW5rQ2xlYW51cCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdTZFMDVcdTc0MDZcdTVFRkFcdThCQUVcdTVCQjlcdTU2NjhcbiAgICAgICAgaWYgKHRoaXMudGFnU3VnZ2VzdGlvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy50YWdTdWdnZXN0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy50YWdTdWdnZXN0aW9uQ29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1NkUwNVx1NzQwNlx1NjI0MFx1NjcwOVx1NkUzMlx1NjdEM1x1NzY4NFx1N0VDNFx1NEVGNlxuICAgICAgICB0aGlzLnJlbmRlcmVkQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb21wLnVubG9hZCgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1bmxvYWRpbmcgY29tcG9uZW50OlwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyZWRDb21wb25lbnRzID0gW107XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZm9jdXNUZXh0YXJlYSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRleHRhcmVhKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXh0YXJlYT8uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmN1cnJlbnRUZXh0YXJlYS52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2UobGVuZ3RoLCBsZW5ndGgpO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgdXBkYXRlU2VhcmNoQW5kRmlsdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZSA9IHRoaXMuc2VhcmNoUXVlcnk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDbGVhckJ1dHRvbigpO1xuICAgICAgICBjb25zdCBsaXN0U2VjdGlvbiA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1saXN0LXNlY3Rpb25cIik7XG4gICAgICAgIGlmIChsaXN0U2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJKb3RMaXN0KGxpc3RTZWN0aW9uIGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHVwZGF0ZUNsZWFyQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hDb250YWluZXIpIHtcbiAgICAgICAgICAgIGxldCBjbGVhckJ0bkNvbnRhaW5lciA9IHRoaXMuc2VhcmNoQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWNsZWFyLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGlmICghY2xlYXJCdG5Db250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lciA9IHRoaXMuc2VhcmNoQ29udGFpbmVyLmNyZWF0ZURpdih7IGNsczogXCJzZWFyY2gtY2xlYXItY29udGFpbmVyXCIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ICYmIHRoaXMuc2VhcmNoUXVlcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYXJJY29uID0gY2xlYXJCdG5Db250YWluZXIuY3JlYXRlU3BhbigpO1xuICAgICAgICAgICAgICAgIGNsZWFySWNvbi50ZXh0Q29udGVudCA9IFwiXHUwMEQ3XCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2xlYXJCdG5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gXCI4cHhcIjtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lci5zdHlsZS50b3AgPSBcIjUwJVwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgtNTAlKVwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lci5zdHlsZS53aWR0aCA9IFwiMjRweFwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiMjRweFwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNTAlXCI7XG4gICAgICAgICAgICAgICAgY2xlYXJCdG5Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBcIjEwXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIjMycHhcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2xlYXJCdG5Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlYXJjaEFuZEZpbHRlcigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYXJCdG5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlU2VhcmNoRmlsdGVycyhxdWVyeTogc3RyaW5nKTogeyBkYXRlPzogc3RyaW5nOyB1cGRhdGVkPzogc3RyaW5nOyBrZXl3b3Jkczogc3RyaW5nW10gfSB7XG4gICAgICAgIGNvbnN0IGtleXdvcmRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgZGF0ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdXBkYXRlZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcXVlcnkudHJpbSgpLnNwbGl0KC9cXHMrLykuZmlsdGVyKEJvb2xlYW4pKSB7XG4gICAgICAgICAgICBjb25zdCBsb3dlciA9IHBhcnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChsb3dlci5zdGFydHNXaXRoKFwiZGF0ZTpcIikpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gcGFydC5zbGljZSg1KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobG93ZXIuc3RhcnRzV2l0aChcInVwZGF0ZWQ6XCIpKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZCA9IHBhcnQuc2xpY2UoOCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtleXdvcmRzLnB1c2gocGFydC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkYXRlLCB1cGRhdGVkLCBrZXl3b3JkcyB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoQ2FyZFRhcEFuZExvbmdQcmVzcyhjYXJkOiBIVE1MRWxlbWVudCwgam90OiBKb3QpIHtcbiAgICAgICAgbGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuICAgICAgICBsZXQgbG9uZ1ByZXNzRmlyZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHN0YXJ0WCA9IDA7XG4gICAgICAgIGxldCBzdGFydFkgPSAwO1xuICAgICAgICBsZXQgbW92ZWRUb29GYXIgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBjbGVhclRpbWVyID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25Qb2ludGVyRG93biA9IChlOiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIgJiYgZS5idXR0b24gIT09IDApIHJldHVybjtcbiAgICAgICAgICAgIGxvbmdQcmVzc0ZpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICBtb3ZlZFRvb0ZhciA9IGZhbHNlO1xuICAgICAgICAgICAgc3RhcnRYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYXJkLnNldFBvaW50ZXJDYXB0dXJlKGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIC8qIGlnbm9yZSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgbG9uZ1ByZXNzRmlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZvaWQgdGhpcy5vcGVuSm90KGpvdCk7XG4gICAgICAgICAgICB9LCBDQVJEX0xPTkdfUFJFU1NfTVMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uUG9pbnRlck1vdmUgPSAoZTogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGltZXIgPT09IG51bGwgJiYgIWxvbmdQcmVzc0ZpcmVkKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBkeCA9IGUuY2xpZW50WCAtIHN0YXJ0WDtcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gZS5jbGllbnRZIC0gc3RhcnRZO1xuICAgICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5ID4gQ0FSRF9UQVBfTU9WRV9QWCAqIENBUkRfVEFQX01PVkVfUFgpIHtcbiAgICAgICAgICAgICAgICBtb3ZlZFRvb0ZhciA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uUG9pbnRlclVwID0gKGU6IFBvaW50ZXJFdmVudCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYXJkLnJlbGVhc2VQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAvKiBpZ25vcmUgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsb25nUHJlc3NGaXJlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKG1vdmVkVG9vRmFyKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoZS5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmVudGVyRWRpdE1vZGUoam90KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblBvaW50ZXJDYW5jZWwgPSAoZTogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVyKCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNhcmQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIC8qIGlnbm9yZSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24pO1xuICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvblBvaW50ZXJNb3ZlKTtcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIG9uUG9pbnRlclVwKTtcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmNhbmNlbFwiLCBvblBvaW50ZXJDYW5jZWwpO1xuXG4gICAgICAgIHRoaXMuam90TGlzdENsZWFudXBzLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgY2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93bik7XG4gICAgICAgICAgICBjYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvblBvaW50ZXJNb3ZlKTtcbiAgICAgICAgICAgIGNhcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBvblBvaW50ZXJVcCk7XG4gICAgICAgICAgICBjYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsIG9uUG9pbnRlckNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW50ZXJFZGl0TW9kZShqb3Q6IEpvdCkge1xuICAgICAgICB0aGlzLmVkaXRpbmdKb3RJZCA9IGpvdC5pZDtcbiAgICAgICAgdGhpcy5lZGl0U2Vzc2lvblRhZ3MgPSBbLi4uam90LnRhZ3NdO1xuICAgICAgICBjb25zdCBsaXN0U2VjdGlvbiA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1saXN0LXNlY3Rpb25cIik7XG4gICAgICAgIGlmIChsaXN0U2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJKb3RMaXN0KGxpc3RTZWN0aW9uIGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXhpdEVkaXRNb2RlKCkge1xuICAgICAgICB0aGlzLmVkaXRpbmdKb3RJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZWRpdFNlc3Npb25UYWdzID0gW107XG4gICAgICAgIGNvbnN0IGxpc3RTZWN0aW9uID0gdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5qb3RzLWxpc3Qtc2VjdGlvblwiKTtcbiAgICAgICAgaWYgKGxpc3RTZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckpvdExpc3QobGlzdFNlY3Rpb24gYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgcmVuZGVyVGFnTGlzdChjb250YWluZXI6IEhUTUxFbGVtZW50LCB0YWdzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWdzID0gdGFncztcbiAgICAgICAgcmVuZGVyVGFnUGlsbHMoY29udGFpbmVyLCB0YWdzLCAodGFnKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYWdzID0gdGhpcy5jdXJyZW50VGFncy5maWx0ZXIodCA9PiB0ICE9PSB0YWcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWdMaXN0KGNvbnRhaW5lciwgdGhpcy5jdXJyZW50VGFncyk7XG4gICAgICAgICAgICBjb25zdCB0YWdJbnB1dCA9IHRoaXMuaW5wdXRDYXJkPy5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtdGFnLWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGFnSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0YWdJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNldHVwVGFnQXV0b2NvbXBsZXRlKHRhZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50LCBjb250YWluZXI6IEhUTUxFbGVtZW50LCB0YWdMaXN0Q29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzZXR1cFRhZ0F1dG9jb21wbGV0ZShcbiAgICAgICAgICAgICgpID0+IHRoaXMuZ2V0RXhpc3RpbmdUYWdzKCksXG4gICAgICAgICAgICB0YWdJbnB1dCxcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIHRhZ0xpc3RDb250YWluZXIsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYWdzLFxuICAgICAgICAgICAgKHRhZykgPT4gdGhpcy5hZGRUYWdUb0lucHV0KHRhZywgdGFnSW5wdXQsIHRhZ0xpc3RDb250YWluZXIpLFxuICAgICAgICAgICAgKHRhZ3MpID0+IHRoaXMucmVuZGVyVGFnTGlzdCh0YWdMaXN0Q29udGFpbmVyLCB0YWdzKVxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdldEV4aXN0aW5nVGFncygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHRhZ3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgZm9yIChjb25zdCBqb3Qgb2YgdGhpcy5qb3RzKSB7XG4gICAgICAgICAgICBqb3QudGFncy5mb3JFYWNoKHRhZyA9PiB0YWdzLmFkZCh0YWcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0YWdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRhZ1RvSW5wdXQodGFnOiBzdHJpbmcsIHRhZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50LCB0YWdMaXN0Q29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBpZiAodGFnICYmICF0aGlzLmN1cnJlbnRUYWdzLmluY2x1ZGVzKHRhZykpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWdMaXN0KHRhZ0xpc3RDb250YWluZXIsIHRoaXMuY3VycmVudFRhZ3MpO1xuICAgICAgICAgICAgdGFnSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tJZlNpZGViYXIoKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jb250ZW50RWwuY2xpZW50V2lkdGg7XG4gICAgICAgIHRoaXMuaXNTaWRlYmFyID0gd2lkdGggPCA0NTA7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSm90cygpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRKb3RzKCkge1xuICAgICAgICBjb25zdCBmb2xkZXIgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zYXZlRm9sZGVyO1xuICAgICAgICBjb25zdCBmb2xkZXJPYmogPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZm9sZGVyKTtcblxuICAgICAgICBpZiAoIWZvbGRlck9iaiB8fCAhKGZvbGRlck9iaiBpbnN0YW5jZW9mIFRGb2xkZXIpKSB7XG4gICAgICAgICAgICB0aGlzLmpvdHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gZm9sZGVyT2JqLmNoaWxkcmVuLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBURmlsZSAmJiBmLm5hbWUuZW5kc1dpdGgoXCIubWRcIikpO1xuICAgICAgICBjb25zdCBhbGxKb3RzOiBKb3RbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSBhcyBURmlsZSk7XG4gICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gcGFyc2VGaWxlQ29udGVudChjb250ZW50LCBmaWxlLnBhdGgsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICBhbGxKb3RzLnB1c2goLi4uZW50cmllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBhbGxKb3RzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVBID0gbW9tZW50KGEuZGF0ZSArIFwiIFwiICsgYS50aW1lLCBcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG4gICAgICAgICAgICBjb25zdCBkYXRlQiA9IG1vbWVudChiLmRhdGUgKyBcIiBcIiArIGIudGltZSwgXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVCLnZhbHVlT2YoKSAtIGRhdGVBLnZhbHVlT2YoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5qb3RzID0gYWxsSm90cztcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaXNTaWRlYmFyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclNpZGViYXJMYXlvdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTWFpbkxheW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZvY3VzVGV4dGFyZWEoKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyTWFpbkxheW91dCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KCk7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5nYXAgPSBcIjIwcHhcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgICBjb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGVmdFBhbmVsID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBsZWZ0UGFuZWwuc3R5bGUuZmxleCA9IFwiMlwiO1xuICAgICAgICBsZWZ0UGFuZWwuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICAgICAgbGVmdFBhbmVsLnN0eWxlLnBhZGRpbmcgPSBcIjEwcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJpZ2h0UGFuZWwgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHJpZ2h0UGFuZWwuc3R5bGUuZmxleCA9IFwiMVwiO1xuICAgICAgICByaWdodFBhbmVsLnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICAgIHJpZ2h0UGFuZWwuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJGdWxsSW5wdXQobGVmdFBhbmVsKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxpc3RDb250YWluZXIgPSBsZWZ0UGFuZWwuY3JlYXRlRGl2KCk7XG4gICAgICAgIGxpc3RDb250YWluZXIuc3R5bGUubWFyZ2luVG9wID0gXCIyMHB4XCI7XG4gICAgICAgIHRoaXMucmVuZGVySm90TGlzdChsaXN0Q29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyU3RhdHMocmlnaHRQYW5lbCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIocmlnaHRQYW5lbCk7XG4gICAgICAgIHRoaXMucmVuZGVyU2VhcmNoKHJpZ2h0UGFuZWwpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJTaWRlYmFyTGF5b3V0KCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSBcImNvbHVtblwiO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZ2FwID0gXCIxMnB4XCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFkZEJ0biA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgYWRkQnRuLnRleHRDb250ZW50ID0gXCIrIFwiICsgdCgncXVpY2tDYXB0dXJlJywgdGhpcy5sYW5nKTtcbiAgICAgICAgYWRkQnRuLnN0eWxlLmJhY2tncm91bmQgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgYWRkQnRuLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIjtcbiAgICAgICAgYWRkQnRuLnN0eWxlLnBhZGRpbmcgPSBcIjhweCAxMnB4XCI7XG4gICAgICAgIGFkZEJ0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBhZGRCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIGFkZEJ0bi5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBhZGRCdG4uc3R5bGUuZm9udFNpemUgPSBcIjEzcHhcIjtcbiAgICAgICAgYWRkQnRuLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiNHB4XCI7XG4gICAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBDYXB0dXJlTW9kYWwgfSA9IHJlcXVpcmUoJy4vY2FwdHVyZS1tb2RhbCcpO1xuICAgICAgICAgICAgbmV3IENhcHR1cmVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4pLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlclN0YXRzQ29tcGFjdChjb250YWluZXIpO1xuICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyQ29tcGFjdChjb250YWluZXIpO1xuICAgICAgICB0aGlzLnJlbmRlclNlYXJjaENvbXBhY3QoY29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxpc3RDb250YWluZXIgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIGxpc3RDb250YWluZXIuc3R5bGUubWFyZ2luVG9wID0gXCI4cHhcIjtcbiAgICAgICAgdGhpcy5yZW5kZXJKb3RMaXN0KGxpc3RDb250YWluZXIpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJGdWxsSW5wdXQoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLmlucHV0Q2FyZCA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGhpcy5pbnB1dENhcmQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSlcIjtcbiAgICAgICAgdGhpcy5pbnB1dENhcmQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIxMnB4XCI7XG4gICAgICAgIHRoaXMuaW5wdXRDYXJkLnN0eWxlLnBhZGRpbmcgPSBcIjE2cHhcIjtcbiAgICAgICAgdGhpcy5pbnB1dENhcmQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmlucHV0Q2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0KCdxdWlja1JlY29yZCcsIHRoaXMubGFuZyk7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gXCIxNnB4XCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjYwMFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjEycHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuXG4gICAgICAgIGNvbnN0IHRleHRhcmVhQ29udGFpbmVyID0gdGhpcy5pbnB1dENhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgIHRleHRhcmVhQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXG4gICAgICAgIGNvbnN0IHRleHRhcmVhID0gdGV4dGFyZWFDb250YWluZXIuY3JlYXRlRWwoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgdGV4dGFyZWEucGxhY2Vob2xkZXIgPSB0KCdwbGFjZWhvbGRlcldpdGhMaW5rJywgdGhpcy5sYW5nKTtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUubWluSGVpZ2h0ID0gXCIxMDBweFwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLnJlc2l6ZSA9IFwidmVydGljYWxcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuZm9udEZhbWlseSA9IFwidmFyKC0tZm9udC10ZXh0KVwiO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFRleHRhcmVhID0gdGV4dGFyZWE7XG4gICAgICAgIHRoaXMuc2V0dXBXaWtpbGlua0F1dG9jb21wbGV0ZSh0ZXh0YXJlYSwgdGV4dGFyZWFDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IHRhZ1NlY3Rpb24gPSB0aGlzLmlucHV0Q2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGFnU2VjdGlvbi5zdHlsZS5tYXJnaW5Ub3AgPSBcIjhweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGFnSW5wdXRDb250YWluZXIgPSB0YWdTZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICB0YWdJbnB1dENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgdGFnSW5wdXRDb250YWluZXIuc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRhZ0lucHV0ID0gdGFnSW5wdXRDb250YWluZXIuY3JlYXRlRWwoXCJpbnB1dFwiKTtcbiAgICAgICAgdGFnSW5wdXQuYWRkQ2xhc3MoXCJqb3RzLXRhZy1pbnB1dFwiKTtcbiAgICAgICAgdGFnSW5wdXQucGxhY2Vob2xkZXIgPSB0KCd0YWdzSW5wdXRQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHRhZ0lucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHRhZ0lucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICB0YWdJbnB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICB0YWdJbnB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgdGFnSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgIHRhZ0lucHV0LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lciA9IHRhZ1NlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lci5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICB0aGlzLnRhZ0xpc3RDb250YWluZXIuc3R5bGUuZ2FwID0gXCI2cHhcIjtcbiAgICAgICAgdGhpcy50YWdMaXN0Q29udGFpbmVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIHRoaXMuY3VycmVudFRhZ3MgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0dXBUYWdBdXRvY29tcGxldGUodGFnSW5wdXQsIHRhZ0lucHV0Q29udGFpbmVyLCB0aGlzLnRhZ0xpc3RDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZUlucHV0ID0gdGhpcy5pbnB1dENhcmQuY3JlYXRlRWwoXCJpbnB1dFwiKTtcbiAgICAgICAgc291cmNlSW5wdXQucGxhY2Vob2xkZXIgPSB0KCdzb3VyY2VQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUubWFyZ2luVG9wID0gXCI4cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnRBcmVhID0gdGhpcy5pbnB1dENhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLm1hcmdpblRvcCA9IFwiOHB4XCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlciA9IFwiMXB4IGRhc2hlZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUucGFkZGluZyA9IFwiOHB4XCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS50ZXh0Q29udGVudCA9IHQoJ2F0dGFjaG1lbnRQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmZvbnRTaXplID0gXCIxMnB4XCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBzZWxlY3RlZEF0dGFjaG1lbnRzOiB7IHBhdGg6IHN0cmluZzsgdHlwZTogXCJpbWFnZVwiIHwgXCJmaWxlXCIgfVtdID0gW107XG4gICAgICAgIFxuICAgICAgICBhdHRhY2htZW50QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gXCJmaWxlXCI7XG4gICAgICAgICAgICBpbnB1dC5tdWx0aXBsZSA9IHRydWU7XG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgfHwgW10pO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUF0dGFjaG1lbnQoZmlsZSwgYXR0YWNobWVudEFyZWEsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQXR0YWNobWVudHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBzZWxlY3RlZEF0dGFjaG1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnRleHRDb250ZW50ID0gdCgnc2VsZWN0ZWRGaWxlcycsIHRoaXMubGFuZywgeyBjb3VudDogU3RyaW5nKGNvdW50KSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3ZlcilcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhdHRhY2htZW50QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGFzeW5jIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5ib3JkZXJDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRhdGFUcmFuc2Zlcj8uZmlsZXMgfHwgW10pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVBdHRhY2htZW50KGZpbGUsIGF0dGFjaG1lbnRBcmVhLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQXR0YWNobWVudHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHNlbGVjdGVkQXR0YWNobWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50QXJlYS50ZXh0Q29udGVudCA9IHQoJ3NlbGVjdGVkRmlsZXMnLCB0aGlzLmxhbmcsIHsgY291bnQ6IFN0cmluZyhjb3VudCkgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYnV0dG9uUm93ID0gdGhpcy5pbnB1dENhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgIGJ1dHRvblJvdy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGJ1dHRvblJvdy5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiZmxleC1lbmRcIjtcbiAgICAgICAgYnV0dG9uUm93LnN0eWxlLm1hcmdpblRvcCA9IFwiMTJweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2F2ZUJ0biA9IGJ1dHRvblJvdy5jcmVhdGVFbChcImJ1dHRvblwiKTtcbiAgICAgICAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9IHQoJ3NhdmUnLCB0aGlzLmxhbmcpO1xuICAgICAgICBzYXZlQnRuLnN0eWxlLnBhZGRpbmcgPSBcIjZweCAxNnB4XCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1vbi1hY2NlbnQpXCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XG5cbiAgICAgICAgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRleHRhcmVhLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodCgnY29udGVudFJlcXVpcmVkJywgdGhpcy5sYW5nKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0YWdzID0gWy4uLnRoaXMuY3VycmVudFRhZ3NdO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gc291cmNlSW5wdXQudmFsdWUudHJpbSgpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlx1NEZERFx1NUI1OFx1NjVGNlx1OTY0NFx1NEVGNlx1NjU3MFx1OTFDRjpcIiwgc2VsZWN0ZWRBdHRhY2htZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlSm90KGNvbnRlbnQsIHRhZ3MsIHNvdXJjZSwgc2VsZWN0ZWRBdHRhY2htZW50cyk7XG5cbiAgICAgICAgICAgIHRleHRhcmVhLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhZ3MgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGFnTGlzdCh0aGlzLnRhZ0xpc3RDb250YWluZXIhLCBbXSk7XG4gICAgICAgICAgICB0YWdJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBzb3VyY2VJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBzZWxlY3RlZEF0dGFjaG1lbnRzID0gW107XG4gICAgICAgICAgICBhdHRhY2htZW50QXJlYS50ZXh0Q29udGVudCA9IHQoJ2F0dGFjaG1lbnRQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5ib3JkZXJDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5mb2N1c1RleHRhcmVhKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBzZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBjb250YWluZXI6IEhUTUxFbGVtZW50KTogKCkgPT4gdm9pZCB7XG4gICAgICAgIHRoaXMud2lraWxpbmtDbGVhbnVwID0gc2V0dXBXaWtpbGlua0F1dG9jb21wbGV0ZShcbiAgICAgICAgICAgIHRoaXMuYXBwLFxuICAgICAgICAgICAgdGV4dGFyZWEsXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICAoZmlsZSwgdGV4dGFyZWEsIGJyYWNrZXRTdGFydCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnNvclBvcyA9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRCZWZvcmUgPSB0ZXh0YXJlYS52YWx1ZS5zdWJzdHJpbmcoMCwgYnJhY2tldFN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0QWZ0ZXIgPSB0ZXh0YXJlYS52YWx1ZS5zdWJzdHJpbmcoY3Vyc29yUG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUZXh0ID0gdGV4dEJlZm9yZSArIGBbWyR7ZmlsZS5iYXNlbmFtZX1dXWAgKyB0ZXh0QWZ0ZXI7XG4gICAgICAgICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBuZXdUZXh0O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q3Vyc29yUG9zID0gYnJhY2tldFN0YXJ0ICsgZmlsZS5iYXNlbmFtZS5sZW5ndGggKyA0O1xuICAgICAgICAgICAgICAgIHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ID0gbmV3Q3Vyc29yUG9zO1xuICAgICAgICAgICAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IG5ld0N1cnNvclBvcztcblxuICAgICAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB0aGlzLndpa2lsaW5rQ2xlYW51cDtcbiAgICB9XG4gICAgXG5cbiAgICBhc3luYyBoYW5kbGVBdHRhY2htZW50KGZpbGU6IEZpbGUsIGFyZWE6IEhUTUxFbGVtZW50LCBjYWxsYmFjazogKHJlc3VsdDogeyBwYXRoOiBzdHJpbmc7IHR5cGU6IFwiaW1hZ2VcIiB8IFwiZmlsZVwiIH0pID0+IHZvaWQpIHtcbiAgICAgICAgYXdhaXQgaGFuZGxlQXR0YWNobWVudChcbiAgICAgICAgICAgIHRoaXMuYXBwLFxuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLFxuICAgICAgICAgICAgdGhpcy5sYW5nLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyU3RhdHMoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzdGF0cyA9IHRoaXMuZ2V0U3RhdHMoKTtcblxuICAgICAgICBjb25zdCBzZWN0aW9uID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTJweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpXCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI4cHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gXCIxMnB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG5cbiAgICAgICAgY29uc3QgY29udGVudERpdiA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIGNvbnRlbnREaXYuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBjb250ZW50RGl2LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJzcGFjZS1hcm91bmRcIjtcblxuICAgICAgICBjb25zdCB0b3RhbERpdiA9IGNvbnRlbnREaXYuY3JlYXRlRGl2KCk7XG4gICAgICAgIHRvdGFsRGl2LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIHRvdGFsRGl2LnN0eWxlLmZsZXggPSBcIjFcIjtcbiAgICAgICAgdG90YWxEaXYuY3JlYXRlRGl2KHsgdGV4dDogc3RhdHMudG90YWwudG9TdHJpbmcoKSwgc3R5bGU6IFwiZm9udC1zaXplOiAyNHB4OyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IHZhcigtLXRleHQtbm9ybWFsKTtcIiB9KTtcbiAgICAgICAgdG90YWxEaXYuY3JlYXRlRGl2KHsgdGV4dDogdCgndG90YWwnLCB0aGlzLmxhbmcpLCBzdHlsZTogXCJmb250LXNpemU6IDExcHg7IGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcIiB9KTtcblxuICAgICAgICBjb25zdCB0b2RheURpdiA9IGNvbnRlbnREaXYuY3JlYXRlRGl2KCk7XG4gICAgICAgIHRvZGF5RGl2LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIHRvZGF5RGl2LnN0eWxlLmZsZXggPSBcIjFcIjtcbiAgICAgICAgdG9kYXlEaXYuY3JlYXRlRGl2KHsgdGV4dDogc3RhdHMudG9kYXkudG9TdHJpbmcoKSwgc3R5bGU6IFwiZm9udC1zaXplOiAyNHB4OyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IHZhcigtLXRleHQtbm9ybWFsKTtcIiB9KTtcbiAgICAgICAgdG9kYXlEaXYuY3JlYXRlRGl2KHsgdGV4dDogdCgndG9kYXknLCB0aGlzLmxhbmcpLCBzdHlsZTogXCJmb250LXNpemU6IDExcHg7IGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcIiB9KTtcblxuICAgICAgICBjb25zdCBtb250aERpdiA9IGNvbnRlbnREaXYuY3JlYXRlRGl2KCk7XG4gICAgICAgIG1vbnRoRGl2LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIG1vbnRoRGl2LnN0eWxlLmZsZXggPSBcIjFcIjtcbiAgICAgICAgbW9udGhEaXYuY3JlYXRlRGl2KHsgdGV4dDogc3RhdHMudGhpc01vbnRoLnRvU3RyaW5nKCksIHN0eWxlOiBcImZvbnQtc2l6ZTogMjRweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG9yOiB2YXIoLS10ZXh0LW5vcm1hbCk7XCIgfSk7XG4gICAgICAgIG1vbnRoRGl2LmNyZWF0ZURpdih7IHRleHQ6IHQoJ3RoaXNNb250aCcsIHRoaXMubGFuZyksIHN0eWxlOiBcImZvbnQtc2l6ZTogMTFweDsgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1wiIH0pO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJTdGF0c0NvbXBhY3QoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzdGF0cyA9IHRoaXMuZ2V0U3RhdHMoKTtcblxuICAgICAgICBjb25zdCBzZWN0aW9uID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSlcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSBcIjEwcHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcblxuICAgICAgICBjb25zdCBjb250ZW50RGl2ID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgY29udGVudERpdi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGNvbnRlbnREaXYuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInNwYWNlLWFyb3VuZFwiO1xuICAgICAgICBjb250ZW50RGl2LnN0eWxlLmdhcCA9IFwiOHB4XCI7XG5cbiAgICAgICAgY29uc3QgdG90YWxEaXYgPSBjb250ZW50RGl2LmNyZWF0ZURpdigpO1xuICAgICAgICB0b3RhbERpdi5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICB0b3RhbERpdi5zdHlsZS5mbGV4ID0gXCIxXCI7XG4gICAgICAgIHRvdGFsRGl2LmNyZWF0ZURpdih7IHRleHQ6IHN0YXRzLnRvdGFsLnRvU3RyaW5nKCksIHN0eWxlOiBcImZvbnQtc2l6ZTogMThweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG9yOiB2YXIoLS10ZXh0LW5vcm1hbCk7XCIgfSk7XG4gICAgICAgIHRvdGFsRGl2LmNyZWF0ZURpdih7IHRleHQ6IHQoJ3RvdGFsJywgdGhpcy5sYW5nKSwgc3R5bGU6IFwiZm9udC1zaXplOiAxMHB4OyBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7IG1hcmdpbi10b3A6IDJweDtcIiB9KTtcblxuICAgICAgICBjb25zdCB0b2RheURpdiA9IGNvbnRlbnREaXYuY3JlYXRlRGl2KCk7XG4gICAgICAgIHRvZGF5RGl2LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIHRvZGF5RGl2LnN0eWxlLmZsZXggPSBcIjFcIjtcbiAgICAgICAgdG9kYXlEaXYuY3JlYXRlRGl2KHsgdGV4dDogc3RhdHMudG9kYXkudG9TdHJpbmcoKSwgc3R5bGU6IFwiZm9udC1zaXplOiAxOHB4OyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IHZhcigtLXRleHQtbm9ybWFsKTtcIiB9KTtcbiAgICAgICAgdG9kYXlEaXYuY3JlYXRlRGl2KHsgdGV4dDogdCgndG9kYXknLCB0aGlzLmxhbmcpLCBzdHlsZTogXCJmb250LXNpemU6IDEwcHg7IGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTsgbWFyZ2luLXRvcDogMnB4O1wiIH0pO1xuXG4gICAgICAgIGNvbnN0IG1vbnRoRGl2ID0gY29udGVudERpdi5jcmVhdGVEaXYoKTtcbiAgICAgICAgbW9udGhEaXYuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgbW9udGhEaXYuc3R5bGUuZmxleCA9IFwiMVwiO1xuICAgICAgICBtb250aERpdi5jcmVhdGVEaXYoeyB0ZXh0OiBzdGF0cy50aGlzTW9udGgudG9TdHJpbmcoKSwgc3R5bGU6IFwiZm9udC1zaXplOiAxOHB4OyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IHZhcigtLXRleHQtbm9ybWFsKTtcIiB9KTtcbiAgICAgICAgbW9udGhEaXYuY3JlYXRlRGl2KHsgdGV4dDogdCgndGhpc01vbnRoJywgdGhpcy5sYW5nKSwgc3R5bGU6IFwiZm9udC1zaXplOiAxMHB4OyBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7IG1hcmdpbi10b3A6IDJweDtcIiB9KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0U3RhdHMoKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsID0gdGhpcy5qb3RzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xuICAgICAgICBjb25zdCB0b2RheUNvdW50ID0gdGhpcy5qb3RzLmZpbHRlcihtID0+IG0uZGF0ZSA9PT0gdG9kYXkpLmxlbmd0aDtcbiAgICAgICAgY29uc3QgdGhpc01vbnRoID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTVwiKTtcbiAgICAgICAgY29uc3QgdGhpc01vbnRoQ291bnQgPSB0aGlzLmpvdHMuZmlsdGVyKG0gPT4gbS5kYXRlLnN0YXJ0c1dpdGgodGhpc01vbnRoKSkubGVuZ3RoO1xuICAgICAgICByZXR1cm4geyB0b3RhbCwgdG9kYXk6IHRvZGF5Q291bnQsIHRoaXNNb250aDogdGhpc01vbnRoQ291bnQgfTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyQ2FsZW5kYXIoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzZWN0aW9uID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTJweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpXCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI4cHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gXCIxMnB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0aXRsZSA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJcdUQ4M0RcdURDQzUgXCIgKyB0KCdjYWxlbmRhcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gXCIxM3B4XCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjUwMFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjhweFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250ZW50RGl2ID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhckdyaWQoY29udGVudERpdik7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlckNhbGVuZGFyQ29tcGFjdChjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KVwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGl0bGUgPSBzZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiXHVEODNEXHVEQ0M1IFwiICsgdCgnY2FsZW5kYXInLCB0aGlzLmxhbmcpO1xuICAgICAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9IFwiMTJweFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gXCI2cHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY29udGVudERpdiA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXJHcmlkQ29tcGFjdChjb250ZW50RGl2KTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyQ2FsZW5kYXJHcmlkKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZSh0aGlzLmN1cnJlbnRZZWFyLCB0aGlzLmN1cnJlbnRNb250aCwgMSk7XG4gICAgICAgIGNvbnN0IGxhc3REYXkgPSBuZXcgRGF0ZSh0aGlzLmN1cnJlbnRZZWFyLCB0aGlzLmN1cnJlbnRNb250aCArIDEsIDApO1xuICAgICAgICBjb25zdCBzdGFydFdlZWtkYXkgPSBmaXJzdERheS5nZXREYXkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgaGVhZGVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgaGVhZGVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJzcGFjZS1iZXR3ZWVuXCI7XG4gICAgICAgIGhlYWRlci5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcbiAgICAgICAgaGVhZGVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTBweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJldkJ0biA9IGhlYWRlci5jcmVhdGVEaXYoKTtcbiAgICAgICAgcHJldkJ0bi50ZXh0Q29udGVudCA9IFwiXHUyMTkwXCI7XG4gICAgICAgIHByZXZCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIHByZXZCdG4uc3R5bGUucGFkZGluZyA9IFwiNHB4IDhweFwiO1xuICAgICAgICBwcmV2QnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNHB4XCI7XG4gICAgICAgIHByZXZCdG4uc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4geyBwcmV2QnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3ZlcilcIjsgfSk7XG4gICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4geyBwcmV2QnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjsgfSk7XG4gICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2hhbmdlTW9udGgoLTEpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRpdGxlID0gaGVhZGVyLmNyZWF0ZURpdigpO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGAke3RoaXMuY3VycmVudFllYXJ9JHt0KCd5ZWFyJywgdGhpcy5sYW5nKX0gJHt0aGlzLmN1cnJlbnRNb250aCArIDF9JHt0KCdtb250aCcsIHRoaXMubGFuZyl9YDtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSBcIjEzcHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcImpvdHMtY2FsZW5kYXItdGl0bGVcIik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZXh0QnRuID0gaGVhZGVyLmNyZWF0ZURpdigpO1xuICAgICAgICBuZXh0QnRuLnRleHRDb250ZW50ID0gXCJcdTIxOTJcIjtcbiAgICAgICAgbmV4dEJ0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgbmV4dEJ0bi5zdHlsZS5wYWRkaW5nID0gXCI0cHggOHB4XCI7XG4gICAgICAgIG5leHRCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHhcIjtcbiAgICAgICAgbmV4dEJ0bi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7IG5leHRCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKVwiOyB9KTtcbiAgICAgICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7IG5leHRCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiOyB9KTtcbiAgICAgICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jaGFuZ2VNb250aCgxKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB3ZWVrZGF5cyA9IHRyYW5zbGF0aW9uc1t0aGlzLmxhbmddLndlZWtkYXlzO1xuICAgICAgICBjb25zdCB3ZWVrZGF5Um93ID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICB3ZWVrZGF5Um93LnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgICAgICAgd2Vla2RheVJvdy5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoNywgMWZyKVwiO1xuICAgICAgICB3ZWVrZGF5Um93LnN0eWxlLmdhcCA9IFwiMnB4XCI7XG4gICAgICAgIHdlZWtkYXlSb3cuc3R5bGUubWFyZ2luQm90dG9tID0gXCI0cHhcIjtcbiAgICAgICAgXG4gICAgICAgIHdlZWtkYXlzLmZvckVhY2goZGF5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRheUVsID0gd2Vla2RheVJvdy5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIGRheUVsLnRleHRDb250ZW50ID0gZGF5O1xuICAgICAgICAgICAgZGF5RWwuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIGRheUVsLnN0eWxlLmZvbnRTaXplID0gXCIxMHB4XCI7XG4gICAgICAgICAgICBkYXlFbC5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkYXlzR3JpZCA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgZGF5c0dyaWQuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgICAgICBkYXlzR3JpZC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoNywgMWZyKVwiO1xuICAgICAgICBkYXlzR3JpZC5zdHlsZS5nYXAgPSBcIjJweFwiO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydFdlZWtkYXk7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZW1wdHlEYXkgPSBkYXlzR3JpZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIGVtcHR5RGF5LnN0eWxlLnBhZGRpbmcgPSBcIjRweCAycHhcIjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgZGF5UmVjb3JkcyA9IHRoaXMuZ2V0RGF5UmVjb3JkcygpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgZCA9IDE7IGQgPD0gbGFzdERheS5nZXREYXRlKCk7IGQrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0ZVN0ciA9IGAke3RoaXMuY3VycmVudFllYXJ9LSR7U3RyaW5nKHRoaXMuY3VycmVudE1vbnRoICsgMSkucGFkU3RhcnQoMiwgJzAnKX0tJHtTdHJpbmcoZCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gZGF5UmVjb3Jkcy5nZXQoZGF0ZVN0cik7XG4gICAgICAgICAgICBjb25zdCBoYXNSZWNvcmQgPSByZWNvcmQgJiYgcmVjb3JkLmNvdW50ID4gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGF5RGl2ID0gZGF5c0dyaWQuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICBkYXlEaXYudGV4dENvbnRlbnQgPSBTdHJpbmcoZCk7XG4gICAgICAgICAgICBkYXlEaXYuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIGRheURpdi5zdHlsZS5wYWRkaW5nID0gXCI0cHggMnB4XCI7XG4gICAgICAgICAgICBkYXlEaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHhcIjtcbiAgICAgICAgICAgIGRheURpdi5zdHlsZS5mb250U2l6ZSA9IFwiMTFweFwiO1xuICAgICAgICAgICAgZGF5RGl2LnN0eWxlLmN1cnNvciA9IGhhc1JlY29yZCA/IFwicG9pbnRlclwiIDogXCJkZWZhdWx0XCI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChoYXNSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICBkYXlEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCI7XG4gICAgICAgICAgICAgICAgZGF5RGl2LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIjtcbiAgICAgICAgICAgICAgICBkYXlEaXYudGl0bGUgPSBgJHtkYXRlU3RyfTogJHt0KCdyZWNvcmRzQ291bnQnLCB0aGlzLmxhbmcsIHsgY291bnQ6IFN0cmluZyhyZWNvcmQuY291bnQpIH0pfWA7XG4gICAgICAgICAgICAgICAgZGF5RGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlEYXRlKGRhdGVTdHIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXlEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICBkYXlEaXYuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJDYWxlbmRhckdyaWRDb21wYWN0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZSh0aGlzLmN1cnJlbnRZZWFyLCB0aGlzLmN1cnJlbnRNb250aCwgMSk7XG4gICAgICAgIGNvbnN0IGxhc3REYXkgPSBuZXcgRGF0ZSh0aGlzLmN1cnJlbnRZZWFyLCB0aGlzLmN1cnJlbnRNb250aCArIDEsIDApO1xuICAgICAgICBjb25zdCBzdGFydFdlZWtkYXkgPSBmaXJzdERheS5nZXREYXkoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5hdlJvdyA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgbmF2Um93LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgbmF2Um93LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJzcGFjZS1iZXR3ZWVuXCI7XG4gICAgICAgIG5hdlJvdy5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcbiAgICAgICAgbmF2Um93LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIG5hdlJvdy5zdHlsZS5wYWRkaW5nID0gXCIwIDRweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJldkJ0biA9IG5hdlJvdy5jcmVhdGVEaXYoKTtcbiAgICAgICAgcHJldkJ0bi50ZXh0Q29udGVudCA9IFwiXHUyMTkwXCI7XG4gICAgICAgIHByZXZCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIHByZXZCdG4uc3R5bGUucGFkZGluZyA9IFwiMnB4IDZweFwiO1xuICAgICAgICBwcmV2QnRuLnN0eWxlLmZvbnRTaXplID0gXCIxMXB4XCI7XG4gICAgICAgIHByZXZCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHhcIjtcbiAgICAgICAgcHJldkJ0bi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7IHByZXZCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKVwiOyB9KTtcbiAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7IHByZXZCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiOyB9KTtcbiAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jaGFuZ2VNb250aCgtMSkpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGl0bGUgPSBuYXZSb3cuY3JlYXRlRGl2KCk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gYCR7dGhpcy5jdXJyZW50WWVhcn0vJHt0aGlzLmN1cnJlbnRNb250aCArIDF9YDtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSBcIjExcHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcImpvdHMtY2FsZW5kYXItdGl0bGVcIik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZXh0QnRuID0gbmF2Um93LmNyZWF0ZURpdigpO1xuICAgICAgICBuZXh0QnRuLnRleHRDb250ZW50ID0gXCJcdTIxOTJcIjtcbiAgICAgICAgbmV4dEJ0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgbmV4dEJ0bi5zdHlsZS5wYWRkaW5nID0gXCIycHggNnB4XCI7XG4gICAgICAgIG5leHRCdG4uc3R5bGUuZm9udFNpemUgPSBcIjExcHhcIjtcbiAgICAgICAgbmV4dEJ0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweFwiO1xuICAgICAgICBuZXh0QnRuLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHsgbmV4dEJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItaG92ZXIpXCI7IH0pO1xuICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHsgbmV4dEJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7IH0pO1xuICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNoYW5nZU1vbnRoKDEpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHdlZWtkYXlzU2hvcnQgPSB0cmFuc2xhdGlvbnNbdGhpcy5sYW5nXS53ZWVrZGF5cztcbiAgICAgICAgY29uc3Qgd2Vla2RheVJvdyA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgd2Vla2RheVJvdy5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgICAgIHdlZWtkYXlSb3cuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwicmVwZWF0KDcsIDFmcilcIjtcbiAgICAgICAgd2Vla2RheVJvdy5zdHlsZS5nYXAgPSBcIjFweFwiO1xuICAgICAgICB3ZWVrZGF5Um93LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiNHB4XCI7XG4gICAgICAgIFxuICAgICAgICB3ZWVrZGF5c1Nob3J0LmZvckVhY2goZGF5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRheUVsID0gd2Vla2RheVJvdy5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIGRheUVsLnRleHRDb250ZW50ID0gZGF5O1xuICAgICAgICAgICAgZGF5RWwuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIGRheUVsLnN0eWxlLmZvbnRTaXplID0gXCI4cHhcIjtcbiAgICAgICAgICAgIGRheUVsLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgZGF5RWwuc3R5bGUucGFkZGluZyA9IFwiMnB4IDBcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkYXlzR3JpZCA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgZGF5c0dyaWQuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgICAgICBkYXlzR3JpZC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoNywgMWZyKVwiO1xuICAgICAgICBkYXlzR3JpZC5zdHlsZS5nYXAgPSBcIjFweFwiO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFydFdlZWtkYXk7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZW1wdHlEYXkgPSBkYXlzR3JpZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIGVtcHR5RGF5LnN0eWxlLnBhZGRpbmcgPSBcIjNweCAxcHhcIjtcbiAgICAgICAgICAgIGVtcHR5RGF5LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRheVJlY29yZHMgPSB0aGlzLmdldERheVJlY29yZHMoKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IGxhc3REYXkuZ2V0RGF0ZSgpOyBkKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVTdHIgPSBgJHt0aGlzLmN1cnJlbnRZZWFyfS0ke1N0cmluZyh0aGlzLmN1cnJlbnRNb250aCArIDEpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKGQpLnBhZFN0YXJ0KDIsICcwJyl9YDtcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IGRheVJlY29yZHMuZ2V0KGRhdGVTdHIpO1xuICAgICAgICAgICAgY29uc3QgaGFzUmVjb3JkID0gcmVjb3JkICYmIHJlY29yZC5jb3VudCA+IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGRheURpdiA9IGRheXNHcmlkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgZGF5RGl2LnRleHRDb250ZW50ID0gU3RyaW5nKGQpO1xuICAgICAgICAgICAgZGF5RGl2LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICBkYXlEaXYuc3R5bGUucGFkZGluZyA9IFwiM3B4IDFweFwiO1xuICAgICAgICAgICAgZGF5RGl2LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiM3B4XCI7XG4gICAgICAgICAgICBkYXlEaXYuc3R5bGUuZm9udFNpemUgPSBcIjlweFwiO1xuICAgICAgICAgICAgZGF5RGl2LnN0eWxlLmN1cnNvciA9IGhhc1JlY29yZCA/IFwicG9pbnRlclwiIDogXCJkZWZhdWx0XCI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChoYXNSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICBkYXlEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCI7XG4gICAgICAgICAgICAgICAgZGF5RGl2LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIjtcbiAgICAgICAgICAgICAgICBkYXlEaXYudGl0bGUgPSBgJHtkYXRlU3RyfTogJHt0KCdyZWNvcmRzQ291bnQnLCB0aGlzLmxhbmcsIHsgY291bnQ6IFN0cmluZyhyZWNvcmQuY291bnQpIH0pfWA7XG4gICAgICAgICAgICAgICAgZGF5RGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlEYXRlKGRhdGVTdHIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXlEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICBkYXlEaXYuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREYXlSZWNvcmRzKCk6IE1hcDxzdHJpbmcsIERheVJlY29yZD4ge1xuICAgICAgICBjb25zdCByZWNvcmRzID0gbmV3IE1hcDxzdHJpbmcsIERheVJlY29yZD4oKTtcbiAgICAgICAgZm9yIChjb25zdCBqb3Qgb2YgdGhpcy5qb3RzKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gam90LmRhdGU7XG4gICAgICAgICAgICBpZiAoIXJlY29yZHMuaGFzKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5zZXQoZGF0ZSwgeyBkYXRlLCBjb3VudDogMCwgam90czogW10gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSByZWNvcmRzLmdldChkYXRlKSE7XG4gICAgICAgICAgICByZWNvcmQuY291bnQrKztcbiAgICAgICAgICAgIHJlY29yZC5qb3RzLnB1c2goam90KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjb3JkcztcbiAgICB9XG4gICAgXG4gICAgY2hhbmdlTW9udGgoZGVsdGE6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN1cnJlbnRNb250aCArPSBkZWx0YTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSAxMTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXItLTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRNb250aCA+IDExKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdTkxQ0RcdTY1QjBcdTZFMzJcdTY3RDNcdTY1NzRcdTRFMkFcdTY1RTVcdTUzODZcdTkwRThcdTUyMDZcbiAgICAgICAgY29uc3QgY2FsZW5kYXJDb250YWluZXIgPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtY2FsZW5kYXJcIik7XG4gICAgICAgIGlmIChjYWxlbmRhckNvbnRhaW5lcikge1xuICAgICAgICAgICAgY2FsZW5kYXJDb250YWluZXIuZW1wdHkoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2lkZWJhcikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXJDb21wYWN0KGNhbGVuZGFyQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcihjYWxlbmRhckNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZmlsdGVyQnlEYXRlKGRhdGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gYGRhdGU6JHtkYXRlfWA7XG4gICAgICAgIHRoaXMudXBkYXRlU2VhcmNoQW5kRmlsdGVyKCk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlclNlYXJjaChjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gXCIxMnB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSlcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjhweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSBcIjEycHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRpdGxlID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0KCdzZWFyY2hBbmRUYWdzJywgdGhpcy5sYW5nKTtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSBcIjEzcHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2VhcmNoQ29udGFpbmVyID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgIHRoaXMuc2VhcmNoQ29udGFpbmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzZWFyY2hJbnB1dCA9IHRoaXMuc2VhcmNoQ29udGFpbmVyLmNyZWF0ZUVsKFwiaW5wdXRcIik7XG4gICAgICAgIHNlYXJjaElucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSB0KCdzZWFyY2hQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjZweCA4cHhcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCIzMnB4XCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNHB4XCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjEycHhcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSB0aGlzLnNlYXJjaFF1ZXJ5O1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0ID0gc2VhcmNoSW5wdXQ7XG5cbiAgICAgICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGVib3VuY2VkU2VhcmNoKHF1ZXJ5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDbGVhckJ1dHRvbigpO1xuXG4gICAgICAgIGNvbnN0IHRhZ0ZpbHRlciA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRhZ0ZpbHRlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIHRhZ0ZpbHRlci5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICB0YWdGaWx0ZXIuc3R5bGUuZ2FwID0gXCI2cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFsbFRhZ3MgPSB0aGlzLmdldEFsbFRhZ3MoKTtcbiAgICAgICAgYWxsVGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YWdCdG4gPSB0YWdGaWx0ZXIuY3JlYXRlU3BhbigpO1xuICAgICAgICAgICAgdGFnQnRuLnRleHRDb250ZW50ID0gYCMke3RhZ31gO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLnBhZGRpbmcgPSBcIjJweCA4cHhcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjEycHhcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5mb250U2l6ZSA9IFwiMTFweFwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpID8gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCIgOiBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5jb2xvciA9IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpID8gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIiA6IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFncy5oYXModGFnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFncy5kZWxldGUodGFnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFncy5hZGQodGFnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gXHU2NkY0XHU2NUIwXHU2ODA3XHU3QjdFXHU2MzA5XHU5NEFFXHU2ODM3XHU1RjBGXG4gICAgICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpID8gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCIgOiBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgICAgICAgICB0YWdCdG4uc3R5bGUuY29sb3IgPSB0aGlzLnNlbGVjdGVkVGFncy5oYXModGFnKSA/IFwidmFyKC0tdGV4dC1vbi1hY2NlbnQpXCIgOiBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICAgICAgLy8gXHU2NkY0XHU2NUIwXHU1MjE3XHU4ODY4XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFNlY3Rpb24gPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtbGlzdC1zZWN0aW9uXCIpO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0U2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckpvdExpc3QobGlzdFNlY3Rpb24gYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJTZWFyY2hDb21wYWN0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjhweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpXCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gXCIxMHB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0aXRsZSA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdCgnc2VhcmNoQW5kVGFncycsIHRoaXMubGFuZyk7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gXCIxMnB4XCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjUwMFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjZweFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNlYXJjaENvbnRhaW5lciA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRoaXMuc2VhcmNoQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICB0aGlzLnNlYXJjaENvbnRhaW5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2VhcmNoSW5wdXQgPSB0aGlzLnNlYXJjaENvbnRhaW5lci5jcmVhdGVFbChcImlucHV0XCIpO1xuICAgICAgICBzZWFyY2hJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIHNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gdCgnc2VhcmNoUGxhY2Vob2xkZXJTaG9ydCcsIHRoaXMubGFuZyk7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjVweCA4cHhcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCIyOHB4XCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNHB4XCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5mb250U2l6ZSA9IFwiMTFweFwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjEwcHhcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQudmFsdWUgPSB0aGlzLnNlYXJjaFF1ZXJ5O1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0ID0gc2VhcmNoSW5wdXQ7XG5cbiAgICAgICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGVib3VuY2VkU2VhcmNoKHF1ZXJ5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDbGVhckJ1dHRvbigpO1xuXG4gICAgICAgIGNvbnN0IHRhZ0ZpbHRlciA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRhZ0ZpbHRlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIHRhZ0ZpbHRlci5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICB0YWdGaWx0ZXIuc3R5bGUuZ2FwID0gXCI0cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFsbFRhZ3MgPSB0aGlzLmdldEFsbFRhZ3MoKS5zbGljZSgwLCA4KTtcbiAgICAgICAgYWxsVGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YWdCdG4gPSB0YWdGaWx0ZXIuY3JlYXRlU3BhbigpO1xuICAgICAgICAgICAgdGFnQnRuLnRleHRDb250ZW50ID0gYCMke3RhZ31gO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLnBhZGRpbmcgPSBcIjJweCA2cHhcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjEwcHhcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5mb250U2l6ZSA9IFwiMTBweFwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpID8gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCIgOiBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5jb2xvciA9IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpID8gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIiA6IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgICAgIHRhZ0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFncy5oYXModGFnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFncy5kZWxldGUodGFnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFncy5hZGQodGFnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gXHU2NkY0XHU2NUIwXHU2ODA3XHU3QjdFXHU2MzA5XHU5NEFFXHU2ODM3XHU1RjBGXG4gICAgICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpID8gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCIgOiBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgICAgICAgICB0YWdCdG4uc3R5bGUuY29sb3IgPSB0aGlzLnNlbGVjdGVkVGFncy5oYXModGFnKSA/IFwidmFyKC0tdGV4dC1vbi1hY2NlbnQpXCIgOiBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICAgICAgLy8gXHU2NkY0XHU2NUIwXHU1MjE3XHU4ODY4XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFNlY3Rpb24gPSB0aGlzLmNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtbGlzdC1zZWN0aW9uXCIpO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0U2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckpvdExpc3QobGlzdFNlY3Rpb24gYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhbGxUYWdzQ291bnQgPSB0aGlzLmdldEFsbFRhZ3MoKS5sZW5ndGg7XG4gICAgICAgIGlmIChhbGxUYWdzQ291bnQgPiA4KSB7XG4gICAgICAgICAgICBjb25zdCBtb3JlSGludCA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICBtb3JlSGludC50ZXh0Q29udGVudCA9IHQoJ21vcmVUYWdzJywgdGhpcy5sYW5nLCB7IGNvdW50OiBTdHJpbmcoYWxsVGFnc0NvdW50IC0gOCkgfSk7XG4gICAgICAgICAgICBtb3JlSGludC5zdHlsZS5mb250U2l6ZSA9IFwiOXB4XCI7XG4gICAgICAgICAgICBtb3JlSGludC5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgIG1vcmVIaW50LnN0eWxlLm1hcmdpblRvcCA9IFwiNnB4XCI7XG4gICAgICAgICAgICBtb3JlSGludC5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGdldEFsbFRhZ3MoKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCB0YWdzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGZvciAoY29uc3Qgam90IG9mIHRoaXMuam90cykge1xuICAgICAgICAgICAgam90LnRhZ3MuZm9yRWFjaCh0YWcgPT4gdGFncy5hZGQodGFnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGFncyk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlckpvdExpc3QoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb250YWluZXIuZW1wdHkoKTtcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwiam90cy1saXN0LXNlY3Rpb25cIik7XG5cbiAgICAgICAgLy8gXHU2RTA1XHU3NDA2XHU2MjQwXHU2NzA5XHU2RTMyXHU2N0QzXHU3Njg0XHU3RUM0XHU0RUY2XG4gICAgICAgIHRoaXMucmVuZGVyZWRDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbXAudW5sb2FkKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVubG9hZGluZyBjb21wb25lbnQ6XCIsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXJlZENvbXBvbmVudHMgPSBbXTtcblxuICAgICAgICB0aGlzLmpvdExpc3RDbGVhbnVwcy5mb3JFYWNoKChmbikgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgLyogaWdub3JlICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmpvdExpc3RDbGVhbnVwcyA9IFtdO1xuXG4gICAgICAgIGxldCBmaWx0ZXJlZEpvdHMgPSB0aGlzLmZpbHRlckpvdHMoKTtcblxuICAgICAgICBpZiAoZmlsdGVyZWRKb3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgZW1wdHkgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICBlbXB0eS50ZXh0Q29udGVudCA9IHQoJ25vUmVjb3JkcycsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICBlbXB0eS5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgZW1wdHkuc3R5bGUucGFkZGluZyA9IFwiNDBweFwiO1xuICAgICAgICAgICAgZW1wdHkuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICBlbXB0eS5zdHlsZS5mb250U2l6ZSA9IFwiMTNweFwiO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoS2V5d29yZHMgPVxuICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeS50cmltKCkubGVuZ3RoID4gMCA/IHRoaXMucGFyc2VTZWFyY2hGaWx0ZXJzKHRoaXMuc2VhcmNoUXVlcnkpLmtleXdvcmRzIDogW107XG5cbiAgICAgICAgY29uc3QgZ3JvdXBlZEJ5RGF0ZSA9IG5ldyBNYXA8c3RyaW5nLCBKb3RbXT4oKTtcbiAgICAgICAgZmlsdGVyZWRKb3RzLmZvckVhY2goam90ID0+IHtcbiAgICAgICAgICAgIGlmICghZ3JvdXBlZEJ5RGF0ZS5oYXMoam90LmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBlZEJ5RGF0ZS5zZXQoam90LmRhdGUsIFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyb3VwZWRCeURhdGUuZ2V0KGpvdC5kYXRlKSEucHVzaChqb3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtkYXRlLCBqb3RzXSBvZiBncm91cGVkQnlEYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlR3JvdXAgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICBkYXRlR3JvdXAuc3R5bGUubWFyZ2luQm90dG9tID0gXCIxNnB4XCI7XG5cbiAgICAgICAgICAgIGNvbnN0IGRhdGVIZWFkZXIgPSBkYXRlR3JvdXAuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICBkYXRlSGVhZGVyLnRleHRDb250ZW50ID0gZGF0ZTtcbiAgICAgICAgICAgIGRhdGVIZWFkZXIuc3R5bGUuZm9udFNpemUgPSBcIjExcHhcIjtcbiAgICAgICAgICAgIGRhdGVIZWFkZXIuc3R5bGUuZm9udFdlaWdodCA9IFwiNjAwXCI7XG4gICAgICAgICAgICBkYXRlSGVhZGVyLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgZGF0ZUhlYWRlci5zdHlsZS5wYWRkaW5nID0gXCI0cHggMFwiO1xuICAgICAgICAgICAgZGF0ZUhlYWRlci5zdHlsZS5ib3JkZXJCb3R0b20gPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgIGRhdGVIZWFkZXIuc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcblxuICAgICAgICAgICAgam90cy5mb3JFYWNoKGpvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZCA9IGRhdGVHcm91cC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpXCI7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUucGFkZGluZyA9IFwiMTBweCAxMnB4XCI7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNpdGlvbiA9IFwiYWxsIDAuMnNcIjtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdGluZ0pvdElkID09PSBqb3QuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FyZC5zdHlsZS5ib3JkZXJDb2xvciA9IFwidmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KVwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFSb3cgPSBjYXJkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLmFsaWduSXRlbXMgPSBcImJhc2VsaW5lXCI7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUuZ2FwID0gXCIxMnB4XCI7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5mb250U2l6ZSA9IFwiMTBweFwiO1xuICAgICAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgICAgICAgICBtZXRhUm93LmNyZWF0ZVNwYW4oeyB0ZXh0OiBqb3QudGltZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkU3BhbiA9IG1ldGFSb3cuY3JlYXRlU3BhbigpO1xuICAgICAgICAgICAgICAgICAgICB1cGRTcGFuLnRleHRDb250ZW50ID0gYCR7dChcImpvdFVwZGF0ZWRBdFwiLCB0aGlzLmxhbmcpfTogJHtqb3QudXBkYXRlZEF0fWA7XG4gICAgICAgICAgICAgICAgICAgIHVwZFNwYW4uc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICAgICAgICAgICAgICB1cGRTcGFuLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjYwMFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHRhcmVhQ29udGFpbmVyID0gY2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWFDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHRhcmVhID0gdGV4dGFyZWFDb250YWluZXIuY3JlYXRlRWwoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuY2xhc3NMaXN0LmFkZChcImpvdHMtZWRpdC10ZXh0YXJlYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBqb3QuY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUubWluSGVpZ2h0ID0gXCIxMDBweFwiO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgICAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLnJlc2l6ZSA9IFwidmVydGljYWxcIjtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUuZm9udEZhbWlseSA9IFwidmFyKC0tZm9udC10ZXh0KVwiO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5wbGFjZWhvbGRlciA9IHQoXCJwbGFjZWhvbGRlcldpdGhMaW5rXCIsIHRoaXMubGFuZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2xDbGVhbnVwID0gdGhpcy5zZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlKHRleHRhcmVhLCB0ZXh0YXJlYUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3bENsZWFudXApIHRoaXMuam90TGlzdENsZWFudXBzLnB1c2god2xDbGVhbnVwKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWdTZWN0aW9uID0gY2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgICAgICAgICAgdGFnU2VjdGlvbi5zdHlsZS5tYXJnaW5Ub3AgPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWdJbnB1dENvbnRhaW5lciA9IHRhZ1NlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0lucHV0Q29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdJbnB1dENvbnRhaW5lci5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWdJbnB1dCA9IHRhZ0lucHV0Q29udGFpbmVyLmNyZWF0ZUVsKFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0lucHV0LmNsYXNzTGlzdC5hZGQoXCJqb3RzLXRhZy1pbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXQucGxhY2Vob2xkZXIgPSB0KFwidGFnc0lucHV0UGxhY2Vob2xkZXJcIiwgdGhpcy5sYW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXQuc3R5bGUucGFkZGluZyA9IFwiOHB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0lucHV0LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0lucHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdJbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXQuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0xpc3RDb250YWluZXIgPSB0YWdTZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgICAgICB0YWdMaXN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnTGlzdENvbnRhaW5lci5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdMaXN0Q29udGFpbmVyLnN0eWxlLmdhcCA9IFwiNnB4XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmcmVzaEVkaXRUYWdzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyVGFnUGlsbHModGFnTGlzdENvbnRhaW5lciwgdGhpcy5lZGl0U2Vzc2lvblRhZ3MsICh0YWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRTZXNzaW9uVGFncyA9IHRoaXMuZWRpdFNlc3Npb25UYWdzLmZpbHRlcigoeCkgPT4geCAhPT0gdGFnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRWRpdFRhZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZWZyZXNoRWRpdFRhZ3MoKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXR1cFRhZ0F1dG9jb21wbGV0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMuZ2V0RXhpc3RpbmdUYWdzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdJbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ0lucHV0Q29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnTGlzdENvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdFNlc3Npb25UYWdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgKHRhZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFuZWQgPSB0YWcucmVwbGFjZSgvXiMrLywgXCJcIikudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGVhbmVkICYmICF0aGlzLmVkaXRTZXNzaW9uVGFncy5pbmNsdWRlcyhjbGVhbmVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRTZXNzaW9uVGFncy5wdXNoKGNsZWFuZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoRWRpdFRhZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZUlucHV0ID0gY2FyZC5jcmVhdGVFbChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbnB1dC5jbGFzc0xpc3QuYWRkKFwiam90cy1lZGl0LXNvdXJjZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSW5wdXQudmFsdWUgPSBqb3Quc291cmNlO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbnB1dC5wbGFjZWhvbGRlciA9IHQoXCJzb3VyY2VQbGFjZWhvbGRlclwiLCB0aGlzLmxhbmcpO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSW5wdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSW5wdXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLm1hcmdpblRvcCA9IFwiOHB4XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uUm93ID0gY2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uUm93LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uUm93LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJmbGV4LWVuZFwiO1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Sb3cuc3R5bGUuZ2FwID0gXCI4cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uUm93LnN0eWxlLm1hcmdpblRvcCA9IFwiMTJweFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGJ1dHRvblJvdy5jcmVhdGVFbChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gdChcImNhbmNlbFwiLCB0aGlzLmxhbmcpO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdG4uc3R5bGUucGFkZGluZyA9IFwiNnB4IDE0cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdG4uc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXRFZGl0TW9kZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYXZlQnRuID0gYnV0dG9uUm93LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnRuLnRleHRDb250ZW50ID0gdChcInNhdmVcIiwgdGhpcy5sYW5nKTtcbiAgICAgICAgICAgICAgICAgICAgc2F2ZUJ0bi5zdHlsZS5wYWRkaW5nID0gXCI2cHggMTZweFwiO1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCI7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVCdG4uc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtb24tYWNjZW50KVwiO1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnRuLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnRuLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnRuLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjUwMFwiO1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSB0ZXh0YXJlYS52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHQoXCJjb250ZW50UmVxdWlyZWRcIiwgdGhpcy5sYW5nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFncyA9IG5vcm1hbGl6ZUpvdFRhZ3ModGhpcy5lZGl0U2Vzc2lvblRhZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gc291cmNlSW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldklkID0gdGhpcy5lZGl0aW5nSm90SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2VGFncyA9IFsuLi50aGlzLmVkaXRTZXNzaW9uVGFnc107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdKb3RJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRTZXNzaW9uVGFncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi51cGRhdGVKb3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5qb3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGJvZHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodChcInNhdmVkXCIsIHRoaXMubGFuZykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nSm90SWQgPSBwcmV2SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0U2Vzc2lvblRhZ3MgPSBwcmV2VGFncztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaXN0U2VjdGlvbiA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1saXN0LXNlY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySm90TGlzdChsaXN0U2VjdGlvbiBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRleHRhcmVhLmZvY3VzKCksIDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjaENhcmRUYXBBbmRMb25nUHJlc3MoY2FyZCwgam90KTtcbiAgICAgICAgICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZC5zdHlsZS5ib3JkZXJDb2xvciA9IFwidmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgtMXB4KVwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMClcIjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFSb3cgPSBjYXJkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUuZmxleFdyYXAgPSBcIndyYXBcIjtcbiAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLmFsaWduSXRlbXMgPSBcImJhc2VsaW5lXCI7XG4gICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5nYXAgPSBcIjEycHhcIjtcbiAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiNnB4XCI7XG4gICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5mb250U2l6ZSA9IFwiMTBweFwiO1xuICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICAgICAgbWV0YVJvdy5jcmVhdGVTcGFuKHsgdGV4dDogam90LnRpbWUgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdXBkTGFiZWwgPSBtZXRhUm93LmNyZWF0ZVNwYW4oKTtcbiAgICAgICAgICAgICAgICB1cGRMYWJlbC50ZXh0Q29udGVudCA9IGAke3QoXCJqb3RVcGRhdGVkQXRcIiwgdGhpcy5sYW5nKX06ICR7am90LnVwZGF0ZWRBdH1gO1xuICAgICAgICAgICAgICAgIHVwZExhYmVsLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgICAgICAgICB1cGRMYWJlbC5zdHlsZS5mb250V2VpZ2h0ID0gXCI2MDBcIjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRDb250YWluZXIgPSBjYXJkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIuc3R5bGUuZm9udFNpemUgPSBcIjEycHhcIjtcbiAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyLnN0eWxlLmxpbmVIZWlnaHQgPSBcIjEuNVwiO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIuc3R5bGUubWFyZ2luQm90dG9tID0gXCI2cHhcIjtcbiAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyLnN0eWxlLndoaXRlU3BhY2UgPSBcIm5vcm1hbFwiO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIuc3R5bGUud29yZEJyZWFrID0gXCJicmVhay13b3JkXCI7XG4gICAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1dyYXAgPSBcImJyZWFrLXdvcmRcIjtcbiAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyLmFkZENsYXNzKFwiam90cy1jYXJkLWNvbnRlbnRcIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgQ29tcG9uZW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZENvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gXHU0RkVFXHU1OTBEXHVGRjFBXHU0RjIwXHU1MTY1XHU1QjlFXHU5NjQ1XHU3Njg0XHU2RTkwXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlUGF0aCA9IGpvdC5maWxlUGF0aCB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpcmVSZW5kZXJlZENvbnRlbnQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnYS5pbnRlcm5hbC1saW5rJykuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChocmVmLCBzb3VyY2VQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS50cmlnZ2VyKFwiaG92ZXItbGlua1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLmdldFZpZXdUeXBlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXJQYXJlbnQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWw6IGxpbmssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3RleHQ6IGhyZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlUGF0aDogc291cmNlUGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQoaHJlZiwgc291cmNlUGF0aCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnRlcm5hbC1lbWJlZCcpLmZvckVhY2goZW1iZWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gZW1iZWQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnRyaWdnZXIoXCJob3Zlci1saW5rXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLmdldFZpZXdUeXBlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3ZlclBhcmVudDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEVsOiBlbWJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmt0ZXh0OiBzcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQYXRoOiBzb3VyY2VQYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYmVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChzcmMsIHNvdXJjZVBhdGgsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dC50YXNrLWxpc3QtaXRlbS1jaGVja2JveCcpLmZvckVhY2goY2hlY2tib3ggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaEtleXdvcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodE1hcmtkb3duQ29udGVudChjb250ZW50Q29udGFpbmVyLCBzZWFyY2hLZXl3b3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZvaWQgUHJvbWlzZS5yZXNvbHZlKE1hcmtkb3duUmVuZGVyZXIucmVuZGVyTWFya2Rvd24oXG4gICAgICAgICAgICAgICAgICAgIGpvdC5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VQYXRoLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRcbiAgICAgICAgICAgICAgICApKS50aGVuKHdpcmVSZW5kZXJlZENvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGFnc0RpdiA9IGNhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICAgICAgdGFnc0Rpdi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgICAgICAgICAgdGFnc0Rpdi5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICAgICAgICAgIHRhZ3NEaXYuc3R5bGUuZ2FwID0gXCI0cHhcIjtcbiAgICAgICAgICAgICAgICB0YWdzRGl2LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiNHB4XCI7XG5cbiAgICAgICAgICAgICAgICBqb3QudGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ1NwYW4gPSB0YWdzRGl2LmNyZWF0ZVNwYW4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGFnU3Bhbi50ZXh0Q29udGVudCA9IGAjJHt0YWd9YDtcbiAgICAgICAgICAgICAgICAgICAgdGFnU3Bhbi5zdHlsZS5mb250U2l6ZSA9IFwiOXB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUucGFkZGluZyA9IFwiMnB4IDhweFwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMTJweFwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1mbGV4XCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGFnU3Bhbi5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGFnU3Bhbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckJ5VGFnKHRhZyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGpvdC5zb3VyY2UgJiYgam90LnNvdXJjZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlRGl2ID0gY2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlRGl2LnRleHRDb250ZW50ID0gam90LnNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlRGl2LnN0eWxlLmZvbnRTaXplID0gXCIxMHB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZURpdi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlRGl2LnN0eWxlLmZvbnRTdHlsZSA9IFwiaXRhbGljXCI7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZURpdi5zdHlsZS5tYXJnaW5Ub3AgPSBcIjRweFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChqb3QuYXR0YWNobWVudHMgJiYgam90LmF0dGFjaG1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgam90LmF0dGFjaG1lbnRzLmZvckVhY2goKGF0dGFjaG1lbnQsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0YWNobWVudERpdiA9IGNhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gam90LmF0dGFjaG1lbnRUeXBlcz8uW2lkeF0gPT09IFwiaW1hZ2VcIiA/IFwiXHVEODNEXHVEREJDXHVGRTBGXCIgOiBcIlx1RDgzRFx1RENDRVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudERpdi50ZXh0Q29udGVudCA9IGAke2ljb259ICR7YXR0YWNobWVudH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudERpdi5zdHlsZS5mb250U2l6ZSA9IFwiMTBweFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudERpdi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnREaXYuc3R5bGUubWFyZ2luVG9wID0gaWR4ID09PSAwID8gXCI0cHhcIiA6IFwiMnB4XCI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZpbHRlckpvdHMoKTogSm90W10ge1xuICAgICAgICBsZXQgZmlsdGVyZWQgPSBbLi4udGhpcy5qb3RzXTtcbiAgICAgICAgY29uc3QgeyBkYXRlLCB1cGRhdGVkLCBrZXl3b3JkcyB9ID0gdGhpcy5wYXJzZVNlYXJjaEZpbHRlcnModGhpcy5zZWFyY2hRdWVyeSk7XG5cbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkID0gZmlsdGVyZWQuZmlsdGVyKChqb3QpID0+IGpvdC5kYXRlID09PSBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlZCkge1xuICAgICAgICAgICAgZmlsdGVyZWQgPSBmaWx0ZXJlZC5maWx0ZXIoKGpvdCkgPT4gam90LnVwZGF0ZWRBdC5zdGFydHNXaXRoKHVwZGF0ZWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5d29yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZmlsdGVyZWQgPSBmaWx0ZXJlZC5maWx0ZXIoKGpvdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRMb3dlciA9IGpvdC5jb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXdvcmRzLmV2ZXJ5KChrdykgPT4gY29udGVudExvd2VyLmluY2x1ZGVzKGt3KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFncy5zaXplID4gMCkge1xuICAgICAgICAgICAgZmlsdGVyZWQgPSBmaWx0ZXJlZC5maWx0ZXIoKGpvdCkgPT4gam90LnRhZ3Muc29tZSgodGFnKSA9PiB0aGlzLnNlbGVjdGVkVGFncy5oYXModGFnKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgIH1cbiAgICBcbiAgICBmaWx0ZXJCeVRhZyh0YWc6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFRhZ3MuaGFzKHRhZykpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWdzLmRlbGV0ZSh0YWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhZ3MuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWdzLmFkZCh0YWcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICAgIFxuICAgIGFzeW5jIG9wZW5Kb3Qoam90OiBKb3QpIHtcbiAgICAgICAgY29uc3QgZm9sZGVyID0gbm9ybWFsaXplUGF0aCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zYXZlRm9sZGVyKTtcbiAgICAgICAgbGV0IGZpbGVQYXRoOiBzdHJpbmc7XG5cbiAgICAgICAgaWYgKGpvdC5maWxlUGF0aCkge1xuICAgICAgICAgICAgZmlsZVBhdGggPSBub3JtYWxpemVQYXRoKGpvdC5maWxlUGF0aCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubG9nTW9kZSA9PT0gXCJtdWx0aVwiKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyID0gam90LmRhdGU7XG4gICAgICAgICAgICBsZXQgZmlsZW5hbWUgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tdWx0aUZpbGVGb3JtYXQucmVwbGFjZShcIllZWVlNTUREXCIsIGRhdGVTdHIucmVwbGFjZSgvLS9nLCBcIlwiKSk7XG4gICAgICAgICAgICBpZiAoIWZpbGVuYW1lLmVuZHNXaXRoKFwiLm1kXCIpKSB7XG4gICAgICAgICAgICAgICAgZmlsZW5hbWUgKz0gXCIubWRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbGVQYXRoID0gYCR7Zm9sZGVyfS8ke2ZpbGVuYW1lfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWxlUGF0aCA9IGAke2ZvbGRlcn0vam90cy5tZGA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgaWYgKGZpbGUgJiYgZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0TGVhZjogV29ya3NwYWNlTGVhZiB8IG51bGwgPSBudWxsO1xuICAgICAgICAgICAgY29uc3QgbGVhdmVzID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShcIm1hcmtkb3duXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxlYWYgb2YgbGVhdmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlYWYudmlldyBpbnN0YW5jZW9mIE1hcmtkb3duVmlldykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVGaWxlID0gbGVhZi52aWV3LmZpbGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVGaWxlICYmIGFjdGl2ZUZpbGUucGF0aCA9PT0gZmlsZS5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWFmID0gbGVhZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgbGVhZjogV29ya3NwYWNlTGVhZjtcbiAgICAgICAgICAgIGlmICh0YXJnZXRMZWFmKSB7XG4gICAgICAgICAgICAgICAgbGVhZiA9IHRhcmdldExlYWY7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnJldmVhbExlYWYobGVhZik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhZihcInRhYlwiKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBsZWFmLm9wZW5GaWxlKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobGVhZi52aWV3IGluc3RhbmNlb2YgTWFya2Rvd25WaWV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gbGVhZi52aWV3LmVkaXRvcjtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kTGluZSA9IC0xO1xuXG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGlkeCA8IGxpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lVHJpbSA9IGxpbmVzW2lkeF0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGluZVRyaW0uc3RhcnRzV2l0aChcIiMjIyBcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrU3RhcnQgPSBpZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJSZXN0ID0gbGluZVRyaW0uc3Vic3RyaW5nKDQpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtkYXRlUGFydCwgdGltZVBhcnRdID0gaGVhZGVyUmVzdC5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YUlkID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqID0gaWR4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChqIDwgbGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGwgPSBsaW5lc1tqXS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRNYXRjaCA9IHRsLm1hdGNoKC9eIyMjI1xccytpZDpcXHMqKC4rKSQvaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YUlkID0gaWRNYXRjaFsxXS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXiMjIyNcXHMrdXBkYXRlZEF0OlxccyouKyQvaS50ZXN0KHRsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkSWQgPSBtZXRhSWQgfHwgc3RhYmxlTGVnYWN5Sm90SWQoZmlsZS5wYXRoLCBkYXRlUGFydCB8fCBcIlwiLCB0aW1lUGFydCB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlZElkID09PSBqb3QuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZExpbmUgPSBibG9ja1N0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGsgPSBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGsgPCBsaW5lcy5sZW5ndGggJiYgIWxpbmVzW2tdLnRyaW0oKS5zdGFydHNXaXRoKFwiIyMjIFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IGs7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChmb3VuZExpbmUgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEhlYWRlciA9IFwiIyMjIFwiICsgam90LmRhdGUgKyBcIiBcIiArIGpvdC50aW1lO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsaW5lID0gMDsgbGluZSA8IGxpbmVzLmxlbmd0aDsgbGluZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZXNbbGluZV0udHJpbSgpID09PSB0YXJnZXRIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZExpbmUgPSBsaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kTGluZSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEN1cnNvcih7IGxpbmU6IGZvdW5kTGluZSwgY2g6IDAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiB7IGxpbmU6IGZvdW5kTGluZSwgY2g6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvOiB7IGxpbmU6IGZvdW5kTGluZSArIDEsIGNoOiAwIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsICIvLyBzcmMvdHlwZXMudHNcbmV4cG9ydCB0eXBlIExhbmd1YWdlID0gXCJ6aFwiIHwgXCJlblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEpvdFNldHRpbmdzIHtcbiAgICBzYXZlRm9sZGVyOiBzdHJpbmc7XG4gICAgbG9nTW9kZTogXCJzaW5nbGVcIiB8IFwibXVsdGlcIjtcbiAgICB1c2VGaXhlZFRhZzogYm9vbGVhbjtcbiAgICBmaXhlZFRhZzogc3RyaW5nO1xuICAgIGVuYWJsZVRhZ3NJbkZyb250bWF0dGVyOiBib29sZWFuO1xuICAgIG11bHRpRmlsZUZvcm1hdDogc3RyaW5nO1xuICAgIGF0dGFjaG1lbnRzRm9sZGVyOiBzdHJpbmc7XG4gICAgbGFuZ3VhZ2U6IExhbmd1YWdlO1xuICAgIGF1dG9PcGVuVmlldzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKb3Qge1xuICAgIC8qKiBTdGFibGUgaWQ7IHBlcnNpc3RlZCBmb3IgbmV3IHJlY29yZHMsIGRlcml2ZWQgZm9yIGxlZ2FjeSBlbnRyaWVzIHdpdGhvdXQgbWV0YWRhdGEgKi9cbiAgICBpZDogc3RyaW5nO1xuICAgIC8qKiBDcmVhdGVkIHRpbWVzdGFtcCBZWVlZLU1NLUREIEhIOm1tOnNzIChzYW1lIGFzIGRhdGUgKyB0aW1lKSAqL1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nO1xuICAgIC8qKiBMYXN0IHVwZGF0ZSB0aW1lc3RhbXAgWVlZWS1NTS1ERCBISDptbTpzcyAqL1xuICAgIHVwZGF0ZWRBdDogc3RyaW5nO1xuICAgIGRhdGU6IHN0cmluZztcbiAgICB0aW1lOiBzdHJpbmc7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIHRhZ3M6IHN0cmluZ1tdO1xuICAgIHNvdXJjZTogc3RyaW5nO1xuICAgIGZ1bGxUZXh0OiBzdHJpbmc7XG4gICAgYXR0YWNobWVudHM/OiBzdHJpbmdbXTtcbiAgICBhdHRhY2htZW50VHlwZXM/OiAoXCJpbWFnZVwiIHwgXCJmaWxlXCIpW107XG4gICAgZmlsZVBhdGg/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF5UmVjb3JkIHtcbiAgICBkYXRlOiBzdHJpbmc7XG4gICAgY291bnQ6IG51bWJlcjtcbiAgICBqb3RzOiBKb3RbXTtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEpvdFNldHRpbmdzID0ge1xuICAgIHNhdmVGb2xkZXI6IFwiSm90c1wiLFxuICAgIGxvZ01vZGU6IFwibXVsdGlcIixcbiAgICB1c2VGaXhlZFRhZzogZmFsc2UsXG4gICAgZml4ZWRUYWc6IFwiam90XCIsXG4gICAgZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXI6IHRydWUsXG4gICAgbXVsdGlGaWxlRm9ybWF0OiBcImpvdC1ZWVlZTU1ERFwiLFxuICAgIGF0dGFjaG1lbnRzRm9sZGVyOiBcIkpvdHMvYXR0YWNobWVudHNcIixcbiAgICBsYW5ndWFnZTogXCJ6aFwiLFxuICAgIGF1dG9PcGVuVmlldzogdHJ1ZVxufTtcblxuZXhwb3J0IGNvbnN0IFZJRVdfVFlQRV9KT1RTID0gXCJqb3Qtdmlld1wiOyIsICIvLyBzcmMvc2V0dGluZ3MudHNcbmltcG9ydCB7IEFwcCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCBKb3RQbHVnaW4gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7IHQgfSBmcm9tICcuL2kxOG4nO1xuXG5leHBvcnQgY2xhc3MgSm90U2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICAgIHBsdWdpbjogSm90UGx1Z2luO1xuICAgIHByaXZhdGUgbG9nTW9kZVNldHRpbmc6IFNldHRpbmcgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHVzZUZpeGVkVGFnU2V0dGluZzogU2V0dGluZyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgbXVsdGlGaWxlRm9ybWF0U2V0dGluZzogU2V0dGluZyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgZml4ZWRUYWdTZXR0aW5nOiBTZXR0aW5nIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBlbmFibGVUYWdzSW5Gcm9udG1hdHRlclNldHRpbmc6IFNldHRpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEpvdFBsdWdpbikge1xuICAgICAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIH1cblxuICAgIGRpc3BsYXkoKSB7XG4gICAgICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICAgICAgdGhpcy5sb2dNb2RlU2V0dGluZyA9IG51bGw7XG4gICAgICAgIHRoaXMudXNlRml4ZWRUYWdTZXR0aW5nID0gbnVsbDtcbiAgICAgICAgdGhpcy5tdWx0aUZpbGVGb3JtYXRTZXR0aW5nID0gbnVsbDtcbiAgICAgICAgdGhpcy5maXhlZFRhZ1NldHRpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLmVuYWJsZVRhZ3NJbkZyb250bWF0dGVyU2V0dGluZyA9IG51bGw7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSh0KCdsYW5ndWFnZScsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLnNldERlc2ModCgnbGFuZ3VhZ2VEZXNjJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuYWRkRHJvcGRvd24oZHJvcGRvd24gPT4gZHJvcGRvd25cbiAgICAgICAgICAgICAgICAuYWRkT3B0aW9uKFwiemhcIiwgdCgnbGFuZ3VhZ2VaaCcsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgICAgIC5hZGRPcHRpb24oXCJlblwiLCB0KCdsYW5ndWFnZUVuJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxhbmd1YWdlKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWU6IFwiemhcIiB8IFwiZW5cIikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sYW5ndWFnZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUodCgnYXV0b09wZW5WaWV3JywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuc2V0RGVzYyh0KCdhdXRvT3BlblZpZXdEZXNjJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGVcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b09wZW5WaWV3KVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b09wZW5WaWV3ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKHQoJ3NhdmVGb2xkZXInLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5zZXREZXNjKHQoJ3NhdmVGb2xkZXJEZXNjJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJKb3RzXCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNhdmVGb2xkZXIpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zYXZlRm9sZGVyID0gdmFsdWUudHJpbSgpIHx8IFwiSm90c1wiO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSh0KCdhdHRhY2htZW50c0ZvbGRlcicsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLnNldERlc2ModCgnYXR0YWNobWVudHNGb2xkZXJEZXNjJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJKb3RzL2F0dGFjaG1lbnRzXCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmF0dGFjaG1lbnRzRm9sZGVyKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXR0YWNobWVudHNGb2xkZXIgPSB2YWx1ZS50cmltKCkgfHwgXCJKb3RzL2F0dGFjaG1lbnRzXCI7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLmxvZ01vZGVTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSh0KCdsb2dNb2RlJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuc2V0RGVzYyh0KCdsb2dNb2RlRGVzYycsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXG4gICAgICAgICAgICAgICAgLmFkZE9wdGlvbihcIm11bHRpXCIsIHQoJ2xvZ01vZGVNdWx0aScsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgICAgIC5hZGRPcHRpb24oXCJzaW5nbGVcIiwgdCgnbG9nTW9kZVNpbmdsZScsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb2dNb2RlKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWU6IFwic2luZ2xlXCIgfCBcIm11bHRpXCIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubG9nTW9kZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb25kaXRpb25hbFNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMubXVsdGlGaWxlRm9ybWF0U2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUodCgnZmlsZUZvcm1hdCcsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLnNldERlc2ModCgnZmlsZUZvcm1hdERlc2MnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImpvdC1ZWVlZTU1ERFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tdWx0aUZpbGVGb3JtYXQpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tdWx0aUZpbGVGb3JtYXQgPSB2YWx1ZS50cmltKCkgfHwgXCJqb3QtWVlZWU1NRERcIjtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLm11bHRpRmlsZUZvcm1hdFNldHRpbmcuc2V0dGluZ0VsLnN0eWxlLmRpc3BsYXkgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb2dNb2RlID09PSBcIm11bHRpXCIgPyBcIlwiIDogXCJub25lXCI7XG5cbiAgICAgICAgdGhpcy51c2VGaXhlZFRhZ1NldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKHQoJ3VzZUZpeGVkVGFnJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuc2V0RGVzYyh0KCd1c2VGaXhlZFRhZ0Rlc2MnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VGaXhlZFRhZylcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUZpeGVkVGFnID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbmRpdGlvbmFsU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5maXhlZFRhZ1NldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKHQoJ2ZpeGVkVGFnJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuc2V0RGVzYyh0KCdmaXhlZFRhZ0Rlc2MnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImpvdFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5maXhlZFRhZylcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpeGVkVGFnID0gdmFsdWUudHJpbSgpIHx8IFwiam90XCI7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5maXhlZFRhZ1NldHRpbmcuc2V0dGluZ0VsLnN0eWxlLmRpc3BsYXkgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VGaXhlZFRhZyA/IFwiXCIgOiBcIm5vbmVcIjtcblxuICAgICAgICB0aGlzLmVuYWJsZVRhZ3NJbkZyb250bWF0dGVyU2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUodCgnZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXInLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5zZXREZXNjKHQoJ2VuYWJsZVRhZ3NJbkZyb250bWF0dGVyRGVzYycsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZVRhZ3NJbkZyb250bWF0dGVyKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmVuYWJsZVRhZ3NJbkZyb250bWF0dGVyU2V0dGluZy5zZXR0aW5nRWwuc3R5bGUuZGlzcGxheSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLmxvZ01vZGUgPT09IFwibXVsdGlcIiA/IFwiXCIgOiBcIm5vbmVcIjtcblxuICAgICAgICBjb25zdCBpbmZvRWwgPSBjb250YWluZXJFbC5jcmVhdGVEaXYoKTtcbiAgICAgICAgaW5mb0VsLnN0eWxlLm1hcmdpblRvcCA9IFwiMjBweFwiO1xuICAgICAgICBpbmZvRWwuc3R5bGUucGFkZGluZyA9IFwiMTJweFwiO1xuICAgICAgICBpbmZvRWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnktYWx0KVwiO1xuICAgICAgICBpbmZvRWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI4cHhcIjtcbiAgICAgICAgaW5mb0VsLnN0eWxlLmZvbnRTaXplID0gXCIxMnB4XCI7XG4gICAgICAgIGluZm9FbC5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcblxuICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MubG9nTW9kZSA9PT0gXCJtdWx0aVwiKSB7XG4gICAgICAgICAgICBpbmZvRWwuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxzdHJvbmc+JHt0KCdtdWx0aU1vZGVJbmZvJywgdGhpcy5wbHVnaW4ubGFuZyl9PC9zdHJvbmc+PGJyPlxuICAgICAgICAgICAgICAgIFx1MjAyMiAke3QoJ2ZpbGVGb3JtYXQnLCB0aGlzLnBsdWdpbi5sYW5nKX1cdUZGMUEke3RoaXMucGx1Z2luLnNldHRpbmdzLm11bHRpRmlsZUZvcm1hdH0ubWQ8YnI+XG4gICAgICAgICAgICAgICAgXHUyMDIyICR7dCgnYXR0YWNobWVudHNGb2xkZXInLCB0aGlzLnBsdWdpbi5sYW5nKX1cdUZGMUEke3RoaXMucGx1Z2luLnNldHRpbmdzLmF0dGFjaG1lbnRzRm9sZGVyfTxicj5cbiAgICAgICAgICAgICAgICBcdTIwMjIgJHt0KCdhdHRhY2htZW50c05hbWluZycsIHRoaXMucGx1Z2luLmxhbmcpfTxicj5cbiAgICAgICAgICAgICAgICBcdTIwMjIgJHt0KCdyZWNvcmRGb3JtYXQnLCB0aGlzLnBsdWdpbi5sYW5nKX08YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7IyMjIFlZWVktTU0tREQgSEg6bW06c3M8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyR7dCgnY29udGVudFBsYWNlaG9sZGVyJywgdGhpcy5wbHVnaW4ubGFuZyl9PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOzxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDsjdGFnMSAjdGFnMiAjdGFnMzxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDs8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7XHU2NzY1XHU2RTkwOiB4eHg8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyFbWyR7dCgnYXR0YWNobWVudFBsYWNlaG9sZGVyJywgdGhpcy5wbHVnaW4ubGFuZyl9XV0gXHU2MjE2IFtbJHt0KCdhdHRhY2htZW50UGxhY2Vob2xkZXInLCB0aGlzLnBsdWdpbi5sYW5nKX1dXTxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDs8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7LS0tPGJyPlxuICAgICAgICAgICAgICAgICR7dCgnbmV3UmVjb3JkQXRUb3AnLCB0aGlzLnBsdWdpbi5sYW5nKX08YnI+XG4gICAgICAgICAgICAgICAgJHt0KCdpbWFnZUVtYmVkJywgdGhpcy5wbHVnaW4ubGFuZyl9PGJyPlxuICAgICAgICAgICAgICAgICR7dCgnZmlsZUxpbmsnLCB0aGlzLnBsdWdpbi5sYW5nKX1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmZvRWwuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxzdHJvbmc+JHt0KCdzaW5nbGVNb2RlSW5mbycsIHRoaXMucGx1Z2luLmxhbmcpfTwvc3Ryb25nPjxicj5cbiAgICAgICAgICAgICAgICBcdTIwMjIgJHt0KCdmaWxlRm9ybWF0JywgdGhpcy5wbHVnaW4ubGFuZyl9XHVGRjFBam90cy5tZDxicj5cbiAgICAgICAgICAgICAgICBcdTIwMjIgJHt0KCdhdHRhY2htZW50c0ZvbGRlcicsIHRoaXMucGx1Z2luLmxhbmcpfVx1RkYxQSR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuYXR0YWNobWVudHNGb2xkZXJ9PGJyPlxuICAgICAgICAgICAgICAgIFx1MjAyMiAke3QoJ2F0dGFjaG1lbnRzTmFtaW5nJywgdGhpcy5wbHVnaW4ubGFuZyl9PGJyPlxuICAgICAgICAgICAgICAgIFx1MjAyMiAke3QoJ3JlY29yZEZvcm1hdCcsIHRoaXMucGx1Z2luLmxhbmcpfTxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDsjIyMgWVlZWS1NTS1ERCBISDptbTpzczxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDs8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7JHt0KCdjb250ZW50UGxhY2Vob2xkZXInLCB0aGlzLnBsdWdpbi5sYW5nKX08YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyN0YWcxICN0YWcyICN0YWczPGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOzxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDtcdTY3NjVcdTZFOTA6IHh4eDxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDs8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7IVtbJHt0KCdhdHRhY2htZW50UGxhY2Vob2xkZXInLCB0aGlzLnBsdWdpbi5sYW5nKX1dXSBcdTYyMTYgW1ske3QoJ2F0dGFjaG1lbnRQbGFjZWhvbGRlcicsIHRoaXMucGx1Z2luLmxhbmcpfV1dPGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOzxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDstLS08YnI+XG4gICAgICAgICAgICAgICAgJHt0KCduZXdSZWNvcmRBdFRvcCcsIHRoaXMucGx1Z2luLmxhbmcpfTxicj5cbiAgICAgICAgICAgICAgICAke3QoJ2ltYWdlRW1iZWQnLCB0aGlzLnBsdWdpbi5sYW5nKX08YnI+XG4gICAgICAgICAgICAgICAgJHt0KCdmaWxlTGluaycsIHRoaXMucGx1Z2luLmxhbmcpfVxuICAgICAgICAgICAgYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ29uZGl0aW9uYWxTZXR0aW5ncygpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlGaWxlRm9ybWF0U2V0dGluZykge1xuICAgICAgICAgICAgdGhpcy5tdWx0aUZpbGVGb3JtYXRTZXR0aW5nLnNldHRpbmdFbC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MubG9nTW9kZSA9PT0gXCJtdWx0aVwiID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZml4ZWRUYWdTZXR0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmZpeGVkVGFnU2V0dGluZy5zZXR0aW5nRWwuc3R5bGUuZGlzcGxheSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUZpeGVkVGFnID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJTZXR0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVRhZ3NJbkZyb250bWF0dGVyU2V0dGluZy5zZXR0aW5nRWwuc3R5bGUuZGlzcGxheSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLmxvZ01vZGUgPT09IFwibXVsdGlcIiA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUEsMkNBQUFBLFNBQUE7QUFNQyxLQUFDLFNBQVUsUUFBUSxTQUFTO0FBQ3pCLGFBQU8sWUFBWSxZQUFZLE9BQU9BLFlBQVcsY0FBY0EsUUFBTyxVQUFVLFFBQVEsSUFDeEYsT0FBTyxXQUFXLGNBQWMsT0FBTyxNQUFNLE9BQU8sT0FBTyxJQUMzRCxPQUFPLFNBQVMsUUFBUTtBQUFBLElBQzVCLEdBQUUsU0FBTyxXQUFZO0FBQUU7QUFFbkIsVUFBSTtBQUVKLGVB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QixTQUFLLFdBQVcsT0FBTyxPQUFPLENBQUMsR0FBRyxrQkFBa0IsTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUFBLEVBQzdFO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDakIsVUFBTSxLQUFLLFNBQVMsS0FBSyxRQUFRO0FBQ2pDLFVBQU0sS0FBSyx3QkFBd0I7QUFDbkMsU0FBSyxJQUFJLFVBQVUsZ0JBQWdCLGNBQWMsRUFBRSxRQUFRLFVBQVE7QUFDL0QsVUFBSSxLQUFLLGdCQUFnQjtBQUFTLGFBQUssS0FBSyxRQUFRO0FBQUEsSUFDeEQsQ0FBQztBQUNELFVBQU0sS0FBSyxhQUFhO0FBQ3hCLFNBQUssbUJBQW1CO0FBQUEsRUFDNUI7QUFBQSxFQUVRLHFCQUFxQjtBQUN6QixVQUFNLFdBQVc7QUFBQSxNQUNiLEVBQUUsSUFBSSxpQkFBaUIsS0FBSyxjQUFvQztBQUFBLE1BQ2hFLEVBQUUsSUFBSSxpQkFBaUIsS0FBSyxlQUFxQztBQUFBLElBQ3JFO0FBRUEsVUFBTSxZQUFZLEtBQUssU0FBUyxPQUFPLFdBQU07QUFFN0MsYUFBUyxRQUFRLENBQUMsRUFBRSxJQUFJLElBQUksTUFBTTtBQUM5QixZQUFNLFVBQVUsS0FBSyxJQUFJLFNBQVMsWUFBWSxHQUFHLEtBQUssU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFO0FBQ3pFLFVBQUksU0FBUztBQUNULGdCQUFRLE9BQU8sTUFBTSxTQUFTLEdBQUcsRUFBRSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMO0FBQ0o7IiwKICAibmFtZXMiOiBbIm1vZHVsZSIsICJmb3JtYXQiLCAibG9jYWxlIiwgInQiLCAidG8iLCAiZnJvbSIsICJub3ciLCAic2lnbiIsICJ0b2tlbiIsICJvcmRpbmFsIiwgImkiLCAiZGlmZiIsICJsb2NhbGVEYXRhIiwgImhvdXJzIiwgIm1pbnV0ZXMiLCAidG9rZW5zIiwgIm1lcmlkaWVtIiwgInllYXJzIiwgIm1vbnRocyIsICJ3ZWVrcyIsICJkYXlzIiwgInNlY29uZHMiLCAibWlsbGlzZWNvbmRzIiwgIm9mZnNldCIsICJ0aHJlc2hvbGRzIiwgInQiLCAibW9tZW50IiwgImFjdGl2ZUl0ZW0iLCAibm9kZSIsICJpbXBvcnRfb2JzaWRpYW4iLCAidCIsICJ0ZXh0YXJlYSIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X21vbWVudCIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X21vbWVudCIsICJlIiwgInQiLCAibW9tZW50IiwgIkNhcHR1cmVNb2RhbCIsICJ0ZXh0YXJlYSIsICJtZXRhUm93IiwgImxlYWYiLCAiaW1wb3J0X29ic2lkaWFuIiwgIm1vbWVudCIsICJfYSIsICJfYiJdCn0K
