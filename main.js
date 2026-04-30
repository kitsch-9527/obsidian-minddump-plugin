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
        jotUpdatedAt: "\u66F4\u65B0",
        pasteImageUploadFailed: "\u56FE\u7247\u4E0A\u4F20\u5931\u8D25\uFF1A{error}"
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
        jotUpdatedAt: "Updated",
        pasteImageUploadFailed: "Image upload failed: {error}"
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
function isProbablyImageFile(file) {
  if (file.type.startsWith("image/"))
    return true;
  if (file.type && file.type !== "application/octet-stream")
    return false;
  return /\.(png|jpe?g|gif|webp|bmp|svg|heic|heif|avif)$/i.test(file.name);
}
function getClipboardImageFiles(dataTransfer) {
  var _a, _b;
  if (!dataTransfer)
    return [];
  const fromFiles = Array.from((_a = dataTransfer.files) != null ? _a : []).filter(isProbablyImageFile);
  if (fromFiles.length > 0)
    return fromFiles;
  const out = [];
  for (const item of Array.from((_b = dataTransfer.items) != null ? _b : [])) {
    if (item.kind !== "file")
      continue;
    const t2 = item.type;
    if (!t2.startsWith("image/") && t2 !== "" && t2 !== "application/octet-stream")
      continue;
    const f = item.getAsFile();
    if (f && isProbablyImageFile(f))
      out.push(f);
  }
  return out;
}
async function handleAttachment(app, file, settings, lang, callback, options) {
  var _a;
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
    const isImage = isProbablyImageFile(file);
    callback({ path: filePath, type: isImage ? "image" : "file" });
    new import_obsidian.Notice(t("attachmentSaved", lang, { filename }));
  } catch (error) {
    console.error("\u4FDD\u5B58\u9644\u4EF6\u5931\u8D25:", error);
    const noticeKey = (_a = options == null ? void 0 : options.failureNoticeKey) != null ? _a : "saveFailed";
    new import_obsidian.Notice(t(noticeKey, lang, { error: error.message }));
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
        textarea.addEventListener("paste", async (e) => {
          var _a, _b;
          const imageFiles = getClipboardImageFiles(e.clipboardData);
          if (imageFiles.length === 0)
            return;
          e.preventDefault();
          const plain = (_b = (_a = e.clipboardData) == null ? void 0 : _a.getData("text/plain")) != null ? _b : "";
          for (const file of imageFiles) {
            await this.handleAttachment(
              file,
              attachmentArea,
              (result) => {
                if (result.type === "image") {
                  this.insertMarkdownEmbedAtCursor(textarea, result.path, "image");
                }
              },
              { failureNoticeKey: "pasteImageUploadFailed" }
            );
          }
          if (plain) {
            this.insertTextAtCursor(textarea, plain);
          }
          textarea.focus();
        });
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
      async handleAttachment(file, area, callback, options) {
        await handleAttachment(
          this.app,
          file,
          this.plugin.settings,
          this.lang,
          (result) => {
            if (callback) {
              callback(result);
              return;
            }
            this.selectedAttachments.push(result);
            const count = this.selectedAttachments.length;
            area.textContent = t("selectedFiles", this.lang, { count: String(count) });
            area.style.borderColor = "var(--interactive-accent)";
            area.style.backgroundColor = "var(--background-primary-alt)";
          },
          options
        );
      }
      insertTextAtCursor(textarea, text) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const val = textarea.value;
        textarea.value = val.slice(0, start) + text + val.slice(end);
        const cursor = start + text.length;
        textarea.selectionStart = cursor;
        textarea.selectionEnd = cursor;
      }
      insertMarkdownEmbedAtCursor(textarea, vaultPath, kind) {
        const embed = kind === "image" ? `![[${vaultPath}]]` : `[[${vaultPath}]]`;
        this.insertTextAtCursor(textarea, embed);
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
    textarea.addEventListener("paste", async (e) => {
      var _a, _b;
      const imageFiles = getClipboardImageFiles(e.clipboardData);
      if (imageFiles.length === 0)
        return;
      e.preventDefault();
      const plain = (_b = (_a = e.clipboardData) == null ? void 0 : _a.getData("text/plain")) != null ? _b : "";
      for (const file of imageFiles) {
        await this.handleAttachment(
          file,
          attachmentArea,
          (result) => {
            if (result.type === "image") {
              this.insertMarkdownEmbedAtCursor(textarea, result.path, "image");
            }
          },
          { failureNoticeKey: "pasteImageUploadFailed" }
        );
      }
      if (plain) {
        this.insertTextAtCursor(textarea, plain);
      }
      textarea.focus();
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
  async handleAttachment(file, area, callback, options) {
    await handleAttachment(
      this.app,
      file,
      this.plugin.settings,
      this.lang,
      callback,
      options
    );
  }
  /** Insert arbitrary text at the caret (used after image paste when clipboard also carries plain text). */
  insertTextAtCursor(textarea, text) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;
    textarea.value = val.slice(0, start) + text + val.slice(end);
    const cursor = start + text.length;
    textarea.selectionStart = cursor;
    textarea.selectionEnd = cursor;
  }
  /** Insert `![[path]]` or `[[path]]` at the textarea caret without replacing unrelated text. */
  insertMarkdownEmbedAtCursor(textarea, vaultPath, kind) {
    const embed = kind === "image" ? `![[${vaultPath}]]` : `[[${vaultPath}]]`;
    this.insertTextAtCursor(textarea, embed);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL21vbWVudC9tb21lbnQuanMiLCAic3JjL2kxOG4udHMiLCAic3JjL3V0aWxzLnRzIiwgInNyYy9jYXB0dXJlLW1vZGFsLnRzIiwgInNyYy9tYWluLnRzIiwgInNyYy92aWV3LnRzIiwgInNyYy90eXBlcy50cyIsICJzcmMvc2V0dGluZ3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vISBtb21lbnQuanNcbi8vISB2ZXJzaW9uIDogMi4yOS40XG4vLyEgYXV0aG9ycyA6IFRpbSBXb29kLCBJc2tyZW4gQ2hlcm5ldiwgTW9tZW50LmpzIGNvbnRyaWJ1dG9yc1xuLy8hIGxpY2Vuc2UgOiBNSVRcbi8vISBtb21lbnRqcy5jb21cblxuOyhmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgZ2xvYmFsLm1vbWVudCA9IGZhY3RvcnkoKVxufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgaG9va0NhbGxiYWNrO1xuXG4gICAgZnVuY3Rpb24gaG9va3MoKSB7XG4gICAgICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxuICAgIC8vIHdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgIGZ1bmN0aW9uIHNldEhvb2tDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpbnB1dCBpbnN0YW5jZW9mIEFycmF5IHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICAgICAgLy8gSUU4IHdpbGwgdHJlYXQgdW5kZWZpbmVkIGFuZCBudWxsIGFzIG9iamVjdCBpZiBpdCB3YXNuJ3QgZm9yXG4gICAgICAgIC8vIGlucHV0ICE9IG51bGxcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGlucHV0ICE9IG51bGwgJiZcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzT3duUHJvcChhLCBiKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPYmplY3RFbXB0eShvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggPT09IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaztcbiAgICAgICAgICAgIGZvciAoayBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duUHJvcChvYmosIGspKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PT0gdm9pZCAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyKGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBOdW1iZXJdJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgICAgICB2YXIgcmVzID0gW10sXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgYXJyTGVuID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyckxlbjsgKytpKSB7XG4gICAgICAgICAgICByZXMucHVzaChmbihhcnJbaV0sIGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gYikge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoYiwgaSkpIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gYltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd0b1N0cmluZycpKSB7XG4gICAgICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd2YWx1ZU9mJykpIHtcbiAgICAgICAgICAgIGEudmFsdWVPZiA9IGIudmFsdWVPZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgdHJ1ZSkudXRjKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW1wdHk6IGZhbHNlLFxuICAgICAgICAgICAgdW51c2VkVG9rZW5zOiBbXSxcbiAgICAgICAgICAgIHVudXNlZElucHV0OiBbXSxcbiAgICAgICAgICAgIG92ZXJmbG93OiAtMixcbiAgICAgICAgICAgIGNoYXJzTGVmdE92ZXI6IDAsXG4gICAgICAgICAgICBudWxsSW5wdXQ6IGZhbHNlLFxuICAgICAgICAgICAgaW52YWxpZEVyYTogbnVsbCxcbiAgICAgICAgICAgIGludmFsaWRNb250aDogbnVsbCxcbiAgICAgICAgICAgIGludmFsaWRGb3JtYXQ6IGZhbHNlLFxuICAgICAgICAgICAgdXNlckludmFsaWRhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGlzbzogZmFsc2UsXG4gICAgICAgICAgICBwYXJzZWREYXRlUGFydHM6IFtdLFxuICAgICAgICAgICAgZXJhOiBudWxsLFxuICAgICAgICAgICAgbWVyaWRpZW06IG51bGwsXG4gICAgICAgICAgICByZmMyODIyOiBmYWxzZSxcbiAgICAgICAgICAgIHdlZWtkYXlNaXNtYXRjaDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2luZ0ZsYWdzKG0pIHtcbiAgICAgICAgaWYgKG0uX3BmID09IG51bGwpIHtcbiAgICAgICAgICAgIG0uX3BmID0gZGVmYXVsdFBhcnNpbmdGbGFncygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9wZjtcbiAgICB9XG5cbiAgICB2YXIgc29tZTtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLnNvbWUpIHtcbiAgICAgICAgc29tZSA9IEFycmF5LnByb3RvdHlwZS5zb21lO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNvbWUgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgICAgICAgICB2YXIgdCA9IE9iamVjdCh0aGlzKSxcbiAgICAgICAgICAgICAgICBsZW4gPSB0Lmxlbmd0aCA+Pj4gMCxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSBpbiB0ICYmIGZ1bi5jYWxsKHRoaXMsIHRbaV0sIGksIHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQobSkge1xuICAgICAgICBpZiAobS5faXNWYWxpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZmxhZ3MgPSBnZXRQYXJzaW5nRmxhZ3MobSksXG4gICAgICAgICAgICAgICAgcGFyc2VkUGFydHMgPSBzb21lLmNhbGwoZmxhZ3MucGFyc2VkRGF0ZVBhcnRzLCBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSAhPSBudWxsO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGlzTm93VmFsaWQgPVxuICAgICAgICAgICAgICAgICAgICAhaXNOYU4obS5fZC5nZXRUaW1lKCkpICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLm92ZXJmbG93IDwgMCAmJlxuICAgICAgICAgICAgICAgICAgICAhZmxhZ3MuZW1wdHkgJiZcbiAgICAgICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRFcmEgJiZcbiAgICAgICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRNb250aCAmJlxuICAgICAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZFdlZWtkYXkgJiZcbiAgICAgICAgICAgICAgICAgICAgIWZsYWdzLndlZWtkYXlNaXNtYXRjaCAmJlxuICAgICAgICAgICAgICAgICAgICAhZmxhZ3MubnVsbElucHV0ICYmXG4gICAgICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkRm9ybWF0ICYmXG4gICAgICAgICAgICAgICAgICAgICFmbGFncy51c2VySW52YWxpZGF0ZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgKCFmbGFncy5tZXJpZGllbSB8fCAoZmxhZ3MubWVyaWRpZW0gJiYgcGFyc2VkUGFydHMpKTtcblxuICAgICAgICAgICAgaWYgKG0uX3N0cmljdCkge1xuICAgICAgICAgICAgICAgIGlzTm93VmFsaWQgPVxuICAgICAgICAgICAgICAgICAgICBpc05vd1ZhbGlkICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLmNoYXJzTGVmdE92ZXIgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MudW51c2VkVG9rZW5zLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy5iaWdIb3VyID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChPYmplY3QuaXNGcm96ZW4gPT0gbnVsbCB8fCAhT2JqZWN0LmlzRnJvemVuKG0pKSB7XG4gICAgICAgICAgICAgICAgbS5faXNWYWxpZCA9IGlzTm93VmFsaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc05vd1ZhbGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9pc1ZhbGlkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUludmFsaWQoZmxhZ3MpIHtcbiAgICAgICAgdmFyIG0gPSBjcmVhdGVVVEMoTmFOKTtcbiAgICAgICAgaWYgKGZsYWdzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGV4dGVuZChnZXRQYXJzaW5nRmxhZ3MobSksIGZsYWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS51c2VySW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgLy8gUGx1Z2lucyB0aGF0IGFkZCBwcm9wZXJ0aWVzIHNob3VsZCBhbHNvIGFkZCB0aGUga2V5IGhlcmUgKG51bGwgdmFsdWUpLFxuICAgIC8vIHNvIHdlIGNhbiBwcm9wZXJseSBjbG9uZSBvdXJzZWx2ZXMuXG4gICAgdmFyIG1vbWVudFByb3BlcnRpZXMgPSAoaG9va3MubW9tZW50UHJvcGVydGllcyA9IFtdKSxcbiAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gY29weUNvbmZpZyh0bywgZnJvbSkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIHByb3AsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBtb21lbnRQcm9wZXJ0aWVzTGVuID0gbW9tZW50UHJvcGVydGllcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc0FNb21lbnRPYmplY3QpKSB7XG4gICAgICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faSkpIHtcbiAgICAgICAgICAgIHRvLl9pID0gZnJvbS5faTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2YpKSB7XG4gICAgICAgICAgICB0by5fZiA9IGZyb20uX2Y7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sKSkge1xuICAgICAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fc3RyaWN0KSkge1xuICAgICAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3R6bSkpIHtcbiAgICAgICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc1VUQykpIHtcbiAgICAgICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fb2Zmc2V0KSkge1xuICAgICAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3BmKSkge1xuICAgICAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbG9jYWxlKSkge1xuICAgICAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzTGVuID4gMCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG1vbWVudFByb3BlcnRpZXNMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHByb3AgPSBtb21lbnRQcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgIHZhbCA9IGZyb21bcHJvcF07XG4gICAgICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW3Byb3BdID0gdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0bztcbiAgICB9XG5cbiAgICAvLyBNb21lbnQgcHJvdG90eXBlIG9iamVjdFxuICAgIGZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcbiAgICAgICAgY29weUNvbmZpZyh0aGlzLCBjb25maWcpO1xuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoY29uZmlnLl9kICE9IG51bGwgPyBjb25maWcuX2QuZ2V0VGltZSgpIDogTmFOKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKE5hTik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxuICAgICAgICAvLyBvYmplY3RzLlxuICAgICAgICBpZiAodXBkYXRlSW5Qcm9ncmVzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNNb21lbnQob2JqKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBvYmogaW5zdGFuY2VvZiBNb21lbnQgfHwgKG9iaiAhPSBudWxsICYmIG9iai5faXNBTW9tZW50T2JqZWN0ICE9IG51bGwpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Fybihtc2cpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBjb25zb2xlLndhcm5cbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlcHJlY2F0aW9uIHdhcm5pbmc6ICcgKyBtc2cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlKG1zZywgZm4pIHtcbiAgICAgICAgdmFyIGZpcnN0VGltZSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIGV4dGVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBob29rcy5kZXByZWNhdGlvbkhhbmRsZXIobnVsbCwgbXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBhcmcsXG4gICAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgYXJnTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJnTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzW2ldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJnICs9ICdcXG5bJyArIGkgKyAnXSAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gYXJndW1lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc093blByb3AoYXJndW1lbnRzWzBdLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZyArPSBrZXkgKyAnOiAnICsgYXJndW1lbnRzWzBdW2tleV0gKyAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZy5zbGljZSgwLCAtMik7IC8vIFJlbW92ZSB0cmFpbGluZyBjb21tYSBhbmQgc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgICAgICAgbXNnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXG5Bcmd1bWVudHM6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncykuam9pbignJykgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2tcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGZuKTtcbiAgICB9XG5cbiAgICB2YXIgZGVwcmVjYXRpb25zID0ge307XG5cbiAgICBmdW5jdGlvbiBkZXByZWNhdGVTaW1wbGUobmFtZSwgbXNnKSB7XG4gICAgICAgIGlmIChob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG5hbWUsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZXByZWNhdGlvbnNbbmFtZV0pIHtcbiAgICAgICAgICAgIHdhcm4obXNnKTtcbiAgICAgICAgICAgIGRlcHJlY2F0aW9uc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBob29rcy5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPSBmYWxzZTtcbiAgICBob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKHR5cGVvZiBGdW5jdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgaW5wdXQgaW5zdGFuY2VvZiBGdW5jdGlvbikgfHxcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXQoY29uZmlnKSB7XG4gICAgICAgIHZhciBwcm9wLCBpO1xuICAgICAgICBmb3IgKGkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChjb25maWcsIGkpKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2ldID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzWydfJyArIGldID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgICAgICAvLyBMZW5pZW50IG9yZGluYWwgcGFyc2luZyBhY2NlcHRzIGp1c3QgYSBudW1iZXIgaW4gYWRkaXRpb24gdG9cbiAgICAgICAgLy8gbnVtYmVyICsgKHBvc3NpYmx5KSBzdHVmZiBjb21pbmcgZnJvbSBfZGF5T2ZNb250aE9yZGluYWxQYXJzZS5cbiAgICAgICAgLy8gVE9ETzogUmVtb3ZlIFwib3JkaW5hbFBhcnNlXCIgZmFsbGJhY2sgaW4gbmV4dCBtYWpvciByZWxlYXNlLlxuICAgICAgICB0aGlzLl9kYXlPZk1vbnRoT3JkaW5hbFBhcnNlTGVuaWVudCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAodGhpcy5fZGF5T2ZNb250aE9yZGluYWxQYXJzZS5zb3VyY2UgfHwgdGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSkgK1xuICAgICAgICAgICAgICAgICd8JyArXG4gICAgICAgICAgICAgICAgL1xcZHsxLDJ9Ly5zb3VyY2VcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjaGlsZENvbmZpZykge1xuICAgICAgICB2YXIgcmVzID0gZXh0ZW5kKHt9LCBwYXJlbnRDb25maWcpLFxuICAgICAgICAgICAgcHJvcDtcbiAgICAgICAgZm9yIChwcm9wIGluIGNoaWxkQ29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChjaGlsZENvbmZpZywgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QocGFyZW50Q29uZmlnW3Byb3BdKSAmJiBpc09iamVjdChjaGlsZENvbmZpZ1twcm9wXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzW3Byb3BdID0ge307XG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZChyZXNbcHJvcF0sIHBhcmVudENvbmZpZ1twcm9wXSk7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZChyZXNbcHJvcF0sIGNoaWxkQ29uZmlnW3Byb3BdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkQ29uZmlnW3Byb3BdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzW3Byb3BdID0gY2hpbGRDb25maWdbcHJvcF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlc1twcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChwcm9wIGluIHBhcmVudENvbmZpZykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGhhc093blByb3AocGFyZW50Q29uZmlnLCBwcm9wKSAmJlxuICAgICAgICAgICAgICAgICFoYXNPd25Qcm9wKGNoaWxkQ29uZmlnLCBwcm9wKSAmJlxuICAgICAgICAgICAgICAgIGlzT2JqZWN0KHBhcmVudENvbmZpZ1twcm9wXSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBjaGFuZ2VzIHRvIHByb3BlcnRpZXMgZG9uJ3QgbW9kaWZ5IHBhcmVudCBjb25maWdcbiAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSBleHRlbmQoe30sIHJlc1twcm9wXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBMb2NhbGUoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZXQoY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlzO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKSB7XG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cztcbiAgICB9IGVsc2Uge1xuICAgICAgICBrZXlzID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgcmVzID0gW107XG4gICAgICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc093blByb3Aob2JqLCBpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0Q2FsZW5kYXIgPSB7XG4gICAgICAgIHNhbWVEYXk6ICdbVG9kYXkgYXRdIExUJyxcbiAgICAgICAgbmV4dERheTogJ1tUb21vcnJvdyBhdF0gTFQnLFxuICAgICAgICBuZXh0V2VlazogJ2RkZGQgW2F0XSBMVCcsXG4gICAgICAgIGxhc3REYXk6ICdbWWVzdGVyZGF5IGF0XSBMVCcsXG4gICAgICAgIGxhc3RXZWVrOiAnW0xhc3RdIGRkZGQgW2F0XSBMVCcsXG4gICAgICAgIHNhbWVFbHNlOiAnTCcsXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNhbGVuZGFyKGtleSwgbW9tLCBub3cpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX2NhbGVuZGFyW2tleV0gfHwgdGhpcy5fY2FsZW5kYXJbJ3NhbWVFbHNlJ107XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dCkgPyBvdXRwdXQuY2FsbChtb20sIG5vdykgOiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gemVyb0ZpbGwobnVtYmVyLCB0YXJnZXRMZW5ndGgsIGZvcmNlU2lnbikge1xuICAgICAgICB2YXIgYWJzTnVtYmVyID0gJycgKyBNYXRoLmFicyhudW1iZXIpLFxuICAgICAgICAgICAgemVyb3NUb0ZpbGwgPSB0YXJnZXRMZW5ndGggLSBhYnNOdW1iZXIubGVuZ3RoLFxuICAgICAgICAgICAgc2lnbiA9IG51bWJlciA+PSAwO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKHNpZ24gPyAoZm9yY2VTaWduID8gJysnIDogJycpIDogJy0nKSArXG4gICAgICAgICAgICBNYXRoLnBvdygxMCwgTWF0aC5tYXgoMCwgemVyb3NUb0ZpbGwpKS50b1N0cmluZygpLnN1YnN0cigxKSArXG4gICAgICAgICAgICBhYnNOdW1iZXJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0dGluZ1Rva2VucyA9XG4gICAgICAgICAgICAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oW0hoXW1tKHNzKT98TW98TU0/TT9NP3xEb3xERERvfEREP0Q/RD98ZGRkP2Q/fGRvP3x3W298d10/fFdbb3xXXT98UW8/fE57MSw1fXxZWVlZWVl8WVlZWVl8WVlZWXxZWXx5ezIsNH18eW8/fGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fGtrP3xtbT98c3M/fFN7MSw5fXx4fFh8eno/fFpaP3wuKS9nLFxuICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oTFRTfExUfExMP0w/TD98bHsxLDR9KS9nLFxuICAgICAgICBmb3JtYXRGdW5jdGlvbnMgPSB7fSxcbiAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcblxuICAgIC8vIHRva2VuOiAgICAnTSdcbiAgICAvLyBwYWRkZWQ6ICAgWydNTScsIDJdXG4gICAgLy8gb3JkaW5hbDogICdNbydcbiAgICAvLyBjYWxsYmFjazogZnVuY3Rpb24gKCkgeyB0aGlzLm1vbnRoKCkgKyAxIH1cbiAgICBmdW5jdGlvbiBhZGRGb3JtYXRUb2tlbih0b2tlbiwgcGFkZGVkLCBvcmRpbmFsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZnVuYyA9IGNhbGxiYWNrO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tjYWxsYmFja10oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0gPSBmdW5jO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWRkZWQpIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHplcm9GaWxsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgcGFkZGVkWzFdLCBwYWRkZWRbMl0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkaW5hbCkge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbb3JkaW5hbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm9yZGluYWwoXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgbGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gcmVtb3ZlRm9ybWF0dGluZ1Rva2VucyhhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1vbSkge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9ICcnLFxuICAgICAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gaXNGdW5jdGlvbihhcnJheVtpXSlcbiAgICAgICAgICAgICAgICAgICAgPyBhcnJheVtpXS5jYWxsKG1vbSwgZm9ybWF0KVxuICAgICAgICAgICAgICAgICAgICA6IGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBmb3JtYXQgZGF0ZSB1c2luZyBuYXRpdmUgZGF0ZSBvYmplY3RcbiAgICBmdW5jdGlvbiBmb3JtYXRNb21lbnQobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0ID0gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbS5sb2NhbGVEYXRhKCkpO1xuICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSA9XG4gICAgICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSB8fCBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0obSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBpID0gNTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpID49IDAgJiYgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLFxuICAgICAgICAgICAgICAgIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2Vuc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvbmdEYXRlRm9ybWF0ID0ge1xuICAgICAgICBMVFM6ICdoOm1tOnNzIEEnLFxuICAgICAgICBMVDogJ2g6bW0gQScsXG4gICAgICAgIEw6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICAgTEw6ICdNTU1NIEQsIFlZWVknLFxuICAgICAgICBMTEw6ICdNTU1NIEQsIFlZWVkgaDptbSBBJyxcbiAgICAgICAgTExMTDogJ2RkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEEnLFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb25nRGF0ZUZvcm1hdChrZXkpIHtcbiAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0sXG4gICAgICAgICAgICBmb3JtYXRVcHBlciA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoZm9ybWF0IHx8ICFmb3JtYXRVcHBlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0gPSBmb3JtYXRVcHBlclxuICAgICAgICAgICAgLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh0b2spIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRvayA9PT0gJ01NTU0nIHx8XG4gICAgICAgICAgICAgICAgICAgIHRvayA9PT0gJ01NJyB8fFxuICAgICAgICAgICAgICAgICAgICB0b2sgPT09ICdERCcgfHxcbiAgICAgICAgICAgICAgICAgICAgdG9rID09PSAnZGRkZCdcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvay5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvaztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRJbnZhbGlkRGF0ZSA9ICdJbnZhbGlkIGRhdGUnO1xuXG4gICAgZnVuY3Rpb24gaW52YWxpZERhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZhbGlkRGF0ZTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdE9yZGluYWwgPSAnJWQnLFxuICAgICAgICBkZWZhdWx0RGF5T2ZNb250aE9yZGluYWxQYXJzZSA9IC9cXGR7MSwyfS87XG5cbiAgICBmdW5jdGlvbiBvcmRpbmFsKG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkaW5hbC5yZXBsYWNlKCclZCcsIG51bWJlcik7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRSZWxhdGl2ZVRpbWUgPSB7XG4gICAgICAgIGZ1dHVyZTogJ2luICVzJyxcbiAgICAgICAgcGFzdDogJyVzIGFnbycsXG4gICAgICAgIHM6ICdhIGZldyBzZWNvbmRzJyxcbiAgICAgICAgc3M6ICclZCBzZWNvbmRzJyxcbiAgICAgICAgbTogJ2EgbWludXRlJyxcbiAgICAgICAgbW06ICclZCBtaW51dGVzJyxcbiAgICAgICAgaDogJ2FuIGhvdXInLFxuICAgICAgICBoaDogJyVkIGhvdXJzJyxcbiAgICAgICAgZDogJ2EgZGF5JyxcbiAgICAgICAgZGQ6ICclZCBkYXlzJyxcbiAgICAgICAgdzogJ2Egd2VlaycsXG4gICAgICAgIHd3OiAnJWQgd2Vla3MnLFxuICAgICAgICBNOiAnYSBtb250aCcsXG4gICAgICAgIE1NOiAnJWQgbW9udGhzJyxcbiAgICAgICAgeTogJ2EgeWVhcicsXG4gICAgICAgIHl5OiAnJWQgeWVhcnMnLFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZWxhdGl2ZVRpbWUobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSB7XG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbc3RyaW5nXTtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24ob3V0cHV0KVxuICAgICAgICAgICAgPyBvdXRwdXQobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKVxuICAgICAgICAgICAgOiBvdXRwdXQucmVwbGFjZSgvJWQvaSwgbnVtYmVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXN0RnV0dXJlKGRpZmYsIG91dHB1dCkge1xuICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy5fcmVsYXRpdmVUaW1lW2RpZmYgPiAwID8gJ2Z1dHVyZScgOiAncGFzdCddO1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihmb3JtYXQpID8gZm9ybWF0KG91dHB1dCkgOiBmb3JtYXQucmVwbGFjZSgvJXMvaSwgb3V0cHV0KTtcbiAgICB9XG5cbiAgICB2YXIgYWxpYXNlcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkVW5pdEFsaWFzKHVuaXQsIHNob3J0aGFuZCkge1xuICAgICAgICB2YXIgbG93ZXJDYXNlID0gdW5pdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBhbGlhc2VzW2xvd2VyQ2FzZV0gPSBhbGlhc2VzW2xvd2VyQ2FzZSArICdzJ10gPSBhbGlhc2VzW3Nob3J0aGFuZF0gPSB1bml0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IGFsaWFzZXNbdW5pdHNdIHx8IGFsaWFzZXNbdW5pdHMudG9Mb3dlckNhc2UoKV1cbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFVuaXRzKGlucHV0T2JqZWN0KSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wLFxuICAgICAgICAgICAgcHJvcDtcblxuICAgICAgICBmb3IgKHByb3AgaW4gaW5wdXRPYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGlucHV0T2JqZWN0LCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dFtub3JtYWxpemVkUHJvcF0gPSBpbnB1dE9iamVjdFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0O1xuICAgIH1cblxuICAgIHZhciBwcmlvcml0aWVzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRVbml0UHJpb3JpdHkodW5pdCwgcHJpb3JpdHkpIHtcbiAgICAgICAgcHJpb3JpdGllc1t1bml0XSA9IHByaW9yaXR5O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByaW9yaXRpemVkVW5pdHModW5pdHNPYmopIHtcbiAgICAgICAgdmFyIHVuaXRzID0gW10sXG4gICAgICAgICAgICB1O1xuICAgICAgICBmb3IgKHUgaW4gdW5pdHNPYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKHVuaXRzT2JqLCB1KSkge1xuICAgICAgICAgICAgICAgIHVuaXRzLnB1c2goeyB1bml0OiB1LCBwcmlvcml0eTogcHJpb3JpdGllc1t1XSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1bml0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdW5pdHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNGbG9vcihudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgICAgIC8vIC0wIC0+IDBcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKSB8fCAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSW50KGFyZ3VtZW50Rm9yQ29lcmNpb24pIHtcbiAgICAgICAgdmFyIGNvZXJjZWROdW1iZXIgPSArYXJndW1lbnRGb3JDb2VyY2lvbixcbiAgICAgICAgICAgIHZhbHVlID0gMDtcblxuICAgICAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBhYnNGbG9vcihjb2VyY2VkTnVtYmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0U2V0KHVuaXQsIGtlZXBUaW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2V0JDEodGhpcywgdW5pdCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCBrZWVwVGltZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXQodGhpcywgdW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0KG1vbSwgdW5pdCkge1xuICAgICAgICByZXR1cm4gbW9tLmlzVmFsaWQoKVxuICAgICAgICAgICAgPyBtb20uX2RbJ2dldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0oKVxuICAgICAgICAgICAgOiBOYU47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0JDEobW9tLCB1bml0LCB2YWx1ZSkge1xuICAgICAgICBpZiAobW9tLmlzVmFsaWQoKSAmJiAhaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdW5pdCA9PT0gJ0Z1bGxZZWFyJyAmJlxuICAgICAgICAgICAgICAgIGlzTGVhcFllYXIobW9tLnllYXIoKSkgJiZcbiAgICAgICAgICAgICAgICBtb20ubW9udGgoKSA9PT0gMSAmJlxuICAgICAgICAgICAgICAgIG1vbS5kYXRlKCkgPT09IDI5XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0oXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBtb20ubW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgZGF5c0luTW9udGgodmFsdWUsIG1vbS5tb250aCgpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBzdHJpbmdHZXQodW5pdHMpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbdW5pdHNdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RyaW5nU2V0KHVuaXRzLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHVuaXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVPYmplY3RVbml0cyh1bml0cyk7XG4gICAgICAgICAgICB2YXIgcHJpb3JpdGl6ZWQgPSBnZXRQcmlvcml0aXplZFVuaXRzKHVuaXRzKSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIHByaW9yaXRpemVkTGVuID0gcHJpb3JpdGl6ZWQubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHByaW9yaXRpemVkTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzW3ByaW9yaXRpemVkW2ldLnVuaXRdKHVuaXRzW3ByaW9yaXRpemVkW2ldLnVuaXRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpc1t1bml0c10pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgbWF0Y2gxID0gL1xcZC8sIC8vICAgICAgIDAgLSA5XG4gICAgICAgIG1hdGNoMiA9IC9cXGRcXGQvLCAvLyAgICAgIDAwIC0gOTlcbiAgICAgICAgbWF0Y2gzID0gL1xcZHszfS8sIC8vICAgICAwMDAgLSA5OTlcbiAgICAgICAgbWF0Y2g0ID0gL1xcZHs0fS8sIC8vICAgIDAwMDAgLSA5OTk5XG4gICAgICAgIG1hdGNoNiA9IC9bKy1dP1xcZHs2fS8sIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2gxdG8yID0gL1xcZFxcZD8vLCAvLyAgICAgICAwIC0gOTlcbiAgICAgICAgbWF0Y2gzdG80ID0gL1xcZFxcZFxcZFxcZD8vLCAvLyAgICAgOTk5IC0gOTk5OVxuICAgICAgICBtYXRjaDV0bzYgPSAvXFxkXFxkXFxkXFxkXFxkXFxkPy8sIC8vICAgOTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2gxdG8zID0gL1xcZHsxLDN9LywgLy8gICAgICAgMCAtIDk5OVxuICAgICAgICBtYXRjaDF0bzQgPSAvXFxkezEsNH0vLCAvLyAgICAgICAwIC0gOTk5OVxuICAgICAgICBtYXRjaDF0bzYgPSAvWystXT9cXGR7MSw2fS8sIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICAgICAgbWF0Y2hVbnNpZ25lZCA9IC9cXGQrLywgLy8gICAgICAgMCAtIGluZlxuICAgICAgICBtYXRjaFNpZ25lZCA9IC9bKy1dP1xcZCsvLCAvLyAgICAtaW5mIC0gaW5mXG4gICAgICAgIG1hdGNoT2Zmc2V0ID0gL1p8WystXVxcZFxcZDo/XFxkXFxkL2dpLCAvLyArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcbiAgICAgICAgbWF0Y2hTaG9ydE9mZnNldCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2dpLCAvLyArMDAgLTAwICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuICAgICAgICBtYXRjaFRpbWVzdGFtcCA9IC9bKy1dP1xcZCsoXFwuXFxkezEsM30pPy8sIC8vIDEyMzQ1Njc4OSAxMjM0NTY3ODkuMTIzXG4gICAgICAgIC8vIGFueSB3b3JkIChvciB0d28pIGNoYXJhY3RlcnMgb3IgbnVtYmVycyBpbmNsdWRpbmcgdHdvL3RocmVlIHdvcmQgbW9udGggaW4gYXJhYmljLlxuICAgICAgICAvLyBpbmNsdWRlcyBzY290dGlzaCBnYWVsaWMgdHdvIHdvcmQgYW5kIGh5cGhlbmF0ZWQgbW9udGhzXG4gICAgICAgIG1hdGNoV29yZCA9XG4gICAgICAgICAgICAvWzAtOV17MCwyNTZ9WydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGMDdcXHVGRjEwLVxcdUZGRUZdezEsMjU2fXxbXFx1MDYwMC1cXHUwNkZGXFwvXXsxLDI1Nn0oXFxzKj9bXFx1MDYwMC1cXHUwNkZGXXsxLDI1Nn0pezEsMn0vaSxcbiAgICAgICAgcmVnZXhlcztcblxuICAgIHJlZ2V4ZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGFkZFJlZ2V4VG9rZW4odG9rZW4sIHJlZ2V4LCBzdHJpY3RSZWdleCkge1xuICAgICAgICByZWdleGVzW3Rva2VuXSA9IGlzRnVuY3Rpb24ocmVnZXgpXG4gICAgICAgICAgICA/IHJlZ2V4XG4gICAgICAgICAgICA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzU3RyaWN0ICYmIHN0cmljdFJlZ2V4ID8gc3RyaWN0UmVnZXggOiByZWdleDtcbiAgICAgICAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykge1xuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gQ29kZSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MTQ5My9pcy10aGVyZS1hLXJlZ2V4cC1lc2NhcGUtZnVuY3Rpb24taW4tamF2YXNjcmlwdFxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4RXNjYXBlKFxuICAgICAgICAgICAgc1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKCdcXFxcJywgJycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAxIHx8IHAyIHx8IHAzIHx8IHA0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2V4RXNjYXBlKHMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG4gICAgfVxuXG4gICAgdmFyIHRva2VucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkUGFyc2VUb2tlbih0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBmdW5jID0gY2FsbGJhY2ssXG4gICAgICAgICAgICB0b2tlbkxlbjtcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNOdW1iZXIoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2NhbGxiYWNrXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5MZW4gPSB0b2tlbi5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbkxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5baV1dID0gZnVuYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFdlZWtQYXJzZVRva2VuKHRva2VuLCBjYWxsYmFjaykge1xuICAgICAgICBhZGRQYXJzZVRva2VuKHRva2VuLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XG4gICAgICAgICAgICBjYWxsYmFjayhpbnB1dCwgY29uZmlnLl93LCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIGlucHV0LCBjb25maWcpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwgJiYgaGFzT3duUHJvcCh0b2tlbnMsIHRva2VuKSkge1xuICAgICAgICAgICAgdG9rZW5zW3Rva2VuXShpbnB1dCwgY29uZmlnLl9hLCBjb25maWcsIHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBZRUFSID0gMCxcbiAgICAgICAgTU9OVEggPSAxLFxuICAgICAgICBEQVRFID0gMixcbiAgICAgICAgSE9VUiA9IDMsXG4gICAgICAgIE1JTlVURSA9IDQsXG4gICAgICAgIFNFQ09ORCA9IDUsXG4gICAgICAgIE1JTExJU0VDT05EID0gNixcbiAgICAgICAgV0VFSyA9IDcsXG4gICAgICAgIFdFRUtEQVkgPSA4O1xuXG4gICAgZnVuY3Rpb24gbW9kKG4sIHgpIHtcbiAgICAgICAgcmV0dXJuICgobiAlIHgpICsgeCkgJSB4O1xuICAgIH1cblxuICAgIHZhciBpbmRleE9mO1xuXG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgICAgIGluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleE9mID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgIC8vIEkga25vd1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgICAgICBpZiAoaXNOYU4oeWVhcikgfHwgaXNOYU4obW9udGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtb2RNb250aCA9IG1vZChtb250aCwgMTIpO1xuICAgICAgICB5ZWFyICs9IChtb250aCAtIG1vZE1vbnRoKSAvIDEyO1xuICAgICAgICByZXR1cm4gbW9kTW9udGggPT09IDFcbiAgICAgICAgICAgID8gaXNMZWFwWWVhcih5ZWFyKVxuICAgICAgICAgICAgICAgID8gMjlcbiAgICAgICAgICAgICAgICA6IDI4XG4gICAgICAgICAgICA6IDMxIC0gKChtb2RNb250aCAlIDcpICUgMik7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21vbnRoJywgJ00nKTtcblxuICAgIC8vIFBSSU9SSVRZXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ21vbnRoJywgOCk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdNJywgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1JlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNJywgJ01NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHZhciBtb250aCA9IGNvbmZpZy5fbG9jYWxlLm1vbnRoc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cbiAgICAgICAgaWYgKG1vbnRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5W01PTlRIXSA9IG1vbnRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzID1cbiAgICAgICAgICAgICdKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyJy5zcGxpdChcbiAgICAgICAgICAgICAgICAnXydcbiAgICAgICAgICAgICksXG4gICAgICAgIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9XG4gICAgICAgICAgICAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KCdfJyksXG4gICAgICAgIE1PTlRIU19JTl9GT1JNQVQgPSAvRFtvRF0/KFxcW1teXFxbXFxdXSpcXF18XFxzKStNTU1NPy8sXG4gICAgICAgIGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkLFxuICAgICAgICBkZWZhdWx0TW9udGhzUmVnZXggPSBtYXRjaFdvcmQ7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHMobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzKVxuICAgICAgICAgICAgICAgID8gdGhpcy5fbW9udGhzXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9tb250aHNbJ3N0YW5kYWxvbmUnXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpXG4gICAgICAgICAgICA/IHRoaXMuX21vbnRoc1ttLm1vbnRoKCldXG4gICAgICAgICAgICA6IHRoaXMuX21vbnRoc1tcbiAgICAgICAgICAgICAgICAgICh0aGlzLl9tb250aHMuaXNGb3JtYXQgfHwgTU9OVEhTX0lOX0ZPUk1BVCkudGVzdChmb3JtYXQpXG4gICAgICAgICAgICAgICAgICAgICAgPyAnZm9ybWF0J1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3N0YW5kYWxvbmUnXG4gICAgICAgICAgICAgIF1bbS5tb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydChtLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKCFtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHNTaG9ydClcbiAgICAgICAgICAgICAgICA/IHRoaXMuX21vbnRoc1Nob3J0XG4gICAgICAgICAgICAgICAgOiB0aGlzLl9tb250aHNTaG9ydFsnc3RhbmRhbG9uZSddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KVxuICAgICAgICAgICAgPyB0aGlzLl9tb250aHNTaG9ydFttLm1vbnRoKCldXG4gICAgICAgICAgICA6IHRoaXMuX21vbnRoc1Nob3J0W1xuICAgICAgICAgICAgICAgICAgTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ1xuICAgICAgICAgICAgICBdW20ubW9udGgoKV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RyaWN0UGFyc2UobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGlpLFxuICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgbGxjID0gbW9udGhOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHVzZWRcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XG4gICAgICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IHRoaXMubW9udGhzU2hvcnQoXG4gICAgICAgICAgICAgICAgICAgIG1vbSxcbiAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzUGFyc2UobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZVN0cmljdFBhcnNlLmNhbGwodGhpcywgbW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBhZGQgc29ydGluZ1xuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyXG4gICAgICAgIC8vIHNlZSBzb3J0aW5nIGluIGNvbXB1dGVNb250aHNQYXJzZVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJyxcbiAgICAgICAgICAgICAgICAgICAgJ2knXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgICAgICAgICAgJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykgKyAnfF4nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnTU1NTScgJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnTU1NJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIHNldE1vbnRoKG1vbSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGRheU9mTW9udGg7XG5cbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAvLyBObyBvcFxuICAgICAgICAgICAgcmV0dXJuIG1vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xuICAgICAgICAgICAgICAgIGlmICghaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF5T2ZNb250aCA9IE1hdGgubWluKG1vbS5kYXRlKCksIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIHZhbHVlKSk7XG4gICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyAnTW9udGgnXSh2YWx1ZSwgZGF5T2ZNb250aCk7XG4gICAgICAgIHJldHVybiBtb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TW9udGgodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNldE1vbnRoKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGdldCh0aGlzLCAnTW9udGgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERheXNJbk1vbnRoKCkge1xuICAgICAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9udGhzU2hvcnRSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzU2hvcnRSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3RcbiAgICAgICAgICAgICAgICA/IHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXhcbiAgICAgICAgICAgICAgICA6IHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aHNSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzUmVnZXggPSBkZWZhdWx0TW9udGhzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3RcbiAgICAgICAgICAgICAgICA/IHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4XG4gICAgICAgICAgICAgICAgOiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVNb250aHNQYXJzZSgpIHtcbiAgICAgICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNob3J0UGllY2VzID0gW10sXG4gICAgICAgICAgICBsb25nUGllY2VzID0gW10sXG4gICAgICAgICAgICBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIG1vbTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XG4gICAgICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICAgICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW9udGhzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLFxuICAgICAgICAgICAgJ2knXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdZJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgeSA9IHRoaXMueWVhcigpO1xuICAgICAgICByZXR1cm4geSA8PSA5OTk5ID8gemVyb0ZpbGwoeSwgNCkgOiAnKycgKyB5O1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWScsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnllYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWScsIDRdLCAwLCAneWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVknLCA1XSwgMCwgJ3llYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZWScsIDYsIHRydWVdLCAwLCAneWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd5ZWFyJywgJ3knKTtcblxuICAgIC8vIFBSSU9SSVRJRVNcblxuICAgIGFkZFVuaXRQcmlvcml0eSgneWVhcicsIDEpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignWScsIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZJywgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZWScsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydZWVlZWScsICdZWVlZWVknXSwgWUVBUik7XG4gICAgYWRkUGFyc2VUb2tlbignWVlZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPVxuICAgICAgICAgICAgaW5wdXQubGVuZ3RoID09PSAyID8gaG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpIDogdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IHBhcnNlSW50KGlucHV0LCAxMCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XG4gICAgfVxuXG4gICAgLy8gSE9PS1NcblxuICAgIGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0b0ludChpbnB1dCkgKyAodG9JbnQoaW5wdXQpID4gNjggPyAxOTAwIDogMjAwMCk7XG4gICAgfTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRZZWFyID0gbWFrZUdldFNldCgnRnVsbFllYXInLCB0cnVlKTtcblxuICAgIGZ1bmN0aW9uIGdldElzTGVhcFllYXIoKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVEYXRlKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XG4gICAgICAgIC8vIGNhbid0IGp1c3QgYXBwbHkoKSB0byBjcmVhdGUgYSBkYXRlOlxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMTgxMzQ4XG4gICAgICAgIHZhciBkYXRlO1xuICAgICAgICAvLyB0aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZSBsZWFwIHllYXJzIHVzaW5nIGEgZnVsbCA0MDAgeWVhciBjeWNsZSwgdGhlbiByZXNldFxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHkgKyA0MDAsIG0sIGQsIGgsIE0sIHMsIG1zKTtcbiAgICAgICAgICAgIGlmIChpc0Zpbml0ZShkYXRlLmdldEZ1bGxZZWFyKCkpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcih5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLCBkLCBoLCBNLCBzLCBtcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVVVENEYXRlKHkpIHtcbiAgICAgICAgdmFyIGRhdGUsIGFyZ3M7XG4gICAgICAgIC8vIHRoZSBEYXRlLlVUQyBmdW5jdGlvbiByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIC8vIHByZXNlcnZlIGxlYXAgeWVhcnMgdXNpbmcgYSBmdWxsIDQwMCB5ZWFyIGN5Y2xlLCB0aGVuIHJlc2V0XG4gICAgICAgICAgICBhcmdzWzBdID0geSArIDQwMDtcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmdzKSk7XG4gICAgICAgICAgICBpZiAoaXNGaW5pdGUoZGF0ZS5nZXRVVENGdWxsWWVhcigpKSkge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICAvLyBzdGFydC1vZi1maXJzdC13ZWVrIC0gc3RhcnQtb2YteWVhclxuICAgIGZ1bmN0aW9uIGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgLy8gZmlyc3Qtd2VlayBkYXkgLS0gd2hpY2ggamFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgKDQgZm9yIGlzbywgMSBmb3Igb3RoZXIpXG4gICAgICAgICAgICBmd2QgPSA3ICsgZG93IC0gZG95LFxuICAgICAgICAgICAgLy8gZmlyc3Qtd2VlayBkYXkgbG9jYWwgd2Vla2RheSAtLSB3aGljaCBsb2NhbCB3ZWVrZGF5IGlzIGZ3ZFxuICAgICAgICAgICAgZndkbHcgPSAoNyArIGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdykgJSA3O1xuXG4gICAgICAgIHJldHVybiAtZndkbHcgKyBmd2QgLSAxO1xuICAgIH1cblxuICAgIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGUjQ2FsY3VsYXRpbmdfYV9kYXRlX2dpdmVuX3RoZV95ZWFyLjJDX3dlZWtfbnVtYmVyX2FuZF93ZWVrZGF5XG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtzKHllYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XG4gICAgICAgIHZhciBsb2NhbFdlZWtkYXkgPSAoNyArIHdlZWtkYXkgLSBkb3cpICUgNyxcbiAgICAgICAgICAgIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxuICAgICAgICAgICAgZGF5T2ZZZWFyID0gMSArIDcgKiAod2VlayAtIDEpICsgbG9jYWxXZWVrZGF5ICsgd2Vla09mZnNldCxcbiAgICAgICAgICAgIHJlc1llYXIsXG4gICAgICAgICAgICByZXNEYXlPZlllYXI7XG5cbiAgICAgICAgaWYgKGRheU9mWWVhciA8PSAwKSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhciAtIDE7XG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhcjtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyLFxuICAgICAgICAgICAgZGF5T2ZZZWFyOiByZXNEYXlPZlllYXIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Vla09mWWVhcihtb20sIGRvdywgZG95KSB7XG4gICAgICAgIHZhciB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KG1vbS55ZWFyKCksIGRvdywgZG95KSxcbiAgICAgICAgICAgIHdlZWsgPSBNYXRoLmZsb29yKChtb20uZGF5T2ZZZWFyKCkgLSB3ZWVrT2Zmc2V0IC0gMSkgLyA3KSArIDEsXG4gICAgICAgICAgICByZXNXZWVrLFxuICAgICAgICAgICAgcmVzWWVhcjtcblxuICAgICAgICBpZiAod2VlayA8IDEpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpIC0gMTtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrICsgd2Vla3NJblllYXIocmVzWWVhciwgZG93LCBkb3kpO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWsgPiB3ZWVrc0luWWVhcihtb20ueWVhcigpLCBkb3csIGRveSkpIHtcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrIC0gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpO1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCk7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3ZWVrOiByZXNXZWVrLFxuICAgICAgICAgICAgeWVhcjogcmVzWWVhcixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xuICAgICAgICByZXR1cm4gKGRheXNJblllYXIoeWVhcikgLSB3ZWVrT2Zmc2V0ICsgd2Vla09mZnNldE5leHQpIC8gNztcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcbiAgICBhZGRGb3JtYXRUb2tlbignVycsIFsnV1cnLCAyXSwgJ1dvJywgJ2lzb1dlZWsnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnd2VlaycsICd3Jyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrJywgJ1cnKTtcblxuICAgIC8vIFBSSU9SSVRJRVNcblxuICAgIGFkZFVuaXRQcmlvcml0eSgnd2VlaycsIDUpO1xuICAgIGFkZFVuaXRQcmlvcml0eSgnaXNvV2VlaycsIDUpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigndycsIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignd3cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignVycsIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignV1cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihcbiAgICAgICAgWyd3JywgJ3d3JywgJ1cnLCAnV1cnXSxcbiAgICAgICAgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAxKV0gPSB0b0ludChpbnB1dCk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gTE9DQUxFU1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vlayhtb20pIHtcbiAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIobW9tLCB0aGlzLl93ZWVrLmRvdywgdGhpcy5fd2Vlay5kb3kpLndlZWs7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrID0ge1xuICAgICAgICBkb3c6IDAsIC8vIFN1bmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgICAgICBkb3k6IDYsIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDZ0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZldlZWsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mWWVhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWsoaW5wdXQpIHtcbiAgICAgICAgdmFyIHdlZWsgPSB0aGlzLmxvY2FsZURhdGEoKS53ZWVrKHRoaXMpO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2VlayhpbnB1dCkge1xuICAgICAgICB2YXIgd2VlayA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkud2VlaztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkJywgMCwgJ2RvJywgJ2RheScpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZScsIDAsIDAsICd3ZWVrZGF5Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ0UnLCAwLCAwLCAnaXNvV2Vla2RheScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xuICAgIGFkZFVuaXRBbGlhcygnd2Vla2RheScsICdlJyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrZGF5JywgJ0UnKTtcblxuICAgIC8vIFBSSU9SSVRZXG4gICAgYWRkVW5pdFByaW9yaXR5KCdkYXknLCAxMSk7XG4gICAgYWRkVW5pdFByaW9yaXR5KCd3ZWVrZGF5JywgMTEpO1xuICAgIGFkZFVuaXRQcmlvcml0eSgnaXNvV2Vla2RheScsIDExKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2QnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0UnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c01pblJlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcbiAgICBhZGRSZWdleFRva2VuKCdkZGQnLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzU2hvcnRSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG4gICAgYWRkUmVnZXhUb2tlbignZGRkZCcsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBnZXQgYSB3ZWVrZGF5IG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZFxuICAgICAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XG4gICAgICAgICAgICB3ZWVrLmQgPSB3ZWVrZGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkJywgJ2UnLCAnRSddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBwYXJzZVdlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc05hTihpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KSAlIDcgfHwgNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNOYU4oaW5wdXQpID8gbnVsbCA6IGlucHV0O1xuICAgIH1cblxuICAgIC8vIExPQ0FMRVNcbiAgICBmdW5jdGlvbiBzaGlmdFdlZWtkYXlzKHdzLCBuKSB7XG4gICAgICAgIHJldHVybiB3cy5zbGljZShuLCA3KS5jb25jYXQod3Muc2xpY2UoMCwgbikpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXMgPVxuICAgICAgICAgICAgJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpLFxuICAgICAgICBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCA9ICdTdW5fTW9uX1R1ZV9XZWRfVGh1X0ZyaV9TYXQnLnNwbGl0KCdfJyksXG4gICAgICAgIGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbiA9ICdTdV9Nb19UdV9XZV9UaF9Gcl9TYScuc3BsaXQoJ18nKSxcbiAgICAgICAgZGVmYXVsdFdlZWtkYXlzUmVnZXggPSBtYXRjaFdvcmQsXG4gICAgICAgIGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXggPSBtYXRjaFdvcmQsXG4gICAgICAgIGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4ID0gbWF0Y2hXb3JkO1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXMobSwgZm9ybWF0KSB7XG4gICAgICAgIHZhciB3ZWVrZGF5cyA9IGlzQXJyYXkodGhpcy5fd2Vla2RheXMpXG4gICAgICAgICAgICA/IHRoaXMuX3dlZWtkYXlzXG4gICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzW1xuICAgICAgICAgICAgICAgICAgbSAmJiBtICE9PSB0cnVlICYmIHRoaXMuX3dlZWtkYXlzLmlzRm9ybWF0LnRlc3QoZm9ybWF0KVxuICAgICAgICAgICAgICAgICAgICAgID8gJ2Zvcm1hdCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdzdGFuZGFsb25lJ1xuICAgICAgICAgICAgICBdO1xuICAgICAgICByZXR1cm4gbSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBzaGlmdFdlZWtkYXlzKHdlZWtkYXlzLCB0aGlzLl93ZWVrLmRvdylcbiAgICAgICAgICAgIDogbVxuICAgICAgICAgICAgPyB3ZWVrZGF5c1ttLmRheSgpXVxuICAgICAgICAgICAgOiB3ZWVrZGF5cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1Nob3J0KG0pIHtcbiAgICAgICAgcmV0dXJuIG0gPT09IHRydWVcbiAgICAgICAgICAgID8gc2hpZnRXZWVrZGF5cyh0aGlzLl93ZWVrZGF5c1Nob3J0LCB0aGlzLl93ZWVrLmRvdylcbiAgICAgICAgICAgIDogbVxuICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c1Nob3J0W20uZGF5KCldXG4gICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzU2hvcnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNNaW4obSkge1xuICAgICAgICByZXR1cm4gbSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBzaGlmdFdlZWtkYXlzKHRoaXMuX3dlZWtkYXlzTWluLCB0aGlzLl93ZWVrLmRvdylcbiAgICAgICAgICAgIDogbVxuICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXVxuICAgICAgICAgICAgOiB0aGlzLl93ZWVrZGF5c01pbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTdHJpY3RQYXJzZSQxKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGlpLFxuICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgbGxjID0gd2Vla2RheU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7ICsraSkge1xuICAgICAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c01pbihcbiAgICAgICAgICAgICAgICAgICAgbW9tLFxuICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICAgICkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzU2hvcnQoXG4gICAgICAgICAgICAgICAgICAgIG1vbSxcbiAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2Uod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgIHZhciBpLCBtb20sIHJlZ2V4O1xuXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVTdHJpY3RQYXJzZSQxLmNhbGwodGhpcywgd2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG5cbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFxcXC4/JykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgJ14nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFxcXC4/JykgKyAnJCcsXG4gICAgICAgICAgICAgICAgICAgICdpJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgICAgICdeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykucmVwbGFjZSgnLicsICdcXFxcLj8nKSArICckJyxcbiAgICAgICAgICAgICAgICAgICAgJ2knXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgICAgICAgICAgJ14nICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5cyhtb20sICcnKSArXG4gICAgICAgICAgICAgICAgICAgICd8XicgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykgK1xuICAgICAgICAgICAgICAgICAgICAnfF4nICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzdHJpY3QgJiZcbiAgICAgICAgICAgICAgICBmb3JtYXQgPT09ICdkZGRkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgc3RyaWN0ICYmXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnZGRkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHN0cmljdCAmJlxuICAgICAgICAgICAgICAgIGZvcm1hdCA9PT0gJ2RkJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mV2VlayhpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRheSA9IHRoaXMuX2lzVVRDID8gdGhpcy5fZC5nZXRVVENEYXkoKSA6IHRoaXMuX2QuZ2V0RGF5KCk7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbnB1dCA9IHBhcnNlV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGlucHV0IC0gZGF5LCAnZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRheTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldExvY2FsZURheU9mV2VlayhpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdlZWtkYXkgPSAodGhpcy5kYXkoKSArIDcgLSB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3cpICUgNztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrZGF5IDogdGhpcy5hZGQoaW5wdXQgLSB3ZWVrZGF5LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT0RheU9mV2VlayhpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBiZWhhdmVzIHRoZSBzYW1lIGFzIG1vbWVudCNkYXkgZXhjZXB0XG4gICAgICAgIC8vIGFzIGEgZ2V0dGVyLCByZXR1cm5zIDcgaW5zdGVhZCBvZiAwICgxLTcgcmFuZ2UgaW5zdGVhZCBvZiAwLTYpXG4gICAgICAgIC8vIGFzIGEgc2V0dGVyLCBzdW5kYXkgc2hvdWxkIGJlbG9uZyB0byB0aGUgcHJldmlvdXMgd2Vlay5cblxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHdlZWtkYXkgPSBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIHRoaXMubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRheSh0aGlzLmRheSgpICUgNyA/IHdlZWtkYXkgOiB3ZWVrZGF5IC0gNyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXkoKSB8fCA3O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Vla2RheXNSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1JlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3RcbiAgICAgICAgICAgICAgICA/IHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXhcbiAgICAgICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1Nob3J0UmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0XG4gICAgICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXhcbiAgICAgICAgICAgICAgICA6IHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdlZWtkYXlzTWluUmVnZXgoaXNTdHJpY3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzTWluUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSBkZWZhdWx0V2Vla2RheXNNaW5SZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0XG4gICAgICAgICAgICAgICAgPyB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4XG4gICAgICAgICAgICAgICAgOiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZVdlZWtkYXlzUGFyc2UoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNtcExlblJldihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtaW5QaWVjZXMgPSBbXSxcbiAgICAgICAgICAgIHNob3J0UGllY2VzID0gW10sXG4gICAgICAgICAgICBsb25nUGllY2VzID0gW10sXG4gICAgICAgICAgICBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIG1vbSxcbiAgICAgICAgICAgIG1pbnAsXG4gICAgICAgICAgICBzaG9ydHAsXG4gICAgICAgICAgICBsb25ncDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XG4gICAgICAgICAgICBtaW5wID0gcmVnZXhFc2NhcGUodGhpcy53ZWVrZGF5c01pbihtb20sICcnKSk7XG4gICAgICAgICAgICBzaG9ydHAgPSByZWdleEVzY2FwZSh0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICAgICAgbG9uZ3AgPSByZWdleEVzY2FwZSh0aGlzLndlZWtkYXlzKG1vbSwgJycpKTtcbiAgICAgICAgICAgIG1pblBpZWNlcy5wdXNoKG1pbnApO1xuICAgICAgICAgICAgc2hvcnRQaWVjZXMucHVzaChzaG9ydHApO1xuICAgICAgICAgICAgbG9uZ1BpZWNlcy5wdXNoKGxvbmdwKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gobWlucCk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHNob3J0cCk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKGxvbmdwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIHdlZWtkYXkgKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcbiAgICAgICAgLy8gd2lsbCBtYXRjaCB0aGUgbG9uZ2VyIHBpZWNlLlxuICAgICAgICBtaW5QaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XG5cbiAgICAgICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5SZWdleCA9IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG5cbiAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXignICsgbG9uZ1BpZWNlcy5qb2luKCd8JykgKyAnKScsXG4gICAgICAgICAgICAnaSdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsXG4gICAgICAgICAgICAnaSdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXignICsgbWluUGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGZ1bmN0aW9uIGhGb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhvdXJzKCkgJSAxMiB8fCAxMjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBrRm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpIHx8IDI0O1xuICAgIH1cblxuICAgIGFkZEZvcm1hdFRva2VuKCdIJywgWydISCcsIDJdLCAwLCAnaG91cicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdoJywgWydoaCcsIDJdLCAwLCBoRm9ybWF0KTtcbiAgICBhZGRGb3JtYXRUb2tlbignaycsIFsna2snLCAyXSwgMCwga0Zvcm1hdCk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignaG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2htbXNzJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgJycgK1xuICAgICAgICAgICAgaEZvcm1hdC5hcHBseSh0aGlzKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMikgK1xuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAnJyArXG4gICAgICAgICAgICB0aGlzLmhvdXJzKCkgK1xuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcbiAgICAgICAgICAgIHplcm9GaWxsKHRoaXMuc2Vjb25kcygpLCAyKVxuICAgICAgICApO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbWVyaWRpZW0odG9rZW4sIGxvd2VyY2FzZSkge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1lcmlkaWVtKFxuICAgICAgICAgICAgICAgIHRoaXMuaG91cnMoKSxcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgICBsb3dlcmNhc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lcmlkaWVtKCdhJywgdHJ1ZSk7XG4gICAgbWVyaWRpZW0oJ0EnLCBmYWxzZSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2hvdXInLCAnaCcpO1xuXG4gICAgLy8gUFJJT1JJVFlcbiAgICBhZGRVbml0UHJpb3JpdHkoJ2hvdXInLCAxMyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBmdW5jdGlvbiBtYXRjaE1lcmlkaWVtKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5fbWVyaWRpZW1QYXJzZTtcbiAgICB9XG5cbiAgICBhZGRSZWdleFRva2VuKCdhJywgbWF0Y2hNZXJpZGllbSk7XG4gICAgYWRkUmVnZXhUb2tlbignQScsIG1hdGNoTWVyaWRpZW0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0gnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2gnLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2snLCBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0hIJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2trJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkUmVnZXhUb2tlbignaG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdobW1zcycsIG1hdGNoNXRvNik7XG4gICAgYWRkUmVnZXhUb2tlbignSG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdIbW1zcycsIG1hdGNoNXRvNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnSCcsICdISCddLCBIT1VSKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnaycsICdrayddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIGtJbnB1dCA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSBrSW5wdXQgPT09IDI0ID8gMCA6IGtJbnB1dDtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnYScsICdBJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2lzUG0gPSBjb25maWcuX2xvY2FsZS5pc1BNKGlucHV0KTtcbiAgICAgICAgY29uZmlnLl9tZXJpZGllbSA9IGlucHV0O1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oWydoJywgJ2hoJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0LFxuICAgICAgICAgICAgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdIbW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ0htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNCxcbiAgICAgICAgICAgIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUlzUE0oaW5wdXQpIHtcbiAgICAgICAgLy8gSUU4IFF1aXJrcyBNb2RlICYgSUU3IFN0YW5kYXJkcyBNb2RlIGRvIG5vdCBhbGxvdyBhY2Nlc3Npbmcgc3RyaW5ncyBsaWtlIGFycmF5c1xuICAgICAgICAvLyBVc2luZyBjaGFyQXQgc2hvdWxkIGJlIG1vcmUgY29tcGF0aWJsZS5cbiAgICAgICAgcmV0dXJuIChpbnB1dCArICcnKS50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gJ3AnO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZSA9IC9bYXBdXFwuP20/XFwuPy9pLFxuICAgICAgICAvLyBTZXR0aW5nIHRoZSBob3VyIHNob3VsZCBrZWVwIHRoZSB0aW1lLCBiZWNhdXNlIHRoZSB1c2VyIGV4cGxpY2l0bHlcbiAgICAgICAgLy8gc3BlY2lmaWVkIHdoaWNoIGhvdXIgdGhleSB3YW50LiBTbyB0cnlpbmcgdG8gbWFpbnRhaW4gdGhlIHNhbWUgaG91ciAoaW5cbiAgICAgICAgLy8gYSBuZXcgdGltZXpvbmUpIG1ha2VzIHNlbnNlLiBBZGRpbmcvc3VidHJhY3RpbmcgaG91cnMgZG9lcyBub3QgZm9sbG93XG4gICAgICAgIC8vIHRoaXMgcnVsZS5cbiAgICAgICAgZ2V0U2V0SG91ciA9IG1ha2VHZXRTZXQoJ0hvdXJzJywgdHJ1ZSk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNZXJpZGllbShob3VycywgbWludXRlcywgaXNMb3dlcikge1xuICAgICAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYmFzZUNvbmZpZyA9IHtcbiAgICAgICAgY2FsZW5kYXI6IGRlZmF1bHRDYWxlbmRhcixcbiAgICAgICAgbG9uZ0RhdGVGb3JtYXQ6IGRlZmF1bHRMb25nRGF0ZUZvcm1hdCxcbiAgICAgICAgaW52YWxpZERhdGU6IGRlZmF1bHRJbnZhbGlkRGF0ZSxcbiAgICAgICAgb3JkaW5hbDogZGVmYXVsdE9yZGluYWwsXG4gICAgICAgIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IGRlZmF1bHREYXlPZk1vbnRoT3JkaW5hbFBhcnNlLFxuICAgICAgICByZWxhdGl2ZVRpbWU6IGRlZmF1bHRSZWxhdGl2ZVRpbWUsXG5cbiAgICAgICAgbW9udGhzOiBkZWZhdWx0TG9jYWxlTW9udGhzLFxuICAgICAgICBtb250aHNTaG9ydDogZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0LFxuXG4gICAgICAgIHdlZWs6IGRlZmF1bHRMb2NhbGVXZWVrLFxuXG4gICAgICAgIHdlZWtkYXlzOiBkZWZhdWx0TG9jYWxlV2Vla2RheXMsXG4gICAgICAgIHdlZWtkYXlzTWluOiBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4sXG4gICAgICAgIHdlZWtkYXlzU2hvcnQ6IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0LFxuXG4gICAgICAgIG1lcmlkaWVtUGFyc2U6IGRlZmF1bHRMb2NhbGVNZXJpZGllbVBhcnNlLFxuICAgIH07XG5cbiAgICAvLyBpbnRlcm5hbCBzdG9yYWdlIGZvciBsb2NhbGUgY29uZmlnIGZpbGVzXG4gICAgdmFyIGxvY2FsZXMgPSB7fSxcbiAgICAgICAgbG9jYWxlRmFtaWxpZXMgPSB7fSxcbiAgICAgICAgZ2xvYmFsTG9jYWxlO1xuXG4gICAgZnVuY3Rpb24gY29tbW9uUHJlZml4KGFycjEsIGFycjIpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBtaW5sID0gTWF0aC5taW4oYXJyMS5sZW5ndGgsIGFycjIubGVuZ3RoKTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG1pbmw7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGFycjFbaV0gIT09IGFycjJbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWlubDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVMb2NhbGUoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPyBrZXkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdfJywgJy0nKSA6IGtleTtcbiAgICB9XG5cbiAgICAvLyBwaWNrIHRoZSBsb2NhbGUgZnJvbSB0aGUgYXJyYXlcbiAgICAvLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxuICAgIC8vIHN1YnN0cmluZyBmcm9tIG1vc3Qgc3BlY2lmaWMgdG8gbGVhc3QsIGJ1dCBtb3ZlIHRvIHRoZSBuZXh0IGFycmF5IGl0ZW0gaWYgaXQncyBhIG1vcmUgc3BlY2lmaWMgdmFyaWFudCB0aGFuIHRoZSBjdXJyZW50IHJvb3RcbiAgICBmdW5jdGlvbiBjaG9vc2VMb2NhbGUobmFtZXMpIHtcbiAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgaixcbiAgICAgICAgICAgIG5leHQsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICBzcGxpdDtcblxuICAgICAgICB3aGlsZSAoaSA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc3BsaXQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaV0pLnNwbGl0KCctJyk7XG4gICAgICAgICAgICBqID0gc3BsaXQubGVuZ3RoO1xuICAgICAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpICsgMV0pO1xuICAgICAgICAgICAgbmV4dCA9IG5leHQgPyBuZXh0LnNwbGl0KCctJykgOiBudWxsO1xuICAgICAgICAgICAgd2hpbGUgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShzcGxpdC5zbGljZSgwLCBqKS5qb2luKCctJykpO1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBuZXh0ICYmXG4gICAgICAgICAgICAgICAgICAgIG5leHQubGVuZ3RoID49IGogJiZcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uUHJlZml4KHNwbGl0LCBuZXh0KSA+PSBqIC0gMVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvL3RoZSBuZXh0IGFycmF5IGl0ZW0gaXMgYmV0dGVyIHRoYW4gYSBzaGFsbG93ZXIgc3Vic3RyaW5nIG9mIHRoaXMgb25lXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0xvY2FsZU5hbWVTYW5lKG5hbWUpIHtcbiAgICAgICAgLy8gUHJldmVudCBuYW1lcyB0aGF0IGxvb2sgbGlrZSBmaWxlc3lzdGVtIHBhdGhzLCBpLmUgY29udGFpbiAnLycgb3IgJ1xcJ1xuICAgICAgICByZXR1cm4gbmFtZS5tYXRjaCgnXlteL1xcXFxcXFxcXSokJykgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcbiAgICAgICAgdmFyIG9sZExvY2FsZSA9IG51bGwsXG4gICAgICAgICAgICBhbGlhc2VkUmVxdWlyZTtcbiAgICAgICAgLy8gVE9ETzogRmluZCBhIGJldHRlciB3YXkgdG8gcmVnaXN0ZXIgYW5kIGxvYWQgYWxsIHRoZSBsb2NhbGVzIGluIE5vZGVcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgbW9kdWxlICYmXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyAmJlxuICAgICAgICAgICAgaXNMb2NhbGVOYW1lU2FuZShuYW1lKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkTG9jYWxlID0gZ2xvYmFsTG9jYWxlLl9hYmJyO1xuICAgICAgICAgICAgICAgIGFsaWFzZWRSZXF1aXJlID0gcmVxdWlyZTtcbiAgICAgICAgICAgICAgICBhbGlhc2VkUmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xuICAgICAgICAgICAgICAgIGdldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIG1hcmsgYXMgbm90IGZvdW5kIHRvIGF2b2lkIHJlcGVhdGluZyBleHBlbnNpdmUgZmlsZSByZXF1aXJlIGNhbGwgY2F1c2luZyBoaWdoIENQVVxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdHJ5aW5nIHRvIGZpbmQgZW4tVVMsIGVuX1VTLCBlbi11cyBmb3IgZXZlcnkgZm9ybWF0IGNhbGxcbiAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbnVsbDsgLy8gbnVsbCBtZWFucyBub3QgZm91bmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsb2NhbGUgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbG9jYWxlLiAgSWZcbiAgICAvLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbFxuICAgIC8vIGxvY2FsZSBrZXkuXG4gICAgZnVuY3Rpb24gZ2V0U2V0R2xvYmFsTG9jYWxlKGtleSwgdmFsdWVzKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBnZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gbW9tZW50LmR1cmF0aW9uLl9sb2NhbGUgPSBtb21lbnQuX2xvY2FsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZ2xvYmFsTG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy93YXJuIHVzZXIgaWYgYXJndW1lbnRzIGFyZSBwYXNzZWQgYnV0IHRoZSBsb2NhbGUgY291bGQgbm90IGJlIHNldFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICAgICAnTG9jYWxlICcgKyBrZXkgKyAnIG5vdCBmb3VuZC4gRGlkIHlvdSBmb3JnZXQgdG8gbG9hZCBpdD8nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVMb2NhbGUobmFtZSwgY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGUsXG4gICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gYmFzZUNvbmZpZztcbiAgICAgICAgICAgIGNvbmZpZy5hYmJyID0gbmFtZTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoXG4gICAgICAgICAgICAgICAgICAgICdkZWZpbmVMb2NhbGVPdmVycmlkZScsXG4gICAgICAgICAgICAgICAgICAgICd1c2UgbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGVOYW1lLCBjb25maWcpIHRvIGNoYW5nZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbiBleGlzdGluZyBsb2NhbGUuIG1vbWVudC5kZWZpbmVMb2NhbGUobG9jYWxlTmFtZSwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZmlnKSBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGUgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2VlIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvZGVmaW5lLWxvY2FsZS8gZm9yIG1vcmUgaW5mby4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGVzW25hbWVdLl9jb25maWc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbGVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoY29uZmlnLnBhcmVudExvY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlLl9jb25maWc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlRmFtaWxpZXNbY29uZmlnLnBhcmVudExvY2FsZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IG5ldyBMb2NhbGUobWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgY29uZmlnKSk7XG5cbiAgICAgICAgICAgIGlmIChsb2NhbGVGYW1pbGllc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lTG9jYWxlKHgubmFtZSwgeC5jb25maWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBub3c6IGFsc28gc2V0IHRoZSBsb2NhbGVcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGxvY2FsZSBBRlRFUiBhbGwgY2hpbGQgbG9jYWxlcyBoYXZlIGJlZW5cbiAgICAgICAgICAgIC8vIGNyZWF0ZWQsIHNvIHdlIHdvbid0IGVuZCB1cCB3aXRoIHRoZSBjaGlsZCBsb2NhbGUgc2V0LlxuICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVzZWZ1bCBmb3IgdGVzdGluZ1xuICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsZShuYW1lLCBjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxlLFxuICAgICAgICAgICAgICAgIHRtcExvY2FsZSxcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBiYXNlQ29uZmlnO1xuXG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsICYmIGxvY2FsZXNbbmFtZV0ucGFyZW50TG9jYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgY2hpbGQgbG9jYWxlIGluLXBsYWNlIHRvIGF2b2lkIG1lbW9yeS1sZWFrc1xuICAgICAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0uc2V0KG1lcmdlQ29uZmlncyhsb2NhbGVzW25hbWVdLl9jb25maWcsIGNvbmZpZykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNRVJHRVxuICAgICAgICAgICAgICAgIHRtcExvY2FsZSA9IGxvYWRMb2NhbGUobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRtcExvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbmZpZyA9IHRtcExvY2FsZS5fY29uZmlnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGlmICh0bXBMb2NhbGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGVMb2NhbGUgaXMgY2FsbGVkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGVcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGFiYnIgc28gaXQgd2lsbCBoYXZlIGEgbmFtZSAoZ2V0dGVycyByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kZWZpbmVkIG90aGVyd2lzZSkuXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5hYmJyID0gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbmV3IExvY2FsZShjb25maWcpO1xuICAgICAgICAgICAgICAgIGxvY2FsZS5wYXJlbnRMb2NhbGUgPSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcGFzcyBudWxsIGZvciBjb25maWcgdG8gdW51cGRhdGUsIHVzZWZ1bCBmb3IgdGVzdHNcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBnZXRTZXRHbG9iYWxMb2NhbGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcbiAgICBmdW5jdGlvbiBnZXRMb2NhbGUoa2V5KSB7XG4gICAgICAgIHZhciBsb2NhbGU7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkuX2xvY2FsZSAmJiBrZXkuX2xvY2FsZS5fYWJicikge1xuICAgICAgICAgICAga2V5ID0ga2V5Ll9sb2NhbGUuX2FiYnI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAgICAvL3Nob3J0LWNpcmN1aXQgZXZlcnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGtleSk7XG4gICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleSA9IFtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RMb2NhbGVzKCkge1xuICAgICAgICByZXR1cm4ga2V5cyhsb2NhbGVzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJmbG93KG0pIHtcbiAgICAgICAgdmFyIG92ZXJmbG93LFxuICAgICAgICAgICAgYSA9IG0uX2E7XG5cbiAgICAgICAgaWYgKGEgJiYgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID09PSAtMikge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPVxuICAgICAgICAgICAgICAgIGFbTU9OVEhdIDwgMCB8fCBhW01PTlRIXSA+IDExXG4gICAgICAgICAgICAgICAgICAgID8gTU9OVEhcbiAgICAgICAgICAgICAgICAgICAgOiBhW0RBVEVdIDwgMSB8fCBhW0RBVEVdID4gZGF5c0luTW9udGgoYVtZRUFSXSwgYVtNT05USF0pXG4gICAgICAgICAgICAgICAgICAgID8gREFURVxuICAgICAgICAgICAgICAgICAgICA6IGFbSE9VUl0gPCAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgYVtIT1VSXSA+IDI0IHx8XG4gICAgICAgICAgICAgICAgICAgICAgKGFbSE9VUl0gPT09IDI0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChhW01JTlVURV0gIT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbU0VDT05EXSAhPT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtNSUxMSVNFQ09ORF0gIT09IDApKVxuICAgICAgICAgICAgICAgICAgICA/IEhPVVJcbiAgICAgICAgICAgICAgICAgICAgOiBhW01JTlVURV0gPCAwIHx8IGFbTUlOVVRFXSA+IDU5XG4gICAgICAgICAgICAgICAgICAgID8gTUlOVVRFXG4gICAgICAgICAgICAgICAgICAgIDogYVtTRUNPTkRdIDwgMCB8fCBhW1NFQ09ORF0gPiA1OVxuICAgICAgICAgICAgICAgICAgICA/IFNFQ09ORFxuICAgICAgICAgICAgICAgICAgICA6IGFbTUlMTElTRUNPTkRdIDwgMCB8fCBhW01JTExJU0VDT05EXSA+IDk5OVxuICAgICAgICAgICAgICAgICAgICA/IE1JTExJU0VDT05EXG4gICAgICAgICAgICAgICAgICAgIDogLTE7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93RGF5T2ZZZWFyICYmXG4gICAgICAgICAgICAgICAgKG92ZXJmbG93IDwgWUVBUiB8fCBvdmVyZmxvdyA+IERBVEUpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IERBVEU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtzICYmIG92ZXJmbG93ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFSztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla2RheSAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUtEQVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9IG92ZXJmbG93O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgLy8gaXNvIDg2MDEgcmVnZXhcbiAgICAvLyAwMDAwLTAwLTAwIDAwMDAtVzAwIG9yIDAwMDAtVzAwLTAgKyBUICsgMDAgb3IgMDA6MDAgb3IgMDA6MDA6MDAgb3IgMDA6MDA6MDAuMDAwICsgKzAwOjAwIG9yICswMDAwIG9yICswMClcbiAgICB2YXIgZXh0ZW5kZWRJc29SZWdleCA9XG4gICAgICAgICAgICAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pLSg/OlxcZFxcZC1cXGRcXGR8V1xcZFxcZC1cXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkKSkoPzooVHwgKShcXGRcXGQoPzo6XFxkXFxkKD86OlxcZFxcZCg/OlsuLF1cXGQrKT8pPyk/KShbKy1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8kLyxcbiAgICAgICAgYmFzaWNJc29SZWdleCA9XG4gICAgICAgICAgICAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pKD86XFxkXFxkXFxkXFxkfFdcXGRcXGRcXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkfCkpKD86KFR8ICkoXFxkXFxkKD86XFxkXFxkKD86XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvLFxuICAgICAgICB0elJlZ2V4ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vLFxuICAgICAgICBpc29EYXRlcyA9IFtcbiAgICAgICAgICAgIFsnWVlZWVlZLU1NLUREJywgL1srLV1cXGR7Nn0tXFxkXFxkLVxcZFxcZC9dLFxuICAgICAgICAgICAgWydZWVlZLU1NLUREJywgL1xcZHs0fS1cXGRcXGQtXFxkXFxkL10sXG4gICAgICAgICAgICBbJ0dHR0ctW1ddV1ctRScsIC9cXGR7NH0tV1xcZFxcZC1cXGQvXSxcbiAgICAgICAgICAgIFsnR0dHRy1bV11XVycsIC9cXGR7NH0tV1xcZFxcZC8sIGZhbHNlXSxcbiAgICAgICAgICAgIFsnWVlZWS1EREQnLCAvXFxkezR9LVxcZHszfS9dLFxuICAgICAgICAgICAgWydZWVlZLU1NJywgL1xcZHs0fS1cXGRcXGQvLCBmYWxzZV0sXG4gICAgICAgICAgICBbJ1lZWVlZWU1NREQnLCAvWystXVxcZHsxMH0vXSxcbiAgICAgICAgICAgIFsnWVlZWU1NREQnLCAvXFxkezh9L10sXG4gICAgICAgICAgICBbJ0dHR0dbV11XV0UnLCAvXFxkezR9V1xcZHszfS9dLFxuICAgICAgICAgICAgWydHR0dHW1ddV1cnLCAvXFxkezR9V1xcZHsyfS8sIGZhbHNlXSxcbiAgICAgICAgICAgIFsnWVlZWURERCcsIC9cXGR7N30vXSxcbiAgICAgICAgICAgIFsnWVlZWU1NJywgL1xcZHs2fS8sIGZhbHNlXSxcbiAgICAgICAgICAgIFsnWVlZWScsIC9cXGR7NH0vLCBmYWxzZV0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIGlzbyB0aW1lIGZvcm1hdHMgYW5kIHJlZ2V4ZXNcbiAgICAgICAgaXNvVGltZXMgPSBbXG4gICAgICAgICAgICBbJ0hIOm1tOnNzLlNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGRcXC5cXGQrL10sXG4gICAgICAgICAgICBbJ0hIOm1tOnNzLFNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQsXFxkKy9dLFxuICAgICAgICAgICAgWydISDptbTpzcycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICAgICAgWydISDptbScsIC9cXGRcXGQ6XFxkXFxkL10sXG4gICAgICAgICAgICBbJ0hIbW1zcy5TU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgICAgIFsnSEhtbXNzLFNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkLFxcZCsvXSxcbiAgICAgICAgICAgIFsnSEhtbXNzJywgL1xcZFxcZFxcZFxcZFxcZFxcZC9dLFxuICAgICAgICAgICAgWydISG1tJywgL1xcZFxcZFxcZFxcZC9dLFxuICAgICAgICAgICAgWydISCcsIC9cXGRcXGQvXSxcbiAgICAgICAgXSxcbiAgICAgICAgYXNwTmV0SnNvblJlZ2V4ID0gL15cXC8/RGF0ZVxcKCgtP1xcZCspL2ksXG4gICAgICAgIC8vIFJGQyAyODIyIHJlZ2V4OiBGb3IgZGV0YWlscyBzZWUgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzI4MjIjc2VjdGlvbi0zLjNcbiAgICAgICAgcmZjMjgyMiA9XG4gICAgICAgICAgICAvXig/OihNb258VHVlfFdlZHxUaHV8RnJpfFNhdHxTdW4pLD9cXHMpPyhcXGR7MSwyfSlcXHMoSmFufEZlYnxNYXJ8QXByfE1heXxKdW58SnVsfEF1Z3xTZXB8T2N0fE5vdnxEZWMpXFxzKFxcZHsyLDR9KVxccyhcXGRcXGQpOihcXGRcXGQpKD86OihcXGRcXGQpKT9cXHMoPzooVVR8R01UfFtFQ01QXVtTRF1UKXwoW1p6XSl8KFsrLV1cXGR7NH0pKSQvLFxuICAgICAgICBvYnNPZmZzZXRzID0ge1xuICAgICAgICAgICAgVVQ6IDAsXG4gICAgICAgICAgICBHTVQ6IDAsXG4gICAgICAgICAgICBFRFQ6IC00ICogNjAsXG4gICAgICAgICAgICBFU1Q6IC01ICogNjAsXG4gICAgICAgICAgICBDRFQ6IC01ICogNjAsXG4gICAgICAgICAgICBDU1Q6IC02ICogNjAsXG4gICAgICAgICAgICBNRFQ6IC02ICogNjAsXG4gICAgICAgICAgICBNU1Q6IC03ICogNjAsXG4gICAgICAgICAgICBQRFQ6IC03ICogNjAsXG4gICAgICAgICAgICBQU1Q6IC04ICogNjAsXG4gICAgICAgIH07XG5cbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdFxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JU08oY29uZmlnKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgbCxcbiAgICAgICAgICAgIHN0cmluZyA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIG1hdGNoID0gZXh0ZW5kZWRJc29SZWdleC5leGVjKHN0cmluZykgfHwgYmFzaWNJc29SZWdleC5leGVjKHN0cmluZyksXG4gICAgICAgICAgICBhbGxvd1RpbWUsXG4gICAgICAgICAgICBkYXRlRm9ybWF0LFxuICAgICAgICAgICAgdGltZUZvcm1hdCxcbiAgICAgICAgICAgIHR6Rm9ybWF0LFxuICAgICAgICAgICAgaXNvRGF0ZXNMZW4gPSBpc29EYXRlcy5sZW5ndGgsXG4gICAgICAgICAgICBpc29UaW1lc0xlbiA9IGlzb1RpbWVzLmxlbmd0aDtcblxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmlzbyA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvRGF0ZXNMZW47IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNvRGF0ZXNbaV1bMV0uZXhlYyhtYXRjaFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdCA9IGlzb0RhdGVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBhbGxvd1RpbWUgPSBpc29EYXRlc1tpXVsyXSAhPT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRlRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvVGltZXNMZW47IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzb1RpbWVzW2ldWzFdLmV4ZWMobWF0Y2hbM10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaFsyXSBzaG91bGQgYmUgJ1QnIG9yIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lRm9ybWF0ID0gKG1hdGNoWzJdIHx8ICcgJykgKyBpc29UaW1lc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aW1lRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFsbG93VGltZSAmJiB0aW1lRm9ybWF0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHpSZWdleC5leGVjKG1hdGNoWzRdKSkge1xuICAgICAgICAgICAgICAgICAgICB0ekZvcm1hdCA9ICdaJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpZy5fZiA9IGRhdGVGb3JtYXQgKyAodGltZUZvcm1hdCB8fCAnJykgKyAodHpGb3JtYXQgfHwgJycpO1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRyYWN0RnJvbVJGQzI4MjJTdHJpbmdzKFxuICAgICAgICB5ZWFyU3RyLFxuICAgICAgICBtb250aFN0cixcbiAgICAgICAgZGF5U3RyLFxuICAgICAgICBob3VyU3RyLFxuICAgICAgICBtaW51dGVTdHIsXG4gICAgICAgIHNlY29uZFN0clxuICAgICkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgdW50cnVuY2F0ZVllYXIoeWVhclN0ciksXG4gICAgICAgICAgICBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQuaW5kZXhPZihtb250aFN0ciksXG4gICAgICAgICAgICBwYXJzZUludChkYXlTdHIsIDEwKSxcbiAgICAgICAgICAgIHBhcnNlSW50KGhvdXJTdHIsIDEwKSxcbiAgICAgICAgICAgIHBhcnNlSW50KG1pbnV0ZVN0ciwgMTApLFxuICAgICAgICBdO1xuXG4gICAgICAgIGlmIChzZWNvbmRTdHIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHNlY29uZFN0ciwgMTApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW50cnVuY2F0ZVllYXIoeWVhclN0cikge1xuICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KHllYXJTdHIsIDEwKTtcbiAgICAgICAgaWYgKHllYXIgPD0gNDkpIHtcbiAgICAgICAgICAgIHJldHVybiAyMDAwICsgeWVhcjtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDw9IDk5OSkge1xuICAgICAgICAgICAgcmV0dXJuIDE5MDAgKyB5ZWFyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5ZWFyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXByb2Nlc3NSRkMyODIyKHMpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGNvbW1lbnRzIGFuZCBmb2xkaW5nIHdoaXRlc3BhY2UgYW5kIHJlcGxhY2UgbXVsdGlwbGUtc3BhY2VzIHdpdGggYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgcmV0dXJuIHNcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXChbXigpXSpcXCl8W1xcblxcdF0vZywgJyAnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHNcXHMrKS9nLCAnICcpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxcc1xccyovLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXHNcXHMqJC8sICcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dlZWtkYXkod2Vla2RheVN0ciwgcGFyc2VkSW5wdXQsIGNvbmZpZykge1xuICAgICAgICBpZiAod2Vla2RheVN0cikge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB0aGUgdmFuaWxsYSBKUyBEYXRlIG9iamVjdCB3aXRoIGFuIGluZGVwZW5kZW50IGRheS1vZi13ZWVrIGNoZWNrLlxuICAgICAgICAgICAgdmFyIHdlZWtkYXlQcm92aWRlZCA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0LmluZGV4T2Yod2Vla2RheVN0ciksXG4gICAgICAgICAgICAgICAgd2Vla2RheUFjdHVhbCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRJbnB1dFswXSxcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkSW5wdXRbMV0sXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZElucHV0WzJdXG4gICAgICAgICAgICAgICAgKS5nZXREYXkoKTtcbiAgICAgICAgICAgIGlmICh3ZWVrZGF5UHJvdmlkZWQgIT09IHdlZWtkYXlBY3R1YWwpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS53ZWVrZGF5TWlzbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVPZmZzZXQob2JzT2Zmc2V0LCBtaWxpdGFyeU9mZnNldCwgbnVtT2Zmc2V0KSB7XG4gICAgICAgIGlmIChvYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNPZmZzZXRzW29ic09mZnNldF07XG4gICAgICAgIH0gZWxzZSBpZiAobWlsaXRhcnlPZmZzZXQpIHtcbiAgICAgICAgICAgIC8vIHRoZSBvbmx5IGFsbG93ZWQgbWlsaXRhcnkgdHogaXMgWlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaG0gPSBwYXJzZUludChudW1PZmZzZXQsIDEwKSxcbiAgICAgICAgICAgICAgICBtID0gaG0gJSAxMDAsXG4gICAgICAgICAgICAgICAgaCA9IChobSAtIG0pIC8gMTAwO1xuICAgICAgICAgICAgcmV0dXJuIGggKiA2MCArIG07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGFuZCB0aW1lIGZyb20gcmVmIDI4MjIgZm9ybWF0XG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVJGQzI4MjIoY29uZmlnKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHJmYzI4MjIuZXhlYyhwcmVwcm9jZXNzUkZDMjgyMihjb25maWcuX2kpKSxcbiAgICAgICAgICAgIHBhcnNlZEFycmF5O1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHBhcnNlZEFycmF5ID0gZXh0cmFjdEZyb21SRkMyODIyU3RyaW5ncyhcbiAgICAgICAgICAgICAgICBtYXRjaFs0XSxcbiAgICAgICAgICAgICAgICBtYXRjaFszXSxcbiAgICAgICAgICAgICAgICBtYXRjaFsyXSxcbiAgICAgICAgICAgICAgICBtYXRjaFs1XSxcbiAgICAgICAgICAgICAgICBtYXRjaFs2XSxcbiAgICAgICAgICAgICAgICBtYXRjaFs3XVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICghY2hlY2tXZWVrZGF5KG1hdGNoWzFdLCBwYXJzZWRBcnJheSwgY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uZmlnLl9hID0gcGFyc2VkQXJyYXk7XG4gICAgICAgICAgICBjb25maWcuX3R6bSA9IGNhbGN1bGF0ZU9mZnNldChtYXRjaFs4XSwgbWF0Y2hbOV0sIG1hdGNoWzEwXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IGNyZWF0ZVVUQ0RhdGUuYXBwbHkobnVsbCwgY29uZmlnLl9hKTtcbiAgICAgICAgICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnJmYzI4MjIgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gMSkgQVNQLk5FVCwgMikgSVNPLCAzKSBSRkMgMjgyMiBmb3JtYXRzLCBvciA0KSBvcHRpb25hbCBmYWxsYmFjayBpZiBwYXJzaW5nIGlzbid0IHN0cmljdFxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gYXNwTmV0SnNvblJlZ2V4LmV4ZWMoY29uZmlnLl9pKTtcbiAgICAgICAgaWYgKG1hdGNoZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCttYXRjaGVkWzFdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcbiAgICAgICAgaWYgKGNvbmZpZy5faXNWYWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuX2lzVmFsaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuX3N0cmljdCkge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBGaW5hbCBhdHRlbXB0LCB1c2UgSW5wdXQgRmFsbGJhY2tcbiAgICAgICAgICAgIGhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ3ZhbHVlIHByb3ZpZGVkIGlzIG5vdCBpbiBhIHJlY29nbml6ZWQgUkZDMjgyMiBvciBJU08gZm9ybWF0LiBtb21lbnQgY29uc3RydWN0aW9uIGZhbGxzIGJhY2sgdG8ganMgRGF0ZSgpLCAnICtcbiAgICAgICAgICAgICd3aGljaCBpcyBub3QgcmVsaWFibGUgYWNyb3NzIGFsbCBicm93c2VycyBhbmQgdmVyc2lvbnMuIE5vbiBSRkMyODIyL0lTTyBkYXRlIGZvcm1hdHMgYXJlICcgK1xuICAgICAgICAgICAgJ2Rpc2NvdXJhZ2VkLiBQbGVhc2UgcmVmZXIgdG8gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9qcy1kYXRlLyBmb3IgbW9yZSBpbmZvLicsXG4gICAgICAgIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGNvbmZpZy5faSArIChjb25maWcuX3VzZVVUQyA/ICcgVVRDJyA6ICcnKSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gUGljayB0aGUgZmlyc3QgZGVmaW5lZCBvZiB0d28gb3IgdGhyZWUgYXJndW1lbnRzLlxuICAgIGZ1bmN0aW9uIGRlZmF1bHRzKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3VycmVudERhdGVBcnJheShjb25maWcpIHtcbiAgICAgICAgLy8gaG9va3MgaXMgYWN0dWFsbHkgdGhlIGV4cG9ydGVkIG1vbWVudCBvYmplY3RcbiAgICAgICAgdmFyIG5vd1ZhbHVlID0gbmV3IERhdGUoaG9va3Mubm93KCkpO1xuICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbm93VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBub3dWYWx1ZS5nZXRVVENNb250aCgpLFxuICAgICAgICAgICAgICAgIG5vd1ZhbHVlLmdldFVUQ0RhdGUoKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRNb250aCgpLCBub3dWYWx1ZS5nZXREYXRlKCldO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkYXRlLlxuICAgIC8vIHRoZSBhcnJheSBzaG91bGQgbWlycm9yIHRoZSBwYXJhbWV0ZXJzIGJlbG93XG4gICAgLy8gbm90ZTogYWxsIHZhbHVlcyBwYXN0IHRoZSB5ZWFyIGFyZSBvcHRpb25hbCBhbmQgd2lsbCBkZWZhdWx0IHRvIHRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXG4gICAgLy8gW3llYXIsIG1vbnRoLCBkYXkgLCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmRdXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUFycmF5KGNvbmZpZykge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBpbnB1dCA9IFtdLFxuICAgICAgICAgICAgY3VycmVudERhdGUsXG4gICAgICAgICAgICBleHBlY3RlZFdlZWtkYXksXG4gICAgICAgICAgICB5ZWFyVG9Vc2U7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudERhdGUgPSBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZyk7XG5cbiAgICAgICAgLy9jb21wdXRlIGRheSBvZiB0aGUgeWVhciBmcm9tIHdlZWtzIGFuZCB3ZWVrZGF5c1xuICAgICAgICBpZiAoY29uZmlnLl93ICYmIGNvbmZpZy5fYVtEQVRFXSA9PSBudWxsICYmIGNvbmZpZy5fYVtNT05USF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgZGF5T2ZZZWFyRnJvbVdlZWtJbmZvKGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIHRoZSBkYXkgb2YgdGhlIHllYXIgaXMgc2V0LCBmaWd1cmUgb3V0IHdoYXQgaXQgaXNcbiAgICAgICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHllYXJUb1VzZSA9IGRlZmF1bHRzKGNvbmZpZy5fYVtZRUFSXSwgY3VycmVudERhdGVbWUVBUl0pO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkgfHxcbiAgICAgICAgICAgICAgICBjb25maWcuX2RheU9mWWVhciA9PT0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93RGF5T2ZZZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoeWVhclRvVXNlLCAwLCBjb25maWcuX2RheU9mWWVhcik7XG4gICAgICAgICAgICBjb25maWcuX2FbTU9OVEhdID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgICAgICAgICAgY29uZmlnLl9hW0RBVEVdID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgZGF0ZS5cbiAgICAgICAgLy8gKiBpZiBubyB5ZWFyLCBtb250aCwgZGF5IG9mIG1vbnRoIGFyZSBnaXZlbiwgZGVmYXVsdCB0byB0b2RheVxuICAgICAgICAvLyAqIGlmIGRheSBvZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBtb250aCBhbmQgeWVhclxuICAgICAgICAvLyAqIGlmIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG9ubHkgeWVhclxuICAgICAgICAvLyAqIGlmIHllYXIgaXMgZ2l2ZW4sIGRvbid0IGRlZmF1bHQgYW55dGhpbmdcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDMgJiYgY29uZmlnLl9hW2ldID09IG51bGw7ICsraSkge1xuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSBjdXJyZW50RGF0ZVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFplcm8gb3V0IHdoYXRldmVyIHdhcyBub3QgZGVmYXVsdGVkLCBpbmNsdWRpbmcgdGltZVxuICAgICAgICBmb3IgKDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPVxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9PSBudWxsID8gKGkgPT09IDIgPyAxIDogMCkgOiBjb25maWcuX2FbaV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBmb3IgMjQ6MDA6MDAuMDAwXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNSU5VVEVdID09PSAwICYmXG4gICAgICAgICAgICBjb25maWcuX2FbU0VDT05EXSA9PT0gMCAmJlxuICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbmZpZy5fbmV4dERheSA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLl9kID0gKGNvbmZpZy5fdXNlVVRDID8gY3JlYXRlVVRDRGF0ZSA6IGNyZWF0ZURhdGUpLmFwcGx5KFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIGlucHV0XG4gICAgICAgICk7XG4gICAgICAgIGV4cGVjdGVkV2Vla2RheSA9IGNvbmZpZy5fdXNlVVRDXG4gICAgICAgICAgICA/IGNvbmZpZy5fZC5nZXRVVENEYXkoKVxuICAgICAgICAgICAgOiBjb25maWcuX2QuZ2V0RGF5KCk7XG5cbiAgICAgICAgLy8gQXBwbHkgdGltZXpvbmUgb2Zmc2V0IGZyb20gaW5wdXQuIFRoZSBhY3R1YWwgdXRjT2Zmc2V0IGNhbiBiZSBjaGFuZ2VkXG4gICAgICAgIC8vIHdpdGggcGFyc2Vab25lLlxuICAgICAgICBpZiAoY29uZmlnLl90em0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuX25leHREYXkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDI0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIG1pc21hdGNoaW5nIGRheSBvZiB3ZWVrXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvbmZpZy5fdyAmJlxuICAgICAgICAgICAgdHlwZW9mIGNvbmZpZy5fdy5kICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgY29uZmlnLl93LmQgIT09IGV4cGVjdGVkV2Vla2RheVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLndlZWtkYXlNaXNtYXRjaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XG4gICAgICAgIHZhciB3LCB3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3ksIHRlbXAsIHdlZWtkYXlPdmVyZmxvdywgY3VyV2VlaztcblxuICAgICAgICB3ID0gY29uZmlnLl93O1xuICAgICAgICBpZiAody5HRyAhPSBudWxsIHx8IHcuVyAhPSBudWxsIHx8IHcuRSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkb3cgPSAxO1xuICAgICAgICAgICAgZG95ID0gNDtcblxuICAgICAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byB0YWtlIHRoZSBjdXJyZW50IGlzb1dlZWtZZWFyLCBidXQgdGhhdCBkZXBlbmRzIG9uXG4gICAgICAgICAgICAvLyBob3cgd2UgaW50ZXJwcmV0IG5vdyAobG9jYWwsIHV0YywgZml4ZWQgb2Zmc2V0KS4gU28gY3JlYXRlXG4gICAgICAgICAgICAvLyBhIG5vdyB2ZXJzaW9uIG9mIGN1cnJlbnQgY29uZmlnICh0YWtlIGxvY2FsL3V0Yy9vZmZzZXQgZmxhZ3MsIGFuZFxuICAgICAgICAgICAgLy8gY3JlYXRlIG5vdykuXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKFxuICAgICAgICAgICAgICAgIHcuR0csXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW1lFQVJdLFxuICAgICAgICAgICAgICAgIHdlZWtPZlllYXIoY3JlYXRlTG9jYWwoKSwgMSwgNCkueWVhclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LlcsIDEpO1xuICAgICAgICAgICAgd2Vla2RheSA9IGRlZmF1bHRzKHcuRSwgMSk7XG4gICAgICAgICAgICBpZiAod2Vla2RheSA8IDEgfHwgd2Vla2RheSA+IDcpIHtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG93ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG93O1xuICAgICAgICAgICAgZG95ID0gY29uZmlnLl9sb2NhbGUuX3dlZWsuZG95O1xuXG4gICAgICAgICAgICBjdXJXZWVrID0gd2Vla09mWWVhcihjcmVhdGVMb2NhbCgpLCBkb3csIGRveSk7XG5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5nZywgY29uZmlnLl9hW1lFQVJdLCBjdXJXZWVrLnllYXIpO1xuXG4gICAgICAgICAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgd2Vlay5cbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIGN1cldlZWsud2Vlayk7XG5cbiAgICAgICAgICAgIGlmICh3LmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIHdlZWtkYXkgLS0gbG93IGRheSBudW1iZXJzIGFyZSBjb25zaWRlcmVkIG5leHQgd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XG4gICAgICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCAwIHx8IHdlZWtkYXkgPiA2KSB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh3LmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIGxvY2FsIHdlZWtkYXkgLS0gY291bnRpbmcgc3RhcnRzIGZyb20gYmVnaW5uaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5lICsgZG93O1xuICAgICAgICAgICAgICAgIGlmICh3LmUgPCAwIHx8IHcuZSA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5uaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh3ZWVrIDwgMSB8fCB3ZWVrID4gd2Vla3NJblllYXIod2Vla1llYXIsIGRvdywgZG95KSkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla3MgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWtkYXlPdmVyZmxvdyAhPSBudWxsKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrZGF5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlbXAgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtZRUFSXSA9IHRlbXAueWVhcjtcbiAgICAgICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgSVNPIHN0YW5kYXJkXG4gICAgaG9va3MuSVNPXzg2MDEgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIGNvbnN0YW50IHRoYXQgcmVmZXJzIHRvIHRoZSBSRkMgMjgyMiBmb3JtXG4gICAgaG9va3MuUkZDXzI4MjIgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmdcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZykge1xuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xuICAgICAgICBpZiAoY29uZmlnLl9mID09PSBob29rcy5JU09fODYwMSkge1xuICAgICAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IGhvb2tzLlJGQ18yODIyKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy5fYSA9IFtdO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IHRydWU7XG5cbiAgICAgICAgLy8gVGhpcyBhcnJheSBpcyB1c2VkIHRvIG1ha2UgYSBEYXRlLCBlaXRoZXIgd2l0aCBgbmV3IERhdGVgIG9yIGBEYXRlLlVUQ2BcbiAgICAgICAgdmFyIHN0cmluZyA9ICcnICsgY29uZmlnLl9pLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHBhcnNlZElucHV0LFxuICAgICAgICAgICAgdG9rZW5zLFxuICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICBza2lwcGVkLFxuICAgICAgICAgICAgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggPSAwLFxuICAgICAgICAgICAgZXJhLFxuICAgICAgICAgICAgdG9rZW5MZW47XG5cbiAgICAgICAgdG9rZW5zID1cbiAgICAgICAgICAgIGV4cGFuZEZvcm1hdChjb25maWcuX2YsIGNvbmZpZy5fbG9jYWxlKS5tYXRjaChmb3JtYXR0aW5nVG9rZW5zKSB8fCBbXTtcbiAgICAgICAgdG9rZW5MZW4gPSB0b2tlbnMubGVuZ3RoO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5MZW47IGkrKykge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fFxuICAgICAgICAgICAgICAgIFtdKVswXTtcbiAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHNraXBwZWQgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSk7XG4gICAgICAgICAgICAgICAgaWYgKHNraXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRJbnB1dC5wdXNoKHNraXBwZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSArIHBhcnNlZElucHV0Lmxlbmd0aFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCArPSBwYXJzZWRJbnB1dC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkb24ndCBwYXJzZSBpZiBpdCdzIG5vdCBhIGtub3duIHRva2VuXG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgcGFyc2VkSW5wdXQsIGNvbmZpZyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCByZW1haW5pbmcgdW5wYXJzZWQgaW5wdXQgbGVuZ3RoIHRvIHRoZSBzdHJpbmdcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuY2hhcnNMZWZ0T3ZlciA9XG4gICAgICAgICAgICBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIF8xMmggZmxhZyBpZiBob3VyIGlzIDw9IDEyXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA8PSAxMiAmJlxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5wYXJzZWREYXRlUGFydHMgPSBjb25maWcuX2Euc2xpY2UoMCk7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLm1lcmlkaWVtID0gY29uZmlnLl9tZXJpZGllbTtcbiAgICAgICAgLy8gaGFuZGxlIG1lcmlkaWVtXG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IG1lcmlkaWVtRml4V3JhcChcbiAgICAgICAgICAgIGNvbmZpZy5fbG9jYWxlLFxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdLFxuICAgICAgICAgICAgY29uZmlnLl9tZXJpZGllbVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGhhbmRsZSBlcmFcbiAgICAgICAgZXJhID0gZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuZXJhO1xuICAgICAgICBpZiAoZXJhICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbWUVBUl0gPSBjb25maWcuX2xvY2FsZS5lcmFzQ29udmVydFllYXIoZXJhLCBjb25maWcuX2FbWUVBUl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgICAgIGNoZWNrT3ZlcmZsb3coY29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbUZpeFdyYXAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xuICAgICAgICB2YXIgaXNQbTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZS5tZXJpZGllbUhvdXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5tZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZS5pc1BNICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrXG4gICAgICAgICAgICBpc1BtID0gbG9jYWxlLmlzUE0obWVyaWRpZW0pO1xuICAgICAgICAgICAgaWYgKGlzUG0gJiYgaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNQbSAmJiBob3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCBzdXBwb3NlZCB0byBoYXBwZW5cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgYXJyYXkgb2YgZm9ybWF0IHN0cmluZ3NcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIHZhciB0ZW1wQ29uZmlnLFxuICAgICAgICAgICAgYmVzdE1vbWVudCxcbiAgICAgICAgICAgIHNjb3JlVG9CZWF0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSxcbiAgICAgICAgICAgIHZhbGlkRm9ybWF0Rm91bmQsXG4gICAgICAgICAgICBiZXN0Rm9ybWF0SXNWYWxpZCA9IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlnZkxlbiA9IGNvbmZpZy5fZi5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGNvbmZpZ2ZMZW4gPT09IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRGb3JtYXQgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoTmFOKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb25maWdmTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSA9IDA7XG4gICAgICAgICAgICB2YWxpZEZvcm1hdEZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB0ZW1wQ29uZmlnID0gY29weUNvbmZpZyh7fSwgY29uZmlnKTtcbiAgICAgICAgICAgIGlmIChjb25maWcuX3VzZVVUQyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGVtcENvbmZpZy5fdXNlVVRDID0gY29uZmlnLl91c2VVVEM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wQ29uZmlnLl9mID0gY29uZmlnLl9mW2ldO1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdCh0ZW1wQ29uZmlnKTtcblxuICAgICAgICAgICAgaWYgKGlzVmFsaWQodGVtcENvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB2YWxpZEZvcm1hdEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW55IGlucHV0IHRoYXQgd2FzIG5vdCBwYXJzZWQgYWRkIGEgcGVuYWx0eSBmb3IgdGhhdCBmb3JtYXRcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuY2hhcnNMZWZ0T3ZlcjtcblxuICAgICAgICAgICAgLy9vciB0b2tlbnNcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykudW51c2VkVG9rZW5zLmxlbmd0aCAqIDEwO1xuXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuc2NvcmUgPSBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgICAgIGlmICghYmVzdEZvcm1hdElzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNjb3JlIDwgc2NvcmVUb0JlYXQgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRGb3JtYXRGb3VuZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRvQmVhdCA9IGN1cnJlbnRTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZEZvcm1hdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXN0Rm9ybWF0SXNWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRvQmVhdCA9IGN1cnJlbnRTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSksXG4gICAgICAgICAgICBkYXlPckRhdGUgPSBpLmRheSA9PT0gdW5kZWZpbmVkID8gaS5kYXRlIDogaS5kYXk7XG4gICAgICAgIGNvbmZpZy5fYSA9IG1hcChcbiAgICAgICAgICAgIFtpLnllYXIsIGkubW9udGgsIGRheU9yRGF0ZSwgaS5ob3VyLCBpLm1pbnV0ZSwgaS5zZWNvbmQsIGkubWlsbGlzZWNvbmRdLFxuICAgICAgICAgICAgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogJiYgcGFyc2VJbnQob2JqLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUNvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdmFyIHJlcyA9IG5ldyBNb21lbnQoY2hlY2tPdmVyZmxvdyhwcmVwYXJlQ29uZmlnKGNvbmZpZykpKTtcbiAgICAgICAgaWYgKHJlcy5fbmV4dERheSkge1xuICAgICAgICAgICAgLy8gQWRkaW5nIGlzIHNtYXJ0IGVub3VnaCBhcm91bmQgRFNUXG4gICAgICAgICAgICByZXMuYWRkKDEsICdkJyk7XG4gICAgICAgICAgICByZXMuX25leHREYXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBhcmVDb25maWcoY29uZmlnKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGNvbmZpZy5fZjtcblxuICAgICAgICBjb25maWcuX2xvY2FsZSA9IGNvbmZpZy5fbG9jYWxlIHx8IGdldExvY2FsZShjb25maWcuX2wpO1xuXG4gICAgICAgIGlmIChpbnB1dCA9PT0gbnVsbCB8fCAoZm9ybWF0ID09PSB1bmRlZmluZWQgJiYgaW5wdXQgPT09ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWQoeyBudWxsSW5wdXQ6IHRydWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZmlnLl9pID0gaW5wdXQgPSBjb25maWcuX2xvY2FsZS5wcmVwYXJzZShpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNb21lbnQoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gaW5wdXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkKGNvbmZpZykpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShob29rcy5ub3coKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQudmFsdWVPZigpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nKGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYSA9IG1hcChpbnB1dC5zbGljZSgwKSwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tT2JqZWN0KGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOdW1iZXIoaW5wdXQpKSB7XG4gICAgICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsT3JVVEMoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGlzVVRDKSB7XG4gICAgICAgIHZhciBjID0ge307XG5cbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gdHJ1ZSB8fCBmb3JtYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzdHJpY3QgPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9jYWxlID09PSB0cnVlIHx8IGxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHN0cmljdCA9IGxvY2FsZTtcbiAgICAgICAgICAgIGxvY2FsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChpc09iamVjdChpbnB1dCkgJiYgaXNPYmplY3RFbXB0eShpbnB1dCkpIHx8XG4gICAgICAgICAgICAoaXNBcnJheShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID09PSAwKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlucHV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIG9iamVjdCBjb25zdHJ1Y3Rpb24gbXVzdCBiZSBkb25lIHRoaXMgd2F5LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQyM1xuICAgICAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xuICAgICAgICBjLl91c2VVVEMgPSBjLl9pc1VUQyA9IGlzVVRDO1xuICAgICAgICBjLl9sID0gbG9jYWxlO1xuICAgICAgICBjLl9pID0gaW5wdXQ7XG4gICAgICAgIGMuX2YgPSBmb3JtYXQ7XG4gICAgICAgIGMuX3N0cmljdCA9IHN0cmljdDtcblxuICAgICAgICByZXR1cm4gY3JlYXRlRnJvbUNvbmZpZyhjKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhbChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHZhciBwcm90b3R5cGVNaW4gPSBkZXByZWNhdGUoXG4gICAgICAgICAgICAnbW9tZW50KCkubWluIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvbWluLW1heC8nLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPCB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBwcm90b3R5cGVNYXggPSBkZXByZWNhdGUoXG4gICAgICAgICAgICAnbW9tZW50KCkubWF4IGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWluIGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvbWluLW1heC8nLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPiB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgLy8gUGljayBhIG1vbWVudCBtIGZyb20gbW9tZW50cyBzbyB0aGF0IG1bZm5dKG90aGVyKSBpcyB0cnVlIGZvciBhbGxcbiAgICAvLyBvdGhlci4gVGhpcyByZWxpZXMgb24gdGhlIGZ1bmN0aW9uIGZuIHRvIGJlIHRyYW5zaXRpdmUuXG4gICAgLy9cbiAgICAvLyBtb21lbnRzIHNob3VsZCBlaXRoZXIgYmUgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMgb3IgYW4gYXJyYXksIHdob3NlXG4gICAgLy8gZmlyc3QgZWxlbWVudCBpcyBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cy5cbiAgICBmdW5jdGlvbiBwaWNrQnkoZm4sIG1vbWVudHMpIHtcbiAgICAgICAgdmFyIHJlcywgaTtcbiAgICAgICAgaWYgKG1vbWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobW9tZW50c1swXSkpIHtcbiAgICAgICAgICAgIG1vbWVudHMgPSBtb21lbnRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbW9tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVMb2NhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcyA9IG1vbWVudHNbMF07XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBtb21lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoIW1vbWVudHNbaV0uaXNWYWxpZCgpIHx8IG1vbWVudHNbaV1bZm5dKHJlcykpIHtcbiAgICAgICAgICAgICAgICByZXMgPSBtb21lbnRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIFtdLnNvcnQgaW5zdGVhZD9cbiAgICBmdW5jdGlvbiBtaW4oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQmVmb3JlJywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF4KCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0FmdGVyJywgYXJncyk7XG4gICAgfVxuXG4gICAgdmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93ID8gRGF0ZS5ub3coKSA6ICtuZXcgRGF0ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgb3JkZXJpbmcgPSBbXG4gICAgICAgICd5ZWFyJyxcbiAgICAgICAgJ3F1YXJ0ZXInLFxuICAgICAgICAnbW9udGgnLFxuICAgICAgICAnd2VlaycsXG4gICAgICAgICdkYXknLFxuICAgICAgICAnaG91cicsXG4gICAgICAgICdtaW51dGUnLFxuICAgICAgICAnc2Vjb25kJyxcbiAgICAgICAgJ21pbGxpc2Vjb25kJyxcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gaXNEdXJhdGlvblZhbGlkKG0pIHtcbiAgICAgICAgdmFyIGtleSxcbiAgICAgICAgICAgIHVuaXRIYXNEZWNpbWFsID0gZmFsc2UsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgb3JkZXJMZW4gPSBvcmRlcmluZy5sZW5ndGg7XG4gICAgICAgIGZvciAoa2V5IGluIG0pIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBoYXNPd25Qcm9wKG0sIGtleSkgJiZcbiAgICAgICAgICAgICAgICAhKFxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mLmNhbGwob3JkZXJpbmcsIGtleSkgIT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIChtW2tleV0gPT0gbnVsbCB8fCAhaXNOYU4obVtrZXldKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3JkZXJMZW47ICsraSkge1xuICAgICAgICAgICAgaWYgKG1bb3JkZXJpbmdbaV1dKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVuaXRIYXNEZWNpbWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gb25seSBhbGxvdyBub24taW50ZWdlcnMgZm9yIHNtYWxsZXN0IHVuaXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlRmxvYXQobVtvcmRlcmluZ1tpXV0pICE9PSB0b0ludChtW29yZGVyaW5nW2ldXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5pdEhhc0RlY2ltYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQkMSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmFsaWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSW52YWxpZCQxKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oTmFOKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBEdXJhdGlvbihkdXJhdGlvbikge1xuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoZHVyYXRpb24pLFxuICAgICAgICAgICAgeWVhcnMgPSBub3JtYWxpemVkSW5wdXQueWVhciB8fCAwLFxuICAgICAgICAgICAgcXVhcnRlcnMgPSBub3JtYWxpemVkSW5wdXQucXVhcnRlciB8fCAwLFxuICAgICAgICAgICAgbW9udGhzID0gbm9ybWFsaXplZElucHV0Lm1vbnRoIHx8IDAsXG4gICAgICAgICAgICB3ZWVrcyA9IG5vcm1hbGl6ZWRJbnB1dC53ZWVrIHx8IG5vcm1hbGl6ZWRJbnB1dC5pc29XZWVrIHx8IDAsXG4gICAgICAgICAgICBkYXlzID0gbm9ybWFsaXplZElucHV0LmRheSB8fCAwLFxuICAgICAgICAgICAgaG91cnMgPSBub3JtYWxpemVkSW5wdXQuaG91ciB8fCAwLFxuICAgICAgICAgICAgbWludXRlcyA9IG5vcm1hbGl6ZWRJbnB1dC5taW51dGUgfHwgMCxcbiAgICAgICAgICAgIHNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQuc2Vjb25kIHx8IDAsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQubWlsbGlzZWNvbmQgfHwgMDtcblxuICAgICAgICB0aGlzLl9pc1ZhbGlkID0gaXNEdXJhdGlvblZhbGlkKG5vcm1hbGl6ZWRJbnB1dCk7XG5cbiAgICAgICAgLy8gcmVwcmVzZW50YXRpb24gZm9yIGRhdGVBZGRSZW1vdmVcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID1cbiAgICAgICAgICAgICttaWxsaXNlY29uZHMgK1xuICAgICAgICAgICAgc2Vjb25kcyAqIDFlMyArIC8vIDEwMDBcbiAgICAgICAgICAgIG1pbnV0ZXMgKiA2ZTQgKyAvLyAxMDAwICogNjBcbiAgICAgICAgICAgIGhvdXJzICogMTAwMCAqIDYwICogNjA7IC8vdXNpbmcgMTAwMCAqIDYwICogNjAgaW5zdGVhZCBvZiAzNmU1IHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9ycyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjk3OFxuICAgICAgICAvLyBCZWNhdXNlIG9mIGRhdGVBZGRSZW1vdmUgdHJlYXRzIDI0IGhvdXJzIGFzIGRpZmZlcmVudCBmcm9tIGFcbiAgICAgICAgLy8gZGF5IHdoZW4gd29ya2luZyBhcm91bmQgRFNULCB3ZSBuZWVkIHRvIHN0b3JlIHRoZW0gc2VwYXJhdGVseVxuICAgICAgICB0aGlzLl9kYXlzID0gK2RheXMgKyB3ZWVrcyAqIDc7XG4gICAgICAgIC8vIEl0IGlzIGltcG9zc2libGUgdG8gdHJhbnNsYXRlIG1vbnRocyBpbnRvIGRheXMgd2l0aG91dCBrbm93aW5nXG4gICAgICAgIC8vIHdoaWNoIG1vbnRocyB5b3UgYXJlIGFyZSB0YWxraW5nIGFib3V0LCBzbyB3ZSBoYXZlIHRvIHN0b3JlXG4gICAgICAgIC8vIGl0IHNlcGFyYXRlbHkuXG4gICAgICAgIHRoaXMuX21vbnRocyA9ICttb250aHMgKyBxdWFydGVycyAqIDMgKyB5ZWFycyAqIDEyO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcblxuICAgICAgICB0aGlzLl9sb2NhbGUgPSBnZXRMb2NhbGUoKTtcblxuICAgICAgICB0aGlzLl9idWJibGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0R1cmF0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRHVyYXRpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWJzUm91bmQobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgtMSAqIG51bWJlcikgKiAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb21wYXJlIHR3byBhcnJheXMsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRpZmZlcmVuY2VzXG4gICAgZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhcnJheTEsIGFycmF5MiwgZG9udENvbnZlcnQpIHtcbiAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgpLFxuICAgICAgICAgICAgbGVuZ3RoRGlmZiA9IE1hdGguYWJzKGFycmF5MS5sZW5ndGggLSBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgICAgIGRpZmZzID0gMCxcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChkb250Q29udmVydCAmJiBhcnJheTFbaV0gIT09IGFycmF5MltpXSkgfHxcbiAgICAgICAgICAgICAgICAoIWRvbnRDb252ZXJ0ICYmIHRvSW50KGFycmF5MVtpXSkgIT09IHRvSW50KGFycmF5MltpXSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBkaWZmcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaWZmcyArIGxlbmd0aERpZmY7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgZnVuY3Rpb24gb2Zmc2V0KHRva2VuLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnV0Y09mZnNldCgpLFxuICAgICAgICAgICAgICAgIHNpZ24gPSAnKyc7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgICAgICAgICAgc2lnbiA9ICctJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgc2lnbiArXG4gICAgICAgICAgICAgICAgemVyb0ZpbGwofn4ob2Zmc2V0IC8gNjApLCAyKSArXG4gICAgICAgICAgICAgICAgc2VwYXJhdG9yICtcbiAgICAgICAgICAgICAgICB6ZXJvRmlsbCh+fm9mZnNldCAlIDYwLCAyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb2Zmc2V0KCdaJywgJzonKTtcbiAgICBvZmZzZXQoJ1paJywgJycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignWicsIG1hdGNoU2hvcnRPZmZzZXQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1paJywgbWF0Y2hTaG9ydE9mZnNldCk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ1onLCAnWlonXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fdXNlVVRDID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnLl90em0gPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIHRpbWV6b25lIGNodW5rZXJcbiAgICAvLyAnKzEwOjAwJyA+IFsnMTAnLCAgJzAwJ11cbiAgICAvLyAnLTE1MzAnICA+IFsnLTE1JywgJzMwJ11cbiAgICB2YXIgY2h1bmtPZmZzZXQgPSAvKFtcXCtcXC1dfFxcZFxcZCkvZ2k7XG5cbiAgICBmdW5jdGlvbiBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoZXIsIHN0cmluZykge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IChzdHJpbmcgfHwgJycpLm1hdGNoKG1hdGNoZXIpLFxuICAgICAgICAgICAgY2h1bmssXG4gICAgICAgICAgICBwYXJ0cyxcbiAgICAgICAgICAgIG1pbnV0ZXM7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY2h1bmsgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgICAgIHBhcnRzID0gKGNodW5rICsgJycpLm1hdGNoKGNodW5rT2Zmc2V0KSB8fCBbJy0nLCAwLCAwXTtcbiAgICAgICAgbWludXRlcyA9ICsocGFydHNbMV0gKiA2MCkgKyB0b0ludChwYXJ0c1syXSk7XG5cbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMgPT09IDAgPyAwIDogcGFydHNbMF0gPT09ICcrJyA/IG1pbnV0ZXMgOiAtbWludXRlcztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBtb21lbnQgZnJvbSBpbnB1dCwgdGhhdCBpcyBsb2NhbC91dGMvem9uZSBlcXVpdmFsZW50IHRvIG1vZGVsLlxuICAgIGZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcbiAgICAgICAgdmFyIHJlcywgZGlmZjtcbiAgICAgICAgaWYgKG1vZGVsLl9pc1VUQykge1xuICAgICAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcbiAgICAgICAgICAgIGRpZmYgPVxuICAgICAgICAgICAgICAgIChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KVxuICAgICAgICAgICAgICAgICAgICA/IGlucHV0LnZhbHVlT2YoKVxuICAgICAgICAgICAgICAgICAgICA6IGNyZWF0ZUxvY2FsKGlucHV0KS52YWx1ZU9mKCkpIC0gcmVzLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIC8vIFVzZSBsb3ctbGV2ZWwgYXBpLCBiZWNhdXNlIHRoaXMgZm4gaXMgbG93LWxldmVsIGFwaS5cbiAgICAgICAgICAgIHJlcy5fZC5zZXRUaW1lKHJlcy5fZC52YWx1ZU9mKCkgKyBkaWZmKTtcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlT2Zmc2V0KG0pIHtcbiAgICAgICAgLy8gT24gRmlyZWZveC4yNCBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgYSBmbG9hdGluZyBwb2ludC5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvcHVsbC8xODcxXG4gICAgICAgIHJldHVybiAtTWF0aC5yb3VuZChtLl9kLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xuICAgIH1cblxuICAgIC8vIEhPT0tTXG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIGEgbW9tZW50IGlzIG11dGF0ZWQuXG4gICAgLy8gSXQgaXMgaW50ZW5kZWQgdG8ga2VlcCB0aGUgb2Zmc2V0IGluIHN5bmMgd2l0aCB0aGUgdGltZXpvbmUuXG4gICAgaG9va3MudXBkYXRlT2Zmc2V0ID0gZnVuY3Rpb24gKCkge307XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICAvLyBrZWVwTG9jYWxUaW1lID0gdHJ1ZSBtZWFucyBvbmx5IGNoYW5nZSB0aGUgdGltZXpvbmUsIHdpdGhvdXRcbiAgICAvLyBhZmZlY3RpbmcgdGhlIGxvY2FsIGhvdXIuIFNvIDU6MzE6MjYgKzAzMDAgLS1bdXRjT2Zmc2V0KDIsIHRydWUpXS0tPlxuICAgIC8vIDU6MzE6MjYgKzAyMDAgSXQgaXMgcG9zc2libGUgdGhhdCA1OjMxOjI2IGRvZXNuJ3QgZXhpc3Qgd2l0aCBvZmZzZXRcbiAgICAvLyArMDIwMCwgc28gd2UgYWRqdXN0IHRoZSB0aW1lIGFzIG5lZWRlZCwgdG8gYmUgdmFsaWQuXG4gICAgLy9cbiAgICAvLyBLZWVwaW5nIHRoZSB0aW1lIGFjdHVhbGx5IGFkZHMvc3VidHJhY3RzIChvbmUgaG91cilcbiAgICAvLyBmcm9tIHRoZSBhY3R1YWwgcmVwcmVzZW50ZWQgdGltZS4gVGhhdCBpcyB3aHkgd2UgY2FsbCB1cGRhdGVPZmZzZXRcbiAgICAvLyBhIHNlY29uZCB0aW1lLiBJbiBjYXNlIGl0IHdhbnRzIHVzIHRvIGNoYW5nZSB0aGUgb2Zmc2V0IGFnYWluXG4gICAgLy8gX2NoYW5nZUluUHJvZ3Jlc3MgPT0gdHJ1ZSBjYXNlLCB0aGVuIHdlIGhhdmUgdG8gYWRqdXN0LCBiZWNhdXNlXG4gICAgLy8gdGhlcmUgaXMgbm8gc3VjaCB0aW1lIGluIHRoZSBnaXZlbiB0aW1lem9uZS5cbiAgICBmdW5jdGlvbiBnZXRTZXRPZmZzZXQoaW5wdXQsIGtlZXBMb2NhbFRpbWUsIGtlZXBNaW51dGVzKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgMCxcbiAgICAgICAgICAgIGxvY2FsQWRqdXN0O1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhpbnB1dCkgPCAxNiAmJiAha2VlcE1pbnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0ICogNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzVVRDICYmIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEFkanVzdCA9IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBpbnB1dDtcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChsb2NhbEFkanVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobG9jYWxBZGp1c3QsICdtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmICgha2VlcExvY2FsVGltZSB8fCB0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFN1YnRyYWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUR1cmF0aW9uKGlucHV0IC0gb2Zmc2V0LCAnbScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/IG9mZnNldCA6IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRab25lKGlucHV0LCBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gLWlucHV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldChpbnB1dCwga2VlcExvY2FsVGltZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC10aGlzLnV0Y09mZnNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9VVEMoa2VlcExvY2FsVGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0VG9Mb2NhbChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VidHJhY3QoZ2V0RGF0ZU9mZnNldCh0aGlzKSwgJ20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3R6bSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCh0aGlzLl90em0sIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5faSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhciB0Wm9uZSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hPZmZzZXQsIHRoaXMuX2kpO1xuICAgICAgICAgICAgaWYgKHRab25lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnV0Y09mZnNldCh0Wm9uZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc0FsaWduZWRIb3VyT2Zmc2V0KGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dCA9IGlucHV0ID8gY3JlYXRlTG9jYWwoaW5wdXQpLnV0Y09mZnNldCgpIDogMDtcblxuICAgICAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgLSBpbnB1dCkgJSA2MCA9PT0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoMCkudXRjT2Zmc2V0KCkgfHxcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoNSkudXRjT2Zmc2V0KClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQoKSB7XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5faXNEU1RTaGlmdGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0ge30sXG4gICAgICAgICAgICBvdGhlcjtcblxuICAgICAgICBjb3B5Q29uZmlnKGMsIHRoaXMpO1xuICAgICAgICBjID0gcHJlcGFyZUNvbmZpZyhjKTtcblxuICAgICAgICBpZiAoYy5fYSkge1xuICAgICAgICAgICAgb3RoZXIgPSBjLl9pc1VUQyA/IGNyZWF0ZVVUQyhjLl9hKSA6IGNyZWF0ZUxvY2FsKGMuX2EpO1xuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID1cbiAgICAgICAgICAgICAgICB0aGlzLmlzVmFsaWQoKSAmJiBjb21wYXJlQXJyYXlzKGMuX2EsIG90aGVyLnRvQXJyYXkoKSkgPiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTG9jYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/ICF0aGlzLl9pc1VUQyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVXRjT2Zmc2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVXRjKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDAgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBU1AuTkVUIGpzb24gZGF0ZSBmb3JtYXQgcmVnZXhcbiAgICB2YXIgYXNwTmV0UmVnZXggPSAvXigtfFxcKyk/KD86KFxcZCopWy4gXSk/KFxcZCspOihcXGQrKSg/OjooXFxkKykoXFwuXFxkKik/KT8kLyxcbiAgICAgICAgLy8gZnJvbSBodHRwOi8vZG9jcy5jbG9zdXJlLWxpYnJhcnkuZ29vZ2xlY29kZS5jb20vZ2l0L2Nsb3N1cmVfZ29vZ19kYXRlX2RhdGUuanMuc291cmNlLmh0bWxcbiAgICAgICAgLy8gc29tZXdoYXQgbW9yZSBpbiBsaW5lIHdpdGggNC40LjMuMiAyMDA0IHNwZWMsIGJ1dCBhbGxvd3MgZGVjaW1hbCBhbnl3aGVyZVxuICAgICAgICAvLyBhbmQgZnVydGhlciBtb2RpZmllZCB0byBhbGxvdyBmb3Igc3RyaW5ncyBjb250YWluaW5nIGJvdGggd2VlayBhbmQgZGF5XG4gICAgICAgIGlzb1JlZ2V4ID1cbiAgICAgICAgICAgIC9eKC18XFwrKT9QKD86KFstK10/WzAtOSwuXSopWSk/KD86KFstK10/WzAtOSwuXSopTSk/KD86KFstK10/WzAtOSwuXSopVyk/KD86KFstK10/WzAtOSwuXSopRCk/KD86VCg/OihbLStdP1swLTksLl0qKUgpPyg/OihbLStdP1swLTksLl0qKU0pPyg/OihbLStdP1swLTksLl0qKVMpPyk/JC87XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVEdXJhdGlvbihpbnB1dCwga2V5KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGlucHV0LFxuICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYWdhaW5zdCByZWdleHAgaXMgZXhwZW5zaXZlLCBkbyBpdCBvbiBkZW1hbmRcbiAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgICAgIHNpZ24sXG4gICAgICAgICAgICByZXQsXG4gICAgICAgICAgICBkaWZmUmVzO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbXM6IGlucHV0Ll9taWxsaXNlY29uZHMsXG4gICAgICAgICAgICAgICAgZDogaW5wdXQuX2RheXMsXG4gICAgICAgICAgICAgICAgTTogaW5wdXQuX21vbnRocyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOdW1iZXIoaW5wdXQpIHx8ICFpc05hTigraW5wdXQpKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uW2tleV0gPSAraW5wdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9ICtpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgobWF0Y2ggPSBhc3BOZXRSZWdleC5leGVjKGlucHV0KSkpIHtcbiAgICAgICAgICAgIHNpZ24gPSBtYXRjaFsxXSA9PT0gJy0nID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICBkOiB0b0ludChtYXRjaFtEQVRFXSkgKiBzaWduLFxuICAgICAgICAgICAgICAgIGg6IHRvSW50KG1hdGNoW0hPVVJdKSAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbTogdG9JbnQobWF0Y2hbTUlOVVRFXSkgKiBzaWduLFxuICAgICAgICAgICAgICAgIHM6IHRvSW50KG1hdGNoW1NFQ09ORF0pICogc2lnbixcbiAgICAgICAgICAgICAgICBtczogdG9JbnQoYWJzUm91bmQobWF0Y2hbTUlMTElTRUNPTkRdICogMTAwMCkpICogc2lnbiwgLy8gdGhlIG1pbGxpc2Vjb25kIGRlY2ltYWwgcG9pbnQgaXMgaW5jbHVkZWQgaW4gdGhlIG1hdGNoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKChtYXRjaCA9IGlzb1JlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IG1hdGNoWzFdID09PSAnLScgPyAtMSA6IDE7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB5OiBwYXJzZUlzbyhtYXRjaFsyXSwgc2lnbiksXG4gICAgICAgICAgICAgICAgTTogcGFyc2VJc28obWF0Y2hbM10sIHNpZ24pLFxuICAgICAgICAgICAgICAgIHc6IHBhcnNlSXNvKG1hdGNoWzRdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBkOiBwYXJzZUlzbyhtYXRjaFs1XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgaDogcGFyc2VJc28obWF0Y2hbNl0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIG06IHBhcnNlSXNvKG1hdGNoWzddLCBzaWduKSxcbiAgICAgICAgICAgICAgICBzOiBwYXJzZUlzbyhtYXRjaFs4XSwgc2lnbiksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgZHVyYXRpb24gPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAoJ2Zyb20nIGluIGR1cmF0aW9uIHx8ICd0bycgaW4gZHVyYXRpb24pXG4gICAgICAgICkge1xuICAgICAgICAgICAgZGlmZlJlcyA9IG1vbWVudHNEaWZmZXJlbmNlKFxuICAgICAgICAgICAgICAgIGNyZWF0ZUxvY2FsKGR1cmF0aW9uLmZyb20pLFxuICAgICAgICAgICAgICAgIGNyZWF0ZUxvY2FsKGR1cmF0aW9uLnRvKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGR1cmF0aW9uLm1zID0gZGlmZlJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICBkdXJhdGlvbi5NID0gZGlmZlJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSAmJiBoYXNPd25Qcm9wKGlucHV0LCAnX2xvY2FsZScpKSB7XG4gICAgICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19pc1ZhbGlkJykpIHtcbiAgICAgICAgICAgIHJldC5faXNWYWxpZCA9IGlucHV0Ll9pc1ZhbGlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBjcmVhdGVEdXJhdGlvbi5mbiA9IER1cmF0aW9uLnByb3RvdHlwZTtcbiAgICBjcmVhdGVEdXJhdGlvbi5pbnZhbGlkID0gY3JlYXRlSW52YWxpZCQxO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VJc28oaW5wLCBzaWduKSB7XG4gICAgICAgIC8vIFdlJ2Qgbm9ybWFsbHkgdXNlIH5+aW5wIGZvciB0aGlzLCBidXQgdW5mb3J0dW5hdGVseSBpdCBhbHNvXG4gICAgICAgIC8vIGNvbnZlcnRzIGZsb2F0cyB0byBpbnRzLlxuICAgICAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXG4gICAgICAgIHZhciByZXMgPSBpbnAgJiYgcGFyc2VGbG9hdChpbnAucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAvLyBhcHBseSBzaWduIHdoaWxlIHdlJ3JlIGF0IGl0XG4gICAgICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgICAgIHZhciByZXMgPSB7fTtcblxuICAgICAgICByZXMubW9udGhzID1cbiAgICAgICAgICAgIG90aGVyLm1vbnRoKCkgLSBiYXNlLm1vbnRoKCkgKyAob3RoZXIueWVhcigpIC0gYmFzZS55ZWFyKCkpICogMTI7XG4gICAgICAgIGlmIChiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykuaXNBZnRlcihvdGhlcikpIHtcbiAgICAgICAgICAgIC0tcmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSArb3RoZXIgLSArYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpO1xuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKCEoYmFzZS5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWlsbGlzZWNvbmRzOiAwLCBtb250aHM6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcbiAgICAgICAgaWYgKGJhc2UuaXNCZWZvcmUob3RoZXIpKSB7XG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2Uob3RoZXIsIGJhc2UpO1xuICAgICAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9IC1yZXMubWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiByZW1vdmUgJ25hbWUnIGFyZyBhZnRlciBkZXByZWNhdGlvbiBpcyByZW1vdmVkXG4gICAgZnVuY3Rpb24gY3JlYXRlQWRkZXIoZGlyZWN0aW9uLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBwZXJpb2QpIHtcbiAgICAgICAgICAgIHZhciBkdXIsIHRtcDtcbiAgICAgICAgICAgIC8vaW52ZXJ0IHRoZSBhcmd1bWVudHMsIGJ1dCBjb21wbGFpbiBhYm91dCBpdFxuICAgICAgICAgICAgaWYgKHBlcmlvZCAhPT0gbnVsbCAmJiAhaXNOYU4oK3BlcmlvZCkpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoXG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdtb21lbnQoKS4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyhwZXJpb2QsIG51bWJlcikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBtb21lbnQoKS4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyhudW1iZXIsIHBlcmlvZCkuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1NlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2FkZC1pbnZlcnRlZC1wYXJhbS8gZm9yIG1vcmUgaW5mby4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0bXAgPSB2YWw7XG4gICAgICAgICAgICAgICAgdmFsID0gcGVyaW9kO1xuICAgICAgICAgICAgICAgIHBlcmlvZCA9IHRtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZHVyID0gY3JlYXRlRHVyYXRpb24odmFsLCBwZXJpb2QpO1xuICAgICAgICAgICAgYWRkU3VidHJhY3QodGhpcywgZHVyLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3VidHJhY3QobW9tLCBkdXJhdGlvbiwgaXNBZGRpbmcsIHVwZGF0ZU9mZnNldCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIGRheXMgPSBhYnNSb3VuZChkdXJhdGlvbi5fZGF5cyksXG4gICAgICAgICAgICBtb250aHMgPSBhYnNSb3VuZChkdXJhdGlvbi5fbW9udGhzKTtcblxuICAgICAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIC8vIE5vIG9wXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVPZmZzZXQgPSB1cGRhdGVPZmZzZXQgPT0gbnVsbCA/IHRydWUgOiB1cGRhdGVPZmZzZXQ7XG5cbiAgICAgICAgaWYgKG1vbnRocykge1xuICAgICAgICAgICAgc2V0TW9udGgobW9tLCBnZXQobW9tLCAnTW9udGgnKSArIG1vbnRocyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgc2V0JDEobW9tLCAnRGF0ZScsIGdldChtb20sICdEYXRlJykgKyBkYXlzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgICAgIG1vbS5fZC5zZXRUaW1lKG1vbS5fZC52YWx1ZU9mKCkgKyBtaWxsaXNlY29uZHMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZU9mZnNldCkge1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KG1vbSwgZGF5cyB8fCBtb250aHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFkZCA9IGNyZWF0ZUFkZGVyKDEsICdhZGQnKSxcbiAgICAgICAgc3VidHJhY3QgPSBjcmVhdGVBZGRlcigtMSwgJ3N1YnRyYWN0Jyk7XG5cbiAgICBmdW5jdGlvbiBpc1N0cmluZyhpbnB1dCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyB8fCBpbnB1dCBpbnN0YW5jZW9mIFN0cmluZztcbiAgICB9XG5cbiAgICAvLyB0eXBlIE1vbWVudElucHV0ID0gTW9tZW50IHwgRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IChudW1iZXIgfCBzdHJpbmcpW10gfCBNb21lbnRJbnB1dE9iamVjdCB8IHZvaWQ7IC8vIG51bGwgfCB1bmRlZmluZWRcbiAgICBmdW5jdGlvbiBpc01vbWVudElucHV0KGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpc01vbWVudChpbnB1dCkgfHxcbiAgICAgICAgICAgIGlzRGF0ZShpbnB1dCkgfHxcbiAgICAgICAgICAgIGlzU3RyaW5nKGlucHV0KSB8fFxuICAgICAgICAgICAgaXNOdW1iZXIoaW5wdXQpIHx8XG4gICAgICAgICAgICBpc051bWJlck9yU3RyaW5nQXJyYXkoaW5wdXQpIHx8XG4gICAgICAgICAgICBpc01vbWVudElucHV0T2JqZWN0KGlucHV0KSB8fFxuICAgICAgICAgICAgaW5wdXQgPT09IG51bGwgfHxcbiAgICAgICAgICAgIGlucHV0ID09PSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc01vbWVudElucHV0T2JqZWN0KGlucHV0KSB7XG4gICAgICAgIHZhciBvYmplY3RUZXN0ID0gaXNPYmplY3QoaW5wdXQpICYmICFpc09iamVjdEVtcHR5KGlucHV0KSxcbiAgICAgICAgICAgIHByb3BlcnR5VGVzdCA9IGZhbHNlLFxuICAgICAgICAgICAgcHJvcGVydGllcyA9IFtcbiAgICAgICAgICAgICAgICAneWVhcnMnLFxuICAgICAgICAgICAgICAgICd5ZWFyJyxcbiAgICAgICAgICAgICAgICAneScsXG4gICAgICAgICAgICAgICAgJ21vbnRocycsXG4gICAgICAgICAgICAgICAgJ21vbnRoJyxcbiAgICAgICAgICAgICAgICAnTScsXG4gICAgICAgICAgICAgICAgJ2RheXMnLFxuICAgICAgICAgICAgICAgICdkYXknLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnZGF0ZXMnLFxuICAgICAgICAgICAgICAgICdkYXRlJyxcbiAgICAgICAgICAgICAgICAnRCcsXG4gICAgICAgICAgICAgICAgJ2hvdXJzJyxcbiAgICAgICAgICAgICAgICAnaG91cicsXG4gICAgICAgICAgICAgICAgJ2gnLFxuICAgICAgICAgICAgICAgICdtaW51dGVzJyxcbiAgICAgICAgICAgICAgICAnbWludXRlJyxcbiAgICAgICAgICAgICAgICAnbScsXG4gICAgICAgICAgICAgICAgJ3NlY29uZHMnLFxuICAgICAgICAgICAgICAgICdzZWNvbmQnLFxuICAgICAgICAgICAgICAgICdzJyxcbiAgICAgICAgICAgICAgICAnbWlsbGlzZWNvbmRzJyxcbiAgICAgICAgICAgICAgICAnbWlsbGlzZWNvbmQnLFxuICAgICAgICAgICAgICAgICdtcycsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgcHJvcGVydHlMZW4gPSBwcm9wZXJ0aWVzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJvcGVydHlMZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgcHJvcGVydHlUZXN0ID0gcHJvcGVydHlUZXN0IHx8IGhhc093blByb3AoaW5wdXQsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3RUZXN0ICYmIHByb3BlcnR5VGVzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc051bWJlck9yU3RyaW5nQXJyYXkoaW5wdXQpIHtcbiAgICAgICAgdmFyIGFycmF5VGVzdCA9IGlzQXJyYXkoaW5wdXQpLFxuICAgICAgICAgICAgZGF0YVR5cGVUZXN0ID0gZmFsc2U7XG4gICAgICAgIGlmIChhcnJheVRlc3QpIHtcbiAgICAgICAgICAgIGRhdGFUeXBlVGVzdCA9XG4gICAgICAgICAgICAgICAgaW5wdXQuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNOdW1iZXIoaXRlbSkgJiYgaXNTdHJpbmcoaW5wdXQpO1xuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXlUZXN0ICYmIGRhdGFUeXBlVGVzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0NhbGVuZGFyU3BlYyhpbnB1dCkge1xuICAgICAgICB2YXIgb2JqZWN0VGVzdCA9IGlzT2JqZWN0KGlucHV0KSAmJiAhaXNPYmplY3RFbXB0eShpbnB1dCksXG4gICAgICAgICAgICBwcm9wZXJ0eVRlc3QgPSBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBbXG4gICAgICAgICAgICAgICAgJ3NhbWVEYXknLFxuICAgICAgICAgICAgICAgICduZXh0RGF5JyxcbiAgICAgICAgICAgICAgICAnbGFzdERheScsXG4gICAgICAgICAgICAgICAgJ25leHRXZWVrJyxcbiAgICAgICAgICAgICAgICAnbGFzdFdlZWsnLFxuICAgICAgICAgICAgICAgICdzYW1lRWxzZScsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHByb3BlcnR5O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICBwcm9wZXJ0eVRlc3QgPSBwcm9wZXJ0eVRlc3QgfHwgaGFzT3duUHJvcChpbnB1dCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdFRlc3QgJiYgcHJvcGVydHlUZXN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENhbGVuZGFyRm9ybWF0KG15TW9tZW50LCBub3cpIHtcbiAgICAgICAgdmFyIGRpZmYgPSBteU1vbWVudC5kaWZmKG5vdywgJ2RheXMnLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGRpZmYgPCAtNlxuICAgICAgICAgICAgPyAnc2FtZUVsc2UnXG4gICAgICAgICAgICA6IGRpZmYgPCAtMVxuICAgICAgICAgICAgPyAnbGFzdFdlZWsnXG4gICAgICAgICAgICA6IGRpZmYgPCAwXG4gICAgICAgICAgICA/ICdsYXN0RGF5J1xuICAgICAgICAgICAgOiBkaWZmIDwgMVxuICAgICAgICAgICAgPyAnc2FtZURheSdcbiAgICAgICAgICAgIDogZGlmZiA8IDJcbiAgICAgICAgICAgID8gJ25leHREYXknXG4gICAgICAgICAgICA6IGRpZmYgPCA3XG4gICAgICAgICAgICA/ICduZXh0V2VlaydcbiAgICAgICAgICAgIDogJ3NhbWVFbHNlJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxlbmRhciQxKHRpbWUsIGZvcm1hdHMpIHtcbiAgICAgICAgLy8gU3VwcG9ydCBmb3Igc2luZ2xlIHBhcmFtZXRlciwgZm9ybWF0cyBvbmx5IG92ZXJsb2FkIHRvIHRoZSBjYWxlbmRhciBmdW5jdGlvblxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcbiAgICAgICAgICAgICAgICB0aW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGZvcm1hdHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzTW9tZW50SW5wdXQoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAgICAgICAgIHRpbWUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgZm9ybWF0cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDYWxlbmRhclNwZWMoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHMgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgdGltZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBXZSB3YW50IHRvIGNvbXBhcmUgdGhlIHN0YXJ0IG9mIHRvZGF5LCB2cyB0aGlzLlxuICAgICAgICAvLyBHZXR0aW5nIHN0YXJ0LW9mLXRvZGF5IGRlcGVuZHMgb24gd2hldGhlciB3ZSdyZSBsb2NhbC91dGMvb2Zmc2V0IG9yIG5vdC5cbiAgICAgICAgdmFyIG5vdyA9IHRpbWUgfHwgY3JlYXRlTG9jYWwoKSxcbiAgICAgICAgICAgIHNvZCA9IGNsb25lV2l0aE9mZnNldChub3csIHRoaXMpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICAgICAgZm9ybWF0ID0gaG9va3MuY2FsZW5kYXJGb3JtYXQodGhpcywgc29kKSB8fCAnc2FtZUVsc2UnLFxuICAgICAgICAgICAgb3V0cHV0ID1cbiAgICAgICAgICAgICAgICBmb3JtYXRzICYmXG4gICAgICAgICAgICAgICAgKGlzRnVuY3Rpb24oZm9ybWF0c1tmb3JtYXRdKVxuICAgICAgICAgICAgICAgICAgICA/IGZvcm1hdHNbZm9ybWF0XS5jYWxsKHRoaXMsIG5vdylcbiAgICAgICAgICAgICAgICAgICAgOiBmb3JtYXRzW2Zvcm1hdF0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChcbiAgICAgICAgICAgIG91dHB1dCB8fCB0aGlzLmxvY2FsZURhdGEoKS5jYWxlbmRhcihmb3JtYXQsIHRoaXMsIGNyZWF0ZUxvY2FsKG5vdykpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTW9tZW50KHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQWZ0ZXIoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpIHx8ICdtaWxsaXNlY29uZCc7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID4gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxJbnB1dC52YWx1ZU9mKCkgPCB0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykudmFsdWVPZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCZWZvcmUoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpIHx8ICdtaWxsaXNlY29uZCc7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpIDwgbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKCkgPCBsb2NhbElucHV0LnZhbHVlT2YoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQmV0d2Vlbihmcm9tLCB0bywgdW5pdHMsIGluY2x1c2l2aXR5KSB7XG4gICAgICAgIHZhciBsb2NhbEZyb20gPSBpc01vbWVudChmcm9tKSA/IGZyb20gOiBjcmVhdGVMb2NhbChmcm9tKSxcbiAgICAgICAgICAgIGxvY2FsVG8gPSBpc01vbWVudCh0bykgPyB0byA6IGNyZWF0ZUxvY2FsKHRvKTtcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxGcm9tLmlzVmFsaWQoKSAmJiBsb2NhbFRvLmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpbmNsdXNpdml0eSA9IGluY2x1c2l2aXR5IHx8ICcoKSc7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAoaW5jbHVzaXZpdHlbMF0gPT09ICcoJ1xuICAgICAgICAgICAgICAgID8gdGhpcy5pc0FmdGVyKGxvY2FsRnJvbSwgdW5pdHMpXG4gICAgICAgICAgICAgICAgOiAhdGhpcy5pc0JlZm9yZShsb2NhbEZyb20sIHVuaXRzKSkgJiZcbiAgICAgICAgICAgIChpbmNsdXNpdml0eVsxXSA9PT0gJyknXG4gICAgICAgICAgICAgICAgPyB0aGlzLmlzQmVmb3JlKGxvY2FsVG8sIHVuaXRzKVxuICAgICAgICAgICAgICAgIDogIXRoaXMuaXNBZnRlcihsb2NhbFRvLCB1bml0cykpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpLFxuICAgICAgICAgICAgaW5wdXRNcztcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cykgfHwgJ21pbGxpc2Vjb25kJztcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPT09IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRNcyA9IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICB0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykudmFsdWVPZigpIDw9IGlucHV0TXMgJiZcbiAgICAgICAgICAgICAgICBpbnB1dE1zIDw9IHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JBZnRlcihpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0FmdGVyKGlucHV0LCB1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JCZWZvcmUoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2FtZShpbnB1dCwgdW5pdHMpIHx8IHRoaXMuaXNCZWZvcmUoaW5wdXQsIHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWZmKGlucHV0LCB1bml0cywgYXNGbG9hdCkge1xuICAgICAgICB2YXIgdGhhdCwgem9uZURlbHRhLCBvdXRwdXQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQgPSBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIHRoaXMpO1xuXG4gICAgICAgIGlmICghdGhhdC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICB6b25lRGVsdGEgPSAodGhhdC51dGNPZmZzZXQoKSAtIHRoaXMudXRjT2Zmc2V0KCkpICogNmU0O1xuXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KSAvIDEyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KSAvIDM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9ICh0aGlzIC0gdGhhdCkgLyAxZTM7XG4gICAgICAgICAgICAgICAgYnJlYWs7IC8vIDEwMDBcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDZlNDtcbiAgICAgICAgICAgICAgICBicmVhazsgLy8gMTAwMCAqIDYwXG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodGhpcyAtIHRoYXQpIC8gMzZlNTtcbiAgICAgICAgICAgICAgICBicmVhazsgLy8gMTAwMCAqIDYwICogNjBcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRoaXMgLSB0aGF0IC0gem9uZURlbHRhKSAvIDg2NGU1O1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodGhpcyAtIHRoYXQgLSB6b25lRGVsdGEpIC8gNjA0OGU1O1xuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MCAqIDI0ICogNywgbmVnYXRlIGRzdFxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSB0aGlzIC0gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc0Zsb2F0ID8gb3V0cHV0IDogYWJzRmxvb3Iob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aERpZmYoYSwgYikge1xuICAgICAgICBpZiAoYS5kYXRlKCkgPCBiLmRhdGUoKSkge1xuICAgICAgICAgICAgLy8gZW5kLW9mLW1vbnRoIGNhbGN1bGF0aW9ucyB3b3JrIGNvcnJlY3Qgd2hlbiB0aGUgc3RhcnQgbW9udGggaGFzIG1vcmVcbiAgICAgICAgICAgIC8vIGRheXMgdGhhbiB0aGUgZW5kIG1vbnRoLlxuICAgICAgICAgICAgcmV0dXJuIC1tb250aERpZmYoYiwgYSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGlmZmVyZW5jZSBpbiBtb250aHNcbiAgICAgICAgdmFyIHdob2xlTW9udGhEaWZmID0gKGIueWVhcigpIC0gYS55ZWFyKCkpICogMTIgKyAoYi5tb250aCgpIC0gYS5tb250aCgpKSxcbiAgICAgICAgICAgIC8vIGIgaXMgaW4gKGFuY2hvciAtIDEgbW9udGgsIGFuY2hvciArIDEgbW9udGgpXG4gICAgICAgICAgICBhbmNob3IgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmLCAnbW9udGhzJyksXG4gICAgICAgICAgICBhbmNob3IyLFxuICAgICAgICAgICAgYWRqdXN0O1xuXG4gICAgICAgIGlmIChiIC0gYW5jaG9yIDwgMCkge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvciAtIGFuY2hvcjIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgKyAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jaGVjayBmb3IgbmVnYXRpdmUgemVybywgcmV0dXJuIHplcm8gaWYgbmVnYXRpdmUgemVyb1xuICAgICAgICByZXR1cm4gLSh3aG9sZU1vbnRoRGlmZiArIGFkanVzdCkgfHwgMDtcbiAgICB9XG5cbiAgICBob29rcy5kZWZhdWx0Rm9ybWF0ID0gJ1lZWVktTU0tRERUSEg6bW06c3NaJztcbiAgICBob29rcy5kZWZhdWx0Rm9ybWF0VXRjID0gJ1lZWVktTU0tRERUSEg6bW06c3NbWl0nO1xuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkubG9jYWxlKCdlbicpLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0lTT1N0cmluZyhrZWVwT2Zmc2V0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1dGMgPSBrZWVwT2Zmc2V0ICE9PSB0cnVlLFxuICAgICAgICAgICAgbSA9IHV0YyA/IHRoaXMuY2xvbmUoKS51dGMoKSA6IHRoaXM7XG4gICAgICAgIGlmIChtLnllYXIoKSA8IDAgfHwgbS55ZWFyKCkgPiA5OTk5KSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9tZW50KFxuICAgICAgICAgICAgICAgIG0sXG4gICAgICAgICAgICAgICAgdXRjXG4gICAgICAgICAgICAgICAgICAgID8gJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXSdcbiAgICAgICAgICAgICAgICAgICAgOiAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTWidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcpKSB7XG4gICAgICAgICAgICAvLyBuYXRpdmUgaW1wbGVtZW50YXRpb24gaXMgfjUweCBmYXN0ZXIsIHVzZSBpdCB3aGVuIHdlIGNhblxuICAgICAgICAgICAgaWYgKHV0Yykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSArIHRoaXMudXRjT2Zmc2V0KCkgKiA2MCAqIDEwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCdaJywgZm9ybWF0TW9tZW50KG0sICdaJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQoXG4gICAgICAgICAgICBtLFxuICAgICAgICAgICAgdXRjID8gJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nIDogJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NaJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGh1bWFuIHJlYWRhYmxlIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9tZW50IHRoYXQgY2FuXG4gICAgICogYWxzbyBiZSBldmFsdWF0ZWQgdG8gZ2V0IGEgbmV3IG1vbWVudCB3aGljaCBpcyB0aGUgc2FtZVxuICAgICAqXG4gICAgICogQGxpbmsgaHR0cHM6Ly9ub2RlanMub3JnL2Rpc3QvbGF0ZXN0L2RvY3MvYXBpL3V0aWwuaHRtbCN1dGlsX2N1c3RvbV9pbnNwZWN0X2Z1bmN0aW9uX29uX29iamVjdHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnNwZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21vbWVudC5pbnZhbGlkKC8qICcgKyB0aGlzLl9pICsgJyAqLyknO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmdW5jID0gJ21vbWVudCcsXG4gICAgICAgICAgICB6b25lID0gJycsXG4gICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgICB5ZWFyLFxuICAgICAgICAgICAgZGF0ZXRpbWUsXG4gICAgICAgICAgICBzdWZmaXg7XG4gICAgICAgIGlmICghdGhpcy5pc0xvY2FsKCkpIHtcbiAgICAgICAgICAgIGZ1bmMgPSB0aGlzLnV0Y09mZnNldCgpID09PSAwID8gJ21vbWVudC51dGMnIDogJ21vbWVudC5wYXJzZVpvbmUnO1xuICAgICAgICAgICAgem9uZSA9ICdaJztcbiAgICAgICAgfVxuICAgICAgICBwcmVmaXggPSAnWycgKyBmdW5jICsgJyhcIl0nO1xuICAgICAgICB5ZWFyID0gMCA8PSB0aGlzLnllYXIoKSAmJiB0aGlzLnllYXIoKSA8PSA5OTk5ID8gJ1lZWVknIDogJ1lZWVlZWSc7XG4gICAgICAgIGRhdGV0aW1lID0gJy1NTS1ERFtUXUhIOm1tOnNzLlNTUyc7XG4gICAgICAgIHN1ZmZpeCA9IHpvbmUgKyAnW1wiKV0nO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChwcmVmaXggKyB5ZWFyICsgZGF0ZXRpbWUgKyBzdWZmaXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdChpbnB1dFN0cmluZykge1xuICAgICAgICBpZiAoIWlucHV0U3RyaW5nKSB7XG4gICAgICAgICAgICBpbnB1dFN0cmluZyA9IHRoaXMuaXNVdGMoKVxuICAgICAgICAgICAgICAgID8gaG9va3MuZGVmYXVsdEZvcm1hdFV0Y1xuICAgICAgICAgICAgICAgIDogaG9va3MuZGVmYXVsdEZvcm1hdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0TW9tZW50KHRoaXMsIGlucHV0U3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8IGNyZWF0ZUxvY2FsKHRpbWUpLmlzVmFsaWQoKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oeyB0bzogdGhpcywgZnJvbTogdGltZSB9KVxuICAgICAgICAgICAgICAgIC5sb2NhbGUodGhpcy5sb2NhbGUoKSlcbiAgICAgICAgICAgICAgICAuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tTm93KHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbShjcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0byh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fCBjcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKHsgZnJvbTogdGhpcywgdG86IHRpbWUgfSlcbiAgICAgICAgICAgICAgICAubG9jYWxlKHRoaXMubG9jYWxlKCkpXG4gICAgICAgICAgICAgICAgLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9Ob3cod2l0aG91dFN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy50byhjcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICAvLyBJZiBwYXNzZWQgYSBsb2NhbGUga2V5LCBpdCB3aWxsIHNldCB0aGUgbG9jYWxlIGZvciB0aGlzXG4gICAgLy8gaW5zdGFuY2UuICBPdGhlcndpc2UsIGl0IHdpbGwgcmV0dXJuIHRoZSBsb2NhbGUgY29uZmlndXJhdGlvblxuICAgIC8vIHZhcmlhYmxlcyBmb3IgdGhpcyBpbnN0YW5jZS5cbiAgICBmdW5jdGlvbiBsb2NhbGUoa2V5KSB7XG4gICAgICAgIHZhciBuZXdMb2NhbGVEYXRhO1xuXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZS5fYWJicjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0xvY2FsZURhdGEgPSBnZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChuZXdMb2NhbGVEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbGUgPSBuZXdMb2NhbGVEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFuZyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCgpLmxhbmcoKSBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCB1c2UgbW9tZW50KCkubG9jYWxlRGF0YSgpIHRvIGdldCB0aGUgbGFuZ3VhZ2UgY29uZmlndXJhdGlvbi4gVXNlIG1vbWVudCgpLmxvY2FsZSgpIHRvIGNoYW5nZSBsYW5ndWFnZXMuJyxcbiAgICAgICAgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIHZhciBNU19QRVJfU0VDT05EID0gMTAwMCxcbiAgICAgICAgTVNfUEVSX01JTlVURSA9IDYwICogTVNfUEVSX1NFQ09ORCxcbiAgICAgICAgTVNfUEVSX0hPVVIgPSA2MCAqIE1TX1BFUl9NSU5VVEUsXG4gICAgICAgIE1TX1BFUl80MDBfWUVBUlMgPSAoMzY1ICogNDAwICsgOTcpICogMjQgKiBNU19QRVJfSE9VUjtcblxuICAgIC8vIGFjdHVhbCBtb2R1bG8gLSBoYW5kbGVzIG5lZ2F0aXZlIG51bWJlcnMgKGZvciBkYXRlcyBiZWZvcmUgMTk3MCk6XG4gICAgZnVuY3Rpb24gbW9kJDEoZGl2aWRlbmQsIGRpdmlzb3IpIHtcbiAgICAgICAgcmV0dXJuICgoZGl2aWRlbmQgJSBkaXZpc29yKSArIGRpdmlzb3IpICUgZGl2aXNvcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbFN0YXJ0T2ZEYXRlKHksIG0sIGQpIHtcbiAgICAgICAgLy8gdGhlIGRhdGUgY29uc3RydWN0b3IgcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCkge1xuICAgICAgICAgICAgLy8gcHJlc2VydmUgbGVhcCB5ZWFycyB1c2luZyBhIGZ1bGwgNDAwIHllYXIgY3ljbGUsIHRoZW4gcmVzZXRcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh5ICsgNDAwLCBtLCBkKSAtIE1TX1BFUl80MDBfWUVBUlM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeSwgbSwgZCkudmFsdWVPZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXRjU3RhcnRPZkRhdGUoeSwgbSwgZCkge1xuICAgICAgICAvLyBEYXRlLlVUQyByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZSBsZWFwIHllYXJzIHVzaW5nIGEgZnVsbCA0MDAgeWVhciBjeWNsZSwgdGhlbiByZXNldFxuICAgICAgICAgICAgcmV0dXJuIERhdGUuVVRDKHkgKyA0MDAsIG0sIGQpIC0gTVNfUEVSXzQwMF9ZRUFSUztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBEYXRlLlVUQyh5LCBtLCBkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0T2YodW5pdHMpIHtcbiAgICAgICAgdmFyIHRpbWUsIHN0YXJ0T2ZEYXRlO1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcgfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0T2ZEYXRlID0gdGhpcy5faXNVVEMgPyB1dGNTdGFydE9mRGF0ZSA6IGxvY2FsU3RhcnRPZkRhdGU7XG5cbiAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCAwLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBzdGFydE9mRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGgoKSAtICh0aGlzLm1vbnRoKCkgJSAzKSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUoKSAtIHRoaXMud2Vla2RheSgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2lzb1dlZWsnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBzdGFydE9mRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlKCkgLSAodGhpcy5pc29XZWVrZGF5KCkgLSAxKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCksIHRoaXMuZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lIC09IG1vZCQxKFxuICAgICAgICAgICAgICAgICAgICB0aW1lICsgKHRoaXMuX2lzVVRDID8gMCA6IHRoaXMudXRjT2Zmc2V0KCkgKiBNU19QRVJfTUlOVVRFKSxcbiAgICAgICAgICAgICAgICAgICAgTVNfUEVSX0hPVVJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSAtPSBtb2QkMSh0aW1lLCBNU19QRVJfTUlOVVRFKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHRoaXMuX2QudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgIHRpbWUgLT0gbW9kJDEodGltZSwgTVNfUEVSX1NFQ09ORCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kLnNldFRpbWUodGltZSk7XG4gICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kT2YodW5pdHMpIHtcbiAgICAgICAgdmFyIHRpbWUsIHN0YXJ0T2ZEYXRlO1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcgfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0T2ZEYXRlID0gdGhpcy5faXNVVEMgPyB1dGNTdGFydE9mRGF0ZSA6IGxvY2FsU3RhcnRPZkRhdGU7XG5cbiAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpICsgMSwgMCwgMSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgICAgICAgICAgdGltZSA9XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T2ZEYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55ZWFyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoKCkgLSAodGhpcy5tb250aCgpICUgMykgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICApIC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSArIDEsIDEpIC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgICAgIHRpbWUgPVxuICAgICAgICAgICAgICAgICAgICBzdGFydE9mRGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWVhcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlKCkgLSB0aGlzLndlZWtkYXkoKSArIDdcbiAgICAgICAgICAgICAgICAgICAgKSAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgICAgICAgICB0aW1lID1cbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPZkRhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZSgpIC0gKHRoaXMuaXNvV2Vla2RheSgpIC0gMSkgKyA3XG4gICAgICAgICAgICAgICAgICAgICkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBzdGFydE9mRGF0ZSh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpLCB0aGlzLmRhdGUoKSArIDEpIC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lICs9XG4gICAgICAgICAgICAgICAgICAgIE1TX1BFUl9IT1VSIC1cbiAgICAgICAgICAgICAgICAgICAgbW9kJDEoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lICsgKHRoaXMuX2lzVVRDID8gMCA6IHRoaXMudXRjT2Zmc2V0KCkgKiBNU19QRVJfTUlOVVRFKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE1TX1BFUl9IT1VSXG4gICAgICAgICAgICAgICAgICAgICkgLVxuICAgICAgICAgICAgICAgICAgICAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSArPSBNU19QRVJfTUlOVVRFIC0gbW9kJDEodGltZSwgTVNfUEVSX01JTlVURSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSArPSBNU19QRVJfU0VDT05EIC0gbW9kJDEodGltZSwgTVNfUEVSX1NFQ09ORCkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZC5zZXRUaW1lKHRpbWUpO1xuICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbHVlT2YoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kLnZhbHVlT2YoKSAtICh0aGlzLl9vZmZzZXQgfHwgMCkgKiA2MDAwMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bml4KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKSAvIDEwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0FycmF5KCkge1xuICAgICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBtLnllYXIoKSxcbiAgICAgICAgICAgIG0ubW9udGgoKSxcbiAgICAgICAgICAgIG0uZGF0ZSgpLFxuICAgICAgICAgICAgbS5ob3VyKCksXG4gICAgICAgICAgICBtLm1pbnV0ZSgpLFxuICAgICAgICAgICAgbS5zZWNvbmQoKSxcbiAgICAgICAgICAgIG0ubWlsbGlzZWNvbmQoKSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b09iamVjdCgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhcnM6IG0ueWVhcigpLFxuICAgICAgICAgICAgbW9udGhzOiBtLm1vbnRoKCksXG4gICAgICAgICAgICBkYXRlOiBtLmRhdGUoKSxcbiAgICAgICAgICAgIGhvdXJzOiBtLmhvdXJzKCksXG4gICAgICAgICAgICBtaW51dGVzOiBtLm1pbnV0ZXMoKSxcbiAgICAgICAgICAgIHNlY29uZHM6IG0uc2Vjb25kcygpLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiBtLm1pbGxpc2Vjb25kcygpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgLy8gbmV3IERhdGUoTmFOKS50b0pTT04oKSA9PT0gbnVsbFxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLnRvSVNPU3RyaW5nKCkgOiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQkMigpIHtcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2luZ0ZsYWdzKCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHt9LCBnZXRQYXJzaW5nRmxhZ3ModGhpcykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGludmFsaWRBdCgpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcnNpbmdGbGFncyh0aGlzKS5vdmVyZmxvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGlvbkRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dDogdGhpcy5faSxcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5fZixcbiAgICAgICAgICAgIGxvY2FsZTogdGhpcy5fbG9jYWxlLFxuICAgICAgICAgICAgaXNVVEM6IHRoaXMuX2lzVVRDLFxuICAgICAgICAgICAgc3RyaWN0OiB0aGlzLl9zdHJpY3QsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ04nLCAwLCAwLCAnZXJhQWJicicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdOTicsIDAsIDAsICdlcmFBYmJyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ05OTicsIDAsIDAsICdlcmFBYmJyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ05OTk4nLCAwLCAwLCAnZXJhTmFtZScpO1xuICAgIGFkZEZvcm1hdFRva2VuKCdOTk5OTicsIDAsIDAsICdlcmFOYXJyb3cnKTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCd5JywgWyd5JywgMV0sICd5bycsICdlcmFZZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3knLCBbJ3l5JywgMl0sIDAsICdlcmFZZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3knLCBbJ3l5eScsIDNdLCAwLCAnZXJhWWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKCd5JywgWyd5eXl5JywgNF0sIDAsICdlcmFZZWFyJyk7XG5cbiAgICBhZGRSZWdleFRva2VuKCdOJywgbWF0Y2hFcmFBYmJyKTtcbiAgICBhZGRSZWdleFRva2VuKCdOTicsIG1hdGNoRXJhQWJicik7XG4gICAgYWRkUmVnZXhUb2tlbignTk5OJywgbWF0Y2hFcmFBYmJyKTtcbiAgICBhZGRSZWdleFRva2VuKCdOTk5OJywgbWF0Y2hFcmFOYW1lKTtcbiAgICBhZGRSZWdleFRva2VuKCdOTk5OTicsIG1hdGNoRXJhTmFycm93KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oXG4gICAgICAgIFsnTicsICdOTicsICdOTk4nLCAnTk5OTicsICdOTk5OTiddLFxuICAgICAgICBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgICAgICB2YXIgZXJhID0gY29uZmlnLl9sb2NhbGUuZXJhc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAgICAgaWYgKGVyYSkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVyYSA9IGVyYTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZEVyYSA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3knLCBtYXRjaFVuc2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCd5eScsIG1hdGNoVW5zaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3l5eScsIG1hdGNoVW5zaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3l5eXknLCBtYXRjaFVuc2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCd5bycsIG1hdGNoRXJhWWVhck9yZGluYWwpO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ3knLCAneXknLCAneXl5JywgJ3l5eXknXSwgWUVBUik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ3lvJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICBpZiAoY29uZmlnLl9sb2NhbGUuX2VyYVllYXJPcmRpbmFsUmVnZXgpIHtcbiAgICAgICAgICAgIG1hdGNoID0gaW5wdXQubWF0Y2goY29uZmlnLl9sb2NhbGUuX2VyYVllYXJPcmRpbmFsUmVnZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fbG9jYWxlLmVyYVllYXJPcmRpbmFsUGFyc2UpIHtcbiAgICAgICAgICAgIGFycmF5W1lFQVJdID0gY29uZmlnLl9sb2NhbGUuZXJhWWVhck9yZGluYWxQYXJzZShpbnB1dCwgbWF0Y2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJyYXlbWUVBUl0gPSBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVFcmFzKG0sIGZvcm1hdCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMuX2VyYXMgfHwgZ2V0TG9jYWxlKCdlbicpLl9lcmFzO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGVyYXNbaV0uc2luY2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAvLyB0cnVuY2F0ZSB0aW1lXG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBob29rcyhlcmFzW2ldLnNpbmNlKS5zdGFydE9mKCdkYXknKTtcbiAgICAgICAgICAgICAgICAgICAgZXJhc1tpXS5zaW5jZSA9IGRhdGUudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgZXJhc1tpXS51bnRpbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgICAgICAgICAgICAgIGVyYXNbaV0udW50aWwgPSArSW5maW5pdHk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IGhvb2tzKGVyYXNbaV0udW50aWwpLnN0YXJ0T2YoJ2RheScpLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICAgICAgZXJhc1tpXS51bnRpbCA9IGRhdGUudmFsdWVPZigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJhcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVFcmFzUGFyc2UoZXJhTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBsLFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMuZXJhcygpLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGFiYnIsXG4gICAgICAgICAgICBuYXJyb3c7XG4gICAgICAgIGVyYU5hbWUgPSBlcmFOYW1lLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVyYXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICBuYW1lID0gZXJhc1tpXS5uYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBhYmJyID0gZXJhc1tpXS5hYmJyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBuYXJyb3cgPSBlcmFzW2ldLm5hcnJvdy50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZiAoc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ05OJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTk5OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhYmJyID09PSBlcmFOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdOTk5OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBlcmFOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdOTk5OTic6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFycm93ID09PSBlcmFOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFtuYW1lLCBhYmJyLCBuYXJyb3ddLmluZGV4T2YoZXJhTmFtZSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcmFzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlRXJhc0NvbnZlcnRZZWFyKGVyYSwgeWVhcikge1xuICAgICAgICB2YXIgZGlyID0gZXJhLnNpbmNlIDw9IGVyYS51bnRpbCA/ICsxIDogLTE7XG4gICAgICAgIGlmICh5ZWFyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBob29rcyhlcmEuc2luY2UpLnllYXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBob29rcyhlcmEuc2luY2UpLnllYXIoKSArICh5ZWFyIC0gZXJhLm9mZnNldCkgKiBkaXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFcmFOYW1lKCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5sb2NhbGVEYXRhKCkuZXJhcygpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCk7XG5cbiAgICAgICAgICAgIGlmIChlcmFzW2ldLnNpbmNlIDw9IHZhbCAmJiB2YWwgPD0gZXJhc1tpXS51bnRpbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcmFzW2ldLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJhc1tpXS51bnRpbCA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0uc2luY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVyYU5hcnJvdygpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBsLFxuICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMubG9jYWxlRGF0YSgpLmVyYXMoKTtcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVyYXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAvLyB0cnVuY2F0ZSB0aW1lXG4gICAgICAgICAgICB2YWwgPSB0aGlzLmNsb25lKCkuc3RhcnRPZignZGF5JykudmFsdWVPZigpO1xuXG4gICAgICAgICAgICBpZiAoZXJhc1tpXS5zaW5jZSA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0udW50aWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5uYXJyb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJhc1tpXS51bnRpbCA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0uc2luY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5uYXJyb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXJhQWJicigpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBsLFxuICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgZXJhcyA9IHRoaXMubG9jYWxlRGF0YSgpLmVyYXMoKTtcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVyYXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAvLyB0cnVuY2F0ZSB0aW1lXG4gICAgICAgICAgICB2YWwgPSB0aGlzLmNsb25lKCkuc3RhcnRPZignZGF5JykudmFsdWVPZigpO1xuXG4gICAgICAgICAgICBpZiAoZXJhc1tpXS5zaW5jZSA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0udW50aWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJhc1tpXS5hYmJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVyYXNbaV0udW50aWwgPD0gdmFsICYmIHZhbCA8PSBlcmFzW2ldLnNpbmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVyYXNbaV0uYWJicjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFcmFZZWFyKCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBkaXIsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5sb2NhbGVEYXRhKCkuZXJhcygpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gZXJhcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIGRpciA9IGVyYXNbaV0uc2luY2UgPD0gZXJhc1tpXS51bnRpbCA/ICsxIDogLTE7XG5cbiAgICAgICAgICAgIC8vIHRydW5jYXRlIHRpbWVcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoZXJhc1tpXS5zaW5jZSA8PSB2YWwgJiYgdmFsIDw9IGVyYXNbaV0udW50aWwpIHx8XG4gICAgICAgICAgICAgICAgKGVyYXNbaV0udW50aWwgPD0gdmFsICYmIHZhbCA8PSBlcmFzW2ldLnNpbmNlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMueWVhcigpIC0gaG9va3MoZXJhc1tpXS5zaW5jZSkueWVhcigpKSAqIGRpciArXG4gICAgICAgICAgICAgICAgICAgIGVyYXNbaV0ub2Zmc2V0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnllYXIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcmFzTmFtZVJlZ2V4KGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX2VyYXNOYW1lUmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZUVyYXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/IHRoaXMuX2VyYXNOYW1lUmVnZXggOiB0aGlzLl9lcmFzUmVnZXg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJhc0FiYnJSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19lcmFzQWJiclJlZ2V4JykpIHtcbiAgICAgICAgICAgIGNvbXB1dGVFcmFzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNTdHJpY3QgPyB0aGlzLl9lcmFzQWJiclJlZ2V4IDogdGhpcy5fZXJhc1JlZ2V4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVyYXNOYXJyb3dSZWdleChpc1N0cmljdCkge1xuICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19lcmFzTmFycm93UmVnZXgnKSkge1xuICAgICAgICAgICAgY29tcHV0ZUVyYXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/IHRoaXMuX2VyYXNOYXJyb3dSZWdleCA6IHRoaXMuX2VyYXNSZWdleDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaEVyYUFiYnIoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmVyYXNBYmJyUmVnZXgoaXNTdHJpY3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hdGNoRXJhTmFtZShpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuZXJhc05hbWVSZWdleChpc1N0cmljdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hFcmFOYXJyb3coaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLmVyYXNOYXJyb3dSZWdleChpc1N0cmljdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2hFcmFZZWFyT3JkaW5hbChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuX2VyYVllYXJPcmRpbmFsUmVnZXggfHwgbWF0Y2hVbnNpZ25lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlRXJhc1BhcnNlKCkge1xuICAgICAgICB2YXIgYWJiclBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgbmFtZVBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgbmFycm93UGllY2VzID0gW10sXG4gICAgICAgICAgICBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGwsXG4gICAgICAgICAgICBlcmFzID0gdGhpcy5lcmFzKCk7XG5cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGVyYXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICBuYW1lUGllY2VzLnB1c2gocmVnZXhFc2NhcGUoZXJhc1tpXS5uYW1lKSk7XG4gICAgICAgICAgICBhYmJyUGllY2VzLnB1c2gocmVnZXhFc2NhcGUoZXJhc1tpXS5hYmJyKSk7XG4gICAgICAgICAgICBuYXJyb3dQaWVjZXMucHVzaChyZWdleEVzY2FwZShlcmFzW2ldLm5hcnJvdykpO1xuXG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHJlZ2V4RXNjYXBlKGVyYXNbaV0ubmFtZSkpO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChyZWdleEVzY2FwZShlcmFzW2ldLmFiYnIpKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gocmVnZXhFc2NhcGUoZXJhc1tpXS5uYXJyb3cpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VyYXNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fZXJhc05hbWVSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG5hbWVQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl9lcmFzQWJiclJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgYWJiclBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX2VyYXNOYXJyb3dSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXignICsgbmFycm93UGllY2VzLmpvaW4oJ3wnKSArICcpJyxcbiAgICAgICAgICAgICdpJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnZ2cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWVrWWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydHRycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGRXZWVrWWVhckZvcm1hdFRva2VuKHRva2VuLCBnZXR0ZXIpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4oMCwgW3Rva2VuLCB0b2tlbi5sZW5ndGhdLCAwLCBnZXR0ZXIpO1xuICAgIH1cblxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2cnLCAnd2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnZycsICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0cnLCAnaXNvV2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHRycsICdpc29XZWVrWWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrWWVhcicsICdnZycpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla1llYXInLCAnR0cnKTtcblxuICAgIC8vIFBSSU9SSVRZXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ3dlZWtZZWFyJywgMSk7XG4gICAgYWRkVW5pdFByaW9yaXR5KCdpc29XZWVrWWVhcicsIDEpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignRycsIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdnJywgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0cnLCBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZycsIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHRycsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnZycsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFxuICAgICAgICBbJ2dnZ2cnLCAnZ2dnZ2cnLCAnR0dHRycsICdHR0dHRyddLFxuICAgICAgICBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDIpXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnJywgJ0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuXSA9IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFyKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgdGhpcy53ZWVrKCksXG4gICAgICAgICAgICB0aGlzLndlZWtkYXkoKSxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdyxcbiAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRveVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWtZZWFyKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgdGhpcy5pc29XZWVrKCksXG4gICAgICAgICAgICB0aGlzLmlzb1dlZWtkYXkoKSxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICA0XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SVNPV2Vla3NJblllYXIoKSB7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgMSwgNCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SVNPV2Vla3NJbklTT1dlZWtZZWFyKCkge1xuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy5pc29XZWVrWWVhcigpLCAxLCA0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXZWVrc0luWWVhcigpIHtcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgd2Vla0luZm8uZG93LCB3ZWVrSW5mby5kb3kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdlZWtzSW5XZWVrWWVhcigpIHtcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLndlZWtZZWFyKCksIHdlZWtJbmZvLmRvdywgd2Vla0luZm8uZG95KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrWWVhckhlbHBlcihpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIHdlZWtzVGFyZ2V0O1xuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIodGhpcywgZG93LCBkb3kpLnllYXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZWVrc1RhcmdldCA9IHdlZWtzSW5ZZWFyKGlucHV0LCBkb3csIGRveSk7XG4gICAgICAgICAgICBpZiAod2VlayA+IHdlZWtzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgd2VlayA9IHdlZWtzVGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNldFdlZWtBbGwuY2FsbCh0aGlzLCBpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0V2Vla0FsbCh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIGRheU9mWWVhckRhdGEgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSxcbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKGRheU9mWWVhckRhdGEueWVhciwgMCwgZGF5T2ZZZWFyRGF0YS5kYXlPZlllYXIpO1xuXG4gICAgICAgIHRoaXMueWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpO1xuICAgICAgICB0aGlzLm1vbnRoKGRhdGUuZ2V0VVRDTW9udGgoKSk7XG4gICAgICAgIHRoaXMuZGF0ZShkYXRlLmdldFVUQ0RhdGUoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdRJywgMCwgJ1FvJywgJ3F1YXJ0ZXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygncXVhcnRlcicsICdRJyk7XG5cbiAgICAvLyBQUklPUklUWVxuXG4gICAgYWRkVW5pdFByaW9yaXR5KCdxdWFydGVyJywgNyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdRJywgbWF0Y2gxKTtcbiAgICBhZGRQYXJzZVRva2VuKCdRJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0UXVhcnRlcihpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbFxuICAgICAgICAgICAgPyBNYXRoLmNlaWwoKHRoaXMubW9udGgoKSArIDEpIC8gMylcbiAgICAgICAgICAgIDogdGhpcy5tb250aCgoaW5wdXQgLSAxKSAqIDMgKyAodGhpcy5tb250aCgpICUgMykpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdEJywgWydERCcsIDJdLCAnRG8nLCAnZGF0ZScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXRlJywgJ0QnKTtcblxuICAgIC8vIFBSSU9SSVRZXG4gICAgYWRkVW5pdFByaW9yaXR5KCdkYXRlJywgOSk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdEJywgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdERCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdEbycsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSBcIm9yZGluYWxQYXJzZVwiIGZhbGxiYWNrIGluIG5leHQgbWFqb3IgcmVsZWFzZS5cbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0XG4gICAgICAgICAgICA/IGxvY2FsZS5fZGF5T2ZNb250aE9yZGluYWxQYXJzZSB8fCBsb2NhbGUuX29yZGluYWxQYXJzZVxuICAgICAgICAgICAgOiBsb2NhbGUuX2RheU9mTW9udGhPcmRpbmFsUGFyc2VMZW5pZW50O1xuICAgIH0pO1xuXG4gICAgYWRkUGFyc2VUb2tlbihbJ0QnLCAnREQnXSwgREFURSk7XG4gICAgYWRkUGFyc2VUb2tlbignRG8nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W0RBVEVdID0gdG9JbnQoaW5wdXQubWF0Y2gobWF0Y2gxdG8yKVswXSk7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0RGF5T2ZNb250aCA9IG1ha2VHZXRTZXQoJ0RhdGUnLCB0cnVlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdEREQnLCBbJ0REREQnLCAzXSwgJ0RERG8nLCAnZGF5T2ZZZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RheU9mWWVhcicsICdEREQnKTtcblxuICAgIC8vIFBSSU9SSVRZXG4gICAgYWRkVW5pdFByaW9yaXR5KCdkYXlPZlllYXInLCA0KTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RERCcsIG1hdGNoMXRvMyk7XG4gICAgYWRkUmVnZXhUb2tlbignRERERCcsIG1hdGNoMyk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mWWVhcihpbnB1dCkge1xuICAgICAgICB2YXIgZGF5T2ZZZWFyID1cbiAgICAgICAgICAgIE1hdGgucm91bmQoXG4gICAgICAgICAgICAgICAgKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTVcbiAgICAgICAgICAgICkgKyAxO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKGlucHV0IC0gZGF5T2ZZZWFyLCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdtJywgWydtbScsIDJdLCAwLCAnbWludXRlJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21pbnV0ZScsICdtJyk7XG5cbiAgICAvLyBQUklPUklUWVxuXG4gICAgYWRkVW5pdFByaW9yaXR5KCdtaW51dGUnLCAxNCk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdtJywgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnbScsICdtbSddLCBNSU5VVEUpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldE1pbnV0ZSA9IG1ha2VHZXRTZXQoJ01pbnV0ZXMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdzZWNvbmQnLCAncycpO1xuXG4gICAgLy8gUFJJT1JJVFlcblxuICAgIGFkZFVuaXRQcmlvcml0eSgnc2Vjb25kJywgMTUpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigncycsIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ3MnLCAnc3MnXSwgU0VDT05EKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRTZWNvbmQgPSBtYWtlR2V0U2V0KCdTZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMDApO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTUycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB+fih0aGlzLm1pbGxpc2Vjb25kKCkgLyAxMCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTUycsIDNdLCAwLCAnbWlsbGlzZWNvbmQnKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1MnLCA0XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTUycsIDVdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1MnLCA2XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1MnLCA3XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTUycsIDhdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTU1MnLCA5XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwMDtcbiAgICB9KTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbWlsbGlzZWNvbmQnLCAnbXMnKTtcblxuICAgIC8vIFBSSU9SSVRZXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ21pbGxpc2Vjb25kJywgMTYpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignUycsIG1hdGNoMXRvMywgbWF0Y2gxKTtcbiAgICBhZGRSZWdleFRva2VuKCdTUycsIG1hdGNoMXRvMywgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdTU1MnLCBtYXRjaDF0bzMsIG1hdGNoMyk7XG5cbiAgICB2YXIgdG9rZW4sIGdldFNldE1pbGxpc2Vjb25kO1xuICAgIGZvciAodG9rZW4gPSAnU1NTUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcbiAgICAgICAgYWRkUmVnZXhUb2tlbih0b2tlbiwgbWF0Y2hVbnNpZ25lZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNcyhpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmb3IgKHRva2VuID0gJ1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIHBhcnNlTXMpO1xuICAgIH1cblxuICAgIGdldFNldE1pbGxpc2Vjb25kID0gbWFrZUdldFNldCgnTWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3onLCAwLCAwLCAnem9uZUFiYnInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignenonLCAwLCAwLCAnem9uZU5hbWUnKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFpvbmVBYmJyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnVVRDJyA6ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFpvbmVOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyAnQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUnIDogJyc7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvID0gTW9tZW50LnByb3RvdHlwZTtcblxuICAgIHByb3RvLmFkZCA9IGFkZDtcbiAgICBwcm90by5jYWxlbmRhciA9IGNhbGVuZGFyJDE7XG4gICAgcHJvdG8uY2xvbmUgPSBjbG9uZTtcbiAgICBwcm90by5kaWZmID0gZGlmZjtcbiAgICBwcm90by5lbmRPZiA9IGVuZE9mO1xuICAgIHByb3RvLmZvcm1hdCA9IGZvcm1hdDtcbiAgICBwcm90by5mcm9tID0gZnJvbTtcbiAgICBwcm90by5mcm9tTm93ID0gZnJvbU5vdztcbiAgICBwcm90by50byA9IHRvO1xuICAgIHByb3RvLnRvTm93ID0gdG9Ob3c7XG4gICAgcHJvdG8uZ2V0ID0gc3RyaW5nR2V0O1xuICAgIHByb3RvLmludmFsaWRBdCA9IGludmFsaWRBdDtcbiAgICBwcm90by5pc0FmdGVyID0gaXNBZnRlcjtcbiAgICBwcm90by5pc0JlZm9yZSA9IGlzQmVmb3JlO1xuICAgIHByb3RvLmlzQmV0d2VlbiA9IGlzQmV0d2VlbjtcbiAgICBwcm90by5pc1NhbWUgPSBpc1NhbWU7XG4gICAgcHJvdG8uaXNTYW1lT3JBZnRlciA9IGlzU2FtZU9yQWZ0ZXI7XG4gICAgcHJvdG8uaXNTYW1lT3JCZWZvcmUgPSBpc1NhbWVPckJlZm9yZTtcbiAgICBwcm90by5pc1ZhbGlkID0gaXNWYWxpZCQyO1xuICAgIHByb3RvLmxhbmcgPSBsYW5nO1xuICAgIHByb3RvLmxvY2FsZSA9IGxvY2FsZTtcbiAgICBwcm90by5sb2NhbGVEYXRhID0gbG9jYWxlRGF0YTtcbiAgICBwcm90by5tYXggPSBwcm90b3R5cGVNYXg7XG4gICAgcHJvdG8ubWluID0gcHJvdG90eXBlTWluO1xuICAgIHByb3RvLnBhcnNpbmdGbGFncyA9IHBhcnNpbmdGbGFncztcbiAgICBwcm90by5zZXQgPSBzdHJpbmdTZXQ7XG4gICAgcHJvdG8uc3RhcnRPZiA9IHN0YXJ0T2Y7XG4gICAgcHJvdG8uc3VidHJhY3QgPSBzdWJ0cmFjdDtcbiAgICBwcm90by50b0FycmF5ID0gdG9BcnJheTtcbiAgICBwcm90by50b09iamVjdCA9IHRvT2JqZWN0O1xuICAgIHByb3RvLnRvRGF0ZSA9IHRvRGF0ZTtcbiAgICBwcm90by50b0lTT1N0cmluZyA9IHRvSVNPU3RyaW5nO1xuICAgIHByb3RvLmluc3BlY3QgPSBpbnNwZWN0O1xuICAgIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuZm9yICE9IG51bGwpIHtcbiAgICAgICAgcHJvdG9bU3ltYm9sLmZvcignbm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20nKV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJ01vbWVudDwnICsgdGhpcy5mb3JtYXQoKSArICc+JztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcHJvdG8udG9KU09OID0gdG9KU09OO1xuICAgIHByb3RvLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4gICAgcHJvdG8udW5peCA9IHVuaXg7XG4gICAgcHJvdG8udmFsdWVPZiA9IHZhbHVlT2Y7XG4gICAgcHJvdG8uY3JlYXRpb25EYXRhID0gY3JlYXRpb25EYXRhO1xuICAgIHByb3RvLmVyYU5hbWUgPSBnZXRFcmFOYW1lO1xuICAgIHByb3RvLmVyYU5hcnJvdyA9IGdldEVyYU5hcnJvdztcbiAgICBwcm90by5lcmFBYmJyID0gZ2V0RXJhQWJicjtcbiAgICBwcm90by5lcmFZZWFyID0gZ2V0RXJhWWVhcjtcbiAgICBwcm90by55ZWFyID0gZ2V0U2V0WWVhcjtcbiAgICBwcm90by5pc0xlYXBZZWFyID0gZ2V0SXNMZWFwWWVhcjtcbiAgICBwcm90by53ZWVrWWVhciA9IGdldFNldFdlZWtZZWFyO1xuICAgIHByb3RvLmlzb1dlZWtZZWFyID0gZ2V0U2V0SVNPV2Vla1llYXI7XG4gICAgcHJvdG8ucXVhcnRlciA9IHByb3RvLnF1YXJ0ZXJzID0gZ2V0U2V0UXVhcnRlcjtcbiAgICBwcm90by5tb250aCA9IGdldFNldE1vbnRoO1xuICAgIHByb3RvLmRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGg7XG4gICAgcHJvdG8ud2VlayA9IHByb3RvLndlZWtzID0gZ2V0U2V0V2VlaztcbiAgICBwcm90by5pc29XZWVrID0gcHJvdG8uaXNvV2Vla3MgPSBnZXRTZXRJU09XZWVrO1xuICAgIHByb3RvLndlZWtzSW5ZZWFyID0gZ2V0V2Vla3NJblllYXI7XG4gICAgcHJvdG8ud2Vla3NJbldlZWtZZWFyID0gZ2V0V2Vla3NJbldlZWtZZWFyO1xuICAgIHByb3RvLmlzb1dlZWtzSW5ZZWFyID0gZ2V0SVNPV2Vla3NJblllYXI7XG4gICAgcHJvdG8uaXNvV2Vla3NJbklTT1dlZWtZZWFyID0gZ2V0SVNPV2Vla3NJbklTT1dlZWtZZWFyO1xuICAgIHByb3RvLmRhdGUgPSBnZXRTZXREYXlPZk1vbnRoO1xuICAgIHByb3RvLmRheSA9IHByb3RvLmRheXMgPSBnZXRTZXREYXlPZldlZWs7XG4gICAgcHJvdG8ud2Vla2RheSA9IGdldFNldExvY2FsZURheU9mV2VlaztcbiAgICBwcm90by5pc29XZWVrZGF5ID0gZ2V0U2V0SVNPRGF5T2ZXZWVrO1xuICAgIHByb3RvLmRheU9mWWVhciA9IGdldFNldERheU9mWWVhcjtcbiAgICBwcm90by5ob3VyID0gcHJvdG8uaG91cnMgPSBnZXRTZXRIb3VyO1xuICAgIHByb3RvLm1pbnV0ZSA9IHByb3RvLm1pbnV0ZXMgPSBnZXRTZXRNaW51dGU7XG4gICAgcHJvdG8uc2Vjb25kID0gcHJvdG8uc2Vjb25kcyA9IGdldFNldFNlY29uZDtcbiAgICBwcm90by5taWxsaXNlY29uZCA9IHByb3RvLm1pbGxpc2Vjb25kcyA9IGdldFNldE1pbGxpc2Vjb25kO1xuICAgIHByb3RvLnV0Y09mZnNldCA9IGdldFNldE9mZnNldDtcbiAgICBwcm90by51dGMgPSBzZXRPZmZzZXRUb1VUQztcbiAgICBwcm90by5sb2NhbCA9IHNldE9mZnNldFRvTG9jYWw7XG4gICAgcHJvdG8ucGFyc2Vab25lID0gc2V0T2Zmc2V0VG9QYXJzZWRPZmZzZXQ7XG4gICAgcHJvdG8uaGFzQWxpZ25lZEhvdXJPZmZzZXQgPSBoYXNBbGlnbmVkSG91ck9mZnNldDtcbiAgICBwcm90by5pc0RTVCA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lO1xuICAgIHByb3RvLmlzTG9jYWwgPSBpc0xvY2FsO1xuICAgIHByb3RvLmlzVXRjT2Zmc2V0ID0gaXNVdGNPZmZzZXQ7XG4gICAgcHJvdG8uaXNVdGMgPSBpc1V0YztcbiAgICBwcm90by5pc1VUQyA9IGlzVXRjO1xuICAgIHByb3RvLnpvbmVBYmJyID0gZ2V0Wm9uZUFiYnI7XG4gICAgcHJvdG8uem9uZU5hbWUgPSBnZXRab25lTmFtZTtcbiAgICBwcm90by5kYXRlcyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ2RhdGVzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBkYXRlIGluc3RlYWQuJyxcbiAgICAgICAgZ2V0U2V0RGF5T2ZNb250aFxuICAgICk7XG4gICAgcHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9udGhzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb250aCBpbnN0ZWFkJyxcbiAgICAgICAgZ2V0U2V0TW9udGhcbiAgICApO1xuICAgIHByb3RvLnllYXJzID0gZGVwcmVjYXRlKFxuICAgICAgICAneWVhcnMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIHllYXIgaW5zdGVhZCcsXG4gICAgICAgIGdldFNldFllYXJcbiAgICApO1xuICAgIHByb3RvLnpvbmUgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQoKS56b25lIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQoKS51dGNPZmZzZXQgaW5zdGVhZC4gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy96b25lLycsXG4gICAgICAgIGdldFNldFpvbmVcbiAgICApO1xuICAgIHByb3RvLmlzRFNUU2hpZnRlZCA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ2lzRFNUU2hpZnRlZCBpcyBkZXByZWNhdGVkLiBTZWUgaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9kc3Qtc2hpZnRlZC8gZm9yIG1vcmUgaW5mb3JtYXRpb24nLFxuICAgICAgICBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWRcbiAgICApO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVW5peChpbnB1dCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJblpvbmUoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpLnBhcnNlWm9uZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZVBhcnNlUG9zdEZvcm1hdChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICB9XG5cbiAgICB2YXIgcHJvdG8kMSA9IExvY2FsZS5wcm90b3R5cGU7XG5cbiAgICBwcm90byQxLmNhbGVuZGFyID0gY2FsZW5kYXI7XG4gICAgcHJvdG8kMS5sb25nRGF0ZUZvcm1hdCA9IGxvbmdEYXRlRm9ybWF0O1xuICAgIHByb3RvJDEuaW52YWxpZERhdGUgPSBpbnZhbGlkRGF0ZTtcbiAgICBwcm90byQxLm9yZGluYWwgPSBvcmRpbmFsO1xuICAgIHByb3RvJDEucHJlcGFyc2UgPSBwcmVQYXJzZVBvc3RGb3JtYXQ7XG4gICAgcHJvdG8kMS5wb3N0Zm9ybWF0ID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvJDEucmVsYXRpdmVUaW1lID0gcmVsYXRpdmVUaW1lO1xuICAgIHByb3RvJDEucGFzdEZ1dHVyZSA9IHBhc3RGdXR1cmU7XG4gICAgcHJvdG8kMS5zZXQgPSBzZXQ7XG4gICAgcHJvdG8kMS5lcmFzID0gbG9jYWxlRXJhcztcbiAgICBwcm90byQxLmVyYXNQYXJzZSA9IGxvY2FsZUVyYXNQYXJzZTtcbiAgICBwcm90byQxLmVyYXNDb252ZXJ0WWVhciA9IGxvY2FsZUVyYXNDb252ZXJ0WWVhcjtcbiAgICBwcm90byQxLmVyYXNBYmJyUmVnZXggPSBlcmFzQWJiclJlZ2V4O1xuICAgIHByb3RvJDEuZXJhc05hbWVSZWdleCA9IGVyYXNOYW1lUmVnZXg7XG4gICAgcHJvdG8kMS5lcmFzTmFycm93UmVnZXggPSBlcmFzTmFycm93UmVnZXg7XG5cbiAgICBwcm90byQxLm1vbnRocyA9IGxvY2FsZU1vbnRocztcbiAgICBwcm90byQxLm1vbnRoc1Nob3J0ID0gbG9jYWxlTW9udGhzU2hvcnQ7XG4gICAgcHJvdG8kMS5tb250aHNQYXJzZSA9IGxvY2FsZU1vbnRoc1BhcnNlO1xuICAgIHByb3RvJDEubW9udGhzUmVnZXggPSBtb250aHNSZWdleDtcbiAgICBwcm90byQxLm1vbnRoc1Nob3J0UmVnZXggPSBtb250aHNTaG9ydFJlZ2V4O1xuICAgIHByb3RvJDEud2VlayA9IGxvY2FsZVdlZWs7XG4gICAgcHJvdG8kMS5maXJzdERheU9mWWVhciA9IGxvY2FsZUZpcnN0RGF5T2ZZZWFyO1xuICAgIHByb3RvJDEuZmlyc3REYXlPZldlZWsgPSBsb2NhbGVGaXJzdERheU9mV2VlaztcblxuICAgIHByb3RvJDEud2Vla2RheXMgPSBsb2NhbGVXZWVrZGF5cztcbiAgICBwcm90byQxLndlZWtkYXlzTWluID0gbG9jYWxlV2Vla2RheXNNaW47XG4gICAgcHJvdG8kMS53ZWVrZGF5c1Nob3J0ID0gbG9jYWxlV2Vla2RheXNTaG9ydDtcbiAgICBwcm90byQxLndlZWtkYXlzUGFyc2UgPSBsb2NhbGVXZWVrZGF5c1BhcnNlO1xuXG4gICAgcHJvdG8kMS53ZWVrZGF5c1JlZ2V4ID0gd2Vla2RheXNSZWdleDtcbiAgICBwcm90byQxLndlZWtkYXlzU2hvcnRSZWdleCA9IHdlZWtkYXlzU2hvcnRSZWdleDtcbiAgICBwcm90byQxLndlZWtkYXlzTWluUmVnZXggPSB3ZWVrZGF5c01pblJlZ2V4O1xuXG4gICAgcHJvdG8kMS5pc1BNID0gbG9jYWxlSXNQTTtcbiAgICBwcm90byQxLm1lcmlkaWVtID0gbG9jYWxlTWVyaWRpZW07XG5cbiAgICBmdW5jdGlvbiBnZXQkMShmb3JtYXQsIGluZGV4LCBmaWVsZCwgc2V0dGVyKSB7XG4gICAgICAgIHZhciBsb2NhbGUgPSBnZXRMb2NhbGUoKSxcbiAgICAgICAgICAgIHV0YyA9IGNyZWF0ZVVUQygpLnNldChzZXR0ZXIsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGxvY2FsZVtmaWVsZF0odXRjLCBmb3JtYXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RNb250aHNJbXBsKGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XG4gICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcblxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldCQxKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCAnbW9udGgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgb3V0ID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbaV0gPSBnZXQkMShmb3JtYXQsIGksIGZpZWxkLCAnbW9udGgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8vICgpXG4gICAgLy8gKDUpXG4gICAgLy8gKGZtdCwgNSlcbiAgICAvLyAoZm10KVxuICAgIC8vICh0cnVlKVxuICAgIC8vICh0cnVlLCA1KVxuICAgIC8vICh0cnVlLCBmbXQsIDUpXG4gICAgLy8gKHRydWUsIGZtdClcbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbGVTb3J0ZWQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGxvY2FsZVNvcnRlZDtcbiAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICAgICAgbG9jYWxlU29ydGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbG9jYWxlID0gZ2V0TG9jYWxlKCksXG4gICAgICAgICAgICBzaGlmdCA9IGxvY2FsZVNvcnRlZCA/IGxvY2FsZS5fd2Vlay5kb3cgOiAwLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIG91dCA9IFtdO1xuXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0JDEoZm9ybWF0LCAoaW5kZXggKyBzaGlmdCkgJSA3LCBmaWVsZCwgJ2RheScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgb3V0W2ldID0gZ2V0JDEoZm9ybWF0LCAoaSArIHNoaWZ0KSAlIDcsIGZpZWxkLCAnZGF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0TW9udGhzKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RNb250aHNJbXBsKGZvcm1hdCwgaW5kZXgsICdtb250aHMnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0TW9udGhzU2hvcnQoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRoc1Nob3J0Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5cycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RXZWVrZGF5c1Nob3J0KGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c1Nob3J0Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzTWluKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c01pbicpO1xuICAgIH1cblxuICAgIGdldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XG4gICAgICAgIGVyYXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaW5jZTogJzAwMDEtMDEtMDEnLFxuICAgICAgICAgICAgICAgIHVudGlsOiArSW5maW5pdHksXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAxLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdBbm5vIERvbWluaScsXG4gICAgICAgICAgICAgICAgbmFycm93OiAnQUQnLFxuICAgICAgICAgICAgICAgIGFiYnI6ICdBRCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNpbmNlOiAnMDAwMC0xMi0zMScsXG4gICAgICAgICAgICAgICAgdW50aWw6IC1JbmZpbml0eSxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDEsXG4gICAgICAgICAgICAgICAgbmFtZTogJ0JlZm9yZSBDaHJpc3QnLFxuICAgICAgICAgICAgICAgIG5hcnJvdzogJ0JDJyxcbiAgICAgICAgICAgICAgICBhYmJyOiAnQkMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogL1xcZHsxLDJ9KHRofHN0fG5kfHJkKS8sXG4gICAgICAgIG9yZGluYWw6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBiID0gbnVtYmVyICUgMTAsXG4gICAgICAgICAgICAgICAgb3V0cHV0ID1cbiAgICAgICAgICAgICAgICAgICAgdG9JbnQoKG51bWJlciAlIDEwMCkgLyAxMCkgPT09IDFcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ3RoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBiID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYiA9PT0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnbmQnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGIgPT09IDNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ3JkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAndGgnO1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlciArIG91dHB1dDtcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuICAgIGhvb2tzLmxhbmcgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQubGFuZyBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZSBpbnN0ZWFkLicsXG4gICAgICAgIGdldFNldEdsb2JhbExvY2FsZVxuICAgICk7XG4gICAgaG9va3MubGFuZ0RhdGEgPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQubGFuZ0RhdGEgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGVEYXRhIGluc3RlYWQuJyxcbiAgICAgICAgZ2V0TG9jYWxlXG4gICAgKTtcblxuICAgIHZhciBtYXRoQWJzID0gTWF0aC5hYnM7XG5cbiAgICBmdW5jdGlvbiBhYnMoKSB7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSBtYXRoQWJzKHRoaXMuX21pbGxpc2Vjb25kcyk7XG4gICAgICAgIHRoaXMuX2RheXMgPSBtYXRoQWJzKHRoaXMuX2RheXMpO1xuICAgICAgICB0aGlzLl9tb250aHMgPSBtYXRoQWJzKHRoaXMuX21vbnRocyk7XG5cbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgPSBtYXRoQWJzKGRhdGEubWlsbGlzZWNvbmRzKTtcbiAgICAgICAgZGF0YS5zZWNvbmRzID0gbWF0aEFicyhkYXRhLnNlY29uZHMpO1xuICAgICAgICBkYXRhLm1pbnV0ZXMgPSBtYXRoQWJzKGRhdGEubWludXRlcyk7XG4gICAgICAgIGRhdGEuaG91cnMgPSBtYXRoQWJzKGRhdGEuaG91cnMpO1xuICAgICAgICBkYXRhLm1vbnRocyA9IG1hdGhBYnMoZGF0YS5tb250aHMpO1xuICAgICAgICBkYXRhLnllYXJzID0gbWF0aEFicyhkYXRhLnllYXJzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRTdWJ0cmFjdCQxKGR1cmF0aW9uLCBpbnB1dCwgdmFsdWUsIGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgb3RoZXIgPSBjcmVhdGVEdXJhdGlvbihpbnB1dCwgdmFsdWUpO1xuXG4gICAgICAgIGR1cmF0aW9uLl9taWxsaXNlY29uZHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21pbGxpc2Vjb25kcztcbiAgICAgICAgZHVyYXRpb24uX2RheXMgKz0gZGlyZWN0aW9uICogb3RoZXIuX2RheXM7XG4gICAgICAgIGR1cmF0aW9uLl9tb250aHMgKz0gZGlyZWN0aW9uICogb3RoZXIuX21vbnRocztcblxuICAgICAgICByZXR1cm4gZHVyYXRpb24uX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIGFkZCgxLCAncycpIG9yIGFkZChkdXJhdGlvbilcbiAgICBmdW5jdGlvbiBhZGQkMShpbnB1dCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGFkZFN1YnRyYWN0JDEodGhpcywgaW5wdXQsIHZhbHVlLCAxKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBzdWJ0cmFjdCgxLCAncycpIG9yIHN1YnRyYWN0KGR1cmF0aW9uKVxuICAgIGZ1bmN0aW9uIHN1YnRyYWN0JDEoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhZGRTdWJ0cmFjdCQxKHRoaXMsIGlucHV0LCB2YWx1ZSwgLTEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFic0NlaWwobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnViYmxlKCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMsXG4gICAgICAgICAgICBtb250aHMgPSB0aGlzLl9tb250aHMsXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5fZGF0YSxcbiAgICAgICAgICAgIHNlY29uZHMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICB5ZWFycyxcbiAgICAgICAgICAgIG1vbnRoc0Zyb21EYXlzO1xuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBtaXggb2YgcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHZhbHVlcywgYnViYmxlIGRvd24gZmlyc3RcbiAgICAgICAgLy8gY2hlY2s6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yMTY2XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgKG1pbGxpc2Vjb25kcyA+PSAwICYmIGRheXMgPj0gMCAmJiBtb250aHMgPj0gMCkgfHxcbiAgICAgICAgICAgICAgICAobWlsbGlzZWNvbmRzIDw9IDAgJiYgZGF5cyA8PSAwICYmIG1vbnRocyA8PSAwKVxuICAgICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyArPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHMpICsgZGF5cykgKiA4NjRlNTtcbiAgICAgICAgICAgIGRheXMgPSAwO1xuICAgICAgICAgICAgbW9udGhzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcbiAgICAgICAgLy8gZXhhbXBsZXMgb2Ygd2hhdCB0aGF0IG1lYW5zLlxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcyAlIDEwMDA7XG5cbiAgICAgICAgc2Vjb25kcyA9IGFic0Zsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xuICAgICAgICBkYXRhLnNlY29uZHMgPSBzZWNvbmRzICUgNjA7XG5cbiAgICAgICAgbWludXRlcyA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGRhdGEubWludXRlcyA9IG1pbnV0ZXMgJSA2MDtcblxuICAgICAgICBob3VycyA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIGRhdGEuaG91cnMgPSBob3VycyAlIDI0O1xuXG4gICAgICAgIGRheXMgKz0gYWJzRmxvb3IoaG91cnMgLyAyNCk7XG5cbiAgICAgICAgLy8gY29udmVydCBkYXlzIHRvIG1vbnRoc1xuICAgICAgICBtb250aHNGcm9tRGF5cyA9IGFic0Zsb29yKGRheXNUb01vbnRocyhkYXlzKSk7XG4gICAgICAgIG1vbnRocyArPSBtb250aHNGcm9tRGF5cztcbiAgICAgICAgZGF5cyAtPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHNGcm9tRGF5cykpO1xuXG4gICAgICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcbiAgICAgICAgeWVhcnMgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XG4gICAgICAgIG1vbnRocyAlPSAxMjtcblxuICAgICAgICBkYXRhLmRheXMgPSBkYXlzO1xuICAgICAgICBkYXRhLm1vbnRocyA9IG1vbnRocztcbiAgICAgICAgZGF0YS55ZWFycyA9IHllYXJzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheXNUb01vbnRocyhkYXlzKSB7XG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDE0NjA5NyBkYXlzICh0YWtpbmcgaW50byBhY2NvdW50IGxlYXAgeWVhciBydWxlcylcbiAgICAgICAgLy8gNDAwIHllYXJzIGhhdmUgMTIgbW9udGhzID09PSA0ODAwXG4gICAgICAgIHJldHVybiAoZGF5cyAqIDQ4MDApIC8gMTQ2MDk3O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbnRoc1RvRGF5cyhtb250aHMpIHtcbiAgICAgICAgLy8gdGhlIHJldmVyc2Ugb2YgZGF5c1RvTW9udGhzXG4gICAgICAgIHJldHVybiAobW9udGhzICogMTQ2MDk3KSAvIDQ4MDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXModW5pdHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF5cyxcbiAgICAgICAgICAgIG1vbnRocyxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcblxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgICAgICBpZiAodW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICdxdWFydGVyJyB8fCB1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICBkYXlzID0gdGhpcy5fZGF5cyArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzICsgZGF5c1RvTW9udGhzKGRheXMpO1xuICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRocztcbiAgICAgICAgICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRocyAvIDM7XG4gICAgICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aHMgLyAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBtaWxsaXNlY29uZHMgc2VwYXJhdGVseSBiZWNhdXNlIG9mIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIChpc3N1ZSAjMTg2NylcbiAgICAgICAgICAgIGRheXMgPSB0aGlzLl9kYXlzICsgTWF0aC5yb3VuZChtb250aHNUb0RheXModGhpcy5fbW9udGhzKSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXlzIC8gNyArIG1pbGxpc2Vjb25kcyAvIDYwNDhlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5cyArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5cyAqIDI0ICsgbWlsbGlzZWNvbmRzIC8gMzZlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5cyAqIDE0NDAgKyBtaWxsaXNlY29uZHMgLyA2ZTQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRheXMgKiA4NjQwMCArIG1pbGxpc2Vjb25kcyAvIDEwMDA7XG4gICAgICAgICAgICAgICAgLy8gTWF0aC5mbG9vciBwcmV2ZW50cyBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyBoZXJlXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihkYXlzICogODY0ZTUpICsgbWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0ICcgKyB1bml0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2UgdGhpcy5hcygnbXMnKT9cbiAgICBmdW5jdGlvbiB2YWx1ZU9mJDEoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICB0aGlzLl9kYXlzICogODY0ZTUgK1xuICAgICAgICAgICAgKHRoaXMuX21vbnRocyAlIDEyKSAqIDI1OTJlNiArXG4gICAgICAgICAgICB0b0ludCh0aGlzLl9tb250aHMgLyAxMikgKiAzMTUzNmU2XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUFzKGFsaWFzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpLFxuICAgICAgICBhc1NlY29uZHMgPSBtYWtlQXMoJ3MnKSxcbiAgICAgICAgYXNNaW51dGVzID0gbWFrZUFzKCdtJyksXG4gICAgICAgIGFzSG91cnMgPSBtYWtlQXMoJ2gnKSxcbiAgICAgICAgYXNEYXlzID0gbWFrZUFzKCdkJyksXG4gICAgICAgIGFzV2Vla3MgPSBtYWtlQXMoJ3cnKSxcbiAgICAgICAgYXNNb250aHMgPSBtYWtlQXMoJ00nKSxcbiAgICAgICAgYXNRdWFydGVycyA9IG1ha2VBcygnUScpLFxuICAgICAgICBhc1llYXJzID0gbWFrZUFzKCd5Jyk7XG5cbiAgICBmdW5jdGlvbiBjbG9uZSQxKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24odGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0JDIodW5pdHMpIHtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXNbdW5pdHMgKyAncyddKCkgOiBOYU47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUdldHRlcihuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9kYXRhW25hbWVdIDogTmFOO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBtaWxsaXNlY29uZHMgPSBtYWtlR2V0dGVyKCdtaWxsaXNlY29uZHMnKSxcbiAgICAgICAgc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ3NlY29uZHMnKSxcbiAgICAgICAgbWludXRlcyA9IG1ha2VHZXR0ZXIoJ21pbnV0ZXMnKSxcbiAgICAgICAgaG91cnMgPSBtYWtlR2V0dGVyKCdob3VycycpLFxuICAgICAgICBkYXlzID0gbWFrZUdldHRlcignZGF5cycpLFxuICAgICAgICBtb250aHMgPSBtYWtlR2V0dGVyKCdtb250aHMnKSxcbiAgICAgICAgeWVhcnMgPSBtYWtlR2V0dGVyKCd5ZWFycycpO1xuXG4gICAgZnVuY3Rpb24gd2Vla3MoKSB7XG4gICAgICAgIHJldHVybiBhYnNGbG9vcih0aGlzLmRheXMoKSAvIDcpO1xuICAgIH1cblxuICAgIHZhciByb3VuZCA9IE1hdGgucm91bmQsXG4gICAgICAgIHRocmVzaG9sZHMgPSB7XG4gICAgICAgICAgICBzczogNDQsIC8vIGEgZmV3IHNlY29uZHMgdG8gc2Vjb25kc1xuICAgICAgICAgICAgczogNDUsIC8vIHNlY29uZHMgdG8gbWludXRlXG4gICAgICAgICAgICBtOiA0NSwgLy8gbWludXRlcyB0byBob3VyXG4gICAgICAgICAgICBoOiAyMiwgLy8gaG91cnMgdG8gZGF5XG4gICAgICAgICAgICBkOiAyNiwgLy8gZGF5cyB0byBtb250aC93ZWVrXG4gICAgICAgICAgICB3OiBudWxsLCAvLyB3ZWVrcyB0byBtb250aFxuICAgICAgICAgICAgTTogMTEsIC8vIG1vbnRocyB0byB5ZWFyXG4gICAgICAgIH07XG5cbiAgICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIG1vbWVudC5mbi5mcm9tLCBtb21lbnQuZm4uZnJvbU5vdywgYW5kIG1vbWVudC5kdXJhdGlvbi5mbi5odW1hbml6ZVxuICAgIGZ1bmN0aW9uIHN1YnN0aXR1dGVUaW1lQWdvKHN0cmluZywgbnVtYmVyLCB3aXRob3V0U3VmZml4LCBpc0Z1dHVyZSwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbGF0aXZlVGltZSQxKHBvc05lZ0R1cmF0aW9uLCB3aXRob3V0U3VmZml4LCB0aHJlc2hvbGRzLCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gY3JlYXRlRHVyYXRpb24ocG9zTmVnRHVyYXRpb24pLmFicygpLFxuICAgICAgICAgICAgc2Vjb25kcyA9IHJvdW5kKGR1cmF0aW9uLmFzKCdzJykpLFxuICAgICAgICAgICAgbWludXRlcyA9IHJvdW5kKGR1cmF0aW9uLmFzKCdtJykpLFxuICAgICAgICAgICAgaG91cnMgPSByb3VuZChkdXJhdGlvbi5hcygnaCcpKSxcbiAgICAgICAgICAgIGRheXMgPSByb3VuZChkdXJhdGlvbi5hcygnZCcpKSxcbiAgICAgICAgICAgIG1vbnRocyA9IHJvdW5kKGR1cmF0aW9uLmFzKCdNJykpLFxuICAgICAgICAgICAgd2Vla3MgPSByb3VuZChkdXJhdGlvbi5hcygndycpKSxcbiAgICAgICAgICAgIHllYXJzID0gcm91bmQoZHVyYXRpb24uYXMoJ3knKSksXG4gICAgICAgICAgICBhID1cbiAgICAgICAgICAgICAgICAoc2Vjb25kcyA8PSB0aHJlc2hvbGRzLnNzICYmIFsncycsIHNlY29uZHNdKSB8fFxuICAgICAgICAgICAgICAgIChzZWNvbmRzIDwgdGhyZXNob2xkcy5zICYmIFsnc3MnLCBzZWNvbmRzXSkgfHxcbiAgICAgICAgICAgICAgICAobWludXRlcyA8PSAxICYmIFsnbSddKSB8fFxuICAgICAgICAgICAgICAgIChtaW51dGVzIDwgdGhyZXNob2xkcy5tICYmIFsnbW0nLCBtaW51dGVzXSkgfHxcbiAgICAgICAgICAgICAgICAoaG91cnMgPD0gMSAmJiBbJ2gnXSkgfHxcbiAgICAgICAgICAgICAgICAoaG91cnMgPCB0aHJlc2hvbGRzLmggJiYgWydoaCcsIGhvdXJzXSkgfHxcbiAgICAgICAgICAgICAgICAoZGF5cyA8PSAxICYmIFsnZCddKSB8fFxuICAgICAgICAgICAgICAgIChkYXlzIDwgdGhyZXNob2xkcy5kICYmIFsnZGQnLCBkYXlzXSk7XG5cbiAgICAgICAgaWYgKHRocmVzaG9sZHMudyAhPSBudWxsKSB7XG4gICAgICAgICAgICBhID1cbiAgICAgICAgICAgICAgICBhIHx8XG4gICAgICAgICAgICAgICAgKHdlZWtzIDw9IDEgJiYgWyd3J10pIHx8XG4gICAgICAgICAgICAgICAgKHdlZWtzIDwgdGhyZXNob2xkcy53ICYmIFsnd3cnLCB3ZWVrc10pO1xuICAgICAgICB9XG4gICAgICAgIGEgPSBhIHx8XG4gICAgICAgICAgICAobW9udGhzIDw9IDEgJiYgWydNJ10pIHx8XG4gICAgICAgICAgICAobW9udGhzIDwgdGhyZXNob2xkcy5NICYmIFsnTU0nLCBtb250aHNdKSB8fFxuICAgICAgICAgICAgKHllYXJzIDw9IDEgJiYgWyd5J10pIHx8IFsneXknLCB5ZWFyc107XG5cbiAgICAgICAgYVsyXSA9IHdpdGhvdXRTdWZmaXg7XG4gICAgICAgIGFbM10gPSArcG9zTmVnRHVyYXRpb24gPiAwO1xuICAgICAgICBhWzRdID0gbG9jYWxlO1xuICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZVRpbWVBZ28uYXBwbHkobnVsbCwgYSk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCB0aGUgcm91bmRpbmcgZnVuY3Rpb24gZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nKHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHJvdW5kaW5nRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygcm91bmRpbmdGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcm91bmQgPSByb3VuZGluZ0Z1bmN0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgYSB0aHJlc2hvbGQgZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZCh0aHJlc2hvbGQsIGxpbWl0KSB7XG4gICAgICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyZXNob2xkc1t0aHJlc2hvbGRdO1xuICAgICAgICB9XG4gICAgICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xuICAgICAgICBpZiAodGhyZXNob2xkID09PSAncycpIHtcbiAgICAgICAgICAgIHRocmVzaG9sZHMuc3MgPSBsaW1pdCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaHVtYW5pemUoYXJnV2l0aFN1ZmZpeCwgYXJnVGhyZXNob2xkcykge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3aXRoU3VmZml4ID0gZmFsc2UsXG4gICAgICAgICAgICB0aCA9IHRocmVzaG9sZHMsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICBvdXRwdXQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdXaXRoU3VmZml4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYXJnVGhyZXNob2xkcyA9IGFyZ1dpdGhTdWZmaXg7XG4gICAgICAgICAgICBhcmdXaXRoU3VmZml4ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdXaXRoU3VmZml4ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHdpdGhTdWZmaXggPSBhcmdXaXRoU3VmZml4O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYXJnVGhyZXNob2xkcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoID0gT2JqZWN0LmFzc2lnbih7fSwgdGhyZXNob2xkcywgYXJnVGhyZXNob2xkcyk7XG4gICAgICAgICAgICBpZiAoYXJnVGhyZXNob2xkcy5zICE9IG51bGwgJiYgYXJnVGhyZXNob2xkcy5zcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGguc3MgPSBhcmdUaHJlc2hvbGRzLnMgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxlID0gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgIG91dHB1dCA9IHJlbGF0aXZlVGltZSQxKHRoaXMsICF3aXRoU3VmZml4LCB0aCwgbG9jYWxlKTtcblxuICAgICAgICBpZiAod2l0aFN1ZmZpeCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gbG9jYWxlLnBhc3RGdXR1cmUoK3RoaXMsIG91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbG9jYWxlLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICB2YXIgYWJzJDEgPSBNYXRoLmFicztcblxuICAgIGZ1bmN0aW9uIHNpZ24oeCkge1xuICAgICAgICByZXR1cm4gKHggPiAwKSAtICh4IDwgMCkgfHwgK3g7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9JU09TdHJpbmckMSgpIHtcbiAgICAgICAgLy8gZm9yIElTTyBzdHJpbmdzIHdlIGRvIG5vdCB1c2UgdGhlIG5vcm1hbCBidWJibGluZyBydWxlczpcbiAgICAgICAgLy8gICogbWlsbGlzZWNvbmRzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSBob3Vyc1xuICAgICAgICAvLyAgKiBkYXlzIGRvIG5vdCBidWJibGUgYXQgYWxsXG4gICAgICAgIC8vICAqIG1vbnRocyBidWJibGUgdXAgdW50aWwgdGhleSBiZWNvbWUgeWVhcnNcbiAgICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIHRoZXJlIGlzIG5vIGNvbnRleHQtZnJlZSBjb252ZXJzaW9uIGJldHdlZW4gaG91cnMgYW5kIGRheXNcbiAgICAgICAgLy8gKHRoaW5rIG9mIGNsb2NrIGNoYW5nZXMpXG4gICAgICAgIC8vIGFuZCBhbHNvIG5vdCBiZXR3ZWVuIGRheXMgYW5kIG1vbnRocyAoMjgtMzEgZGF5cyBwZXIgbW9udGgpXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlY29uZHMgPSBhYnMkMSh0aGlzLl9taWxsaXNlY29uZHMpIC8gMTAwMCxcbiAgICAgICAgICAgIGRheXMgPSBhYnMkMSh0aGlzLl9kYXlzKSxcbiAgICAgICAgICAgIG1vbnRocyA9IGFicyQxKHRoaXMuX21vbnRocyksXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICB5ZWFycyxcbiAgICAgICAgICAgIHMsXG4gICAgICAgICAgICB0b3RhbCA9IHRoaXMuYXNTZWNvbmRzKCksXG4gICAgICAgICAgICB0b3RhbFNpZ24sXG4gICAgICAgICAgICB5bVNpZ24sXG4gICAgICAgICAgICBkYXlzU2lnbixcbiAgICAgICAgICAgIGhtc1NpZ247XG5cbiAgICAgICAgaWYgKCF0b3RhbCkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBhcyBDIydzIChOb2RhKSBhbmQgcHl0aG9uIChpc29kYXRlKS4uLlxuICAgICAgICAgICAgLy8gYnV0IG5vdCBvdGhlciBKUyAoZ29vZy5kYXRlKVxuICAgICAgICAgICAgcmV0dXJuICdQMEQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMzYwMCBzZWNvbmRzIC0+IDYwIG1pbnV0ZXMgLT4gMSBob3VyXG4gICAgICAgIG1pbnV0ZXMgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBob3VycyA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIHNlY29uZHMgJT0gNjA7XG4gICAgICAgIG1pbnV0ZXMgJT0gNjA7XG5cbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgICAgICB5ZWFycyA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcbiAgICAgICAgbW9udGhzICU9IDEyO1xuXG4gICAgICAgIC8vIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9kb3JkaWxsZS9tb21lbnQtaXNvZHVyYXRpb24vYmxvYi9tYXN0ZXIvbW9tZW50Lmlzb2R1cmF0aW9uLmpzXG4gICAgICAgIHMgPSBzZWNvbmRzID8gc2Vjb25kcy50b0ZpeGVkKDMpLnJlcGxhY2UoL1xcLj8wKyQvLCAnJykgOiAnJztcblxuICAgICAgICB0b3RhbFNpZ24gPSB0b3RhbCA8IDAgPyAnLScgOiAnJztcbiAgICAgICAgeW1TaWduID0gc2lnbih0aGlzLl9tb250aHMpICE9PSBzaWduKHRvdGFsKSA/ICctJyA6ICcnO1xuICAgICAgICBkYXlzU2lnbiA9IHNpZ24odGhpcy5fZGF5cykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XG4gICAgICAgIGhtc1NpZ24gPSBzaWduKHRoaXMuX21pbGxpc2Vjb25kcykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRvdGFsU2lnbiArXG4gICAgICAgICAgICAnUCcgK1xuICAgICAgICAgICAgKHllYXJzID8geW1TaWduICsgeWVhcnMgKyAnWScgOiAnJykgK1xuICAgICAgICAgICAgKG1vbnRocyA/IHltU2lnbiArIG1vbnRocyArICdNJyA6ICcnKSArXG4gICAgICAgICAgICAoZGF5cyA/IGRheXNTaWduICsgZGF5cyArICdEJyA6ICcnKSArXG4gICAgICAgICAgICAoaG91cnMgfHwgbWludXRlcyB8fCBzZWNvbmRzID8gJ1QnIDogJycpICtcbiAgICAgICAgICAgIChob3VycyA/IGhtc1NpZ24gKyBob3VycyArICdIJyA6ICcnKSArXG4gICAgICAgICAgICAobWludXRlcyA/IGhtc1NpZ24gKyBtaW51dGVzICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChzZWNvbmRzID8gaG1zU2lnbiArIHMgKyAnUycgOiAnJylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvdG8kMiA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxuICAgIHByb3RvJDIuaXNWYWxpZCA9IGlzVmFsaWQkMTtcbiAgICBwcm90byQyLmFicyA9IGFicztcbiAgICBwcm90byQyLmFkZCA9IGFkZCQxO1xuICAgIHByb3RvJDIuc3VidHJhY3QgPSBzdWJ0cmFjdCQxO1xuICAgIHByb3RvJDIuYXMgPSBhcztcbiAgICBwcm90byQyLmFzTWlsbGlzZWNvbmRzID0gYXNNaWxsaXNlY29uZHM7XG4gICAgcHJvdG8kMi5hc1NlY29uZHMgPSBhc1NlY29uZHM7XG4gICAgcHJvdG8kMi5hc01pbnV0ZXMgPSBhc01pbnV0ZXM7XG4gICAgcHJvdG8kMi5hc0hvdXJzID0gYXNIb3VycztcbiAgICBwcm90byQyLmFzRGF5cyA9IGFzRGF5cztcbiAgICBwcm90byQyLmFzV2Vla3MgPSBhc1dlZWtzO1xuICAgIHByb3RvJDIuYXNNb250aHMgPSBhc01vbnRocztcbiAgICBwcm90byQyLmFzUXVhcnRlcnMgPSBhc1F1YXJ0ZXJzO1xuICAgIHByb3RvJDIuYXNZZWFycyA9IGFzWWVhcnM7XG4gICAgcHJvdG8kMi52YWx1ZU9mID0gdmFsdWVPZiQxO1xuICAgIHByb3RvJDIuX2J1YmJsZSA9IGJ1YmJsZTtcbiAgICBwcm90byQyLmNsb25lID0gY2xvbmUkMTtcbiAgICBwcm90byQyLmdldCA9IGdldCQyO1xuICAgIHByb3RvJDIubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzO1xuICAgIHByb3RvJDIuc2Vjb25kcyA9IHNlY29uZHM7XG4gICAgcHJvdG8kMi5taW51dGVzID0gbWludXRlcztcbiAgICBwcm90byQyLmhvdXJzID0gaG91cnM7XG4gICAgcHJvdG8kMi5kYXlzID0gZGF5cztcbiAgICBwcm90byQyLndlZWtzID0gd2Vla3M7XG4gICAgcHJvdG8kMi5tb250aHMgPSBtb250aHM7XG4gICAgcHJvdG8kMi55ZWFycyA9IHllYXJzO1xuICAgIHByb3RvJDIuaHVtYW5pemUgPSBodW1hbml6ZTtcbiAgICBwcm90byQyLnRvSVNPU3RyaW5nID0gdG9JU09TdHJpbmckMTtcbiAgICBwcm90byQyLnRvU3RyaW5nID0gdG9JU09TdHJpbmckMTtcbiAgICBwcm90byQyLnRvSlNPTiA9IHRvSVNPU3RyaW5nJDE7XG4gICAgcHJvdG8kMi5sb2NhbGUgPSBsb2NhbGU7XG4gICAgcHJvdG8kMi5sb2NhbGVEYXRhID0gbG9jYWxlRGF0YTtcblxuICAgIHByb3RvJDIudG9Jc29TdHJpbmcgPSBkZXByZWNhdGUoXG4gICAgICAgICd0b0lzb1N0cmluZygpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdG9JU09TdHJpbmcoKSBpbnN0ZWFkIChub3RpY2UgdGhlIGNhcGl0YWxzKScsXG4gICAgICAgIHRvSVNPU3RyaW5nJDFcbiAgICApO1xuICAgIHByb3RvJDIubGFuZyA9IGxhbmc7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignWCcsIDAsIDAsICd1bml4Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3gnLCAwLCAwLCAndmFsdWVPZicpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigneCcsIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdYJywgbWF0Y2hUaW1lc3RhbXApO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUocGFyc2VGbG9hdChpbnB1dCkgKiAxMDAwKTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCd4JywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHRvSW50KGlucHV0KSk7XG4gICAgfSk7XG5cbiAgICAvLyEgbW9tZW50LmpzXG5cbiAgICBob29rcy52ZXJzaW9uID0gJzIuMjkuNCc7XG5cbiAgICBzZXRIb29rQ2FsbGJhY2soY3JlYXRlTG9jYWwpO1xuXG4gICAgaG9va3MuZm4gPSBwcm90bztcbiAgICBob29rcy5taW4gPSBtaW47XG4gICAgaG9va3MubWF4ID0gbWF4O1xuICAgIGhvb2tzLm5vdyA9IG5vdztcbiAgICBob29rcy51dGMgPSBjcmVhdGVVVEM7XG4gICAgaG9va3MudW5peCA9IGNyZWF0ZVVuaXg7XG4gICAgaG9va3MubW9udGhzID0gbGlzdE1vbnRocztcbiAgICBob29rcy5pc0RhdGUgPSBpc0RhdGU7XG4gICAgaG9va3MubG9jYWxlID0gZ2V0U2V0R2xvYmFsTG9jYWxlO1xuICAgIGhvb2tzLmludmFsaWQgPSBjcmVhdGVJbnZhbGlkO1xuICAgIGhvb2tzLmR1cmF0aW9uID0gY3JlYXRlRHVyYXRpb247XG4gICAgaG9va3MuaXNNb21lbnQgPSBpc01vbWVudDtcbiAgICBob29rcy53ZWVrZGF5cyA9IGxpc3RXZWVrZGF5cztcbiAgICBob29rcy5wYXJzZVpvbmUgPSBjcmVhdGVJblpvbmU7XG4gICAgaG9va3MubG9jYWxlRGF0YSA9IGdldExvY2FsZTtcbiAgICBob29rcy5pc0R1cmF0aW9uID0gaXNEdXJhdGlvbjtcbiAgICBob29rcy5tb250aHNTaG9ydCA9IGxpc3RNb250aHNTaG9ydDtcbiAgICBob29rcy53ZWVrZGF5c01pbiA9IGxpc3RXZWVrZGF5c01pbjtcbiAgICBob29rcy5kZWZpbmVMb2NhbGUgPSBkZWZpbmVMb2NhbGU7XG4gICAgaG9va3MudXBkYXRlTG9jYWxlID0gdXBkYXRlTG9jYWxlO1xuICAgIGhvb2tzLmxvY2FsZXMgPSBsaXN0TG9jYWxlcztcbiAgICBob29rcy53ZWVrZGF5c1Nob3J0ID0gbGlzdFdlZWtkYXlzU2hvcnQ7XG4gICAgaG9va3Mubm9ybWFsaXplVW5pdHMgPSBub3JtYWxpemVVbml0cztcbiAgICBob29rcy5yZWxhdGl2ZVRpbWVSb3VuZGluZyA9IGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nO1xuICAgIGhvb2tzLnJlbGF0aXZlVGltZVRocmVzaG9sZCA9IGdldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZDtcbiAgICBob29rcy5jYWxlbmRhckZvcm1hdCA9IGdldENhbGVuZGFyRm9ybWF0O1xuICAgIGhvb2tzLnByb3RvdHlwZSA9IHByb3RvO1xuXG4gICAgLy8gY3VycmVudGx5IEhUTUw1IGlucHV0IHR5cGUgb25seSBzdXBwb3J0cyAyNC1ob3VyIGZvcm1hdHNcbiAgICBob29rcy5IVE1MNV9GTVQgPSB7XG4gICAgICAgIERBVEVUSU1FX0xPQ0FMOiAnWVlZWS1NTS1ERFRISDptbScsIC8vIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiAvPlxuICAgICAgICBEQVRFVElNRV9MT0NBTF9TRUNPTkRTOiAnWVlZWS1NTS1ERFRISDptbTpzcycsIC8vIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBzdGVwPVwiMVwiIC8+XG4gICAgICAgIERBVEVUSU1FX0xPQ0FMX01TOiAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1MnLCAvLyA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgc3RlcD1cIjAuMDAxXCIgLz5cbiAgICAgICAgREFURTogJ1lZWVktTU0tREQnLCAvLyA8aW5wdXQgdHlwZT1cImRhdGVcIiAvPlxuICAgICAgICBUSU1FOiAnSEg6bW0nLCAvLyA8aW5wdXQgdHlwZT1cInRpbWVcIiAvPlxuICAgICAgICBUSU1FX1NFQ09ORFM6ICdISDptbTpzcycsIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIHN0ZXA9XCIxXCIgLz5cbiAgICAgICAgVElNRV9NUzogJ0hIOm1tOnNzLlNTUycsIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIHN0ZXA9XCIwLjAwMVwiIC8+XG4gICAgICAgIFdFRUs6ICdHR0dHLVtXXVdXJywgLy8gPGlucHV0IHR5cGU9XCJ3ZWVrXCIgLz5cbiAgICAgICAgTU9OVEg6ICdZWVlZLU1NJywgLy8gPGlucHV0IHR5cGU9XCJtb250aFwiIC8+XG4gICAgfTtcblxuICAgIHJldHVybiBob29rcztcblxufSkpKTtcbiIsICIvLyBzcmMvaTE4bi50c1xuaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbnMge1xuICAgIHBsdWdpbk5hbWU6IHN0cmluZztcbiAgICBwbHVnaW5EZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIG9wZW5Kb3RWaWV3OiBzdHJpbmc7XG4gICAgcXVpY2tDYXB0dXJlOiBzdHJpbmc7XG4gICAgc2F2ZUFzSm90OiBzdHJpbmc7XG4gICAgc2F2ZWRBc0pvdDogc3RyaW5nO1xuICAgIGpvdFZpZXc6IHN0cmluZztcbiAgICBxdWlja1JlY29yZDogc3RyaW5nO1xuICAgIGNvbnRlbnRQbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHBsYWNlaG9sZGVyV2l0aExpbms6IHN0cmluZztcbiAgICB0YWdzUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICB0YWdzSW5wdXRQbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIHNvdXJjZVBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudFBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudFNlbGVjdGVkOiBzdHJpbmc7XG4gICAgc2F2ZTogc3RyaW5nO1xuICAgIGNhbmNlbDogc3RyaW5nO1xuICAgIGNvbnRlbnRSZXF1aXJlZDogc3RyaW5nO1xuICAgIHNhdmVkOiBzdHJpbmc7XG4gICAgam90VXBkYXRlTm90Rm91bmQ6IHN0cmluZztcbiAgICBqb3RVcGRhdGVOb0ZpbGU6IHN0cmluZztcbiAgICBqb3RVcGRhdGVGaWxlTWlzc2luZzogc3RyaW5nO1xuICAgIHNhdmVGYWlsZWQ6IHN0cmluZztcbiAgICBhdHRhY2htZW50U2F2ZWQ6IHN0cmluZztcbiAgICB0b3RhbDogc3RyaW5nO1xuICAgIHRvZGF5OiBzdHJpbmc7XG4gICAgdGhpc01vbnRoOiBzdHJpbmc7XG4gICAgY2FsZW5kYXI6IHN0cmluZztcbiAgICB5ZWFyOiBzdHJpbmc7XG4gICAgbW9udGg6IHN0cmluZztcbiAgICBzZWFyY2hBbmRUYWdzOiBzdHJpbmc7XG4gICAgc2VhcmNoUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBzZWFyY2hQbGFjZWhvbGRlclNob3J0OiBzdHJpbmc7XG4gICAgbW9yZVRhZ3M6IHN0cmluZztcbiAgICBub1JlY29yZHM6IHN0cmluZztcbiAgICBzZXR0aW5nczogc3RyaW5nO1xuICAgIHNhdmVGb2xkZXI6IHN0cmluZztcbiAgICBzYXZlRm9sZGVyRGVzYzogc3RyaW5nO1xuICAgIGF0dGFjaG1lbnRzRm9sZGVyOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudHNGb2xkZXJEZXNjOiBzdHJpbmc7XG4gICAgYXR0YWNobWVudHNOYW1pbmc6IHN0cmluZztcbiAgICBsb2dNb2RlOiBzdHJpbmc7XG4gICAgbG9nTW9kZURlc2M6IHN0cmluZztcbiAgICBsb2dNb2RlTXVsdGk6IHN0cmluZztcbiAgICBsb2dNb2RlU2luZ2xlOiBzdHJpbmc7XG4gICAgZmlsZUZvcm1hdDogc3RyaW5nO1xuICAgIGZpbGVGb3JtYXREZXNjOiBzdHJpbmc7XG4gICAgdXNlRml4ZWRUYWc6IHN0cmluZztcbiAgICB1c2VGaXhlZFRhZ0Rlc2M6IHN0cmluZztcbiAgICBmaXhlZFRhZzogc3RyaW5nO1xuICAgIGZpeGVkVGFnRGVzYzogc3RyaW5nO1xuICAgIGVuYWJsZVRhZ3NJbkZyb250bWF0dGVyOiBzdHJpbmc7XG4gICAgZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJEZXNjOiBzdHJpbmc7XG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbiAgICBsYW5ndWFnZURlc2M6IHN0cmluZztcbiAgICBsYW5ndWFnZVpoOiBzdHJpbmc7XG4gICAgbGFuZ3VhZ2VFbjogc3RyaW5nO1xuICAgIG11bHRpTW9kZUluZm86IHN0cmluZztcbiAgICBzaW5nbGVNb2RlSW5mbzogc3RyaW5nO1xuICAgIHJlY29yZEZvcm1hdDogc3RyaW5nO1xuICAgIG5ld1JlY29yZEF0VG9wOiBzdHJpbmc7XG4gICAgaW1hZ2VFbWJlZDogc3RyaW5nO1xuICAgIGZpbGVMaW5rOiBzdHJpbmc7XG4gICAgbG9hZGluZ1BsdWdpbjogc3RyaW5nO1xuICAgIHVubG9hZGluZ1BsdWdpbjogc3RyaW5nO1xuICAgIGxvYWRpbmdTZXR0aW5nczogc3RyaW5nO1xuICAgIGNyZWF0aW5nQXR0YWNobWVudHNGb2xkZXI6IHN0cmluZztcbiAgICBhdHRhY2htZW50c0ZvbGRlckV4aXN0czogc3RyaW5nO1xuICAgIGNyZWF0aW5nSm90Vmlldzogc3RyaW5nO1xuICAgIGFjdGl2YXRpbmdWaWV3OiBzdHJpbmc7XG4gICAgcGx1Z2luTm90TG9hZGVkOiBzdHJpbmc7XG4gICAgZXhpc3RpbmdWaWV3Rm91bmQ6IHN0cmluZztcbiAgICBjcmVhdGluZ05ld1ZpZXc6IHN0cmluZztcbiAgICB3ZWVrZGF5czogc3RyaW5nW107XG4gICAgc2VsZWN0ZWRGaWxlczogc3RyaW5nO1xuICAgIHJlY29yZHNDb3VudDogc3RyaW5nO1xuICAgIGF1dG9PcGVuVmlldzogc3RyaW5nO1xuICAgIGF1dG9PcGVuVmlld0Rlc2M6IHN0cmluZztcbiAgICBqb3RVcGRhdGVkQXQ6IHN0cmluZztcbiAgICBwYXN0ZUltYWdlVXBsb2FkRmFpbGVkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCB0cmFuc2xhdGlvbnM6IFJlY29yZDxMYW5ndWFnZSwgVHJhbnNsYXRpb25zPiA9IHtcbiAgICB6aDoge1xuICAgICAgICBwbHVnaW5OYW1lOiBcIlx1OTY4Rlx1NjI0Qlx1OEJCMFwiLFxuICAgICAgICBwbHVnaW5EZXNjcmlwdGlvbjogXCJcdTk2OEZcdTYyNEJcdThCQjBcdTVGNTVcdTYwRjNcdTZDRDVcdTU0OENcdTdCMTRcdThCQjBcIixcbiAgICAgICAgb3BlbkpvdFZpZXc6IFwiXHU2MjUzXHU1RjAwXHU5NjhGXHU2MjRCXHU4QkIwXHU4OUM2XHU1NkZFXCIsXG4gICAgICAgIHF1aWNrQ2FwdHVyZTogXCJcdTVGRUJcdTkwMUZcdThCQjBcdTVGNTVcIixcbiAgICAgICAgc2F2ZUFzSm90OiBcIlx1NEZERFx1NUI1OFx1NEUzQVx1OTY4Rlx1NjI0Qlx1OEJCMFwiLFxuICAgICAgICBzYXZlZEFzSm90OiBcIlx1NURGMlx1NEZERFx1NUI1OFx1NEUzQVx1OTY4Rlx1NjI0Qlx1OEJCMFx1RkYwMVwiLFxuICAgICAgICBqb3RWaWV3OiBcIlx1OTY4Rlx1NjI0Qlx1OEJCMFwiLFxuICAgICAgICBxdWlja1JlY29yZDogXCJcdTVGRUJcdTkwMUZcdThCQjBcdTVGNTVcIixcbiAgICAgICAgY29udGVudFBsYWNlaG9sZGVyOiBcIlx1NkI2NFx1NTIzQlx1NzY4NFx1NjBGM1x1NkNENS4uLlwiLFxuICAgICAgICBwbGFjZWhvbGRlcldpdGhMaW5rOiBcIlx1NkI2NFx1NTIzQlx1NzY4NFx1NjBGM1x1NkNENS4uLlxcblx1OEY5M1x1NTE2NSBbWyBcdTUzRUZcdTVGRUJcdTkwMUZcdTYzRDJcdTUxNjVcdTdCMTRcdThCQjBcdTk0RkVcdTYzQTVcIixcbiAgICAgICAgdGFnc1BsYWNlaG9sZGVyOiBcIlx1NjgwN1x1N0I3RVwiLFxuICAgICAgICB0YWdzSW5wdXRQbGFjZWhvbGRlcjogXCJcdTYzMDlcdTU2REVcdThGNjZcdTZERkJcdTUyQTBcdTY4MDdcdTdCN0VcdUZGMENcdTRGN0ZcdTc1MjggLyBcdThGREJcdTg4NENcdTVENENcdTU5NTdcIixcbiAgICAgICAgc291cmNlUGxhY2Vob2xkZXI6IFwiXHU2NzY1XHU2RTkwXCIsXG4gICAgICAgIGF0dGFjaG1lbnRQbGFjZWhvbGRlcjogXCJcdUQ4M0RcdURDQ0UgXHU3MEI5XHU1MUZCXHU2MjE2XHU2MkQ2XHU2MkZEXHU2NTg3XHU0RUY2XHU1MjMwXHU4RkQ5XHU5MUNDXCIsXG4gICAgICAgIGF0dGFjaG1lbnRTZWxlY3RlZDogXCJcdTI3MDUgXHU1REYyXHU5MDA5XHU2MkU5OiB7ZmlsZW5hbWV9XCIsXG4gICAgICAgIHNhdmU6IFwiXHU0RkREXHU1QjU4XCIsXG4gICAgICAgIGNhbmNlbDogXCJcdTUzRDZcdTZEODhcIixcbiAgICAgICAgY29udGVudFJlcXVpcmVkOiBcIlx1NTE4NVx1NUJCOVx1NEUwRFx1ODBGRFx1NEUzQVx1N0E3QVwiLFxuICAgICAgICBzYXZlZDogXCJcdTVERjJcdTRGRERcdTVCNThcdUZGMDFcIixcbiAgICAgICAgam90VXBkYXRlTm90Rm91bmQ6IFwiXHU1NzI4XHU2NTg3XHU0RUY2XHU0RTJEXHU2MjdFXHU0RTBEXHU1MjMwXHU4QkU1XHU2NzYxXHU5NjhGXHU2MjRCXHU4QkIwXHUzMDAyXCIsXG4gICAgICAgIGpvdFVwZGF0ZU5vRmlsZTogXCJcdThCRTVcdThCQjBcdTVGNTVcdTZDQTFcdTY3MDlcdTUxNzNcdTgwNTRcdTc2ODRcdTY1ODdcdTRFRjZcdTMwMDJcIixcbiAgICAgICAgam90VXBkYXRlRmlsZU1pc3Npbmc6IFwiXHU2RTkwXHU2NTg3XHU0RUY2XHU0RTBEXHU1QjU4XHU1NzI4XHUzMDAyXCIsXG4gICAgICAgIHNhdmVGYWlsZWQ6IFwiXHU0RkREXHU1QjU4XHU1OTMxXHU4RDI1OiB7ZXJyb3J9XCIsXG4gICAgICAgIGF0dGFjaG1lbnRTYXZlZDogXCJcdTk2NDRcdTRFRjZcdTVERjJcdTRGRERcdTVCNTg6IHtmaWxlbmFtZX1cIixcbiAgICAgICAgdG90YWw6IFwiXHU2MDNCXHU4QkExXCIsXG4gICAgICAgIHRvZGF5OiBcIlx1NEVDQVx1NjVFNVwiLFxuICAgICAgICB0aGlzTW9udGg6IFwiXHU2NzJDXHU2NzA4XCIsXG4gICAgICAgIGNhbGVuZGFyOiBcIlx1NjVFNVx1NTM4NlwiLFxuICAgICAgICB5ZWFyOiBcIlx1NUU3NFwiLFxuICAgICAgICBtb250aDogXCJcdTY3MDhcIixcbiAgICAgICAgc2VhcmNoQW5kVGFnczogXCJcdUQ4M0RcdUREMEQgXHU2NDFDXHU3RDIyXHU0RTBFXHU2ODA3XHU3QjdFXCIsXG4gICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyOiBcIlx1NTE3M1x1OTUyRVx1OEJDRFx1RkYxQlx1NTNFRlx1OTAwOSBkYXRlOiAvIHVwZGF0ZWQ6IFx1N0I1Qlx1OTAwOVwiLFxuICAgICAgICBzZWFyY2hQbGFjZWhvbGRlclNob3J0OiBcIlx1NjQxQ1x1N0QyMlx1RkYxQmRhdGU6IC8gdXBkYXRlZDpcIixcbiAgICAgICAgbW9yZVRhZ3M6IFwiXHU4RkQ4XHU2NzA5IHtjb3VudH0gXHU0RTJBXHU2ODA3XHU3QjdFLi4uXCIsXG4gICAgICAgIG5vUmVjb3JkczogXCJcdTY2ODJcdTY1RTBcdThCQjBcdTVGNTVcdUZGMENcdTVGMDBcdTU5Q0JcdThCQjBcdTVGNTVcdTRGNjBcdTc2ODRcdTYwRjNcdTZDRDVcdTU0MjdcdUZGMDFcIixcbiAgICAgICAgc2V0dGluZ3M6IFwiXHU4QkJFXHU3RjZFXCIsXG4gICAgICAgIHNhdmVGb2xkZXI6IFwiXHU0RkREXHU1QjU4XHU2NTg3XHU0RUY2XHU1OTM5XCIsXG4gICAgICAgIHNhdmVGb2xkZXJEZXNjOiBcIlx1NEY0RFx1NEU4RSB2YXVsdCBcdTY4MzlcdTc2RUVcdTVGNTVcdUZGMENcdTRGOEJcdTU5ODJcdUZGMUFKb3RzXCIsXG4gICAgICAgIGF0dGFjaG1lbnRzRm9sZGVyOiBcIlx1OTY0NFx1NEVGNlx1NUI1OFx1NjUzRVx1NzZFRVx1NUY1NVwiLFxuICAgICAgICBhdHRhY2htZW50c0ZvbGRlckRlc2M6IFwiXHU5NjQ0XHU0RUY2XHU1QjU4XHU2NTNFXHU0RjREXHU3RjZFXHVGRjBDXHU0RjhCXHU1OTgyXHVGRjFBSm90cy9hdHRhY2htZW50c1x1MzAwMlx1OTY0NFx1NEVGNlx1NTQ3RFx1NTQwRFx1NjgzQ1x1NUYwRlx1RkYxQWpvdC1ZWVlZTU1ERC1cdTVFOEZcdTY1NzBcIixcbiAgICAgICAgYXR0YWNobWVudHNOYW1pbmc6IFwiXHU5NjQ0XHU0RUY2XHU1NDdEXHU1NDBEXHU2ODNDXHU1RjBGXHVGRjFBam90LVlZWVlNTURELVx1NUU4Rlx1NjU3MFwiLFxuICAgICAgICBsb2dNb2RlOiBcIlx1OEJCMFx1NUY1NVx1NkEyMVx1NUYwRlwiLFxuICAgICAgICBsb2dNb2RlRGVzYzogXCJcdTkwMDlcdTYyRTlcdThCQjBcdTVGNTVcdTRGRERcdTVCNThcdTY1QjlcdTVGMEZcIixcbiAgICAgICAgbG9nTW9kZU11bHRpOiBcIlx1NkJDRlx1NTkyOVx1NEUwMFx1NEUyQVx1NjU4N1x1NEVGNlwiLFxuICAgICAgICBsb2dNb2RlU2luZ2xlOiBcIlx1NTM1NVx1NEUyQVx1NjU4N1x1NEVGNlwiLFxuICAgICAgICBmaWxlRm9ybWF0OiBcIlx1NjU4N1x1NEVGNlx1NTQwRFx1NjgzQ1x1NUYwRlwiLFxuICAgICAgICBmaWxlRm9ybWF0RGVzYzogXCJcdTY1ODdcdTRFRjZcdTU0MERcdTU0N0RcdTU0MERcdTY4M0NcdTVGMEZcdUZGMENcdTRGOEJcdTU5ODJcdUZGMUFqb3QtWVlZWU1NREQgXHU0RjFBXHU3NTFGXHU2MjEwIGpvdC0yMDI2MDMyNi5tZFwiLFxuICAgICAgICB1c2VGaXhlZFRhZzogXCJcdTRGN0ZcdTc1MjhcdTU2RkFcdTVCOUFcdTY4MDdcdTdCN0VcIixcbiAgICAgICAgdXNlRml4ZWRUYWdEZXNjOiBcIlx1NEUzQVx1NkJDRlx1Njc2MVx1OEJCMFx1NUY1NVx1ODFFQVx1NTJBOFx1NkRGQlx1NTJBMFx1NTZGQVx1NUI5QVx1NjgwN1x1N0I3RVwiLFxuICAgICAgICBmaXhlZFRhZzogXCJcdTU2RkFcdTVCOUFcdTY4MDdcdTdCN0VcdTUwM0NcIixcbiAgICAgICAgZml4ZWRUYWdEZXNjOiBcIlx1ODFFQVx1NTJBOFx1NkRGQlx1NTJBMFx1NzY4NFx1NjgwN1x1N0I3RVx1RkYwOFx1NEUwRFx1OTcwMFx1ODk4MSAjIFx1NTNGN1x1RkYwOVwiLFxuICAgICAgICBlbmFibGVUYWdzSW5Gcm9udG1hdHRlcjogXCJcdTU0MkZcdTc1MjggZnJvbnRtYXR0ZXIgXHU2ODA3XHU3QjdFXCIsXG4gICAgICAgIGVuYWJsZVRhZ3NJbkZyb250bWF0dGVyRGVzYzogXCJcdTU3MjhcdTZCQ0ZcdTU5MjlcdTY1ODdcdTRFRjZcdTc2ODQgWUFNTCBcdTUzM0FcdTU3REZcdTZERkJcdTUyQTAgdGFncyBcdTVCNTdcdTZCQjVcdUZGMDhcdTY1QjlcdTRGQkYgRGF0YXZpZXcgXHU3QjQ5XHU2M0QyXHU0RUY2XHU0RjdGXHU3NTI4XHVGRjA5XCIsXG4gICAgICAgIGxhbmd1YWdlOiBcIlx1OEJFRFx1OEEwMFwiLFxuICAgICAgICBsYW5ndWFnZURlc2M6IFwiXHU5MDA5XHU2MkU5XHU2M0QyXHU0RUY2XHU2NjNFXHU3OTNBXHU4QkVEXHU4QTAwXCIsXG4gICAgICAgIGxhbmd1YWdlWmg6IFwiXHU0RTJEXHU2NTg3XCIsXG4gICAgICAgIGxhbmd1YWdlRW46IFwiRW5nbGlzaFwiLFxuICAgICAgICBtdWx0aU1vZGVJbmZvOiBcIlx1RDgzRFx1RENDMSBcdTZCQ0ZcdTU5MjlcdTRFMDBcdTRFMkFcdTY1ODdcdTRFRjZcdTZBMjFcdTVGMEZcdThCRjRcdTY2MEVcdUZGMUFcIixcbiAgICAgICAgc2luZ2xlTW9kZUluZm86IFwiXHVEODNEXHVEQ0M0IFx1NTM1NVx1NEUyQVx1NjU4N1x1NEVGNlx1NkEyMVx1NUYwRlx1OEJGNFx1NjYwRVx1RkYxQVwiLFxuICAgICAgICByZWNvcmRGb3JtYXQ6IFwiXHU2QkNGXHU2NzYxXHU4QkIwXHU1RjU1XHU2ODNDXHU1RjBGXHVGRjFBXCIsXG4gICAgICAgIG5ld1JlY29yZEF0VG9wOiBcIlx1MjAyMiBcdTY1QjBcdThCQjBcdTVGNTVcdTRGMUFcdTgxRUFcdTUyQThcdTZERkJcdTUyQTBcdTUyMzBcdTY1ODdcdTRFRjZcdTY3MDBcdTRFMEFcdTY1QjlcIixcbiAgICAgICAgaW1hZ2VFbWJlZDogXCJcdTIwMjIgXHU1NkZFXHU3MjQ3XHU0RjdGXHU3NTI4ICFbW1x1OERFRlx1NUY4NF1dIFx1NUQ0Q1x1NTE2NVwiLFxuICAgICAgICBmaWxlTGluazogXCJcdTIwMjIgXHU1MTc2XHU0RUQ2XHU2NTg3XHU0RUY2XHU0RjdGXHU3NTI4IFtbXHU4REVGXHU1Rjg0XV0gXHU5NEZFXHU2M0E1XCIsXG4gICAgICAgIGxvYWRpbmdQbHVnaW46IFwiXHU1MkEwXHU4RjdEXHU5NjhGXHU2MjRCXHU4QkIwXHU2M0QyXHU0RUY2XCIsXG4gICAgICAgIHVubG9hZGluZ1BsdWdpbjogXCJcdTUzNzhcdThGN0RcdTk2OEZcdTYyNEJcdThCQjBcdTYzRDJcdTRFRjZcIixcbiAgICAgICAgbG9hZGluZ1NldHRpbmdzOiBcIlx1NTJBMFx1OEY3RFx1OEJCRVx1N0Y2RTpcIixcbiAgICAgICAgY3JlYXRpbmdBdHRhY2htZW50c0ZvbGRlcjogXCJcdTUyMUJcdTVFRkFcdTk2NDRcdTRFRjZcdTc2RUVcdTVGNTU6XCIsXG4gICAgICAgIGF0dGFjaG1lbnRzRm9sZGVyRXhpc3RzOiBcIlx1OTY0NFx1NEVGNlx1NzZFRVx1NUY1NVx1NURGMlx1NUI1OFx1NTcyOFx1NjIxNlx1NTIxQlx1NUVGQVx1NTkzMVx1OEQyNTpcIixcbiAgICAgICAgY3JlYXRpbmdKb3RWaWV3OiBcIlx1NTIxQlx1NUVGQSBKb3RWaWV3IFx1NUI5RVx1NEY4QlwiLFxuICAgICAgICBhY3RpdmF0aW5nVmlldzogXCJcdTZGQzBcdTZEM0JcdTg5QzZcdTU2RkVcIixcbiAgICAgICAgcGx1Z2luTm90TG9hZGVkOiBcIlx1NjNEMlx1NEVGNlx1NjcyQVx1NUI4Q1x1NTE2OFx1NTJBMFx1OEY3RFx1RkYwQ1x1NUVGNlx1OEZERlx1NkZDMFx1NkQzQlwiLFxuICAgICAgICBleGlzdGluZ1ZpZXdGb3VuZDogXCJcdTYyN0VcdTUyMzBcdTczQjBcdTY3MDlcdTg5QzZcdTU2RkVcIixcbiAgICAgICAgY3JlYXRpbmdOZXdWaWV3OiBcIlx1NTIxQlx1NUVGQVx1NjVCMFx1ODlDNlx1NTZGRVwiLFxuICAgICAgICB3ZWVrZGF5czogW1wiXHU2NUU1XCIsIFwiXHU0RTAwXCIsIFwiXHU0RThDXCIsIFwiXHU0RTA5XCIsIFwiXHU1NkRCXCIsIFwiXHU0RTk0XCIsIFwiXHU1MTZEXCJdLFxuICAgICAgICBzZWxlY3RlZEZpbGVzOiBcIlx1MjcwNSBcdTVERjJcdTkwMDlcdTYyRTkge2NvdW50fSBcdTRFMkFcdTY1ODdcdTRFRjZcIixcbiAgICAgICAgcmVjb3Jkc0NvdW50OiBcIntjb3VudH1cdTY3NjFcdThCQjBcdTVGNTVcIixcbiAgICAgICAgYXV0b09wZW5WaWV3OiBcIlx1NjI1M1x1NUYwMCB2YXVsdCBcdTY1RjZcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTk2OEZcdTYyNEJcdThCQjBcdTg5QzZcdTU2RkVcIixcbiAgICAgICAgYXV0b09wZW5WaWV3RGVzYzogXCJcdTU0MkZcdTUyQTggT2JzaWRpYW4gXHU2NUY2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU5NjhGXHU2MjRCXHU4QkIwXHU4OUM2XHU1NkZFXCIsXG4gICAgICAgIGpvdFVwZGF0ZWRBdDogXCJcdTY2RjRcdTY1QjBcIixcbiAgICAgICAgcGFzdGVJbWFnZVVwbG9hZEZhaWxlZDogXCJcdTU2RkVcdTcyNDdcdTRFMEFcdTRGMjBcdTU5MzFcdThEMjVcdUZGMUF7ZXJyb3J9XCIsXG4gICAgfSxcbiAgICBlbjoge1xuICAgICAgICBwbHVnaW5OYW1lOiBcIkpvdFwiLFxuICAgICAgICBwbHVnaW5EZXNjcmlwdGlvbjogXCJRdWljayBub3RlLXRha2luZyBwbHVnaW5cIixcbiAgICAgICAgb3BlbkpvdFZpZXc6IFwiT3BlbiBKb3QgVmlld1wiLFxuICAgICAgICBxdWlja0NhcHR1cmU6IFwiUXVpY2sgQ2FwdHVyZVwiLFxuICAgICAgICBzYXZlQXNKb3Q6IFwiU2F2ZSBhcyBKb3RcIixcbiAgICAgICAgc2F2ZWRBc0pvdDogXCJTYXZlZCBhcyBKb3QhXCIsXG4gICAgICAgIGpvdFZpZXc6IFwiSm90XCIsXG4gICAgICAgIHF1aWNrUmVjb3JkOiBcIlF1aWNrIFJlY29yZFwiLFxuICAgICAgICBjb250ZW50UGxhY2Vob2xkZXI6IFwiV2hhdCdzIG9uIHlvdXIgbWluZC4uLlwiLFxuICAgICAgICBwbGFjZWhvbGRlcldpdGhMaW5rOiBcIldoYXQncyBvbiB5b3VyIG1pbmQuLi5cXG5UeXBlIFtbIHRvIHF1aWNrbHkgaW5zZXJ0IG5vdGUgbGlua3NcIixcbiAgICAgICAgdGFnc1BsYWNlaG9sZGVyOiBcIlRhZ3NcIixcbiAgICAgICAgdGFnc0lucHV0UGxhY2Vob2xkZXI6IFwiUHJlc3MgRW50ZXIgdG8gYWRkIHRhZywgdXNlIC8gZm9yIG5lc3RpbmdcIixcbiAgICAgICAgc291cmNlUGxhY2Vob2xkZXI6IFwiU291cmNlXCIsXG4gICAgICAgIGF0dGFjaG1lbnRQbGFjZWhvbGRlcjogXCJcdUQ4M0RcdURDQ0UgQ2xpY2sgb3IgZHJhZyBmaWxlIGhlcmVcIixcbiAgICAgICAgYXR0YWNobWVudFNlbGVjdGVkOiBcIlx1MjcwNSBTZWxlY3RlZDoge2ZpbGVuYW1lfVwiLFxuICAgICAgICBzYXZlOiBcIlNhdmVcIixcbiAgICAgICAgY2FuY2VsOiBcIkNhbmNlbFwiLFxuICAgICAgICBjb250ZW50UmVxdWlyZWQ6IFwiQ29udGVudCBjYW5ub3QgYmUgZW1wdHlcIixcbiAgICAgICAgc2F2ZWQ6IFwiU2F2ZWQhXCIsXG4gICAgICAgIGpvdFVwZGF0ZU5vdEZvdW5kOiBcIkNvdWxkIG5vdCBmaW5kIHRoYXQgam90IGluIHRoZSBmaWxlLlwiLFxuICAgICAgICBqb3RVcGRhdGVOb0ZpbGU6IFwiVGhpcyBqb3QgaGFzIG5vIHNvdXJjZSBmaWxlLlwiLFxuICAgICAgICBqb3RVcGRhdGVGaWxlTWlzc2luZzogXCJTb3VyY2UgZmlsZSBub3QgZm91bmQuXCIsXG4gICAgICAgIHNhdmVGYWlsZWQ6IFwiU2F2ZSBmYWlsZWQ6IHtlcnJvcn1cIixcbiAgICAgICAgYXR0YWNobWVudFNhdmVkOiBcIkF0dGFjaG1lbnQgc2F2ZWQ6IHtmaWxlbmFtZX1cIixcbiAgICAgICAgdG90YWw6IFwiVG90YWxcIixcbiAgICAgICAgdG9kYXk6IFwiVG9kYXlcIixcbiAgICAgICAgdGhpc01vbnRoOiBcIlRoaXMgTW9udGhcIixcbiAgICAgICAgY2FsZW5kYXI6IFwiQ2FsZW5kYXJcIixcbiAgICAgICAgeWVhcjogXCJcIixcbiAgICAgICAgbW9udGg6IFwiL1wiLFxuICAgICAgICBzZWFyY2hBbmRUYWdzOiBcIlx1RDgzRFx1REQwRCBTZWFyY2ggJiBUYWdzXCIsXG4gICAgICAgIHNlYXJjaFBsYWNlaG9sZGVyOiBcIktleXdvcmRzOyBvcHRpb25hbCBkYXRlOiAvIHVwZGF0ZWQ6IGZpbHRlcnNcIixcbiAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXJTaG9ydDogXCJTZWFyY2g7IGRhdGU6IC8gdXBkYXRlZDpcIixcbiAgICAgICAgbW9yZVRhZ3M6IFwie2NvdW50fSBtb3JlIHRhZ3MuLi5cIixcbiAgICAgICAgbm9SZWNvcmRzOiBcIk5vIHJlY29yZHMgeWV0LiBTdGFydCBjYXB0dXJpbmcgeW91ciB0aG91Z2h0cyFcIixcbiAgICAgICAgc2V0dGluZ3M6IFwiU2V0dGluZ3NcIixcbiAgICAgICAgc2F2ZUZvbGRlcjogXCJTYXZlIEZvbGRlclwiLFxuICAgICAgICBzYXZlRm9sZGVyRGVzYzogXCJMb2NhdGVkIGluIHZhdWx0IHJvb3QsIGUuZy4sIEpvdHNcIixcbiAgICAgICAgYXR0YWNobWVudHNGb2xkZXI6IFwiQXR0YWNobWVudHMgRm9sZGVyXCIsXG4gICAgICAgIGF0dGFjaG1lbnRzRm9sZGVyRGVzYzogXCJBdHRhY2htZW50IHN0b3JhZ2UgbG9jYXRpb24sIGUuZy4sIEpvdHMvYXR0YWNobWVudHMuIE5hbWluZyBmb3JtYXQ6IGpvdC1ZWVlZTU1ERC1udW1iZXJcIixcbiAgICAgICAgYXR0YWNobWVudHNOYW1pbmc6IFwiTmFtaW5nIGZvcm1hdDogam90LVlZWVlNTURELW51bWJlclwiLFxuICAgICAgICBsb2dNb2RlOiBcIkxvZyBNb2RlXCIsXG4gICAgICAgIGxvZ01vZGVEZXNjOiBcIkNob29zZSBob3cgdG8gc2F2ZSByZWNvcmRzXCIsXG4gICAgICAgIGxvZ01vZGVNdWx0aTogXCJPbmUgZmlsZSBwZXIgZGF5XCIsXG4gICAgICAgIGxvZ01vZGVTaW5nbGU6IFwiU2luZ2xlIGZpbGVcIixcbiAgICAgICAgZmlsZUZvcm1hdDogXCJGaWxlIEZvcm1hdFwiLFxuICAgICAgICBmaWxlRm9ybWF0RGVzYzogXCJGaWxlIG5hbWluZyBmb3JtYXQsIGUuZy4sIGpvdC1ZWVlZTU1ERCBnZW5lcmF0ZXMgam90LTIwMjYwMzI2Lm1kXCIsXG4gICAgICAgIHVzZUZpeGVkVGFnOiBcIlVzZSBGaXhlZCBUYWdcIixcbiAgICAgICAgdXNlRml4ZWRUYWdEZXNjOiBcIkF1dG9tYXRpY2FsbHkgYWRkIGEgZml4ZWQgdGFnIHRvIGVhY2ggcmVjb3JkXCIsXG4gICAgICAgIGZpeGVkVGFnOiBcIkZpeGVkIFRhZyBWYWx1ZVwiLFxuICAgICAgICBmaXhlZFRhZ0Rlc2M6IFwiVGFnIHRvIGFkZCBhdXRvbWF0aWNhbGx5IChubyAjIG5lZWRlZClcIixcbiAgICAgICAgZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXI6IFwiRW5hYmxlIEZyb250bWF0dGVyIFRhZ3NcIixcbiAgICAgICAgZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJEZXNjOiBcIkFkZCB0YWdzIGZpZWxkIGluIFlBTUwgZnJvbnRtYXR0ZXIgKGZvciBEYXRhdmlldyBhbmQgb3RoZXIgcGx1Z2lucylcIixcbiAgICAgICAgbGFuZ3VhZ2U6IFwiTGFuZ3VhZ2VcIixcbiAgICAgICAgbGFuZ3VhZ2VEZXNjOiBcIkNob29zZSBwbHVnaW4gZGlzcGxheSBsYW5ndWFnZVwiLFxuICAgICAgICBsYW5ndWFnZVpoOiBcIlx1NEUyRFx1NjU4N1wiLFxuICAgICAgICBsYW5ndWFnZUVuOiBcIkVuZ2xpc2hcIixcbiAgICAgICAgbXVsdGlNb2RlSW5mbzogXCJcdUQ4M0RcdURDQzEgT25lIEZpbGUgUGVyIERheSBNb2RlOlwiLFxuICAgICAgICBzaW5nbGVNb2RlSW5mbzogXCJcdUQ4M0RcdURDQzQgU2luZ2xlIEZpbGUgTW9kZTpcIixcbiAgICAgICAgcmVjb3JkRm9ybWF0OiBcIlJlY29yZCBmb3JtYXQ6XCIsXG4gICAgICAgIG5ld1JlY29yZEF0VG9wOiBcIlx1MjAyMiBOZXcgcmVjb3JkcyBhcmUgYXV0b21hdGljYWxseSBhZGRlZCB0byB0aGUgdG9wXCIsXG4gICAgICAgIGltYWdlRW1iZWQ6IFwiXHUyMDIyIEltYWdlcyBlbWJlZGRlZCB3aXRoICFbW3BhdGhdXVwiLFxuICAgICAgICBmaWxlTGluazogXCJcdTIwMjIgT3RoZXIgZmlsZXMgbGlua2VkIHdpdGggW1twYXRoXV1cIixcbiAgICAgICAgbG9hZGluZ1BsdWdpbjogXCJMb2FkaW5nIEpvdCBwbHVnaW5cIixcbiAgICAgICAgdW5sb2FkaW5nUGx1Z2luOiBcIlVubG9hZGluZyBKb3QgcGx1Z2luXCIsXG4gICAgICAgIGxvYWRpbmdTZXR0aW5nczogXCJMb2FkaW5nIHNldHRpbmdzOlwiLFxuICAgICAgICBjcmVhdGluZ0F0dGFjaG1lbnRzRm9sZGVyOiBcIkNyZWF0aW5nIGF0dGFjaG1lbnRzIGZvbGRlcjpcIixcbiAgICAgICAgYXR0YWNobWVudHNGb2xkZXJFeGlzdHM6IFwiQXR0YWNobWVudHMgZm9sZGVyIGV4aXN0cyBvciBjcmVhdGlvbiBmYWlsZWQ6XCIsXG4gICAgICAgIGNyZWF0aW5nSm90VmlldzogXCJDcmVhdGluZyBKb3RWaWV3IGluc3RhbmNlXCIsXG4gICAgICAgIGFjdGl2YXRpbmdWaWV3OiBcIkFjdGl2YXRpbmcgdmlld1wiLFxuICAgICAgICBwbHVnaW5Ob3RMb2FkZWQ6IFwiUGx1Z2luIG5vdCBmdWxseSBsb2FkZWQsIGRlbGF5aW5nIGFjdGl2YXRpb25cIixcbiAgICAgICAgZXhpc3RpbmdWaWV3Rm91bmQ6IFwiRm91bmQgZXhpc3Rpbmcgdmlld1wiLFxuICAgICAgICBjcmVhdGluZ05ld1ZpZXc6IFwiQ3JlYXRpbmcgbmV3IHZpZXdcIixcbiAgICAgICAgd2Vla2RheXM6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICAgICAgc2VsZWN0ZWRGaWxlczogXCJcdTI3MDUgU2VsZWN0ZWQge2NvdW50fSBmaWxlKHMpXCIsXG4gICAgICAgIHJlY29yZHNDb3VudDogXCJ7Y291bnR9IHJlY29yZChzKVwiLFxuICAgICAgICBhdXRvT3BlblZpZXc6IFwiQXV0by1vcGVuIEpvdCBWaWV3IG9uIHZhdWx0IG9wZW5cIixcbiAgICAgICAgYXV0b09wZW5WaWV3RGVzYzogXCJBdXRvbWF0aWNhbGx5IG9wZW4gSm90IFZpZXcgd2hlbiBPYnNpZGlhbiBzdGFydHNcIixcbiAgICAgICAgam90VXBkYXRlZEF0OiBcIlVwZGF0ZWRcIixcbiAgICAgICAgcGFzdGVJbWFnZVVwbG9hZEZhaWxlZDogXCJJbWFnZSB1cGxvYWQgZmFpbGVkOiB7ZXJyb3J9XCIsXG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHQoa2V5OiBrZXlvZiBUcmFuc2xhdGlvbnMsIGxhbmc6IExhbmd1YWdlLCBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZXh0ID0gdHJhbnNsYXRpb25zW2xhbmddW2tleV07XG4gICAgaWYgKCFwYXJhbXMpIHJldHVybiB0ZXh0O1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhwYXJhbXMpLnJlZHVjZSgocmVzdWx0LCBbcGFyYW0sIHZhbHVlXSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnJlcGxhY2UoYHske3BhcmFtfX1gLCB2YWx1ZSk7XG4gICAgfSwgdGV4dCk7XG59IiwgIi8vIHNyYy91dGlscy50c1xuaW1wb3J0IHsgQXBwLCBURmlsZSwgVEZvbGRlciwgTm90aWNlIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgSm90LCBKb3RTZXR0aW5ncywgTGFuZ3VhZ2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHQsIFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaTE4bic7XG5cbi8qKlxuICogXHU5NjMyXHU2Mjk2XHU1MUZEXHU2NTcwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZTxUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk+KFxuICAgIGZ1bmM6IFQsXG4gICAgd2FpdDogbnVtYmVyXG4pOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gdm9pZCB7XG4gICAgbGV0IHRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbiBleGVjdXRlZEZ1bmN0aW9uKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pIHtcbiAgICAgICAgY29uc3QgbGF0ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICBmdW5jKC4uLmFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICB9O1xufVxuXG4vKiogU3RyaXAgbGVhZGluZyAjLCB0cmltLCBkcm9wIGVtcHRpZXMsIGRlZHVwZSAoZmlyc3Qgb2NjdXJyZW5jZSB3aW5zKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVKb3RUYWdzKHRhZ3M6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBjb25zdCBvdXQ6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChjb25zdCByYXcgb2YgdGFncykge1xuICAgICAgICBjb25zdCBzID0gcmF3LnJlcGxhY2UoL14jKy8sIFwiXCIpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFzIHx8IHNlZW4uaGFzKHMpKSBjb250aW51ZTtcbiAgICAgICAgc2Vlbi5hZGQocyk7XG4gICAgICAgIG91dC5wdXNoKHMpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3Sm90SWQoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMuY3J5cHRvICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGBqb3QtJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDExKX1gO1xufVxuXG4vKiogRGV0ZXJtaW5pc3RpYyBpZCBmb3IgZW50cmllcyB0aGF0IGhhdmUgbm8gYCMjIyMgaWQ6YCBsaW5lIChiYWNrd2FyZCBjb21wYXRpYmlsaXR5KS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFibGVMZWdhY3lKb3RJZChmaWxlUGF0aDogc3RyaW5nLCBkYXRlOiBzdHJpbmcsIHRpbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgcyA9IGAke2ZpbGVQYXRofVxcMCR7ZGF0ZX1cXDAke3RpbWV9YDtcbiAgICBsZXQgaCA9IDIxNjYxMzYyNjE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGggXj0gcy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBoID0gTWF0aC5pbXVsKGgsIDE2Nzc3NjE5KTtcbiAgICB9XG4gICAgcmV0dXJuIGBqb3QtbGVnYWN5LSR7KGggPj4+IDApLnRvU3RyaW5nKDE2KX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Sm90RW50cnlCbG9jayhmdWxsRGF0ZVRpbWU6IHN0cmluZywgaWQ6IHN0cmluZywgdXBkYXRlZEF0OiBzdHJpbmcsIGJvZHk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAjIyMgJHtmdWxsRGF0ZVRpbWV9XFxuIyMjIyBpZDogJHtpZH1cXG4jIyMjIHVwZGF0ZWRBdDogJHt1cGRhdGVkQXR9XFxuXFxuJHtib2R5fVxcblxcbi0tLVxcblxcbmA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlSm90TWFya2Rvd25Cb2R5KFxuICAgIGNvbnRlbnQ6IHN0cmluZyxcbiAgICB0YWdzOiBzdHJpbmdbXSxcbiAgICBzb3VyY2U6IHN0cmluZyxcbiAgICBhdHRhY2htZW50czogeyBwYXRoOiBzdHJpbmc7IHR5cGU6IFwiaW1hZ2VcIiB8IFwiZmlsZVwiIH1bXSB8IHVuZGVmaW5lZCxcbiAgICBsYW5nOiBMYW5ndWFnZSxcbiAgICB1c2VGaXhlZFRhZzogYm9vbGVhbixcbiAgICBmaXhlZFRhZzogc3RyaW5nXG4pOiB7IGJvZHk6IHN0cmluZzsgYWxsVGFnczogc3RyaW5nW10gfSB7XG4gICAgbGV0IGFsbFRhZ3MgPSBub3JtYWxpemVKb3RUYWdzKHRhZ3MpO1xuICAgIGlmICh1c2VGaXhlZFRhZyAmJiBmaXhlZFRhZykge1xuICAgICAgICBjb25zdCBmaXhlZFRhZ0NsZWFuID0gZml4ZWRUYWcucmVwbGFjZSgvXiMrLywgXCJcIikudHJpbSgpO1xuICAgICAgICBpZiAoIWFsbFRhZ3MuaW5jbHVkZXMoZml4ZWRUYWdDbGVhbikpIGFsbFRhZ3MucHVzaChmaXhlZFRhZ0NsZWFuKTtcbiAgICB9XG4gICAgYWxsVGFncyA9IG5vcm1hbGl6ZUpvdFRhZ3MoYWxsVGFncyk7XG4gICAgY29uc3QgdGFnTGluZSA9IGFsbFRhZ3MubGVuZ3RoID4gMCA/IGFsbFRhZ3MubWFwKHggPT4gYCMke3h9YCkuam9pbihcIiBcIikgOiBcIlwiO1xuICAgIGxldCBmaW5hbENvbnRlbnQgPSBjb250ZW50O1xuICAgIGNvbnN0IGF0dGFjaG1lbnRMaW5lcyA9XG4gICAgICAgIGF0dGFjaG1lbnRzICYmIGF0dGFjaG1lbnRzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gYXR0YWNobWVudHMubWFwKGF0dCA9PiAoYXR0LnR5cGUgPT09IFwiaW1hZ2VcIiA/IGAhW1ske2F0dC5wYXRofV1dYCA6IGBbWyR7YXR0LnBhdGh9XV1gKSkuam9pbihcIlxcblwiKVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgIGlmICh0YWdMaW5lKSBmaW5hbENvbnRlbnQgKz0gYFxcblxcbiR7dGFnTGluZX1gO1xuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgY29uc3Qgc291cmNlUHJlZml4ID0gbGFuZyA9PT0gXCJ6aFwiID8gXCJcdTY3NjVcdTZFOTA6XCIgOiBcIlNvdXJjZTpcIjtcbiAgICAgICAgZmluYWxDb250ZW50ICs9IGBcXG5cXG4ke3NvdXJjZVByZWZpeH0gJHtzb3VyY2V9YDtcbiAgICB9XG4gICAgaWYgKGF0dGFjaG1lbnRMaW5lcykgZmluYWxDb250ZW50ICs9IGBcXG5cXG4ke2F0dGFjaG1lbnRMaW5lc31gO1xuICAgIHJldHVybiB7IGJvZHk6IGZpbmFsQ29udGVudCwgYWxsVGFncyB9O1xufVxuXG4vKiogUmVwbGFjZSBvbmUgYCMjI2Agam90IGJsb2NrIGJ5IGlkOyBwcmVzZXJ2ZXMgcHJlZml4IChlLmcuIGZyb250bWF0dGVyKSBhbmQgb3RoZXIgYmxvY2tzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VKb3RCbG9ja0J5SWQoXG4gICAgY29udGVudDogc3RyaW5nLFxuICAgIGZpbGVQYXRoOiBzdHJpbmcsXG4gICAgdGFyZ2V0SWQ6IHN0cmluZyxcbiAgICBuZXdCbG9jazogc3RyaW5nXG4pOiB7IGNvbnRlbnQ6IHN0cmluZzsgZm91bmQ6IGJvb2xlYW4gfSB7XG4gICAgY29uc3QgbGluZXMgPSBjb250ZW50LnNwbGl0KFwiXFxuXCIpO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGxpbmVzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBsaW5lVHJpbSA9IGxpbmVzW2ldLnRyaW0oKTtcbiAgICAgICAgaWYgKGxpbmVUcmltLnN0YXJ0c1dpdGgoXCIjIyMgXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBibG9ja1N0YXJ0ID0gaTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclJlc3QgPSBsaW5lVHJpbS5zdWJzdHJpbmcoNCkudHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgW2RhdGUsIHRpbWVdID0gaGVhZGVyUmVzdC5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBsZXQgbWV0YUlkID0gXCJcIjtcbiAgICAgICAgICAgIGxldCBqID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoaiA8IGxpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBsaW5lc1tqXS50cmltKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaWRNYXRjaCA9IHQubWF0Y2goL14jIyMjXFxzK2lkOlxccyooLispJC9pKTtcbiAgICAgICAgICAgICAgICBpZiAoaWRNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRhSWQgPSBpZE1hdGNoWzFdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKC9eIyMjI1xccyt1cGRhdGVkQXQ6XFxzKi4rJC9pLnRlc3QodCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpZCA9IG1ldGFJZCB8fCBzdGFibGVMZWdhY3lKb3RJZChmaWxlUGF0aCwgZGF0ZSB8fCBcIlwiLCB0aW1lIHx8IFwiXCIpO1xuICAgICAgICAgICAgbGV0IGsgPSBqO1xuICAgICAgICAgICAgd2hpbGUgKGsgPCBsaW5lcy5sZW5ndGggJiYgIWxpbmVzW2tdLnRyaW0oKS5zdGFydHNXaXRoKFwiIyMjIFwiKSkge1xuICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZCA9PT0gdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmVmaXggPSBsaW5lcy5zbGljZSgwLCBibG9ja1N0YXJ0KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1ZmZpeCA9IGxpbmVzLnNsaWNlKGspLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgbGV0IG5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChwcmVmaXgpIG5leHQgPSBwcmVmaXggKyBcIlxcblwiO1xuICAgICAgICAgICAgICAgIG5leHQgKz0gbmV3QmxvY2s7XG4gICAgICAgICAgICAgICAgaWYgKHN1ZmZpeCkgbmV4dCArPSBzdWZmaXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29udGVudDogbmV4dCwgZm91bmQ6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgPSBrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGNvbnRlbnQsIGZvdW5kOiBmYWxzZSB9O1xufVxuXG4vKipcbiAqIFx1ODlFM1x1Njc5MFx1NjU4N1x1NEVGNlx1NTE4NVx1NUJCOVx1NEUzQSBKb3QgXHU2NTcwXHU3RUM0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpbGVDb250ZW50KFxuICAgIGNvbnRlbnQ6IHN0cmluZyxcbiAgICBmaWxlUGF0aDogc3RyaW5nLFxuICAgIGxhbmc6IExhbmd1YWdlXG4pOiBKb3RbXSB7XG4gICAgY29uc3QgZW50cmllczogSm90W10gPSBbXTtcbiAgICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoXCJcXG5cIik7XG4gICAgbGV0IGkgPSAwO1xuXG4gICAgY29uc3Qgc291cmNlUHJlZml4ZXMgPSBsYW5nID09PSAnemgnID8gW1wiXHU2NzY1XHU2RTkwOlwiXSA6IFtcIlNvdXJjZTpcIiwgXCJcdTY3NjVcdTZFOTA6XCJdO1xuXG4gICAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2ldLnRyaW0oKTtcbiAgICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aChcIiMjIyBcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxEYXRlVGltZSA9IGxpbmUuc3Vic3RyaW5nKDQpLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IFtkYXRlLCB0aW1lXSA9IGZ1bGxEYXRlVGltZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkQXQgPSBbZGF0ZSwgdGltZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuXG4gICAgICAgICAgICBsZXQgaiA9IGkgKyAxO1xuICAgICAgICAgICAgbGV0IGlkTWV0YSA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgdXBkYXRlZEF0TWV0YSA9IFwiXCI7XG4gICAgICAgICAgICB3aGlsZSAoaiA8IGxpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBsaW5lc1tqXS50cmltKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaWRNYXRjaCA9IHQubWF0Y2goL14jIyMjXFxzK2lkOlxccyooLiopJC9pKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRNYXRjaCA9IHQubWF0Y2goL14jIyMjXFxzK3VwZGF0ZWRBdDpcXHMqKC4qKSQvaSk7XG4gICAgICAgICAgICAgICAgaWYgKGlkTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgaWRNZXRhID0gaWRNYXRjaFsxXS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1cGRNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXRNZXRhID0gdXBkTWF0Y2hbMV0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGlkID0gaWRNZXRhIHx8IHN0YWJsZUxlZ2FjeUpvdElkKGZpbGVQYXRoLCBkYXRlIHx8IFwiXCIsIHRpbWUgfHwgXCJcIik7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQXQgPSB1cGRhdGVkQXRNZXRhIHx8IGNyZWF0ZWRBdDtcblxuICAgICAgICAgICAgbGV0IGpvdENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgbGV0IHRhZ3M6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBsZXQgc291cmNlID0gXCJcIjtcbiAgICAgICAgICAgIGxldCBhdHRhY2htZW50czogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGxldCBhdHRhY2htZW50VHlwZXM6IChcImltYWdlXCIgfCBcImZpbGVcIilbXSA9IFtdO1xuXG4gICAgICAgICAgICB3aGlsZSAoaiA8IGxpbmVzLmxlbmd0aCAmJiAhbGluZXNbal0udHJpbSgpLnN0YXJ0c1dpdGgoXCIjIyMgXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudExpbmUgPSBsaW5lc1tqXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmltbWVkTGluZSA9IGN1cnJlbnRMaW5lLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGlmICghdHJpbW1lZExpbmUgfHwgdHJpbW1lZExpbmUgPT09IFwiLS0tXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTY2MkZcdTU0MjZcdTY2MkZcdTY4MDdcdTdCN0VcdTg4NENcbiAgICAgICAgICAgICAgICBpZiAodHJpbW1lZExpbmUubWF0Y2goL14jW1xcd1xcdTRlMDAtXFx1OWZmZlxcL1xcLV9dKyhcXHMrI1tcXHdcXHU0ZTAwLVxcdTlmZmZcXC9cXC1fXSspKiQvKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWdNYXRjaGVzID0gdHJpbW1lZExpbmUubWF0Y2goLyNbXFx3XFx1NGUwMC1cXHU5ZmZmXFwvXFwtX10rL2cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFnTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFncyA9IG5vcm1hbGl6ZUpvdFRhZ3ModGFnTWF0Y2hlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU2NjJGXHU1NDI2XHU2NjJGXHU2NzY1XHU2RTkwXHU4ODRDXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRQcmVmaXggPSBzb3VyY2VQcmVmaXhlcy5maW5kKHAgPT4gdHJpbW1lZExpbmUuc3RhcnRzV2l0aChwKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVkUHJlZml4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSB0cmltbWVkTGluZS5zdWJzdHJpbmcobWF0Y2hlZFByZWZpeC5sZW5ndGgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTY2MkZcdTU0MjZcdTY2MkZcdTk2NDRcdTRFRjZcdTg4NENcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJpY3RMaW5rTWF0Y2ggPSB0cmltbWVkTGluZS5tYXRjaCgvXighP1xcW1xcW1teXFxdXStcXF1cXF0pJC8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmljdExpbmtNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gdHJpbW1lZExpbmUubWF0Y2goLyE/XFxbXFxbKC4qPylcXF1cXF0vKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudHMucHVzaChtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRUeXBlcy5wdXNoKHRyaW1tZWRMaW5lLnN0YXJ0c1dpdGgoXCIhW1tcIikgPyBcImltYWdlXCIgOiBcImZpbGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTUxODVcdTVCQjlcdTg4NENcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoam90Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqb3RDb250ZW50ICs9IFwiXFxuXCIgKyBjdXJyZW50TGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqb3RDb250ZW50ID0gY3VycmVudExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoam90Q29udGVudC50cmltKCkgfHwgdGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZW50cmllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdCxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0LFxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBkYXRlIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IHRpbWUgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogam90Q29udGVudC50cmltKCksXG4gICAgICAgICAgICAgICAgICAgIHRhZ3M6IHRhZ3MsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgICAgICBmdWxsVGV4dDogam90Q29udGVudC50cmltKCksXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudFR5cGVzOiBhdHRhY2htZW50VHlwZXMsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBmaWxlUGF0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpID0gajtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbnRyaWVzO1xufVxuXG4vKipcbiAqIEltYWdlIGRldGVjdGlvbiBmb3IgY2xpcGJvYXJkICsgdmF1bHQgc2F2ZXM6IHRydXN0IGBpbWFnZS8qYCwgYW5kIHdoZW4gTUlNRSBpcyBtaXNzaW5nXG4gKiBvciBnZW5lcmljIChgYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtYCkgdXNlIGNvbW1vbiBpbWFnZSBleHRlbnNpb25zIChwbGF0Zm9ybSBwYXN0ZSBxdWlya3MpLlxuICovXG5mdW5jdGlvbiBpc1Byb2JhYmx5SW1hZ2VGaWxlKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcbiAgICBpZiAoZmlsZS50eXBlLnN0YXJ0c1dpdGgoXCJpbWFnZS9cIikpIHJldHVybiB0cnVlO1xuICAgIGlmIChmaWxlLnR5cGUgJiYgZmlsZS50eXBlICE9PSBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIC9cXC4ocG5nfGpwZT9nfGdpZnx3ZWJwfGJtcHxzdmd8aGVpY3xoZWlmfGF2aWYpJC9pLnRlc3QoZmlsZS5uYW1lKTtcbn1cblxuLyoqIENsaXBib2FyZCBpbWFnZSBmaWxlcyBmb3IgcGFzdGUgaGFuZGxpbmcgKGBmaWxlc2AgZmlyc3QsIHRoZW4gYGl0ZW1zYCBmb3Igc29tZSBicm93c2VycykuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xpcGJvYXJkSW1hZ2VGaWxlcyhkYXRhVHJhbnNmZXI6IERhdGFUcmFuc2ZlciB8IG51bGwpOiBGaWxlW10ge1xuICAgIGlmICghZGF0YVRyYW5zZmVyKSByZXR1cm4gW107XG4gICAgY29uc3QgZnJvbUZpbGVzID0gQXJyYXkuZnJvbShkYXRhVHJhbnNmZXIuZmlsZXMgPz8gW10pLmZpbHRlcihpc1Byb2JhYmx5SW1hZ2VGaWxlKTtcbiAgICBpZiAoZnJvbUZpbGVzLmxlbmd0aCA+IDApIHJldHVybiBmcm9tRmlsZXM7XG4gICAgY29uc3Qgb3V0OiBGaWxlW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgQXJyYXkuZnJvbShkYXRhVHJhbnNmZXIuaXRlbXMgPz8gW10pKSB7XG4gICAgICAgIGlmIChpdGVtLmtpbmQgIT09IFwiZmlsZVwiKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgdCA9IGl0ZW0udHlwZTtcbiAgICAgICAgaWYgKCF0LnN0YXJ0c1dpdGgoXCJpbWFnZS9cIikgJiYgdCAhPT0gXCJcIiAmJiB0ICE9PSBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiKSBjb250aW51ZTtcbiAgICAgICAgY29uc3QgZiA9IGl0ZW0uZ2V0QXNGaWxlKCk7XG4gICAgICAgIGlmIChmICYmIGlzUHJvYmFibHlJbWFnZUZpbGUoZikpIG91dC5wdXNoKGYpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFx1NTkwNFx1NzQwNlx1OTY0NFx1NEVGNlx1NEZERFx1NUI1OFx1RkYwOFx1NEZFRVx1NTkwRFx1NjVFMFx1OTY1MFx1OTAxMlx1NUY1Mlx1NTQ4Q1x1NjU4N1x1NEVGNlx1NTQwRFx1NTMzOVx1OTE0RFx1OTVFRVx1OTg5OFx1RkYwOVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlQXR0YWNobWVudChcbiAgICBhcHA6IEFwcCxcbiAgICBmaWxlOiBGaWxlLFxuICAgIHNldHRpbmdzOiBKb3RTZXR0aW5ncyxcbiAgICBsYW5nOiBMYW5ndWFnZSxcbiAgICBjYWxsYmFjazogKHJlc3VsdDogeyBwYXRoOiBzdHJpbmc7IHR5cGU6IFwiaW1hZ2VcIiB8IFwiZmlsZVwiIH0pID0+IHZvaWQsXG4gICAgb3B0aW9ucz86IHsgZmFpbHVyZU5vdGljZUtleT86IGtleW9mIFRyYW5zbGF0aW9ucyB9XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkYXRlU3RyID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcbiAgICBjb25zdCBkYXRlU3RyTm9EYXNoID0gZGF0ZVN0ci5yZXBsYWNlKC8tL2csIFwiXCIpO1xuICAgIGNvbnN0IGF0dGFjaG1lbnRzRm9sZGVyID0gc2V0dGluZ3MuYXR0YWNobWVudHNGb2xkZXI7XG5cbiAgICBpZiAoIWFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoYXR0YWNobWVudHNGb2xkZXIpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBhcHAudmF1bHQuY3JlYXRlRm9sZGVyKGF0dGFjaG1lbnRzRm9sZGVyKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UodCgnYXR0YWNobWVudHNGb2xkZXJFeGlzdHMnLCBsYW5nKSArIGAgJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZvbGRlciA9IGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoYXR0YWNobWVudHNGb2xkZXIpO1xuICAgIGxldCBleGlzdGluZ0ZpbGVzOiBURmlsZVtdID0gW107XG4gICAgaWYgKGZvbGRlciAmJiBmb2xkZXIgaW5zdGFuY2VvZiBURm9sZGVyKSB7XG4gICAgICAgIC8vIFx1NEZFRVx1NTkwRFx1RkYxQVx1NEY3Rlx1NzUyOFx1NEUwRFx1NUUyNlx1NkEyQVx1N0VCRlx1NzY4NFx1NjgzQ1x1NUYwRlx1OEZEQlx1ODg0Q1x1NTMzOVx1OTE0RFxuICAgICAgICBleGlzdGluZ0ZpbGVzID0gZm9sZGVyLmNoaWxkcmVuLmZpbHRlcihcbiAgICAgICAgICAgIGYgPT4gZiBpbnN0YW5jZW9mIFRGaWxlICYmIGYubmFtZS5zdGFydHNXaXRoKGBqb3QtJHtkYXRlU3RyTm9EYXNofWApXG4gICAgICAgICkgYXMgVEZpbGVbXTtcbiAgICB9XG5cbiAgICBsZXQgbWF4TnVtYmVyID0gMDtcbiAgICBmb3IgKGNvbnN0IGYgb2YgZXhpc3RpbmdGaWxlcykge1xuICAgICAgICBjb25zdCBtYXRjaCA9IGYubmFtZS5tYXRjaCgvam90LShcXGR7OH0pLShcXGQrKVxcLi8pO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KG1hdGNoWzJdLCAxMCk7XG4gICAgICAgICAgICBpZiAobnVtID4gbWF4TnVtYmVyKSBtYXhOdW1iZXIgPSBudW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBcdTRGRUVcdTU5MERcdUZGMUFcdTRGN0ZcdTc1MjhcdTVGQUFcdTczQUZcdTY2RkZcdTRFRTNcdTkwMTJcdTVGNTJcdUZGMENcdTkwN0ZcdTUxNERcdTY1RTBcdTk2NTBcdTkwMTJcdTVGNTJcbiAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgIGNvbnN0IG1heEF0dGVtcHRzID0gMTAwO1xuICAgIGxldCBzZXJpYWxOdW1iZXI6IHN0cmluZztcbiAgICBsZXQgZmlsZW5hbWU6IHN0cmluZztcbiAgICBsZXQgZmlsZVBhdGg6IHN0cmluZztcblxuICAgIGRvIHtcbiAgICAgICAgbWF4TnVtYmVyKys7XG4gICAgICAgIHNlcmlhbE51bWJlciA9IFN0cmluZyhtYXhOdW1iZXIpLnBhZFN0YXJ0KDMsIFwiMFwiKTtcbiAgICAgICAgY29uc3QgZXh0ID0gZmlsZS5uYW1lLnNwbGl0KFwiLlwiKS5wb3AoKSB8fCBcImJpblwiO1xuICAgICAgICBmaWxlbmFtZSA9IGBqb3QtJHtkYXRlU3RyTm9EYXNofS0ke3NlcmlhbE51bWJlcn0uJHtleHR9YDtcbiAgICAgICAgZmlsZVBhdGggPSBgJHthdHRhY2htZW50c0ZvbGRlcn0vJHtmaWxlbmFtZX1gO1xuICAgICAgICBhdHRlbXB0cysrO1xuICAgIH0gd2hpbGUgKGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpICYmIGF0dGVtcHRzIDwgbWF4QXR0ZW1wdHMpO1xuXG4gICAgaWYgKGF0dGVtcHRzID49IG1heEF0dGVtcHRzKSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJcdTY1RTBcdTZDRDVcdTc1MUZcdTYyMTBcdTU1MkZcdTRFMDBcdTY1ODdcdTRFRjZcdTU0MERcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgYXdhaXQgYXBwLnZhdWx0LmNyZWF0ZUJpbmFyeShmaWxlUGF0aCwgYXJyYXlCdWZmZXIpO1xuXG4gICAgICAgIGNvbnN0IGlzSW1hZ2UgPSBpc1Byb2JhYmx5SW1hZ2VGaWxlKGZpbGUpO1xuICAgICAgICBjYWxsYmFjayh7IHBhdGg6IGZpbGVQYXRoLCB0eXBlOiBpc0ltYWdlID8gXCJpbWFnZVwiIDogXCJmaWxlXCIgfSk7XG4gICAgICAgIG5ldyBOb3RpY2UodCgnYXR0YWNobWVudFNhdmVkJywgbGFuZywgeyBmaWxlbmFtZSB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlx1NEZERFx1NUI1OFx1OTY0NFx1NEVGNlx1NTkzMVx1OEQyNTpcIiwgZXJyb3IpO1xuICAgICAgICBjb25zdCBub3RpY2VLZXkgPSBvcHRpb25zPy5mYWlsdXJlTm90aWNlS2V5ID8/IFwic2F2ZUZhaWxlZFwiO1xuICAgICAgICBuZXcgTm90aWNlKHQobm90aWNlS2V5LCBsYW5nLCB7IGVycm9yOiAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UgfSkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBcdThCQkVcdTdGNkUgd2lraWxpbmsgXHU4MUVBXHU1MkE4XHU1QjhDXHU2MjEwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlKFxuICAgIGFwcDogQXBwLFxuICAgIHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LFxuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgb25TdWdnZXN0aW9uU2VsZWN0OiAoZmlsZTogVEZpbGUsIHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBicmFja2V0U3RhcnQ6IG51bWJlcikgPT4gdm9pZFxuKTogKCkgPT4gdm9pZCB7XG4gICAgbGV0IHN1Z2dlc3Rpb25Db250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IHN1Z2dlc3Rpb25UaW1lb3V0OiBOb2RlSlMuVGltZW91dDtcblxuICAgIGNvbnN0IGhpZGVTdWdnZXN0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHN1Z2dlc3Rpb25Db250YWluZXIpIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgICBoaWRlU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHN1Z2dlc3Rpb25UaW1lb3V0KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0QWN0aXZlU3VnZ2VzdGlvbiA9IChpdGVtczogTm9kZUxpc3RPZjxFbGVtZW50PiB8IGFueVtdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IEVsZW1lbnQsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiam90cy1zdWdnZXN0aW9uLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAoaXRlbSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImpvdHMtc3VnZ2VzdGlvbi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgY3Vyc29yUG9zID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGNvbnN0IHRleHRCZWZvcmVDdXJzb3IgPSB0ZXh0YXJlYS52YWx1ZS5zdWJzdHJpbmcoMCwgY3Vyc29yUG9zKTtcblxuICAgICAgICBjb25zdCBsYXN0RG91YmxlQnJhY2tldCA9IHRleHRCZWZvcmVDdXJzb3IubGFzdEluZGV4T2YoXCJbW1wiKTtcbiAgICAgICAgaWYgKGxhc3REb3VibGVCcmFja2V0ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgYWZ0ZXJMYXN0QnJhY2tldCA9IHRleHRCZWZvcmVDdXJzb3Iuc3Vic3RyaW5nKGxhc3REb3VibGVCcmFja2V0ICsgMik7XG4gICAgICAgICAgICBpZiAoIWFmdGVyTGFzdEJyYWNrZXQuaW5jbHVkZXMoXCJdXVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBhZnRlckxhc3RCcmFja2V0O1xuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN1Z2dlc3Rpb25UaW1lb3V0KTtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IGFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaExvd2VyID0gc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZmlsZSA9PiBmaWxlLmJhc2VuYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIDEwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVTdWdnZXN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdWdnZXN0aW9uQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJqb3RzLXN1Z2dlc3Rpb25zXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5ib3hTaGFkb3cgPSBcIjAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjE1KVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBcIjk5OTk5XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLm1heEhlaWdodCA9IFwiMjAwcHhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUubWluSGVpZ2h0ID0gXCIxMjBweFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUubWluV2lkdGggPSBcIjIwMHB4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3VnZ2VzdGlvbkNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBcdThCQTFcdTdCOTdcdTVFRkFcdThCQUVcdTUyMTdcdTg4NjhcdTRGNERcdTdGNkVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dGFyZWFSZWN0ID0gdGV4dGFyZWEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUubGVmdCA9IGAke3RleHRhcmVhUmVjdC5sZWZ0fXB4YDtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS50b3AgPSBgJHt0ZXh0YXJlYVJlY3QuYm90dG9tICsgNH1weGA7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUud2lkdGggPSBgJHt0ZXh0YXJlYVJlY3Qud2lkdGh9cHhgO1xuXG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25Db250YWluZXIuZW1wdHkoKTtcblxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzLmZvckVhY2goKGZpbGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc3VnZ2VzdGlvbkNvbnRhaW5lciEuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJqb3RzLXN1Z2dlc3Rpb24taXRlbVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGV4dENvbnRlbnQgPSBmaWxlLmJhc2VuYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5wYWRkaW5nID0gXCI2cHggMTJweFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuZm9udFNpemUgPSBcIjEycHhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiam90cy1zdWdnZXN0aW9uLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdWdnZXN0aW9uU2VsZWN0KGZpbGUsIHRleHRhcmVhLCBsYXN0RG91YmxlQnJhY2tldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVTdWdnZXN0aW9uKG1hdGNoZXMsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGhpZGVTdWdnZXN0aW9ucygpO1xuICAgIH0pO1xuXG4gICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKCFzdWdnZXN0aW9uQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaXRlbXMgPSBzdWdnZXN0aW9uQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuam90cy1zdWdnZXN0aW9uLWl0ZW1cIik7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSBzdWdnZXN0aW9uQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1zdWdnZXN0aW9uLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSAtMTtcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IGFjdGl2ZUl0ZW0pIGFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gKGFjdGl2ZUluZGV4ICsgMSkgJSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICBzZXRBY3RpdmVTdWdnZXN0aW9uKGl0ZW1zLCBuZXh0SW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gYWN0aXZlSW5kZXggPD0gMCA/IGl0ZW1zLmxlbmd0aCAtIDEgOiBhY3RpdmVJbmRleCAtIDE7XG4gICAgICAgICAgICBzZXRBY3RpdmVTdWdnZXN0aW9uKGl0ZW1zLCBwcmV2SW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgfHwgZS5rZXkgPT09IFwiVGFiXCIpIHtcbiAgICAgICAgICAgIGlmIChhY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIChhY3RpdmVJdGVtIGFzIEhUTUxFbGVtZW50KS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgICBoaWRlU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhpZGVTdWdnZXN0aW9ucygpLCAyMDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNsZWFudXA7XG59XG5cbi8qKlxuICogXHU4QkJFXHU3RjZFXHU2ODA3XHU3QjdFXHU4MUVBXHU1MkE4XHU1QjhDXHU2MjEwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFRhZ0F1dG9jb21wbGV0ZShcbiAgICBnZXRFeGlzdGluZ1RhZ3M6ICgpID0+IHN0cmluZ1tdLFxuICAgIHRhZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50LFxuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgdGFnTGlzdENvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgY3VycmVudFRhZ3M6IHN0cmluZ1tdLFxuICAgIG9uQWRkVGFnOiAodGFnOiBzdHJpbmcpID0+IHZvaWQsXG4gICAgb25SZW5kZXJUYWdMaXN0OiAodGFnczogc3RyaW5nW10pID0+IHZvaWRcbik6IHZvaWQge1xuICAgIGxldCB0YWdTdWdnZXN0aW9uQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIGxldCBzdWdnZXN0aW9uVGltZW91dDogTm9kZUpTLlRpbWVvdXQ7XG5cbiAgICBjb25zdCBoaWRlVGFnU3VnZ2VzdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0YWdTdWdnZXN0aW9uQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0QWN0aXZlVGFnU3VnZ2VzdGlvbiA9IChpdGVtczogTm9kZUxpc3RPZjxFbGVtZW50PiB8IGFueVtdLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IEVsZW1lbnQsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiam90cy10YWctc3VnZ2VzdGlvbi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAoaXRlbSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKVwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJqb3RzLXRhZy1zdWdnZXN0aW9uLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgIChpdGVtIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hvd1RhZ1N1Z2dlc3Rpb25zID0gKHNlYXJjaFRlcm06IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBhbGxUYWdzID0gZ2V0RXhpc3RpbmdUYWdzKCk7XG4gICAgICAgIGNvbnN0IHNlYXJjaExvd2VyID0gc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gYWxsVGFnc1xuICAgICAgICAgICAgLmZpbHRlcih0YWcgPT4gdGFnLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpKVxuICAgICAgICAgICAgLmZpbHRlcih0YWcgPT4gIWN1cnJlbnRUYWdzLmluY2x1ZGVzKHRhZykpXG4gICAgICAgICAgICAuc2xpY2UoMCwgOCk7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBoaWRlVGFnU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGFnU3VnZ2VzdGlvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImpvdHMtdGFnLXN1Z2dlc3Rpb25zXCIpO1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUudG9wID0gXCIxMDAlXCI7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUucmlnaHQgPSBcIjBcIjtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICAgICAgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5zdHlsZS5ib3hTaGFkb3cgPSBcIjAgMnB4IDhweCByZ2JhKDAsMCwwLDAuMSlcIjtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUuekluZGV4ID0gXCIxMDAwXCI7XG4gICAgICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLm1heEhlaWdodCA9IFwiMjAwcHhcIjtcbiAgICAgICAgICAgIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gXCJhdXRvXCI7XG4gICAgICAgIH1cblxuICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLmVtcHR5KCk7XG5cbiAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKCh0YWcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGFnU3VnZ2VzdGlvbkNvbnRhaW5lciEuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJqb3RzLXRhZy1zdWdnZXN0aW9uLWl0ZW1cIik7XG4gICAgICAgICAgICBpdGVtLnRleHRDb250ZW50ID0gYCMke3RhZ31gO1xuICAgICAgICAgICAgaXRlbS5zdHlsZS5wYWRkaW5nID0gXCI2cHggMTJweFwiO1xuICAgICAgICAgICAgaXRlbS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZm9udFNpemUgPSBcIjEycHhcIjtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICBpdGVtLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiam90cy10YWctc3VnZ2VzdGlvbi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3ZlcilcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9uQWRkVGFnKHRhZyk7XG4gICAgICAgICAgICAgICAgdGFnSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGhpZGVUYWdTdWdnZXN0aW9ucygpO1xuICAgICAgICAgICAgICAgIHRhZ0lucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlVGFnU3VnZ2VzdGlvbihtYXRjaGVzLCBpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVjdCA9IHRhZ0lucHV0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnN0eWxlLnRvcCA9IGAke3JlY3QuaGVpZ2h0fXB4YDtcbiAgICB9O1xuXG4gICAgdGFnSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0YWdJbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc3QgY3VycmVudFdvcmQgPSB2YWx1ZS50cmltKCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRXb3JkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzdWdnZXN0aW9uVGltZW91dCk7XG4gICAgICAgICAgICBzdWdnZXN0aW9uVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNob3dUYWdTdWdnZXN0aW9ucyhjdXJyZW50V29yZCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGlkZVRhZ1N1Z2dlc3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRhZ0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRhZ0lucHV0LnZhbHVlLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKHRhZ1N1Z2dlc3Rpb25Db250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtdGFnLXN1Z2dlc3Rpb24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnID0gYWN0aXZlSXRlbS50ZXh0Q29udGVudD8ucmVwbGFjZShcIiNcIiwgXCJcIikgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgb25BZGRUYWcodGFnKTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZVRhZ1N1Z2dlc3Rpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiAhdmFsdWUuaW5jbHVkZXMoXCIgXCIpKSB7XG4gICAgICAgICAgICAgICAgb25BZGRUYWcodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSBcIlRhYlwiICYmIHRhZ1N1Z2dlc3Rpb25Db250YWluZXIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy10YWctc3VnZ2VzdGlvbi1pdGVtLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFnID0gYWN0aXZlSXRlbS50ZXh0Q29udGVudD8ucmVwbGFjZShcIiNcIiwgXCJcIikgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBvbkFkZFRhZyh0YWcpO1xuICAgICAgICAgICAgICAgIGhpZGVUYWdTdWdnZXN0aW9ucygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0YWdTdWdnZXN0aW9uQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaXRlbXMgPSB0YWdTdWdnZXN0aW9uQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuam90cy10YWctc3VnZ2VzdGlvbi1pdGVtXCIpO1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtID0gdGFnU3VnZ2VzdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtdGFnLXN1Z2dlc3Rpb24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGxldCBhY3RpdmVJbmRleCA9IC0xO1xuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gYWN0aXZlSXRlbSkgYWN0aXZlSW5kZXggPSBpbmRleDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGUua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSAoYWN0aXZlSW5kZXggKyAxKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIHNldEFjdGl2ZVRhZ1N1Z2dlc3Rpb24oaXRlbXMsIG5leHRJbmRleCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwcmV2SW5kZXggPSBhY3RpdmVJbmRleCA8PSAwID8gaXRlbXMubGVuZ3RoIC0gMSA6IGFjdGl2ZUluZGV4IC0gMTtcbiAgICAgICAgICAgIHNldEFjdGl2ZVRhZ1N1Z2dlc3Rpb24oaXRlbXMsIHByZXZJbmRleCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgICAgIGhpZGVUYWdTdWdnZXN0aW9ucygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0YWdJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0YWdJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgIXZhbHVlLmluY2x1ZGVzKFwiIFwiKSAmJiAhY3VycmVudFRhZ3MuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgb25BZGRUYWcodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGlkZVRhZ1N1Z2dlc3Rpb25zKCk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogXHU2RTMyXHU2N0QzXHU2ODA3XHU3QjdFXHU1MjE3XHU4ODY4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUYWdMaXN0KFxuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgdGFnczogc3RyaW5nW10sXG4gICAgb25SZW1vdmVUYWc6ICh0YWc6IHN0cmluZykgPT4gdm9pZFxuKTogdm9pZCB7XG4gICAgY29udGFpbmVyLmVtcHR5KCk7XG5cbiAgICB0YWdzLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgY29uc3QgdGFnUGlsbCA9IGNvbnRhaW5lci5jcmVhdGVTcGFuKCk7XG4gICAgICAgIHRhZ1BpbGwudGV4dENvbnRlbnQgPSBgIyR7dGFnfWA7XG4gICAgICAgIHRhZ1BpbGwuc3R5bGUucGFkZGluZyA9IFwiNHB4IDEwcHhcIjtcbiAgICAgICAgdGFnUGlsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeS1hbHQpXCI7XG4gICAgICAgIHRhZ1BpbGwuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIxMnB4XCI7XG4gICAgICAgIHRhZ1BpbGwuc3R5bGUuZm9udFNpemUgPSBcIjExcHhcIjtcbiAgICAgICAgdGFnUGlsbC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtZmxleFwiO1xuICAgICAgICB0YWdQaWxsLnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xuICAgICAgICB0YWdQaWxsLnN0eWxlLmdhcCA9IFwiNnB4XCI7XG4gICAgICAgIHRhZ1BpbGwuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIHRhZ1BpbGwuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlQnRuID0gdGFnUGlsbC5jcmVhdGVTcGFuKCk7XG4gICAgICAgIHJlbW92ZUJ0bi50ZXh0Q29udGVudCA9IFwiXHUwMEQ3XCI7XG4gICAgICAgIHJlbW92ZUJ0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgcmVtb3ZlQnRuLnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICAgICAgcmVtb3ZlQnRuLnN0eWxlLm1hcmdpbkxlZnQgPSBcIjRweFwiO1xuICAgICAgICByZW1vdmVCdG4uc3R5bGUuZm9udFNpemUgPSBcIjEycHhcIjtcbiAgICAgICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIG9uUmVtb3ZlVGFnKHRhZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFx1OUFEOFx1NEVBRSBNYXJrZG93biBcdTUxODVcdTVCQjlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZ2hsaWdodE1hcmtkb3duQ29udGVudChcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIGtleXdvcmRzOiBzdHJpbmdbXVxuKTogdm9pZCB7XG4gICAgaWYgKCFrZXl3b3Jkcy5sZW5ndGgpIHJldHVybjtcblxuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgTm9kZUZpbHRlci5TSE9XX1RFWFQsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjY2VwdE5vZGU6IChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50RWxlbWVudD8uY2xhc3NMaXN0Py5jb250YWlucygnc2VhcmNoLWhpZ2hsaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgdGV4dE5vZGVzOiBUZXh0W10gPSBbXTtcbiAgICBsZXQgbm9kZTogVGV4dCB8IG51bGw7XG4gICAgd2hpbGUgKG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKSBhcyBUZXh0IHwgbnVsbCkge1xuICAgICAgICB0ZXh0Tm9kZXMucHVzaChub2RlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXR0ZXJuID0ga2V5d29yZHMubWFwKGsgPT4gay5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpKS5qb2luKCd8Jyk7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGAoJHtwYXR0ZXJufSlgLCAnZ2knKTtcblxuICAgIHRleHROb2Rlcy5mb3JFYWNoKHRleHROb2RlID0+IHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHRleHROb2RlLnRleHRDb250ZW50IHx8ICcnO1xuICAgICAgICBpZiAocmVnZXgudGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgcmVnZXgubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICBsZXQgbWF0Y2g7XG5cbiAgICAgICAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleC5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaC5pbmRleCA+IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0LnN1YnN0cmluZyhsYXN0SW5kZXgsIG1hdGNoLmluZGV4KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBtYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFyaycpO1xuICAgICAgICAgICAgICAgIG1hcmsuY2xhc3NOYW1lID0gJ3NlYXJjaC1oaWdobGlnaHQnO1xuICAgICAgICAgICAgICAgIG1hcmsudGV4dENvbnRlbnQgPSBtYXRjaFswXTtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChtYXJrKTtcbiAgICAgICAgICAgICAgICBsYXN0SW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXN0SW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQuc3Vic3RyaW5nKGxhc3RJbmRleCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHROb2RlLnBhcmVudE5vZGU/LnJlcGxhY2VDaGlsZChmcmFnbWVudCwgdGV4dE5vZGUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCAiLy8gc3JjL2NhcHR1cmUtbW9kYWwudHNcbmltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCBKb3RQbHVnaW4gZnJvbSAnLi9tYWluJztcbmltcG9ydCB7IHQsIFRyYW5zbGF0aW9ucyB9IGZyb20gJy4vaTE4bic7XG5pbXBvcnQge1xuICAgIGhhbmRsZUF0dGFjaG1lbnQsXG4gICAgZ2V0Q2xpcGJvYXJkSW1hZ2VGaWxlcyxcbiAgICBzZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlLFxuICAgIHNldHVwVGFnQXV0b2NvbXBsZXRlLFxuICAgIHJlbmRlclRhZ0xpc3Rcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBDYXB0dXJlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgcGx1Z2luOiBKb3RQbHVnaW47XG4gICAgY29udGVudElucHV0OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHRhZ3NJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBzb3VyY2VJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICB0YWdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHNlbGVjdGVkQXR0YWNobWVudHM6IHsgcGF0aDogc3RyaW5nOyB0eXBlOiBcImltYWdlXCIgfCBcImZpbGVcIiB9W10gPSBbXTtcbiAgICBwcml2YXRlIHRhZ0xpc3RDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjdXJyZW50VGFnczogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIHdpa2lsaW5rQ2xlYW51cDogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG5cbiAgICBnZXQgbGFuZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luLmxhbmc7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogSm90UGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIH1cblxuICAgIGFzeW5jIG9uT3BlbigpIHtcbiAgICAgICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuXG4gICAgICAgIGlmICghdGhpcy5wbHVnaW4uam90cyB8fCB0aGlzLnBsdWdpbi5qb3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4ucmVmcmVzaEpvdHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSBcIjIwcHhcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLm1pbldpZHRoID0gXCI0MDBweFwiO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gY29udGFpbmVyLmNyZWF0ZUVsKFwiaDNcIik7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdCgncXVpY2tSZWNvcmQnLCB0aGlzLmxhbmcpO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjIwcHhcIjtcblxuICAgICAgICBjb25zdCB0ZXh0YXJlYUNvbnRhaW5lciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGV4dGFyZWFDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cbiAgICAgICAgY29uc3QgdGV4dGFyZWEgPSB0ZXh0YXJlYUNvbnRhaW5lci5jcmVhdGVFbChcInRleHRhcmVhXCIpO1xuICAgICAgICB0ZXh0YXJlYS5wbGFjZWhvbGRlciA9IHQoJ2NvbnRlbnRQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLm1pbkhlaWdodCA9IFwiMTUwcHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI4cHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnktYWx0KVwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjE2cHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUucmVzaXplID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5mb250RmFtaWx5ID0gXCJpbmhlcml0XCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLmZvbnRTaXplID0gXCIxNHB4XCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLmxpbmVIZWlnaHQgPSBcIjEuNlwiO1xuICAgICAgICB0aGlzLmNvbnRlbnRJbnB1dCA9IHRleHRhcmVhO1xuXG4gICAgICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXN0ZVwiLCBhc3luYyAoZTogQ2xpcGJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlRmlsZXMgPSBnZXRDbGlwYm9hcmRJbWFnZUZpbGVzKGUuY2xpcGJvYXJkRGF0YSk7XG4gICAgICAgICAgICBpZiAoaW1hZ2VGaWxlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYWluID0gZS5jbGlwYm9hcmREYXRhPy5nZXREYXRhKFwidGV4dC9wbGFpblwiKSA/PyBcIlwiO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGltYWdlRmlsZXMpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUF0dGFjaG1lbnQoXG4gICAgICAgICAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09IFwiaW1hZ2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0TWFya2Rvd25FbWJlZEF0Q3Vyc29yKHRleHRhcmVhLCByZXN1bHQucGF0aCwgXCJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBmYWlsdXJlTm90aWNlS2V5OiBcInBhc3RlSW1hZ2VVcGxvYWRGYWlsZWRcIiB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0VGV4dEF0Q3Vyc29yKHRleHRhcmVhLCBwbGFpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0dXBXaWtpbGlua0F1dG9jb21wbGV0ZSh0ZXh0YXJlYSwgdGV4dGFyZWFDb250YWluZXIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGFnU2VjdGlvbiA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGFnU2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjE2cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRhZ0lucHV0Q29udGFpbmVyID0gdGFnU2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGFnSW5wdXRDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgIHRhZ0lucHV0Q29udGFpbmVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YWdzSW5wdXQgPSB0YWdJbnB1dENvbnRhaW5lci5jcmVhdGVFbChcImlucHV0XCIpO1xuICAgICAgICB0YWdzSW5wdXQucGxhY2Vob2xkZXIgPSB0KCd0YWdzSW5wdXRQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHRhZ3NJbnB1dC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICB0YWdzSW5wdXQuc3R5bGUucGFkZGluZyA9IFwiOHB4XCI7XG4gICAgICAgIHRhZ3NJbnB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgdGFnc0lucHV0LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgIHRhZ3NJbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgdGFnc0lucHV0LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgdGhpcy50YWdzSW5wdXQgPSB0YWdzSW5wdXQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRhZ0xpc3RDb250YWluZXIgPSB0YWdTZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICB0aGlzLnRhZ0xpc3RDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICB0aGlzLnRhZ0xpc3RDb250YWluZXIuc3R5bGUuZmxleFdyYXAgPSBcIndyYXBcIjtcbiAgICAgICAgdGhpcy50YWdMaXN0Q29udGFpbmVyLnN0eWxlLmdhcCA9IFwiNnB4XCI7XG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lci5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjhweFwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWdzID0gW107XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNldHVwVGFnQXV0b2NvbXBsZXRlKHRhZ3NJbnB1dCwgdGFnSW5wdXRDb250YWluZXIsIHRoaXMudGFnTGlzdENvbnRhaW5lcik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzb3VyY2VJbnB1dCA9IGNvbnRhaW5lci5jcmVhdGVFbChcImlucHV0XCIpO1xuICAgICAgICBzb3VyY2VJbnB1dC5wbGFjZWhvbGRlciA9IHQoJ3NvdXJjZVBsYWNlaG9sZGVyJywgdGhpcy5sYW5nKTtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUucGFkZGluZyA9IFwiOHB4XCI7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjE2cHhcIjtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgdGhpcy5zb3VyY2VJbnB1dCA9IHNvdXJjZUlucHV0O1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYXR0YWNobWVudEFyZWEgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlciA9IFwiMXB4IGRhc2hlZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUucGFkZGluZyA9IFwiMTJweFwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUubWFyZ2luQm90dG9tID0gXCIyMHB4XCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnRleHRDb250ZW50ID0gdCgnYXR0YWNobWVudFBsYWNlaG9sZGVyJywgdGhpcy5sYW5nKTtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuZm9udFNpemUgPSBcIjEycHhcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtZmFpbnQpXCI7XG4gICAgICAgIFxuICAgICAgICBhdHRhY2htZW50QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gXCJmaWxlXCI7XG4gICAgICAgICAgICBpbnB1dC5tdWx0aXBsZSA9IHRydWU7XG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgfHwgW10pO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUF0dGFjaG1lbnQoZmlsZSwgYXR0YWNobWVudEFyZWEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5wdXQuY2xpY2soKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhdHRhY2htZW50QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgYXR0YWNobWVudEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5ib3JkZXJDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgYXR0YWNobWVudEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgYXN5bmMgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRhdGFUcmFuc2Zlcj8uZmlsZXMgfHwgW10pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVBdHRhY2htZW50KGZpbGUsIGF0dGFjaG1lbnRBcmVhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBidXR0b25Db250YWluZXIgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiZmxleC1lbmRcIjtcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmdhcCA9IFwiMTBweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gYnV0dG9uQ29udGFpbmVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICAgICAgICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSB0KCdjYW5jZWwnLCB0aGlzLmxhbmcpO1xuICAgICAgICBjYW5jZWxCdG4uc3R5bGUucGFkZGluZyA9IFwiOHB4IDE2cHhcIjtcbiAgICAgICAgY2FuY2VsQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgIGNhbmNlbEJ0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgY2FuY2VsQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICBjYW5jZWxCdG4uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNhdmVCdG4gPSBidXR0b25Db250YWluZXIuY3JlYXRlRWwoXCJidXR0b25cIik7XG4gICAgICAgIHNhdmVCdG4udGV4dENvbnRlbnQgPSB0KCdzYXZlJywgdGhpcy5sYW5nKTtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5wYWRkaW5nID0gXCI4cHggMjRweFwiO1xuICAgICAgICBzYXZlQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCI7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtb24tYWNjZW50KVwiO1xuICAgICAgICBzYXZlQnRuLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgICBzYXZlQnRuLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBzYXZlQnRuLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjUwMFwiO1xuICAgICAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZVNhdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNldHVwVGFnQXV0b2NvbXBsZXRlKHRhZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50LCBjb250YWluZXI6IEhUTUxFbGVtZW50LCB0YWdMaXN0Q29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzZXR1cFRhZ0F1dG9jb21wbGV0ZShcbiAgICAgICAgICAgICgpID0+IHRoaXMuZ2V0RXhpc3RpbmdUYWdzKCksXG4gICAgICAgICAgICB0YWdJbnB1dCxcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIHRhZ0xpc3RDb250YWluZXIsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYWdzLFxuICAgICAgICAgICAgKHRhZykgPT4gdGhpcy5hZGRUYWdUb0lucHV0KHRhZywgdGFnSW5wdXQsIHRhZ0xpc3RDb250YWluZXIpLFxuICAgICAgICAgICAgKHRhZ3MpID0+IHRoaXMucmVuZGVyVGFnTGlzdCh0YWdMaXN0Q29udGFpbmVyLCB0YWdzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RXhpc3RpbmdUYWdzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgdGFncyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICBmb3IgKGNvbnN0IGpvdCBvZiB0aGlzLnBsdWdpbi5qb3RzKSB7XG4gICAgICAgICAgICBqb3QudGFncy5mb3JFYWNoKHRhZyA9PiB0YWdzLmFkZCh0YWcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0YWdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclRhZ0xpc3QoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgdGFnczogc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGFncyA9IHRhZ3M7XG4gICAgICAgIHJlbmRlclRhZ0xpc3QoY29udGFpbmVyLCB0YWdzLCAodGFnKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYWdzID0gdGhpcy5jdXJyZW50VGFncy5maWx0ZXIodCA9PiB0ICE9PSB0YWcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWdMaXN0KGNvbnRhaW5lciwgdGhpcy5jdXJyZW50VGFncyk7XG4gICAgICAgICAgICBpZiAodGhpcy50YWdzSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3NJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVGFnVG9JbnB1dCh0YWc6IHN0cmluZywgdGFnSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQsIHRhZ0xpc3RDb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGlmICh0YWcgJiYgIXRoaXMuY3VycmVudFRhZ3MuaW5jbHVkZXModGFnKSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFncy5wdXNoKHRhZyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhZ0xpc3QodGFnTGlzdENvbnRhaW5lciwgdGhpcy5jdXJyZW50VGFncyk7XG4gICAgICAgICAgICB0YWdJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMud2lraWxpbmtDbGVhbnVwID0gc2V0dXBXaWtpbGlua0F1dG9jb21wbGV0ZShcbiAgICAgICAgICAgIHRoaXMuYXBwLFxuICAgICAgICAgICAgdGV4dGFyZWEsXG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICAoZmlsZSwgdGV4dGFyZWEsIGJyYWNrZXRTdGFydCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnNvclBvcyA9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRCZWZvcmUgPSB0ZXh0YXJlYS52YWx1ZS5zdWJzdHJpbmcoMCwgYnJhY2tldFN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0QWZ0ZXIgPSB0ZXh0YXJlYS52YWx1ZS5zdWJzdHJpbmcoY3Vyc29yUG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUZXh0ID0gdGV4dEJlZm9yZSArIGBbWyR7ZmlsZS5iYXNlbmFtZX1dXWAgKyB0ZXh0QWZ0ZXI7XG4gICAgICAgICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBuZXdUZXh0O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q3Vyc29yUG9zID0gYnJhY2tldFN0YXJ0ICsgZmlsZS5iYXNlbmFtZS5sZW5ndGggKyA0O1xuICAgICAgICAgICAgICAgIHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0ID0gbmV3Q3Vyc29yUG9zO1xuICAgICAgICAgICAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IG5ld0N1cnNvclBvcztcblxuICAgICAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlQXR0YWNobWVudChcbiAgICAgICAgZmlsZTogRmlsZSxcbiAgICAgICAgYXJlYTogSFRNTEVsZW1lbnQsXG4gICAgICAgIGNhbGxiYWNrPzogKHJlc3VsdDogeyBwYXRoOiBzdHJpbmc7IHR5cGU6IFwiaW1hZ2VcIiB8IFwiZmlsZVwiIH0pID0+IHZvaWQsXG4gICAgICAgIG9wdGlvbnM/OiB7IGZhaWx1cmVOb3RpY2VLZXk/OiBrZXlvZiBUcmFuc2xhdGlvbnMgfVxuICAgICkge1xuICAgICAgICBhd2FpdCBoYW5kbGVBdHRhY2htZW50KFxuICAgICAgICAgICAgdGhpcy5hcHAsXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MsXG4gICAgICAgICAgICB0aGlzLmxhbmcsXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEF0dGFjaG1lbnRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuc2VsZWN0ZWRBdHRhY2htZW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYXJlYS50ZXh0Q29udGVudCA9IHQoJ3NlbGVjdGVkRmlsZXMnLCB0aGlzLmxhbmcsIHsgY291bnQ6IFN0cmluZyhjb3VudCkgfSk7XG4gICAgICAgICAgICAgICAgYXJlYS5zdHlsZS5ib3JkZXJDb2xvciA9IFwidmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KVwiO1xuICAgICAgICAgICAgICAgIGFyZWEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnktYWx0KVwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluc2VydFRleHRBdEN1cnNvcih0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCwgdGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGNvbnN0IGVuZCA9IHRleHRhcmVhLnNlbGVjdGlvbkVuZDtcbiAgICAgICAgY29uc3QgdmFsID0gdGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gdmFsLnNsaWNlKDAsIHN0YXJ0KSArIHRleHQgKyB2YWwuc2xpY2UoZW5kKTtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gc3RhcnQgKyB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBjdXJzb3I7XG4gICAgICAgIHRleHRhcmVhLnNlbGVjdGlvbkVuZCA9IGN1cnNvcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluc2VydE1hcmtkb3duRW1iZWRBdEN1cnNvcih0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCwgdmF1bHRQYXRoOiBzdHJpbmcsIGtpbmQ6IFwiaW1hZ2VcIiB8IFwiZmlsZVwiKSB7XG4gICAgICAgIGNvbnN0IGVtYmVkID0ga2luZCA9PT0gXCJpbWFnZVwiID8gYCFbWyR7dmF1bHRQYXRofV1dYCA6IGBbWyR7dmF1bHRQYXRofV1dYDtcbiAgICAgICAgdGhpcy5pbnNlcnRUZXh0QXRDdXJzb3IodGV4dGFyZWEsIGVtYmVkKTtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgaGFuZGxlU2F2ZSgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudElucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKHQoJ2NvbnRlbnRSZXF1aXJlZCcsIHRoaXMubGFuZykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFncyA9IFsuLi50aGlzLmN1cnJlbnRUYWdzXTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2VJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVKb3QoY29udGVudCwgdGFncywgc291cmNlLCB0aGlzLnNlbGVjdGVkQXR0YWNobWVudHMpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNhdmUgZmFpbGVkOlwiLCBlcnJvcik7XG4gICAgICAgICAgICBuZXcgTm90aWNlKHQoJ3NhdmVGYWlsZWQnLCB0aGlzLmxhbmcsIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmtub3duIGVycm9yXCIgfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgLy8gXHU2RTA1XHU3NDA2IHdpa2lsaW5rIFx1NUVGQVx1OEJBRVx1NUJCOVx1NTY2OFxuICAgICAgICBpZiAodGhpcy53aWtpbGlua0NsZWFudXApIHtcbiAgICAgICAgICAgIHRoaXMud2lraWxpbmtDbGVhbnVwKCk7XG4gICAgICAgICAgICB0aGlzLndpa2lsaW5rQ2xlYW51cCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xuICAgIH1cbn0iLCAiLy8gc3JjL21haW4udHNcbmltcG9ydCB7IFBsdWdpbiwgTm90aWNlLCBURmlsZSwgVEZvbGRlciwgYWRkSWNvbiwgbm9ybWFsaXplUGF0aCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IEpvdFZpZXcsIFZJRVdfVFlQRV9KT1RTIH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IEpvdFNldHRpbmdzLCBERUZBVUxUX1NFVFRJTkdTLCBMYW5ndWFnZSwgSm90IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBKb3RTZXR0aW5nVGFiIH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5pbXBvcnQgeyBDYXB0dXJlTW9kYWwgfSBmcm9tICcuL2NhcHR1cmUtbW9kYWwnO1xuaW1wb3J0IHsgdCwgVHJhbnNsYXRpb25zIH0gZnJvbSAnLi9pMThuJztcbmltcG9ydCB7XG4gICAgcGFyc2VGaWxlQ29udGVudCxcbiAgICBuZXdKb3RJZCxcbiAgICBjb21wb3NlSm90TWFya2Rvd25Cb2R5LFxuICAgIGZvcm1hdEpvdEVudHJ5QmxvY2ssXG4gICAgcmVwbGFjZUpvdEJsb2NrQnlJZFxufSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm90UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgICBzZXR0aW5nczogSm90U2V0dGluZ3M7XG4gICAgcHJpdmF0ZSBpc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGpvdHM6IEpvdFtdID0gW107XG5cbiAgICBnZXQgbGFuZygpOiBMYW5ndWFnZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzPy5sYW5ndWFnZSB8fCBcInpoXCI7XG4gICAgfVxuXG4gICAgYXN5bmMgb25sb2FkKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuICAgICAgICBjb25zb2xlLmxvZyh0KCdsb2FkaW5nUGx1Z2luJywgdGhpcy5sYW5nKSk7XG5cbiAgICAgICAgYWRkSWNvbihcImpvdC1ib2x0XCIsIGA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwiTTEzIDJMMyAxNGg5bC0xIDggMTAtMTJoLTlsMS04elwiLz48cGF0aCBkPVwiTTE3IDNoMmEyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgyXCIvPjwvc3ZnPmApO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuZW5zdXJlQXR0YWNobWVudHNGb2xkZXIoKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyVmlldyhWSUVXX1RZUEVfSk9UUywgKGxlYWYpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSm90VmlldyhsZWFmLCB0aGlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRSaWJib25JY29uKFwiam90LWJvbHRcIiwgdCgncGx1Z2luTmFtZScsIHRoaXMubGFuZyksICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVWaWV3KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogXCJvcGVuLWpvdC12aWV3XCIsXG4gICAgICAgICAgICBuYW1lOiBgam90JHt0aGlzLmxhbmcgPT09ICd6aCcgPyAnXHVGRjFBJyA6ICc6ICd9JHt0KCdvcGVuSm90VmlldycsIHRoaXMubGFuZyl9YCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZVZpZXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgICAgICAgIGlkOiBcInF1aWNrLWNhcHR1cmVcIixcbiAgICAgICAgICAgIG5hbWU6IGBqb3Qke3RoaXMubGFuZyA9PT0gJ3poJyA/ICdcdUZGMUEnIDogJzogJ30ke3QoJ3F1aWNrQ2FwdHVyZScsIHRoaXMubGFuZyl9YCxcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3IENhcHR1cmVNb2RhbCh0aGlzLmFwcCwgdGhpcykub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IEpvdFNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJlZGl0b3ItbWVudVwiLCAobWVudSwgZWRpdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0aW9uKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBtZW51LmFkZEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRUaXRsZSh0KCdzYXZlQXNKb3QnLCB0aGlzLmxhbmcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldEljb24oXCJqb3QtYm9sdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2F2ZUpvdChzZWxlY3Rpb24sIFtdLCBcIlwiLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodCgnc2F2ZWRBc0pvdCcsIHRoaXMubGFuZykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9PcGVuVmlldykge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYWN0aXZhdGVWaWV3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRKb3RzRGF0YSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBvbnVubG9hZCgpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfSk9UUykuZm9yRWFjaChsZWFmID0+IHtcbiAgICAgICAgICAgICAgICBsZWFmLmRldGFjaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDbGVhbnVwIHZpZXcgZXJyb3I6XCIsIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZW5zdXJlQXR0YWNobWVudHNGb2xkZXIoKSB7XG4gICAgICAgIGNvbnN0IGZvbGRlciA9IG5vcm1hbGl6ZVBhdGgodGhpcy5zZXR0aW5ncy5hdHRhY2htZW50c0ZvbGRlcik7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZvbGRlcik7XG4gICAgICAgIGlmICghZXhpc3RpbmcgfHwgIShleGlzdGluZyBpbnN0YW5jZW9mIFRGb2xkZXIpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihmb2xkZXIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBhY3RpdmF0ZVZpZXcoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0xvYWRlZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfSk9UUylbMF07XG4gICAgICAgIFxuICAgICAgICBpZiAoIWxlYWYpIHtcbiAgICAgICAgICAgIGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhZigndGFiJyk7XG4gICAgICAgICAgICBhd2FpdCBsZWFmLnNldFZpZXdTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogVklFV19UWVBFX0pPVFMsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXRlOiB7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnJldmVhbExlYWYobGVhZik7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRKb3RzRGF0YSgpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlZnJlc2hKb3RzKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRKb3RzRGF0YSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlx1NTIzN1x1NjVCMCBqb3RzIFx1NjU3MFx1NjM2RVx1NUI4Q1x1NjIxMFx1RkYwQ1x1NTE3MVwiLCB0aGlzLmpvdHMubGVuZ3RoLCBcIlx1Njc2MVx1OEJCMFx1NUY1NVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGxvYWRKb3RzRGF0YSgpIHtcbiAgICAgICAgY29uc3QgZm9sZGVyID0gbm9ybWFsaXplUGF0aCh0aGlzLnNldHRpbmdzLnNhdmVGb2xkZXIpO1xuICAgICAgICBjb25zdCBmb2xkZXJPYmogPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZm9sZGVyKTtcblxuICAgICAgICBpZiAoIWZvbGRlck9iaiB8fCAhKGZvbGRlck9iaiBpbnN0YW5jZW9mIFRGb2xkZXIpKSB7XG4gICAgICAgICAgICB0aGlzLmpvdHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gZm9sZGVyT2JqLmNoaWxkcmVuLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBURmlsZSAmJiBmLm5hbWUuZW5kc1dpdGgoXCIubWRcIikpO1xuICAgICAgICBjb25zdCBhbGxKb3RzOiBKb3RbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSBhcyBURmlsZSk7XG4gICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gcGFyc2VGaWxlQ29udGVudChjb250ZW50LCBmaWxlLnBhdGgsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICBhbGxKb3RzLnB1c2goLi4uZW50cmllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBhbGxKb3RzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVBID0gbW9tZW50KGEuZGF0ZSArIFwiIFwiICsgYS50aW1lLCBcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG4gICAgICAgICAgICBjb25zdCBkYXRlQiA9IG1vbWVudChiLmRhdGUgKyBcIiBcIiArIGIudGltZSwgXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVCLnZhbHVlT2YoKSAtIGRhdGVBLnZhbHVlT2YoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5qb3RzID0gYWxsSm90cztcbiAgICB9XG5cbiAgICBhc3luYyBzYXZlSm90KGNvbnRlbnQ6IHN0cmluZywgdGFnczogc3RyaW5nW10sIHNvdXJjZTogc3RyaW5nLCBhdHRhY2htZW50cz86IHsgcGF0aDogc3RyaW5nOyB0eXBlOiBcImltYWdlXCIgfCBcImZpbGVcIiB9W10pIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgZGF0ZVN0ciA9IG1vbWVudChub3cpLmZvcm1hdChcIllZWVktTU0tRERcIik7XG4gICAgICAgIGNvbnN0IGZ1bGxEYXRlVGltZSA9IG1vbWVudChub3cpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG5cbiAgICAgICAgY29uc3QgaWQgPSBuZXdKb3RJZCgpO1xuICAgICAgICBjb25zdCB7IGJvZHksIGFsbFRhZ3MgfSA9IGNvbXBvc2VKb3RNYXJrZG93bkJvZHkoXG4gICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgdGFncyxcbiAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgICAgICAgdGhpcy5sYW5nLFxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy51c2VGaXhlZFRhZyxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZml4ZWRUYWdcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbmV3RW50cnkgPSBmb3JtYXRKb3RFbnRyeUJsb2NrKGZ1bGxEYXRlVGltZSwgaWQsIGZ1bGxEYXRlVGltZSwgYm9keSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubG9nTW9kZSA9PT0gXCJtdWx0aVwiKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmVUb011bHRpRmlsZShkYXRlU3RyLCBuZXdFbnRyeSwgYWxsVGFncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmVUb1NpbmdsZUZpbGUobmV3RW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfSk9UUykuZm9yRWFjaChsZWFmID0+IHtcbiAgICAgICAgICAgIGlmIChsZWFmLnZpZXcgaW5zdGFuY2VvZiBKb3RWaWV3KSBsZWFmLnZpZXcucmVmcmVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRKb3RzRGF0YSgpO1xuXG4gICAgICAgIG5ldyBOb3RpY2UodCgnc2F2ZWQnLCB0aGlzLmxhbmcpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIG9uZSBqb3QgaW4gaXRzIHNvdXJjZSBmaWxlIGJ5IGBpZGAuIEtlZXBzIGAjIyNgIGNyZWF0ZWQgdGltZTsgc2V0cyBgdXBkYXRlZEF0YCB0byBub3cuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlSm90KHVwZGF0ZWQ6IEpvdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIXVwZGF0ZWQuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHQoJ2pvdFVwZGF0ZU5vRmlsZScsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICBuZXcgTm90aWNlKG1zZyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXRoTm9ybSA9IG5vcm1hbGl6ZVBhdGgodXBkYXRlZC5maWxlUGF0aCk7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGF0aE5vcm0pO1xuICAgICAgICBpZiAoIShmaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSB0KCdqb3RVcGRhdGVGaWxlTWlzc2luZycsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICBuZXcgTm90aWNlKG1zZyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhdHRhY2htZW50c1BheWxvYWQgPVxuICAgICAgICAgICAgdXBkYXRlZC5hdHRhY2htZW50cz8ubWFwKChwLCBpKSA9PiAoe1xuICAgICAgICAgICAgICAgIHBhdGg6IHAsXG4gICAgICAgICAgICAgICAgdHlwZTogdXBkYXRlZC5hdHRhY2htZW50VHlwZXM/LltpXSA/PyAoXCJmaWxlXCIgYXMgY29uc3QpXG4gICAgICAgICAgICB9KSkgPz8gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCB7IGJvZHkgfSA9IGNvbXBvc2VKb3RNYXJrZG93bkJvZHkoXG4gICAgICAgICAgICB1cGRhdGVkLmNvbnRlbnQsXG4gICAgICAgICAgICB1cGRhdGVkLnRhZ3MsXG4gICAgICAgICAgICB1cGRhdGVkLnNvdXJjZSxcbiAgICAgICAgICAgIGF0dGFjaG1lbnRzUGF5bG9hZCxcbiAgICAgICAgICAgIHRoaXMubGFuZyxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudXNlRml4ZWRUYWcsXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmZpeGVkVGFnXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZ1bGxEYXRlVGltZSA9IGAke3VwZGF0ZWQuZGF0ZX0gJHt1cGRhdGVkLnRpbWV9YC50cmltKCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRBdE5vdyA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG4gICAgICAgIGNvbnN0IG5ld0Jsb2NrID0gZm9ybWF0Sm90RW50cnlCbG9jayhmdWxsRGF0ZVRpbWUsIHVwZGF0ZWQuaWQsIHVwZGF0ZWRBdE5vdywgYm9keSk7XG5cbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0LnByb2Nlc3MoZmlsZSwgKHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlcGxhY2VKb3RCbG9ja0J5SWQodGV4dCwgZmlsZS5wYXRoLCB1cGRhdGVkLmlkLCBuZXdCbG9jayk7XG4gICAgICAgICAgICBmb3VuZCA9IHJlc3VsdC5mb3VuZDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuY29udGVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHQoJ2pvdFVwZGF0ZU5vdEZvdW5kJywgdGhpcy5sYW5nKTtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UobXNnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfSk9UUykuZm9yRWFjaChsZWFmID0+IHtcbiAgICAgICAgICAgIGlmIChsZWFmLnZpZXcgaW5zdGFuY2VvZiBKb3RWaWV3KSBsZWFmLnZpZXcucmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSm90c0RhdGEoKTtcbiAgICB9XG5cbiAgICBhc3luYyBzYXZlVG9NdWx0aUZpbGUoZGF0ZVN0cjogc3RyaW5nLCBuZXdFbnRyeTogc3RyaW5nLCB0YWdzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCBmb2xkZXIgPSBub3JtYWxpemVQYXRoKHRoaXMuc2V0dGluZ3Muc2F2ZUZvbGRlcik7XG4gICAgICAgIGxldCBmaWxlbmFtZSA9IHRoaXMuc2V0dGluZ3MubXVsdGlGaWxlRm9ybWF0LnJlcGxhY2UoXCJZWVlZTU1ERFwiLCBkYXRlU3RyLnJlcGxhY2UoLy0vZywgXCJcIikpO1xuICAgICAgICBpZiAoIWZpbGVuYW1lLmVuZHNXaXRoKFwiLm1kXCIpKSBmaWxlbmFtZSArPSBcIi5tZFwiO1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGAke2ZvbGRlcn0vJHtmaWxlbmFtZX1gO1xuXG4gICAgICAgIGlmICghdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZvbGRlcikpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihmb2xkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU2NTg3XHU0RUY2XHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChmaWxlUGF0aCk7XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nRmlsZSAmJiBleGlzdGluZ0ZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgLy8gXHU2NTg3XHU0RUY2XHU1QjU4XHU1NzI4XHVGRjBDXHU0RjdGXHU3NTI4IHZhdWx0LnByb2Nlc3MgXHU1QjlFXHU3M0IwXHU1MzlGXHU1QjUwXHU2MDI3XHU2NTg3XHU0RUY2XHU1MTk5XHU1MTY1XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5wcm9jZXNzKGV4aXN0aW5nRmlsZSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZUNvbnRlbnQgPSBkYXRhIHx8IFwiXCI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmcm9udG1hdHRlclJlZ2V4ID0gL14tLS1cXG4oW1xcc1xcU10qPylcXG4tLS1cXG4vO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyb250bWF0dGVyTWF0Y2ggPSBmaWxlQ29udGVudC5tYXRjaChmcm9udG1hdHRlclJlZ2V4KTtcblxuICAgICAgICAgICAgICAgIGlmIChmcm9udG1hdHRlck1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyb250bWF0dGVyRW5kID0gZnJvbnRtYXR0ZXJNYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJlZm9yZUZyb250bWF0dGVyID0gZmlsZUNvbnRlbnQuc3Vic3RyaW5nKDAsIGZyb250bWF0dGVyRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWZ0ZXJGcm9udG1hdHRlciA9IGZpbGVDb250ZW50LnN1YnN0cmluZyhmcm9udG1hdHRlckVuZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWZvcmVGcm9udG1hdHRlciArIG5ld0VudHJ5ICsgYWZ0ZXJGcm9udG1hdHRlcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3RW50cnkgKyBmaWxlQ29udGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFx1NjU4N1x1NEVGNlx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxQlx1NUVGQVx1NUUyNlx1NjcwOSBmcm9udG1hdHRlciBcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgICAgICAgIGxldCBmcm9udG1hdHRlciA9IFwiXCI7XG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVUYWdzSW5Gcm9udG1hdHRlciAmJiB0YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmcm9udG1hdHRlciA9IFwiLS0tXFxuXCI7XG4gICAgICAgICAgICAgICAgZnJvbnRtYXR0ZXIgKz0gYHRhZ3M6XFxuJHt0YWdzLm1hcCh0ZyA9PiBgICAtICR7dGd9YCkuam9pbihcIlxcblwiKX1cXG5gO1xuICAgICAgICAgICAgICAgIGZyb250bWF0dGVyICs9IFwiLS0tXFxuXFxuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmaWxlQ29udGVudCA9IGZyb250bWF0dGVyICsgbmV3RW50cnk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGUoZmlsZVBhdGgsIGZpbGVDb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNhdmVUb1NpbmdsZUZpbGUobmV3RW50cnk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBmb2xkZXIgPSBub3JtYWxpemVQYXRoKHRoaXMuc2V0dGluZ3Muc2F2ZUZvbGRlcik7XG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gYCR7Zm9sZGVyfS9qb3RzLm1kYDtcbiAgICAgICAgaWYgKCF0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZm9sZGVyKSkgYXdhaXQgdGhpcy5hcHAudmF1bHQuY3JlYXRlRm9sZGVyKGZvbGRlcik7XG5cbiAgICAgICAgLy8gXHU2OEMwXHU2N0U1XHU2NTg3XHU0RUY2XHU2NjJGXHU1NDI2XHU1QjU4XHU1NzI4XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChmaWxlUGF0aCk7XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nRmlsZSAmJiBleGlzdGluZ0ZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgLy8gXHU2NTg3XHU0RUY2XHU1QjU4XHU1NzI4XHVGRjBDXHU0RjdGXHU3NTI4IHZhdWx0LnByb2Nlc3MgXHU1QjlFXHU3M0IwXHU1MzlGXHU1QjUwXHU2MDI3XHU2NTg3XHU0RUY2XHU1MTk5XHU1MTY1XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5wcm9jZXNzKGV4aXN0aW5nRmlsZSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZUNvbnRlbnQgPSBkYXRhIHx8IFwiXCI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmcm9udG1hdHRlclJlZ2V4ID0gL14tLS1cXG4oW1xcc1xcU10qPylcXG4tLS1cXG4vO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyb250bWF0dGVyTWF0Y2ggPSBmaWxlQ29udGVudC5tYXRjaChmcm9udG1hdHRlclJlZ2V4KTtcblxuICAgICAgICAgICAgICAgIGlmIChmcm9udG1hdHRlck1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyb250bWF0dGVyRW5kID0gZnJvbnRtYXR0ZXJNYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJlZm9yZUZyb250bWF0dGVyID0gZmlsZUNvbnRlbnQuc3Vic3RyaW5nKDAsIGZyb250bWF0dGVyRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWZ0ZXJGcm9udG1hdHRlciA9IGZpbGVDb250ZW50LnN1YnN0cmluZyhmcm9udG1hdHRlckVuZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWZvcmVGcm9udG1hdHRlciArIG5ld0VudHJ5ICsgYWZ0ZXJGcm9udG1hdHRlcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3RW50cnkgKyBmaWxlQ29udGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFx1NjU4N1x1NEVGNlx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxQlx1NUVGQVx1NjVCMFx1NjU4N1x1NEVGNlxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQuY3JlYXRlKGZpbGVQYXRoLCBuZXdFbnRyeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICAgIH1cblxuICAgIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVBdHRhY2htZW50c0ZvbGRlcigpO1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9KT1RTKS5mb3JFYWNoKGxlYWYgPT4ge1xuICAgICAgICAgICAgaWYgKGxlYWYudmlldyBpbnN0YW5jZW9mIEpvdFZpZXcpIGxlYWYudmlldy5yZWZyZXNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRKb3RzRGF0YSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbW1hbmROYW1lcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ29tbWFuZE5hbWVzKCkge1xuICAgICAgICBjb25zdCBjb21tYW5kcyA9IFtcbiAgICAgICAgICAgIHsgaWQ6IFwib3Blbi1qb3Qtdmlld1wiLCBrZXk6IFwib3BlbkpvdFZpZXdcIiBhcyBrZXlvZiBUcmFuc2xhdGlvbnMgfSxcbiAgICAgICAgICAgIHsgaWQ6IFwicXVpY2stY2FwdHVyZVwiLCBrZXk6IFwicXVpY2tDYXB0dXJlXCIgYXMga2V5b2YgVHJhbnNsYXRpb25zIH1cbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBzZXBhcmF0b3IgPSB0aGlzLmxhbmcgPT09ICd6aCcgPyAnXHVGRjFBJyA6ICc6ICc7XG5cbiAgICAgICAgY29tbWFuZHMuZm9yRWFjaCgoeyBpZCwga2V5IH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSB0aGlzLmFwcC5jb21tYW5kcy5maW5kQ29tbWFuZChgJHt0aGlzLm1hbmlmZXN0LmlkfToke2lkfWApO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kLm5hbWUgPSBgam90JHtzZXBhcmF0b3J9JHt0KGtleSwgdGhpcy5sYW5nKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59IiwgIi8vIHNyYy92aWV3LnRzXG5pbXBvcnQgeyBJdGVtVmlldywgV29ya3NwYWNlTGVhZiwgVEZpbGUsIFRGb2xkZXIsIE5vdGljZSwgTWFya2Rvd25WaWV3LCBNYXJrZG93blJlbmRlcmVyLCBDb21wb25lbnQsIG5vcm1hbGl6ZVBhdGggfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgSm90UGx1Z2luIGZyb20gJy4vbWFpbic7XG5pbXBvcnQgeyBKb3QsIERheVJlY29yZCwgTGFuZ3VhZ2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHRyYW5zbGF0aW9ucywgdCwgVHJhbnNsYXRpb25zIH0gZnJvbSAnLi9pMThuJztcbmltcG9ydCB7XG4gICAgcGFyc2VGaWxlQ29udGVudCxcbiAgICBoYW5kbGVBdHRhY2htZW50LFxuICAgIGdldENsaXBib2FyZEltYWdlRmlsZXMsXG4gICAgc2V0dXBXaWtpbGlua0F1dG9jb21wbGV0ZSxcbiAgICBzZXR1cFRhZ0F1dG9jb21wbGV0ZSxcbiAgICByZW5kZXJUYWdMaXN0IGFzIHJlbmRlclRhZ1BpbGxzLFxuICAgIGhpZ2hsaWdodE1hcmtkb3duQ29udGVudCxcbiAgICBkZWJvdW5jZSxcbiAgICBzdGFibGVMZWdhY3lKb3RJZCxcbiAgICBub3JtYWxpemVKb3RUYWdzXG59IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBDQVJEX0xPTkdfUFJFU1NfTVMgPSA0ODA7XG5jb25zdCBDQVJEX1RBUF9NT1ZFX1BYID0gMTQ7XG5cbmV4cG9ydCBjb25zdCBWSUVXX1RZUEVfSk9UUyA9IFwiam90LXZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIEpvdFZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XG4gICAgcGx1Z2luOiBKb3RQbHVnaW47XG4gICAgam90czogSm90W10gPSBbXTtcbiAgICBzZWFyY2hRdWVyeTogc3RyaW5nID0gXCJcIjtcbiAgICBzZWxlY3RlZFRhZ3M6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuICAgIGN1cnJlbnRZZWFyOiBudW1iZXI7XG4gICAgY3VycmVudE1vbnRoOiBudW1iZXI7XG4gICAgaXNTaWRlYmFyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzdWdnZXN0aW9uQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgY3VycmVudFRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBpbnB1dENhcmQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBzZWFyY2hJbnB1dDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgc2VhcmNoQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgcmVuZGVyZWRDb21wb25lbnRzOiBDb21wb25lbnRbXSA9IFtdO1xuICAgIHByaXZhdGUgdGFnU3VnZ2VzdGlvbkNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHRhZ0xpc3RDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBjdXJyZW50VGFnczogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIGRlYm91bmNlZFJlbmRlcjogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBkZWJvdW5jZWRTZWFyY2g6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgd2lraWxpbmtDbGVhbnVwOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgICAvKiogSW5saW5lIGpvdCBlZGl0ICovXG4gICAgcHJpdmF0ZSBlZGl0aW5nSm90SWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgZWRpdFNlc3Npb25UYWdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByaXZhdGUgam90TGlzdENsZWFudXBzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG4gICAgZ2V0IGxhbmcoKTogTGFuZ3VhZ2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4ubGFuZztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IEpvdFBsdWdpbikge1xuICAgICAgICBzdXBlcihsZWFmKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBub3cuZ2V0TW9udGgoKTtcblxuICAgICAgICAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdTk2MzJcdTYyOTZcdTY0MUNcdTdEMjJcdTUxRkRcdTY1NzBcbiAgICAgICAgdGhpcy5kZWJvdW5jZWRTZWFyY2ggPSBkZWJvdW5jZSgocXVlcnk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTZWFyY2hBbmRGaWx0ZXIoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG5cbiAgICBnZXRWaWV3VHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gVklFV19UWVBFX0pPVFM7XG4gICAgfVxuXG4gICAgZ2V0RGlzcGxheVRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHQoJ2pvdFZpZXcnLCB0aGlzLmxhbmcpO1xuICAgIH1cblxuICAgIGdldEljb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFwiam90LWJvbHRcIjsgXG4gICAgfVxuXG4gICAgYXN5bmMgb25PcGVuKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5hZGRDbGFzcyhcImpvdHMtdmlld1wiKTtcblxuICAgICAgICBpZiAodGhpcy5sZWFmLnRhYkhlYWRlcklubmVySWNvbkVsKSB7XG4gICAgICAgICAgICB0aGlzLmxlYWYudGFiSGVhZGVySW5uZXJJY29uRWwuZW1wdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1NTIxRFx1NTlDQlx1NTMxNlx1OTYzMlx1NjI5Nlx1NkUzMlx1NjdEM1xuICAgICAgICB0aGlzLmRlYm91bmNlZFJlbmRlciA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIHRoaXMuY2hlY2tJZlNpZGViYXIoKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2FjdGl2ZS1sZWFmLWNoYW5nZScsIChsZWFmKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxlYWYgPT09IHRoaXMubGVhZiAmJiB0aGlzLmN1cnJlbnRUZXh0YXJlYSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzVGV4dGFyZWEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBjb25zdCB3YXNTaWRlYmFyID0gdGhpcy5pc1NpZGViYXI7XG4gICAgICAgIHRoaXMuY2hlY2tJZlNpZGViYXIoKTtcblxuICAgICAgICAvLyBcdTUzRUFcdTY3MDlcdTU3MjhcdTVFMDNcdTVDNDBcdTZBMjFcdTVGMEZcdTY1MzlcdTUzRDhcdTY1RjZcdTYyNERcdTkxQ0RcdTY1QjBcdTZFMzJcdTY3RDNcbiAgICAgICAgaWYgKHdhc1NpZGViYXIgIT09IHRoaXMuaXNTaWRlYmFyICYmIHRoaXMuZGVib3VuY2VkUmVuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmRlYm91bmNlZFJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb25DbG9zZSgpIHtcbiAgICAgICAgLy8gXHU2RTA1XHU3NDA2IHdpa2lsaW5rIFx1NUVGQVx1OEJBRVx1NUJCOVx1NTY2OFxuICAgICAgICBpZiAodGhpcy53aWtpbGlua0NsZWFudXApIHtcbiAgICAgICAgICAgIHRoaXMud2lraWxpbmtDbGVhbnVwKCk7XG4gICAgICAgICAgICB0aGlzLndpa2lsaW5rQ2xlYW51cCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdTZFMDVcdTc0MDZcdTVFRkFcdThCQUVcdTVCQjlcdTU2NjhcbiAgICAgICAgaWYgKHRoaXMudGFnU3VnZ2VzdGlvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy50YWdTdWdnZXN0aW9uQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy50YWdTdWdnZXN0aW9uQ29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1NkUwNVx1NzQwNlx1NjI0MFx1NjcwOVx1NkUzMlx1NjdEM1x1NzY4NFx1N0VDNFx1NEVGNlxuICAgICAgICB0aGlzLnJlbmRlcmVkQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb21wLnVubG9hZCgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1bmxvYWRpbmcgY29tcG9uZW50OlwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyZWRDb21wb25lbnRzID0gW107XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZm9jdXNUZXh0YXJlYSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRleHRhcmVhKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXh0YXJlYT8uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmN1cnJlbnRUZXh0YXJlYS52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2UobGVuZ3RoLCBsZW5ndGgpO1xuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgdXBkYXRlU2VhcmNoQW5kRmlsdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZSA9IHRoaXMuc2VhcmNoUXVlcnk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDbGVhckJ1dHRvbigpO1xuICAgICAgICBjb25zdCBsaXN0U2VjdGlvbiA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1saXN0LXNlY3Rpb25cIik7XG4gICAgICAgIGlmIChsaXN0U2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJKb3RMaXN0KGxpc3RTZWN0aW9uIGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHVwZGF0ZUNsZWFyQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hDb250YWluZXIpIHtcbiAgICAgICAgICAgIGxldCBjbGVhckJ0bkNvbnRhaW5lciA9IHRoaXMuc2VhcmNoQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWNsZWFyLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGlmICghY2xlYXJCdG5Db250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lciA9IHRoaXMuc2VhcmNoQ29udGFpbmVyLmNyZWF0ZURpdih7IGNsczogXCJzZWFyY2gtY2xlYXItY29udGFpbmVyXCIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ICYmIHRoaXMuc2VhcmNoUXVlcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYXJJY29uID0gY2xlYXJCdG5Db250YWluZXIuY3JlYXRlU3BhbigpO1xuICAgICAgICAgICAgICAgIGNsZWFySWNvbi50ZXh0Q29udGVudCA9IFwiXHUwMEQ3XCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2xlYXJCdG5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gXCI4cHhcIjtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lci5zdHlsZS50b3AgPSBcIjUwJVwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgtNTAlKVwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lci5zdHlsZS53aWR0aCA9IFwiMjRweFwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiMjRweFwiO1xuICAgICAgICAgICAgICAgIGNsZWFyQnRuQ29udGFpbmVyLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNTAlXCI7XG4gICAgICAgICAgICAgICAgY2xlYXJCdG5Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgICAgICAgICBjbGVhckJ0bkNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBcIjEwXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIjMycHhcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2xlYXJCdG5Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlYXJjaEFuZEZpbHRlcigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYXJCdG5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlU2VhcmNoRmlsdGVycyhxdWVyeTogc3RyaW5nKTogeyBkYXRlPzogc3RyaW5nOyB1cGRhdGVkPzogc3RyaW5nOyBrZXl3b3Jkczogc3RyaW5nW10gfSB7XG4gICAgICAgIGNvbnN0IGtleXdvcmRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgZGF0ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdXBkYXRlZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcXVlcnkudHJpbSgpLnNwbGl0KC9cXHMrLykuZmlsdGVyKEJvb2xlYW4pKSB7XG4gICAgICAgICAgICBjb25zdCBsb3dlciA9IHBhcnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChsb3dlci5zdGFydHNXaXRoKFwiZGF0ZTpcIikpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gcGFydC5zbGljZSg1KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobG93ZXIuc3RhcnRzV2l0aChcInVwZGF0ZWQ6XCIpKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZCA9IHBhcnQuc2xpY2UoOCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtleXdvcmRzLnB1c2gocGFydC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkYXRlLCB1cGRhdGVkLCBrZXl3b3JkcyB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoQ2FyZFRhcEFuZExvbmdQcmVzcyhjYXJkOiBIVE1MRWxlbWVudCwgam90OiBKb3QpIHtcbiAgICAgICAgbGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuICAgICAgICBsZXQgbG9uZ1ByZXNzRmlyZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHN0YXJ0WCA9IDA7XG4gICAgICAgIGxldCBzdGFydFkgPSAwO1xuICAgICAgICBsZXQgbW92ZWRUb29GYXIgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBjbGVhclRpbWVyID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25Qb2ludGVyRG93biA9IChlOiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIgJiYgZS5idXR0b24gIT09IDApIHJldHVybjtcbiAgICAgICAgICAgIGxvbmdQcmVzc0ZpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICBtb3ZlZFRvb0ZhciA9IGZhbHNlO1xuICAgICAgICAgICAgc3RhcnRYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgc3RhcnRZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYXJkLnNldFBvaW50ZXJDYXB0dXJlKGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIC8qIGlnbm9yZSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgbG9uZ1ByZXNzRmlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZvaWQgdGhpcy5vcGVuSm90KGpvdCk7XG4gICAgICAgICAgICB9LCBDQVJEX0xPTkdfUFJFU1NfTVMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uUG9pbnRlck1vdmUgPSAoZTogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGltZXIgPT09IG51bGwgJiYgIWxvbmdQcmVzc0ZpcmVkKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBkeCA9IGUuY2xpZW50WCAtIHN0YXJ0WDtcbiAgICAgICAgICAgIGNvbnN0IGR5ID0gZS5jbGllbnRZIC0gc3RhcnRZO1xuICAgICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5ID4gQ0FSRF9UQVBfTU9WRV9QWCAqIENBUkRfVEFQX01PVkVfUFgpIHtcbiAgICAgICAgICAgICAgICBtb3ZlZFRvb0ZhciA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uUG9pbnRlclVwID0gKGU6IFBvaW50ZXJFdmVudCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYXJkLnJlbGVhc2VQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAvKiBpZ25vcmUgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsb25nUHJlc3NGaXJlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKG1vdmVkVG9vRmFyKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoZS5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGUuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmVudGVyRWRpdE1vZGUoam90KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblBvaW50ZXJDYW5jZWwgPSAoZTogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVyKCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNhcmQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIC8qIGlnbm9yZSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24pO1xuICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvblBvaW50ZXJNb3ZlKTtcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIG9uUG9pbnRlclVwKTtcbiAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmNhbmNlbFwiLCBvblBvaW50ZXJDYW5jZWwpO1xuXG4gICAgICAgIHRoaXMuam90TGlzdENsZWFudXBzLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgY2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93bik7XG4gICAgICAgICAgICBjYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvblBvaW50ZXJNb3ZlKTtcbiAgICAgICAgICAgIGNhcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBvblBvaW50ZXJVcCk7XG4gICAgICAgICAgICBjYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsIG9uUG9pbnRlckNhbmNlbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW50ZXJFZGl0TW9kZShqb3Q6IEpvdCkge1xuICAgICAgICB0aGlzLmVkaXRpbmdKb3RJZCA9IGpvdC5pZDtcbiAgICAgICAgdGhpcy5lZGl0U2Vzc2lvblRhZ3MgPSBbLi4uam90LnRhZ3NdO1xuICAgICAgICBjb25zdCBsaXN0U2VjdGlvbiA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1saXN0LXNlY3Rpb25cIik7XG4gICAgICAgIGlmIChsaXN0U2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJKb3RMaXN0KGxpc3RTZWN0aW9uIGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXhpdEVkaXRNb2RlKCkge1xuICAgICAgICB0aGlzLmVkaXRpbmdKb3RJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZWRpdFNlc3Npb25UYWdzID0gW107XG4gICAgICAgIGNvbnN0IGxpc3RTZWN0aW9uID0gdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5qb3RzLWxpc3Qtc2VjdGlvblwiKTtcbiAgICAgICAgaWYgKGxpc3RTZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckpvdExpc3QobGlzdFNlY3Rpb24gYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgcmVuZGVyVGFnTGlzdChjb250YWluZXI6IEhUTUxFbGVtZW50LCB0YWdzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUYWdzID0gdGFncztcbiAgICAgICAgcmVuZGVyVGFnUGlsbHMoY29udGFpbmVyLCB0YWdzLCAodGFnKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYWdzID0gdGhpcy5jdXJyZW50VGFncy5maWx0ZXIodCA9PiB0ICE9PSB0YWcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWdMaXN0KGNvbnRhaW5lciwgdGhpcy5jdXJyZW50VGFncyk7XG4gICAgICAgICAgICBjb25zdCB0YWdJbnB1dCA9IHRoaXMuaW5wdXRDYXJkPy5xdWVyeVNlbGVjdG9yKFwiLmpvdHMtdGFnLWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGFnSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0YWdJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNldHVwVGFnQXV0b2NvbXBsZXRlKHRhZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50LCBjb250YWluZXI6IEhUTUxFbGVtZW50LCB0YWdMaXN0Q29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzZXR1cFRhZ0F1dG9jb21wbGV0ZShcbiAgICAgICAgICAgICgpID0+IHRoaXMuZ2V0RXhpc3RpbmdUYWdzKCksXG4gICAgICAgICAgICB0YWdJbnB1dCxcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIHRhZ0xpc3RDb250YWluZXIsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYWdzLFxuICAgICAgICAgICAgKHRhZykgPT4gdGhpcy5hZGRUYWdUb0lucHV0KHRhZywgdGFnSW5wdXQsIHRhZ0xpc3RDb250YWluZXIpLFxuICAgICAgICAgICAgKHRhZ3MpID0+IHRoaXMucmVuZGVyVGFnTGlzdCh0YWdMaXN0Q29udGFpbmVyLCB0YWdzKVxuICAgICAgICApO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdldEV4aXN0aW5nVGFncygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHRhZ3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgZm9yIChjb25zdCBqb3Qgb2YgdGhpcy5qb3RzKSB7XG4gICAgICAgICAgICBqb3QudGFncy5mb3JFYWNoKHRhZyA9PiB0YWdzLmFkZCh0YWcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0YWdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRhZ1RvSW5wdXQodGFnOiBzdHJpbmcsIHRhZ0lucHV0OiBIVE1MSW5wdXRFbGVtZW50LCB0YWdMaXN0Q29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBpZiAodGFnICYmICF0aGlzLmN1cnJlbnRUYWdzLmluY2x1ZGVzKHRhZykpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhZ3MucHVzaCh0YWcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWdMaXN0KHRhZ0xpc3RDb250YWluZXIsIHRoaXMuY3VycmVudFRhZ3MpO1xuICAgICAgICAgICAgdGFnSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tJZlNpZGViYXIoKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jb250ZW50RWwuY2xpZW50V2lkdGg7XG4gICAgICAgIHRoaXMuaXNTaWRlYmFyID0gd2lkdGggPCA0NTA7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkSm90cygpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRKb3RzKCkge1xuICAgICAgICBjb25zdCBmb2xkZXIgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zYXZlRm9sZGVyO1xuICAgICAgICBjb25zdCBmb2xkZXJPYmogPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZm9sZGVyKTtcblxuICAgICAgICBpZiAoIWZvbGRlck9iaiB8fCAhKGZvbGRlck9iaiBpbnN0YW5jZW9mIFRGb2xkZXIpKSB7XG4gICAgICAgICAgICB0aGlzLmpvdHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gZm9sZGVyT2JqLmNoaWxkcmVuLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBURmlsZSAmJiBmLm5hbWUuZW5kc1dpdGgoXCIubWRcIikpO1xuICAgICAgICBjb25zdCBhbGxKb3RzOiBKb3RbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSBhcyBURmlsZSk7XG4gICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gcGFyc2VGaWxlQ29udGVudChjb250ZW50LCBmaWxlLnBhdGgsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICBhbGxKb3RzLnB1c2goLi4uZW50cmllcyk7XG4gICAgICAgIH1cblxuICAgICAgICBhbGxKb3RzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVBID0gbW9tZW50KGEuZGF0ZSArIFwiIFwiICsgYS50aW1lLCBcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG4gICAgICAgICAgICBjb25zdCBkYXRlQiA9IG1vbWVudChiLmRhdGUgKyBcIiBcIiArIGIudGltZSwgXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVCLnZhbHVlT2YoKSAtIGRhdGVBLnZhbHVlT2YoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5qb3RzID0gYWxsSm90cztcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaXNTaWRlYmFyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclNpZGViYXJMYXlvdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTWFpbkxheW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZvY3VzVGV4dGFyZWEoKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyTWFpbkxheW91dCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KCk7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5nYXAgPSBcIjIwcHhcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgICBjb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGVmdFBhbmVsID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBsZWZ0UGFuZWwuc3R5bGUuZmxleCA9IFwiMlwiO1xuICAgICAgICBsZWZ0UGFuZWwuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICAgICAgbGVmdFBhbmVsLnN0eWxlLnBhZGRpbmcgPSBcIjEwcHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJpZ2h0UGFuZWwgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHJpZ2h0UGFuZWwuc3R5bGUuZmxleCA9IFwiMVwiO1xuICAgICAgICByaWdodFBhbmVsLnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICAgIHJpZ2h0UGFuZWwuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJGdWxsSW5wdXQobGVmdFBhbmVsKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxpc3RDb250YWluZXIgPSBsZWZ0UGFuZWwuY3JlYXRlRGl2KCk7XG4gICAgICAgIGxpc3RDb250YWluZXIuc3R5bGUubWFyZ2luVG9wID0gXCIyMHB4XCI7XG4gICAgICAgIHRoaXMucmVuZGVySm90TGlzdChsaXN0Q29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyU3RhdHMocmlnaHRQYW5lbCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIocmlnaHRQYW5lbCk7XG4gICAgICAgIHRoaXMucmVuZGVyU2VhcmNoKHJpZ2h0UGFuZWwpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJTaWRlYmFyTGF5b3V0KCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSBcImNvbHVtblwiO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuZ2FwID0gXCIxMnB4XCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFkZEJ0biA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgYWRkQnRuLnRleHRDb250ZW50ID0gXCIrIFwiICsgdCgncXVpY2tDYXB0dXJlJywgdGhpcy5sYW5nKTtcbiAgICAgICAgYWRkQnRuLnN0eWxlLmJhY2tncm91bmQgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgYWRkQnRuLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIjtcbiAgICAgICAgYWRkQnRuLnN0eWxlLnBhZGRpbmcgPSBcIjhweCAxMnB4XCI7XG4gICAgICAgIGFkZEJ0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBhZGRCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIGFkZEJ0bi5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBhZGRCdG4uc3R5bGUuZm9udFNpemUgPSBcIjEzcHhcIjtcbiAgICAgICAgYWRkQnRuLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiNHB4XCI7XG4gICAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBDYXB0dXJlTW9kYWwgfSA9IHJlcXVpcmUoJy4vY2FwdHVyZS1tb2RhbCcpO1xuICAgICAgICAgICAgbmV3IENhcHR1cmVNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4pLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlclN0YXRzQ29tcGFjdChjb250YWluZXIpO1xuICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyQ29tcGFjdChjb250YWluZXIpO1xuICAgICAgICB0aGlzLnJlbmRlclNlYXJjaENvbXBhY3QoY29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxpc3RDb250YWluZXIgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIGxpc3RDb250YWluZXIuc3R5bGUubWFyZ2luVG9wID0gXCI4cHhcIjtcbiAgICAgICAgdGhpcy5yZW5kZXJKb3RMaXN0KGxpc3RDb250YWluZXIpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJGdWxsSW5wdXQoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLmlucHV0Q2FyZCA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGhpcy5pbnB1dENhcmQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSlcIjtcbiAgICAgICAgdGhpcy5pbnB1dENhcmQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIxMnB4XCI7XG4gICAgICAgIHRoaXMuaW5wdXRDYXJkLnN0eWxlLnBhZGRpbmcgPSBcIjE2cHhcIjtcbiAgICAgICAgdGhpcy5pbnB1dENhcmQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmlucHV0Q2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0KCdxdWlja1JlY29yZCcsIHRoaXMubGFuZyk7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gXCIxNnB4XCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjYwMFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjEycHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuXG4gICAgICAgIGNvbnN0IHRleHRhcmVhQ29udGFpbmVyID0gdGhpcy5pbnB1dENhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgIHRleHRhcmVhQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXG4gICAgICAgIGNvbnN0IHRleHRhcmVhID0gdGV4dGFyZWFDb250YWluZXIuY3JlYXRlRWwoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgdGV4dGFyZWEucGxhY2Vob2xkZXIgPSB0KCdwbGFjZWhvbGRlcldpdGhMaW5rJywgdGhpcy5sYW5nKTtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUubWluSGVpZ2h0ID0gXCIxMDBweFwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICB0ZXh0YXJlYS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgIHRleHRhcmVhLnN0eWxlLnJlc2l6ZSA9IFwidmVydGljYWxcIjtcbiAgICAgICAgdGV4dGFyZWEuc3R5bGUuZm9udEZhbWlseSA9IFwidmFyKC0tZm9udC10ZXh0KVwiO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFRleHRhcmVhID0gdGV4dGFyZWE7XG4gICAgICAgIHRoaXMuc2V0dXBXaWtpbGlua0F1dG9jb21wbGV0ZSh0ZXh0YXJlYSwgdGV4dGFyZWFDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IHRhZ1NlY3Rpb24gPSB0aGlzLmlucHV0Q2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGFnU2VjdGlvbi5zdHlsZS5tYXJnaW5Ub3AgPSBcIjhweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGFnSW5wdXRDb250YWluZXIgPSB0YWdTZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICB0YWdJbnB1dENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgdGFnSW5wdXRDb250YWluZXIuc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRhZ0lucHV0ID0gdGFnSW5wdXRDb250YWluZXIuY3JlYXRlRWwoXCJpbnB1dFwiKTtcbiAgICAgICAgdGFnSW5wdXQuYWRkQ2xhc3MoXCJqb3RzLXRhZy1pbnB1dFwiKTtcbiAgICAgICAgdGFnSW5wdXQucGxhY2Vob2xkZXIgPSB0KCd0YWdzSW5wdXRQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHRhZ0lucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHRhZ0lucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICB0YWdJbnB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICB0YWdJbnB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgdGFnSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgIHRhZ0lucHV0LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lciA9IHRhZ1NlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIHRoaXMudGFnTGlzdENvbnRhaW5lci5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICB0aGlzLnRhZ0xpc3RDb250YWluZXIuc3R5bGUuZ2FwID0gXCI2cHhcIjtcbiAgICAgICAgdGhpcy50YWdMaXN0Q29udGFpbmVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIHRoaXMuY3VycmVudFRhZ3MgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0dXBUYWdBdXRvY29tcGxldGUodGFnSW5wdXQsIHRhZ0lucHV0Q29udGFpbmVyLCB0aGlzLnRhZ0xpc3RDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZUlucHV0ID0gdGhpcy5pbnB1dENhcmQuY3JlYXRlRWwoXCJpbnB1dFwiKTtcbiAgICAgICAgc291cmNlSW5wdXQucGxhY2Vob2xkZXIgPSB0KCdzb3VyY2VQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgc291cmNlSW5wdXQuc3R5bGUubWFyZ2luVG9wID0gXCI4cHhcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnRBcmVhID0gdGhpcy5pbnB1dENhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLm1hcmdpblRvcCA9IFwiOHB4XCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlciA9IFwiMXB4IGRhc2hlZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUucGFkZGluZyA9IFwiOHB4XCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS50ZXh0Q29udGVudCA9IHQoJ2F0dGFjaG1lbnRQbGFjZWhvbGRlcicsIHRoaXMubGFuZyk7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmZvbnRTaXplID0gXCIxMnB4XCI7XG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgXG4gICAgICAgIGxldCBzZWxlY3RlZEF0dGFjaG1lbnRzOiB7IHBhdGg6IHN0cmluZzsgdHlwZTogXCJpbWFnZVwiIHwgXCJmaWxlXCIgfVtdID0gW107XG4gICAgICAgIFxuICAgICAgICBhdHRhY2htZW50QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gXCJmaWxlXCI7XG4gICAgICAgICAgICBpbnB1dC5tdWx0aXBsZSA9IHRydWU7XG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgfHwgW10pO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUF0dGFjaG1lbnQoZmlsZSwgYXR0YWNobWVudEFyZWEsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQXR0YWNobWVudHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBzZWxlY3RlZEF0dGFjaG1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnRleHRDb250ZW50ID0gdCgnc2VsZWN0ZWRGaWxlcycsIHRoaXMubGFuZywgeyBjb3VudDogU3RyaW5nKGNvdW50KSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbnB1dC5jbGljaygpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYXR0YWNobWVudEFyZWEuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3ZlcilcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhdHRhY2htZW50QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGF0dGFjaG1lbnRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGFzeW5jIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5ib3JkZXJDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICBhdHRhY2htZW50QXJlYS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeSlcIjtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRhdGFUcmFuc2Zlcj8uZmlsZXMgfHwgW10pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVBdHRhY2htZW50KGZpbGUsIGF0dGFjaG1lbnRBcmVhLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQXR0YWNobWVudHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHNlbGVjdGVkQXR0YWNobWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50QXJlYS50ZXh0Q29udGVudCA9IHQoJ3NlbGVjdGVkRmlsZXMnLCB0aGlzLmxhbmcsIHsgY291bnQ6IFN0cmluZyhjb3VudCkgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXN0ZVwiLCBhc3luYyAoZTogQ2xpcGJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlRmlsZXMgPSBnZXRDbGlwYm9hcmRJbWFnZUZpbGVzKGUuY2xpcGJvYXJkRGF0YSk7XG4gICAgICAgICAgICBpZiAoaW1hZ2VGaWxlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYWluID0gZS5jbGlwYm9hcmREYXRhPy5nZXREYXRhKFwidGV4dC9wbGFpblwiKSA/PyBcIlwiO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGltYWdlRmlsZXMpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUF0dGFjaG1lbnQoXG4gICAgICAgICAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09IFwiaW1hZ2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0TWFya2Rvd25FbWJlZEF0Q3Vyc29yKHRleHRhcmVhLCByZXN1bHQucGF0aCwgXCJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBmYWlsdXJlTm90aWNlS2V5OiBcInBhc3RlSW1hZ2VVcGxvYWRGYWlsZWRcIiB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0VGV4dEF0Q3Vyc29yKHRleHRhcmVhLCBwbGFpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBidXR0b25Sb3cgPSB0aGlzLmlucHV0Q2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgYnV0dG9uUm93LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgYnV0dG9uUm93LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJmbGV4LWVuZFwiO1xuICAgICAgICBidXR0b25Sb3cuc3R5bGUubWFyZ2luVG9wID0gXCIxMnB4XCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzYXZlQnRuID0gYnV0dG9uUm93LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICAgICAgICBzYXZlQnRuLnRleHRDb250ZW50ID0gdCgnc2F2ZScsIHRoaXMubGFuZyk7XG4gICAgICAgIHNhdmVCdG4uc3R5bGUucGFkZGluZyA9IFwiNnB4IDE2cHhcIjtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBzYXZlQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0taW50ZXJhY3RpdmUtYWNjZW50KVwiO1xuICAgICAgICBzYXZlQnRuLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIjtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgc2F2ZUJ0bi5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcblxuICAgICAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGV4dGFyZWEudmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0KCdjb250ZW50UmVxdWlyZWQnLCB0aGlzLmxhbmcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbLi4udGhpcy5jdXJyZW50VGFnc107XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVKb3QoY29udGVudCwgdGFncywgc291cmNlLCBzZWxlY3RlZEF0dGFjaG1lbnRzKTtcblxuICAgICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFncyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYWdMaXN0KHRoaXMudGFnTGlzdENvbnRhaW5lciEsIFtdKTtcbiAgICAgICAgICAgIHRhZ0lucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIHNvdXJjZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIHNlbGVjdGVkQXR0YWNobWVudHMgPSBbXTtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnRleHRDb250ZW50ID0gdCgnYXR0YWNobWVudFBsYWNlaG9sZGVyJywgdGhpcy5sYW5nKTtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgIGF0dGFjaG1lbnRBcmVhLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmZvY3VzVGV4dGFyZWEoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHNldHVwV2lraWxpbmtBdXRvY29tcGxldGUodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiAoKSA9PiB2b2lkIHtcbiAgICAgICAgdGhpcy53aWtpbGlua0NsZWFudXAgPSBzZXR1cFdpa2lsaW5rQXV0b2NvbXBsZXRlKFxuICAgICAgICAgICAgdGhpcy5hcHAsXG4gICAgICAgICAgICB0ZXh0YXJlYSxcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIChmaWxlLCB0ZXh0YXJlYSwgYnJhY2tldFN0YXJ0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3Vyc29yUG9zID0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dEJlZm9yZSA9IHRleHRhcmVhLnZhbHVlLnN1YnN0cmluZygwLCBicmFja2V0U3RhcnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRBZnRlciA9IHRleHRhcmVhLnZhbHVlLnN1YnN0cmluZyhjdXJzb3JQb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RleHQgPSB0ZXh0QmVmb3JlICsgYFtbJHtmaWxlLmJhc2VuYW1lfV1dYCArIHRleHRBZnRlcjtcbiAgICAgICAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IG5ld1RleHQ7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdDdXJzb3JQb3MgPSBicmFja2V0U3RhcnQgKyBmaWxlLmJhc2VuYW1lLmxlbmd0aCArIDQ7XG4gICAgICAgICAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQgPSBuZXdDdXJzb3JQb3M7XG4gICAgICAgICAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gbmV3Q3Vyc29yUG9zO1xuXG4gICAgICAgICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lraWxpbmtDbGVhbnVwO1xuICAgIH1cbiAgICBcblxuICAgIGFzeW5jIGhhbmRsZUF0dGFjaG1lbnQoXG4gICAgICAgIGZpbGU6IEZpbGUsXG4gICAgICAgIGFyZWE6IEhUTUxFbGVtZW50LFxuICAgICAgICBjYWxsYmFjazogKHJlc3VsdDogeyBwYXRoOiBzdHJpbmc7IHR5cGU6IFwiaW1hZ2VcIiB8IFwiZmlsZVwiIH0pID0+IHZvaWQsXG4gICAgICAgIG9wdGlvbnM/OiB7IGZhaWx1cmVOb3RpY2VLZXk/OiBrZXlvZiBUcmFuc2xhdGlvbnMgfVxuICAgICkge1xuICAgICAgICBhd2FpdCBoYW5kbGVBdHRhY2htZW50KFxuICAgICAgICAgICAgdGhpcy5hcHAsXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MsXG4gICAgICAgICAgICB0aGlzLmxhbmcsXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiogSW5zZXJ0IGFyYml0cmFyeSB0ZXh0IGF0IHRoZSBjYXJldCAodXNlZCBhZnRlciBpbWFnZSBwYXN0ZSB3aGVuIGNsaXBib2FyZCBhbHNvIGNhcnJpZXMgcGxhaW4gdGV4dCkuICovXG4gICAgaW5zZXJ0VGV4dEF0Q3Vyc29yKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCB0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgY29uc3QgZW5kID0gdGV4dGFyZWEuc2VsZWN0aW9uRW5kO1xuICAgICAgICBjb25zdCB2YWwgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSB2YWwuc2xpY2UoMCwgc3RhcnQpICsgdGV4dCArIHZhbC5zbGljZShlbmQpO1xuICAgICAgICBjb25zdCBjdXJzb3IgPSBzdGFydCArIHRleHQubGVuZ3RoO1xuICAgICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCA9IGN1cnNvcjtcbiAgICAgICAgdGV4dGFyZWEuc2VsZWN0aW9uRW5kID0gY3Vyc29yO1xuICAgIH1cblxuICAgIC8qKiBJbnNlcnQgYCFbW3BhdGhdXWAgb3IgYFtbcGF0aF1dYCBhdCB0aGUgdGV4dGFyZWEgY2FyZXQgd2l0aG91dCByZXBsYWNpbmcgdW5yZWxhdGVkIHRleHQuICovXG4gICAgaW5zZXJ0TWFya2Rvd25FbWJlZEF0Q3Vyc29yKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCB2YXVsdFBhdGg6IHN0cmluZywga2luZDogXCJpbWFnZVwiIHwgXCJmaWxlXCIpIHtcbiAgICAgICAgY29uc3QgZW1iZWQgPSBraW5kID09PSBcImltYWdlXCIgPyBgIVtbJHt2YXVsdFBhdGh9XV1gIDogYFtbJHt2YXVsdFBhdGh9XV1gO1xuICAgICAgICB0aGlzLmluc2VydFRleHRBdEN1cnNvcih0ZXh0YXJlYSwgZW1iZWQpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJTdGF0cyhjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gdGhpcy5nZXRTdGF0cygpO1xuXG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gXCIxMnB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSlcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjhweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSBcIjEycHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcblxuICAgICAgICBjb25zdCBjb250ZW50RGl2ID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgY29udGVudERpdi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGNvbnRlbnREaXYuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInNwYWNlLWFyb3VuZFwiO1xuXG4gICAgICAgIGNvbnN0IHRvdGFsRGl2ID0gY29udGVudERpdi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdG90YWxEaXYuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgdG90YWxEaXYuc3R5bGUuZmxleCA9IFwiMVwiO1xuICAgICAgICB0b3RhbERpdi5jcmVhdGVEaXYoeyB0ZXh0OiBzdGF0cy50b3RhbC50b1N0cmluZygpLCBzdHlsZTogXCJmb250LXNpemU6IDI0cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1wiIH0pO1xuICAgICAgICB0b3RhbERpdi5jcmVhdGVEaXYoeyB0ZXh0OiB0KCd0b3RhbCcsIHRoaXMubGFuZyksIHN0eWxlOiBcImZvbnQtc2l6ZTogMTFweDsgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1wiIH0pO1xuXG4gICAgICAgIGNvbnN0IHRvZGF5RGl2ID0gY29udGVudERpdi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdG9kYXlEaXYuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgdG9kYXlEaXYuc3R5bGUuZmxleCA9IFwiMVwiO1xuICAgICAgICB0b2RheURpdi5jcmVhdGVEaXYoeyB0ZXh0OiBzdGF0cy50b2RheS50b1N0cmluZygpLCBzdHlsZTogXCJmb250LXNpemU6IDI0cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1wiIH0pO1xuICAgICAgICB0b2RheURpdi5jcmVhdGVEaXYoeyB0ZXh0OiB0KCd0b2RheScsIHRoaXMubGFuZyksIHN0eWxlOiBcImZvbnQtc2l6ZTogMTFweDsgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1wiIH0pO1xuXG4gICAgICAgIGNvbnN0IG1vbnRoRGl2ID0gY29udGVudERpdi5jcmVhdGVEaXYoKTtcbiAgICAgICAgbW9udGhEaXYuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgbW9udGhEaXYuc3R5bGUuZmxleCA9IFwiMVwiO1xuICAgICAgICBtb250aERpdi5jcmVhdGVEaXYoeyB0ZXh0OiBzdGF0cy50aGlzTW9udGgudG9TdHJpbmcoKSwgc3R5bGU6IFwiZm9udC1zaXplOiAyNHB4OyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IHZhcigtLXRleHQtbm9ybWFsKTtcIiB9KTtcbiAgICAgICAgbW9udGhEaXYuY3JlYXRlRGl2KHsgdGV4dDogdCgndGhpc01vbnRoJywgdGhpcy5sYW5nKSwgc3R5bGU6IFwiZm9udC1zaXplOiAxMXB4OyBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XCIgfSk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlclN0YXRzQ29tcGFjdChjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gdGhpcy5nZXRTdGF0cygpO1xuXG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KVwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnREaXYgPSBzZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICBjb250ZW50RGl2LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgY29udGVudERpdi5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwic3BhY2UtYXJvdW5kXCI7XG4gICAgICAgIGNvbnRlbnREaXYuc3R5bGUuZ2FwID0gXCI4cHhcIjtcblxuICAgICAgICBjb25zdCB0b3RhbERpdiA9IGNvbnRlbnREaXYuY3JlYXRlRGl2KCk7XG4gICAgICAgIHRvdGFsRGl2LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIHRvdGFsRGl2LnN0eWxlLmZsZXggPSBcIjFcIjtcbiAgICAgICAgdG90YWxEaXYuY3JlYXRlRGl2KHsgdGV4dDogc3RhdHMudG90YWwudG9TdHJpbmcoKSwgc3R5bGU6IFwiZm9udC1zaXplOiAxOHB4OyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6IHZhcigtLXRleHQtbm9ybWFsKTtcIiB9KTtcbiAgICAgICAgdG90YWxEaXYuY3JlYXRlRGl2KHsgdGV4dDogdCgndG90YWwnLCB0aGlzLmxhbmcpLCBzdHlsZTogXCJmb250LXNpemU6IDEwcHg7IGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTsgbWFyZ2luLXRvcDogMnB4O1wiIH0pO1xuXG4gICAgICAgIGNvbnN0IHRvZGF5RGl2ID0gY29udGVudERpdi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdG9kYXlEaXYuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgdG9kYXlEaXYuc3R5bGUuZmxleCA9IFwiMVwiO1xuICAgICAgICB0b2RheURpdi5jcmVhdGVEaXYoeyB0ZXh0OiBzdGF0cy50b2RheS50b1N0cmluZygpLCBzdHlsZTogXCJmb250LXNpemU6IDE4cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1wiIH0pO1xuICAgICAgICB0b2RheURpdi5jcmVhdGVEaXYoeyB0ZXh0OiB0KCd0b2RheScsIHRoaXMubGFuZyksIHN0eWxlOiBcImZvbnQtc2l6ZTogMTBweDsgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpOyBtYXJnaW4tdG9wOiAycHg7XCIgfSk7XG5cbiAgICAgICAgY29uc3QgbW9udGhEaXYgPSBjb250ZW50RGl2LmNyZWF0ZURpdigpO1xuICAgICAgICBtb250aERpdi5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBtb250aERpdi5zdHlsZS5mbGV4ID0gXCIxXCI7XG4gICAgICAgIG1vbnRoRGl2LmNyZWF0ZURpdih7IHRleHQ6IHN0YXRzLnRoaXNNb250aC50b1N0cmluZygpLCBzdHlsZTogXCJmb250LXNpemU6IDE4cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogdmFyKC0tdGV4dC1ub3JtYWwpO1wiIH0pO1xuICAgICAgICBtb250aERpdi5jcmVhdGVEaXYoeyB0ZXh0OiB0KCd0aGlzTW9udGgnLCB0aGlzLmxhbmcpLCBzdHlsZTogXCJmb250LXNpemU6IDEwcHg7IGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTsgbWFyZ2luLXRvcDogMnB4O1wiIH0pO1xuICAgIH1cbiAgICBcbiAgICBnZXRTdGF0cygpIHtcbiAgICAgICAgY29uc3QgdG90YWwgPSB0aGlzLmpvdHMubGVuZ3RoO1xuICAgICAgICBjb25zdCB0b2RheSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XG4gICAgICAgIGNvbnN0IHRvZGF5Q291bnQgPSB0aGlzLmpvdHMuZmlsdGVyKG0gPT4gbS5kYXRlID09PSB0b2RheSkubGVuZ3RoO1xuICAgICAgICBjb25zdCB0aGlzTW9udGggPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NXCIpO1xuICAgICAgICBjb25zdCB0aGlzTW9udGhDb3VudCA9IHRoaXMuam90cy5maWx0ZXIobSA9PiBtLmRhdGUuc3RhcnRzV2l0aCh0aGlzTW9udGgpKS5sZW5ndGg7XG4gICAgICAgIHJldHVybiB7IHRvdGFsLCB0b2RheTogdG9kYXlDb3VudCwgdGhpc01vbnRoOiB0aGlzTW9udGhDb3VudCB9O1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJDYWxlbmRhcihjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gXCIxMnB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSlcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjhweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSBcIjEycHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRpdGxlID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlx1RDgzRFx1RENDNSBcIiArIHQoJ2NhbGVuZGFyJywgdGhpcy5sYW5nKTtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSBcIjEzcHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbnRlbnREaXYgPSBzZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyR3JpZChjb250ZW50RGl2KTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyQ2FsZW5kYXJDb21wYWN0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjhweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1zZWNvbmRhcnkpXCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gXCIxMHB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0aXRsZSA9IHNlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJcdUQ4M0RcdURDQzUgXCIgKyB0KCdjYWxlbmRhcicsIHRoaXMubGFuZyk7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gXCIxMnB4XCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjUwMFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjZweFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb250ZW50RGl2ID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhckdyaWRDb21wYWN0KGNvbnRlbnREaXYpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJDYWxlbmRhckdyaWQoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKHRoaXMuY3VycmVudFllYXIsIHRoaXMuY3VycmVudE1vbnRoLCAxKTtcbiAgICAgICAgY29uc3QgbGFzdERheSA9IG5ldyBEYXRlKHRoaXMuY3VycmVudFllYXIsIHRoaXMuY3VycmVudE1vbnRoICsgMSwgMCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0V2Vla2RheSA9IGZpcnN0RGF5LmdldERheSgpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaGVhZGVyID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBoZWFkZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBoZWFkZXIuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInNwYWNlLWJldHdlZW5cIjtcbiAgICAgICAgaGVhZGVyLnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xuICAgICAgICBoZWFkZXIuc3R5bGUubWFyZ2luQm90dG9tID0gXCIxMHB4XCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcmV2QnRuID0gaGVhZGVyLmNyZWF0ZURpdigpO1xuICAgICAgICBwcmV2QnRuLnRleHRDb250ZW50ID0gXCJcdTIxOTBcIjtcbiAgICAgICAgcHJldkJ0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgcHJldkJ0bi5zdHlsZS5wYWRkaW5nID0gXCI0cHggOHB4XCI7XG4gICAgICAgIHByZXZCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHhcIjtcbiAgICAgICAgcHJldkJ0bi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7IHByZXZCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWhvdmVyKVwiOyB9KTtcbiAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7IHByZXZCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiOyB9KTtcbiAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5jaGFuZ2VNb250aCgtMSkpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGl0bGUgPSBoZWFkZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gYCR7dGhpcy5jdXJyZW50WWVhcn0ke3QoJ3llYXInLCB0aGlzLmxhbmcpfSAke3RoaXMuY3VycmVudE1vbnRoICsgMX0ke3QoJ21vbnRoJywgdGhpcy5sYW5nKX1gO1xuICAgICAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9IFwiMTNweFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwiam90cy1jYWxlbmRhci10aXRsZVwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5leHRCdG4gPSBoZWFkZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIG5leHRCdG4udGV4dENvbnRlbnQgPSBcIlx1MjE5MlwiO1xuICAgICAgICBuZXh0QnRuLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBuZXh0QnRuLnN0eWxlLnBhZGRpbmcgPSBcIjRweCA4cHhcIjtcbiAgICAgICAgbmV4dEJ0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweFwiO1xuICAgICAgICBuZXh0QnRuLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHsgbmV4dEJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItaG92ZXIpXCI7IH0pO1xuICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHsgbmV4dEJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7IH0pO1xuICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNoYW5nZU1vbnRoKDEpKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHdlZWtkYXlzID0gdHJhbnNsYXRpb25zW3RoaXMubGFuZ10ud2Vla2RheXM7XG4gICAgICAgIGNvbnN0IHdlZWtkYXlSb3cgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIHdlZWtkYXlSb3cuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgICAgICB3ZWVrZGF5Um93LnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcInJlcGVhdCg3LCAxZnIpXCI7XG4gICAgICAgIHdlZWtkYXlSb3cuc3R5bGUuZ2FwID0gXCIycHhcIjtcbiAgICAgICAgd2Vla2RheVJvdy5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjRweFwiO1xuICAgICAgICBcbiAgICAgICAgd2Vla2RheXMuZm9yRWFjaChkYXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF5RWwgPSB3ZWVrZGF5Um93LmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgZGF5RWwudGV4dENvbnRlbnQgPSBkYXk7XG4gICAgICAgICAgICBkYXlFbC5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgZGF5RWwuc3R5bGUuZm9udFNpemUgPSBcIjEwcHhcIjtcbiAgICAgICAgICAgIGRheUVsLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRheXNHcmlkID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBkYXlzR3JpZC5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgICAgIGRheXNHcmlkLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcInJlcGVhdCg3LCAxZnIpXCI7XG4gICAgICAgIGRheXNHcmlkLnN0eWxlLmdhcCA9IFwiMnB4XCI7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0V2Vla2RheTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbXB0eURheSA9IGRheXNHcmlkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgZW1wdHlEYXkuc3R5bGUucGFkZGluZyA9IFwiNHB4IDJweFwiO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkYXlSZWNvcmRzID0gdGhpcy5nZXREYXlSZWNvcmRzKCk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBkID0gMTsgZCA8PSBsYXN0RGF5LmdldERhdGUoKTsgZCsrKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyID0gYCR7dGhpcy5jdXJyZW50WWVhcn0tJHtTdHJpbmcodGhpcy5jdXJyZW50TW9udGggKyAxKS5wYWRTdGFydCgyLCAnMCcpfS0ke1N0cmluZyhkKS5wYWRTdGFydCgyLCAnMCcpfWA7XG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSBkYXlSZWNvcmRzLmdldChkYXRlU3RyKTtcbiAgICAgICAgICAgIGNvbnN0IGhhc1JlY29yZCA9IHJlY29yZCAmJiByZWNvcmQuY291bnQgPiAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBkYXlEaXYgPSBkYXlzR3JpZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIGRheURpdi50ZXh0Q29udGVudCA9IFN0cmluZyhkKTtcbiAgICAgICAgICAgIGRheURpdi5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgZGF5RGl2LnN0eWxlLnBhZGRpbmcgPSBcIjRweCAycHhcIjtcbiAgICAgICAgICAgIGRheURpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweFwiO1xuICAgICAgICAgICAgZGF5RGl2LnN0eWxlLmZvbnRTaXplID0gXCIxMXB4XCI7XG4gICAgICAgICAgICBkYXlEaXYuc3R5bGUuY3Vyc29yID0gaGFzUmVjb3JkID8gXCJwb2ludGVyXCIgOiBcImRlZmF1bHRcIjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGhhc1JlY29yZCkge1xuICAgICAgICAgICAgICAgIGRheURpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgICAgICAgICBkYXlEaXYuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtb24tYWNjZW50KVwiO1xuICAgICAgICAgICAgICAgIGRheURpdi50aXRsZSA9IGAke2RhdGVTdHJ9OiAke3QoJ3JlY29yZHNDb3VudCcsIHRoaXMubGFuZywgeyBjb3VudDogU3RyaW5nKHJlY29yZC5jb3VudCkgfSl9YDtcbiAgICAgICAgICAgICAgICBkYXlEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCeURhdGUoZGF0ZVN0cik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRheURpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgICAgIGRheURpdi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckNhbGVuZGFyR3JpZENvbXBhY3QoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKHRoaXMuY3VycmVudFllYXIsIHRoaXMuY3VycmVudE1vbnRoLCAxKTtcbiAgICAgICAgY29uc3QgbGFzdERheSA9IG5ldyBEYXRlKHRoaXMuY3VycmVudFllYXIsIHRoaXMuY3VycmVudE1vbnRoICsgMSwgMCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0V2Vla2RheSA9IGZpcnN0RGF5LmdldERheSgpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmF2Um93ID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBuYXZSb3cuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBuYXZSb3cuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcInNwYWNlLWJldHdlZW5cIjtcbiAgICAgICAgbmF2Um93LnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xuICAgICAgICBuYXZSb3cuc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcbiAgICAgICAgbmF2Um93LnN0eWxlLnBhZGRpbmcgPSBcIjAgNHB4XCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBwcmV2QnRuID0gbmF2Um93LmNyZWF0ZURpdigpO1xuICAgICAgICBwcmV2QnRuLnRleHRDb250ZW50ID0gXCJcdTIxOTBcIjtcbiAgICAgICAgcHJldkJ0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgcHJldkJ0bi5zdHlsZS5wYWRkaW5nID0gXCIycHggNnB4XCI7XG4gICAgICAgIHByZXZCdG4uc3R5bGUuZm9udFNpemUgPSBcIjExcHhcIjtcbiAgICAgICAgcHJldkJ0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweFwiO1xuICAgICAgICBwcmV2QnRuLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHsgcHJldkJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItaG92ZXIpXCI7IH0pO1xuICAgICAgICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHsgcHJldkJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7IH0pO1xuICAgICAgICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNoYW5nZU1vbnRoKC0xKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0aXRsZSA9IG5hdlJvdy5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt0aGlzLmN1cnJlbnRZZWFyfS8ke3RoaXMuY3VycmVudE1vbnRoICsgMX1gO1xuICAgICAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9IFwiMTFweFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwiam90cy1jYWxlbmRhci10aXRsZVwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5leHRCdG4gPSBuYXZSb3cuY3JlYXRlRGl2KCk7XG4gICAgICAgIG5leHRCdG4udGV4dENvbnRlbnQgPSBcIlx1MjE5MlwiO1xuICAgICAgICBuZXh0QnRuLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBuZXh0QnRuLnN0eWxlLnBhZGRpbmcgPSBcIjJweCA2cHhcIjtcbiAgICAgICAgbmV4dEJ0bi5zdHlsZS5mb250U2l6ZSA9IFwiMTFweFwiO1xuICAgICAgICBuZXh0QnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNHB4XCI7XG4gICAgICAgIG5leHRCdG4uc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4geyBuZXh0QnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ob3ZlcilcIjsgfSk7XG4gICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4geyBuZXh0QnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjsgfSk7XG4gICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2hhbmdlTW9udGgoMSkpO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgd2Vla2RheXNTaG9ydCA9IHRyYW5zbGF0aW9uc1t0aGlzLmxhbmddLndlZWtkYXlzO1xuICAgICAgICBjb25zdCB3ZWVrZGF5Um93ID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICB3ZWVrZGF5Um93LnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgICAgICAgd2Vla2RheVJvdy5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoNywgMWZyKVwiO1xuICAgICAgICB3ZWVrZGF5Um93LnN0eWxlLmdhcCA9IFwiMXB4XCI7XG4gICAgICAgIHdlZWtkYXlSb3cuc3R5bGUubWFyZ2luQm90dG9tID0gXCI0cHhcIjtcbiAgICAgICAgXG4gICAgICAgIHdlZWtkYXlzU2hvcnQuZm9yRWFjaChkYXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF5RWwgPSB3ZWVrZGF5Um93LmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgZGF5RWwudGV4dENvbnRlbnQgPSBkYXk7XG4gICAgICAgICAgICBkYXlFbC5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgZGF5RWwuc3R5bGUuZm9udFNpemUgPSBcIjhweFwiO1xuICAgICAgICAgICAgZGF5RWwuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICBkYXlFbC5zdHlsZS5wYWRkaW5nID0gXCIycHggMFwiO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRheXNHcmlkID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBkYXlzR3JpZC5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgICAgIGRheXNHcmlkLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcInJlcGVhdCg3LCAxZnIpXCI7XG4gICAgICAgIGRheXNHcmlkLnN0eWxlLmdhcCA9IFwiMXB4XCI7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0V2Vla2RheTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbXB0eURheSA9IGRheXNHcmlkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgZW1wdHlEYXkuc3R5bGUucGFkZGluZyA9IFwiM3B4IDFweFwiO1xuICAgICAgICAgICAgZW1wdHlEYXkuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgZGF5UmVjb3JkcyA9IHRoaXMuZ2V0RGF5UmVjb3JkcygpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgZCA9IDE7IGQgPD0gbGFzdERheS5nZXREYXRlKCk7IGQrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0ZVN0ciA9IGAke3RoaXMuY3VycmVudFllYXJ9LSR7U3RyaW5nKHRoaXMuY3VycmVudE1vbnRoICsgMSkucGFkU3RhcnQoMiwgJzAnKX0tJHtTdHJpbmcoZCkucGFkU3RhcnQoMiwgJzAnKX1gO1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gZGF5UmVjb3Jkcy5nZXQoZGF0ZVN0cik7XG4gICAgICAgICAgICBjb25zdCBoYXNSZWNvcmQgPSByZWNvcmQgJiYgcmVjb3JkLmNvdW50ID4gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGF5RGl2ID0gZGF5c0dyaWQuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICBkYXlEaXYudGV4dENvbnRlbnQgPSBTdHJpbmcoZCk7XG4gICAgICAgICAgICBkYXlEaXYuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIGRheURpdi5zdHlsZS5wYWRkaW5nID0gXCIzcHggMXB4XCI7XG4gICAgICAgICAgICBkYXlEaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIzcHhcIjtcbiAgICAgICAgICAgIGRheURpdi5zdHlsZS5mb250U2l6ZSA9IFwiOXB4XCI7XG4gICAgICAgICAgICBkYXlEaXYuc3R5bGUuY3Vyc29yID0gaGFzUmVjb3JkID8gXCJwb2ludGVyXCIgOiBcImRlZmF1bHRcIjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGhhc1JlY29yZCkge1xuICAgICAgICAgICAgICAgIGRheURpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgICAgICAgICBkYXlEaXYuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtb24tYWNjZW50KVwiO1xuICAgICAgICAgICAgICAgIGRheURpdi50aXRsZSA9IGAke2RhdGVTdHJ9OiAke3QoJ3JlY29yZHNDb3VudCcsIHRoaXMubGFuZywgeyBjb3VudDogU3RyaW5nKHJlY29yZC5jb3VudCkgfSl9YDtcbiAgICAgICAgICAgICAgICBkYXlEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCeURhdGUoZGF0ZVN0cik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRheURpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgICAgIGRheURpdi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERheVJlY29yZHMoKTogTWFwPHN0cmluZywgRGF5UmVjb3JkPiB7XG4gICAgICAgIGNvbnN0IHJlY29yZHMgPSBuZXcgTWFwPHN0cmluZywgRGF5UmVjb3JkPigpO1xuICAgICAgICBmb3IgKGNvbnN0IGpvdCBvZiB0aGlzLmpvdHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBqb3QuZGF0ZTtcbiAgICAgICAgICAgIGlmICghcmVjb3Jkcy5oYXMoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZWNvcmRzLnNldChkYXRlLCB7IGRhdGUsIGNvdW50OiAwLCBqb3RzOiBbXSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHJlY29yZHMuZ2V0KGRhdGUpITtcbiAgICAgICAgICAgIHJlY29yZC5jb3VudCsrO1xuICAgICAgICAgICAgcmVjb3JkLmpvdHMucHVzaChqb3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWNvcmRzO1xuICAgIH1cbiAgICBcbiAgICBjaGFuZ2VNb250aChkZWx0YTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoICs9IGRlbHRhO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IDExO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50WWVhci0tO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudE1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXIrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1OTFDRFx1NjVCMFx1NkUzMlx1NjdEM1x1NjU3NFx1NEUyQVx1NjVFNVx1NTM4Nlx1OTBFOFx1NTIwNlxuICAgICAgICBjb25zdCBjYWxlbmRhckNvbnRhaW5lciA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1jYWxlbmRhclwiKTtcbiAgICAgICAgaWYgKGNhbGVuZGFyQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBjYWxlbmRhckNvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaWRlYmFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhckNvbXBhY3QoY2FsZW5kYXJDb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNhbGVuZGFyKGNhbGVuZGFyQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmaWx0ZXJCeURhdGUoZGF0ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSBgZGF0ZToke2RhdGV9YDtcbiAgICAgICAgdGhpcy51cGRhdGVTZWFyY2hBbmRGaWx0ZXIoKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyU2VhcmNoKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjEycHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtc2Vjb25kYXJ5KVwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiOHB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUucGFkZGluZyA9IFwiMTJweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGl0bGUgPSBzZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHQoJ3NlYXJjaEFuZFRhZ3MnLCB0aGlzLmxhbmcpO1xuICAgICAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9IFwiMTNweFwiO1xuICAgICAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gXCI4cHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZWFyY2hDb250YWluZXIgPSBzZWN0aW9uLmNyZWF0ZURpdigpO1xuICAgICAgICB0aGlzLnNlYXJjaENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgdGhpcy5zZWFyY2hDb250YWluZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNlYXJjaElucHV0ID0gdGhpcy5zZWFyY2hDb250YWluZXIuY3JlYXRlRWwoXCJpbnB1dFwiKTtcbiAgICAgICAgc2VhcmNoSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IHQoJ3NlYXJjaFBsYWNlaG9sZGVyJywgdGhpcy5sYW5nKTtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUucGFkZGluZyA9IFwiNnB4IDhweFwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIjMycHhcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHhcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTJweFwiO1xuICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IHRoaXMuc2VhcmNoUXVlcnk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQgPSBzZWFyY2hJbnB1dDtcblxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kZWJvdW5jZWRTZWFyY2gocXVlcnkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNsZWFyQnV0dG9uKCk7XG5cbiAgICAgICAgY29uc3QgdGFnRmlsdGVyID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGFnRmlsdGVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgdGFnRmlsdGVyLnN0eWxlLmZsZXhXcmFwID0gXCJ3cmFwXCI7XG4gICAgICAgIHRhZ0ZpbHRlci5zdHlsZS5nYXAgPSBcIjZweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYWxsVGFncyA9IHRoaXMuZ2V0QWxsVGFncygpO1xuICAgICAgICBhbGxUYWdzLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhZ0J0biA9IHRhZ0ZpbHRlci5jcmVhdGVTcGFuKCk7XG4gICAgICAgICAgICB0YWdCdG4udGV4dENvbnRlbnQgPSBgIyR7dGFnfWA7XG4gICAgICAgICAgICB0YWdCdG4uc3R5bGUucGFkZGluZyA9IFwiMnB4IDhweFwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMTJweFwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmZvbnRTaXplID0gXCIxMXB4XCI7XG4gICAgICAgICAgICB0YWdCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5zZWxlY3RlZFRhZ3MuaGFzKHRhZykgPyBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIiA6IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmNvbG9yID0gdGhpcy5zZWxlY3RlZFRhZ3MuaGFzKHRhZykgPyBcInZhcigtLXRleHQtb24tYWNjZW50KVwiIDogXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICAgICAgdGFnQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWdzLmRlbGV0ZSh0YWcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWdzLmFkZCh0YWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBcdTY2RjRcdTY1QjBcdTY4MDdcdTdCN0VcdTYzMDlcdTk0QUVcdTY4MzdcdTVGMEZcbiAgICAgICAgICAgICAgICB0YWdCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5zZWxlY3RlZFRhZ3MuaGFzKHRhZykgPyBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIiA6IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5jb2xvciA9IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpID8gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIiA6IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgICAgICAvLyBcdTY2RjRcdTY1QjBcdTUyMTdcdTg4NjhcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0U2VjdGlvbiA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1saXN0LXNlY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySm90TGlzdChsaXN0U2VjdGlvbiBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlclNlYXJjaENvbXBhY3QoY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzZWN0aW9uID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSlcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSBcIjEwcHhcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRpdGxlID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0KCdzZWFyY2hBbmRUYWdzJywgdGhpcy5sYW5nKTtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSBcIjEycHhcIjtcbiAgICAgICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiNnB4XCI7XG4gICAgICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2VhcmNoQ29udGFpbmVyID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgIHRoaXMuc2VhcmNoQ29udGFpbmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzZWFyY2hJbnB1dCA9IHRoaXMuc2VhcmNoQ29udGFpbmVyLmNyZWF0ZUVsKFwiaW5wdXRcIik7XG4gICAgICAgIHNlYXJjaElucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQucGxhY2Vob2xkZXIgPSB0KCdzZWFyY2hQbGFjZWhvbGRlclNob3J0JywgdGhpcy5sYW5nKTtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUucGFkZGluZyA9IFwiNXB4IDhweFwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBcIjI4cHhcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHhcIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLmZvbnRTaXplID0gXCIxMXB4XCI7XG4gICAgICAgIHNlYXJjaElucHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTBweFwiO1xuICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IHRoaXMuc2VhcmNoUXVlcnk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQgPSBzZWFyY2hJbnB1dDtcblxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kZWJvdW5jZWRTZWFyY2gocXVlcnkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNsZWFyQnV0dG9uKCk7XG5cbiAgICAgICAgY29uc3QgdGFnRmlsdGVyID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGFnRmlsdGVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgdGFnRmlsdGVyLnN0eWxlLmZsZXhXcmFwID0gXCJ3cmFwXCI7XG4gICAgICAgIHRhZ0ZpbHRlci5zdHlsZS5nYXAgPSBcIjRweFwiO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYWxsVGFncyA9IHRoaXMuZ2V0QWxsVGFncygpLnNsaWNlKDAsIDgpO1xuICAgICAgICBhbGxUYWdzLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhZ0J0biA9IHRhZ0ZpbHRlci5jcmVhdGVTcGFuKCk7XG4gICAgICAgICAgICB0YWdCdG4udGV4dENvbnRlbnQgPSBgIyR7dGFnfWA7XG4gICAgICAgICAgICB0YWdCdG4uc3R5bGUucGFkZGluZyA9IFwiMnB4IDZweFwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMTBweFwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmZvbnRTaXplID0gXCIxMHB4XCI7XG4gICAgICAgICAgICB0YWdCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5zZWxlY3RlZFRhZ3MuaGFzKHRhZykgPyBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIiA6IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmNvbG9yID0gdGhpcy5zZWxlY3RlZFRhZ3MuaGFzKHRhZykgPyBcInZhcigtLXRleHQtb24tYWNjZW50KVwiIDogXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgdGFnQnRuLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICAgICAgdGFnQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWdzLmRlbGV0ZSh0YWcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUYWdzLmFkZCh0YWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBcdTY2RjRcdTY1QjBcdTY4MDdcdTdCN0VcdTYzMDlcdTk0QUVcdTY4MzdcdTVGMEZcbiAgICAgICAgICAgICAgICB0YWdCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5zZWxlY3RlZFRhZ3MuaGFzKHRhZykgPyBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIiA6IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgICAgIHRhZ0J0bi5zdHlsZS5jb2xvciA9IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpID8gXCJ2YXIoLS10ZXh0LW9uLWFjY2VudClcIiA6IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgICAgICAvLyBcdTY2RjRcdTY1QjBcdTUyMTdcdTg4NjhcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0U2VjdGlvbiA9IHRoaXMuY29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuam90cy1saXN0LXNlY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySm90TGlzdChsaXN0U2VjdGlvbiBhcyBIVE1MRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFsbFRhZ3NDb3VudCA9IHRoaXMuZ2V0QWxsVGFncygpLmxlbmd0aDtcbiAgICAgICAgaWYgKGFsbFRhZ3NDb3VudCA+IDgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vcmVIaW50ID0gc2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIG1vcmVIaW50LnRleHRDb250ZW50ID0gdCgnbW9yZVRhZ3MnLCB0aGlzLmxhbmcsIHsgY291bnQ6IFN0cmluZyhhbGxUYWdzQ291bnQgLSA4KSB9KTtcbiAgICAgICAgICAgIG1vcmVIaW50LnN0eWxlLmZvbnRTaXplID0gXCI5cHhcIjtcbiAgICAgICAgICAgIG1vcmVIaW50LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgbW9yZUhpbnQuc3R5bGUubWFyZ2luVG9wID0gXCI2cHhcIjtcbiAgICAgICAgICAgIG1vcmVIaW50LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZ2V0QWxsVGFncygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHRhZ3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgZm9yIChjb25zdCBqb3Qgb2YgdGhpcy5qb3RzKSB7XG4gICAgICAgICAgICBqb3QudGFncy5mb3JFYWNoKHRhZyA9PiB0YWdzLmFkZCh0YWcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0YWdzKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVySm90TGlzdChjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoXCJqb3RzLWxpc3Qtc2VjdGlvblwiKTtcblxuICAgICAgICAvLyBcdTZFMDVcdTc0MDZcdTYyNDBcdTY3MDlcdTZFMzJcdTY3RDNcdTc2ODRcdTdFQzRcdTRFRjZcbiAgICAgICAgdGhpcy5yZW5kZXJlZENvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29tcC51bmxvYWQoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdW5sb2FkaW5nIGNvbXBvbmVudDpcIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcmVkQ29tcG9uZW50cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuam90TGlzdENsZWFudXBzLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAvKiBpZ25vcmUgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuam90TGlzdENsZWFudXBzID0gW107XG5cbiAgICAgICAgbGV0IGZpbHRlcmVkSm90cyA9IHRoaXMuZmlsdGVySm90cygpO1xuXG4gICAgICAgIGlmIChmaWx0ZXJlZEpvdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBlbXB0eSA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIGVtcHR5LnRleHRDb250ZW50ID0gdCgnbm9SZWNvcmRzJywgdGhpcy5sYW5nKTtcbiAgICAgICAgICAgIGVtcHR5LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICBlbXB0eS5zdHlsZS5wYWRkaW5nID0gXCI0MHB4XCI7XG4gICAgICAgICAgICBlbXB0eS5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgIGVtcHR5LnN0eWxlLmZvbnRTaXplID0gXCIxM3B4XCI7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hLZXl3b3JkcyA9XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5LnRyaW0oKS5sZW5ndGggPiAwID8gdGhpcy5wYXJzZVNlYXJjaEZpbHRlcnModGhpcy5zZWFyY2hRdWVyeSkua2V5d29yZHMgOiBbXTtcblxuICAgICAgICBjb25zdCBncm91cGVkQnlEYXRlID0gbmV3IE1hcDxzdHJpbmcsIEpvdFtdPigpO1xuICAgICAgICBmaWx0ZXJlZEpvdHMuZm9yRWFjaChqb3QgPT4ge1xuICAgICAgICAgICAgaWYgKCFncm91cGVkQnlEYXRlLmhhcyhqb3QuZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBncm91cGVkQnlEYXRlLnNldChqb3QuZGF0ZSwgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXBlZEJ5RGF0ZS5nZXQoam90LmRhdGUpIS5wdXNoKGpvdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgW2RhdGUsIGpvdHNdIG9mIGdyb3VwZWRCeURhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVHcm91cCA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIGRhdGVHcm91cC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjE2cHhcIjtcblxuICAgICAgICAgICAgY29uc3QgZGF0ZUhlYWRlciA9IGRhdGVHcm91cC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgIGRhdGVIZWFkZXIudGV4dENvbnRlbnQgPSBkYXRlO1xuICAgICAgICAgICAgZGF0ZUhlYWRlci5zdHlsZS5mb250U2l6ZSA9IFwiMTFweFwiO1xuICAgICAgICAgICAgZGF0ZUhlYWRlci5zdHlsZS5mb250V2VpZ2h0ID0gXCI2MDBcIjtcbiAgICAgICAgICAgIGRhdGVIZWFkZXIuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICBkYXRlSGVhZGVyLnN0eWxlLnBhZGRpbmcgPSBcIjRweCAwXCI7XG4gICAgICAgICAgICBkYXRlSGVhZGVyLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgZGF0ZUhlYWRlci5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjhweFwiO1xuXG4gICAgICAgICAgICBqb3RzLmZvckVhY2goam90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gZGF0ZUdyb3VwLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXNlY29uZGFyeSlcIjtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiOHB4XCI7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS5wYWRkaW5nID0gXCIxMHB4IDEycHhcIjtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2l0aW9uID0gXCJhbGwgMC4yc1wiO1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0aW5nSm90SWQgPT09IGpvdC5pZCkge1xuICAgICAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICAgICAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YVJvdyA9IGNhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLmZsZXhXcmFwID0gXCJ3cmFwXCI7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUuYWxpZ25JdGVtcyA9IFwiYmFzZWxpbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5nYXAgPSBcIjEycHhcIjtcbiAgICAgICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLmZvbnRTaXplID0gXCIxMHB4XCI7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFSb3cuY3JlYXRlU3Bhbih7IHRleHQ6IGpvdC50aW1lIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cGRTcGFuID0gbWV0YVJvdy5jcmVhdGVTcGFuKCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZFNwYW4udGV4dENvbnRlbnQgPSBgJHt0KFwiam90VXBkYXRlZEF0XCIsIHRoaXMubGFuZyl9OiAke2pvdC51cGRhdGVkQXR9YDtcbiAgICAgICAgICAgICAgICAgICAgdXBkU3Bhbi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgICAgICAgICAgICAgIHVwZFNwYW4uc3R5bGUuZm9udFdlaWdodCA9IFwiNjAwXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dGFyZWFDb250YWluZXIgPSBjYXJkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYUNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dGFyZWEgPSB0ZXh0YXJlYUNvbnRhaW5lci5jcmVhdGVFbChcInRleHRhcmVhXCIpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5jbGFzc0xpc3QuYWRkKFwiam90cy1lZGl0LXRleHRhcmVhXCIpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IGpvdC5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5taW5IZWlnaHQgPSBcIjEwMHB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgICAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUucmVzaXplID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5mb250RmFtaWx5ID0gXCJ2YXIoLS1mb250LXRleHQpXCI7XG4gICAgICAgICAgICAgICAgICAgIHRleHRhcmVhLnBsYWNlaG9sZGVyID0gdChcInBsYWNlaG9sZGVyV2l0aExpbmtcIiwgdGhpcy5sYW5nKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3bENsZWFudXAgPSB0aGlzLnNldHVwV2lraWxpbmtBdXRvY29tcGxldGUodGV4dGFyZWEsIHRleHRhcmVhQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdsQ2xlYW51cCkgdGhpcy5qb3RMaXN0Q2xlYW51cHMucHVzaCh3bENsZWFudXApO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ1NlY3Rpb24gPSBjYXJkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgICAgICB0YWdTZWN0aW9uLnN0eWxlLm1hcmdpblRvcCA9IFwiOHB4XCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0lucHV0Q29udGFpbmVyID0gdGFnU2VjdGlvbi5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXRDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0lucHV0Q29udGFpbmVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiOHB4XCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0lucHV0ID0gdGFnSW5wdXRDb250YWluZXIuY3JlYXRlRWwoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXQuY2xhc3NMaXN0LmFkZChcImpvdHMtdGFnLWlucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICB0YWdJbnB1dC5wbGFjZWhvbGRlciA9IHQoXCJ0YWdzSW5wdXRQbGFjZWhvbGRlclwiLCB0aGlzLmxhbmcpO1xuICAgICAgICAgICAgICAgICAgICB0YWdJbnB1dC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdJbnB1dC5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0lucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tYmFja2dyb3VuZC1wcmltYXJ5KVwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdJbnB1dC5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnTGlzdENvbnRhaW5lciA9IHRhZ1NlY3Rpb24uY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0xpc3RDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgICAgICB0YWdMaXN0Q29udGFpbmVyLnN0eWxlLmZsZXhXcmFwID0gXCJ3cmFwXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ0xpc3RDb250YWluZXIuc3R5bGUuZ2FwID0gXCI2cHhcIjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZyZXNoRWRpdFRhZ3MgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJUYWdQaWxscyh0YWdMaXN0Q29udGFpbmVyLCB0aGlzLmVkaXRTZXNzaW9uVGFncywgKHRhZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdFNlc3Npb25UYWdzID0gdGhpcy5lZGl0U2Vzc2lvblRhZ3MuZmlsdGVyKCh4KSA9PiB4ICE9PSB0YWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hFZGl0VGFncygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hFZGl0VGFncygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldHVwVGFnQXV0b2NvbXBsZXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5nZXRFeGlzdGluZ1RhZ3MoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ0lucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnSW5wdXRDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdMaXN0Q29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0U2Vzc2lvblRhZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xlYW5lZCA9IHRhZy5yZXBsYWNlKC9eIysvLCBcIlwiKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsZWFuZWQgJiYgIXRoaXMuZWRpdFNlc3Npb25UYWdzLmluY2x1ZGVzKGNsZWFuZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdFNlc3Npb25UYWdzLnB1c2goY2xlYW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hFZGl0VGFncygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlSW5wdXQgPSBjYXJkLmNyZWF0ZUVsKFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJqb3RzLWVkaXQtc291cmNlXCIpO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbnB1dC52YWx1ZSA9IGpvdC5zb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlucHV0LnBsYWNlaG9sZGVyID0gdChcInNvdXJjZVBsYWNlaG9sZGVyXCIsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjZweFwiO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbnB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUlucHV0LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW5vcm1hbClcIjtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSW5wdXQuc3R5bGUubWFyZ2luVG9wID0gXCI4cHhcIjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidXR0b25Sb3cgPSBjYXJkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Sb3cuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Sb3cuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImZsZXgtZW5kXCI7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvblJvdy5zdHlsZS5nYXAgPSBcIjhweFwiO1xuICAgICAgICAgICAgICAgICAgICBidXR0b25Sb3cuc3R5bGUubWFyZ2luVG9wID0gXCIxMnB4XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gYnV0dG9uUm93LmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSB0KFwiY2FuY2VsXCIsIHRoaXMubGFuZyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ0bi5zdHlsZS5wYWRkaW5nID0gXCI2cHggMTRweFwiO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnRuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ0bi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1ub3JtYWwpXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ0bi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpdEVkaXRNb2RlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhdmVCdG4gPSBidXR0b25Sb3cuY3JlYXRlRWwoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVCdG4udGV4dENvbnRlbnQgPSB0KFwic2F2ZVwiLCB0aGlzLmxhbmcpO1xuICAgICAgICAgICAgICAgICAgICBzYXZlQnRuLnN0eWxlLnBhZGRpbmcgPSBcIjZweCAxNnB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgc2F2ZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWludGVyYWN0aXZlLWFjY2VudClcIjtcbiAgICAgICAgICAgICAgICAgICAgc2F2ZUJ0bi5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1vbi1hY2NlbnQpXCI7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVCdG4uc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVCdG4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVCdG4uc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XG4gICAgICAgICAgICAgICAgICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IHRleHRhcmVhLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodChcImNvbnRlbnRSZXF1aXJlZFwiLCB0aGlzLmxhbmcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWdzID0gbm9ybWFsaXplSm90VGFncyh0aGlzLmVkaXRTZXNzaW9uVGFncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2SWQgPSB0aGlzLmVkaXRpbmdKb3RJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZUYWdzID0gWy4uLnRoaXMuZWRpdFNlc3Npb25UYWdzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0pvdElkID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdFNlc3Npb25UYWdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnVwZGF0ZUpvdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmpvdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogYm9keSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0KFwic2F2ZWRcIiwgdGhpcy5sYW5nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdKb3RJZCA9IHByZXZJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRTZXNzaW9uVGFncyA9IHByZXZUYWdzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RTZWN0aW9uID0gdGhpcy5jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5qb3RzLWxpc3Qtc2VjdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJKb3RMaXN0KGxpc3RTZWN0aW9uIGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGV4dGFyZWEuZm9jdXMoKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoQ2FyZFRhcEFuZExvbmdQcmVzcyhjYXJkLCBqb3QpO1xuICAgICAgICAgICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLmJvcmRlckNvbG9yID0gXCJ2YXIoLS1pbnRlcmFjdGl2ZS1hY2NlbnQpXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKC0xcHgpXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUuYm9yZGVyQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWSgwKVwiO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWV0YVJvdyA9IGNhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5mbGV4V3JhcCA9IFwid3JhcFwiO1xuICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUuYWxpZ25JdGVtcyA9IFwiYmFzZWxpbmVcIjtcbiAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLmdhcCA9IFwiMTJweFwiO1xuICAgICAgICAgICAgICAgIG1ldGFSb3cuc3R5bGUubWFyZ2luQm90dG9tID0gXCI2cHhcIjtcbiAgICAgICAgICAgICAgICBtZXRhUm93LnN0eWxlLmZvbnRTaXplID0gXCIxMHB4XCI7XG4gICAgICAgICAgICAgICAgbWV0YVJvdy5zdHlsZS5jb2xvciA9IFwidmFyKC0tdGV4dC1tdXRlZClcIjtcbiAgICAgICAgICAgICAgICBtZXRhUm93LmNyZWF0ZVNwYW4oeyB0ZXh0OiBqb3QudGltZSB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRMYWJlbCA9IG1ldGFSb3cuY3JlYXRlU3BhbigpO1xuICAgICAgICAgICAgICAgIHVwZExhYmVsLnRleHRDb250ZW50ID0gYCR7dChcImpvdFVwZGF0ZWRBdFwiLCB0aGlzLmxhbmcpfTogJHtqb3QudXBkYXRlZEF0fWA7XG4gICAgICAgICAgICAgICAgdXBkTGFiZWwuc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbm9ybWFsKVwiO1xuICAgICAgICAgICAgICAgIHVwZExhYmVsLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjYwMFwiO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudENvbnRhaW5lciA9IGNhcmQuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lci5zdHlsZS5mb250U2l6ZSA9IFwiMTJweFwiO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIuc3R5bGUubGluZUhlaWdodCA9IFwiMS41XCI7XG4gICAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lci5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjZweFwiO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIuc3R5bGUud2hpdGVTcGFjZSA9IFwibm9ybWFsXCI7XG4gICAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lci5zdHlsZS53b3JkQnJlYWsgPSBcImJyZWFrLXdvcmRcIjtcbiAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyLnN0eWxlLm92ZXJmbG93V3JhcCA9IFwiYnJlYWstd29yZFwiO1xuICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIuYWRkQ2xhc3MoXCJqb3RzLWNhcmQtY29udGVudFwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkQ29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBcdTRGRUVcdTU5MERcdUZGMUFcdTRGMjBcdTUxNjVcdTVCOUVcdTk2NDVcdTc2ODRcdTZFOTBcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VQYXRoID0gam90LmZpbGVQYXRoIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lyZVJlbmRlcmVkQ29udGVudCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdhLmludGVybmFsLWxpbmsnKS5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KGhyZWYsIHNvdXJjZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnRyaWdnZXIoXCJob3Zlci1saW5rXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0Vmlld1R5cGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3ZlclBhcmVudDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRFbDogbGluayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rdGV4dDogaHJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQYXRoOiBzb3VyY2VQYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChocmVmLCBzb3VyY2VQYXRoLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmludGVybmFsLWVtYmVkJykuZm9yRWFjaChlbWJlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmMgPSBlbWJlZC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYmVkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UudHJpZ2dlcihcImhvdmVyLWxpbmtcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuZ2V0Vmlld1R5cGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVyUGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWw6IGVtYmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3RleHQ6IHNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVBhdGg6IHNvdXJjZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub3BlbkxpbmtUZXh0KHNyYywgc291cmNlUGF0aCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LnRhc2stbGlzdC1pdGVtLWNoZWNrYm94JykuZm9yRWFjaChjaGVja2JveCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VhcmNoS2V5d29yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0TWFya2Rvd25Db250ZW50KGNvbnRlbnRDb250YWluZXIsIHNlYXJjaEtleXdvcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdm9pZCBQcm9taXNlLnJlc29sdmUoTWFya2Rvd25SZW5kZXJlci5yZW5kZXJNYXJrZG93bihcbiAgICAgICAgICAgICAgICAgICAgam90LmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICkpLnRoZW4od2lyZVJlbmRlcmVkQ29udGVudCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWdzRGl2ID0gY2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgICAgICB0YWdzRGl2LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgICAgICAgICB0YWdzRGl2LnN0eWxlLmZsZXhXcmFwID0gXCJ3cmFwXCI7XG4gICAgICAgICAgICAgICAgdGFnc0Rpdi5zdHlsZS5nYXAgPSBcIjRweFwiO1xuICAgICAgICAgICAgICAgIHRhZ3NEaXYuc3R5bGUubWFyZ2luQm90dG9tID0gXCI0cHhcIjtcblxuICAgICAgICAgICAgICAgIGpvdC50YWdzLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnU3BhbiA9IHRhZ3NEaXYuY3JlYXRlU3BhbigpO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLnRleHRDb250ZW50ID0gYCMke3RhZ31gO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLnN0eWxlLmZvbnRTaXplID0gXCI5cHhcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnU3Bhbi5zdHlsZS5wYWRkaW5nID0gXCIycHggOHB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIxMnB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnkpXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUuY29sb3IgPSBcInZhcigtLXRleHQtbXV0ZWQpXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1NwYW4uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWZsZXhcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnU3Bhbi5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnU3Bhbi5zdHlsZS53aGl0ZVNwYWNlID0gXCJub3dyYXBcIjtcbiAgICAgICAgICAgICAgICAgICAgdGFnU3Bhbi5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0YWdTcGFuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlUYWcodGFnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoam90LnNvdXJjZSAmJiBqb3Quc291cmNlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VEaXYgPSBjYXJkLmNyZWF0ZURpdigpO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VEaXYudGV4dENvbnRlbnQgPSBqb3Quc291cmNlO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VEaXYuc3R5bGUuZm9udFNpemUgPSBcIjEwcHhcIjtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlRGl2LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VEaXYuc3R5bGUuZm9udFN0eWxlID0gXCJpdGFsaWNcIjtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlRGl2LnN0eWxlLm1hcmdpblRvcCA9IFwiNHB4XCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGpvdC5hdHRhY2htZW50cyAmJiBqb3QuYXR0YWNobWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBqb3QuYXR0YWNobWVudHMuZm9yRWFjaCgoYXR0YWNobWVudCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRhY2htZW50RGl2ID0gY2FyZC5jcmVhdGVEaXYoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBqb3QuYXR0YWNobWVudFR5cGVzPy5baWR4XSA9PT0gXCJpbWFnZVwiID8gXCJcdUQ4M0RcdUREQkNcdUZFMEZcIiA6IFwiXHVEODNEXHVEQ0NFXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50RGl2LnRleHRDb250ZW50ID0gYCR7aWNvbn0gJHthdHRhY2htZW50fWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50RGl2LnN0eWxlLmZvbnRTaXplID0gXCIxMHB4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50RGl2LnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudERpdi5zdHlsZS5tYXJnaW5Ub3AgPSBpZHggPT09IDAgPyBcIjRweFwiIDogXCIycHhcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZmlsdGVySm90cygpOiBKb3RbXSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZCA9IFsuLi50aGlzLmpvdHNdO1xuICAgICAgICBjb25zdCB7IGRhdGUsIHVwZGF0ZWQsIGtleXdvcmRzIH0gPSB0aGlzLnBhcnNlU2VhcmNoRmlsdGVycyh0aGlzLnNlYXJjaFF1ZXJ5KTtcblxuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgZmlsdGVyZWQgPSBmaWx0ZXJlZC5maWx0ZXIoKGpvdCkgPT4gam90LmRhdGUgPT09IGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGVkKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZCA9IGZpbHRlcmVkLmZpbHRlcigoam90KSA9PiBqb3QudXBkYXRlZEF0LnN0YXJ0c1dpdGgodXBkYXRlZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXl3b3Jkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZCA9IGZpbHRlcmVkLmZpbHRlcigoam90KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudExvd2VyID0gam90LmNvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5d29yZHMuZXZlcnkoKGt3KSA9PiBjb250ZW50TG93ZXIuaW5jbHVkZXMoa3cpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUYWdzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZCA9IGZpbHRlcmVkLmZpbHRlcigoam90KSA9PiBqb3QudGFncy5zb21lKCh0YWcpID0+IHRoaXMuc2VsZWN0ZWRUYWdzLmhhcyh0YWcpKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgfVxuICAgIFxuICAgIGZpbHRlckJ5VGFnKHRhZzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFncy5oYXModGFnKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhZ3MuZGVsZXRlKHRhZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGFncy5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRhZ3MuYWRkKHRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgb3BlbkpvdChqb3Q6IEpvdCkge1xuICAgICAgICBjb25zdCBmb2xkZXIgPSBub3JtYWxpemVQYXRoKHRoaXMucGx1Z2luLnNldHRpbmdzLnNhdmVGb2xkZXIpO1xuICAgICAgICBsZXQgZmlsZVBhdGg6IHN0cmluZztcblxuICAgICAgICBpZiAoam90LmZpbGVQYXRoKSB7XG4gICAgICAgICAgICBmaWxlUGF0aCA9IG5vcm1hbGl6ZVBhdGgoam90LmZpbGVQYXRoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb2dNb2RlID09PSBcIm11bHRpXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVTdHIgPSBqb3QuZGF0ZTtcbiAgICAgICAgICAgIGxldCBmaWxlbmFtZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLm11bHRpRmlsZUZvcm1hdC5yZXBsYWNlKFwiWVlZWU1NRERcIiwgZGF0ZVN0ci5yZXBsYWNlKC8tL2csIFwiXCIpKTtcbiAgICAgICAgICAgIGlmICghZmlsZW5hbWUuZW5kc1dpdGgoXCIubWRcIikpIHtcbiAgICAgICAgICAgICAgICBmaWxlbmFtZSArPSBcIi5tZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsZVBhdGggPSBgJHtmb2xkZXJ9LyR7ZmlsZW5hbWV9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbGVQYXRoID0gYCR7Zm9sZGVyfS9qb3RzLm1kYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpO1xuICAgICAgICBpZiAoZmlsZSAmJiBmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRMZWFmOiBXb3Jrc3BhY2VMZWFmIHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCBsZWF2ZXMgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFwibWFya2Rvd25cIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGVhZiBvZiBsZWF2ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobGVhZi52aWV3IGluc3RhbmNlb2YgTWFya2Rvd25WaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUZpbGUgPSBsZWFmLnZpZXcuZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUZpbGUgJiYgYWN0aXZlRmlsZS5wYXRoID09PSBmaWxlLnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExlYWYgPSBsZWFmO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBsZWFmOiBXb3Jrc3BhY2VMZWFmO1xuICAgICAgICAgICAgaWYgKHRhcmdldExlYWYpIHtcbiAgICAgICAgICAgICAgICBsZWFmID0gdGFyZ2V0TGVhZjtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWFmKFwidGFiXCIpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGxlYWYub3BlbkZpbGUoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChsZWFmLnZpZXcgaW5zdGFuY2VvZiBNYXJrZG93blZpZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBsZWFmLnZpZXcuZWRpdG9yO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gY29udGVudC5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmRMaW5lID0gLTE7XG5cbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaWR4IDwgbGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVUcmltID0gbGluZXNbaWR4XS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lVHJpbS5zdGFydHNXaXRoKFwiIyMjIFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvY2tTdGFydCA9IGlkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlclJlc3QgPSBsaW5lVHJpbS5zdWJzdHJpbmcoNCkudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW2RhdGVQYXJ0LCB0aW1lUGFydF0gPSBoZWFkZXJSZXN0LnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXRhSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGogPSBpZHggKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGogPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0bCA9IGxpbmVzW2pdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZE1hdGNoID0gdGwubWF0Y2goL14jIyMjXFxzK2lkOlxccyooLispJC9pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWRNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhSWQgPSBpZE1hdGNoWzFdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9eIyMjI1xccyt1cGRhdGVkQXQ6XFxzKi4rJC9pLnRlc3QodGwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRJZCA9IG1ldGFJZCB8fCBzdGFibGVMZWdhY3lKb3RJZChmaWxlLnBhdGgsIGRhdGVQYXJ0IHx8IFwiXCIsIHRpbWVQYXJ0IHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmVkSWQgPT09IGpvdC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kTGluZSA9IGJsb2NrU3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgayA9IGo7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoayA8IGxpbmVzLmxlbmd0aCAmJiAhbGluZXNba10udHJpbSgpLnN0YXJ0c1dpdGgoXCIjIyMgXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWR4ID0gaztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kTGluZSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0SGVhZGVyID0gXCIjIyMgXCIgKyBqb3QuZGF0ZSArIFwiIFwiICsgam90LnRpbWU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxpbmUgPSAwOyBsaW5lIDwgbGluZXMubGVuZ3RoOyBsaW5lKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lc1tsaW5lXS50cmltKCkgPT09IHRhcmdldEhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kTGluZSA9IGxpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZm91bmRMaW5lICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yKHsgbGluZTogZm91bmRMaW5lLCBjaDogMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IHsgbGluZTogZm91bmRMaW5lLCBjaDogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG86IHsgbGluZTogZm91bmRMaW5lICsgMSwgY2g6IDAgfVxuICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwgIi8vIHNyYy90eXBlcy50c1xuZXhwb3J0IHR5cGUgTGFuZ3VhZ2UgPSBcInpoXCIgfCBcImVuXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm90U2V0dGluZ3Mge1xuICAgIHNhdmVGb2xkZXI6IHN0cmluZztcbiAgICBsb2dNb2RlOiBcInNpbmdsZVwiIHwgXCJtdWx0aVwiO1xuICAgIHVzZUZpeGVkVGFnOiBib29sZWFuO1xuICAgIGZpeGVkVGFnOiBzdHJpbmc7XG4gICAgZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXI6IGJvb2xlYW47XG4gICAgbXVsdGlGaWxlRm9ybWF0OiBzdHJpbmc7XG4gICAgYXR0YWNobWVudHNGb2xkZXI6IHN0cmluZztcbiAgICBsYW5ndWFnZTogTGFuZ3VhZ2U7XG4gICAgYXV0b09wZW5WaWV3OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpvdCB7XG4gICAgLyoqIFN0YWJsZSBpZDsgcGVyc2lzdGVkIGZvciBuZXcgcmVjb3JkcywgZGVyaXZlZCBmb3IgbGVnYWN5IGVudHJpZXMgd2l0aG91dCBtZXRhZGF0YSAqL1xuICAgIGlkOiBzdHJpbmc7XG4gICAgLyoqIENyZWF0ZWQgdGltZXN0YW1wIFlZWVktTU0tREQgSEg6bW06c3MgKHNhbWUgYXMgZGF0ZSArIHRpbWUpICovXG4gICAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gICAgLyoqIExhc3QgdXBkYXRlIHRpbWVzdGFtcCBZWVlZLU1NLUREIEhIOm1tOnNzICovXG4gICAgdXBkYXRlZEF0OiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIHRpbWU6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgc291cmNlOiBzdHJpbmc7XG4gICAgZnVsbFRleHQ6IHN0cmluZztcbiAgICBhdHRhY2htZW50cz86IHN0cmluZ1tdO1xuICAgIGF0dGFjaG1lbnRUeXBlcz86IChcImltYWdlXCIgfCBcImZpbGVcIilbXTtcbiAgICBmaWxlUGF0aD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXlSZWNvcmQge1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBjb3VudDogbnVtYmVyO1xuICAgIGpvdHM6IEpvdFtdO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogSm90U2V0dGluZ3MgPSB7XG4gICAgc2F2ZUZvbGRlcjogXCJKb3RzXCIsXG4gICAgbG9nTW9kZTogXCJtdWx0aVwiLFxuICAgIHVzZUZpeGVkVGFnOiBmYWxzZSxcbiAgICBmaXhlZFRhZzogXCJqb3RcIixcbiAgICBlbmFibGVUYWdzSW5Gcm9udG1hdHRlcjogdHJ1ZSxcbiAgICBtdWx0aUZpbGVGb3JtYXQ6IFwiam90LVlZWVlNTUREXCIsXG4gICAgYXR0YWNobWVudHNGb2xkZXI6IFwiSm90cy9hdHRhY2htZW50c1wiLFxuICAgIGxhbmd1YWdlOiBcInpoXCIsXG4gICAgYXV0b09wZW5WaWV3OiB0cnVlXG59O1xuXG5leHBvcnQgY29uc3QgVklFV19UWVBFX0pPVFMgPSBcImpvdC12aWV3XCI7IiwgIi8vIHNyYy9zZXR0aW5ncy50c1xuaW1wb3J0IHsgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IEpvdFBsdWdpbiBmcm9tICcuL21haW4nO1xuaW1wb3J0IHsgdCB9IGZyb20gJy4vaTE4bic7XG5cbmV4cG9ydCBjbGFzcyBKb3RTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gICAgcGx1Z2luOiBKb3RQbHVnaW47XG4gICAgcHJpdmF0ZSBsb2dNb2RlU2V0dGluZzogU2V0dGluZyB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgdXNlRml4ZWRUYWdTZXR0aW5nOiBTZXR0aW5nIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBtdWx0aUZpbGVGb3JtYXRTZXR0aW5nOiBTZXR0aW5nIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBmaXhlZFRhZ1NldHRpbmc6IFNldHRpbmcgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGVuYWJsZVRhZ3NJbkZyb250bWF0dGVyU2V0dGluZzogU2V0dGluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogSm90UGx1Z2luKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgfVxuXG4gICAgZGlzcGxheSgpIHtcbiAgICAgICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgICAgICB0aGlzLmxvZ01vZGVTZXR0aW5nID0gbnVsbDtcbiAgICAgICAgdGhpcy51c2VGaXhlZFRhZ1NldHRpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLm11bHRpRmlsZUZvcm1hdFNldHRpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLmZpeGVkVGFnU2V0dGluZyA9IG51bGw7XG4gICAgICAgIHRoaXMuZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJTZXR0aW5nID0gbnVsbDtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKHQoJ2xhbmd1YWdlJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuc2V0RGVzYyh0KCdsYW5ndWFnZURlc2MnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5hZGREcm9wZG93bihkcm9wZG93biA9PiBkcm9wZG93blxuICAgICAgICAgICAgICAgIC5hZGRPcHRpb24oXCJ6aFwiLCB0KCdsYW5ndWFnZVpoJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAgICAgLmFkZE9wdGlvbihcImVuXCIsIHQoJ2xhbmd1YWdlRW4nLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGFuZ3VhZ2UpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZTogXCJ6aFwiIHwgXCJlblwiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxhbmd1YWdlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSh0KCdhdXRvT3BlblZpZXcnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5zZXREZXNjKHQoJ2F1dG9PcGVuVmlld0Rlc2MnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvT3BlblZpZXcpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvT3BlblZpZXcgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUodCgnc2F2ZUZvbGRlcicsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLnNldERlc2ModCgnc2F2ZUZvbGRlckRlc2MnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkpvdHNcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2F2ZUZvbGRlcilcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNhdmVGb2xkZXIgPSB2YWx1ZS50cmltKCkgfHwgXCJKb3RzXCI7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKHQoJ2F0dGFjaG1lbnRzRm9sZGVyJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuc2V0RGVzYyh0KCdhdHRhY2htZW50c0ZvbGRlckRlc2MnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkpvdHMvYXR0YWNobWVudHNcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXR0YWNobWVudHNGb2xkZXIpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdHRhY2htZW50c0ZvbGRlciA9IHZhbHVlLnRyaW0oKSB8fCBcIkpvdHMvYXR0YWNobWVudHNcIjtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMubG9nTW9kZVNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKHQoJ2xvZ01vZGUnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5zZXREZXNjKHQoJ2xvZ01vZGVEZXNjJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuYWRkRHJvcGRvd24oZHJvcGRvd24gPT4gZHJvcGRvd25cbiAgICAgICAgICAgICAgICAuYWRkT3B0aW9uKFwibXVsdGlcIiwgdCgnbG9nTW9kZU11bHRpJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAgICAgLmFkZE9wdGlvbihcInNpbmdsZVwiLCB0KCdsb2dNb2RlU2luZ2xlJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxvZ01vZGUpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZTogXCJzaW5nbGVcIiB8IFwibXVsdGlcIikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb2dNb2RlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbmRpdGlvbmFsU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5tdWx0aUZpbGVGb3JtYXRTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSh0KCdmaWxlRm9ybWF0JywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuc2V0RGVzYyh0KCdmaWxlRm9ybWF0RGVzYycsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiam90LVlZWVlNTUREXCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm11bHRpRmlsZUZvcm1hdClcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm11bHRpRmlsZUZvcm1hdCA9IHZhbHVlLnRyaW0oKSB8fCBcImpvdC1ZWVlZTU1ERFwiO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMubXVsdGlGaWxlRm9ybWF0U2V0dGluZy5zZXR0aW5nRWwuc3R5bGUuZGlzcGxheSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLmxvZ01vZGUgPT09IFwibXVsdGlcIiA/IFwiXCIgOiBcIm5vbmVcIjtcblxuICAgICAgICB0aGlzLnVzZUZpeGVkVGFnU2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUodCgndXNlRml4ZWRUYWcnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5zZXREZXNjKHQoJ3VzZUZpeGVkVGFnRGVzYycsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUZpeGVkVGFnKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlRml4ZWRUYWcgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZGl0aW9uYWxTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLmZpeGVkVGFnU2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUodCgnZml4ZWRUYWcnLCB0aGlzLnBsdWdpbi5sYW5nKSlcbiAgICAgICAgICAgIC5zZXREZXNjKHQoJ2ZpeGVkVGFnRGVzYycsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiam90XCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmZpeGVkVGFnKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZml4ZWRUYWcgPSB2YWx1ZS50cmltKCkgfHwgXCJqb3RcIjtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmZpeGVkVGFnU2V0dGluZy5zZXR0aW5nRWwuc3R5bGUuZGlzcGxheSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUZpeGVkVGFnID8gXCJcIiA6IFwibm9uZVwiO1xuXG4gICAgICAgIHRoaXMuZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSh0KCdlbmFibGVUYWdzSW5Gcm9udG1hdHRlcicsIHRoaXMucGx1Z2luLmxhbmcpKVxuICAgICAgICAgICAgLnNldERlc2ModCgnZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJEZXNjJywgdGhpcy5wbHVnaW4ubGFuZykpXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGVcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXIpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVUYWdzSW5Gcm9udG1hdHRlciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMuZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJTZXR0aW5nLnNldHRpbmdFbC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MubG9nTW9kZSA9PT0gXCJtdWx0aVwiID8gXCJcIiA6IFwibm9uZVwiO1xuXG4gICAgICAgIGNvbnN0IGluZm9FbCA9IGNvbnRhaW5lckVsLmNyZWF0ZURpdigpO1xuICAgICAgICBpbmZvRWwuc3R5bGUubWFyZ2luVG9wID0gXCIyMHB4XCI7XG4gICAgICAgIGluZm9FbC5zdHlsZS5wYWRkaW5nID0gXCIxMnB4XCI7XG4gICAgICAgIGluZm9FbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWJhY2tncm91bmQtcHJpbWFyeS1hbHQpXCI7XG4gICAgICAgIGluZm9FbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjhweFwiO1xuICAgICAgICBpbmZvRWwuc3R5bGUuZm9udFNpemUgPSBcIjEycHhcIjtcbiAgICAgICAgaW5mb0VsLnN0eWxlLmNvbG9yID0gXCJ2YXIoLS10ZXh0LW11dGVkKVwiO1xuXG4gICAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb2dNb2RlID09PSBcIm11bHRpXCIpIHtcbiAgICAgICAgICAgIGluZm9FbC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgPHN0cm9uZz4ke3QoJ211bHRpTW9kZUluZm8nLCB0aGlzLnBsdWdpbi5sYW5nKX08L3N0cm9uZz48YnI+XG4gICAgICAgICAgICAgICAgXHUyMDIyICR7dCgnZmlsZUZvcm1hdCcsIHRoaXMucGx1Z2luLmxhbmcpfVx1RkYxQSR7dGhpcy5wbHVnaW4uc2V0dGluZ3MubXVsdGlGaWxlRm9ybWF0fS5tZDxicj5cbiAgICAgICAgICAgICAgICBcdTIwMjIgJHt0KCdhdHRhY2htZW50c0ZvbGRlcicsIHRoaXMucGx1Z2luLmxhbmcpfVx1RkYxQSR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuYXR0YWNobWVudHNGb2xkZXJ9PGJyPlxuICAgICAgICAgICAgICAgIFx1MjAyMiAke3QoJ2F0dGFjaG1lbnRzTmFtaW5nJywgdGhpcy5wbHVnaW4ubGFuZyl9PGJyPlxuICAgICAgICAgICAgICAgIFx1MjAyMiAke3QoJ3JlY29yZEZvcm1hdCcsIHRoaXMucGx1Z2luLmxhbmcpfTxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDsjIyMgWVlZWS1NTS1ERCBISDptbTpzczxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDs8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7JHt0KCdjb250ZW50UGxhY2Vob2xkZXInLCB0aGlzLnBsdWdpbi5sYW5nKX08YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyN0YWcxICN0YWcyICN0YWczPGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOzxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDtcdTY3NjVcdTZFOTA6IHh4eDxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDs8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7IVtbJHt0KCdhdHRhY2htZW50UGxhY2Vob2xkZXInLCB0aGlzLnBsdWdpbi5sYW5nKX1dXSBcdTYyMTYgW1ske3QoJ2F0dGFjaG1lbnRQbGFjZWhvbGRlcicsIHRoaXMucGx1Z2luLmxhbmcpfV1dPGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOzxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDstLS08YnI+XG4gICAgICAgICAgICAgICAgJHt0KCduZXdSZWNvcmRBdFRvcCcsIHRoaXMucGx1Z2luLmxhbmcpfTxicj5cbiAgICAgICAgICAgICAgICAke3QoJ2ltYWdlRW1iZWQnLCB0aGlzLnBsdWdpbi5sYW5nKX08YnI+XG4gICAgICAgICAgICAgICAgJHt0KCdmaWxlTGluaycsIHRoaXMucGx1Z2luLmxhbmcpfVxuICAgICAgICAgICAgYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZm9FbC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgPHN0cm9uZz4ke3QoJ3NpbmdsZU1vZGVJbmZvJywgdGhpcy5wbHVnaW4ubGFuZyl9PC9zdHJvbmc+PGJyPlxuICAgICAgICAgICAgICAgIFx1MjAyMiAke3QoJ2ZpbGVGb3JtYXQnLCB0aGlzLnBsdWdpbi5sYW5nKX1cdUZGMUFqb3RzLm1kPGJyPlxuICAgICAgICAgICAgICAgIFx1MjAyMiAke3QoJ2F0dGFjaG1lbnRzRm9sZGVyJywgdGhpcy5wbHVnaW4ubGFuZyl9XHVGRjFBJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdHRhY2htZW50c0ZvbGRlcn08YnI+XG4gICAgICAgICAgICAgICAgXHUyMDIyICR7dCgnYXR0YWNobWVudHNOYW1pbmcnLCB0aGlzLnBsdWdpbi5sYW5nKX08YnI+XG4gICAgICAgICAgICAgICAgXHUyMDIyICR7dCgncmVjb3JkRm9ybWF0JywgdGhpcy5wbHVnaW4ubGFuZyl9PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOyMjIyBZWVlZLU1NLUREIEhIOm1tOnNzPGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOzxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDske3QoJ2NvbnRlbnRQbGFjZWhvbGRlcicsIHRoaXMucGx1Z2luLmxhbmcpfTxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDs8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7I3RhZzEgI3RhZzIgI3RhZzM8YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwO1x1Njc2NVx1NkU5MDogeHh4PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOzxicj5cbiAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDshW1ske3QoJ2F0dGFjaG1lbnRQbGFjZWhvbGRlcicsIHRoaXMucGx1Z2luLmxhbmcpfV1dIFx1NjIxNiBbWyR7dCgnYXR0YWNobWVudFBsYWNlaG9sZGVyJywgdGhpcy5wbHVnaW4ubGFuZyl9XV08YnI+XG4gICAgICAgICAgICAgICAgJm5ic3A7Jm5ic3A7PGJyPlxuICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwOy0tLTxicj5cbiAgICAgICAgICAgICAgICAke3QoJ25ld1JlY29yZEF0VG9wJywgdGhpcy5wbHVnaW4ubGFuZyl9PGJyPlxuICAgICAgICAgICAgICAgICR7dCgnaW1hZ2VFbWJlZCcsIHRoaXMucGx1Z2luLmxhbmcpfTxicj5cbiAgICAgICAgICAgICAgICAke3QoJ2ZpbGVMaW5rJywgdGhpcy5wbHVnaW4ubGFuZyl9XG4gICAgICAgICAgICBgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVDb25kaXRpb25hbFNldHRpbmdzKCkge1xuICAgICAgICBpZiAodGhpcy5tdWx0aUZpbGVGb3JtYXRTZXR0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpRmlsZUZvcm1hdFNldHRpbmcuc2V0dGluZ0VsLnN0eWxlLmRpc3BsYXkgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sb2dNb2RlID09PSBcIm11bHRpXCIgPyBcIlwiIDogXCJub25lXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maXhlZFRhZ1NldHRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZml4ZWRUYWdTZXR0aW5nLnNldHRpbmdFbC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlRml4ZWRUYWcgPyBcIlwiIDogXCJub25lXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbmFibGVUYWdzSW5Gcm9udG1hdHRlclNldHRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlVGFnc0luRnJvbnRtYXR0ZXJTZXR0aW5nLnNldHRpbmdFbC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MubG9nTW9kZSA9PT0gXCJtdWx0aVwiID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSwyQ0FBQUEsU0FBQTtBQU1DLEtBQUMsU0FBVSxRQUFRLFNBQVM7QUFDekIsYUFBTyxZQUFZLFlBQVksT0FBT0EsWUFBVyxjQUFjQSxRQUFPLFVBQVUsUUFBUSxJQUN4RixPQUFPLFdBQVcsY0FBYyxPQUFPLE1BQU0sT0FBTyxPQUFPLElBQzNELE9BQU8sU0FBUyxRQUFRO0FBQUEsSUFDNUIsR0FBRSxTQUFPLFdBQVk7QUFB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QU0sV0FBVztBQUFBLE1BQ2IsRUFBRSxJQUFJLGlCQUFpQixLQUFLLGNBQW9DO0FBQUEsTUFDaEUsRUFBRSxJQUFJLGlCQUFpQixLQUFLLGVBQXFDO0FBQUEsSUFDckU7QUFFQSxVQUFNLFlBQVksS0FBSyxTQUFTLE9BQU8sV0FBTTtBQUU3QyxhQUFTLFFBQVEsQ0FBQyxFQUFFLElBQUksSUFBSSxNQUFNO0FBQzlCLFlBQU0sVUFBVSxLQUFLLElBQUksU0FBUyxZQUFZLEdBQUcsS0FBSyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUU7QUFDekUsVUFBSSxTQUFTO0FBQ1QsZ0JBQVEsT0FBTyxNQUFNLFNBQVMsR0FBRyxFQUFFLEtBQUssS0FBSyxJQUFJLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFDSjsiLAogICJuYW1lcyI6IFsibW9kdWxlIiwgImZvcm1hdCIsICJsb2NhbGUiLCAidCIsICJ0byIsICJmcm9tIiwgIm5vdyIsICJzaWduIiwgInRva2VuIiwgIm9yZGluYWwiLCAiaSIsICJkaWZmIiwgImxvY2FsZURhdGEiLCAiaG91cnMiLCAibWludXRlcyIsICJ0b2tlbnMiLCAibWVyaWRpZW0iLCAieWVhcnMiLCAibW9udGhzIiwgIndlZWtzIiwgImRheXMiLCAic2Vjb25kcyIsICJtaWxsaXNlY29uZHMiLCAib2Zmc2V0IiwgInRocmVzaG9sZHMiLCAidCIsICJtb21lbnQiLCAiYWN0aXZlSXRlbSIsICJub2RlIiwgImltcG9ydF9vYnNpZGlhbiIsICJ0IiwgInRleHRhcmVhIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfbW9tZW50IiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfbW9tZW50IiwgImUiLCAidCIsICJtb21lbnQiLCAiQ2FwdHVyZU1vZGFsIiwgInRleHRhcmVhIiwgIm1ldGFSb3ciLCAibGVhZiIsICJpbXBvcnRfb2JzaWRpYW4iLCAibW9tZW50IiwgIl9hIiwgIl9iIl0KfQo=
