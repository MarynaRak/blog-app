const posts = [];

const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 200;

const titleInputNode = document.querySelector('.js-title-input');
const textInputNode = document.querySelector('.js-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const outputTitleValidationMessage = document.querySelector('.js-title-validation-message');
const outputTextValidationMessage = document.querySelector('.js-text-validation-message');
const disabledButton = document.querySelector('button');


newPostBtnNode.addEventListener('click', function () {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();

    clearInput();

});

titleInputNode.addEventListener('input', function () {
    titleValidation();
    validationDisableBtn();
});
textInputNode.addEventListener('input', function () {
    textValidation();
    validationDisableBtn();
});

function titleValidation() {
    const titleLength = titleInputNode.value.length;
    const inputTitleContent = TITLE_VALIDATION_LIMIT - titleLength;

    if (titleLength === 0) {
        outputTitleValidationMessage.innerText = ``;
    }
    else if (titleLength <= TITLE_VALIDATION_LIMIT) {
        outputTitleValidationMessage.innerText = `Осталось ${inputTitleContent} символов`;
        outputTitleValidationMessage.classList.remove("validation-message-red");

    } else {
        outputTitleValidationMessage.innerText = `Длина заголовка не может быть более ${TITLE_VALIDATION_LIMIT} символов`;
        outputTitleValidationMessage.classList.add("validation-message-red");
    };

}

function textValidation() {
    const textLength = textInputNode.value.length;
    const inputTextContent = TEXT_VALIDATION_LIMIT - textLength;


    if (textLength === 0) {
        outputTextValidationMessage.innerText = ``;
    }
    else if (textLength <= TEXT_VALIDATION_LIMIT) {
        outputTextValidationMessage.innerText = `Осталось ${inputTextContent} символов`;
        outputTextValidationMessage.classList.remove("validation-message-red");
    }
    else {
        outputTextValidationMessage.innerText = `Длина текста не может быть более ${TEXT_VALIDATION_LIMIT} символов`;
        outputTextValidationMessage.classList.add("validation-message-red");
    };
}

function validationDisableBtn() {


    if ((textInputNode.value.length > TEXT_VALIDATION_LIMIT) || (titleInputNode.value.length > TITLE_VALIDATION_LIMIT)) {
        disabledButton.setAttribute('disabled', 'disabled');
        disabledButton.classList.add('disabled-btn');
    } else {
        disabledButton.removeAttribute('disabled', 'disabled');
        disabledButton.classList.remove('disabled-btn');
    };

}

function clearInput() {

    titleInputNode.value = '';
    textInputNode.value = '';
    outputTitleValidationMessage.innerText = '';
    outputTextValidationMessage.innerText = '';
};


function clearEmptySumbol(letName) {
    letName.value = '';
}


function getPostFromUser() {
    const title = titleInputNode.value.trim();
    const text = textInputNode.value.trim();
    const date = dateOutput();

    if (title == 0) {
        disabledButton.setAttribute('disabled', 'disabled');
        outputTitleValidationMessage.innerText = 'Нужно ввести заголовок';
        clearEmptySumbol(titleInputNode);
        return
    }


    if (text == 0) {
        disabledButton.setAttribute('disabled', 'disabled');
        outputTextValidationMessage.innerText = 'Нужно ввести текст';
        clearEmptySumbol(textInputNode);
        return
    } else {
        outputTextValidationMessage.innerText = '';
    };

    return {
        title: title,
        text: text,
        date: date
    };
}

function addPost({ title, text, date }) {

    posts.push({
        title: title,
        text: text,
        date: date
    });
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
        <div class='post'>
            <p class='post-date'>${post.date}</p>
            <p class='post-title'>${post.title}</p>
            <p class='post-text'>${post.text}</p>
        </div>
       `;
    });

    postsNode.innerHTML = postsHTML;
}

function zeroFirstFormat(value) {
    if (value < 10) {
        value = '0' + value;
    }
    return value;
}

function dateOutput() {
    const currentDate = new Date();

    const day = zeroFirstFormat(currentDate.getDate());
    const month = zeroFirstFormat(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    const hour = zeroFirstFormat(currentDate.getHours());
    const minute = zeroFirstFormat(currentDate.getMinutes());

    return `${day}.${month}.${year}, ${hour}:${minute}`;
}




