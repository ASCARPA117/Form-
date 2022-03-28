const createSection = (section) => {
  let alloc = document.createElement('section');
  let title = document.createElement('h3');
  let description = document.createElement('p');
  title.classList.add('title');
  description.classList.add('description');
  title.innerHTML = section.title;
  description.innerHTML = section.description;
  alloc.appendChild(title);
  alloc.appendChild(description);
  return alloc;
};

const createTextField = (textField, onChange) => {
  let inputBox = document.createElement('div');
  let label = document.createElement('label');
  let input = document.createElement('input');
  input.classList.add('input');
  label.classList.add('label');
  label.innerHTML = textField.label;
  inputBox.appendChild(label);
  inputBox.appendChild(input);

  input.addEventListener('change', onChangeInput); //per ogni input gli faccio eseguire onChange
  function onChangeInput() {
    onChange(textField.id, this.value); //salvami in oggetto vuoto chiave e valore
  }
  return inputBox;
};
const createProductField = (product, onClick) => {
  let divBox = document.createElement('div');
  divBox.classList.add('divBox');
  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('checkbox');
  checkbox.id = product.id;
  divBox.appendChild(checkbox);
  let parProd = document.createElement('p');
  parProd.classList.add('product');
  parProd.innerHTML = product.title;
  divBox.appendChild(parProd);
  let parPrice = document.createElement('p');
  parPrice.classList.add('price');
  parPrice.innerHTML = product.price + ' €';
  divBox.appendChild(parPrice);
  checkbox.addEventListener('click', onClickProduct);
  function onClickProduct() {
    onClick(product);
  }
  return divBox;
};

export const fieldsMap = {
  section: createSection,
  text: createTextField,
  product: createProductField,
};
