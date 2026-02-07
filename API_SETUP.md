# OpenWeatherMap API Setup

Aby włączyć prawdziwe dane pogodowe, wykonaj następujące kroki:

## 1. Zdobądź klucz API
1. Przejdź na stronę: https://openweathermap.org/api
2. Zarejestruj się (bezpłatnie)
3. Przejdź do zakładki "My API Keys"
4. Skopiuj swój klucz API

## 2. Skonfiguruj zmienną środowiskową
1. Utwórz plik `.env` w głównym katalogu projektu
2. Dodaj następującą linię:
```
VITE_OPENWEATHER_API_KEY=twój_klucz_api_tutaj
```

## 3. Uruchom ponownie aplikację
```bash
npm run dev
```

## Przykład pliku .env:
```
VITE_OPENWEATHER_API_KEY=abcd1234567890efghijklmnop
```

## Co się stanie:
- Jeśli klucz API jest skonfigurowany, aplikacja będzie pobierać prawdziwe dane pogodowe
- Jeśli klucz nie jest skonfigurowany lub jest nieprawidłowy, aplikacja użyje danych demonstracyjnych
- Wszystkie funkcjonalności pozostają takie same

## Limity API (bezpłatna wersja):
- 1000 wywołań dziennie
- Dane pogodowe dla wszystkich polskich miast są dostępne

**Uwaga:** Nie udostępniaj swojego klucza API publicznie!
