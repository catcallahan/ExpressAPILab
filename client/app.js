$(document).ready(() => {
    fetchChirps();
    $('#chirpButton').click((e) => {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });

        let dataObj = {
            user: $('#usernameInput').val(),
            text: $('#textInput').val(),
        }
        $.post('/api/chirps', JSON.stringify(dataObj));
        fetchChirps();
        $('#usernameInput').val('');
        $('#textInput').val('');
    });

});


const fetchChirps = () => {
    $('#chirps-container').empty()
    $.get('/api/chirps/', (chirps) => {
        delete chirps.nextid
        let writeArr = Object.entries(chirps);
        writeArr.reverse();
        writeArr.forEach(chirp => {
            $('#chirps-container').append(`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${chirp[1].user}</h5>
                <p class="card-text">${chirp[1].text}</p>
                <a href="#" class="btn btn-primary" onClick = "deleteChirp(${chirp[0]})">Delete</a>
                <a href="#" class="btn btn-primary" data-toggle= "modal" data-target= "#modal${chirp[0]}">Edit Post</a>
                </div>
                <div class="modal" id = "modal${chirp[0]}" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                       <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${chirp[1].user}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                 </button>
                            </div>
                        <div class="modal-body">
                        <textarea id = "updateTextArea">${chirp[1].text}</textarea>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick = "updateChirp(${chirp[0]}, '${chirp[1].user}')">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>`);
        });
    });
};

const deleteChirp = id => {
    $.ajax({
        url: `/api/chirps/${id}`,
        method: "delete",
        success: function (result) {
            console.log(result)
        }
    });
    fetchChirps();
};

const updateChirp = (id, user) => {

    $.ajaxSetup({
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    let dataObj = {
        user: user,
        text: $('#updateTextArea').val(),
    }

    $.ajax({
        url: `/api/chirps/${id}`,
        method: 'put',
        data: JSON.stringify(dataObj),
        success: function (result) {
            console.log(result)
        }
    });
    $(`.modal-backdrop`).remove();
    fetchChirps();
};