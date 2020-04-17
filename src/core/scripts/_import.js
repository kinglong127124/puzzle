export default async (type, name, modulesMap) => {
  const _import = await import("./_import_" + process.env.NODE_ENV);
  let product = await _import.default(type, name, modulesMap);
  return product.default;
};
