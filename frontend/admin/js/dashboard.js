document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("posts-tbody");

    function renderPosts() {
        if (!tbody) return;
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
                ? `<span class="badge badge-success" style="cursor:pointer;" onclick="togglePublish('${post.id}')" title="Clique para despublicar">Publicado</span>`
                : `<span class="badge badge-warning" style="cursor:pointer;" onclick="togglePublish('${post.id}')" title="Clique para publicar">Rascunho</span>`;

            tr.innerHTML = `
                <td><strong>${post.title}</strong><br><small style="color:#888;">${post.category || 'ARTIGO'}</small></td>
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

    // FIX: Esperar pela Promise antes de re-renderizar
    window.togglePublish = function togglePublish(id) {
        MockDB.togglePublish(id).then(function() {
            renderPosts();
        }).catch(function(err) {
            alert('Erro ao alterar estado: ' + err.message);
        });
    };

    // FIX: Esperar pela Promise antes de re-renderizar
    window.deletePost = function deletePost(id) {
        if (confirm('Tem a certeza que deseja eliminar esta publicação?')) {
            MockDB.deletePost(id).then(function() {
                renderPosts();
            }).catch(function(err) {
                alert('Erro ao eliminar publicação: ' + err.message);
            });
        }
    };

    renderPosts();

    // Re-renderizar se a BD for atualizada em segundo plano
    window.addEventListener('mj:db-updated', function(e) {
        if (e.detail && e.detail.key === 'mj_blog_posts') {
            renderPosts();
        }
    });

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
