document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("posts-tbody");

    function renderPosts() {
        const posts = MockDB.getPosts();
        tbody.innerHTML = "";

        if (posts.length === 0) {
            tbody.innerHTML = "<tr><td colspan='4'>Nenhuma publicação encontrada.</td></tr>";
            return;
        }

        posts.forEach(post => {
            const tr = document.createElement("tr");
            
            const date = new Date(post.createdAt).toLocaleDateString('pt-PT');
            const statusBadge = post.published 
                ? `<span class="badge badge-success">Publicado</span>`
                : `<span class="badge badge-warning">Rascunho</span>`;

            tr.innerHTML = `
                <td><strong>${post.title}</strong></td>
                <td>${date}</td>
                <td>${statusBadge}</td>
                <td class="actions">
                    <a href="editor.html?id=${post.id}" class="btn btn-outline" style="padding: 5px 10px;">Editar</a>
                    <button class="btn btn-danger" onclick="deletePost('${post.id}')" style="padding: 5px 10px;">Apagar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.deletePost = function deletePost(id) {
        if(confirm('Tem a certeza que deseja eliminar esta publicação?')) {
            MockDB.deletePost(id);
            renderPosts();
        }
    }

    function initEditor() {
        const form = document.getElementById('post-form');
        if (!form) return; // Só corre na página admin/editor.html

        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (postId) {
            document.getElementById('page-title').textContent = 'Editar Publicação';
            const post = MockDB.getPost(postId);
            if (post) {
                document.getElementById('post-id').value = post.id;
                document.getElementById('post-title').value = post.title;
                document.getElementById('post-category').value = post.category || 'PUBLICAÇÕES';
                document.getElementById('post-image').value = post.coverImage || '';
                document.getElementById('post-content').value = post.content || '';
                const publishedCheckbox = document.getElementById('post-published');
                if (publishedCheckbox) publishedCheckbox.checked = post.published;
            }
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const publishedCheckbox = document.getElementById('post-published');
            const post = {
                id: document.getElementById('post-id').value,
                title: document.getElementById('post-title').value,
                category: document.getElementById('post-category').value,
                coverImage: document.getElementById('post-image').value,
                content: document.getElementById('post-content').value,
                published: publishedCheckbox ? publishedCheckbox.checked : true,
            };

            MockDB.savePost(post);
            window.location.href = 'index.html';
        });
    }

    // --- GESTÃO DE EQUIPA ---

    function renderTeamTable() {
        const tbody = document.getElementById('team-tbody');
        if (!tbody) return; // Só corre na página admin/equipa.html
        
        tbody.innerHTML = '';
        const team = MockDB.getTeam();
        
        if (team.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum membro encontrado.</td></tr>';
            return;
        }

        team.forEach(member => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${member.name}</strong></td>
                <td>${member.role}</td>
                <td>${member.area}</td>
                <td>
                    <a href="editor-equipa.html?id=${member.id}" class="btn btn-outline" style="padding: 5px 10px; font-size: 0.8rem;">Editar</a>
                    <button onclick="deleteMember('${member.id}')" class="btn btn-outline" style="padding: 5px 10px; font-size: 0.8rem; border-color: red; color: red;">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function initTeamEditor() {
        const form = document.getElementById('team-form');
        if (!form) return; // Só corre na página admin/editor-equipa.html

        const urlParams = new URLSearchParams(window.location.search);
        const memberId = urlParams.get('id');
        
        const imgInput = document.getElementById('tm-img');
        const imgUpload = document.getElementById('tm-img-upload');
        const imgPreview = document.getElementById('tm-img-preview');

        if (memberId) {
            document.getElementById('editor-team-title').textContent = 'Editar Membro';
            const member = MockDB.getMember(memberId);
            if (member) {
                document.getElementById('tm-id').value = member.id;
                document.getElementById('tm-name').value = member.name;
                document.getElementById('tm-role').value = member.role;
                document.getElementById('tm-area').value = member.area || '';
                document.getElementById('tm-phone').value = member.phone || '';
                document.getElementById('tm-email').value = member.email || '';
                
                if (member.img) {
                    imgInput.value = member.img;
                    imgPreview.src = member.img;
                }
                
                document.getElementById('tm-bio').value = member.bio || '';
                document.getElementById('tm-habilitacoes').value = member.habilitacoes || '';
                document.getElementById('tm-experiencia').value = member.experiencia || '';
                document.getElementById('tm-associacoes').value = member.associacoes || '';
                document.getElementById('tm-linguas').value = member.linguas || '';
            }
        }

        if (imgUpload) {
            imgUpload.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const base64Str = event.target.result;
                        imgInput.value = base64Str;
                        imgPreview.src = base64Str;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const member = {
                id: document.getElementById('tm-id').value,
                name: document.getElementById('tm-name').value,
                role: document.getElementById('tm-role').value,
                area: document.getElementById('tm-area').value,
                phone: document.getElementById('tm-phone').value,
                email: document.getElementById('tm-email').value,
                img: document.getElementById('tm-img').value || 'assets/images/bg-1.jpg',
                bio: document.getElementById('tm-bio').value,
                habilitacoes: document.getElementById('tm-habilitacoes').value,
                experiencia: document.getElementById('tm-experiencia').value,
                associacoes: document.getElementById('tm-associacoes').value,
                linguas: document.getElementById('tm-linguas').value,
            };

            MockDB.saveMember(member);
            window.location.href = 'equipa.html';
        });
    }

    window.deleteMember = function deleteMember(id) {
        if(confirm('Tem a certeza que deseja eliminar este membro?')) {
            MockDB.deleteMember(id);
            renderTeamTable();
        }
    }

    renderPosts();
    renderTeamTable();
    initTeamEditor();
    initEditor();

    // Stats Management
    const stats = MockDB.getStats();
    const statPessoas = document.getElementById('stat-input-pessoas');
    const statAdvogados = document.getElementById('stat-input-advogados');
    const statJurisdicoes = document.getElementById('stat-input-jurisdicoes');
    const btnSaveStats = document.getElementById('btn-save-stats');

    if (statPessoas && statAdvogados && statJurisdicoes && btnSaveStats) {
        statPessoas.value = stats.pessoas;
        statAdvogados.value = stats.advogados;
        statJurisdicoes.value = stats.jurisdicoes;

        btnSaveStats.addEventListener('click', () => {
            const newStats = {
                pessoas: parseInt(statPessoas.value) || 0,
                advogados: parseInt(statAdvogados.value) || 0,
                jurisdicoes: parseInt(statJurisdicoes.value) || 0
            };
            MockDB.saveStats(newStats);
            alert("Estatísticas atualizadas com sucesso! As alterações já estão visíveis na página inicial.");
        });
    }
});
