const getFinalObjectAndKeyForKeyPath = ({ object, keyPath }) => {
  const keys = keyPath.split(".");
  const length = keys.length - 1;

  let o = object;

  for (let i = 0; i < length; i += 1) {
    const key = keys[i];

    if (!o[key]) {
      o[key] = {};
    }

    o = o[key];
  }

  return { object: o, key: keys[length] };
};

const setValueForKeyPath = ({ object, value, keyPath }) => {
  const { object: o, key } = getFinalObjectAndKeyForKeyPath({
    object,
    keyPath,
  });
  o[key] = value;
};

const propertyArrayToObject = (properties) => {
  if (!Array.isArray(properties)) {
    return properties;
  }

  const object = {};

  for (const { name, value } of properties) {
    setValueForKeyPath({ object, value, keyPath: name });
  }

  return object;
};

export default propertyArrayToObject;
