const fs = require('fs');

function countGenerated(path) {
  const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
  const providers = [];
  let models = 0;
  for (const line of lines) {
    if (line.startsWith('\t\t"') && line.trimEnd().endsWith('{')) {
      models += 1;
    } else if (line.startsWith('\t"') && !line.startsWith('\t\t') && line.trimEnd().endsWith('{')) {
      providers.push(line.trim().slice(1, -3));
    }
  }
  return { providers, providerCount: providers.length, modelCount: models };
}

const text = countGenerated('C:/orchestrator-system/stratum-beta-testing/packages/ai/src/models.generated.ts');
const image = countGenerated('C:/orchestrator-system/stratum-beta-testing/packages/ai/src/image-models.generated.ts');
console.log(JSON.stringify({ text, image }, null, 2));
