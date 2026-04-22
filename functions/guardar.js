export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Leer los datos enviados desde el formulario
    const { usuario, password } = await request.json();

    // Disparar el workflow en GitHub usando el token guardado como secreto MY_TOKEN
    const resp = await fetch(`https://api.github.com/repos/OnlineTodito/De_Todo/dispatches`, {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `token ${env.MY_TOKEN}`
      },
      body: JSON.stringify({
        event_type: "guardar_datos",
        client_payload: { usuario, password }
      })
    });

    if (!resp.ok) {
      return new Response("Error al disparar el workflow", { status: 500 });
    }

    return new Response("Datos enviados correctamente", { status: 200 });

  } catch (error) {
    return new Response("Error interno: " + error.message, { status: 500 });
  }
}
