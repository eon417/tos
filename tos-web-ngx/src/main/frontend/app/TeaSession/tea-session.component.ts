import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { TeaService } from '../service/tea.service';
import { UserService} from "../service/user.service";
import { TeaModel } from '../model/tea.model';
import {OrderService} from "../service/order.service";

@Component(
    {
        templateUrl: './tea-session.component.htm'
    })
export class TeaSessionComponent implements OnInit
{
    tea:TeaModel[] = [];
    orderExists:boolean = false;
    editing:boolean = false;
    isOwner:boolean = false;
    popup:boolean = false
    popup2:boolean = false
    checkOwner:boolean = true
    type:string = ""

    headers = ['Item Name','Item Quantity','Created By','']

    displayedColumns =
        ['itemName',
        'itemQty'];

    errorStatus:boolean
    errorMsg:string
    private data = new Object()
    private orderData = new Object()

    private param:any

    imageUrl:string

    fileToUpload: File | null = null;
    teaMenu: string
    teaID: number
    orderID: number
    teaLink: string;

    form = {
        data:
            {
                teaName: <string> null,
                teaDesc: <string> null,
                teaCreator: <number> null,
                teaPwd: <string> null,
                teaTreatDate: <string> null,
                teaCutOffDate: <string> null,
                teaVisible: <boolean> true,
                teaMenu: <string> null,
                teaLink: <string> null
            }
    };

    form2 = {
        data:
            {
                itemName: <string> null,
                itemQty: <number> 1,
                orderCreator: <number> null,
                orderCutoffDate: <string> null,
                orderTeaID: <number> null,
            }
    }

    private userData:object = {}
    popupRemove: boolean;
    private dupeOrders: object = {};
    isDupe: boolean;
    overCutDate: boolean;
    popupEdit: boolean;
    popupSummary: boolean = false;
    orderSummary: { [p: string]: any }[];
    participant: any;
    popupRemoveTea: boolean;

    constructor(private route: ActivatedRoute, private router: Router, private teaService:TeaService, private userService:UserService, private orderService:OrderService)
    {
    }

    compareDate(cutDate:number){
        let tdy = new Date().getTime()
        this.overCutDate = tdy > cutDate;
    }

    compareEditDate(value: string, value2: string) {
        let treat = new Date(value).getTime()
        let cut = new Date(value2).getTime()

        return treat > cut
    }

    ngOnInit()
    {
        if(sessionStorage.length > 0)
            this.userData = JSON.parse(sessionStorage.user)
        else this.router.navigate(['/user/login'], {relativeTo: this.route})

        this.route.params.subscribe((params: Params) => {
            this.param = params['teaID']
        });
        let temp = this.param
        try {
            this.param = parseInt(this.param)
        } finally {
            if(isNaN(this.param))
                this.param = temp
        }
        this.getTeaDetails()
    }

    findOrders(){
        this.orderService.getAllOrderByTeaId(this.teaID).subscribe(res=>{
            if(res['status']) {
                this.orderData = res['data']
                this.orderExists = true
            } else {
                this.orderData = null
                this.orderExists = false
                this.errorMsg = "No Orders Found"
            }
        })
    }

    triggerModal(event:Event){
        if(event.target == document.getElementById("removeModal"))
            this.popupRemove = false
        else if(event.target == document.getElementById("addModal"))
            this.popup2 = false
        else if(event.target == document.getElementById("verifyModal"))
            this.popup = false
        else if(event.target == document.getElementById("editModal"))
            this.popupEdit = false
        else if(event.target == document.getElementById("summaryModal"))
            this.popupSummary = false
    }

    getTeaDetails(){
        if(typeof this.param == "string"){
            this.teaService.getTeaSessionByLink(this.param).subscribe(res => {
                if(res['status']){
                    if(res['data']['teaCreator']['userID'] == this.userData['userID'])
                        this.isOwner = true;
                    this.data = res['data']
                    this.teaID = res['data']['teaID']
                    this.compareDate(this.data['teaCutOffDate'])
                    this.data['teaTreatDate'] = this.timestampToDate(this.data['teaTreatDate'])
                    this.data['teaCutOffDate'] = this.timestampToDate(this.data['teaCutOffDate'])
                    if (res['data']['teaMenu'] && res['data']['teaMenu'] != "null")
                        this.imageUrl = URL.createObjectURL(this.convertDataUrlToBlob(res['data']['teaMenu']))
                    else
                        this.imageUrl = "../../images/notFound.png"
                    document.getElementById("teaMenu").setAttribute("src", this.imageUrl)
                    this.findOrders()
                }
                this.errorStatus = true
                this.errorMsg = ""
            })
        }
        else if(typeof this.param == "number"){
            this.teaService.getAllTeaSessionById(this.param).subscribe(res => {
                if(res['status']){
                    if(res['data']['teaCreator']['userID'] == this.userData['userID'])
                        this.isOwner = true;
                    this.data = res['data']
                    this.teaID = res['data']['teaID']
                    this.compareDate(this.data['teaCutOffDate'])
                    this.data['teaTreatDate'] = this.timestampToDate(this.data['teaTreatDate'])
                    this.data['teaCutOffDate'] = this.timestampToDate(this.data['teaCutOffDate'])
                    if (res['data']['teaMenu'] && res['data']['teaMenu'] != "null")
                        this.imageUrl = URL.createObjectURL(this.convertDataUrlToBlob(res['data']['teaMenu']))
                    else
                        this.imageUrl = "../../images/notFound.png"
                    document.getElementById("teaMenu").setAttribute("src", this.imageUrl)
                    this.findOrders()
                }
                this.errorStatus = true
                this.errorMsg = ""
            })
        }
    }
    timestampToDate(timestamp:number){
        let date = new Date(timestamp);
        let year = date.getFullYear()
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let day = ("0" + date.getDate()).slice(-2)

        return day + '/' + month + '/' + year
    }

