# dsw-devops-project

Projekt frontendowy w React z pełną konfiguracją DevOps:
Docker, Docker Compose i GitHub Actions (CI/CD).  
Projekt służy jako przykład integracji narzędzi DevOps i automatyzacji workflow.

---

## Funkcje aplikacji

- Wyświetlanie frontendu React w przeglądarce
- Responsywny design
- Aplikacja może korzystać z bazy danych (Docker Compose uruchamia kontener PostgreSQL)
- Uruchamianie lokalnie i w pełni zautomatyzowany build
- CI/CD z GitHub Actions:
  - Reusable workflow dla budowania aplikacji
  - Osobny pipeline dla pull requestów
  - Osobny pipeline dla main branch
  - Własna GitHub Action (spełnia warunek 5.0)
- Docker multi-stage build i Docker Compose dla wielu kontenerów

---

## Uruchomienie lokalne

1. Sklonuj repozytorium:
```bash
git clone https://github.com/gawron7/dsw-devops-project.git
cd dsw-devops-project
Zbuduj i uruchom aplikację:

docker compose up --build
Otwórz w przeglądarce:

http://localhost:8080
Aplikacja frontendowa działa z danymi demo; w razie potrzeby można podłączyć API lub własną bazę danych.

Docker
Obraz budowany w multi-stage build

Kontenery:

frontend (React + Nginx)

db (PostgreSQL)

Docker Compose umożliwia łatwe uruchomienie całego środowiska

CI/CD (GitHub Actions)
Reusable workflow: .github/workflows/reusable-build.yml

Pull Request workflow: .github/workflows/ci-pr.yml

Main branch workflow z własną akcją: .github/workflows/ci-main.yml

Własna akcja: .github/actions/hello-action/action.yml

Workflow buduje aplikację, testuje i wyświetla log własnej akcji.
Wszystko jest w pełni automatyczne i zielone na GitHub Actions.

Wymagania
Docker i Docker Compose zainstalowane lokalnie

Node.js (do budowy lokalnej, jeśli nie korzystamy z Dockera)

