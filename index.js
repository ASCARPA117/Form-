import { config, products, validationRules } from './config';
import { fieldsMap } from './fields';
import './style.css';

const formNode = document.getElementById('dynamic-form');
const registerButton = document.getElementById('register-button');
const formState = {};

function onChange(id, value) {
  if (!formState[id]) {
    formState[id] = value;
  } else {
    delete formState[id];
  }
} // validationRUles -> se non è presente in formState alert error
function onClick(product) {
  if (!formState.products) formState.products = [];
  if (formState.products.includes(product)) {
    formState.products = formState.products.filter((prod) => prod !== product);
  } else {
    formState.products.push(product);
  }
}

config.forEach(function (info) {
  let section = fieldsMap.section(info);
  formNode.appendChild(section);
  info.fields.forEach(function (field) {
    switch (field.type) {
      case 'text':
        let textField = fieldsMap.text(field, onChange);
        section.appendChild(textField);
        break;
      case 'product': {
        const fullProduct = products.find((product) => product.id === field.id);
        let productBox = fieldsMap.product(fullProduct, onClick);
        section.appendChild(productBox);
        break;
      }
    }
  });
});

registerButton.addEventListener('click', registerButton);
registerButton.onclick = function onSubmit() {
  validateForm(formState);
};

const isValid = (value, rules) => {
  const rulesArray = Object.entries(rules);
  return rulesArray.every(([ruleType, ruleValue]) => {
    //every= tutte le condizioni sono vere
    if (ruleType === 'required' && ruleValue) return !!value; //valore booleano doppio punto esclamativo
    if (ruleType === 'includes') return value.includes(ruleValue);
    if (ruleType === 'min') return value.length >= ruleValue;
    return true;
  });
};
function validateForm(formState) {
  let invalidFields = [];
  validationRules.forEach(function ([id, rules]) {
    if (!isValid(formState[id], rules)) {
      invalidFields.push(id);
    }
    return invalidFields;
  });
  if (invalidFields.length > 0) {
    alert(invalidFields.join(', ') + ' NOT valid!');
  } else {
    let sum = 0;
    formState.products?.reduce((acc, inc) => (sum = acc + inc.price), 0);
    alert(
      'Thanks for registering!\n\n' +
        Object.entries(formState).join(' \n').replace(/,/g, ': ') +
        '\n\n' +
        '\n                     Total order: €' +
        sum
    );
  }
}
/*
  if (!formState.name) {
    formState.keysValue.push(arrayRules[1]);
    console.log(formState.keysValue);
  }
  if (!formState.surname) {
    formState.keysValue.push(arrayRules[2]);
    console.log(formState.keysValue);
  }*/
/* if (!formState.name) {
    formState.keysValue.push(arrayRules[1]);
    console.log(formState.keysValue);
  }
  if (!formState.surname) {
    formState.keysValue.push(arrayRules[2]);
    console.log(formState.keysValue);
  }*/
//if (validationRules[0] == formState){
//  formState
// }

//if(validationRules[0] == formState){

// }
