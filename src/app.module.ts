import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join('__dirname', '..', 'client')
    }),
    UserModule
  ]
})
export class AppModule {
  
}
