window.addEventListener('DOMContentLoaded', () => {
    const addCompanyDefolt = `
        <button class="btn_defoult">
            <span></span>
            <span></span>
        </button>
        <form action="#" class="main__add-company__form">
            <input name="name" required placeholder="введіть назву команди/компанії" type="text">
            <input name="name" required placeholder="введіть вашого головного" type="name">
            <input name="name" required placeholder="введіть його контакти" type="text">
            <input name="name" required placeholder="введіть кількість учасників" type="number">
            <button class="btn_defoult btn_dottom">
                <span></span>
                <span></span>
            </button>
        </form>
    `;
    
    const hamburger = document.querySelector('.header__hamburger'),
          logo = document.querySelector('.header__logo'),
          nav = document.querySelector('.header__nav'),
          addCompany = document.querySelector('.main__add-company');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('header__hamburger_active');
        logo.classList.toggle('header__logo_active');
        nav.classList.toggle('header__nav_active');
    });

    const addCompanyFnc = (card) => {
        const addForm = card.querySelector('.btn_defoult'),
              form = card.querySelector('.main__add-company__form'),
              submit = form.querySelector('.btn_dottom'),
              popup = document.querySelector('.popup'),
              popupBtn = popup.querySelector('#popupBtn');

        addForm.addEventListener('click', () => {
            addForm.classList.toggle('btn_active');
            form.classList.toggle('main__add-company__form_active');
            card.classList.toggle('main__add-company_active');
        });
  
        submit.addEventListener('click', e => {
            e.preventDefault();

            let nameCompany = form.children[0].value.trim();
            let nameHead = form.children[1].value.trim();
            let contacts = form.children[2].value.trim();
            let num = form.children[3].value.trim();

            if (nameCompany == false || nameHead == false || contacts == false || num == false ||
                typeof(nameCompany) == 'number' || typeof(nameHead) == 'number' || typeof(contacts) == 'number') {
                popup.style.cssText = 'display: flex;';

                popupBtn.addEventListener('click', () => {
                    popup.style.cssText = 'display: none;';
                });
            } else {
                if (nameCompany.length > 10) {
                    nameCompany = `${nameCompany.slice(1, 10)}...`;
                }
                if (nameHead.length > 10) {
                    nameHead = `${nameHead.slice(1, 10)}...`;
                }
                if (contacts.length > 10) {
                    contacts = `${contacts.slice(1, 10)}...`;
                }
                if (num.length > 10) {
                    num = `${num.slice(1, 10)}...`;
                }
                card.innerHTML = `
                    <button class="btn_defoult btn_active btn_done">
                        <span></span>
                        <span></span>
                    </button>
                    <h3 class="main__add-company-name">
                        ${nameCompany}
                    </h3>
                    <p class="main__add-company__data">
                        Головний: ${nameHead}
                    </p>
                    <p class="main__add-company__data">
                        Контакти: ${contacts}
                    </p>
                    <p class="main__add-company__data">
                        Кількість учасників: ${num}
                    </p>
                    <button class="btn_defoult btn_dottom"
                    id="btn_add-newsct">
                        <span></span>
                        <span></span>
                    </button> 
                `;

                card.classList.remove('main__add-company_active');  
            }
            
            const addNewSct = card.querySelector('#btn_add-newsct');
            const btnDone = card.querySelector('.btn_done');

            btnDone.addEventListener('click', () => {
                function removeRightSctBtnDone() {
                    if (btnDone.parentElement.nextElementSibling) {
                        btnDone.parentElement.remove();
                    }
                }

                removeRightSctBtnDone();

                card.innerHTML = `${addCompanyDefolt}`;

                addCompanyFnc(card);
            });

            let value = true; 

            addNewSct.addEventListener('click', () => {
                function addRemoveSct(valueFnc) {
                    if (!valueFnc) {
                        const removeRightSct = card.querySelector('.dtnsClose');

                        function removeRightSctFnc() {
                            if (removeRightSct.parentElement.nextElementSibling) {
                                removeRightSct.parentElement.nextElementSibling.remove();
                    
                                removeRightSct.classList.remove('btn_active');
                                removeRightSct.classList.remove('dtnsClose');
                    
                                removeRightSctFnc();
                            }
                        }

                        removeRightSctFnc();
    
                        value = true;
                    } else if (valueFnc) {
                        addNewSct.classList.toggle('btn_active');
                        addNewSct.classList.add('dtnsClose');
        
                        const newForm = document.createElement('div');
                
                        newForm.classList.toggle('main__add-company');
                
                        document.querySelector('main').append(newForm);
                
                        newForm.innerHTML = `${addCompanyDefolt}`;
                
                        addCompanyFnc(newForm); 
    
                        value = false; 
                    } 
                }
                addRemoveSct(value);
            });
        });
    };
    addCompanyFnc(addCompany);
});