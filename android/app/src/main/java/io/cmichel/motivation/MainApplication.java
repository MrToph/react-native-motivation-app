package io.cmichel.motivation;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import io.cmichel.motivation.SoundManagerPackage;
import io.cmichel.appLauncher.LauncherPackage;  // add this for react-native-app-launcher
import com.sbugert.rnadmob.RNAdMobPackage;
import com.github.yamill.orientation.OrientationPackage;  // react-native-orientation

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new InAppBillingBridgePackage(null),
          new RNDeviceInfo(),
          new VectorIconsPackage(),
          new SoundManagerPackage(),
          new LauncherPackage(),
          new RNAdMobPackage(),
          new OrientationPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
