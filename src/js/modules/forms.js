export default class Forms {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Loading...',
      success: 'Thank you! We will contact you soon.',
      failure: 'Something went wrong...'
    };
    this.path = 'https://jsonplaceholder.typicode.com/posts';
  }

  clearInputs() {
    this.inputs.forEach(input => {
      input.value = '';
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      });
      input.addEventListener('input', () => {
        if (input.value.match(/[^a-z 0-9 @ \.]/ig)) {
          input.value = '';
        }
      });
    });
  }

  initPhoneMask() {
    const inputs = document.querySelectorAll('[name="phone"]');

    const setCursorPosition = (pos, elem) => {
      elem.addEventListener('click', () => {
        elem.setSelectionRange(elem.value.length, elem.value.length);
      });

      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos)
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }

    function createMask(event) {
      let matrix = '+1 (___) ___-____',
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    inputs.forEach(item => {
      item.addEventListener('input', createMask);
      item.addEventListener('keypress', createMask);
      item.addEventListener('focus', createMask);
      item.addEventListener('blur', createMask);
    });
  }

  async postData(url, data) {
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
  
    return await res.json();
  }

  init() {
    this.checkMailInputs();
    this.initPhoneMask();

    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: grey;
        `
        form.parentNode.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        this.postData(this.path, json)
          .then(res => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch((error) => {
            console.log(error);
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 5000)
          });
      });
    });
  }
}