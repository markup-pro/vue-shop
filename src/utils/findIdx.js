export function findIdx (arr, key, value) {
  return arr.findIndex(x => x[key] === value)
}
