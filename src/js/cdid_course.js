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

    var OtherActivityItems = document.querySelectorAll('li:not(.modtype_assign) > div.activity-item')

    for ( activity of OtherActivityItems ) {
        let check = document.createElement('input');
        check.type = 'checkbox';
        check.className = 'cdid-checkbox';  
        activity.appendChild(check);

        check.addEventListener('click', async (evt) => {
            if ( evt.target.checked ) {
                activityID = evt.target.parentElement.parentElement.dataset.id;
                activityStatus = 1;
                evt.target.parentElement.style.backgroundColor = '#cfefcf';
            } else {
                activityID = evt.target.parentElement.parentElement.dataset.id;
                activityStatus = 0;
                evt.target.parentElement.style.backgroundColor = 'initial';
            }

            var otheractivities = await readLocalStorage('otheractivities');
        
            for (let i = 0; i < otheractivities.length; i++) {
                const oActivity = otheractivities[i];
                
                if ( oActivity.id == activityID ) {
                    otheractivities.splice(i, 1);
                }
            }
            
            otheractivities.push({
                'id': activityID,
                'status': activityStatus
            });
            
            chrome.storage.local.set({ 'otheractivities': otheractivities });
            console.log(otheractivities);
        })

        var otheractivities = await readLocalStorage('otheractivities');
        
        for (let i = 0; i < otheractivities.length; i++) {
            const oActivity = otheractivities[i];

            if ( activity.parentElement.dataset.id == oActivity.id && oActivity.status ) {
                activity.style.backgroundColor = '#cfefcf';
                check.checked = true;
            }
        }
    }
}


main();
