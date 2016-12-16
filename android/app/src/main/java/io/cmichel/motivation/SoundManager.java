package io.cmichel.motivation;

import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class SoundManager extends ReactContextBaseJavaModule {
  private MediaPlayer mediaPlayer;
  private Uri uri;
  public SoundManager(ReactApplicationContext reactContext) {
    super(reactContext);
    uri = initRingtone();
  }

  private Uri initRingtone() {
    int[] trySounds = new int[] {
      RingtoneManager.TYPE_ALARM,
      RingtoneManager.TYPE_RINGTONE,
      RingtoneManager.TYPE_NOTIFICATION
    };
    int i = 0;
    while(i < trySounds.length) {
        Uri uri = RingtoneManager.getDefaultUri(trySounds[i]);
        i++;
        if(uri != null) return uri;
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
    // init here, because it doesn't work when done in constructor when app restarts
    mediaPlayer = new MediaPlayer();
    try{
      mediaPlayer.setLooping(true);
      mediaPlayer.setDataSource(getReactApplicationContext(), uri);
      mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
      mediaPlayer.prepare();
      mediaPlayer.start();
    } catch(Exception ex){
      Log.i("MOTIVATION_TAG", (ex == null ? "Error Message was null." : ex.getMessage()));
      ex.printStackTrace();
    }
  }

  @ReactMethod
  public final void stopAlarmSound() {
    if(mediaPlayer == null) return;
    mediaPlayer.stop();
  }
}