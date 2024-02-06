document.addEventListener('DOMContentLoaded', function () {
    let phoneInputSelectedPostCode;

    // logic for burger menu =====================================
    let burgerMenu = document.getElementById('burger-menu'),
        body = document.body,
        headerMenu = document.querySelector('.header-menu-list');

    burgerMenu.addEventListener('click', function () {
        this.classList.toggle("close");
        body.classList.toggle("active");
        headerMenu.classList.toggle("active");
    });
    // end logic for burger menu =====================================

    // logic for email send =====================================
    emailjs.init("Mw4TGFbfUw0yqGkqk"); // user key

    document.getElementById("subscribeBtn").addEventListener("click", function () {
        let emailInput = document.getElementById("emailInput"),
            emailInputValue = emailInput.value,
            loader = document.querySelector("#subscribeBtn i"),
            timeoutDuration = 1000;

        if (isValidEmail(emailInputValue)) {
            loader.style.display = "block";

            let templateParams = {
                user_email: emailInputValue
            };

            emailjs.send("service_njuc39p", "template_6o4ooam", templateParams) // user service and template
                .then(function (response) {
                    console.log("Email sent successfully:", response);
                }, function (error) {
                    console.log("Failed to send email:", error);
                });

            setTimeout(() => {
                loader.style.display = "none";
                emailInput.value = '';
            }, timeoutDuration);

        } else {
            alert("Please enter a valid email address");
        }
    });
    // end logic for email send =====================================

    // logic for email send from modal =====================================

    emailjs.init("Mw4TGFbfUw0yqGkqk"); // user key

    document.getElementById("submitModalBtn").addEventListener("click", function () {
        let emailInput = document.getElementById("modalEmail"),
            emailInputValue = emailInput.value,
            nameInput = document.getElementById("modalName"),
            nameInputValue = nameInput.value,
            phoneInput = document.getElementById("phoneInput"),
            phoneInputValue = phoneInput.value;

        if (isValidEmail(emailInputValue)) {

            let templateParams = {
                user_email: emailInputValue,
                user_name: nameInputValue,
                user_phone: '+' + phoneInputSelectedPostCode + phoneInputValue
            };

            emailjs.send("service_njuc39p", "template_ffmywl9", templateParams) // user service and template
                .then(function (response) {
                    console.log("Email sent successfully:", response);
                }, function (error) {
                    console.log("Failed to send email:", error);
                })
                .then(function() {
                    emailInput.value = '';
                    nameInput.value = '';
                    phoneInput.value = '';
                });

        } else {
            alert("Please enter a valid email address");
        }
    });

    // end logic for email send from modal =====================================

    // logic for swiper =====================================
    const swiperReviews = new Swiper('.swiper.swiper-reviews', {
        loop: true,
        slidesPerView: 2,
        paginationClickable: true,
        spaceBetween: 64,
        grabCursor: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            1101: {
                slidesPerView: 2,
            }
        }
    });
    // end logic for swiper =====================================

    // logic for modals =====================================
    const openModalButton = document.getElementById('btnOpenModalContact'), 
     modal = document.getElementById('contactModal'),
     overlay = document.querySelector('.overlay'),
     closeModalButtons = document.querySelectorAll('.modal-close');

    function openModal() {
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    openModalButton.addEventListener('click', openModal);
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    })
    overlay.addEventListener('click', closeModal);
    // end logic for modals =====================================


    // logic for input phone =====================================
    const phoneInput = document.querySelector("#phoneInput");

    const iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js"
    });

    iti.promise.then(() => {
        const countryCode = iti.getSelectedCountryData().iso2;
        iti.setCountry(countryCode);
    });

    phoneInput.addEventListener("countrychange", function () {
        const countryCode = iti.getSelectedCountryData().iso2;
        phoneInputSelectedPostCode = iti.getSelectedCountryData().dialCode;
        console.log("Selected country code:", countryCode, '+' + phoneInputSelectedPostCode);
    });
    // end logic for input phone =====================================
});

// validate email function =====================================
function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// aos animation =====================================
AOS.init({
    duration: 2000,
    once: true
});