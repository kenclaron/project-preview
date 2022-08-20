<?php
    
  if(file_exists("projects/".$_GET["id"]) && json_decode(file_get_contents("projects/".$_GET["id"]."/project.json"))->download == "true") {
    require_once("zip.lib.php");
    $zip = new zipfile();
    $result = array();
    
    $dirpath = "projects/".$_GET["id"];
    $cdir = scandir($dirpath); 
    foreach ($cdir as $value) {
      if (!in_array($value,array(".", "..")) && !is_dir($dirpath . DIRECTORY_SEPARATOR . $value)) {
        $zip->addFile(file_get_contents($dirpath."/".$value), $value);
      }
    } 
    $zip->addFile("[{000214A0-0000-0000-C000-000000000046}]\n
    Prop3=19,2\n
    [InternetShortcut]\n
    IDList=\n
    URL=https://preview.kenclaron.ru/w/".$_GET["id"], "Online Preview Wallpaper.url");

    $filename = "Wallpaper - ".json_decode(file_get_contents($dirpath."/project.json"))->title;

    header("Content-type: application/octet-stream");
    header("Content-Disposition: attachment; filename=".$filename.".zip");
    header("Content-Description: Files of an applicant");

    echo $zip->file(); 
    
    echo "\n\nCreate";
  }
  else {
    header('Location: //preview.kenclaron.ru/');
  }
?>

<html>
<body>
  <script>
    window.close();
  </script>
</body>
</html>