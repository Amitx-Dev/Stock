const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'backend', 'src', 'main', 'java');
const binDir = path.join(rootDir, 'backend', 'bin');
const libJar = path.join(rootDir, 'backend', 'lib', 'mysql-connector-j-8.3.0.jar');

function getAllJavaFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJavaFiles(fullPath));
    } else if (file.endsWith('.java')) {
      results.push(fullPath);
    }
  });
  return results;
}

if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

const javaFiles = getAllJavaFiles(srcDir);
console.log(`[TradeNest Java Compiler] Found ${javaFiles.length} Java source files.`);

// Write sources file for javac
const sourcesFile = path.join(rootDir, 'backend', 'sources.txt');
fs.writeFileSync(sourcesFile, javaFiles.map(f => `"${f.replace(/\\/g, '/')}"`).join('\n'), 'utf8');

try {
  console.log(`[TradeNest Java Compiler] Compiling classes into backend/bin ...`);
  const cpSeparator = process.platform === 'win32' ? ';' : ':';
  execSync(`javac -cp "${libJar}" -d "${binDir}" @"${sourcesFile}"`, { stdio: 'inherit', cwd: rootDir });
  console.log(`[TradeNest Java Compiler] SUCCESS: All classes compiled cleanly!`);
  // Clean up temporary sources file
  if (fs.existsSync(sourcesFile)) fs.unlinkSync(sourcesFile);
} catch (err) {
  console.error(`[TradeNest Java Compiler] Compilation failed:`, err.message);
  process.exit(1);
}
