const url = 'https://docs.qq.com/openapi/mcp';
const payload = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2025-03-26',
    capabilities: {},
    clientInfo: { name: 'connectivity-probe', version: '1.0.0' }
  }
};

try {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json, text/event-stream'
    },
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  console.log('TENCENT_DOCS_MCP_HTTP_STATUS=' + res.status);
  console.log('TENCENT_DOCS_MCP_CONTENT_TYPE=' + (res.headers.get('content-type') || ''));
  console.log('TENCENT_DOCS_MCP_BODY=' + text.slice(0, 1000).replace(/\s+/g, ' '));
  process.exit(0);
} catch (err) {
  console.error('TENCENT_DOCS_MCP_NETWORK_ERROR=' + (err?.stack || err));
  process.exit(1);
}
