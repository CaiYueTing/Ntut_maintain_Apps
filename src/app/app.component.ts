import { Component, OnDestroy } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { TabsController } from '../pages/tabs/tabs'

import { AngularFireAuth } from 'angularfire2/auth'
import { FCM } from '@ionic-native/fcm'

import { FirestoreService } from '../services/firestoreService'
import { Subscription } from 'rxjs'

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsController

    adminSubscription: Subscription

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, firestoreService: FirestoreService/*, angularfireAuth: AngularFireAuth, fcm: FCM*/) {
        platform.ready().then(() => {
            statusBar.styleDefault()
            splashScreen.hide()

            // angularfireAuth.authState.subscribe(firebaseUser => {
            //     if (firebaseUser) {
            //         fcm.subscribeToTopic("postTopic")
            //         // firestoreService.getAdminByAccount(firebaseUser.uid).subscribe(admin => {
            //         //     fcm.getToken().then(token => {
            //         //         admin.member.fcmToken = token
            //         //         firestoreService.setFcmToken(admin)
            //         //     })

            //         //     fcm.onTokenRefresh().subscribe(token => {
            //         //         admin.member.fcmToken = token
            //         //         firestoreService.setFcmToken(admin)
            //         //     })
            //         // })
            //     } else
            //         this.ngOnDestroy()
            // })

        })
    }

    // ngOnDestroy() {
    //     if (this.adminSubscription)
    //         this.adminSubscription.unsubscribe()
    // }
}
