import { Dummy } from '../Models'
import { WrapperService } from './mongoService'

export * from './redisService'
export const DummyService = WrapperService(Dummy)