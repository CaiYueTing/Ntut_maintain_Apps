import { Component, OnDestroy } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { AngularFireAuth } from 'angularfire2/auth'

import { FirestoreService } from '../../services/firestoreService'
import { Admin } from '../../angularModel'
import { Subscription } from 'rxjs'

@Component({
    selector: 'page-member-detail',
    templateUrl: 'memberDetail.html',
})
export class MemberDetailController implements OnDestroy {
    logged: Boolean = false
    studentSubscription: Subscription
    admin: Admin = null
    loginer: Admin = null
    loggedSubscription: Subscription

    constructor(navCtrl: NavController, navParams: NavParams, firestoreService: FirestoreService, angularfireAuth: AngularFireAuth) {
        const email = navParams.data as string
        angularfireAuth.authState.subscribe(firebaseUser => {
            this.logged = !!firebaseUser
            if (this.logged){
                this.studentSubscription = firestoreService.getAdminByEmail(email).subscribe(admin => this.admin = admin)
                this.loggedSubscription = firestoreService.getAdminByEmail(firebaseUser.email).subscribe(loginer => this.loginer = loginer)
            }else {
                this.ngOnDestroy()
                navCtrl.pop()
            }
        })
    }

    ngOnDestroy() {
        if (this.studentSubscription)
            this.studentSubscription.unsubscribe()
        if (this.loggedSubscription)
            this.loggedSubscription.unsubscribe()
        this.admin = null
        this.loginer = null
    }
}
