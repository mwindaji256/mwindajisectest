const validate = () => {
    const username = document.registration.username;
    const stagename = document.registration.stagename;
    const profile = document.registration.profile;
    const area = document.registration.area;
    const email = document.registration.email;
    const dob = document.registration.dob;
    const gender = document.registration.gender;
    const albums = document.registration.albums;
    const contact = document.registration.contact;
    const artistid = document.registration.artistid;
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

    if (stagename.value == '') {
        document.getElementById('stage-error').style.display = 'block';
        document.getElementById('stage-error').innerText =
            'Please provide a stagename';
        document.getElementById('stage-error').style.color = 'red';
        stagename.focus();
        stagename.style.border = '2px solid red';
        return false;
    } else {
        stagename.style.border = '2px solid green';
        document.getElementById('stage-error').style.display = 'none';
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

    if (contact.value == '') {
        document.getElementById('contact-error').style.display = 'block';
        document.getElementById('contact-error').innerText =
            'Please provide a profile';
        document.getElementById('contact-error').style.color = 'red';
        contact.focus();
        contact.style.border = '2px solid red';
        return false;
    } else {
        contact.style.border = '2px solid green';
        document.getElementById('contact-error').style.display = 'none';
    }

    if (albums.value == '') {
        document.getElementById('albums-error').style.display = 'block';
        document.getElementById('albums-error').innerText =
            'Please provide a username';
        document.getElementById('albums-error').style.color = 'red';
        albums.focus();
        albums.style.border = '2px solid red';
        return false;
    } else {
        albums.style.border = '2px solid green';
        document.getElementById('albums-error').style.display = 'none';
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

const validate_update = () => {
    const username = document.updateform.name;
    const stagename = document.updateform.stagename;
    const profile = document.updateform.profile;
    const area = document.updateform.area;
    const albums = document.updateform.albums;
    const contact = document.updateform.contact;
    const location = document.updateform.location;
    const nin = document.updateform.nin;
    const artistid = document.updateform.artistid;

    const artistIDFormat = /^[a-z]{3}\d+[a-z]{3}/;
    const nationalIDFormat = /^[A-Z]{2}\d+[A-Z]{3}/;

    // getting all forms
    const elForms = [...document.getElementsByName('updateform')];

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

    if (stagename.value == '') {
        document.getElementById('stage-error').style.display = 'block';
        document.getElementById('stage-error').innerText =
            'Please provide a stagename';
        document.getElementById('stage-error').style.color = 'red';
        stagename.focus();
        stagename.style.border = '2px solid red';
        return false;
    } else {
        stagename.style.border = '2px solid green';
        document.getElementById('stage-error').style.display = 'none';
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

    if (contact.value == '') {
        document.getElementById('contact-error').style.display = 'block';
        document.getElementById('contact-error').innerText =
            'Please provide a profile';
        document.getElementById('contact-error').style.color = 'red';
        contact.focus();
        contact.style.border = '2px solid red';
        return false;
    } else {
        contact.style.border = '2px solid green';
        document.getElementById('contact-error').style.display = 'none';
    }

    if (artistid.value == '') {
        document.getElementById('artistid-error').style.display = 'block';
        document.getElementById('artistid-error').innerText =
            'Please provide a profile';
        document.getElementById('artistid-error').style.color = 'red';
        artistid.focus();
        artistid.style.border = '2px solid red';
        return false;
    } else {
        artistid.style.border = '2px solid green';
        document.getElementById('artistid-error').style.display = 'none';
    }

    if (artistid.value.match(artistIDFormat)) {
        document.getElementById('artistid-error').style.display = 'none';
        artistid.style.border = '2px solid green';
    } else {
        artistid.focus();
        document.getElementById('artistid-error').style.display = 'block';
        document.getElementById('artistid-error').innerText =
            'Please provide a valid national id';
        document.getElementById('artistid-error').style.color = 'red';
        artistid.style.border = '2px solid red';
        return false;
    }

    if (albums.value == '') {
        document.getElementById('albums-error').style.display = 'block';
        document.getElementById('albums-error').innerText =
            'Please provide a username';
        document.getElementById('albums-error').style.color = 'red';
        albums.focus();
        albums.style.border = '2px solid red';
        return false;
    } else {
        albums.style.border = '2px solid green';
        document.getElementById('albums-error').style.display = 'none';
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
}
