const validate = () => {
    const username = document.registration.username;
    const profile = document.registration.profile;
    const area = document.registration.area;
    const email = document.registration.email;
    const dob = document.registration.dob;
    const gender = document.registration.gender;
    const albums = document.registration.albums;
    const contact = document.registration.contact;
    const comedianid = document.registration.comedianid;
    const img = document.registration.image;
    const startdate = document.registration.startdate;
    const zip = document.registration.zip;
    const location = document.registration.location;
    const nin = document.registration.nin;

    const id = /^[0-9a-zA-Z]+$/;
    const userName = /^[A-Za-z]+$/;
    const emailType = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const capital = /^[A-Z]+$/;
    const nationalIDFormat = /^[A-Z]{2}\d+[A-Z]{3}/;
    const systemIDFormat = /^[a-z]{3}\d+[a-z]{3}/;

    if (username.value == '') {
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name-error').innerText =
            'Please provide a username';
        document.getElementById('name-error').style.color = 'red';
        username.focus();
        username.style.border = '2px solid red';
        return false;
    } else {
        username.style.border = '2px solid green';
        document.getElementById('name-error').style.display = 'none';
    }
    if (username.value.length < 2) {
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name-error').innerText =
            'Name should be longer than one character';
        document.getElementById('name-error').style.color = 'red';
        username.focus();
        username.style.border = '2px solid red';
        return false;
    } else {
        username.style.border = '2px solid green';
        document.getElementById('name-error').style.display = 'none';
    }

    const myArr = username.value.split(' ');
    var check = 0;
    console.log(myArr.length);
    for (let index = 0; index < myArr.length; index++) {
        if (
            (myArr[index].charAt(0) === myArr[index].charAt(0).toUpperCase()) ==
            true
        ) {
            check++;
        }
    }
    if (check != myArr.length) {
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name-error').innerText =
            'All names should be capital';
        document.getElementById('name-error').style.color = 'red';
        username.focus();
        username.style.border = '2px solid red';
        return false;
    } else {
        username.style.border = '2px solid green';
        document.getElementById('name-error').style.display = 'none';
    }
    console.log(check);



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
        document.getElementById('name-error').style.display = 'none';
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

    if (area.value == '') {
        document.getElementById('area-error').style.display = 'block';
        document.getElementById('area-error').innerText =
            'Please provide a stage name';
        document.getElementById('area-error').style.color = 'red';
        area.focus();
        area.style.border = '2px solid red';
        return false;
    } else {
        area.style.border = '2px solid green';
        document.getElementById('area-error').style.display = 'none';
    }

    if (gender.value == '') {
        document.getElementById('gender-error').style.display = 'block';
        document.getElementById('gender-error').innerText =
            'Please pick a gender';
        document.getElementById('gender-error').style.color = 'red';

        return false;
    } else {
        document.getElementById('gender-error').style.display = 'none';
    }

    if (nin.value == '') {
        document.getElementById('nin-error').style.display = 'block';
        document.getElementById('nin-error').innerText = 'Please provide a NIN';
        document.getElementById('nin-error').style.color = 'red';
        nin.focus();
        nin.style.border = '2px solid red';
        return false;
    } else {
        nin.style.border = '2px solid green';
        document.getElementById('nin-error').style.display = 'none';
    }

    if (nin.value.match(nationalIDFormat)) {
        document.getElementById('nin-error').style.display = 'none';
        nin.style.border = '2px solid green';
    } else {
        nin.focus();
        document.getElementById('nin-error').style.display = 'block';
        document.getElementById('nin-error').innerText =
            'Please provide a valid national id';
        document.getElementById('nin-error').style.color = 'red';
        nin.style.border = '2px solid red';
        return false;
    }

    if (location.value == '') {
        document.getElementById('location-error').style.display = 'block';
        document.getElementById('location-error').innerText =
            'Please provide a location';
        document.getElementById('location-error').style.color = 'red';
        location.focus();
        location.style.border = '2px solid red';
        return false;
    } else {
        location.style.border = '2px solid green';
        document.getElementById('location-error').style.display = 'none';
    }

    if (img.value == '') {
        document.getElementById('image-error').style.display = 'block';
        document.getElementById('image-error').innerText =
            'Please provide an image';
        document.getElementById('image-error').style.color = 'red';
        img.focus();
        img.style.border = '2px solid red';
        return false;
    } else {
        img.style.border = '2px solid green';
        document.getElementById('image-error').style.display = 'none';
    }

    if (contact.value == '') {
        document.getElementById('contact-error').style.display = 'block';
        document.getElementById('contact-error').innerText =
            'Please provide a contact';
        document.getElementById('contact-error').style.color = 'red';
        contact.focus();
        contact.style.border = '2px solid red';
        return false;
    } else {
        contact.style.border = '2px solid green';
        document.getElementById('contact-error').style.display = 'none';
    }


    if (comedianid.value == '') {
        document.getElementById('comedianid-error').style.display = 'block';
        document.getElementById('comedianid-error').innerText =
            'Please provide an id';
        document.getElementById('comedianid-error').style.color = 'red';
        comedianid.focus();
        comedianid.style.border = '2px solid red';
        return false;
    } else {
        comedianid.style.border = '2px solid green';
        document.getElementById('comedianid-error').style.display = 'none';
    }
    if (comedianid.value.match(systemIDFormat)) {
        document.getElementById('comedianid-error').style.display = 'none';
        comedianid.style.border = '2px solid green';
    } else {
        comedianid.focus();
        document.getElementById('comedianid-error').style.display = 'block';
        document.getElementById('comedianid-error').innerText =
            'Please provide a valid id';
        document.getElementById('comedianid-error').style.color = 'red';
        comedianid.style.border = '2px solid red';
        return false;
    }


    if (profile.value == '') {
        document.getElementById('profile-error').style.display = 'block';
        document.getElementById('profile-error').innerText =
            'Please provide a profile';
        document.getElementById('profile-error').style.color = 'red';
        profile.focus();
        profile.style.border = '2px solid red';
        return false;
    } else {
        profile.style.border = '2px solid green';
        document.getElementById('profile-error').style.display = 'none';
    }
    return true;
};
