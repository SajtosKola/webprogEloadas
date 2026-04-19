<?php
header("Content-Type: application/json; charset=UTF-8");

// Ha van config fájl (szerveren), betölti, ha nincs (GitHubon), hibát dob
if (file_exists("config.php")) {
    include "config.php";
} else {
    die(json_encode(["hiba" => "Hiba: A config.php hianyzik!"]));
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    echo json_encode(["hiba" => "Adatbázis hiba: " . $exception->getMessage()]);
    exit;
}

// Kérés típusának (GET, POST, PUT, DELETE) és bejövő adatainak kinyerése
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
$id = isset($_GET['id']) ? $_GET['id'] : null;

// CRUD logika
switch ($method) {
    case 'GET': // Összes kategória lekérdezése
        $stmt = $conn->query("SELECT * FROM kategoria");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST': // Új kategória mentése
        $stmt = $conn->prepare("INSERT INTO kategoria (nev, ar) VALUES (:nev, :ar)");
        $stmt->execute(['nev' => $input['nev'], 'ar' => $input['ar']]);
        echo json_encode(["uzenet" => "Sikeres mentés"]);
        break;

    case 'PUT': // Kategória módosítása
        // Az $id a régi név, a $input['nev'] az új név
        $stmt = $conn->prepare("UPDATE kategoria SET nev = :uj_nev, ar = :ar WHERE nev = :regi_nev");
        $stmt->execute(['uj_nev' => $input['nev'], 'ar' => $input['ar'], 'regi_nev' => $id]);
        echo json_encode(["uzenet" => "Sikeres frissítés"]);
        break;

    case 'DELETE': // Kategória törlése
        $stmt = $conn->prepare("DELETE FROM kategoria WHERE nev = :nev");
        $stmt->execute(['nev' => $id]);
        echo json_encode(["uzenet" => "Sikeres törlés"]);
        break;
}
?>