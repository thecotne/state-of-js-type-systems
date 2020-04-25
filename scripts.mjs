import * as https from 'https'
import * as fs from 'fs'
import * as github from './github.mjs'


const YesByDefault = 'Yes By Default'
const Yes = 'Yes'
const Mostly = 'Mostly'
const SomeTimes = 'SomeTimes'
const Unusable = 'Unusable'
const No = 'No'
const NoNonGoal = 'No non-goal'

const TypeScriptRepo = 'microsoft/TypeScript'
const FlowRepo = 'facebook/flow'

async function* rows () {
  yield [
    "Type safe try/catch/throw",
    A(No, await issue(TypeScriptRepo, 13219)),
    A(No, await issue(FlowRepo, 2470)),
    A(Yes)
  ]
  yield [
    "Immutability",
    A(Unusable, await issue(TypeScriptRepo, 13347)),
    A(Yes),
    A(Yes)
  ]
  yield [
    "Type inference",
    A(SomeTimes, null, 'Variable declaration, call back functions (Contextual Typing), function return type'),
    A(Mostly, null, 'Everything that ts has + function arguments (if local to module) but no generics'),
    A(Yes, null, 'Even generics')
  ]
  yield [
    "Enforce use of function return value",
    A(No),
    A(No, await issue(FlowRepo, 3914)),
    A(Yes)
  ]
  yield [
    "Prevent implicit type conversion",
    A(SomeTimes, null, 'but non goal'),
    A(SomeTimes, null, 'but non goal'),
    A(Yes, null, "Almost all the time and it's design goal")
  ]
  yield [
    "Correctly balanced nominal and structural typing",
    A(No, null, 'Only structural typing even for classes and primitive types'),
    A(Yes),
    A(Yes)
  ]
  yield [
    "Objects are not assignable to primitive types",
    A(NoNonGoal),
    A(Yes),
    A(Yes)
  ]
  yield [
    "Library of type definitions",
    A('Good', link('DefinitelyTyped', 'https://github.com/DefinitelyTyped/DefinitelyTyped')),
    A('There is something', link('flow-typed', 'https://github.com/flow-typed/flow-typed')),
    A('Same as TypeScript')
  ]
  yield [
    "Ability to enforce no extra props",
    A(SomeTimes, `but it's ${link('hacky', 'https://stackoverflow.com/a/54775885/1946607')}`),
    A(YesByDefault),
    A(YesByDefault)
  ]
  yield [
    "Attempt to prevent runtime TypeErrors",
    A(NoNonGoal),
    A(Mostly, `it's design goal`),
    A(Mostly, `it's design goal`)
  ]
  yield [
    "Type guards",
    A(Yes, 'but no inference and no analysis of implementation'),
    A(No, null, `there is '%checks' syntax that does not work for most use cases`),
    A(No)
  ]
  yield [
    "Assertion functions",
    A(Yes, null, 'but no inference and no analysis of implementation'),
    A(No, issue(FlowRepo, 112), `but there is hacky solution that sometimes can be useful`),
    A(No)
  ]
  yield [
    "Conditional types",
    A(Yes),
    A(No, issue(FlowRepo, 6055), `but there is hacky solution for some use cases`),
    A(No)
  ]
}

export function escapeHtml(text) {
  return (
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  )
}

async function fetch(method, hostname, path, headers) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      port: 443,
      path,
      method,
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36',
        ...headers
      }
    }

    const req = https.request(options, (res) => {
      if (!res.statusCode) {
        reject(new Error('no statusCode!'))
        return
      }
      if (res.statusCode > 299 && res.statusCode < 200) {
        reject(new Error(`statusCode not 2xx! (it was ${res.statusCode})`))
        return
      }

      res.setEncoding('utf8')

      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', (err) => void reject(err))
    req.end()
  })
}


function link (text, href, title = null) {
  const attrs = []

  attrs.push(`href="${escapeHtml(href)}"`)

  if (title) {
    attrs.push(`title="${escapeHtml(title)}"`)
  }

  return `<a ${attrs.join(' ')}>${escapeHtml(text)}</a>`
}

async function issue (repo, issueId) {
  const data = await fetch(
    'GET',
    'api.github.com',
    `/repos/${repo}/issues/${issueId}`,
    {
      Authorization: `token ${github.token}`
    }
  )

  const date_display = (new Date(data.created_at)).toLocaleString('en-US', {
    day: "numeric",
    month: "short",
    year: "numeric"
  })

  return link(
    // `#${issueId} since ${date_display}`,
    `#${issueId}`,
    `https://github.com/${repo}/issues/${issueId}`,
    data.title
  )
}

function A(answer, link = null, description = null) {
  return { answer, link, description }
}

async function asyncGenToArray (iterator) {
  const arr = []

  for await (const entry of iterator) {
    arr.push(entry)
  }

  return arr
}

async function* table(titles, rows) {
  yield `<table>`
  yield `<thead>`
  yield `<tr>`
  for (const title of titles) {
    yield `<th>${title}</th>`
  }
  yield `</tr>`
  yield `</thead>`
  yield `<tbody>`
  for (const row of rows) {
    yield `<tr>`
    yield `<td><b>${row[0]}</b></td>`
    for (const cell of row.slice(1)) {
      yield `<td>`
      yield cell.answer

      if (cell.link) {
        yield `, ${cell.link}`
      }

      if (cell.description) {
        yield `, ${abbr('???', cell.description)}`
      }

      yield `</td>`
    }
    yield `</tr>`
  }
  yield `</tbody>`
  yield `</table>`
}

function abbr (text, description) {
  return `<u>${link(text, '#', description)}</u>`
  // return `<abbr title="${escapeHtml(description)}">${escapeHtml(text)}</abbr>`
}

async function asyncGenToString (iterator) {
  let str = []

  for await (const entry of iterator) {
    str += entry.toString()
  }

  return str
}

async function dumpReadme () {
  const template = fs.readFileSync('./readme.template.md').toString()
  const rows = JSON.parse(fs.readFileSync('typeSystem.json').toString())

  const typeSystemTable = await asyncGenToString(table(
    ['Criteria', 'TypeScript', 'Flow', 'Hegel'], rows
  ))

  const text = template.replace('%typeSystemTable%', typeSystemTable)

  fs.writeFileSync('readme.md', text)
}

async function dumpTypeSystemJSON() {
  fs.writeFileSync('typeSystem.json', JSON.stringify(await asyncGenToArray(rows()), null, '  '))
}

if (process.argv[2] === 'readme') {
  dumpReadme()
} else if (process.argv[2] === 'json') {
  dumpTypeSystemJSON()
} else if (process.argv[2] === 'both') {
  (async () => {
    await dumpTypeSystemJSON()
    await dumpReadme()
  })()
}
