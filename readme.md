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

<table><thead><tr><th>Criteria</th><th>TypeScript</th><th>Flow</th><th>Hegel</th></tr></thead><tbody><tr><td><b>Type safe try/catch/throw</b></td><td>No, <a href="https://github.com/microsoft/TypeScript/issues/13219" title="Suggestion: `throws` clause and typed catch clause">#13219</a></td><td>No, <a href="https://github.com/facebook/flow/issues/2470" title="Doesn&#039;t check the type of an exception">#2470</a></td><td>Yes</td></tr><tr><td><b>Immutability</b></td><td>Unusable, <a href="https://github.com/microsoft/TypeScript/issues/13347" title="Interface with readonly property is assignable to interface with mutable property">#13347</a></td><td>Yes</td><td>Yes</td></tr><tr><td><b>Type inference</b></td><td>SomeTimes, <u><a href="#" title="Variable declaration, call back functions (Contextual Typing), function return type">???</a></u></td><td>Mostly, <u><a href="#" title="Everything that ts has + function arguments (if local to module) but no generics">???</a></u></td><td>Yes, <u><a href="#" title="Even generics">???</a></u></td></tr><tr><td><b>Enforce use of function return value</b></td><td>No</td><td>No, <a href="https://github.com/facebook/flow/issues/3914" title="Enforce use of function return">#3914</a></td><td>Yes</td></tr><tr><td><b>Prevent implicit type conversion</b></td><td>SomeTimes, <u><a href="#" title="but non goal">???</a></u></td><td>SomeTimes, <u><a href="#" title="but non goal">???</a></u></td><td>Yes, <u><a href="#" title="Almost all the time and it&#039;s design goal">???</a></u></td></tr><tr><td><b>Correctly balanced nominal and structural typing</b></td><td>No, <u><a href="#" title="Only structural typing even for classes and primitive types">???</a></u></td><td>Yes</td><td>Yes</td></tr><tr><td><b>Objects are not assignable to primitive types</b></td><td>No non-goal</td><td>Yes</td><td>Yes</td></tr><tr><td><b>Library of type definitions</b></td><td>Good, <a href="https://github.com/DefinitelyTyped/DefinitelyTyped">DefinitelyTyped</a></td><td>There is something, <a href="https://github.com/flow-typed/flow-typed">flow-typed</a></td><td>Same as TypeScript</td></tr><tr><td><b>Ability to enforce no extra props</b></td><td>SomeTimes, but it's <a href="https://stackoverflow.com/a/54775885/1946607">hacky</a></td><td>Yes By Default</td><td>Yes By Default</td></tr><tr><td><b>Attempt to prevent runtime TypeErrors</b></td><td>No non-goal</td><td>Mostly, it's design goal</td><td>Mostly, it's design goal</td></tr><tr><td><b>Type guards</b></td><td>Yes, but no inference and no analysis of implementation</td><td>No, <u><a href="#" title="there is &#039;%checks&#039; syntax that does not work for most use cases">???</a></u></td><td>No</td></tr><tr><td><b>Assertion functions</b></td><td>Yes, <u><a href="#" title="but no inference and no analysis of implementation">???</a></u></td><td>No, [object Object], <u><a href="#" title="but there is hacky solution that sometimes can be useful">???</a></u></td><td>No</td></tr><tr><td><b>Conditional types</b></td><td>Yes</td><td>No, [object Object], <u><a href="#" title="but there is hacky solution for some use cases">???</a></u></td><td>No</td></tr></tbody></table>

## Contribution

feel free to open issue or pull request to point out any mistake (like missing punctuation or typo) or mission/inaccurate information.
