const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
        if (result[key] === undefined) {
            reject(new Error(`Missing key in local storage: ${key}`));
        } else {
            resolve(result[key]);
        }
        });
    });
}

// Función para encontrar y obtener todas las actividades | #modtype_assign
function findActivities() {
    const activities = [];
    
    // Buscar solo elementos li con clase modtype_assign
    const assignActivities = document.querySelectorAll('li.activity.modtype_assign');
    
    assignActivities.forEach(item => {
        const link = item.querySelector('a.aalink');
        if (link) {
            const activityData = {
                url: link.href,
                name: link.textContent.trim(),
                element: item
            };
            activities.push(activityData);
        }
    });
    
    return activities;
}

// Función para crear y agregar el botón de control
function createActivitiesButton() {
    const leftColumn = document.querySelector('div.columnleft.blockcolumn');
    
    if (!leftColumn) return;
    
    // Crear contenedor del botón
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'margin-bottom: 15px; padding: 10px; background: #f0f4f8; border: 2px solid #3478b0; border-radius: 5px;';
    
    // Crear botón principal
    const button = document.createElement('button');
    button.textContent = '▶ Revisar Actividades';
    button.style.cssText = `
        width: 100%;
        padding: 10px;
        background: #3478b0;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.3s;
    `;
    
    button.onmouseover = () => button.style.background = '#2559a3';
    button.onmouseout = () => button.style.background = '#3478b0';
    
    // Estado para controlar la navegación
    let activityTabs = [];
    let currentActivityIndex = 0;
    let isNavigating = false;
    
    // Click en botón principal
    button.onclick = async () => {
        const activities = findActivities();
        
        if (activities.length === 0) {
            alert('No se encontraron actividades modtype_assign.');
            return;
        }
        
        currentActivityIndex = 0;
        isNavigating = true;
        button.disabled = true;
        button.style.opacity = '0.5';
        button.textContent = `▶ Procesando...`;
        
        // Procesar cada actividad
        for (let i = 0; i < activities.length; i++) {
            const activity = activities[i];
            button.textContent = `▶ Procesando ${i + 1}/${activities.length}`;
            
            // Abrir en nueva pestaña
            const tab = window.open(activity.url, `cdid_activity_${i}`);
            
            // Esperar un poco y cerrar
            await new Promise(r => setTimeout(r, 1000));
            
            if (tab && !tab.closed) {
                tab.close();
            }
        }
        
        // Recargar la página actual
        button.textContent = `▶ Recargando...`;
        await new Promise(r => setTimeout(r, 400));
        window.location.reload();
    };
    
    buttonContainer.appendChild(button);
    leftColumn.insertBefore(buttonContainer, leftColumn.firstChild);
}

async function main() {
    console.log('Se ejecuta main');

    let assignments;
    try {
        assignments = await readLocalStorage('assignments');
    } catch (error) {
        assignments = [];
        await chrome.storage.local.set({ assignments });
    }

    var AssignActivityItems = document.querySelectorAll('li.modtype_assign div.activity-item');

    if ( AssignActivityItems ) {

        for (let i = 0; i < AssignActivityItems.length; i++) {
            const assignItem = AssignActivityItems[i];
            const assignLink = assignItem.querySelector('a');

            if (!assignLink) {
                continue;
            }
            
            const itemID = assignLink.href.split('id=')[1];

            assignments.forEach(assignment => {
                if ( assignment.id == itemID && assignment.status ) {
                    assignItem.style.background = 'linear-gradient(90deg, #f4fff4 0%, #e4f9e4 100%)';
                    assignItem.style.border = '1px solid #9fd79f';
                    assignItem.style.borderLeft = '5px solid #2e9f52';
                    assignItem.style.borderRadius = '8px';
                    assignItem.style.boxShadow = '0 2px 8px rgba(46, 159, 82, 0.12)';
                    assignItem.style.transition = 'all 0.2s ease';
                }
            });
        }
    }
    
    // Crear el botón
    createActivitiesButton();
}


main();
