import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeaService } from '../service/tea.service';
import { TeaModel } from '../model/tea.model';
import {UserModel} from "../model/user.model";
import {DatePipe} from "@angular/common";
import {setInputValues} from "@angularclass/hmr";

@Component(
    {
        templateUrl: './all-tea.component.htm'
    })
export class AllTeaComponent implements OnInit
{
    datePipe: DatePipe = new DatePipe('en-US')
    tea:TeaModel[] = [];

    teaExists:boolean = false;
    searchTeaExists:boolean = false;
    popup:boolean = false;
    popupEdit:boolean = false;
    popupRemove:boolean = false;
    popupLink: boolean = false;
    teaLink: string = ""

    headers = ['Name','Description','Treat Date','Cut-off Date', 'Created By']
    displayedColumns =
        ['teaName',
        'teaDesc',
        'teaTreatDate',
        'teaCutOffDate'];

    errorStatus:boolean
    errorMsg:string
    private data = new Object()
    fileToUpload: File | null = null;

    private userData:object = new Object()
    private isAdmin:boolean
    private teaCreator:string

    teaID:number

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

    constructor(private route: ActivatedRoute, private router: Router, private teaService:TeaService)
    {
    }

    ngOnInit()
    {
        if(sessionStorage.length > 0) {
            this.userData = JSON.parse(sessionStorage.user)
            this.isAdmin = this.userData['userIsAdmin']
            this.teaCreator = this.userData['userID']
        }
        else this.router.navigate(['/user/login'], {relativeTo: this.route})
        this.findTea()
    }

    findTea(){
        if(!this.isAdmin) {
            this.teaService.findTeaSession(true, this.userData['userID']).subscribe(res => {
                if (res['status']) {
                    this.teaExists = true
                    this.data = res['data']
                    for (let key in this.data) {
                        this.data[key]['teaTreatDate'] = this.timestampToDate(this.data[key]['teaTreatDate'])
                        this.data[key]['teaCutOffDate'] = this.timestampToDate(this.data[key]['teaCutOffDate'])
                    }
                } else {
                    this.teaExists = false
                    this.data = null
                }
            });
        }
        else {
            this.teaService.findAllTeaSession().subscribe(res => {

                if (res['status']) {
                    this.teaExists = true
                    this.data = res['data']
                    for (let key in this.data) {
                        this.data[key]['teaTreatDate'] = this.timestampToDate(this.data[key]['teaTreatDate'])
                        this.data[key]['teaCutOffDate'] = this.timestampToDate(this.data[key]['teaCutOffDate'])
                    }
                } else {
                    this.teaExists = false
                }
            });
        }
        this.errorStatus = true
        this.errorMsg = ""
        this.resetSearchInput()

    }

    resetSearchInput() {
        let searchName = <HTMLInputElement>document.getElementById("searchContent")
        if(searchName != null)
            searchName.value = ""
    }

    timestampToDate(timestamp:number){
        var date = new Date(timestamp)
        var year = date.getFullYear()
        var month = ("0" + (date.getMonth() + 1)).slice(-2)
        var day = ("0" + date.getDate()).slice(-2)

        return day + '/' + month + '/' + year

    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        const reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = () => {
            this.form.data.teaMenu = reader.result.toString()
        };
    }

    viewDetails(teaID: number) {
        this.teaService.getAllTeaSessionById(teaID).subscribe(res=>{
            if(res['status'])
                this.router.navigate(['teaSession',teaID], {relativeTo: this.route});
        })
    }

    triggerModal(event:Event){
        if(event.target == document.getElementById("addModal"))
            this.popup = false
        else if(event.target == document.getElementById("removeModal"))
            this.popupRemove = false
        else if(event.target == document.getElementById("linkModal"))
            this.popupLink = false
        else if(event.target == document.getElementById("editModal"))
            this.popupEdit = false
    }

    searchTea(teaID:number) {
        this.teaID = teaID
        this.teaService.getAllTeaSessionById(teaID).subscribe(res=>{
            let teaName = <HTMLInputElement>document.getElementById("editFormTeaName")
            let teaDesc = <HTMLInputElement>document.getElementById("editFormTeaDesc")
            let teaPwd = <HTMLInputElement>document.getElementById("editFormTeaPwd")
            let teaTreat = <HTMLInputElement>document.getElementById("editFormTeaTreatDate")
            let teaCut = <HTMLInputElement>document.getElementById("editFormTeaCutOffDate")
            let teaVisi = <HTMLInputElement>document.getElementById("editFormTeaVisible")
            let teaLink = <HTMLInputElement>document.getElementById("editFormTeaLink")
            teaName.value = res['data']['teaName']
            teaDesc.value = res['data']['teaDesc']
            teaPwd.value = res['data']['teaPwd']
            teaTreat.value = this.datePipe.transform(res['data']['teaTreatDate'],"yyyy-MM-dd")
            teaCut.value = this.datePipe.transform(res['data']['teaCutOffDate'],"yyyy-MM-dd")
            teaVisi.checked = res['data']['teaVisible']
            teaLink.value = res['data']['teaLink']

            this.teaCreator = res['data']['teaID']
        })
    }

