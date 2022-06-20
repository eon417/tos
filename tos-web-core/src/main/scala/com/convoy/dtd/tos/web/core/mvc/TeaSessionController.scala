package com.convoy.dtd.tos.web.core.mvc

import com.convoy.dtd.tos.web.api.entity.Responses
import com.convoy.dtd.tos.web.api.service.TeaSessionService
import org.springframework.web.bind.annotation.{RequestMapping, RequestMethod, RequestParam, RestController}

import java.util.Date
import javax.inject.Inject

@RestController
@RequestMapping(value = Array("/rest/tea"), method = Array(RequestMethod.POST))
private[mvc] class TeaSessionController
{
  @Inject
  private var teaSessionService:TeaSessionService = _
  private var Responses:Responses = new Responses

  @RequestMapping(value = Array("find-all-tea"), method = Array(RequestMethod.GET))
  def findAllTeaSession():Object = {
    Responses.reset()
    val res = teaSessionService.findAllTeaSession()
    if(res.nonEmpty) {
      Responses.status = true
      Responses.statusMsg = "Successfully retrieved tea session list"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "No Results Found"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("find-tea"), method = Array(RequestMethod.GET))
  def findTeaSession(teaVisible:Boolean, ownerID:Long):Object = {

    Responses.reset()
    val res = teaSessionService.findTeaSession(teaVisible, ownerID)
    if(res.nonEmpty) {
      Responses.status = true
      Responses.statusMsg = "Successfully retrieved tea session list"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "No Results Found"
      Responses.data = ""
    }
    return Responses
  }


  @RequestMapping(value = Array("add-tea"), method = Array(RequestMethod.POST))
  @RequestParam(name="teaCreator")
  def addTea(teaName:String, teaDesc:String, teaCreator:Long, teaPwd:String, teaTreatDate:Date, teaCutOffDate:Date, teaVisible:Boolean, teaMenu:String, teaLink:String):Object = {

    Responses.reset()
    val res = teaSessionService.addTeaSession(teaName, teaDesc, teaCreator, teaPwd, teaTreatDate, teaCutOffDate, teaVisible, teaMenu, teaLink)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully created new tea session"
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to create new tea session"
    }
    Responses.data = ""

    return Responses
  }

  @RequestMapping(value = Array("admin-delete-tea-by-id"), method = Array(RequestMethod.DELETE))
  def adminDeleteTeaSessionById(teaID:Long):Object = {

    Responses.reset()
    val res = teaSessionService.adminDeleteTeaSessionById(teaID)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully deleted  tea session"
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to delete tea session"
    }
    Responses.data = ""

    return Responses
  }
  @RequestMapping(value = Array("owner-delete-tea-by-id"), method = Array(RequestMethod.DELETE))
  def ownerDeleteTeaSessionById(teaID:Long, ownerPwd:String):Object = {

    Responses.reset()
    val res = teaSessionService.ownerDeleteTeaSessionById(teaID, ownerPwd)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Successfully deleted tea session"
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to delete tea session"
    }
    Responses.data = ""

    return Responses
  }

  @RequestMapping(value = Array("owner-update-tea-by-id"), method = Array(RequestMethod.PUT))
  def ownerUpdateTeaSessionById(teaID:Long, ownerPwd:String, teaName:String, teaDesc:String, teaCreator:Long, teaPwd:String, teaTreatDate:Date, teaCutOffDate:Date, teaVisible:Boolean, teaMenu:String):Object = {
    val res = teaSessionService.ownerUpdateTeaSessionById(teaID, ownerPwd, teaName, teaDesc, teaCreator, teaPwd, teaTreatDate, teaCutOffDate, teaVisible, teaMenu)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Tea Session Found"
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find tea session"
    }
    Responses.data = ""

    return Responses
  }

  @RequestMapping(value = Array("admin-update-tea-by-id"), method = Array(RequestMethod.PUT))
  def adminUpdateTeaSessionById(teaID:Long, teaName:String, teaDesc:String, teaCreator:Long, teaPwd:String, teaTreatDate:Date, teaCutOffDate:Date, teaVisible:Boolean, teaMenu:String, teaLink:String):Object = {
    val res = teaSessionService.adminUpdateTeaSessionById(teaID, teaName, teaDesc, teaCreator, teaPwd, teaTreatDate, teaCutOffDate, teaVisible, teaMenu, teaLink)
    if(res) {
      Responses.status = true
      Responses.statusMsg = "Tea Session Found"
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find tea session"
    }
    Responses.data = ""

    return Responses
  }

  @RequestMapping(value = Array("user-get-tea-by-id"), method = Array(RequestMethod.GET))
  def getTeaSessionById(teaID:Long, teaVisible:Boolean):Object = {
    val res = teaSessionService.getTeaSessionById(teaID, teaVisible)
    if(res != null) {
      Responses.status = true
      Responses.statusMsg = "Tea Session Found"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find tea session"
      Responses.data = ""
    }
    return Responses
  }
  @RequestMapping(value = Array("admin-get-tea-by-id"), method = Array(RequestMethod.GET))
  def getAllTeaSessionById(teaID:Long):Object = {
    val res = teaSessionService.getAllTeaSessionById(teaID)
    if(res != null) {
      Responses.status = true
      Responses.statusMsg = "Tea Session Found"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find tea session"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("admin-get-tea-by-name"), method = Array(RequestMethod.GET))
  def getAllTeaSessionByName(teaName:String):Object = {
    val res = teaSessionService.getAllTeaSessionByName(teaName)
    if(res.nonEmpty) {
      Responses.status = true
      Responses.statusMsg = "Tea Session Found"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find tea session"
      Responses.data = ""
    }
    return Responses
  }
  @RequestMapping(value = Array("user-get-tea-by-name"), method = Array(RequestMethod.GET))
  def getTeaSessionByName(teaName:String, teaVisible:Boolean):Object = {
    val res = teaSessionService.getTeaSessionByName(teaName, teaVisible)
    if(res.nonEmpty) {
      Responses.status = true
      Responses.statusMsg = "Tea Session Found"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find tea session"
      Responses.data = ""
    }
    return Responses
  }

  @RequestMapping(value = Array("get-tea-by-link"), method = Array(RequestMethod.GET))
  def getTeaSessionByLink(teaLink:String):Object = {
    val res = teaSessionService.getTeaSessionByLink(teaLink)
    if(res != null) {
      Responses.status = true
      Responses.statusMsg = "Tea Session Found"
      Responses.data = res
    } else {
      Responses.status = false
      Responses.statusMsg = "Failed to find tea session"
      Responses.data = ""
    }
    return Responses
  }
}