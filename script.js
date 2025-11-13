const contactsContainer = document.getElementById('contacts');
const userImg   = document.getElementById('userImg');
const photoInput = document.getElementById('photoInput');

function showAddPage(){
document.getElementById("mainPage").style.display = "none"
document.getElementById("addPage").style.display = "block"
}


window.addEventListener('DOMContentLoaded', ()=> {
 document.getElementById('btnSaveContact').addEventListener('click', saveContact);

 userImg.addEventListener('click', () => photoInput.click());

});

function saveContact(){
const firstName = document.getElementById('firstName').value.trim();
const lasttName = document.getElementById('lastName').value.trim();
const phone = document.getElementById('phone').value.trim();

const user = { firstName, lasttName, phone };
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}



photoInput.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  userImg.style.backgroundImage = `url(${url})`;
  userImg.classList.add('has-photo');

   const icon = userImg.querySelector('i');
  if (icon) icon.style.display = 'none';

  if (editEl) editEl.style.display = 'none';
});
