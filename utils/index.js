const fs = require('fs').promises;

const readFile = async () => {
    const content = await fs.readFile('./talker.json', 'utf-8');

    return JSON.parse(content);
};

const writeFile = async (content) => {
    const stringfyContent = JSON.stringify(content, null, 2);

    await fs.writeFile('./talker.json', stringfyContent, 'utf-8');
};

module.exports = {
    readFile,
    writeFile,
};
