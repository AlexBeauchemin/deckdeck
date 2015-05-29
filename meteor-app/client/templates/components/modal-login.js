Template.modalLogin.events({
    "submit form": function (event) {
        var email = event.target.email.value.trim(),
            password = event.target.password.value.trim();

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                Session.set('login-error', 'error shake');
                Materialize.toast(error.reason, 5000);
                return;
            }

            $('#modal-login').closeModal();
        });

        return false;
    }
});