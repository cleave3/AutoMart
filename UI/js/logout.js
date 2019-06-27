const logout = document.querySelectorAll('.logout');
const dashboard = document.querySelectorAll('.dashboard');
const auth = sessionStorage.getItem('token');
const admin = sessionStorage.getItem('is_admin');

const displayLogoutButton = (user) => {
    logout.forEach((btn) => {
        if (!user) {
          btn.style.display = 'none';
          return;
        }
        btn.style.display = 'block';
    })
}
displayLogoutButton(auth);

logout.forEach((btn) => {
    btn.addEventListener('click', () => {
    sessionStorage.clear();
    location.reload();
})
});

const viewPanel = (user, admin) => {
    if (user && admin == 'true') {
        window.location = 'user/admin_dashboard.html';
        return;
    } else if (user && admin == 'false') {
        window.location = 'user/dashboard.html';  
        return;      
    } else {
       alert('Please login to proceed')
       window.location = 'login.html';
       return; 
    }
};

dashboard.forEach((board) => {
    board.addEventListener('click', () => {
        viewPanel(auth, admin);
    })
});