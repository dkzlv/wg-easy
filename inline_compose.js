const { readFileSync, writeFileSync, unlinkSync } = require("fs"),
  { join } = require("path"),
  { execSync } = require("child_process");

const enc = { encoding: "utf8" };

const configPath = join(".", "mikasa.json"),
  composePath = join(".", "docker-compose.yml"),
  sigPath = join(".", "docker-compose.yml.asc");

try {
  unlinkSync(sigPath);
} catch (err) {
}

const compose = readFileSync(composePath, enc);
execSync(`gpg --detach-sign --armor -q ${composePath}`);

const signatureContent = readFileSync(sigPath, enc)

const config = JSON.parse(readFileSync(configPath, enc));
config.compose_config = compose;
config.privileged_signature = signatureContent;
writeFileSync(configPath, JSON.stringify(config, null, 2), enc);

unlinkSync(sigPath);
