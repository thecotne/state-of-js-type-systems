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

%typeSystemTable%

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
