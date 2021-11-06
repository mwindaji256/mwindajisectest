function myFunction() {
    // Get the checkbox
    var checkBox = document.getElementById('myCheck');
    // Get the output text
    var text = document.getElementById('text');

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        text.style.display = 'block';
    } else {
        text.style.display = 'none';
    }
}

const validate = () => {
    const username = document.registration.bandname;
    const stagename = document.registration.stagename;
    const email = document.registration.email;
    const owner = document.registration.owner;
    const home = document.registration.home;
    const members = document.registration.members;
    const formation = document.registration.formation;
    const slogan = document.registration.slogan;
    const sponsors = document.registration.sponsors;
    const icon = document.registration.bandicon;
    const bandimage = document.registration.bandimage;
    const albums = document.registration.albums;
    const bandid = document.registration.bandid;
    const zip = document.registration.zip;
    const location = document.registration.location;
    const nin = document.registration.nin;

    const id = /^[0-9a-zA-Z]+$/;
    const userName = /^[A-Za-z]+$/;
    const emailType = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const capital = /^[A-Z]+$/;

    const alphaNumeric = /^[a-zA-Z0-9]+$/;
    const systemIDFormat = /^[a-z]{3}\d+[a-z]{3}/;
    const nationalIDFormat = /^[A-Z]{2}\d+[A-Z]{3}/;
    const phoneFormat = /^\d{12}$/;
    const twitterFormat = /(^|[^@\w])@(\w{1,15})\b/;
    const emailFormat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    const nonumber = /^[A-Za-z]+$/;
    const capitalize = /^[A-Z][a-z]/;

    if (username.value == '') {
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name-error').innerText =
            'Please provide an email';
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

    if (username.value.match(userName)) {
        username.style.border = '2px solid green';
    } else {
        username.focus();
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name-error').innerText =
            'Please provide a valid name with characters and numbers';
        document.getElementById('name-error').style.color = 'red';
        username.style.border = '2px solid red';
        return false;
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

    if (owner.value == '') {
        document.getElementById('owner-error').style.display = 'block';
        document.getElementById('owner-error').innerText =
            'Please provide a name of the owner';
        document.getElementById('owner-error').style.color = 'red';
        owner.focus();
        owner.style.border = '2px solid red';
        return false;
    } else {
        owner.style.border = '2px solid green';
        document.getElementById('owner-error').style.display = 'none';
    }

    if (owner.value.length < 2) {
        document.getElementById('owner-error').style.display = 'block';
        document.getElementById('owner-error').innerText =
            'Owner should be longer than one character';
        document.getElementById('owner-error').style.color = 'red';
        owner.focus();
        owner.style.border = '2px solid red';
        return false;
    } else {
        owner.style.border = '2px solid green';
        document.getElementById('owner-error').style.display = 'none';
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

    if (home.value == '') {
        document.getElementById('home-error').style.display = 'block';
        document.getElementById('home-error').innerText =
            'Please provide a name of the home';
        document.getElementById('home-error').style.color = 'red';
        home.focus();
        home.style.border = '2px solid red';
        return false;
    } else {
        home.style.border = '2px solid green';
        document.getElementById('home-error').style.display = 'none';
    }

    if (members.value == '') {
        document.getElementById('members-error').style.display = 'block';
        document.getElementById('members-error').innerText =
            'Please provide a number of the band members';
        document.getElementById('members-error').style.color = 'red';
        members.focus();
        members.style.border = '2px solid red';
        return false;
    } else {
        members.style.border = '2px solid green';
        document.getElementById('members-error').style.display = 'none';
    }

    var checkBox = document.getElementById('myCheck');
    if (checkBox.checked == true) {
        if (sponsors.value == '') {
            document.getElementById('sponsors-error').style.display = 'block';
            document.getElementById('sponsors-error').innerText =
                'Please provide a sponsors for the band';
            document.getElementById('sponsors-error').style.color = 'red';
            sponsors.focus();
            sponsors.style.border = '2px solid red';
            return false;
        } else {
            sponsors.style.border = '2px solid green';
            document.getElementById('sponsors-error').style.display = 'none';
        }
    } else {
        document.getElementById('sponsors-error').style.display = 'none';
    }

    if (slogan.value == '') {
        document.getElementById('slogan-error').style.display = 'block';
        document.getElementById('slogan-error').innerText =
            'Please provide a slogan for the band';
        document.getElementById('slogan-error').style.color = 'red';
        slogan.focus();
        slogan.style.border = '2px solid red';
        return false;
    } else {
        slogan.style.border = '2px solid green';
        document.getElementById('slogan-error').style.display = 'none';
    }

    if (albums.value == '') {
        document.getElementById('albums-error').style.display = 'block';
        document.getElementById('albums-error').innerText =
            'Please provide a albums for the band';
        document.getElementById('albums-error').style.color = 'red';
        albums.focus();
        albums.style.border = '2px solid red';
        return false;
    } else {
        albums.style.border = '2px solid green';
        document.getElementById('albums-error').style.display = 'none';
    }

    if (icon.value == '') {
        document.getElementById('icon-error').style.display = 'block';
        document.getElementById('icon-error').innerText =
            'Please provide an image';
        document.getElementById('icon-error').style.color = 'red';
        icon.focus();
        icon.style.border = '2px solid red';
        return false;
    } else {
        icon.style.border = '2px solid green';
        document.getElementById('icon-error').style.display = 'none';
    }

    if (bandimage.value == '') {
        document.getElementById('image-error').style.display = 'block';
        document.getElementById('image-error').innerText =
            'Please provide a band image';
        document.getElementById('image-error').style.color = 'red';
        bandimage.focus();
        bandimage.style.border = '2px solid red';
        return false;
    } else {
        bandimage.style.border = '2px solid green';
        document.getElementById('image-error').style.display = 'none';
    }
    if (bandid.value == '') {
        document.getElementById('bandid-error').style.display = 'block';
        document.getElementById('bandid-error').innerText =
            'Please provide a band image';
        document.getElementById('bandid-error').style.color = 'red';
        bandid.focus();
        bandid.style.border = '2px solid red';
        return false;
    } else {
        bandid.style.border = '2px solid green';
        document.getElementById('bandid-error').style.display = 'none';
    }
};
