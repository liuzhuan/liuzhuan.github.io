onmessage = function(e) {
    console.log('[web workers]:', e.data)
    const result = e.data[0] * e.data[1]
    postMessage('Result is: ' + result)
}