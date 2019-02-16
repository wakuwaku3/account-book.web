import 'reflect-metadata';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto';
import { App } from './web/pages/shared/app';
import registerServiceWorker from './register-service-worker';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
