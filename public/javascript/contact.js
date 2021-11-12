console.log('Hello')
const validate = () => {
    console.log('There')
    const name = document.contact.name;
    const subject = document.contact.subject;
    const message = document.contact.message;
    const email = document.contact.email;

    const emailType = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const userName = /^[A-Za-z]+$/;

    if (name.value == '') {
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name-error').innerText =
            'Please provide your name';
        document.getElementById('name-error').style.color = 'red';
        name.focus();
        name.style.border = '2px solid red';
        return false;
    } else {
        name.style.border = '2px solid green';
        document.getElementById('name-error').style.display = 'none';
    }


    if (email.value == '') {
        document.getElementById('email-error').style.display = 'block';
        document.getElementById('email-error').innerText =
            'Please provide an email';
        document.getElementById('email-error').style.color = 'red';
        email.focus();
        email.style.border = '2px solid red';
        return false;
    } else {
        email.style.border = '2px solid green';
        document.getElementById('email-error').style.display = 'none';
    }

    if (email.value.match(emailType)) {
        document.getElementById('email-error').style.display = 'none';
        email.style.border = '2px solid green';
    } else {
        email.focus();
        document.getElementById('email-error').style.display = 'block';
        document.getElementById('email-error').innerText =
            'Please provide a valid email';
        document.getElementById('email-error').style.color = 'red';
        email.style.border = '2px solid red';
        return false;
    }

    if (subject.value == '') {
        document.getElementById('subject-error').style.display = 'block';
        document.getElementById('subject-error').innerText =
            'Please provide a subject';
        document.getElementById('subject-error').style.color = 'red';
        subject.focus();
        subject.style.border = '2px solid red';
        return false;
    } else {
        subject.style.border = '2px solid green';
        document.getElementById('subject-error').style.display = 'none';
    }

    if (message.value == '') {
        document.getElementById('message-error').style.display = 'block';
        document.getElementById('message-error').innerText =
            'Please provide a message';
        document.getElementById('message-error').style.color = 'red';
        message.focus();
        message.style.border = '2px solid red';
        return false;
    } else {
        message.style.border = '2px solid green';
        document.getElementById('message-error').style.display = 'none';
    }

    return true;
}