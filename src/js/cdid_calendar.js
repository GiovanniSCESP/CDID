const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
        if (result[key] === undefined) {
            reject();
        } else {
            resolve(result[key]);
        }
        });
    });
}


async function main() {
    console.log('Se ejecuta main');

    chrome.storage.local.get(['assignments']).then((result) => { if ( !result.assignments ) {
            chrome.storage.local.set({ 'assignments': [] }); }
    });

    chrome.storage.local.get(['otheractivities']).then((result) => { if ( !result.otheractivities ) {
            chrome.storage.local.set({ 'otheractivities': [] }); }
    });
    
    eventItems = document.querySelectorAll('div.event');

    if ( eventItems ) {
        var assignments = await readLocalStorage('assignments');

        for (let i = 0; i < eventItems.length; i++) {
            const eventItem = eventItems[i];
            
            myRe = /id=([0-9]*)/g;
            itemURL = eventItem.querySelector('a.card-link').href;
            itemID = myRe.exec(itemURL)[1];

            assignments.forEach(assignment => {
                if ( assignment.id == itemID && assignment.status ) {
                    eventItem.querySelector('div.card-header').style.backgroundColor = '#cfefcf';
                    eventItem.querySelector('div.card-header').style.borderColor = '#cfefcf';
                }
            });
        }
    }
}


main();
