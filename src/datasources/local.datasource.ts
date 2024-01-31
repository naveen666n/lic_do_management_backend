import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'local',
  connector: 'postgresql',
  // url: 'postgres://postgres:@localhost/test',
  host: '127.0.0.1',
  port: 5000,
  user: 'postgres',
  password: '',
  database: 'do_management'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LocalDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'local';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.local', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
