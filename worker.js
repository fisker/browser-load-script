function createWorker(onLoad) {
  const workerCode = /* indent */ `
    self.onmessage = function (event) {
      const source = event.data
      self.importScripts(source)

      try {
        const result = (${onLoad.toString()})(self)
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

function loadScript(source, onLoad) {
  const worker = createWorker(onLoad)
  worker.postMessage(source)

  return new Promise(function (resolve, reject) {
    worker.addEventListener('message', ({data}) => {
      resolve(data)
    })

    worker.addEventListener('error', ({message}) => {
      worker.terminate()
      reject(new Error(message))
    })
  })
}

export default loadScript
