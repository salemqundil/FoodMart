document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Encrypt user data
    const encryptedUsername = CryptoJS.AES.encrypt(username, 'secret-key').toString();
    const encryptedEmail = CryptoJS.AES.encrypt(email, 'secret-key').toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();

    // Store encrypted user data in sessionStorage
    sessionStorage.setItem('username', encryptedUsername);
    sessionStorage.setItem('email', encryptedEmail);
    sessionStorage.setItem('password', encryptedPassword);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('isAdmin', 'false');

    alert('Registration successful!');
    window.location.href = '../index.html';
});
