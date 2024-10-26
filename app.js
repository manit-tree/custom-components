document.addEventListener('DOMContentLoaded', () => {
    let app = document.querySelector('#app');
    
    app.addEventListener('click', evt => {
        let el = evt.target;

        if (el.matches('button')) {
            let badge = app.querySelector('x-badge');

            badge.setAttribute('bg-color', 'red');
            badge.setAttribute('content', '8');
        }
    })
})