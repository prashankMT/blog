import isPlainObject from "is-plain-object";

export const handleQueryStringForApi = apiUrls => {
  const getUrl = (url, query) => {
    if (!query) return url;
    return `${url}?${query}`;
  };

  for (const [key, func] of Object.entries(apiUrls)) {
    apiUrls[key] = (() => {
      return options => {
        if (options && options.query) {
          let urlObj = func(options);
          urlObj.url = getUrl(urlObj.url, QueryString.stringify(options.query));
          return urlObj;
        }
        return func(options);
      };
    })();
  }
  return apiUrls;
};

export const reload = url => {
  location.href = url;
};

export function isObject(x) {
	return isPlainObject(x);
}
