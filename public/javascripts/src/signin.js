class Signin {
    addKid() {
        let kid = {
            firstName : $('#firstName').val(),
            lastName : $('#lastName').val(),
            street : $('#street').val(),
            city : $('#city').val(),
            state : $('#state').val(),
            zip : $('#zip').val(),
            dateOfBirth : $('#dateOfBirth').val(),
            school : $('#school').val()
        };

        $.ajax({
            url: '/kids/add',
            dataType: 'json',
            type: 'POST',
            data: kid,
            success: data => {
                return data;
            }.bind(this),
            error: (xhr, status, err) => {
                console.error('/kids/add', status, err.toString());
            }.bind(this)
        });
    }

    getKids() {
        $.ajax({
            url: '/kids/',
            dataType: 'json',
            type: 'GET',
            success: data => {
                return data;
            }.bind(this),
            error: (xhr, status, err) => {
                console.error('/kids/', status, err.toString());
            }.bind(this)
        });
    }
}

export default Signin;
