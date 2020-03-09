


const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector("nav");

function toggleMenu() {
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
    } else {
        menu.classList.add("open");
    }
}

hamburger.addEventListener('click', toggleMenu);



/* 
const linkBox = document.getElementById('linkBox')
const form = document.getElementById('form')

// const url = document.getElementById('url')

form.addEventListener("submit", e => {
    e.preventDefault();
    checkInput();
});


function checkInput(e) {
    const link = document.getElementById('link')
    

    if (link.value === '') {
        linkBox.classList.add('error')
    } else if (!validURL(link.value)) {
        linkBox.classList.add('error')
    } else {
        linkBox.classList.remove('error')
    }
}


 
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }







async function fetchData(url) {
    try {
        const req = await fetch("https://rel.ink/api/links/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({url: url})
        });
        const res = await req.json();
        return res;
    } catch (error) {
        alert(error)
    }
} */


const urlShortenForm = document.querySelector(".urlShortenForm");
const urlShortenInput = document.querySelector(".urlShortenInput");
const resultsContainer = document.querySelector(".urlShortenResults");

const storageName = "linkStorage";

urlShortenInput.addEventListener("input", inputValidation);
urlShortenForm.addEventListener("submit", formValidation);
burgerIcon.addEventListener("click", showNavBar);

if (localStorage.getItem(storageName) !== null) {
  const linksStorage = JSON.parse(localStorage.getItem(storageName));
  for (let link in linksStorage) {
    if (linksStorage.hasOwnProperty(link)) {
      const hash = linksStorage[link];
      setTemplate(resultsContainer, hash, link);
    }
  }
}

function inputValidation() {
  const inputVal = urlShortenInput.value,
    invalidInput = invalidValue(inputVal);
  if (invalidInput) {
    setError(urlShortenForm, invalidInput);
    return false;
  }
  removeError(urlShortenForm);
  return inputVal;
}

async function formValidation(e) {
  e.preventDefault();
  const inputValid = inputValidation();
  if (inputValid) {
    const { hashid } = await fetchData(inputValid);
    setStorage(hashid, inputValid, storageName);
    setTemplate(resultsContainer, hashid, inputValid);
  }
}

function invalidValue(val) {
  if (!testLen(val) && !testPattern(val)) {
    return false;
  }
  if (testLen(val)) {
    return testLen(val);
  }
  if (testPattern(val)) {
    return testPattern(val);
  }
}

function testLen(val) {
  if (val.length) {
    return false;
  }
  return "Please add a link";
}

function testPattern(val) {
  const urlMatch = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
    val
  );
  if (urlMatch) {
    return false;
  }
  return "Url must be the format http(s)://*.*";
}

function setError(node, msg) {
  const errorClassName = "error",
    formAttr = "data-error";
  node.classList.add(errorClassName);
  // через атрибут формы пробрасываем текст ошибки, которая выводится через свойство псевдоэлемента form:after { content: attr(data-error) }
  node.setAttribute(formAttr, msg);
}

function removeError(node) {
  node.classList.remove("error");
}

async function fetchData(url) {
  try {
    const req = await fetch("https://rel.ink/api/links/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url })
    });
    const res = await req.json();
    return res;
  } catch (error) {
    alert(error);
  }
}

function setStorage(hash, link, storageName) {
  const dataStorage = JSON.parse(localStorage.getItem(storageName)) || {};
  localStorage.setItem(
    storageName,
    JSON.stringify({ ...dataStorage, [link]: hash })
  );
}

function setTemplate(container, hashid, inputValid) {
  const template = getTemplate(hashid, inputValid);
  container.append(template);
}

function getTemplate(hashid, oldUrl) {
  const container = document.createElement("div");
  container.className = "url-actions_result";
  const newUrl = createUrl(hashid);
  const template = `
    <p class="url-actions_input-data">${oldUrl}</p>
    <div class="url-result-container">
      <a href="${newUrl}" class="url-actions_output-data outputUrl"
        >${newUrl}</a
      >
      <button class="r_primary-btn copyBtn">Copy</button>
    </div>
  `;
  container.innerHTML = template;
  container.addEventListener("click", copyHandler.bind(null, newUrl));
  return container;
}

function createUrl(hashid) {
  return `https://rel.ink/${hashid}`;
}

function copyHandler(url, e) {
  const target = e.target;
  if (target.matches(".copyBtn")) {
    target.classList.add("violet");
    target.innerHTML = "Copied!";
    navigator.clipboard.writeText(url);
  }
  return;
}