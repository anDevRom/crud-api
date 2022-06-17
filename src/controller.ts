import { v4 as uuidv4 } from 'uuid';
import { TableName, IDB, ArrayElement, ValueOf } from './types';
import { 
  DbError, 
  FieldRequiredError, 
  ENTITY_NOT_FOUND_MESSAGE, 
  FIELD_REQUIRED_MESSAGE 
} from './custom-errors';

const db: IDB = {
  users: []
};

export class Controller<T extends ArrayElement<ValueOf<IDB>>> {
  tableName: TableName;

  constructor(tableName: TableName) {
    this.tableName = tableName;
  }

  async getAll() {
    return await new Promise((res) => {
      setTimeout(() => {
        res(db[this.tableName]);
      }, 300);
    });
  }

  async getOne(id: string)  {
    return await new Promise((res) => {
      setTimeout(() => {
        const foundEntity = db[this.tableName]
          .find(entity => entity.id === id);

        if (!foundEntity) {
          throw new DbError(ENTITY_NOT_FOUND_MESSAGE);
        }

        res(foundEntity);
      }, 300);
    });
  }

  async create(params: Omit<T, 'id'>) {
    return await new Promise((res) => {
      setTimeout(() => {
        const newEntity = {
          id: uuidv4(),
          ...params
        };

        if (!params.name || !params.age || !params.hobbies) {
          throw new FieldRequiredError(FIELD_REQUIRED_MESSAGE);
        }

        db[this.tableName].push(newEntity);
        res(newEntity);
      }, 300);
    });
  }

  async update(id: string, params: Partial<Omit<T, 'id'>>) {
    return await new Promise((res) => {
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

        if (!params.name || !params.age || !params.hobbies) {
          throw new FieldRequiredError(FIELD_REQUIRED_MESSAGE);
        }

        if (!foundEntity) {
          throw new DbError(ENTITY_NOT_FOUND_MESSAGE);
        }

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
    return await new Promise((res) => {
      setTimeout(() => {
        const foundEntityIdx = db[this.tableName]
          .findIndex(entity => entity.id === id);

        if (foundEntityIdx === -1) {
          throw new DbError(ENTITY_NOT_FOUND_MESSAGE);
        }

        db[this.tableName].splice(foundEntityIdx, 1);
        res(null);  
      }, 300);
    });
  }
}