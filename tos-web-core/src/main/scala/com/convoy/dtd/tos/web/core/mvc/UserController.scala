package com.convoy.dtd.tos.web.core.mvc

import com.convoy.dtd.tos.web.api.entity.Responses
import com.convoy.dtd.tos.web.api.service.UserService
import org.springframework.web.bind.annotation.{RequestMapping, RequestMethod, RestController}

import java.util.Date
import javax.inject.Inject

@RestController
@RequestMapping(value = Array("/rest/user"), method = Array(RequestMethod.POST))
private[mvc] class UserController
{
  @Inject
  private var UserService:UserService = _
  private var Responses:Responses = new Responses

  @RequestMapping(value = Array("find-all-user"), method = Array(RequestMethod.GET))
  def findAllUser(): Responses = {
    Responses.reset()
    val res = UserService.findAllUser()
    if(!res.isEmpty) {
      Responses.status = true
      Responses.statusMsg = "Successfully retrieved user list"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "No Results Found"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("add-user"), method = Array(RequestMethod.POST))
  def addUser(username:String, userPwd:String, userEnabled:Boolean, userLastLogin:Date, userIsAdmin:Boolean):Object = {
    Responses.reset()
    val res = UserService.addUser(username, userPwd, userEnabled, userLastLogin, userIsAdmin)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully created account"
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to create account"
    }
    Responses.data = ""

    return Responses

  }

  @RequestMapping(value = Array("user-login"), method = Array(RequestMethod.GET))
  def userLogin(username:String, userPwd:String):Object = {
    Responses.reset()
    val res = UserService.userLogin(username, userPwd)
    if(res == 0) {
      Responses.status = true
      Responses.statusMsg = "Successfully login"
    } else if(res == 2){
      Responses.status = false
      Responses.statusMsg = "Incorrect username/password"
    } else if(res == 1) {
      Responses.status = false
      Responses.statusMsg = "Username not found"
    }
    else {
      Responses.status = false
      Responses.statusMsg = "ERROR"
    }
    Responses.data = UserService.getAllUserByName(username)

    return Responses

  }

  @RequestMapping(value = Array("delete-user-by-id"), method = Array(RequestMethod.DELETE))
  def adminDeleteUserById(userID:Long): Responses = {
    Responses.reset()
    val res = UserService.adminDeleteUserById(userID)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully deleted user"
      Responses.data = ""
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to delete user"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("owner-update-user-by-id"), method = Array(RequestMethod.PUT))
  def ownerUpdateUserById(userID:Long, ownerPwd:String, username:String, userPwd:String): Responses = {
    Responses.reset()
    val res = UserService.ownerUpdateUserById(userID, ownerPwd, username, userPwd)

    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully deleted user"
      Responses.data = ""
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to delete user"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("admin-update-user-by-id"), method = Array(RequestMethod.PUT))
  def adminUpdateUserById(userID:Long, username:String, userPwd:String, userEnabled:Boolean, userLastLogin:Date, userIsAdmin:Boolean, isAdmin:Boolean): Responses = {
    Responses.reset()
    val res = UserService.adminUpdateUserById(userID, username, userPwd, userEnabled, userLastLogin, userIsAdmin, isAdmin)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully deleted user"
      Responses.data = ""
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to delete user"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("admin-get-user-by-id"), method = Array(RequestMethod.GET))
  def getAllUserById(userID:Long): Responses = {
    Responses.reset()
    var res = new Object()
    if(userID.isValidLong){
      res = UserService.getAllUserById(userID)
    }
    if(res!=null) {
      Responses.status = true
      Responses.statusMsg = "Successfully found user"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find user"
      Responses.data = ""
    }
    return Responses
  }
  @RequestMapping(value = Array("admin-get-user-by-name"), method = Array(RequestMethod.GET))
  def getAllUserByName(username:String): Responses = {
    Responses.reset()
    val res = UserService.getAllUserByName(username)
    if(res.nonEmpty) {
      Responses.status = true
      Responses.statusMsg = "Successfully found user"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find user"
      Responses.data = ""
    }
    return Responses
  }
}

