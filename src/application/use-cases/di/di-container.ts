import { createContainer } from 'src/infrastructures/di/inversify-helper';
import { registerServices } from 'src/application/services/di/register-module';
import { registerUseCases } from './register-module';
import { registerServices as registerStoreServices } from 'src/adapter/stores/di/register-module';

const container = createContainer({ autoBindInjectable: true });
registerServices(container);
registerStoreServices(container);
registerUseCases(container);
const { resolveService } = container;
export const resolve = resolveService;
