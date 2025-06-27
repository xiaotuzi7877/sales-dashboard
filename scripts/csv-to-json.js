import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

// --------- ⚙️ 可配置常量 ---------
const CSV_FILE = 'Data/SampleSuperstore.csv';     // 你的 CSV 文件名
const ORDER_DATE_COL = 'Order Date';         // 订单日期列标题
const SALES_COL = 'Sales';                   // 销售额列标题
const OUTPUT_JSON = 'public/sales.json';     // 输出 JSON 路径
// ---------------------------------

// 1) 读取 CSV
const csvPath = path.resolve(CSV_FILE);
if (!fs.existsSync(csvPath)) {
  console.error(`❌ 找不到 CSV 文件: ${csvPath}`);
  process.exit(1);
}
const csvRaw = fs.readFileSync(csvPath, 'utf8');
const records = parse(csvRaw, { columns: true });

// 2) 收集所有年份
const yearSet = new Set();
records.forEach(row => {
  const year = new Date(row[ORDER_DATE_COL]).getFullYear();
  if (!isNaN(year)) yearSet.add(year);
});
const allYears = [...yearSet].sort();            // 升序

// 3) 取“最新三年”
const latestThree = allYears.slice(-3);
console.log('🆗 选取年份:', latestThree);

// 4) 汇总销售额
const summary = latestThree.reduce(
  (acc, y) => ({ ...acc, [y]: 0 }), {}
);

records.forEach(row => {
  const year = new Date(row[ORDER_DATE_COL]).getFullYear();
  if (summary.hasOwnProperty(year)) {
    summary[year] += Number(row[SALES_COL]);
  }
});

// 5) 整理为数组并四舍五入
const series = latestThree.map(year => ({
  year,
  sales: Math.round(summary[year]),
}));

// 6) 写入 JSON
fs.writeFileSync(
  OUTPUT_JSON,
  JSON.stringify(series, null, 2),
  'utf8'
);
console.log(`✅ 已生成 → ${OUTPUT_JSON}`);
