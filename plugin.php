<?php
/*
Plugin Name: Speed Calculator by www.calculator.io
Plugin URI: https://www.calculator.io/speed-calculator/
Description: The speed calculator helps find speed, distance, time using the formulas d=st, s=d/t, t=d/s. Easy to use and intuitive speed calculator.
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_speed_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Speed Calculator by Calculator.iO";

function display_ci_speed_calculator(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">Speed Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_speed_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_speed_calculator', 'display_ci_speed_calculator' );