    convertDataUrlToBlob(dataUrl:string): Blob {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], {type: mime});
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        const reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = () => {
            this.form.data.teaMenu = reader.result.toString()
        };
    }

    generateLink(length:number) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    validateOwner() {
        let ownerPwd = <HTMLInputElement>document.getElementById("ownerPwd")

        if(ownerPwd.value == this.data['teaPwd']){
            this.checkOwner = true;
            this.popup = false;
            if(this.type == "edit")
                this.editing = true;
            else if(this.type == "remove")
                this.popupRemoveTea = true;
            this.isOwner = true;
        }
        else {
            this.checkOwner = false;
            this.isOwner = false;
        }
    }

    checkIsAdmin() {
        if(this.userData['userIsAdmin'] == true) {
            this.popup = false
            this.checkOwner = true;
            if(this.type == "edit")
                this.editing = true;
            else if(this.type == "remove")
                this.popupRemoveTea = true;
            this.isOwner = true;
        } else {
            this.popup = true
        }
    }

    onEdit() {
        let treat = ""
        let cut = ""
        let menu: string

        if(this.form.data.teaMenu != null)
            menu = this.form.data.teaMenu
        else menu = null

        if (this.form.data.teaName == null)
            this.form.data.teaName = this.data['teaName']
        if (this.form.data.teaDesc == null)
            this.form.data.teaDesc = this.data['teaDesc']
        if (this.form.data.teaPwd == null)
            this.form.data.teaPwd = this.data['teaPwd']

        let re = /-/gi
        let re2 = /\//gi

        if (this.form.data.teaTreatDate == null || this.form.data.teaTreatDate == "" ) {
            treat = this.data['teaTreatDate']
            treat = treat.replace(re2,"-").split("-").reverse().join("-")
        } else {
            treat = this.form.data.teaTreatDate
        }
        if (this.form.data.teaCutOffDate == null || this.form.data.teaCutOffDate == "" ) {
            cut = this.data['teaCutOffDate']
            cut = cut.replace(re2,"-").split("-").reverse().join("-")
        } else {
            cut = this.form.data.teaCutOffDate
        }
        let checkDate = this.compareEditDate(treat,cut)
        treat = treat.replace(re,"/")
        cut = cut.replace(re,"/")

        if(!this.userData['userIsAdmin']){
            if(this.form.data.teaVisible == false) {
                this.form.data.teaLink = this.generateLink(10)
            } else{
                this.form.data.teaLink = ""
            }
        } else {
            if(this.form.data.teaLink == null || this.form.data.teaLink == "" && this.form.data.teaVisible == false)
                this.form.data.teaLink = this.generateLink(10)
            else {
                this.form.data.teaLink = ""
            }
        }


        if(checkDate) {
            this.teaService.adminUpdateTeaSessionById(this.teaID, this.form.data.teaName, this.form.data.teaDesc, this.data['teaCreator']['userID'], this.form.data.teaPwd, treat, cut, this.form.data.teaVisible, menu, this.form.data.teaLink).subscribe(
                res => {
                    if (res['status']) {
                        if (res['data']['teaLink'] != "" && res['data']['teaLink'] != null) {
                            this.teaLink = res['data']['teaLink']
                        }
                        this.getTeaDetails()
                        this.resetForm()
                    } else {
                        this.errorMsg = res['statusMsg']
                        this.errorStatus = res['status']
                        setTimeout(() => {
                            this.errorStatus = true;
                        }, 3000);
                    }
                    this.isOwner = false;
                    this.editing = false;
                }
            )
        } else {
            this.errorMsg = "Treat Date can't be earlier than Cut-off Date"
            this.errorStatus = false
            setTimeout(()=>{
                this.errorStatus = true;
            }, 3000);
        }
    }

    resetForm() {
        this.form.data.teaName = ""
        this.form.data.teaDesc = ""
        this.form.data.teaPwd = ""
        this.form.data.teaTreatDate = ""
        this.form.data.teaCutOffDate = ""
        this.form.data.teaVisible = this.data['teaVisible']
        this.form.data.teaMenu = ""
        this.form.data.teaLink = ""
    }

    resetForm2() {
        this.form2.data.itemName = ""
        this.form2.data.itemQty = 1
        this.form2.data.orderCreator = this.userData['userID']
        this.form2.data.orderCutoffDate = ""
        this.form2.data.orderTeaID = this.teaID
        this.errorStatus = true
        this.errorMsg = ""
    }

    onSubmit() {
        this.form2.data.orderCutoffDate = this.data['teaCutOffDate']
        this.form2.data.orderCreator = this.userData['userID']
        this.form2.data.orderTeaID = this.teaID

        if(document.getElementById("submitBtn").innerText == "Update")
            this.updateDupeOrders()

        this.orderService.checkDupeOrder(this.form2.data.itemName,this.userData['username']).subscribe(res=>{
            if(res['status']){
                this.dupeOrders = res['data']
                this.isDupe = res['status']
                this.errorStatus = false
                this.errorMsg = "Do you want to update the existing order or cancel the creation of this order?"
                document.getElementById("submitBtn").innerText = "Update"
            } else {
                this.orderService.addOrder(this.form2.data.itemName,this.form2.data.itemQty,this.userData['userID'],this.form2.data.orderTeaID,this.form2.data.orderCutoffDate).subscribe(res=>{
                    if(res['status']){
                        this.resetForm2()
                        this.popup2 = false
                        this.findOrders()
                    }
                })
            }
        })
    }

    updateOrder() {
        this.orderService.adminUpdateOrderById(this.orderID,this.form2.data.itemName,this.form2.data.itemQty,this.form2.data.orderCreator,this.form2.data.orderTeaID,this.form2.data.orderCutoffDate).subscribe(res=>{
            if(res['status']){
                this.popup2 = false
                this.popupEdit = false
                this.errorStatus = true
                this.errorMsg = ""
                this.resetForm2()
                this.findOrders()
            }
        })
    }

    updateDupeOrders() {

        let txt1 = document.getElementById("submitBtn")
        if(txt1 != null)
            txt1.innerText = "Create"
        let txt2 = document.getElementById("submitBtn2")
        if(txt2 != null)
            txt2.innerText = "Update"

        this.orderService.adminUpdateOrderById(this.dupeOrders[0]['orderID'],this.form2.data.itemName,this.form2.data.itemQty,this.form2.data.orderCreator,this.form2.data.orderTeaID,this.form2.data.orderCutoffDate).subscribe(res=>{
            if(res['status']){
                this.popup2 = false
                this.popupEdit = false
                this.isDupe = false
                this.errorStatus = true
                this.errorMsg = ""
                this.resetForm2()
                this.findOrders()
            }
        })
    }

    removeOrder(orderID: number) {
        this.orderService.adminDeleteOrderById(orderID).subscribe(res=>{
            if(res['status']){
                this.popupRemove = false;
                this.popupEdit = false;
                this.findOrders()
            }
        })
    }

    editOrder() {
        this.form2.data.orderCutoffDate = this.data['teaCutOffDate']
        this.form2.data.orderCreator = this.userData['userID']
        this.form2.data.orderTeaID = this.teaID

        if(document.getElementById("submitBtn2").innerText == "Confirm Update")
            this.updateDupeOrders()

        this.orderService.checkDupeOrder(this.form2.data.itemName,this.userData['username']).subscribe(res=>{
            if(res['status']){
                this.dupeOrders = res['data']
                this.isDupe = res['status']
                this.errorStatus = false
                this.errorMsg = "Do you want to update the existing order or cancel the edit of this order?"
                document.getElementById("submitBtn2").innerText = "Confirm Update"
            } else {
                this.updateOrder()
            }
        })
    }

    generateOrder() {
        this.orderService.generateOrder(this.teaID).subscribe(res=>{
            let itemNameList = res['data']['itemName']
            let subtotalList = res['data']['itemQuantity']
            let ary = []
            this.participant = res['statusMsg']
            for( let i:number = 0;i<itemNameList.length;i++){
                let obj: {[k: string]: any} = {};
                obj['itemName'] = itemNameList[i]
                obj['subtotal'] = subtotalList[i]
                ary.push(obj)
            }
            this.orderSummary = ary

            this.popupSummary = true;
        })
    }


    fillEditForm() {
        this.orderService.getAllOrderById(this.orderID).subscribe(res=>{
            this.form2.data.itemName = res['data']['itemName']
            this.form2.data.itemQty = res['data']['itemQty']
        })
    }

    confirmRemoveTea(teaID:number){
        this.teaService.adminDeleteTeaSessionById(teaID).subscribe(res=>{
            if(res['status']){
                this.router.navigate(['/tea'], {relativeTo: this.route})
            }
        })
    }


}
