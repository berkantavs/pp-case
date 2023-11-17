document.addEventListener('DOMContentLoaded', function () {
    createRegisterForm()
});
function createRegisterForm() {
    let registerContainer = document.getElementById('registerContainer');
    let registerForm = document.getElementById('registerForm')
    if (registerForm) {
        const card = document.createElement('div');
        card.classList.add('card');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'register-card');
        const cardTitle = document.createElement('span')
        cardTitle.classList.add('register-card-title')
        cardTitle.textContent = 'Create Member';
        cardBody.appendChild(cardTitle)
        const registerFormWrapper = document.createElement('form')
        registerFormWrapper.id = 'registerForm';
        const nameInputWrapper = document.createElement('div')
        nameInputWrapper.classList.add('name-input-wrapper')
        var nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "name";
        nameInput.name = "name";
        nameInput.placeholder = "name";
        nameInput.required = true;
        nameInputWrapper.appendChild(nameInput)
        registerFormWrapper.appendChild(nameInputWrapper);
        const jobInputWrapper = document.createElement('div')
        jobInputWrapper.classList.add('job-input-wrapper')
        var jobInput = document.createElement("input");
        jobInput.type = "text";
        jobInput.id = "job";
        jobInput.name = "job";
        jobInput.required = true;
        jobInput.placeholder = "job";
        jobInputWrapper.appendChild(jobInput)
        registerFormWrapper.appendChild(jobInputWrapper);
        cardBody.appendChild(registerFormWrapper)
        let createButtonArea = document.createElement('div')
        let createButton = document.createElement('button')
        createButton.classList.add('btn', 'create-btn')
        createButton.textContent = 'Create';
        createButton.type = 'submit';
        createButton.addEventListener('click', function () {
            setMember()
        });
        createButtonArea.appendChild(createButton)
        cardBody.appendChild(createButtonArea)
        let backButtonArea = document.createElement('div')
        let backButton = document.createElement('button')
        backButton.classList.add('btn', 'back-btn', 'mt-3')
        backButton.textContent = 'Back';
        backButton.addEventListener('click', function () {
            window.location.href = 'index.html'
        });
        backButtonArea.appendChild(backButton)
        cardBody.appendChild(backButtonArea)
        card.appendChild(cardBody)
        registerForm.appendChild(card)
        registerContainer.appendChild(registerForm)
    }
}
async function setMember() {
    if (validateForm()) {
        var name = document.getElementById("name").value;
        var job = document.getElementById("job").value;
        let payload = {
            name: name,
            job: job
        }
        const response = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if (response && response.status == 201) {
            alert('Başarıyla Oluşturuldu.')
        }
    }
}
function validateForm() {
    let isValid = true;

    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === "") {
        isValid = false;
    }

    const jobInput = document.getElementById('job');
    if (jobInput.value.trim() === "") {
        isValid = false;
    }
    return isValid;
}