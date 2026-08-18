document.addEventListener("DOMContentLoaded", () => {
    // Custom handlers for Quill upload
    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };
    }

    function videoHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'video/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                if (file.size > 20 * 1024 * 1024) { // Limit to 20MB
                    alert('O vídeo é muito grande. Por favor, escolha um ficheiro menor que 20MB.');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    const range = quill.getSelection(true);
                    const videoHtml = `<video src="${e.target.result}" controls style="max-width:100%; border-radius:8px; display:block; margin:15px 0;" muted></video><p><br></p>`;
                    quill.clipboard.dangerouslyPasteHTML(range.index, videoHtml);
                };
                reader.readAsDataURL(file);
            }
        };
    }

    // Initialize Quill editor
    const quill = new Quill('#editor-container', {
        theme: 'snow',
        modules: {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
                handlers: {
                    image: imageHandler,
                    video: videoHandler
                }
            }
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    const titleInput = document.getElementById('post-title');
    const coverInput = document.getElementById('post-cover');
    const categoryInput = document.getElementById('post-category');
    const publishedCheckbox = document.getElementById('post-published');
    const saveBtn = document.getElementById('btn-save');
    const pageTitle = document.getElementById('page-title');

    // Load existing post if ID is present
    if (postId) {
        pageTitle.textContent = "Editar Publicação";
        const post = MockDB.getPost(postId);
        if (post) {
            titleInput.value = post.title;
            coverInput.value = post.coverImage || '';
            if (post.category) {
                const cat = post.category.toUpperCase().trim();
                let optionExists = false;
                for (let i = 0; i < categoryInput.options.length; i++) {
                    if (categoryInput.options[i].value === cat) {
                        optionExists = true;
                        break;
                    }
                }
                if (!optionExists) {
                    const opt = document.createElement('option');
                    opt.value = cat;
                    opt.textContent = cat.charAt(0) + cat.slice(1).toLowerCase();
                    categoryInput.insertBefore(opt, categoryInput.options[categoryInput.options.length - 1]);
                }
                categoryInput.value = cat;
            }
            if (post.coverImage && typeof window.updateCoverPreview === 'function') {
                window.updateCoverPreview(post.coverImage);
            }
            publishedCheckbox.checked = post.published;
            // Load content into Quill
            quill.root.innerHTML = post.content;
        }
    }

    // Save functionality
    saveBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        if (!title) {
            alert("O título é obrigatório.");
            return;
        }

        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'A guardar...';
        saveBtn.disabled = true;

        const content = quill.root.innerHTML;
        
        const postData = {
            id: postId || null,
            title: title,
            category: categoryInput.value,
            coverImage: coverInput.value.trim(),
            content: content,
            published: publishedCheckbox.checked
        };

        MockDB.savePost(postData).then(() => {
            alert("Publicação guardada com sucesso!");
            window.location.href = "index.html";
        }).catch(err => {
            alert("Erro ao guardar publicação: " + err.message);
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        });
    });
});
