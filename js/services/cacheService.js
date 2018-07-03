const cache = new Map();

export const set = (id, data) => {
  cache.set(id, data);
  return data;
};

export const get = id => {
  if (!id) {
    const result = [];
    cache.forEach((value, key) => result.push(value));
    return result;
  } else if (cache.has(id)) return [cache.get(id)];
};

export const remove = (id, data) => {
  if (!id) {
    cache.clear();
  } else if (cache.has(id)) return cache.delete(id);
};

window.cache = cache;
