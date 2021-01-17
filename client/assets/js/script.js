
$(document).ready(function () {
    'use strict';
    $('#body').removeClass('d-none')    
    cekAuth()

    /** CSS Purpose */
    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }
    });
    
    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }
    
    // Label effect
    $('input').focus(function () {
        $(this).siblings('label').addClass('active');
    });
});
