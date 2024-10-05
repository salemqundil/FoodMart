document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedEncryptedUsername = sessionStorage.getItem('username');
    const storedEncryptedPassword = sessionStorage.getItem('password');

    // Hardcoded admin credentials
    const adminUsername = 'admin@email.com'; 
    const adminPassword = 'admin123'; 
    const isAdmin = (username === adminUsername && password === adminPassword);

    // Validate the user credentials
    if (isAdmin) {
        alert('Login successful as admin!');
        sessionStorage.setItem('isLoggedIn', 'true'); // Set logged in status
        sessionStorage.setItem('isAdmin', 'true'); // Set admin status
        window.location.href = 'admin.html'; // Redirect to admin page
    } else if (storedEncryptedUsername && storedEncryptedPassword) {
        // Decrypt stored user credentials
        const storedUsername = CryptoJS.AES.decrypt(storedEncryptedUsername, 'secret-key').toString(CryptoJS.enc.Utf8);
        const storedPassword = CryptoJS.AES.decrypt(storedEncryptedPassword, 'secret-key').toString(CryptoJS.enc.Utf8);

        // Check for user credentials
        if (username === storedUsername && password === storedPassword) {
            alert('Login successful as user!');
            sessionStorage.setItem('isLoggedIn', 'true'); // Set logged in status
            sessionStorage.setItem('isAdmin', 'false'); // Set admin status
            window.location.href = '../index.html'; // Redirect to user page
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } else {
        alert('No registered users found. Please register first.');
        window.location.href = 'register.html'; 

    }
});
