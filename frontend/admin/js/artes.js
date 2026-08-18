document.addEventListener('DOMContentLoaded', async () => {
    renderArtesTable();

    // Re-renderizar se a BD for atualizada em segundo plano
    
});

async function renderArtesTable() {
    const tbody = document.getElementById('artes-tbody');
    if (!tbody || typeof API === 'undefined') return;

    const artes = await API.getArtes();
    tbody.innerHTML = '';

    if (artes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Sem artes publicadas.</td></tr>';
        return;
    }

    artes.forEach(arte => {
        const tr = document.createElement('tr');
        const dateStr = arte.createdAt ? new Date(arte.createdAt).toLocaleDateString('pt-PT') : '—';

        // Suporte para imagem e vídeo
        const isVideo = arte.image && (arte.image.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(arte.image));
        const mediaThumbnail = arte.image
            ? (isVideo
                ? `<video src="${arte.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" muted></video>`
                : `<img src="${arte.image}" alt="Arte" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">`)
            : '<span style="color:#999;">Sem imagem</span>';

        tr.innerHTML = `
            <td>${mediaThumbnail}</td>
            <td><strong>${arte.title}</strong></td>
            <td>${dateStr}</td>
            <td>
                <button class="btn btn-outline" onclick="editArte('${arte.id}')" style="padding: 5px 10px; font-size: 0.8rem; margin-right: 5px;">Editar</button>
                <button class="btn btn-danger" onclick="deleteArte('${arte.id}')" style="padding: 5px 10px; font-size: 0.8rem;">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editArte(id) {
    window.location.href = `editor-arte.html?id=${id}`;
}

// FIX: Esperar pela Promise antes de re-renderizar
async function deleteArte(id) {
    if (confirm('Tem a certeza que deseja eliminar esta obra de arte?')) {
        API.deleteArte(id).then(function() {
            renderArtesTable();
        }).catch(function(err) {
            alert('Erro ao eliminar: ' + err.message);
        });
    }
}
