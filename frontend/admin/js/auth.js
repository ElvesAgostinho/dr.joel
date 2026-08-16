// auth.js
// Supabase Setup
const SUPABASE_URL = 'https://ulymellasjmsejgeutyt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseW1lbGxhc2ptc2VqZ2V1dHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzU0NzQsImV4cCI6MjA4ODA1MTQ3NH0.wSa6XbIylhl7ChzeD9oqGu5NzN4_0E1cWHYeUmeBAkY';

// Initialize Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check Session on page load
async function checkAuth() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    const isLoginPage = window.location.pathname.includes('login.html');

    if (!session) {
        if (!isLoginPage) {
            window.location.href = 'login.html';
        }
    } else {
        if (isLoginPage) {
            window.location.href = 'index.html';
        }
    }
}

// Function to sign in
async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) {
        alert("Erro no login: " + error.message);
        return false;
    }
    window.location.href = 'index.html';
    return true;
}

// Function to sign out
async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert("Erro ao terminar sessão: " + error.message);
    } else {
        window.location.href = 'login.html';
    }
}

// Function to change password
async function changePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        alert("Erro ao alterar senha: " + error.message);
        return false;
    }
    
    alert("Senha alterada com sucesso!");
    return true;
}

// Execute checkAuth immediately
checkAuth();

// Add event listener to logout buttons if they exist
const logoutBtn = document.getElementById('btn-logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signOut();
    });
}

// Export supabase to be used in other files like dashboard.js
window.supabaseClient = supabase;
