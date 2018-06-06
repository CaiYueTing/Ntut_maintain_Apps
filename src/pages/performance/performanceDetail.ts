import { Component, OnDestroy } from '@angular/core'
import { NavController, NavParams, AlertController } from 'ionic-angular'
import { Subscription } from 'rxjs'
import { AngularFireAuth } from 'angularfire2/auth'

import { FirestoreService } from '../../services/firestoreService'
import { MaintainSheet, Admin } from '../../angularModel'

@Component({
    selector: 'page-performance-detail',
    templateUrl: 'performanceDetail.html',
})
export class PerformanceDetailController implements OnDestroy {
    logged: Boolean = false

    adminSubscription: Subscription
    studentSubscription: Subscription
    admin: Admin = null
    maintain: MaintainSheet = null

    mode: string = "view"

    constructor(navCtrl: NavController, navParams: NavParams, private alertCtrl: AlertController, private firestoreService: FirestoreService, angularfireAuth: AngularFireAuth) {
        const maintainId = navParams.data as string
        angularfireAuth.authState.subscribe(firebaseUser => {
            this.logged = !!firebaseUser
            if (this.logged) {
                this.adminSubscription = firestoreService.getAdminByAccount(firebaseUser.uid).subscribe(admin => this.admin = admin)
                this.studentSubscription = this.firestoreService.getMaintainById(maintainId).subscribe(maintain => this.maintain = maintain)
            } else {
                this.ngOnDestroy()
                navCtrl.pop()
            }
        })
    }

    setMaintain(maintain: MaintainSheet, maintainState: string, admin: Admin) {
        this.alertCtrl.create({
            title: "更改狀態",
            message: "確認送出維修狀態？",
            buttons: [
                {
                    text: "送出",
                    handler: () => {
                        
                        if(maintainState == '2'){
                            var maintainCount = Number(admin.maintainCount)
                            var maintainTotal = Number(admin.maintainTotal)
                            
                            maintainCount = maintainCount+1                            
                            maintainTotal = maintainTotal+1

                            admin.maintainCount = maintainCount
                            admin.maintainTotal = maintainTotal

                            maintain.maintainState = maintainState
                            maintain.doneBy = admin.name
                            this.firestoreService.setMaintain(maintain)
                            this.firestoreService.setAdmin(admin)
                        }else{
                            maintain.maintainState = maintainState
                            maintain.doneBy = admin.name
                            this.firestoreService.setMaintain(maintain)
                        }                  
                        this.toggleMode("view")
                    }
                },
                {
                    text: "取消",
                    role: "cancel",
                    handler: () => {
                        this.toggleMode("view")
                    }
                }
            ]
        }).present()
    }

    toggleMode(mode: string) {
        this.mode = mode
    }

    // isValid(value: string): Boolean {
    //     const regx = /^[0-9]*$/
    //     return regx.test(value)
    // }

    ngOnDestroy() {
        if (this.adminSubscription)
            this.adminSubscription.unsubscribe()
        if (this.studentSubscription)
            this.studentSubscription.unsubscribe()
        this.admin = null
        this.maintain = null
    }
}
