export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  const usuario = body.usuario;
  const password = body.password;

  // Dispara el workflow en tu repo usando el token guardado como secreto
  const resp = await fetch(`https://api.github.com/repos/OnlineTodito/De_Todo/dispatches`, {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github.everest-preview+json",
      "Authorization": `token ${env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event_type: "guardar",
      client_payload: { usuario, password }
    })
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
