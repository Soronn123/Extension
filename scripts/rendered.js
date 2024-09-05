async function getIndb(key) {
    let s = await chrome.storage.local.get([key])
    return s.titles
}


async function main() {
    let json = document.getElementById('json')
    let count = 0
    let data = await getIndb("titles")
    for (let key in data) 
    {
        json.innerHTML += key
        json.innerHTML += " : "
        json.innerHTML += data[key]
        json.innerHTML += "<br />"
        json.innerHTML += "<br />"
        count += 1
    }
    document.getElementById('count').innerHTML = `Count : ${count}`
}

// chrome.storage.local.set({"titles": {"key": "value"}})
main()