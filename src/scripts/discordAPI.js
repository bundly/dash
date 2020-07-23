export function getToken() {
  const bundlyToken = localStorage.getItem("bundly-token");
  let discordToken;
  if (bundlyToken) {
    discordToken = JSON.parse(atob(bundlyToken)).tokens[1].token.accessToken;
  }
  return {
    token: discordToken,
    header: { Authorization: `Token ${discordToken}` },
  };
}
