const userInfo = {
  name: 'Jose Mu&#241;oz',
  position: 'iNversor Ingenioso',
  role: 'Master & Commander',
  avatar: 'assets/images/profile.jpeg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  social_discord: '@Jose Mu&#241;oz',
  social_email: 'jose@lin.es',
  social_phone: '+34600000000',
  social_website: 'https://programain.es',
  social_location: 'Alcobendas, Madrid',
};

function openUrl(link) {
  try {
    if (!link.startsWith('mailto:') && !link.startsWith('tel:') && !link.startsWith('https://' || 'http://')) {
      window.open('https://' + link);
    } else {
      window.open(link);
    }
  } catch (err) {
    console.log("Error from socialpage handlbars", err)
    throw err;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Editing variable
  window.editing = false;

  Object.keys(userInfo).forEach((e) => {
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(`{{${e}}}`, 'g'), userInfo[e]);
    var els = document.querySelectorAll(`[data="${e}"]`);
    els.forEach((_el) => {
      _el.innerHTML = userInfo[e];
    });
  });

  // Editing button element
  const btnEdit = document.getElementById('btn-edit');
  if (btnEdit) btnEdit.onclick = edit;
  const btnSave = document.getElementById('btn-save');
  if (btnSave) btnSave.onclick = save;

  // Initialize
  function init() {
    let hash = window.location.hash;
    window.editing = hash.toLowerCase() === '#edit';
    toggleElements();
    // console.info(userInfo);
  }

  init();
  window.addEventListener('hashchange', init);

  // Edit function
  function edit() {
    window.editing = true;
    history.pushState(null, null, '#edit');
    toggleElements();
  }

  // Save function
  function save() {
    window.editing = false;
    history.pushState(null, null, ' ');
    toggleElements();
  }

  function toggleElements() {
    //  hide some elements with js
    //   const editElements = document.querySelectorAll('.vif-editing');
    //   editElements.forEach((e) => e.classList?.[window.editing ? 'remove' : 'add']('hidden'));
    rootCSS_set('--cond-editing', window.editing ? 'block' : 'none');
    //  show some elements with js
    //   const viewElements = document.querySelectorAll('.vif-not-editing');
    //   viewElements.forEach((e) => e.classList?.[window.editing ? 'add' : 'remove']('hidden'));
    rootCSS_set('--cond-not-editing', window.editing ? 'none' : 'block');
  }

  function rootCSS_el() {
    return document.querySelector(':root');
  }

  // Create a function for getting a variable value
  function rootCSS_get(key) {
    const rs = getComputedStyle(rootCSS_el());
    return rs.getPropertyValue(key);
  }

  // Create a function for setting a variable value
  function rootCSS_set(key, value) {
    let el = rootCSS_el();
    el.style.setProperty(key, value);
  }

  // Create custom select
  var x, i, j, l, ll, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName('custom-select');
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName('select')[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement('DIV');
    a.setAttribute('class', 'select-selected');
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement('DIV');
    b.setAttribute('class', 'select-items select-hide');
    for (j = 1; j < ll; j++) {
      /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
      c = document.createElement('DIV');
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener('click', function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName('select')[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName('same-as-selected');
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute('class');
            }
            this.setAttribute('class', 'same-as-selected');
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener('click', function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
    });
  }

  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
  except the current select box:*/
    var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
    x = document.getElementsByClassName('select-items');
    y = document.getElementsByClassName('select-selected');
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove('select-arrow-active');
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add('select-hide');
      }
    }
  }

  /*if the user clicks anywhere outside the select box,
then close all select boxes:*/
  document.addEventListener('click', closeAllSelect);
});
