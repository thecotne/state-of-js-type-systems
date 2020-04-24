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

no IDE support bullcrap in this section

|                      Criteria                     |                                         TypeScript                                        |                                                       Flow                                                       |                                    hegel                                    |
|---------------------------------------------------|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Type safe try/catch/throw                         | no. [#13219](https://github.com/microsoft/TypeScript/issues/13219) since Dec 29, 2016     | no. [#2470](https://github.com/facebook/flow/issues/2470) since Sep 14, 2016                                     | Yes                                                                         |
| Immutability                                      | unusable [#13347](https://github.com/microsoft/TypeScript/issues/13347) since Jan 8, 2017 | yes                                                                                                              | yes                                                                         |
| Type inference                                    | variable declaration, call back functions (Contextual Typing), function return type       | everything that ts has + function arguments (if local to module) no generics                                     | yes. even generics                                                          |
| Enforce use of function return value              | no                                                                                        | [#3914](https://github.com/facebook/flow/issues/3914) since May 10, 2017                                         | yes                                                                         |
| Prevent implicit type conversion                  | sometimes but non goal                                                                    | sometimes but non goal                                                                                           | almost all the time and it's design goal                                    |
| Correctly balanced nominal and  structural typing | no. structural typing only even for classes and primitive types                           | yes                                                                                                              | yes                                                                         |
| Primitive types handled as primitive types        | no. non goal                                                                              | yes                                                                                                              | yes                                                                         |
| Library of type definitions                       | good. [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)               | there is something. [flow-typed](https://github.com/flow-typed/flow-typed)                                                           | good. [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) |
| Ability to enforce no extra props                 | yes sometimes but other time it's [hacky](https://stackoverflow.com/a/54775885/1946607)   | yes by default (until you encounter unsealed objects [#7424](https://github.com/facebook/flow/issues/7424))      | yes by default                                                              |
| Attempt to prevent runtime TypeErrors             | no. non goal                                                                              | mostly yes and it's design goal                                                                                  | mostly yes and it's design goal                                             |
| Type guards                                       | yes. but no inference and no analysis of implementation                                   | no. there is `%checks` syntax that does not work for most use cases                                                           | no                                                                          |
| Assertion functions                               | yes. but no inference and no analysis of implementation                                   | no. but there is [hacky](https://github.com/facebook/flow/issues/112) solution that sometimes can be useful | no                                                                          |
| Conditional types                                 | yes                                                                                       | no. but there is [hacky](https://github.com/facebook/flow/issues/6055) solution for some use cases               | no                                                                          |


## Contribution

feel free to open issue or pull request to point out any mistake (like missing punctuation or typo) or mission/inaccurate information.
