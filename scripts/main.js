async function fetchDataAndDisplay(pageNumber) {
    try {

        const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`);
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
            createCardItem(data.data);
            createPagination(data);
        }
    } catch (error) {
        console.error('Error', error);
    }
}
function createCardItem(data) {
    let cardContainer = document.getElementById('user-list');
    cardContainer.innerHTML = null;
    if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('col-md-4', 'mb-4');
            const card = document.createElement('div');
            card.classList.add('card', 'user-item');
            card.setAttribute('data-user-id', data[i].id);
            card.addEventListener('click', function () {
                showUserDetail(data[i])
            });
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            const img = document.createElement('img');
            img.src = data[i].avatar;
            img.classList.add('user-img')
            const username = document.createElement('p');
            username.classList.add('card-text', 'user-name');
            username.textContent = data[i].first_name + ' ' + data[i].last_name;
            const user_email = document.createElement('p');
            user_email.classList.add('user-email');
            user_email.textContent = data[i].email;
            const btn_area = document.createElement('div')
            const review_btn = document.createElement('btn');
            review_btn.classList.add('btn', 'primary-btn', 'w-50', 'mt-4');
            review_btn.textContent = 'Review';
            btn_area.appendChild(review_btn)
            btn_area.classList.add('text-center')
            cardBody.appendChild(img)
            cardBody.appendChild(username);
            cardBody.appendChild(user_email);
            cardBody.appendChild(btn_area)
            card.appendChild(cardBody);
            cardDiv.appendChild(card);
            cardContainer.appendChild(cardDiv);
        }
    }
}
function createPagination(data) {
    const prevButton = document.createElement('button');
    prevButton.classList.add('btn', 'primary-btn', 'mx-3', 'next-btn');
    prevButton.innerHTML = '<i class="bi bi-chevron-left"></i>';
    prevButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            fetchDataAndDisplay(currentPage)
        }
    });
    const nextButton = document.createElement('button');
    nextButton.classList.add('btn', 'primary-btn', 'mx-3', 'prev-btn');
    nextButton.innerHTML = '<i class="bi bi-chevron-right"></i>';
    nextButton.addEventListener('click', function () {
        if (currentPage < data.total_pages) {
            currentPage++;
            fetchDataAndDisplay(currentPage)
        }
    });
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    let total_pages = data.total_pages;
    let currentPage = data.page;
    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');
    prevLi.appendChild(prevButton);
    pagination.appendChild(prevLi);
    for (let i = 1; i <= total_pages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item', i === currentPage ? 'active' : '.');
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = i;
        if (i === currentPage) {
            li.classList.add('active');
        }
        a.addEventListener('click', function (event) {
            const activePage = pagination.querySelector('.page-item.active');
            if (activePage) {
                activePage.classList.remove('active');
            }
            currentPage = i;
            li.classList.add('active');
            fetchDataAndDisplay(currentPage)
        });
        li.appendChild(a);
        pagination.appendChild(li);
    }
    const nextLi = document.createElement('li');
    nextLi.classList.add('page-item');
    nextLi.appendChild(nextButton);
    pagination.appendChild(nextLi);
}
function showUserDetail(user) {
    const userId = user?.id;
    window.location.href = `detail.html?userId=${userId}`;
}

document.addEventListener('DOMContentLoaded', function () {
    var pageNumber = 1
    fetchDataAndDisplay(pageNumber);
    let registerFormBtn = document.getElementById('createMemberBtn')
    if (registerFormBtn) {
        registerFormBtn.addEventListener('click', function () {
            window.location.href = 'register.html'
        });
    }
});
