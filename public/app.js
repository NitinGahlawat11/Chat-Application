var username=prompt("Enter your username");

$(function(){
    var socket = io();
    $('#inp').keypress(function(e){
        if(e.keyCode===13)
            $('#btn').click();
    });
    $('#inp').focus(
        function(){
            $(this).val('');
        });
    $('#btn').click(function(){
        var input = $('#inp').val();
        socket.emit('receive_message', {user: username, input: input});
        $('#inp').val('');
    });

    socket.on('get', function(data, users){

        console.log(data);
        console.log('<li><span>'+data.user+'</span> <span>'+data.input+'</span></li>');
        var msg = '<li class="msg"><span class="name">'+data.user+': </span> <span class="main">'+data.input+'</span></li>';
        $('#messages').append(msg);
        var messgs = document.getElementById("messages");
        messgs.scrollTop = messgs.scrollHeight;
        var propValue;
        $('#users').html('');
        for(var propName in users) {
            propValue = '<li>'+users[propName]+'</li>';
            $('#users').append(propValue);
        }

    });
    socket.on('all', function(data, users){
        data.forEach(client =>{
            console.log(data);
            var msg = '<li class="msg"><span class="name">'+client.user+': </span> <span class="main">'+client.input+'</span></li>';
            $('#messages').append(msg);
        })
        var propValue;
        $('#users').html('');
        for(var propName in users) {
            propValue = '<li>'+users[propName]+'</li>';
            $('#users').append(propValue);
        }
    });
    socket.emit('username', username);


});