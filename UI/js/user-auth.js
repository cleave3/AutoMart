const logout = document.querySelectorAll('.logout');
const adminPanel = document.querySelectorAll('.admin-panel');
const welcomeMessage = document.querySelectorAll('.userId');
const userName = sessionStorage.getItem('first_name');
const adminUser = sessionStorage.getItem('is_admin');

const displayAdminPanel = (admin) => {
  adminPanel.forEach((btn) => {
    if (admin === 'false') {
      btn.style.display = 'none';
      return;
    }
    btn.style.display = 'block';
  });
};
displayAdminPanel(adminUser);

logout.forEach((btn) => {
  btn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location = '../';
  });
});

welcomeMessage.forEach((message) => {
  message.innerHTML = `Welcome ${userName}`;
  message.style.margin = '10px auto 50px';
});
