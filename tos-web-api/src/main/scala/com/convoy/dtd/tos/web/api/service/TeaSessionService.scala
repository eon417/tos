package com.convoy.dtd.tos.web.api.service

import com.convoy.dtd.tos.web.api.entity.TeaSession

import java.util.Date

trait TeaSessionService
{
  //Admin view all
  def findAllTeaSession():List[TeaSession]
  //Member view all(public tea only)
  def findTeaSession(teaVisible:Boolean,ownerID:Long):List[TeaSession]

  //Search(user - public, admin - all)
  //by id
  def getTeaSessionById(teaID:Long, teaVisible:Boolean):Option[TeaSession]
  //by name
  def getTeaSessionByName(teaName:String, teaVisible:Boolean):List[TeaSession]
  //by link
  def getTeaSessionByLink(teaLink:String):TeaSession

  //Search(admin)
  //by id
  def getAllTeaSessionById(teaID:Long):TeaSession
  //by name
  def getAllTeaSessionByName(teaName:String):List[TeaSession]

  //Add tea
  def addTeaSession(teaName:String, teaDesc:String, teaCreator:Long, teaPwd:String, teaTreatDate:Date, teaCutOffDate:Date, teaVisible:Boolean, teaMenu:String, teaLink:String):Boolean

  //Admin delete tea
  def adminDeleteTeaSessionById(teaID:Long):Boolean
  //Owner delete tea
  def ownerDeleteTeaSessionById(teaID:Long, ownerPwd:String):Boolean

  //Owner edit details with pwd
  def ownerUpdateTeaSessionById(teaID:Long, ownerPwd:String, teaName:String, teaDesc:String, teaCreator:Long, teaPwd:String, teaTreatDate:Date, teaCutOffDate:Date, teaVisible:Boolean, teaMenu:String):Boolean
  //Admin edit details
  def adminUpdateTeaSessionById(teaID:Long, teaName:String, teaDesc:String, teaCreator:Long, teaPwd:String, teaTreatDate:Date, teaCutOffDate:Date, teaVisible:Boolean, teaMenu:String, teaLink:String):Boolean
}