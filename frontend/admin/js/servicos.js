document.addEventListener('DOMContentLoaded', async () => {
    renderServicosTable();
});

async function renderServicosTable() {
    const tbody = document.getElementById('servicos-tbody');
    if (!tbody || typeof API === 'undefined') return;

    try {
        const types = await API.getRequestTypes();
        tbody.innerHTML = '';

        if (!types || types.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2" style="text-align:center;">Nenhum tipo de solicitação criado. Clique em "+ Novo Tipo".</td></tr>';
            return;
        }

        types.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${escapeHtml(item.title)}</strong></td>
                <td>
                    <button class="btn btn-outline" onclick="editarServico('${item.id}', '${escapeHtml(item.title).replace(/'/g, "\'")}')" style="padding: 5px 10px; font-size: 0.8rem; margin-right:5px;">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarServico('${item.id}')" style="padding: 5px 10px; font-size: 0.8rem;">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="2" style="text-align:center; color:red;">Erro ao carregar tipos de solicitação: ${err.message}</td></tr>`;
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

window.novoServico = function() {
    document.getElementById('servico-id').value = '';
    document.getElementById('servico-title').value = '';
    document.getElementById('servico-modal-title').textContent = 'Novo Tipo de Solicitação';
    document.getElementById('servico-modal').style.display = 'flex';
};

window.editarServico = function(id, title) {
    document.getElementById('servico-id').value = id;
    document.getElementById('servico-title').value = title;
    document.getElementById('servico-modal-title').textContent = 'Editar Tipo de Solicitação';
    document.getElementById('servico-modal').style.display = 'flex';
};

window.fecharModalServico = function() {
    document.getElementById('servico-modal').style.display = 'none';
};

window.salvarServico = async function() {
    const id = document.getElementById('servico-id').value;
    const title = document.getElementById('servico-title').value.trim();

    if (!title) {
        alert('Por favor, preencha o nome do tipo de solicitação!');
        return;
    }

    try {
        await API.saveRequestType({ id: id, title: title });
        window.fecharModalServico();
        await renderServicosTable();
    } catch (err) {
        alert('Erro ao guardar: ' + err.message);
    }
};

window.eliminarServico = async function(id) {
    if (confirm('Tem a certeza que deseja eliminar esta opção do formulário?')) {
        try {
            await API.deleteRequestType(id);
            await renderServicosTable();
        } catch (err) {
            alert('Erro ao eliminar: ' + err.message);
        }
    }
};
