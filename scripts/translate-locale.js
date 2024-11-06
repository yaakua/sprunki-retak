const fs = require('fs').promises;
const path = require('path');
export const EN = 'en';
export const ZH_CN = 'zh-CN';
export const ZH_TW = 'zh-TW';
export const FR = 'fr';
export const DE = 'de';
export const JA = 'ja';
export const CS = 'cs';
export const ES = 'es';
export const IT = 'it';
export const KO = 'ko';
export const NL = 'nl';
export const PT_BR = 'pt-BR';
export const RU = 'ru';
export const UK = 'uk';
export const VI = 'vi';
export const PT = 'pt';
export const DA = 'da';
export const EL = 'el';
export const NO = 'no';
export const FI = 'fi';
export const SV = 'sv';
export const TH = 'th';
export const ID = 'id';
export const HI = 'hi';
export const BN = 'bn';
export const MS = 'ms';
export const TR = 'tr';
export const AR = 'ar';
export const BG = 'bg';
export const ET = 'et';
export const HE = 'he';
export const HR = 'hr';
export const HU = 'hu';
export const LT = 'lt';
export const LV = 'lv';
export const PL = 'pl';
export const RO = 'ro';
export const SK = 'sk';
export const SL = 'sl';

export const localeNames = {
  [EN]: 'English', // 英语
  [ZH_CN]: '简体中文',
  [ES]: 'Español', // 西班牙语
  [FR]: 'Français', // 法语
  [BN]: 'বাংলা (Bangla)', // 孟加拉语
  [RU]: 'Русский', // 俄语
  [PT]: 'Português', // 葡萄牙语
  [PT_BR]: 'Português do Brasil', // 巴西葡萄牙语
  [ID]: 'Bahasa Indonesia', // 印度尼西亚语
  [DE]: 'Deutsch', // 德语
  [JA]: '日本語', // 日语
  [TR]: 'Türkçe', // 土耳其语
  [VI]: 'Tiếng Việt', // 越南语
  [TH]: 'ไทย (Thai)', // 泰语
  [KO]: '한국어', // 韩语
  [IT]: 'Italiano', // 意大利语
  [UK]: 'Українська', // 乌克兰语
  [ZH_TW]: '繁体中文', // 繁体中文
  
} 
const directoryPath = path.join(__dirname, '../lib/messages');
const { translate } = require('./openai-chat');
const {siteConfig} = require('../lib/config/site');
async function processLanguage(file) {
    if (!file.endsWith('.json')) {
        file += '.json';
    }
    const language = file.split('.')[0];
    if (language === 'en') {
        return;
    }
    console.log("正在处理语言：" + language + "," + localeNames[language], file);

    const enFilePath = path.join(directoryPath, 'en.json');
    const targetFilePath = path.join(directoryPath, file);

    // Read the English JSON file
    const enData = await fs.readFile(enFilePath, 'utf8');
    const enJson = JSON.parse(enData);
    const keys = Object.keys(enJson);

    // Read the target language JSON file if it exists
    let targetJson = {};
    try {
        const targetData = await fs.readFile(targetFilePath, 'utf8');
        targetJson = JSON.parse(targetData);
    } catch (e) {
        console.log("目标文件不存在或无法读取，将创建新文件");
    }


    const prompt = `
        ## 角色定义    
        你是一个擅长JSON数据处理和多国语言翻译的AI专家，具备高效处理JSON数据和灵活应对多种语言需求的能力。 
        ## 任务目标
        - 根据提供的原始语言JSON文件为基础，对目标语言当中缺失的内容进行翻译补充
        - 翻译过程中，请不要遗漏任何内容，确保每个key都有对应的翻译内容
        - 对比原始语言文件和目标语言文件，如果原始语言文件当中有新增内容，直接将新增内容翻译补充到目标语言文件当中
        - 如果目标语言文件当中的key在原始语言文件当中不存在，则直接将这个key在目标语言文件当中删除
        - 如果原始语言文件当中的key所对应的内容与目标语言相同key所对应的内容含义已经发生变化，则需要重新翻译这个key.否则跳过
        - 最后输出的目标语言是一个完整包含原始语言所有key和翻译成目标语言后的内容的JSON文件
        ## 翻译要求
        - 翻译考虑到专业术语和正式风格，适用于正式文档和官方交流。
        - 翻译的结果输出为JSON内容key保持不变，直接输出json内容不要加\`\`\`json\`\`\`标签。，不要做任何解释
        - 保证json格式准确性，确保key与内容成对出现。
        - 所有涉及到翻译“${siteConfig.name}”这个游戏名称内容时，除了翻译成当地语言外，还需要在翻译内容之后包含"(${siteConfig.name})"这个英文名称(如果翻译后的内容与英文名称相同，则不需要包含)
        - 翻译考虑使用当地的习惯用语，而不是简单的文字翻译，了解原始文字的意境找到当地的表达方式进行翻译（先直接翻译，再根据含义选择当地习惯用语翻译）
        - 翻译目标语言为：${localeNames[language]}
        - 不要做任何解释，直接输出json内容，也不要输出\`\`\`json\`\`\`标签
        ## 输入JSON数据
        - 原始语言文件：
            ${JSON.stringify(enJson, null, 2)}
        - 目标语言文件：
            ${JSON.stringify(targetJson, null, 2)}
    `;
    // console.log("prompt:", prompt);
    let msg = await translate(prompt);
    console.log("openai返回值:", JSON.stringify(msg));
    msg = msg.choices[0].message.content;
    
    // 解析 JSON 字符串并重新格式化
    const formattedJson = JSON.stringify(JSON.parse(msg), null, 2);
    
    await fs.writeFile(targetFilePath, formattedJson, 'utf8');
    console.log(`${language} 处理完成,文件路径：${targetFilePath}`);
}

async function processLanguagesInQueue(languages, concurrency = 20) {
    const queue = [...languages];
    const inProgress = new Set();
    const results = [];

    async function processNext() {
        if (queue.length === 0) return;
        const language = queue.shift();
        inProgress.add(language);

        try {
            await processLanguage(language);
            results.push(`${language} 处理完成`);
        } catch (error) {
            results.push(`${language} 处理失败: ${error.message}`);
        } finally {
            inProgress.delete(language);
            if (queue.length > 0) {
                await processNext();
            }
        }
    }

    const workers = Array(Math.min(concurrency, languages.length))
        .fill()
        .map(() => processNext());

    await Promise.all(workers);
    return results;
}

export default async function main() {
    try {
        console.log("开始处理语言翻译")
        const languagesToProcess = Object.keys(localeNames).filter(key => key !== 'en');
        const results = await processLanguagesInQueue(languagesToProcess);
        console.log("处理结果:", results.join('\n'));
    } catch (err) {
        console.error('Error:', err);
    }
}

main()







