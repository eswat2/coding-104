//
// Array of [Id, Name, State, Parent], Parent=0 is the root
//
//
const input001 = [
  [1, 'Biology', 'Ready', 0],
  [2, 'Cells', 'Ready', 1],
  [3, 'Cell Structure', 'Ready', 2],
  [4, 'Cell Membranes', 'Draft', 2],
  [5, 'Metabolism', 'Draft', 2],
  [6, 'Genetics', 'Ready', 1],
  [7, 'Reproduction', 'Draft', 6],
  [8, 'Stages of Meiosis', 'Ready', 7],
  [9, 'Genetic Diversity', 'Draft', 7],
  [10, 'Genetic Disorders', 'Draft', 7],
  [11, 'Genes', 'Draft', 6],
  [12, 'DNA', 'Ready', 6]
]

function convert(item) {
  const id = item[0]
  const title = item[1]
  const status = item[2]
  const parent = item[3]
  const children = []
  const obj = { id, title, status, parent }

  return obj
}

function prune(list) {
  const validIds = []
  const items = []

  list.forEach((obj) => {
    if (obj.parent == 0) {
      validIds.push(obj.id)
      items.push(obj)
    } else {
      if (validIds.includes(obj.parent)) {
        validIds.push(obj.id)
        items.push(obj)
      }
    }
  })

  return items
}

function consume(input) {
  const list = input.map((item) => {
    return convert(item)
  }).filter((node) => {
    return node.status == 'Ready'
  }).sort(function(a, b) {
    return a.parent - b.parent;
  })

  return list
}

const list = consume(input001)
const ready = prune(list)

console.log(list)
console.log(ready)

ready.forEach((item) => {
  console.log('-- ', item.title)
})
