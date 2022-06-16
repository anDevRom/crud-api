import { TableName, IDB } from './types';
import { v4 as uuidv4 } from 'uuid';

const db: IDB = {
  users: []
};

export class ORM<T extends IDB[TableName][number]> {
  tableName: TableName;

  constructor(tableName: TableName) {
    this.tableName = tableName;
  }

  async getAll() {
    return await new Promise(res => {
      setTimeout(() => {
        res(db[this.tableName]);
      }, 300);
    });
  }

  async getOne(id: string) {
    return await new Promise(res => {
      setTimeout(() => {
        const foundEntity = db[this.tableName]
          .find(entity => entity.id === id);
        res(foundEntity);
      }, 300);
    });
  }

  async create(params: Omit<T, 'id'>) {
    return await new Promise(res => {
      setTimeout(() => {
        const newEntity = {
          id: uuidv4(),
          ...params
        };
        db[this.tableName].push(newEntity);
        res(newEntity);
      }, 300);
    });
  }

  async update(id: string, params: Partial<Omit<T, 'id'>>) {
    return await new Promise(res => {
      setTimeout(() => {
        let idxOfFoundEntity: number;
        const foundEntity = db[this.tableName]
          .find((entity, idx) => {
            if (entity.id === id) {
              idxOfFoundEntity = idx;
              return true;
            }
            return false;
          });
        const updatedEntity = {
          ...foundEntity,
          ...params
        };
        db[this.tableName][idxOfFoundEntity] = updatedEntity;
        res(updatedEntity);
      }, 300);
    });
  }

  async delete(id: string) {
    return await new Promise(res => {
      setTimeout(() => {
        const foundEntityIdx = db[this.tableName]
          .findIndex(entity => entity.id === id);
        db[this.tableName].splice(foundEntityIdx, 1);
        res(null);  
      }, 300);
    });
  }
}