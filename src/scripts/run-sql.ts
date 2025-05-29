import { readFileSync } from 'fs';
import { pool } from '../config/pool';

const sql = readFileSync('src/infra/database/init.sql', 'utf-8');

(async () => {
  try {
    await pool.query(sql);
    console.log('Script SQL executado com sucesso!');
  } catch (err) {
    console.error('Erro ao executar script:', err);
  } finally {
    await pool.end();
  }
})();
