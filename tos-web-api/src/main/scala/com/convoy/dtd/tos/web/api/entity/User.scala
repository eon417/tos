package com.convoy.dtd.tos.web.api.entity

import java.util.Date
import javax.persistence._

@SerialVersionUID(1L)
@Entity
@Table(name="tos_dev.dbo.[Users]")
class User extends Serializable {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name="userID", nullable = false)
  var userID: Long = _

  @Column(name="username", unique = true)
  var username: String = _

  @Column(name="userPwd", nullable = false)
  var userPwd: String = _

  @Column(name="userEnabled")
  var userEnabled: Boolean = _

  @Column(name="userLastLogin", nullable = true)
  var userLastLogin: Date = _

  @Column(name="userIsAdmin")
  var userIsAdmin: Boolean = _

  @OneToMany(fetch=FetchType.LAZY, mappedBy = "teaCreator", targetEntity = classOf[TeaSession])
  var teaSessionIDs: java.util.Collection[Long] = _

  @OneToMany(fetch=FetchType.LAZY, mappedBy = "orderCreator", targetEntity = classOf[Orders])
  var teaOrderIDs: java.util.Collection[Long] = _

}
