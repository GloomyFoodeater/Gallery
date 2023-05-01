-- delete from gallery.album;
insert into gallery.album (name) values ('hello');
insert into gallery.album (name) values ('world');
insert into gallery.album (name) values ('fine');
insert into gallery.album (name) values ('photo');

-- delete from gallery.image;
insert into gallery.image (uuid, name, extension, album_id) 
value ('31703412d84111edafa10242ac120002', '1', 'jpg', '1');
insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51e0aee7b711eda05b0242ac120003', '2', 'jpg', '1');
insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51e6eee7b711eda05b0242ac120003', '3', 'jpg', '1');

insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51e54ae7b711eda05b0242ac120003', '4', 'png', '2');
insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51e838e7b711eda05b0242ac120003', '5', 'png', '2');
insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51e996e7b711eda05b0242ac120003', '6', 'jpg', '2');
insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51eeaae7b711eda05b0242ac120003', '7', 'jpg', '2');
insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51f2b0e7b711eda05b0242ac120003', '8', 'jpg', '2');
insert into gallery.image (uuid, name, extension, album_id) 

value ('ea51f17ae7b711eda05b0242ac120003', '9', 'jpg', '3');
insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51f026e7b711eda05b0242ac120003', '10', 'jpg', '3');
insert into gallery.image (uuid, name, extension, album_id) 
value ('ea51f42ce7b711eda05b0242ac120003', '11', 'jpg', '3');
