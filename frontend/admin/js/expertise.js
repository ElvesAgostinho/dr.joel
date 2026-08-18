document.addEventListener('DOMContentLoaded', async () => {
    await renderExpertiseTable();
});

async function renderExpertiseTable() {
    const tbody = document.getElementById('expertise-tbody');
    if (!tbody || typeof API === 'undefined') return;

    const items = await API.getExpertise();
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

async function deleteExpertise(id) {
    if (confirm('Tem a certeza que deseja eliminar esta área de prática?')) {
        try {
            await API.deleteExpertise(id);
            await renderExpertiseTable();
        } catch (err) {
            alert('Erro ao eliminar: ' + err.message);
        }
    }
}
