import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { ApiTags, ApiProperty, ApiOperation } from '@nestjs/swagger'
import { UserModel, User } from './user.model'

class ProfileInfo {
  @ApiProperty({ description: '用户id' })
  id: string
}

class RegisterInfo {
  @ApiProperty({ description: '用户名' })
  username: string
  @ApiProperty({ description: '密码' })
  password: string
  @ApiProperty({ description: '电子邮箱' })
  email: string
  @ApiProperty({ description: '生日' })
  birthday: string
}

class LoginInfo {
  @ApiProperty({ description: '用户名' })
  username: string
  @ApiProperty({ description: '密码' })
  password: string
}

class FindPasswordInfo {
  @ApiProperty({ description: '用户名' })
  username: string
  @ApiProperty({ description: '电子邮箱' })
  email: string
}

class ModifyPassword {
  @ApiProperty({ description: '验证码' })
  verifyingCode: string
  @ApiProperty({ description: '新密码' })
  newPassword: string
}

@Controller('/api/user')
@ApiTags('User')
export class UserController {

  @Get('/findAll')
  @ApiOperation({ description: '测试：查询所有用户信息' })
  async findAll () {
    return await UserModel.find()
  }

  @Delete('/delete:id')
  @ApiOperation({ description: '测试：删除某已用户信息' })
  async remove (@Param('id') id: string) {
    return await UserModel.findOneAndRemove({ _id: id })
  }

  @Post('/profile')
  @ApiOperation({ description: '个人信息' })
  async profile(@Body() profileInfo: ProfileInfo) {
    try {
      const user = await UserModel.findById(profileInfo.id)
      return {
        status: 1,
        msg: '查询成功',
        user
      }
    } catch (e) {
      return {
        status: 0,
        msg: '找不到对应的用户信息'
      }
    }
  }

  @Post('/register')
  @ApiOperation({ description: '用户注册' })
  async register (@Body() registerInfo: RegisterInfo) {
    const ifExists = await UserModel.findOne({ username: registerInfo.username })
    if (ifExists === null) {
      const user = await UserModel.create(registerInfo)
      return {
        status: 1,
        msg: '注册成功',
        token: user.id
      }
    } else {
      return {
        status: 0,
        msg: '用户已存在'
      }
    }
  }

  @Post('/login')
  @ApiOperation({ description: '用户登录' })
  async login (@Body() loginInfo: LoginInfo) {
    // 返回用户id
    const user = await UserModel.findOne({ username: loginInfo.username })
    if (user === null) {
      return {
        status: 0,
        msg: '此用户不存在'
      }
    } else {
      if (loginInfo.password === user.password) {
        return {
          status: 1,
          msg: '登录成功',
          token: user.id
        }
      } else {
        return {
          status: 0,
          msg: '密码错误'
        }
      }
    }
  }

  @Post('/findPassword')
  @ApiOperation({ description: '找回密码' })
  async findPassword (@Body() findPasswordInfo: FindPasswordInfo) {
    // 动态创建验证码
    // 发送到用户的邮箱
    // 返回成功或失败
    return {

    }
  }

  @Post('/modifyPassword')
  @ApiOperation({ description: '修改密码' })
  async modifyPassword (@Body() modifyPassword: ModifyPassword) {
    return {

    }
  }
}
