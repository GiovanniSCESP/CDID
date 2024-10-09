function main() {
    console.log('Se ejecuta main');

    cdid_bg = document.createElement('div');
    cdid_bg.className = 'cdid-bg';
    document.querySelector('div.activity-header').appendChild(cdid_bg)
    
    cdid_button = document.createElement('button');
    cdid_button.className = 'cdid-button';
    cdid_button.innerHTML += `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-rocket"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" /><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" /><path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>`

    cdid_bg.appendChild(cdid_button)

    cdid_button.addEventListener('click', (e) => {
        cdid_button.classList.toggle('selected');
        document.getElementById('id_submitbutton').click();
    })
}


main()
