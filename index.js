function loadScript(source, options) {
  const {head} = document
  const script = document.createElement('script')

  const {attributes} = {...options}

  Object.assign(script, attributes)

  script.src = source

  return new Promise(function (resolve, reject) {
    script.addEventListener(
      'load',
      () => {
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
