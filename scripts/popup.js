const grabBtn = document.getElementById("Btnprint");
grabBtn.addEventListener("click",() => {
    let newUrl = "templates/rendered.html"
    chrome.tabs.create({url: newUrl})
})
