import os

base_path = 'c:/Users/DELL/Desktop/Dr. Joel/frontend/admin/'

# Read sidebar from gestao-expertise.html to copy it
with open(os.path.join(base_path, 'gestao-expertise.html'), 'r', encoding='utf-8') as f:
    expertise_content = f.read()
    
# Extract sidebar
sidebar_start = expertise_content.find('<aside class="admin-sidebar">')
sidebar_end = expertise_content.find('</aside>') + len('</aside>')
sidebar_html = expertise_content[sidebar_start:sidebar_end]

equipa_html = f"""<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Equipa - Admin M&J</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
    {sidebar_html}

    <main class="main-content">
        <header class="admin-header">
            <div>
                <h1>Gestão de Equipa</h1>
                <p>Adicione, edite ou remova membros da equipa.</p>
            </div>
            <a href="editor-equipa.html" class="btn btn-primary">+ Novo Membro</a>
        </header>

        <div class="card" style="margin-top: 30px;">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Áreas</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="equipa-table-body">
                    <!-- Loaded dynamically -->
                </tbody>
            </table>
        </div>
    </main>

    <script src="js/mockDB.js"></script>
    <script src="js/equipa.js"></script>
</body>
</html>
"""

editor_equipa_html = f"""<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor de Membro - Admin M&J</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
    {sidebar_html}

    <main class="main-content">
        <header class="admin-header">
            <div>
                <h1 id="editor-title">Novo Membro</h1>
                <p>Preencha os detalhes do membro da equipa.</p>
            </div>
            <a href="equipa.html" class="btn btn-secondary">Cancelar</a>
        </header>

        <div class="card" style="margin-top: 30px;">
            <form id="equipa-form">
                <input type="hidden" id="membro-id">
                
                <div class="form-group">
                    <label for="membro-name">Nome *</label>
                    <input type="text" id="membro-name" required class="form-control">
                </div>
                
                <div class="form-group">
                    <label for="membro-role">Cargo *</label>
                    <input type="text" id="membro-role" required class="form-control" placeholder="Ex: Sócio, Associado, etc">
                </div>

                <div class="form-group">
                    <label for="membro-areas">Áreas de Prática</label>
                    <input type="text" id="membro-areas" class="form-control" placeholder="Ex: Corporate, Fiscal (separados por vírgula)">
                </div>

                <div class="form-group">
                    <label for="membro-photo">URL da Foto</label>
                    <input type="text" id="membro-photo" class="form-control" placeholder="Ex: assets/images/team/member.jpg">
                </div>
                
                <div class="form-group">
                    <label for="membro-bio">Biografia / Detalhes</label>
                    <textarea id="membro-bio" rows="8" class="form-control"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="membro-cv">URL do CV (Opcional)</label>
                    <input type="text" id="membro-cv" class="form-control" placeholder="Ex: assets/docs/cv-joao.pdf">
                </div>

                <button type="submit" class="btn btn-primary">Guardar Membro</button>
            </form>
        </div>
    </main>

    <script src="js/mockDB.js"></script>
    <script src="js/equipa.js"></script>
</body>
</html>
"""

equipa_js = """document.addEventListener('DOMContentLoaded', () => {
    // --- List Page Logic ---
    const tableBody = document.getElementById('equipa-table-body');
    if (tableBody) {
        function renderTable() {
            const items = MockDB.getTeam();
            tableBody.innerHTML = '';
            
            if (items.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum membro encontrado.</td></tr>';
                return;
            }
            
            items.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${item.name}</strong></td>
                    <td>${item.role}</td>
                    <td>${item.areas || ''}</td>
                    <td>
                        <div class="action-buttons">
                            <a href="editor-equipa.html?id=${item.id}" class="btn-action edit" title="Editar">✏️</a>
                            <button class="btn-action delete" onclick="deleteMembro('${item.id}')" title="Apagar">🗑️</button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        }
        
        window.deleteMembro = function(id) {
            if (confirm('Tem a certeza que deseja eliminar este membro?')) {
                MockDB.deleteMember(id);
                renderTable();
            }
        };
        
        renderTable();
    }
    
    // --- Editor Page Logic ---
    const form = document.getElementById('equipa-form');
    if (form) {
        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('id');
        
        if (editId) {
            document.getElementById('editor-title').textContent = 'Editar Membro';
            const item = MockDB.getMember(editId);
            if (item) {
                document.getElementById('membro-id').value = item.id;
                document.getElementById('membro-name').value = item.name;
                document.getElementById('membro-role').value = item.role;
                document.getElementById('membro-areas').value = item.areas || '';
                document.getElementById('membro-photo').value = item.photo || '';
                document.getElementById('membro-bio').value = item.bio || '';
                document.getElementById('membro-cv').value = item.cv || '';
            }
        }
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const memberData = {
                id: document.getElementById('membro-id').value || 'm_' + Date.now(),
                name: document.getElementById('membro-name').value,
                role: document.getElementById('membro-role').value,
                areas: document.getElementById('membro-areas').value,
                photo: document.getElementById('membro-photo').value,
                bio: document.getElementById('membro-bio').value,
                cv: document.getElementById('membro-cv').value,
            };
            
            MockDB.saveMember(memberData);
            window.location.href = 'equipa.html';
        });
    }
});
"""

with open(os.path.join(base_path, 'equipa.html'), 'w', encoding='utf-8') as f:
    f.write(equipa_html)
    
with open(os.path.join(base_path, 'editor-equipa.html'), 'w', encoding='utf-8') as f:
    f.write(editor_equipa_html)
    
with open(os.path.join(base_path, 'js/equipa.js'), 'w', encoding='utf-8') as f:
    f.write(equipa_js)

print("Created equipa management files successfully.")
