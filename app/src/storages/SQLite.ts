import {open} from 'react-native-quick-sqlite';

const config = {name: 'myDatabase'};

const db = open(config);

try {
  db.execute('DROP TABLE IF EXISTS Benchmark', []);
  db.execute('CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))', []);
  db.execute('INSERT INTO Benchmark (value) VALUES (:value)', ['hello']);
} catch (e) {
  console.error(`SQLite error: ${e}`);
}

export function getFromSQLite(): string | undefined {
  try {
    let {rows} = db.execute('SELECT * FROM `Benchmark`', []);
    if (rows == null || rows.length < 1) {
      throw new Error(`Failed to get Values!`);
    }
    const row = rows.item(0);
    return row.value;
  } catch (e) {
    console.error(`SQLite error: ${e}`);
  }
}
