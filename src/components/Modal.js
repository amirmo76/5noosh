import React from 'react';

export default class Modal extends React.Component {

    state = {
       isOpen: false
    }

    toggleModal = e => {
        const isOpen = !this.state.isOpen
        this.setState(() => ({isOpen}));
    }

    componentDidMount() {
        console.log('mounted');
        const bind = this;
        if (this.props.triggerID) {
            document.getElementById(this.props.triggerID).addEventListener('click', e => {
                bind.toggleModal();
            });
        } else if (this.props.querySelector) {
            console.log('query selector');
            const triggers = document.querySelectorAll(this.props.querySelector);
            console.log(triggers);
            triggers.forEach(el => {
                el.addEventListener('click', e => {
                    bind.toggleModal();
                    console.log('triggering');
                });
            });
        }
        

        document.querySelector(".modal").addEventListener('click', e => {
            if (e.target.classList.contains('modal')) {
                bind.toggleModal();
            }
        });

        document.querySelector(".modal__close").addEventListener('click', e => {
            bind.toggleModal();
        });
    }

    render(){
        return (
            <div className={"modal" + (this.state.isOpen ? " modal--show" : "")}>
                <div className="modal__body">
                    <svg className="modal__close" id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.971 47.971'>
                        <path d='M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88 c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242 C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879 s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z'
                        />
                    </svg>
                    {this.props.content}                
                </div>
            </div>
        );
    } 
}