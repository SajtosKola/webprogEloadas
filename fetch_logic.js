// Az API elérése
const API_URL = "api.php";

// 1. READ: Adatok betöltése és megjelenítése
async function loadCategories() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();


        console.log("Ezt küldte a PHP:", data);

        // Ha a PHP hibaüzenetet küldött, írjuk ki és állítsuk meg a futást
        if (data.hiba) {
            alert("Adatbázis hiba: " + data.hiba);
            return;
        }

        // Ha valamiért nem lista (tömb) jött vissza, jelezzük
        if (!Array.isArray(data)) {
            console.error("Hiba: Nem listát kaptunk a PHP-tól!", data);
            return;
        }


        const tbody = document.querySelector("#categoryTable tbody");
        tbody.innerHTML = "";

        data.forEach(item => {
            const row = `<tr>
                <td>${item.nev}</td>
                <td>${item.ar} Ft</td>
                <td>
                    <button onclick="prepareUpdate('${item.nev}', ${item.ar})">Szerkesztés</button>
                    <button onclick="deleteCategory('${item.nev}')">Törlés</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
    }
}

// 2. CREATE / UPDATE: Adat mentése
async function saveCategory() {
    const nev = document.getElementById("katNev").value;
    const ar = document.getElementById("katAr").value;
    const originalNev = document.getElementById("originalNev").value;

    if (!nev || !ar) return alert("Minden mezőt tölts ki!");

    const payload = { nev, ar: parseInt(ar) };

    const method = originalNev ? "PUT" : "POST";
    // A PHP-nak paraméterként (?id=...) adjuk át, hogy mit akarunk szerkeszteni
    const url = originalNev ? `${API_URL}?id=${originalNev}` : API_URL;

    await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    resetForm();
    loadCategories();
}

// 3. DELETE: Adat törlése
async function deleteCategory(id) {
    if (confirm(`Biztosan törlöd a(z) ${id} kategóriát?`)) {
        // Törlésnél is paraméterként küldjük a nevet a PHP-nak
        await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
        loadCategories();
    }
}

// Segédfüggvények
function prepareUpdate(nev, ar) {
    document.getElementById("katNev").value = nev;
    document.getElementById("katAr").value = ar;
    document.getElementById("originalNev").value = nev;
}

function resetForm() {
    document.getElementById("katNev").value = "";
    document.getElementById("katAr").value = "";
    document.getElementById("originalNev").value = "";
}

// Kezdő betöltés
loadCategories();