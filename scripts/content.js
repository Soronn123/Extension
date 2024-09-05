let dataGlobal = {"key": "value"};


async function setTodb() {
    await chrome.storage.local.set({"titles": dataGlobal})
}


async function getIndb() {
    let s = await chrome.storage.local.get(["titles"])
    return s.titles
}

async function addTodata(key, value) {
    dataGlobal[key] = value
}

async function loadStorage() {
    let s = await getIndb()

    for(let key in s)
    {
        addTodata(key, s[key])
    }
}


async function getrequest(key) {
    const response = await fetch(`https://api.remanga.org/api/titles/${key}/`)
    const data = response.json()
    return data


}


async function getNameTitles(href) {
    let newName = ""
    for (let index = href.length - 1; -1 < index; index--) {
        if (href[index] == "/"){
            break;
        }
        newName = href[index] + newName
        
    }
    return newName
}


async function getdes(key) {
    let desc = dataGlobal[key]
    if (desc != undefined) { return desc }

    let data = await getrequest(key)
    data["content"]["description"] = data["content"]["description"].replace(/<[^>]*>/g, '');
    if (data["msg"] == "") 
    { 
        await addTodata(key, data["content"]["description"] )
        return data["content"]["description"] 
    }

    return "error"
}


async function main() 
{
    console.log("ya tyt")
    await loadStorage()
    let elementParseA = document.querySelectorAll('a');
    let name;
    let des;

    try {
        for (let index = 0; index < elementParseA.length; index++) 
        {
            let onelement = elementParseA[index]
            if (onelement.classList[0] != "Vertical_card__Qez7E") { continue }
            
            name = await getNameTitles(onelement.href)
            des = await getdes(name)

            onelement.title = name + "/////////" + des
        }
        await setTodb()
        console.log("yspex")
    } catch (error) {
        console.log(error)
        console.log("proval")
    }
    
}



main()