    onEdit() {
        let teaName = <HTMLInputElement>document.getElementById("editFormTeaName")
        let teaDesc = <HTMLInputElement>document.getElementById("editFormTeaDesc")
        let teaPwd = <HTMLInputElement>document.getElementById("editFormTeaPwd")
        let teaTreat = <HTMLInputElement>document.getElementById("editFormTeaTreatDate")
        let teaCut = <HTMLInputElement>document.getElementById("editFormTeaCutOffDate")
        let teaVisi = <HTMLInputElement>document.getElementById("editFormTeaVisible")
        let teaLink = <HTMLInputElement>document.getElementById("editFormTeaLink")

        let treat = ""
        let cut = ""
        let menu: string

        if(this.form.data.teaMenu != null)
            menu = this.form.data.teaMenu
        else menu = null



        if(this.compareDate(teaTreat.value, teaCut.value)){
            if(teaTreat.value!=null)
                treat = this.datePipe.transform(teaTreat.value,"yyyy/MM/dd")
            if(teaCut.value!=null)
                cut = this.datePipe.transform(teaCut.value,"yyyy/MM/dd")

            this.teaService.adminUpdateTeaSessionById(this.teaID,teaName.value,teaDesc.value,this.teaCreator,teaPwd.value,treat,cut,teaVisi.checked,menu,teaLink.value).subscribe(
                res => {
                    if(res['status']){
                        this.popupEdit=false
                        if(teaLink.value != ""){
                            this.teaLink = teaLink.value
                            this.popupLink = true
                        }
                        this.searchTea(this.teaID)
                        this.findTea()
                    }
                    else {
                        this.errorMsg = res['statusMsg']
                        this.errorStatus = res['status']
                        setTimeout(()=>{
                            this.errorStatus = true;
                        }, 3000);
                    }
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

    onSubmit(){
        if(this.compareDate(this.form.data.teaTreatDate, this.form.data.teaCutOffDate)) {
            this.form.data.teaTreatDate = this.datePipe.transform(this.form.data.teaTreatDate, "yyyy/MM/dd")
            this.form.data.teaCutOffDate = this.datePipe.transform(this.form.data.teaCutOffDate, "yyyy/MM/dd")

            if (!this.form.data.teaVisible) this.form.data.teaLink = this.generateLink(10)
            else this.form.data.teaLink = ""
            this.teaLink = this.form.data.teaLink
            this.teaService.addTea(this.form.data.teaName, this.form.data.teaDesc, this.userData['userID'], this.form.data.teaPwd, this.form.data.teaTreatDate, this.form.data.teaCutOffDate, this.form.data.teaVisible, this.form.data.teaMenu, this.form.data.teaLink).subscribe(
                res => {
                    if (res['status']) {
                        this.popup = false
                        if (this.teaLink != "")
                            this.popupLink = true
                        this.resetForm()
                        this.findTea()
                    } else {
                        this.errorMsg = res['statusMsg']
                        this.errorStatus = res['status']
                        setTimeout(() => {
                            this.errorStatus = true;
                        }, 3000);
                    }
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
        this.form.data.teaCreator = 1
        this.form.data.teaPwd = ""
        this.form.data.teaTreatDate = ""
        this.form.data.teaCutOffDate = ""
        this.form.data.teaVisible = true
        this.form.data.teaMenu = ""
        this.form.data.teaLink = ""
    }

    generateLink(length:number) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    removeTea(teaID: number) {
        this.teaService.adminDeleteTeaSessionById(teaID).subscribe(res=>{
            if(res['status']){
                this.popupRemove=false
                this.findTea()
            }
            else {
                this.errorMsg = res['statusMsg']
                this.errorStatus = res['status']
                setTimeout(()=>{
                    this.errorStatus = true;
                }, 3000);
            }
        })
    }

    copyLink(link: string) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = link;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    checkboxValidation() {
        let teaVis = <HTMLInputElement>document.getElementById("editFormTeaVisible")
        let teaLin = <HTMLInputElement>document.getElementById("editFormTeaLink")

        if(teaVis.checked)
            this.teaLink = ""
        else{
            this.teaLink = this.generateLink(10)
        }
        teaLin.value = this.teaLink

    }

    searchByTeaName() {
        let searchName = <HTMLInputElement>document.getElementById("searchContent")
        if(searchName.value != ""){
            this.searchByName()
        } else {
            searchName.placeholder = "Please enter a tea session name"
        }
    }

    searchByName(){
        let searchName = <HTMLInputElement>document.getElementById("searchContent")
        if(!this.isAdmin)
            this.teaService.getTeaSessionByName(searchName.value,true).subscribe(res=>{
                if(res['status']){
                    this.searchTeaExists = true
                    this.data = res['data']
                    for (let key in this.data) {
                        this.data[key]['teaTreatDate'] = this.timestampToDate(this.data[key]['teaTreatDate'])
                        this.data[key]['teaCutOffDate'] = this.timestampToDate(this.data[key]['teaCutOffDate'])
                    }
                    searchName.value = ""
                    searchName.placeholder = "Tea Session found"
                }
                else {
                    searchName.placeholder = "Tea Session not found"
                    searchName.value = ""
                    this.searchTeaExists = false
                }
            });
        else
            this.teaService.getAllTeaSessionByName(searchName.value).subscribe(res=>{
                if(res['status']){
                    this.searchTeaExists = true
                    this.data = res['data']
                    for (let key in this.data) {
                        this.data[key]['teaTreatDate'] = this.timestampToDate(this.data[key]['teaTreatDate'])
                        this.data[key]['teaCutOffDate'] = this.timestampToDate(this.data[key]['teaCutOffDate'])
                    }
                    searchName.value = ""
                    searchName.placeholder = "Tea Session found"
                }
                else {
                    searchName.placeholder = "Tea Session not found"
                    searchName.value = ""
                    this.searchTeaExists = false
                }
            });


        this.errorStatus = true
        this.errorMsg = ""
    }

    compareDate(value: string, value2: string) {
        let treat = new Date(value).getTime()
        let cut = new Date(value2).getTime()

        return treat > cut
    }
}
