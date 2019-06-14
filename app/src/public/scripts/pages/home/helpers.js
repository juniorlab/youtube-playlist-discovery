// https://developer.mozilla.org/ru/docs/Web/API/FormData/FormData
export function formDataToJSON(formData) {
  const object = {};
  formData.forEach((value, key) => {
    object[key] = String(value);
  });
  return object;
}

/**
 * Возвращает объект с параметрами из url
 * @example
 *
 *     const parameters = getURLParams('https://example.com?param1=foo&param2=bar')
 *     console.log(parameters)
 *
 *     >>> {
 *       param1: 'foo',
 *       param2: 'bar',
 *     }
 */
export function getURLParams(url) {
  const params = {};
  let paramsString = url.split('?')[1];
  if (!paramsString) {
    return params;
  }
  for (const pair of paramsString.split('&')) {
    const [key, value] = pair.split('=');
    params[key] = value;
  }
  return params;
}
