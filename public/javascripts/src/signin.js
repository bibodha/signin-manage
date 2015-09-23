class Signin {
    addKid() {
        let firstName = $('#firstName').val();
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
        })
    }
}

export default Signin;
