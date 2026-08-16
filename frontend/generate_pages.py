import os
import re

dir_path = r'c:\Users\DELL\Desktop\Dr. Joel\frontend'
template_file = os.path.join(dir_path, 'contactos.html')

pages = {
    'politica-seguranca.html': {
        'title': 'Política de Segurança de Informação',
        'content': '''
            <h2>1. Introdução</h2>
            <p>A M&J Sociedade de Advogados está comprometida com a proteção e a segurança da informação dos seus clientes, parceiros e colaboradores. Esta Política de Segurança de Informação estabelece as diretrizes para garantir a confidencialidade, integridade e disponibilidade dos dados.</p>
            <h2>2. Medidas de Segurança</h2>
            <p>Implementamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra a destruição acidental ou ilícita, a perda, a alteração, a difusão ou o acesso não autorizado, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a Lei Geral de Proteção de Dados (LGPD).</p>
            <ul>
                <li>Criptografia de dados em trânsito e em repouso.</li>
                <li>Controlo de acessos restrito a colaboradores autorizados.</li>
                <li>Auditorias regulares aos sistemas de informação.</li>
            </ul>
            <h2>3. Contacto</h2>
            <p>Para qualquer questão relacionada com a segurança da informação, contacte-nos através de geral@marioejoeladv.com.</p>
        '''
    },
    'politica-privacidade.html': {
        'title': 'Política de Privacidade',
        'content': '''
            <h2>1. Âmbito</h2>
            <p>Esta Política de Privacidade descreve como a M&J recolhe, utiliza e protege os seus dados pessoais quando visita o nosso website, de acordo com o RGPD e a LGPD.</p>
            <h2>2. Dados Recolhidos</h2>
            <p>Recolhemos dados pessoais apenas quando fornecidos voluntariamente pelo utilizador, como nome, endereço de e-mail e número de telefone, através de formulários de contacto ou subscrição de newsletters.</p>
            <h2>3. Finalidade do Tratamento</h2>
            <p>Os dados recolhidos são utilizados exclusivamente para as finalidades para as quais foram fornecidos, incluindo resposta a pedidos de contacto, envio de comunicações institucionais e melhoria da experiência do utilizador.</p>
            <h2>4. Direitos do Titular</h2>
            <p>Tem o direito de solicitar o acesso, retificação, eliminação, limitação do tratamento, portabilidade e oposição ao tratamento dos seus dados pessoais. Pode exercer estes direitos contactando-nos.</p>
        '''
    },
    'termos-utilizacao.html': {
        'title': 'Termos de Utilização',
        'content': '''
            <h2>1. Aceitação dos Termos</h2>
            <p>Ao aceder e utilizar este website, o utilizador concorda com os presentes Termos de Utilização. Caso não concorde, deverá cessar a utilização do website.</p>
            <h2>2. Propriedade Intelectual</h2>
            <p>Todo o conteúdo presente neste website, incluindo textos, imagens, logótipos e código, é propriedade da M&J ou de terceiros com licença para a sua utilização. É estritamente proibida a reprodução sem autorização prévia.</p>
            <h2>3. Isenção de Responsabilidade</h2>
            <p>A informação disponibilizada neste website tem carácter meramente informativo e não constitui aconselhamento jurídico. A M&J não se responsabiliza por quaisquer danos resultantes da utilização das informações aqui contidas.</p>
        '''
    },
    'politica-cookies.html': {
        'title': 'Política de Cookies',
        'content': '''
            <h2>1. O que são Cookies?</h2>
            <p>Cookies são pequenos ficheiros de texto armazenados no seu dispositivo pelo navegador (browser) quando visita um website. Ajudam o website a memorizar informações sobre a sua visita, facilitando a navegação.</p>
            <h2>2. Que Cookies utilizamos?</h2>
            <ul>
                <li><strong>Cookies Estritamente Necessários:</strong> Essenciais para o funcionamento do website.</li>
                <li><strong>Cookies de Desempenho e Analíticos:</strong> Recolhem informações sobre a utilização do website (ex: Google Analytics) de forma anónima.</li>
                <li><strong>Cookies de Funcionalidade:</strong> Permitem memorizar as preferências do utilizador (ex: idioma).</li>
            </ul>
            <h2>3. Gestão de Cookies</h2>
            <p>Pode gerir as suas preferências na nossa página de <a href="definicoes-cookies.html">Definições de Cookies</a> ou através do seu navegador.</p>
        '''
    },
    'definicoes-cookies.html': {
        'title': 'Definições de cookies',
        'content': '''
            <h2>Gestão de Preferências</h2>
            <p>Pode alterar as suas preferências de cookies a qualquer momento.</p>
            
            <div style="border: 1px solid var(--color-border); padding: 20px; border-radius: 8px; margin-top: 30px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--color-border); padding-bottom: 15px;">
                    <div>
                        <h3 style="margin-top: 0;">Cookies Estritamente Necessários</h3>
                        <p style="font-size: 0.9rem;">Sempre ativos. Necessários para o funcionamento do site.</p>
                    </div>
                    <div>
                        <input type="checkbox" checked disabled>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--color-border); padding-bottom: 15px;">
                    <div>
                        <h3 style="margin-top: 0;">Cookies Analíticos</h3>
                        <p style="font-size: 0.9rem;">Ajudam-nos a compreender como os visitantes interagem com o site.</p>
                    </div>
                    <div>
                        <input type="checkbox" id="analytics-cookies" checked>
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="alert('Preferências guardadas com sucesso.');" style="padding: 10px 20px;">Guardar Preferências</button>
            </div>
        '''
    }
}

with open(template_file, 'r', encoding='utf-8') as f:
    template_content = f.read()

# Replace the main block
regex = re.compile(r'<!-- Sub-header -->.*?</main>', re.DOTALL)

for filename, data in pages.items():
    new_main = f'''<!-- Main Content -->
    <main class="legal-page container section-padding fade-in">
        <h1 class="page-title">{data["title"]}</h1>
        <div class="legal-content">
            <p><strong>Última atualização:</strong> 8 de Agosto de 2026</p>
            {data["content"]}
        </div>
    </main>'''
    
    page_content = regex.sub(new_main, template_content)
    # Update title tag
    page_content = re.sub(r'<title>.*?</title>', f'<title>{data["title"]} - Mário & Joel</title>', page_content)
    
    with open(os.path.join(dir_path, filename), 'w', encoding='utf-8') as f:
        f.write(page_content)

print("Pages created.")
