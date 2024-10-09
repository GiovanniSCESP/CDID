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

    chrome.storage.local.get(['assignments']).then((result) => {
        if ( !result.assignments ) {
            chrome.storage.local.set({ 'assignments': [] });
        }
    });

    var AssignActivityItems = document.querySelectorAll('li.modtype_assign div.activity-item');

    if ( AssignActivityItems ) {
        var assignments = await readLocalStorage('assignments');

        for (let i = 0; i < AssignActivityItems.length; i++) {
            const assignItem = AssignActivityItems[i];
            
            itemID = assignItem.querySelector('a').href.split('id=')[1];

            assignments.forEach(assignment => {
                if ( assignment.id == itemID && assignment.status ) {
                    assignItem.style.backgroundColor = '#cfefcf';
                }
            });
        }
    }
}


main();
