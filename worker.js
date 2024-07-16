function createWorker(onLoad) {
  const workerCode = /* indent */ `
    self.onmessage = async function (event) {
      const {source} = event.data
      self.importScripts(source)

      try {
        const result = await (${onLoad.toString()}).call(self, self)
        self.postMessage(result)
      } finally {
        self.close();
      }
    }
  `

  const blob = new Blob([workerCode])
  const url = URL.createObjectURL(blob)
  const worker = new Worker(url)
  URL.revokeObjectURL(url)
  return worker
}

async function loadScript(source, onLoad) {
  const worker = createWorker(onLoad)

  const on = (event, callback) => {
    worker.addEventListener(event, callback, {once: true, passive: true})
  }

  try {
    return await new Promise((resolve, reject) => {
      on('message', ({data}) => {
        resolve(data)
      })

      on('error', ({message}) => {
        reject(new Error(message))
      })

      worker.postMessage({src: source})
    })
  } finally {
    worker.terminate()
  }
}

export default loadScript
