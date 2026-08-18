document.addEventListener('DOMContentLoaded', async () => {
    renderSobreNosTable();

    // Re-renderizar se a BD for atualizada em segundo plano
    
});

async function renderSobreNosTable() {
    const tbody = document.getElementById('sobrenos-tbody');
    if (!tbody || typeof API === 'undefined') return;

    const pages = await API.getSobreNosPages();
    tbody.innerHTML = '';

    if (pages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Nenhuma página encontrada. A sincronizar...</td></tr>';
        return;
    }

    pages.forEach(page => {
        const tr = document.createElement('tr');
        const dateStr = page.lastUpdated
            ? new Date(page.lastUpdated).toLocaleDateString('pt-PT', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })
            : '—';

        tr.innerHTML = `
            <td><strong>${page.title}</strong><br><small style="color: #666;">(${page.id}.html)</small></td>
            <td>${dateStr}</td>
            <td>
                <button class="btn btn-outline" onclick="editSobreNos('${page.id}')" style="padding: 5px 10px; font-size: 0.8rem;">Editar Página</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editSobreNos(id) {
    window.location.href = `editor-sobrenos.html?id=${id}`;
}
