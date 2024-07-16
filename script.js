async function loadScript(properties) {
  if (typeof properties === 'string') {
    properties = {src: properties}
  }

  const {head} = document
  const script = Object.assign(document.createElement('script'), properties)

  function on(event, callback) {
    script.addEventListener(event, callback, {once: true, passive: true})
  }

  try {
    await new Promise((resolve, reject) => {
      on('load', resolve)

      on('error', () => {
        reject(new Error(`Failed to load script '${properties.src}'.`))
      })

      head.appendChild(script)
    })
  } finally {
    head.removeChild(script)
  }
}

export default loadScript
