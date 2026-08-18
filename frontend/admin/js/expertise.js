document.addEventListener('DOMContentLoaded', () => {
    renderExpertiseTable();

    // Re-renderizar se a BD for atualizada em segundo plano
    window.addEventListener('mj:db-updated', function(e) {
        if (e.detail && e.detail.key === 'mj_expertise') {
            renderExpertiseTable();
        }
    });
});

function renderExpertiseTable() {
    const tbody = document.getElementById('expertise-tbody');
    if (!tbody || typeof MockDB === 'undefined') return;

    const items = MockDB.getExpertise();
    tbody.innerHTML = '';

    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Sem áreas de prática.</td></tr>';
        return;
    }

    items.forEach(item => {
        const tr = document.createElement('tr');
        const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-PT') : '—';

        tr.innerHTML = `
            <td><strong>${item.title}</strong></td>
            <td>${dateStr}</td>
            <td>
                <button class="btn btn-outline" onclick="editExpertise('${item.id}')" style="padding: 5px 10px; font-size: 0.8rem; margin-right: 5px;">Editar</button>
                <button class="btn btn-danger" onclick="deleteExpertise('${item.id}')" style="padding: 5px 10px; font-size: 0.8rem;">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editExpertise(id) {
    window.location.href = `editor-expertise.html?id=${id}`;
}

// FIX: Esperar pela Promise antes de re-renderizar
function deleteExpertise(id) {
    if (confirm('Tem a certeza que deseja eliminar esta área de prática?')) {
        MockDB.deleteExpertiseItem(id).then(function() {
            renderExpertiseTable();
        }).catch(function(err) {
            alert('Erro ao eliminar: ' + err.message);
        });
    }
}
