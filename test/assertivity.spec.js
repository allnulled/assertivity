var {
	it,
	its,
	report
} = require(__dirname + "/../src/assertivity.js").generate();

report.into("Assertivity > It (particle)");

report.into("Assertivity > Positives");
report.into(" > it.is").that(20).is(20);
report.into(" > it.is.true").that(2 == 2).is.true();
report.into(" > it.is.truthy").that(2).is.truthy();
report.into(" > it.is.false").that(2 == 3).is.false();
report.into(" > it.is.falsy").that(0).is.falsy();
report.into(" > it.is.equal.to").that(2).is.equal.to(2);
report.into(" > it.is.similar.to").that(2).is.similar.to("2");
report.into(" > it.is.like").that(2).is.like(2);
report.into(" > it.is.different.from").that(2).is.different.from("2");
report.into(" > it.is.defined").that(2).is.defined();
report.into(" > it.is.undefined").that(undefined).is.undefined();
report.into(" > it.is.something").that(2).is.something();
report.into(" > it.is.boolean").that(2 == 2).is.boolean();
report.into(" > it.is.number").that(2).is.number();
report.into(" > it.is.float").that(2.2).is.float();
report.into(" > it.is.integer").that(2.0).is.integer();
report.into(" > it.is.function").that(function() {}).is.function();
report.into(" > it.is.string").that("").is.string();
report.into(" > it.is.date").that(new Date()).is.date();
report.into(" > it.is.promise").that(new Promise(function() {})).is.promise();
report.into(" > it.is.action").that(function() {}).is.action();
report.into(" > it.is.array").that([]).is.array();
report.into(" > it.is.object").that({}).is.object();
report.into(" > it.is.instance.of").that(new Date()).is.instance.of(Date);
report.into(" > it.is.more.than").that(2).is.more.than(1);
report.into(" > it.is.more.or.equal.to").that(2).is.more.or.equal.to(2);
report.into(" > it.is.less.than").that(2).is.less.than(3);
report.into(" > it.is.less.or.equal.to").that(2).is.less.or.equal.to(2);
report.into(" > it.is.empty > for strings").that("").is.empty();
report.into(" > it.is.empty > for arrays").that([]).is.empty();
report.into(" > it.is.empty > for objects").that({}).is.empty();
report.into(" > it.is.empty > for others").that(0).is.empty();
report.into(" > it.has > for arrays").that([0]).has(0);
report.into(" > it.has > for strings").that("Hello").has("ello");
report.into(" > it.has > for objects").that({
	5: 0
}).has("5");
report.into(" > it.has.key > for arrays").that([1]).has.key(0);
report.into(" > it.has.key > for arrays").that([1]).has.key(0);
report.into(" > it.has.keys > for arrays").that([1, 2]).has.keys([0, 1]);
report.into(" > it.has.value > for arrays").that([1, 2]).has.value(1);
report.into(" > it.has.values > for arrays").that([1, 2]).has.values([1, 2]);

//*

report.into("Assertivity > Negatives");
report.into(" > it.is.not").that(20).is.not(2);
report.into(" > it.is.not.true").that(false).is.not.true();
report.into(" > it.is.not.truthy").that(0).is.not.truthy();
report.into(" > it.is.not.false").that(true).is.not.false();
report.into(" > it.is.not.falsy").that(1).is.not.falsy();
report.into(" > it.is.not.equal.to").that(0).is.not.equal.to("0");
report.into(" > it.is.not.similar.to").that(0).is.not.similar.to(1);
report.into(" > it.is.not.like").that(0).is.not.like(1);
report.into(" > it.is.not.different.from").that(0).is.not.different.from(0);
report.into(" > it.is.not.defined").that(undefined).is.not.defined();
report.into(" > it.is.not.undefined").that(0).is.not.undefined();
report.into(" > it.is.not.something").that(0).is.not.something();
report.into(" > it.is.not.boolean").that(0).is.not.boolean();
report.into(" > it.is.not.number").that(false).is.not.number();
report.into(" > it.is.not.float").that(1).is.not.float();
report.into(" > it.is.not.integer").that(1.2).is.not.integer();
report.into(" > it.is.not.function").that(0).is.not.function();
report.into(" > it.is.not.string").that(0).is.not.string();
report.into(" > it.is.not.date").that(0).is.not.date();
report.into(" > it.is.not.promise").that(0).is.not.promise();
report.into(" > it.is.not.action").that(0).is.not.action();
report.into(" > it.is.not.array").that(0).is.not.array();
report.into(" > it.is.not.object").that(0).is.not.object();
report.into(" > it.is.not.instance.of").that(0).is.not.instance.of(Date);
report.into(" > it.is.not.more.than").that(0).is.not.more.than(0);
report.into(" > it.is.not.more.or.equal.to").that(0).is.not.more.or.equal.to(1);
report.into(" > it.is.not.less.than").that(0).is.not.less.than(0);
report.into(" > it.is.not.less.or.equal.to").that(1).is.not.less.or.equal.to(0);
report.into(" > it.is.not.empty > for strings").that("0").is.not.empty();
report.into(" > it.is.not.empty > for arrays").that([0]).is.not.empty();
report.into(" > it.is.not.empty > for objects").that({
	0: 0
}).is.not.empty();
report.into(" > it.is.not.empty > for others").that(1).is.not.empty();
report.into(" > it.has > for arrays").that([1]).has.not(0);
report.into(" > it.has > for strings").that("Hello").has.not("a");
report.into(" > it.has > for objects").that({
	5: 0
}).has.not(1);
report.into(" > it.has.not.key > for arrays").that([1]).has.not.key(1);
report.into(" > it.has.not.key > for arrays").that([1]).has.not.key(1);
report.into(" > it.has.not.keys > for arrays").that([1, 2]).has.not.keys([0, 1, 2]);
report.into(" > it.has.not.value > for arrays").that([1, 2]).has.not.value(3);
report.into(" > it.has.not.values > for arrays").that([1, 2]).has.not.values([1, 2, 3]);

report.into("Assertivity > Possessives");

it([[[10]]]);
report.into(" > its").that.its(0,0,0).is.like(10);

//*/

var myConsole = console.log;
var dataTemp = [];
console.log = function(a) {
	dataTemp.push(a);
};
report.into(" > labels").as("eighteen").that.it(80).is.number();
console.log(dataTemp[0]);
report.into(" > labels").that.it(dataTemp[0]).has("eighteen");
require("fs").writeFileSync("tests.json", JSON.stringify(report(), null, 4), "utf-8");