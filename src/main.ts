import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as Mongoose from 'mongoose'
import config from './app.config'

async function bootstrap() {
  Mongoose.connect('mongodb://127.0.0.1:27017/home-backend', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  
  console.log('Successfully connect to mongodb service on localhost:27017 ...')

  const app = await NestFactory.create(AppModule)
  
  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('Browser Home APIs')
    .setDescription('The Browser Home API description')
    .setVersion('1.0')
    .addTag('Browser Home')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(config.port)

  console.log('Http service started on localhost:80 ...')
}
bootstrap()
