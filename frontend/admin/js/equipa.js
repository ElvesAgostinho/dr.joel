document.addEventListener('DOMContentLoaded', () => {
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
                    <td>${item.area || item.areas || ''}</td>
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
        
        // Handle file uploads via Base64
        const photoFile = document.getElementById('membro-photo-file');
        const photoHidden = document.getElementById('membro-photo');
        if (photoFile) {
            photoFile.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        photoHidden.value = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        const cvFile = document.getElementById('membro-cv-file');
        const cvHidden = document.getElementById('membro-cv');
        if (cvFile) {
            cvFile.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        cvHidden.value = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('id');
        
        if (editId) {
            document.getElementById('editor-title').textContent = 'Editar Membro';
            const item = MockDB.getMember(editId);
            if (item) {
                document.getElementById('membro-id').value = item.id;
                document.getElementById('membro-name').value = item.name;
                document.getElementById('membro-role').value = item.role;
                document.getElementById('membro-areas').value = item.areas || item.area || '';
                document.getElementById('membro-email').value = item.email || '';
                document.getElementById('membro-phone').value = item.phone || '';
                document.getElementById('membro-photo').value = item.img || '';
                quill.root.innerHTML = item.bio || '';
                document.getElementById('membro-cv').value = item.cv || '';
            }
        }
        
        form.addEventListener('submit', (e) => {
            document.getElementById('membro-bio').value = quill.root.innerHTML;
            e.preventDefault();
            
            const memberData = {
                id: document.getElementById('membro-id').value || 'tm_' + Date.now(),
                name: document.getElementById('membro-name').value,
                role: document.getElementById('membro-role').value,
                area: document.getElementById('membro-areas').value,
                email: document.getElementById('membro-email').value,
                phone: document.getElementById('membro-phone').value,
                img: document.getElementById('membro-photo').value,
                bio: document.getElementById('membro-bio').value,
                cv: document.getElementById('membro-cv').value,
            };
            
            MockDB.saveMember(memberData);
            window.location.href = 'equipa.html';
        });
    }
});
