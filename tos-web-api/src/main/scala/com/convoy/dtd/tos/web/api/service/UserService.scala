package com.convoy.dtd.tos.web.api.service

import com.convoy.dtd.tos.web.api.entity.User

import java.util.Date

trait UserService
{
  def userLogin(username: String, userPwd: String):Int

  def findAllUser():List[User]

  def getAllUserById(userID:Long):Option[User]
  def getAllUserByName(username:String):List[User]

  def addUser(username:String, userPwd:String, userEnabled:Boolean, userLastLogin:Date, userIsAdmin:Boolean):Boolean

  def adminDeleteUserById(userID:Long):Boolean

  def ownerUpdateUserById(userID:Long, ownerPwd:String, username:String, userPwd:String):Boolean
  def adminUpdateUserById(userID:Long, username:String, userPwd:String, userEnabled:Boolean, userLastLogin:Date, userIsAdmin:Boolean, isAdmin: Boolean):Boolean

}