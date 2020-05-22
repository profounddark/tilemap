<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.2" tiledversion="1.3.4" name="Starter" tilewidth="16" tileheight="16" tilecount="50" columns="10">
 <editorsettings>
  <export target="tilemap.json" format="json"/>
 </editorsettings>
 <image source="../sprites/spritesheet.png" width="160" height="80"/>
 <terraintypes>
  <terrain name="Grass" tile="0"/>
  <terrain name="Water" tile="0"/>
 </terraintypes>
 <tile id="0" type="land" terrain="0,0,0,0" probability="0.5"/>
 <tile id="1" type="land" terrain="0,0,0,0" probability="0.5"/>
 <tile id="2" type="water" terrain="1,1,1,1">
  <animation>
   <frame tileid="2" duration="500"/>
   <frame tileid="3" duration="500"/>
  </animation>
 </tile>
 <tile id="3" type="water" terrain="1,1,1,1">
  <animation>
   <frame tileid="3" duration="500"/>
   <frame tileid="2" duration="500"/>
  </animation>
 </tile>
 <tile id="5" type="water" terrain="1,1,1,0"/>
 <tile id="6" type="water" terrain="1,1,0,1"/>
 <tile id="7" type="water" terrain="1,0,1,1"/>
 <tile id="8" type="water" terrain="0,1,1,1"/>
 <tile id="10" type="water" terrain="0,0,0,1"/>
 <tile id="11" type="water" terrain="0,0,1,1"/>
 <tile id="12" type="water" terrain="0,0,1,0"/>
 <tile id="13" type="water" terrain="0,1,0,1"/>
 <tile id="14" type="water" terrain="1,0,1,0"/>
 <tile id="15" type="water" terrain="0,1,0,0"/>
 <tile id="16" type="water" terrain="1,1,0,0"/>
 <tile id="17" type="water" terrain="1,0,0,0"/>
 <tile id="20" type="obstacle"/>
 <tile id="21" type="obstacle"/>
 <tile id="22" type="obstacle"/>
 <tile id="23" type="obstacle"/>
 <tile id="24" type="land"/>
 <tile id="26" type="obstacle">
  <animation>
   <frame tileid="26" duration="250"/>
   <frame tileid="27" duration="250"/>
   <frame tileid="28" duration="250"/>
   <frame tileid="29" duration="250"/>
  </animation>
 </tile>
 <tile id="27" type="obstacle"/>
 <tile id="28" type="obstacle"/>
 <tile id="29" type="obstacle"/>
 <tile id="33" type="land"/>
 <tile id="34" type="land"/>
 <tile id="35" type="obstacle"/>
 <tile id="36" type="obstacle"/>
 <tile id="37" type="obstacle"/>
 <tile id="38" type="obstacle"/>
 <tile id="39" type="obstacle"/>
 <tile id="44" type="land"/>
 <tile id="45" type="obstacle"/>
 <tile id="46" type="obstacle"/>
 <tile id="49" type="obstacle"/>
</tileset>
