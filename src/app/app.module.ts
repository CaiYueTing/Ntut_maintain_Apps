import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component'

import { SQLite } from '@ionic-native/sqlite'
import { FCM } from '@ionic-native/fcm'

import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuth } from 'angularfire2/auth'

import { TabsController } from '../pages/tabs/tabs'
import { MemberListController } from '../pages/member/memberList'
import { MemberDetailController } from '../pages/member/memberDetail'
import { PerformanceListController } from '../pages/performance/performanceList'
import { PerformanceDetailController } from '../pages/performance/performanceDetail'
// import { ContactListController } from '../pages/message/contactList'
// import { ContacthatModule } from '../pages/message/contactChat.module'
import { SettingController } from '../pages/setting/setting'

import { FirestoreService } from '../services/firestoreService'
// import { MessageService } from '../services/messageService'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import * as environment from './environment'

@NgModule({
    declarations: [
        MyApp,
        TabsController,
        MemberListController,
        MemberDetailController,
        PerformanceListController,
        PerformanceDetailController,
        // ContactListController,
        SettingController,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        HttpModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        // ContacthatModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsController,
        MemberListController,
        MemberDetailController,
        PerformanceListController,
        PerformanceDetailController,
        // ContactListController,
        SettingController
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AngularFireAuth,
        SQLite,
        FCM,
        FirestoreService
        // MessageService
    ]
})
export class AppModule { }
