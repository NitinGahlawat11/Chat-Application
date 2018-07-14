$(document).ready(function () {
    let inp=$('#inp');
    let btn =$('#btn');
    let socket=io();
    let result=$('#result');
display();
    btn.click(function () {
        let value= inp.val();
        socket.emit('message',value)   // message we have defined as per our wish and

    });
    socket.on('show',function (data) {
result.append(`<li>${data}</li>`);
    })

});