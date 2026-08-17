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
        const photoPreview = document.getElementById('photo-preview');
        const photoPreviewWrapper = document.getElementById('photo-preview-wrapper');

        if (photoFile) {
            photoFile.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        photoHidden.value = e.target.result;
                        if (photoPreview && photoPreviewWrapper) {
                            photoPreview.src = e.target.result;
                            photoPreviewWrapper.style.display = 'block';
                        }
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
            const editorTitle = document.getElementById('editor-title');
            if (editorTitle) editorTitle.textContent = 'Editar Membro';
            
            const item = MockDB.getMember(editId);
            if (item) {
                const setVal = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.value = val || '';
                };
                
                setVal('membro-id', item.id);
                setVal('membro-name', item.name);
                setVal('membro-role', item.role);
                setVal('membro-areas', item.areas || item.area);
                setVal('membro-email', item.email);
                setVal('membro-phone', item.phone);
                setVal('membro-photo', item.img);
                
                if (item.img && photoPreview && photoPreviewWrapper) {
                    photoPreview.src = item.img;
                    photoPreviewWrapper.style.display = 'block';
                }
                
                // Safe Quill content loading
                if (typeof quill !== 'undefined' && quill.root) {
                    quill.root.innerHTML = item.bio || '';
                } else {
                    const qEditor = document.getElementById('quill-editor');
                    if (qEditor) {
                        const qRoot = qEditor.querySelector('.ql-editor');
                        if (qRoot) qRoot.innerHTML = item.bio || '';
                        else qEditor.innerHTML = item.bio || '';
                    }
                }
                
                setVal('membro-cv', item.cv);
                setVal('membro-habilitacoes', item.habilitacoes);
                setVal('membro-experiencia', item.experiencia);
                setVal('membro-associacoes', item.associacoes);
                setVal('membro-linguas', item.linguas);
            }
        }
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Safe Quill content retrieval
            let bioContent = '';
            if (typeof quill !== 'undefined' && quill.root) {
                bioContent = quill.root.innerHTML;
            } else {
                const qEditor = document.getElementById('quill-editor');
                if (qEditor) {
                    const qRoot = qEditor.querySelector('.ql-editor');
                    bioContent = qRoot ? qRoot.innerHTML : qEditor.innerHTML;
                }
            }
            
            const bioField = document.getElementById('membro-bio');
            if (bioField) bioField.value = bioContent;
            
            const getVal = (id) => {
                const el = document.getElementById(id);
                return el ? el.value : '';
            };
            
            const memberData = {
                id: getVal('membro-id') || 'tm_' + Date.now(),
                name: getVal('membro-name'),
                role: getVal('membro-role'),
                area: getVal('membro-areas'),
                email: getVal('membro-email'),
                phone: getVal('membro-phone'),
                img: getVal('membro-photo'),
                bio: getVal('membro-bio'),
                cv: getVal('membro-cv'),
                habilitacoes: getVal('membro-habilitacoes'),
                experiencia: getVal('membro-experiencia'),
                associacoes: getVal('membro-associacoes'),
                linguas: getVal('membro-linguas'),
            };
            
            MockDB.saveMember(memberData);
            window.location.href = 'equipa.html';
        });
    }
});
