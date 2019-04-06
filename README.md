# IEFP Scrape

IEFP job offers scraper. Writes all job postings in a file, in JSON format.

- POST request to get the search page and get all job posting ids
- GET per job posting id to scrape all job post information

## How to

- Clone repo
- Run `yarn` to install dependencies
- `yarn fetch` and pray it doesn't timeout

### Example object

```json
[{
	"id": "588891609",
	"posicao": "Soldador (M/F)",
	"localizacao": "SARZEDO;",
	"descricao": {
		"habilita��es_m�nimas": "4º Ano",
		"formacao_profissional_exigida": "Não",
		"data_prevista_para_in�cio_do_trabalho": "2019-03-01",
		"experi�ncia_anterior": "Sim",
		"tempo_m�nimo_de_experi�ncia": "12 meses",
		"tipo_s_de_carta_condu��o": "Ligeiros",
		"normas_espec�ficas_de_higiene_e_seguran�a_no_trabalho": "Sim",
		"perfil": "Soldadores com alguma experiencia.",
		"tipo_de_contrato": "Termo certo",
		"dura��o": "12 (meses)",
		"regime_de_trabalho": "A tempo completo",
		"regime_hor�rio": "Diurno",
		"n�_de_horas": "8.0",
		"remunera��o_base_il�quida": "620 EUR/Mês",
		"subs�dio_de_refei��o": "Subsídio de alimentação\r\n                                            \t\r\n                                                  <br />5 EUR / dia",
		"irct": "A entidade contratante declara n�o possuir IRCT.",
		"uso_de_documentos": "Localizar a Informação necessária num documento",
		"comunicacao_oral": "Compreender informação transmitida oralmente, como por exemplo instruções de trabalho detalhadas",
		"comunicacao_escrita": "Registar informação, escrevendo textos breves",
		"relacionamento_com_os_outros": "Cooperar com os outros no seu trabalho",
		"resolucao_de_problemas": "Reconhecer e identificar problemas",
		"aprendizagem_autonoma": "Aprender em ambiente de trabalho"
	}
}, 
...
]
```

## TODO

- Proper mapping of the job posting, with normalized names
- Handle timeouts and retry
- Whatever you can think of, open for PRs
