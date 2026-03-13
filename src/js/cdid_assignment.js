const extensionApi = globalThis.browser ?? globalThis.chrome;

const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        extensionApi.storage.local.get([key], function (result) {
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

    extensionApi.storage.local.get(['assignments']).then((result) => {
        if ( !result.assignments ) {
            extensionApi.storage.local.set({ 'assignments': [] });
        }
    });
    
    var submittedStatusElement = document.querySelector('td.submissionstatussubmitted');

    if (submittedStatusElement) {
        var submissionStatus = 1
    } else {
        var submissionStatus = 0
    }

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var urlAssignmentID = urlParams.get('id');

    if ( urlParams.get('action') == 'editsubmission' ) {
        return;
    }

    var assignments = await readLocalStorage('assignments');
    
    for (let i = 0; i < assignments.length; i++) {
        const assignment = assignments[i];
        
        if ( assignment.id == urlAssignmentID ) {
            assignments.splice(i, 1);
        }
    }
    
    assignments.push({
        'id': urlAssignmentID,
        'status': submissionStatus
    });
    
    extensionApi.storage.local.set({ 'assignments': assignments })

    childText = document.createTextNode(' (CDID)');
    if ( submittedStatusElement ) {submittedStatusElement.appendChild(childText);}
    
    console.log(`SubmissionStatus ${submissionStatus}`);
    console.log('Lista elementos', assignments);
    console.log('Elemento añadido', urlAssignmentID, submissionStatus);
}


main();
