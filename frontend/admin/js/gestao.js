document.addEventListener('DOMContentLoaded', () => {
    // Carregar número de profissionais
    const teamCountInput = document.getElementById('team-count');
    const storedTeamCount = localStorage.getItem('mj_team_count');
    if(storedTeamCount) {
        teamCountInput.value = storedTeamCount;
    }

    document.getElementById('save-team-count').addEventListener('click', () => {
        const count = teamCountInput.value;
        localStorage.setItem('mj_team_count', count);
        alert('Número de profissionais guardado com sucesso!');
    });

    // Função de utilidade para gerir galerias com Base64
    function initGalleryManager(sectionKey) {
        const inputFile = document.getElementById('img-' + sectionKey + '-file');
        const addBtn = document.getElementById('add-img-' + sectionKey);
        const galleryContainer = document.getElementById('gallery-' + sectionKey);
        
        // Carregar do localStorage
        let images = JSON.parse(localStorage.getItem('mj_gallery_' + sectionKey)) || [];

        function renderGallery() {
            galleryContainer.innerHTML = '';
            images.forEach((url, index) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'img-wrapper';
                
                const img = document.createElement('img');
                img.src = url;
                img.onerror = () => { img.src = '../assets/images/placeholder.jpg'; };

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-img';
                removeBtn.innerHTML = 'X';
                removeBtn.onclick = () => {
                    images.splice(index, 1);
                    saveAndRender();
                };

                wrapper.appendChild(img);
                wrapper.appendChild(removeBtn);
                galleryContainer.appendChild(wrapper);
            });
        }

        function saveAndRender() {
            localStorage.setItem('mj_gallery_' + sectionKey, JSON.stringify(images));
            renderGallery();
        }

        addBtn.addEventListener('click', () => {
            const file = inputFile.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Image = e.target.result;
                    images.push(base64Image);
                    inputFile.value = '';
                    saveAndRender();
                };
                reader.readAsDataURL(file);
            } else {
                alert("Selecione um ficheiro de imagem primeiro.");
            }
        });

        renderGallery();
    }

    // Inicializar as 3 galerias
    initGalleryManager('firma');
    initGalleryManager('premios');
    initGalleryManager('carreiras');
});
