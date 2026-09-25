\# SPEC — Lista de Tarefas



\## 1. Objetivo



Criar uma aplicação web simples para gerenciamento de tarefas.



\## 2. Funcionalidades



\### 2.1 Adicionar tarefa



O usuário deve conseguir digitar uma tarefa e adicioná-la à lista.



Regras:

\- O campo de tarefa deve estar visível.

\- Deve existir um botão "Adicionar".

\- Ao clicar em "Adicionar", a tarefa deve aparecer na lista.

\- O texto da tarefa deve ser exatamente o texto informado pelo usuário.

\- Não deve ser possível adicionar uma tarefa vazia.



\### 2.2 Concluir tarefa



O usuário deve conseguir marcar uma tarefa como concluída.



Regras:

\- Cada tarefa deve possuir uma forma de marcar como concluída.

\- Uma tarefa concluída deve apresentar uma indicação visual de conclusão.



\### 2.3 Excluir tarefa



O usuário deve conseguir excluir uma tarefa.



Regras:

\- Cada tarefa deve possuir um botão "Excluir".

\- Ao clicar em "Excluir", a tarefa deve desaparecer da lista.



\## 3. Interface



A página deve conter:



\- Título "Lista de Tarefas"

\- Campo para digitar uma tarefa

\- Botão "Adicionar"

\- Lista de tarefas



\## 4. Critérios de aceitação



\### Adicionar



Dado que o usuário está na página,



quando digitar "Estudar Java"



e clicar em "Adicionar",



então "Estudar Java" deve aparecer na lista.



\### Impedir tarefa vazia



Dado que o campo está vazio,



quando o usuário clicar em "Adicionar",



então nenhuma tarefa deve ser adicionada.



\### Concluir



Dado que existe uma tarefa,



quando o usuário marcá-la como concluída,



então ela deve apresentar visualmente que está concluída.



\### Excluir



Dado que existe uma tarefa,



quando o usuário clicar em "Excluir",



então ela deve desaparecer da lista.

