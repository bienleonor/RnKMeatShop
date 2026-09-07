export async function nextId(model) {
  const result = await model.aggregate({ _max: { id: true } });
  return (result._max.id ?? 0) + 1;
}
