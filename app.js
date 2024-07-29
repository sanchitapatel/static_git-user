window.onload = function() {
    // Add animation using GSAP for the h1 text
    const h1Text = document.querySelector('h1');
    gsap.from(h1Text, {
        duration: 0.5,
        opacity: 0,
        y: -50,
        ease: "power3.out"
    });
};

function animateErrorMsg(elementId) {
    const errorMsg = document.getElementById(elementId);
    gsap.from(errorMsg, {
        duration: 0.5,
        opacity: 0,
        x: 100, // Move from right
        ease: "power3.out"
    });
}

function getUserData() {
    const username = document.getElementById('username').value;
    if (username === '') {
        document.getElementById('emptyErrorMsg').innerHTML = 'Please enter a GitHub username';
        document.getElementById('emptyErrorMsg').style.display = 'inline-block';
        setTimeout(() => {
            document.getElementById('emptyErrorMsg').style.display = 'none';
        }, 3000);
        animateErrorMsg('emptyErrorMsg'); // Animate empty error message
        return;
    }

    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            const name = data.name;
            const login = data.login;
            const avatar = data.avatar_url;
            const followers = data.followers;
            const following = data.following;
            const public_repos = data.public_repos;
            const location = data.location;

            document.getElementById('name').innerHTML = name;
            document.getElementById('userName').innerHTML = login;
            document.getElementById('avatar').src = avatar;
            document.getElementById('followers').innerHTML = followers;
            document.getElementById('following').innerHTML = following;
            document.getElementById('public_repos').innerHTML = public_repos;
            if (location) {
                document.getElementById('location').innerHTML = location;
            } else {
                document.getElementById('location').innerHTML = 'Location not found';
            }       

            const userData = document.getElementById('userData');
            gsap.from(userData, {
                duration: 0.5,
                opacity: 0,
                y: 100,
                ease: "power3.out"
            });
            
            userData.classList.add('show');
        })
        .catch(error => {
            if (error.message === 'User not found') {
                const notFoundErrorMsg = document.getElementById('notFoundErrorMsg');
                notFoundErrorMsg.innerHTML = 'User not found!';
                notFoundErrorMsg.style.display = 'inline-block';
                setTimeout(() => {
                    notFoundErrorMsg.style.display = 'none';
                }, 3000);
                animateErrorMsg('notFoundErrorMsg');
            }
        });
}