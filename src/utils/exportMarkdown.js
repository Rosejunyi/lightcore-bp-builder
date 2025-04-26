
// src/utils/exportMarkdown.js

import fs from 'fs';
import path from 'path';

// ✅ 通用导出函数：接收内容和文件名，将 Markdown 保存到 /exports 文件夹
export function downloadMarkdownFile(content, filename) {
  try {
    const folder = path.resolve('exports'); // 可根据项目结构调整路径
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const filePath = path.join(folder, filename);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('✅ Markdown 文件已保存:', filePath);
  } catch (err) {
    console.error('❌ 保存 Markdown 文件失败:', err);
  }
}
