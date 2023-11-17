document.addEventListener('DOMContentLoaded', function () {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('userId');
    if (userId) {
        getUserDetail(userId)
    }
});
async function getUserDetail(userId) {
    let userData = null;
    try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`);
        const data = await response.json();
        if (data && data.data) {
            userData = data.data;
            createUserDetail(userData)
        }
    } catch (error) {
        console.error('Error', error);
    }
}
function createUserDetail(userData) {
    const userDetailContainer = document.getElementById('userDetailContainer');
    const userDetail = document.getElementById('userDetail');
    const card = document.createElement('div');
    card.classList.add('card');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const img = document.createElement('img');
    img.src = userData.avatar;
    img.classList.add('user-img')
    const username = document.createElement('p');
    username.classList.add('card-text', 'user-name');
    username.textContent = userData.first_name + ' ' + userData.last_name;
    const user_email = document.createElement('p');
    user_email.classList.add('user-email');
    user_email.textContent = userData.email;
    const button_area = document.createElement('div');
    const back_button = document.createElement('button')
    back_button.classList.add('btn', 'primary-btn', 'w-25')
    back_button.innerText = 'Back';
    button_area.appendChild(back_button)
    back_button.addEventListener('click', function () {
        closeUserDetail()
    });
    cardBody.appendChild(img)
    cardBody.appendChild(username);
    cardBody.appendChild(user_email);
    cardBody.appendChild(button_area)

    card.appendChild(cardBody)

    userDetail.appendChild(card)
    userDetailContainer.appendChild(userDetail)
}
function closeUserDetail() {
    window.location.href = 'index.html'
}