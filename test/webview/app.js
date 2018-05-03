init()

function $(el) {
    return document.querySelector(el)
}

function init() {
    var $foo = $('.foo')
    $foo.onclick = function() {
        console.log('click foo ' + Date.now())
        invokeWxapp()
    }
}

function invokeWxapp() {
    console.log('invoke wxapp')
    wx.miniProgram.postMessage({ data: { foo: 'foobar' } })
}