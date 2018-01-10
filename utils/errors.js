/* eslint-disable  import/prefer-default-export */

export function consoleError(error='ERROR!', label='error:') {
  return console.warn(`${label} ${error}`)
}
