<?php

/**
 * @file
 * admin file for youtubechannel.
 */

/**
 * Settings form for youtube channel.
 */
function youtubechannel_settings_form() {
  $form = array();

  $form['youtubechannel'] = array(
    '#type' => 'fieldset',
    '#title' => t('Youtube channel settings'),
    '#collapsible' => FALSE,
  );

  $form['youtubechannel']['youtubechannel_api_key'] = array(
    '#type' => 'textfield',
    '#title' => t('Youtube Google API Key'),
    '#size' => 40,
    '#default_value' => variable_get('youtubechannel_api_key', NULL),
    '#required' => TRUE,
    '#description' => t('Your YouTube Google API key from your developer'
	. 'console. See the README.txt for more details.'),
  );

  $form['youtubechannel']['youtubechannel_id'] = array(
    '#type' => 'textfield',
    '#title' => t('Youtube Channel ID'),
    '#size' => 40,
    '#default_value' => variable_get('youtubechannel_id', NULL),
    '#required' => TRUE,
    '#description' => t('The youtube channel ID you want to get the videos.'),
  );

  $form['youtubechannel']['youtubechannel_video_limit'] = array(
    '#type' => 'textfield',
    '#title' => t('Youtube Channel video limit'),
    '#size' => 40,
    '#default_value' => variable_get('youtubechannel_video_limit', 5),
    '#required' => TRUE,
    '#description' => t('Number of videos to be shown from youtube channel (max 50)'),
  );

  $form['youtubechannel']['youtubechannel_video_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Youtube Channel video width'),
    '#size' => 40,
    '#default_value' => variable_get('youtubechannel_video_width', 200),
    '#required' => TRUE,
    '#description' => t('Max width to youtube video. In px'),
  );

  $form['youtubechannel']['youtubechannel_video_height'] = array(
    '#type' => 'textfield',
    '#title' => t('Youtube Channel video height'),
    '#size' => 40,
    '#default_value' => variable_get('youtubechannel_video_height', 150),
    '#required' => TRUE,
    '#description' => t('Max height to youtube video. In px'),
  );

  return system_settings_form($form);
}
