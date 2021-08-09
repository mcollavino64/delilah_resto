create table formas_pago
(
    id     int auto_increment
        primary key,
    nombre varchar(45) null,
    activo tinyint(1)  null
);

create table productos
(
    id     int auto_increment
        primary key,
    nombre varchar(45)   not null,
    precio decimal(5, 2) not null,
    activo tinyint(1)    not null,
    imagen varchar(450)  null
);

create table rol
(
    id     int auto_increment
        primary key,
    nombre varchar(45) not null
);

create table usuarios
(
    id         int auto_increment
        primary key,
    username   varchar(200) not null,
    nombre     varchar(450) not null,
    correo     varchar(200) not null,
    telefono   varchar(200) not null,
    direccion  varchar(400) not null,
    contrasena varchar(100) not null,
    rol_id     int          not null,
    constraint fk_usuarios_rol
        foreign key (rol_id) references rol (id)
);

create table pedidos
(
    id             int auto_increment
        primary key,
    fecha          datetime      default current_timestamp()  not null,
    usuarios_id    int                                        not null,
    formas_pago_id int                                        not null,
    precio_total   decimal(6, 2) default current_timestamp()  not null,
    estado         enum ('nuevo','confirmado','preparando','enviando','cancelado','entregado') null,
    constraint fk_pedidos_formas_pago1
        foreign key (formas_pago_id) references formas_pago (id),
    constraint fk_pedidos_usuarios1
        foreign key (usuarios_id) references usuarios (id)
);

create index fk_pedidos_formas_pago1_idx
    on pedidos (formas_pago_id);

create index fk_pedidos_usuarios1_idx
    on pedidos (usuarios_id);

create table pedidos_has_productos
(
    pedido_id   int not null,
    producto_id int not null,
    cantidad    int null,
    primary key (pedido_id, producto_id),
    constraint fk_pedidos_has_productos_pedidos1
        foreign key (pedido_id) references pedidos (id),
    constraint fk_pedidos_has_productos_productos1
        foreign key (producto_id) references productos (id)
);

create index fk_pedidos_has_productos_pedidos1_idx
    on pedidos_has_productos (pedido_id);

create index fk_pedidos_has_productos_productos1_idx
    on pedidos_has_productos (producto_id);

create index fk_usuarios_rol_idx
    on usuarios (rol_id);


