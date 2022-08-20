<?php

if($_GET["folder"]) $path = $_GET["folder"];
else $path = ".";
$array = array();

if($handle = opendir($path)) {
  while($entry = readdir($handle)) {
    if($entry != "." && $entry != ".." && $entry != "getFiles.php") {
      $array[] = $entry; 
    }
  }
  
  closedir($handle);
}

natsort($array);

foreach($array as $key) {
  echo $key."\n";
}

?>