document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('articles-tbody');
    const saveBtn = document.getElementById('save-article');
    
    let articles = JSON.parse(localStorage.getItem('mj_articles')) || [];

    // Se estiver vazio, vamos inserir dados default para poder apagar (como pedido)
    if(articles.length === 0 && !localStorage.getItem('mj_articles_initialized')) {
        articles = [
            {
                id: 1,
                title: 'Nova Lei das Comunicações Eletrónicas',
                category: 'NOTÍCIAS & IMPRENSA',
                date: '2023-11-20',
                img: '../assets/images/placeholder.jpg',
                content: 'Resumo sobre a nova lei...'
            },
            {
                id: 2,
                title: 'M&J participa em conferência',
                category: 'EVENTOS',
                date: '2023-11-15',
                img: '../assets/images/placeholder.jpg',
                content: 'A nossa equipa esteve presente...'
            }
        ];
        localStorage.setItem('mj_articles', JSON.stringify(articles));
        localStorage.setItem('mj_articles_initialized', 'true');
    }

    function renderTable() {
        tbody.innerHTML = '';
        articles.forEach((art, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = \
                <td><img src="\" style="width:60px; height:40px; object-fit:cover; border-radius:4px;"></td>
                <td>\</td>
                <td>\</td>
                <td>\</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteArticle(\)">Apagar</button>
                </td>
            \;
            tbody.appendChild(tr);
        });
    }

    window.deleteArticle = function(index) {
        if(confirm('Tem a certeza que deseja apagar este artigo?')) {
            articles.splice(index, 1);
            localStorage.setItem('mj_articles', JSON.stringify(articles));
            renderTable();
        }
    };

    saveBtn.addEventListener('click', () => {
        const title = document.getElementById('article-title').value;
        const category = document.getElementById('article-category').value;
        const date = document.getElementById('article-date').value;
        const content = document.getElementById('article-content').value;
        const fileInput = document.getElementById('article-img-file');
        const file = fileInput.files[0];

        if(!title || !category || !date) {
            alert('Preencha os campos obrigatórios (Título, Categoria, Data).');
            return;
        }

        const newArticle = {
            id: Date.now(),
            title, category, date, content,
            img: '../assets/images/placeholder.jpg' // Default se nao enviar
        };

        if(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newArticle.img = e.target.result;
                articles.push(newArticle);
                finishSave();
            };
            reader.readAsDataURL(file);
        } else {
            articles.push(newArticle);
            finishSave();
        }

        function finishSave() {
            localStorage.setItem('mj_articles', JSON.stringify(articles));
            renderTable();
            // Reset form
            document.getElementById('article-title').value = '';
            document.getElementById('article-date').value = '';
            document.getElementById('article-content').value = '';
            fileInput.value = '';
            alert('Artigo publicado!');
        }
    });

    renderTable();
});
