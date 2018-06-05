import { Component, OnDestroy } from '@angular/core'
import { ToastController, AlertController } from 'ionic-angular'
import { AngularFireAuth } from 'angularfire2/auth'

import { FirestoreService } from '../../services/firestoreService'
// import { MessageService } from '../../services/messageService'

import { Admin } from '../../angularModel'
import { Subscription } from 'rxjs'

@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html',
})
export class SettingController implements OnDestroy {
    logged: Boolean = false
    adminSubscription: Subscription
    admin: Admin = null

    postSubscription: Subscription
    // postMessage: ChatMessage = null

    errorMessage: string = ""

    constructor(firebaseService: FirestoreService, private angularfireAuth: AngularFireAuth, toastCtrl: ToastController, private alertCtrl: AlertController) {
        angularfireAuth.authState.subscribe(firebaseUser => {
            this.logged = !!firebaseUser
            if (this.logged) {
                this.adminSubscription = firebaseService.getAdminByAccount(firebaseUser.uid).subscribe(admin => this.admin = admin)
                // this.postSubscription = messageService.getLatestPost().subscribe(postMessage => this.postMessage = postMessage)
            } else
                this.ngOnDestroy()
        })
    }

    signIn(account: string, password: string) {
        this.angularfireAuth.auth.signInWithEmailAndPassword(account, password)
            .then(() => this.errorMessage = "")
            .catch(() => {
                this.errorMessage = "密碼不正確，請重新登入"
            })
    }

    async resetPassword() {
        await this.angularfireAuth.auth.sendPasswordResetEmail(this.admin.email)
        this.alertCtrl.create({
            title: "修改密碼",
            message: "重設密碼信件，已發送至信箱，請查看",
            buttons: [{ text: "確認" }]
        }).present()
    }

    signOut() {
        this.angularfireAuth.auth.signOut()
    }

    ngOnDestroy() {
        if (this.adminSubscription)
            this.adminSubscription.unsubscribe()
        // if (this.postSubscription)
        //     this.postSubscription.unsubscribe()
        this.admin = null
        // this.postMessage = null
        // this.errorMessage = ""
    }
}
