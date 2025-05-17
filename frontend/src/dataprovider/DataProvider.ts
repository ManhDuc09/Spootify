import restProvider from 'ra-data-simple-rest';
import {
  CreateParams,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  QueryFunctionContext,
  UpdateManyParams,
  UpdateParams,
} from 'react-admin';

const apiUrl = 'http://localhost:8000/api';

const addTrailingSlashDataProvider = (apiUrl: string) => {
  const dataProvider1 = restProvider(apiUrl);

  // Helper: append slash if missing
  const addSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`);

  return {
    ...dataProvider1,

    getList: (resource: string, params: GetListParams & QueryFunctionContext) =>
      dataProvider1.getList(resource, params),

    getOne: (resource: string, params: GetOneParams<any> & QueryFunctionContext) =>
      dataProvider1.getOne(resource, params),

    getMany: (resource: string, params: GetManyParams<any> & QueryFunctionContext) =>
      dataProvider1.getMany(resource, params),

    getManyReference: (resource: string, params: GetManyReferenceParams & QueryFunctionContext) =>
      dataProvider1.getManyReference(resource, params),

    update: (resource: string, params: UpdateParams<any>) =>
      dataProvider1.update(resource, params),

    updateMany: (resource: string, params: UpdateManyParams<any>) =>
      dataProvider1.updateMany(resource, params),

    create: (resource: string, params: CreateParams<any>) =>
      dataProvider1.create(addSlash(resource), params),  // Only here add slash

    delete: (resource: string, params: DeleteParams<any>) =>
      dataProvider1.delete(resource, params),

    deleteMany: (resource: string, params: DeleteManyParams<any>) =>
      dataProvider1.deleteMany(resource, params),
  };
};

const dataProvider = addTrailingSlashDataProvider(apiUrl);

export default dataProvider;