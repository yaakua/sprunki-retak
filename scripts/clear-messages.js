const fs = require('fs');
const path = require('path');

function clearJsonFiles(directory) {
  fs.readdirSync(directory).forEach(filename => {
    if (filename.endsWith('.json') && filename !== 'en.json') {
      const filePath = path.join(directory, filename);
      fs.writeFileSync(filePath, JSON.stringify({}));
      console.log(`已清空: ${filePath}`);
    }
  });
}

// 使用示例
clearJsonFiles(path.join(__dirname, '../messages'));
