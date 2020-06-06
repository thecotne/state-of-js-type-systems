# State Of JavaScript Type Systems

There are two major players in this field one is [Flow](https://github.com/facebook/flow)
written in ocaml by facebook and second is [TypeScript](https://github.com/microsoft/typescript)
written in TypeScript by microsoft.

Besides those there is new kid in the neighborhood called [hegel](https://github.com/JSMonk/hegel)
written in JavaScript (with Flow and hegel) by ukrainian developer [Artem Kobzar](https://github.com/jsMonk).
hegel is not ready for prime time but it has much better design decisions and goals around type system then
TypeScript and is written in JavaScript opposite to facebook's decision to use ocaml
for JavaScript type system which greatly limits contributions from community.

This Repo is for comparing those three and tracking progress.

## Type system itself

In this section we compare features and how well they are implemented.

- ***note 01***: no IDE support bullcrap in this section.
- ***note 02***: `???` links are used instead of `abbr` tags since those are not supported by github in readme.

<table><thead><tr><th>Criteria</th><th>TypeScript</th><th>Flow</th><th>Hegel</th></tr></thead><tbody><tr><td><b>Type safe try/catch/throw</b></td><td>No, <a href="https://github.com/microsoft/TypeScript/issues/13219" title="Suggestion: `throws` clause and typed catch clause">#13219</a></td><td>No, <a href="https://github.com/facebook/flow/issues/2470" title="Doesn&#039;t check the type of an exception">#2470</a></td><td>Yes</td></tr><tr><td><b>Immutability</b></td><td>Unusable, <a href="https://github.com/microsoft/TypeScript/issues/13347" title="Interface with readonly property is assignable to interface with mutable property">#13347</a></td><td>Yes</td><td>Yes</td></tr><tr><td><b>Type inference</b></td><td>Sometimes, <u><a href="#" title="Variable declaration, call back functions (Contextual Typing), function return type">???</a></u></td><td>Mostly, <u><a href="#" title="Everything that ts has + function arguments (if local to module) but no generics">???</a></u></td><td>Yes, <u><a href="#" title="Even generics">???</a></u></td></tr><tr><td><b>Enforce use of function return value</b></td><td>No</td><td>No, <a href="https://github.com/facebook/flow/issues/3914" title="Enforce use of function return">#3914</a></td><td>Yes</td></tr><tr><td><b>Prevent implicit type conversion</b></td><td>Sometimes, <u><a href="#" title="but non goal">???</a></u></td><td>Sometimes, <u><a href="#" title="but non goal">???</a></u></td><td>Yes, <u><a href="#" title="Almost all the time and it&#039;s design goal">???</a></u></td></tr><tr><td><b>Correctly balanced nominal and structural typing</b></td><td>No, <u><a href="#" title="Only structural typing even for classes">???</a></u></td><td>Yes</td><td>Yes</td></tr><tr><td><b>Library of type definitions</b></td><td>Good, <a href="https://github.com/DefinitelyTyped/DefinitelyTyped">DefinitelyTyped</a></td><td>There is something, <a href="https://github.com/flow-typed/flow-typed">flow-typed</a></td><td>Same as TypeScript</td></tr><tr><td><b>Ability to enforce no extra props</b></td><td>Sometimes, but it's <a href="https://stackoverflow.com/a/54775885/1946607">hacky</a></td><td>Yes By Default</td><td>Yes By Default</td></tr><tr><td><b>Attempt to prevent runtime TypeErrors</b></td><td>No non-goal</td><td>Mostly, it's design goal</td><td>Mostly, it's design goal</td></tr><tr><td><b>Type guards</b></td><td>Unusable, <u><a href="#" title="No inference and no analysis of implementation">???</a></u></td><td>No, <u><a href="#" title="there is &#039;%checks&#039; syntax that does not work for most use cases">???</a></u></td><td>No</td></tr><tr><td><b>Assertion functions</b></td><td>Unusable, <u><a href="#" title="No inference and no analysis of implementation">???</a></u></td><td>No, <a href="https://github.com/facebook/flow/issues/112" title="Remove special case for `invariant`">#112</a>, <u><a href="#" title="but there is hacky solution that sometimes can be useful">???</a></u></td><td>No</td></tr><tr><td><b>Conditional types</b></td><td>Yes</td><td>No, <a href="https://github.com/facebook/flow/issues/6055" title="Conditional return type in Flow?">#6055</a>, <u><a href="#" title="but there is hacky solution for some use cases">???</a></u></td><td>No</td></tr></tbody></table>

#### glossary

|      Term      |                                  Meaning                                   |
|----------------|----------------------------------------------------------------------------|
| Yes By Default | It is implemented, it works and is turned on by default                    |
| Yes            | It is implemented and it works (it may or may not be turned on by default) |
| Mostly         | It is implemented and mostly covers use cases                              |
| Sometimes      | It has poor implementation that sometimes works and sometimes does not     |
| Unusable       | It has so poor implementation that it rarely makes any difference          |
| No             | It is not implemented                                                      |
| No non-goal    | It is not implemented and it will not be implemented in future             |

# Who Uses What?

In this section we compare how popular each solution is amongs most impactful JavaScript projects.

|       Project       |              Choice              |                                                                                           Proof                                                                                           |
|---------------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| babel               | Flow                             | [1](https://github.com/babel/babel/blob/v7.0.0/.flowconfig)                                                                                                                               |
| React               | Flow                             | [1](https://github.com/facebook/react/blob/master/scripts/flow/config/flowconfig)                                                                                                         |
| Redux v1, v2 and v3 | Flow                             | [1](https://github.com/reduxjs/redux/blob/v1.0.0/.flowconfig) [2](https://github.com/reduxjs/redux/blob/v2.0.0/.flowconfig) [3](https://github.com/reduxjs/redux/blob/v3.0.0/.flowconfig) |
| Redux v4            | TypeScript                       | [1](https://github.com/reduxjs/redux/blob/master/tsconfig.json)                                                                                                                           |
| Vue.js v2           | Flow                             | [1](https://github.com/vuejs/vue/blob/v2.0.0/.flowconfig)                                                                                                                                 |
| Angular v2+         | TypeScript                       | [1](https://github.com/angular/angular/blob/2.0.x/tools/tsconfig.json)                                                                                                                    |
| date-fns            | both                             | [1](https://github.com/date-fns/date-fns/blob/v2.0.0/.flowconfig) [2](https://github.com/date-fns/date-fns/blob/v2.0.0/tsconfig.json)                                                     |
| meteor              | TypeScript but very few ts files | [1](https://github.com/meteor/meteor/blob/devel/tools/tsconfig.json)                                                                                                                      |
| NEXT.js             | TypeScript but very few ts files | [1](https://github.com/zeit/next.js/blob/v9.2.2/packages/next/tsconfig.json)                                                                                                              |
| Gatsby v1           | Flow                             | [1](https://github.com/gatsbyjs/gatsby/blob/v1.0.0/.flowconfig)                                                                                                                           |
| Gatsby v2           | TypeScript but very few ts files | [1](https://github.com/gatsbyjs/gatsby/commit/416afdb2025d83eea48f28e1e752cdee7f77f409)                                                                                                   |
| Rollup              | TypeScript but very few ts files | [1](https://github.com/rollup/rollup/blob/v2.0.0/tsconfig.json)                                                                                                                           |
| ember.js v3         | TypeScript but very few ts files | [1](https://github.com/emberjs/ember.js/pull/15759)                                                                                                                                       |
| Aurelia             | TypeScript but no ts files?!     | [1](https://github.com/aurelia/framework/blob/1.0.0/tsconfig.json)                                                                                                                        |
| Yarn v1             | Flow                             | [1](https://github.com/yarnpkg/yarn/blob/master/.flowconfig)                                                                                                                              |
| Yarn v2 (berry)     | TypeScript                       | [1](https://github.com/yarnpkg/berry/blob/master/tsconfig.json)                                                                                                                           |
| NestJS              | TypeScript                       | [1](https://github.com/nestjs/nest/blob/master/tsconfig.json)                                                                                                                             |
| AdonisJS            | TypeScript                       | [1](https://github.com/adonisjs/core/blob/develop/tsconfig.json)                                                                                                                          |
| Relay               | Flow                             | [1](https://github.com/facebook/relay/blob/v9.0.0/.flowconfig)                                                                                                                            |

Many JavaScript projects are not using any type checking tool at all
and many who use TypeScript don't go all in on it and have only about 1/4 of files converted to TypeScript

Also Flow seems to be loosing to TypeScript since some projects
which started with flow did switch to TypeScript (like Redux, Gatsby and Yarn)

## Contribution

feel free to open issue or pull request to point out any mistake
(like missing punctuation or typo) or mission/inaccurate information.
