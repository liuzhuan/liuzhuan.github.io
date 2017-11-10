(function(){
    const first = document.querySelector('#first')
    const second = document.querySelector('#second')
    const result = document.querySelector('.js_result')

    if (!window.Worker) return;

    const myWorker = new Worker('worker.js')
    first.onchange = sendToWorker
    second.onchange = sendToWorker
    myWorker.onmessage = function(e) {
        result.textContent = e.data
    }
    
    function sendToWorker() {
        myWorker.postMessage([first.value, second.value])
    }
})()