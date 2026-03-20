const crypto = require("crypto");
const pool = require("../db/postgres");

async function authorize(req, res) {

  const {
    response_type,
    client_id,
    redirect_uri,
    code_challenge,
    code_challenge_method,
    state
  } = req.query;

  // basic validation
  if (response_type !== "code") {
    return res.status(400).json({ error: "invalid_response_type" });
  }

  if (!client_id || !redirect_uri || !code_challenge) {
    return res.status(400).json({ error: "missing_parameters" });
  }

  try {

    // check client exists
    const clientResult = await pool.query(
      "SELECT * FROM clients WHERE id=$1",
      [client_id]
    );

    if (clientResult.rows.length === 0) {
      return res.status(400).json({ error: "invalid_client" });
    }

    const client = clientResult.rows[0];

    if (client.redirect_uri !== redirect_uri) {
      return res.status(400).json({ error: "invalid_redirect_uri" });
    }

    // simulate logged in user (we use test user)
    const user_id = 1;

    // generate authorization code
const code = crypto.randomBytes(32).toString("hex");

    // store in DB
    await pool.query(
  `INSERT INTO auth_codes
  (code, client_id, redirect_uri, code_challenge, code_challenge_method)
  VALUES ($1,$2,$3,$4,$5)`,
  [code, client_id, redirect_uri, code_challenge, code_challenge_method]
);

    // redirect back
    const redirectUrl = `${redirect_uri}?code=${code}&state=${state}`;

    return res.redirect(redirectUrl);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server_error" });
  }
}

module.exports = { authorize };