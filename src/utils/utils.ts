export function getPrimitivesArrayFromNestedCollection(
  collection,
  typeToSearch
) {
  let result: any[] = [];
  const toArray =
    collection instanceof Array ? collection : Object.values(collection);

  for (const item of toArray) {
    if (typeof item === typeToSearch) {
      result.push(item);
    } else {
      result = [
        ...result,
        ...getPrimitivesArrayFromNestedCollection(item, typeToSearch)
      ];
    }
  }
  return result;
}
