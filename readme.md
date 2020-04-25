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

<table><thead><tr><th>Criteria</th><th>TypeScript</th><th>Flow</th><th>Hegel</th></tr></thead><tbody><tr><th>Type safe try/catch/throw</th><td>No <a href="https://github.com/microsoft/TypeScript/issues/13219" title="Suggestion: `throws` clause and typed catch clause">#13219</a></td><td>No <a href="https://github.com/facebook/flow/issues/2470" title="Doesn&#039;t check the type of an exception">#2470</a></td><td>Yes</td></tr><tr><th>Immutability</th><td>Unusable <a href="https://github.com/microsoft/TypeScript/issues/13347" title="Interface with readonly property is assignable to interface with mutable property">#13347</a></td><td>Yes</td><td>Yes</td></tr><tr><th>Type inference</th><td>SomeTimes <abbr title="Variable declaration, call back functions (Contextual Typing), function return type">???</abbr></td><td>Mostly <abbr title="Everything that ts has + function arguments (if local to module) but no generics">???</abbr></td><td>Yes <abbr title="Even generics">???</abbr></td></tr><tr><th>Enforce use of function return value</th><td>No</td><td>No <a href="https://github.com/facebook/flow/issues/3914" title="Enforce use of function return">#3914</a></td><td>Yes</td></tr><tr><th>Prevent implicit type conversion</th><td>SomeTimes <abbr title="but non goal">???</abbr></td><td>SomeTimes <abbr title="but non goal">???</abbr></td><td>Yes <abbr title="Almost all the time and it&#039;s design goal">???</abbr></td></tr><tr><th>Correctly balanced nominal and structural typing</th><td>No <abbr title="Only structural typing even for classes and primitive types">???</abbr></td><td>Yes</td><td>Yes</td></tr><tr><th>Objects are not assignable to primitive types</th><td>No non-goal</td><td>Yes</td><td>Yes</td></tr><tr><th>Library of type definitions</th><td>Good <a href="https://github.com/DefinitelyTyped/DefinitelyTyped">DefinitelyTyped</a></td><td>There is something <a href="https://github.com/flow-typed/flow-typed">flow-typed</a></td><td>Same as TypeScript</td></tr><tr><th>Ability to enforce no extra props</th><td>SomeTimes but it's <a href="https://stackoverflow.com/a/54775885/1946607">hacky</a></td><td>Yes By Default</td><td>Yes By Default</td></tr><tr><th>Attempt to prevent runtime TypeErrors</th><td>No non-goal</td><td>Mostly it's design goal</td><td>Mostly it's design goal</td></tr><tr><th>Type guards</th><td>Yes but no inference and no analysis of implementation</td><td>No <abbr title="there is &#039;%checks&#039; syntax that does not work for most use cases">???</abbr></td><td>No</td></tr><tr><th>Assertion functions</th><td>Yes <abbr title="but no inference and no analysis of implementation">???</abbr></td><td>No [object Object] <abbr title="but there is hacky solution that sometimes can be useful">???</abbr></td><td>No</td></tr><tr><th>Conditional types</th><td>Yes</td><td>No [object Object] <abbr title="but there is hacky solution for some use cases">???</abbr></td><td>No</td></tr></tbody></table>

## Contribution

feel free to open issue or pull request to point out any mistake (like missing punctuation or typo) or mission/inaccurate information.
