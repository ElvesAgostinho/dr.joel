// auth.js - Authentication Guard
// This script MUST be loaded in the <head> of every admin page

(function() {
    'use strict';

    // --- Configuration ---
    const SUPABASE_URL = 'https://ulymellasjmsejgeutyt.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseW1lbGxhc2ptc2VqZ2V1dHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzU0NzQsImV4cCI6MjA4ODA1MTQ3NH0.wSa6XbIylhl7ChzeD9oqGu5NzN4_0E1cWHYeUmeBAkY';

    // --- Immediately hide the page until auth is confirmed ---
    var style = document.createElement('style');
    style.id = 'auth-guard-style';
    style.textContent = 'body { display: none !important; }';
    document.documentElement.appendChild(style);

    // --- Load Supabase SDK dynamically ---
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = function() {
        initAuth();
    };
    script.onerror = function() {
        // If CDN fails, redirect to login as a safety measure
        var isLoginPage = window.location.pathname.indexOf('login.html') !== -1;
        if (!isLoginPage) {
            window.location.href = 'login.html';
        } else {
            // On login page, show it anyway so user can retry
            document.getElementById('auth-guard-style').remove();
        }
    };
    document.documentElement.appendChild(script);

    function initAuth() {
        var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // Expose globally
        window.supabaseClient = client;
        window._supabase = client;

        var isLoginPage = window.location.pathname.indexOf('login.html') !== -1;
        var isChangePwdPage = window.location.pathname.indexOf('mudar-senha.html') !== -1;

        client.auth.getSession().then(function(result) {
            var session = result.data.session;

            if (!session) {
                // NOT authenticated
                if (isLoginPage) {
                    // Show the login page
                    document.getElementById('auth-guard-style').remove();
                } else {
                    // Redirect to login
                    window.location.replace('login.html');
                    return;
                }
            } else {
                // Authenticated
                if (isLoginPage) {
                    // Already logged in, go to dashboard
                    window.location.replace('index.html');
                    return;
                } else {
                    // Show the page
                    document.getElementById('auth-guard-style').remove();
                }
            }
        }).catch(function() {
            // On error, redirect to login for safety
            if (!isLoginPage) {
                window.location.replace('login.html');
            } else {
                document.getElementById('auth-guard-style').remove();
            }
        });

        // --- Global Auth Functions ---
        window.signIn = function(email, password) {
            return client.auth.signInWithPassword({
                email: email,
                password: password
            }).then(function(result) {
                if (result.error) {
                    alert("Erro no login: " + result.error.message);
                    return false;
                }
                window.location.href = 'index.html';
                return true;
            });
        };

        window.signOut = function() {
            return client.auth.signOut().then(function(result) {
                if (result.error) {
                    alert("Erro ao terminar sessão: " + result.error.message);
                } else {
                    window.location.replace('login.html');
                }
            });
        };

        window.changePassword = function(newPassword) {
            return client.auth.updateUser({
                password: newPassword
            }).then(function(result) {
                if (result.error) {
                    alert("Erro ao alterar senha: " + result.error.message);
                    return false;
                }
                alert("Senha alterada com sucesso!");
                return true;
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
    }
})();
