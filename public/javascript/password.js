//Validate passwords when updating.
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

//Validating artist update
const check = () => {
    const stagename = document.updateArtist.stagename;
    const albums = document.updateArtist.albums;
    const capitalize = /^[A-Z][a-z]/;

    if (stagename.value == '') {
        document.getElementById('stagename-error').style.display = 'block';
        document.getElementById('stagename-error').innerText =
            'Please provide a stagename';
        document.getElementById('stagename-error').style.color = 'red';
        stagename.focus();
        stagename.style.border = '2px solid red';
        return false;
    } else if (!stagename.value.match(capitalize)) {
        document.getElementById('stagename-error').style.display = 'block';
        document.getElementById('stagename-error').innerText =
            'Stage name should start with capital letters';
        document.getElementById('stagename-error').style.color = 'red';
        stagename.focus();
        stagename.style.border = '2px solid red';
        return false;

    } else {
        stagename.style.border = '2px solid green';
        document.getElementById('stagename-error').style.display = 'none';
    }

    if (albums.value == '') {
        document.getElementById('albums-error').style.display = 'block';
        document.getElementById('albums-error').innerText =
            'Please provide the number of your albums';
        document.getElementById('albums-error').style.color = 'red';
        albums.focus();
        albums.style.border = '2px solid red';
        return false;
    } else {
        albums.style.border = '2px solid green';
        document.getElementById('albums-error').style.display = 'none';
    }
}

//Validating band update
const checkBand = () => {
    const bandname = document.updateband.bandname;
    const members = document.updateband.members;

    const alphaNumeric = /^[a-zA-Z0-9]+$/;
    const capitalize = /^[A-Z][a-z]/;


    if (bandname.value == '') {
        document.getElementById('bandname-error').style.display = 'block';
        document.getElementById('bandname-error').innerText =
            'Please provide a bandname';
        document.getElementById('bandname-error').style.color = 'red';
        bandname.focus();
        bandname.style.border = '2px solid red';
        return false;
    } else if (!bandname.value.match(capitalize)) {
        document.getElementById('bandname-error').style.display = 'block';
        document.getElementById('bandname-error').innerText =
            'Band name should start with capital letters';
        document.getElementById('bandname-error').style.color = 'red';
        bandname.focus();
        bandname.style.border = '2px solid red';
        return false;

    } else {
        bandname.style.border = '2px solid green';
        document.getElementById('bandname-error').style.display = 'none';
    }

    if (members.value == '') {
        document.getElementById('members-error').style.display = 'block';
        document.getElementById('members-error').innerText =
            'Please provide the number of your members';
        document.getElementById('members-error').style.color = 'red';
        members.focus();
        members.style.border = '2px solid red';
        return false;
    } else {
        members.style.border = '2px solid green';
        document.getElementById('members-error').style.display = 'none';
    }
}

//Check comedian update
const checkComedian = () => {
    const stagename = document.updatecomedian.stagename;
    const area = document.updatecomedian.area;

    const alphaNumeric = /^[a-zA-Z0-9]+$/;
    const capitalize = /^[A-Z][a-z]/;
    const noNumber = /^[A-Za-z]+$/;

    if (stagename.value == '') {
        document.getElementById('stagename-error').style.display = 'block';
        document.getElementById('stagename-error').innerText =
            'Please provide a stagename';
        document.getElementById('stagename-error').style.color = 'red';
        stagename.focus();
        stagename.style.border = '2px solid red';
        return false;
    } else if (!stagename.value.match(capitalize)) {
        document.getElementById('stagename-error').style.display = 'block';
        document.getElementById('stagename-error').innerText =
            'Stage name should start with capital letters';
        document.getElementById('stagename-error').style.color = 'red';
        stagename.focus();
        stagename.style.border = '2px solid red';
        return false;

    } else {
        stagename.style.border = '2px solid green';
        document.getElementById('stagename-error').style.display = 'none';
    }

    if (area.value == '') {
        document.getElementById('area-error').style.display = 'block';
        document.getElementById('area-error').innerText =
            'Please provide an area';
        document.getElementById('area-error').style.color = 'red';
        area.focus();
        area.style.border = '2px solid red';
        return false;
    } else if (!area.value.match(noNumber)) {
        document.getElementById('area-error').style.display = 'block';
        document.getElementById('area-error').innerText =
            'Should have no numbers';
        document.getElementById('area-error').style.color = 'red';
        area.focus();
        area.style.border = '2px solid red';
        return false;

    } else {
        area.style.border = '2px solid green';
        document.getElementById('area-error').style.display = 'none';
    }
}
