// auth.js - Authentication Guard (No SDK dependency)
// Uses direct Supabase REST API calls
(function() {
    'use strict';

    var SUPABASE_URL = 'https://ulymellasjmsejgeutyt.supabase.co';
    var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseW1lbGxhc2ptc2VqZ2V1dHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzU0NzQsImV4cCI6MjA4ODA1MTQ3NH0.wSa6XbIylhl7ChzeD9oqGu5NzN4_0E1cWHYeUmeBAkY';
    var STORAGE_KEY = 'mj_admin_session';

    // --- IMMEDIATELY hide the page ---
    document.documentElement.style.visibility = 'hidden';

    // --- Session helpers ---
    function getStoredSession() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var session = JSON.parse(raw);
            // Check if token is expired
            if (session.expires_at && (session.expires_at * 1000) < Date.now()) {
                localStorage.removeItem(STORAGE_KEY);
                return null;
            }
            return session;
        } catch(e) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
    }

    function saveSession(session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }

    function clearSession() {
        localStorage.removeItem(STORAGE_KEY);
    }

    // --- Auth check (runs immediately, synchronous decision) ---
    var isLoginPage = window.location.pathname.indexOf('login.html') !== -1;
    var isMudarSenhaPage = window.location.pathname.indexOf('mudar-senha.html') !== -1;
    var session = getStoredSession();

    if (!session && !isLoginPage) {
        // Not authenticated and not on login page -> redirect NOW
        window.location.replace('login.html');
        // Stop script execution
        throw new Error('AUTH_REDIRECT');
    }

    if (session && isLoginPage) {
        // Already authenticated and on login page -> go to dashboard
        window.location.replace('index.html');
        throw new Error('AUTH_REDIRECT');
    }

    // If we get here, either:
    // - User is authenticated and on a protected page (show it)
    // - User is not authenticated and on login page (show it)
    document.documentElement.style.visibility = 'visible';

    // --- Global Auth Functions ---
    window.signIn = function(email, password) {
        return fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.error || data.error_description || !data.access_token) {
                var msg = data.error_description || data.msg || data.error || 'Credenciais inválidas';
                alert('Erro no login: ' + msg);
                return false;
            }
            saveSession({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                expires_at: data.expires_at,
                user: data.user
            });
            window.location.href = 'index.html';
            return true;
        })
        .catch(function(err) {
            alert('Erro de ligação: ' + err.message);
            return false;
        });
    };

    window.signOut = function() {
        var session = getStoredSession();
        if (session && session.access_token) {
            fetch(SUPABASE_URL + '/auth/v1/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': 'Bearer ' + session.access_token
                }
            }).catch(function() {});
        }
        clearSession();
        window.location.replace('login.html');
    };

    window.changePassword = function(newPassword) {
        var session = getStoredSession();
        if (!session || !session.access_token) {
            alert('Sessão expirada. Faça login novamente.');
            clearSession();
            window.location.replace('login.html');
            return Promise.resolve(false);
        }
        return fetch(SUPABASE_URL + '/auth/v1/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': 'Bearer ' + session.access_token
            },
            body: JSON.stringify({ password: newPassword })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.error) {
                alert('Erro ao alterar senha: ' + (data.error_description || data.msg || data.error));
                return false;
            }
            alert('Senha alterada com sucesso!');
            return true;
        })
        .catch(function(err) {
            alert('Erro: ' + err.message);
            return false;
        });
    };

    // --- Bind logout button when DOM is ready ---
    document.addEventListener('DOMContentLoaded', function() {
        var logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.signOut();
            });
        }
    });
})();
