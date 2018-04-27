# assertivity

![](https://img.shields.io/badge/assertivity.tester-v1.0.0-green.svg)

**Assertivity** es un framework de testing y expresiones booleana para JavaScript.

Los principales objetivos de este proyecto son:

- Facilitar el uso y la lectura de expresiones booleanas para JavaScript.

- Ofrecer una herramienta de testeo intuitiva y completa.

- Facilitar la obtención de informes de los testeos legibles, flexibles, y completos.

## Instalación

~$ `npm install --save-dev assertivity`

## Uso

##### 1. Importar la Assertivity API:

```js
var {it, its, report} = require("assertivity").generate();
```

##### 2. Usar la Assertivity API

## API

---

Reference: **`{Assertivity}.it()`**

Type: **`{Function}`**

Returns: **`{Object:Assertive verbs}`**

Properties: **`{Object:Assertive verbs}`**

Usage:

+ Parameters: `{Any:main}`

+ Description: Establece la referencia principal para las aserciones venideras en el valor `main` pasado. También puede usarse como pivote para llamar a los verbos asertivos, sin llamarse como función.

+ Example:

```js
it(800).is.number(); // true
it("Hello").is.string(); // true
it([]).is.boolean(); // false
it.is.array(); // true
it.is.not.empty(); // false
its("length").is(0); // true
```

---

Reference: **`{Assertivity}.its()`**

Type: **`{Function}`**

Returns: **`{Object:Assertive verbs}`**

Properties: **`{none}`**

Usage:

+ Parameters: `[{String:selector}]+`

+ Description: Establece los selectores de la referencia temporal para la aserción siguiente. Los selectores representan propiedades, y serán accedidas anidadamente, en orden, y desde el valor de la referencia principal.

+ Example:

```js
it({a:{b:90,c:80}});
its("a","b").is(90); // true
its("a","c").is(80); // true
```

---

Reference: **`{Assertivity}.report`**

Type: **`{Object}`**

Returns: **`{{Assertivity}.report.into, {Assertivity}.report.as}`**

Properties: **`{none}`**

Usage: (as property)

+ Description: Esta propiedad se utiliza como pivote para acceder a los 2 métodos relacionados con el testing/reporting, en lugar del asserting. Los 2 métodos a los que se hace referencia son: `into` y `as`.

+ Example:

```js
report.into("Main Test > Part 1", "Subpart 1 > Element 1").that(80).is.number();
report.into(undefined).as("Some label").that(80).is.number();
report.as("Some label").that(90).is.number();
```

---

Reference: **`{Assertivity}.report.into()`**

Type: **`{Function}`**

Returns: **`{as,that}`**

Parameters: **`{String:main}[, {String:subselector}]*`**

+ Description: Esta propiedad se utiliza como pivote para acceder a los 2 métodos relacionados con el testing/reporting, en lugar del asserting. Los 2 métodos a los que hago referencia son: `into` y `as`.

+ Example:

```js
report.into("Main Test > Part 1", "Subpart 1 > Element 1").that(80).is.number();
report.into(" > Subpart 1 > Element 2").that(80).is.number(); // registered at: Main Test.Part 1.Subpart 1.Element 2
report.into(" > Subpart 1 > Element 3").that(80).is.number(); // registered at: Main Test.Part 1.Subpart 1.Element 3
report.into(" > Subpart 1 > Element 4").that(80).is.number(); // registered at: Main Test.Part 1.Subpart 1.Element 4
report.into(" > Subpart 2 > Element 1").that(80).is.number(); // registered at: Main Test.Part 1.Subpart 2.Element 1
report.into(" > Subpart 2 > Element 2").that(80).is.number(); // registered at: Main Test.Part 1.Subpart 2.Element 2
report.into(" > Subpart 2 > Element 3").that(80).is.number(); // registered at: Main Test.Part 1.Subpart 2.Element 3
report.into(" > Subpart 2 > Element 4").that(80).is.number(); // registered at: Main Test.Part 1.Subpart 2.Element 4
report.into(undefined).that(80).is.number(); // not registered
```

---

Reference: **`{Assertivity}.report.as()`**

Type: **`{Function}`**

Returns: **`{that}`**

Parameters: **`{String:label}`**

Usage 1:

+ Description: Esta propiedad se utiliza como pivote para acceder a los 2 métodos relacionados con el testing/reporting, en lugar del asserting. Los 2 métodos a los que hago referencia son: `into` y `as`.

+ Example:

```js
it({a:{b:90,c:80}});
its("a","b").is(90); // true
its("a","c").is(80); // true
```

---

Reference: **`{Object:Assertive verbs}`**

Type: **`{Object}`**

Methods:

**`~.is()`**

**`~.is.true()`**

**`~.is.truthy()`**

**`~.is.false()`**

**`~.is.falsy()`**

**`~.is.equal.to()`**

**`~.is.similar.to()`**

**`~.is.like()`**

**`~.is.different.from()`**

**`~.is.defined()`**

**`~.is.undefined()`**

**`~.is.something()`**

**`~.is.boolean()`**

**`~.is.number()`**

**`~.is.float()`**

**`~.is.integer()`**

**`~.is.function()`**

**`~.is.string()`**

**`~.is.date()`**

**`~.is.promise()`**

**`~.is.action()`**

**`~.is.array()`**

**`~.is.object()`**

**`~.is.instance.of()`**

**`~.is.more.than()`**

**`~.is.more.or.equal.to()`**

**`~.is.less.than()`**

**`~.is.less.or.equal.to()`**

**`~.is.empty({string})`**

**`~.is.empty({array})`**

**`~.is.empty({object})`**

**`~.is.empty({other})`**

**`~.has({array})`**

**`~.has({string})`**

**`~.has({object})`**

**`~.has.key({array})`**

**`~.has.key({array})`**

**`~.has.keys({array})`**

**`~.has.value({array})`**

**`~.has.values({array})`**

**`~.is.not()`**

**`~.is.not.true()`**

**`~.is.not.truthy()`**

**`~.is.not.false()`**

**`~.is.not.falsy()`**

**`~.is.not.equal.to()`**

**`~.is.not.similar.to()`**

**`~.is.not.like()`**

**`~.is.not.different.from()`**

**`~.is.not.defined()`**

**`~.is.not.undefined()`**

**`~.is.not.something()`**

**`~.is.not.boolean()`**

**`~.is.not.number()`**

**`~.is.not.float()`**

**`~.is.not.integer()`**

**`~.is.not.function()`**

**`~.is.not.string()`**

**`~.is.not.date()`**

**`~.is.not.promise()`**

**`~.is.not.action()`**

**`~.is.not.array()`**

**`~.is.not.object()`**

**`~.is.not.instance.of()`**

**`~.is.not.more.than()`**

**`~.is.not.more.or.equal.to()`**

**`~.is.not.less.than()`**

**`~.is.not.less.or.equal.to()`**

**`~.is.not.empty({string})`**

**`~.is.not.empty({array})`**

**`~.is.not.empty({object})`**

**`~.is.not.empty({other})`**

**`~.has({array})`**

**`~.has({string})`**

**`~.has({object})`**

**`~.has.not.key({array})`**

**`~.has.not.key({array})`**

**`~.has.not.keys({array})`**

**`~.has.not.value({array})`**

**`~.has.not.values({array})`**


## Conclusión


**Assertivity** es un framework completamente innecesario dadas las herramientas de alta calidad de hoy en día. No obstante, ninguno de ellos permite generar expresiones booleanas en una sola línea, usando una API semántica (de ahí el acercamiento natural), además de generar reportes concisos de las aseveraciones que se están haciendo y los resultados que se han obtenido. 

Por tanto, aunque sea innecesario ante Jasmine, Qunit, Mocha, Chai, etc. es bueno tener una herramienta que:

 · Ahorre código

 · Aumente legibilidad 

 · Haga reportes concretos de las afirmaciones que se están haciendo.

 · Se escriba, se lea y se pronuncie de la misma manera.

La misma idea que se esconde tras este proyecto, se escondía tras NaturalScript [(test del lenguaje en PasteBin)](https://www.pastebin.ca/4001986), un lenguaje de programación casi natural que transpilaba a JavaScript. Pero ni Google, ni Microsoft, ni Oracle, ni Intel (todos juntos, por cierto, ya que les carteé a todos juntos, y sólo recibí una respuesta de IBM) quisieron darme 5000 € para que trabajara en ello por mi cuenta durante 6 meses (pese a sus ingresos, jeje... insultantes, irrisorios ingresos y beneficios), por lo que bueno... he de suponer que esto se pudrirá. Como yo, y todos mis esfuerzos por hacer que la puta población despierte y se coma vivos a los políticos que les están metiendo en la guerra, o saqueando a los pueblos amigos.

En fin. Yo acabaré loco. Pero vivo en un mundo de absurdos, que es peor todavía.












