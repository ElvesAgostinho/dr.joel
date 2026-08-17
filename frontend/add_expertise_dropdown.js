const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const expertiseDropdown = `<li class="nav-item">
                        <a href="expertise.html" data-i18n="nav_expertise">Áreas de Prática</a>
                        <div class="dropdown-popup">
                            <div class="dropdown-content">
                                <ul>
                                    <li><a href="expertise.html#financeiro">Financeiro e Governance</a></li>
                                    <li><a href="expertise.html#reestruturacao">Reestruturação Empresarial e Privatizações</a></li>
                                    <li><a href="expertise.html#comercial">Comercial, Societário e M&A</a></li>
                                    <li><a href="expertise.html#imobiliario">Imobiliário</a></li>
                                    <li><a href="expertise.html#laboral">Laboral</a></li>
                                    <li><a href="expertise.html#fiscal">Fiscal</a></li>
                                    <li><a href="expertise.html#ppp">Parcerias Público Privadas</a></li>
                                    <li><a href="expertise.html#contratacao">Contratação Pública</a></li>
                                    <li><a href="expertise.html#contencioso">Contencioso e Arbitragem</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Match the simple Expertise link (which might have data-i18n or not)
    const regex = /<li class="nav-item">\s*<a href="expertise\.html"[^>]*>Expertise<\/a>\s*<\/li>/g;
    content = content.replace(regex, expertiseDropdown);

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
