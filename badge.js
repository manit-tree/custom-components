(() => {
    function hash(obj) {
        let array_buffer = new TextEncoder().encode(JSON.stringify(obj), 'utf-8');
        return window.crypto.subtle.digest('SHA-256', array_buffer);
    }

    function debounce(func, delay) {
        let debounceTimer
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    class BadgeComponent extends HTMLElement {
        #span;
        #debounced_update;
    
        #state = {
            content: '1',
            bg_color: 'red'
        }
    
        connectedCallback() {
            if (!this.#span) {
                this.#span = document.createElement('span');
                this.#span.className = 'x-badge-label';
                this.insertBefore(this.#span, this.firstChild);
            }
    
            this.update();
        }
    
        update() {    
            if (this.#span) {
                let new_state = {
                    content: this.getAttribute('content'),
                    bg_color: this.getAttribute('bg-color')
                }
    
                if (hash(this.#state) != hash(new_state)) {
                    this.#state = new_state;                
                    this.#span.textContent = this.#state.content;
                    this.#span.style.setProperty('background-color', this.#state.bg_color);
                }
            }
        } 
    
        static get observedAttributes() {
            return ['content', 'bg-color'];
        }
    
        attributeChangedCallback() {   
            if (!this.#debounced_update) { 
                this.#debounced_update = debounce(this.update, 10);
            }

            this.#debounced_update();
        }    
    }
    
    customElements.define('x-badge', BadgeComponent);
})()
