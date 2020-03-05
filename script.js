


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
            body: JSON.stringiffy({url: url})
        });
        const res = await req.json();
        return res;
    } catch (error) {
        alert(error)
    }
}