import { v4 as uuidv4 } from 'uuid';
import { TableName, IDB, ArrayElement, ValueOf } from './types';
import { emulateQueryToDb } from './helpers';
import { 
  DbError, 
  FieldRequiredError, 
  ENTITY_NOT_FOUND_MESSAGE, 
  FIELD_REQUIRED_MESSAGE 
} from './custom-errors';

export const db: IDB = {
  users: []
};

export class Controller<T extends ArrayElement<ValueOf<IDB>>> {
  tableName: TableName;

  constructor(tableName: TableName) {
    this.tableName = tableName;
  }

  async getAll() {
    await emulateQueryToDb();

    return db[this.tableName];
  }

  async getOne(id: string)  {
    await emulateQueryToDb();

    const foundEntity = db[this.tableName]
      .find(entity => entity.id === id);

    if (!foundEntity) {
      throw new DbError(ENTITY_NOT_FOUND_MESSAGE);
    }

    return foundEntity;
  }

  async create(params: Omit<T, 'id'>) {
    await emulateQueryToDb();

    const newEntity = {
      id: uuidv4(),
      name: params.name,
      age: params.age,
      hobbies: params.hobbies
    };

    if (!params.name || !params.age || !params.hobbies) {
      throw new FieldRequiredError(FIELD_REQUIRED_MESSAGE);
    }

    db[this.tableName].push(newEntity);
    return newEntity;
  }

  async update(id: string, params: Partial<Omit<T, 'id'>>) {
    await emulateQueryToDb();

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
      name: params.name,
      age: params.age,
      hobbies: params.hobbies
    };
    db[this.tableName][idxOfFoundEntity] = updatedEntity;
    return updatedEntity;
  }

  async delete(id: string) {
    await emulateQueryToDb();

    const foundEntityIdx = db[this.tableName]
      .findIndex(entity => entity.id === id);

    if (foundEntityIdx === -1) {
      throw new DbError(ENTITY_NOT_FOUND_MESSAGE);
    }

    db[this.tableName].splice(foundEntityIdx, 1);
  }
}