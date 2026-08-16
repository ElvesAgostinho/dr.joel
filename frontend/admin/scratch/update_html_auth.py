import os

admin_dir = r"c:\Users\DELL\Desktop\Dr. Joel\frontend\admin"

# Files to skip
skip_files = ["login.html", "mudar-senha.html"]

sidebar_insertion = """
                <div style="margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                    <a href="mudar-senha.html">Mudar Senha</a>
                    <a href="#" id="btn-logout">Terminar Sessão</a>
                </div>
"""

script_insertion = """
    <!-- Supabase JS CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="js/auth.js"></script>
"""

for filename in os.listdir(admin_dir):
    if filename.endswith(".html") and filename not in skip_files:
        filepath = os.path.join(admin_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        changed = False

        # Inject in sidebar
        if "Mudar Senha" not in content and "</nav>" in content:
            content = content.replace("</nav>", sidebar_insertion + "            </nav>")
            changed = True

        # Inject scripts at bottom
        if "auth.js" not in content and "</body>" in content:
            # check if mockDB is there, if so, put it before or remove mockDB. Let's just put it before </body>
            content = content.replace("</body>", script_insertion + "</body>")
            changed = True

        if changed:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated {filename}")

