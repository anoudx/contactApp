const contactsContainer = document.getElementById('contacts');
const userImg = document.getElementById('userImg');
const photoInput = document.getElementById('photoInput');
const btnSaveContact = document.getElementById('btnSaveContact');




let avatar = null;
const contacts = JSON.parse(localStorage.getItem('users')) || [];
window.addEventListener('DOMContentLoaded', () => {
    renderContacts();
    btnSaveContact.addEventListener('click', handleSaveContact);
    userImg.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', onAvatarChange);
    
    contactsContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('contactCard')){
           showAddPage();
        }
    }
    )
});

function showAddPage() {
    document.getElementById("mainPage").style.display = "none"
    document.getElementById("addPage").style.display = "block"
}
function showMainPage() {
    document.getElementById("addPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
}


function handleSaveContact() {
    const contact = getContactFromForm();
    saveContact(contact);
    contactsContainer.innerHTML = ''; 
    renderContacts() ;
    showMainPage();
    clearForm();
}

function getContactFromForm() {
    return {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        avatar: avatar
    };
}

function saveContact(contact) {
    contacts.push(contact);
    localStorage.setItem('users', JSON.stringify(contacts));
}

function renderContacts() {
    getSortedContacts();
    let currentLetter = null;
    
    contacts.forEach(contact => {
        const name = `${contact.firstName} ${contact.lastName || ''}`;
        const firstLetter = name.charAt(0).toUpperCase();
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            renderLetterHeader(currentLetter);
        }
        renderContactRow(contact);
    });
}

function getSortedContacts() {
  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
}

function renderLetterHeader(letter) {
    contactsContainer.innerHTML += `
        <div class="container letter-header border-bottom custom-border fw-bold">
          ${letter}
        </div>
      `;
}

function renderContactRow(contact) {
    const name = `${contact.firstName} ${contact.lastName || ''}`;
    contactsContainer.innerHTML += `
    <div class="container contactCard">
    <img 
        src="${contact.avatar || ' '}" 
        class="avatar  me-2">
    <span>${name}</span>
    </div>
    `;
}

function onAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    displayAvatar(file);
    encodeAvatar(file);
}

function displayAvatar(file) {
    const url = URL.createObjectURL(file);
    userImg.style.backgroundImage = `url(${url})`;
    const icon = userImg.querySelector('i');
    if (icon) icon.style.display = 'none';
}

function encodeAvatar(file) {
    const reader = new FileReader();
    reader.onload = () => avatar = reader.result;
    reader.readAsDataURL(file);
}

function clearForm() {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('phone').value = '';
  
  avatar = null;
  userImg.style.backgroundImage = '';
  
  const icon = userImg.querySelector('i');
  if (icon) icon.style.display = 'block';
}