package io.cmichel.motivation;

import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class SoundManager extends ReactContextBaseJavaModule {

  public SoundManager(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "SoundManager";
  }

  @ReactMethod
  public final void setMusicVolume(int volumePercent) {
    AudioManager audioManager = (AudioManager) getReactApplicationContext().getSystemService(Context.AUDIO_SERVICE);
    audioManager.setStreamVolume(AudioManager.STREAM_MUSIC,
            (int) (volumePercent/100.0 * audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)),
            AudioManager.FLAG_SHOW_UI);
  }

  @ReactMethod
  public final void setControlStreamMusic() {
    try{
      this.getCurrentActivity().setVolumeControlStream(AudioManager.STREAM_MUSIC);
    }
    catch(NullPointerException ex) {

    }
  }
}