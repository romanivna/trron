if (window.location.search === '?=settings') {
    document.querySelector(`.user-content-${window.location.search.slice(2)}`).style.display = 'flex'
}

auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log('LogIn');
        (async function () {
            window.userId = await auth.getUid();
            await database.ref('users').child(user.uid)
                .once('value', (snap) => window.objOfUserData = snap.val());
            await storage.ref('users/' + user.uid + '/images').child('userProfilePhoto.jpg')
                .getDownloadURL().then((url) => {
                    document.querySelector('.user-info-profile-photo').innerHTML = `<img src = ${url}>`;
                    document.querySelector('.user-info-profile-name').innerHTML = `<p>${objOfUserData.firstName}</p>`;
                })
        })();
    } else {
        console.log('logOut')
    }
});


function update() {
    const userName = document.querySelector('#newUserName').value;
    const photoFile = document.querySelector('#photoFile').files[0];
    if (userName.trim() !== '') {
        objOfUserData.firstName = userName;
        database.ref('users').child(userId).set(objOfUserData);
    }

    if (photoFile !== undefined) {
        storage.ref('users/' + userId + '/images/userProfilePhoto.jpg').put(photoFile)
    }

}



// function hide(element) {
//     event.preventDefault()
//     console.log(element.classList.add('active'))
// }

// function uploadFile() {
//     const file = document.getElementById('fileToUpload').files[0];
//     objOfUserData.avatarUrl = 'avatar.jpg';
//     auth.onAuthStateChanged(function (user) {
//         storage.ref('users/' + userId + '/images/userProfilePhoto.jpg').put(file).on('state_changed', snapshot => {
//             console.log((~~snapshot
//                 .bytesTransferred / snapshot.totalBytes) * 100)
//         });
//     })
// };

// function getfile() {
//     storage.ref('mp3').child('Rock-Paper-ScissorsLittleBig.mp3').getDownloadURL().then(url => window.open(url,
//         'Download'))
// }
// window.myUid


// function writeUserData() {
//     auth.onAuthStateChanged(function (user) {
//         database.ref('users').child(userId).set(objOfUserData);
//     })
// }