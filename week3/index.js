const fs = require('fs/promises');

async function fileOperations() {
  try {
    await fs.writeFile('example.txt', 'Hello Vanshika!');
    console.log('✅ File written successfully.');

    const data = await fs.readFile('example.txt', 'utf-8');
    console.log('📄 File content:', data);
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

fileOperations();
