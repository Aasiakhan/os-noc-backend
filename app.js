const express = require('express');
const { spawnSync } = require('child_process');

const services = [
    ["Owlsense", "10.100.102.112", "3000"],
    ["JADOPS", "10.20.20.114", "3000"],
    ["Link Analysis v2", "10.100.102.112", "3002"]
];

const app = express();

app.get("/", (req, res) => {
    res.send("Services Status Checker");
});

app.get("/services-status", (req, res) => {
    const data = services.map(service => {
        const { status } = spawnSync('nc', ['-z', '-v', '-w', '2', service[1], service[2]]);
        return [...service, status === 0 ? "UP" : "DOWN"];
    });

    console.table(data.map(([name, ip, port, status]) => [
        name,
        ip,
        port,
        `${status === "UP" ? "\x1b[32m" : "\x1b[31m"}${status}\x1b[0m`
    ]));

    res.json({ updated_at: new Date().toISOString() });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Owlsense NOC server running at http://${app.address().address}:${PORT}`);
});
