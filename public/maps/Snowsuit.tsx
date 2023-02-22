<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.4" tiledversion="1.4.3" name="Snowsuit" tilewidth="16" tileheight="16" tilecount="20" columns="4">
 <image source="../img/characters/snowsuit.png" width="64" height="80"/>
 <tile id="0">
  <properties>
   <property name="class" value="Snowsuit"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="1" y="8" width="14" height="8"/>
  </objectgroup>
 </tile>
 <tile id="16">
  <properties>
   <property name="anim.key" value="Snowsuit.climb.idle"/>
  </properties>
  <animation>
   <frame tileid="16" duration="100"/>
  </animation>
 </tile>
 <tile id="17">
  <properties>
   <property name="anim.key" value="Snowsuit.climb.move"/>
   <property name="anim.repeat" type="int" value="-1"/>
  </properties>
  <animation>
   <frame tileid="17" duration="300"/>
   <frame tileid="16" duration="300"/>
  </animation>
 </tile>
</tileset>
