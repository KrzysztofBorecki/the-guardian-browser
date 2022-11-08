Zadaniem aplikacji będzie pobieranie artykułów z API [https://open-platform.theguardian.com/](https://open-platform.theguardian.com/).

- Wyniki wyszukiwań mogą być zawężane do kategorii artykułów oraz wpisanej przez użytkownika frazy.
- Wyniki mają być stronnicowane - maksymalna liczba artykułów wyświetlana naraz to 10.
- Sposób wyświetlania artykułów jest dowolny - element pojedynczego artykułu ma zawierać minimum datę, tytuł raz kategorię artykułu.

UI aplikacji ma się składać z dwóch części → wyników wyszukiwania z inputem do wpisywania frazy służącej do zawężania wyników oraz listy z kategoriami artykułów do wyboru (lista prócz kategorii powinna posiadać przycisk / link “All articles” w celu ponownego wyszukiwania artykułów bez zawężania do konkretnej kategorii.

W przypadku widoku mobilnego kategorie mają być dostępne u góry ekranu w postaci dropdowna natomiast w przypadku widoku desktopowego kategorie mają być wyświetlane w sidebarze z lewej strony jako lista wraz z inputem na samej górze do zawężania listy wyświetlanych kategorii.

Najistotniejsze elementy aplikacji powinny zostać pokryte testami. W przypadku tego zadanie nie korzystamy z gotowych bibliotek do UI.