const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const source = fs.readFileSync("src/components/Contact.jsx", "utf8");
const names = ["fullName", "email", "company", "enquiry", "message"];
const validateSource = source.slice(source.indexOf("function validate("), source.indexOf("export default function"));
const validate = vm.runInNewContext(validateSource + "; validate", { fields: names.map(name => ({ name, label: name })) });
for (const name of names) assert.ok(validate(name, "   "), `${name}: reject whitespace`);
for (const email of ["person", "person@", "person@company", "person @company.com"]) assert.ok(validate("email", email));
for (const email of ["person@company.com", " person+demo@company.co.in "]) assert.equal(validate("email", email), "");
for (const name of names.filter(name => name !== "email")) assert.equal(validate(name, "Example"), "");
const routes = ["/", "/products", "/solutions", "/about", "/contact", "/privacy-policy", "/terms"];
const documents = new Map(routes.map(route => [route, fs.readFileSync(path.join("out", route === "/" ? "index.html" : `${route.slice(1)}.html`), "utf8").split("<script")[0]]));
// Inspect all rendered markup, excluding the serialized React payload.
for (const route of routes) {
  const raw = fs.readFileSync(path.join("out", route === "/" ? "index.html" : `${route.slice(1)}.html`), "utf8");
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  documents.set(route, html);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one primary heading`);
  assert.ok(/<title>[^<]+<\/title>/.test(html), `${route}: page title`);
}
let checked = 0;
for (const [route, html] of documents) {
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const [targetPath, hash] = href.split("#");
    const target = targetPath || route;
    assert.ok(documents.has(target), `${route}: missing route ${href}`);
    if (hash) assert.ok(documents.get(target).includes(`id="${hash}"`), `${route}: missing anchor ${href}`);
    checked++;
  }
}
assert.ok(documents.get("/products").includes('id="demo"'));
assert.ok(documents.get("/products").includes("scripted, text-only demonstration"));
assert.ok(documents.get("/contact").includes("does not send or save"));
console.log(`PASS: 15 validation cases, ${routes.length} exported pages, ${checked} internal links, and truthful demo/contact notices.`);
