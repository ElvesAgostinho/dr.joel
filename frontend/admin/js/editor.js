document.addEventListener("DOMContentLoaded", () => {
    // Initialize Quill editor
    const quill = new Quill('#editor-container', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image', 'video'],
                ['clean']
            ]
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
            if(post.category) categoryInput.value = post.category;
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

        const content = quill.root.innerHTML;
        
        const postData = {
            id: postId || null,
            title: title,
            category: categoryInput.value,
            coverImage: coverInput.value.trim(),
            content: content,
            published: publishedCheckbox.checked
        };

        MockDB.savePost(postData);
        alert("Publicação guardada com sucesso!");
        window.location.href = "index.html";
    });
});
