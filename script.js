document.getElementById('login-link').addEventListener('click', function() {

    // Simulate a login process

    document.getElementById('login-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'inline';
});

document.getElementById('logout-link').addEventListener('click', function() {

    // Simulate a logout process

    document.getElementById('login-link').style.display = 'inline';
    document.getElementById('logout-link').style.display = 'none';
});

document.querySelectorAll('.appointment-link').forEach(element => {
    element.addEventListener('click', function(event) {
        event.preventDefault(); 

        // Redirect to the appointment page (this page doesn't exist yet)


        alert('Redirecting to appointment page...');

    });
});
