document.addEventListener('DOMContentLoaded', () => {
    renderArtesTable();
});

function renderArtesTable() {
    const tbody = document.getElementById('artes-tbody');
    if (!tbody || typeof MockDB === 'undefined') return;
    
    const artes = MockDB.getArtes();
    tbody.innerHTML = '';
    
    if (artes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Sem artes publicadas.</td></tr>';
        return;
    }
    
    artes.forEach(arte => {
        const tr = document.createElement('tr');
        const dateStr = new Date(arte.createdAt).toLocaleDateString('pt-PT');
        
        tr.innerHTML = `
            <td><img src="../${arte.image}" alt="Arte" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;"></td>
            <td><strong>${arte.title}</strong></td>
            <td>${dateStr}</td>
            <td>
                <button class="btn btn-primary" onclick="editArte('${arte.id}')" style="padding: 5px 10px; font-size: 0.8rem; margin-right: 5px;">Editar</button>
                <button class="btn btn-primary" onclick="deleteArte('${arte.id}')" style="padding: 5px 10px; font-size: 0.8rem; background-color: #dc3545; border-color: #dc3545;">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editArte(id) {
    window.location.href = `editor-arte.html?id=${id}`;
}

function deleteArte(id) {
    if (confirm('Tem a certeza que deseja eliminar esta obra de arte?')) {
        MockDB.deleteArte(id);
        renderArtesTable();
    }
}
