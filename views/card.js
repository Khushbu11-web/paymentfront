const stripe = Stripe('pk_test_51IWIJADcPjZPLEAZQ9jmP92Gxr8drnUP7E3uLtrStCKcLSVoLoavh2DftL2ayZuJhadICUsU59bvoA5RmKP1g2mC00P8Upcjgy');
const elements = stripe.elements();

var style = {
    base: {
        color: "#aab7c4"
    }
}
const card = elements.create('card', { style, hidePostalCode: true });
card.mount('#card-element'); //eject in brower

const form = document.getElementById('payment-form');
const errorEl = document.querySelector('#card-errors');

// const stripeTokenHandler = token => {
//     //     const hiddenInput = document.createElement('input');
//     //     hiddenInput.setAttribute('type', 'hidden');
//     //     hiddenInput.setAttribute('name', 'stripeToken');
//     //     hiddenInput.setAttribute('value', token.id);
//     //     form.appendChild(hiddenInput);

//     console.log(form)
//     form.submit();
// }

// form.addEventListener('submit', e => {
//     e.preventDefault();
const paymentForm = document.querySelector('#payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {

        e.preventDefault();
        let formData = new FormData(paymentForm);
        let formObject = {}
        for (let [key, value] of formData.entries()) { //for of loop used 


            formObject[key] = value



        }
        console.log(formObject);


        //verify card
        stripe.createToken(card).then((res) => {


            console.log(res.token)
            formObject.stripeToken = res.token.id;
            // if (res.error) errorEl.textContent = res.error.message;
            // else {
            //     console.log(res.token)
            //stripeTokenHandler(res.token);
            // }
        }).catch((err) => {

            console.log(err)
        })


    })

}