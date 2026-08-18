document.addEventListener('DOMContentLoaded', async () => {
    renderContactosTable();
});

async function renderContactosTable() {
    const tbody = document.getElementById('contactos-tbody');
    if (!tbody || typeof API === 'undefined') return;

    try {
        const contacts = await API.getContacts();
        tbody.innerHTML = '';

        if (!contacts || contacts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum pedido de contacto/agendamento registado.</td></tr>';
            return;
        }

        contacts.forEach(contact => {
            const tr = document.createElement('tr');
            const dateStr = contact.createdAt
                ? new Date(contact.createdAt).toLocaleDateString('pt-PT', {
                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })
                : '—';

            tr.innerHTML = `
                <td>${dateStr}</td>
                <td><strong>${escapeHtml(contact.nome)}</strong><br><small style="color:#666;">${escapeHtml(contact.empresa || '')}</small></td>
                <td><a href="mailto:${escapeHtml(contact.email)}" style="color:var(--color-accent); text-decoration:none;">${escapeHtml(contact.email)}</a><br><small>${escapeHtml(contact.telefone || '')}</small></td>
                <td><span class="badge badge-info" style="background:#e0f2fe; color:#0369a1; padding:4px 8px; border-radius:4px; font-size:0.85rem;">${escapeHtml(contact.assunto || 'Informações')}</span></td>
                <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(contact.mensagem || '')}</td>
                <td>
                    <button class="btn btn-outline" onclick="verContacto('${contact.id}')" style="padding: 5px 10px; font-size: 0.8rem; margin-right:5px;">Ver Detalhes</button>
                    <button class="btn btn-danger" onclick="eliminarContacto('${contact.id}')" style="padding: 5px 10px; font-size: 0.8rem;">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Erro ao carregar pedidos: ${err.message}</td></tr>`;
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

window.verContacto = async function(id) {
    const contacts = await API.getContacts();
    const c = contacts.find(item => item.id === id);
    if (!c) return;

    const modal = document.getElementById('contact-modal');
    const body = document.getElementById('contact-modal-body');
    if (!modal || !body) return;

    const dateStr = c.createdAt ? new Date(c.createdAt).toLocaleString('pt-PT') : '—';

    body.innerHTML = `
        <p style="margin-bottom:10px;"><strong>Data do Pedido:</strong> ${dateStr}</p>
        <p style="margin-bottom:10px;"><strong>Nome:</strong> ${escapeHtml(c.nome)}</p>
        <p style="margin-bottom:10px;"><strong>E-mail:</strong> <a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></p>
        <p style="margin-bottom:10px;"><strong>Telefone:</strong> ${escapeHtml(c.telefone || 'N/A')}</p>
        <p style="margin-bottom:10px;"><strong>Empresa:</strong> ${escapeHtml(c.empresa || 'Particular')}</p>
        <p style="margin-bottom:15px;"><strong>Tipo / Assunto:</strong> <span style="background:#e0f2fe; color:#0369a1; padding:3px 8px; border-radius:4px; font-weight:600;">${escapeHtml(c.assunto || 'Informações')}</span></p>
        <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
        <p style="font-weight:600; margin-bottom:5px;">Mensagem / Detalhes:</p>
        <div style="background:#f8f9fa; padding:15px; border-radius:8px; border-left:4px solid #c5a880; line-height:1.6; white-space:pre-wrap;">${escapeHtml(c.mensagem)}</div>
    `;

    modal.style.display = 'flex';
};

window.fecharModalContacto = function() {
    const modal = document.getElementById('contact-modal');
    if (modal) modal.style.display = 'none';
};

window.eliminarContacto = async function(id) {
    if (confirm('Tem a certeza que deseja eliminar este pedido?')) {
        try {
            await API.deleteContact(id);
            await renderContactosTable();
        } catch (err) {
            alert('Erro ao eliminar: ' + err.message);
        }
    }
};
