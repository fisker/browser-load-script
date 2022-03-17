const setAttributes = (element, attributes) => {
  if (!attributes) {
    return
  }

  for (const attribute in attributes) {
    if (!Object.prototype.hasOwnProperty.call(attributes, attribute)) {
      continue
    }

    element.setAttribute(attribute, attributes[attribute])
  }
}

function loadScript(source, options) {
  const {head} = document
  const script = document.createElement('script')

  const {attributes, keepScriptElement} = {
    keepScriptElement: false,
    ...options,
  }

  setAttributes(script, attributes)

  script.src = source

  return new Promise(function (resolve, reject) {
    script.addEventListener(
      'load',
      () => {
        if (!keepScriptElement) {
          head.removeChild(script)
        }
        resolve(script)
      },
      false,
    )

    script.addEventListener(
      'error',
      () => {
        head.removeChild(script)
        reject(new Error(`Failed to load script: ${source}`))
      },
      false,
    )

    head.appendChild(script)
  })
}

export default loadScript
