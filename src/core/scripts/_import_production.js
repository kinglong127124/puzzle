var loadjs = require("loadjs");

export default (type, name, modulesMap) =>
  new Promise((resolve, reject) => {
    loadjs(
      `./${type}/${name}/${name}${
        modulesMap[name] ? "." + modulesMap[name] : ""
      }.js`,
      {
        success: () => {
          window.PRODUCT_SUCCESS = window.PRODUCT_SUCCESS || [];
          window.PRODUCT_SUCCESS.push(name);
          resolve({ default: window[type + "_" + name].default });
        },
        error: err => {
          window.PRODUCT_FAILURE = window.PRODUCT_FAILURE || [];
          window.PRODUCT_FAILURE.push(name);
          reject(err);
        }
      }
    );
  });
