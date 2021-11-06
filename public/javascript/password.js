const validate = () => {
    const password1 = document.passwordChange.password1;
    const password2 = document.passwordChange.password2;

    if (password1.value == '') {
        document.getElementById('password1-error').style.display = 'block';
        document.getElementById('password1-error').innerText =
            'Please provide a password';
        document.getElementById('password1-error').style.color = 'red';
        password1.focus();
        password1.style.border = '2px solid red';
        return false;
    } else {
        password1.style.border = '2px solid green';
        document.getElementById('password1-error').style.display = 'none';
    }

    if (password2.value == '') {
        document.getElementById('password2-error').style.display = 'block';
        document.getElementById('password2-error').innerText =
            'Please re-enter your password';
        document.getElementById('password2-error').style.color = 'red';
        password2.focus();
        password2.style.border = '2px solid red';
        return false;
    } else {
        password2.style.border = '2px solid green';
        document.getElementById('password2-error').style.display = 'none';
    }

    if (password1.value !== password2.value) {
        document.getElementById('password1-error').style.display = 'block';
        document.getElementById('password1-error').innerText =
            'Your passwords should match';
        document.getElementById('password1-error').style.color = 'red';
        password1.focus();
        password1.style.border = '2px solid red';
        password2.style.border = '2px solid red';
        return false;
    } else {
        password1.style.border = '2px solid green';
        document.getElementById('password1-error').style.display = 'none';

        password2.style.border = '2px solid green';
        document.getElementById('password2-error').style.display = 'none';
    }
};
