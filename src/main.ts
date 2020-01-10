import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as Mongoose from 'mongoose'

async function bootstrap() {
  Mongoose.connect('mongodb://localhost/home-backend', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  
  console.log('Successfully connect to mongodb service on localhost:27017 ...')

  const app = await NestFactory.create(AppModule, { cors: true })

  const options = new DocumentBuilder()
    .setTitle('Browser Home APIs')
    .setDescription('The Browser Home API description')
    .setVersion('1.0')
    .addTag('Browser Home')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(3000)

  console.log('Http service started on localhost:3000 ...')
}
bootstrap()
