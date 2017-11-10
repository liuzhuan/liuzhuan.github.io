window.addEventListener('beforeunload', function(e){
    console.log('do something!');

    const msg = 'Please Don\'t Go!'
    e.returnValue = msg
    return msg
})