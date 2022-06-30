package com.convoy.dtd.tos.web.api.entity

import java.util.Date
import javax.persistence._

@SerialVersionUID(1L)
@Entity
@Table(name="tos_dev.dbo.[Orders]")
class Orders {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name="orderID", nullable = false)
  var orderID: Long = _

  @Column(name="itemName", nullable = false)
  var itemName: String = _

  @Column(name="itemQty", nullable = false)
  var itemQty: Long = _

  @ManyToOne(fetch = FetchType.EAGER, targetEntity = classOf[Users])
  @JoinColumn(name="orderCreator", referencedColumnName = "userID", nullable = false)
  var orderCreator: Users = _

  @ManyToOne(fetch = FetchType.EAGER, targetEntity = classOf[TeaSession])
  @JoinColumn(name="orderTeaID", referencedColumnName = "teaID", nullable = false)
  var orderTeaID: TeaSession = _

  @Column(name="orderCutoffDate", nullable = false)
  var orderCutoffDate: Date = _

}
