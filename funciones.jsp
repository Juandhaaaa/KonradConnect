<%@ page import="java.util.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<%
    // Aquí procesaremos los datos del formulario
    String contenido = request.getParameter("contenido");

    // Por ahora, solo mostramos lo que el usuario escribió en pantalla
    // Luego aquí guardaremos en base de datos o memoria
%>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Publicación registrada</title>
</head>
<body>
    <h2>Tu publicación fue recibida:</h2>
    <p><%= contenido %></p>

    <a href="index.html">Volver al inicio</a>
</body>
</html>
