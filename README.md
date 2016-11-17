# sigle-page-track
Criando um componente para inserir ancoras e fazer um pageview no google analytics automaticamente em sites single page.
Também aproveitando para estudar um pouco de javascript. 

<h3>
Exemplo de configuração:
</h3>

<p>
  Site single page com 5 páginas. Todas páginas precisam disparar um pageview no google analytics a primeira vez que são acessadas. 
</p>

<code>
	
var site = {
	config: {
		trackAllPages: true, 
	},

	pages: {

		solucao: {
			element: "solucao",
			pageview: {
				allow: false,
				status: false
			}
		},

		features: {
			element: "features",
			pageview: {
				allow: false,
				status: false
			}
		},

		projects: {
			element: "projects",
			pageview: {
				allow: false,
				status: false
			}
		},

		contact: {
			element: "contact",
			pageview: {
				allow: false,
				status: false
			}
		}
	}
}; 
</code>

**OBS: **

**Esse código ainda não está 100% desenvolvido. **
