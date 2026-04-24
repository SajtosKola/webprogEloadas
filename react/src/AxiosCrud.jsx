import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://pizzaszelet.infora.hu/api.php';

export default function AxiosCrud() {
    const [kategoriak, setKategoriak] = useState([]);
    const [nev, setNev] = useState('');
    const [ar, setAr] = useState('');
    const [originalNev, setOriginalNev] = useState('');

    // 1. READ: Adatok lekérdezése
    const fetchKategoriak = async () => {
        try {
            const response = await axios.get(API_URL);
            // Ha a PHP hibaüzenetet küld, azt nem tömbként kapjuk
            if (Array.isArray(response.data)) {
                setKategoriak(response.data);
            } else {
                console.error("Adatbázis hiba:", response.data);
            }
        } catch (error) {
            console.error("Hiba a letöltéskor:", error);
        }
    };

    // Komponens betöltésekor automatikusan lefut
    useEffect(() => {
        fetchKategoriak();
    }, []);

    // 2. CREATE / UPDATE: Adatok mentése
    const handleSave = async (e) => {
        e.preventDefault(); // Megakadályozza az oldal újratöltését
        if (!nev || !ar) return alert("Kérlek tölts ki minden mezőt!");

        const payload = { nev, ar: parseInt(ar) };

        try {
            if (originalNev) {
                // UPDATE: PUT kérés (a PHP-nak az URL végén küldjük a régi nevet)
                await axios.put(`${API_URL}?id=${originalNev}`, payload);
            } else {
                // CREATE: POST kérés
                await axios.post(API_URL, payload);
            }

            // Sikeres mentés után űrlap ürítése és lista frissítése
            setNev('');
            setAr('');
            setOriginalNev('');
            fetchKategoriak();
        } catch (error) {
            console.error("Hiba a mentéskor:", error);
        }
    };

    // 3. DELETE: Adat törlése
    const handleDelete = async (torlendoId) => {
        if (window.confirm(`Biztosan törlöd a(z) ${torlendoId} kategóriát?`)) {
            try {
                await axios.delete(`${API_URL}?id=${torlendoId}`);
                fetchKategoriak();
            } catch (error) {
                console.error("Hiba a törléskor:", error);
            }
        }
    };

    // Segédfüggvény: Betölti az adatokat az input mezőkbe szerkesztéshez
    const prepareEdit = (item) => {
        setNev(item.nev);
        setAr(item.ar);
        setOriginalNev(item.nev);
    };

    return (
        <div className="axios-container" style={{ maxWidth: '600px', margin: '20px auto', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2>Pizza Kategóriák (React + Axios)</h2>

            <form onSubmit={handleSave} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Kategória neve"
                    value={nev}
                    onChange={(e) => setNev(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                />
                <input
                    type="number"
                    placeholder="Ár (Ft)"
                    value={ar}
                    onChange={(e) => setAr(e.target.value)}
                    style={{ width: '100px', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px 15px', background: '#ff9800', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {originalNev ? "Módosítás" : "Mentés"}
                </button>
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ background: '#eee', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Név</th>
                    <th style={{ padding: '10px' }}>Ár</th>
                    <th style={{ padding: '10px' }}>Műveletek</th>
                </tr>
                </thead>
                <tbody>
                {kategoriak.length > 0 ? kategoriak.map((kat) => (
                    <tr key={kat.nev} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '10px' }}>{kat.nev}</td>
                        <td style={{ padding: '10px' }}>{kat.ar} Ft</td>
                        <td style={{ padding: '10px' }}>
                            <button onClick={() => prepareEdit(kat)} style={{ marginRight: '10px', cursor: 'pointer' }}>Szerkesztés</button>
                            <button onClick={() => handleDelete(kat.nev)} style={{ cursor: 'pointer', color: 'red' }}>Törlés</button>
                        </td>
                    </tr>
                )) : (
                    <tr><td colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>Nincsenek adatok az adatbázisban.</td></tr>
                )}
                </tbody>
            </table>
        </div>
    );
}