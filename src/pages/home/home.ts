import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { OneSignal } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready()
      .then(() => {
        this.triggerNotification();
      });
  }

  triggerNotification() {
    // Define settings for iOS
    let iosSettings = {};
    iosSettings["kOSSettingsKeyAutoPrompt"] = true;
    iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

    // Initialise plugin with OneSignal service
    OneSignal.startInit(One-Signal-Application-ID-Pasted-Here, Firebase-Sender-ID-Pasted-Here).iOSSettings(iosSettings);

    // Control how OneSignal notifications will be shown when
    // one is received while your app is in focus
    OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);

    // Retrieve the OneSignal user id and the device token
    OneSignal.getIds()
      .then((ids) => {
        console.log('getIds: ' + JSON.stringify(ids));
      });

    // When a push notification is received handle
    // how the application will respond
    OneSignal.handleNotificationReceived()
      .subscribe((msg) => {
        // Log data received from the push notification service
        console.log('Notification received');
        console.dir(msg);
      });

    // When a push notification is opened by the user
    // handle how the application will respond
    OneSignal.handleNotificationOpened()
      .subscribe((msg) => {
        // Log data received from the push notification service
        console.log('Notification opened');
        console.dir(msg);
      });

    // Debugging
    //OneSignal.setLogLevel({ logLevel: 6, visualLevel: 6 });

    // End plugin initialisation
    OneSignal.endInit();
  }

}
