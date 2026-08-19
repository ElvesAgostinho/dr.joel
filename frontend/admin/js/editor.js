document.addEventListener("DOMContentLoaded", async () => {
    // Custom handlers for Quill upload
    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
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

        input.onchange = async () => {
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

    let currentGallery = [];

    const galleryFileInput = document.getElementById('post-gallery-files');
    const galleryGrid = document.getElementById('gallery-preview-grid');

    function renderGalleryGrid() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        currentGallery.forEach((itemUrl, idx) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.cssText = 'position: relative; border-radius: 8px; overflow: hidden; height: 100px; background: #222; border: 1px solid #ddd;';

            const isVideo = itemUrl.startsWith('data:video/') || /\.(mp4|webm|ogg)$/i.test(itemUrl);
            const mediaTag = isVideo
                ? `<video src="${itemUrl}" style="width:100%; height:100%; object-fit:cover;" muted></video>`
                : `<img src="${itemUrl}" style="width:100%; height:100%; object-fit:cover;">`;

            itemDiv.innerHTML = `
                ${mediaTag}
                <button type="button" onclick="window.removeGalleryItem(${idx})" style="position: absolute; top: 4px; right: 4px; background: rgba(220, 53, 69, 0.9); color: white; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; font-size: 12px; line-height: 1; display: flex; align-items: center; justify-content: center;">✕</button>
            `;
            galleryGrid.appendChild(itemDiv);
        });
    }

    window.removeGalleryItem = function(index) {
        currentGallery.splice(index, 1);
        renderGalleryGrid();
    };

    if (galleryFileInput) {
        galleryFileInput.addEventListener('change', async function() {
            const files = Array.from(this.files);
            if (files.length === 0) return;

            const total = files.length;
            let current = 0;

            if (galleryGrid) {
                const statusDiv = document.createElement('div');
                statusDiv.id = 'gallery-upload-status';
                statusDiv.style.cssText = 'grid-column: 1 / -1; padding: 12px; background: #e3f2fd; color: #0d47a1; border-radius: 6px; font-weight: 600; font-size: 0.9rem; margin-bottom: 10px;';
                statusDiv.textContent = `A carregar fotografias (0 de ${total})... Por favor, aguarde.`;
                galleryGrid.insertBefore(statusDiv, galleryGrid.firstChild);
            }

            for (const file of files) {
                current++;
                const statusDiv = document.getElementById('gallery-upload-status');
                if (statusDiv) {
                    statusDiv.textContent = `A carregar fotografias (${current} de ${total})... Por favor, aguarde.`;
                }

                try {
                    const url = await API.uploadMedia(file);
                    if (url) {
                        currentGallery.push(url);
                    }
                } catch(err) {
                    alert(`Erro no upload de "${file.name}": ` + err.message);
                }
            }

            renderGalleryGrid();
            this.value = '';
        });
    }

    // Handlers do Ficheiro PDF Anexo
    const pdfFileInput = document.getElementById('post-pdf-file');
    const pdfUrlHidden = document.getElementById('post-pdf-url');
    const pdfPreviewContainer = document.getElementById('pdf-preview-container');
    const pdfFileNameSpan = document.getElementById('pdf-file-name');
    const btnRemovePdf = document.getElementById('btn-remove-pdf');

    function updatePdfPreview(url) {
        if (!pdfPreviewContainer || !pdfFileNameSpan || !pdfUrlHidden) return;
        if (url) {
            pdfUrlHidden.value = url;
            const parts = url.split('/');
            const rawName = parts[parts.length - 1] || 'documento.pdf';
            const cleanName = rawName.includes('_') ? rawName.split('_').slice(2).join('_') || rawName : rawName;
            pdfFileNameSpan.textContent = decodeURIComponent(cleanName);
            pdfPreviewContainer.style.display = 'flex';
        } else {
            pdfUrlHidden.value = '';
            if (pdfFileInput) pdfFileInput.value = '';
            pdfPreviewContainer.style.display = 'none';
        }
    }

    if (pdfFileInput) {
        pdfFileInput.addEventListener('change', async function() {
            const file = this.files[0];
            if (!file) return;
            try {
                const url = await API.uploadMedia(file);
                if (url) {
                    updatePdfPreview(url);
                }
            } catch(err) {
                alert("Erro no upload do ficheiro PDF: " + err.message);
            }
        });
    }

    if (btnRemovePdf) {
        btnRemovePdf.addEventListener('click', function() {
            updatePdfPreview('');
        });
    }

    // Monetização e controlo de acesso
    const accessFreeRadio = document.getElementById('access-free');
    const accessPaidRadio = document.getElementById('access-paid');
    const paidSettingsContainer = document.getElementById('paid-settings-container');
    const priceInput = document.getElementById('post-price');
    const paymentInfoInput = document.getElementById('post-payment-info');

    function toggleAccessMode() {
        if (accessPaidRadio && accessPaidRadio.checked) {
            paidSettingsContainer.style.display = 'block';
        } else if (paidSettingsContainer) {
            paidSettingsContainer.style.display = 'none';
        }
    }

    if (accessFreeRadio && accessPaidRadio) {
        accessFreeRadio.addEventListener('change', toggleAccessMode);
        accessPaidRadio.addEventListener('change', toggleAccessMode);
    }

    // Load existing post if ID is present
    if (postId) {
        pageTitle.textContent = "Editar Publicação";
        const post = await API.getPost(postId);
        if (post) {
            titleInput.value = post.title;
            coverInput.value = post.coverImage || '';
            currentGallery = Array.isArray(post.gallery) ? post.gallery : [];
            renderGalleryGrid();
            if (post.pdfUrl) {
                updatePdfPreview(post.pdfUrl);
            }
            if (post.isPaid) {
                if (accessPaidRadio) accessPaidRadio.checked = true;
                if (priceInput) priceInput.value = post.price || '';
                if (paymentInfoInput && post.paymentInfo) paymentInfoInput.value = post.paymentInfo;
                toggleAccessMode();
            } else {
                if (accessFreeRadio) accessFreeRadio.checked = true;
                toggleAccessMode();
            }

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

        const isPaid = accessPaidRadio ? accessPaidRadio.checked : false;
        const price = priceInput ? priceInput.value.trim() : '';
        const paymentInfo = paymentInfoInput ? paymentInfoInput.value.trim() : '';

        if (isPaid && !price) {
            alert("Por favor, introduza o preço do artigo pago.");
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
            gallery: currentGallery,
            pdfUrl: pdfUrlHidden ? pdfUrlHidden.value.trim() : '',
            isPaid: isPaid,
            price: price,
            paymentInfo: paymentInfo,
            content: content,
            published: publishedCheckbox.checked
        };

        API.savePost(postData).then(() => {
            alert("Publicação guardada com sucesso!");
            window.location.href = "index.html";
        }).catch(err => {
            alert("Erro ao guardar publicação: " + err.message);
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        });
    });
});
