<?php
// convert_json_to_php.php
$files = glob('l10n/*.json');
foreach ($files as $jsonFile) {
    $lang = pathinfo($jsonFile, PATHINFO_FILENAME);
    $phpFile = "l10n/{$lang}.json.php";
    $data = json_decode(file_get_contents($jsonFile), true);
    file_put_contents($phpFile, "<?php\nreturn " . var_export($data, true) . ";\n");
    echo "Converted $jsonFile -> $phpFile\n";
}

