export function objectsEqual (obj1, obj2) {
  return Object.keys(obj1).every(p => obj1[p] === obj2[p])
}
