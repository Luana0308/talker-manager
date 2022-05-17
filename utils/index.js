const fs = require('fs').promises;

const readFile = async () => {
    const content = await fs.readFile('./talker.json', 'utf-8');

    return JSON.parse(content);
};

const writeFile = async (content) => {
    const stringfyContent = JSON.stringify(content, null, 2);

    await fs.writeFile('./talker.json', stringfyContent, 'utf-8');
};

const httpResponse = {
    OK_STATUS: 200,
    BAD_REQUEST_STATUS: 400,
    NOT_FOUND_STATUS: 404,
    UNAUTHORIZED_STATUS: 401,
    CREATED_STATUS: 201,
};

module.exports = {
    readFile,
    writeFile,
    httpResponse,
};
