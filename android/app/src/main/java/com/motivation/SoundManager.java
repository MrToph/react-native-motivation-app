package io.cmichel.motivation;

import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Build;

import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class SoundManager extends ReactContextBaseJavaModule {
  static private Ringtone ringtone;
  public SoundManager(ReactApplicationContext reactContext) {
    super(reactContext);
    ringtone = initRingtone();
  }

  private Ringtone initRingtone() {
    int[] trySounds = new int[] { RingtoneManager.TYPE_ALARM,
      RingtoneManager.TYPE_RINGTONE,
      RingtoneManager.TYPE_NOTIFICATION
    };
    int i = 0;
    while(i < trySounds.length) {
        Uri uri = RingtoneManager.getDefaultUri(trySounds[i]);
        i++;
        if(uri == null) continue;
        Ringtone r = RingtoneManager.getRingtone(getReactApplicationContext(), uri);
        if(r == null) continue;
        return r;
    }
    return null;
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

  @ReactMethod
  public final void playAlarmSound() {
    if(ringtone == null) return;
    ringtone.play();
  }

  @ReactMethod
  public final void stopAlarmSound() {
    if(ringtone == null) return;
    ringtone.stop();
  }
}