/*

![](https://img.shields.io/badge/assertivity.tester-v1.0.0-green.svg)

![](https://img.shields.io/badge/coverage-100%25-green.svg)

//*/

(function() {
	var output = (function() {

		var Timer = function() {
			this.first = new Date();
			this.time = function() {
				return (new Date()).getTime() - this.first.getTime();
			};
			return this;
		};

		var timerBegin = new Timer();

		/**
		 * @type {Function}
		 * @name AssertivityTester
		 * @returns {Object} Object storing the whole API.
		 */
		function AssertivityTester(paramSettings = {}) {
			var Assertivity = {};
			var defaultSettings = {
				debug: false,
				tree: false
			}
			var settings = Object.assign({}, defaultSettings, paramSettings);
			Assertivity._ = {
				reference: {
					get: function() {
						var out = this.temp || this.main;
						Assertivity._.reference.temp = undefined;
						return out;
					},
					main: undefined,
					temp: undefined
				},
				report: {
					get: function() {
						var out = {
							reference: Assertivity._.report.temp || Assertivity._.report.main,
							label: Assertivity._.report.label
						};
						Assertivity._.reference.temp = undefined;
						Assertivity._.report.label = undefined;
						Assertivity._.report.temp = undefined;
						return Assertivity._.report.data;
					},
					main: undefined,
					temp: undefined,
					label: undefined,
					data: {}
				}
			};
			var defaultCallback = function(expression, $, args, result) {
				if (Assertivity._.report.label) {
					var logging = "$result [$time] $label "
						.replace("$result", result === true ? "   \u2714" : " \u2716  ")
						.replace("$label", Assertivity._.report.label)
						.replace("$time", timerBegin.time(), 10);
					Assertivity._.report.label = undefined;
					console.log(logging);
				}
				if (Assertivity._.report.main || Assertivity._.report.temp) {
					if (settings.tree) {
						var selector = [].concat(Assertivity._.report.main || []).concat(Assertivity._.report.temp || []);
						var selectorStr = selector.join(" > ");
						var val = Assertivity._.report.data;
						while (selector.length !== 0) {
							var key = selector.shift();
							if (!(key in val)) {
								val[key] = {};
							}
							if (selector.length === 0) {
								if (!(val[key].$)) {
									val[key].$ = [];
								}
								var ref = $;
								var item = {
									$expr: expression.replace(/\./g, " "),
									$value: result,
									$time: timerBegin.time(),
									$ref: "{ " + (ref instanceof Array ? "array" : typeof ref) + " }",
									$args: (function() {
										var items = "";
										args.forEach(function(item) {
											items += "{ " + (item instanceof Array ? "array" : typeof item) + " }, ";
										});
										return "[" + items.replace(/, $/g, "") + "]";
									})(),
								};
								// "\u2714"
								// "\u2716"
								item.$fullExpression = (item.$value ? "Okay" : "\u2716") + " that " + item.$ref + " " + item.$expr.replace(/^it /g, "") + " " + item.$args + " (" + item.$time + "ms)"
								if (settings.debug) {
									val[key].$.push(item);
								} else {
									val[key].$.push(item.$fullExpression);
								}
							} else {
								val = val[key];
							}
						}
					} else {
						var selector = [].concat(Assertivity._.report.main || []).concat(Assertivity._.report.temp || []);
						var selectorStr = selector.join(" > ");
						if (!(selectorStr in Assertivity._.report.data)) {
							Assertivity._.report.data[selectorStr] = [];
						}
						var ref = $;
						var item = {
							$expr: expression.replace(/\./g, " "),
							$value: result,
							$time: timerBegin.time(),
							$ref: "{ " + (ref instanceof Array ? "array" : typeof ref) + " }",
							$args: (function() {
								var items = "";
								args.forEach(function(item) {
									items += "{ " + (item instanceof Array ? "array" : typeof item) + " }, ";
								});
								return "[" + items.replace(/, $/g, "") + "]";
							})(),
						};
						item.$fullExpression = (item.$value ? "Okay" : "\u2716") + " that " + item.$ref + " " + item.$expr.replace(/^it /g, "") + " " + item.$args + " (" + item.$time + "ms)"
						if (settings.debug) {
							Assertivity._.report.data[selectorStr].push(item);
						} else {
							Assertivity._.report.data[selectorStr].push(item.$fullExpression);
						}
					}
					Assertivity._.report.temp = undefined;
					return result;
				}
				return result;
			};
			var generateAssertions = function(callback = defaultCallback) {
				var it = function(a) {
					var args = Array.prototype.slice.call(arguments);
					Assertivity._.reference.main = args.shift();
					if (args.length !== 0) {
						Assertivity._.reference.temp = args;
					}
					return it;
				};
				var its = function() {
					var args = Array.prototype.slice.call(arguments);
					var elem = Assertivity._.reference.main;
					var out = elem;
					try {
						for (var a = 0; a < args.length; a++) {
							elem = elem[args[a]];
						}
						Assertivity._.reference.temp = elem;
					} catch (exc) {
						// @TODO: throw error?
					}
					return it;
				};
				it.is = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ === a;
					return callback("it.is", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.true = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ === true;
					return callback("it.is.true", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.truthy = function(a) {
					var $ = Assertivity._.reference.get();
					var out = (!!$) === true;
					return callback("it.is.truthy", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.false = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ === false;
					return callback("it.is.false", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.falsy = function(a) {
					var $ = Assertivity._.reference.get();
					var out = (!!$) === false;
					return callback("it.is.falsy", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.equal = {};
				it.is.equal.to = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ === a;
					return callback("it.is.equal.to", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.similar = {};
				it.is.similar.to = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ == a;
					return callback("it.is.similar.to", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.like = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ == a;
					return callback("it.is.like", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.different = {};
				it.is.different.from = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ !== a;
					return callback("it.is.different.from", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.defined = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ !== "undefined";
					return callback("it.is.defined", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.undefined = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "undefined";
					return callback("it.is.undefined", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.inside = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if ((a instanceof Array) || (typeof a === "string")) {
						out = (-1 !== a.indexOf($));
					} else if (typeof a === "object") {
						out = (-1 !== Object.keys(a).indexOf("" + $)) || (-1 !== Object.values(a).indexOf($));
					}
					return callback("it.is.inside", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.something = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !!$;
					return callback("it.is.something", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.boolean = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "boolean";
					return callback("it.is.boolean", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.number = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "number";
					return callback("it.is.number", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.float = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "number" && ($ % 1 !== 0);
					return callback("it.is.float", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.integer = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "number" && ($ % 1 === 0);
					return callback("it.is.integer", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.function = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "function";
					return callback("it.is.function", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.string = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "string";
					return callback("it.is.string", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.date = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ instanceof Date;
					return callback("it.is.date", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.promise = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if (typeof Promise === "function" && $ instanceof Promise) {
						out = true;
					}
					return callback("it.is.promise", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.action = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "function";
					return callback("it.is.action", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.array = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ instanceof Array;
					return callback("it.is.array", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.object = function(a) {
					var $ = Assertivity._.reference.get();
					var out = typeof $ === "object";
					return callback("it.is.object", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.instance = {};
				it.is.instance.of = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ instanceof a;
					return callback("it.is.instance.of", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.more = {};
				it.is.more.than = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ > a;
					return callback("it.is.more.than", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.more.or = {};
				it.is.more.or.equal = {};
				it.is.more.or.equal.to = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ >= a;
					return callback("it.is.more.or.equal.to", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.less = {};
				it.is.less.than = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ < a;
					return callback("it.is.less.than", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.less.or = {};
				it.is.less.or.equal = {};
				it.is.less.or.equal.to = function(a) {
					var $ = Assertivity._.reference.get();
					var out = $ <= a;
					return callback("it.is.less.or.equal.to", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.empty = function(a) {
					var $ = Assertivity._.reference.get();
					var out = undefined;
					if ($ instanceof Array || typeof $ === "string") {
						out = $.length === 0;
					} else if (typeof $ === "object") {
						out = Object.values($).length === 0;
					} else {
						out = !!!$;
					}
					return callback("it.is.empty", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if ($ instanceof Array || typeof $ === "string") {
						out = -1 !== $.indexOf(a);
					} else if (typeof $ === "object") {
						out = (-1 !== Object.keys($).indexOf("" + a)) || (-1 !== Object.values($).indexOf(a));
					}
					return callback("it.has", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.key = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if ($ instanceof Array || typeof $ === "string") {
						out = $.length > parseInt(a);
					} else if (typeof $ === "object") {
						out = a in $;
					}
					return callback("it.has.key", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.keys = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if (a instanceof Array) {
						out = true;
						for (var i = 0; i < a.length; i++) {
							if (!(a[i] in $)) {
								out = false;
							}
						}
					} else {
						out = ("" + a) in $;
					}
					return callback("it.has.keys", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.value = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if ($ instanceof Array || typeof $ === "string") {
						out = $.indexOf(a) !== -1;
					} else if (typeof $ === "object") {
						out = -1 !== Object.values($).indexOf(a);
					}
					return callback("it.has.value", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.values = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					var values = Object.values($);
					if (a instanceof Array) {
						out = true;
						values:
							for (var i = 0; i < a.length; i++) {
								if (values.indexOf(a[i]) === -1) {
									out = false;
								}
							}
					} else {
						out = values.indexOf(a) !== -1;
					}
					return callback("it.has.values", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ === a);
					return callback("it.is.not", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.true = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ === true);
					return callback("it.is.not.true", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.truthy = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !((!!$) === true);
					return callback("it.is.not.truthy", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.false = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ === false);
					return callback("it.is.not.false", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.falsy = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !((!!$) === false);
					return callback("it.is.not.falsy", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.equal = {};
				it.is.not.equal.to = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ === a);
					return callback("it.is.not.equal.to", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.similar = {};
				it.is.not.similar.to = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ == a);
					return callback("it.is.not.similar.to", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.like = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ == a);
					return callback("it.is.not.like", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.different = {};
				it.is.not.different.from = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ !== a);
					return callback("it.is.not.different.from", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.defined = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ !== "undefined");
					return callback("it.is.not.defined", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.undefined = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "undefined");
					return callback("it.is.not.undefined", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.inside = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if ((a instanceof Array) || (typeof a === "string")) {
						out = !(-1 !== a.indexOf($));
					} else if (typeof a === "object") {
						out = !((-1 !== Object.keys(a).indexOf("" + $)) || (-1 !== Object.values(a).indexOf($)));
					}
					return callback("it.is.not.inside", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.something = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(!!$);
					return callback("it.is.not.something", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.boolean = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "boolean");
					return callback("it.is.not.boolean", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.number = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "number");
					return callback("it.is.not.number", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.float = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "number" && ($ % 1 !== 0));
					return callback("it.is.not.float", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.integer = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "number" && ($ % 1 === 0));
					return callback("it.is.not.integer", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.function = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "function");
					return callback("it.is.not.function", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.string = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "string");
					return callback("it.is.not.string", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.date = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ instanceof Date);
					return callback("it.is.not.date", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.promise = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "function");
					return callback("it.is.not.promise", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.action = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "function");
					return callback("it.is.not.action", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.array = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "boolean");
					return callback("it.is.not.array", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.object = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !(typeof $ === "object");
					return callback("it.is.not.object", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.instance = {};
				it.is.not.instance.of = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ instanceof a);
					return callback("it.is.not.instance.of", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.more = {};
				it.is.not.more.than = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ > a);
					return callback("it.is.not.more.than", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.more.or = {};
				it.is.not.more.or.equal = {};
				it.is.not.more.or.equal.to = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ >= a);
					return callback("it.is.not.more.or.equal.to", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.less = {};
				it.is.not.less.than = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ < a);
					return callback("it.is.not.less.than", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.less.or = {};
				it.is.not.less.or.equal = {};
				it.is.not.less.or.equal.to = function(a) {
					var $ = Assertivity._.reference.get();
					var out = !($ <= a);
					return callback("it.is.not.less.or.equal.to", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.is.not.empty = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if ($ instanceof Array || typeof $ === "string") {
						out = !($.length === 0);
					} else if (typeof $ === "object") {
						out = !(Object.values($).length === 0);
					} else {
						out = !(!!!$);
					}
					return callback("it.is.not.empty", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.not = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if ($ instanceof Array || typeof $ === "string") {
						out = !(-1 !== $.indexOf(a));
					} else if (typeof $ === "object") {
						out = !((-1 !== Object.keys($).indexOf("" + a)) || (-1 !== Object.values($).indexOf(a)));
					}
					return callback("it.has.not", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.not.key = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if ($ instanceof Array || typeof $ === "string") {
						out = !($.length > parseInt(a));
					} else if (typeof $ === "object") {
						out = !(a in $);
					}
					return callback("it.has.not.key", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.not.keys = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					if (a instanceof Array) {
						out = !(true);
						for (var i = 0; i < a.length; i++) {
							if (!(a[i] in $)) {
								out = !(false);
							}
						}
					} else {
						out = !(("" + a) in $);
					}
					return callback("it.has.not.keys", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.not.value = function(a) {
					var $ = Assertivity._.reference.get();
					var out = true;
					if ($ instanceof Array || typeof $ === "string") {
						out = !($.indexOf(a) !== -1);
					} else if (typeof $ === "object") {
						out = !(-1 !== Object.values($).indexOf(a));
					}
					return callback("it.has.not.value", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.has.not.values = function(a) {
					var $ = Assertivity._.reference.get();
					var out = true;
					var values = Object.values($);
					if (a instanceof Array) {
						values: for (var i = 0; i < a.length; i++) {
							if (values.indexOf(a[i]) === -1) {
								out = !(false);
							}
						}
					}
					else {
						out = !(values.indexOf(a) !== -1);
					}
					return callback("it.has.not.values", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.throws = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					try {
						a.call(Assertivity._);
					} catch (exc) {
						out = true;
					}
					return callback("it.throws", $, Array.prototype.slice.call(arguments), out) || out;
				};
				it.safely = function(a) {
					var $ = Assertivity._.reference.get();
					var out = false;
					try {
						a.call(Assertivity._);
						out = true;
					} catch (exc) {

					}
					return callback("it.safely", $, Array.prototype.slice.call(arguments), out) || out;
				};
				return {
					it,
					its
				};
			};
			var basicAssertions = generateAssertions();
			Assertivity.it = basicAssertions.it;
			Assertivity.its = basicAssertions.its;
			Assertivity.report = function() {
				if (arguments.length !== 0) {
					return getter(Assertivity._.report.get(), Array.prototype.slice.call(arguments).join(" > ").split(SPLITER_REGEX));
				}
				return Assertivity._.report.get();
			};
			Assertivity.report.that = function() {
				return Assertivity.it.apply(Assertivity, Array.prototype.slice.call(arguments));
			};
			Assertivity.report.that.it = Assertivity.it;
			Assertivity.report.that.its = Assertivity.its;
			Assertivity.report.as = function(label) {
				Assertivity._.report.label = label;
				return Assertivity.report;
			};
			Assertivity.report.into = function() {
				var SPLITER_REGEX = / *\>+ */g;
				var args = Array.prototype.slice.call(arguments);
				var mainSelector = args.shift().trim().split(SPLITER_REGEX);
				var secondarySelector = args.join(" > ").trim().split(SPLITER_REGEX).filter(function(item) {
					return item !== "";
				});
				if (mainSelector[0] === "") {
					// Case 1: main starts with ">"
					mainSelector.shift();
					secondarySelector = [].concat(mainSelector).concat(secondarySelector);
					mainSelector = undefined;
					Assertivity._.report.temp = secondarySelector;
				} else {
					// Case 2: main doesnot start with ">"
					Assertivity._.report.main = mainSelector;
					if (secondarySelector) {
						Assertivity._.report.temp = secondarySelector;
					}
				}
				return Assertivity.report;
			};
			return Assertivity;
		};

		return {
			generate: AssertivityTester
		};

	})();
	if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
		module.exports = output;
	} else if (typeof define === "function" && typeof define.amd !== "undefined") {
		define([], () => output);
	} else {
		window[arguments[0]] = output;
	}
})("Assertivity");