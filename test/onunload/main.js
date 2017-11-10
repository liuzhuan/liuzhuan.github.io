window.addEventListener('beforeunload', function(e){
    console.log('do something!');

    document.body.style.background = 'steelblue'

    const msg = 'Please Don\'t Go!'
    e.returnValue = msg
    return msg
})